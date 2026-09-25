import { ShieldCheck } from 'lucide-react';
import { COURSE_MODULES as BASICO } from '../course-content';
import { MODULE_2 } from '../MODULO_2';

const MODULO_1 = BASICO.find((m) => m.id === 'module-1');

// Reutiliza una diapositiva del curso básico sin copiarla; solo cambia el id
// para que no choque en session_state ni en las encuestas.
function delBasico(modulo, id, nuevoId) {
    const slide = modulo.slides.find((s) => s.id === id);
    if (!slide) throw new Error(`No existe la diapositiva ${id} en ${modulo.id}`);
    return { ...slide, id: nuevoId };
}

export const VIRTUAL_1 = {
    id: "v1-virtual-1",
    title: "Virtual 1: Fundamentos exprés y confidencialidad",
    icon: ShieldCheck,
    slides: [
        {
            id: "v1-1-1",
            title: "Portada",
            type: "hero",
            contentData: {
                heading: "IA avanzada para abogados",
                paragraph: "Virtual 1 · Fundamentos exprés y confidencialidad. Martes 13 de octubre de 2026.",
                image: "/images/llm-diagram.png"
            }
        },
        delBasico(MODULO_1, "1-2", "v1-1-2"),
        {
            id: "v1-1-3",
            title: "¿Qué IA usas más en tu trabajo?",
            type: "poll",
            interaction: {
                type: "LivePoll",
                data: {
                    question: "¿Qué IA usas más en tu trabajo?",
                    options: [
                        "Claude (Pro o Max)",
                        "ChatGPT (Plus o Pro)",
                        "Gemini",
                        "Varias por igual",
                        "Solo versiones gratuitas"
                    ]
                }
            }
        },
        {
            id: "v1-1-4",
            title: "¿Con qué frecuencia la usas?",
            type: "poll",
            interaction: {
                type: "LivePoll",
                data: {
                    question: "¿Con qué frecuencia usas IA en tu trabajo?",
                    options: [
                        "Todos los días",
                        "Varias veces por semana",
                        "Una vez por semana o menos"
                    ]
                }
            }
        },
        {
            id: "v1-1-5",
            title: "¿Para qué la usas más?",
            type: "poll",
            interaction: {
                type: "LivePoll",
                data: {
                    question: "¿Para qué usas más la IA hoy?",
                    options: [
                        "Redactar escritos, minutas o contratos",
                        "Revisar documentos y contratos",
                        "Investigar normativa y jurisprudencia",
                        "Correos y tareas administrativas",
                        "Todavía poco: vengo a eso"
                    ]
                }
            }
        },
        {
            id: "v1-2-1",
            title: "Tokens: la moneda de la IA",
            type: "analogy",
            contentData: {
                heading: "¿Qué es un token?",
                left: { title: "Para ti", text: "Palabras", icon: "User" },
                right: { title: "Para la IA", text: "Pedazos de texto", icon: "Cpu" },
                footer: "Todo se mide en tokens: lo que escribes, lo que adjuntas y lo que responde. Según Anthropic, 1 millón de tokens son unas 555 000 palabras con su tokenizador actual."
            }
        },
        {
            id: "v1-2-2",
            title: "Ventana de contexto",
            type: "stat-comparison",
            contentData: {
                heading: "La ventana de contexto creció",
                statSecondary: "200K",
                statPrimary: "1M",
                label: "Tokens: Claude Opus 5.5, Sonnet 5 y Fable 5.1 hoy",
                quote: "Más grande no significa infalible: la ventana sigue siendo finita y la IA sigue pudiendo inventar."
            }
        },
        {
            id: "v1-2-3",
            title: "Modelos vigentes, septiembre 2026",
            type: "comparison",
            contentData: {
                heading: "Modelos vigentes, septiembre de 2026",
                headers: ["IA", "Modelos", "Ventana de contexto"],
                rows: [
                    ["Claude", "Fable 5.1, Opus 5.5, Sonnet 5 y Haiku 4.5", "1M tokens (Haiku 4.5: 200K)"],
                    ["ChatGPT", "GPT-6 Astra; por API, también GPT-6 Sol y Luna (desde el 22 de septiembre)", "GPT-6 Sol por API: 1 050 000 tokens"],
                    ["Gemini", "Gemini 3.1 Pro y Gemini 3 Flash", "—"]
                ]
            }
        },
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
        },
        {
            id: "v1-2-4",
            title: "Por qué la IA «olvida»",
            type: "narrative",
            contentData: {
                Heading1: "Por qué la IA «olvida» en chats largos",
                paragraph1: "La ventana de contexto es la memoria de trabajo del modelo, y es finita. Todo lo que escribiste, lo que adjuntaste y lo que respondió ocupa espacio en ella.",
                bullets1: [
                    "Lo que no cabe en la ventana, el modelo no lo ve",
                    "Un chat que mezcla tres casos mezcla también sus datos",
                    "Cambiar de tema a mitad del chat arrastra el contexto anterior"
                ],
                Heading2: "Cuándo abrir un chat nuevo",
                paragraph2: "Abre uno nuevo en cualquiera de estos casos:",
                bullets2: [
                    "Cambias de caso o de cliente",
                    "La IA repite errores que ya corregiste o retoma ideas que descartaste",
                    "Empiezas una tarea distinta: pide antes un resumen y llévalo al chat nuevo"
                ]
            }
        },
        {
            id: "v1-2-5",
            title: "Lo que sigue: las 4D",
            type: "comparison",
            contentData: {
                heading: "Lo que sigue: las 4D de la fluidez en IA",
                paragraph: "Marco AI Fluency, de Rick Dakan y Joseph Feller con Anthropic (aifluencyframework.org).",
                headers: ["Competencia", "La pregunta", "Dónde la trabajamos hoy"],
                rows: [
                    ["Discernimiento", "¿Cómo evalúo lo que me entrega?", "Alucinaciones y verificación"],
                    ["Delegación", "¿Qué hago yo y qué hace la IA?", "Harness y agentes"],
                    ["Diligencia", "¿Cómo lo hago de forma responsable?", "Confidencialidad y LOPDP"],
                    ["Descripción", "¿Cómo le digo lo que necesito?", "Mi despacho y Configura tu IA"]
                ]
            }
        },
        delBasico(MODULO_1, "1-4b", "v1-3-2"),
        {
            id: "v1-3-3",
            title: "Mata v. Avianca",
            type: "narrative",
            contentData: {
                Heading1: "Mata v. Avianca: seis sentencias que nunca existieron",
                paragraph1: "Nueva York, 2023. En un juicio contra Avianca, los abogados del demandante presentaron un escrito con seis resoluciones judiciales inventadas por ChatGPT, con citas y fragmentos de sentencias que no existen.",
                bullets1: [
                    "Corte de Distrito de EE. UU. para el Distrito Sur de Nueva York. Juez P. Kevin Castel. Expediente 1:22-cv-01461",
                    "Casos inventados, entre otros: <em>Varghese v. China Southern Airlines</em> y <em>Shaboon v. Egyptair</em>",
                    "Sancionados: Steven A. Schwartz y Peter LoDuca, y su firma, Levidow, Levidow &amp; Oberman"
                ],
                Heading2: "La sanción: orden del 22 de junio de 2023",
                paragraph2: "Multa de 5000 dólares, solidaria entre los dos abogados y la firma. Además, el juez ordenó enviar cartas al cliente y a cada juez que aparecía falsamente como autor de las sentencias inventadas.",
                highlight: { type: "info", text: "La IA no firmó el escrito. Lo firmaron ellos." }
            }
        },
        {
            id: "v1-3-4",
            title: "No es un problema de otros países",
            type: "comparison",
            contentData: {
                heading: "No es un problema de otros países",
                paragraph: "La base pública de Damien Charlotin registraba 2077 casos en el mundo al 24 de septiembre de 2026. En Ecuador no encontramos ningún caso confirmado todavía.",
                headers: ["Dónde", "Qué pasó", "Consecuencia"],
                rows: [
                    ["Colombia · Corte Suprema, auto AC739-2026 (13 feb 2026)", "Un abogado incluyó diez citas jurisprudenciales inexistentes, generadas con IA, en un recurso de revisión", "Multa de 15 salarios mínimos"],
                    ["Colombia · Corte Suprema, STC17832-2025 (5 nov 2025)", "El Tribunal Superior de Sincelejo citó apartes inexistentes de las sentencias STC13560-2023 y STC4734-2025", "Se anuló el fallo"],
                    ["Chile · Corte Suprema (22 abr 2026)", "Una abogada citó doctrina inexistente en un recurso de casación", "Un mes de suspensión y multa de 5 UTM"],
                    ["Argentina · Cámara Civil y Comercial de Rosario (21 ago 2025)", "Un escrito citó fallos inexistentes generados con ChatGPT", "Reprensión y oficio al Colegio de Abogados"]
                ]
            }
        },
        {
            id: "v1-3-5",
            title: "Tutorial: por qué adivina",
            type: "narrative",
            contentData: {
                Heading1: "Tutorial: cómo evitar que la IA alucine",
                paragraph1: "Este tutorial adapta a Ecuador el método de Holly Cope, exabogada inglesa, en su video «Reducing AI Hallucinations in Legal Work» (junio de 2026). El caso, las fuentes y los prompts son nuestros; el método y el recorrido son de ella.",
                bullets1: [
                    "Video completo: <a href='https://www.youtube.com/watch?v=Q-nA44oxXp0' target='_blank' rel='noopener noreferrer' class='underline'>youtube.com/watch?v=Q-nA44oxXp0</a>"
                ],
                Heading2: "Primero: por qué adivina",
                paragraph2: "Un estudio de OpenAI (Kalai y otros, septiembre de 2025) lo explica con un examen: si la IA no sabe un cumpleaños y adivina, acierta 1 de cada 365 veces; si dice «no sé», saca cero siempre. Como a los modelos se los evalúa así, aprenden a adivinar con seguridad.",
                highlight: { type: "success", text: "La idea central de Holly Cope: no le pidas a la IA que acierte; pídele que sea transparente sobre lo que no sabe." }
            }
        },
        {
            id: "v1-3-5b",
            title: "Tutorial: los modelos de hoy también inventan",
            type: "comparison",
            contentData: {
                heading: "Los modelos de hoy también inventan",
                paragraph: "Benchmark AA-Omniscience de Artificial Analysis, consultado el 24 de septiembre de 2026: preguntas de conocimiento factual: mide lo que el modelo recuerda. Saber más no significa inventar menos. Y mide la memoria del modelo, no su trabajo con la norma que tú le entregas: por eso se la entregas.",
                headers: ["", "Claude Fable 5.1 (max)", "Claude Opus 5.5 (max)", "GPT-6 Astra (high)"],
                rows: [
                    ["Aciertos", "67 %", "66 %", "61 %"],
                    ["De lo que no sabe, cuánto inventa", "73 %", "59 %", "45 %"],
                    ["De cada 100 preguntas", "67 bien, 24 inventadas, 9 «no sé» o incompletas", "66 bien, 20 inventadas, 14 «no sé» o incompletas", "61 bien, 17 inventadas, 22 «no sé» o incompletas"]
                ]
            }
        },
        {
            id: "v1-3-6",
            title: "Tutorial 1: marco de confianza",
            type: "narrative",
            contentData: {
                Heading1: "Paso 1: el marco de confianza",
                paragraph1: "Trata cada respuesta como el trabajo de un abogado junior muy bueno que todavía no llega. Antes de usarla, pásala por cinco preguntas:",
                bullets1: [
                    "<b>Consecuencias:</b> ¿qué pasa si está mal? Un escrito o una minuta no es un correo.",
                    "<b>Evidencia:</b> ¿de dónde sale cada afirmación? Pídele la fuente.",
                    "<b>Vacíos:</b> ¿qué supuso y qué dejó fuera? Pregúntaselo directamente.",
                    "<b>Confianza no es exactitud:</b> que suene seguro no lo hace correcto.",
                    "<b>Tú verificas:</b> la última revisión es humana, siempre."
                ],
                highlight: { type: "info", text: "Marco de confianza de Holly Cope." }
            }
        },
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
        },
        {
            id: "v1-3-9",
            title: "Tutorial 3: el prompt mejor",
            type: "prompt-template",
            contentData: {
                heading: "Paso 3: el prompt mejor",
                template: `Eres mi asistente de investigación jurídica en Ecuador. Te adjunto el texto vigente del Código Civil ecuatoriano [ADJUNTAR ARCHIVO O PEGAR EL TEXTO OFICIAL] y el enlace del Registro Oficial donde se publicó la última reforma relevante: [URL].

Usa ÚNICAMENTE estos documentos, no tu conocimiento general ni supuestos de otras jurisdicciones. Para cada punto de tu respuesta sobre el plazo de prescripción de una acción ejecutiva y de una ordinaria, dame:
- La fuente exacta (número de artículo y una cita textual de máximo dos líneas).
- Tu nivel de confianza (alta, media o baja) en que esa cita corresponde al texto vigente.
- Qué no está claro o qué falta en el documento que te di (por ejemplo, excepciones o plazos especiales que no puedas confirmar con lo que tienes).
- Los supuestos que hiciste, explícitos.

Si para algún punto el documento no alcanza, responde exactamente: "la información proporcionada es insuficiente para determinarlo". No completes el vacío con conocimiento general ni inventes el artículo o el plazo.`,
                examples: ["Artículo y cita textual", "Confianza alta, media o baja", "Qué falta", "Frase fija si no alcanza"],
                tip: "Truco de Holly Cope: dile de antemano qué contiene cada fuente, para que no diga que algo no estaba."
            }
        },
        {
            id: "v1-3-10",
            title: "Tutorial 4: verifica y protocolo",
            type: "narrative",
            contentData: {
                Heading1: "Paso 4: verifica y protocolo",
                paragraph1: "Pide la cita exacta, ábrela en la fuente oficial y pasa el checklist.",
                bullets1: [
                    "Registro Oficial: <a href='https://www.registroficial.gob.ec/' target='_blank' rel='noopener noreferrer' class='underline'>registroficial.gob.ec</a>",
                    "Corte Nacional de Justicia: <a href='https://busquedasentencias.cortenacional.gob.ec/' target='_blank' rel='noopener noreferrer' class='underline'>busquedasentencias.cortenacional.gob.ec</a>",
                    "Corte Constitucional: <a href='https://buscador.corteconstitucional.gob.ec/' target='_blank' rel='noopener noreferrer' class='underline'>buscador.corteconstitucional.gob.ec</a>",
                    "Descarga el <a href='/materiales/checklist-verificacion.md' target='_blank' rel='noopener noreferrer' class='underline'>checklist de verificación</a> y el <a href='/materiales/tutorial-evitar-alucinaciones.md' target='_blank' rel='noopener noreferrer' class='underline'>tutorial completo</a>"
                ],
                highlight: { type: "success", text: "La frase inventada del paso 2 no resiste esta comprobación." }
            }
        },
        {
            id: "v1-4-1",
            title: "El modelo es el motor",
            type: "analogy",
            contentData: {
                heading: "El modelo es el motor; el harness es el auto",
                left: { title: "El auto (harness)", text: "El chat, Cowork, Claude Code, Codex", icon: "Car" },
                right: { title: "El motor (modelo)", text: "Opus 5.5, Sonnet 5, GPT-6 Astra", icon: "Cpu" },
                footer: "El harness es el programa que rodea al modelo y le da herramientas, archivos y memoria. Por eso el mismo modelo rinde distinto en el chat y en un agente."
            }
        },
        {
            id: "v1-4-2",
            title: "Tres formas de trabajar con IA",
            type: "narrative",
            contentData: {
                Heading1: "Tres formas de trabajar con IA",
                paragraph1: "El marco AI Fluency distingue tres modos. Ninguno es mejor: se eligen según la tarea.",
                bullets1: [
                    "<b>Automatización:</b> la IA ejecuta una tarea que tú defines. Ejemplo: resumir una sentencia.",
                    "<b>Aumentación:</b> piensan juntos. Ejemplo: discutir la estrategia de una contestación.",
                    "<b>Agencia:</b> la IA actúa con más autonomía dentro de lo que configuraste. Ejemplo: un agente que ordena la carpeta de un expediente."
                ],
                Heading2: "Qué es un agente",
                paragraph2: "Un modelo con herramientas que planifica, actúa y revisa en ciclo. Claude Cowork, por ejemplo, trabaja con tus archivos y carpetas y produce archivos reales. Lo vemos a fondo en la Virtual 4.",
                highlight: { type: "success", text: "Delegar no es soltar el volante: es decidir qué hace la IA y qué haces tú." }
            }
        },
        {
            id: "v1-4-3",
            title: "Qué delegar y qué no",
            type: "list-comparison",
            contentData: {
                leftTitle: "Delega",
                leftItems: [
                    "Primeros borradores de minutas, escritos y correos",
                    "Resumir expedientes y normas que tú cargaste",
                    "Ordenar y comparar documentos",
                    "Preparar preguntas y listas de revisión"
                ],
                rightTitle: "No delegues",
                rightItems: [
                    "La conclusión jurídica final y la firma",
                    "Citas y jurisprudencia sin verificar",
                    "Datos de clientes sin seudonimizar",
                    "Decisiones que afectan los derechos de una persona"
                ]
            }
        },
        {
            id: "v1-5-1",
            title: "Descanso",
            type: "break",
            contentData: {
                heading: "Descanso de 10 minutos",
                message: "Estira las piernas y toma agua. Volvemos con confidencialidad: qué puedes subir y a dónde.",
                nextPreview: "Confidencialidad y LOPDP"
            }
        },
        {
            id: "v1-6-1",
            title: "Reglas de oro",
            type: "warning",
            contentData: {
                heading: "Lo que nunca debes hacer",
                paragraph: "Desactivar el entrenamiento no es confidencialidad: tus datos igual salen de tu computadora y se guardan un tiempo.",
                bullets: [
                    "Pegar nombres, cédulas, RUC o direcciones de clientes sin seudonimizar",
                    "Pedirle a la IA que anonimice un documento real: los datos ya salieron",
                    "Anonimizar solo el nombre: un inmueble único, una fecha y una notaría identifican a la persona",
                    "Subir datos de salud, de menores, penales o bancarios a un plan personal",
                    "Darle a un agente la carpeta real de clientes sin revisar qué contiene"
                ],
                highlight: { type: "danger", text: "Seudonimiza en tu computadora antes de subir. El jueves lo haces con el Anonimizador." }
            }
        },
        {
            id: "v1-6-2",
            title: "LOPDP: tú eres el responsable",
            type: "narrative",
            contentData: {
                Heading1: "LOPDP: tú eres el responsable",
                paragraph1: "Ley Orgánica de Protección de Datos Personales, Registro Oficial Suplemento 459 de 26 de mayo de 2021; su régimen sancionatorio rige plenamente desde el 26 de mayo de 2023. Cuando subes datos de un cliente, tú eres el responsable y el proveedor de IA es el encargado del tratamiento.",
                bullets1: [
                    "<b>Art. 34:</b> el encargo exige un contrato que prohíba al proveedor usar los datos para otros fines o pasarlos a terceros, y que lo obligue a devolverlos o destruirlos al terminar.",
                    "<b>Datos sensibles (arts. 4 y 26):</b> salud, pasado judicial y datos biométricos, entre otros. Tratarlos está prohibido por regla general.",
                    "<b>Resolución SPDP-SPD-2026-0004-R (28 ene 2026), art. 23:</b> el encargo de tratamiento no es transferencia internacional."
                ],
                Heading2: "Encargo o transferencia: la diferencia que importa",
                paragraph2: "Si el proveedor solo procesa por tu cuenta, rige el encargo (arts. 34 y 47). Si usa los datos para fines propios, como entrenar modelos, es transferencia internacional. Hoy ningún país tiene nivel adecuado declarado, salvo los de la Comunidad Andina; Estados Unidos no. Entonces hacen falta garantías contractuales, autorización de la SPDP o el consentimiento explícito e informado del titular (art. 60.2).",
                highlight: { type: "info", text: "Criterio del curso: si no tienes un contrato de encargo por escrito, trátalo como transferencia. Seudonimiza o pide consentimiento." }
            }
        },
        {
            id: "v1-6-3",
            title: "Niveles de protección",
            type: "comparison",
            contentData: {
                heading: "Niveles de protección: qué pasa con tus datos",
                paragraph: "Según la documentación oficial de Anthropic y la página de precios de OpenAI, septiembre de 2026.",
                headers: ["Nivel", "¿Entrena con tus datos?", "Cuánto se guardan", "¿Realista para un despacho pequeño?"],
                rows: [
                    ["1. Plan personal: Claude Free, Pro o Max; ChatGPT Free, Plus o Pro", "Claude: tú decides con un interruptor. ChatGPT: entrena con tus chats salvo que lo desactives (opt-out), según chatgpt.com/pricing", "Claude con entrenamiento desactivado: lo que borras se elimina en 30 días. Activado: hasta 5 años, desidentificado", "Sí, para el color verde. Claude Pro y ChatGPT Plus cuestan 20 dólares al mes"],
                    ["2. Plan de equipo o empresa: Claude Team o Enterprise", "No", "Lo que borras sale del sistema en 30 días; Enterprise permite configurar la retención", "Team, sí. Enterprise: precio a consultar con ventas"],
                    ["3. API de Claude con Zero Data Retention", "No", "Nada después de responder, salvo lo que marquen los filtros de seguridad (hasta 2 años). Fable y Mythos exigen 30 días", "Solo con desarrollo propio; se pide al equipo de ventas de Anthropic"],
                    ["4. Claude en Amazon Bedrock o Google Vertex AI", "Según tu contrato con AWS o Google, que son los encargados", "Según la política de esa nube", "Poco: Bedrock no tiene región garantizada en Sudamérica y es complejo"]
                ]
            }
        },
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
                    { id: "contrato-crudo", texto: "El contrato de arrendamiento de un cliente, tal como te lo mandó, con nombres y cédulas", correcta: [1, 2],
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
        },
        {
            id: "v1-7-1",
            title: "Proyectos en Claude y ChatGPT",
            type: "feature-highlight",
            contentData: {
                heading: "Proyectos: tu despacho dentro de la IA",
                paragraph: "Claude y ChatGPT tienen Proyectos: un espacio con sus propios chats, documentos e instrucciones. Todo chat nuevo dentro del Proyecto arranca con ese contexto.",
                image: "/images/projects.png",
                steps: [
                    "Crea el Proyecto «Mi despacho»",
                    "Sube tus documentos de referencia: plantillas y normas vigentes",
                    "Pega las instrucciones permanentes",
                    "Abre un chat nuevo dentro del Proyecto y pruébalo"
                ],
                tip: "Claude Free permite hasta 5 proyectos; los planes pagos, ilimitados. ChatGPT Plus también incluye Proyectos."
            }
        },
        delBasico(MODULE_2, "2-2", "v1-7-2"),
        {
            id: "v1-7-4",
            title: "Ejemplo real",
            type: "prompt-template",
            contentData: {
                heading: "Ejemplo real: las instrucciones de una notaría",
                template: `Rol: asistente legal senior de una notaría en Quito. Preparas matrices, actas y concuerdos.

Reglas que no se negocian:
- Dos fases. Primero analizas, validas y me dices qué falta. Puedes adelantar un BORRADOR INTERNO con campos [PENDIENTE: ...], pero no pasa a versión final hasta que yo confirme los datos.
- Fuente ilegible = alto total. Si un PDF no devuelve texto, está escaneado: léelo como imagen. Prohibido rellenar con lo que "suele traer" ese tipo de trámite.
- Fidelidad de la minuta: el texto del abogado se respeta palabra por palabra. Solo corriges números a letras, abreviaturas, tildes y ortografía obvia. No resumas ni añadas.
- La descripción del inmueble se transcribe del certificado de gravamen; no se redacta.
- Verifica cada número escrito en letras antes de entregar y dime qué no pudiste verificar.
- Un documento firmado no se modifica: cualquier diferencia se informa.

Cómo comunicarte: directo y honesto. Prefiero que me contradigas con fundamento a que me des la razón en silencio. Sin emojis.`,
                examples: ["Borrador y versión final", "Si no puede leer, se detiene", "No inventa lo que «suele traer»", "Contradice con fundamento"],
                tip: "Extracto adaptado de las instrucciones que uso en la notaría, sin nombres, trámites ni rutas internas. Úsalo de modelo y escribe las tuyas."
            }
        },
        {
            id: "v1-7-5",
            title: "Plantilla 1: tu cuenta",
            type: "prompt-template",
            contentData: {
                heading: "Plantilla 1: instrucciones para toda tu cuenta",
                template: `Soy [abogado/a o notario/a] en [ciudad], Ecuador. Trabajo sobre todo en [materias].

Idioma y tono:
- Responde en español de Ecuador, registro profesional, con tuteo. Nunca voseo.
- Sin emojis. Prosa clara; usa listas solo para elementos separados y tablas para comparar.
- Primero la respuesta; el contexto después y solo si hace falta.

Crítica honesta:
- No me des la razón para complacerme. Si mi planteamiento tiene un error o un riesgo, dilo primero y explica por qué, con la norma o el hecho que lo sustenta.
- Si hay una opción mejor que la que pido, dímela antes de hacer lo que pedí.

Contra las alucinaciones:
- Si no sabes algo o no tienes la fuente, dilo. No inventes artículos, sentencias ni citas.
- Califica tu confianza (alta, media o baja) en cada afirmación jurídica.
- Declara los supuestos que hiciste.
- Cuando cites una norma o un fallo, da el número de artículo o de sentencia para que yo lo verifique en la fuente oficial.`,
                examples: ["Claude: Instructions for Claude", "ChatGPT: Custom instructions", "Gemini: información guardada"],
                tip: "Va en la configuración de tu cuenta: se aplica a todos tus chats."
            }
        },
        {
            id: "v1-7-6",
            title: "Plantilla 2: «Mi despacho»",
            type: "prompt-template",
            contentData: {
                heading: "Plantilla 2: instrucciones del Proyecto «Mi despacho»",
                template: `Contexto del despacho:
- Somos [nombre del despacho o notaría], en [ciudad], Ecuador. Atendemos [tipo de clientes y materias].
- Los documentos de este Proyecto son nuestras plantillas y las normas vigentes que usamos: [lista de archivos].

Cómo trabajar:
- Usa primero los documentos de este Proyecto. Si la respuesta no está en ellos, dilo y separa lo que viene de las fuentes de lo que viene de tu conocimiento general.
- Para cada punto jurídico, dame: la fuente exacta (artículo y cita textual de máximo dos líneas), tu nivel de confianza (alta, media o baja), lo que falta o no está claro, y tus supuestos.
- Si las fuentes no alcanzan, responde: "la información proporcionada es insuficiente para determinarlo".
- Los documentos de clientes llegan seudonimizados, con etiquetas como [COMPRADOR_1] o [CEDULA_VENDEDOR]. Conserva esas etiquetas tal cual y nunca intentes adivinar los datos reales.

Formato de entrega:
- [Por ejemplo: minutas con la estructura de nuestra plantilla; informes de máximo una página.]`,
                examples: ["Claude: instrucciones del Proyecto", "ChatGPT: instrucciones del Proyecto", "Gemini: instrucciones de un Gem"],
                tip: "Se aplica solo a los chats de este Proyecto. Aquí quedan fijas las reglas del prompt mejor del paso 3."
            }
        },
        {
            id: "v1-7-7",
            title: "Dónde se configura",
            type: "comparison",
            contentData: {
                heading: "Dónde se configura: cuenta, proyecto y carpeta",
                paragraph: "La cuenta se aplica a todos tus chats; el proyecto, solo a los suyos; la carpeta, a lo que un agente hace en ella. En Claude Code las instrucciones de usuario y de proyecto se suman. CLAUDE.md lo vemos a fondo en la Virtual 4. Menús con su nombre en inglés.",
                headers: ["IA", "Cuenta entera", "Proyecto o asistente", "Carpeta (agentes)"],
                rows: [
                    ["Claude", "Settings → Instructions for Claude", "Dentro del Proyecto: sus instrucciones", "Claude Code: ~/.claude/CLAUDE.md (el tuyo) y CLAUDE.md en la carpeta del proyecto"],
                    ["ChatGPT", "Settings → Personalization → Custom instructions", "Dentro del Proyecto: sus instrucciones", "Codex: AGENTS.md en ~/.codex, en la raíz del repositorio o en sus subcarpetas"],
                    ["Gemini", "Settings → información guardada (gemini.google.com/saved-info)", "Un Gem: Explorar Gems → New Gem (solo en la web)", "No aplica"]
                ]
            }
        },
        {
            id: "v1-7-8",
            title: "Ejercicio: crea «Mi despacho»",
            type: "exercise-interactive",
            contentData: {
                heading: "Crea tu Proyecto «Mi despacho» y ponlo a prueba",
                instructions: "Arma el Proyecto en Claude o en ChatGPT y hazle una consulta real de tu práctica. Después verifica la respuesta contra la fuente oficial.",
                duration: "10 minutos",
                steps: [
                    "1. Crea el Proyecto «Mi despacho»",
                    "2. Pídele que te entreviste, una pregunta a la vez, y que redacte tus instrucciones con la plantilla 2",
                    "3. Sube el texto oficial de una norma que uses a diario",
                    "4. Hazle una consulta real, sin datos de clientes",
                    "5. Verifica una cita contra la fuente oficial",
                    "6. Sube a la galería tu consulta, la respuesta y lo que encontraste al verificar"
                ],
                sampleInput: "Con base únicamente en el Código Civil que está en este Proyecto: ¿desde cuándo se cuenta el plazo de prescripción de una acción ejecutiva? Dame el artículo, la cita textual y tu nivel de confianza.",
                tip: "Si la IA acierta, igual verifica. Si falla, eso es lo que más le sirve al grupo en la galería."
            },
            interaction: {
                type: "GallerySubmit",
                data: {
                    exerciseId: "v1-mi-despacho",
                    moduleId: "v1-virtual-1",
                    promptLabel: "Tu consulta",
                    resultLabel: "La respuesta y lo que encontraste al verificar",
                    allowImage: true
                }
            }
        },
        {
            id: "v1-7-9",
            title: "Galería",
            type: "gallery-view",
            contentData: {
                heading: "Galería: respuestas verificadas",
                description: "Lo que obtuvo el grupo y lo que encontró al verificar.",
                exerciseId: "v1-mi-despacho",
                moduleId: "v1-virtual-1"
            },
            interaction: {
                type: "GalleryDisplay",
                data: { showAll: true, showHighlighted: false }
            }
        },
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
        },
        {
            id: "v1-8-1",
            title: "Lo que te llevas hoy",
            type: "summary",
            contentData: {
                heading: "Lo que te llevas hoy",
                bullets: [
                    "Delegación: la IA hace borradores y ordena; la conclusión y la firma son tuyas.",
                    "Descripción: tus reglas fijas van una sola vez, en la cuenta y en el Proyecto «Mi despacho».",
                    "Discernimiento: pide la cita, contrasta con la fuente oficial y pasa el checklist.",
                    "Diligencia: seudonimiza en tu computadora antes de subir; el semáforo te dice a dónde va cada dato."
                ],
                callToAction: "Virtual 2 · jueves 15 de octubre: anonimiza tu contrato y revísalo con IA"
            }
        },
        {
            id: "v1-8-2",
            title: "Tarea para la Virtual 2",
            type: "next-steps",
            contentData: {
                heading: "Tarea para la Virtual 2",
                steps: [
                    { day: "Hoy", action: "Termina tu Proyecto «Mi despacho»", tip: "Pídele que te entreviste y redacte tus instrucciones con la plantilla 2; pruébalo con una consulta que puedas verificar." },
                    { day: "Antes del jueves", action: "Baja el Anonimizador del enlace de Drive, comprueba que abre y elige un contrato propio en .docx", tip: "No lo subas a ninguna IA todavía." },
                    { day: "Jueves 15 oct", action: "Trae el contrato .docx sin anonimizar", tip: "Lo anonimizamos juntos al empezar y con él haces la matriz de riesgos." }
                ],
                challenge: "Elige un contrato con dos partes o más y datos como cédulas, RUC o direcciones."
            }
        },
        {
            id: "v1-8-3",
            title: "Materiales de la sesión",
            type: "resources-download",
            contentData: {
                heading: "Materiales de la sesión",
                resources: [
                    { title: "Checklist de verificación", type: "MD", description: "Una página para revisar cada respuesta antes de entregarla.", downloadUrl: "/materiales/checklist-verificacion.md", icon: "CheckSquare" },
                    { title: "Tutorial: cómo evitar que la IA alucine", type: "MD", description: "El recorrido completo, con los tres prompts y las fuentes oficiales.", downloadUrl: "/materiales/tutorial-evitar-alucinaciones.md", icon: "BookOpen" },
                    { title: "Semáforo de confidencialidad", type: "MD", description: "Qué dato va a qué nivel de protección, con ejemplos notariales y de abogacía.", downloadUrl: "/materiales/semaforo-confidencialidad.md", icon: "FileText" },
                    { title: "Instrucciones personalizadas", type: "MD", description: "Plantillas para tu cuenta y tu despacho, y dónde pegarlas en cada IA.", downloadUrl: "/materiales/instrucciones-personalizadas.md", icon: "Sparkles" },
                    { title: "Tarea para la Virtual 2", type: "MD", description: "Elige tu contrato y prueba el Anonimizador.", downloadUrl: "/materiales/tarea-virtual-2.md", icon: "Package" }
                ]
            }
        }
    ]
};

export default VIRTUAL_1;
