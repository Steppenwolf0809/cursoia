"""Tiempo aproximado de cada palabra, sin modelos de voz.

FFmpeg `silencedetect` da los tramos con voz del MP3; el texto se parte en frases por la
puntuación. Una programación dinámica agrupa frases y tramos seguidos (k frases con l tramos) para
que cada grupo dure lo que piden sus letras al ritmo medio de la escena. Dentro de cada grupo, las
palabras se reparten el tiempo con voz según sus letras.

Uso:
  python herramientas/alinear.py                      genera datos/palabras.json y muestra los grupos
  python herramientas/alinear.py anclas N p1 p2#2 …   imprime `const W = {…}` con segundos locales
                                                      de la escena N (con --global, globales)
"""
import json
import math
import re
import subprocess
import sys

from narracion import escenas, palabras, cortes
from tiempos import PROYECTO, ENTRADA

FFMPEG = PROYECTO / "node_modules" / "ffmpeg-static" / "ffmpeg.exe"
AJUSTE = {n: {"ruido": -35, "minimo": 0.18} for n in range(1, 10)}  # silencedetect por escena
SIN_PAUSA = {1: 0.25, 2: 0.6, 3: 1.2}      # corte de frase sin pausa en el audio, según su fuerza
PAUSA_SUELTA, PAUSA_SUELTA_POR_S = 0.3, 1.0  # pausa del audio dentro de un grupo: fijo + por segundo
PESO_RITMO = 2.0                            # castigo por |ln(duración real / duración esperada)|
MAX_GRUPO = 4                               # frases o tramos que caben en un mismo grupo


def silencios(mp3, ruido, minimo):
    r = subprocess.run([str(FFMPEG), "-hide_banner", "-i", str(mp3), "-af",
                        f"silencedetect=noise={ruido}dB:d={minimo}", "-f", "null", "-"],
                       capture_output=True, text=True)
    inicios = [float(x) for x in re.findall(r"silence_start: (-?[\d.]+)", r.stderr)]
    finales = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", r.stderr)]
    return list(zip(inicios, finales + [None] * (len(inicios) - len(finales))))


def tramos_de_voz(sil, duracion, minimo=0.08):
    """Tramos con voz: lo que queda de [0, duracion] fuera de los silencios."""
    tramos, t = [], 0.0
    for ini, fin in sil:
        if ini - t >= minimo:
            tramos.append([round(t, 3), round(ini, 3)])
        t = duracion if fin is None else fin
    if duracion - t >= minimo:
        tramos.append([round(t, 3), round(duracion, 3)])
    return tramos


def frases(texto):
    """Frases (listas de índices de palabra) y la fuerza de la pausa que cierra cada una."""
    fuerzas = cortes(texto)
    lista, actual = [], [0]
    for k, f in enumerate(fuerzas):
        if f >= 1:
            lista.append(actual)
            actual = [k + 1]
        else:
            actual.append(k + 1)
    lista.append(actual)
    return lista, [fuerzas[f[-1]] for f in lista[:-1]]


def grupos(texto, tramos):
    """[(frase_desde, frase_hasta, tramo_desde, tramo_hasta)] al menor costo; los «hasta» excluidos."""
    ps = palabras(texto)
    fs, fuerzas = frases(texto)
    letras = [sum(len(ps[i][0]) + 1 for i in f) for f in fs]
    P, S = len(fs), len(tramos)
    ritmo = sum(letras) / sum(b - a for a, b in tramos)  # letras por segundo de voz
    inf = float("inf")
    costo = [[inf] * (S + 1) for _ in range(P + 1)]
    desde = [[None] * (S + 1) for _ in range(P + 1)]
    costo[0][0] = 0.0
    for p in range(P):
        for t in range(S):
            if costo[p][t] == inf:
                continue
            for k in range(1, min(MAX_GRUPO, P - p) + 1):
                for l in range(1, min(MAX_GRUPO, S - t) + 1):
                    real = sum(b - a for a, b in tramos[t:t + l])
                    esperada = sum(letras[p:p + k]) / ritmo
                    c = PESO_RITMO * abs(math.log(real / esperada))
                    c += sum(SIN_PAUSA[f] for f in fuerzas[p:p + k - 1])
                    c += sum(PAUSA_SUELTA + PAUSA_SUELTA_POR_S * (tramos[i + 1][0] - tramos[i][1])
                             for i in range(t, t + l - 1))
                    if costo[p][t] + c < costo[p + k][t + l]:
                        costo[p + k][t + l] = costo[p][t] + c
                        desde[p + k][t + l] = (p, t)
    salida, p, t = [], P, S
    while (p, t) != (0, 0):
        pp, tt = desde[p][t]
        salida.append((pp, p, tt, t))
        p, t = pp, tt
    return salida[::-1]


