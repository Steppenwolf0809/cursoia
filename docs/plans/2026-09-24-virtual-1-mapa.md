# Virtual 1 · Mapa de slides: qué se reutiliza del curso básico

Sesión: martes 13 oct 2026, 18:30–21:00. Tema: fundamentos exprés y confidencialidad.
Fuente del temario: `Claude outputs/02-temario-detallado.md`.
IDs y títulos tomados del código el 2026-09-24 (commit 8096b25).

Leyenda: **R** = se reutiliza tal cual · **A** = se adapta (texto nuevo, mismo tipo de slide) · **N** = nuevo

## 1. Bienvenida y encuesta de nivel (10 min)

| # | Slide | Origen | Estado |
|---|---|---|---|
| 1 | Portada «IA avanzada para abogados» | M1 `1-1` Portada (hero) | A |
| 2 | ¿Quién soy? | M1 ¿Quién soy? (profile) | R |
| 3 | Encuesta de nivel: qué herramienta usas, cuánto, para qué | M1 Conoce a tu audiencia (poll) | A |

## 2. Tokens y contexto, con demo (15 min)

El glosario grabado del pre-trabajo ya explica LLM, token y ventana de contexto. Aquí va el repaso exprés.

| # | Slide | Origen | Estado |
|---|---|---|---|
| 4 | Tokens: la moneda de la IA | M1 Tokens (analogy) | R |
| 5 | Ventana de contexto | M1 Ventana de Contexto (stat-comparison) | A (cifras actuales de los modelos) |
| 6 | Por qué la IA «olvida» en chats largos y cuándo abrir uno nuevo | — | N (demo en vivo) |

## 3. Alucinaciones y protocolo de verificación (20 min)

| # | Slide | Origen | Estado |
|---|---|---|---|
| 7 | La IA miente | M1 `1-4` (warning) | R |
| 8 | La vez que la IA me engañó por días (resultados falsos) | M1 `1-4b` (narrative) | R |
| 9 | Mata v. Avianca: citas inventadas ante un tribunal | — | N |
| 10 | Tutorial «Cómo evitar que la IA alucine», paso a paso, basado en Holly Cope (`2026-09-24-holly-cope-resumen.md`) | — | N (varios slides) |
| 11 | Protocolo: pedir la cita exacta, contrastar con la fuente oficial, checklist | — | N |

## 4. Harness y agentes (15 min)

| # | Slide | Origen | Estado |
|---|---|---|---|
| 12 | El modelo es el motor, el harness es el auto | M1 La Analogía del Auto (analogy) | A |
| 13 | Qué delegar y qué no | — | N |

## 5. Descanso (10 min)

| # | Slide | Origen | Estado |
|---|---|---|---|
| 14 | Descanso | M4 ☕ Descanso (break) | R |

## 6. Confidencialidad (30 min)

Contenido base: `Claude outputs/04-privacidad-y-confidencialidad.md`.

| # | Slide | Origen | Estado |
|---|---|---|---|
| 15 | Reglas de oro de seguridad | M1 Seguridad: Reglas de Oro (warning) | A |
| 16 | Semáforo verde / amarillo / rojo | — | N |
| 17 | Anonimizar antes de pegar: demo del Anonimizador (`D:\anonimizador`) | — | N |
| 18 | LOPDP y transferencia internacional de datos | — | N |
| 18b | Niveles de protección: plan de consumo, empresa, API con ZDR, Bedrock | — | N |

## 7. Proyecto «Mi despacho» (35 min)

| # | Slide | Origen | Estado |
|---|---|---|---|
| 19 | La función Proyectos | M3 Claude: La Función 'Proyectos' (feature-highlight) | A (Claude y ChatGPT) |
| 20 | Fórmula R.C.T.F. | M2 La Fórmula Maestra + Desglose (concept, table-detail) | R |
| 21 | Instrucciones permanentes para un despacho (plantilla) | — | N (prompt-template) |
| 21b | Configura tu IA: antiadulación, crítica, tono, sin emojis, reglas contra alucinaciones | — | N |
| 21c | Dónde se configura: Claude, ChatGPT y Gemini, y los niveles cuenta, proyecto y carpeta (`CLAUDE.md`, `AGENTS.md`) | — | N |
| 22 | Ejercicio: crea tu Proyecto y pruébalo con una consulta real | M4 ejercicio (exercise-interactive) | A |
| 23 | Galería de respuestas verificadas | M4 galería (gallery-view) | A |

## 8. Cierre y tarea (15 min)

| # | Slide | Origen | Estado |
|---|---|---|---|
| 24 | Resumen de la sesión | tipo summary | A |
| 25 | Tarea: seudonimizar tu contrato para la Virtual 2 | tipo next-steps | N |

## Balance

- 25 slides: 6 se reutilizan, 9 se adaptan y 10 son nuevos.
- 6 de los 10 nuevos son de verificación (3) y confidencialidad (3). Ahí va el grueso del trabajo de contenido.
- Los tipos de slide existentes alcanzan en principio. Falta confirmar que el semáforo quepa en uno de ellos.
- Fuera de los slides, la pieza nueva es el checklist de verificación. La seudonimización usa el Anonimizador de `D:\anonimizador`; no se construye otra herramienta.
- Con el slide 18b son 26 slides y 11 nuevos.

## Pendiente de decidir

- Decidido el 24 sep: el curso avanzado va en la misma app.
