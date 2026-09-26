# Serie de videos básicos — plan

Fecha: 2026-09-26. Estado: borrador, falta que José Luis lo apruebe.

## Decisiones tomadas

- **Herramienta:** HyperFrames (HTML + GSAP, todo hecho con código). Sin imágenes generadas.
  ChatGPT Image solo si una escena concreta lo pide más adelante.
- **Voz:** ElevenLabs, solo para los videos educativos. Horacio (Colombia) para toda la serie,
  con el modelo Eleven v3 y etiquetas entre corchetes (`[laughs]`, `[whispers]`…).
- **Formato:** horizontal 16:9 (1920×1080), pensado para proyectar en clase.
- **Paleta:** la de las diapositivas del curso. No se decide antes: los planes describen la
  intención del color por escena y en producción se toman los valores de las diapositivas
  (José Luis, 2026-09-26).
- **Referencia de estilo:** video de BridgeMind sobre la historia de la IA
  (https://x.com/bridgemindai/status/2103530750767206626). Dura 60 s, no tiene narración y abre y
  cierra con la misma pregunta («Can machines think?» / «Let me think.▌»). Cada época tiene su
  propio estilo visual, y el año aparece siempre fijo, en grande, abajo a la izquierda.

## Dos tipos de video

| Tipo | Narración | Duración | Uso |
|---|---|---|---|
| Apertura | No, solo música y texto | ~60 s | Historia de la IA; abre el curso |
| Educativo | Sí, ElevenLabs | 90–150 s | Un concepto por video |

## Recursos que se repiten en toda la serie

- **Pregunta espejo:** cada video abre con una pregunta y la repite al final, ya con la respuesta.
- **Ancla fija:** un contador de tokens en la esquina, que funciona como el año del video de
  referencia.
- **Misma tipografía y la misma paleta base** en todos los videos. Cada video puede tener su propio
  mundo visual dentro de eso.

## Lista de videos (orden tentativo)

0. Historia de la IA — sin narración
1. ¿Qué es un modelo? — cómo se entrena
2. Tokens — cómo la IA parte el texto
3. Cómo responde el chat — de token en token
4. Atención — a qué le presta atención el modelo
5. Contexto — qué recuerda en una conversación
6. Context rot — por qué se degrada una conversación larga
7. Consejo práctico — proyectos en vez de subir PDFs completos

## Pendiente de decidir

- Dónde viven los videos: dentro de las diapositivas del curso o sueltos.

## Siguiente sesión

Guion con narración del video 2 (Tokens): texto de la voz, escenas y la pregunta espejo.
