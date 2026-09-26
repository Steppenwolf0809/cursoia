Lista con arreglos menores.

# Revisión de las correcciones de la Virtual 1

Revisor: `claude-opus-5-5`, `medium`. Revisé el diff `69760f2..HEAD` (9 commits) contra
`docs/plans/2026-09-26-correcciones-virtual-1-plan.md`, sin leer el informe del ejecutor. Todo se
midió con el servidor del avanzado en el puerto 5174, en modo admin y con Supabase bloqueado. Las
capturas del recorrido quedaron en `D:/tmp/pw-curso/capturas-revision`, y los scripts de medición
en el scratchpad de la sesión, fuera del repo.

El ejecutor aplicó el plan al pie de la letra. Los hallazgos son vacíos del plan o efectos que el
plan no midió, no errores de ejecución.

## Hallazgos, de más a menos grave

### 1. El curso sigue llamando «anonimizar» a lo que el slide nuevo define como seudonimizar (media)

**Dónde:** `client/src/data/avanzado/VIRTUAL_1.js:751` («anonimiza tu contrato y revísalo con IA»)
y `:763` («Trae el contrato .docx sin anonimizar», «Lo anonimizamos juntos al empezar»);
`client/public/materiales/tarea-virtual-2.md:3`, `:6` y `:17`.

**Qué está mal:** la viñeta nueva de `v1-6-2` (`VIRTUAL_1.js:457`) dice que seudonimizar no es
anonimizar y que lo seudonimizado sigue siendo dato personal. Pero el Anonimizador no anonimiza:
cambia los datos por etiquetas y el alumno se queda con la correspondencia. En
`docs/plans/2026-09-24-temario-anonimizador.md:167`, el consejo dice «Anota aparte, en tu
computadora, qué etiqueta corresponde a cada persona real». Eso es justo la «información adicional»
que figura por separado, como la describe el art. 4 de la LOPDP al definir seudonimización. Así,
14 slides después de la distinción, el curso le pide al alumno «anonimizar» su contrato. Un abogado
atento lo va a notar, y otro puede concluir lo contrario de lo que enseña el slide: que el archivo
exportado ya queda fuera de la ley.

**Cómo lo comprobé:** `git grep -n -i "anonimiz" -- client/src/data/avanzado client/public/materiales`,
y la definición de seudonimización del art. 4, leída en el PDF de Cancillería.

**Arreglo propuesto** (solo texto, sin tocar el nombre de la herramienta, que decide José Luis):
- `:751`: «Virtual 2 · jueves 15 de octubre: seudonimiza tu contrato y revísalo con IA».
- `:763`: «Trae el contrato .docx tal como está» y «Lo seudonimizamos juntos al empezar y con él
  haces la matriz de riesgos».
- `tarea-virtual-2.md` 3, 6 y 17: el mismo cambio de verbo, conservando el BOM. La línea 16 («ni
  para anonimizarlo») puede quedar, porque habla de pedírselo a una IA, que es el error de `v1-6-1`.
- Opcional: una frase en `v1-8-2` que diga «El Anonimizador seudonimiza: la tabla queda en tu
  computadora».

Los slides de la Virtual 2 guardados en el temario («Anonimiza antes de pegar», el botón
«Anonimizar») tienen el mismo problema, pero no son parte de este plan.

### 2. «(art. 60.2)» ahora se lee como un artículo de la Resolución (menor)

**Dónde:** `VIRTUAL_1.js:460`, `paragraph2` de `v1-6-2`.

**Qué está mal:** la tarea 6 metió «(Resolución 0004-R, art. 59)» en la misma frase que termina en
«(art. 60.2)». La cita suelta que viene justo después se lee como de la Resolución, y esa
Resolución sí tiene un art. 60.2, que no trata del consentimiento: dice «La categoría y los tipos de
datos personales transferidos o comunicados». El consentimiento explícito es el art. 60, numeral 2,
de la LOPDP. Además, el art. 59 de la LOPDP es «Autorización para transferencia internacional», y la
misma frase menciona la «autorización de la SPDP». Las dos normas quedan mezcladas en tres líneas.

**Cómo lo comprobé:** leí el art. 60 en el texto de la Resolución SPDP-SPD-2026-0004-R (PDF
oficial de spdp.gob.ec) y los arts. 59 y 60 en el PDF de la LOPDP de Cancillería.

**Arreglo propuesto:** «…el consentimiento explícito e informado del titular (LOPDP, art. 60,
num. 2).»

