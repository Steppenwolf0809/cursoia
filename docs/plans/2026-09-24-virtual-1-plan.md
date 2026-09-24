# Virtual 1 · plan de ejecución (fase 2)

Fecha: 24 sep 2026. Rama: `curso-avanzado-v1`. Ejecutor: `sonnet` / `medium`.
Fuentes permitidas: `docs/plans/2026-09-24-virtual-1-investigacion.md` (abreviada **INV**), `…-holly-cope-resumen.md` (**HC**), `…-ai-fluency-resumen.md` (**AIF**), `Claude outputs/04-privacidad-y-confidencialidad.md` (**PRIV**), `D:\anonimizador\README.md` y `docs/AVANCE.md` (**ANON**, solo lectura).
Nada marcado NO VERIFICADO en INV pasa a los slides (ver §F).

## A. Decisiones del plan

1. **Hilo 4D, sí.** Mapa de la sesión en `v1-1-6` y resumen final en 4D. Motivo: 3 de los 4 ejes calzan con respaldo (AIF, «Mapeo»). Delegación es el más forzado; el harness es aporte propio.
2. **Licencia AI Fluency (CC BY-NC-SA).** El curso se cobra, así que **no se reproduce ni se adapta material** (videos, textos, diapositivas). Solo se cita el marco por nombre, con autores (Rick Dakan y Joseph Feller, con Anthropic) y el enlace `https://aifluencyframework.org/`. Las explicaciones son propias. Pendiente para José Luis: usar clips o texto del curso requiere permiso de Anthropic.
3. **Holly Cope.** Crédito con enlace en `v1-3-5`, mención en `v1-3-6` a `v1-3-9` y en `tutorial-evitar-alucinaciones.md`. Se usa su método con caso, prompts y fuentes ecuatorianos en palabras propias. Sin clips (permiso pendiente).
4. **Selector.** Un archivo nuevo, `client/src/data/cursos.js`, elige según `import.meta.env.VITE_COURSE`. Solo cambia la línea 3 de `App.jsx`. Ambos cursos quedan en el bundle; es lo más simple y el básico no cambia.
5. **Ids.** Un módulo por sesión: `v1-virtual-1`. Slides `v1-<bloque>-<n>`. Galería con `exerciseId: "v1-mi-despacho"`. Las encuestas usan el id del slide como id de votación (`App.jsx:132`), así que el prefijo evita mezclar votos con el básico en Supabase. La pizarra (`whiteboard`) se incluye tal cual.
6. **Reutilizar por referencia.** `1-2`, `1-4`, `1-4b` (Módulo 1) y `2-2` (Módulo 2) se importan con `delBasico()`, que solo cambia el id. Se reescriben en cambio:
   - Tokens (`1-5c`): «~4 letras» e «Inteligencia = 3 tokens» no están en INV y chocan con el dato de Anthropic (1M tokens ≈ 555 000 palabras).
   - Analogía del auto (`1-8`): «GPT-5, Sonnet 4.5» es viejo.
   - Descanso (`4-11`): dice 15 min y aquí son 10.
7. **Portada.** `portada_ia_basico.png` dice «BÁSICO». Se usa `/images/llm-diagram.png` (sin texto) mientras José Luis elige una portada propia.
8. **Semáforo en `comparison`.** Tres filas de tres columnas, responsive con desplazamiento horizontal. No se crea tipo nuevo.
9. **Orden del bloque 6:** reglas → LOPDP → niveles → semáforo → Anonimizador (el mapa decía semáforo antes que LOPDP). El semáforo dice a qué nivel va cada color, así que los niveles tienen que ir antes.
10. **Hallazgo de la Resolución SPDP-SPD-2026-0004-R, art. 23:** el encargo de tratamiento **no es** transferencia internacional. Esto corrige PRIV («es transferencia con o sin entrenamiento») y la «Mi interpretación» de INV C.A. Criterio del curso: si no tienes un contrato de encargo por escrito, trátalo como transferencia y seudonimiza o pide consentimiento (art. 60.2). En el slide se separa lo que dice la norma del criterio del curso.
11. **Amarillo = plan pago con entrenamiento desactivado, solo después de seudonimizar en tu computadora, o con consentimiento informado.** Es preferible un plan de equipo. Me aparto de INV C.C (que pedía nivel 2) para ser coherente con PRIV y con el pre-trabajo y la Virtual 2, que usan Pro o Plus con documentos seudonimizados.
12. **«Configura tu IA» cabe en los 35 min del bloque 7 sin recortar otro bloque.** Se omite `2-3` (desglose de R.C.T.F., ya visto en el básico). Los niveles cuenta/proyecto/carpeta van en la misma tabla de «dónde» (`v1-7-7`) y no en un slide aparte. El ejercicio queda en 10 min.
13. **Extracto del CLAUDE.md de José Luis** (`v1-7-4`): «Español de Ecuador, tuteo…», 5 de los 6 puntos de «Estilo de respuesta» y los 2 de «Verificar antes de afirmar», adaptados. **Requiere su aprobación.** No va en los descargables.
14. **Rutas de menú:** solo las que INV da sin marca. Quedan fuera:
    - la ruta de Estilos de Claude (sin fuente oficial);
    - Cowork y su archivo de instrucciones (NO VERIFICADO);
    - el nombre del campo de Proyectos en ChatGPT;
    - por precaución, los límites de caracteres de ChatGPT (1500/5000): INV no los marca, pero vienen de un extracto del buscador sobre una página que devolvió 403.
15. **Tutorial:** ocupa 6 slides (`v1-3-5` a `v1-3-10`). El protocolo de verificación se fusiona con el paso 5 (`v1-3-10`) para cuadrar los 20 min.
16. **Slide nuevo `v1-3-4`** con casos de América Latina y la base de Charlotin (2077 casos al 24 sep 2026). Se aclara que no hay caso ecuatoriano confirmado.
17. **Precios:** solo Claude Pro y ChatGPT Plus, 20 USD al mes (INV D.A.1 y nota del controlador). Nada de Team, Business, Enterprise ni Go (hay discrepancia de 6 frente a 8 USD).
18. **Anonimizador:** 3 slides con las capturas que ya existen en `client/public/images/avanzado/` (documento sintético `caso-con-partes.docx`). Se habla solo de `.docx`, porque el soporte de PDF no aparece probado en ANON/AVANCE.
19. **Encuesta:** 3 slides (herramienta, frecuencia, uso), porque el tipo `poll` admite una sola pregunta.
20. **Materiales `.md` con BOM UTF-8.** Motivo: el visor abre la URL en una pestaña nueva (`ResourcesDownload.jsx:23`, `window.open`) y sin charset las tildes pueden salir mal. Se enlazan desde `v1-8-3` (`resources-download`; `next-steps` no tiene campo de enlace, `NextSteps.jsx`). El checklist y el tutorial se enlazan también en línea desde `v1-3-10`: los bullets de `narrative` aceptan HTML (`SlideRenderer.jsx:195`).
21. **Tipos preferidos:** los que tienen clases responsive (`narrative`, `comparison`, `warning`, `analogy`, `concept`, `list-comparison`, `feature-highlight`, `stat-comparison`). `prompt-template`, `next-steps`, `resources-download` y `exercise-interactive` no son responsive (usan `text-5xl` y `p-8` fijos). Es un riesgo para la fase 4 en 375 px: si se cortan, se anota y no se toca el componente.

## B. Selector de curso

**Cambio en `client/src/App.jsx`, línea 3.** La línea de hoy es:

```js
import { COURSE_MODULES } from './data/course-content';
```

y queda así:

```js
import { COURSE_MODULES } from './data/cursos';
```

No se toca nada más de `App.jsx`.

**Archivo nuevo `client/src/data/cursos.js`:**

```js
import { COURSE_MODULES as BASICO } from './course-content';
import { COURSE_MODULES as AVANZADO } from './avanzado/index.js';

// VITE_COURSE=avanzado muestra el curso avanzado; sin la variable (o con otro valor), el básico.
export const COURSE_MODULES = import.meta.env.VITE_COURSE === 'avanzado' ? AVANZADO : BASICO;
```

**Archivo nuevo `client/src/data/avanzado/index.js`:**

```js
import { VIRTUAL_1 } from './VIRTUAL_1.js';
import { WHITEBOARD_MODULE } from '../WHITEBOARD_MODULE';

export const COURSE_MODULES = [VIRTUAL_1, WHITEBOARD_MODULE];
```

**Archivo nuevo `client/src/data/avanzado/VIRTUAL_1.js`.** Se arma pegando, en este orden: la cabecera C.0, los 43 objetos de §C en orden (cada uno termina en coma) y el pie C.99.

Cómo se levanta cada curso:
- Básico: `cd client && npx vite`.
- Avanzado (Git Bash): `cd client && VITE_COURSE=avanzado npx vite --port 5174`.
- Avanzado (PowerShell): `$env:VITE_COURSE='avanzado'; npx vite --port 5174`.

Supabase: `session_state` es compartido. Si el básico dejó `module-1` guardado, el avanzado no lo encuentra y abre su primer slide (`App.jsx:74-83`). Es el comportamiento esperado.

## C. Lista final de slides (43 · 150 min)

