Abrir con: sonnet, medium — rol ejecutor

# Plan: correcciones de la Virtual 1 tras la revisión del 26 de septiembre

Repo `D:\curso_IA`, rama `curso-avanzado-v1`. **Sin push** hasta que José Luis lo pida. La clase es
el martes 13 de octubre de 2026.

**Qué logra:** la Virtual 1 pasa de «lista con arreglos menores» a «lista». Cada tarea corrige un
hallazgo de `docs/revision/2026-09-26-revision-dia-1.md` (los números «H1» a «H17» son los de ese
informe). No hace falta leer el informe para ejecutar: este plan trae el texto exacto de antes y de
después. Léelo solo si una tarea no se entiende.

## Reparto

| Rol | Modelo | Esfuerzo | Estado según `~/.claude/COMO-TRABAJAR.md` §7 |
|---|---|---|---|
| Planeador (la sesión que escribió esto) | `claude-opus-5-5` | `high` | **Sin medir.** Se mide por las tareas emergentes al ejecutar: la vara es de 0 a 2. |
| Ejecutor | `claude-opus-5-5` (pedido por José Luis el 26 sep; el plan se escribió para `sonnet`) | `medium` | **Sin medir** como ejecutor. `sonnet` está confirmado en el rol. |
| Revisor | `claude-opus-5-5` | `medium` | **Sin medir** (0 corridas en `medium`). Revisa el diff, no el informe del ejecutor. |

Tiempo estimado: unos 60 a 90 minutos para el ejecutor (11 tareas cortas y un recorrido de unos 5
minutos) y unos 20 minutos para el revisor.

## Decisiones

**De José Luis, 26 de septiembre de 2026:**

- **H3, emojis del semáforo:** se quedan. Solo se arregla que «🟡 Amarillo» se parte en dos líneas en móvil.
- **H2, «¿Quién soy?»:** versión A de las viñetas (texto literal en la tarea 1).
- **H1, enlace de Drive:** todavía no lo tiene. La tarea 11 queda escrita y bloqueada.
- **H15, `projects.png`:** queda como está.

**Del planeador (José Luis las lee antes de ejecutar):**

- **H4, texto jurídico nuevo.** La definición de seudonimizar y su diferencia con anonimizar se
  verificaron en la LOPDP, arts. 2 (literal c) y 4, en el PDF publicado por Cancillería
  (`cancilleria.gob.ec/wp-content/uploads/2023/03/2021.05.10_ley_organica_de_proteccion_de_datos_personales.pdf`,
  edición de Ediciones Legales que cita el R.O. Suplemento 459). El art. 4 define las dos cosas y el
  art. 2 c) excluye de la ley solo los datos anonimizados. **Que lo seudonimizado «sigue siendo dato
  personal» es una inferencia:** la ley no lo dice con esas palabras, pero lo seudonimizado no está en
  la exclusión del art. 2 y el propio art. 4 lo llama «tratamiento de datos personales».
- **H11:** se quita el alto máximo de la caja del prompt. El prompt se ve completo y la página se
  desplaza, como ya pasa en móvil. Medido a 1280 × 800: hoy quedan ocultos 40, 60, 120 y 80 px.
- **H12:** en pantallas de menos de 1280 px, el panel de interacción del avanzado sube de 45vh a
  70vh. Medido: el panel necesita 440 px; con 60vh, a 375 × 667 siguen ocultos 25 px. Con 70vh cabe
  a 812 y a 667 px de alto. El panel se ajusta a su contenido, así que 70vh es solo un tope.
- **H13:** queda como indicación para el guion (tarea 10). Medido en modo admin: el último mensaje de
  `v1-2-4a` termina a 838 px; a 1280 × 800 la barra de admin empieza a 701 px (faltan 137 px), y a
  1920 × 1080 cabe entero. Compactar la animación aprobada no alcanza para esos 137 px.
- **H17, fecha del video de Holly Cope: confirmada.** La página del video dice
  `publishDate: 2026-06-24` (leído el 26 de septiembre en `ytInitialPlayerResponse`). El slide
  («junio de 2026») y el tutorial («24 de junio de 2026») ya están bien: no hay tarea.

## Lo que queda fuera

| Hallazgo | Motivo |
|---|---|
| H13 dentro del componente | Va al guion (ver arriba). |
| H14 · Botones del modo admin | Interfaz compartida con el básico, que solo ve el admin. |
| H15 · `projects.png` recortada | Decisión de José Luis del 26 de septiembre. La imagen también la usa el básico (`MODULO_3.js:97`). |
| H16 · Tiempo | Los minutos van en el guion; la tarea 10 deja la nota en su encargo. |
| H17 · Cifra de Charlotin | Se actualiza la víspera (12 de octubre), no en este plan. |
| H17 · Tres casos solo en prensa; «17» frente a 17,55 | Sin error demostrable; el encargo no los incluye. |
| Descartados de la revisión | Siguen descartados. |
| ESLint del básico (51 problemas de enero de 2026) | El básico no cambia. |
| Capturas de `docs/revision/capturas-avanzado/` | Quedan como las dejó el recorrido del 26 de septiembre. |
| Cambio pendiente de `AppLayout.jsx` (la barra espaciadora sobre `<summary>`) y `docs/guiones/02-tokens.md` | Son de otras sesiones. Este plan no los commitea. |