### 3. La viñeta de seudonimizar omite la condición del art. 2 c) (menor)

**Dónde:** `VIRTUAL_1.js:457`.

**Qué está mal:** la viñeta dice que lo anonimizado «queda fuera de la ley». El art. 2 c) lo excluye
«en tanto no sea posible identificar a su titular», y agrega: «Tan pronto los datos dejen de estar
disociados o de ser anónimos, su tratamiento estará sujeto al cumplimiento de las obligaciones de
esta ley». El estándar de «esfuerzos desproporcionados» sale de la definición de anonimización del
art. 4, no de la exclusión.

El resto de la viñeta está bien:
- Seudonimización, art. 4: los datos «ya no puedan atribuirse a un titular sin utilizar información
  adicional», siempre que esa información «figure por separado».
- Que lo seudonimizado «sigue siendo dato personal» es una inferencia, como advirtió el planeador,
  pero sólida: el art. 4 define dato personal como el que «identifica o hace identificable a una
  persona natural, directa o indirectamente», y el art. 2 excluye solo los datos anonimizados.

**Cómo lo comprobé:** leí los arts. 2 y 4 en el PDF de Cancillería (Quinto Suplemento del R.O. 459,
26 de mayo de 2021, «Normativa: Vigente»).

**Arreglo propuesto:** «…sin un esfuerzo desproporcionado y, mientras no se pueda identificar al
titular, queda fuera de la ley; …». En el encabezado de la viñeta: «(arts. 2 c y 4)».

### 4. El panel de la encuesta sigue cortado en tabletas y portátiles chicos, y le quita espacio al slide (menor)

**Dónde:** `client/src/components/layout/AppLayout.jsx:46-47`.

**Qué está mal:** el 70vh se calculó con la altura que necesita el panel en un teléfono (440 px).
Desde 640 px de ancho, el relleno `sm:p-6` hace que el panel necesite unos 613 px, así que el tope de
70vh no alcanza en ninguna pantalla de menos de 1280 px de ancho y menos de unos 876 px de alto.
Pasa a 1024 × 768, a 1180 × 820 (iPad en horizontal) y a 1279 × 800. En esos tamaños la 5.ª opción
sigue a medias y el slide pierde unos 190 px. Además, el comentario de la línea 46 dice «en móvil»,
pero la clase aplica a todo ancho menor de 1280 px.

**Cómo lo comprobé:** con Playwright, en modo admin. Medí el cuerpo del panel (`scrollHeight -
clientHeight`) y el alto que queda entre el panel y la barra inferior. Para el «antes», quité la
clase en el DOM, con lo que vuelve el `max-h-[45vh]` del JSX compartido. Estos son los datos de
`v1-1-3` y `v1-1-5`, las encuestas de 5 opciones; `v1-1-4`, de 3 opciones, cabe en todos los tamaños.

| Tamaño | Oculto en el panel (45vh → 70vh) | Alto útil del slide (45vh → 70vh) |
|---|---|---|
| 1024 × 768 | 243 → **51 px** | 339 → 147 px. En `v1-1-3`, el título queda 41 px bajo la barra |
| 1180 × 820 | no medido → **14 px** | → 161 px |
| 1279 × 800 | 228 → **28 px** | 355 → 155 px |
| 1280 × 800 | 0 → 0 (panel lateral, `max-height: none`) | 715 → 715 px |
| 768 × 1024 | 128 → 0 | 352 → 201 px; título y aviso visibles |
| 375 × 667 | 125 → 0 | 177 → 38 px (título oculto en modo admin) |
| 375 × 812 | 60 → 0 | 257 → 183 px |

**Qué tan grave es:** en la encuesta el slide solo repite la pregunta, que ya está en el panel, y en
un portátil la barra de desplazamiento del panel se ve. Por eso es menor. La vista de alumno no se
pudo medir: pide ingresar un nombre y Supabase está bloqueado.

**Arreglo propuesto:**
- Corregir el comentario: «en pantallas de menos de 1280 px», no «en móvil».
- Sumar al ensayo: la encuesta como alumno en una tableta horizontal o en 1024 × 768.
- Si se quiere 0 px también en esos tamaños, `max-xl:max-h-[80vh]` lo logra (medido: 0 px ocultos a
  1024 × 768, 1180 × 820 y 1279 × 800; los teléfonos no cambian porque el panel se ajusta a su
  contenido). El costo: el slide queda en 73 a 123 px. Yo no lo cambiaría sin ver antes la vista de
  alumno.