| # | id | tipo | título | min | origen |
|---|---|---|---|---|---|
| 1 | v1-1-1 | hero | Portada | 1 | A |
| 2 | v1-1-2 | profile | ¿Quién soy? | 2 | R `1-2` |
| 3 | v1-1-3 | poll | ¿Qué IA usas más en tu trabajo? | 1 | A |
| 4 | v1-1-4 | poll | ¿Con qué frecuencia la usas? | 1 | A |
| 5 | v1-1-5 | poll | ¿Para qué la usas más? | 2 | A |
| 6 | v1-1-6 | comparison | El hilo de hoy: las 4D | 3 | N |
| 7 | v1-2-1 | analogy | Tokens: la moneda de la IA | 3 | A |
| 8 | v1-2-2 | stat-comparison | Ventana de contexto | 3 | A |
| 9 | v1-2-3 | comparison | Modelos vigentes, septiembre 2026 | 3 | N |
| 10 | v1-2-4 | narrative | Por qué la IA «olvida» | 6 | N |
| 11 | v1-3-1 | warning | La IA miente | 1 | R `1-4` |
| 12 | v1-3-2 | narrative | La vez que la IA me engañó por días | 2 | R `1-4b` |
| 13 | v1-3-3 | narrative | Mata v. Avianca | 2 | N |
| 14 | v1-3-4 | comparison | No es un problema de otros países | 2 | N |
| 15 | v1-3-5 | narrative | Tutorial: por qué adivina | 2 | N |
| 16 | v1-3-6 | narrative | Tutorial 1: marco de confianza | 2 | N |
| 17 | v1-3-7 | narrative | Tutorial 2: el prompt malo | 2 | N |
| 18 | v1-3-8 | prompt-template | Tutorial 3: el prompt mejor | 2 | N |
| 19 | v1-3-9 | prompt-template | Tutorial 4: el prompt aún mejor | 2 | N |
| 20 | v1-3-10 | narrative | Tutorial 5: verifica y protocolo | 3 | N |
| 21 | v1-4-1 | analogy | El modelo es el motor | 4 | A |
| 22 | v1-4-2 | narrative | Tres formas de trabajar con IA | 5 | N |
| 23 | v1-4-3 | list-comparison | Qué delegar y qué no | 6 | N |
| 24 | v1-5-1 | break | Descanso | 10 | A |
| 25 | v1-6-1 | warning | Reglas de oro | 4 | A |
| 26 | v1-6-2 | narrative | LOPDP: tú eres el responsable | 7 | N |
| 27 | v1-6-3 | comparison | Niveles de protección | 6 | N |
| 28 | v1-6-4 | comparison | Semáforo | 6 | N |
| 29 | v1-6-5 | feature-highlight | Anonimizador 1: abre y revisa | 2 | N |
| 30 | v1-6-6 | feature-highlight | Anonimizador 2: etiqueta | 2 | N |
| 31 | v1-6-7 | feature-highlight | Anonimizador 3: revisa y exporta | 3 | N |
| 32 | v1-7-1 | feature-highlight | Proyectos en Claude y ChatGPT | 3 | A `3-4` |
| 33 | v1-7-2 | concept | Fórmula R.C.T.F. | 2 | R `2-2` |
| 34 | v1-7-3 | narrative | Configura tu IA: qué dejar fijo | 4 | N |
| 35 | v1-7-4 | prompt-template | Ejemplo real | 3 | N |
| 36 | v1-7-5 | prompt-template | Plantilla 1: tu cuenta | 3 | N |
| 37 | v1-7-6 | prompt-template | Plantilla 2: «Mi despacho» | 3 | N |
| 38 | v1-7-7 | comparison | Dónde se configura | 5 | N |
| 39 | v1-7-8 | exercise-interactive | Ejercicio: crea «Mi despacho» | 10 | A `4-4` |
| 40 | v1-7-9 | gallery-view | Galería | 2 | A `4-4b` |
| 41 | v1-8-1 | summary | Lo que te llevas hoy | 4 | A |
| 42 | v1-8-2 | next-steps | Tarea para la Virtual 2 | 6 | N |
| 43 | v1-8-3 | resources-download | Materiales de la sesión | 5 | N |

Minutos por bloque: 10 + 15 + 20 + 15 + 10 + 30 + 35 + 15 = 150.

### C.0 Cabecera de `VIRTUAL_1.js`

```js
import { ShieldCheck } from 'lucide-react';
import { COURSE_MODULES as BASICO } from '../course-content';
import { MODULE_2 } from '../MODULO_2';

const MODULO_1 = BASICO.find((m) => m.id === 'module-1');

// Reutiliza una diapositiva del curso básico sin copiarla; solo cambia el id
// para que no choque en session_state ni en las encuestas.
function delBasico(modulo, id, nuevoId) {
    const slide = modulo.slides.find((s) => s.id === id);
    if (!slide) throw new Error(`No existe la diapositiva ${id} en ${modulo.id}`);
    return { ...slide, id: nuevoId };
}

export const VIRTUAL_1 = {
    id: "v1-virtual-1",
    title: "Virtual 1: Fundamentos exprés y confidencialidad",
    icon: ShieldCheck,
    slides: [
```

### Bloque 1 · Bienvenida y encuesta (10 min)

```js
        {
            id: "v1-1-1",
            title: "Portada",
            type: "hero",
            contentData: {
                heading: "IA avanzada para abogados",
                paragraph: "Virtual 1 · Fundamentos exprés y confidencialidad. Martes 13 de octubre de 2026.",
                image: "/images/llm-diagram.png"
            }
        },
```
Fuente: temario (`02-temario-detallado.md`) y nombre del curso (`01-decisiones-y-estado.md`).

```js
        delBasico(MODULO_1, "1-2", "v1-1-2"),
```
Fuente: slide `1-2` del básico, reutilizado tal cual.

```js
        {
            id: "v1-1-3",
            title: "¿Qué IA usas más en tu trabajo?",
            type: "poll",
            interaction: {
                type: "LivePoll",
                data: {
                    question: "¿Qué IA usas más en tu trabajo?",
                    options: [
                        "Claude (Pro o Max)",
                        "ChatGPT (Plus o Pro)",
                        "Gemini",
                        "Varias por igual",
                        "Solo versiones gratuitas"
                    ]
                }
            }
        },
        {
            id: "v1-1-4",
            title: "¿Con qué frecuencia la usas?",
            type: "poll",
            interaction: {
                type: "LivePoll",
                data: {
                    question: "¿Con qué frecuencia usas IA en tu trabajo?",
                    options: [
                        "Todos los días",
                        "Varias veces por semana",
                        "Una vez por semana o menos"
                    ]
                }
            }
        },
        {
            id: "v1-1-5",
            title: "¿Para qué la usas más?",
            type: "poll",
            interaction: {
                type: "LivePoll",
                data: {
                    question: "¿Para qué usas más la IA hoy?",
                    options: [
                        "Redactar escritos, minutas o contratos",
                        "Revisar documentos y contratos",
                        "Investigar normativa y jurisprudencia",
                        "Correos y tareas administrativas",
                        "Todavía poco: vengo a eso"
                    ]
                }
            }
        },
```
Fuente: no llevan datos.

```js
        {
            id: "v1-1-6",
            title: "El hilo de hoy: las 4D",
            type: "comparison",
            contentData: {
                heading: "El hilo de hoy: las 4D de la fluidez en IA",
                paragraph: "Marco AI Fluency, de Rick Dakan y Joseph Feller con Anthropic (aifluencyframework.org). Lo citamos y lo aplicamos con nuestras palabras.",
                headers: ["Competencia", "La pregunta", "Dónde la trabajamos hoy"],
                rows: [
                    ["Delegación", "¿Qué hago yo y qué hace la IA?", "Harness y agentes"],
                    ["Descripción", "¿Cómo le digo lo que necesito?", "R.C.T.F. y Configura tu IA"],
                    ["Discernimiento", "¿Cómo evalúo lo que me entrega?", "Alucinaciones y verificación"],
                    ["Diligencia", "¿Cómo lo hago de forma responsable?", "Confidencialidad y LOPDP"]
                ]
            }
        },
```
Fuente: AIF, «El marco de las 4D», «Mapeo a la Virtual 1» y «Licencia» (autores y URL).

### Bloque 2 · Tokens y contexto (15 min)

```js
        {
            id: "v1-2-1",
            title: "Tokens: la moneda de la IA",
            type: "analogy",
            contentData: {
                heading: "¿Qué es un token?",
                left: { title: "Para ti", text: "Palabras", icon: "User" },
                right: { title: "Para la IA", text: "Pedazos de texto", icon: "Cpu" },
                footer: "Todo se mide en tokens: lo que escribes, lo que adjuntas y lo que responde. Según Anthropic, 1 millón de tokens son unas 555 000 palabras con su tokenizador actual."
            }
        },
```
Fuente: INV D.A.1 (nota de la doc de modelos de Anthropic).

```js
        {
            id: "v1-2-2",
            title: "Ventana de contexto",
            type: "stat-comparison",
            contentData: {
                heading: "La ventana de contexto creció",
                statSecondary: "200K",
                statPrimary: "1M",
                label: "Tokens: la cifra del curso básico frente a Claude Opus 5.5, Sonnet 5 y Fable 5.1 hoy",
                quote: "Más grande no significa infalible: la ventana sigue siendo finita y la IA sigue pudiendo inventar."
            }
        },
```
Fuente: INV D.A.1 (tabla de modelos y artículo 8606394 del Help Center).

```js
        {
            id: "v1-2-3",
            title: "Modelos vigentes, septiembre 2026",
            type: "comparison",
            contentData: {
                heading: "Modelos vigentes, septiembre de 2026",
                paragraph: "Actualiza lo que viste en el curso básico: Claude 3.5 Sonnet y GPT-4o ya no son la referencia.",
                headers: ["IA", "Modelos", "Ventana de contexto"],
                rows: [
                    ["Claude", "Fable 5.1, Opus 5.5, Sonnet 5 y Haiku 4.5", "1M tokens (Haiku 4.5: 200K)"],
                    ["ChatGPT", "GPT-6 Astra; GPT-6 Sol y Luna desde el 22 de septiembre", "GPT-6 Sol por API: 1 050 000 tokens. En la app no hay una cifra oficial que hayamos podido confirmar"],
                    ["Gemini", "Gemini 3.1 Pro y Gemini 3 Flash", "Sin cifra oficial confirmada"]
                ]
            }
        },
```
Fuente: INV D.A.1 (platform.claude.com/docs/en/models/overview), D.A.2 (openai.com/index/gpt-6-astra; developers.openai.com/api/docs/models/gpt-6-sol), D.A.3 (blog.google Gemini 3.1 Pro).

```js
        {
            id: "v1-2-4",
            title: "Por qué la IA «olvida»",
            type: "narrative",
            contentData: {
                Heading1: "Por qué la IA «olvida» en chats largos",
                paragraph1: "La ventana de contexto es la memoria de trabajo del modelo, y es finita. Todo lo que escribiste, lo que adjuntaste y lo que respondió ocupa espacio en ella.",
                bullets1: [
                    "Lo que no cabe en la ventana, el modelo no lo ve",
                    "Un chat que mezcla tres casos mezcla también sus datos",
                    "Cambiar de tema a mitad del chat arrastra el contexto anterior"
                ],
                Heading2: "Cuándo abrir un chat nuevo",
                paragraph2: "Abre uno nuevo en cualquiera de estos casos:",
                bullets2: [
                    "Cambias de caso o de cliente",
                    "La IA repite errores que ya corregiste o retoma ideas que descartaste",
                    "Empiezas una tarea distinta: pide antes un resumen y llévalo al chat nuevo"
                ],
                highlight: { type: "success", text: "Demo en vivo: el mismo pedido en un chat largo y en uno nuevo." }
            }
        },
```
Fuente: AIF lecciones 05 (3A, ventana como memoria de trabajo limitada), 06 (3B, ventana finita) y 10 (Lesson 8, reinsertar ideas descartadas). Lo demás es criterio práctico del curso.

### Bloque 3 · Alucinaciones y verificación (20 min)

```js
        delBasico(MODULO_1, "1-4", "v1-3-1"),
        delBasico(MODULO_1, "1-4b", "v1-3-2"),
```
Fuente: básico `1-4` y `1-4b`, tal cual.