## Reglas para el ejecutor

- Trabaja en el checkout principal `D:\curso_IA`, no en un worktree: el servidor y el recorrido
  corren desde aquí.
- Hay cambios ajenos sin commit (ver la tabla de arriba) y muchos archivos sin seguimiento. `git add`
  siempre con la ruta exacta; **nunca** `git add -A` ni `git add .`.
- El recorrido **nunca** escribe en `docs/revision/capturas-avanzado/`: la salida es siempre
  `D:/tmp/pw-curso/capturas-correcciones`.
- Cada tarea sigue el mismo orden: 1) corre su comprobación y pega el «antes» (el rojo) en tu informe;
  2) edita; 3) corre la comprobación y pega el «después»; 4) commit con el mensaje indicado. Sin líneas
  de atribución en los commits.
- Los reemplazos son literales. Los fragmentos de «Antes» van sin la sangría de la línea: úsalos tal
  cual como texto a buscar. Los bloques de «Después» que traen sangría la llevan exacta.
- Los números de línea de `VIRTUAL_1.js` son los de hoy. La tarea 1 agrega 13 líneas arriba, así
  que desde la tarea 2 todo queda 13 líneas más abajo: busca por el texto, no por el número.
- Los `.md` de `client/public/materiales/` empiezan con BOM (UTF-8 con BOM): no lo quites.
  `file <archivo>` debe seguir diciendo «UTF-8 (with BOM)».
- `docs/prompts/` está excluido de git (`.git/info/exclude`): lo que edites ahí no se commitea.

**Para y pregunta a José Luis si:**

- el «Antes» de una tarea no coincide exactamente con el archivo;
- una comprobación sigue en rojo después del cambio (y de su plan B, en la tarea 9);
- `git stash pop` da conflicto (tarea 9);
- un cambio te obliga a tocar `course-content.jsx`, un `MODULO_*.js`, una imagen de
  `client/public/images/` o `AppLayout.jsx` fuera de la rama `ES_AVANZADO ? {` (líneas 11 a 50);
- el recorrido no termina en «Sin problemas.»;
- te llega un enlace de Drive por cualquier vía que no sea José Luis en el chat.

---

## Tarea 0: preparar y tomar la línea base

1. Levanta el servidor del avanzado con `preview_start` y el nombre `avanzado` (está en
   `.claude/launch.json`, puerto 5174). Sin esa herramienta, en Git Bash:
   `cd /d/curso_IA/client && VITE_COURSE=avanzado npx vite --port 5174`.
2. El script de verificación de pantalla está en `D:\tmp\pw-curso\verificar-correcciones-v1.mjs`.
   Si no existe o no coincide con el **anexo A**, créalo con ese contenido exacto.
3. Corre `cd /d/tmp/pw-curso && node verificar-correcciones-v1.mjs`. Rojo esperado, medido por el
   planeador el 26 de septiembre: **14 fallas y 1 pendiente**. Son estas:
   - `h2 v1-1-2`;
   - `h8 cifra 1280`, `h8 Gemini` y `h8 cifra 375`;
   - `h11 prompt` en `v1-3-9`, `v1-7-4`, `v1-7-5` y `v1-7-6` (40, 60, 120 y 80 px ocultos);
   - `h12 encuesta`: `v1-1-3` y `v1-1-5`, cada una a 375x812 (60 px) y a 375x667 (125 px);
   - `h3 semáforo 375` y `h3 semáforo 360` («🟡 Amarillo» se parte).
   `h1` sale como `PENDIENTE` y `h12 escritorio sin cambio` sale `OK`. Pega la salida completa en
   tu informe.
4. Anota tres números de base:
   - `cd /d/curso_IA && git status --short docs/revision/capturas-avanzado | wc -l`: hoy da **142**;
   - `cd /d/curso_IA/client && npx eslint src/components/layout/AppLayout.jsx 2>&1 | tail -1`: hoy
     da **6 problems (5 errors, 1 warning)**;
   - `node --test src/components/avanzado/*.test.js`: hoy da **17 de 17**.

Sin commit.

## Tarea 1 (H2): «¿Quién soy?» con viñetas propias

Archivo: `client/src/data/avanzado/VIRTUAL_1.js`. El texto lo aprobó José Luis (versión A).

**a)** Justo después de la función `delBasico` (la línea que cierra con `}` en la línea 12), agrega una
línea en blanco y esto:

```js
// «¿Quién soy?» sale del básico, con viñetas propias: las del básico llevan emojis.
const QUIEN_SOY = delBasico(MODULO_1, "1-2", "v1-1-2");
```

**b)** Antes (línea 29):

```
delBasico(MODULO_1, "1-2", "v1-1-2"),
```

Después (con esta sangría):

