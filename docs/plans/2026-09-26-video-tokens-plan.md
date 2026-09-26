# Video 2 «Tokens» — plan de producción en HyperFrames

> **Para quien ejecuta:** usa `superpowers:subagent-driven-development` (recomendado) o
> `superpowers:executing-plans`. Cada paso tiene casilla `- [ ]`. Lee primero las secciones
> «Paradas», «Tiempos» y «Convenciones»: todas las tareas las dan por sabidas.

**Meta:** el MP4 de 1920×1080 del video 2 de la serie básica, con la narración ya grabada, en
`videos/02-tokens/renders/02-tokens.mp4`.

**Arquitectura:** un proyecto HyperFrames en `videos/02-tokens/`. `index.html` es delgado: monta
un fondo común, las 9 escenas como sub-composiciones en secuencia, el contador de tokens como
sub-composición encima de todo, y las 9 voces como `<audio>`. Los tiempos no se escriben a mano:
salen de tres scripts de Python (duración real de cada MP3, tiempo aproximado de cada palabra,
pasos del contador) que se prueban con `unittest`.

**Herramientas:** HyperFrames 0.8.78 (HTML + GSAP 3.14.2), FFmpeg 6.1.1 y ffprobe 4.0.2 desde
`ffmpeg-static` y `ffprobe-static` dentro del proyecto, Python 3.12 con `tiktoken` (`o200k_base`)
y `unittest` de la librería estándar.

Fuentes de este plan: `docs/guiones/02-tokens.md` (guion aprobado),
`docs/plans/2026-09-26-serie-videos-basicos.md` (serie) y
`docs/prompts/2026-09-26-produccion-video-tokens.md` (encargo).

---

## Reparto

| Paso | Rol | `model` | `effort` | Estado |
|---|---|---|---|---|
| Este plan | planeador | `claude-opus-5-5` | `high` | **Sin medir**: primera corrida de Opus 5.5 como planeador (COMO-TRABAJAR §7). Se da por bueno si la ejecución sale con 0 a 2 tareas emergentes. |
| T0–T17 | ejecutor, en sesión aparte y a la vista | `sonnet` | `medium` | Confirmado para código con plan casi completo. **Sin medir en animación**: nunca hizo HTML+GSAP con juicio visual. Si en la escena piloto (Parada 2) el resultado se ve pobre, se cambia el ejecutor de escenas a `claude-opus-5-5` `medium` y se anota. |
| T18 | revisor | `claude-opus-5-5` | `medium` | **Sin medir en `medium`** (las 13 corridas confirmadas fueron Opus 5 en `high`). |

Es un encargo **grande** (19 tareas, toca generación de video): ceremonia completa.
Tiempo estimado del ejecutor: 30 a 45 min por herramienta (T2–T4), 20 a 40 min por escena,
unas 7 a 9 horas en total, repartidas en dos sesiones: T0–T8 hasta la Parada 2, y T9–T18 después.

## Paradas: preguntar a José Luis antes de seguir

0. **Escena 8 regrabada:** T0 comprueba que `audio/escena-8.mp3` es la grabación nueva, la que
   dice «ciento noventa y nueve palabras». Sin ella no se miden tiempos (T2).
1. **Si HyperFrames pide descargar o instalar algo fuera de `videos/02-tokens/`** (Chrome, un
   modelo, una fuente, una skill en `~/.claude/skills`): preguntar. El Chrome de HyperFrames ya
   está en `~/.cache/hyperframes/chrome`.
2. **Escena piloto (después de T8):** mandarle los snapshots de las escenas 1 y 2 con el
   contador, ya con los colores y las fuentes de las diapositivas que se asignaron en T1. Fijan
   el estilo de los 8 videos. No construir la escena 3 sin su visto bueno.
3. **Vista final (T16):** abrir la vista previa de Studio. Él escucha si las animaciones caen
   sobre la palabra. Solo con su aprobación se renderiza.
4. **Antes de `git add` de cualquier MP3 o MP4:** preguntar si van a git. Mientras tanto,
   `videos/02-tokens/.gitignore` deja fuera `audio/*.mp3` (provisional), y nunca se usa
   `git add -A` ni `git add .`: siempre rutas explícitas.
5. **Si el total pasa de 150 s:** preguntar antes de recortar pausas o escenas.
   Con las duraciones medidas (sección «Tiempos») no pasa.

## Decisiones cerradas (no reabrir)

- Guion y narración aprobados. El audio no se regenera desde código.
- HyperFrames, todo con código, sin imágenes. 1920×1080.
- Contador abajo a la izquierda. Valores al terminar cada escena: 22, 64, 103, 151, 197, 242,
  271, 327, 349 (verificados en esta sesión con `o200k_base` sobre el texto del guion).
- Cortes de token reales en las escenas 2, 3, 4 y 5 (verificados con `o200k_base`). La escena 7
  usa cortes inventados, rotulados «Modelo A / B / C».
- **Paleta: no se decide en este plan** (José Luis, 2026-09-26). Las escenas describen la
  intención del color por roles («fondo oscuro», «acento», «tokens resaltados»); en producción
  los roles toman los colores de las diapositivas del curso (T1). La tipografía sigue la misma
  regla: dos roles, fuente H y fuente M (Convención 6), que se fijan en T1.
- **Escena 8: «ciento noventa y nueve palabras»** (José Luis, 2026-09-26). La primera grabación
  decía «doscientas trece», que no sale con la regla de palabras del guion; se regraba solo esa
  escena. El contador no cambia: las dos frases ocupan los mismos tokens (327 y 349, verificado).
  En pantalla, «199 palabras».
- Sin subtítulos, sin música y sin efectos de sonido: el guion no los pide.
- Ruta de HyperFrames: `general-video`. No `faceless-explainer`, porque el audio ya existe
  (ese flujo genera su propia voz) y el video dura más que su rango de 30–90 s.
  Este plan hace de storyboard aprobado: no se corre la entrevista de `/hyperframes` ni se escribe
  `STORYBOARD.md`.

## Tiempos

Voz medida el 2026-09-26 con ffprobe 4.0.2 (`format=duration`, lo mismo que usa `tiempos.py`).
Decodificando el archivo entero con FFmpeg 6.1.1 sale lo mismo con ±0,03 s. Las estimaciones del
encargo, hechas por tamaño de archivo, estaban un segundo altas por escena. La escena 8 es la
regrabada.

Cada escena dura `ENTRADA + voz + COLA`. `ENTRADA` es el silencio antes de la voz: 0,6 s en la
escena 1 (el tipeo empieza antes) y 0,3 s en las demás. `COLA` es lo que la escena sigue en
pantalla después de la voz, y ahí caben las pausas del guion: 0,4 · 0,5 · 0,4 · 0,6 · 1,0 (giro de
las fichas) · 0,5 · 0,8 (líneas que bajan) · 0,6 · 2,0 (cursor y negro). Las pausas «de 1 s en el
corte» de las escenas 2 y 4 son visuales: la animación se queda quieta mientras la voz sigue.

| Escena | Voz (s) | Inicio | Voz desde | Fin | Duración |
|---|---|---|---|---|---|
| 1 | 6,113 | 0,000 | 0,600 | 7,113 | 7,113 |
| 2 | 13,166 | 7,113 | 7,413 | 21,079 | 13,966 |
| 3 | 10,109 | 21,079 | 21,379 | 31,888 | 10,809 |
| 4 | 14,838 | 31,888 | 32,188 | 47,626 | 15,738 |
| 5 | 13,322 | 47,626 | 47,926 | 62,248 | 14,622 |
| 6 | 16,771 | 62,248 | 62,548 | 79,819 | 17,571 |
| 7 | 9,953 | 79,819 | 80,119 | 90,872 | 11,053 |
| 8 | 16,588 | 90,872 | 91,172 | 108,360 | 17,488 |
| 9 | 7,706 | 108,360 | 108,660 | 118,366 | 10,006 |

**Voz: 108,57 s. Video: 118,366 s**, bajo el tope de 150. Estos son los valores de `index.html`
(T5): `data-start` = Inicio, `data-duration` = Duración, `<audio data-start>` = Voz desde,
`<audio data-duration>` = Voz, `TOTAL` = 118.366. `tiempos.py` (T2) tiene que reproducirlos.

Anclas de la escena 8, globales, ya medidas con el código de T3 (sirven para comprobar T5 y T6):
`contador` 94,07 · `palabras` 100,83 · `tokens#2` 103,42 · `En` 104,30.

## Estructura de archivos

```
videos/02-tokens/
  .gitignore                       audio/*.mp3, provisional hasta la Parada 4 (ya está en git)
  BRIEF.md                     T1  decisiones para cualquier sesión futura de /hyperframes
  frame.md                     T1  especificación de diseño de la serie (normativa)
  index.html                   T5  orquestador: fondo, 9 escenas, contador, 9 voces, fundido
  audio/escena-1.mp3 … -9.mp3      la voz de Horacio (José Luis los copia; no se tocan)
  compositions/
    fondo.html                 T5  color, rejilla, halo; acercamiento de la escena 8
    contador.html              T6  el número; su viaje al centro en la escena 8
    escena-1.html … escena-9.html  T5 (vacías) y T7–T15 (llenas)
  herramientas/
    hf.sh                      T0  envoltorio de la CLI con FFmpeg del proyecto
    narracion.py               T2  lee la narración del guion: palabras, pausas, tokens
    tiempos.py                 T2  duración real de cada MP3 y plan de tiempos
    alinear.py                 T3  tiempo aproximado de cada palabra
    contador.py                T4  pasos del contador; los escribe en contador.html
    test_narracion.py, test_tiempos.py, test_alinear.py, test_contador.py
  datos/
    tiempos.json               T2  generado
    palabras.json              T3  generado
  renders/                         salida del render (no va a git sin preguntar)
```

## Convenciones para todas las composiciones

Leer antes de escribir HTML: `hyperframes-core` (SKILL.md y `references/sub-compositions.md`).

1. **Sub-composición:** todo dentro de `<template>`: `<style>`, marcado y `<script>`. La raíz es
   `<div id="root" data-composition-id="<id>" data-width="1920" data-height="1080">` y se estila
   con `#root`, nunca con una clase. El `data-composition-id` del archivo, el del hueco en
   `index.html` y la clave de `window.__timelines` son el mismo texto.
2. **Scripts en una función que se llama sola** — `(() => { … })();` — en cada sub-composición,
   para que `const tl` de una escena no choque con la de otra en la página armada.
3. **Ids con prefijo del archivo:** `#escena-3-gato`, `#contador-num`. Nunca un id sin prefijo,
   salvo `#root`.
