"""Pasos del contador: en qué segundo global cambia y a qué valor. Los escribe en contador.html."""
import json
import re

from narracion import escenas, palabras, tokens_por_palabra
from tiempos import PROYECTO

VUELTA = 1.0         # segundos que tarda el contador en volver a su esquina (escena 8)
RAMPA_MINIMA = 1.2   # la rampa de la escena 8 nunca dura menos que esto


def pasos(todo, tiempos, textos):
    lista, valor = [[0.0, 0]], 0

    def poner(t, v):
        if v != lista[-1][1]:
            lista.append([round(t, 3), v])

    for n in range(1, 10):
        cuenta = tokens_por_palabra(textos[n - 1], con_espacio=n > 1)
        base = tiempos[n - 1]["voz_inicio"]
        ws = todo[str(n)]
        if n != 8:
            for w, c in zip(ws, cuenta):
                valor += c
                poner(base + w["fin"], valor)
            continue
        corte = [i for i, p in enumerate(palabras(textos[7])) if p[0] == "tokens"][1]
        desde = base + ws[corte + 1]["inicio"] + VUELTA
        hasta = max(base + ws[-1]["fin"], desde + RAMPA_MINIMA)
        total = sum(cuenta)
        for k in range(1, total + 1):
            poner(desde + (hasta - desde) * k / total, valor + k)
        valor += total
    return lista


def valor_en(lista, t):
    v = 0
    for tiempo, valor in lista:
        if tiempo <= t:
            v = valor
    return v


def inyectar(html, lista):
    datos = json.dumps(lista, separators=(",", ":"))
    bloque = f"/* PASOS:INICIO */ const PASOS = {datos}; /* PASOS:FIN */"
    return re.sub(r"/\* PASOS:INICIO \*/.*?/\* PASOS:FIN \*/", lambda _: bloque, html, flags=re.S)


def main():
    todo = json.loads((PROYECTO / "datos" / "palabras.json").read_text(encoding="utf-8"))
    tiempos = json.loads((PROYECTO / "datos" / "tiempos.json").read_text(encoding="utf-8"))
    lista = pasos(todo, tiempos, escenas())
    ruta = PROYECTO / "compositions" / "contador.html"
    ruta.write_text(inyectar(ruta.read_text(encoding="utf-8"), lista), encoding="utf-8")
    for fila in tiempos:
        print(f"Escena {fila['escena']}: termina en {valor_en(lista, fila['fin'])}")


if __name__ == "__main__":
    main()
