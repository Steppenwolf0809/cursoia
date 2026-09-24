# Virtual 1 · investigación (fase 1)

Fecha: 24 sep 2026. Cada dato lleva su URL. Lo marcado **NO VERIFICADO** no pasa a los slides.
Resumen del curso AI Fluency (4D, licencia CC BY-NC-SA): `2026-09-24-ai-fluency-resumen.md`.

Contenido:
- Parte B: Mata v. Avianca, otros casos, tutorial de alucinaciones (OpenAI, Anthropic, fuentes ecuatorianas, demo con el art. 2415 del Código Civil).
- Parte C: LOPDP, Resolución SPDP 0004-R, niveles de protección de datos, propuesta de semáforo.
- Parte D: estado de Claude, ChatGPT y Gemini; dónde se configuran las instrucciones permanentes; guía oficial contra la adulación.

## Nota del controlador: precios de ChatGPT vistos en el navegador

- 24 sep 2026, https://chatgpt.com/pricing , visto desde Ecuador: Free $0, Go $6, Plus $20, Pro «desde» $100 al mes. Plus incluye Proyectos. La tabla dice «Content is used to train our models: Opt-out available» para los planes individuales. El precio de Go puede variar por país.


---

# Investigación parte B — casos de alucinaciones de IA y tutorial de verificación

Fuente base: `D:\curso_IA\docs\plans\2026-09-24-holly-cope-resumen.md`. Todo dato lleva su URL;
lo no confirmado en fuente primaria queda marcado **NO VERIFICADO**.

## A. Mata v. Avianca, Inc. (S.D.N.Y., 2023)

- **Caso:** Roberto Mata v. Avianca, Inc., expediente 1:22-cv-01461 (PKC), Corte de Distrito de
  EE. UU. para el Distrito Sur de Nueva York.
- **Juez:** P. Kevin Castel.
- **Abogados sancionados y firma:** Steven A. Schwartz y Peter LoDuca, de la firma **Levidow,
  Levidow & Oberman, P.C.** La firma quedó sancionada solidariamente por las infracciones de
  ambos abogados a la Regla 11(b)(2).
- **Citas falsas:** el escrito de oposición a la moción de desestimación de Avianca citó **seis
  resoluciones judiciales totalmente inventadas** por ChatGPT, con citas y fragmentos de
  sentencias inexistentes. Ejemplos de nombres de casos inventados: *Varghese v. China Southern
  Airlines*, *Shaboon v. Egyptair*, *Petersen v. Iran Air*, *Martinez v. Delta Air Lines*,
  *Estate of Durden v. KLM Royal Dutch Airlines* y *Miller v. United Airlines*.
- **Fecha de la orden de sanción:** 22 de junio de 2023 («Opinion and Order on Sanctions»).
- **Monto y otras medidas:** multa de **5.000 USD**, impuesta solidariamente a Schwartz, LoDuca
  y la firma, a depositarse en la Corte dentro de 14 días. Además, el juez ordenó enviar cartas
  —junto con la orden de sanciones, la transcripción de la audiencia y la declaración jurada— al
  cliente Roberto Mata y a **cada uno de los jueces que aparecían falsamente como autores** de
  las seis resoluciones inventadas.