4. **Una sola línea de tiempo** `gsap.timeline({ paused: true })` por archivo. Entradas con
   `fromTo` (estado inicial explícito); si un elemento ya animado vuelve a animarse, el segundo
   `fromTo` lleva `immediateRender: false`. Solo `transform` y `opacity`: nada de tweens de
   `width`, `height`, `top`, `left`, `display` ni `visibility`. Sin `repeat: -1`, sin
   `Math.random`, sin `Date.now`, sin `transition` de CSS.
5. **Texto que cambia en el tiempo** (tipeo, contador): un objeto reloj `{ t: 0 }` animado de
   0 a la duración con `ease: "none"` y `onUpdate` que calcula el estado desde `reloj.t`
   (reglas `discrete-text-sequence` y `counting-dynamic-scale`). Nunca contadores mutables.
6. **Dos fuentes con dos papeles.** En este plan se llaman `FUENTE_H` y `FUENTE_M`; en cada
   archivo se escribe el nombre literal que fijó T1 (no en variables de CSS: así las incrusta el
   compilador).
   - **Fuente H**, la voz humana: preguntas, frases, «palabras». Proporcional.
   - **Fuente M**, la voz de la máquina: tokens, números, contador, rótulos. **Monoespaciada**,
     porque los cortes de las escenas 2 y 7 calculan posiciones con su avance fijo
     (`AVANCE = 0.6` em en IBM Plex Mono, JetBrains Mono y Source Code Pro).
   - Solo pesos que la fuente trae (tabla de `hyperframes-creative/references/typography.md`).
     Donde el plan dice «700» y la fuente no lo tiene, se usa su peso más grueso.
7. **Colores, desde variables** que define `index.html` en `:root`. El plan fija la intención de
   cada rol; T1 le pone el valor sacado de las diapositivas del curso.

   | Rol | Intención |
   |---|---|
   | `--fondo` | oscuro (el guion pide fondo oscuro); el mismo en todas las escenas |
   | `--panel` | un paso más claro que el fondo: caja de chat, paneles |
   | `--linea` | bordes y rejilla sobre el fondo |
   | `--texto` | claro, contraste AA sobre fondo y panel |
   | `--texto-2` | secundario, también AA |
   | `--acento` | lo que llama la vista: contador, cursor, líneas de corte, «token» |
   | `--token-1` … `--token-5` | tokens resaltados: cinco colores claros, distintos entre sí y del acento |
   | `--sobre-token` | texto oscuro sobre los bloques de token, AA sobre los cinco |
8. **Márgenes:** el contenido va dentro de x 192–1728, y 108–972 (zona segura de títulos).
9. **Zona del contador:** el rectángulo x 150–760, y 740–1000 queda libre en todas las escenas
   menos la 8. Ninguna escena pone nada ahí.
10. **Bloques de token:** `font-family: 'FUENTE_M'; font-weight: 700; line-height: 1;
    padding: 20px 26px; border-radius: 14px; color: var(--sobre-token);` con fondo `--token-1`, `--token-2`, `--token-3`,
    `--token-4`, `--token-5` en ese orden, y se repite desde `--token-1` después del quinto. Un bloque que empieza
    con espacio se muestra sin el espacio.
11. **Salida de cada escena:** en sus últimos 0,3 s, el contenedor `#escena-N-contenido` pasa de
    `opacity: 1` a `0`. Excepción: la escena 2 no tiene salida de bloques (corte directo a la 3,
    que empieza con los mismos bloques en el mismo lugar).
12. **Tiempos de palabra:** cada escena declara arriba de su script
    `const W = { … };` pegando la salida de `python herramientas/alinear.py anclas <N> <palabras>`
    (segundos locales de la escena). `D` es el `data-duration` de su hueco en `index.html`.

### Plantilla de escena

```html
<!doctype html>
<html lang="es">
  <head><meta charset="UTF-8" /></head>
  <body>
    <template id="escena-N-template">
      <style>
        #root { position: absolute; inset: 0; overflow: hidden; color: var(--texto); }
        #escena-N-contenido { position: absolute; inset: 0; }
        /* estilos de la escena, con ids escena-N-… */
      </style>
      <div id="root" data-composition-id="escena-N" data-width="1920" data-height="1080">
        <div id="escena-N-contenido">
          <!-- marcado de la escena -->
        </div>
      </div>
      <script>
        (() => {
          const D = 0;          // data-duration del hueco escena-N en index.html
          const W = {};         // salida de: python herramientas/alinear.py anclas N …
          const tl = gsap.timeline({ paused: true });
          // … animaciones de la escena …
          tl.fromTo("#escena-N-contenido", { opacity: 1 },
            { opacity: 0, duration: 0.3, ease: "power1.in", immediateRender: false }, D - 0.3);
          window.__timelines["escena-N"] = tl;
        })();
      </script>
    </template>
  </body>
</html>
```

### Cómo se verifica una escena

Desde `videos/02-tokens/`:

```bash
bash herramientas/hf.sh lint
bash herramientas/hf.sh snapshot --at <t1>,<t2>,<t3>
```

`lint` sin errores. Los snapshots (en `snapshots/`, con una hoja de contacto) se miran uno por
uno contra lo que dice la tarea. Los tiempos `--at` son **globales**: inicio de la escena (columna
«Inicio» de «Tiempos») más el tiempo local. Las escenas 1, 3, 5 y 9 traen además el valor del
contador en cada snapshot y su `check --at`.

**Probado en esta sesión:** un proyecto de prueba armado con el `index.html` (T5), `fondo.html`
(T5), `contador.html` (T6, con los pasos reales de T4) y las escenas 1, 3, 5 y 9 de este plan,
con colores y fuentes de prueba (Inter e IBM Plex Mono), pasó `lint` y `check` sin errores en
todos los tiempos de esas cuatro tareas y en el acercamiento de la escena 8, y los snapshots
mostraron lo que dicen sus tablas. Eso encontró y corrigió tres cosas que ya están arregladas
aquí: el rótulo del contador encimado al número (`margin-top: 36px`), el margen del fondo marcado
como desborde (`data-layout-allow-overflow`) y las caras de la escena 5
(`data-layout-allow-overlap`).

---

## Tareas

### T0: Preparar el entorno

**Archivos:** crear `videos/02-tokens/herramientas/hf.sh`.

El proyecto ya se creó en esta sesión con `hyperframes init` (0.8.78) y tiene `ffmpeg-static` y
`ffprobe-static` en `devDependencies`. Si la sesión corre en otro worktree donde
`videos/02-tokens/hyperframes.json` no existe, primero:

```bash
mkdir -p videos && cd videos && HYPERFRAMES_SKIP_SKILLS=1 npx --yes hyperframes@0.8.78 init 02-tokens --non-interactive --resolution landscape --skip-transcribe
cd 02-tokens && npm install --save-dev ffmpeg-static ffprobe-static
```

- [ ] **Paso 1: Comprobar que los 9 MP3 están en `videos/02-tokens/audio/`.**

```bash
ls -l --time-style=long-iso videos/02-tokens/audio/escena-{1..9}.mp3
```

Esperado: los 9 archivos, con `escena-8.mp3` más reciente que los demás (es la regrabada).
`git status --short videos/02-tokens/audio` no lista nada: el `.gitignore` provisional los deja
fuera.
Si falta alguno, o si la 8 tiene la misma fecha que las otras, parar y preguntar a José Luis
(Parada 0).

- [ ] **Paso 2: Escribir el envoltorio de la CLI.** HyperFrames busca FFmpeg en
  `HYPERFRAMES_FFMPEG_PATH` y `HYPERFRAMES_FFPROBE_PATH` (verificado en el código de la 0.8.78).

```bash
#!/usr/bin/env bash
# Corre la CLI de HyperFrames con el FFmpeg instalado dentro del proyecto.
cd "$(dirname "$0")/.."
export HYPERFRAMES_FFMPEG_PATH="$PWD/node_modules/ffmpeg-static/ffmpeg.exe"
export HYPERFRAMES_FFPROBE_PATH="$PWD/node_modules/ffprobe-static/bin/win32/x64/ffprobe.exe"
export HYPERFRAMES_SKIP_SKILLS=1
exec npx --yes hyperframes@0.8.78 "$@"
```

- [ ] **Paso 3: Leer los archivos que dejó `init`** (`index.html`, `CLAUDE.md`, `AGENTS.md`,
  `package.json`, `meta.json`, `hyperframes.json`) antes de reemplazar `index.html` en T5. Si
  alguno trae datos personales (un correo, un nombre de usuario), preguntar a José Luis antes de
  hacer commit de ese archivo.

- [ ] **Paso 4: Probar la CLI.**

```bash
cd videos/02-tokens && bash herramientas/hf.sh lint
```

Esperado: termina sin errores sobre el `index.html` de la plantilla.

- [ ] **Paso 5: No instalar skills.** `hf.sh` exporta `HYPERFRAMES_SKIP_SKILLS=1`, así que ningún
  comando de la CLI toca `~/.claude/skills`. El plan no necesita la skill `general-video`: usa las
  de dominio que ya están instaladas (`hyperframes-core`, `hyperframes-animation`,
  `hyperframes-cli`, `hyperframes-creative`). Si algo pide instalar o actualizar skills, parar y
  preguntar a José Luis (Parada 1). Todos los comandos de HyperFrames van por `hf.sh`, nunca con
  `npx hyperframes` a secas.

- [ ] **Paso 6: Commit.**

```bash
git add videos/02-tokens/herramientas/hf.sh videos/02-tokens/package.json videos/02-tokens/package-lock.json videos/02-tokens/hyperframes.json videos/02-tokens/meta.json videos/02-tokens/CLAUDE.md videos/02-tokens/AGENTS.md
git commit -m "chore(videos): proyecto HyperFrames del video 2 con FFmpeg local"
```

### T1: BRIEF.md y frame.md

**Archivos:** crear `videos/02-tokens/BRIEF.md` y `videos/02-tokens/frame.md`.

- [ ] **Paso 1: Escribir `BRIEF.md`.**

```markdown
---
workflow: general-video
flow: automation
storyboard: no
message: "La IA no lee palabras: corta el texto en tokens y trabaja con sus números"
destination: desktop
aspect: 1920x1080
language: es
audience: "Estudiantes del curso básico de IA; se proyecta en clase"
length: 118s
narration: yes
---

## Intent

Video 2 de la serie básica. Explica qué es un token con una pregunta espejo
(«¿La IA lee palabras?» → «No. Lee tokens.▌») y un contador de tokens fijo en la esquina.

## Assets

- audio/escena-1.mp3 … audio/escena-9.mp3 — voz de Horacio (Eleven v3), una por escena. No se regeneran.

## Notes

- El plan de producción es docs/plans/2026-09-26-video-tokens-plan.md y manda sobre el flujo por defecto.
- El guion es docs/guiones/02-tokens.md. Sin subtítulos, música ni efectos.
```

