import React from 'react';
import { GraduationCap, Download, MessageSquare, Lightbulb, Heart, ExternalLink, Mail, Star, Sparkles } from "lucide-react";

export const MODULE_5 = {
    id: "module-5",
    title: "Cierre del Curso (15 min)",
    icon: GraduationCap,
    slides: [
        // --- SLIDE 5-0: PORTADA DEL CIERRE ---
        {
            id: "5-0",
            title: "Cierre",
            type: "hero",
            contentData: {
                heading: "Lo Lograste 🎉",
                paragraph: "Has completado el curso. Ahora tienes las herramientas para transformar tu trabajo con IA.",
                image: "/images/cierre-hero.png"
            }
        },

        // --- SLIDE 5-1: RESUMEN DE PUNTOS CLAVE ---
        {
            id: "5-1",
            title: "Los 6 Principios que Aprendiste",
            type: "key-points",
            contentData: {
                heading: "Nunca olvides esto",
                points: [
                    {
                        number: 1,
                        title: "Mentalidad AI First",
                        description: "Úsala desde el inicio, no solo cuando te trabas"
                    },
                    {
                        number: 2,
                        title: "La Fórmula R.C.T.F.",
                        description: "Rol + Contexto + Tarea + Formato = Resultados profesionales"
                    },
                    {
                        number: 3,
                        title: "Herramienta correcta para cada trabajo",
                        description: "No te cases con una sola. Cada una tiene su superpoder"
                    },
                    {
                        number: 4,
                        title: "Confía pero verifica",
                        description: "La IA puede mentir con total confianza. Tú eres el filtro"
                    },
                    {
                        number: 5,
                        title: "Itera siempre",
                        description: "La primera respuesta es solo el borrador"
                    },
                    {
                        number: 6,
                        title: "Tu criterio es irremplazable",
                        description: "La IA es el asistente, TÚ eres el profesional"
                    }
                ]
            }
        },

        // --- SLIDE 5-2: ENTREGA DE MATERIALES ---
        {
            id: "5-2",
            title: "Tus Materiales",
            type: "resources-download",
            contentData: {
                heading: "Llévate esto contigo",
                resources: [
                    {
                        icon: "FileText",
                        title: "Guía de Prompts Estructurada",
                        description: "PDF con prompts organizados por categoría",
                        type: "PDF",
                        downloadUrl: "https://siozkounmmfzypefjmyk.supabase.co/storage/v1/object/public/downloads/guia_prompts_estructurada.pdf"
                    },
                    {
                        icon: "CheckSquare",
                        title: "Checklist de Verificación",
                        description: "Para asegurar que no publiques alucinaciones",
                        type: "PDF",
                        downloadUrl: "/https://siozkounmmfzypefjmyk.supabase.co/storage/v1/object/public/downloads/checklist_verificacion.pdfdownloads/checklist_verificacion.pdf"
                    },
                    {
                        icon: "BookOpen",
                        title: "Glosario de Términos IA",
                        description: "Todas las palabras raras explicadas en simple",
                        type: "PDF",
                        downloadUrl: "https://siozkounmmfzypefjmyk.supabase.co/storage/v1/object/public/downloads/glosario_terminos_ia.pdf"
                    },
                    {
                        icon: "Sparkles",
                        title: "Prompts IA de Transformación Personal",
                        description: "Herramientas para transformarnos profundamente",
                        type: "PDF",
                        downloadUrl: "https://siozkounmmfzypefjmyk.supabase.co/storage/v1/object/public/downloads/Prompts_IA_Transformacion_Personal.pdf"
                    },
                    {
                        icon: "Link",
                        title: "Links a Todas las Herramientas",
                        description: "Acceso directo a cada herramienta mencionada",
                        type: "Web",
                        downloadUrl: "https://siozkounmmfzypefjmyk.supabase.co/storage/v1/object/public/downloads/links_herramientas.pdf"
                    }
                ]
            }
        },

        // --- SLIDE 5-3: MAPA DE HERRAMIENTAS FINAL ---
        {
            id: "5-3",
            title: "Tu Nuevo Arsenal",
            type: "tool-summary",
            contentData: {
                heading: "Cuándo usar cada herramienta",
                tools: [
                    { name: "Claude", useFor: "Análisis profundo, documentos legales, redacción con matices", icon: "Brain" },
                    { name: "ChatGPT", useFor: "Todoterreno, imágenes, voz, tareas generales", icon: "MessageSquare" },
                    { name: "Gemini", useFor: "Documentos masivos, ecosistema Google, videos YouTube", icon: "Sparkles" },
                    { name: "AI Studio", useFor: "Control total, cero alucinaciones (Grounding)", icon: "Settings" },
                    { name: "Perplexity", useFor: "Investigación con fuentes citadas", icon: "Search" },
                    { name: "NotebookLM", useFor: "Trabajar con TUS documentos, podcasts de estudio", icon: "BookOpen" },
                    { name: "Copilot", useFor: "Integración con Microsoft Office", icon: "Building2" }
                ],
                tip: "Guarda esta lista. Consúltala cada vez que tengas una tarea nueva."
            }
        },

        // --- SLIDE 5-4: ENCUESTA FINAL ---
        {
            id: "5-4",
            title: "Tu Feedback",
            type: "poll",
            interaction: {
                type: "LivePoll",
                data: {
                    id: "poll-final",
                    question: "Después de este curso, ¿cómo te sientes respecto a usar IA en tu trabajo?",
                    options: [
                        "🚀 Listo para implementarla mañana mismo",
                        "😊 Más confiado, pero necesito practicar",
                        "🤔 Interesado, pero aún tengo dudas",
                        "😅 Abrumado, necesito tiempo para procesar"
                    ]
                }
            }
        },

        // --- SLIDE 5-5: REFLEXIÓN FINAL ---
        {
            id: "5-5",
            title: "Reflexión Final",
            type: "quote-large",
            contentData: {
                quote: "La IA no te va a reemplazar. Pero alguien que sepa usar la IA... tal vez sí.",
                author: null,
                paragraph: "La diferencia entre tú hoy y tú hace 4 horas es enorme. Ahora tienes herramientas que el 90% de profesionales no conoce. Úsalas.",
                highlight: {
                    type: "success",
                    text: "Tu ventaja competitiva empieza hoy."
                }
            }
        },

        // --- SLIDE 5-6: PRÓXIMOS PASOS ---
        {
            id: "5-6",
            title: "¿Qué sigue?",
            type: "next-steps",
            contentData: {
                heading: "Tu plan para la próxima semana",
                steps: [
                    {
                        day: "Mañana",
                        action: "Usa la IA para UNA tarea real de tu trabajo",
                        tip: "Empieza pequeño. Un correo, un resumen, una organización."
                    },
                    {
                        day: "Esta semana",
                        action: "Prueba al menos 2 herramientas diferentes",
                        tip: "Compara resultados. Descubre cuál te gusta más."
                    },
                    {
                        day: "Este mes",
                        action: "Identifica 3 tareas repetitivas que puedas delegar a la IA",
                        tip: "El ROI más alto está en automatizar lo tedioso."
                    }
                ],
                challenge: "Reto personal: En 30 días, intenta que la IA sea parte natural de tu flujo de trabajo diario."
            }
        },

        // --- SLIDE 5-7: CONTACTO Y COMUNIDAD ---
        {
            id: "5-7",
            title: "Mantengamos el Contacto",
            type: "contact",
            contentData: {
                heading: "¿Dudas después del curso?",
                instructor: {
                    name: "José Luis Zapata",
                    role: "Abogado Notarial | Entusiasta de IA",
                    image: "/images/perfil-joseluis2.png"
                },
                channels: [
                    {
                        icon: "Mail",
                        label: "Email",
                        value: "joseluiszapataec@gmail.com",
                        action: "mailto:joseluiszapataec@gmail.com"
                    },
                    {
                        icon: "MessageSquare",
                        label: "WhatsApp",
                        value: "+593 999 266015",
                        action: "https://wa.me/593999266015"
                    },
                    {
                        icon: "Globe",
                        label: "Web",
                        value: "abogadosonlineecuador.com",
                        action: "https://abogadosonlineecuador.com"
                    }
                ],
                community: {
                    title: "Grupo de Seguimiento",
                    description: "Si te interesa, puedo crear un grupo de WhatsApp para seguir compartiendo tips y resolver dudas.",
                    action: "Levanta la mano si te interesa 🙋"
                }
            }
        },

        // --- SLIDE 5-8: FEEDBACK ---
        {
            id: "5-8",
            title: "Tu Opinión",
            type: "feedback",
            contentData: {
                heading: "Tu opinión importa",
                paragraph: "Ayúdanos a mejorar. Comparte tu experiencia y sugerencias de forma anónima."
            },
            interaction: {
                type: "feedback",
                data: {}
            }
        },

        // --- SLIDE 5-9: AGRADECIMIENTO FINAL ---
        {
            id: "5-9",
            title: "¡Gracias!",
            type: "thank-you",
            contentData: {
                heading: "Gracias por tu tiempo y atención",
                message: "Espero que este curso haya sido tan transformador para ti como lo fue para mí descubrir estas herramientas hace 2 años.",
                image: "/images/gracias.png",
                footer: "Ahora ve y sorprende a todos con tu nuevo superpoder. 🚀",
                confetti: true
            }
        }
    ]
};

export default MODULE_5;