```js
        {
            ...QUIEN_SOY,
            contentData: {
                ...QUIEN_SOY.contentData,
                bullets: [
                    "Antes: tareas mecánicas y miedo al error.",
                    "Ahora: la IA hace el borrador y yo reviso cada resultado.",
                    "Este curso: que uses la IA con método, sin arriesgar la exactitud ni la confidencialidad."
                ]
            }
        },
```

**Comprobación:** en la salida del script, `h2 v1-1-2` pasa a `OK`. Además,
`cd /d/curso_IA && git diff --quiet -- client/src/data/course-content.jsx && echo básico intacto`
imprime «básico intacto».

**Commit:** `fix(avanzado): «¿Quién soy?» con viñetas propias, sin emojis`

## Tarea 2 (H5, H6, H7): referencias adelantadas

**Comprobación (antes y después):**

```bash
cd /d/curso_IA && git grep -n "Harness y agentes\|color verde\|Mythos" -- client/src/data/avanzado client/public/materiales
```

Antes da 4 líneas: `VIRTUAL_1.js` 196, 459 y 461, y `semaforo-confidencialidad.md` 26. Después, nada.

**a) H6, `v1-2-5`, `VIRTUAL_1.js:196`.**
Antes: `["Delegación", "¿Qué hago yo y qué hace la IA?", "Harness y agentes"],`
Después: `["Delegación", "¿Qué hago yo y qué hace la IA?", "Tres formas de trabajar con IA y qué delegar"],`

**b) H5, `v1-6-3`, `VIRTUAL_1.js:459`** (última celda de la fila 1).
Antes: `"Sí, para el color verde. Claude Pro y ChatGPT Plus cuestan 20 dólares al mes"`
Después: `"Sí, para lo que no tiene datos de clientes: plantillas, normas y fallos públicos. Claude Pro y ChatGPT Plus cuestan 20 dólares al mes"`

No cambia la regla: el verde del semáforo es justamente eso (plantilla sin datos reales, ley,
sentencia publicada).

**c) H7, `v1-6-3`, `VIRTUAL_1.js:461`.**
Antes: `(hasta 2 años). Fable y Mythos exigen 30 días"`
Después: `(hasta 2 años). Fable exige 30 días"`

**d) Lo mismo en el material, `client/public/materiales/semaforo-confidencialidad.md:26`.**
Antes: `(hasta 2 años); Fable y Mythos exigen 30 días |`
Después: `(hasta 2 años); Fable exige 30 días |`

**Commit:** `fix(avanzado): sin referencias adelantadas en las 4D y en los niveles de protección`

## Tarea 3 (H4): explicar seudonimizar y distinguirlo de anonimizar

Hoy «seudonimizar» aparece por primera vez en `v1-4-3`, sin definir. Después de esta tarea aparece
primero en `v1-6-1`, que lo define. `v1-6-2` lo distingue de anonimizar.

**Comprobación (antes y después):**

```bash
cd /d/curso_IA && grep -n 'seudonim\|id: "v1-6-1"' client/src/data/avanzado/VIRTUAL_1.js | head -1
git grep -n "Anonimizar solo" -- client/
grep -c "Seudonimizar no es anonimizar" client/src/data/avanzado/VIRTUAL_1.js
```

- Antes: la primera línea es la `401` (`"Datos de clientes sin seudonimizar",`); el `git grep` da 2
  líneas (`semaforo-confidencialidad.md:38` y `VIRTUAL_1.js:426`); el conteo da `0`.
- Después: la primera línea es `id: "v1-6-1"`; el `git grep` no da nada; el conteo da `1`.

**a) `v1-4-3`, `VIRTUAL_1.js:401`.**
Antes: `"Datos de clientes sin seudonimizar",`
Después: `"Documentos de clientes con sus datos reales",`

**b) `v1-6-1`, `paragraph`, `VIRTUAL_1.js:422`.**
Antes: `paragraph: "Desactivar el entrenamiento no es confidencialidad: tus datos igual salen de tu computadora y se guardan un tiempo.",`
Después: `paragraph: "Desactivar el entrenamiento no es confidencialidad: tus datos igual salen de tu computadora y se guardan un tiempo. Por eso se seudonimiza antes de subir: cada dato que identifica a alguien se cambia por una etiqueta, como [VENDEDOR_1], y la tabla que dice quién es quién se queda en tu computadora.",`

**c) `v1-6-1`, tercera viñeta, `VIRTUAL_1.js:426`.**
Antes: `"Anonimizar solo el nombre: un inmueble único, una fecha y una notaría identifican a la persona",`
Después: `"Cambiar solo el nombre: un inmueble único, una fecha y una notaría identifican a la persona",`

**d) `v1-6-2`, cuarta viñeta nueva.** Antes (línea 443, la última de `bullets1`):

```
"<b>Resolución SPDP-SPD-2026-0004-R (28 ene 2026), art. 23:</b> el encargo de tratamiento no es transferencia internacional."
```

Después (la línea 443 gana una coma al final, y se agrega la nueva con la misma sangría de 20
espacios):