- [ ] **Paso 2: Asignar los roles desde las diapositivas del curso.** Leer la paleta y las fuentes
  de las diapositivas: el curso básico en `client/tailwind.config.js` (`colors`, `fontFamily`) y
  `client/src/index.css`; el avanzado en `client/src/tema-avanzado.css`. La serie es del básico,
  así que se parte de esas. A cada rol de la Convención 7 se le da un color de las diapositivas
  que cumpla su intención; si un rol no tiene color en las diapositivas (los cinco de token, por
  ejemplo), se deriva de ellos y se anota de cuál. Lo mismo con las fuentes H y M
  (Convención 6). Una fuente que no esté en la tabla de fuentes incluidas de
  `hyperframes-creative/references/typography.md` necesita su archivo dentro del proyecto con
  `@font-face`: eso es una descarga, así que Parada 1. Comprobar el contraste AA de `--texto`,
  `--texto-2` y `--acento` sobre `--fondo` y `--panel`, y de `--sobre-token` sobre los cinco
  colores de token; anotar las razones de contraste en `frame.md`.

- [ ] **Paso 3: Escribir `frame.md`** con lo del paso 2: frontmatter con `colors` (un hex por
  rol) y `typography` (fuente H y fuente M con sus pesos), y el cuerpo con la procedencia de cada
  valor, las dos voces, la zona del contador y los bloques de token (Convenciones 6, 7, 9 y 10).
  José Luis lo ve aplicado en la Parada 2.

- [ ] **Paso 4: Commit.**

```bash
git add videos/02-tokens/BRIEF.md videos/02-tokens/frame.md
git commit -m "docs(videos): brief y especificación de diseño del video 2"
```

### T2: Narración y tiempos

**Archivos:** crear `videos/02-tokens/herramientas/narracion.py`, `tiempos.py`,
`test_narracion.py`, `test_tiempos.py`. Genera `videos/02-tokens/datos/tiempos.json`.

- [ ] **Paso 1: Escribir las pruebas que fallan.**

`videos/02-tokens/herramientas/test_narracion.py`:

```python
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
```

`videos/02-tokens/herramientas/test_tiempos.py`:

```python
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
```

- [ ] **Paso 2: Correrlas y ver el rojo.**

```bash
cd videos/02-tokens/herramientas && python -m unittest -v test_narracion test_tiempos
```

Esperado: `ModuleNotFoundError: No module named 'narracion'`. Pegar el rojo en el informe.

- [ ] **Paso 3: Escribir `narracion.py`.**

```python
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
```

- [ ] **Paso 4: Escribir `tiempos.py`.** `ENTRADA` es el silencio antes de la voz en cada escena;
  `COLA`, lo que la escena sigue en pantalla después de la voz (las pausas del guion).

```python
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
```

- [ ] **Paso 5: Correr las pruebas y ver el verde.**

```bash
cd videos/02-tokens/herramientas && python -m unittest -v test_narracion test_tiempos
```

Esperado: 8 pruebas, `OK`.

- [ ] **Paso 6: Generar `datos/tiempos.json` y comparar con «Tiempos».**

```bash
cd videos/02-tokens && python herramientas/tiempos.py
```

Esperado: la misma tabla y el mismo total que la sección «Tiempos» de este plan. Si difieren en
más de 0,05 s, parar: alguien cambió un MP3.

- [ ] **Paso 7: Commit.**

```bash
git add videos/02-tokens/herramientas/narracion.py videos/02-tokens/herramientas/tiempos.py videos/02-tokens/herramientas/test_narracion.py videos/02-tokens/herramientas/test_tiempos.py videos/02-tokens/datos/tiempos.json
git commit -m "feat(videos): narración, tokens por palabra y tiempos del video 2"
```

### T3: Tiempo de cada palabra

**Archivos:** crear `videos/02-tokens/herramientas/alinear.py` y `test_alinear.py`. Genera
`videos/02-tokens/datos/palabras.json`.

Método, sin descargar modelos de voz. FFmpeg `silencedetect` da los tramos con voz de cada MP3
y el texto se parte en frases por la puntuación. Una programación dinámica agrupa frases y tramos
seguidos (k frases con l tramos) buscando que cada grupo dure lo que piden sus letras al ritmo
medio de la escena. Castiga los cortes de frase sin pausa y las pausas que no caen en un corte.
Dentro de cada grupo, las palabras se reparten el tiempo con voz según sus letras.

**Probado en esta sesión con los 9 MP3 reales:** todos los grupos quedan entre 9 y 21 letras/s.
Una versión anterior unía tramos por cercanía, y en la escena 6 metía «quien usa la IA a gran
escala paga por token» en 0,4 s; por eso la prueba `test_elige_por_ritmo_y_no_por_cercania`.
Precisión esperada dentro de un grupo: ±0,3 s. En la escena 4, la risa queda dentro del grupo
«Otorrinolaringólogo se corta en cinco», así que «corta» puede salir hasta 1 s antes de tiempo:
el corte visual cae durante la risa, y eso sirve. José Luis juzga la sincronía de oído en la
Parada 3.

- [ ] **Paso 1: Escribir las pruebas que fallan.**

```python
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
```

- [ ] **Paso 2: Correrlas y ver el rojo.**

```bash
cd videos/02-tokens/herramientas && python -m unittest -v test_alinear
```

Esperado: `ModuleNotFoundError: No module named 'alinear'`.

- [ ] **Paso 3: Escribir `alinear.py`.**

```python
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
```

- [ ] **Paso 4: Correr las pruebas y ver el verde.**

```bash
cd videos/02-tokens/herramientas && python -m unittest -v test_alinear
```

Esperado: 7 pruebas, `OK`.

- [ ] **Paso 5: Generar `datos/palabras.json` y comparar los grupos.**

```bash
cd videos/02-tokens && PYTHONIOENCODING=utf-8 python herramientas/alinear.py
```

Esperado: ningún `<- revisar`, y estos grupos (medidos en esta sesión; ±0,05 s):

| Escena | Tramos | Grupos (segundo de inicio en el MP3 → primeras palabras) |
|---|---|---|
| 1 | 3 | 0,00 La inteligencia… · 2,63 como las lees tú · 4,04 Mira lo que pasa… |
| 2 | 8 | 0,00 Escribes · 1,21 El gato duerme · 2,86 Tú ves tres palabras · 4,75 Pero la IA… · 7,86 corta el texto… · 9,77 Cada pedazo… · 11,89 Aquí hay cinco |
| 3 | 5 | 0,00 Gato es una palabra común · 2,15 así que queda entera · 3,72 un solo token · 5,22 Duerme se parte en dos · 7,48 Y hasta el punto final… |
| 4 | 7 | 0,00 Mientras más rara… · 4,56 Otorrinolaringólogo se corta en cinco · 8,65 Y esta frase · 9,74 Mi ñaño… · 11,51 tiene cinco palabras · 13,32 pero diez tokens |
| 5 | 6 | 0,00 Y para qué cortar · 1,55 Porque la IA… · 4,14 trabaja con números · 5,82 Cada token… · 8,00 como una ficha… · 9,67 Lo que de verdad… |
| 6 | 9 | 0,00 Esto importa… · 2,83 Primero · 3,54 el límite · 4,70 la IA solo puede… · 9,45 Segundo · 10,32 el costo · 11,48 quien usa la IA… · 15,63 no por palabra |
| 7 | 6 | 0,00 Un detalle más · 1,42 cada modelo… · 3,76 ChatGPT · 4,80 Claude y Gemini… · 8,48 Pero todos cortan |
| 8 | 6 | 0,00 Este mismo video… · 2,52 Mira el contador… · 4,58 cuenta los tokens… · 7,59 Hasta aquí van… · 10,72 y doscientos setenta y un tokens · 13,13 En español… |
| 9 | 5 | 0,00 Entonces · 1,02 la IA lee palabras · 3,10 No · 3,83 Lee tokens · 5,25 pedazos de palabras… |

Si algo no coincide, parar: cambió un MP3 o el guion.

- [ ] **Paso 6: Commit.**

```bash
git add videos/02-tokens/herramientas/alinear.py videos/02-tokens/herramientas/test_alinear.py videos/02-tokens/datos/palabras.json
git commit -m "feat(videos): tiempo aproximado de cada palabra del video 2"
```

### T4: Pasos del contador

**Archivos:** crear `videos/02-tokens/herramientas/contador.py` y `test_contador.py`.

Regla: el contador suma los tokens de cada palabra al terminar de decirla. En la escena 8 se
congela en 271 hasta que termina «…setenta y un tokens.»; los 56 tokens de la escena 8 suben en
rampa pareja desde que el contador vuelve a su esquina (1 s después de empezar «En español»)
hasta el final de la última palabra, con 1,2 s como mínimo.

- [ ] **Paso 1: Escribir las pruebas que fallan.**

```python
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
```

- [ ] **Paso 2: Correrlas y ver el rojo.**

```bash
cd videos/02-tokens/herramientas && python -m unittest -v test_contador
```

Esperado: `ModuleNotFoundError: No module named 'contador'`.

- [ ] **Paso 3: Escribir `contador.py`.**

```python
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
```

- [ ] **Paso 4: Correr toda la suite y ver el verde.**

```bash
cd videos/02-tokens/herramientas && python -m unittest -v
```

Esperado: 19 pruebas, `OK`.

- [ ] **Paso 5: Commit.**

```bash
git add videos/02-tokens/herramientas/contador.py videos/02-tokens/herramientas/test_contador.py
git commit -m "feat(videos): pasos del contador de tokens"
```

### T5: `index.html`, fondo y escenas vacías

**Archivos:** reemplazar `videos/02-tokens/index.html`; crear `compositions/fondo.html` y
`compositions/escena-1.html` … `escena-9.html` con la plantilla de escena (sin contenido,
`W = {}`, el `D` de su hueco).

