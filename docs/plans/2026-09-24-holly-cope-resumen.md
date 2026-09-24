# Fuente: Holly Cope, «Reducing AI Hallucinations in Legal Work»

- Video: https://www.youtube.com/watch?v=Q-nA44oxXp0. Publicado el 24 jun 2026; dura 34:10.
- Autora: Holly Cope, exabogada inglesa. Tiene el podcast «More than a Lawyer» y hace
  auditorías y capacitación en IA para equipos legales.
- Transcripción completa (privada, fuera de git):
  `Claude outputs/fuentes/holly-cope-transcripcion.txt`.
- Uso en el curso: base del tutorial «Cómo evitar que la IA alucine» de la Virtual 1,
  **adaptado a Ecuador y con crédito a la autora**. Pasar un fragmento del video requiere su
  permiso (pendiente de José Luis).

Resumen en palabras propias, con los minutos del video.

## Por qué alucina (02:09–06:12)

- Una encuesta de ella a unos 200 abogados: lo que más les cuesta de la IA son las
  alucinaciones, porque no saben cuándo confiar.
- El modelo está hecho para responder siempre. Cita una publicación de OpenAI: si no sabe una
  fecha de cumpleaños y adivina, acierta 1 de cada 365 veces; si dice «no sé», saca cero
  puntos. Por eso adivina. **Hay que verificar esa publicación en la fase de investigación.**
- Siempre habrá un margen de error, así que siempre hace falta un humano que revise. Las
  herramientas jurídicas especializadas alucinan menos, pero igual alucinan.

## Tipos de alucinación (07:06–08:45)

Fuentes inventadas (casos que no existen), falta de contexto, falsa certeza, análisis
incompleto (pides 4 casos y da 3 o 10), malinterpretar la pregunta y distorsionar la
información.

## Cuatro formas de reducirlas (10:06–11:49)

1. Darle permiso para no saber: «si no sabes, dímelo» o «hazme preguntas primero».
2. Escrutar los hechos: pedir enlaces y que muestre de dónde sacó cada cosa.
3. Bajar el costo de adivinar dándole el material: documentos, PDF, sitios oficiales, y pedir
   que use solo esas fuentes.
4. Cambiar la mentalidad: aceptar que no será 100 % correcta y tener un sistema de revisión.

## Marco de confianza (11:50–15:52)

Trata cada respuesta como el trabajo de un abogado junior muy bueno que todavía no llega.

1. **Consecuencias:** ¿qué tan grave es si alucina? Riesgo alto (una sentencia o un escrito)
   frente a riesgo bajo (un correo).
2. **Revisar la evidencia:** dale las fuentes y pídele de dónde sale cada afirmación.
3. **Qué falta:** vacíos, puntos ciegos, supuestos que hizo. Pregúntale directamente qué
   supuso.
4. **Separar confianza de exactitud:** que suene seguro no significa que sea correcto.
5. **El humano verifica** al final, siempre.

## Demo: malo, mejor y aún mejor (16:00–32:04)

El ejemplo es de derecho laboral del Reino Unido (despido injustificado).

- **Malo:** «Resume la ley sobre despido injustificado y dame la jurisprudencia principal».
  No tiene jurisdicción, fechas ni fuentes. Resultado: asumió Inglaterra y Gales y dio casos
  con enlaces que habría que revisar uno por uno.
- **Mejor:** usar solo el material entregado (tres sitios confiables). Si no alcanza, decirlo
  explícitamente. No usar conocimiento general. Identificar los supuestos. Separar lo que
  viene de la fuente de las observaciones propias. Resultado: declaró sus supuestos y dijo
  que no daba jurisprudencia porque las fuentes no la tenían, en vez de inventarla.
- **Aún mejor:** lo anterior, y además, para cada punto: la fuente con su enlace, el nivel de
  confianza, lo que no está claro o falta, los supuestos, y una frase fija si no hay base:
  «la información proporcionada es insuficiente para determinarlo». Resultado: cada punto
  con su confianza (alta o baja) y los vacíos señalados, que ella usa para darle la fuente que
  faltaba.
- Truco extra: decirle de antemano qué contiene cada fuente, para que no diga que «no
  estaba».

## Ideas para cerrar (32:04–34:05)

- **La idea central:** no le pidas a la IA que acierte; pídele que sea transparente sobre su
  incertidumbre.
- Otro prompt malo: «¿Es exigible esta cláusula?», sin contexto.
- Escribe reglas fijas para la IA (si no sabes, dilo; califica tu confianza; declara
  supuestos) y ponlas en un asistente o proyecto para no repetirlas en cada consulta. Esto
  conecta con el Proyecto «Mi despacho» de la Virtual 1.

## Cómo adaptarlo en el curso

- Mismo recorrido (malo, mejor, aún mejor) con un caso ecuatoriano: una cláusula de un
  contrato de arrendamiento o una pregunta sobre el Código Civil.
- Fuentes oficiales ecuatorianas en lugar de las del Reino Unido: Registro Oficial, Corte
  Nacional de Justicia, Corte Constitucional y el texto de la ley vigente cargado como archivo.
- Las reglas del prompt «aún mejor» pasan a las instrucciones permanentes del Proyecto
  «Mi despacho».
- El marco de confianza se integra al checklist de verificación, que ya pide la cita exacta y
  el contraste con la fuente oficial.
