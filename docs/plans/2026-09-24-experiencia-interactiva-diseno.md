# Diseño: «decide y después revela» en la Virtual 1

Encargo: `docs/prompts/2026-09-24-experiencia-interactiva.md` (reescrito el 24 sep 2026).
Estado: **pendiente de aprobación de José Luis.** No se escribe código ni se borra ningún slide
antes de eso. La lista A (§3) ya no está en espera: el 24 sep 2026 el Anonimizador salió de la
Virtual 1 (`docs/plans/2026-09-24-temario-anonimizador.md`), que queda en 41 slides y libera 8
minutos. Basta recortar 2 minutos de la lista A, no 10; cuáles, se decide aquí.

Resumen: un tipo de slide nuevo, `decide-revela`, sin backend, con cuatro usos en la Virtual 1.
Estimado: 10 h de 12 h de tope. Para que quepa en 2 h 30 min se proponen 3 slides menos y 2 más
(de 44 a 43).

---

## 1. El componente

### Archivos

| Archivo | Qué hace |
|---|---|
| `client/src/components/avanzado/tipos/DecideRevela.jsx` | El tipo de slide. Se registra en `TIPOS` de `SlideAvanzado.jsx` como `'decide-revela'`. |
| `client/src/components/avanzado/decide.js` | Lógica pura, sin React: `puntaje(items, elecciones)` y `validar(contentData)`. |
| `client/src/components/avanzado/decide.test.js` | Pruebas con `node:test`, como `rotulos.test.js`. |
| `client/src/components/avanzado/VentanaContexto.jsx` | La animación del uso 1. Solo la carga `DecideRevela` cuando `animacion === 'ventana-contexto'`. |

Sin dependencias nuevas: `framer-motion` (ya instalado) para la animación, `lucide-react` para los
íconos y los tokens `av-*` del tema nocturno. No hace falta ningún token nuevo: el acierto usa
`av-acento` y la diferencia usa `av-alerta`, siempre con ícono y texto, nunca solo color.

### Props

Las mismas que los demás tipos del avanzado: `{ slide }`. Todo lo demás sale de `slide.contentData`.
El `heading` lo pinta `Encabezado`, como en todos los tipos.

### `contentData`

```js
{
    heading: "…",                      // obligatorio: el H1
    paragraph: "…",                    // opcional: la instrucción («Toca la frase que crees falsa»)
    rotulo: "…",                       // opcional: aviso en letra mono («Ejemplo sintético…»)

    pregunta: "…",                     // opcional: si existe, se pinta como burbuja del usuario y las
                                       // opciones del único item como frases de la respuesta de la IA
    animacion: "ventana-contexto",     // opcional: pinta VentanaContexto encima de las preguntas
    mensajes: [{ de: "tu" | "ia", texto: "…" }], // solo con animacion
    ventana: 4,                        // solo con animacion: cuántos mensajes caben en la ventana

    opciones: ["…", "…"],              // opcional: opciones comunes a todos los items (semáforo)
    items: [                           // obligatorio, 1 o más
        {
            id: "…",                   // único dentro del slide
            texto: "…",                // el enunciado o el dato a clasificar
            opciones: ["…", "…"],      // si no hay opciones comunes
            correcta: 1,               // índice en las opciones (base 0)
            porque: "…"                // obligatorio: se muestra al revelar
        }
    ],
    cierre: { titulo: "…", puntos: ["…"] }, // opcional: aparece recién al revelar
    boton: "Ver respuesta"             // opcional; por defecto «Ver respuesta» o «Ver respuestas»
}
```

Con estas piezas salen los cuatro usos y los que vengan en las virtuales 2, 3 y 4 sin tocar código:
una pregunta, varias preguntas, clasificar en categorías o cazar una frase.

`validar(contentData)` devuelve la lista de errores: sin `items`, `id` repetido, `correcta` fuera de
rango, `porque` vacío, item sin opciones, `animacion` sin `mensajes`. En desarrollo
(`import.meta.env.DEV`) el slide muestra esos errores en una caja roja en vez de pintarse. En
producción no se valida.