```js
        {
            id: "v1-3-3",
            title: "Mata v. Avianca",
            type: "narrative",
            contentData: {
                Heading1: "Mata v. Avianca: seis sentencias que nunca existieron",
                paragraph1: "Nueva York, 2023. En un juicio contra Avianca, los abogados del demandante presentaron un escrito con seis resoluciones judiciales inventadas por ChatGPT, con citas y fragmentos de sentencias que no existen.",
                bullets1: [
                    "Corte de Distrito de EE. UU. para el Distrito Sur de Nueva York. Juez P. Kevin Castel. Expediente 1:22-cv-01461",
                    "Casos inventados, entre otros: <em>Varghese v. China Southern Airlines</em> y <em>Shaboon v. Egyptair</em>",
                    "Sancionados: Steven A. Schwartz y Peter LoDuca, y su firma, Levidow, Levidow &amp; Oberman"
                ],
                Heading2: "La sanción: orden del 22 de junio de 2023",
                paragraph2: "Multa de 5000 dólares, solidaria entre los dos abogados y la firma. Además, el juez ordenó enviar cartas al cliente y a cada juez que aparecía falsamente como autor de las sentencias inventadas.",
                highlight: { type: "info", text: "La IA no firmó el escrito. Lo firmaron ellos." }
            }
        },
```
Fuente: INV B.A (CourtListener opinión 9885417; FindLaw).

```js
        {
            id: "v1-3-4",
            title: "No es un problema de otros países",
            type: "comparison",
            contentData: {
                heading: "No es un problema de otros países",
                paragraph: "La base pública de Damien Charlotin registraba 2077 casos en el mundo al 24 de septiembre de 2026. En Ecuador no encontramos ningún caso confirmado todavía.",
                headers: ["Dónde", "Qué pasó", "Consecuencia"],
                rows: [
                    ["Colombia · Corte Suprema, auto AC739-2026 (13 feb 2026)", "Un abogado citó diez sentencias inexistentes generadas con IA en un recurso de revisión", "Multa de 15 salarios mínimos"],
                    ["Colombia · Corte Suprema, STC17832-2025 (5 nov 2025)", "Un tribunal de Sincelejo citó apartes de sentencias que no existían", "Se anuló el fallo"],
                    ["Chile · Corte Suprema (22 abr 2026)", "Una abogada citó doctrina inexistente en un recurso de casación", "Un mes de suspensión y multa de 5 UTM"],
                    ["Argentina · Cámara Civil y Comercial de Rosario (21 ago 2025)", "Un escrito citó fallos inexistentes generados con ChatGPT", "Reprensión y oficio al Colegio de Abogados"]
                ]
            }
        },
```
Fuente: INV B.B (damiencharlotin.com/hallucinations; Infobae, El Colombiano, La Tercera, Diario Constitucional; Derecho Ecuador para la ausencia de caso ecuatoriano).

```js
        {
            id: "v1-3-5",
            title: "Tutorial: por qué adivina",
            type: "narrative",
            contentData: {
                Heading1: "Tutorial: cómo evitar que la IA alucine",
                paragraph1: "Este tutorial adapta a Ecuador el método de Holly Cope, abogada inglesa, en su video «Reducing AI Hallucinations in Legal Work» (junio de 2026). El caso, las fuentes y los prompts son nuestros; el método y el recorrido son de ella.",
                bullets1: [
                    "Video completo: <a href='https://www.youtube.com/watch?v=Q-nA44oxXp0' target='_blank' rel='noopener noreferrer' class='underline'>youtube.com/watch?v=Q-nA44oxXp0</a>"
                ],
                Heading2: "Primero: por qué adivina",
                paragraph2: "Un estudio de OpenAI (Kalai y otros, septiembre de 2025) lo explica con un examen: si la IA no sabe un cumpleaños y adivina, acierta 1 de cada 365 veces; si dice «no sé», saca cero siempre. Como a los modelos se los evalúa así, aprenden a adivinar con seguridad.",
                highlight: { type: "success", text: "La idea central de Holly Cope: no le pidas a la IA que acierte; pídele que sea transparente sobre lo que no sabe." }
            }
        },
```
Fuente: HC («Por qué alucina», «Ideas para cerrar»); INV B.C.1 (arxiv.org/abs/2509.04664).

```js
        {
            id: "v1-3-6",
            title: "Tutorial 1: marco de confianza",
            type: "narrative",
            contentData: {
                Heading1: "Paso 1: el marco de confianza",
                paragraph1: "Trata cada respuesta como el trabajo de un abogado junior muy bueno que todavía no llega. Antes de usarla, pásala por cinco preguntas:",
                bullets1: [
                    "<b>Consecuencias:</b> ¿qué pasa si está mal? Un escrito o una minuta no es un correo.",
                    "<b>Evidencia:</b> ¿de dónde sale cada afirmación? Pídele la fuente.",
                    "<b>Vacíos:</b> ¿qué supuso y qué dejó fuera? Pregúntaselo directamente.",
                    "<b>Confianza no es exactitud:</b> que suene seguro no lo hace correcto.",
                    "<b>Tú verificas:</b> la última revisión es humana, siempre."
                ],
                highlight: { type: "info", text: "Marco de confianza de Holly Cope, en nuestras palabras." }
            }
        },
```
Fuente: HC «Marco de confianza (11:50–15:52)».

```js
        {
            id: "v1-3-7",
            title: "Tutorial 2: el prompt malo",
            type: "narrative",
            contentData: {
                Heading1: "Paso 2: el prompt malo",
                paragraph1: "«¿Cuál es el plazo de prescripción de una deuda en Ecuador?»",
                bullets1: [
                    "No dice si es una acción ejecutiva u ordinaria",
                    "No entrega la fuente ni pide que la cite",
                    "No le permite decir «no sé»"
                ],
                Heading2: "Qué hace la IA con eso",
                paragraph2: "Asume lo que falta y responde con total seguridad. Puede darte un artículo o un plazo inventado, o mezclarlo con otro país o con una versión anterior de la ley.",
                highlight: { type: "info", text: "Pruébalo en vivo y anota qué artículo te da. Lo verificamos en el paso 5." }
            }
        },
```
Fuente: INV B.C.4 («Prompt malo»); HC «Demo».

```js
        {
            id: "v1-3-8",
            title: "Tutorial 3: el prompt mejor",
            type: "prompt-template",
            contentData: {
                heading: "Paso 3: el prompt mejor",
                template: `Eres mi asistente de investigación jurídica en Ecuador. Te adjunto el texto vigente del Código Civil ecuatoriano [ADJUNTAR ARCHIVO O PEGAR EL TEXTO OFICIAL].

Usa ÚNICAMENTE ese documento, no tu conocimiento general. Dime:
1. ¿Cuál es el plazo de prescripción extintiva de una acción ejecutiva y de una acción ordinaria, según el texto que te di?
2. Si el documento no trae esa información completa, dilo explícitamente: no la inventes ni la completes con lo que "sueles saber" de otros países o de versiones anteriores de la ley.
3. Señala qué supuestos estás haciendo (por ejemplo, si asumes que la deuda no tiene un plazo especial distinto al general).`,
                examples: ["Solo el documento que le das", "Si falta algo, lo dice", "Declara sus supuestos"],
                tip: "Resultado esperado: declara sus supuestos y dice qué no trae el documento, en vez de inventarlo. Recorrido adaptado de Holly Cope."
            }
        },
```
Fuente: INV B.C.4 («Prompt mejor»); HC.

```js
        {
            id: "v1-3-9",
            title: "Tutorial 4: el prompt aún mejor",
            type: "prompt-template",
            contentData: {
                heading: "Paso 4: el prompt aún mejor",
                template: `Eres mi asistente de investigación jurídica en Ecuador. Te adjunto el texto vigente del Código Civil ecuatoriano [ADJUNTAR ARCHIVO O PEGAR EL TEXTO OFICIAL] y el enlace del Registro Oficial donde se publicó la última reforma relevante: [URL].

Usa ÚNICAMENTE estos documentos, no tu conocimiento general ni supuestos de otras jurisdicciones. Para cada punto de tu respuesta sobre el plazo de prescripción de una acción ejecutiva y de una ordinaria, dame:
- La fuente exacta (número de artículo y una cita textual de máximo dos líneas).
- Tu nivel de confianza (alta, media o baja) en que esa cita corresponde al texto vigente.
- Qué no está claro o qué falta en el documento que te di (por ejemplo, excepciones o plazos especiales que no puedas confirmar con lo que tienes).
- Los supuestos que hiciste, explícitos.

Si para algún punto el documento no alcanza, responde exactamente: "la información proporcionada es insuficiente para determinarlo". No completes el vacío con conocimiento general ni inventes el artículo o el plazo.`,
                examples: ["Artículo y cita textual", "Confianza alta, media o baja", "Qué falta", "Frase fija si no alcanza"],
                tip: "Truco de Holly Cope: dile de antemano qué contiene cada fuente, para que no diga que algo no estaba."
            }
        },
```
Fuente: INV B.C.4 («Prompt aún mejor»); HC «Demo» (truco extra).

```js
        {
            id: "v1-3-10",
            title: "Tutorial 5: verifica y protocolo",
            type: "narrative",
            contentData: {
                Heading1: "Paso 5: contrasta con la fuente oficial",
                paragraph1: "La respuesta está en el Código Civil (Codificación 10, Registro Oficial Suplemento 46 de 24 de junio de 2005):",
                bullets1: [
                    "<b>Art. 2414:</b> el plazo se cuenta desde que la obligación se hizo exigible.",
                    "<b>Art. 2415:</b> 5 años para la acción ejecutiva y 10 para la ordinaria.",
                    "La acción ejecutiva, vencidos sus 5 años, se convierte en ordinaria y dura 5 años más."
                ],
                Heading2: "Protocolo antes de entregar",
                paragraph2: "Pide la cita exacta, ábrela en la fuente oficial y pasa el checklist.",
                bullets2: [
                    "Registro Oficial: <a href='https://www.registroficial.gob.ec/' target='_blank' rel='noopener noreferrer' class='underline'>registroficial.gob.ec</a>",
                    "Corte Nacional de Justicia: <a href='https://busquedasentencias.cortenacional.gob.ec/' target='_blank' rel='noopener noreferrer' class='underline'>busquedasentencias.cortenacional.gob.ec</a>",
                    "Corte Constitucional: <a href='https://buscador.corteconstitucional.gob.ec/' target='_blank' rel='noopener noreferrer' class='underline'>buscador.corteconstitucional.gob.ec</a>",
                    "Descarga el <a href='/materiales/checklist-verificacion.md' target='_blank' rel='noopener noreferrer' class='underline'>checklist de verificación</a> y el <a href='/materiales/tutorial-evitar-alucinaciones.md' target='_blank' rel='noopener noreferrer' class='underline'>tutorial completo</a>"
                ],
                highlight: { type: "success", text: "¿Acertó la IA en el paso 2? Compara su artículo con el 2415." }
            }
        },
```
Fuente: INV B.C.4 «Verificación (24 sep 2026)» (presidencia.gob.ec/…/CODIGO_CIVIL.pdf, VERIFICADO) y B.C.3 (URLs oficiales).

