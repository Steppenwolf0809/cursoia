**Veredicto: lista con arreglos menores.** Ningún dato resultó falso y el recorrido pasa limpio. Un arreglo es obligatorio antes del 13 de octubre: el enlace de Drive del Anonimizador (hallazgo 1).

# Virtual 1 · revisión del 26 de septiembre de 2026

Revisado sobre `curso-avanzado-v1` en `69760f2`, con los cambios sin commit que tenía el
checkout principal: `AppLayout.jsx` (la barra espaciadora sobre `<summary>`) y
`docs/guiones/02-tokens.md`. No se editó `VIRTUAL_1.js` ni los materiales.

## Hallazgos, de más a menos grave

### Obligatorio antes de la clase

1. **Slide 39, `v1-8-2`, y `tarea-virtual-2.md`: falta el enlace del Anonimizador.** El
   material dice literalmente `Se baja de aquí: [ENLACE DE DRIVE]` (línea 10). El slide dice
   «Baja el Anonimizador del enlace de Drive», pero no muestra ningún enlace, y el slide 40
   tampoco. Sin él, nadie puede hacer la tarea de la Virtual 2.
   *Comprobación:* `git grep -n "ENLACE DE DRIVE\|drive.google"` en `client/`: el único resultado
   es el marcador. En la captura `39-v1-8-2-escritorio.png` no hay ningún enlace.

### Redacción: emojis (regla del curso)

2. **Slide 2, `v1-1-2` «¿Quién soy?», muestra ❌ ✅ 🎯 y «Power User».** Viene del básico
   (`course-content.jsx:48-50`), que además pone mayúscula después de los dos puntos («Antes:
   Tareas mecánicas»). Por esa misma razón se cortó `v1-3-1` (diseño, lista A, punto 2). Se
   arregla sin tocar el básico: basta con pasar `bullets` propios en `VIRTUAL_1.js`.
   *Comprobación:* `Perfil.jsx` pinta las viñetas tal cual, y en `02-v1-1-2-escritorio.png` se
   ven los emojis.
3. **Slide 28, `v1-6-4` Semáforo: 🟢 🟡 🔴 en los botones y en el cierre**
   (`VIRTUAL_1.js:473` y `500-502`). Choca con la regla de no usar emojis, aunque aquí cumplen
   una función. Además, en móvil el botón «Amarillo» se parte en dos líneas. Decide tú si se
   quedan o si pasan a círculos de color con CSS.

### Hilo

4. **«Seudonimizar» se usa desde el slide 23 sin haberse explicado.** Aparece primero en
   `v1-4-3` («Datos de clientes sin seudonimizar», línea 401) y vuelve en `v1-6-1`, `v1-6-2`,
   `v1-6-4`, `v1-8-0` y `v1-8-1`. La herramienta se llama «Anonimizador», y `v1-6-1` también
   dice «Anonimizar solo el nombre». Ningún slide define seudonimizar ni lo distingue de
   anonimizar. Para abogados la diferencia importa, porque el dato seudonimizado sigue siendo un
   dato personal.
   *Comprobación:* `grep -n seudonim VIRTUAL_1.js`.
5. **Slide 27, `v1-6-3`, dice «Sí, para el color verde» antes de presentar el semáforo**, que
   recién llega en el slide 28. El orden niveles → semáforo está decidido; el problema es solo
   esa referencia adelantada. Se resuelve con una frase o en el guion.
6. **Slide 12, `v1-2-5` (4D): la fila de Delegación dice «Harness y agentes».** Pero el harness
   se movió al bloque 2 el 26 de septiembre (`v1-2-1b`), y el bloque 4 hoy es «Tres formas de
   trabajar con IA» y «Qué delegar».
7. **Slide 27, `v1-6-3`: «Fable y Mythos exigen 30 días».** Mythos no aparece en ningún otro
   slide, ni siquiera en la lista de modelos de `v1-2-3`. El dato es cierto (hallazgo 17): solo
   falta decir qué es o quitar el nombre.

### Contenido: incompleto, no falso

8. **Slide 9, `v1-2-3` Modelos vigentes:**
   - La ventana de Gemini aparece como «—». La ficha oficial de Gemini 3.1 Pro dice «up to 1M»
     (deepmind.google/models/model-cards/gemini-3-1-pro).
   - «Por API, también GPT-6 Sol y Luna»: el anuncio de OpenAI (22 sep 2026) los pone también
     en ChatGPT (Work y Codex; Luna, además, en el plan gratuito y en Go). *Sin confirmar en la
     página:* openai.com devolvió 403 y el verificador solo lo leyó en el extracto del buscador.
   - «1 050 000 tokens» se parte en dos líneas y se lee como dos cifras («1 050» / «000
     tokens» en escritorio). Se evita con espacios de no separación.

