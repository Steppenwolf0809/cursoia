// NUEVAS DIAPOSITIVAS PARA MÓDULO 2
// Insertar ANTES de la slide 2-15 (poll) y DESPUÉS de la 2-14 (warning)
// IDs sugeridos: 2-14a, 2-14b, 2-14c, 2-14d, 2-14e

import { Bot, Eye, Sparkles, AlertCircle, CheckCircle, XCircle, Type, MessageCircle, Edit3 } from "lucide-react";

export const NUEVAS_SLIDES_MODULO_2 = [
    // --- SLIDE 2-14a: INTRODUCCIÓN AL PROBLEMA ---
    {
        id: "2-14a",
        title: "El Problema: Textos que 'Huelen' a IA",
        type: "concept",
        contentData: {
            heading: "¿Por qué detectan cuando usas IA?",
            paragraph: "La IA genera contenido útil, pero tiene patrones reconocibles. Aprender a identificarlos te permitirá crear textos más auténticos y humanos.",
            image: "/images/ai-detection.png",
            bullets: [
                "🤖 Los textos de IA suelen ser predecibles y genéricos",
                "👀 Los lectores experimentados detectan el patrón inmediatamente",
                "✨ Humanizar no es engañar: es adaptar el contenido a TU voz",
                "🎯 El objetivo: mantener la eficiencia de la IA con la autenticidad humana"
            ]
        }
    },

    // --- SLIDE 2-14b: SEÑALES DE ALERTA ---
    {
        id: "2-14b",
        title: "Señales de Alerta: Texto 100% IA",
        type: "warning-table",
        contentData: {
            heading: "¿Cómo reconocer un texto generado por IA?",
            paragraph: "Estos son los 'tells' más comunes que delatan contenido no humanizado:",
            columns: ["Señal de Alerta", "Ejemplo típico", "Por qué lo hace la IA"],
            rows: [
                ["🎭 Emojis excesivos", "¡Hola! 👋 Me alegra mucho 😊 ayudarte 🙌 con esto ✨", "Intenta parecer amigable pero exagera"],
                ["📋 Listas interminables", "Bullets dentro de bullets con 5+ niveles", "Estructura jerárquica por defecto"],
                ["🔤 Palabras genéricas", "'En el mundo actual', 'Es importante', 'Recuerda que'", "Fórmulas seguras y ambiguas"],
                ["✅ Lenguaje corporativo vacío", "'Soluciones innovadoras', 'Optimizar procesos'", "Evita comprometerse con afirmaciones específicas"],
                ["📊 Estructura perfecta", "Exactamente 3 puntos, mismas longitudes", "Sigue patrones de entrenamiento"],
                ["🔄 Repetición de frases", "'En conclusión', 'Es importante destacar'", "Conectores predeterminados"]
            ]
        }
    },

    // --- SLIDE 2-14c: TÉCNICA DE HUMANIZACIÓN ---
    {
        id: "2-14c",
        title: "Técnica: Humanizar tu Contenido",
        type: "technique",
        contentData: {
            heading: "Convierte texto de IA en TU texto",
            icon: "Edit3",
            paragraph: "Sigue estos pasos para transformar contenido genérico en algo auténticamente tuyo:",
            examples: [
                {
                    label: "Paso 1: Elimina el 'ruido'",
                    text: "Quita emojis innecesarios, introductores genéricos ('En el mundo actual...') y conclusiones forzadas."
                },
                {
                    label: "Paso 2: Rompe la estructura perfecta",
                    text: "Une ideas, crea oraciones de diferente longitud, añade una digresión personal."
                },
                {
                    label: "Paso 3: Inserta tu voz",
                    text: "Usa expresiones que TÚ usarías, referencias personales, ejemplos de tu experiencia."
                },
                {
                    label: "Paso 4: Lee en voz alta",
                    text: "Si suena robótico al leerlo, reescríbelo como si lo dijeras a un colega."
                }
            ],
            tip: "Regla de oro: Si al leerlo piensas 'nadie habla así', la IA escribió eso."
        }
    },

    // --- SLIDE 2-14d: ANTES Y DESPUÉS ---
    {
        id: "2-14d",
        title: "Ejemplo: De IA a Humano",
        type: "comparison",
        contentData: {
            heading: "Transformación real",
            paragraph: "Mira cómo un texto 100% IA se convierte en algo auténtico:",
            headers: ["❌ Versión IA (detectable)", "✅ Versión Humanizada"],
            rows: [
                [
                    "En el mundo actual 🌍, es crucial optimizar nuestros procesos de trabajo ✅ para maximizar la productividad 📈 y alcanzar nuestros objetivos 🎯 de manera eficiente. A continuación, te presento 5 estrategias clave 🔑 que debes implementar:",
                    "Voy a ser directo: hemos estado perdiendo tiempo en procesos que no aportan. La semana pasada me di cuenta de que pasaba 2 horas diarias organizando emails. Estas son las estrategias que me funcionaron (y las que no)."
                ],
                [
                    "1️⃣ Priorización de tareas\n2️⃣ Eliminación de distracciones\n3️⃣ Uso de herramientas tecnológicas\n4️⃣ Delegación efectiva\n5️⃣ Descansos programados",
                    "Primero, deja de organizar tareas por 'urgencia' (eso nunca funciona). Luego prueba esto: silencia WhatsApp durante bloques de 45 minutos. Usa la IA para borradores, pero tú dale el toque final. Delega lo que alguien más puede hacer al 80%. Y sí, toma descansos sin culpa."
                ],
                [
                    "En conclusión, implementar estas estrategias te permitirá alcanzar el éxito profesional 🌟",
                    "Al final del día, la productividad es personal. Esto me funcionó a mí, pero prueba y ajusta a tu estilo."
                ]
            ]
        }
    },

    // --- SLIDE 2-14e: CHECKLIST RÁPIDO ---
    {
        id: "2-14e",
        title: "Checklist: ¿Tu texto pasa por humano?",
        type: "concept",
        contentData: {
            heading: "Verificación rápida antes de enviar",
            paragraph: "Revisa tu texto con estas preguntas:",
            bullets: [
                "☐ ¿Tiene menos de 2 emojis por párrafo?",
                "☐ ¿Evitas frases como 'En el mundo actual' o 'Es importante'?",
                "☐ ¿Las oraciones tienen diferentes longitudes?",
                "☐ ¿Incluyes alguna referencia personal o experiencia propia?",
                "☐ ¿Suena natural al leerlo en voz alta?",
                "☐ ¿La estructura NO es perfectamente simétrica?",
                "☐ ¿Usas palabras que TÚ normalmente usarías?"
            ],
            highlight: {
                type: "success",
                text: "Si respondiste SÍ a 5+ preguntas: ¡tu texto está humanizado! 🎉"
            }
        }
    }
];

export default NUEVAS_SLIDES_MODULO_2;

/* 
INSTRUCCIONES DE IMPLEMENTACIÓN:

1. Copiar este contenido en el archivo MODULO_2.js

2. Insertar las slides DESPUÉS de la slide 2-14 (Work Slop) y ANTES de la 2-15 (poll):
   
   Orden final:
   - 2-14: Work Slop (existente)
   - 2-14a: Intro al problema (nueva)
   - 2-14b: Señales de alerta (nueva)
   - 2-14c: Técnica de humanización (nueva)
   - 2-14d: Ejemplo antes/después (nueva)
   - 2-14e: Checklist (nueva)
   - 2-15: Encuesta (existente)
   - 2-16: Ejercicio práctico (existente)

3. Asegurarse de que los iconos necesarios estén importados en MODULO_2.js:
   import { Edit3 } from "lucide-react";
   (Los demás iconos ya están en el archivo original)

4. Nota: El tipo 'checklist' se cambió a 'concept' para usar la estructura existente
   con bullets que incluyen checkboxes ☐
*/
