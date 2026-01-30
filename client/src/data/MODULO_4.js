import React from 'react';
import { FlaskConical, Mail, Search, FileText, Languages, Wrench, Wand2, Users, Trophy, Coffee, CheckCircle, Star } from "lucide-react";

export const MODULE_4 = {
    id: "module-4",
    title: "Módulo 4: Taller Práctico (3-4 horas)",
    icon: FlaskConical,
    slides: [
        // --- SLIDE 4-0: PORTADA DEL MÓDULO ---
        {
            id: "4-0",
            title: "Taller Práctico",
            type: "hero",
            contentData: {
                heading: "Manos a la Obra",
                paragraph: "Es hora de aplicar todo lo aprendido. Resolveremos problemas reales juntos y compartiremos resultados.",
                image: "/images/taller-hero.png"
            }
        },

        // --- SLIDE 4-1: REGLAS DEL TALLER ---
        {
            id: "4-1",
            title: "Reglas del Juego",
            type: "rules",
            contentData: {
                heading: "Cómo funcionará el taller",
                rules: [
                    {
                        icon: "Clock",
                        title: "Tiempo por ejercicio",
                        description: "5-10 minutos por caso. Yo controlo el ritmo."
                    },
                    {
                        icon: "Share2",
                        title: "Comparte tu resultado",
                        description: "Al final de cada ejercicio, sube tu mejor prompt/resultado a la galería."
                    },
                    {
                        icon: "Trophy",
                        title: "Los mejores destacan",
                        description: "Seleccionaré los mejores ejemplos para mostrar al grupo."
                    },
                    {
                        icon: "HelpCircle",
                        title: "Pregunta sin miedo",
                        description: "No hay preguntas tontas. Todos estamos aprendiendo."
                    }
                ],
                tip: "Usa la herramienta que prefieras: ChatGPT, Claude, Gemini... ¡todas valen!"
            }
        },

        // =====================================================
        // CASO 1: COMUNICACIÓN DIFÍCIL
        // =====================================================
        {
            id: "4-2",
            title: "Caso 1: Comunicación Difícil",
            type: "case-intro",
            contentData: {
                caseNumber: 1,
                heading: "Correos que Nadie Quiere Escribir",
                icon: "Mail",
                color: "#E53E3E",
                description: "Cobrar deudas, rechazar propuestas, dar malas noticias... La IA puede ayudarte a encontrar el tono perfecto.",
                duration: "15 minutos",
                tools: ["ChatGPT", "Claude", "Gemini"]
            }
        },
        {
            id: "4-3",
            title: "Plantilla: Comunicación Difícil",
            type: "prompt-template",
            contentData: {
                heading: "Tu plantilla base",
                template: `Actúa como experto en comunicación asertiva y diplomacia profesional.

CONTEXTO:
- Mi rol: [tu posición]
- Destinatario: [quién es, relación]
- Situación: [qué pasó]

TAREA:
Necesito escribir un correo para [objetivo específico].

RESTRICCIONES:
- Debo mantener la relación profesional
- El tono debe ser [firme pero respetuoso / empático pero claro]
- No puedo [restricción específica]

FORMATO:
Dame 3 versiones:
1. Suave (prioriza la relación)
2. Neutra (balance)
3. Directa (prioriza el objetivo)`,
                examples: [
                    "Cobrar factura atrasada a cliente VIP",
                    "Rechazar propuesta de socio sin cerrar puertas",
                    "Informar retraso en entrega a cliente impaciente"
                ]
            }
        },
        {
            id: "4-4",
            title: "🎯 Ejercicio 1: Tu Correo Difícil",
            type: "exercise-interactive",
            contentData: {
                heading: "Escribe un correo que has estado evitando",
                instructions: "Piensa en un correo real que tengas pendiente. Usa la plantilla y genera 3 versiones.",
                duration: "10 minutos",
                steps: [
                    "1. Abre tu IA favorita",
                    "2. Adapta la plantilla a tu caso real",
                    "3. Genera las 3 versiones",
                    "4. Elige la mejor y ajústala",
                    "5. Sube tu resultado a la galería"
                ]
            },
            interaction: {
                type: "GallerySubmit",
                data: {
                    exerciseId: "caso-1-correo",
                    promptLabel: "Tu prompt",
                    resultLabel: "La mejor versión del correo",
                    allowImage: true
                }
            }
        },

        // =====================================================
        // CASO 2: INVESTIGACIÓN Y ANÁLISIS
        // =====================================================
        {
            id: "4-5",
            title: "Caso 2: Investigación y Análisis",
            type: "case-intro",
            contentData: {
                caseNumber: 2,
                heading: "Investiga como un Pro",
                icon: "Search",
                color: "#3182CE",
                description: "Comparar opciones, investigar temas, obtener información con fuentes verificables.",
                duration: "15 minutos",
                tools: ["Perplexity", "ChatGPT", "Gemini"]
            }
        },
        {
            id: "4-6",
            title: "Plantilla: Investigación",
            type: "prompt-template",
            contentData: {
                heading: "Tu plantilla base",
                template: `Actúa como un analista de [área] objetivo e imparcial.

CONTEXTO:
- Estoy evaluando [qué cosa]
- Mi necesidad específica es [para qué]
- Mi nivel de conocimiento es [principiante/intermedio/experto]

TAREA:
[Comparar X vs Y / Investigar X / Explicar X]

CRITERIOS IMPORTANTES PARA MÍ:
1. [Criterio 1]
2. [Criterio 2]
3. [Criterio 3]

FORMATO:
- Tabla comparativa con los criterios mencionados
- Pros y contras de cada opción
- Recomendación final justificada
- INCLUYE FUENTES (si usas Perplexity)`,
                examples: [
                    "Comparar software de gestión documental",
                    "Investigar requisitos legales para un trámite",
                    "Evaluar proveedores de un servicio"
                ]
            }
        },
        {
            id: "4-7",
            title: "🎯 Ejercicio 2: Tu Investigación",
            type: "exercise-interactive",
            contentData: {
                heading: "Investiga algo que necesites decidir",
                instructions: "Piensa en una decisión pendiente que requiera investigación. Usa Perplexity para obtener fuentes.",
                duration: "10 minutos",
                steps: [
                    "1. Abre Perplexity (perplexity.ai)",
                    "2. Adapta la plantilla a tu decisión real",
                    "3. Revisa las fuentes que cita",
                    "4. Compara con una búsqueda en Google",
                    "5. Sube tu hallazgo más interesante"
                ],
                tip: "Prueba preguntar lo mismo en ChatGPT y Perplexity. ¿Cuál te da mejor información?"
            },
            interaction: {
                type: "GallerySubmit",
                data: {
                    exerciseId: "caso-2-investigacion",
                    promptLabel: "Tu pregunta de investigación",
                    resultLabel: "El hallazgo más útil (con fuente)",
                    allowImage: true
                }
            }
        },

        // =====================================================
        // CASO 3: TRANSFORMAR DATOS CAÓTICOS
        // =====================================================
        {
            id: "4-8",
            title: "Caso 3: Transformar Datos Caóticos",
            type: "case-intro",
            contentData: {
                caseNumber: 3,
                heading: "Del Caos al Orden",
                icon: "FileText",
                color: "#38A169",
                description: "Notas desordenadas, transcripciones de reuniones, información dispersa... La IA puede estructurarlo todo.",
                duration: "15 minutos",
                tools: ["ChatGPT", "Claude", "Gemini"]
            }
        },
        {
            id: "4-9",
            title: "Plantilla: Organizar Caos",
            type: "prompt-template",
            contentData: {
                heading: "Tu plantilla base",
                template: `Actúa como mi asistente ejecutivo experto en organización.

CONTEXTO:
Aquí están mis notas desordenadas de [reunión/llamada/lluvia de ideas]:

"""
[Pegar notas aquí]
"""

TAREA:
1. Extrae los puntos clave organizados por tema
2. Identifica las tareas pendientes (quién, qué, cuándo)
3. Lista las decisiones que se tomaron
4. Señala los temas que quedaron sin resolver

FORMATO:
Usa encabezados claros y viñetas.
Las tareas deben estar en formato: 
[RESPONSABLE] - [TAREA] - [FECHA si se mencionó]`,
                examples: [
                    "Notas de una reunión con cliente",
                    "Lluvia de ideas para un proyecto",
                    "Transcripción de una llamada importante"
                ]
            }
        },
        {
            id: "4-10",
            title: "🎯 Ejercicio 3: Organiza tu Caos",
            type: "exercise-interactive",
            contentData: {
                heading: "Transforma notas reales en información útil",
                instructions: "Busca notas desordenadas que tengas (reunión, llamada, ideas). Si no tienes, usa el ejemplo que te daré.",
                duration: "10 minutos",
                sampleInput: `Reunión proyecto web - llamó juan dijo q el cliente quiere cambios en el logo, maria dice q ya está aprobado, hay q revisar contrato. Presupuesto: pendiente aprobar los 5000. Juan viaja el 15. Tema hosting sin resolver. Cliente quiere entrega para marzo pero maria dice imposible. Revisar con diseñador los colores. OJO: factura pendiente del mes pasado.`,
                steps: [
                    "1. Copia tus notas reales (o el ejemplo)",
                    "2. Usa la plantilla",
                    "3. Revisa si capturó todo correctamente",
                    "4. Ajusta lo que falte",
                    "5. Comparte el antes/después"
                ]
            },
            interaction: {
                type: "GallerySubmit",
                data: {
                    exerciseId: "caso-3-organizacion",
                    promptLabel: "Tus notas originales (caóticas)",
                    resultLabel: "Resultado organizado",
                    allowImage: true
                }
            }
        },

        // =====================================================
        // ☕ DESCANSO
        // =====================================================
        {
            id: "4-11",
            title: "☕ Descanso",
            type: "break",
            contentData: {
                heading: "Descanso 15 minutos",
                message: "Estira las piernas, toma agua, revisa tus mensajes. Volvemos con casos más avanzados.",
                image: "/images/coffee-break.png",
                nextPreview: "Siguiente: Aprendizaje de Idiomas con IA de Voz"
            }
        },

        // =====================================================
        // CASO 4: APRENDIZAJE DE IDIOMAS
        // =====================================================
        {
            id: "4-12",
            title: "Caso 4: Aprendizaje de Idiomas",
            type: "case-intro",
            contentData: {
                caseNumber: 4,
                heading: "Tu Tutor de Idiomas 24/7",
                icon: "Languages",
                color: "#805AD5",
                description: "Practica conversación en cualquier idioma con IA de voz. Sin vergüenza, sin límites de horario.",
                duration: "20 minutos",
                tools: ["Sesame.ai", "Gemini Live", "ChatGPT Voz"]
            }
        },
        {
            id: "4-13",
            title: "Herramientas de Voz para Idiomas",
            type: "tool-comparison-voice",
            contentData: {
                heading: "3 opciones para practicar",
                tools: [
                    {
                        name: "Sesame.ai",
                        icon: "Mic",
                        description: "Voces ultra-realistas con emociones",
                        pros: ["Voces más naturales del mercado", "Detecta tu nivel automáticamente", "Corrige pronunciación"],
                        cons: ["Requiere cuenta", "Puede tener esperas"],
                        bestFor: "Práctica intensiva de pronunciación",
                        url: "sesame.ai"
                    },
                    {
                        name: "Gemini Live",
                        icon: "Sparkles",
                        description: "Conversación fluida integrada en Gemini",
                        pros: ["Gratis con Gemini", "Muy fluido", "Contexto largo"],
                        cons: ["Solo en app móvil", "Menos enfocado en idiomas"],
                        bestFor: "Conversación general práctica",
                        url: "App Gemini"
                    },
                    {
                        name: "ChatGPT Voz",
                        icon: "MessageSquare",
                        description: "El modo voz de ChatGPT",
                        pros: ["Muy accesible", "Buena calidad", "Multiplataforma"],
                        cons: ["Requiere Plus para voz avanzada"],
                        bestFor: "Usuarios que ya tienen ChatGPT Plus",
                        url: "chat.openai.com"
                    }
                ]
            }
        },
        {
            id: "4-14",
            title: "Configuración: Sesame.ai",
            type: "setup-guide",
            contentData: {
                heading: "Cómo configurar Sesame.ai",
                tool: "Sesame.ai",
                steps: [
                    {
                        step: 1,
                        title: "Entra a sesame.ai",
                        description: "Abre el navegador y ve a sesame.ai"
                    },
                    {
                        step: 2,
                        title: "Permite el micrófono",
                        description: "El navegador te pedirá acceso al micrófono. Acepta."
                    },
                    {
                        step: 3,
                        title: "Elige una voz",
                        description: "Hay varias personalidades. Para idiomas, elige una nativa del idioma que quieres practicar."
                    },
                    {
                        step: 4,
                        title: "Dale contexto",
                        description: "Escribe o di: 'Quiero practicar inglés. Soy nivel intermedio. Corrige mis errores de pronunciación y gramática.'"
                    }
                ],
                tip: "Demo en vivo: Vamos a hacer una conversación corta en inglés"
            }
        },
        {
            id: "4-15",
            title: "Prompts para Práctica de Idiomas",
            type: "prompt-collection",
            contentData: {
                heading: "Prompts que funcionan",
                prompts: [
                    {
                        title: "Tutor estricto",
                        prompt: "Eres mi tutor de inglés. Nivel: intermedio. Vamos a conversar sobre [tema]. Corrige TODOS mis errores de gramática y pronunciación. Explica el error y la forma correcta. Habla solo en inglés.",
                        useCase: "Cuando quieres mejorar rápido"
                    },
                    {
                        title: "Conversación natural",
                        prompt: "Vamos a tener una conversación casual en inglés sobre [tema]. Si cometo errores graves, corrígeme sutilmente. Mantén la conversación fluida.",
                        useCase: "Cuando quieres ganar confianza"
                    },
                    {
                        title: "Roleplay situacional",
                        prompt: "Simula que eres [recepcionista de hotel / mesero / entrevistador de trabajo]. Yo soy el cliente/candidato. Vamos a practicar esta situación en inglés.",
                        useCase: "Prepararte para situaciones reales"
                    },
                    {
                        title: "Explicador de expresiones",
                        prompt: "Enséñame 5 expresiones idiomáticas en inglés sobre [tema]. Explica su significado, cuándo usarlas, y dame un ejemplo en contexto. Luego hazme practicarlas.",
                        useCase: "Aprender vocabulario avanzado"
                    }
                ]
            }
        },
        {
            id: "4-16",
            title: "🎯 Ejercicio 4: Conversación en Otro Idioma",
            type: "exercise-interactive",
            contentData: {
                heading: "Practica 5 minutos de conversación",
                instructions: "Elige una herramienta de voz y mantén una conversación corta en inglés (u otro idioma).",
                duration: "10 minutos",
                challenge: "Reto: Intenta que la IA te corrija al menos 3 errores",
                steps: [
                    "1. Elige: Sesame.ai, Gemini Live, o ChatGPT Voz",
                    "2. Usa uno de los prompts para tutores",
                    "3. Conversa por 5 minutos",
                    "4. Anota las correcciones que te hizo",
                    "5. Comparte tu experiencia"
                ]
            },
            interaction: {
                type: "GallerySubmit",
                data: {
                    exerciseId: "caso-4-idiomas",
                    promptLabel: "¿Qué herramienta usaste y qué prompt?",
                    resultLabel: "¿Qué errores te corrigió? ¿Cómo fue la experiencia?",
                    allowImage: false
                }
            }
        },

        // =====================================================
        // CASO 5: ASISTENCIA TÉCNICA CON GEMINI LIVE
        // =====================================================
        {
            id: "4-17",
            title: "Caso 5: Asistencia Técnica con IA",
            type: "case-intro",
            contentData: {
                caseNumber: 5,
                heading: "Tu Técnico Personal 24/7",
                icon: "Wrench",
                color: "#DD6B20",
                description: "¿Algo no funciona? Muéstrale a la IA el problema con tu cámara y recibe ayuda paso a paso.",
                duration: "15 minutos",
                tools: ["Gemini Live", "ChatGPT Voz + Cámara"]
            }
        },
        {
            id: "4-18",
            title: "El Poder del Video en Tiempo Real",
            type: "feature-showcase",
            contentData: {
                heading: "Gemini Live puede VER tu problema",
                paragraph: "Con la cámara activa, Gemini puede ver lo que tú ves y guiarte paso a paso para resolver problemas técnicos.",
                useCases: [
                    {
                        icon: "Tv",
                        title: "Configurar dispositivos",
                        example: "Apunta al control remoto y pregunta cómo programarlo"
                    },
                    {
                        icon: "Printer",
                        title: "Resolver errores",
                        example: "Muestra el mensaje de error de la impresora"
                    },
                    {
                        icon: "Cable",
                        title: "Conectar cables",
                        example: "Muestra los puertos y pregunta qué va dónde"
                    },
                    {
                        icon: "Settings",
                        title: "Navegar menús",
                        example: "Muestra la pantalla y pide que te guíe"
                    }
                ],
                warning: "Requiere la app de Gemini en móvil con cámara habilitada"
            }
        },
        {
            id: "4-19",
            title: "🎯 Ejercicio 5: Resuelve un Problema Técnico",
            type: "exercise-interactive",
            contentData: {
                heading: "Usa la cámara para resolver algo",
                instructions: "Piensa en algo tecnológico que no sepas usar bien. Puede ser tu control remoto, una app, un electrodoméstico...",
                duration: "10 minutos",
                ideas: [
                    "Programar el temporizador del microondas",
                    "Configurar algo en tu celular",
                    "Entender los botones de un dispositivo",
                    "Resolver un mensaje de error"
                ],
                steps: [
                    "1. Abre Gemini en tu celular",
                    "2. Activa el modo Live con cámara",
                    "3. Apunta al dispositivo/pantalla problemática",
                    "4. Pregunta cómo resolver tu problema",
                    "5. Sigue las instrucciones paso a paso"
                ]
            },
            interaction: {
                type: "GallerySubmit",
                data: {
                    exerciseId: "caso-5-tecnico",
                    promptLabel: "¿Qué problema intentaste resolver?",
                    resultLabel: "¿Lo resolviste? ¿Cómo fue la experiencia?",
                    allowImage: true
                }
            }
        },

        // =====================================================
        // CASO 6: META-PROMPTING CON NOTEBOOKLM
        // =====================================================
        {
            id: "4-20",
            title: "Caso 6: Meta-Prompting Avanzado",
            type: "case-intro",
            contentData: {
                caseNumber: 6,
                heading: "Usa la IA para Crear Mejores Prompts",
                icon: "Wand2",
                color: "#D53F8C",
                description: "Técnica avanzada: alimenta NotebookLM con guías de prompting y pídele que genere el prompt perfecto para tu tarea.",
                duration: "20 minutos",
                tools: ["NotebookLM", "Perplexity", "Claude/ChatGPT"]
            }
        },
        {
            id: "4-21",
            title: "El Flujo del Meta-Prompting",
            type: "workflow",
            contentData: {
                heading: "3 pasos para prompts de élite",
                steps: [
                    {
                        number: 1,
                        title: "Busca fuentes sobre prompting",
                        description: "Usa Perplexity para encontrar guías, artículos o papers sobre cómo escribir buenos prompts para tu tipo de tarea.",
                        tool: "Perplexity",
                        example: "\"mejores técnicas de prompting para análisis de documentos legales\""
                    },
                    {
                        number: 2,
                        title: "Carga las fuentes en NotebookLM",
                        description: "Crea un cuaderno llamado 'Meta-Prompting' y sube las mejores guías que encontraste.",
                        tool: "NotebookLM",
                        example: "Sube 3-5 PDFs o links de guías de prompting"
                    },
                    {
                        number: 3,
                        title: "Pide el mega-prompt",
                        description: "Pídele a NotebookLM que genere el mejor prompt posible para tu tarea específica, basándose en las técnicas de las fuentes.",
                        tool: "NotebookLM",
                        example: "\"Basándote en estas guías, genera el mejor prompt para revisar un contrato de arrendamiento\""
                    }
                ],
                result: "Obtienes un prompt profesional basado en literatura experta, no en tu intuición"
            }
        },
        {
            id: "4-22",
            title: "Prompt para Meta-Prompting",
            type: "prompt-template",
            contentData: {
                heading: "El prompt que genera prompts",
                template: `Basándote en las técnicas y mejores prácticas de las fuentes que tienes cargadas, genera el MEJOR prompt posible para la siguiente tarea:

MI TAREA: [describe tu tarea]

MI CONTEXTO: [información relevante]

El prompt que generes debe incluir:
- Rol específico para la IA
- Contexto necesario
- Tarea clara con verbos de acción
- Formato de salida deseado
- Restricciones o consideraciones especiales

Cita qué técnicas de las fuentes estás aplicando y por qué.

Dame el prompt listo para copiar y usar.`,
                tip: "Este es el nivel más alto de prompting. Estás usando IA para mejorar tu uso de IA."
            }
        },
        {
            id: "4-23",
            title: "🎯 Ejercicio 6: Crea tu Mega-Prompt",
            type: "exercise-interactive",
            contentData: {
                heading: "Genera un prompt profesional con NotebookLM",
                instructions: "Vamos a crear un prompt de alta calidad para una tarea que necesites resolver frecuentemente.",
                duration: "15 minutos",
                steps: [
                    "1. Abre Perplexity y busca: 'mejores técnicas de prompting para [tu área]'",
                    "2. Guarda 2-3 links de guías útiles",
                    "3. Abre NotebookLM y crea un cuaderno nuevo",
                    "4. Agrega los links como fuentes",
                    "5. Usa el prompt de meta-prompting",
                    "6. Comparte el mega-prompt generado"
                ]
            },
            interaction: {
                type: "GallerySubmit",
                data: {
                    exerciseId: "caso-6-metaprompt",
                    promptLabel: "¿Para qué tarea generaste el prompt?",
                    resultLabel: "El mega-prompt que NotebookLM generó",
                    allowImage: true
                }
            }
        },

        // =====================================================
        // CASO 7: PROBLEMA LIBRE
        // =====================================================
        {
            id: "4-24",
            title: "Caso 7: Tu Problema Real",
            type: "case-intro",
            contentData: {
                caseNumber: 7,
                heading: "Resolvamos TU Problema",
                icon: "Users",
                color: "#319795",
                description: "Es tu turno. Plantea un problema real que tengas y lo resolvemos juntos usando todo lo aprendido.",
                duration: "30 minutos",
                tools: ["La que mejor se adapte a tu caso"]
            }
        },
        {
            id: "4-25",
            title: "Plantilla Universal",
            type: "prompt-template",
            contentData: {
                heading: "Funciona para (casi) cualquier cosa",
                template: `Actúa como [ROL EXPERTO RELEVANTE].

CONTEXTO:
[Describir la situación con detalles específicos]

MI OBJETIVO:
[Qué resultado necesito]

RESTRICCIONES:
[Qué no puedo hacer o qué debo evitar]

FORMATO DE RESPUESTA:
[Cómo quiero recibir la información]

Antes de responder, hazme las preguntas necesarias para entender mi caso al 100%.`,
                tip: "Si no sabes qué rol asignar, pregúntale a la IA: '¿Qué tipo de experto sería el mejor para ayudarme con [tu problema]?'"
            }
        },
        {
            id: "4-26",
            title: "🎯 Ejercicio Final: Tu Desafío",
            type: "exercise-interactive",
            contentData: {
                heading: "Resuelve algo que realmente necesites",
                instructions: "Piensa en un problema real de tu trabajo o vida personal. Algo que has postergado o que te quita tiempo.",
                duration: "20 minutos",
                examples: [
                    "Organizar un proceso caótico en mi trabajo",
                    "Redactar un documento que llevo semanas evitando",
                    "Investigar algo para tomar una decisión importante",
                    "Aprender algo que siempre quise pero nunca tuve tiempo",
                    "Automatizar algo repetitivo que hago cada semana"
                ],
                steps: [
                    "1. Define tu problema claramente",
                    "2. Elige la herramienta adecuada",
                    "3. Construye tu prompt con R.C.T.F.",
                    "4. Itera hasta obtener un buen resultado",
                    "5. Comparte tu éxito (o tu aprendizaje)"
                ]
            },
            interaction: {
                type: "GallerySubmit",
                data: {
                    exerciseId: "caso-7-libre",
                    promptLabel: "¿Qué problema resolviste?",
                    resultLabel: "Tu prompt y el resultado (o lo que aprendiste)",
                    allowImage: true
                }
            }
        },

        // =====================================================
        // GALERÍA Y VOTACIÓN
        // =====================================================
        {
            id: "4-27",
            title: "🏆 Galería de Resultados",
            type: "gallery-view",
            contentData: {
                heading: "Los Mejores Prompts del Grupo",
                description: "Aquí están los envíos de todos. Vamos a revisar los más destacados.",
                adminOnly: {
                    canHighlight: true,
                    canDelete: true,
                    canShowOnScreen: true
                }
            },
            interaction: {
                type: "GalleryDisplay",
                data: {
                    showAll: false,
                    showHighlighted: true,
                    allowVoting: true
                }
            }
        },

        // =====================================================
        // CIERRE
        // =====================================================
        {
            id: "4-28",
            title: "Resumen del Taller",
            type: "summary",
            contentData: {
                heading: "Lo que lograste hoy",
                bullets: [
                    "✅ Escribiste correos difíciles con el tono perfecto",
                    "✅ Investigaste con fuentes verificables",
                    "✅ Transformaste caos en información organizada",
                    "✅ Practicaste idiomas con IA de voz",
                    "✅ Resolviste problemas técnicos con video",
                    "✅ Creaste prompts de nivel profesional",
                    "✅ Resolviste un problema real tuyo"
                ],
                callToAction: "Siguiente: Cierre del curso y entrega de materiales →"
            }
        }
    ]
};

export default MODULE_4;
