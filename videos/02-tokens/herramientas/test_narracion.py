import unittest

from narracion import escenas, palabras, cortes, tokens_por_palabra

ACUMULADOS = [22, 64, 103, 151, 197, 242, 271, 327, 349]  # columna «Contador» del guion


class PruebaNarracion(unittest.TestCase):
    def test_nueve_escenas_sin_etiquetas(self):
        textos = escenas()
        self.assertEqual(len(textos), 9)
        self.assertTrue(all("[" not in t for t in textos))
        self.assertTrue(textos[0].startswith("¿La inteligencia artificial"))

    def test_tokens_acumulados_coinciden_con_el_guion(self):
        acum, obtenidos = 0, []
        for n, texto in enumerate(escenas(), 1):
            acum += sum(tokens_por_palabra(texto, con_espacio=n > 1))
            obtenidos.append(acum)
        self.assertEqual(obtenidos, ACUMULADOS)

    def test_signos_se_suman_a_la_palabra_anterior(self):
        # El | gato | duer+me+.  →  1, 1, 3
        self.assertEqual(tokens_por_palabra("El gato duerme.", con_espacio=False), [1, 1, 3])

    def test_palabras_hasta_la_escena_7(self):
        self.assertEqual(sum(len(palabras(t)) for t in escenas()[:7]), 199)

    def test_la_escena_8_dice_las_palabras_de_verdad(self):
        # «hasta aquí» es el final de la escena 7: lo que dice la voz tiene que ser lo que se cuenta
        self.assertIn("ciento noventa y nueve palabras", escenas()[7])

    def test_fuerza_de_las_pausas(self):
        # Hola, mundo: ya. Fin  →  coma 1, dos puntos 2, punto 3
        self.assertEqual(cortes("Hola, mundo: ya. Fin"), [1, 2, 3])
        self.assertEqual(cortes("«Gato» es"), [0])


if __name__ == "__main__":
    unittest.main()
