# Guion — Video 2: Tokens

Serie básica, video educativo con narración. 16:9, 1920×1080. Duración: **117 s**.
Plan de la serie: `docs/plans/2026-09-26-serie-videos-basicos.md`.

## Pregunta espejo

- **Abre:** «¿La IA lee palabras?»
- **Cierra:** «¿La IA lee palabras?» → «No. Lee tokens.▌»

Estado: **aprobada por José Luis (2026-09-26).**

## Contador de tokens (ancla fija)

Esquina inferior izquierda, grande, como el año en el video de referencia. Cuenta los tokens de
la narración ya dicha y sube al ritmo de la voz. La columna «Contador» de la tabla da el valor al
terminar cada escena. En la escena 8 la narración lo nombra en voz alta.

## Escenas

| N.º | Segundos | Narración | En pantalla | Contador |
|---|---|---|---|---|
| 1 | 0–8 (8) | [curious] ¿La inteligencia artificial lee palabras, como las lees tú? Mira lo que pasa cuando le escribes algo. | Fondo oscuro. «¿La IA lee palabras?» se escribe letra por letra con cursor ▌. Contador en 0 y empieza a subir con la voz. | 22 |
| 2 | 8–22 (14) | Escribes: «El gato duerme». Tú ves tres palabras. Pero la IA, antes de hacer cualquier cosa, corta el texto en pedazos. Cada pedazo se llama token. Aquí hay cinco. | Una caja de chat; se escribe «El gato duerme.». Debajo, «3 palabras». Una línea de corte recorre la frase y la separa en bloques de colores: `El` · `gato` · `duer` · `me` · `.`. Aparece la etiqueta «token» sobre un bloque y «5 tokens» debajo. Pausa de 1 s en el corte. | 64 |
| 3 | 22–34 (12) | «Gato» es una palabra común, así que queda entera: un solo token. «Duerme» se parte en dos. Y hasta el punto final cuenta como un token. | Los mismos cinco bloques. Se ilumina `gato` (1). Luego `duer` + `me` se juntan y se vuelven a separar (2). Al final, el `.` rebota solo (1). | 103 |
| 4 | 34–48 (14) | Mientras más rara o más larga la palabra, más pedazos. «Otorrinolaringólogo» [laughs] se corta en cinco. Y esta frase, «Mi ñaño vive en Guayaquil», tiene cinco palabras… pero diez tokens. | «otorrinolaringólogo» entra de un lado y se corta en `ot` · `orr` · `inol` · `aring` · `ólogo` (pausa de 1 s). Después, «Mi ñaño vive en Guayaquil.» con dos contadores lado a lado: «5 palabras» y «10 tokens». Se corta en `Mi` · `ñ` · `a` · `ño` · `vive` · `en` · `Gu` · `aya` · `quil` · `.`. | 151 |
| 5 | 48–65 (17) | ¿Y para qué cortar? Porque la IA no trabaja con letras: trabaja con números. Cada token tiene su propio número, como una ficha con código. Lo que de verdad le llega a la IA es una fila de números. | Vuelven los bloques de «El gato duerme.». Cada uno gira como una ficha y muestra su número: `El` 4422 · `gato` 99767 · `duer` 116318 · `me` 1047 · `.` 13. Las letras se desvanecen; queda solo la fila: 4422 99767 116318 1047 13. | 197 |
| 6 | 65–81 (16) | Esto importa por dos razones. Primero, el límite: la IA solo puede tener presente cierta cantidad de tokens a la vez. Segundo, el costo: quien usa la IA a gran escala paga por token, no por palabra. | Pantalla partida en dos. Izquierda, «Límite»: una caja que se llena de bloques hasta el borde; los que sobran quedan afuera. Derecha, «Costo»: los bloques caen en una balanza o caja registradora y cada uno suma una moneda. | 242 |
| 7 | 81–91 (10) | Un detalle más: cada modelo corta a su manera. ChatGPT, Claude y Gemini no parten igual la misma frase. Pero todos cortan. | La misma frase en tres filas, cada una cortada en lugares distintos (cortes ilustrativos, sin nombres de marca ni logos: «Modelo A / B / C»). En «Pero todos cortan», las tres líneas de corte bajan a la vez. | 271 |
| 8 | 91–109 (18) | Este mismo video sirve de ejemplo. [whispers] Mira el contador de la esquina: cuenta los tokens de todo lo que has escuchado. Hasta aquí van ciento noventa y nueve palabras… y doscientos setenta y un tokens. En español, casi siempre hay más tokens que palabras. | La cámara se acerca al contador de la esquina, que crece al centro. Junto a él aparece «199 palabras» y el contador se congela en **271**. Luego vuelve a su esquina y sigue contando. | 327 |
| 9 | 109–117 (8) | Entonces, ¿la IA lee palabras? [confident] No. Lee tokens: pedazos de palabras convertidos en números. | Mismo encuadre que la escena 1. «¿La IA lee palabras?» se borra y se escribe «No. Lee tokens.▌». El cursor parpadea dos veces y el contador se detiene en 349. Corte a negro. | 349 |