- [ ] **Paso 1: Escribir `index.html`.** Los números son los de la tabla «Tiempos», que
  `datos/tiempos.json` (T2) tiene que reproducir. Si difieren, manda `tiempos.json` y hay que avisar.

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <title>Tokens — video 2</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      :root {
        /* Los valores de frame.md (T1): los mismos hex, sin redondear */
        --fondo: ; --panel: ; --linea: ;
        --texto: ; --texto-2: ; --acento: ;
        --token-1: ; --token-2: ; --token-3: ; --token-4: ; --token-5: ;
        --sobre-token: ;
      }
      body { margin: 0; background: var(--fondo); }
      #root { position: relative; width: 100%; height: 100%; overflow: hidden; background: var(--fondo); }
      #root > div[data-composition-src] { position: absolute; inset: 0; }
      #el-fondo { z-index: 0; }
      .escena { z-index: 1; }
      #el-contador { z-index: 2; }
      #negro { position: absolute; inset: 0; background: #000; opacity: 0; z-index: 3; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="tokens" data-start="0" data-width="1920" data-height="1080" data-duration="118.366">
      <div id="el-fondo" data-composition-id="fondo" data-composition-src="compositions/fondo.html"
        data-start="0" data-duration="118.366" data-track-index="0" data-track-kind="graphics"
        data-width="1920" data-height="1080"></div>

      <div id="el-escena-1" class="escena" data-composition-id="escena-1" data-composition-src="compositions/escena-1.html"
        data-start="0.000" data-duration="7.113" data-track-index="1" data-track-kind="graphics"
        data-width="1920" data-height="1080"></div>
      <div id="el-escena-2" class="escena" data-composition-id="escena-2" data-composition-src="compositions/escena-2.html"
        data-start="7.113" data-duration="13.966" data-track-index="1" data-track-kind="graphics"
        data-width="1920" data-height="1080"></div>
      <div id="el-escena-3" class="escena" data-composition-id="escena-3" data-composition-src="compositions/escena-3.html"
        data-start="21.079" data-duration="10.809" data-track-index="1" data-track-kind="graphics"
        data-width="1920" data-height="1080"></div>
      <div id="el-escena-4" class="escena" data-composition-id="escena-4" data-composition-src="compositions/escena-4.html"
        data-start="31.888" data-duration="15.738" data-track-index="1" data-track-kind="graphics"
        data-width="1920" data-height="1080"></div>
      <div id="el-escena-5" class="escena" data-composition-id="escena-5" data-composition-src="compositions/escena-5.html"
        data-start="47.626" data-duration="14.622" data-track-index="1" data-track-kind="graphics"
        data-width="1920" data-height="1080"></div>
      <div id="el-escena-6" class="escena" data-composition-id="escena-6" data-composition-src="compositions/escena-6.html"
        data-start="62.248" data-duration="17.571" data-track-index="1" data-track-kind="graphics"
        data-width="1920" data-height="1080"></div>
      <div id="el-escena-7" class="escena" data-composition-id="escena-7" data-composition-src="compositions/escena-7.html"
        data-start="79.819" data-duration="11.053" data-track-index="1" data-track-kind="graphics"
        data-width="1920" data-height="1080"></div>
      <div id="el-escena-8" class="escena" data-composition-id="escena-8" data-composition-src="compositions/escena-8.html"
        data-start="90.872" data-duration="17.488" data-track-index="1" data-track-kind="graphics"
        data-width="1920" data-height="1080"></div>
      <div id="el-escena-9" class="escena" data-composition-id="escena-9" data-composition-src="compositions/escena-9.html"
        data-start="108.360" data-duration="10.006" data-track-index="1" data-track-kind="graphics"
        data-width="1920" data-height="1080"></div>

      <div id="el-contador" data-composition-id="contador" data-composition-src="compositions/contador.html"
        data-start="0" data-duration="118.366" data-track-index="2" data-track-kind="graphics"
        data-width="1920" data-height="1080"></div>

      <audio id="voz-1" src="audio/escena-1.mp3" data-start="0.600" data-duration="6.113"
        data-track-index="10" data-volume="1"></audio>
      <audio id="voz-2" src="audio/escena-2.mp3" data-start="7.413" data-duration="13.166"
        data-track-index="10" data-volume="1"></audio>
      <audio id="voz-3" src="audio/escena-3.mp3" data-start="21.379" data-duration="10.109"
        data-track-index="10" data-volume="1"></audio>
      <audio id="voz-4" src="audio/escena-4.mp3" data-start="32.188" data-duration="14.838"
        data-track-index="10" data-volume="1"></audio>
      <audio id="voz-5" src="audio/escena-5.mp3" data-start="47.926" data-duration="13.322"
        data-track-index="10" data-volume="1"></audio>
      <audio id="voz-6" src="audio/escena-6.mp3" data-start="62.548" data-duration="16.771"
        data-track-index="10" data-volume="1"></audio>
      <audio id="voz-7" src="audio/escena-7.mp3" data-start="80.119" data-duration="9.953"
        data-track-index="10" data-volume="1"></audio>
      <audio id="voz-8" src="audio/escena-8.mp3" data-start="91.172" data-duration="16.588"
        data-track-index="10" data-volume="1"></audio>
      <audio id="voz-9" src="audio/escena-9.mp3" data-start="108.660" data-duration="7.706"
        data-track-index="10" data-volume="1"></audio>

      <div id="negro"></div>
    </div>
    <script>
      (() => {
        const TOTAL = 118.366; // el fin de la escena 9
        const tl = gsap.timeline({ paused: true });
        tl.fromTo("#negro", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power1.in" }, TOTAL - 0.5);
        window.__timelines["tokens"] = tl;
      })();
    </script>
  </body>
</html>
```


- [ ] **Paso 2: Escribir `compositions/fondo.html`.** `ACERCA` y `ALEJA` ya van puestos;
  comprobar que coinciden con `python herramientas/alinear.py anclas 8 contador En --global`.

```html
<!doctype html>
<html lang="es">
  <head><meta charset="UTF-8" /></head>
  <body>
    <template id="fondo-template">
      <style>
        #root { position: absolute; inset: 0; overflow: hidden; background: var(--fondo); }
        #fondo-mundo { position: absolute; inset: -120px; }
        #fondo-rejilla {
          position: absolute; inset: 0;
          background:
            linear-gradient(color-mix(in srgb, var(--texto) 5%, transparent) 2px, transparent 2px) 0 0 / 96px 96px,
            linear-gradient(90deg, color-mix(in srgb, var(--texto) 5%, transparent) 2px, transparent 2px) 0 0 / 96px 96px;
        }
        #fondo-halo {
          position: absolute; width: 1800px; height: 1040px; right: -300px; top: -440px;
          background: radial-gradient(closest-side, color-mix(in srgb, var(--acento) 18%, transparent), transparent);
        }
      </style>
      <div id="root" data-composition-id="fondo" data-width="1920" data-height="1080">
        <div id="fondo-mundo" data-layout-allow-overflow>
          <div id="fondo-rejilla"></div>
          <div id="fondo-halo"></div>
        </div>
      </div>
      <script>
        (() => {
          const TOTAL = 118.366; // data-duration del hueco
          const ACERCA = 94.07;  // global: escena 8, «contador»
          const ALEJA = 104.3;   // global: escena 8, «En»
          const tl = gsap.timeline({ paused: true });
          const ciclos = Math.floor(TOTAL / 6);
          tl.fromTo("#fondo-halo", { scale: 1, opacity: 0.85 },
            { scale: 1.08, opacity: 1, duration: 3, ease: "sine.inOut", yoyo: true, repeat: ciclos * 2 - 1 }, 0);
          tl.fromTo("#fondo-rejilla", { x: 0, y: 0 }, { x: -96, y: -96, duration: TOTAL, ease: "none" }, 0);
          tl.fromTo("#fondo-mundo", { scale: 1 }, { scale: 1.06, duration: 1, ease: "power3.inOut" }, ACERCA);
          tl.fromTo("#fondo-mundo", { scale: 1.06 },
            { scale: 1, duration: 1, ease: "power3.inOut", immediateRender: false }, ALEJA);
          window.__timelines["fondo"] = tl;
        })();
      </script>
    </template>
  </body>
</html>
```

- [ ] **Paso 3: Escribir las 9 escenas vacías** con la plantilla y un `compositions/contador.html`
  provisional con la plantilla de escena y `data-composition-id="contador"` (T6 lo reemplaza).

- [ ] **Paso 4: Verificar.**

```bash
cd videos/02-tokens && bash herramientas/hf.sh check
```

Esperado: 0 errores. Un snapshot en `--at 1,60,117` muestra el fondo con rejilla y halo, sin
nada más. Oír la vista previa no hace falta todavía.

- [ ] **Paso 5: Commit.**

```bash
git add videos/02-tokens/index.html videos/02-tokens/compositions
git commit -m "feat(videos): orquestador del video 2 con fondo y escenas vacías"
```

### T6: Contador

**Archivos:** reemplazar `videos/02-tokens/compositions/contador.html`.

Reglas: `counting-dynamic-scale` (tabular, `Math.round`, sin rebote en el número) y
`coordinate-target-zoom` (viaje al centro con escala desde una esquina).

- [ ] **Paso 1: Escribir `contador.html`.** `W8` ya va puesto; comprobar que coincide con
  `python herramientas/alinear.py anclas 8 contador palabras tokens#2 En --global`.

```html
<!doctype html>
<html lang="es">
  <head><meta charset="UTF-8" /></head>
  <body>
    <template id="contador-template">
      <style>
        #root { position: absolute; inset: 0; pointer-events: none; }
        #contador-caja { position: absolute; left: 192px; bottom: 108px; transform-origin: 0% 100%; }
        #contador-rotulo {
          font-family: 'FUENTE_M'; font-weight: 400; font-size: 30px;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--texto-2);
        }
        #contador-num {
          font-family: 'FUENTE_M'; font-weight: 700; font-size: 176px; line-height: 1;
          margin-top: 36px; color: var(--acento); font-variant-numeric: tabular-nums; width: 3.2ch;
        }
        #contador-palabras {
          position: absolute; left: 192px; top: 560px; white-space: nowrap;
          font-family: 'FUENTE_H'; font-size: 64px; line-height: 1.05; color: var(--texto); opacity: 0;
        }
      </style>
      <div id="root" data-composition-id="contador" data-width="1920" data-height="1080">
        <div id="contador-caja">
          <div id="contador-rotulo">tokens</div>
          <div id="contador-num">0</div>
        </div>
        <div id="contador-palabras">199 palabras</div>
      </div>
      <script>
        (() => {
          /* PASOS:INICIO */ const PASOS = [[0,0]]; /* PASOS:FIN */
          const TOTAL = 118.366; // data-duration del hueco
          const W8 = {"contador": 94.07, "palabras": 100.83, "tokens#2": 103.42, "En": 104.3};
          const num = document.getElementById("contador-num");
          let pintado = -1;
          function pintar(t) {
            let lo = 0, hi = PASOS.length - 1;
            while (lo < hi) {
              const mid = (lo + hi + 1) >> 1;
              if (PASOS[mid][0] <= t) lo = mid; else hi = mid - 1;
            }
            const v = PASOS[lo][1];
            if (v !== pintado) { num.textContent = String(v); pintado = v; }
          }
          const tl = gsap.timeline({ paused: true });
          const reloj = { t: 0 };
          tl.fromTo(reloj, { t: 0 }, { t: TOTAL, duration: TOTAL, ease: "none", onUpdate: () => pintar(reloj.t) }, 0);
          // Escena 8: al centro, rótulo de palabras, pulso en «tokens», y de vuelta
          tl.fromTo("#contador-caja", { x: 0, y: 0, scale: 1 },
            { x: 600, y: -300, scale: 2.2, duration: 1, ease: "power3.inOut" }, W8.contador);
          tl.fromTo("#contador-palabras", { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, W8.palabras);
          tl.fromTo("#contador-num", { scale: 1 },
            { scale: 1.06, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }, W8["tokens#2"]);
          tl.fromTo("#contador-palabras", { opacity: 1 },
            { opacity: 0, duration: 0.3, immediateRender: false }, W8.En);
          tl.fromTo("#contador-caja", { x: 600, y: -300, scale: 2.2 },
            { x: 0, y: 0, scale: 1, duration: 1, ease: "power3.inOut", immediateRender: false }, W8.En);
          pintar(0);
          window.__timelines["contador"] = tl;
        })();
      </script>
    </template>
  </body>
</html>
```