```js
                    "<b>Resolución SPDP-SPD-2026-0004-R (28 ene 2026), art. 23:</b> el encargo de tratamiento no es transferencia internacional.",
                    "<b>Seudonimizar no es anonimizar (arts. 2 y 4):</b> lo anonimizado ya no permite identificar a la persona sin un esfuerzo desproporcionado, y queda fuera de la ley; lo seudonimizado sí lo permite con la tabla que guardas aparte, así que sigue siendo dato personal."
```

**e) El material, `client/public/materiales/semaforo-confidencialidad.md:38`.**
Antes: `- Anonimizar solo el nombre.`
Después: `- Cambiar solo el nombre.`

**Commit:** `fix(avanzado): se explica seudonimizar y se distingue de anonimizar`

## Tarea 4 (H8): `v1-2-3`, Modelos vigentes

Archivo: `client/src/data/avanzado/VIRTUAL_1.js`, líneas 125 y 126. Fuente de Gemini: ficha oficial de
Gemini 3.1 Pro («up to 1M»), verificada en la revisión.

**a) Línea 125.**
Antes: `["ChatGPT", "GPT-6 Astra; por API, también GPT-6 Sol y Luna (desde el 22 de septiembre)", "GPT-6 Sol por API: 1 050 000 tokens"],`
Después: `["ChatGPT", "GPT-6 Astra; desde el 22 de septiembre, también GPT-6 Sol y Luna", "GPT-6 Sol por API: 1\u00A0050\u00A0000 tokens"],`

`\u00A0` se escribe así, como seis caracteres (barra invertida, `u`, `00A0`), no como el carácter
invisible: JavaScript lo convierte en espacio de no separación. Se quitó «por API» de Sol y Luna
porque el anuncio de OpenAI los pone también en ChatGPT; la frase nueva es cierta en ambos casos. La
ventana sí conserva «por API», porque esa cifra es la de la API.

**b) Línea 126.**
Antes: `["Gemini", "Gemini 3.1 Pro y Gemini 3 Flash", "—"]`
Después: `["Gemini", "Gemini 3.1 Pro y Gemini 3 Flash", "Gemini 3.1 Pro: 1M tokens"]`

**Comprobación:** en el script, `h8 cifra 1280`, `h8 Gemini` y `h8 cifra 375` pasan a `OK`.

**Commit:** `fix(avanzado): ventana de Gemini 3.1 Pro y la cifra de GPT-6 Sol en una línea`

## Tarea 5 (H9, H10): el párrafo del benchmark y «ÚNICAMENTE»

**Comprobación (antes y después):**

```bash
cd /d/curso_IA && git grep -n "ÚNICAMENTE\|conocimiento factual:" -- client/
```

Antes da 4 líneas: `tutorial-evitar-alucinaciones.md` 51 y 60, y `VIRTUAL_1.js` 273 y 341. Después, nada.

**a) H9, `v1-3-5b`, `VIRTUAL_1.js:273`.**
Antes: `paragraph: "Benchmark AA-Omniscience de Artificial Analysis, consultado el 24 de septiembre de 2026: preguntas de conocimiento factual: mide lo que el modelo recuerda. Saber más no significa inventar menos. Y mide la memoria del modelo, no su trabajo con la norma que tú le entregas: por eso se la entregas.",`
Después: `paragraph: "Benchmark AA-Omniscience de Artificial Analysis, consultado el 24 de septiembre de 2026. Con preguntas de conocimiento factual, mide lo que el modelo recuerda, no cómo trabaja con la norma que tú le entregas: por eso se la entregas. Y saber más no significa inventar menos.",`

**b) H10, `v1-3-9`, `VIRTUAL_1.js:341`.**
Antes: `Usa ÚNICAMENTE estos documentos, no tu conocimiento general`
Después: `Usa solo estos documentos, no tu conocimiento general`

**c) H10, `client/public/materiales/tutorial-evitar-alucinaciones.md:51`.**
Antes: `Usa ÚNICAMENTE ese documento, no tu conocimiento general. Dime:`
Después: `Usa solo ese documento, no tu conocimiento general. Dime:`

**d) H10, el mismo archivo, línea 60.**
Antes: `Usa ÚNICAMENTE estos documentos, no tu conocimiento general ni supuestos`
Después: `Usa solo estos documentos, no tu conocimiento general ni supuestos`

**Commit:** `fix(avanzado): párrafo del benchmark sin dos puntos encadenados; «solo» en vez de ÚNICAMENTE`

## Tarea 6 (H17): citar el art. 59 en `v1-6-2`

Archivo: `client/src/data/avanzado/VIRTUAL_1.js:446`.
Antes: `salvo los de la Comunidad Andina; Estados Unidos no.`
Después: `salvo los de la Comunidad Andina (Resolución 0004-R, art. 59); Estados Unidos no.`

**Comprobación:** `cd /d/curso_IA && grep -c "Comunidad Andina (Resolución 0004-R, art. 59)" client/src/data/avanzado/VIRTUAL_1.js`
Antes da `0`, después `1`.

**Commit:** `fix(avanzado): cita el art. 59 de la Resolución 0004-R para la Comunidad Andina`

## Tarea 7 (H3): «🟡 Amarillo» en una línea en móvil

