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
        id: "intro",
        title: "1. Fundamentos de IA",
        icon: BookOpen,
        slides: [
            {
                id: "welcome",
                title: "Bienvenidos al Futuro Legal",
                content: (
                    <>
                        <p className="text-lg leading-relaxed text-gray-200">
                            La Inteligencia Artificial no viene a reemplazar a los abogados, sino a <strong>potenciar</strong> a aquellos que la utilicen.
                        </p>
                    </>
                ),
                bullets: [
                    "Instructores: José Luis Zapata",
                    "Enfoque: Práctico y aplicable",
                    "Herramientas: Gemini, NotebookLM, AistudioChatGPT, Claude, Perplexity, Cursor"
                ],
                interaction: {
                    type: "LivePoll",
                    data: {
                        question: "¿Cuál es tu mayor temor respecto a la IA?",
                        options: [
                            "Reemplazo laboral",
                            "Privacidad de datos",
                            "Alucinaciones (errores)",
                            "Curva de aprendizaje"
                        ]
                    }
                }
            },
            {
                id: "what-is-ai",
                title: "¿Qué es realmente la IA Generativa?",
                content: (
                    <>
                        <p className="mb-4 text-gray-200">
                            Modelos Probabilísticos, no 'máquinas de verdad'. Predicen la siguiente palabra basándose en patrones.
                        </p>
                    </>
                ),
                bullets: [
                    "Entrenados con internet completo",
                    "No 'piensan', procesan patrones",
                    "La calidad de la respuesta depende del prompt"
                ],
                interaction: null
            }
        ]
    },
    {
        id: "prompting",
        title: "2. Prompt Engineering",
        icon: MessageSquare,
        slides: [
            {
                id: "prompt-structure",
                title: "La Fórmula Maestra",
                content: (
                    <p className="text-gray-200">Para obtener resultados profesionales, necesitamos estructura. El método <strong>R.C.T.F.</strong> es infalible.</p>
                ),
                bullets: [
                    "Rol: ¿Quién es la IA?",
                    "Contexto: ¿Qué está pasando?",
                    "Tarea: ¿Qué debe hacer exactamente?",
                    "Formato: ¿Cómo quieres el resultado?"
                ],
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
            }
        ]
    },
    {
        id: "tools",
        title: "3. Herramientas del Oficio",
        icon: Zap,
        slides: [
            {
                id: "tool-radar",
                title: "Radar de Herramientas Legales",
                content: (
                    <p className="text-gray-200">No todas las IA son iguales. Cada una tiene su 'superpoder'.</p>
                ),
                bullets: [
                    "ChatGPT (OpenAI): El generalista creativo",
                    "Claude (Anthropic): El analista de documentos",
                    "Perplexity.ai: El investigador con fuentes"
                ],
                interaction: {
                    type: "ToolRadar",
                    data: {
                        tools: [
                            {
                                name: "ChatGPT-4o",
                                icon: "MessageSquare",
                                description: "El estándar de la industria. Rápido, multimodal y creativo.",
                                strengths: "Razonamiento lógico, redacción creativa, visión.",
                                whenToUse: "Redacción de correos, brainstorming, resúmenes rápidos."
                            },
                            {
                                name: "Claude 3.5 Sonnet",
                                icon: "FileText",
                                description: "El mejor redactor y lector. Ventana de contexto enorme.",
                                strengths: "Análisis de contratos largos, escritura humana, sigue instrucciones complejas.",
                                whenToUse: "Revisión de escrituras, análisis de jurisprudencia extensa."
                            },
                            {
                                name: "Perplexity",
                                icon: "Target",
                                description: "Buscador con esteroides. Responde con fuentes reales.",
                                strengths: "Información en tiempo real, cita fuentes, búsqueda académica.",
                                whenToUse: "Investigación de leyes vigentes, búsqueda de precedentes recientes."
                            }
                        ]
                    }
                }
            }
        ]
    },
    {
        id: "cases",
        title: "4. Casos de Uso",
        icon: Layout,
        slides: [
            {
                id: "case-study",
                title: "Laboratorio Práctico",
                content: (
                    <p className="text-gray-200">Apliquemos lo aprendido en situaciones reales de la notaría.</p>
                ),
                interaction: {
                    type: "CaseStudyPanel",
                    data: {
                        cases: [
                            {
                                id: "contract-review",
                                title: "Revisión de Contrato de Arrendamiento",
                                template: "Actúa como abogado experto. Analiza las siguientes cláusulas del contrato de arrendamiento adjunto y señala posibles riesgos para el arrendatario: [Pegar Clausulas]",
                                fields: ["Pegar Clausulas"]
                            },
                            {
                                id: "email-client",
                                title: "Email a Cliente Difícil",
                                template: "Redacta un correo electrónico formal pero empático para un cliente que reclama por la demora en su trámite [Número de Trámite]. Explica que se debe a [Razón del Retraso] y ofrece [Solución].",
                                fields: ["Número de Trámite", "Razón del Retraso", "Solución"]
                            }
                        ]
                    }
                }
            }
        ]
    },
    {
        id: "resources",
        title: "5. Recursos",
        icon: Download,
        slides: [
            {
                id: "library",
                title: "Biblioteca de Prompts",
                content: (
                    <p className="text-gray-200">Lleva contigo estas guías y templates para empezar mañana mismo.</p>
                ),
                interaction: {
                    type: "ResourceLibrary",
                    data: {
                        resources: RESOURCES
                    }
                }
            }
        ]
    }
];