### Bloque 4 · Harness y agentes (15 min)

```js
        {
            id: "v1-4-1",
            title: "El modelo es el motor",
            type: "analogy",
            contentData: {
                heading: "El modelo es el motor; el harness es el auto",
                left: { title: "El auto (harness)", text: "El chat, Cowork, Claude Code, Codex", icon: "Car" },
                right: { title: "El motor (modelo)", text: "Opus 5.5, Sonnet 5, GPT-6 Astra", icon: "Cpu" },
                footer: "El harness es el programa que rodea al modelo y le da herramientas, archivos y memoria. Por eso el mismo modelo rinde distinto en el chat y en un agente."
            }
        },
```
Fuente: INV D.A.1 y D.A.2 (modelos), D.B (Claude Code, Codex). La analogía es propia del curso (`contexto-propuesta-curso-avanzado.md`).

```js
        {
            id: "v1-4-2",
            title: "Tres formas de trabajar con IA",
            type: "narrative",
            contentData: {
                Heading1: "Tres formas de trabajar con IA",
                paragraph1: "El marco AI Fluency distingue tres modos. Ninguno es mejor: se eligen según la tarea.",
                bullets1: [
                    "<b>Automatización:</b> la IA ejecuta una tarea que tú defines. Ejemplo: resumir una sentencia.",
                    "<b>Aumentación:</b> piensan juntos. Ejemplo: discutir la estrategia de una contestación.",
                    "<b>Agencia:</b> la IA actúa con más autonomía dentro de lo que configuraste. Ejemplo: un agente que ordena la carpeta de un expediente."
                ],
                Heading2: "Qué es un agente",
                paragraph2: "Un modelo con herramientas que planifica, actúa y revisa en ciclo. Claude Cowork, por ejemplo, trabaja con tus archivos y carpetas y produce archivos reales. Lo vemos a fondo en la Virtual 4.",
                highlight: { type: "success", text: "Delegar no es soltar el volante: es decidir qué hace la IA y qué haces tú." }
            }
        },
```
Fuente: AIF lecciones 03 (2A) y 07 (Lesson 4); INV D.A.1 (Cowork).

```js
        {
            id: "v1-4-3",
            title: "Qué delegar y qué no",
            type: "list-comparison",
            contentData: {
                leftTitle: "Delega",
                leftItems: [
                    "Primeros borradores de minutas, escritos y correos",
                    "Resumir expedientes y normas que tú cargaste",
                    "Ordenar y comparar documentos",
                    "Preparar preguntas y listas de revisión"
                ],
                rightTitle: "No delegues",
                rightItems: [
                    "La conclusión jurídica final y la firma",
                    "Citas y jurisprudencia sin verificar",
                    "Datos de clientes sin seudonimizar",
                    "Decisiones que afectan los derechos de una persona"
                ]
            }
        },
```
Fuente: AIF lección 04 (2B: revisar con IA y reservar la conclusión final); criterio del curso.

### Bloque 5 · Descanso (10 min)

```js
        {
            id: "v1-5-1",
            title: "Descanso",
            type: "break",
            contentData: {
                heading: "Descanso de 10 minutos",
                message: "Estira las piernas y toma agua. Volvemos con confidencialidad: qué puedes subir y a dónde.",
                nextPreview: "Confidencialidad y LOPDP"
            }
        },
```

### Bloque 6 · Confidencialidad (30 min)

```js
        {
            id: "v1-6-1",
            title: "Reglas de oro",
            type: "warning",
            contentData: {
                heading: "Lo que nunca debes hacer",
                paragraph: "Desactivar el entrenamiento no es confidencialidad: tus datos igual salen de tu computadora y se guardan un tiempo.",
                bullets: [
                    "Pegar nombres, cédulas, RUC o direcciones de clientes sin seudonimizar",
                    "Pedirle a la IA que anonimice un documento real: los datos ya salieron",
                    "Anonimizar solo el nombre: un inmueble único, una fecha y una notaría identifican a la persona",
                    "Subir datos de salud, de menores, penales o bancarios a un plan personal",
                    "Darle a un agente la carpeta real de clientes sin revisar qué contiene"
                ],
                highlight: { type: "danger", text: "Seudonimiza en tu computadora antes de subir." }
            }
        },
```
Fuente: PRIV («¿Basta con desactivar…?» y «Errores comunes»); INV C.B.1 (privacy.claude.com, retención de 30 días).

```js
        {
            id: "v1-6-2",
            title: "LOPDP: tú eres el responsable",
            type: "narrative",
            contentData: {
                Heading1: "LOPDP: tú eres el responsable",
                paragraph1: "Ley Orgánica de Protección de Datos Personales, Registro Oficial Suplemento 459 de 26 de mayo de 2021; su régimen sancionatorio rige plenamente desde el 26 de mayo de 2023. Cuando subes datos de un cliente, tú eres el responsable y el proveedor de IA es el encargado del tratamiento.",
                bullets1: [
                    "<b>Art. 34:</b> el encargo exige un contrato que prohíba al proveedor usar los datos para otros fines o pasarlos a terceros, y que lo obligue a devolverlos o destruirlos al terminar.",
                    "<b>Datos sensibles (arts. 4 y 26):</b> salud, pasado judicial y datos biométricos, entre otros. Tratarlos está prohibido por regla general.",
                    "<b>Resolución SPDP-SPD-2026-0004-R (28 ene 2026), art. 23:</b> el encargo de tratamiento no es transferencia internacional."
                ],
                Heading2: "Encargo o transferencia: la diferencia que importa",
                paragraph2: "Si el proveedor solo procesa por tu cuenta, rige el encargo (arts. 34 y 47). Si usa los datos para fines propios, como entrenar modelos, es transferencia internacional. Hoy ningún país tiene nivel adecuado declarado, salvo los de la Comunidad Andina; Estados Unidos no. Entonces hacen falta garantías contractuales, autorización de la SPDP o el consentimiento explícito e informado del titular (art. 60.2).",
                highlight: { type: "info", text: "Criterio del curso: si no tienes un contrato de encargo por escrito, trátalo como transferencia. Seudonimiza o pide consentimiento." }
            }
        },
```
Fuente: INV C.A («La ley y su reglamento», «Artículos clave», Resolución 0004-R leída completa: arts. 23 y 59; LOPDP arts. 4, 26, 34, 47, 56-60). El highlight es criterio del curso (decisión A.10).

```js
        {
            id: "v1-6-3",
            title: "Niveles de protección",
            type: "comparison",
            contentData: {
                heading: "Niveles de protección: qué pasa con tus datos",
                paragraph: "Según la documentación oficial de Anthropic y OpenAI, septiembre de 2026.",
                headers: ["Nivel", "¿Entrena con tus datos?", "Cuánto se guardan", "¿Realista para un despacho pequeño?"],
                rows: [
                    ["1. Plan personal: Claude Free, Pro o Max; ChatGPT Free, Plus o Pro", "Claude: tú decides con un interruptor. ChatGPT: «Mejorar el modelo para todos» viene activado en la mayoría de cuentas; se desactiva en Controles de datos", "Claude con entrenamiento desactivado: lo que borras se elimina en 30 días. Activado: hasta 5 años, desidentificado", "Sí, para el color verde. Claude Pro y ChatGPT Plus cuestan 20 dólares al mes"],
                    ["2. Plan de equipo o empresa: Claude Team o Enterprise", "No", "Lo que borras sale del sistema en 30 días; Enterprise permite configurar la retención", "Team, sí. Enterprise: precio a consultar con ventas"],
                    ["3. API de Claude con Zero Data Retention", "No", "Nada después de responder, salvo lo que marquen los filtros de seguridad (hasta 2 años). Fable y Mythos exigen 30 días", "Solo con desarrollo propio; se pide al equipo de ventas de Anthropic"],
                    ["4. Claude en Amazon Bedrock o Google Vertex AI", "Según tu contrato con AWS o Google, que son los encargados", "Según la política de esa nube", "Poco: Bedrock no tiene región garantizada en Sudamérica y es complejo"]
                ]
            }
        },
```
Fuente: INV C.B.1 (privacy.claude.com 10023548; control de ChatGPT), C.B.2 (privacy.claude.com 7996866 y 10440198), C.B.3 (platform.claude.com api-and-data-retention, «Covered Models»), C.B.4 (Bedrock sin endpoint en Sudamérica), D.A.1 (Pro 20 USD) y nota del controlador (Plus 20 USD).

```js
        {
            id: "v1-6-4",
            title: "Semáforo",
            type: "comparison",
            contentData: {
                heading: "Semáforo: qué dato va a dónde",
                paragraph: "Propuesta del curso, no norma. Ante la duda, sube un color.",
                headers: ["Color", "Qué incluye", "Dónde puede ir"],
                rows: [
                    ["🟢 Verde", "Leyes, fallos públicos, doctrina, plantillas sin datos reales, material de capacitación", "Cualquier plan pago con el entrenamiento desactivado"],
                    ["🟡 Amarillo", "Documentos de clientes: contratos, demandas, minutas, con [COMPRADOR_1] en lugar del nombre", "Plan pago con entrenamiento desactivado, solo después de seudonimizar en tu computadora o con consentimiento informado del cliente. Mejor en un plan de equipo"],
                    ["🔴 Rojo", "Salud, niñas, niños y adolescentes, procesos penales, cuentas bancarias, y casos conocidos que se identifican aunque cambies el nombre", "No subir. Por excepción: API con Zero Data Retention o nube empresarial, y siempre con consentimiento expreso del cliente"]
                ]
            }
        },
```
Fuente: INV C.C (propuesta de semáforo) y PRIV «Semáforo del curso»; LOPDP art. 60.2 (INV C.A). Amarillo según la decisión A.11.

Slides del Anonimizador. Capturas del controlador con el documento sintético `caso-con-partes.docx`, 960×470, ya en `client/public/images/avanzado/`:
- `anonimizador-1-candidatos.png`: el documento abierto y, a la derecha, la lista de candidatos.
- `anonimizador-2-etiquetar.png`: el menú de etiquetas abierto sobre JUAN PÉREZ.
- `anonimizador-3-resultado.png`: el texto con `[DEMANDANTE]`, `[DEMANDADO]` y `[CORREO_DEMANDADO]`, y los botones «Ver el original», «Exportar .md» y «Exportar .docx».

