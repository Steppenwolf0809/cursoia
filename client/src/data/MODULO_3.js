import React from 'react';
import { Wrench, MessageSquare, Brain, Search, BookOpen, FileText, Image, Cpu, Settings, Sparkles, Youtube, Mic, Globe, Building2, Zap } from "lucide-react";

export const MODULE_3 = {
    id: "module-3",
    title: "Módulo 3: Tour de Herramientas (60 min)",
    icon: Wrench,
    slides: [
        // --- SLIDE 3-0: PORTADA DEL MÓDULO ---
        {
            id: "3-0",
            title: "Tu Cinturón de Herramientas",
            type: "hero",
            contentData: {
                heading: "El Cinturón de Herramientas IA",
                paragraph: "Ya no usamos una sola herramienta. Usamos la correcta para cada trabajo. Como un carpintero no usa solo el martillo.",
                image: "/images/toolbelt-hero.png"
            }
        },

        // --- SLIDE 3-1: MI STACK PERSONAL ---
        {
            id: "3-1",
            title: "Mi Stack Personal",
            type: "tool-stack",
            contentData: {
                heading: "Las herramientas que uso TODOS los días",
                subheading: "Stack de José Luis Zapata",
                tools: [
                    { name: "Claude", use: "Razonamiento profundo, textos largos, análisis legal", icon: "Brain" },
                    { name: "Perplexity", use: "Investigación con fuentes verificables", icon: "Search" },
                    { name: "NotebookLM", use: "Trabajar con MIS documentos", icon: "BookOpen" },
                    { name: "Gemini", use: "Integración Google, contexto masivo", icon: "Sparkles" },
                    { name: "ChatGPT", use: "Versatilidad, imágenes, voz", icon: "MessageSquare" },
                    { name: "Copilot", use: "Si vives en Microsoft Office", icon: "Building2" }
                ],
                footer: "Cada herramienta tiene su 'superpoder'. Aprende cuál usar para cada tarea."
            }
        },

        // --- SLIDE 3-2: CONFIGURACIÓN DE PRIVACIDAD ---
        {
            id: "3-2",
            title: "⚠️ Antes de empezar: Privacidad",
            type: "warning",
            contentData: {
                heading: "Protege tus datos AHORA",
                paragraph: "Antes de usar cualquier IA profesionalmente, desactiva el entrenamiento con tus datos. Es crítico para información confidencial.",
                bullets: [
                    "📱 ChatGPT: Ajustes → Controles de datos → Desactivar",
                    "🔵 Gemini: Actividad de Gemini Apps → Desactivar",
                    "🟣 Claude: Ajustes → Ya está desactivado por defecto"
                ],
                highlight: { 
                    type: "danger", 
                    text: "Sin esta configuración, tus conversaciones pueden usarse para entrenar el modelo." 
                }
            }
        },

        // --- SLIDE 3-3: CLAUDE - INTRO ---
        {
            id: "3-3",
            title: "Claude (Anthropic)",
            type: "tool-card",
            contentData: {
                heading: "Claude",
                company: "Anthropic",
                tagline: "El Analista Profundo",
                logo: "/images/logos/claude-logo.png",
                color: "#D97757",
                strengths: [
                    "Mejor seguimiento de instrucciones largas",
                    "Excelente para análisis de documentos complejos",
                    "Razonamiento superior en tareas complejas",
                    "\"Proyectos\" para mantener contexto persistente"
                ],
                whenToUse: [
                    "Análisis de contratos o documentos legales",
                    "Redacción que requiere matices",
                    "Tareas que requieren seguir instrucciones complejas",
                    "Cuando necesitas que \"recuerde\" contexto de tu trabajo"
                ],
                website: "claude.ai",
                pricing: "Gratis limitado / Pro $20/mes"
            }
        },

        // --- SLIDE 3-4: CLAUDE - FUNCIÓN PROYECTOS ---
        {
            id: "3-4",
            title: "Claude: La Función 'Proyectos'",
            type: "feature-highlight",
            contentData: {
                heading: "Proyectos = Memoria Persistente",
                paragraph: "Claude puede recordar contexto de tu trabajo si usas la función Proyectos. Ideal para trabajo recurrente.",
                image: "/images/claude-projects.png",
                steps: [
                    "1. Crea un Proyecto (ej: 'Contratos Notaría')",
                    "2. Sube documentos de referencia",
                    "3. Define instrucciones permanentes",
                    "4. Cada chat nuevo YA tiene ese contexto"
                ],
                tip: "Demo en vivo: Cargar un documento y pedir análisis con detección de inconsistencias"
            }
        },

        // --- SLIDE 3-5: CHATGPT - INTRO ---
        {
            id: "3-5",
            title: "ChatGPT (OpenAI)",
            type: "tool-card",
            contentData: {
                heading: "ChatGPT",
                company: "OpenAI",
                tagline: "El Todoterreno",
                logo: "/images/logos/chatgpt-logo.png",
                color: "#10A37F",
                strengths: [
                    "El más versátil y conocido",
                    "Generación de imágenes (DALL-E)",
                    "Modo voz natural y fluido",
                    "GPTs personalizados",
                    "Análisis de datos y gráficos"
                ],
                whenToUse: [
                    "Tareas generales del día a día",
                    "Generar imágenes",
                    "Cuando necesitas plugins o integraciones",
                    "Análisis de datos en Excel/CSV"
                ],
                website: "chat.openai.com",
                pricing: "Gratis / Plus $20/mes"
            }
        },

        // --- SLIDE 3-6: CHATGPT - FUNCIONES DESTACADAS ---
        {
            id: "3-6",
            title: "ChatGPT: Funciones Clave",
            type: "feature-grid",
            contentData: {
                heading: "Lo que ChatGPT hace mejor",
                features: [
                    {
                        icon: "Mic",
                        title: "Modo Voz",
                        description: "Conversación natural por audio. Ideal para lluvia de ideas mientras caminas."
                    },
                    {
                        icon: "Image",
                        title: "DALL-E 3",
                        description: "Genera imágenes profesionales desde texto. Sigue instrucciones complejas."
                    },
                    {
                        icon: "FileText",
                        title: "Análisis de Datos",
                        description: "Sube Excel/CSV y obtén gráficos, resúmenes y análisis automáticos."
                    },
                    {
                        icon: "Cpu",
                        title: "GPTs Personalizados",
                        description: "Crea asistentes especializados o usa los de la tienda."
                    }
                ],
                tip: "Demo: Conversación por voz + Generar imagen + Analizar un CSV simple"
            }
        },

        // --- SLIDE 3-7: GEMINI - INTRO ---
        {
            id: "3-7",
            title: "Gemini (Google)",
            type: "tool-card",
            contentData: {
                heading: "Gemini",
                company: "Google",
                tagline: "El Integrador Google",
                logo: "/images/logos/gemini-logo.png",
                color: "#4285F4",
                strengths: [
                    "Ventana de contexto ENORME (2M tokens)",
                    "Integración con Google Drive, Gmail, Docs",
                    "Gratis con muy buenas capacidades",
                    "Puede analizar videos de YouTube completos"
                ],
                whenToUse: [
                    "Cuando tienes MUCHOS documentos que analizar juntos",
                    "Si vives en el ecosistema Google",
                    "Para resumir videos de YouTube largos",
                    "Cuando necesitas procesar libros completos"
                ],
                website: "gemini.google.com",
                pricing: "Gratis / Advanced $20/mes"
            }
        },

        // --- SLIDE 3-8: GEMINI - VENTANA DE CONTEXTO ---
        {
            id: "3-8",
            title: "Gemini: El Poder del Contexto Masivo",
            type: "stat-highlight",
            contentData: {
                heading: "2 Millones de Tokens",
                statPrimary: "2M",
                statLabel: "tokens de contexto",
                paragraph: "Puedes subir un libro COMPLETO y hacerle preguntas específicas. Es como tener un buscador inteligente dentro del documento.",
                comparison: [
                    { tool: "ChatGPT", tokens: "128K", analogy: "~300 páginas" },
                    { tool: "Claude", tokens: "200K", analogy: "~500 páginas" },
                    { tool: "Gemini", tokens: "2M", analogy: "~5,000 páginas" }
                ],
                tip: "Caso de uso: Sube todos los contratos de un cliente y pregunta por inconsistencias entre ellos"
            }
        },

        // --- SLIDE 3-9: AI STUDIO - INTRO ---
        {
            id: "3-9",
            title: "Google AI Studio",
            type: "tool-card",
            contentData: {
                heading: "Google AI Studio",
                company: "Google",
                tagline: "El Laboratorio Profesional",
                logo: "/images/logos/aistudio-logo.png",
                color: "#EA4335",
                strengths: [
                    "Control total sobre parámetros del modelo",
                    "Grounding: Ancla respuestas a TUS documentos",
                    "System Instructions permanentes",
                    "Acceso a modelos experimentales gratis"
                ],
                whenToUse: [
                    "Cuando necesitas CERO alucinaciones (Grounding)",
                    "Para crear asistentes personalizados profesionales",
                    "Prototipado rápido de apps con IA",
                    "Ajustar 'temperatura' y comportamiento"
                ],
                website: "aistudio.google.com",
                pricing: "Gratis (con límites generosos)"
            }
        },

        // --- SLIDE 3-10: AI STUDIO - PARÁMETROS ---
        {
            id: "3-10",
            title: "AI Studio: Control Total",
            type: "config-panel",
            contentData: {
                heading: "Parámetros que puedes ajustar",
                parameters: [
                    {
                        name: "Temperatura",
                        description: "Creatividad vs Precisión",
                        low: "0.0 = Respuestas predecibles y exactas",
                        high: "1.0 = Respuestas creativas y variadas",
                        recommended: "Legal/técnico: 0.2-0.4 | Creativo: 0.7-0.9"
                    },
                    {
                        name: "System Instructions",
                        description: "Instrucciones permanentes que la IA siempre sigue",
                        example: "\"Siempre responde en español formal. Cita el número de página cuando referencias un documento.\""
                    },
                    {
                        name: "Grounding",
                        description: "Fuerza a la IA a usar SOLO tus documentos",
                        benefit: "Elimina alucinaciones. Perfecto para trabajo legal."
                    }
                ]
            }
        },

        // --- SLIDE 3-11: PERPLEXITY - INTRO ---
        {
            id: "3-11",
            title: "Perplexity",
            type: "tool-card",
            contentData: {
                heading: "Perplexity",
                company: "Perplexity AI",
                tagline: "El Investigador con Fuentes",
                logo: "/images/logos/perplexity-logo.png",
                color: "#20B2AA",
                strengths: [
                    "Búsqueda con fuentes citadas automáticamente",
                    "Reemplaza a Google para investigación seria",
                    "Respuestas actualizadas (busca en tiempo real)",
                    "Modo 'Pro' con razonamiento profundo"
                ],
                whenToUse: [
                    "Investigación que requiere fuentes verificables",
                    "Preguntas sobre eventos recientes",
                    "Cuando necesitas citar de dónde viene la información",
                    "Comparativas de productos o servicios"
                ],
                website: "perplexity.ai",
                pricing: "Gratis / Pro $20/mes"
            }
        },

        // --- SLIDE 3-12: PERPLEXITY vs GOOGLE ---
        {
            id: "3-12",
            title: "Perplexity vs Google",
            type: "comparison",
            contentData: {
                heading: "¿Por qué cambiar de Google?",
                paragraph: "Google te da 10 links. Perplexity te da LA RESPUESTA con las fuentes.",
                headers: ["Google Tradicional", "Perplexity"],
                rows: [
                    ["Te da links para que busques", "Te da la respuesta directa"],
                    ["Tú armas el resumen", "Ya viene resumido"],
                    ["Sin citas claras", "Cada afirmación tiene su fuente"],
                    ["Contenido patrocinado mezclado", "Sin publicidad"],
                    ["Información puede ser vieja", "Busca en tiempo real"]
                ],
                tip: "Demo: Buscar información actual y mostrar cómo cita las fuentes"
            }
        },

        // --- SLIDE 3-13: NOTEBOOKLM - INTRO ---
        {
            id: "3-13",
            title: "NotebookLM (Google)",
            type: "tool-card",
            contentData: {
                heading: "NotebookLM",
                company: "Google",
                tagline: "Tu Biblioteca Personal Inteligente",
                logo: "/images/logos/notebooklm-logo.png",
                color: "#FBBC04",
                strengths: [
                    "Trabaja SOLO con tus documentos (cero alucinaciones externas)",
                    "Genera podcasts de audio para estudiar",
                    "Hasta 50 fuentes por cuaderno",
                    "Citas exactas con referencias a página/sección"
                ],
                whenToUse: [
                    "Estudiar material propio (cursos, libros, manuales)",
                    "Analizar múltiples documentos relacionados",
                    "Crear resúmenes de audio para escuchar",
                    "Cuando NO quieres que la IA invente nada"
                ],
                website: "notebooklm.google.com",
                pricing: "Gratis"
            }
        },

        // --- SLIDE 3-14: NOTEBOOKLM - FUENTES ---
        {
            id: "3-14",
            title: "NotebookLM: Gestión de Fuentes",
            type: "feature-highlight",
            contentData: {
                heading: "Crea 'Cuadernos' Temáticos",
                paragraph: "Organiza tu conocimiento en cuadernos separados. Cada uno es un experto en ese tema específico.",
                image: "/images/notebooklm-sources.png",
                sources: [
                    { type: "PDF", description: "Documentos, contratos, manuales" },
                    { type: "Texto", description: "Notas, transcripciones" },
                    { type: "YouTube", description: "Videos completos (extrae transcripción)" },
                    { type: "Audio", description: "Grabaciones, podcasts" },
                    { type: "Web", description: "Artículos, páginas web" }
                ],
                limits: "Gratis: Hasta 100 cuadernos y 50 fuentes por cuaderno"
            }
        },

        // --- SLIDE 3-15: NOTEBOOKLM - TÉCNICAS DE ESTUDIO ---
        {
            id: "3-15",
            title: "NotebookLM: Técnicas de Estudio",
            type: "technique-grid",
            contentData: {
                heading: "Aprende más rápido con IA",
                techniques: [
                    {
                        name: "Resúmenes Inteligentes",
                        description: "Pide explicaciones de secciones específicas",
                        prompt: "\"Explícame el capítulo 3 como si tuviera 12 años\""
                    },
                    {
                        name: "Active Recall",
                        description: "Genera preguntas para autoevaluarte",
                        prompt: "\"Crea 10 preguntas de examen sobre este material\""
                    },
                    {
                        name: "Flashcards",
                        description: "Tarjetas de estudio automáticas",
                        prompt: "\"Genera flashcards de los conceptos clave\""
                    },
                    {
                        name: "Simulación de Examen",
                        description: "Tests con retroalimentación",
                        prompt: "\"Hazme un examen de 20 preguntas tipo test\""
                    }
                ]
            }
        },

        // --- SLIDE 3-16: NOTEBOOKLM - PODCASTS ---
        {
            id: "3-16",
            title: "NotebookLM: Audio Resúmenes",
            type: "feature-highlight",
            contentData: {
                heading: "Convierte documentos en Podcasts",
                paragraph: "NotebookLM genera conversaciones de audio donde dos 'hosts' discuten tu material. Perfecto para aprender mientras manejas o caminas.",
                image: "/images/notebooklm-podcast.png",
                steps: [
                    "1. Sube tus documentos al cuaderno",
                    "2. Haz clic en 'Generate Audio Overview'",
                    "3. Espera ~5 minutos",
                    "4. Escucha el podcast generado"
                ],
                highlight: {
                    type: "success",
                    text: "Los hosts debaten, hacen preguntas retóricas y explican conceptos difíciles de forma entretenida"
                }
            }
        },

        // --- SLIDE 3-17: COPILOT - INTRO ---
        {
            id: "3-17",
            title: "Microsoft Copilot",
            type: "tool-card",
            contentData: {
                heading: "Microsoft Copilot",
                company: "Microsoft",
                tagline: "El Asistente Integrado",
                logo: "/images/logos/copilot-logo.png",
                color: "#00A4EF",
                strengths: [
                    "Integrado en Windows, Edge, Office",
                    "Accesible para usuarios no técnicos",
                    "Gratis con capacidades decentes",
                    "Usa GPT-4 de OpenAI"
                ],
                whenToUse: [
                    "Si trabajas principalmente en Word/Excel/PowerPoint",
                    "En entornos corporativos con Microsoft 365",
                    "Como puerta de entrada si no quieres crear cuentas nuevas",
                    "Búsquedas rápidas desde el navegador Edge"
                ],
                website: "copilot.microsoft.com",
                pricing: "Gratis / Pro $20/mes"
            }
        },

        // --- SLIDE 3-18: GENERACIÓN DE IMÁGENES ---
        {
            id: "3-18",
            title: "Generación de Imágenes con IA",
            type: "concept",
            contentData: {
                heading: "Crea imágenes desde texto",
                paragraph: "La estructura de un prompt visual es diferente. Aquí está la fórmula:",
                image: "/images/image-prompt-structure.png",
                bullets: [
                    "🎯 SUJETO: Qué aparece ('Un abogado profesional')",
                    "🎬 ACCIÓN: Qué hace ('sonriendo, mirando a cámara')",
                    "🏠 ENTORNO: Dónde está ('oficina moderna luminosa')",
                    "🎨 ESTILO: Cómo se ve ('fotografía editorial, alta calidad')",
                    "💡 ILUMINACIÓN: Tipo de luz ('luz natural cálida')",
                    "📐 FORMATO: Dimensiones ('16:9, alta resolución')"
                ]
            }
        },

        // --- SLIDE 3-19: HERRAMIENTAS DE IMAGEN ---
        {
            id: "3-19",
            title: "¿Dónde generar imágenes?",
            type: "tool-comparison-table",
            contentData: {
                heading: "Comparativa de generadores",
                columns: ["Herramienta", "Fortaleza", "Acceso"],
                rows: [
                    ["DALL-E 3 (ChatGPT)", "Sigue instrucciones complejas", "ChatGPT Plus"],
                    ["Gemini Imagen 3", "Buena calidad, gratis", "Gemini"],
                    ["Ideogram", "Excelente con texto en imágenes", "Gratis"],
                    ["Adobe Firefly", "Seguro comercialmente (sin copyright)", "Gratis con límites"],
                    ["Midjourney", "Máxima calidad artística", "$10/mes"]
                ],
                tip: "Para uso profesional/comercial, Adobe Firefly es la opción más segura legalmente"
            }
        },

        // --- SLIDE 3-20: CUÁNDO USAR CADA UNA ---
        {
            id: "3-20",
            title: "Mapa de Decisión",
            type: "decision-tree",
            contentData: {
                heading: "¿Qué herramienta uso?",
                decisions: [
                    {
                        question: "¿Necesito fuentes citadas?",
                        yes: "→ Perplexity",
                        no: "Siguiente pregunta"
                    },
                    {
                        question: "¿Trabajo solo con MIS documentos?",
                        yes: "→ NotebookLM",
                        no: "Siguiente pregunta"
                    },
                    {
                        question: "¿Documento muy largo o muchos docs?",
                        yes: "→ Gemini o AI Studio",
                        no: "Siguiente pregunta"
                    },
                    {
                        question: "¿Análisis legal complejo o redacción con matices?",
                        yes: "→ Claude",
                        no: "→ ChatGPT (todoterreno)"
                    }
                ]
            }
        },

        // --- SLIDE 3-21: ENCUESTA ---
        {
            id: "3-21",
            title: "¿Cuál te llamó más la atención?",
            type: "poll",
            interaction: {
                type: "LivePoll",
                data: {
                    id: "poll-herramientas",
                    question: "¿Qué herramienta vas a probar primero?",
                    options: [
                        "Claude (Análisis profundo)",
                        "Perplexity (Investigación con fuentes)",
                        "NotebookLM (Mis documentos + Podcasts)",
                        "Gemini / AI Studio (Contexto masivo)",
                        "ChatGPT (El todoterreno)"
                    ]
                }
            }
        },

        // --- SLIDE 3-22: EJERCICIO ---
        {
            id: "3-22",
            title: "🎯 Ejercicio: Compara herramientas",
            type: "exercise",
            contentData: {
                heading: "Mismo problema, dos herramientas",
                instructions: "Tienes 5 minutos. Haz la MISMA pregunta en dos herramientas diferentes y compara resultados.",
                task: "Pregunta: '¿Cuáles son los requisitos para constituir una sociedad anónima en Ecuador en 2026?'",
                compare: [
                    { tool: "ChatGPT o Gemini", focus: "Respuesta general" },
                    { tool: "Perplexity", focus: "Respuesta con fuentes" }
                ],
                reflection: [
                    "¿Cuál dio información más actualizada?",
                    "¿Cuál citó fuentes verificables?",
                    "¿En cuál confiarías más para un cliente?"
                ]
            }
        },

        // --- SLIDE 3-23: ENCUESTA DE HERRAMIENTAS ---
        {
            id: "3-23",
            title: "🗳️ Tu Herramienta Favorita",
            type: "poll",
            interaction: {
                type: "LivePoll",
                data: {
                    id: "poll-favorite-tool",
                    question: "¿Cuál herramienta te pareció más interesante?",
                    options: [
                        "🧠 Claude - Razonamiento profundo",
                        "💬 ChatGPT - Versatilidad total",
                        "✨ Gemini - Contexto masivo",
                        "🔍 Perplexity - Fuentes verificables",
                        "📚 NotebookLM - Mis documentos",
                        "🏢 Copilot - Integración Office"
                    ]
                }
            }
        },

        // --- SLIDE 3-24: RESUMEN ---
        {
            id: "3-24",
            title: "Resumen: Módulo 3",
            type: "summary",
            contentData: {
                heading: "Tu nuevo arsenal",
                bullets: [
                    "🧠 Claude → Análisis profundo, documentos legales",
                    "💬 ChatGPT → Todoterreno, imágenes, voz",
                    "✨ Gemini → Contexto masivo, ecosistema Google",
                    "⚙️ AI Studio → Control total, cero alucinaciones",
                    "🔍 Perplexity → Investigación con fuentes",
                    "📚 NotebookLM → Tus documentos, podcasts de estudio",
                    "🏢 Copilot → Integración Microsoft Office"
                ],
                callToAction: "☕ DESCANSO 15 minutos → Luego: Taller Práctico con casos reales"
            }
        }
    ]
};

export default MODULE_3;
