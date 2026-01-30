# Instrucciones para Cursor: Sistema Admin + Galería + Supabase

## Contexto del Proyecto

Aplicación React + Tailwind para un curso presencial de IA. El instructor (Admin) necesita:
1. Controlar qué slide ven los participantes
2. Recibir envíos de ejercicios en una galería
3. Destacar los mejores envíos para mostrar al grupo

## Arquitectura

```
┌─────────────────────────────────────────────────┐
│         RAILWAY (hosting actual)                │
│    - React App del curso                        │
│    - Módulos 1, 2, 3, 4, 5                      │
└─────────────────────────────────────────────────┘
                      │
                      │ Supabase JS Client
                      ▼
┌─────────────────────────────────────────────────┐
│         SUPABASE (gratis)                       │
│    - Tabla: session_state (slide activo)        │
│    - Tabla: participants (nombres)              │
│    - Tabla: gallery_submissions (envíos)        │
│    - Storage: submission_images                 │
│    - Realtime: sincronización                   │
└─────────────────────────────────────────────────┘
```

---

## PARTE 1: Configuración de Supabase

### 1.1 Crear proyecto en Supabase

1. Ve a supabase.com y crea cuenta/proyecto
2. Nombre sugerido: `curso-ia-2026`
3. Región: South America (São Paulo)
4. Guarda las credenciales:
   - Project URL: `https://xxxxx.supabase.co`
   - Anon Key: `eyJhbGc...`

### 1.2 Crear tablas (ejecutar en SQL Editor de Supabase)

```sql
-- Tabla para estado de la sesión (qué slide está activo)
CREATE TABLE session_state (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_code VARCHAR(20) DEFAULT 'main' UNIQUE,
    current_module VARCHAR(50) NOT NULL DEFAULT 'module-1',
    current_slide VARCHAR(50) NOT NULL DEFAULT '1-0',
    is_gallery_visible BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar sesión por defecto
INSERT INTO session_state (session_code, current_module, current_slide) 
VALUES ('main', 'module-1', '1-0');

-- Tabla para participantes
CREATE TABLE participants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_code VARCHAR(20) DEFAULT 'main',
    name VARCHAR(100) NOT NULL,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla para envíos de galería
CREATE TABLE gallery_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_code VARCHAR(20) DEFAULT 'main',
    exercise_id VARCHAR(50) NOT NULL,
    participant_id UUID REFERENCES participants(id),
    participant_name VARCHAR(100),
    prompt_text TEXT,
    result_text TEXT,
    image_url TEXT,
    is_highlighted BOOLEAN DEFAULT false,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejor rendimiento
CREATE INDEX idx_submissions_exercise ON gallery_submissions(exercise_id);
CREATE INDEX idx_submissions_highlighted ON gallery_submissions(is_highlighted);
CREATE INDEX idx_session_code ON session_state(session_code);

-- Habilitar Realtime para las tablas
ALTER PUBLICATION supabase_realtime ADD TABLE session_state;
ALTER PUBLICATION supabase_realtime ADD TABLE gallery_submissions;
```

### 1.3 Configurar Storage para imágenes

1. En Supabase Dashboard > Storage
2. Crear bucket: `submission-images`
3. Hacerlo público (para este caso de uso)
4. Políticas: permitir INSERT a todos, SELECT a todos

```sql
-- Política para storage (ejecutar en SQL Editor)
CREATE POLICY "Allow public uploads" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'submission-images');

CREATE POLICY "Allow public reads" ON storage.objects
    FOR SELECT USING (bucket_id = 'submission-images');
```

### 1.4 Habilitar Row Level Security (básico)

```sql
-- Permitir lectura pública
ALTER TABLE session_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read session" ON session_state FOR SELECT USING (true);
CREATE POLICY "Public read participants" ON participants FOR SELECT USING (true);
CREATE POLICY "Public read submissions" ON gallery_submissions FOR SELECT USING (true);
CREATE POLICY "Public insert participants" ON participants FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert submissions" ON gallery_submissions FOR INSERT WITH CHECK (true);

-- Solo permitir UPDATE en session_state con clave admin (simulado con service key en cliente admin)
CREATE POLICY "Admin update session" ON session_state FOR UPDATE USING (true);
CREATE POLICY "Admin update submissions" ON gallery_submissions FOR UPDATE USING (true);
```

