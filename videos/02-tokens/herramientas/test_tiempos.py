import unittest

from tiempos import plan, ENTRADA, COLA


class PruebaTiempos(unittest.TestCase):
    def test_escenas_en_secuencia(self):
        filas = plan({n: 10.0 for n in range(1, 10)})
        self.assertEqual(filas[0]["inicio"], 0.0)
        self.assertEqual(filas[0]["voz_inicio"], 0.6)
        self.assertEqual(filas[0]["fin"], 11.0)
        self.assertEqual(filas[1]["inicio"], 11.0)
        self.assertEqual(filas[1]["voz_inicio"], 11.3)
        for a, b in zip(filas, filas[1:]):
            self.assertEqual(a["fin"], b["inicio"])

    def test_total(self):
        filas = plan({n: 10.0 for n in range(1, 10)})
        esperado = 90.0 + sum(ENTRADA.values()) + sum(COLA.values())
        self.assertAlmostEqual(filas[-1]["fin"], esperado, places=3)


if __name__ == "__main__":
    unittest.main()