### Estados

Uno por slide, no por item:

| Estado | Cuándo | Qué ve el alumno |
|---|---|---|
| **Sin responder** | Al entrar al slide | Las preguntas o los datos, las opciones y el botón «Ver respuesta(s)». Debajo, en mono: «0 de 10 respondidas». |
| **Respondido** | Eligió al menos una opción | Su elección resaltada con el acento. Puede cambiarla cuantas veces quiera. El contador sube. |
| **Revelado** | Pulsó el botón | Las opciones se bloquean. Cada item muestra ✓ «Coincide» o ✗ «El curso dice: Rojo», y su porqué. Aparecen el `cierre` y, si hay más de un item, «Coincidiste en 7 de 10». |

- El botón funciona aunque no haya respondido nada: nadie queda obligado a hacer clic, y quien
  prefiere solo mirar puede ver las respuestas.
- Los items que quedaron sin responder muestran la respuesta del curso, sin ✓ ni ✗.
- Sin «volver a intentar»: se responde una vez, en clase.
- El texto dice «Coincide» y «El curso dice», no «Correcto» e «Incorrecto». En el semáforo, elegir
  un color más estricto no es un error grave («ante la duda, sube un color»), y el porqué lo explica.
- **Persistencia:** las elecciones y el estado se guardan en `sessionStorage` con la clave
  `decide:<slide.id>`, dentro de `try/catch`. Motivo: en el celular, al cambiar entre Zoom y el
  navegador, la pestaña suele recargarse, y el alumno perdería lo que marcó. Si `sessionStorage` no
  está disponible, funciona igual sin guardar.
- José Luis, en modo admin, ve y usa exactamente lo mismo. No ve lo que respondieron los alumnos:
  eso es la capa en vivo (§5).

### Escritorio y móvil

- **Varias preguntas (repaso):** una tarjeta `PANEL` por pregunta, con las opciones apiladas a lo
  ancho. Igual en escritorio y en móvil.
- **Clasificar (semáforo):** en escritorio (`md` y más), cada dato es una fila: el texto a la
  izquierda y tres botones seguidos a la derecha. En móvil, el texto arriba y los tres botones
  debajo, a lo ancho, en una fila.
- **Cazar la frase:** la `pregunta` como burbuja del usuario, a la derecha; debajo, la respuesta de
  la IA como una burbuja con las frases una debajo de otra, cada una tocable. Al revelar, la falsa
  queda marcada «Inventada» y las demás «Cierta». Igual en móvil, con las burbujas a lo ancho.
- **Con animación (ventana):** en escritorio (`xl`), la animación a la izquierda y la pregunta a la
  derecha. En móvil, la animación arriba, con alto fijo, y la pregunta debajo.
- Toda zona tocable mide al menos 44 px de alto.
- Cada tarjeta entra con `Item` de `Movimiento.jsx`, en el escalonado del slide, como los demás tipos.

### Accesibilidad

- Cada item es un `<fieldset>` con su `<legend>` (el texto) y `<input type="radio">` nativos,
  pintados como botones. El teclado (Tab y flechas) y los lectores de pantalla funcionan sin código
  extra.
- Al revelar, los radios quedan `disabled`. El porqué se enlaza con `aria-describedby`.
- El botón se reemplaza por el resultado («Coincidiste en 7 de 10»), que recibe el foco
  (`tabIndex={-1}`) y está en una región `aria-live="polite"`: el foco no se pierde y el lector lo anuncia.
- Acierto y diferencia se distinguen por ícono y texto, no solo por color.
- Movimiento reducido (`useReducedMotion`): sin transiciones; la ventana muestra directamente sus
  estados final y revelado.

---

## 2. Los cuatro usos

### Uso 1 · `v1-2-4a` · La ventana de contexto (nuevo, antes de `v1-2-4`)

Va antes de `v1-2-4` para que el alumno lo vea primero y después lea la explicación.