- [ ] **Paso 2: Escribir los pasos en el archivo.**

```bash
cd videos/02-tokens && python herramientas/contador.py
```

Esperado: «Escena 1: termina en 22» … «Escena 9: termina en 349».

- [ ] **Paso 3: Verificar con snapshots.** Tiempos globales: el `fin` de cada escena menos 0,1 s,
  y dos momentos de la escena 8 (1,5 s después de `W8.contador`, y 0,3 s después de `W8.En`).

```bash
cd videos/02-tokens && bash herramientas/hf.sh check && bash herramientas/hf.sh snapshot --at <fin1-0.1>,<fin4-0.1>,<fin7-0.1>,<W8.contador+1.5>,<fin9-0.8>
```

Esperado: el número abajo a la izquierda dice 22, 151 y 271; en el cuarto snapshot está grande,
a la derecha del centro, dice 271 y a su izquierda se lee «… palabras» sin tocarse; en el
último dice 349. Si el rótulo y el número se tocan, mover `#contador-palabras` (no el contador).

- [ ] **Paso 4: Commit.**

```bash
git add videos/02-tokens/compositions/contador.html
git commit -m "feat(videos): contador de tokens que sube con la voz"
```

### T7: Escena 1 — la pregunta

**Archivo:** `compositions/escena-1.html` (reemplazar el esqueleto de T5). HTML tomado del plan
paralelo, adaptado a los roles de color, a la fuente H y a los tiempos reales. Escena global
0,000 → 7,113; voz local 0,600 → 6,713. La pregunta se escribe mientras la voz dice «¿La
inteligencia artificial lee palabras», y el cursor parpadea toda la escena.

El cursor es un bloque de color (`--acento`), no el carácter «▌»: así no depende de que la fuente
H traiga ese glifo. Si `check` marca que la línea se sale del cuadro con la fuente H elegida,
bajar el tamaño a 120px aquí y en la escena 9 por igual (tienen que coincidir).

- [ ] **Paso 1: reemplazar el archivo.**

```html
<!doctype html>
<html lang="es">
  <head><meta charset="UTF-8" /></head>
  <body>
    <template id="escena-1-template">
      <style>
        #root { position: absolute; inset: 0; overflow: hidden; color: var(--texto); }
        #escena-1-contenido { position: absolute; inset: 0; }
        #escena-1-linea { position: absolute; left: 192px; top: 420px; display: flex; align-items: baseline; }
        #escena-1-texto {
          font-family: 'FUENTE_H'; font-weight: 700; font-size: 132px; line-height: 1.05;
          letter-spacing: -0.03em; color: var(--texto); white-space: pre;
        }
        #escena-1-cursor { display: inline-block; width: 60px; height: 106px; margin-left: 10px; background: var(--acento); }
      </style>
      <div id="root" data-composition-id="escena-1" data-width="1920" data-height="1080">
        <div id="escena-1-contenido">
          <div id="escena-1-linea"><span id="escena-1-texto"></span><span id="escena-1-cursor"></span></div>
        </div>
      </div>
      <script>
        (() => {
          const D = 7.113;
          const W = {"La": 0.6, "como": 3.23}; // anclas 1 La como
          const TEXTO = "¿La IA lee palabras?";
          const el = document.getElementById("escena-1-texto");
          const st = { n: 0 };
          const tl = gsap.timeline({ paused: true });
          // Cursor: 0,4 s encendido y 0,4 s apagado toda la escena (17 medios ciclos = 6,8 s).
          tl.fromTo("#escena-1-cursor", { opacity: 1 },
            { opacity: 0, duration: 0.4, ease: "steps(1)", repeat: 16, yoyo: true }, 0);
          // 20 caracteres desde «La» hasta 0,2 s antes de «como» (2,43 s).
          tl.fromTo(st, { n: 0 }, { n: TEXTO.length, duration: W.como - 0.2 - W.La, ease: "none", snap: "n",
            onUpdate: () => { el.textContent = TEXTO.slice(0, st.n); } }, W.La);
          tl.fromTo("#escena-1-contenido", { opacity: 1 },
            { opacity: 0, duration: 0.3, ease: "power1.in", immediateRender: false }, D - 0.3);
          window.__timelines["escena-1"] = tl;
        })();
      </script>
    </template>
  </body>
</html>
```

- [ ] **Paso 2: snapshots** (la escena empieza en 0, así que global = local):

```bash
cd videos/02-tokens && bash herramientas/hf.sh snapshot --at 1.5,3.5,6.5 --no-end
```

| Global | Se ve | Contador |
|---|---|---|
| 1,5 | «¿La IA» a medio escribir, con cursor | 2 |
| 3,5 | «¿La IA lee palabras?» completa, con cursor | 8 |
| 6,5 | igual | 20 |

Los valores del contador son los de los pasos de T6 con la alineación de T3; si `palabras.json`
salió distinto de la tabla de T3, se aceptan ±2.

- [ ] **Paso 3: `check`** (0 errores):

```bash
cd videos/02-tokens && bash herramientas/hf.sh check --at 1.5,3.5,6.5
```

- [ ] **Paso 4: commit.**

```bash
git add videos/02-tokens/compositions/escena-1.html
git commit -m "feat(videos): escena 1, la pregunta espejo"
```

### T8: Escena 2 — «El gato duerme.» se corta en cinco

**Archivo:** `compositions/escena-2.html`. Reglas: `prompt-type-submit-generate` (caja de chat),
`discrete-text-sequence` (tipeo), `spring-pop-entrance` (etiquetas).
Anclas: `python herramientas/alinear.py anclas 2 El gato duerme tres corta token cinco`.

| Elemento | Posición | Estilo |
|---|---|---|
| `#escena-2-chat`, caja | `left: 192px; top: 110px; width: 1100px; padding: 44px 56px` | fondo `--panel`, borde 3px `--linea`, radio 22px |
| `#escena-2-frase`, dentro de la caja | — | fuente H 96px, `--texto` |
| `#escena-2-palabras` «3 palabras», bajo la frase | — | fuente H 44px, `--texto-2` |
| `#escena-2-fila`, 5 bloques `El` `gato` `duer` `me` `.` | `left: 192px; top: 470px`, `display: flex; gap: 16px` | bloque de token 88px (Convención 10) |
| `#escena-2-linea`, línea de corte | barre la fila de izquierda a derecha | 6px × 170px, `--acento` |
| `#escena-2-etiqueta` «token ↓», sobre `gato` | `left: 318px; top: 406px` | fuente M 400 34px, `--acento` |
| `#escena-2-total` «5 tokens» | `left: 1360px; top: 500px` | fuente M 700 60px, `--texto` |

Momentos:

1. Desde `W.El` hasta `W.duerme + 0.4`: la frase se escribe letra por letra en la caja (reloj,
   como la escena 1).
2. `W.tres`: aparece «3 palabras» (`fromTo` opacity 0→1, y 16→0, 0,35 s, `back.out(1.6)`).
3. `W.corta - 0.4`: aparece en la fila el texto plano «El gato duerme.» en fuente M 700 88px,
   `--texto`, sin fondos. Son los mismos 5 bloques con el fondo transparente y corridos en x para
   que su texto quede donde estaría en el texto corrido. La fuente M es monoespaciada: cada
   carácter mide `AVANCE × 88` px (Convención 6), así que el corrimiento de cada bloque es una
   cuenta con constantes, sin medir el DOM:

```js
const AVANCE = 0.6; // el de la fuente M fijada en T1
const CH = AVANCE * 88, PAD = 26, GAP = 16;
const PIEZAS = [["El", 0], ["gato", 3], ["duer", 8], ["me", 12], [".", 14]]; // [texto, columna en «El gato duerme.»]
let x = 0;
const DX = PIEZAS.map(([txt, col]) => {
  const finalTexto = x + PAD;                 // dónde queda el texto del bloque separado
  x += txt.length * CH + 2 * PAD + GAP;
  return col * CH - finalTexto;               // corrimiento para que parezca texto corrido
});
```

   Cada bloque tiene un hijo `.escena-2-relleno` (`position:absolute; inset:0; border-radius:14px`,
   con el color del bloque) que empieza en `opacity: 0`; el texto va encima.
4. `W.corta`: la línea barre la fila en 0,8 s (`x` de 150 a 1320, `ease: "power1.inOut"`). Cada
   bloque, cuando la línea pasa por él (`W.corta + 0.8 × k / 5`), va de `x: DX[k]` a `x: 0` y su
   relleno de 0 a 1 en 0,3 s (`power2.out`). Al final la línea se desvanece.
5. Del final del corte a `W.token`: quieto, al menos 1 s (la pausa del guion).
6. `W.token`: aparece «token ↓» sobre `gato` (`spring-pop-entrance`).
7. `W.cinco`: aparece «5 tokens».
8. Salida: en `D - 0.4` se desvanecen la caja, «token ↓» y «5 tokens» (0,3 s). Los bloques se
   quedan: la escena 3 empieza con ellos en el mismo lugar.

- [ ] **Paso 1:** escribir la escena.
- [ ] **Paso 2:** `lint` sin errores.
- [ ] **Paso 3:** snapshots en tiempos globales de `W.tres + 0.5`, `W.corta + 0.2`,
  `W.cinco + 0.5` y `fin2 - 0.1`. Esperado: caja con frase y «3 palabras»; la línea a medio
  barrer, con bloques ya coloreados a su izquierda y texto corrido a su derecha; los 5 bloques con
  «token ↓» y «5 tokens»; al final, solo los 5 bloques y el contador (64).
- [ ] **Paso 4:** commit `feat(videos): escena 2, el corte en tokens`.

### Parada 2: escena piloto

- [ ] Correr `bash herramientas/hf.sh check` (0 errores) y mandar a José Luis los snapshots de
  T7 y T8. Preguntar si el estilo queda para toda la serie. No seguir con T9 sin su respuesta.
  Si pide cambios de estilo, se cambian en `frame.md`, `index.html` y en las escenas 1 y 2 antes
  de seguir.