- **Fuentes primarias:** opinión completa en CourtListener
  (https://www.courtlistener.com/opinion/9885417/mata-v-avianca-inc/) y en FindLaw
  (https://caselaw.findlaw.com/court/us-dis-crt-sd-new-yor/2335142.html). El PDF directo del
  tribunal devolvió error 403 al intentar leerlo (bloqueo de acceso automatizado); los datos de
  arriba están cruzados entre CourtListener, FindLaw y varias notas de prensa especializada.
- **Prensa complementaria:** Infobae
  (https://www.infobae.com/estados-unidos/2023/06/24/dos-abogados-fueron-multados-tras-presentar-un-escrito-judicial-con-informacion-falsa-realizado-por-chatgpt/),
  Reason/Volokh Conspiracy
  (https://reason.com/volokh/2023/06/22/sanctions-issued-in-case-where-lawyers-cited-chatgpt-hallucinated-precedents/),
  Wikipedia (https://en.wikipedia.org/wiki/Mata_v._Avianca,_Inc.).

## B. Otros casos de citas inventadas por IA

**Base de datos de Damien Charlotin:** «AI Hallucination Cases Database»,
https://www.damiencharlotin.com/hallucinations/. Registra **2.077 casos** a la fecha de consulta
(24 sep 2026); el propio sitio dice actualizarse a diario, así que la cifra sube. Según los
filtros por país mostrados en la página al momento de la consulta: Brasil 41 casos, Argentina 8,
Colombia 3, Chile 3, Costa Rica 1 (estos subtotales pueden variar día a día).

Casos relevantes, priorizando América Latina:

1. **Colombia — sanción a un abogado.** Corte Suprema de Justicia, Sala de Casación Civil, Auto
   **AC739-2026** (13 feb 2026): multó con 15 salarios mínimos (~26 millones de pesos, ~6.000
   USD) a un abogado por incluir **diez citas jurisprudenciales inexistentes** generadas con IA
   en un recurso de revisión, sin verificarlas. Es la primera sanción de esa Corte por este
   motivo. Fuente: Infobae
   (https://www.infobae.com/colombia/2026/02/16/la-corte-suprema-sanciona-por-primera-vez-a-un-abogado-por-uso-indebido-de-inteligencia-artificial-en-proceso-judicial/),
   El Universal
   (https://www.eluniversal.com.co/colombia/2026/02/16/abogado-colombiano-recibe-multa-por-usar-ia-y-citar-sentencia-inexistente/).

2. **Colombia — anulación de un fallo.** Corte Suprema de Justicia, Sala de Casación Civil,
   sentencia **STC17832-2025** (5 nov 2025): anuló una decisión del Tribunal Superior de
   Sincelejo que había citado apartes de las sentencias STC13560-2023 y STC4734-2025, los cuales,
   al verificarlos, resultaron **inexistentes**. Primera vez que esa Corte anula un fallo por este
   motivo. Fuente: El Colombiano
   (https://www.elcolombiano.com/colombia/corte-suprema-anulo-fallo-citas-inexistentes-KN30866095),
   Infobae
   (https://www.infobae.com/colombia/2025/11/12/historico-fallo-de-la-corte-suprema-sobre-el-uso-de-la-ia-en-colombia-por-primera-vez-anulo-una-decision-judicial-apoyada-en-citas-falsas/).

3. **Argentina — reprensión sin multa.** Cámara de Apelaciones en lo Civil y Comercial de
   Rosario, Sala II (voto del Dr. Oscar Puccinelli), caso «G.C.A. c/ M.F.D.», 21 ago 2025:
   detectó que un escrito citaba fallos inexistentes generados con ChatGPT. El abogado reconoció
   no haber verificado las citas. El tribunal no impuso multa, pero lo reprendió y envió oficio
   al Colegio de Abogados advirtiendo sobre el riesgo. Fuente: Infobae
   (https://www.infobae.com/judiciales/2025/08/23/la-camara-civil-de-rosario-reprendio-a-un-abogado-por-usar-inteligencia-artificial-y-volcar-informacion-falsa-en-un-escrito/).

4. **Chile — suspensión y multa.** Corte Suprema, Tercera Sala, resolución del 22 abr 2026
   (conocida públicamente en junio 2026): suspendió por un mes del ejercicio profesional y multó
   con 5 UTM (~357.530 CLP) a una abogada por citar **doctrina inexistente** generada con IA en
   un recurso de casación, invocando los artículos 531 y 542 del Código Orgánico de Tribunales.
   Fuente: La Tercera
   (https://www.latercera.com/nacional/noticia/uso-de-ia-suprema-multa-por-casi-400-mil-y-suspende-por-un-mes-a-abogada-que-cito-doctrina-que-no-existe/),
   Diario Constitucional
   (https://www.diarioconstitucional.cl/2026/06/04/corte-suprema-suspende-a-abogada-y-la-multa-por-citar-doctrina-inexistente-en-recurso-de-casacion/).

**Ecuador:** no se encontró ningún caso confirmado, ni en la base de Charlotin ni en prensa
ecuatoriana. El único resultado relacionado es un artículo de opinión en Derecho Ecuador
(https://derechoecuador.com/justicia-objeta-inteligencia-artificial/) que **comenta el caso
argentino de Rosario**, sin describir ningún caso propio de Ecuador. Se verificó esto leyendo el
artículo directamente. **No hay caso ecuatoriano confirmado hasta la fecha de esta investigación
(24 sep 2026).**

## C. Tutorial «Cómo evitar que la IA alucine»

### 1. El dato de OpenAI que cita Holly Cope

Publicación: paper **«Why Language Models Hallucinate»** de Adam Tauman Kalai, Ofir Nachum,
Santosh S. Vempala y Edwin Zhang (OpenAI y colaboradores), publicado el 4 de septiembre de 2025
en arXiv (https://arxiv.org/abs/2509.04664) y anunciado en el blog de OpenAI
(https://openai.com/index/why-language-models-hallucinate/; esta URL del blog no se pudo leer
directamente por bloqueo de acceso automatizado — error 403 —, pero el texto del paper en arXiv
sí se confirmó).

Resumen en palabras propias: el paper compara evaluar a un modelo de lenguaje con calificar un
examen de opción múltiple con puntaje binario (1 si acierta, 0 en cualquier otro caso, incluido
«no sé»). Si al modelo le preguntan el cumpleaños de alguien y no lo sabe, adivinar una fecha al
azar le da 1 probabilidad entre 365 de acertar (frente a 364 de fallar); decir «no sé» (IDK) da
**cero puntos siempre**, igual que fallar. Los propios autores lo dicen así: *«IDK-type responses
are maximally penalized while an overconfident 'best guess' is optimal»*, y *«Under binary
grading, abstaining is strictly sub-optimal»*. La conclusión del paper es que los modelos
alucinan porque el entrenamiento y, sobre todo, **los criterios de evaluación (benchmarks)**
premian sistemáticamente adivinar con aplomo por sobre reconocer incertidumbre — el modelo
aprende a comportarse como un estudiante que prefiere arriesgar una respuesta en un examen antes
que dejarla en blanco, porque así saca mejor nota en promedio.

### 2. Guía oficial de Anthropic «Reduce hallucinations»

URL: https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
(redirige a https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations,
donde se leyó el contenido completo).

Técnicas básicas:
- **Allow Claude to say "I don't know"** — darle permiso explícito para admitir incertidumbre;
  la guía dice que esto por sí solo reduce mucho la información falsa.
- **Use direct quotes for factual grounding** — en documentos largos (más de 20 000 tokens),
  pedirle que extraiga citas textuales exactas antes de hacer la tarea, para anclar la respuesta
  al texto real.
- **Verify with citations** — que cite la fuente de cada afirmación y, si no encuentra una cita
  de respaldo, que retracte esa afirmación.

Técnicas avanzadas:
- **Chain-of-thought verification** — pedirle que explique su razonamiento paso a paso antes de
  la respuesta final, para exponer fallas lógicas o supuestos.
- **Best-of-N verification** — correr el mismo prompt varias veces y comparar las respuestas;
  las inconsistencias entre ellas pueden delatar una alucinación.
- **Iterative refinement** — usar la respuesta como entrada de un siguiente prompt que le pida
  verificar o ampliar lo dicho antes.
- **External knowledge restriction** — instruirle explícitamente que use solo la información de
  los documentos entregados y no su conocimiento general.

### 3. Fuentes oficiales ecuatorianas para verificar

- **Registro Oficial:** https://www.registroficial.gob.ec/ — confirmado por lectura directa de
  la página; publica la normativa vigente del Estado, decisiones de la Corte Constitucional y de
  la Corte Nacional de Justicia.
- **Corte Nacional de Justicia** — sitio institucional: https://www.cortenacional.gob.ec/cnj/ ;
  buscador de sentencias de casación y revisión: https://busquedasentencias.cortenacional.gob.ec/
  (confirmado que responde y se identifica como «Buscador» de la Corte Nacional). La jurisprudencia
  obligatoria por **triple reiteración** es una de las funciones descritas en el sitio
  institucional: cuando las salas especializadas reiteran tres veces el mismo criterio sobre un
  punto de derecho, el caso pasa al Pleno; si el Pleno no resuelve en 60 días o ratifica el
  criterio, este se vuelve jurisprudencia obligatoria.
- **Corte Constitucional del Ecuador:** https://www.corteconstitucional.gob.ec/ (confirmado por
  lectura directa) — tiene una sección «Buscadores» con buscadores jurisdiccionales, en
  https://buscador.corteconstitucional.gob.ec/ y https://portal.corteconstitucional.gob.ec/BuscadorSeleccion.aspx.

### 4. Caso ecuatoriano para la demo «malo → mejor → aún mejor»

Caso propuesto: **plazo de prescripción extintiva de una deuda**, un tema del día a día para
cualquier abogado o notario ecuatoriano. Fuentes secundarias coinciden en que el artículo 2415
del Código Civil ecuatoriano fija 5 años para las acciones ejecutivas y 10 años para las
ordinarias, pero **no pude confirmar el número de artículo ni ese texto contra la codificación
oficial vigente en esta sesión** (el PDF de la Corte Nacional que podía tenerlo dio error 404).
**NO VERIFICADO: número exacto de artículo y plazos del Código Civil sobre prescripción
extintiva — falta contrastarlo con el texto oficial de la codificación vigente (Registro Oficial
o Lexis/SILEC) antes de usarlo en el curso.** Esto es, de hecho, un buen ejemplo dentro del
propio tutorial: es justo el tipo de dato que la IA no debe dar por cierto sin fuente.

**Verificación (24 sep 2026):** fuente oficial:
https://www.presidencia.gob.ec/wp-content/uploads/2024/04/CODIGO_CIVIL.pdf (Código Civil,
Codificación 10, Registro Oficial Suplemento 46 de 24-jun-2005; el propio PDF indica «Estado:
Reformado» y «Fecha de última modificación: 2024-03-13», pero esa nota general se refiere a
sustituciones de terminología procesal por el COGEP, no a cambios de fondo en los artículos
2414/2415).

- **Art. 2414:** la prescripción que extingue acciones y derechos ajenos exige solo que pase
  cierto tiempo sin que esas acciones se hayan ejercido; ese tiempo se cuenta desde que la
  obligación se hizo exigible (no desde la fecha del contrato ni desde el incumplimiento en
  abstracto, sino desde que el acreedor pudo exigir el pago).
- **Art. 2415:** ese plazo es, en general, 5 años para las acciones ejecutivas y 10 años para
  las ordinarias. Además, la acción ejecutiva no desaparece a los 5 años: se convierte en
  ordinaria, y ya convertida dura 5 años más (es decir, en la práctica el acreedor puede
  cobrar hasta por 10 años en total, cambiando de vía).
- **Reformas:** no encontré reforma promulgada de fondo a los arts. 2414 o 2415 en esta
  codificación (no traen nota «(Reformado por...)» en el texto, a diferencia de otros artículos
  del mismo título). Sí hay debate académico reciente (2024-2025) que propone reformar el art.
  2415 para fijar un plazo de prescripción específico para la acción monitoria del COGEP, que
  hoy no está regulado ahí, pero es una propuesta doctrinaria, no una reforma vigente.
- **VERIFICADO.**

Crédito: recorrido adaptado de Holly Cope, «Reducing AI Hallucinations in Legal Work»
(https://www.youtube.com/watch?v=Q-nA44oxXp0), minutos 16:00–32:04 del video (ver
`2026-09-24-holly-cope-resumen.md`).

**Prompt malo:**
```
¿Cuál es el plazo de prescripción de una deuda en Ecuador?
```
(Sin decir si es una acción ejecutiva u ordinaria, sin pedir la fuente, sin fecha de corte. La
IA va a asumir cosas y puede inventar un artículo o una cifra con total seguridad.)

**Prompt mejor:**
```
Eres mi asistente de investigación jurídica en Ecuador. Te adjunto el texto vigente del Código
Civil ecuatoriano [ADJUNTAR ARCHIVO O PEGAR EL TEXTO OFICIAL].

Usa ÚNICAMENTE ese documento, no tu conocimiento general. Dime:
1. ¿Cuál es el plazo de prescripción extintiva de una acción ejecutiva y de una acción
   ordinaria, según el texto que te di?
2. Si el documento no trae esa información completa, dilo explícitamente: no la inventes ni la
   completes con lo que "sueles saber" de otros países o de versiones anteriores de la ley.
3. Señala qué supuestos estás haciendo (por ejemplo, si asumes que la deuda no tiene un plazo
   especial distinto al general).
```

**Prompt aún mejor:**
```
Eres mi asistente de investigación jurídica en Ecuador. Te adjunto el texto vigente del Código
Civil ecuatoriano [ADJUNTAR ARCHIVO O PEGAR EL TEXTO OFICIAL] y el enlace del Registro Oficial
donde se publicó la última reforma relevante: [URL].

Usa ÚNICAMENTE estos documentos, no tu conocimiento general ni supuestos de otras
jurisdicciones. Para cada punto de tu respuesta sobre el plazo de prescripción de una acción
ejecutiva y de una ordinaria, dame:
- La fuente exacta (número de artículo y una cita textual de máximo dos líneas).
- Tu nivel de confianza (alta, media o baja) en que esa cita corresponde al texto vigente.
- Qué no está claro o qué falta en el documento que te di (por ejemplo, excepciones o plazos
  especiales que no puedas confirmar con lo que tienes).
- Los supuestos que hiciste, explícitos.

Si para algún punto el documento no alcanza, responde exactamente: "la información
proporcionada es insuficiente para determinarlo" — no completes el vacío con conocimiento
general ni inventes el artículo o el plazo.
```

Estas reglas del prompt «aún mejor» (permiso para no saber, calificar confianza, declarar
supuestos, frase fija ante falta de fuente) son las que, según el resumen de Holly Cope, conviene
fijar una sola vez en las instrucciones del Proyecto «Mi despacho» en vez de repetirlas en cada
consulta.

---

# Investigación parte C: LOPDP, niveles de protección de datos en IA y semáforo

Investigado el 24 de septiembre de 2026. Todos los datos legales se verificaron contra el texto
oficial de la LOPDP (Registro Oficial Suplemento 459) y contra la documentación oficial de cada
proveedor de IA citada en cada punto. Lo que no se pudo confirmar contra una fuente primaria queda
marcado **NO VERIFICADO**.

## A. LOPDP de Ecuador

### La ley y su reglamento

- **Ley Orgánica de Protección de Datos Personales (LOPDP), Ley 0**, publicada en el **Registro
  Oficial Suplemento 459** del **26 de mayo de 2021**. Entra en vigencia con su publicación
  (Disposición Final). Fuente (texto completo verificado artículo por artículo):
  https://procuraduria.utpl.edu.ec/sitios/documentos/NormativasPublicas/Ley%20de%20Org%C3%A1nica%20de%20Protecci%C3%B3n%20de%20Datos.pdf
- **Vigencia plena del régimen sancionatorio**: la Disposición Transitoria Primera da un plazo de
  adecuación de dos años desde la publicación, es decir, el régimen sancionatorio y las medidas
  correctivas rigen plenamente desde el **26 de mayo de 2023**. La Disposición Transitoria Segunda
  fija el mismo plazo de dos años para adecuar cualquier tratamiento anterior a la ley, y la
  Disposición Transitoria Cuarta da el mismo plazo para adecuar las transferencias internacionales
  ya existentes. (Verificado en el texto oficial, páginas finales.)
- **Reglamento General a la LOPDP**: **Decreto Ejecutivo No. 904**, publicado en el **Registro
  Oficial Suplemento 435** del **13 de noviembre de 2023**.
  https://www.telecomunicaciones.gob.ec/wp-content/uploads/2023/11/Decreto-Ejecutivo-No.-904.pdf

### Artículos clave (resumen en palabras propias, verificado contra el texto oficial)

**Datos sensibles**
- **Art. 4** los define como los relativos a etnia, identidad de género, identidad cultural,
  religión, ideología, filiación política, pasado judicial, condición migratoria, orientación
  sexual, salud, datos biométricos, datos genéticos, y cualquier otro cuyo mal uso pueda causar
  discriminación o afectar derechos fundamentales.
- **Art. 26**: tratarlos está **prohibido por regla general**. Solo se permite si hay
  consentimiento explícito del titular, si es necesario por obligaciones laborales o de seguridad
  social, para proteger intereses vitales cuando el titular no puede consentir, si el titular ya
  los hizo públicos, por orden judicial, con fines de archivo/investigación/estadística (con
  medidas de protección), o si es un dato de salud tratado conforme a la propia ley.

**Deber de confidencialidad**
- No hay un único "artículo de confidencialidad" para todo dato personal: la **confidencialidad es
  uno de los principios generales del tratamiento** (Art. 10, literal g): no comunicar los datos
  para un fin distinto del que motivó su recolección, salvo causal legítima).
- Para **datos de salud** existe un deber de confidencialidad más específico (**Art. 30**): todo
  el que intervenga en el tratamiento debe guardar confidencialidad, la obligación se mantiene
  aunque termine la relación con el responsable o encargado, y es **complementaria del secreto
  profesional**.
- El responsable está obligado a **suscribir contratos de confidencialidad** con el encargado y
  con el personal que trate datos (**Art. 47, numeral 10**).

**Encargado del tratamiento**
- Definido en el **Art. 4** como la persona natural o jurídica que trata datos por cuenta y a
  nombre de un responsable (p. ej., un proveedor de nube o de IA).
- El **Art. 34** exige que la relación con el encargado conste en un **contrato** que le prohíba
  usar los datos para fines distintos o transferirlos a terceros, y que obligue a destruir o
  devolver los datos al terminar el servicio. El encargado responde por las infracciones que
  cometa.
- El **Art. 47** dice que el encargado tiene, en lo aplicable, las mismas obligaciones que el
  responsable (seguridad, evaluación de riesgos, notificación de vulneraciones, etc.), y que el
  responsable debe **elegir un encargado que ofrezca garantías suficientes** — no hacerlo es
  infracción leve (Art. 67, numeral 4).

**Transferencia o comunicación internacional de datos (Capítulo IX, Arts. 55-61)**
- **Art. 56**: por regla general, se puede transferir a países u organizaciones que la SPDP haya
  declarado de **"nivel adecuado de protección"** mediante resolución motivada (válida máximo 4
  años, revisable anualmente).
- **Art. 57**: si el país de destino no tiene nivel adecuado reconocido, se puede transferir con
  **garantías adecuadas** (cláusulas contractuales vinculantes que reconozcan un estándar igual o
  mayor al ecuatoriano y sometan al proveedor a la jurisdicción ecuatoriana).
- **Art. 58**: alternativa de **normas corporativas vinculantes** para grupos empresariales.
- **Art. 59**: para lo no cubierto en los artículos anteriores, se necesita **autorización expresa
  de la SPDP**.
- **Art. 60**: lista **excepciones** que no requieren nivel adecuado ni garantías —la más relevante
  para un despacho es el numeral 2: **consentimiento explícito del titular**, informado
  previamente de los riesgos de la transferencia por la ausencia de nivel adecuado o garantías.
- **Art. 61**: la SPDP debe publicar y mantener actualizada la lista de países/organizaciones con
  nivel adecuado.

**Seguridad de datos personales (Capítulo VI)**
- **Art. 37** es el artículo central: obliga a responsable y encargado a implementar medidas
  técnicas y organizativas según el estado de la técnica, el volumen y la categoría de los datos,
  con evaluación continua de su eficacia.
- **Art. 39**: protección de datos desde el diseño y por defecto.
- **Arts. 40-42**: análisis de riesgo y evaluación de impacto obligatoria en tratamientos de alto
  riesgo (incluye tratamiento a gran escala de categorías especiales de datos).
- **Art. 43**: notificación de vulneraciones a la SPDP en máximo 5 días (el encargado debe avisar
  al responsable en máximo 2 días).
- **Art. 46**: notificación al titular en máximo 3 días cuando la vulneración conlleve riesgo a
  sus derechos.

### Superintendencia de Protección de Datos Personales (SPDP)

- **Superintendente**: **Fabrizio Roberto Peralta Díaz**, designado por el Consejo de Participación
  Ciudadana y Control Social (CPCCS) de una terna enviada por la Presidencia (Art. 77 LOPDP exige
  perfil de Derecho, Sistemas, Comunicación o Tecnologías con 10 años de experiencia; período de 5
  años). **NO VERIFICADO**: la fecha exacta de posesión (una fuente secundaria la sitúa en 2024,
  sin precisión de día). URL oficial de la SPDP: https://spdp.gob.ec/
- Fuente sobre la designación:
  https://en.meythalerzambranoabogados.com/post/appointment-of-the-first-superintendent-of-personal-data-protection
- **Resolución Nº SPDP-SPD-2026-0004-R**, "Norma General de Transferencias o Comunicaciones
  Nacionales e Internacionales de Datos Personales" — **leída completa (47 páginas) en esta
  sesión**. Texto oficial (PDF):
  https://spdp.gob.ec/wp-content/uploads/2026/01/04.01.01-SPSP-SPD-2026-0004-R-Norma-general-de-transferencias-signed.pdf
  - **Fecha de expedición/firma**: Quito, **28 de enero de 2026**, firmada por el Superintendente
    Fabrizio Peralta-Díaz. La Disposición Final dice solo que "esta resolución entrará en vigencia
    a partir de su publicación en el Registro Oficial", sin consignar el número ni la fecha de esa
    publicación. **Sigue NO VERIFICADO** ese dato puntual (número/fecha del Registro Oficial),
    aunque la fecha de expedición ya está confirmada.
  - **Lista de países con nivel adecuado**: la resolución **no declara a ningún país —tampoco a
    Estados Unidos— con nivel adecuado**; solo crea el procedimiento para hacerlo en el futuro
    (Arts. 11-17: solicitud o inicio de oficio, informe técnico, resolución motivada, vigencia
    máxima de 4 años, revisión anual, publicación en el Registro Oficial y en el Registro Nacional
    de Protección de Datos). El único reconocimiento automático que otorga es para los países de
    la **Comunidad Andina** (Bolivia, Colombia, Perú), por mandato de la Decisión 897 de la CAN
    (Art. 59). Estados Unidos no aparece mencionado en ningún artículo del texto.
  - **Qué exige para transferir datos a un proveedor en EE. UU.**: la resolución trae un matiz
    importante que corrige lo que se decía más abajo en este documento sobre "toda subida de datos
    es una transferencia". El **Art. 23**, en concordancia con el **Art. 34 de la LOPDP**,
    establece que **el encargo de tratamiento no constituye transferencia ni comunicación de datos
    personales** —por eso Ecuador no reconoce las cláusulas contractuales tipo responsable-a-
    encargado de la Red Iberoamericana de Protección de Datos (RIPD)—. Hay entonces dos escenarios:
    1. **Si el proveedor de IA actúa solo como encargado** (procesa los datos del cliente por
       cuenta y orden del abogado, sin usarlos para fines propios como entrenar modelos): no es
       jurídicamente una "transferencia internacional" bajo el Capítulo IX de la LOPDP ni bajo esta
       resolución. Lo que exige la ley es el **Art. 34 y el Art. 47 de la LOPDP**: contrato que
       obligue al encargado a tratar los datos solo según instrucciones, no usarlos para otros
       fines, no comunicarlos a terceros, y destruir o devolver los datos al terminar el servicio;
       más las medidas de seguridad, el análisis de riesgo y la documentación de respaldo que exige
       conservar el **Art. 4** de esta resolución (mínimo 3 años).
    2. **Si el envío se considerara una transferencia propiamente dicha** (p. ej., si el proveedor
       usa los datos para fines propios), sin nivel adecuado reconocido para EE. UU., se necesita
       una de tres vías: (a) **garantías adecuadas** (Arts. 20-27): cláusulas contractuales tipo
       responsable-a-responsable —la SPDP reconoce como propias las de la RIPD, en el Anexo 1 de
       la resolución, que exigen someterse expresamente a la jurisdicción ecuatoriana (Art.
       21.6)—, o normas corporativas vinculantes, o un código de conducta o certificación
       aprobados por la SPDP; (b) **autorización excepcional de la SPDP** (Arts. 49-58): solicitud
       con justificación legal y técnica, análisis de riesgos y evaluación de impacto obligatorios,
       descripción de medidas de seguridad, copia del contrato, constancia de haber pedido
       consentimiento informado al titular sobre los riesgos, y explicación motivada de por qué no
       cabe la vía de nivel adecuado o garantías; la autorización dura **máximo un (1) año** y
       nunca es indefinida; o (c) la **excepción de consentimiento explícito e informado del
       titular** sobre los riesgos de la transferencia (Art. 60.2 LOPDP, recogida en el Art. 7 de
       la resolución).
    - **Notificación a la SPDP**: solo es obligatoria si se usa la autorización excepcional
      (solicitud previa) o para el reporte agregado anual de transferencias con nivel adecuado o
      garantías (Art. 64.3); toda transferencia bajo autorización excepcional debe además
      inscribirse individualmente con un mínimo de 10 días de anticipación (Art. 64.2).
  - Resumen periodístico adicional (no usado ya como fuente principal, el texto oficial primó):
    https://nmslaw.com.ec/blog/2026/02/02/spdp-transferencias-comunicaciones-datos-personales-ecuador-internacionales/
- **Resolución Nº SPDP-SPD-2026-0009-R** (12 de febrero de 2026, publicada el 19 de febrero),
  "Norma General de Protección de Datos Personales en el Uso de Inteligencia Artificial": exige
  transparencia sobre tratamientos automatizados, evaluación de impacto, medidas de seguridad,
  registro en el RAT, auditoría de los sistemas de IA y garantiza el derecho a no ser objeto de
  decisiones basadas únicamente en valoraciones automatizadas. Fuente:
  https://www.lexis.com.ec/noticias/superintendencia-de-proteccion-de-datos-personales-expide-norma-general-para-la-proteccion-de-datos-personales-en-el-uso-de-inteligencia-artificial

### Qué implica pegar datos de un cliente en Claude o ChatGPT

**Lo que dice la ley** (verificado contra el texto, incluida la Resolución SPDP-SPD-2026-0004-R
leída completa — ver detalle arriba):
- El proveedor de IA actúa, frente a esos datos, como **encargado del tratamiento** (Art. 4, 34,
  47 LOPDP): el abogado o notario sigue siendo el **responsable**.
- Si el proveedor solo procesa los datos por cuenta del abogado (sin usarlos para fines propios),
  el **Art. 34 LOPDP y el Art. 23 de la Resolución 0004-R** dicen que eso **no es una
  "transferencia internacional"**, sino un encargo de tratamiento: se rige por el Art. 34/47 LOPDP
  (contrato, seguridad, destrucción de datos al terminar), no por el Capítulo IX.
- Si, en cambio, el proveedor usa esos datos para fines propios (p. ej., para entrenar modelos,
  como ocurre por defecto en los planes de consumo salvo que se desactive esa opción), sí es una
  transferencia internacional propiamente dicha. Como Estados Unidos no tiene nivel adecuado
  reconocido por la SPDP (la resolución no declara a ningún país todavía), la vía legal más
  accesible para un despacho pequeño es la excepción de **consentimiento explícito e informado del
  cliente sobre el riesgo** (Art. 60.2 LOPDP); las garantías adecuadas contractuales o la
  autorización excepcional de la SPDP exigen trámites que normalmente exceden lo que un despacho
  pequeño puede negociar por su cuenta con Anthropic u OpenAI.

**Mi interpretación** (no es texto de la ley):
- Para un despacho pequeño, en la práctica esto significa que subir datos de un cliente sin su
  consentimiento informado específico —incluso a un plan pagado que no entrena— es una
  transferencia internacional sin base de licitud clara bajo la LOPDP.
- El secreto profesional del abogado (deber ético y, según el caso, penal) es independiente de la
  LOPDP: divulgar información de un cliente a un tercero (el proveedor de IA) sin autorización
  puede ser, a la vez, una transferencia irregular de datos y una falta al secreto profesional.
- La combinación más defendible hoy para un despacho pequeño es: seudonimizar antes de subir
  cualquier dato identificable, o pedir consentimiento informado explícito citando el Art. 60.2
  cuando la seudonimización no sea posible.
- Ya verificado (leyendo el texto completo de la resolución): la SPDP **no** ha declarado nivel
  adecuado ni no-adecuación para ningún país, y la plantilla oficial de cláusulas contractuales
  tipo que reconoce (responsable-a-responsable, de la RIPD) sí existe, como Anexo 1 de la
  resolución — pero esa plantilla es solo para transferencias responsable-a-responsable, no aplica
  al encargo de tratamiento típico de un proveedor de IA.

## B. Niveles de protección de datos al usar IA

### 1. Planes de consumo

**Claude Free / Pro / Max** (fuente oficial, actualizada 1 de julio de 2026:
https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data)
- Entrenamiento: el usuario decide si sus chats se usan para entrenar; se puede activar o
  desactivar en cualquier momento. Los chats en modo incógnito nunca se usan para entrenar, esté
  activada o no la opción.
- Retención: con el entrenamiento **desactivado**, los chats eliminados se borran de los
  servidores dentro de 30 días. Con el entrenamiento **activado**, los chats nuevos o reanudados
  se pueden conservar hasta 5 años en formato desidentificado.
- Casos especiales: contenido marcado por los filtros de seguridad hasta 2 años; datos de feedback
  (pulgar arriba/abajo, reportes de error) hasta 5 años.
- Costo aproximado: Free $0; Pro USD 20/mes (o ~17/mes con facturación anual); Max USD 100/mes
  (5x) o USD 200/mes (20x). Fuente: https://claude.com/pricing (cifras de mercado, no verificadas
  línea por línea contra la página oficial en esta sesión).
- ¿Realista para un despacho pequeño? Solo para trabajo sin datos de clientes identificables
  (investigación jurídica, redacción de plantillas, jurisprudencia pública), salvo que se
  desactive el entrenamiento y aun así se aplique seudonimización o consentimiento, por lo dicho
  en la Parte A.

**ChatGPT Free / Plus / Pro**
- Existe el control "Mejorar el modelo para todos" (Ajustes > Controles de datos), que en la
  mayoría de cuentas viene **activado por defecto**; se puede desactivar en cualquier momento.
- Los "chats temporales" no se guardan en el historial ni se usan para entrenar.
- **NO VERIFICADO**: el precio exacto de ChatGPT Pro en septiembre de 2026 (no lo confirmé contra
  la página oficial de precios en esta sesión) ni el tiempo exacto de retención para chats
  normales fuera del entrenamiento.
- ¿Realista para un despacho pequeño? Igual que Claude: solo sin datos identificables de clientes,
  a menos que se desactive el toggle y se aplique seudonimización o consentimiento.

### 2. Planes de equipo y empresa

**Claude Team / Enterprise** (fuente oficial:
https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data)
- Entrenamiento: **no** se entrena con datos de ningún plan pagado (Team ni Enterprise).
- Retención: las conversaciones se conservan para dar continuidad de servicio; al eliminarlas
  manualmente se borran del backend dentro de 30 días. Enterprise permite configurar controles de
  retención personalizados (ver
  https://privacy.claude.com/en/articles/10440198-configure-custom-data-retention-controls-for-enterprise-plans).
  Enterprise además ofrece DPA con términos negociables, SAML/SCIM, BAA/HIPAA y registro de
  auditoría; Team no incluye ZDR ni residencia de datos en la UE (dato de fuente secundaria,
  **NO VERIFICADO** contra documentación oficial en esta sesión).
- Costo aproximado: Team Standard ~USD 20-25/persona/mes (mínimo 2 puestos); Team Premium
  ~USD 100-125/persona/mes; Enterprise sin precio público (venta directa). Fuentes de mercado, no
  oficiales.
- ¿Realista para un despacho pequeño? Team es alcanzable en costo, pero exige comprar mínimo 2
  puestos y no resuelve por sí solo el problema de transferencia internacional de la Parte A.

**ChatGPT Business (antes Team) / Enterprise** (fuente oficial:
https://openai.com/business-data/ — no pude leer el contenido completo por bloqueo HTTP 403 en
esta sesión, dato tomado de resúmenes de terceros, **marcar como parcialmente NO VERIFICADO**)
- Entrenamiento: por defecto no se usan los datos de Business ni Enterprise para entrenar.
- Retención: Business borra datos según lo que el usuario elimine; Enterprise permite al
  administrador configurar la duración de retención del espacio de trabajo.
- DPA disponible para Business y Enterprise (no para cuentas de consumo).
- Costo: Business ~USD 20/usuario/mes con facturación anual (mínimo 2 puestos). Enterprise sin
  precio público; estimaciones de mercado de USD 45-75/puesto/mes con mínimo de ~150 puestos
  —**NO VERIFICADO**, cifra de fuentes de mercado, no de OpenAI.
- ¿Realista para un despacho pequeño? Business sí es alcanzable; Enterprise generalmente no, por
  el mínimo de puestos.

### 3. API de Claude y Zero Data Retention (ZDR)

Fuente oficial:
https://platform.claude.com/docs/en/manage-claude/api-and-data-retention
- Retención estándar de la API (sin ZDR): los datos se eliminan automáticamente dentro de **30
  días**, salvo que se use una función con retención propia (Batches: 29 días; Files API: hasta
  que se borren; Code execution: hasta 30 días), que haya una infracción de la política de uso
  (hasta 2 años), o que la ley exija conservarlos.
- **ZDR**: Anthropic no guarda el contenido de las peticiones ni las respuestas después de
  devolver la respuesta. Se solicita por organización, contactando al equipo de ventas de
  Anthropic (https://claude.com/contact-sales); no es automático ni gratuito por defecto.
- ZDR **no cubre**: Claude Console, Claude Managed Agents, los planes de consumo (Free/Pro/Max),
  las interfaces de producto de Team y Enterprise (solo Claude Code bajo Enterprise con ZDR
  activado sí queda cubierto), Claude for Excel, ni los llamados **"Covered Models"**: **Claude
  Fable 5.1, Claude Mythos 5.1, Claude Fable 5 y Claude Mythos 5**, que exigen 30 días de
  retención obligatoria salvo autorización expresa de Anthropic.
- Incluso con ZDR, Anthropic puede retener contenido marcado por sus sistemas de confianza y
  seguridad hasta 2 años, o si la ley lo exige.

### 4. Claude por Amazon Bedrock y Google Vertex AI

- **Quién es el encargado del tratamiento**: la propia documentación oficial de Anthropic aclara
  que en Amazon Bedrock y en la plataforma de agentes de Google Cloud, **el proveedor de la nube
  (AWS o Google) es el encargado del tratamiento**, no Anthropic; hay que revisar la política de
  retención y cumplimiento de cada nube, no la de Anthropic. Fuente: página citada arriba de
  api-and-data-retention.
- **Región en Sudamérica (São Paulo)**: verificado contra la documentación oficial de Anthropic
  para Bedrock
  (https://platform.claude.com/docs/en/build-with-claude/claude-on-amazon-bedrock-legacy) — los
  **endpoints regionales** (los que garantizan que los datos se procesen en una región geográfica
  específica) solo están disponibles para **Estados Unidos, Unión Europea, Japón y Asia-Pacífico**.
  **No hay endpoint regional para Sudamérica**; São Paulo (sa-east-1) aparece en algunas búsquedas
  de mercado como región de Bedrock con "cross-region inference", pero eso no garantiza que el
  dato se quede en Brasil. Es decir: **hoy no hay forma de garantizar que los datos de Claude vía
  Bedrock se procesen en Sudamérica**.
- **Vertex AI**: no encontré ninguna fuente, oficial ni de mercado, que confirme una región de
  Vertex AI en Sudamérica para los modelos Claude; las opciones documentadas son EE. UU. y Unión
  Europea (multi-región o región específica). **NO VERIFICADO** de forma exhaustiva: no revisé la
  documentación completa de Google Cloud sobre todas las regiones de Vertex AI, solo lo que
  arrojaron las búsquedas.
- **Cómo se contrata**: ambos son productos empresariales de AWS/Google (facturación por consumo,
  a través de la cuenta de la nube respectiva); no hay un plan "de consumo" equivalente a Claude
  Pro. Es la opción menos realista para un despacho pequeño ecuatoriano por costo de entrada y
  complejidad técnica.

### Tabla resumen

| Nivel | Entrena con tus datos | Retención | Costo aprox. (USD) | ¿Realista para despacho pequeño en Ecuador? |
|---|---|---|---|---|
| Claude/ChatGPT Free, Pro, Plus | Depende del toggle; el usuario decide (Claude) o debe desactivarlo (ChatGPT, activado por defecto) | 30 días (sin entrenar) a 5 años (entrenando) | 0–200/mes | Solo sin datos identificables de clientes |
| Claude Team / ChatGPT Business | No | Hasta que se borre, backend en 30 días; Enterprise configurable | ~20-125/persona/mes | Sí, en costo; no resuelve por sí solo la transferencia internacional |
| Claude Enterprise / ChatGPT Enterprise | No | Configurable por el administrador | Sin precio público; estimado 45-75+/puesto/mes, mínimos altos de puestos | Generalmente no, por mínimos de contratación |
| API de Claude con ZDR | No | Cero retención en reposo (excepto "Covered Models": 30 días fijos) | Por token, requiere aprobación de ventas | Técnicamente posible pero requiere desarrollo propio |
| Bedrock / Vertex AI | Depende del contrato con AWS/Google (ellos son el encargado) | Según política de la nube, no de Anthropic | Por consumo, sin plan fijo | Poco realista: sin región en Sudamérica y alta complejidad |

## C. Propuesta de semáforo (propuesta mía, no oficial)

**Verde — cualquier plan pagado con entrenamiento desactivado (nivel 1 desactivado, o niveles 2-3)**
- Buscar jurisprudencia o doctrina pública para un dictamen.
- Redactar una minuta o escritura desde una plantilla genérica, sin datos de un caso real.
- Traducir o resumir una ley o un reglamento.
- Preparar una presentación o material de capacitación del despacho.

**Amarillo — nivel 2 (Team/Business) con seudonimización, o nivel 1 con consentimiento informado**
- Revisar un contrato de un cliente reemplazando nombres, cédulas y direcciones por
  `[COMPRADOR_1]`, `[INMUEBLE_1]`, etc., antes de subirlo.
- Redactar una escritura de compraventa a partir de datos reales del cliente, con su
  consentimiento informado explícito sobre el envío a un proveedor en el exterior.
- Resumir una demanda o un expediente ya seudonimizado.

**Rojo — no subir a ningún plan de consumo o de equipo estándar; solo nivel 3 (API con ZDR) o
nivel 4 (Bedrock/Vertex con contrato empresarial), y siempre con consentimiento expreso del
cliente**
- Datos de salud, de niñas, niños y adolescentes, o de procesos penales.
- Información bancaria o de cuentas de un cliente.
- Casos de alto perfil público donde la sola combinación de hechos identifique a la persona aunque
  se le cambie el nombre.

## Lista de lo NO VERIFICADO en esta investigación

1. Fecha exacta de posesión del Superintendente Fabrizio Peralta Díaz (solo hay año, 2024; sí se
   confirmó que firmó la Resolución 0004-R el 28 de enero de 2026, ya en funciones).
2. ~~Fecha exacta de expedición de la Resolución SPDP-SPD-2026-0004-R~~ — **cerrado**: 28 de enero
   de 2026 (Quito), verificado en el texto oficial. Sigue sin verificar solo el número/fecha de su
   publicación en el Registro Oficial (la resolución no lo consigna).
3. ~~Si existe una resolución de la SPDP sobre nivel adecuado que mencione a Estados Unidos~~ —
   **cerrado**: no existe ninguna; la Resolución 0004-R solo crea el procedimiento y da nivel
   adecuado automático a la Comunidad Andina (Art. 59). EE. UU. no aparece en el texto.
4. Precio exacto de ChatGPT Pro y tiempo de retención estándar de ChatGPT Free/Plus fuera del
   entrenamiento (no se confirmó contra la página oficial de OpenAI, que devolvió error 403 al
   intentar leerla).
5. Si Claude Team incluye o no residencia de datos en la UE (dato de fuente secundaria).
6. Precio de ChatGPT Enterprise (OpenAI no lo publica; cifra de mercado sin confirmar).
7. Existencia de alguna región de Google Vertex AI en Sudamérica para cualquier modelo (no solo
   Claude); solo se descartó para Claude específicamente.

---

# Investigación parte D — estado de Claude, ChatGPT y Gemini (septiembre 2026)

Fecha de la investigación: 24 de septiembre de 2026. Corte de conocimiento del modelo que investigó: enero 2026; todo lo de este documento viene de fuentes oficiales consultadas hoy, no de memoria del modelo.

Motivo: el curso básico (`Claude outputs/contexto-propuesta-curso-avanzado.md`, línea 63) cita "Claude 3.5 Sonnet, GPT-4o, 200K, 2M" — desactualizado. Este documento reemplaza esos datos con lo vigente hoy.

---

## A. Estado actual (septiembre 2026)

### A.1 Anthropic — Claude

**Modelos vigentes (API y plataforma):** Claude Fable 5.1, Claude Opus 5.5, Claude Sonnet 5 y Claude Haiku 4.5.
Fuente: [Models overview — Claude Platform Docs](https://platform.claude.com/docs/en/models/overview)

| Modelo | ID de API | Ventana de contexto | Salida máxima | Corte de conocimiento confiable |
|---|---|---|---|---|
| Claude Fable 5.1 | `claude-fable-5-1` | 1M tokens | 128K tokens | jun 2026 |
| Claude Opus 5.5 | `claude-opus-5-5` | 1M tokens | 128K tokens | jun 2026 |
| Claude Sonnet 5 | `claude-sonnet-5` | 1M tokens | 128K tokens | ene 2026 |
| Claude Haiku 4.5 | `claude-haiku-4-5-20251001` | 200K tokens | 64K tokens | feb 2025 |

Fuente: misma página de arriba. Nota de la propia doc: "1M tokens es aprox. 555 mil palabras o 2.5M de caracteres Unicode con el tokenizador actual".

**En el chat de claude.ai (no vía API), la ventana varía por modelo, no aparece separada por plan de forma explícita en la doc:**
- Modelos nuevos (Fable 5.1, Opus 5.5, Opus 5, Sonnet 5): 1M tokens.
- Modelos intermedios (Opus 4.8/4.7/4.6, Sonnet 4.6): 500K tokens.
- El resto: 200K tokens.
Fuente: [¿Qué tan grande es la ventana de contexto en los planes de pago? — Claude Help Center](https://support.claude.com/en/articles/8606394-how-large-is-the-context-window-on-paid-claude-plans)
**NO VERIFICADO:** la doc no dice explícitamente "en Free tienes X tokens, en Pro tienes Y" separado del modelo — solo liga el tamaño al modelo disponible en cada plan. Para responder "varía según el plan" con precisión haría falta un renglón oficial que cruce plan × modelo × tokens, que no encontré.

**Proyectos en Claude:**
- Qué es: espacios de trabajo autocontenidos con su propio historial de chats y base de conocimiento.
- Free: hasta 5 proyectos. Planes pagos (Pro, Max, Team, Enterprise): proyectos ilimitados.
- "Conocimiento de proyecto mejorado" (RAG, hasta 10x más capacidad) solo en planes pagos.
- Existe el campo de instrucciones del proyecto ("project instructions"), pero la doc no da un límite de caracteres ni de archivos explícito.
Fuente: [Claude Help Center — Projects](https://support.claude.com/en/articles/9517075-what-are-projects)
**NO VERIFICADO:** límite exacto de archivos o tamaño por proyecto.

**Planes de pago (Claude):**

| Plan | Precio USD/mes | Incluye (resumen) |
|---|---|---|
| Free | $0 | Sonnet y Haiku, 5 proyectos, web/artefactos/búsqueda |
| Pro | $20 ($17 con anual) | Todos los modelos (créditos para Fable), Claude Code, proyectos ilimitados, Cowork |
| Max | desde $100 (5x) o $200 (20x) | Todo lo de Pro + más uso, acceso anticipado |
| Team | ~$25/mes por asiento estándar (o ~$20 anual); asiento premium ~$100–125 | Más uso que Pro, Cowork, mínimo de asientos (la fuente de precios no fija el mínimo con claridad) |
| Enterprise | "Contact sales" (a medida) | Todo lo de Team + SSO, SCIM, auditoría, retención de datos personalizable, controles por rol |

Fuente: [Plans & Pricing — Claude by Anthropic](https://claude.com/pricing)
**NO VERIFICADO:** el mínimo exacto de asientos en Team (fuentes de terceros dicen 2, otras 5) y el precio exacto de Enterprise (Anthropic solo publica "contact sales"; cualquier cifra en dólares para Enterprise que circula es de terceros, no de Anthropic).

**Claude Cowork:** agente de escritorio de Anthropic que trabaja directamente con tus archivos, carpetas y apps — lee, edita y produce archivos reales; corre tareas en un entorno aislado en los servidores de Anthropic; se puede supervisar y ajustar sobre la marcha. Disponible en planes pagos (Pro, Max, Team, Enterprise).
Fuente: [Get started with Claude Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork), [Use Claude Cowork on Team and Enterprise plans](https://support.claude.com/en/articles/13455879-use-claude-cowork-on-team-and-enterprise-plans)

### A.2 OpenAI — ChatGPT

**Modelos vigentes:** al 24 de septiembre de 2026 la familia insignia es **GPT-6 Astra** (el modelo más capaz, ya disponible para Plus, Pro, Business y Enterprise, y por API), y apenas el 22 de septiembre de 2026 —hace dos días— OpenAI lanzó **GPT-6 Sol** y **GPT-6 Luna**, versiones más rápidas/baratas dentro de la misma familia GPT-6.
Fuentes: [GPT-6 Astra: A new generation of intelligence — OpenAI](https://openai.com/index/gpt-6-astra/), [Anuncio GPT-6 Sol y GPT-6 Luna — OpenAI Developer Community](https://community.openai.com/t/announcing-gpt-6-sol-and-gpt-6-luna/1399925), [GPT-6 Sol Model — OpenAI API docs](https://developers.openai.com/api/docs/models/gpt-6-sol)

**Ventana de contexto confirmada en fuente oficial (API):**
GPT-6 Sol: 1,050,000 tokens de contexto de entrada, 128,000 tokens de salida máxima.
Fuente: [GPT-6 Sol Model — OpenAI API](https://developers.openai.com/api/docs/models/gpt-6-sol)

**NO VERIFICADO:**
- Nombre exacto del modelo por defecto que ve cada plan de ChatGPT (Free/Go/Plus/Pro/Business/Enterprise) hoy 24-sep-2026 — las fuentes de prensa hablan de una migración reciente y agitada de nombres (GPT-5.5 Instant → GPT-5.6 → GPT-6 Astra/Sol/Luna) y no logré confirmar en una página oficial de help.openai.com el mapeo plan→modelo vigente hoy (help.openai.com bloqueó la lectura automática; solo tengo lo que aparece citado de ahí por terceros).
- Ventana de contexto de ChatGPT (la app, no la API) por plan: circula la cifra de 27K (Free, modelos instantáneos), 54K (Go/Plus/Business), 128K (Pro/Enterprise) y 256K/400K para modelos de razonamiento, pero no pude abrir directamente la página oficial de OpenAI que lo confirma (403 en help.openai.com y chatgpt.com/pricing). Tómalo como orientativo, no como cifra confirmada.

**Proyectos en ChatGPT:** existe la función "Projects", con límite de archivos por plan (cifras de terceros, no confirmadas en una página que pude abrir yo mismo): 5 en Free, 25 en Plus/Go, 40 en Pro/Business/Enterprise/Edu. **NO VERIFICADO en fuente que pude leer directamente** — help.openai.com/en/articles/10169521-using-projects-in-chatgpt es la fuente citada pero me devolvió 403 al intentar leerla yo mismo.

**Memoria de ChatGPT:** Settings → Personalization → Memory. Dos mecanismos: "saved memories" (lo que le pides recordar) y "chat history" (lo que infiere de conversaciones pasadas). Se puede apagar cada uno por separado, ver el resumen, borrar memorias individuales o todas.
Fuente citada: [Memory FAQ — OpenAI Help Center](https://help.openai.com/en/articles/8590148-memory-faq) (contenido obtenido vía buscador; no pude abrir la página yo mismo por bloqueo 403, igual que el resto de help.openai.com).

**Instrucciones personalizadas (Custom Instructions):** Settings → Personalization. Límite de caracteres: 1,500 en Free/Go; 5,000 en Plus/Pro/Business/Enterprise/Edu (ampliado desde 1,500 el 15 de julio de 2026).
Fuente citada: [ChatGPT Custom Instructions — OpenAI Help Center](https://help.openai.com/en/articles/8096356-chatgpt-custom-instructions) (mismo problema de acceso directo: 403; dato tomado de lo que el buscador extrajo de esa página oficial).

**Planes de pago (ChatGPT):**

| Plan | Precio USD/mes | Notas |
|---|---|---|
| Free | $0 | — |
| Go | $8 | — |
| Plus | $20 | — |
| Pro | $100–200 (fuentes difieren) | **NO VERIFICADO** el precio exacto actual; no pude abrir chatgpt.com/pricing (403) |
| Business Standard | ~$20–25/asiento | Renombrado de "Team" en agosto 2025 |
| Business Premium | ~$100–125/asiento | Lanzado agosto 2026, 5x uso de Standard |
| Enterprise | A medida (~$45–75/asiento según terceros) | **NO VERIFICADO**, sin página oficial abierta con el precio |

**NO VERIFICADO en bloque:** todas las cifras de esta tabla de precios de ChatGPT vienen de agregadores de terceros, porque tanto `chatgpt.com/pricing` como `openai.com/chatgpt/pricing` devolvieron error 403 a la lectura automática hoy. Antes de usar estos números en el curso, confirmarlos a mano abriendo esas páginas en un navegador.

### A.3 Google — Gemini

**Modelos vigentes:** Gemini 3.1 Pro (el más capaz, con "Deep Think" como modo de razonamiento extendido) y Gemini 3 Flash / Omni Flash (rápido). En el selector de la app: "Fast", "Thinking" y "Pro".
Fuentes: [Gemini 3.1 Pro: A smarter model for your most complex tasks — Google Blog](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/), [Models — Gemini API docs](https://ai.google.dev/gemini-api/docs/models)

**NO VERIFICADO:** la ventana de contexto exacta de Gemini 3.1 Pro en tokens. Encontré terceros que afirman "1M tokens para todos los modelos Gemini, incluido Flash-Lite", pero no logré que ni la página de Google Blog ni la de Google Cloud Docs mostraran la cifra numérica al leerlas directamente — ambas remiten a una página de specs que no se renderizó con el texto exacto.

**Google AI Pro y Ultra (planes consumidor):**
- Google AI Pro: $19.99/mes. Incluye 5 TB de almacenamiento (Gmail/Drive/Fotos), 4x más uso de Gemini que sin plan, acceso a Gemini 3.1 Pro, Deep Research, $10/mes de crédito de Google Cloud.
- Google AI Ultra: precio **NO VERIFICADO con certeza** — la página oficial `one.google.com/about/google-ai-plans/` no mostró el número (apareció "/mo" sin cifra, probablemente por geolocalización), y las fuentes de prensa se contradicen: unas dicen $249.99/mes (con $124.99 los primeros 3 meses) como precio vigente; otras dicen que en el I/O de mayo 2026 Google bajó el Ultra a un esquema de dos niveles, $99.99 y $199.99/mes. No pude confirmar cuál es el vigente hoy 24-sep-2026 en una fuente que pude leer yo mismo.
Fuente parcial confirmada: [Google AI plans — Google One](https://one.google.com/about/google-ai-plans/)

**Gems:** asistentes personalizados de Gemini con instrucciones propias. Se crean en gemini.google.com → Explorar Gems → New Gem; se escriben instrucciones (objetivo, comportamiento, formato) y opcionalmente se agregan archivos de referencia. Solo se crean/editan/borran desde la app web.
Fuente: [Tips for creating custom Gems — Gemini Apps Help](https://support.google.com/gemini/answer/15235603?hl=en), [How to use Gems — Gemini Apps Help](https://support.google.com/gemini/answer/15236405)

**NotebookLM:** asistente de investigación que sube PDFs, sitios, videos de YouTube, audio, Docs o Slides y responde con cita a la fuente; genera guías de estudio, resúmenes en audio, mapas mentales, etc. Corre sobre Gemini y soporta más de 80 idiomas.
**Dato relevante para el curso:** la documentación de soporte de Google ahora usa el nombre **"Gemini Notebook"** para lo que veníamos llamando NotebookLM (la página de ayuda se titula "Gemini Notebook Help", con URLs `support.google.com/notebooklm/...` y también `support.google.com/gemininotebook/...` conviviendo). **NO VERIFICADO del todo**: no encontré un anuncio oficial explícito de "renombramos NotebookLM a Gemini Notebook"; lo que vi es el cambio de título en la página de ayuda, así que hay que confirmar si es rebranding completo o coexistencia de nombres antes de usarlo en las diapositivas.
Fuente: [NotebookLM/Gemini Notebook Help — Google Support](https://support.google.com/notebooklm/answer/16164461?hl=en), [Gemini Notebook Help](https://support.google.com/notebooklm/answer/15724458?hl=en)

3.1 Pro en el Gemini app y en NotebookLM/Gemini Notebook está disponible con límites más altos para usuarios de Google AI Pro y Ultra.
Fuente: [Gemini 3.1 Pro — Google Blog](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/)

---

## B. «Configura tu IA»: dónde se ponen las instrucciones permanentes

### Claude
- **Preferencias de perfil / cuenta:** Settings → **Instructions for Claude** (nombre de campo confirmado en la doc de soporte; distinto del que sugería el enunciado — "What personal preferences should Claude consider" parece ser texto de ayuda dentro del campo, no el nombre del menú). Aplica a toda conversación.
  Fuente: [Understanding Claude's personalization features](https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features)
- **Styles:** menú "+" en cualquier chat → "Use style" → "Create & edit styles" → "Create custom style". Estilos predefinidos: Normal, Learning, Concise, Explanatory, Formal. Controla tono/formato, no contenido de conocimiento.
  **NO VERIFICADO:** URL exacta del artículo de soporte dedicado a Styles (el enlace que probé, `.../10186050-using-styles-on-claude-ai`, dio 404) y si tiene límite de caracteres — no lo vi documentado.
- **Instrucciones del Proyecto:** dentro de cada proyecto, campo de "project instructions", aplican solo a los chats de ese proyecto.
  Fuente: [Projects — Claude Help Center](https://support.claude.com/en/articles/9517075-what-are-projects)
- **Memoria:** no confirmé una función de "memoria" tipo ChatGPT separada del historial del proyecto en la documentación revisada. **NO VERIFICADO** si Claude.ai tiene memoria automática entre chats fuera de Proyectos.
- **CLAUDE.md (Claude Code):** dos niveles principales, ambos aditivos (si existen los dos, Claude ve ambos):
  - Usuario: `~/.claude/CLAUDE.md`
  - Proyecto: CLAUDE.md en la raíz del repo (y `.claude/rules/*.md`)
  - También existe `CLAUDE.local.md` y el comando `/memory` para listar todas las ubicaciones activas.
  Fuente: [How Claude remembers your project — Claude Code Docs](https://code.claude.com/docs/en/memory) (la URL `docs.claude.com/.../memory` redirige a esta)
- **Cowork:** qué es, ver sección A.1. No encontré un archivo de instrucciones tipo CLAUDE.md específico de Cowork en lo que revisé — usa las instrucciones de perfil y de proyecto. **NO VERIFICADO** si Cowork tiene su propio archivo de configuración persistente distinto.

### ChatGPT
- **Instrucciones personalizadas / Personalización:** Settings → **Personalization** → Custom instructions. Límite: 1,500 caracteres (Free/Go) o 5,000 caracteres (Plus/Pro/Business/Enterprise/Edu, desde 15-jul-2026).
  Fuente citada (no pude abrir la página yo mismo, 403): [ChatGPT Custom Instructions — OpenAI Help Center](https://help.openai.com/en/articles/8096356-chatgpt-custom-instructions)
- **Memoria:** Settings → Personalization → Memory. Dos partes: memorias guardadas y "chat history" (referencia a conversaciones pasadas). Se administran y borran por separado.
  Fuente citada (403 directo): [Memory FAQ — OpenAI Help Center](https://help.openai.com/en/articles/8590148-memory-faq)
- **Rasgos/personalidad:** mencionado en la búsqueda pero no alcancé a leer la página oficial que detalla esta función por separado de Custom Instructions. **NO VERIFICADO**.
- **Instrucciones de Proyecto:** existe dentro de "Projects" en ChatGPT. **NO VERIFICADO** el nombre exacto del campo y su límite de caracteres — no pude abrir `help.openai.com/en/articles/10169521-using-projects-in-chatgpt` directamente (403); lo que sé viene de un resumen de terceros sobre esa página.
- **AGENTS.md (Codex):** README para agentes. Codex busca, en orden: `AGENTS.override.md` o `AGENTS.md` en el home de Codex (`~/.codex` por defecto), y luego desde la raíz del repo (git root) hacia abajo hasta el directorio de trabajo actual. Da contexto reusable: normas del proyecto, comandos preferidos, estilo de escritura, cosas a las que hay que tener cuidado.
  Fuente: [Custom instructions with AGENTS.md — Codex Developer Docs](https://developers.openai.com/codex/guides/agents-md), [codex/docs/agents_md.md — GitHub](https://github.com/openai/codex/blob/main/docs/agents_md.md)

### Gemini
- **Información guardada / instrucciones personales:** en la app de Gemini, Settings → gestionar la información que le has pedido a Gemini que guarde (accesible también directo en `gemini.google.com/saved-info`). En algunas regiones aparece como "Instructions for Gemini". Incluye también las instrucciones de Gems y Skills.
  Fuente: [Gemini Apps Privacy Hub](https://support.google.com/gemini/answer/13594961?hl=en)
  **NO VERIFICADO:** límite de caracteres — la página de privacidad no lo especifica.
- **Instrucciones de un Gem:** ver sección A.3 (se escriben al crear el Gem; se pueden reescribir con ayuda de Gemini).

### Tabla resumen — dónde se configuran las instrucciones permanentes

| IA | Nivel | Nombre del campo | Ruta de menú | URL de la doc |
|---|---|---|---|---|
| Claude | Cuenta | Instructions for Claude | Settings → Instructions for Claude | [support.claude.com/.../10185728](https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features) |
| Claude | Cuenta (formato) | Styles | Chat → "+" → Use style → Create & edit styles | NO VERIFICADO (URL del artículo dedicado no confirmada) |
| Claude | Proyecto | Project instructions | Dentro del Proyecto → instrucciones | [support.claude.com/.../9517075](https://support.claude.com/en/articles/9517075-what-are-projects) |
| Claude Code | Usuario | CLAUDE.md | `~/.claude/CLAUDE.md` | [code.claude.com/docs/en/memory](https://code.claude.com/docs/en/memory) |
| Claude Code | Proyecto/carpeta | CLAUDE.md / .claude/rules/*.md | raíz del repo | [code.claude.com/docs/en/memory](https://code.claude.com/docs/en/memory) |
| ChatGPT | Cuenta | Custom instructions | Settings → Personalization | [help.openai.com/.../8096356](https://help.openai.com/en/articles/8096356-chatgpt-custom-instructions) (403 al leer directo) |
| ChatGPT | Cuenta | Memory | Settings → Personalization → Memory | [help.openai.com/.../8590148](https://help.openai.com/en/articles/8590148-memory-faq) (403 al leer directo) |
| ChatGPT | Proyecto | (nombre exacto NO VERIFICADO) | Dentro de Projects | [help.openai.com/.../10169521](https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt) (403 al leer directo) |
| Codex | Usuario/repo/carpeta | AGENTS.md | `~/.codex/AGENTS.md`, raíz del repo, subcarpetas | [developers.openai.com/codex/guides/agents-md](https://developers.openai.com/codex/guides/agents-md) |
| Gemini | Cuenta | Saved info / "Instructions for Gemini" | Settings → info guardada (`gemini.google.com/saved-info`) | [support.google.com/gemini/answer/13594961](https://support.google.com/gemini/answer/13594961?hl=en) |
| Gemini | Gem | Instrucciones del Gem | gemini.google.com → New Gem | [support.google.com/gemini/answer/15235603](https://support.google.com/gemini/answer/15235603?hl=en) |

---

## C. Guía de prompting oficial relevante

**Anthropic — contra la adulación (sycophancy) y para pedir crítica honesta:**
- Explicar el *por qué* de un comportamiento en vez de solo nombrarlo: en lugar de pedir "sé crítico", dar contexto (p. ej. "voy a presentar esto a una audiencia hostil, necesito saber dónde me van a atacar").
- Asignar un rol en el system prompt orienta tono y comportamiento; para feedback honesto el rol no es "asistente servicial" sino lo contrario, p. ej. "Eres un abogado del diablo: argumenta en contra de mi postura aunque parezca razonable".
- Pedir citas textuales exactas de la fuente ("si no encuentras una cita relevante, di 'No se encontraron citas relevantes'") evita que el modelo derive hacia un resumen complaciente sin respaldo.
Fuente: [Prompting best practices — Claude Platform Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)

**Anthropic — formato (markdown y emojis):**
- Para reportes, documentos, explicaciones técnicas o cualquier contenido largo: escribir en prosa clara con párrafos completos; usar markdown sobre todo para código en línea, bloques de código y encabezados simples.
- Evitar **negritas** e *itálicas*; no usar listas numeradas o con viñetas salvo que se presenten ítems verdaderamente discretos donde una lista sea la mejor opción, o el usuario la pida explícitamente.
- Evitar emojis, groserías y "emotes"; solo reflejarlos si el usuario los usa primero. Los emojis no tienen lugar en documentación técnica salvo pedido explícito.
- Recomendación práctica: en vez de decir "no uses markdown", decir "tu respuesta debe ser prosa fluida en párrafos".
Fuente: misma página de arriba, [Prompting best practices — Claude Platform Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)

**OpenAI — sycophancy:**
- En abril de 2026 (nota: el incidente original fue con GPT-4o) OpenAI documentó públicamente el problema de un modelo excesivamente adulador y cómo lo corrigió: nuevas evaluaciones para medir sycophancy, entrenamiento con ejemplos que antes llevaban a adulación excesiva enseñando al modelo a no hacerlo, y ajustes al system prompt para alejarlo explícitamente de ese comportamiento.
Fuente: [Sycophancy in GPT-4o: What happened and what we're doing about it — OpenAI](https://openai.com/index/sycophancy-in-gpt-4o/)
- Las guías de prompting de GPT-5 y GPT-5.1 (Cookbook oficial) recomiendan ajustar calidez y brevedad al estado de la conversación y evitar frases de reconocimiento innecesarias tipo "entendido" o "gracias" que no aportan.
Fuente: [GPT-5.1 Prompting Guide — OpenAI Cookbook](https://cookbook.openai.com/examples/gpt-5/gpt-5-1_prompting_guide), [GPT-5 prompting guide — OpenAI Cookbook](https://developers.openai.com/cookbook/examples/gpt-5/gpt-5_prompting_guide)
**NO VERIFICADO:** no encontré, en la guía oficial de OpenAI, una recomendación explícita y equivalente a la de Anthropic sobre evitar markdown/emojis en la salida — lo que hay documentado es la reducción de emojis como comportamiento del modelo tras GPT-4o, no una instrucción de prompting que el usuario deba escribir.

---

## Resumen de todo lo NO VERIFICADO en este documento

1. Cruce exacto plan × modelo × tokens en claude.ai (Free/Pro/Max) — la doc liga tokens al modelo, no lo desglosa por plan.
2. Límite de archivos/tamaño por Proyecto en Claude.
3. Mínimo de asientos exacto en Claude Team, y precio exacto de Claude Enterprise (Anthropic solo dice "contact sales").
4. Modelo por defecto exacto que ve cada plan de ChatGPT hoy (migración GPT-5.x → GPT-6 muy reciente, 22-sep-2026).
5. Ventana de contexto de la app de ChatGPT por plan (27K/54K/128K/256K/400K) — cifra de terceros, no confirmada en página oficial que pude abrir.
6. Límite de archivos por Proyecto en ChatGPT — help.openai.com bloqueó la lectura automática (403).
7. Precio exacto de ChatGPT Pro, Business y Enterprise — chatgpt.com/pricing y openai.com/chatgpt/pricing devolvieron 403.
8. Ventana de contexto exacta de Gemini 3.1 Pro en tokens.
9. Precio vigente de Google AI Ultra (fuentes contradicen $249.99 vs. esquema $99.99/$199.99).
10. Si "Gemini Notebook" es un rebranding oficial y completo de NotebookLM o coexistencia de nombres.
11. Límite de caracteres de "Saved info" en Gemini y del campo de instrucciones de Proyecto en ChatGPT.
12. Si Claude.ai tiene una función de memoria automática entre chats (fuera de Proyectos) equivalente a la de ChatGPT.
13. URL exacta del artículo de soporte de Claude dedicado a Styles (la que probé dio 404).
14. Recomendación oficial de OpenAI equivalente a la de Anthropic sobre evitar markdown/emojis en el prompting (no la encontré).

Antes de usar cualquiera de estos 14 puntos en el material del curso, confirmarlos a mano abriendo la página en un navegador (varias devolvieron 403 a la lectura automática, lo que no significa que el dato sea falso — solo que no lo pude verificar yo mismo hoy).