### Redacción: frases a pulir

9. **Slide 17, `v1-3-5b`: el párrafo encadena dos «:» y repite «mide».** Dice: «consultado el
   24 de septiembre de 2026: preguntas de conocimiento factual: mide lo que el modelo recuerda.
   […] Y mide la memoria del modelo…». Suena armado a pedazos.
10. **Slide 20, `v1-3-9`: «ÚNICAMENTE» en mayúsculas de énfasis**, en el prompt y también en
    `tutorial-evitar-alucinaciones.md:51` y `:60`. En `v1-7-4`, «BORRADOR INTERNO» es un rótulo
    del flujo de la notaría, no énfasis, así que no lo cuento.

### Pantalla

Lo automático pasó: no hay desborde horizontal, los títulos salen completos con movimiento
reducido, las imágenes cargan, son 40 slides y el decide-revela del semáforo funciona entero.
Con movimiento completo, las animaciones de `v1-2-4a` y `v1-7-2` corren hasta el final en
escritorio y móvil, y el marco «Ventana de contexto» aparece al revelar. Queda esto:

11. **Slides 20, 31, 32 y 33 (`v1-3-9`, `v1-7-4`, `v1-7-5`, `v1-7-6`): en escritorio, el final
    del prompt queda oculto.** La caja tiene `lg:max-h-[60vh] lg:overflow-auto`
    (`Plantilla.jsx:27`) y se desplaza por dentro, pero en las capturas no se ve la barra de
    desplazamiento, así que parece cortada. En `v1-7-6`, por ejemplo, no se ve «Formato de
    entrega». El botón Copiar sí copia el prompt completo. *Sin verificar:* si la barra aparece
    en el Chrome del proyector. Míralo en el ensayo.
12. **Slides 3 y 5 (`v1-1-3`, `v1-1-5`) en móvil: la 5.ª opción de la encuesta queda oculta.**
    Está dentro de un panel que se desplaza por dentro (386 px de contenido en 326 visibles) y
    nada indica que hay más. Quien vota desde el teléfono puede no ver «Solo versiones
    gratuitas» ni «Todavía poco: vengo a eso». *Verificado en modo admin.* La vista de alumno no
    se pudo probar con Supabase bloqueado, porque el alumno sigue al profesor y no avanza solo.
13. **Slide 10, `v1-2-4a`, a 1280×800: el remate no se ve sin desplazarse.** La pregunta «¿cuál
    era el canon?» y el marco de la ventana quedan bajo el pliegue. En móvil, el slide 30
    (`v1-7-2`) tiene un problema parecido: las piezas se encienden, pero el prompt que se va
    armando queda abajo.
14. **Solo en modo admin.** En escritorio, el botón «Ver Feedback» tapa texto en `v1-6-2`
    («por escrito,») y en `v1-7-1` (el consejo). Solo importa si compartes pantalla desde el
    modo admin (`App.jsx:206`). En móvil, la barra inferior corta el número de slide («1» en vez
    de «10») y el botón «Ejercicio 1»; da igual si no presentas desde el teléfono.
15. **Slide 29, `v1-7-1`: la captura `projects.png` sale recortada por la izquierda** («er Call
    Transcripts»). A 375 px su texto no se lee, aunque existe el botón «Ampliar».

### Tiempo

16. **En el papel cabe: 142 minutos más 8 de margen, de 18:30 a 21:00.** Sin ensayo ni guion no
    se puede confirmar. Hay tres riesgos:
    - El reparto por bloque (10, 14, 16, 15, 10, 25, 33 y 19) no se ajustó después del cambio del
      26 de septiembre. El bloque 2 ganó `v1-2-1b` y quedó con 7 slides en 14 minutos, entre
      ellos una animación y una pregunta. El bloque 4 quedó con 2 slides en 15 minutos. Conviene
      pasar unos 3 minutos del 4 al 2 cuando se escriba el guion.
    - El bloque 3 es el más apretado: 9 slides en 16 minutos (Avianca, la tabla de casos, el
      benchmark, cuatro pasos y un decide-revela). Sigue disponible la reserva de la lista B:
      sacar `v1-3-5b` libera 3 minutos.
    - El ejercicio `v1-7-8` tiene 6 pasos para 10 minutos, entre ellos crear el Proyecto y la
      entrevista que redacta las instrucciones. No alcanza para todos. Como `v1-8-2` dice «Hoy:
      termina tu Proyecto», puedes avisar en clase que basta con llegar al paso 4.

