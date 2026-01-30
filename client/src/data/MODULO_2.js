import React from 'react';
import { MessageSquare, Lightbulb, AlertTriangle, Target, Sparkles, RefreshCw, HelpCircle, Wand2, Copy, CheckCircle } from "lucide-react";

export const MODULE_2 = {
    id: "module-2",
    title: "Módulo 2: El Arte del Prompting (45 min)",
    icon: MessageSquare,
    slides: [
        // --- SLIDE 2-0: PORTADA DEL MÓDULO ---
        {
            id: "2-0",
            title: "El Arte del Prompting",
            type: "hero",
            contentData: {
                heading: "El Arte del Prompting",
                paragraph: "Tu capacidad de comunicarte con la IA determina la calidad de sus respuestas. Aprende a hablar su idioma.",
                image: "/images/prompting-hero.png"
            }
        },

        // --- SLIDE 2-1: INTRODUCCIÓN AL PROBLEMA ---
        {
            id: "2-1",
            title: "El Problema Real",
            type: "comparison",
            contentData: {
                heading: "¿Por qué la IA no me entiende?",
                paragraph: "La diferencia entre un resultado mediocre y uno extraordinario está en cómo preguntas.",
                headers: ["Prompt Débil", "Prompt Fuerte"],
                rows: [
                    ["Revisa este contrato", "Actúa como abogado especialista en arrendamientos en Ecuador..."],
                    ["Escribe un correo", "Necesito cobrar $500 a un cliente que históricamente paga bien..."],
                    ["Dame ideas", "Genera 5 ideas para reducir tiempos de espera en mi notaría..."]
                ]
            }
        },

        // --- SLIDE 2-2: LA FÓRMULA R.C.T.F. ---
        {
            id: "2-2",
            title: "La Fórmula Maestra: R.C.T.F.",
            type: "concept",
            contentData: {
                heading: "ROL + CONTEXTO + TAREA + FORMATO",
                paragraph: "Esta estructura funciona en TODAS las IAs. Memorízala.",
                image: "/images/rctf-formula.png",
                bullets: [
                    "🎭 ROL: ¿Quién es la IA? (Experto, editor, abogado...)",
                    "📋 CONTEXTO: ¿Qué está pasando? (Situación, audiencia, restricciones)",
                    "✅ TAREA: ¿Qué debe hacer? (Verbo claro y específico)",
                    "📐 FORMATO: ¿Cómo lo quieres? (Tabla, lista, párrafo, longitud)"
                ]
            }
        },

        // --- SLIDE 2-3: DESGLOSE DE LA FÓRMULA ---
        {
            id: "2-3",
            title: "Desglose de R.C.T.F.",
            type: "table-detail",
            contentData: {
                heading: "Cada elemento tiene un propósito",
                columns: ["Elemento", "Qué es", "Ejemplo"],
                rows: [
                    ["ROL", "Quién es la IA en esta conversación", "\"Actúa como un editor senior de textos legales\""],
                    ["CONTEXTO", "Información específica relevante", "\"El contrato es de arrendamiento comercial en Ecuador\""],
                    ["TAREA", "Qué necesitas que haga (verbo claro)", "\"Revisa e identifica cláusulas faltantes\""],
                    ["FORMATO", "Cómo quieres la respuesta", "\"Presenta los hallazgos en una tabla\""]
                ]
            }
        },

        // --- SLIDE 2-4: PROMPT BUILDER INTERACTIVO ---
        {
            id: "2-4",
            title: "Constructor de Prompts",
            type: "interactive",
            interaction: {
                type: "PromptBuilder",
                data: {
                    templateString: "Actúa como [Rol]. Teniendo en cuenta este contexto: [Contexto]. Tu tarea es [Tarea]. Por favor entrega el resultado en formato [Formato].",
                    placeholders: {
                        Rol: "abogado experto en derecho notarial con 20 años de experiencia",
                        Contexto: "un cliente desea realizar una donación de un inmueble a su hijo menor de edad",
                        Tarea: "explicar los requisitos y prohibiciones legales aplicables",
                        Formato: "lista numerada con lenguaje claro para el cliente"
                    }
                }
            }
        },

        // --- SLIDE 2-5: TÉCNICA 1 - ASIGNAR ROL ---
        {
            id: "2-5",
            title: "Técnica 1: Asignar un Rol",
            type: "technique",
            contentData: {
                heading: "Dale una identidad a la IA",
                icon: "UserCircle",
                paragraph: "Cuando asignas un rol, la IA adopta el vocabulario, perspectiva y nivel de detalle de ese experto.",
                examples: [
                    {
                        label: "Ejemplo 1",
                        text: "\"Eres un experto en contratos mercantiles con 20 años de experiencia en Ecuador...\""
                    },
                    {
                        label: "Ejemplo 2", 
                        text: "\"Actúa como un redactor publicitario que escribe para redes sociales...\""
                    },
                    {
                        label: "Ejemplo 3",
                        text: "\"Eres mi asistente ejecutivo. Conoces mi agenda, mis prioridades y mi estilo de comunicación...\""
                    }
                ],
                tip: "Mientras más específico el rol, mejor el resultado. 'Abogado' < 'Abogado notarial ecuatoriano'"
            }
        },

        // --- SLIDE 2-6: TÉCNICA 2 - CONTEXTO ESPECÍFICO ---
        {
            id: "2-6",
            title: "Técnica 2: Dar Contexto Específico",
            type: "technique",
            contentData: {
                heading: "La IA no lee mentes",
                icon: "FileText",
                paragraph: "Sin contexto, la IA llena los vacíos con suposiciones genéricas. Con contexto, personaliza.",
                examples: [
                    {
                        label: "Sin contexto ❌",
                        text: "\"Escribe un correo para cobrar una deuda\""
                    },
                    {
                        label: "Con contexto ✅",
                        text: "\"El documento es para un cliente VIP que siempre ha pagado a tiempo. Se atrasó 3 meses por problemas personales. Quiero mantener la relación pero ser firme. Tono: profesional pero empático.\""
                    }
                ],
                tip: "Incluye: audiencia, propósito, tono deseado, restricciones, historia relevante"
            }
        },

        // --- SLIDE 2-7: TÉCNICA 3 - FORMATO DE SALIDA ---
        {
            id: "2-7",
            title: "Técnica 3: Pedir Formato de Salida",
            type: "technique",
            contentData: {
                heading: "Controla cómo recibes la información",
                icon: "Layout",
                paragraph: "El mismo contenido puede presentarse de formas muy diferentes. Tú decides cuál te sirve más.",
                examples: [
                    {
                        label: "Tabla",
                        text: "\"Responde en formato de tabla con columnas: Problema | Ubicación | Sugerencia\""
                    },
                    {
                        label: "Lista",
                        text: "\"Usa viñetas con máximo 2 oraciones cada una\""
                    },
                    {
                        label: "Estructura",
                        text: "\"Estructura: Resumen (2 líneas), Análisis (5 puntos), Recomendación (1 párrafo)\""
                    }
                ],
                tip: "También puedes pedir: código, JSON, Markdown, correo electrónico, guión, etc."
            }
        },

        // --- SLIDE 2-8: TÉCNICA 4 - FEW-SHOT (EJEMPLOS) ---
        {
            id: "2-8",
            title: "Técnica 4: Few-Shot (Dar Ejemplos)",
            type: "technique",
            contentData: {
                heading: "Muéstrale lo que quieres",
                icon: "Copy",
                paragraph: "En lugar de explicar, muestra. Un ejemplo vale más que mil instrucciones.",
                codeBlock: {
                    title: "Plantilla Few-Shot",
                    code: `Aquí hay un ejemplo del estilo que busco:

ENTRADA: "El cliente llegó tarde"
SALIDA: "El compareciente se presentó posterior a la hora acordada"

Ahora, transforma este texto al mismo estilo formal:
[Tu texto aquí]`
                },
                tip: "Útil para: estilos de redacción, formatos específicos, transformaciones de texto"
            }
        },

        // --- SLIDE 2-9: TÉCNICA 5 - MÉTODO SOCRÁTICO ---
        {
            id: "2-9",
            title: "Técnica 5: Método Socrático",
            type: "technique",
            contentData: {
                heading: "Haz que la IA pregunte ANTES de actuar",
                icon: "HelpCircle",
                paragraph: "Esta técnica evita respuestas genéricas. La IA pregunta primero para entender exactamente qué necesitas.",
                codeBlock: {
                    title: "Prompt Socrático",
                    code: `Antes de responder, hazme 3-5 preguntas 
para entender mejor lo que necesito. 

Espera mis respuestas antes de continuar.`
                },
                highlight: { 
                    type: "success", 
                    text: "Resultado: La IA personaliza su respuesta basándose en TUS respuestas específicas" 
                },
                tip: "Ideal cuando no sabes exactamente qué pedir o el tema es complejo"
            }
        },

        // --- SLIDE 2-10: TÉCNICA 6 - PREGUNTAS UNA A UNA ---
        {
            id: "2-10",
            title: "Técnica 6: Entrevista Guiada",
            type: "technique",
            contentData: {
                heading: "\"Pregúntame una a una\"",
                icon: "MessageSquare",
                paragraph: "Variante del método socrático: la IA hace UNA pregunta, espera tu respuesta, y luego hace la siguiente. Máximo control.",
                codeBlock: {
                    title: "Prompt de Entrevista Guiada",
                    code: `Necesito tu ayuda para [tarea].

Hazme preguntas UNA A UNA para entender 
exactamente lo que necesito. 

Espera mi respuesta antes de hacer 
la siguiente pregunta.

Cuando tengas al menos 95% de claridad 
sobre mi necesidad, dime "Listo, ya 
entiendo tu caso" y procede con la tarea.`
                },
                tip: "Perfecto para: diagnósticos, análisis de casos, redacción de documentos complejos"
            }
        },

        // --- SLIDE 2-11: TÉCNICA 7 - META-PROMPTING ---
        {
            id: "2-11",
            title: "Técnica 7: Meta-Prompting",
            type: "technique-advanced",
            contentData: {
                heading: "Usa la IA para crear prompts",
                icon: "Wand2",
                paragraph: "¿No sabes cómo preguntar? Pídele a la IA que te ayude a formular la mejor pregunta posible.",
                codeBlock: {
                    title: "Meta-Prompt",
                    code: `Eres un experto en ingeniería de prompts.

Mi objetivo es: [describe tu objetivo]

Genera el MEJOR prompt posible para lograr 
este objetivo. El prompt debe incluir:
- Rol específico para la IA
- Contexto necesario
- Tarea clara con verbos de acción
- Formato de salida deseado
- Restricciones o consideraciones especiales

Dame el prompt listo para copiar y usar.`
                },
                highlight: { 
                    type: "info", 
                    text: "Tip Pro: Puedes alimentar a NotebookLM con guías de prompting y pedirle que genere el mega-prompt perfecto" 
                }
            }
        },

        // --- SLIDE 2-12: TÉCNICA 8 - ITERACIÓN ---
        {
            id: "2-12",
            title: "Técnica 8: Iteración Guiada",
            type: "technique",
            contentData: {
                heading: "La primera respuesta NUNCA es la final",
                icon: "RefreshCw",
                paragraph: "Trata las respuestas de la IA como borradores. Refina, ajusta, mejora.",
                examples: [
                    {
                        label: "Iteración 1",
                        text: "\"Dame una primera versión. Luego te daré feedback para mejorarla.\""
                    },
                    {
                        label: "Iteración 2",
                        text: "\"Bien, pero hazlo más formal y reduce a la mitad.\""
                    },
                    {
                        label: "Iteración 3",
                        text: "\"Perfecto. Ahora agrega una introducción de 2 líneas.\""
                    }
                ],
                tip: "Mentalidad: La IA es un colaborador, no una máquina expendedora de respuestas"
            }
        },

        // --- SLIDE 2-13: ERRORES COMUNES ---
        {
            id: "2-13",
            title: "Errores Comunes",
            type: "warning-table",
            contentData: {
                heading: "Lo que debes evitar",
                columns: ["Error", "Por qué falla", "Solución"],
                rows: [
                    ["Prompts vagos", "La IA llena vacíos con suposiciones", "Sé específico"],
                    ["No dar contexto", "La IA no sabe para qué es", "Explica el propósito"],
                    ["Esperar perfección", "La 1ra respuesta rara vez es la mejor", "Itera y refina"],
                    ["No verificar", "Las alucinaciones pasan desapercibidas", "Siempre verifica datos críticos"],
                    ["El 'loop infinito'", "Pedir cambios sin dirección clara", "Si tienes 80%, termina tú el 20%"]
                ]
            }
        },

        // --- SLIDE 2-14: WORK SLOP ---
        {
            id: "2-14",
            title: "Evita el 'Work Slop'",
            type: "warning",
            contentData: {
                heading: "No seas un copypaster",
                paragraph: "Work Slop = Contenido genérico y de mala calidad generado por copiar y pegar lo que dice la IA sin editar ni personalizar.",
                bullets: [
                    "🚫 Copiar/pegar sin leer",
                    "🚫 No agregar tu criterio profesional",
                    "🚫 Entregar el primer borrador",
                    "🚫 No adaptar al contexto específico"
                ],
                highlight: { 
                    type: "danger", 
                    text: "Tu trabajo es agregar criterio, no solo hacer clic. La IA es el asistente, TÚ eres el profesional." 
                }
            }
        },

        // --- SLIDE 2-15: ENCUESTA DE PRÁCTICA ---
        {
            id: "2-15",
            title: "¿Qué técnica te parece más útil?",
            type: "poll",
            interaction: {
                type: "LivePoll",
                data: {
                    id: "poll-tecnicas",
                    question: "¿Qué técnica vas a implementar primero?",
                    options: [
                        "R.C.T.F. (La fórmula básica)",
                        "Método Socrático (Que pregunte primero)",
                        "Entrevista Guiada (Una pregunta a la vez)",
                        "Meta-Prompting (IA que crea prompts)"
                    ]
                }
            }
        },

        // --- SLIDE 2-16: EJERCICIO PRÁCTICO ---
        {
            id: "2-16",
            title: "🎯 Ejercicio: Transforma este prompt",
            type: "exercise",
            contentData: {
                heading: "De débil a fuerte",
                instructions: "Tienes 3 minutos. Abre tu IA favorita y transforma este prompt débil en uno fuerte usando R.C.T.F.",
                promptWeak: "Escribe un correo para mi jefe pidiendo vacaciones",
                hints: [
                    "¿Qué rol debería tener la IA?",
                    "¿Qué contexto le falta? (relación, fechas, motivo)",
                    "¿La tarea es clara?",
                    "¿Qué formato prefieres?"
                ],
                sampleStrong: "Actúa como experto en comunicación corporativa. Contexto: Soy empleado hace 3 años, buena relación con mi jefe, quiero 2 semanas en marzo para un viaje familiar. Mi jefe valora la planificación y no le gustan las sorpresas. Tarea: Redacta un correo solicitando vacaciones que sea profesional pero cálido. Formato: Correo breve (máximo 150 palabras) con asunto incluido."
            }
        },

        // --- SLIDE 2-17: RESUMEN DEL MÓDULO ---
        {
            id: "2-17",
            title: "Resumen: Módulo 2",
            type: "summary",
            contentData: {
                heading: "Lo que aprendiste",
                bullets: [
                    "✅ La fórmula R.C.T.F. (Rol + Contexto + Tarea + Formato)",
                    "✅ Método Socrático: Haz que la IA pregunte primero",
                    "✅ Entrevista Guiada: Una pregunta a la vez",
                    "✅ Meta-Prompting: Usa la IA para crear mejores prompts",
                    "✅ Iteración: La primera respuesta es solo el borrador",
                    "✅ Evita el Work Slop: Agrega tu criterio siempre"
                ],
                callToAction: "Siguiente: Conocerás las herramientas específicas para cada tipo de tarea →"
            }
        }
    ]
};

export default MODULE_2;