**Qué ve:** un chat de nueve mensajes que aparecen uno por uno (0,6 s cada uno), todos visibles en
pantalla, como en su app. Pregunta: ¿la IA todavía ve el primero? Al revelar, aparece un marco
rotulado «Ventana de contexto» que cubre solo los cuatro últimos mensajes. Los de arriba se apagan y
llevan la etiqueta «Fuera de la ventana». La idea que se lleva: tú todavía ves el mensaje 1 en tu
pantalla; el modelo ya no.

**Movimiento reducido:** los nueve mensajes aparecen de una vez; al revelar, el marco y el apagado
aparecen sin transición.

```js
{
    id: "v1-2-4a",
    title: "¿Qué recuerda la IA?",
    type: "decide-revela",
    contentData: {
        heading: "¿Qué recuerda la IA de este chat?",
        paragraph: "Mira cómo crece un chat de trabajo. Después responde.",
        rotulo: "Esquema: la ventana real es mucho más grande, pero funciona igual.",
        animacion: "ventana-contexto",
        ventana: 4,
        mensajes: [
            { de: "tu", texto: "Caso [CLIENTE_1]: arriendo de un local en Cuenca. El canon es de 800 dólares." },
            { de: "ia", texto: "Entendido. ¿Qué necesitas revisar?" },
            { de: "tu", texto: "Revisa la cláusula de terminación anticipada." },
            { de: "ia", texto: "La cláusula novena permite terminar con 30 días de aviso…" },
            { de: "tu", texto: "Redacta la carta de aviso." },
            { de: "ia", texto: "Borrador de la carta…" },
            { de: "tu", texto: "Otra cosa: resume esta sentencia de 40 páginas." },
            { de: "ia", texto: "Resumen de la sentencia…" },
            { de: "tu", texto: "Volviendo al arriendo: ¿cuál era el canon?" }
        ],
        items: [
            {
                id: "primer-mensaje",
                texto: "¿La IA todavía ve el primer mensaje, donde le diste el canon?",
                opciones: [
                    "Sí: todo el chat queda en su memoria",
                    "No: ese mensaje ya salió de la ventana"
                ],
                correcta: 1,
                porque: "La ventana de contexto es finita. Lo que no cabe, el modelo no lo ve, aunque tú lo sigas viendo en tu pantalla. Si ahora le preguntas el canon, puede inventarlo con total seguridad."
            }
        ]
    }
}
```

Sin `cierre`: `v1-2-4`, que viene después, ya dice cuándo abrir un chat nuevo.

### Uso 2 · `v1-3-7` · Caza la alucinación (reemplaza «Tutorial 2: el prompt malo»)

Conserva el id y el lugar del paso 2 del tutorial. Muestra el prompt malo y una respuesta sintética
como la que suele producir, en lugar de probarlo en vivo.

**Norma verificada:** Código Civil, arts. 2414 y 2415 (Codificación 10, Registro Oficial Suplemento
46 de 24 de junio de 2005). Verificado el 24 sep 2026 contra el PDF oficial
(`presidencia.gob.ec/wp-content/uploads/2024/04/CODIGO_CIVIL.pdf`), según
`docs/plans/2026-09-24-virtual-1-investigacion.md` §4. Son los mismos datos que ya usa `v1-3-10`.
La cita falsa es inventada a propósito: no hay que verificarla, porque no existe.

**Qué ve:** la pregunta del usuario en una burbuja y la respuesta «de la IA» en cuatro frases. Toca
la que cree falsa. Al revelar: la tercera queda marcada «Inventada», las otras tres «Cierta», el
porqué y, debajo, cómo se verifica.

