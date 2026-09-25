# Temario: dónde van el Anonimizador, las instalaciones y la revisión de contratos

Encargo: `docs/prompts/2026-09-24-temario-anonimizador.md`.
Estado: **aprobado por José Luis el 24 sep 2026.** Este documento propone; no se tocó código ni slides.

## Decisiones

| # | Pregunta | Decisión |
|---|---|---|
| 1 | ¿En qué virtual se enseña el Anonimizador? | **Virtual 2**, como primer paso de la revisión de contratos: cada alumno anonimiza su propio contrato y con ese archivo hace la matriz de riesgos |
| 2 | ¿De dónde salen los minutos en la Virtual 2? | Sale «Comparar dos versiones» (25 min). Su prompt pasa al material descargable de la Virtual 2 y el flujo queda como opción en el taller |
| 3 | ¿Cómo reciben `index.html`? | **Un solo enlace de Drive.** Tras cada cambio del Anonimizador, José Luis corre `npm run build` en `D:\anonimizador` y sube `dist/index.html` como nueva versión con «Administrar versiones»; el enlace no cambia. No va en la app ni por correo adjunto |
| 4 | ¿En qué formato va el pre-trabajo? | Guía escrita con capturas para todo; video de 3 a 5 min solo para la app de escritorio, el entrenamiento y el Anonimizador; mesa de ayuda de 15 min antes de la Virtual 1 |
| 5 | ¿Clonar un repositorio y levantar un servidor? | **Fuera del curso.** El Anonimizador no lo necesita y a un abogado no le hace falta. La Virtual 4 no cambia |

Por qué la Virtual 2 y no la 1: el Anonimizador gana dos días de desarrollo (15 oct en lugar de
13), se practica en clase justo antes de usarlo y no queda como tarea sin ayuda, y la Virtual 1
libera minutos para los usos interactivos.

## Temario por virtual

Los minutos de la Virtual 2 dentro del bloque del Anonimizador, y lo que libera la Virtual 1, son
**estimados, sin medir**. Se ajustan en el ensayo del 12 oct.

### Virtual 1 · martes 13 oct · Fundamentos exprés y confidencialidad

| Bloque | Antes | Ahora |
|---|---|---|
| Bienvenida y encuesta de nivel | 10 | 10 |
| Tokens y contexto | 15 | 15 |
| Alucinaciones y protocolo de verificación | 20 | 20 |
| Harness y agentes | 15 | 15 |
| Descanso | 10 | 10 |
| Confidencialidad: reglas, LOPDP, niveles, semáforo | 30 | **22** |
| Proyecto «Mi despacho» | 35 | 35 |
| Cierre y tarea | 15 | 15 |
| **Total** | 150 | **142** |

Los 8 minutos libres absorben parte de los usos interactivos de
`docs/plans/2026-09-24-experiencia-interactiva-diseno.md` (+10). Con ellos la sesión suma 152, así
que la lista A de ese diseño solo necesita recortar 2 minutos, no 10. Cuáles, se decide allá.

### Virtual 2 · jueves 15 oct · Anonimiza y revisa tu contrato

| Min | Bloque |
|---|---|
| 10 | Repaso y dudas de la tarea |
| 25 | **Anonimiza tu contrato:** demo con el contrato de ejemplo (8), cada uno el suyo (12), revisar el archivo exportado (5) |
| 30 | Extraer obligaciones, plazos y condiciones |
| 35 | Matriz de riesgos: cláusula, riesgo, severidad y propuesta de redacción |
| 10 | Descanso |
| 25 | Resumen para el cliente en lenguaje claro |
| 15 | Checklist de verificación y tarea: traer documentos del expediente para la Virtual 3 |
| **150** | |

**Ejercicio:** anonimizar el contrato propio y hacer su matriz de riesgos con el archivo exportado,
verificando cada punto contra el texto.

Material descargable nuevo: el prompt para comparar dos versiones de un contrato.

### Virtual 3 · martes 20 oct · NotebookLM

Sin cambios respecto de `Claude outputs/02-temario-detallado.md`.

### Virtual 4 · jueves 22 oct · Agentes de escritorio

Sin cambios. Skills, `CLAUDE.md`, `AGENTS.md` y el plugin legal van en el bloque de 30 min;
conectores, MCP, computer use y tareas programadas, en el de 25. No se enseña a clonar
repositorios.

### Taller · sábado 24 oct

Sin cambios. «Comparar dos versiones» se suma como una opción más del flujo propio en los 120 min
de construcción guiada (ya incluye «revisión de contrato»).

## Pre-trabajo

Se envía el 6 oct, completo. Los tiempos del alumno son estimados.