```js
        {
            id: "v1-6-5",
            title: "Anonimizador 1: abre y revisa",
            type: "feature-highlight",
            contentData: {
                heading: "Anonimiza antes de pegar",
                paragraph: "El Anonimizador es una página que se abre en tu computadora. Lee tu documento Word, te propone los datos personales y los cambia por etiquetas. El documento nunca sale de tu máquina.",
                image: "/images/avanzado/anonimizador-1-candidatos.png",
                steps: [
                    "Abre tu documento .docx",
                    "Revisa la lista de la derecha: nombres, cédulas, RUC, teléfonos, correos y direcciones",
                    "Un clic marca todas las apariciones del mismo dato"
                ],
                tip: "Captura hecha con un documento sintético de prueba, nunca con uno real."
            }
        },
        {
            id: "v1-6-6",
            title: "Anonimizador 2: etiqueta",
            type: "feature-highlight",
            contentData: {
                heading: "Ponle a cada persona su etiqueta",
                paragraph: "Eliges el papel de cada parte: demandante, demandado, comprador, vendedor, mandante, o una etiqueta tuya.",
                image: "/images/avanzado/anonimizador-2-etiquetar.png",
                steps: [
                    "Haz clic en el nombre",
                    "Elige la etiqueta o escribe otra",
                    "Asigna cada dato a su persona: la cédula del demandante queda como [CEDULA_DEMANDANTE]"
                ],
                tip: "Anota aparte, en tu computadora, qué etiqueta corresponde a cada persona real."
            }
        },
        {
            id: "v1-6-7",
            title: "Anonimizador 3: revisa y exporta",
            type: "feature-highlight",
            contentData: {
                heading: "Revisa y exporta",
                paragraph: "«Anonimizar» te muestra el texto con etiquetas. Revisa que no quede nada identificable y exporta: ese archivo es el que subes a la IA.",
                image: "/images/avanzado/anonimizador-3-resultado.png",
                steps: [
                    "Pulsa «Anonimizar»",
                    "Compara con «Ver el original»",
                    "Exporta a .docx o .md"
                ],
                tip: "Revisa también encabezados, pies de página y notas: ahí suelen quedar datos."
            }
        },
```
Fuente: ANON (README; AVANCE, sesiones f y «prueba del dueño»: lista por valor, un clic marca todas las apariciones, `[CEDULA_DEMANDANTE]`, encabezado, notas y pie anonimizados, exportar .docx y .md).

### Bloque 7 · Proyecto «Mi despacho» y Configura tu IA (35 min)

```js
        {
            id: "v1-7-1",
            title: "Proyectos en Claude y ChatGPT",
            type: "feature-highlight",
            contentData: {
                heading: "Proyectos: tu despacho dentro de la IA",
                paragraph: "Claude y ChatGPT tienen Proyectos: un espacio con sus propios chats, documentos e instrucciones. Todo chat nuevo dentro del Proyecto arranca con ese contexto.",
                image: "/images/projects.png",
                steps: [
                    "Crea el Proyecto «Mi despacho»",
                    "Sube tus documentos de referencia: plantillas y normas vigentes",
                    "Pega las instrucciones permanentes",
                    "Abre un chat nuevo dentro del Proyecto y pruébalo"
                ],
                tip: "Claude Free permite hasta 5 proyectos; los planes pagos, ilimitados. ChatGPT Plus también incluye Proyectos."
            }
        },
```
Fuente: INV D.A.1 (support.claude.com 9517075); nota del controlador (chatgpt.com/pricing).

```js
        delBasico(MODULE_2, "2-2", "v1-7-2"),
```
Fuente: básico `2-2`, tal cual.

```js
        {
            id: "v1-7-3",
            title: "Configura tu IA: qué dejar fijo",
            type: "narrative",
            contentData: {
                Heading1: "Configura tu IA: qué instrucciones dejar fijas",
                paragraph1: "Lo que repites en cada chat, escríbelo una vez. Y explica el porqué: la guía de Anthropic recomienda dar el motivo en vez de solo la orden.",
                bullets1: [
                    "<b>Que no te dé la razón en todo:</b> «Si mi planteamiento tiene un error, dilo primero y explica por qué. No me des la razón para complacerme.»",
                    "<b>Crítica con fundamento:</b> «Señala riesgos y puntos débiles citando la norma o el hecho que los sustenta.»",
                    "<b>Tono:</b> «Español de Ecuador, registro profesional, con tuteo. Nunca voseo.»",
                    "<b>Formato:</b> «Sin emojis. Prosa clara; listas solo para elementos separados; tablas cuando compares.»",
                    "<b>Contra las alucinaciones (Holly Cope):</b> «Si no sabes, dilo. Califica tu confianza. Declara tus supuestos.»"
                ],
                highlight: { type: "success", text: "Así ya no dependes de acordarte de pedirlo cada vez." }
            }
        },
```
Fuente: INV D.C (platform.claude.com, prompting best practices: explicar el porqué, rol crítico, prosa, evitar emojis); HC «Ideas para cerrar».

```js
        {
            id: "v1-7-4",
            title: "Ejemplo real",
            type: "prompt-template",
            contentData: {
                heading: "Ejemplo real: así configuró José Luis su IA",
                template: `Español de Ecuador, tuteo con tildes. Nunca voseo.

Estilo de respuesta:
- La acción o la respuesta va en la primera línea. Contexto después, solo si hace falta.
- Una cosa por mensaje. Si hay un segundo tema, una línea al final.
- Sin resumen de cierre. Cerrar con un solo siguiente paso concreto.
- Listas de hasta 5 puntos.
- Análisis largo o varias opciones solo cuando los pida.

Verificar antes de afirmar:
- No afirmar nada sobre un archivo, un número o un estado sin haberlo mirado.
- Si no se puede verificar ahora, decir «no lo sé» y qué haría falta para saberlo.`,
                examples: ["Respuesta primero", "Una cosa por mensaje", "Sin resumen de cierre", "Si no puede verificar, lo dice"],
                tip: "Extracto de mi archivo de instrucciones de Claude Code (~/.claude/CLAUDE.md). Úsalo de modelo y escribe el tuyo."
            }
        },
```
Fuente: `C:\Users\Usuario02\.claude\CLAUDE.md`, líneas 1 y «Estilo de respuesta» y «Verificar antes de afirmar» (decisión A.13; **pendiente de su aprobación**).

```js
        {
            id: "v1-7-5",
            title: "Plantilla 1: tu cuenta",
            type: "prompt-template",
            contentData: {
                heading: "Plantilla 1: instrucciones para toda tu cuenta",
                template: `Soy [abogado/a o notario/a] en [ciudad], Ecuador. Trabajo sobre todo en [materias].

Idioma y tono:
- Responde en español de Ecuador, registro profesional, con tuteo. Nunca voseo.
- Sin emojis. Prosa clara; usa listas solo para elementos separados y tablas para comparar.
- Primero la respuesta; el contexto después y solo si hace falta.

Crítica honesta:
- No me des la razón para complacerme. Si mi planteamiento tiene un error o un riesgo, dilo primero y explica por qué, con la norma o el hecho que lo sustenta.
- Si hay una opción mejor que la que pido, dímela antes de hacer lo que pedí.

Contra las alucinaciones:
- Si no sabes algo o no tienes la fuente, dilo. No inventes artículos, sentencias ni citas.
- Califica tu confianza (alta, media o baja) en cada afirmación jurídica.
- Declara los supuestos que hiciste.
- Cuando cites una norma o un fallo, da el número de artículo o de sentencia para que yo lo verifique en la fuente oficial.`,
                examples: ["Claude: Instructions for Claude", "ChatGPT: Custom instructions", "Gemini: información guardada"],
                tip: "Va en la configuración de tu cuenta: se aplica a todos tus chats."
            }
        },
```
Fuente: INV D.B y D.C; HC.

```js
        {
            id: "v1-7-6",
            title: "Plantilla 2: «Mi despacho»",
            type: "prompt-template",
            contentData: {
                heading: "Plantilla 2: instrucciones del Proyecto «Mi despacho»",
                template: `Contexto del despacho:
- Somos [nombre del despacho o notaría], en [ciudad], Ecuador. Atendemos [tipo de clientes y materias].
- Los documentos de este Proyecto son nuestras plantillas y las normas vigentes que usamos: [lista de archivos].

Cómo trabajar:
- Usa primero los documentos de este Proyecto. Si la respuesta no está en ellos, dilo y separa lo que viene de las fuentes de lo que viene de tu conocimiento general.
- Para cada punto jurídico, dame: la fuente exacta (artículo y cita textual de máximo dos líneas), tu nivel de confianza (alta, media o baja), lo que falta o no está claro, y tus supuestos.
- Si las fuentes no alcanzan, responde: "la información proporcionada es insuficiente para determinarlo".
- Los documentos de clientes llegan seudonimizados, con etiquetas como [COMPRADOR_1] o [CEDULA_VENDEDOR]. Conserva esas etiquetas tal cual y nunca intentes adivinar los datos reales.

Formato de entrega:
- [Por ejemplo: minutas con la estructura de nuestra plantilla; informes de máximo una página.]`,
                examples: ["Claude: instrucciones del Proyecto", "ChatGPT: instrucciones del Proyecto", "Gemini: instrucciones de un Gem"],
                tip: "Se aplica solo a los chats de este Proyecto. Aquí quedan fijas las reglas del prompt aún mejor."
            }
        },
```
Fuente: INV B.C.4 (reglas del «aún mejor») y D.B; HC.

```js
        {
            id: "v1-7-7",
            title: "Dónde se configura",
            type: "comparison",
            contentData: {
                heading: "Dónde se configura: cuenta, proyecto y carpeta",
                paragraph: "La cuenta se aplica a todos tus chats; el proyecto, solo a los suyos; la carpeta, a lo que un agente hace en ella. En Claude Code las instrucciones de usuario y de proyecto se suman. CLAUDE.md lo vemos a fondo en la Virtual 4. Menús con su nombre en inglés.",
                headers: ["IA", "Cuenta entera", "Proyecto o asistente", "Carpeta (agentes)"],
                rows: [
                    ["Claude", "Settings → Instructions for Claude", "Dentro del Proyecto: sus instrucciones", "Claude Code: ~/.claude/CLAUDE.md (el tuyo) y CLAUDE.md en la carpeta del proyecto"],
                    ["ChatGPT", "Settings → Personalization → Custom instructions", "Dentro del Proyecto: sus instrucciones", "Codex: AGENTS.md en ~/.codex, en la raíz del repositorio o en sus subcarpetas"],
                    ["Gemini", "Settings → información guardada (gemini.google.com/saved-info)", "Un Gem: Explorar Gems → New Gem (solo en la web)", "No aplica"]
                ]
            }
        },
```
Fuente: INV D.B (support.claude.com 10185728 y 9517075; code.claude.com/docs/en/memory; help.openai.com 8096356; developers.openai.com/codex/guides/agents-md; support.google.com/gemini 13594961 y 15235603).