### Datos: todos confirmados, con estas notas

17. Se comprobaron 41 afirmaciones (23 jurídicas y 18 sobre modelos, planes y menús), y
    **ninguna resultó falsa**. Notas:
    - `v1-3-4`: la base de Charlotin marcaba 2079 casos el 25 de septiembre. El slide dice 2077
      al 24, así que es correcto con su fecha. Si quieres la cifra del día, actualízala la
      víspera.
    - `v1-3-4`: tres casos se apoyan solo en prensa jurídica (Infobae, 24horas.cl y
      actualidadjuridica): STC17832-2025 de Colombia, el de la Corte Suprema de Chile (22 abr
      2026) y el de la Cámara de Rosario. No se abrió ninguna providencia oficial; pjud.cl pide
      captcha. AC739-2026 sí se leyó en el PDF oficial.
    - `v1-3-5`: el título y la autora del video de Holly Cope están confirmados con el oEmbed de
      YouTube. La fecha «junio de 2026» queda **sin confirmar**.
    - `v1-6-2`: el trato de «nivel adecuado» a la Comunidad Andina no viene de la LOPDP, sino del
      art. 59 de la Resolución SPDP-SPD-2026-0004-R. El slide no se lo atribuye a la ley, pero
      conviene citar ese artículo.
    - `v1-3-5b`: los seis porcentajes coinciden exactamente con artificialanalysis.ai. En la
      fila «De cada 100», los enteros del sitio dan 17,55 respuestas inventadas para GPT-6 Astra
      y el slide pone 17. Con los decimales reales puede ser correcto, así que no es un error
      demostrable.

## Descartados: el revisor de capturas los marcó, pero no son fallas

- `v1-2-4a`, el «hueco» entre mensajes antes de revelar: es el espacio que reserva el marco de
  la ventana (`VentanaContexto.jsx:34`, con borde transparente) para que el alto no salte. Al
  revelar aparece el marco. Lo comprobé con movimiento completo.
- Los prompts «cortados» en escritorio: se desplazan por dentro (hallazgo 11).
- La encuesta en móvil «sin la 5.ª opción»: la opción existe, dentro de un panel que se desplaza
  por dentro (hallazgo 12).
- El guion vacío en los 40 slides: es a propósito, y es otro encargo.

## Cómo se comprobó

- **Recorrido:** `node recorrido-avanzado.mjs http://localhost:5174 D:/curso_IA/docs/revision/capturas-avanzado`
  → «Sin problemas.» El recorrido corrió contra el checkout principal y reescribió allí 142
  capturas versionadas de `docs/revision/capturas-avanzado/`, que quedaron sin commit. La
  carpeta todavía mezcla capturas viejas numeradas para 44 slides; por ejemplo,
  `21-v1-3-10-escritorio-fin.png` muestra «21/44».
- **Pruebas:** `node --test src/components/avanzado/*.test.js` → 17 de 17.
- **ESLint:** `npx eslint src` **no pasa**: 51 problemas (46 errores y 5 avisos). Según
  `git blame`, todos son de enero de 2026 (`8c2133f`, `3303997`, `fd42d64`) y están en archivos
  del básico; ninguno sale de esta rama. `npx eslint src/components/avanzado src/data/avanzado`
  → 0 errores. El criterio «eslint src pasa» del encargo no se puede cumplir sin tocar el
  básico.
- **Animaciones con movimiento completo:** un script aparte
  (`D:\tmp\pw-curso\animaciones-dia1.mjs`) capturó, en escritorio y en móvil, `v1-2-4a` a los
  0,3, 2,5 y 6,5 segundos y al revelar, y `v1-7-2` a los 0,3, 3 y 7,5 segundos.
- **Datos:** dos verificadores con web (sonnet) abrieron las fuentes primarias. Del Código Civil
  (arts. 2414 y 2415), la LOPDP (arts. 4, 26, 34, 47 y 60.2) y la Resolución 0004-R (arts. 23
  y 59) extrajeron el texto de los PDF oficiales. Otras fuentes: `platform.claude.com/docs`
  (555 000 palabras, ventanas de contexto, ZDR y Mythos 5.1), `docs.aws.amazon.com` (en
  Bedrock sa-east-1 solo hay enrutamiento global) y `artificialanalysis.ai/evaluations/omniscience`.
- **Capturas:** un revisor (opus) miró las 133 capturas de hoy. Los hallazgos 11, 12, 13 y 14
  los verifiqué a mano, en el código y con mediciones en el navegador.
