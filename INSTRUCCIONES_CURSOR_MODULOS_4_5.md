# Instrucciones para Cursor: Componentes Módulos 4 y 5

## Contexto

Ya tienes implementados componentes para los Módulos 1, 2 y 3. Ahora necesitas crear los componentes para el Módulo 4 (Taller Práctico) y Módulo 5 (Cierre).

Revisa los archivos `MODULO_4.js` y `MODULO_5.js` para ver la estructura de datos de cada slide.

## Estilo Visual (mantener consistencia)

- Colores: azul oscuro (#1a365d), azul medio (#3182ce), dorado (#d69e2e)
- Acentos por caso: rojo (#E53E3E), azul (#3182CE), verde (#38A169), morado (#805AD5), naranja (#DD6B20), rosa (#D53F8C), teal (#319795)
- Bordes redondeados: rounded-xl, rounded-2xl
- Sombras: shadow-md, shadow-lg
- Fuente: Inter o sistema
- Espaciado generoso (p-6, p-8, gap-4, gap-6)

---

## Nuevos Tipos de Slide a Implementar

### 1. `rules`
Muestra las reglas del taller en cards con iconos.

**Estructura de datos:**
```javascript
contentData: {
    heading: "Cómo funcionará el taller",
    rules: [
        { icon: "Clock", title: "Tiempo por ejercicio", description: "5-10 minutos por caso..." },
        // más reglas
    ],
    tip: "Texto de consejo opcional"
}
```

**Diseño:**
- Grid de 2x2 en desktop, 1 columna en móvil
- Cada card con icono a la izquierda, título en bold, descripción debajo
- Tip al final con fondo amarillo suave

---

### 2. `case-intro`
Introduce cada caso práctico con número, título e información.

**Estructura de datos:**
```javascript
contentData: {
    caseNumber: 1,
    heading: "Correos que Nadie Quiere Escribir",
    icon: "Mail",
    color: "#E53E3E",
    description: "Cobrar deudas, rechazar propuestas...",
    duration: "15 minutos",
    tools: ["ChatGPT", "Claude", "Gemini"]
}
```

**Diseño:**
- Badge grande con número del caso y color de fondo
- Icono grande al lado del heading
- Descripción en texto normal
- Footer con duración y badges de herramientas recomendadas
- Borde izquierdo con el color del caso

---

### 3. `prompt-template`
Muestra una plantilla de prompt con bloque de código copiable.

**Estructura de datos:**
```javascript
contentData: {
    heading: "Tu plantilla base",
    template: `Actúa como experto en...
    
CONTEXTO:
- Mi rol: [tu posición]
...`,
    examples: [
        "Cobrar factura atrasada a cliente VIP",
        "Rechazar propuesta de socio..."
    ],
    tip: "Texto opcional"
}
```

**Diseño:**
- Bloque de código con fondo slate-900, texto verde/blanco mono
- Botón "Copiar" en esquina superior derecha del bloque
- Lista de ejemplos como chips/badges debajo
- Feedback visual al copiar (checkmark por 2 segundos)

---

### 4. `exercise-interactive`
Slide de ejercicio con instrucciones y componente GallerySubmit.

**Estructura de datos:**
```javascript
contentData: {
    heading: "Escribe un correo que has estado evitando",
    instructions: "Piensa en un correo real...",
    duration: "10 minutos",
    steps: ["1. Abre tu IA favorita", "2. Adapta la plantilla..."],
    sampleInput: "Texto de ejemplo opcional",
    ideas: ["idea 1", "idea 2"], // opcional
    challenge: "Reto: ...", // opcional
    tip: "Texto opcional"
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
```

**Diseño:**
- Dos columnas en desktop: izquierda instrucciones, derecha GallerySubmit
- Una columna en móvil: instrucciones arriba, GallerySubmit abajo
- Steps como lista numerada con iconos de check
- Duration como badge en la esquina
- Si hay sampleInput, mostrarlo en bloque colapsable "Ver ejemplo"

---

### 5. `break`
Slide de descanso con countdown opcional.

**Estructura de datos:**
```javascript
contentData: {
    heading: "Descanso 15 minutos",
    message: "Estira las piernas, toma agua...",
    image: "/images/coffee-break.png",
    nextPreview: "Siguiente: Aprendizaje de Idiomas con IA de Voz"
}
```

**Diseño:**
- Centrado vertical y horizontal
- Icono de café grande o imagen
- Heading grande
- Mensaje en texto suave
- Preview del siguiente tema en la parte inferior
- Fondo con gradiente suave diferente al resto

---

### 6. `tool-comparison-voice`
Comparativa de herramientas de voz en cards expandibles.

**Estructura de datos:**
```javascript
contentData: {
    heading: "3 opciones para practicar",
    tools: [
        {
            name: "https://app.sesame.com/",
            icon: "Mic",
            description: "Voces ultra-realistas con emociones",
            pros: ["Voces más naturales", "Detecta tu nivel..."],
            cons: ["Requiere cuenta", "Puede tener esperas"],
            bestFor: "Práctica intensiva de pronunciación",
            url: "https://app.sesame.com/"
        },
        // más tools
    ]
}
```

**Diseño:**
- 3 cards en fila (desktop) o stack (móvil)
- Cada card expandible al hacer clic
- Estado colapsado: icono, nombre, descripción corta
- Estado expandido: pros (verde), cons (rojo), bestFor (destacado), botón ir a URL
- Animación suave de expansión

---

### 7. `setup-guide`
Guía paso a paso para configurar una herramienta.

**Estructura de datos:**
```javascript
contentData: {
    heading: "Cómo configurar https://app.sesame.com/",
    tool: "https://app.sesame.com/",
    steps: [
        { step: 1, title: "Entra a https://app.sesame.com/", description: "Abre el navegador..." },
        { step: 2, title: "Permite el micrófono", description: "El navegador te pedirá..." },
        // más pasos
    ],
    tip: "Demo en vivo: Vamos a hacer una conversación corta en inglés"
}
```

**Diseño:**
- Timeline vertical con números en círculos conectados por línea
- Cada paso con título en bold y descripción
- Tip al final destacado con icono de bombilla
- Posibilidad de marcar pasos como "completados" (opcional, visual)

---

### 8. `prompt-collection`
Colección de prompts categorizados.

**Estructura de datos:**
```javascript
contentData: {
    heading: "Prompts que funcionan",
    prompts: [
        {
            title: "Tutor estricto",
            prompt: "Eres mi tutor de inglés...",
            useCase: "Cuando quieres mejorar rápido"
        },
        // más prompts
    ]
}
```

**Diseño:**
- Cards en grid 2x2
- Cada card con título, prompt en bloque de código pequeño, useCase como tag
- Botón copiar en cada card
- Hover effect para destacar

---

### 9. `feature-showcase`
Muestra casos de uso de una funcionalidad.

**Estructura de datos:**
```javascript
contentData: {
    heading: "Gemini Live puede VER tu problema",
    paragraph: "Con la cámara activa...",
    useCases: [
        { icon: "Tv", title: "Configurar dispositivos", example: "Apunta al control remoto..." },
        // más casos
    ],
    warning: "Requiere la app de Gemini en móvil con cámara habilitada"
}
```

**Diseño:**
- Heading y párrafo arriba
- Grid de useCases como cards con icono, título, ejemplo
- Warning al final con fondo amarillo/naranja suave y icono de alerta

---

### 10. `workflow`
Flujo de trabajo en pasos horizontales o verticales.

**Estructura de datos:**
```javascript
contentData: {
    heading: "3 pasos para prompts de élite",
    steps: [
        {
            number: 1,
            title: "Busca fuentes sobre prompting",
            description: "Usa Perplexity para encontrar guías...",
            tool: "Perplexity",
            example: "\"mejores técnicas de prompting para...\""
        },
        // más pasos
    ],
    result: "Obtienes un prompt profesional basado en literatura experta"
}
```

**Diseño:**
- 3 columnas conectadas con flechas (desktop)
- Stack vertical con línea conectora (móvil)
- Cada paso: número en círculo, título, descripción, badge de herramienta, ejemplo en itálica
- Result al final como conclusión destacada

---

### 11. `gallery-view`
Vista de la galería de envíos (para mostrar en pantalla principal).

**Estructura de datos:**
```javascript
contentData: {
    heading: "Los Mejores Prompts del Grupo",
    description: "Aquí están los envíos de todos...",
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
```

**Diseño:**
- Grid de cards con los envíos
- Envíos destacados (is_highlighted) aparecen primero y más grandes
- Cada card: nombre (o "Anónimo"), ejercicio, texto truncado, imagen si existe
- Modal al hacer clic para ver completo
- Para admin: botones de destacar/ocultar en cada card

---

### 12. `key-points`
Puntos clave numerados con descripción.

**Estructura de datos:**
```javascript
contentData: {
    heading: "Nunca olvides esto",
    points: [
        { number: 1, title: "Mentalidad AI First", description: "Úsala desde el inicio..." },
        // más puntos
    ]
}
```

**Diseño:**
- Lista vertical con números grandes en círculos de color
- Título en bold, descripción en texto normal
- Alternar colores de fondo sutilmente entre puntos
- Animación de entrada escalonada

---

### 13. `resources-download`
Lista de recursos descargables.

**Estructura de datos:**
```javascript
contentData: {
    heading: "Llévate esto contigo",
    resources: [
        {
            icon: "FileText",
            title: "Kit Maestro de Prompts",
            description: "PDF con 30+ prompts organizados...",
            type: "PDF",
            downloadUrl: "/downloads/kit-maestro-prompts.pdf"
        },
        // más recursos
    ]
},
interaction: {
    type: "ResourceLibrary",
    data: { trackDownloads: true }
}
```

**Diseño:**
- Cards en grid con icono, título, descripción, badge de tipo
- Botón "Descargar" prominente en cada card
- Feedback visual al hacer clic (descargando... → descargado ✓)
- Contador de descargas opcional para admin

---

### 14. `tool-summary`
Resumen final de todas las herramientas.

**Estructura de datos:**
```javascript
contentData: {
    heading: "Cuándo usar cada herramienta",
    tools: [
        { name: "Claude", useFor: "Análisis profundo, documentos legales...", icon: "Brain" },
        // más tools
    ],
    tip: "Guarda esta lista. Consúltala cada vez que tengas una tarea nueva."
}
```

**Diseño:**
- Lista compacta con icono, nombre en bold, useFor en texto normal
- Fondo alternado entre filas
- Tip al final destacado
- Posibilidad de expandir para ver más detalles (opcional)

---

### 15. `quote-large`
Cita grande con reflexión.

**Estructura de datos:**
```javascript
contentData: {
    quote: "La IA no te va a reemplazar. Pero alguien que sepa usar la IA... tal vez sí.",
    author: null, // o "Nombre del autor"
    paragraph: "La diferencia entre tú hoy y tú hace 4 horas es enorme...",
    highlight: { type: "success", text: "Tu ventaja competitiva empieza hoy." }
}
```

**Diseño:**
- Cita en texto muy grande (text-3xl o 4xl), centrada, con comillas decorativas
- Autor debajo si existe
- Párrafo en texto normal
- Highlight como banner al final
- Fondo con gradiente sutil o patrón

---

### 16. `next-steps`
Plan de acción con timeline.

**Estructura de datos:**
```javascript
contentData: {
    heading: "Tu plan para la próxima semana",
    steps: [
        { day: "Mañana", action: "Usa la IA para UNA tarea real...", tip: "Empieza pequeño..." },
        { day: "Esta semana", action: "Prueba al menos 2 herramientas...", tip: "Compara resultados..." },
        { day: "Este mes", action: "Identifica 3 tareas repetitivas...", tip: "El ROI más alto está en..." }
    ],
    challenge: "Reto personal: En 30 días, intenta que la IA sea parte natural..."
}
```

**Diseño:**
- Timeline horizontal con 3 puntos (Mañana, Esta semana, Este mes)
- Cada punto expandible con action y tip
- Challenge al final como banner destacado con icono de trofeo
- Progresión visual de colores (más intenso conforme avanza)

---

### 17. `contact`
Información de contacto del instructor.

**Estructura de datos:**
```javascript
contentData: {
    heading: "¿Dudas después del curso?",
    instructor: {
        name: "José Luis Zapata",
        role: "Abogado Notarial | Entusiasta de IA",
        image: "/images/perfil-joseluis.png"
    },
    channels: [
        { icon: "Mail", label: "Email", value: "jlzapata@example.com", action: "mailto:..." },
        { icon: "MessageSquare", label: "WhatsApp", value: "+593 99 XXX XXXX", action: "https://wa.me/..." },
        // más canales
    ],
    community: {
        title: "Grupo de Seguimiento",
        description: "Si te interesa, puedo crear un grupo de WhatsApp...",
        action: "Levanta la mano si te interesa 🙋"
    }
}
```

**Diseño:**
- Card de perfil con imagen, nombre, rol
- Lista de canales como botones/links con iconos
- Sección de comunidad destacada con CTA
- Diseño amigable y accesible

---

### 18. `thank-you`
Slide final de agradecimiento.

**Estructura de datos:**
```javascript
contentData: {
    heading: "Gracias por tu tiempo y atención",
    message: "Espero que este curso haya sido tan transformador...",
    image: "/images/gracias.png",
    footer: "Ahora ve y sorprende a todos con tu nuevo superpoder. 🚀",
    confetti: true
}
```

**Diseño:**
- Centrado completo
- Heading muy grande
- Mensaje emotivo
- Imagen o ilustración
- Footer como firma
- Si confetti: true, mostrar animación de confetti al entrar al slide (usar librería como canvas-confetti)

---

## Componentes de Interacción

### GallerySubmit
Ya está definido en las instrucciones de Admin/Galería. Asegúrate de que:
- Se integre con el hook useGallery
- Muestre feedback de envío exitoso
- Permita subir imágenes cuando allowImage: true
- Los labels sean configurables

### GalleryDisplay
Componente para mostrar los envíos de la galería:
- Usa el hook useGallery para obtener submissions
- Filtra por exerciseId si se especifica
- Muestra destacados primero
- Modal para ver envío completo
- Para admin: controles de destacar/ocultar

---

## Orden de implementación sugerido

1. **Primero (más usados en Módulo 4):**
   - `case-intro`
   - `prompt-template`
   - `exercise-interactive`
   - `GallerySubmit` component

2. **Segundo (resto de Módulo 4):**
   - `rules`
   - `break`
   - `tool-comparison-voice`
   - `setup-guide`
   - `prompt-collection`
   - `feature-showcase`
   - `workflow`
   - `gallery-view`

3. **Tercero (Módulo 5):**
   - `key-points`
   - `resources-download`
   - `tool-summary`
   - `quote-large`
   - `next-steps`
   - `contact`
   - `thank-you`

---

## Notas adicionales

- Todos los componentes deben ser responsive (mobile-first)
- Usar Framer Motion para animaciones si ya está instalado
- Los bloques de código deben tener syntax highlighting básico
- Botones de copiar deben funcionar con navigator.clipboard
- Imágenes deben tener fallback si no cargan
- Mantener accesibilidad (aria-labels, contraste de colores)