```js
        {
            id: "v1-7-8",
            title: "Ejercicio: crea «Mi despacho»",
            type: "exercise-interactive",
            contentData: {
                heading: "Crea tu Proyecto «Mi despacho» y ponlo a prueba",
                instructions: "Arma el Proyecto en Claude o en ChatGPT y hazle una consulta real de tu práctica. Después verifica la respuesta contra la fuente oficial.",
                duration: "10 minutos",
                steps: [
                    "1. Crea el Proyecto «Mi despacho»",
                    "2. Pega la plantilla 2 y complétala con tus datos",
                    "3. Sube el texto oficial de una norma que uses a diario",
                    "4. Hazle una consulta real, sin datos de clientes",
                    "5. Verifica una cita contra la fuente oficial",
                    "6. Sube a la galería tu consulta, la respuesta y lo que encontraste al verificar"
                ],
                sampleInput: "Con base únicamente en el Código Civil que está en este Proyecto: ¿desde cuándo se cuenta el plazo de prescripción de una acción ejecutiva? Dame el artículo, la cita textual y tu nivel de confianza.",
                tip: "Si la IA acierta, igual verifica. Si falla, eso es lo que más le sirve al grupo en la galería."
            },
            interaction: {
                type: "GallerySubmit",
                data: {
                    exerciseId: "v1-mi-despacho",
                    moduleId: "v1-virtual-1",
                    promptLabel: "Tu consulta",
                    resultLabel: "La respuesta y lo que encontraste al verificar",
                    allowImage: true
                }
            }
        },
        {
            id: "v1-7-9",
            title: "Galería",
            type: "gallery-view",
            contentData: {
                heading: "Galería: respuestas verificadas",
                description: "Lo que obtuvo el grupo y lo que encontró al verificar.",
                exerciseId: "v1-mi-despacho",
                moduleId: "v1-virtual-1"
            },
            interaction: {
                type: "GalleryDisplay",
                data: { showAll: true, showHighlighted: false }
            }
        },
```
Fuente: temario (ejercicio de la Virtual 1). El patrón sale de MODULO_4, slides `4-4` y `4-4b`.

### Bloque 8 · Cierre y tarea (15 min)

```js
        {
            id: "v1-8-1",
            title: "Lo que te llevas hoy",
            type: "summary",
            contentData: {
                heading: "Lo que te llevas hoy",
                bullets: [
                    "Delegación: la IA hace borradores y ordena; la conclusión y la firma son tuyas.",
                    "Descripción: tus reglas fijas van una sola vez, en la cuenta y en el Proyecto «Mi despacho».",
                    "Discernimiento: pide la cita, contrasta con la fuente oficial y pasa el checklist.",
                    "Diligencia: seudonimiza en tu computadora antes de subir; el semáforo te dice a dónde va cada dato."
                ],
                callToAction: "Virtual 2 · jueves 15 de octubre: revisión de contratos"
            }
        },
        {
            id: "v1-8-2",
            title: "Tarea para la Virtual 2",
            type: "next-steps",
            contentData: {
                heading: "Tarea para la Virtual 2",
                steps: [
                    { day: "Hoy", action: "Termina tu Proyecto «Mi despacho»", tip: "Pega la plantilla 2 y pruébalo con una consulta que puedas verificar." },
                    { day: "Antes del jueves", action: "Seudonimiza un contrato tuyo con el Anonimizador", tip: "Abre el .docx, etiqueta partes, cédulas, RUC, correos y direcciones, y exporta. El original no sale de tu computadora." },
                    { day: "Jueves 15 oct", action: "Trae el contrato seudonimizado", tip: "Con él haremos la matriz de riesgos. Guarda en tu computadora qué etiqueta corresponde a cada persona." }
                ],
                challenge: "Antes de subirlo, revisa el archivo exportado: ¿quedó algún dato que identifique a tu cliente?"
            }
        },
        {
            id: "v1-8-3",
            title: "Materiales de la sesión",
            type: "resources-download",
            contentData: {
                heading: "Materiales de la sesión",
                resources: [
                    { title: "Checklist de verificación", type: "MD", description: "Una página para revisar cada respuesta antes de entregarla.", downloadUrl: "/materiales/checklist-verificacion.md", icon: "CheckSquare" },
                    { title: "Tutorial: cómo evitar que la IA alucine", type: "MD", description: "El recorrido completo, con los tres prompts y las fuentes oficiales.", downloadUrl: "/materiales/tutorial-evitar-alucinaciones.md", icon: "BookOpen" },
                    { title: "Semáforo de confidencialidad", type: "MD", description: "Qué dato va a qué nivel de protección, con ejemplos notariales y de abogacía.", downloadUrl: "/materiales/semaforo-confidencialidad.md", icon: "FileText" },
                    { title: "Instrucciones personalizadas", type: "MD", description: "Plantillas para tu cuenta y tu despacho, y dónde pegarlas en cada IA.", downloadUrl: "/materiales/instrucciones-personalizadas.md", icon: "Sparkles" },
                    { title: "Tarea para la Virtual 2", type: "MD", description: "Seudonimiza tu contrato con el Anonimizador.", downloadUrl: "/materiales/tarea-virtual-2.md", icon: "Package" }
                ]
            }
        }
```
Fuente: temario (Virtual 2, 15 oct); ANON. El último objeto va **sin** coma final (o con coma: JS la acepta).

### C.99 Pie de `VIRTUAL_1.js`

```js
    ]
};

export default VIRTUAL_1;
```

## D. Materiales descargables (`client/public/materiales/`)

Cómo funciona el enlace: `ResourcesDownload.jsx` hace `window.open(resource.downloadUrl, '_blank')`. Vite sirve todo lo que está en `public/` desde la raíz, y el build lo copia a `dist/`, así que `/materiales/x.md` funciona tal cual y abre el `.md` como texto en una pestaña nueva. Cada archivo se escribe con BOM UTF-8 (decisión A.20).

Enlaces:
- Los 5 archivos, desde `v1-8-3`.
- `checklist-verificacion.md` y `tutorial-evitar-alucinaciones.md`, además, en línea desde `v1-3-10`.

### D.1 `checklist-verificacion.md`

```markdown
# Checklist de verificación antes de entregar

IA Avanzada para Abogados · Virtual 1. Úsalo con cada respuesta de la IA que vaya a un escrito, una minuta, un informe o un correo a un cliente.

## 1. ¿Qué tan grave es si está mal?
- [ ] Riesgo alto (escrito judicial, escritura, dictamen): verifica todo lo de abajo.
- [ ] Riesgo bajo (correo interno, lluvia de ideas): verifica al menos normas, cifras y fechas.

## 2. Fuentes
- [ ] Cada norma citada tiene ley y número de artículo.
- [ ] Abrí el texto oficial vigente y la cita dice lo mismo.
- [ ] Cada sentencia citada existe: la busqué por su número en el buscador oficial.
- [ ] El fragmento citado está en la sentencia; no me quedé solo con el número.

## 3. Lo que la IA supuso
- [ ] Le pregunté qué supuestos hizo y los revisé.
- [ ] Busqué lo que falta: excepciones, plazos especiales, reformas.
- [ ] Separé lo que viene de la fuente de lo que es opinión de la IA.

## 4. Confianza no es exactitud
- [ ] No acepté nada solo porque sonaba seguro.
- [ ] Lo que la IA marcó con confianza media o baja, lo verifiqué yo.

## 5. Confidencialidad
- [ ] Lo que subí estaba seudonimizado o tenía el consentimiento del cliente.
- [ ] El texto final no mezcla datos de un cliente en el documento de otro.

## 6. Firma
- [ ] Lo leí completo. Lo firmo yo, no la IA.

## Fuentes oficiales para verificar
- Registro Oficial: https://www.registroficial.gob.ec/
- Corte Nacional de Justicia, buscador de sentencias: https://busquedasentencias.cortenacional.gob.ec/
- Corte Constitucional, buscador: https://buscador.corteconstitucional.gob.ec/

Marco de confianza adaptado de Holly Cope, «Reducing AI Hallucinations in Legal Work»: https://www.youtube.com/watch?v=Q-nA44oxXp0
```

### D.2 `tutorial-evitar-alucinaciones.md`