**Suma:** 8 + 14 + 12 + 14 + 17 + 16 + 10 + 18 + 8 = **117 s**.

## Palabras y duración

- **Narración:** 257 palabras.
- A 150 palabras por minuto son **102 s de voz**. Los 15 s restantes son pausas previstas: cortes
  en pantalla (escenas 2 y 4), el giro de las fichas (5), el contador congelado (8) y el cierre
  con cursor (9).
- Ritmo efectivo: 255 palabras en 117 s ≈ 131 palabras por minuto. Si ElevenLabs sale más rápido,
  se estiran las pausas, no se agrega texto.

## Cómo se midió

- **Cortes y números de token:** tokenizador `o200k_base` (el de GPT-4o) con `tiktoken`. Claude y
  Gemini usan otros tokenizadores y cortarían distinto; por eso la escena 7 lo dice.
- **Contador:** tokens de la narración tal como está escrita arriba, con el mismo tokenizador y
  **sin las etiquetas entre corchetes**, que no se dicen en voz alta. Si se cambia una sola
  palabra de la narración, hay que volver a medir.
- **Palabras:** secuencias de letras; «…», la puntuación y las etiquetas no cuentan.
- **Lo que dice la escena 8:** «hasta aquí» es el final de la escena 7: 199 palabras y 271
  tokens. La primera versión decía «doscientas trece palabras», que no salía con esta regla; se
  corrigió y se regrabó solo la escena 8 (José Luis, 2026-09-26). «Ciento noventa y nueve» y
  «doscientas trece» ocupan los mismos tokens, así que el contador no cambió.

```python
import tiktoken, re
enc = tiktoken.get_encoding("o200k_base")
# escenas = [texto de la escena 1, texto de la escena 2, ...]
acum = 0
for i, e in enumerate(escenas, 1):
    acum += len(enc.encode(e if i == 1 else " " + e))
    print(i, len(re.findall(r"[\wáéíóúñü]+", e)), "palabras", acum, "tokens acumulados")
```

## Voz para ElevenLabs

**Modelo:** Eleven v3, que interpreta etiquetas de emoción entre corchetes.

**Voz elegida: Horacio (Colombia)** (José Luis, 2026-09-26). Probada en v3 con las escenas 4 y
8: pronuncia bien «ñaño» y maneja bien las etiquetas. Quedó descartado Mauricio (México), que
también pronunciaba bien.

**Etiquetas usadas:** `[curious]` (1), `[laughs]` (4), `[whispers]` (8) y `[confident]` (9).
Son pocas a propósito: el video se proyecta en clase y demasiadas suenan a actuación. Cada voz
reacciona distinto a las etiquetas, así que el desempate sale de escucharlas.
