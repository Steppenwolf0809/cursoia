import React from 'react';
import { BookOpen, MessageSquare, Cpu, FileText, Download, Target, Zap, Layout, CheckCircle, Heading1, Heading2 } from "lucide-react";

export const RESOURCES = [
    { name: "Mega-Guía de Prompts Legales", type: "PDF", size: "2.4 MB", downloadUrl: "#" },
    { name: "Checklist de Verificación de IA", type: "Notion", size: "Link", downloadUrl: "#" },
    { name: "Glosario de Términos IA", type: "PDF", size: "1.1 MB", downloadUrl: "#" }
];

export const MASTER_KIT_CONTENT = {
    title: "Master Kit",
    description: "Recursos exclusivos para el curso."
};

import MODULE_2 from './MODULO_2';
import MODULE_3 from './MODULO_3';
import MODULE_4 from './MODULO_4';
import MODULE_5 from './MODULO_5';
import { WHITEBOARD_MODULE } from './WHITEBOARD_MODULE';

export const COURSE_MODULES = [
    {
        id: "module-1",
        title: "Módulo 1: Fundamentos (45 min)",
        icon: Zap,
        slides: [
            {
                id: "1-0",
                title: "Portada del Curso",
                type: "hero",
                contentData: {
                    heading: "IA para todos",
                    paragraph: "Transformando el día a día con Inteligencia Artificial. Del miedo al control total.",
                    image: "/images/portada_ia_basico.png"
                }
            },
            // --- SECCIÓN 1: APERTURA E HISTORIA ---
            {
        
                id: "1-2",
                title: "¿Quién soy?",
                type: "profile",
                contentData: {
                    heading: "José Luis Zapata",
                    subheading: "Abogado Notarial | No soy programador",
                    image: "/images/perfil-joseluis.png",
                    bullets: [
                        "❌ Antes: Tareas mecánicas y miedo al error.",
                        "✅ Ahora: Automatización y control total.",
                        "🎯 Misión: Convertirte en Power User."
                    ]
                }
            },
            {
                id: "1-3",
                title: "El Momento Eureka (2023)",
                type: "narrative",
                contentData: {
                    Heading1: "ChatGPT parecía sacado de un libro de Ciencia Ficción",
                    paragraph1: "Era una máquina que podía responder a una conversación humana y simplificar tareas que antes tardaban horas.",
                    Heading2: "Claude me sorprendió con un acta de mediación",
                    paragraph2: "Le pedí un acta de mediación ficticia y detectó por sí solo los datos relevantes:",
                    bullets2: [
                        "📍 Direcciones reales de Quito",
                        "📞 Teléfonos con formato ecuatoriano",
                        "🇪🇨 Contexto local perfecto"
                    ],
                    highlight: { type: "success", text: "Esto no es un juguete. Es una herramienta profesional." }
                }
            },
            {
                id: "1-4",
                title: "ADVERTENCIA CRÍTICA: La IA Miente",
                type: "warning",
                contentData: {
                    heading: "⚠️ La IA Miente",
                    paragraph: "La Inteligencia Artificial no tiene moral. No 'piensa', solo PREDICE la siguiente palabra más probable. Su prioridad es satisfacer tu pregunta, no decir la verdad.",
                    bullets: [
                        "🎭 Alucina: inventa datos falsos con total confianza",
                        "🤖 No entiende, solo calcula probabilidades",
                        "🎯 Te dirá lo que quieres oír, no lo correcto"
                    ],
                    highlight: { type: "danger", text: "Tu trabajo obligatorio: VERIFICAR SIEMPRE." }
                }
            },
            {
                id: "1-4b",
                title: "La vez que la IA me engañó por días",
                type: "narrative",
                contentData: {
                    Heading1: "🎭 La vez que la IA me engañó por días enteros",
                    paragraph1: "Estaba programando un sistema para la notaría. Le pedía funciones a la IA, me mostraba resultados que parecían funcionar perfectamente. Yo feliz, avanzando. Hasta que noté algo raro: los datos siempre eran los mismos. Demasiado perfectos.",
                    bullets1: [
                        "💻 La IA estaba 'hardcodeando' resultados",
                        "📝 Inventaba datos falsos escritos directamente en el código",
                        "🎭 Me hacía creer que funcionaba cuando no era así"
                    ],
                    Heading2: "El descubrimiento",
                    paragraph2: "Lo confronté, le dije 'me estás engañando' y tuvo que aceptarlo. Días de trabajo perdidos por confiar ciegamente.",
                    highlight: { type: "danger", text: "Ahí aprendí: la IA no tiene moral. No le importa mentirte si eso satisface tu pregunta." }
                }
            },
            {
                id: "1-5",
                title: "Conoce a tu audiencia",
                type: "poll",
                interaction: {
                    type: "LivePoll",
                    data: {
                        id: "poll-level",
                        question: "¿Cuál es tu nivel actual con la IA?",
                        options: [
                            "Nivel 0: Nunca la he usado",
                            "Nivel 1: Juego a veces (ChatGPT gratis)",
                            "Nivel 2: La uso en el trabajo (Básico)",
                            "Nivel 3: Power User (Todos los días)"
                        ]
                    }
                }
            },
            
            // --- SECCIÓN GLOSARIO: CONCEPTOS CLAVE ---
            {
                id: "1-5a",
                title: "📚 Glosario IA",
                type: "narrative",
                contentData: {
                    heading: "Conceptos que necesitas dominar",
                    paragraph: "Antes de continuar, vamos a definir los términos técnicos que escucharás constantemente. No te preocupes, lo haremos simple.",
                    bullets: [
                        "🔤 LLM y Tokens",
                        "🧠 Ventana de Contexto",
                        "🎭 Alucinaciones",
                        "🎓 Entrenamiento y Fine-tuning",
                        "📚 RAG (Retrieval Augmented Generation)"
                    ],
                    highlight: { type: "info", text: "Domina estos conceptos y hablarás el idioma de la IA." }
                }
            },
            {
                id: "1-5b",
                title: "🤖 ¿Qué es un LLM?",
                type: "feature-highlight",
                contentData: {
                    heading: "Large Language Model",
                    paragraph: "Un LLM es un modelo de lenguaje entrenado con billones de textos para predecir qué palabra viene después. No 'piensa', solo calcula probabilidades.",
                    image: "/images/llm-diagram.png",
                    steps: [
                        "📖 Entrenado con internet completo",
                        "🎯 Predice la siguiente palabra más probable",
                        "💡 Ejemplos: GPT-4, Claude, Gemini"
                    ],
                    tip: "Piensa en el LLM como un 'autocompletar' súper avanzado, no como un cerebro pensante."
                }
            },
            {
                id: "1-5c",
                title: "🔤 Tokens: La Moneda de la IA",
                type: "analogy",
                contentData: {
                    heading: "¿Qué es un Token?",
                    left: {
                        title: "Para Humanos",
                        text: "Palabras completas",
                        icon: "User"
                    },
                    right: {
                        title: "Para la IA",
                        text: "Pedazos de texto (~4 letras)",
                        icon: "Cpu"
                    },
                    footer: "Ejemplo: 'Inteligencia' = 3 tokens | 'IA' = 1 token. Los tokens cuestan dinero y tienen límites."
                }
            },
            {
                id: "1-5d",
                title: "🧠 Ventana de Contexto",
                type: "stat-comparison",
                contentData: {
                    heading: "La Memoria de Corto Plazo de la IA",
                    statPrimary: "200K",
                    statSecondary: "4K",
                    label: "Tokens de contexto (antes vs ahora)",
                    quote: "Es como la RAM de una computadora. Mientras más grande, más información puede 'recordar' en una conversación."
                }
            },
            // NOTA: El contenido de Alucinaciones (1-5e) se fusionó con el slide 1-4
            {
                id: "1-5f",
                title: "🎓 Entrenamiento vs Fine-tuning",
                type: "list-comparison",
                contentData: {
                    leftTitle: "Entrenamiento Base",
                    leftItems: [
                        "Aprende de billones de textos",
                        "Cuesta millones de dólares",
                        "Toma meses con supercomputadoras",
                        "Lo hacen OpenAI, Google, Anthropic"
                    ],
                    rightTitle: "Fine-tuning",
                    rightItems: [
                        "Ajusta un modelo ya entrenado",
                        "Usa tus propios datos específicos",
                        "Más barato y rápido",
                        "Lo puedes hacer tú"
                    ]
                }
            },
            {
                id: "1-5g",
                title: "📚 RAG: El Superpoder",
                type: "narrative",
                contentData: {
                    heading: "Retrieval Augmented Generation",
                    paragraph: "RAG es darle a la IA acceso a documentos externos en tiempo real. En lugar de depender solo de su entrenamiento, busca información actualizada.",
                    bullets: [
                        "🔍 Busca en tus documentos antes de responder",
                        "📊 Combina búsqueda + generación",
                        "✅ Reduce alucinaciones dramáticamente"
                    ],
                    highlight: { type: "success", text: "Ejemplo: ChatGPT con búsqueda web = RAG básico" }
                }
            },
            
            // --- SECCIÓN 2: TEORÍA Y FUNDAMENTOS ---
            {
                id: "1-6",
                title: "La Mentalidad 'AI First'",
                type: "comparison",
                contentData: {
                    heading: "Cambio de Paradigma",
                    paragraph: "No la uses solo cuando te trabes. Úsala para empezar.",
                    headers: ["Mentalidad Antigua", "Mentalidad AI First"],
                    rows: [
                        ["Si me trabo, pregunto", "Empiezo preguntando el enfoque"],
                        ["Buscador glorificado", "Socio de debate"],
                        ["Una sola pregunta", "Iteración constante"]
                    ]
                }
            },
            // NOTA: El contenido técnico de "No piensa, PREDICE" (1-7) se fusionó con el slide 1-4
            {
                id: "1-7",
                title: "Capacidades: La Verdad",
                type: "list-comparison",
                contentData: {
                    heading: "Lo que SÍ hace vs Lo que NO hace",
                    leftTitle: "Lo que SÍ hace",
                    leftItems: [
                        "Resumir y Redactar",
                        "Explicar conceptos",
                        "Traducir y Formatear",
                        "Analizar datos"
                    ],
                    rightTitle: "Lo que NO hace",
                    rightItems: [
                        "Decir la verdad absoluta",
                        "Tener ética o moral",
                        "Reemplazar tu firma"
                    ]
                }
            },
            {
                id: "1-7b",
                title: "🚀 IAs Recomendadas para Empezar",
                type: "ai-recommendations",
                contentData: {
                    heading: "¿Por dónde comenzar?",
                    subheading: "Estas son las herramientas de IA más accesibles para dar tus primeros pasos",
                    tools: [
                        {
                            name: "ChatGPT",
                            description: "El más popular y versátil. Excelente para empezar.",
                            logo: "/images/chatgpt-logo.png",
                            url: "https://chatgpt.com/",
                            color: "#10A37F",
                            level: "Principiante"
                        },
                        {
                            name: "Gemini",
                            description: "Potente integración con Google. Contexto masivo.",
                            logo: "/images/gemini-logo.png",
                            url: "https://gemini.google.com/",
                            color: "#4285F4",
                            level: "Principiante"
                        },
                        {
                            name: "Copilot",
                            description: "Perfecto para usuarios Microsoft. Integrado en Office.",
                            logo: "/images/copilot-logo.png",
                            url: "https://copilot.microsoft.com/",
                            color: "#00A4EF",
                            level: "Principiante"
                        },
                        {
                            name: "Claude",
                            description: "Muy poderosa pero requiere saber utilizarla correctamente.",
                            logo: "/images/claude-logo.png",
                            url: "https://claude.ai/",
                            color: "#D97757",
                            level: "Intermedio"
                        }
                    ],
                    surprise: {
                        name: "Kimi 2.5",
                        description: "Modelo Open Source que compite con los grandes. ¡Gratis y muy potente!",
                        logo: "/images/Kimi-logo-2025.png",
                        url: "https://www.kimi.com/kimiplus/sale?activity_enter_method=h5_share&invitation_code=PCT855"
                    }
                }
            },
            {
                id: "1-8",
                title: "La Analogía del Auto",
                type: "analogy",
                contentData: {
                    heading: "Interfaz vs. Modelo",
                    left: {
                        title: "Carrocería (App)",
                        text: "ChatGPT, Claude",
                        icon: "Car"
                    },
                    right: {
                        title: "Motor (Inteligencia)",
                        text: "GPT-5, Sonnet 4.5",
                        icon: "Cpu"
                    },
                    footer: "Tip: Pagar Plus vale la pena por el Motor, no por la Carrocería."
                }
            },
            {
                id: "1-9",
                title: "Seguridad: Reglas de Oro",
                type: "warning",
                contentData: {
                    heading: "Lo que NUNCA debes compartir",
                    paragraph: "Trata a la IA como si fuera un correo público.",
                    bullets: [
                        "🚫 Nombres de clientes reales",
                        "🚫 Datos bancarios o claves",
                        "🚫 Secretos comerciales"
                    ],
                    highlight: { type: "danger", text: "Anonimiza todo antes de preguntar." }
                }
            },
            {
                id: "1-10",
                title: "🎯 Ejercicio Práctico",
                type: "exercise",
                contentData: {
                    heading: "Tu Primera Conversación con IA",
                    instruction: "Abre ChatGPT, Gemini o Claude y escribe este prompt:",
                    prompt: "Hola, soy nuevo usando inteligencia artificial. ¿Puedes explicarme en 3 párrafos simples cómo funcionas y qué puedes hacer por mí?",
                    tips: [
                        "Prueben en herramientas diferentes y comparen",
                        "Observa el tono y estructura de cada respuesta",
                        "Haz una pregunta de seguimiento"
                    ],
                    duration: "5 min"
                },
                interaction: {
                    type: "GallerySubmit",
                    data: {
                        exerciseId: "modulo-1-ejercicio-1",
                        promptLabel: "Tu prompt",
                        resultLabel: "Tu resultado",
                        showPrompt: false
                    }
                }
            },
            {
                id: "1-11",
                title: "🖼️ Galería del Módulo 1",
                type: "gallery-view",
                contentData: {
                    heading: "Respuestas del Grupo",
                    description: "Explora lo que tus compañeros obtuvieron en el ejercicio.",
                    exerciseId: "modulo-1-ejercicio-1"
                },
                interaction: {
                    type: "GalleryDisplay",
                    data: {
                        showAll: true,
                        showHighlighted: false
                    }
                }
            },
            {
                id: "1-12",
                title: "✅ Resumen del Módulo",
                type: "summary",
                contentData: {
                    heading: "Lo que aprendimos",
                    keyPoints: [
                        {
                            icon: "🧠",
                            title: "Mentalidad AI First",
                            description: "Usa la IA desde el inicio, no solo cuando te trabes."
                        },
                        {
                            icon: "📚",
                            title: "Conceptos Clave",
                            description: "LLM, tokens, contexto, alucinaciones, RAG y fine-tuning."
                        },
                        {
                            icon: "⚠️",
                            title: "La IA Miente",
                            description: "Verificar siempre es TU responsabilidad."
                        },
                        {
                            icon: "🔒",
                            title: "Seguridad Primero",
                            description: "Nunca compartas datos sensibles. Anonimiza todo."
                        }
                    ],
                    nextModule: "Módulo 2: El Arte del Prompting"
                }
            }
        ]
    },
    MODULE_2,
    MODULE_3,
    MODULE_4,
    MODULE_5,
    WHITEBOARD_MODULE
];
