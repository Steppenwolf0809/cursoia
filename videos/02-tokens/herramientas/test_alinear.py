import unittest

from alinear import tramos_de_voz, alinear


class PruebaAlinear(unittest.TestCase):
    def test_tramos_son_el_complemento_de_los_silencios(self):
        silencios = [(0.0, 0.2), (1.0, 1.4), (2.5, None)]
        self.assertEqual(tramos_de_voz(silencios, 3.0), [[0.2, 1.0], [1.4, 2.5]])

    def test_una_frase_por_tramo(self):
        # las tres frases a 10 letras por segundo
        r = alinear("Hola, mundo. Adiós.", [[0.0, 0.5], [0.8, 1.4], [1.7, 2.3]])
        self.assertEqual([(p["inicio"], p["fin"]) for p in r], [(0.0, 0.5), (0.8, 1.4), (1.7, 2.3)])

    def test_pausa_dentro_de_una_frase(self):
        # «mundo» tiene una pausa corta adentro: sus dos tramos van juntos
        r = alinear("Hola, mundo. Adiós.", [[0.0, 0.5], [0.8, 1.1], [1.15, 1.4], [1.7, 2.3]])
        self.assertEqual((r[1]["inicio"], r[1]["fin"]), (0.8, 1.4))
        self.assertEqual(r[2]["inicio"], 1.7)

    def test_coma_sin_pausa(self):
        r = alinear("Hola, mundo. Adiós.", [[0.0, 1.1], [1.4, 2.0]])
        self.assertEqual((r[0]["inicio"], r[0]["fin"]), (0.0, 0.5))  # 5 de 11 letras de 1,1 s
        self.assertEqual(r[1]["fin"], 1.1)
        self.assertEqual(r[2]["inicio"], 1.4)

    def test_elige_por_ritmo_y_no_por_cercania(self):
        # Como la escena 6: un tramo corto suelto antes de una frase larga. Unir por cercanía
        # metería la frase larga en 0,3 s; por ritmo, el tramo corto va con ella.
        texto = "Segundo, el costo: quien usa la IA a gran escala paga por token."
        r = alinear(texto, [[0.0, 0.55], [0.85, 1.45], [1.95, 2.25], [2.85, 5.75]])
        quien = next(p for p in r if p["palabra"] == "quien")
        costo = next(p for p in r if p["palabra"] == "costo")
        self.assertGreaterEqual(quien["inicio"], 1.95)
        self.assertLess(costo["fin"], 1.5)

    def test_reparte_solo_el_tiempo_con_voz(self):
        # una sola frase en dos tramos: ninguna palabra empieza dentro del silencio
        r = alinear("Uno dos son.", [[0.0, 0.6], [1.6, 2.0]])
        self.assertAlmostEqual(r[1]["inicio"], 0.333, places=3)
        self.assertAlmostEqual(r[2]["inicio"], 1.667, places=3)

    def test_tiempos_crecen(self):
        r = alinear("Uno dos, tres cuatro. Cinco.", [[0.1, 0.9], [1.2, 2.0], [2.4, 2.9]])
        inicios = [p["inicio"] for p in r]
        self.assertEqual(inicios, sorted(inicios))
        self.assertEqual(len(r), 5)


if __name__ == "__main__":
    unittest.main()