```markdown
# Tutorial: cómo evitar que la IA alucine

IA Avanzada para Abogados · Virtual 1.

Este tutorial adapta a Ecuador el método de **Holly Cope**, abogada inglesa, en su video «Reducing AI Hallucinations in Legal Work» (24 de junio de 2026): https://www.youtube.com/watch?v=Q-nA44oxXp0. El caso, los prompts y las fuentes son ecuatorianos y están escritos por nosotros; el método y el recorrido de prompt malo, mejor y aún mejor son de ella. Te recomendamos ver el video completo.

## 1. Por qué la IA adivina

Un estudio de OpenAI, «Why Language Models Hallucinate» (Kalai, Nachum, Vempala y Zhang, septiembre de 2025, https://arxiv.org/abs/2509.04664), lo explica con un examen: si al modelo le preguntan un cumpleaños que no sabe y adivina una fecha, acierta 1 de cada 365 veces; si responde «no sé», saca cero siempre, igual que si fallara. Como a los modelos se los evalúa así, aprenden a arriesgar una respuesta con seguridad en vez de reconocer que no saben.

La idea central de Holly Cope: no le pidas a la IA que acierte; pídele que sea transparente sobre lo que no sabe.

## 2. Cómo se equivoca

Según Holly Cope, las alucinaciones más comunes en trabajo jurídico son: fuentes inventadas (casos que no existen), falta de contexto, falsa certeza, análisis incompleto (pides cuatro casos y te da tres o diez), malinterpretar la pregunta y distorsionar la información.

## 3. El marco de confianza

Trata cada respuesta como el trabajo de un abogado junior muy bueno que todavía no llega. Antes de usarla:

1. **Consecuencias:** ¿qué pasa si está mal? Un escrito o una minuta no es un correo.
2. **Evidencia:** dale las fuentes y pídele de dónde sale cada afirmación.
3. **Vacíos:** ¿qué supuso y qué dejó fuera? Pregúntaselo directamente.
4. **Confianza no es exactitud:** que suene seguro no lo hace correcto.
5. **Tú verificas:** la última revisión es humana, siempre.

## 4. El recorrido, con un caso ecuatoriano

Caso: el plazo de prescripción extintiva de una deuda.

### Prompt malo

    ¿Cuál es el plazo de prescripción de una deuda en Ecuador?

No dice si es una acción ejecutiva u ordinaria, no entrega la fuente ni pide que la cite y no le permite decir «no sé». La IA asume lo que falta y puede darte, con total seguridad, un artículo o un plazo inventado.

### Prompt mejor

    Eres mi asistente de investigación jurídica en Ecuador. Te adjunto el texto vigente del Código Civil ecuatoriano [ADJUNTAR ARCHIVO O PEGAR EL TEXTO OFICIAL].

    Usa ÚNICAMENTE ese documento, no tu conocimiento general. Dime:
    1. ¿Cuál es el plazo de prescripción extintiva de una acción ejecutiva y de una acción ordinaria, según el texto que te di?
    2. Si el documento no trae esa información completa, dilo explícitamente: no la inventes ni la completes con lo que "sueles saber" de otros países o de versiones anteriores de la ley.
    3. Señala qué supuestos estás haciendo (por ejemplo, si asumes que la deuda no tiene un plazo especial distinto al general).

### Prompt aún mejor

    Eres mi asistente de investigación jurídica en Ecuador. Te adjunto el texto vigente del Código Civil ecuatoriano [ADJUNTAR ARCHIVO O PEGAR EL TEXTO OFICIAL] y el enlace del Registro Oficial donde se publicó la última reforma relevante: [URL].

    Usa ÚNICAMENTE estos documentos, no tu conocimiento general ni supuestos de otras jurisdicciones. Para cada punto de tu respuesta sobre el plazo de prescripción de una acción ejecutiva y de una ordinaria, dame:
    - La fuente exacta (número de artículo y una cita textual de máximo dos líneas).
    - Tu nivel de confianza (alta, media o baja) en que esa cita corresponde al texto vigente.
    - Qué no está claro o qué falta en el documento que te di (por ejemplo, excepciones o plazos especiales que no puedas confirmar con lo que tienes).
    - Los supuestos que hiciste, explícitos.

    Si para algún punto el documento no alcanza, responde exactamente: "la información proporcionada es insuficiente para determinarlo". No completes el vacío con conocimiento general ni inventes el artículo o el plazo.

Truco de Holly Cope: dile de antemano qué contiene cada fuente, para que no te diga que algo «no estaba».

### Verifica contra la fuente oficial

Código Civil, Codificación 10, Registro Oficial Suplemento 46 de 24 de junio de 2005 (texto en https://www.presidencia.gob.ec/wp-content/uploads/2024/04/CODIGO_CIVIL.pdf):

- **Art. 2414:** el plazo se cuenta desde que la obligación se hizo exigible.
- **Art. 2415:** en general, 5 años para las acciones ejecutivas y 10 para las ordinarias. La acción ejecutiva, vencidos sus 5 años, se convierte en ordinaria y dura 5 años más.

Compara con lo que te dio la IA con el prompt malo.

## 5. Técnicas de la guía oficial de Anthropic

De la guía «Reduce hallucinations» (https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations):

- Dale permiso explícito para decir «no sé».
- En documentos largos, pídele primero las citas textuales exactas y después la conclusión.
- Pídele que cite la fuente de cada afirmación y que retire la que no pueda respaldar.
- Dile que use solo los documentos que le entregaste.
- Pídele que explique su razonamiento antes de la respuesta final, o corre el mismo prompt varias veces y compara.

## 6. Déjalo fijo

Las reglas del prompt aún mejor (si no sabes, dilo; califica tu confianza; declara tus supuestos; frase fija si la fuente no alcanza) van una sola vez en las instrucciones del Proyecto «Mi despacho». Ver `instrucciones-personalizadas.md`.

## Fuentes oficiales de Ecuador
- Registro Oficial: https://www.registroficial.gob.ec/
- Corte Nacional de Justicia: https://busquedasentencias.cortenacional.gob.ec/
- Corte Constitucional: https://buscador.corteconstitucional.gob.ec/
```

### D.3 `semaforo-confidencialidad.md`

```markdown
# Semáforo de confidencialidad

IA Avanzada para Abogados · Virtual 1. Propuesta del curso, no norma. Ante la duda, sube un color. Revisado el 24 de septiembre de 2026; las políticas de los proveedores cambian.

## Verde: se puede subir
**Dónde:** cualquier plan pago con el entrenamiento desactivado (nivel 1) o superior.
- Notaría: modelo de minuta de compraventa sin datos reales; resumen de la Ley Notarial; requisitos de un poder general.
- Abogacía: jurisprudencia y doctrina públicas; plantilla de demanda en blanco; traducir o resumir una ley.
- Material de capacitación del despacho.

## Amarillo: solo seudonimizado o con consentimiento
**Dónde:** plan pago con entrenamiento desactivado, solo después de seudonimizar en tu computadora (nombres, cédulas, RUC, direcciones, claves catastrales cambiados por `[VENDEDOR_1]`, `[INMUEBLE_1]`), o con el consentimiento explícito e informado del cliente (art. 60.2 LOPDP). Mejor en un plan de equipo (nivel 2).
- Notaría: minuta de compraventa o promesa con las partes etiquetadas; liquidación de sociedad conyugal seudonimizada.
- Abogacía: contrato de arrendamiento de un cliente seudonimizado; demanda ejecutiva o expediente ya seudonimizados.

## Rojo: no se sube
**Dónde:** ningún plan personal ni de equipo estándar. Por excepción, API de Claude con Zero Data Retention (nivel 3) o nube empresarial (nivel 4), siempre con consentimiento expreso del cliente.
- Datos de salud, de niñas, niños y adolescentes (por ejemplo, autorizaciones de salida del país o venta de bienes de menores), procesos penales, cuentas y estados bancarios.
- Casos conocidos, en los que la combinación de hechos identifica a la persona aunque cambies el nombre.

## Los cuatro niveles de protección
| Nivel | ¿Entrena con tus datos? | Cuánto se guardan |
|---|---|---|
| 1. Plan personal (Claude Free, Pro o Max; ChatGPT Free, Plus o Pro) | Claude: tú decides. ChatGPT: «Mejorar el modelo para todos» viene activado en la mayoría de cuentas; desactívalo en Controles de datos | Claude, entrenamiento desactivado: lo borrado se elimina en 30 días; activado: hasta 5 años |
| 2. Equipo o empresa (Claude Team o Enterprise) | No | Lo borrado sale en 30 días; Enterprise configura la retención |
| 3. API de Claude con Zero Data Retention | No | Nada tras responder, salvo lo marcado por seguridad (hasta 2 años); Fable y Mythos exigen 30 días |
| 4. Claude en Amazon Bedrock o Google Vertex AI | Según tu contrato con AWS o Google, que son los encargados | Según la nube; Bedrock no tiene región garantizada en Sudamérica |

## Lo que dice la LOPDP
- Tú eres el responsable; el proveedor de IA es el encargado (arts. 4, 34 y 47).
- El encargo exige un contrato que prohíba otros usos y obligue a devolver o destruir los datos (art. 34).
- El encargo no es transferencia internacional (Resolución SPDP-SPD-2026-0004-R, art. 23). Si el proveedor usa los datos para fines propios, sí lo es; Estados Unidos no tiene nivel adecuado declarado.
- Criterio del curso: sin contrato de encargo por escrito, trátalo como transferencia: seudonimiza o pide consentimiento.

## Errores comunes
- Creer que desactivar el entrenamiento equivale a confidencialidad.
- Pedirle a la IA que anonimice un documento real: los datos ya salieron.
- Anonimizar solo el nombre.
- Dejar que un agente lea la carpeta real de clientes sin revisarla.

Fuentes: LOPDP, R.O. Suplemento 459 (26 may 2021); Resolución SPDP-SPD-2026-0004-R (https://spdp.gob.ec/); https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data ; https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data ; https://platform.claude.com/docs/en/manage-claude/api-and-data-retention
```

### D.4 `instrucciones-personalizadas.md`

```markdown
# Instrucciones personalizadas: configura tu IA una sola vez

IA Avanzada para Abogados · Virtual 1. Lo que repites en cada chat, escríbelo una vez. Y explica el porqué: la guía de Anthropic recomienda dar el motivo en vez de solo la orden.

## Tres niveles
- **Cuenta:** se aplica a todos tus chats. Aquí va la plantilla 1.
- **Proyecto o asistente:** se aplica solo a los chats de ese Proyecto o Gem. Aquí va la plantilla 2.
- **Carpeta:** un archivo (`CLAUDE.md` o `AGENTS.md`) que lee un agente cuando trabaja en esa carpeta. Lo vemos a fondo en la Virtual 4.

## Plantilla 1: tu cuenta (cópiala y completa lo que está entre corchetes)

    Soy [abogado/a o notario/a] en [ciudad], Ecuador. Trabajo sobre todo en [materias].

    Idioma y tono:
    - Responde en español de Ecuador, registro profesional, con tuteo. Nunca voseo.
    - Sin emojis. Prosa clara; usa listas solo para elementos separados y tablas para comparar.
    - Primero la respuesta; el contexto después y solo si hace falta.

    Crítica honesta:
    - No me des la razón para complacerme. Si mi planteamiento tiene un error o un riesgo, dilo primero y explica por qué, con la norma o el hecho que lo sustenta.
    - Si hay una opción mejor que la que pido, dímela antes de hacer lo que pedí.

    Contra las alucinaciones:
    - Si no sabes algo o no tienes la fuente, dilo. No inventes artículos, sentencias ni citas.
    - Califica tu confianza (alta, media o baja) en cada afirmación jurídica.
    - Declara los supuestos que hiciste.
    - Cuando cites una norma o un fallo, da el número de artículo o de sentencia para que yo lo verifique en la fuente oficial.

## Plantilla 2: el Proyecto «Mi despacho»

    Contexto del despacho:
    - Somos [nombre del despacho o notaría], en [ciudad], Ecuador. Atendemos [tipo de clientes y materias].
    - Los documentos de este Proyecto son nuestras plantillas y las normas vigentes que usamos: [lista de archivos].

    Cómo trabajar:
    - Usa primero los documentos de este Proyecto. Si la respuesta no está en ellos, dilo y separa lo que viene de las fuentes de lo que viene de tu conocimiento general.
    - Para cada punto jurídico, dame: la fuente exacta (artículo y cita textual de máximo dos líneas), tu nivel de confianza (alta, media o baja), lo que falta o no está claro, y tus supuestos.
    - Si las fuentes no alcanzan, responde: "la información proporcionada es insuficiente para determinarlo".
    - Los documentos de clientes llegan seudonimizados, con etiquetas como [COMPRADOR_1] o [CEDULA_VENDEDOR]. Conserva esas etiquetas tal cual y nunca intentes adivinar los datos reales.

    Formato de entrega:
    - [Por ejemplo: minutas con la estructura de nuestra plantilla; informes de máximo una página.]

## Dónde pegarla (menús con su nombre en inglés, septiembre de 2026)
| IA | Cuenta entera (plantilla 1) | Proyecto o asistente (plantilla 2) | Carpeta (agentes) |
|---|---|---|---|
| Claude | Settings → Instructions for Claude | Dentro del Proyecto: sus instrucciones | Claude Code: `~/.claude/CLAUDE.md` (el tuyo) y `CLAUDE.md` en la carpeta del proyecto; se suman |
| ChatGPT | Settings → Personalization → Custom instructions | Dentro del Proyecto: sus instrucciones | Codex: `AGENTS.md` en `~/.codex`, en la raíz del repositorio o en sus subcarpetas |
| Gemini | Settings → información guardada (`gemini.google.com/saved-info`) | Un Gem: Explorar Gems → New Gem, solo desde la web | No aplica |

## Consejos
- Prueba las instrucciones con una pregunta cuya respuesta ya conoces.
- Si la IA sigue dándote la razón en todo, explícale para qué necesitas la crítica («voy a presentar esto ante un juez y necesito saber dónde me van a atacar»).
- Revisa tus instrucciones cada mes: las herramientas cambian de nombre y de menú.

Fuentes: https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features ; https://support.claude.com/en/articles/9517075-what-are-projects ; https://code.claude.com/docs/en/memory ; https://help.openai.com/en/articles/8096356-chatgpt-custom-instructions ; https://developers.openai.com/codex/guides/agents-md ; https://support.google.com/gemini/answer/13594961 ; https://support.google.com/gemini/answer/15235603 ; https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices . Reglas contra alucinaciones: Holly Cope, https://www.youtube.com/watch?v=Q-nA44oxXp0
```