Los emojis se quedan (decisión de José Luis). Medido: con un espacio de no separación, las tres
opciones caben en una línea a 375 y a 360 px sin desbordar. Con menos relleno solo se arregla a 375 px.

Archivo: `client/src/data/avanzado/VIRTUAL_1.js:473`.
Antes: `opciones: ["🟢 Verde", "🟡 Amarillo", "🔴 Rojo"],`
Después (con 16 espacios de sangría en las dos líneas):

```js
                // \u00A0 une el emoji con la palabra: con un espacio normal, «🟡 Amarillo» se parte en móvil.
                opciones: ["🟢\u00A0Verde", "🟡\u00A0Amarillo", "🔴\u00A0Rojo"],
```

Otra vez, `\u00A0` son seis caracteres escritos, no el carácter invisible. El cierre
(`🟢 Verde: …` en las líneas 500 a 502) no se toca.

**Comprobación:** en el script, `h3 semáforo 375` y `h3 semáforo 360` pasan a `OK`. El recorrido
(verificación final) vuelve a probar el decide-revela del semáforo entero.

**Commit:** `fix(avanzado): el botón «Amarillo» del semáforo no se parte en móvil`

## Tarea 8 (H11): el prompt se ve completo

Archivo: `client/src/components/avanzado/tipos/Plantilla.jsx:27`. Lo usan `v1-3-9`, `v1-7-4`,
`v1-7-5` y `v1-7-6`.
Antes: `sm:p-5 sm:text-sm lg:max-h-[60vh] lg:overflow-auto">`
Después: `sm:p-5 sm:text-sm">`

**Comprobación:** en el script, las cuatro líneas `h11 prompt` pasan a `OK` (0 px ocultos). Además,
`grep -c "max-h-\[60vh\]" client/src/components/avanzado/tipos/Plantilla.jsx` da `0`.

**Commit:** `fix(avanzado): el prompt se ve completo, sin desplazamiento interno invisible`

## Tarea 9 (H12): el panel de la encuesta en móvil

Archivo: `client/src/components/layout/AppLayout.jsx`, línea 46, **dentro** de la rama del avanzado
del objeto `M` (`const M = ES_AVANZADO ? {`, líneas 11 a 50). La rama del básico (líneas 51 a 91) y el
JSX compartido de la línea 560 no se tocan.

**1. Aparta el cambio ajeno.** `AppLayout.jsx` ya trae un cambio sin commit (la barra espaciadora,
líneas 167 y 168) que no es de este plan y no debe entrar en tu commit:

```bash
cd /d/curso_IA
git diff --quiet -- client/src/components/layout/AppLayout.jsx; echo $?
```

- Si imprime `1`: `git stash push -m "pendiente: barra espaciadora" -- client/src/components/layout/AppLayout.jsx`
  y repite el `git diff --quiet …; echo $?`: ahora debe imprimir `0`.
- Si imprime `0`: no hay nada que apartar; salta el paso 5.

**2. Edita.**
Antes: `panelDerechoColor: 'bg-av-fondo-2 border-av-linea',`
Después (con 4 espacios de sangría en las dos líneas):

```js
    // max-xl: en móvil el panel crece hasta 70vh (con 45vh la 5.ª opción de la encuesta quedaba oculta).
    panelDerechoColor: 'bg-av-fondo-2 border-av-linea max-xl:max-h-[70vh]',
```

**3. Comprueba.** Corre el script: las cuatro líneas `h12 encuesta` pasan a `OK` y `h12 escritorio sin
cambio` sigue en `OK` (`max-height … none`).
**Plan B:** si alguna `h12 encuesta` sigue en rojo y dice `max-height 365.4px` o `300.15px`, la clase no
le ganó a la del JSX compartido: cambia `max-xl:max-h-[70vh]` por `max-xl:!max-h-[70vh]` y vuelve a
correr el script. Si sigue en rojo, para y pregunta.
Además, `cd client && npx eslint src/components/layout/AppLayout.jsx 2>&1 | tail -1` debe dar lo mismo
que en la tarea 0 (6 problems).

**4. Commit**, solo ese archivo:
`git add client/src/components/layout/AppLayout.jsx && git commit -m "fix(avanzado): el panel de la encuesta muestra las cinco opciones en móvil"`.
`git show --stat HEAD` debe listar solo `AppLayout.jsx`, con 2 líneas agregadas y 1 quitada.

**5. Devuelve el cambio ajeno**, solo si lo apartaste en el paso 1: `git stash pop`. Luego,
`git diff -- client/src/components/layout/AppLayout.jsx` debe mostrar únicamente el cambio de la
barra espaciadora, y `git stash list` ya no debe tener «pendiente: barra espaciadora». Si el `pop` da
conflicto, para y pregunta: no lo resuelvas.

## Tarea 10 (H13, H16): notas para el guion

Archivo: `docs/prompts/2026-09-24-guion-virtual-1.md` (excluido de git: se edita, no se commitea).
Agrega esta sección justo antes de `## Cómo se sabe que terminó`:

