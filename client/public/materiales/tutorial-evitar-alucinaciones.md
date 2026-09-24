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
