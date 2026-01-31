import React from 'react';
import { MessageSquare, Lightbulb, AlertTriangle, Target, Sparkles, RefreshCw, HelpCircle, Wand2, Copy, CheckCircle, Edit3 } from "lucide-react";

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

        // --- SLIDE 2-9: TÉCNICA 5 - HAZ QUE LA IA PREGUNTE PRIMERO ---
        {
            id: "2-9",
            title: "Técnica 5: Haz que la IA pregunte primero",
            type: "technique",
            contentData: {
                heading: "Haz que la IA pregunte ANTES de actuar",
                icon: "HelpCircle",
                paragraph: "Esta técnica evita respuestas genéricas. La IA pregunta primero para entender exactamente qué necesitas.",
                examples: [
                    {
                        label: "Variante 1: Método Socrático (3-5 preguntas)",
                        text: "Antes de responder, hazme 3-5 preguntas para entender mejor lo que necesito. Espera mis respuestas antes de continuar."
                    },
                    {
                        label: "Variante 2: Entrevista Guiada (una a una)",
                        text: "Hazme preguntas UNA A UNA para entender exactamente lo que necesito. Espera mi respuesta antes de hacer la siguiente pregunta. Cuando tengas al menos 95% de claridad sobre mi necesidad, dime 'Listo, ya entiendo tu caso' y procede con la tarea."
                    }
                ],
                highlight: { 
                    type: "success", 
                    text: "Resultado: La IA personaliza su respuesta basándose en TUS respuestas específicas" 
                },
                tip: "Ideal cuando no sabes exactamente qué pedir o el tema es complejo. Perfecto para diagnósticos, análisis de casos, redacción de documentos complejos."
            }
        },

        // --- SLIDE 2-10: TÉCNICA 6 - META-PROMPTING ---
        {
            id: "2-10",
            title: "Técnica 6: Meta-Prompting",
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

        // --- SLIDE 2-11: TÉCNICA 7 - ITERACIÓN ---
        {
            id: "2-11",
            title: "Técnica 7: Iteración Guiada",
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

        // --- SLIDE 2-14e: ENCUESTA DE PRÁCTICA (movida después de la técnica 7) ---
        {
            id: "2-14e",
            title: "¿Qué técnica te parece más útil?",
            type: "poll",
            interaction: {
                type: "LivePoll",
                data: {
                    id: "poll-tecnicas",
                    question: "Después de practicar: ¿qué técnica vas a usar más?",
                    options: [
                        "R.C.T.F. (La fórmula básica)",
                        "Método Socrático (Que pregunte primero)",
                        "Entrevista Guiada (Una pregunta a la vez)",
                        "Meta-Prompting (IA que crea prompts)"
                    ]
                }
            }
        },

        // --- SLIDE 2-14d: EJERCICIO PRÁCTICO R.C.T.F. (movido después de la encuesta) ---
        {
            id: "2-14d",
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
            },
            interaction: {
                type: "gallery",
                data: {
                    exerciseId: "mod2-ejercicio-prompt",
                    moduleId: "module-2",
                    showAIModel: true,
                    promptLabel: "Tu prompt mejorado (R.C.T.F.)",
                    resultLabel: "El resultado que obtuviste"
                }
            }
        },

        // --- GALERÍA EJERCICIO 1: PROMPTS MEJORADOS ---
        {
            id: "2-14f",
            title: "🖼️ Galería: Prompts Mejorados",
            type: "gallery-view",
            contentData: {
                heading: "Prompts del Grupo",
                description: "Los prompts mejorados con R.C.T.F. que compartieron tus compañeros.",
                exerciseId: "mod2-ejercicio-prompt"
            },
            interaction: {
                type: "GalleryDisplay",
                data: {
                    showAll: true,
                    showHighlighted: false
                }
            }
        },

        // --- SLIDE 2-12: ERRORES COMUNES ---
        {
            id: "2-12",
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

        // --- SLIDE 2-13: WORK SLOP ---
        {
            id: "2-13",
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

        // --- SLIDE 2-14: TEXTOS QUE HUELEN A IA ---
        {
            id: "2-14",
            title: "El Problema: Textos que 'Huelen' a IA",
            type: "hero",
            contentData: {
                heading: "¿Por qué detectan cuando usas IA?",
                paragraph: "La IA genera contenido útil, pero tiene patrones reconocibles. Aprender a identificarlos te permitirá crear textos más auténticos y humanos.",
                image: "/images/ia_texto_huele.png"
            }
        },

        // --- SLIDE 2-14a: LOS 4 PILARES ---
        {
            id: "2-14a",
            title: "Los 4 Pilares del Problema",
            type: "comparison",
            contentData: {
                heading: "¿Qué hace que un texto 'huela' a IA?",
                paragraph: "Cuatro señales de alerta que debes conocer:",
                headers: ["🤖 Predecible", "👁️ Detectable"],
                rows: [
                    [
                        "Estructuras repetitivas y frases genéricas que la IA usa por defecto. Siempre empieza igual.",
                        "Lectores experimentados reconocen los patrones inmediatamente. Lo notan al instante."
                    ],
                    [
                        "✨ Humanizable: No es engañar, es adaptar el contenido a tu voz personal. Hazlo tuyo.",
                        "🎯 El Equilibrio: Mantén la eficiencia de la IA con la autenticidad humana. Lo mejor de ambos mundos."
                    ]
                ]
            }
        },

        // --- SLIDE 2-14b: PROMPTS PARA IMÁGENES ---
        {
            id: "2-14b",
            title: "🎨 Prompts para Generación de Imágenes",
            type: "technique",
            contentData: {
                heading: "Describe imágenes como un director de fotografía",
                icon: "Lightbulb",
                paragraph: "Las IAs de imagen (Midjourney, DALL-E, Leonardo, Flux, NanoBanana, Kimi 2.5) necesitan descripciones técnicas precisas. Cuanto más específico seas con términos fotográficos, mejor el resultado.",
                examples: [
                    {
                        label: "📸 Sujeto y Encuadre",
                        text: "Piensa como un fotógrafo: sujeto, encuadre, lente, iluminación"
                    },
                    {
                        label: "🎨 Estilo Artístico",
                        text: "Fotorealista, cinematográfico, ilustración, 3D"
                    },
                    {
                        label: "💡 Iluminación",
                        text: "Hora del día, fuentes de luz, sombras, calidad de luz"
                    },
                    {
                        label: "🎯 Detalles Técnicos",
                        text: "Apertura, tipo de lente, profundidad de campo"
                    }
                ],
                tip: "Cuanto más específico seas con términos técnicos de fotografía, mejor el resultado."
            }
        },

        // --- SLIDE 2-14c: ANATOMÍA DEL PROMPT DE IMAGEN ---
        {
            id: "2-14c",
            title: "Fórmula de Descripción Visual",
            type: "table-detail",
            contentData: {
                heading: "Estructura profesional para describir imágenes",
                paragraph: "Sigue este orden para resultados consistentes:",
                columns: ["Elemento", "Qué describir", "Ejemplos útiles"],
                rows: [
                    ["👤 SUJETO", "Persona/objeto principal + acción + atributos", "Abogado de 40 años, traje azul marino, revisando documentos con expresión concentrada"],
                    ["📍 ENTORNO/LUGAR", "Ubicación, ambiente, época, detalles del set", "Oficina moderna en Quito, ventana con vista a la ciudad, escritorio de madera oscura"],
                    ["🧍 POSTURA/POSE", "Posición del cuerpo, gesto, interacción", "Sentado erguido, una mano sosteniendo pluma, mirando hacia abajo"],
                    ["💡 ILUMINACIÓN", "Tipo de luz, dirección, calidad, hora", "Luz natural suave por ventana lateral, golden hour, sombras suaves"],
                    ["📷 CÁMARA/LENTE", "Tipo de lente, distancia focal, apertura", "Lente 85mm f/1.8, plano medio, fondo desenfocado (bokeh)"],
                    ["🎨 ESTILO/CALIDAD", "Técnica artística, resolución, referencias", "Fotografía editorial, colores cálidos, alta resolución 8K, detalle nítido"]
                ]
            }
        },

        // --- SLIDE 2-15: EJEMPLOS COMPARADOS ---
        {
            id: "2-15",
            title: "Ejemplos: De básico a profesional",
            type: "comparison",
            contentData: {
                heading: "Compara la diferencia",
                paragraph: "Mismo concepto, diferente nivel de detalle técnico:",
                headers: ["❌ Básico (resultado aleatorio)", "✅ Profesional (resultado controlado)"],
                rows: [
                    [
                        "Un abogado en su oficina",
                        "Abogado ecuatoriano de 45 años, traje gris charcoal, sentado en escritorio de nogal, revisando contratos con expresión concentrada, oficina moderna con librero de fondo, luz natural entrando por ventana grande a la izquierda (luz de ventana lateral), lente 85mm f/1.8, plano medio, fondo desenfocado bokeh suave, fotografía editorial, colores cálidos terrosos, alta resolución 8K"
                    ],
                    [
                        "Retrato de mujer ejecutiva",
                        "Mujer ejecutiva latina de 35 años, cabello castaño en corte bob, blazer azul marino, posición de poder con brazos ligeramente cruzados, mirada confiada directo a cámara, fondo de oficina corporativa desenfocado, iluminación de estudio con beauty dish frontal y luz de relleno suave, lente 50mm f/2.8, primer plano, fotografía de retrato corporativo, tonos neutros profesionales, piel con textura natural, 4K nítido"
                    ]
                ]
            }
        },

        // --- SLIDE 2-16: PLANTILLA DE PROMPT ---
        {
            id: "2-16",
            title: "📝 Plantilla para Copiar",
            type: "technique",
            contentData: {
                heading: "Fórmula lista para usar",
                icon: "Wand2",
                paragraph: "Completa cada sección entre corchetes:",
                codeBlock: {
                    title: "Template de Prompt de Imagen",
                    code: `[SUJETO]: [descripción detallada de persona/objeto + qué está haciendo + atributos físicos]

[ENTORNO]: [lugar específico + detalles del ambiente + elementos de fondo]

[POSTURA]: [posición corporal + gesto + expresión facial + dirección de mirada]

[ILUMINACIÓN]: [tipo de luz + dirección + hora del día + calidad + sombras]

[CÁMARA]: [tipo de lente + distancia focal + apertura + tipo de plano + profundidad de campo]

[ESTILO]: [técnica artística + referencias fotográficas + paleta de colores + resolución]`
                },
                tip: "Copia esta estructura en un documento y llénala antes de generar cada imagen."
            }
        },

        // --- SLIDE 2-17: CONSTRUCTOR DE PROMPTS DE IMAGEN (CORREGIDO) ---
        {
            id: "2-17",
            title: "🎯 Constructor de Prompts de Imagen",
            type: "interactive",
            interaction: {
                type: "PromptBuilder",
                data: {
                    templateString: "[Sujeto], [Entorno], [Postura/Pose], [Iluminación], [Cámara/Lente], [Estilo/Calidad]",
                    placeholders: {
                        Sujeto: "abogado ecuatoriano de 45 años, traje gris charcoal, revisando documentos con concentración",
                        Entorno: "oficina moderna en Quito, escritorio de nogal, librero con libros de derecho al fondo",
                        "Postura/Pose": "sentado erguido, una mano sosteniendo pluma, mirada enfocada en los papeles",
                        Iluminación: "luz natural suave entrando por ventana grande a la izquierda, golden hour, sombras suaves",
                        "Cámara/Lente": "lente 85mm f/1.8, plano medio, fondo desenfocado bokeh",
                        "Estilo/Calidad": "fotografía editorial, colores cálidos terrosos, alta resolución 8K, detalle nítido"
                    },
                    labels: {
                        Sujeto: "👤 Sujeto (quién + qué hace + atributos)",
                        Entorno: "📍 Entorno (lugar + detalles del fondo)",
                        "Postura/Pose": "🧍 Postura/Pose (posición + gesto + expresión)",
                        Iluminación: "💡 Iluminación (tipo + dirección + hora)",
                        "Cámara/Lente": "📷 Cámara/Lente (lente + plano + profundidad)",
                        "Estilo/Calidad": "🎨 Estilo/Calidad (técnica + colores + resolución)"
                    }
                }
            }
        },

        // --- SLIDE 2-18: INSTRUCCIONES DEL EJERCICIO ---
        {
            id: "2-18",
            title: "📋 Instrucciones del Ejercicio",
            type: "setup-guide",
            contentData: {
                heading: "¿Cómo completar el ejercicio?",
                steps: [
                    {
                        step: "1",
                        title: "Genera tu prompt",
                        description: "Usa el constructor (slide anterior) para generar tu prompt profesional"
                    },
                    {
                        step: "2",
                        title: "Copia el resultado",
                        description: "Copia el prompt resultante al portapapeles"
                    },
                    {
                        step: "3",
                        title: "Abre tu herramienta IA",
                        description: "Abre Gemini, Kimi, Leonardo AI, DALL-E o tu herramienta favorita"
                    },
                    {
                        step: "4",
                        title: "Genera la imagen",
                        description: "Pega el prompt y genera la imagen"
                    },
                    {
                        step: "5",
                        title: "Descarga tu creación",
                        description: "Descarga la imagen generada a tu dispositivo"
                    },
                    {
                        step: "6",
                        title: "Sube a la galería",
                        description: "Ve a la siguiente slide para subir tu creación a la galería"
                    }
                ],
                tip: "Guarda el prompt que generaste, lo necesitarás para subirlo a la galería."
            }
        },

        // --- SLIDE 2-20: ENVÍO A GALERÍA (movido después de 2-18) ---
        {
            id: "2-20",
            title: "📤 Sube tu Creación",
            type: "exercise-interactive",
            contentData: {
                heading: "Comparte tu imagen generada",
                instructions: "Sube la imagen que generaste con tu prompt. Los mejores serán destacados en la galería.",
                duration: "3 minutos",
                steps: [
                    "1. Descarga tu imagen generada",
                    "2. Copia el prompt completo que usaste",
                    "3. Completa el formulario de envío",
                    "4. ¡Listo! Tu imagen aparecerá en la galería"
                ]
            },
            interaction: {
                type: "GallerySubmit",
                data: {
                    exerciseId: "mod2-prompt-imagen",
                    moduleId: "module-2",
                    promptLabel: "📝 Tu prompt completo",
                    resultLabel: "🖼️ La imagen generada",
                    allowImage: true,
                    requireImage: true,
                    additionalFields: [
                        {
                            name: "tool",
                            label: "¿Qué herramienta usaste?",
                            type: "select",
                            options: ["Midjourney", "DALL-E 3", "Leonardo AI", "Adobe Firefly", "Ideogram", "Flux", "Otra"]
                        },
                        {
                            name: "satisfaction",
                            label: "¿Qué tan satisfecho estás con el resultado?",
                            type: "rating",
                            max: 5
                        }
                    ]
                }
            }
        },

        // --- GALERÍA EJERCICIO 2: IMÁGENES GENERADAS ---
        {
            id: "2-20b",
            title: "🖼️ Galería: Imágenes Generadas",
            type: "gallery-view",
            contentData: {
                heading: "Creaciones del Grupo",
                description: "Las imágenes y prompts que compartieron tus compañeros.",
                exerciseId: "mod2-prompt-imagen"
            },
            interaction: {
                type: "GalleryDisplay",
                data: {
                    showAll: true,
                    showHighlighted: false
                }
            }
        },

        // --- SLIDE 2-21: RESUMEN DEL MÓDULO ---
        {
            id: "2-21",
            title: "Resumen: Módulo 2",
            type: "summary",
            contentData: {
                heading: "Lo que aprendiste",
                bullets: [
                    "✅ La fórmula R.C.T.F. (Rol + Contexto + Tarea + Formato)",
                    "✅ Haz que la IA pregunte primero: Método Socrático o Entrevista Guiada",
                    "✅ Meta-Prompting: Usa la IA para crear mejores prompts",
                    "✅ Iteración: La primera respuesta es solo el borrador",
                    "✅ Evita el Work Slop: Agrega tu criterio siempre",
                    "✅ Prompts de imagen: Sujeto + Lugar + Postura + Iluminación + Cámara + Estilo"
                ],
                callToAction: "Siguiente: Conocerás las herramientas específicas para cada tipo de tarea →"
            }
        }
    ]
};

export default MODULE_2;