```markdown
## Notas de la revisión del 26 de septiembre de 2026

Salen de `docs/revision/2026-09-26-revision-dia-1.md` (hallazgos 13 y 16). Son para el guion: no
cambian slides.

- **Minutos por bloque (hallazgo 16).** El reparto no se ajustó después del 26 de septiembre. El
  bloque 2 ganó `v1-2-1b` y quedó con 7 slides en 14 minutos, con una animación y una pregunta; el
  bloque 4 quedó con 2 slides en 15. La revisión sugiere pasar unos 3 minutos del bloque 4 al 2: 10,
  17, 16, 12, 10, 25, 33 y 19 (siguen siendo 142). Lo decide José Luis al aprobar el guion.
- **El bloque 3 es el más apretado:** 9 slides en 16 minutos (Avianca, la tabla de casos, el
  benchmark, cuatro pasos y un decide-revela).
- **`v1-7-8`:** 6 pasos para 10 minutos. En `paso` u `ojo`: avisar que basta con llegar al paso 4,
  porque `v1-8-2` dice «Hoy: termina tu Proyecto».
- **`v1-2-4a` (hallazgo 13).** Medido en modo admin: a 1280 × 800 el último mensaje («¿cuál era el
  canon?») termina a 838 px y la barra de admin empieza a 701 px; a 1920 × 1080 cabe entero. En
  `paso`: si presentas en una pantalla de menos de 1080 px de alto, baja la página cuando aparezca ese
  mensaje, antes de pulsar «Ver respuesta».
- **`v1-7-2` en móvil (hallazgo 13).** Las piezas se encienden arriba y el prompt que se va armando
  queda abajo. En `ojo`: quien sigue la clase desde el teléfono tiene que bajar para verlo.
```

**Comprobación:** `grep -c "Notas de la revisión del 26 de septiembre" /d/curso_IA/docs/prompts/2026-09-24-guion-virtual-1.md` da `1`.

Sin commit.

## Tarea 11 (H1): el enlace del Anonimizador — BLOQUEADA

**Estado:** bloqueada hasta que José Luis pase el enlace **en el chat**. Si no lo tienes al llegar
aquí, sáltala, márcala «bloqueada» en tu informe y sigue con la verificación final. En ese caso el
`git grep` del marcador sigue dando una línea: es lo esperado.

Cuando llegue el enlace (abajo, `ENLACE` es el enlace tal cual lo pasó José Luis):

**a) `client/public/materiales/tarea-virtual-2.md:10`.**
Antes: `Se baja de aquí: [ENLACE DE DRIVE]`
Después: `Se baja de aquí: ENLACE`

**b) `v1-8-2`, `VIRTUAL_1.js:747`.**
Antes: `action: "Baja el Anonimizador del enlace de Drive, comprueba que abre y elige un contrato propio en .docx"`
Después: `action: "Baja el Anonimizador (el enlace está en el siguiente slide), comprueba que abre y elige un contrato propio en .docx"`

**c) `v1-8-3`, un recurso más.** El slide 40 enlaza cada material con `target="_blank"`
(`Materiales.jsx:16`), así que sirve para un enlace externo. Antes (línea 764, la última de
`resources`):

```
{ title: "Tarea para la Virtual 2", type: "MD", description: "Elige tu contrato y prueba el Anonimizador.", downloadUrl: "/materiales/tarea-virtual-2.md", icon: "Package" }
```

Después (la línea 764 gana una coma al final, y se agrega la nueva con la misma sangría de 20
espacios):

```js
                    { title: "Tarea para la Virtual 2", type: "MD", description: "Elige tu contrato y prueba el Anonimizador.", downloadUrl: "/materiales/tarea-virtual-2.md", icon: "Package" },
                    { title: "Anonimizador", type: "Drive", description: "La carpeta con el Anonimizador (index.html) y un contrato de ejemplo. Se abre en tu navegador, sin internet.", downloadUrl: "ENLACE", icon: "Package" }
```

**Comprobación:** `cd /d/curso_IA && git grep -n "ENLACE DE DRIVE" client/` no da nada, y en el script
`h1` pasa de `PENDIENTE` a `OK`. Si el enlace no es de `drive.google.com`, cambia en el script el
selector `a[href*="drive.google.com"]` por el dominio del enlace.

**Commit:** `fix(avanzado): enlace del Anonimizador en la tarea y en los materiales`

---

## Verificación final

1. `cd /d/curso_IA/client && node --test src/components/avanzado/*.test.js` da 17 de 17.
2. `npx eslint src/components/avanzado src/data/avanzado` da 0 errores.
3. `npx eslint src/components/layout/AppLayout.jsx 2>&1 | tail -1` da lo mismo que en la tarea 0.
4. `cd /d/tmp/pw-curso && node verificar-correcciones-v1.mjs` termina en «Todo en verde.». La línea
   `h1` puede salir `PENDIENTE` si la tarea 11 sigue bloqueada.
5. El recorrido termina en «Sin problemas.»:
   `cd /d/tmp/pw-curso && cp /d/curso_IA/docs/revision/recorrido-avanzado.mjs . && node recorrido-avanzado.mjs http://localhost:5174 D:/tmp/pw-curso/capturas-correcciones`
