import React from 'react';
import { BookOpen, MessageSquare, Cpu, FileText, Download, Target, Zap, Layout, CheckCircle } from "lucide-react";

export const RESOURCES = [
    { name: "Mega-Guía de Prompts Legales", type: "PDF", size: "2.4 MB", downloadUrl: "#" },
    { name: "Checklist de Verificación de IA", type: "Notion", size: "Link", downloadUrl: "#" },
    { name: "Glosario de Términos IA", type: "PDF", size: "1.1 MB", downloadUrl: "#" }
];

export const MASTER_KIT_CONTENT = {
    title: "Master Kit",
    description: "Recursos exclusivos para el curso."
};

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
                    image: "/images/promo-curso.png"
                }
            },
            // --- SECCIÓN 1: APERTURA E HISTORIA ---
            {
                id: "1-1",
                title: "La Realidad Actual",
                type: "stat-comparison",
                contentData: {
                    heading: "De 45 minutos a 10 minutos",
                    statPrimary: "10 min",
                    statSecondary: "45 min",
                    label: "Tiempo promedio por documento",
                    quote: "Tranquila jefa, ahora sí tengo tiempo de revisar que todo esté perfecto."
                }
            },
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
                    heading: "La prueba que lo cambió todo",
                    paragraph: "Pedí un acta de mediación ficticia y obtuve:",
                    bullets: [
                        "📍 Direcciones reales de Quito",
                        "📞 Teléfonos con formato ecuatoriano",
                        "🇪🇨 Contexto local perfecto"
                    ],
                    highlight: { type: "success", text: "Esto no es un juguete. Es una herramienta profesional." }
                }
            },
            {
                id: "1-4",
                title: "ADVERTENCIA CRÍTICA",
                type: "warning",
                contentData: {
                    heading: "La IA Miente",
                    paragraph: "La Inteligencia Artificial no tiene moral. Su prioridad es satisfacer tu pregunta, no decir la verdad.",
                    highlight: { type: "danger", text: "Tu trabajo obligatorio: VERIFICAR SIEMPRE." }
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
            {
                id: "1-7",
                title: "¿Cómo funciona realmente?",
                type: "concept",
                contentData: {
                    heading: "No piensa, PREDICE.",
                    paragraph: "Es una calculadora gigante de probabilidades. Adivina la siguiente palabra.",
                    image: "/images/next-token.png",
                    bullets: [
                        "1. Aprender (Datos)",
                        "2. Decidir (Patrones)",
                        "3. Crear (Generar)"
                    ]
                }
            },
            {
                id: "1-8",
                title: "Capacidades: La Verdad",
                type: "list-comparison",
                contentData: {
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
                id: "1-9",
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
                id: "1-10",
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
            }
        ]
    }
];