```js
{
    id: "v1-3-7",
    title: "Tutorial 2: caza la alucinación",
    type: "decide-revela",
    contentData: {
        heading: "Paso 2: caza la alucinación",
        paragraph: "Este es el prompt malo y una respuesta como la que suele dar. Una de las frases es falsa. Tócala.",
        rotulo: "Ejemplo sintético: respuesta escrita para el curso, no generada por una IA.",
        pregunta: "¿Cuál es el plazo de prescripción de una deuda en Ecuador?",
        items: [
            {
                id: "frase-falsa",
                texto: "¿Qué frase es falsa?",
                opciones: [
                    "En Ecuador, la prescripción extintiva de las deudas está regulada en el Código Civil.",
                    "El plazo se cuenta desde que la obligación se hizo exigible, según el artículo 2414.",
                    "El artículo 2415 lo dice textualmente: «la acción ejecutiva prescribe en tres años y la ordinaria en cinco».",
                    "Vencido el plazo de la acción ejecutiva, la deuda todavía puede reclamarse por la vía ordinaria."
                ],
                correcta: 2,
                porque: "El artículo 2415 fija 5 años para la acción ejecutiva y 10 para la ordinaria; vencidos los 5, la ejecutiva se convierte en ordinaria y dura 5 años más. La cita entre comillas no existe: la IA la armó con plazos equivocados y la presentó como textual. Las otras tres frases son ciertas."
            }
        ],
        cierre: {
            titulo: "Por qué pasó y cómo se verifica",
            puntos: [
                "El prompt no dijo si era acción ejecutiva u ordinaria, no dio la fuente y no le permitió decir «no sé».",
                "Abre el Código Civil en la fuente oficial: Codificación 10, Registro Oficial Suplemento 46 de 24 de junio de 2005.",
                "Busca el artículo que te citó y compáralo palabra por palabra.",
                "Unas comillas no prueban nada: si la cita no está en la fuente, no existe."
            ]
        }
    }
}
```

### Uso 3 · `v1-6-4` · Semáforo (reemplaza la tabla, mismo id)

La tabla pasa al `cierre`: se ve después de clasificar. Los criterios son los de la tabla actual de
`v1-6-4` y de `semaforo-confidencialidad.md`; los ejemplos salen de ese material («minuta con las
partes etiquetadas», «autorización de salida del país de un menor», «liquidación de sociedad
conyugal seudonimizada»). No hay criterios nuevos.

Quedan 3 verdes, 3 amarillos y 4 rojos. Dos son a propósito para discutir: el 6 (el contrato sin
seudonimizar es amarillo, pero así como está no se sube) y el 7 (lo penal sigue en rojo aunque se
seudonimice).

**Qué ve:** diez datos, cada uno con tres botones. Al revelar: marca y porqué en cada uno,
«Coincidiste en 7 de 10» y, debajo, a dónde puede ir cada color.