6. `cd /d/curso_IA && git status --short docs/revision/capturas-avanzado | wc -l` da lo mismo que en la
   tarea 0: el recorrido no tocó las capturas versionadas.
7. `git grep -n "ENLACE DE DRIVE" client/` no da nada, si ya llegó el enlace. Si no, da una sola línea
   (`tarea-virtual-2.md:10`) y la tarea 11 queda «bloqueada» en el informe.
8. El básico no cambió: `git diff --name-only 69760f2 HEAD -- client/src client/public` lista solo
   archivos con `avanzado` o `materiales` en la ruta, más `client/src/components/layout/AppLayout.jsx`.
   Y `git diff 69760f2 HEAD -- client/src/components/layout/AppLayout.jsx` solo cambia líneas entre la
   11 y la 51.
9. Abre estas capturas de `D:/tmp/pw-curso/capturas-correcciones` y confirma a ojo que se ve el texto
   nuevo: `02-v1-1-2-escritorio.png`, `09-v1-2-3-escritorio.png`, `25-v1-6-1-escritorio.png` y
   `26-v1-6-2-escritorio.png`. Los números del principio salen del orden del mazo; si no coinciden,
   búscalas por el id.

**El informe del ejecutor** trae, por tarea: el rojo y el verde pegados, el hash del commit y lo que
se desvió del plan. Al final: la salida completa del script y la del recorrido, y la lista de tareas
bloqueadas.

## Para el ensayo, fuera de este plan

- La encuesta en un teléfono real y **como alumno**: la vista de alumno no se pudo probar con Supabase
  bloqueado.
- `v1-2-4a` en la pantalla que vas a compartir el 13 de octubre (ver la nota de la tarea 10).
- La cifra de Charlotin en `v1-3-4`, la víspera.

## Al cerrar

Cuando terminen el ejecutor y el revisor, se anota **una línea por rol** en `~/.claude/BITACORA.md`
(fecha | rol | modelo | effort | acertó | costo | una frase). Van tres: planeador (`claude-opus-5-5`,
`high`, medido por cuántas tareas emergentes aparecieron), ejecutor y revisor (`claude-opus-5-5`,
`medium`, su primera corrida en ese esfuerzo).

---

## Anexo A: `D:\tmp\pw-curso\verificar-correcciones-v1.mjs`