### T9: Escena 3 — gato entero, duerme partido, el punto cuenta

**Archivo:** `compositions/escena-3.html`. HTML tomado del plan paralelo, adaptado a los roles, a
la fuente M, a los tiempos reales y a la fila de la escena 2 de este plan. Escena global
21,079 → 31,888; voz local 0,300 → 10,154. Los bloques arrancan exactamente donde los dejó la
escena 2: `left: 192px; top: 470px`, `gap: 16px`, bloque de la Convención 10.

- [ ] **Paso 1: reemplazar el archivo.**

```html
<!doctype html>
<html lang="es">
  <head><meta charset="UTF-8" /></head>
  <body>
    <template id="escena-3-template">
      <style>
        #root { position: absolute; inset: 0; overflow: hidden; color: var(--texto); }
        #escena-3-contenido { position: absolute; inset: 0; }
        /* Misma fila, mismo lugar y mismos bloques que el final de la escena 2 */
        #escena-3-bloques { position: absolute; left: 192px; top: 470px; display: flex; gap: 16px; }
        .escena-3-tok {
          position: relative; display: inline-block;
          font-family: 'FUENTE_M'; font-weight: 700; font-size: 88px; line-height: 1;
          padding: 20px 26px; border-radius: 14px; color: var(--sobre-token); white-space: pre;
        }
        .escena-3-cuenta {
          position: absolute; left: 50%; top: -88px; width: 64px; height: 64px; margin-left: -32px;
          border-radius: 50%; background: var(--acento); color: var(--fondo);
          font-family: 'FUENTE_M'; font-weight: 700; font-size: 40px; line-height: 64px;
          text-align: center; opacity: 0;
        }
        #escena-3-cuenta-2 { left: 100%; margin-left: -24px; } /* en el hueco entre «duer» y «me» */
      </style>
      <div id="root" data-composition-id="escena-3" data-width="1920" data-height="1080">
        <div id="escena-3-contenido">
          <div id="escena-3-bloques">
            <span class="escena-3-tok" style="background: var(--token-1)">El</span>
            <span id="escena-3-gato" class="escena-3-tok" style="background: var(--token-2)">gato<span id="escena-3-cuenta-1" class="escena-3-cuenta">1</span></span>
            <span id="escena-3-duer" class="escena-3-tok" style="background: var(--token-3)">duer<span id="escena-3-cuenta-2" class="escena-3-cuenta">2</span></span>
            <span id="escena-3-me" class="escena-3-tok" style="background: var(--token-4)">me</span>
            <span id="escena-3-punto" class="escena-3-tok" style="background: var(--token-5)">.<span id="escena-3-cuenta-3" class="escena-3-cuenta">1</span></span>
          </div>
        </div>
      </div>
      <script>
        (() => {
          const D = 10.809;
          const W = {"Gato": 0.3, "token": 4.55, "Duerme": 5.52, "parte": 6.29, "dos": 6.99, "punto": 8.37, "token#2": 9.83};
          const tl = gsap.timeline({ paused: true });
          const aparece = (sel, t) => tl.fromTo(sel, { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }, t);
          // «Gato» queda entera: crece y recibe su «1».
          tl.fromTo("#escena-3-gato", { scale: 1 }, { scale: 1.12, duration: 0.4, ease: "back.out(2)" }, W.Gato + 0.4);
          aparece("#escena-3-cuenta-1", W.token - 0.3);
          tl.fromTo("#escena-3-gato", { scale: 1.12 },
            { scale: 1, duration: 0.4, ease: "power2.inOut", immediateRender: false }, W.token + 0.5);
          // «Duerme» se parte en dos: se juntan (cierran el hueco de 16 px), se separan con rebote, «2».
          tl.fromTo("#escena-3-duer", { x: 0 }, { x: 8, duration: 0.35, ease: "power2.inOut" }, W.Duerme);
          tl.fromTo("#escena-3-me", { x: 0 }, { x: -8, duration: 0.35, ease: "power2.inOut" }, W.Duerme);
          tl.fromTo("#escena-3-duer", { x: 8 },
            { x: 0, duration: 0.5, ease: "back.out(2)", immediateRender: false }, W.parte);
          tl.fromTo("#escena-3-me", { x: -8 },
            { x: 0, duration: 0.5, ease: "back.out(2)", immediateRender: false }, W.parte);
          aparece("#escena-3-cuenta-2", W.dos - 0.2);
          // El punto salta solo y recibe su «1».
          tl.fromTo("#escena-3-punto", { y: 0 }, { y: -48, duration: 0.3, ease: "power2.out" }, W.punto);
          tl.fromTo("#escena-3-punto", { y: -48 },
            { y: 0, duration: 0.5, ease: "bounce.out", immediateRender: false }, W.punto + 0.3);
          aparece("#escena-3-cuenta-3", W["token#2"] - 0.3);
          tl.fromTo("#escena-3-contenido", { opacity: 1 },
            { opacity: 0, duration: 0.3, ease: "power1.in", immediateRender: false }, D - 0.3);
          window.__timelines["escena-3"] = tl;
        })();
      </script>
    </template>
  </body>
</html>
```

`W` es la salida de `python herramientas/alinear.py anclas 3 Gato token Duerme parte dos punto token#2`
medida en esta sesión; comprobar que coincide.

- [ ] **Paso 2: snapshots** (global = local + 21,079):

```bash
cd videos/02-tokens && bash herramientas/hf.sh snapshot --at 21.03,21.1,25.68,27.08,29.75,31.08 --no-end
```

| Global | Se ve | Contador |
|---|---|---|
| 21,03 | final de la escena 2: los cinco bloques solos | 64 |
| 21,10 | primer cuadro de la escena 3: **idéntico** al anterior (sin salto en el corte) | 64 |
| 25,68 | «gato» más grande, con su «1» encima | 81 |
| 27,08 | «duer» y «me» pegados, sin hueco | 84 |
| 29,75 | el punto arriba, en lo alto del salto; «1» y «2» visibles | 96 |
| 31,08 | las tres cuentas visibles, bloques en su lugar | 101 |

- [ ] **Paso 3: `check`** (0 errores; si marca `content_overlap` de una cuenta sobre su bloque,
  poner `data-layout-allow-overlap` en ese `.escena-3-cuenta`):

```bash
cd videos/02-tokens && bash herramientas/hf.sh check --at 21.1,25.68,27.08,29.75,31.08
```

- [ ] **Paso 4: commit.**

```bash
git add videos/02-tokens/compositions/escena-3.html
git commit -m "feat(videos): escena 3, cuántos tokens tiene cada palabra"
```

### T10: Escena 4 — otorrinolaringólogo y el ñaño

**Archivo:** `compositions/escena-4.html`. Reglas: `center-outward-expansion` (separación de
bloques), `counting-dynamic-scale` (los dos contadores).
Anclas: `anclas 4 Otorrinolaringólogo corta Y palabras diez tokens`.

Parte A:

- `#escena-4-larga` «otorrinolaringólogo», fuente H 120px, `--texto`, `left: 192px;
  top: 300px`. Entra desde la derecha: `x` 1700 → 0, 0,6 s, `power3.out`, empezando en
  `W.Otorrinolaringólogo - 0.3`.
- `#escena-4-fila-a`: 5 bloques `ot` `orr` `inol` `aring` `ólogo` (88px), `left: 192px;
  top: 300px`, `gap: 16px`. En `W.corta`, una línea de corte (6px × 170px, `--acento`) barre en
  0,6 s; la palabra se desvanece en esos 0,6 s y los bloques aparecen de izquierda a derecha
  (stagger 0,1 s, `opacity` 0→1 y `x` 24→0).
- Quieto 1 s después del corte (la pausa del guion).

Parte B, desde `W.Y`:

- La fila A sube a `y: -150` y baja a `opacity: 0.25` (0,5 s).
- `#escena-4-frase` «Mi ñaño vive en Guayaquil.», fuente H 88px, `left: 192px; top: 420px`,
  aparece (`opacity` 0→1, `y` 20→0, 0,4 s).
- `#escena-4-cuenta-p` «5 palabras» (fuente H 56px, `--texto`, `left: 192px; top: 600px`)
  aparece en `W.palabras`.
- `#escena-4-cuenta-t` «10 tokens» (fuente M 700 56px, `--acento`, `left: 760px;
  top: 600px`) aparece en `W.tokens`.
- En `W.diez`: la frase se desvanece (0,3 s) y en su lugar aparece `#escena-4-fila-b` con 10
  bloques de 72px (`padding: 16px 20px; gap: 12px`): `Mi` `ñ` `a` `ño` `vive` `en` `Gu` `aya`
  `quil` `.`, stagger 0,05 s desde el centro hacia afuera (`center-outward-expansion`).
- Revisar que la fila B cabe en 192–1728: mide unos 1460 px.
- Salida estándar.

- [ ] **Paso 1:** escribir la escena.
- [ ] **Paso 2:** `lint` sin errores.
- [ ] **Paso 3:** snapshots en globales de `W.corta + 1.0`, `W.tokens + 0.5`, `fin4 - 0.5`.
  Esperado: los 5 pedazos de «otorrinolaringólogo»; la frase con «5 palabras» y «10 tokens»;
  la fila de 10 bloques con los dos contadores debajo, nada dentro de la zona del contador.
- [ ] **Paso 4:** commit `feat(videos): escena 4, palabras largas y raras`.

### T11: Escena 5 — cada token es un número

**Archivo:** `compositions/escena-5.html`. HTML tomado del plan paralelo, adaptado a los roles, a
la fuente M y a los tiempos reales. Escena global 47,626 → 62,248; voz local 0,300 → 13,622. Cada
bloque es una ficha de dos caras: gira y muestra su número; al final se apagan los colores y queda
la fila de números en `--acento`.

Dos cambios frente al original, los dos para no tuitear colores escritos a mano: el color de la
cara de atrás es una capa `.escena-5-relleno` que se apaga con `opacity`, y el número está dos
veces (oscuro y en acento) para cruzarlos con `opacity`. Las caras usan `box-sizing: border-box`:
sin eso, la de atrás (con `width: 100%` más el relleno) queda 52 px más ancha que la de adelante.
El `min-width` de la cara de adelante es el ancho del número: `dígitos × AVANCE × 88 + 52`
(con `AVANCE = 0.6`: 264, 317, 370, 264, 158); si la fuente M tiene otro avance, recalcular.
Las dos caras, y el número oscuro con el dorado, se enciman a propósito: el verificador no entiende
`backface-visibility` ni el cruce de opacidades, así que llevan `data-layout-allow-overlap`
(sin eso, `check` da 5 errores `content_overlap`; probado en esta sesión).
Cada ficha va en una sola línea, sin espacios entre sus `<span>`: un espacio dentro de
`.escena-5-int` le sumaría ancho y descentraría la cara de atrás.

