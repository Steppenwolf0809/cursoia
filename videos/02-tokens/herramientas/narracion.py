"""Lee la narración del guion y la parte en palabras, pausas y tokens (o200k_base)."""
import re
from pathlib import Path

import tiktoken

GUION = Path(__file__).resolve().parents[3] / "docs" / "guiones" / "02-tokens.md"
PALABRA = re.compile(r"[\wáéíóúñü]+")  # la misma regla que el guion
_ENC = tiktoken.get_encoding("o200k_base")


def escenas(ruta=GUION):
    """Los 9 textos de la columna «Narración», sin las etiquetas entre corchetes."""
    filas = [l for l in ruta.read_text(encoding="utf-8").splitlines() if re.match(r"\| [1-9] \|", l)]
    textos = []
    for fila in filas:
        texto = re.sub(r"\[[a-z ]+\]", " ", fila.split("|")[3])
        textos.append(re.sub(r"\s+", " ", texto).strip())
    return textos


def palabras(texto):
    """[(palabra, inicio, fin)] con posiciones de carácter dentro de `texto`."""
    return [(m.group(), m.start(), m.end()) for m in PALABRA.finditer(texto)]


def _fuerza(entre):
    if any(c in entre for c in ".?!…"):
        return 3
    if any(c in entre for c in ":;"):
        return 2
    if "," in entre:
        return 1
    return 0


def cortes(texto):
    """Fuerza de la pausa en cada hueco entre palabras seguidas: 0 sin pausa, 3 fin de oración."""
    ps = palabras(texto)
    return [_fuerza(texto[a[2]:b[1]]) for a, b in zip(ps, ps[1:])]


def tokens_por_palabra(texto, con_espacio):
    """Tokens que aporta cada palabra. Un token sin letras (signo, comilla) va a la palabra anterior.

    `con_espacio` antepone un espacio, como se midió el guion para las escenas 2 a 9."""
    fuente = " " + texto if con_espacio else texto
    corr = 1 if con_espacio else 0
    toks = _ENC.encode(fuente)
    _, offs = _ENC.decode_with_offsets(toks)
    ps = palabras(texto)
    cuenta = [0] * len(ps)
    for k, off in enumerate(offs):
        fin = offs[k + 1] if k + 1 < len(offs) else len(fuente)
        trozo = fuente[off:fin] or fuente[off:off + 1]
        letra = next((off + j - corr for j, c in enumerate(trozo) if PALABRA.match(c)), None)
        if letra is None:
            anteriores = [i for i, p in enumerate(ps) if p[1] <= off - corr]
            idx = anteriores[-1] if anteriores else 0
        else:
            idx = next(i for i, p in enumerate(ps) if p[1] <= letra < p[2])
        cuenta[idx] += 1
    return cuenta