```js
{
    id: "v1-6-4",
    title: "Semáforo",
    type: "decide-revela",
    contentData: {
        heading: "Semáforo: ¿qué color le toca a cada dato?",
        paragraph: "Clasifica los diez. Propuesta del curso, no norma. Ante la duda, sube un color.",
        opciones: ["🟢 Verde", "🟡 Amarillo", "🔴 Rojo"],
        boton: "Ver respuestas",
        items: [
            { id: "plantilla", texto: "Tu plantilla de minuta de compraventa, sin datos reales", correcta: 0,
              porque: "Plantilla sin datos reales: verde." },
            { id: "certificado-medico", texto: "El certificado médico de un cliente", correcta: 2,
              porque: "Datos de salud: rojo. Son datos sensibles." },
            { id: "minuta-etiquetada", texto: "La minuta de un cliente con las partes cambiadas por [VENDEDOR_1] y [COMPRADOR_1] en tu computadora", correcta: 1,
              porque: "Documento de cliente ya seudonimizado: amarillo. Puede ir a un plan pago con el entrenamiento desactivado; mejor, a un plan de equipo." },
            { id: "sentencia-publica", texto: "Una sentencia publicada en el buscador de la Corte Nacional", correcta: 0,
              porque: "Fallo público: verde." },
            { id: "salida-menor", texto: "La autorización de salida del país de un menor", correcta: 2,
              porque: "Datos de niñas, niños y adolescentes: rojo." },
            { id: "contrato-crudo", texto: "El contrato de arrendamiento de un cliente, tal como te lo mandó, con nombres y cédulas", correcta: 1,
              porque: "Es un documento de cliente: amarillo. Pero así como está no se sube: primero se seudonimiza en tu computadora o se pide el consentimiento informado del cliente. Si elegiste rojo, vas bien: ante la duda, sube un color." },
            { id: "penal-seudonimizado", texto: "Un expediente penal, ya seudonimizado", correcta: 2,
              porque: "Los procesos penales son rojo aunque cambies los nombres. Solo por excepción: API con Zero Data Retention o nube empresarial, y con consentimiento expreso del cliente." },
            { id: "lopdp", texto: "El texto de la LOPDP descargado del Registro Oficial", correcta: 0,
              porque: "Ley pública: verde." },
            { id: "sociedad-conyugal", texto: "Una liquidación de sociedad conyugal con las partes etiquetadas", correcta: 1,
              porque: "Documento de cliente seudonimizado: amarillo." },
            { id: "caso-conocido", texto: "Un caso muy conocido en tu ciudad, con los nombres cambiados", correcta: 2,
              porque: "Rojo: la combinación de hechos identifica a la persona aunque cambies el nombre." }
        ],
        cierre: {
            titulo: "Dónde puede ir cada color",
            puntos: [
                "🟢 Verde: cualquier plan pago con el entrenamiento desactivado.",
                "🟡 Amarillo: plan pago con el entrenamiento desactivado, solo después de seudonimizar en tu computadora o con consentimiento informado del cliente. Mejor en un plan de equipo.",
                "🔴 Rojo: no subir. Por excepción, API con Zero Data Retention o nube empresarial, y siempre con consentimiento expreso del cliente."
            ]
        }
    }
}
```

### Uso 4 · `v1-8-0` · Repaso (nuevo, antes de `v1-8-1`)

Cuatro preguntas, una por idea central de la sesión: ventana, verificación, confidencialidad y
delegación. Todas las respuestas salen de slides de hoy (`v1-2-4`, `v1-3-6`, `v1-6-1`, `v1-4-3`).
La respuesta correcta cambia de lugar en cada pregunta.

**Qué ve:** cuatro tarjetas, cada una con tres opciones. Un botón «Ver respuestas» al final.

```js
{
    id: "v1-8-0",
    title: "Repaso",
    type: "decide-revela",
    contentData: {
        heading: "Repaso: cuatro decisiones de todos los días",
        paragraph: "Responde las cuatro y después mira las respuestas.",
        boton: "Ver respuestas",
        items: [
            {
                id: "chat-largo",
                texto: "Llevas dos horas en el mismo chat, con tres casos distintos. ¿Qué haces?",
                opciones: [
                    "Sigo ahí: la IA recuerda todo lo que le dije",
                    "Pido un resumen del caso que me interesa y lo llevo a un chat nuevo",
                    "Le pido que olvide los otros dos casos"
                ],
                correcta: 1,
                porque: "La ventana es finita y un chat que mezcla casos mezcla también sus datos. Resumen y chat nuevo."
            },
            {
                id: "confianza-alta",
                texto: "La IA te da un artículo con cita textual y dice que su confianza es alta. ¿Qué haces antes de usarlo?",
                opciones: [
                    "Nada: si la confianza es alta, está bien",
                    "Le pregunto si está segura",
                    "Abro la fuente oficial y comparo la cita"
                ],
                correcta: 2,
                porque: "Confianza no es exactitud. La última revisión es humana: la cita se contrasta con la fuente oficial."
            },
            {
                id: "entrenamiento",
                texto: "Desactivaste el entrenamiento en tu plan pago. ¿Ya puedes pegar el contrato de un cliente con nombres y cédulas?",
                opciones: [
                    "No: los datos igual salen de tu computadora y se guardan; seudonimiza antes",
                    "Sí: ya es confidencial",
                    "Sí, si después borro el chat"
                ],
                correcta: 0,
                porque: "Desactivar el entrenamiento no es confidencialidad. Seudonimiza en tu computadora antes de subir."
            },
            {
                id: "delegar",
                texto: "¿Qué no le delegas a la IA?",
                opciones: [
                    "El primer borrador de una minuta",
                    "El resumen de un expediente que tú cargaste",
                    "La conclusión jurídica final y la firma"
                ],
                correcta: 2,
                porque: "La IA hace borradores, resume y ordena. La conclusión y la firma son tuyas."
            }
        ]
    }
}
```