### D.5 `tarea-virtual-2.md`

```markdown
# Tarea para la Virtual 2: seudonimiza tu contrato

IA Avanzada para Abogados · entrega el jueves 15 de octubre de 2026, al inicio de la Virtual 2 (revisión de contratos).

## Qué vas a hacer
Tomar un contrato real de tu práctica y dejarlo sin datos que identifiquen a las personas, usando el Anonimizador en tu propia computadora. Con ese archivo haremos la matriz de riesgos en la Virtual 2.

## Qué necesitas
- Un contrato tuyo en Word (.docx): compraventa, promesa, arrendamiento, prestación de servicios u otro.
- El Anonimizador: una página que se abre en tu navegador, sin internet. El documento nunca sale de tu computadora. Recibirás el archivo y las instrucciones para abrirlo antes de la tarea.

## Pasos
1. Abre el Anonimizador y carga tu contrato.
2. Revisa la lista de la derecha: nombres, cédulas, RUC, teléfonos, correos y direcciones. Un clic marca todas las apariciones del mismo dato.
3. Ponle a cada persona su etiqueta (por ejemplo VENDEDOR, COMPRADOR, ARRENDADOR) y asigna cada dato a su persona: la cédula del vendedor queda como `[CEDULA_VENDEDOR]`.
4. Pulsa «Anonimizar» y compara con «Ver el original».
5. Busca lo que el programa no marca: claves catastrales, números de matrícula o de predio, linderos con nombres de vecinos, nombres de la notaría o del notario si identifican el caso, fechas y cuantías que hagan reconocible la operación. Cámbialos a mano por etiquetas (`[CLAVE_CATASTRAL]`, `[INMUEBLE_1]`).
6. Revisa encabezados, pies de página y notas.
7. Exporta a .docx o .md.
8. Anota aparte, en tu computadora, qué etiqueta corresponde a cada persona real. Esa tabla nunca se sube.

## Antes de traerlo, comprueba
- [ ] No queda ningún nombre, cédula, RUC, teléfono, correo ni dirección real.
- [ ] Un tercero no podría reconocer la operación por el inmueble, la fecha o la cuantía.
- [ ] El original sigue guardado solo en tu computadora.

## Lo que no debes hacer
- Pedirle a la IA que anonimice el contrato: los datos ya habrían salido.
- Anonimizar solo los nombres.
- Traer un contrato con datos de salud, de menores, penales o bancarios (color rojo del semáforo). Si es tu único contrato, elige otro.

Ver también: `semaforo-confidencialidad.md`.
```

## E. Tareas para el ejecutor

Todo se corre desde `D:/curso_IA`. No toques ningún archivo fuera de los que nombra cada tarea.

**0. Línea base.**
- Comando: `git -C D:/curso_IA branch --show-current` → `curso-avanzado-v1`.
- Comando: `cd D:/curso_IA/client && npx vite build && npx eslint . 2>&1 | tail -2` → el build pasa; eslint da «52 problems».

**1. Datos de la Virtual 1.** Crea `client/src/data/avanzado/VIRTUAL_1.js` pegando, en este orden: la cabecera C.0, los 43 objetos de §C en el orden de la tabla y el pie C.99.
- `node --check client/src/data/avanzado/VIRTUAL_1.js` → sin salida.
- `grep -c 'id: "v1-' client/src/data/avanzado/VIRTUAL_1.js` → `40` (39 slides literales más el módulo; 4 slides salen de `delBasico`).
- `grep -o 'id: "v1-[^"]*"' client/src/data/avanzado/VIRTUAL_1.js | sort | uniq -d` → vacío.
- `grep -c 'delBasico(' client/src/data/avanzado/VIRTUAL_1.js` → `5` (4 llamadas más la definición).

**2. Índice del avanzado.** Crea `client/src/data/avanzado/index.js` con el código de §B.
- Verifica: `node --check client/src/data/avanzado/index.js`.

**3. Selector.** Crea `client/src/data/cursos.js` con el código de §B y reemplaza la línea 3 de `client/src/App.jsx` por `import { COURSE_MODULES } from './data/cursos';`.
- `sed -n 3p client/src/App.jsx` → la línea nueva.
- `git diff --stat client/src/App.jsx` → 1 inserción y 1 borrado.

**4. Build y lint.**
- `cd client && npx vite build` → pasa.
- `cd client && VITE_COURSE=avanzado npx vite build` → pasa.
- `cd client && npx eslint . 2>&1 | tail -2` → 52 problemas o menos.

**5. Materiales.** Por cada archivo de §D:
```bash
mkdir -p client/public/materiales
printf '\xEF\xBB\xBF' > client/public/materiales/checklist-verificacion.md
cat >> client/public/materiales/checklist-verificacion.md <<'EOF'
…texto de D.1…
EOF
```
Repite con los otros cuatro nombres: `tutorial-evitar-alucinaciones.md`, `semaforo-confidencialidad.md`, `instrucciones-personalizadas.md` y `tarea-virtual-2.md`.
- `ls client/public/materiales | wc -l` → `5`.
- `for f in client/public/materiales/*.md; do head -c 3 "$f" | od -An -tx1; done` → `ef bb bf` en los cinco.
- `cd client && npx vite build && ls dist/materiales | wc -l` → `5`.

**6. Prueba de humo.**
- Levanta `cd client && VITE_COURSE=avanzado npx vite --port 5174`.
- Abre `http://localhost:5174/materiales/semaforo-confidencialidad.md`: las tildes y los «» deben verse bien.
- Entra como admin: el primer módulo debe ser «Virtual 1: Fundamentos exprés y confidencialidad» con 43 slides.
- Prueba sin la variable (`npx vite`): el primer módulo sigue siendo «Módulo 1: Fundamentos (45 min)».
- El recorrido completo en 375 px y en escritorio, con capturas, es la fase 4.

**7. Commit de la fase 3.**
- Comando: `git add client/src/App.jsx client/src/data/cursos.js client/src/data/avanzado client/public/materiales && git commit -m "feat(avanzado): selector VITE_COURSE, slides y materiales de la Virtual 1"`.
- No agregues `Claude outputs/` ni `docs/prompts/`. `client/public/images/avanzado/` se agrega si todavía no está en git (`git status` lo dice).
- Verifica: `git log --oneline -1` y `git status --short` sin `client/`.

## F. Datos que quedaron fuera (NO VERIFICADO o por precaución)

1. Ruta de menú y URL de Estilos en Claude.
2. Si Cowork tiene su propio archivo de instrucciones persistentes. Fuera del slide, aunque el encargo lo pedía.
3. Si Claude.ai tiene memoria automática entre chats.
4. Nombre exacto y límite del campo de instrucciones de Proyecto en ChatGPT; límite de archivos por Proyecto en ChatGPT y en Claude.
5. Límites de caracteres de las instrucciones personalizadas de ChatGPT (1500/5000). Fuera por precaución: la página oficial dio 403.
6. Modelo por defecto de cada plan de ChatGPT; ventana de contexto de la app de ChatGPT por plan (27K/54K/128K…).
7. Ventana de contexto de Gemini 3.1 Pro; límite de «información guardada» en Gemini; precio de Google AI Ultra.
8. Cruce plan × modelo × tokens en claude.ai.
9. Claude Team: mínimo de puestos, residencia en la UE, ZDR y precios; precio de Enterprise.
10. Precios de ChatGPT Pro, Business y Enterprise; ChatGPT Go (6 frente a 8 USD, no se usa); retención de ChatGPT fuera del entrenamiento; afirmaciones sobre ChatGPT Business y Enterprise (entrenamiento, DPA), parcialmente NO VERIFICADO.
11. Región de Vertex AI en Sudamérica. Solo se afirma lo de Bedrock.
12. Fecha de posesión del Superintendente de la SPDP; número y fecha del Registro Oficial en que se publicó la Resolución 0004-R.
13. Rebautizo de NotebookLM como «Gemini Notebook» (no aparece en esta sesión).
14. Recomendación oficial de OpenAI sobre emojis y markdown (no se usa).
15. Resolución SPDP-SPD-2026-0009-R (IA): solo tiene fuente de prensa (Lexis). No se usó en slides.
16. Soporte de PDF en el Anonimizador: el README lo menciona, pero AVANCE no lo prueba. Los slides hablan solo de `.docx`.
17. AI Fluency: lección 01 no disponible; licencia no confirmada dentro de Skilljar (solo en aifluencyframework.org).

## Pendiente para José Luis

- Aprobar el extracto de su CLAUDE.md (`v1-7-4`).
- Portada propia para el avanzado; hoy la reemplaza `llm-diagram.png`.
- Cómo se entrega el Anonimizador a los alumnos (en la tarea dice «Recibirás el archivo y las instrucciones antes de la tarea»), y que esté listo para el 13 oct.
- Para publicar, agregar `ARG`/`ENV VITE_COURSE` al Dockerfile y a `railway.json`. Queda fuera de esta sesión.
- `WelcomeScreen.jsx` sigue diciendo «IA para Todos» en el avanzado. No se tocó.
- Permiso de Holly Cope para clips y, si hiciera falta material de AI Fluency, permiso de Anthropic.
- Confirmar la decisión del color amarillo (A.11).