def _a_tiempo_real(tramos, v, al_final=False):
    """Segundos de voz desde el primer tramo → segundo real del MP3. En un borde entre tramos, un
    inicio cae al principio del tramo siguiente y un final (`al_final`) al término del anterior."""
    for a, b in tramos:
        if v < b - a or (al_final and v <= b - a):
            return a + v
        v -= b - a
    return tramos[-1][1]


def alinear(texto, tramos):
    """[{palabra, inicio, fin}] en segundos del MP3."""
    ps = palabras(texto)
    fs, _ = frases(texto)
    salida = []
    for p0, p1, t0, t1 in grupos(texto, tramos):
        suyos = tramos[t0:t1]
        voz = sum(b - a for a, b in suyos)
        indices = [i for f in fs[p0:p1] for i in f]
        pesos = [len(ps[i][0]) + 1 for i in indices]
        total, acum = sum(pesos), 0
        for i, peso in zip(indices, pesos):
            ini = voz * acum / total
            acum += peso
            salida.append({"palabra": ps[i][0],
                           "inicio": round(_a_tiempo_real(suyos, ini), 3),
                           "fin": round(_a_tiempo_real(suyos, voz * acum / total, al_final=True), 3)})
    return salida


def resumen(texto, tramos):
    """Una línea por grupo: segundos, letras por segundo y el texto; marca los ritmos raros."""
    ps = palabras(texto)
    fs, _ = frases(texto)
    lineas = []
    for p0, p1, t0, t1 in grupos(texto, tramos):
        indices = [i for f in fs[p0:p1] for i in f]
        letras = sum(len(ps[i][0]) + 1 for i in indices)
        ritmo = letras / sum(b - a for a, b in tramos[t0:t1])
        marca = "" if 8 <= ritmo <= 23 else "   <- revisar"
        lineas.append(f"  {tramos[t0][0]:6.2f}-{tramos[t1 - 1][1]:6.2f}  {ritmo:4.1f} l/s  "
                      + " ".join(ps[i][0] for i in indices) + marca)
    return lineas


def generar():
    textos = escenas()
    tiempos = json.loads((PROYECTO / "datos" / "tiempos.json").read_text(encoding="utf-8"))
    todo = {}
    for n in range(1, 10):
        mp3 = PROYECTO / "audio" / f"escena-{n}.mp3"
        tramos = tramos_de_voz(silencios(mp3, **AJUSTE[n]), tiempos[n - 1]["voz"])
        todo[str(n)] = alinear(textos[n - 1], tramos)
        print(f"\nEscena {n}: {len(tramos)} tramos de voz")
        print("\n".join(resumen(textos[n - 1], tramos)))
    (PROYECTO / "datos" / "palabras.json").write_text(
        json.dumps(todo, indent=1, ensure_ascii=False), encoding="utf-8")


def anclas(n, pedidas, globales):
    todo = json.loads((PROYECTO / "datos" / "palabras.json").read_text(encoding="utf-8"))
    tiempos = json.loads((PROYECTO / "datos" / "tiempos.json").read_text(encoding="utf-8"))
    base = tiempos[n - 1]["voz_inicio"] if globales else ENTRADA[n]
    salida = {}
    for pedida in pedidas:
        palabra, _, vez = pedida.partition("#")
        veces = [p for p in todo[str(n)] if p["palabra"].lower() == palabra.lower()]
        p = veces[int(vez or 1) - 1]
        salida[pedida] = round(base + p["inicio"], 2)
    print("const W = " + json.dumps(salida, ensure_ascii=False) + ";")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "anclas":
        args = [a for a in sys.argv[3:] if a != "--global"]
        anclas(int(sys.argv[2]), args, "--global" in sys.argv)
    else:
        generar()