- [ ] **Paso 1: reemplazar el archivo.**

```html
<!doctype html>
<html lang="es">
  <head><meta charset="UTF-8" /></head>
  <body>
    <template id="escena-5-template">
      <style>
        #root { position: absolute; inset: 0; overflow: hidden; color: var(--texto); }
        #escena-5-contenido { position: absolute; inset: 0; }
        #escena-5-fila {
          position: absolute; left: 0; top: 470px; width: 1920px;
          display: flex; gap: 18px; justify-content: center; perspective: 1400px;
        }
        .escena-5-ficha { position: relative; display: inline-block; opacity: 0; }
        .escena-5-int { position: relative; display: inline-block; transform-style: preserve-3d; }
        .escena-5-cara {
          display: inline-block; box-sizing: border-box; backface-visibility: hidden; text-align: center;
          font-family: 'FUENTE_M'; font-weight: 700; font-size: 88px; line-height: 1;
          padding: 20px 26px; border-radius: 14px; color: var(--sobre-token); white-space: pre;
        }
        .escena-5-atras { position: absolute; left: 0; top: 0; width: 100%; height: 100%; transform: rotateY(180deg); }
        .escena-5-relleno { position: absolute; inset: 0; border-radius: 14px; }
        .escena-5-oscuro { position: relative; }
        .escena-5-dorado {
          position: absolute; inset: 0; box-sizing: border-box; padding: 20px 26px;
          color: var(--acento); opacity: 0;
        }
      </style>
      <div id="root" data-composition-id="escena-5" data-width="1920" data-height="1080">
        <div id="escena-5-contenido">
          <div id="escena-5-fila">
            <span class="escena-5-ficha"><span class="escena-5-int"><span class="escena-5-cara" data-layout-allow-overlap style="min-width: 264px; background: var(--token-1)">El</span><span class="escena-5-cara escena-5-atras"><span class="escena-5-relleno" style="background: var(--token-1)"></span><span class="escena-5-oscuro" data-layout-allow-overlap>4422</span><span class="escena-5-dorado" data-layout-allow-overlap>4422</span></span></span></span>
            <span class="escena-5-ficha"><span class="escena-5-int"><span class="escena-5-cara" data-layout-allow-overlap style="min-width: 317px; background: var(--token-2)">gato</span><span class="escena-5-cara escena-5-atras"><span class="escena-5-relleno" style="background: var(--token-2)"></span><span class="escena-5-oscuro" data-layout-allow-overlap>99767</span><span class="escena-5-dorado" data-layout-allow-overlap>99767</span></span></span></span>
            <span class="escena-5-ficha"><span class="escena-5-int"><span class="escena-5-cara" data-layout-allow-overlap style="min-width: 370px; background: var(--token-3)">duer</span><span class="escena-5-cara escena-5-atras"><span class="escena-5-relleno" style="background: var(--token-3)"></span><span class="escena-5-oscuro" data-layout-allow-overlap>116318</span><span class="escena-5-dorado" data-layout-allow-overlap>116318</span></span></span></span>
            <span class="escena-5-ficha"><span class="escena-5-int"><span class="escena-5-cara" data-layout-allow-overlap style="min-width: 264px; background: var(--token-4)">me</span><span class="escena-5-cara escena-5-atras"><span class="escena-5-relleno" style="background: var(--token-4)"></span><span class="escena-5-oscuro" data-layout-allow-overlap>1047</span><span class="escena-5-dorado" data-layout-allow-overlap>1047</span></span></span></span>
            <span class="escena-5-ficha"><span class="escena-5-int"><span class="escena-5-cara" data-layout-allow-overlap style="min-width: 158px; background: var(--token-5)">.</span><span class="escena-5-cara escena-5-atras"><span class="escena-5-relleno" style="background: var(--token-5)"></span><span class="escena-5-oscuro" data-layout-allow-overlap>13</span><span class="escena-5-dorado" data-layout-allow-overlap>13</span></span></span></span>
          </div>
        </div>
      </div>
      <script>
        (() => {
          const D = 14.622;
          const W = {"Cada": 6.12, "Lo": 9.97}; // anclas 5 Cada Lo
          const tl = gsap.timeline({ paused: true });
          // Vuelven los bloques de «El gato duerme.».
          tl.fromTo(".escena-5-ficha", { opacity: 0, y: 30, scale: 0.7 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)", stagger: 0.1 }, 0.6);
          // «Cada token tiene su propio número»: cada ficha gira y muestra su número.
          tl.fromTo(".escena-5-int", { rotationY: 0 },
            { rotationY: 180, duration: 0.6, ease: "power2.inOut", stagger: 0.2 }, W.Cada);
          // «Lo que de verdad le llega a la IA…»: se apagan los colores y queda la fila en el acento.
          const APAGA = W.Lo + 0.4;
          tl.fromTo(".escena-5-relleno", { opacity: 1 }, { opacity: 0, duration: 0.9, ease: "power2.inOut" }, APAGA);
          tl.fromTo(".escena-5-oscuro", { opacity: 1 }, { opacity: 0, duration: 0.9, ease: "power2.inOut" }, APAGA);
          tl.fromTo(".escena-5-dorado", { opacity: 0 }, { opacity: 1, duration: 0.9, ease: "power2.inOut" }, APAGA);
          tl.fromTo("#escena-5-contenido", { opacity: 1 },
            { opacity: 0, duration: 0.3, ease: "power1.in", immediateRender: false }, D - 0.3);
          window.__timelines["escena-5"] = tl;
        })();
      </script>
    </template>
  </body>
</html>
```

La cara de atrás tiene un `transform` en CSS y **no** se tuitea con GSAP (se tuitea
`.escena-5-int`), así que no hay conflicto `gsap_css_transform_conflict`. La ficha gira 180° y
muestra la cara de atrás, que ya viene girada 180° en CSS: el número se lee derecho.

- [ ] **Paso 2: snapshots** (global = local + 47,626):

```bash
cd videos/02-tokens && bash herramientas/hf.sh snapshot --at 49.53,54.23,56.13,60.13 --no-end
```

| Global | Se ve | Contador |
|---|---|---|
| 49,53 | cinco bloques con letras: `El` `gato` `duer` `me` `.` | 157 |
| 54,23 | fichas a medio giro: la primera casi vuelta, la segunda de canto, la tercera empezando | 170 |
| 56,13 | cinco números sobre sus colores: 4422 99767 116318 1047 13 | 176 |
| 60,13 | solo los números, en el color de acento, sin bloques de color | 192 |

Si a los 56,13 s los números se ven en espejo, la cara de atrás perdió `backface-visibility`;
revisar que `.escena-5-cara` está en las dos caras.

- [ ] **Paso 3: `check`** (0 errores):

```bash
cd videos/02-tokens && bash herramientas/hf.sh check --at 49.53,54.23,56.13,60.13
```

- [ ] **Paso 4: commit.**

```bash
git add videos/02-tokens/compositions/escena-5.html
git commit -m "feat(videos): escena 5, las fichas giran y muestran su número"
```

### T12: Escena 6 — límite y costo

**Archivo:** `compositions/escena-6.html`. Blueprint `comparison-split` (dos paneles) y regla
`waterfall-entry` (bloques que caen). Anclas: `anclas 6 razones límite vez costo token palabra`.

- Dos paneles de 740 × 560: izquierdo `left: 192px; top: 120px`; derecho `left: 988px;
  top: 120px`. Fondo `--panel`, borde 3px `--linea`, radio 22px. Aparecen en `W.razones`
  (`opacity` y `y`, stagger 0,15 s).
- Títulos «Límite» y «Costo»: fuente H 64px, arriba a la izquierda de cada panel, con
  60px de margen interno. Cada uno se enciende (de `--texto-2` a `--texto`) en su ancla.

Panel «Límite», desde `W["límite"]` hasta `W.vez`:

- Una caja de 480 × 300 (borde 4px `--texto-2`, radio 12px) dentro del panel. Caben 24 bloques
  pequeños (6 columnas × 4 filas; bloque de 64 × 56, fuente M 700 28px, colores en ciclo).
  Caen uno por uno desde arriba (`y` -200 → 0, `power2.in`), repartidos parejo entre
  `W["límite"]` y `W.vez`.
- Después caen 5 bloques más que no entran: quedan a la derecha de la caja, a `opacity: 0.4` y
  con contorno 3px `--token-3`.

Panel «Costo», desde `W.costo`:

- Una bandeja abajo del panel (barra de 520 × 12, `--linea`). Cada bloque que cae sobre ella se
  convierte en una moneda (círculo de 56px `--acento` con «¢» en fuente M 700 30px
  `--sobre-token`) que se apila en columnas de 6. Un bloque cada 0,35 s desde `W.costo` hasta
  `W.token`.
- En `W.token`: aparece «pago por token» (fuente M 700 40px, `--acento`) bajo la bandeja.
- En `W.palabra`: aparece «no por palabra» (fuente H 40px, `--texto-2`) con una línea que
  lo tacha (`scaleX` 0→1, 0,3 s).

- [ ] **Paso 1:** escribir la escena.
- [ ] **Paso 2:** `lint` sin errores.
- [ ] **Paso 3:** snapshots en globales de `W.vez + 0.5`, `fin6 - 0.5`. Esperado: la caja llena
  con 5 bloques afuera, atenuados; monedas apiladas con «pago por token» y «no por palabra»
  tachado. Los paneles no invaden la zona del contador.
- [ ] **Paso 4:** commit `feat(videos): escena 6, límite y costo`.

### T13: Escena 7 — cada modelo corta a su manera

**Archivo:** `compositions/escena-7.html`. Regla `waterfall-entry` (filas).
Anclas: `anclas 7 modelo frase Pero cortan`.

Tres filas con la misma frase, cortes **inventados** (ninguno es el real de `o200k_base`):

| Fila | Rótulo | Bloques |
|---|---|---|
| A | «Modelo A» | `Mi` `ña` `ño` `vive` `en` `Guaya` `quil` `.` |
| B | «Modelo B» | `Mi` `ñ` `año` `vi` `ve` `en` `Gu` `ayaquil` `.` |
| C | «Modelo C» | `Mi` `ñaño` `vive` `en` `Guay` `a` `quil` `.` |

- Rótulos en fuente M 400 30px `--texto-2`, en `left: 192px`, alineados con cada fila.
- Filas en `left: 420px`, `top: 170px`, `350px` y `530px`; bloques de 64px
  (`padding: 14px 18px`).
- `W.modelo`: las filas entran de arriba abajo (stagger 0,2 s) como **texto corrido**, sin
  rellenos ni huecos, con el mismo truco de corrimiento de la escena 2 (`CH = AVANCE × 64`, con `PAD = 18` y `GAP = 12`).