---

## PARTE 2: Instalación en el Proyecto React

### 2.1 Instalar dependencias

```bash
npm install @supabase/supabase-js
```

### 2.2 Crear archivo de configuración

Crear `/src/lib/supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Constantes
export const SESSION_CODE = 'main'; // Código de sesión por defecto
```

### 2.3 Variables de entorno

Crear `.env` (no subir a git):

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
VITE_ADMIN_PASSWORD=clave-secreta-2026
```

---

## PARTE 3: Hooks Personalizados

### 3.1 Hook para sincronización de slides

Crear `/src/hooks/useSessionSync.js`:

```javascript
import { useState, useEffect } from 'react';
import { supabase, SESSION_CODE } from '../lib/supabase';

export function useSessionSync(isAdmin = false) {
    const [sessionState, setSessionState] = useState({
        currentModule: 'module-1',
        currentSlide: '1-0',
        isGalleryVisible: false
    });
    const [loading, setLoading] = useState(true);

    // Cargar estado inicial
    useEffect(() => {
        fetchSessionState();
        
        // Suscribirse a cambios en tiempo real
        const subscription = supabase
            .channel('session_changes')
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'session_state',
                filter: `session_code=eq.${SESSION_CODE}`
            }, (payload) => {
                setSessionState({
                    currentModule: payload.new.current_module,
                    currentSlide: payload.new.current_slide,
                    isGalleryVisible: payload.new.is_gallery_visible
                });
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    async function fetchSessionState() {
        const { data, error } = await supabase
            .from('session_state')
            .select('*')
            .eq('session_code', SESSION_CODE)
            .single();

        if (data) {
            setSessionState({
                currentModule: data.current_module,
                currentSlide: data.current_slide,
                isGalleryVisible: data.is_gallery_visible
            });
        }
        setLoading(false);
    }

    // Funciones solo para Admin
    async function setCurrentSlide(moduleId, slideId) {
        if (!isAdmin) return;
        
        await supabase
            .from('session_state')
            .update({
                current_module: moduleId,
                current_slide: slideId,
                updated_at: new Date().toISOString()
            })
            .eq('session_code', SESSION_CODE);
    }

    async function toggleGalleryVisibility() {
        if (!isAdmin) return;
        
        await supabase
            .from('session_state')
            .update({
                is_gallery_visible: !sessionState.isGalleryVisible,
                updated_at: new Date().toISOString()
            })
            .eq('session_code', SESSION_CODE);
    }

    return {
        sessionState,
        loading,
        setCurrentSlide,
        toggleGalleryVisibility,
        isAdmin
    };
}
```

### 3.2 Hook para participantes

Crear `/src/hooks/useParticipant.js`:

```javascript
import { useState, useEffect } from 'react';
import { supabase, SESSION_CODE } from '../lib/supabase';

export function useParticipant() {
    const [participant, setParticipant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verificar si ya existe en localStorage
        const savedParticipant = localStorage.getItem('course_participant');
        if (savedParticipant) {
            setParticipant(JSON.parse(savedParticipant));
        }
        setLoading(false);
    }, []);

    async function registerParticipant(name) {
        const { data, error } = await supabase
            .from('participants')
            .insert({
                session_code: SESSION_CODE,
                name: name
            })
            .select()
            .single();

        if (data) {
            const participantData = { id: data.id, name: data.name };
            localStorage.setItem('course_participant', JSON.stringify(participantData));
            setParticipant(participantData);
            return participantData;
        }
        return null;
    }

    function clearParticipant() {
        localStorage.removeItem('course_participant');
        setParticipant(null);
    }

    return {
        participant,
        loading,
        registerParticipant,
        clearParticipant,
        isRegistered: !!participant
    };
}
```

### 3.3 Hook para galería

Crear `/src/hooks/useGallery.js`:

```javascript
import { useState, useEffect } from 'react';
import { supabase, SESSION_CODE } from '../lib/supabase';

export function useGallery(exerciseId = null) {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubmissions();
        
        // Suscribirse a nuevos envíos
        const subscription = supabase
            .channel('gallery_changes')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'gallery_submissions',
                filter: `session_code=eq.${SESSION_CODE}`
            }, () => {
                fetchSubmissions();
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [exerciseId]);

    async function fetchSubmissions() {
        let query = supabase
            .from('gallery_submissions')
            .select('*')
            .eq('session_code', SESSION_CODE)
            .eq('is_visible', true)
            .order('is_highlighted', { ascending: false })
            .order('created_at', { ascending: false });

        if (exerciseId) {
            query = query.eq('exercise_id', exerciseId);
        }

        const { data } = await query;
        setSubmissions(data || []);
        setLoading(false);
    }

    async function submitToGallery({ exerciseId, participantId, participantName, promptText, resultText, imageFile }) {
        let imageUrl = null;

        // Subir imagen si existe
        if (imageFile) {
            const fileName = `${Date.now()}-${imageFile.name}`;
            const { data: uploadData } = await supabase.storage
                .from('submission-images')
                .upload(fileName, imageFile);

            if (uploadData) {
                const { data: urlData } = supabase.storage
                    .from('submission-images')
                    .getPublicUrl(fileName);
                imageUrl = urlData.publicUrl;
            }
        }

        const { data, error } = await supabase
            .from('gallery_submissions')
            .insert({
                session_code: SESSION_CODE,
                exercise_id: exerciseId,
                participant_id: participantId,
                participant_name: participantName || 'Anónimo',
                prompt_text: promptText,
                result_text: resultText,
                image_url: imageUrl
            })
            .select()
            .single();

        return { data, error };
    }

    // Funciones Admin
    async function highlightSubmission(submissionId, highlighted = true) {
        await supabase
            .from('gallery_submissions')
            .update({ is_highlighted: highlighted })
            .eq('id', submissionId);
    }

    async function hideSubmission(submissionId) {
        await supabase
            .from('gallery_submissions')
            .update({ is_visible: false })
            .eq('id', submissionId);
    }

    return {
        submissions,
        loading,
        submitToGallery,
        highlightSubmission,
        hideSubmission,
        refetch: fetchSubmissions
    };
}
```

---

## PARTE 4: Componentes Clave

### 4.1 Pantalla de Registro (para participantes)

Crear `/src/components/WelcomeScreen.jsx`:

```jsx
import { useState } from 'react';
import { useParticipant } from '../hooks/useParticipant';