---

## 3. Hacerle espacio: qué cortar o fusionar

Propuesta. No se toca nada hasta que José Luis la apruebe.

Los minutos son **estimados míos, sin medir**: no hay todavía un guion con minutos por slide. Parto
de los minutos por bloque del mapa (10, 15, 20, 15, 10, 30, 35, 15). El bloque 3 ya estaba
sobrecargado: 11 slides en 20 minutos.

### Lo que suman los cuatro usos: +10 min

| Uso | Slide | Minutos |
|---|---|---|
| Ventana | `v1-2-4a`, nuevo | +2 |
| Caza la alucinación | `v1-3-7` cambia de tipo; reemplaza la prueba en vivo del prompt malo | +1 |
| Semáforo | `v1-6-4` cambia de tipo; la tabla pasa al cierre | +3 |
| Repaso | `v1-8-0`, nuevo | +4 |

### Lista A: se propone (−10 min)

| # | Qué | Por qué | Libera |
|---|---|---|---|
| 1 | `v1-2-4`: quitar el recuadro «Demo en vivo: el mismo pedido en un chat largo y en uno nuevo» | La animación de `v1-2-4a` muestra lo mismo, sin el riesgo de una demo en vivo | 3 min |
| 2 | Cortar `v1-3-1` «La IA miente» (del curso básico) | `v1-3-3` (Avianca) y `v1-3-5` dan el mismo mensaje con datos; además tiene emojis y el tono del básico | 2 min |
| 3 | Fusionar `v1-3-8` y `v1-3-9`: queda solo el prompt «aún mejor», retitulado «Paso 3: el prompt mejor» | El intermedio sigue en el tutorial descargable (`tutorial-evitar-alucinaciones.md`) | 2 min |
| 4 | `v1-3-10`: quitar la primera mitad (los arts. 2414 y 2415) y retitularlo «Paso 4: verifica y protocolo»; su recuadro final pasa a «La frase inventada del paso 2 no resiste esta comprobación» | La Caza ya revela los artículos | 1 min |
| 5 | Fusionar `v1-7-3` y `v1-7-5`: queda la plantilla 1 | La plantilla 1 ya trae las mismas reglas que enumera `v1-7-3` | 2 min |

Con la lista A la sesión queda en 43 slides: 44, más `v1-2-4a` y `v1-8-0`, menos `v1-3-1`, `v1-3-8` y
`v1-7-3`. Los bloques pasarían a 10, 14, 16, 15, 10, 33, 33 y 19 minutos (suman 150).

### Lista B: reserva, si en el ensayo no alcanza

| Qué | Libera |
|---|---|
| Cortar `v1-7-2` «Fórmula R.C.T.F.» (del básico): el grupo avanzado ya la conoce | 2 min |
| Pasar `v1-3-5b` (benchmark) al tutorial descargable y decirlo en una frase dentro de `v1-3-5` | 3 min |

---

## 4. Horas y riesgo

### Horas por parte

| Parte | Horas |
|---|---|
| 1. `decide.js` y sus pruebas (`puntaje`, `validar`) | 1,5 |
| 2. `DecideRevela.jsx` y su registro en `SlideAvanzado.jsx`: escritorio, móvil, estados, `sessionStorage`, accesibilidad | 3 |
| 3. `VentanaContexto.jsx`, con movimiento reducido | 1,5 |
| 4. Cargar el contenido de los cuatro usos en `VIRTUAL_1.js` | 1 |
| 5. Aplicar la lista A aprobada y actualizar los ids fijos de `rotulos.test.js` | 1 |
| 6. Verificar en el navegador a 1280 y 375 px, con teclado y movimiento reducido; build y lint | 1,5 |
| 7. Revisión final | 0,5 |
| **Total** | **10 de 12** |