- `W.Pero`: en las tres filas a la vez, las líneas de corte (4px × 90px, `--acento`) bajan desde
  arriba (`scaleY` 0→1, `transform-origin: top`, 0,35 s) entre bloque y bloque, y los bloques se
  separan y se rellenan (0,3 s). Todas las líneas empiezan en el mismo instante.
- Salida estándar.

- [ ] **Paso 1:** escribir la escena.
- [ ] **Paso 2:** `lint` sin errores.
- [ ] **Paso 3:** snapshots en globales de `W.Pero - 0.2`, `W.Pero + 0.2`, `fin7 - 0.5`.
  Esperado: tres filas de texto corrido con rótulo; las líneas bajando a la vez; tres filas
  cortadas en lugares distintos.
- [ ] **Paso 4:** commit `feat(videos): escena 7, cada modelo corta distinto`.

### T14: Escena 8 — este mismo video

**Archivo:** `compositions/escena-8.html`. El contador y su viaje ya están en `contador.html`
(T6) y el acercamiento de cámara en `fondo.html` (T5). Esta escena solo oscurece los bordes.
Anclas: `anclas 8 contador En`.

- `#escena-8-viñeta`: capa a pantalla completa con
  `background: radial-gradient(ellipse at 60% 45%, transparent 35%, rgb(0 0 0 / 0.55) 100%)`,
  `opacity` 0 → 1 en `W.contador` (1 s) y 1 → 0 en `W.En` (1 s).
- Sin otro contenido.

- [ ] **Paso 1:** escribir la escena.
- [ ] **Paso 2:** `lint` sin errores.
- [ ] **Paso 3:** snapshots en globales de `W.contador + 1.5`, `W.En + 1.5`, `fin8 - 0.1`.
  Esperado: contador grande con «… palabras» a su izquierda y bordes oscuros; contador de vuelta
  en la esquina subiendo; 327 al final.
- [ ] **Paso 4:** commit `feat(videos): escena 8, el contador de este video`.

### T15: Escena 9 — la respuesta

**Archivo:** `compositions/escena-9.html`. HTML tomado del plan paralelo, adaptado a los roles, a
la fuente H y a los tiempos reales. Escena global 108,360 → 118,366; voz local 0,300 → 8,006.
Mismo encuadre que la escena 1 (mismos estilos, mismo lugar). La pregunta está escrita desde el
primer cuadro; se borra en 0,3 s al terminar de decirla (3,05 local, fin del grupo «la IA lee
palabras» de T3); «No. Lee tokens.» se escribe desde «No» hasta 0,5 s después de empezar
«tokens»; el cursor queda fijo, parpadea dos veces (7,9 → 9,5, cuando la voz ya terminó y el
contador llegó a 349) y el fundido a negro de `index.html` empieza en 117,866 global (9,506 local).
Sin salida propia.

Ojo con la ancla: en la escena 9 hay dos «lee». `anclas 9 Lee` devuelve la de la pregunta; la de
la respuesta es `Lee#2`.

- [ ] **Paso 1: reemplazar el archivo.**

```html
<!doctype html>
<html lang="es">
  <head><meta charset="UTF-8" /></head>
  <body>
    <template id="escena-9-template">
      <style>
        #root { position: absolute; inset: 0; overflow: hidden; color: var(--texto); }
        #escena-9-linea { position: absolute; left: 192px; top: 420px; display: flex; align-items: baseline; }
        #escena-9-texto {
          font-family: 'FUENTE_H'; font-weight: 700; font-size: 132px; line-height: 1.05;
          letter-spacing: -0.03em; color: var(--texto); white-space: pre;
        }
        #escena-9-cursor { display: inline-block; width: 60px; height: 106px; margin-left: 10px; background: var(--acento); }
      </style>
      <div id="root" data-composition-id="escena-9" data-width="1920" data-height="1080">
        <div id="escena-9-linea"><span id="escena-9-texto">¿La IA lee palabras?</span><span id="escena-9-cursor"></span></div>
      </div>
      <script>
        (() => {
          const D = 10.006;
          const W = {"No": 3.4, "tokens": 4.51}; // anclas 9 No tokens
          const FIN_PREGUNTA = 3.05;             // fin del grupo «la IA lee palabras» (T3), local
          const PREGUNTA = "¿La IA lee palabras?";
          const RESPUESTA = "No. Lee tokens.";
          const el = document.getElementById("escena-9-texto");
          const tl = gsap.timeline({ paused: true });
          // Cursor: parpadea mientras la voz pregunta (7 medios ciclos = 2,8 s), fijo al borrar y
          // escribir, dos parpadeos al final (7,9 → 9,5) y fijo durante el fundido a negro.
          tl.fromTo("#escena-9-cursor", { opacity: 1 },
            { opacity: 0, duration: 0.4, ease: "steps(1)", repeat: 6, yoyo: true }, 0);
          tl.set("#escena-9-cursor", { opacity: 1 }, FIN_PREGUNTA);
          tl.fromTo("#escena-9-cursor", { opacity: 1 },
            { opacity: 0, duration: 0.4, ease: "steps(1)", repeat: 3, yoyo: true, immediateRender: false }, 7.9);
          tl.set("#escena-9-cursor", { opacity: 1 }, 9.5);
          // Un solo reloj escribe el texto según el tiempo (Convención 5): pregunta completa, borrado
          // en 0,3 s, vacío, y la respuesta de «No» a «tokens» + 0,5 (15 caracteres).
          const ESCRIBE = W.tokens + 0.5 - W.No;
          function texto(t) {
            if (t < FIN_PREGUNTA) return PREGUNTA;
            if (t < FIN_PREGUNTA + 0.3)
              return PREGUNTA.slice(0, Math.round(PREGUNTA.length * (1 - (t - FIN_PREGUNTA) / 0.3)));
            if (t < W.No) return "";
            return RESPUESTA.slice(0, Math.min(RESPUESTA.length, Math.round(RESPUESTA.length * (t - W.No) / ESCRIBE)));
          }
          const reloj = { t: 0 };
          tl.fromTo(reloj, { t: 0 }, { t: D, duration: D, ease: "none",
            onUpdate: () => { el.textContent = texto(reloj.t); } }, 0);
          window.__timelines["escena-9"] = tl;
        })();
      </script>
    </template>
  </body>
</html>
```

El original del plan paralelo usaba dos objetos que escribían el mismo texto y dependía del orden
de creación de los `fromTo`; `lint` lo marca (`gsap_repeated_fromto_without_baseline`). Con un solo
reloj el texto es una función del tiempo y no hay orden que cuidar.

- [ ] **Paso 2: snapshots** (global = local + 108,360):

```bash
cd videos/02-tokens && bash herramientas/hf.sh snapshot --at 108.86,111.56,112.96,114.86,116.66,118.35 --no-end
```

| Global | Se ve | Contador |
|---|---|---|
| 108,86 | «¿La IA lee palabras?» completa, con cursor, en el mismo lugar que la escena 1 | 327 |
| 111,56 | la pregunta a medio borrar: entre «¿La IA lee» y «¿La IA lee pa» (el cuadro cae a 30 fps) | 335 |
| 112,96 | «No. Lee tok» | 338 |
| 114,86 | «No. Lee tokens.» con el cursor fijo | 343 |
| 116,66 | igual; el contador ya no sube | 349 |
| 118,35 | casi negro (el fundido va al 94 %): el texto apenas se adivina | — |

- [ ] **Paso 3: `check`** (0 errores):

```bash
cd videos/02-tokens && bash herramientas/hf.sh check --at 108.86,111.56,112.96,114.86,116.66
```

- [ ] **Paso 4: commit.**

```bash
git add videos/02-tokens/compositions/escena-9.html
git commit -m "feat(videos): escena 9, la respuesta y el corte a negro"
```

### T16: Montaje completo y vista final

- [ ] **Paso 1: Chequeo completo.**

```bash
cd videos/02-tokens && bash herramientas/hf.sh check --snapshots
```

Esperado: 0 errores. Mirar los recortes de cada hallazgo; los avisos de contraste se corrigen.

- [ ] **Paso 2: Hoja de contacto.** Snapshot en el punto medio de cada escena
  (`(inicio + fin) / 2` de «Tiempos»). Mirar las 9 imágenes juntas: la zona del contador libre en
  todas menos la 8, ninguna escena vacía, nada cortado en los bordes.

- [ ] **Paso 3: Línea de tiempo.**

```bash
cd videos/02-tokens && bash herramientas/hf.sh timeline --json
```

Esperado: fondo y contador de 0 al total, las 9 escenas seguidas sin huecos ni cruces, las 9
voces dentro de su escena.

- [ ] **Paso 4: Parada 3.** Abrir la vista previa y pasarle a José Luis la dirección:

```bash
cd videos/02-tokens && bash herramientas/hf.sh preview --background
```

Preguntar una sola cosa: ¿se renderiza o qué cambia? Si alguna animación cae lejos de su palabra,
corregir esa ancla en la escena (el valor de `W`), no el audio.

### T17: Render

- [ ] **Paso 1: Borrador.**

```bash
cd videos/02-tokens && bash herramientas/hf.sh render --quality draft --output renders/02-tokens-borrador.mp4
```

- [ ] **Paso 2: Final.**

```bash
cd videos/02-tokens && bash herramientas/hf.sh render --quality delivery --output renders/02-tokens.mp4
```

Leer la segunda línea del resumen (`beginframe` o `screenshot`) y anotarla en el informe.

- [ ] **Paso 3: Verificar el archivo.**

```bash
cd videos/02-tokens && test -s renders/02-tokens.mp4 && node_modules/ffprobe-static/bin/win32/x64/ffprobe.exe -v error -show_entries format=duration:stream=codec_type,width,height -of compact renders/02-tokens.mp4
```

Esperado: un stream de video 1920×1080, uno de audio, y una duración igual al total de «Tiempos»
con ±0,1 s.

- [ ] **Paso 4: Parada 4.** Preguntar a José Luis si los MP3 y el MP4 van a git. No hacer
  `git add` de `audio/` ni `renders/` sin su respuesta.

### T18: Revisión y cierre

- [ ] **Paso 1: Revisión** con un subagente `claude-opus-5-5` en `medium`: lee el diff completo
  desde el commit del plan, corre la suite de Python y `hf.sh check`, y mira la hoja de contacto
  de T16 contra el guion escena por escena. Aplicar lo que encuentre.
- [ ] **Paso 2: Bitácora.** Una línea por rol en `~/.claude/BITACORA.md`:
  fecha | rol | modelo | effort | acertó | costo | una frase. El planeador «acertó» si hubo
  0 a 2 tareas emergentes.
- [ ] **Paso 3: Commit final** con las rutas tocadas en T18.
