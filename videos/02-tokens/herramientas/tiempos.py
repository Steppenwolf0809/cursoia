"""Duración real de cada MP3 y el plan de tiempos del video."""
import json
import subprocess
import sys
from pathlib import Path

PROYECTO = Path(__file__).resolve().parents[1]
FFPROBE = PROYECTO / "node_modules" / "ffprobe-static" / "bin" / "win32" / "x64" / "ffprobe.exe"
ENTRADA = {1: 0.6, 2: 0.3, 3: 0.3, 4: 0.3, 5: 0.3, 6: 0.3, 7: 0.3, 8: 0.3, 9: 0.3}
COLA = {1: 0.4, 2: 0.5, 3: 0.4, 4: 0.6, 5: 1.0, 6: 0.5, 7: 0.8, 8: 0.6, 9: 2.0}
TOPE = 150.0


def duracion(mp3):
    salida = subprocess.run(
        [str(FFPROBE), "-v", "error", "-show_entries", "format=duration",
         "-of", "default=nw=1:nk=1", str(mp3)],
        capture_output=True, text=True, check=True)
    return round(float(salida.stdout.strip()), 3)


def plan(voces):
    """voces: {escena: segundos}. Filas con segundos globales: inicio, voz_inicio, fin."""
    t, filas = 0.0, []
    for n in range(1, 10):
        voz_inicio = round(t + ENTRADA[n], 3)
        fin = round(voz_inicio + voces[n] + COLA[n], 3)
        filas.append({"escena": n, "inicio": round(t, 3), "voz_inicio": voz_inicio,
                      "voz": voces[n], "fin": fin, "duracion": round(fin - t, 3)})
        t = fin
    return filas


def main():
    voces = {n: duracion(PROYECTO / "audio" / f"escena-{n}.mp3") for n in range(1, 10)}
    filas = plan(voces)
    (PROYECTO / "datos").mkdir(exist_ok=True)
    (PROYECTO / "datos" / "tiempos.json").write_text(json.dumps(filas, indent=2), encoding="utf-8")
    print("| Escena | Voz | Inicio | Voz desde | Fin | Duración |")
    for f in filas:
        print(f"| {f['escena']} | {f['voz']:.2f} | {f['inicio']:.2f} | {f['voz_inicio']:.2f} "
              f"| {f['fin']:.2f} | {f['duracion']:.2f} |")
    total = filas[-1]["fin"]
    print(f"Total: {total:.2f} s")
    if total > TOPE:
        print("Pasa del tope de 150 s: parar y preguntar a José Luis.")
        sys.exit(1)


if __name__ == "__main__":
    main()