| # | Qué | Para | Formato | Tiempo del alumno |
|---|---|---|---|---|
| 1 | Cuenta de Claude Pro o ChatGPT Plus e instalar la app de escritorio | V1 | Guía + video de 3 a 5 min | 15 min |
| 2 | Desactivar el entrenamiento con tus chats (Claude: interruptor; ChatGPT: opt-out) | V1 | Guía + video de 3 min | 5 min |
| 3 | Cuenta de Google y abrir NotebookLM una vez | V1 | Guía con una captura | 5 min |
| 4 | Glosario grabado de 20 min y repaso de la fórmula R.C.T.F. | V1 | Video (ya prometido) + Kit Maestro | 30 min |
| 5 | Bajar el Anonimizador de Drive, abrirlo con el contrato de ejemplo y elegir de 3 a 5 documentos propios en `.docx`, **sin subirlos a ninguna IA** | V2 | Guía + video de 3 a 5 min | 15 min |

Al final de la guía, una lista «llega con esto listo». Mesa de ayuda: 13 oct, 18:15 a 18:30, en la
misma sala de la Virtual 1.

**Cambia lo prometido:** el temario vigente pide traer los documentos «seudonimizados». Ahora se
traen en `.docx` sin subirlos a ninguna IA, y se seudonimizan juntos en la Virtual 2.

## Cambios en la Virtual 1

| Qué | Cambio |
|---|---|
| `v1-6-5`, `v1-6-6`, `v1-6-7` | Salen de la Virtual 1. Pasan a la Virtual 2 con `anonimizador-1-candidatos.png`, `anonimizador-2-etiquetar.png` y `anonimizador-3-resultado.png` |
| `v1-6-1`, `highlight.text` | «Seudonimiza en tu computadora antes de subir. El jueves lo haces con el Anonimizador.» |
| `v1-8-1`, `callToAction` | «Virtual 2 · jueves 15 de octubre: anonimiza tu contrato y revísalo con IA» |
| `v1-8-2`, paso «Antes del jueves» | Bajar el Anonimizador del enlace de Drive, comprobar que abre y elegir un contrato propio en `.docx`. Tip: no lo subas a ninguna IA todavía |
| `v1-8-2`, paso «Jueves 15 oct» | Traer el contrato `.docx` sin anonimizar. Tip: lo anonimizamos juntos al empezar y con él haces la matriz de riesgos |
| `v1-8-2`, `challenge` | Elige un contrato con dos partes o más y datos como cédulas, RUC o direcciones |
| `v1-8-3`, recurso «Tarea para la Virtual 2» | Descripción: «Elige tu contrato y prueba el Anonimizador.» |
| `client/public/materiales/tarea-virtual-2.md` | Reescribir con la tarea nueva y el enlace de Drive |
| `client/src/components/avanzado/rotulos.test.js` | Quitar `v1-6-5`, `v1-6-6` y `v1-6-7` de la lista fija |

`guion-virtual-1.js` no menciona el Anonimizador: no cambia.

## Otros documentos que cambian

- `Claude outputs/02-temario-detallado.md`: pre-trabajo, bloque de confidencialidad y tarea de la
  Virtual 1, tabla de la Virtual 2 y su ejercicio.
- `docs/plans/2026-09-24-virtual-1-mapa.md`: el slide 17 sale.
- `docs/plans/2026-09-24-experiencia-interactiva-diseno.md`: la lista A deja de estar en espera;
  con 8 minutos liberados basta recortar 2.

## Riesgos

| Riesgo | Qué hacer |
|---|---|
| El Anonimizador no está terminado para el 15 oct: falta la tarea 7 (probar «Verificar» y Markdown por `file://` y confirmar que no hace peticiones de red) y la decisión sobre el «ordinal por valor» (`D:\anonimizador\docs\AVANCE.md`) | Cerrarlos antes del ensayo del 12 oct |
| El pre-trabajo del 6 oct necesita el contrato de ejemplo sintético, que estaba previsto para el 12 | Adelantarlo al 6 oct y dejarlo en la misma carpeta de Drive |
| Un navegador o antivirus bloquea abrir un `.html` descargado | Sin verificar. La prueba de apertura del pre-trabajo y la mesa de ayuda lo descubren antes de la Virtual 2 |
| El alumno baja el archivo el 6 oct y el Anonimizador cambia después | En la Virtual 2 se baja otra vez del mismo enlace (1 min) |

## Aprobación

- [x] Temario y pre-trabajo aprobados por José Luis: 24 sep 2026
- [x] Reparto de `index.html` por un enlace de Drive: 24 sep 2026

## Anexo: los slides del Anonimizador, guardados para la Virtual 2

Salieron de `client/src/data/avanzado/VIRTUAL_1.js` el 24 sep 2026, tal como estaban. Van a
`VIRTUAL_2.js` cuando exista, con otros ids. Las capturas siguen en `client/public/images/avanzado/`.

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