```js
// Verifica en pantalla las correcciones de la Virtual 1 (plan docs/plans/2026-09-26-correcciones-virtual-1-plan.md).
// Solo lee: no guarda capturas ni escribe en el repo. Modo admin, Supabase bloqueado, movimiento reducido.
// Uso, desde D:\tmp\pw-curso (donde está instalado playwright), con el servidor del avanzado en 5174:
//   node verificar-correcciones-v1.mjs [http://localhost:5174]
// Sale con código 1 si algo falla. «PENDIENTE» no cuenta como falla.
import { chromium } from 'playwright';

const url = process.argv[2] || 'http://localhost:5174';
const fallas = [];
const ok = (cond, id, detalle) => {
    console.log(`${cond ? 'OK      ' : 'FALLA   '} ${id}: ${detalle}`);
    if (!cond) fallas.push(id);
};
const nav = await chromium.launch();

async function abrir(viewport, movil) {
    const c = await nav.newContext({ viewport, isMobile: movil, hasTouch: movil, reducedMotion: 'reduce' });
    await c.routeWebSocket(/supabase\.co/, (ws) => ws.close());
    await c.addInitScript(() => localStorage.setItem('course_admin_auth', 'true'));
    await c.route(/supabase\.co/, (r) => r.abort());
    const p = await c.newPage();
    await p.goto(url);
    await p.waitForSelector('[data-slide-id]');
    await p.evaluate(() => document.fonts.ready);
    return { c, p };
}
const idActual = (p) => p.getAttribute('[data-slide-id]', 'data-slide-id');
// Solo avanza: los ids de cada tamaño van en el orden del mazo.
async function ir(p, destino) {
    for (let n = 0; n < 45 && (await idActual(p)) !== destino; n++) {
        const antes = await idActual(p);
        await p.keyboard.press('ArrowRight');
        await p.waitForFunction((id) => document.querySelector('[data-slide-id]')?.getAttribute('data-slide-id') !== id, antes);
    }
    if ((await idActual(p)) !== destino) throw new Error(`no se llegó a ${destino}`);
}

// Hallazgo 8: «1 050 000» en una sola línea, con espacios de no separación; Gemini con su ventana.
async function cifraGPT(p, tam) {
    const r = await p.evaluate(() => {
        const celda = [...document.querySelectorAll('[role="cell"]')].find((c) => /1\s050\s000/.test(c.textContent));
        if (!celda) return null;
        const recorrido = document.createTreeWalker(celda, NodeFilter.SHOW_TEXT);
        for (let nodo = recorrido.nextNode(); nodo; nodo = recorrido.nextNode()) {
            const m = /1\s050\s000/.exec(nodo.data);
            if (!m) continue;
            const rango = document.createRange();
            rango.setStart(nodo, m.index);
            rango.setEnd(nodo, m.index + m[0].length);
            return { lineas: new Set([...rango.getClientRects()].map((x) => Math.round(x.top))).size, nbsp: !/ /.test(m[0]) };
        }
        return null;
    });
    ok(r && r.lineas === 1 && r.nbsp, `h8 cifra ${tam}`, r ? `${r.lineas} línea(s), no separación: ${r.nbsp}` : 'no aparece la cifra');
}

// Hallazgo 12: el panel de la encuesta muestra las cinco opciones sin desplazarse por dentro.
async function encuesta(p, id, ultima, tam) {
    await p.waitForFunction((t) => [...document.querySelectorAll('aside')].some((a) => a.textContent.includes('Interacción') && a.textContent.includes(t)), ultima, { timeout: 10000 });
    await p.waitForTimeout(500);
    const r = await p.evaluate(() => {
        const aside = [...document.querySelectorAll('aside')].find((a) => a.textContent.includes('Interacción'));
        const cuerpo = aside.children[1];
        return { oculto: cuerpo.scrollHeight - cuerpo.clientHeight, maxH: getComputedStyle(aside).maxHeight };
    });
    ok(r.oculto <= 1, `h12 encuesta ${id} ${tam}`, `${r.oculto} px ocultos dentro del panel (max-height ${r.maxH})`);
}

// Escritorio, 1280 × 800.
{
    const { c, p } = await abrir({ width: 1280, height: 800 }, false);
    await ir(p, 'v1-1-2');
    const texto = await p.textContent('[data-slide-id]');
    ok(texto.includes('Este curso: que uses la IA con método') && !/Power User|❌|✅|🎯/u.test(texto), 'h2 v1-1-2', 'viñetas propias, sin emojis ni «Power User»');
    await ir(p, 'v1-1-3');
    const maxH = await p.evaluate(() => getComputedStyle([...document.querySelectorAll('aside')].find((a) => a.textContent.includes('Interacción'))).maxHeight);
    ok(maxH === 'none', 'h12 escritorio sin cambio', `max-height del panel a 1280 px: ${maxH}`);
    await ir(p, 'v1-2-3');
    await cifraGPT(p, '1280');
    const gemini = await p.evaluate(() => [...document.querySelectorAll('[role="row"]')].find((f) => f.querySelector('[role="rowheader"]')?.textContent === 'Gemini')?.textContent || '');
    ok(gemini.includes('1M'), 'h8 Gemini', gemini.includes('—') ? 'la ventana sigue en «—»' : 'con su ventana');
    for (const id of ['v1-3-9', 'v1-7-4', 'v1-7-5', 'v1-7-6']) {
        await ir(p, id);
        const oculto = await p.$eval('[data-slide-id] pre', (pre) => pre.scrollHeight - pre.clientHeight);
        ok(oculto <= 1, `h11 prompt ${id}`, `${oculto} px ocultos dentro de la caja`);
    }
    await ir(p, 'v1-8-3');
    const drive = await p.locator('[data-slide-id] a[href*="drive.google.com"]').count();
    console.log(`${drive ? 'OK      ' : 'PENDIENTE'} h1 enlace de Drive en v1-8-3: ${drive ? 'está' : 'todavía no'}`);
    await c.close();
}

// Móvil, 375 × 812.
{
    const { c, p } = await abrir({ width: 375, height: 812 }, true);
    await ir(p, 'v1-1-3');
    await encuesta(p, 'v1-1-3', 'Solo versiones gratuitas', '375x812');
    await ir(p, 'v1-1-5');
    await encuesta(p, 'v1-1-5', 'Todavía poco: vengo a eso', '375x812');
    await ir(p, 'v1-2-3');
    await cifraGPT(p, '375');
    await c.close();
}

// Móvil chico, 375 × 667: la encuesta.
{
    const { c, p } = await abrir({ width: 375, height: 667 }, true);
    await ir(p, 'v1-1-3');
    await encuesta(p, 'v1-1-3', 'Solo versiones gratuitas', '375x667');
    await ir(p, 'v1-1-5');
    await encuesta(p, 'v1-1-5', 'Todavía poco: vengo a eso', '375x667');
    await c.close();
}

// Hallazgo 3: cada botón del semáforo en una sola línea, a 375 y a 360 px.
for (const ancho of [375, 360]) {
    const { c, p } = await abrir({ width: ancho, height: 800 }, true);
    await ir(p, 'v1-6-4');
    const partidas = await p.evaluate(() => [...document.querySelectorAll('[data-decide] label span.flex-1')]
        .filter((s) => Math.round(s.getBoundingClientRect().height / parseFloat(getComputedStyle(s).lineHeight)) > 1
            || s.parentElement.scrollWidth > s.parentElement.clientWidth + 1)
        .map((s) => s.textContent));
    ok(partidas.length === 0, `h3 semáforo ${ancho}`, partidas.length ? `se parten: ${[...new Set(partidas)].join(', ')}` : 'las 30 opciones en una línea');
    await c.close();
}

await nav.close();
console.log(fallas.length ? `\n${fallas.length} falla(s).` : '\nTodo en verde.');
process.exit(fallas.length ? 1 : 0);
```