Si se pasa del tope, se recorta en este orden: (1) la ventana deja de animarse y muestra dos
estados fijos, antes y después (−1 h); (2) se quita el contador «Coincidiste en 7 de 10» (−0,5 h).

### Riesgos

1. **Que el slide se vuelva a montar a mitad de respuesta.** Si la sincronización del admin
   remonta `SlideAvanzado` en cada actualización, el alumno perdería lo marcado. `sessionStorage`
   lo cubre; igual hay que comprobarlo en la parte 6 cambiando de slide en admin y volviendo.
2. **Contenido jurídico.** La Caza depende de los arts. 2414 y 2415, verificados el 24 sep 2026.
   Volver a mirarlos en la fuente oficial antes del 13 de octubre, como todo el material de la sesión.
3. **Dos datos del semáforo son discutibles a propósito** (el 6 y el 7). José Luis debe estar de
   acuerdo con su respuesta antes de cargarlos.
4. **El guion del profesor** (`docs/prompts/2026-09-24-guion-virtual-1.md`) cuenta 44 slides y los
   minutos por bloque de antes. Si se aprueba la lista A, ese encargo debe actualizarse a 43 slides
   y a los minutos nuevos antes de escribir el guion.
5. **Orden con el tema nocturno.** Este trabajo va encima de sus tokens y de `Movimiento.jsx`. En
   `git status` aparece `SlideAvanzado.jsx` en stage sin diferencias visibles; confirmar que el plan
   del tema terminó antes de empezar.

---

## 5. Capa en vivo (opcional, después de la seguridad)

No entra en las 12 h. Solo se construye después de `docs/prompts/2026-09-24-seguridad-admin.md`.

**Qué agrega:** al revelar, las elecciones del alumno se envían; José Luis ve en su pantalla el
reparto de la clase por item («6 de 8 eligieron Rojo»). Los alumnos no ven el reparto: se evita
exponer quién respondió qué.

**Tabla:** ninguna nueva. Se reutiliza `poll_votes`, la de las encuestas en vivo (`usePolls.js`):
- `session_code`: el de la sesión, como hoy.
- `poll_id`: `<slide.id>:<item.id>`, por ejemplo `v1-6-4:penal-seudonimizado`.
- `option_index`: la opción elegida.
- `participant_id`: el del alumno.

Un insert por item respondido, todos juntos al pulsar «Ver respuestas». Con 8 alumnos y 10 items
son 80 filas. El panel del admin se suscribe como `usePolls`, filtrando por `session_code` y, en el
cliente, por el prefijo del slide.

**Qué la bloquea:**
1. **El modo admin se puede falsificar** escribiendo `course_admin_auth=true` en localStorage. Con
   eso, cualquiera vería el reparto. Lo arregla el encargo de seguridad.
2. **Borrar votos de ensayo** exige un `delete`, que después del arreglo solo podrá hacer el
   servidor. Hace falta un endpoint de admin para reiniciar una sesión.
3. **`poll_votes` no está en `supabase_migrations*.sql`.** Antes hay que mirar en Supabase su
   esquema, sus índices y sus políticas RLS reales.

Estimado aparte, sin medir: 4 a 6 h.

---

## 6. Después de aprobar

- El plan de ejecución se escribe en otra sesión, con este archivo como entrada.
- Reparto propuesto, **sin medir**: planear con `claude-opus-5-5` en `high`, ejecutar con `sonnet`
  en `medium` y revisar con `claude-opus-5-5` en `medium`. Es un encargo grande según
  `COMO-TRABAJAR.md` §6: tiene más de dos tareas.

## Aprobación

- [ ] Diseño aprobado por José Luis: fecha ____
- [x] Lista A aprobada completa (los 5 puntos, −10 min): 24 sep 2026. Con los 8 min del Anonimizador, la Virtual 1 queda en 142 min
- [ ] Datos 6 y 7 del semáforo aprobados: fecha ____