### 5. El material descargable no trae la distinción nueva (menor)

**Dónde:** `client/public/materiales/semaforo-confidencialidad.md:29-33`, sección «Lo que dice la
LOPDP».

**Qué está mal:** `v1-6-2` ganó la viñeta «Seudonimizar no es anonimizar», pero el material que el
alumno se lleva no la tiene, aunque su color amarillo («solo seudonimizado») depende de esa idea.

**Cómo lo comprobé:** leí la sección y corrí `grep -c "anonimizar" semaforo-confidencialidad.md`.

**Arreglo propuesto:** agregar una viñeta antes de «Criterio del curso», con el texto del hallazgo 3
ya corregido, y conservar el BOM.

### 6. Observación de estilo, no bloquea

En `VIRTUAL_1.js:435`, el párrafo nuevo de `v1-6-1` termina en «Por eso se seudonimiza antes de
subir…», y el aviso de la línea 443 repite «Seudonimiza en tu computadora antes de subir». Si
molesta, el aviso puede quedar solo en «El jueves lo haces con el Anonimizador» (o «lo
seudonimizas», si se aplica el hallazgo 1).

Fuera del alcance de este plan: `v1-1-2` hereda del básico el subtítulo «Abogado Notarial | No soy
programador», con la «N» mayúscula.

## Lo que verifiqué y salió bien

- **Cumplimiento del plan:**
  - Tareas 1 a 9: cada cambio es el literal del plan, sin nada de más ni de menos. Los 9 mensajes
    de commit coinciden y ninguno trae líneas de atribución. Cada commit toca solo sus archivos; el
    de la tarea 9 tiene 2 líneas agregadas y 1 quitada.
  - Tarea 10: la sección del guion es idéntica al plan y está antes de «Cómo se sabe que terminó».
  - Tarea 11: sigue bloqueada, como se esperaba (`git grep "ENLACE DE DRIVE"` da una sola línea).
- **El básico no cambió:**
  - `git diff 69760f2 HEAD` toca solo 5 archivos, y ninguno es `course-content.jsx`, un
    `MODULO_*.js` ni una imagen.
  - En `AppLayout.jsx` solo cambian las líneas 46 y 47, dentro de la rama `ES_AVANZADO ? {`.
  - El cambio de la barra espaciadora volvió al árbol de trabajo y `git stash list` está vacío.
  - `QUIEN_SOY` se copia con el operador de propagación, sin modificar el slide del básico.
- **Pruebas y lint:**
  - `node --test`: 17 de 17.
  - ESLint del avanzado: 0 problemas.
  - ESLint de `AppLayout.jsx`: 6 problemas, igual que la línea base.
- **Scripts de pantalla:**
  - `verificar-correcciones-v1.mjs`, idéntico al anexo A: «Todo en verde.», con `h1` en
    `PENDIENTE`.
  - `recorrido-avanzado.mjs`: «Sin problemas.», con 146 capturas en `capturas-revision`.
  - `docs/revision/capturas-avanzado` quedó intacto: 142 líneas de estado, el mismo hash y 0
    archivos modificados.
- **Caja del prompt sin alto máximo** (`v1-3-9`, `v1-7-4`, `v1-7-5` y `v1-7-6`): el final del prompt
  se alcanza desplazando la página y la barra de admin no lo tapa (0 px) a 1920 × 1080, 1280 × 800,
  1024 × 768 y 375 × 667. A 1920 × 1080 no hace falta desplazar.
- **Texto:**
  - Semáforo y tabla de modelos: el semáforo queda en una línea también a 320 y a 340 px, y la
    tabla de `v1-2-3` no desborda a 320 px.
  - Emojis: en los 41 slides solo están los de `v1-6-4`.
  - Voseo y mayúsculas de énfasis: no hay, ni en `VIRTUAL_1.js` ni en los dos materiales.
  - BOM: los dos materiales lo conservan.
  - La celda nueva de `v1-2-5` coincide con los títulos de `v1-4-2` y `v1-4-3`.
- **Art. 59 de la Resolución 0004-R:** lo leí en el PDF oficial de spdp.gob.ec. Reconoce nivel
  adecuado a la Comunidad Andina «sin necesidad de evaluación adicional por parte de la SPDP», así
  que la cita de la tarea 6 es correcta.
