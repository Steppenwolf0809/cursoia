import unittest

from narracion import escenas, palabras
from tiempos import plan
from contador import pasos, inyectar, valor_en

ACUMULADOS = [22, 64, 103, 151, 197, 242, 271, 327, 349]


def palabras_falsas():
    """Cada palabra dura 0,25 s, una tras otra, desde el segundo 0 del MP3."""
    todo = {}
    for n, texto in enumerate(escenas(), 1):
        todo[str(n)] = [{"palabra": p[0], "inicio": 0.25 * i, "fin": 0.25 * (i + 1)}
                        for i, p in enumerate(palabras(texto))]
    return todo


def tiempos_falsos(todo):
    return plan({n: 0.25 * len(todo[str(n)]) + 0.1 for n in range(1, 10)})


class PruebaContador(unittest.TestCase):
    def setUp(self):
        self.todo = palabras_falsas()
        self.tiempos = tiempos_falsos(self.todo)
        self.pasos = pasos(self.todo, self.tiempos, escenas())

    def test_valor_al_final_de_cada_escena(self):
        for fila, esperado in zip(self.tiempos, ACUMULADOS):
            self.assertEqual(valor_en(self.pasos, fila["fin"] - 0.001), esperado)

    def test_empieza_en_cero_y_nunca_baja(self):
        self.assertEqual(self.pasos[0], [0.0, 0])
        valores = [v for _, v in self.pasos]
        self.assertEqual(valores, sorted(valores))

    def test_escena_8_congelada_en_271(self):
        fila = self.tiempos[7]
        textos = escenas()
        idx = [i for i, p in enumerate(palabras(textos[7])) if p[0] == "tokens"][1]
        fin_tokens = fila["voz_inicio"] + self.todo["8"][idx]["fin"]
        self.assertEqual(valor_en(self.pasos, fila["inicio"] + 0.01), 271)
        self.assertEqual(valor_en(self.pasos, fin_tokens + 0.5), 271)

    def test_inyectar_reemplaza_solo_el_bloque(self):
        html = "a /* PASOS:INICIO */ const PASOS = [[0,0]]; /* PASOS:FIN */ b"
        nuevo = inyectar(html, [[0.0, 0], [1.5, 3]])
        self.assertEqual(nuevo, "a /* PASOS:INICIO */ const PASOS = [[0.0,0],[1.5,3]]; /* PASOS:FIN */ b")


if __name__ == "__main__":
    unittest.main()