export function WelcomeScreen({ onComplete }) {
    const [name, setName] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { registerParticipant } = useParticipant();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim()) return;
        
        setSubmitting(true);
        const participant = await registerParticipant(name.trim());
        if (participant) {
            onComplete(participant);
        }
        setSubmitting(false);
    }

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">
                        IA para Todos
                    </h1>
                    <p className="text-slate-600">
                        Bienvenido al curso. Por favor ingresa tu nombre.
                    </p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre"
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 
                                   focus:border-blue-500 focus:outline-none text-lg mb-4"
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={!name.trim() || submitting}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold
                                   hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                                   transition-colors"
                    >
                        {submitting ? 'Ingresando...' : 'Ingresar al Curso'}
                    </button>
                </form>
            </div>
        </div>
    );
}
```

### 4.2 Componente de Envío a Galería

Crear `/src/components/GallerySubmit.jsx`:

```jsx
import { useState } from 'react';
import { useGallery } from '../hooks/useGallery';
import { useParticipant } from '../hooks/useParticipant';
import { Send, Image, CheckCircle } from 'lucide-react';

export function GallerySubmit({ exerciseId, promptLabel, resultLabel, allowImage }) {
    const [promptText, setPromptText] = useState('');
    const [resultText, setResultText] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    
    const { submitToGallery } = useGallery();
    const { participant } = useParticipant();

    async function handleSubmit() {
        if (!promptText.trim() && !resultText.trim()) return;
        
        setSubmitting(true);
        const { error } = await submitToGallery({
            exerciseId,
            participantId: participant?.id,
            participantName: participant?.name,
            promptText,
            resultText,
            imageFile
        });

        if (!error) {
            setSubmitted(true);
        }
        setSubmitting(false);
    }

    if (submitted) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-green-700 font-medium">¡Enviado exitosamente!</p>
                <p className="text-green-600 text-sm mt-1">Tu resultado aparecerá en la galería</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 rounded-xl p-6 space-y-4">
            <h4 className="font-semibold text-slate-700">Comparte tu resultado</h4>
            
            <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                    {promptLabel || 'Tu prompt'}
                </label>
                <textarea
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 
                               focus:border-blue-500 focus:outline-none resize-none"
                    rows={3}
                    placeholder="Pega aquí el prompt que usaste..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                    {resultLabel || 'El resultado'}
                </label>
                <textarea
                    value={resultText}
                    onChange={(e) => setResultText(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 
                               focus:border-blue-500 focus:outline-none resize-none"
                    rows={4}
                    placeholder="Pega aquí el resultado o tu reflexión..."
                />
            </div>

            {allowImage && (
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">
                        Captura de pantalla (opcional)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
                                   file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700
                                   hover:file:bg-blue-100"
                    />
                </div>
            )}

            <button
                onClick={handleSubmit}
                disabled={(!promptText.trim() && !resultText.trim()) || submitting}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium
                           hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                           transition-colors flex items-center justify-center gap-2"
            >
                <Send className="w-4 h-4" />
                {submitting ? 'Enviando...' : 'Enviar a la Galería'}
            </button>
        </div>
    );
}
```

### 4.3 Panel de Admin

Crear `/src/components/AdminPanel.jsx`:

```jsx
import { useState } from 'react';
import { useSessionSync } from '../hooks/useSessionSync';
import { useGallery } from '../hooks/useGallery';
import { ChevronLeft, ChevronRight, Eye, EyeOff, Star, Trash2 } from 'lucide-react';

export function AdminPanel({ modules, currentModuleIndex, currentSlideIndex, onNavigate }) {
    const { setCurrentSlide, toggleGalleryVisibility, sessionState } = useSessionSync(true);
    const { submissions, highlightSubmission, hideSubmission } = useGallery();
    const [showSubmissions, setShowSubmissions] = useState(false);

    const currentModule = modules[currentModuleIndex];
    const totalSlides = currentModule?.slides?.length || 0;

    async function handlePrev() {
        if (currentSlideIndex > 0) {
            const newSlide = currentModule.slides[currentSlideIndex - 1];
            await setCurrentSlide(currentModule.id, newSlide.id);
            onNavigate(currentModuleIndex, currentSlideIndex - 1);
        } else if (currentModuleIndex > 0) {
            const prevModule = modules[currentModuleIndex - 1];
            const lastSlideIndex = prevModule.slides.length - 1;
            await setCurrentSlide(prevModule.id, prevModule.slides[lastSlideIndex].id);
            onNavigate(currentModuleIndex - 1, lastSlideIndex);
        }
    }

    async function handleNext() {
        if (currentSlideIndex < totalSlides - 1) {
            const newSlide = currentModule.slides[currentSlideIndex + 1];
            await setCurrentSlide(currentModule.id, newSlide.id);
            onNavigate(currentModuleIndex, currentSlideIndex + 1);
        } else if (currentModuleIndex < modules.length - 1) {
            const nextModule = modules[currentModuleIndex + 1];
            await setCurrentSlide(nextModule.id, nextModule.slides[0].id);
            onNavigate(currentModuleIndex + 1, 0);
        }
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-4 z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                {/* Navegación */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={handlePrev}
                        className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    
                    <span className="text-sm">
                        {currentModule?.title} - Slide {currentSlideIndex + 1}/{totalSlides}
                    </span>
                    
                    <button
                        onClick={handleNext}
                        className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Controles */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleGalleryVisibility}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors
                                    ${sessionState.isGalleryVisible 
                                        ? 'bg-green-600 hover:bg-green-700' 
                                        : 'bg-slate-700 hover:bg-slate-600'}`}
                    >
                        {sessionState.isGalleryVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        Galería
                    </button>

                    <button
                        onClick={() => setShowSubmissions(!showSubmissions)}
                        className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
                    >
                        Ver Envíos ({submissions.length})
                    </button>
                </div>
            </div>

            {/* Panel de envíos */}
            {showSubmissions && (
                <div className="max-w-6xl mx-auto mt-4 bg-slate-800 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <h4 className="font-semibold mb-3">Envíos recientes</h4>
                    <div className="space-y-2">
                        {submissions.map((sub) => (
                            <div key={sub.id} className={`p-3 rounded-lg flex items-start justify-between
                                                          ${sub.is_highlighted ? 'bg-yellow-900/30' : 'bg-slate-700'}`}>
                                <div className="flex-1">
                                    <p className="text-sm text-slate-300">{sub.participant_name} - {sub.exercise_id}</p>
                                    <p className="text-xs text-slate-400 truncate">{sub.prompt_text?.slice(0, 100)}...</p>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                    <button
                                        onClick={() => highlightSubmission(sub.id, !sub.is_highlighted)}
                                        className={`p-1 rounded ${sub.is_highlighted ? 'text-yellow-400' : 'text-slate-400'}`}
                                    >
                                        <Star className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => hideSubmission(sub.id)}
                                        className="p-1 rounded text-red-400"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
```

---

## PARTE 5: Lógica de Control de Navegación

### 5.1 Modificar App.jsx principal

En tu App.jsx, agregar esta lógica:

```jsx
import { useSessionSync } from './hooks/useSessionSync';
import { useParticipant } from './hooks/useParticipant';
import { WelcomeScreen } from './components/WelcomeScreen';
import { AdminPanel } from './components/AdminPanel';

function App() {
    // Detectar si es admin por URL
    const urlParams = new URLSearchParams(window.location.search);
    const isAdmin = urlParams.get('admin') === import.meta.env.VITE_ADMIN_PASSWORD;
    
    const { participant, isRegistered } = useParticipant();
    const { sessionState, loading } = useSessionSync(isAdmin);
    
    const [localModuleIndex, setLocalModuleIndex] = useState(0);
    const [localSlideIndex, setLocalSlideIndex] = useState(0);

    // Sincronizar slide con el estado del admin (solo para participantes)
    useEffect(() => {
        if (!isAdmin && sessionState.currentSlide) {
            // Encontrar índices basados en el slide actual del admin
            const moduleIndex = MODULES.findIndex(m => m.id === sessionState.currentModule);
            if (moduleIndex !== -1) {
                const slideIndex = MODULES[moduleIndex].slides.findIndex(
                    s => s.id === sessionState.currentSlide
                );
                if (slideIndex !== -1) {
                    setLocalModuleIndex(moduleIndex);
                    setLocalSlideIndex(slideIndex);
                }
            }
        }
    }, [sessionState, isAdmin]);

    // Verificar si el participante puede ver el slide
    function canViewSlide(moduleIndex, slideIndex) {
        if (isAdmin) return true;
        
        // El participante no puede adelantarse al admin
        if (moduleIndex > localModuleIndex) return false;
        if (moduleIndex === localModuleIndex && slideIndex > localSlideIndex) return false;
        
        return true;
    }

    // Mostrar pantalla de registro si no es admin y no está registrado
    if (!isAdmin && !isRegistered) {
        return <WelcomeScreen onComplete={() => {}} />;
    }

    return (
        <div className="app">
            {/* Tu contenido del curso aquí */}
            
            {/* Panel de admin solo visible para admin */}
            {isAdmin && (
                <AdminPanel 
                    modules={MODULES}
                    currentModuleIndex={localModuleIndex}
                    currentSlideIndex={localSlideIndex}
                    onNavigate={(m, s) => {
                        setLocalModuleIndex(m);
                        setLocalSlideIndex(s);
                    }}
                />
            )}
        </div>
    );
}
```

---

## PARTE 6: Despliegue

### 6.1 Variables de entorno en Railway

En Railway, agregar estas variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_ADMIN_PASSWORD`

### 6.2 URLs de acceso

- **Participantes:** `https://ai.abogadosonlineecuador.com`
- **Admin:** `https://ai.abogadosonlineecuador.com?admin=tu-clave-secreta`

---

## Resumen de funcionalidades

| Funcionalidad | Participante | Admin |
|---------------|--------------|-------|
| Ver slides | ✅ (hasta el actual) | ✅ (todos) |
| Navegar atrás | ✅ | ✅ |
| Navegar adelante | ❌ (bloqueado) | ✅ (controla para todos) |
| Enviar a galería | ✅ | ✅ |
| Ver galería | ✅ (si admin activa) | ✅ (siempre) |
| Destacar envíos | ❌ | ✅ |
| Ocultar envíos | ❌ | ✅ |

---

¿Dudas? Este setup debería tomar ~2 horas para implementar completamente.
