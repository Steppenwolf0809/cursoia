import { useState, useEffect, useRef, useCallback } from 'react';
import { ClipboardCopy, Check, Eraser, Edit3, Eye, EyeOff } from 'lucide-react';
import { supabase, SESSION_CODE } from '../lib/supabase';

export function Whiteboard({ isAdmin = false }) {
    const [content, setContent] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(true);
    
    // Refs para manejar el debounce y evitar conflictos
    const debounceRef = useRef(null);
    const isTypingRef = useRef(false);
    const lastSavedContentRef = useRef('');

    // Cargar contenido inicial y suscribirse a cambios
    useEffect(() => {
        fetchWhiteboardState();

        // Suscribirse a cambios en tiempo real
        const subscription = supabase
            .channel('whiteboard_changes')
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'session_state',
                filter: `session_code=eq.${SESSION_CODE}`
            }, (payload) => {
                // Si el admin está escribiendo, ignorar actualizaciones realtime
                if (isAdmin && isTypingRef.current) return;
                
                if (payload.new.whiteboard_content !== undefined) {
                    const newContent = payload.new.whiteboard_content || '';
                    // Solo actualizar si el contenido es diferente al último guardado
                    if (newContent !== lastSavedContentRef.current) {
                        setContent(newContent);
                        lastSavedContentRef.current = newContent;
                    }
                }
                if (payload.new.whiteboard_visible !== undefined) {
                    setIsVisible(payload.new.whiteboard_visible);
                }
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [isAdmin]);

    async function fetchWhiteboardState() {
        const { data, error } = await supabase
            .from('session_state')
            .select('whiteboard_content, whiteboard_visible')
            .eq('session_code', SESSION_CODE)
            .single();

        if (data) {
            setContent(data.whiteboard_content || '');
            lastSavedContentRef.current = data.whiteboard_content || '';
            setIsVisible(data.whiteboard_visible || false);
        }
        setLoading(false);
    }

    // Función para guardar en Supabase con debounce
    const saveToSupabase = useCallback(async (newContent) => {
        if (!isAdmin) return;

        const { error } = await supabase
            .from('session_state')
            .update({
                whiteboard_content: newContent,
                updated_at: new Date().toISOString()
            })
            .eq('session_code', SESSION_CODE);

        if (error) {
            console.error('[Whiteboard] Error updating content:', error);
        } else {
            lastSavedContentRef.current = newContent;
        }
    }, [isAdmin]);

    // Manejar cambios en el textarea con debounce
    function handleContentChange(newContent) {
        // Actualizar estado local inmediatamente
        setContent(newContent);
        
        if (!isAdmin) return;

        // Marcar que está escribiendo
        isTypingRef.current = true;

        // Limpiar timeout anterior
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        // Guardar después de 500ms de inactividad
        debounceRef.current = setTimeout(() => {
            saveToSupabase(newContent);
            isTypingRef.current = false;
        }, 500);
    }

    // Guardar inmediatamente al perder el foco
    function handleBlur() {
        if (!isAdmin) return;
        
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        
        // Guardar inmediatamente
        if (content !== lastSavedContentRef.current) {
            saveToSupabase(content);
        }
        isTypingRef.current = false;
    }

    async function toggleVisibility() {
        if (!isAdmin) return;

        const newVisibility = !isVisible;
        setIsVisible(newVisibility);

        const { error } = await supabase
            .from('session_state')
            .update({
                whiteboard_visible: newVisibility,
                updated_at: new Date().toISOString()
            })
            .eq('session_code', SESSION_CODE);

        if (error) {
            console.error('[Whiteboard] Error toggling visibility:', error);
        }
    }

    async function clearContent() {
        if (!isAdmin) return;
        
        setContent('');
        lastSavedContentRef.current = '';
        
        const { error } = await supabase
            .from('session_state')
            .update({
                whiteboard_content: '',
                updated_at: new Date().toISOString()
            })
            .eq('session_code', SESSION_CODE);

        if (error) {
            console.error('[Whiteboard] Error clearing content:', error);
        }
    }

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Error al copiar:', err);
        }
    }

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center text-slate-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Vista para estudiantes cuando la pizarra está oculta
    if (!isAdmin && !isVisible) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center p-8">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <EyeOff className="w-8 h-8 text-slate-300" />
                </div>
                <p className="font-medium text-slate-500">Pizarra oculta</p>
                <p className="text-sm mt-1">El instructor aún no ha activado la pizarra</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    <span className="font-semibold text-sm">Pizarra</span>
                </div>
                {isAdmin && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleVisibility}
                            className={`p-1.5 rounded-lg transition-colors ${
                                isVisible 
                                    ? 'bg-green-500/20 text-green-100 hover:bg-green-500/30' 
                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                            title={isVisible ? 'Ocultar pizarra' : 'Mostrar pizarra'}
                        >
                            {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                    </div>
                )}
            </div>

            {/* Contenido */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {isAdmin ? (
                    // Vista del instructor - Editor
                    <div className="flex-1 flex flex-col">
                        <div className="flex-1 p-4">
                            <textarea
                                value={content}
                                onChange={(e) => handleContentChange(e.target.value)}
                                onBlur={handleBlur}
                                placeholder="Escribe o pega aquí el texto para compartir con los estudiantes..."
                                className="w-full h-full resize-none p-4 rounded-xl border border-slate-200 
                                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none
                                         text-sm leading-relaxed text-slate-700
                                         bg-slate-50/50"
                            />
                        </div>
                        
                        {/* Toolbar del instructor */}
                        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-500">
                                    {content.length} caracteres
                                </span>
                                {!isVisible && (
                                    <span className="text-xs text-amber-600 font-medium">
                                        (Oculta para estudiantes)
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={clearContent}
                                    disabled={!content}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
                                             text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed
                                             transition-colors"
                                >
                                    <Eraser className="w-4 h-4" />
                                    Limpiar
                                </button>
                                <button
                                    onClick={toggleVisibility}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                                             transition-colors ${
                                                 isVisible
                                                     ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                     : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                             }`}
                                >
                                    {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    {isVisible ? 'Visible' : 'Mostrar'}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Vista del estudiante - Solo lectura con botón de copiar
                    <div className="flex-1 flex flex-col">
                        <div className="flex-1 p-4 overflow-y-auto">
                            {content ? (
                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                    <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                                        {content}
                                    </pre>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                        <Edit3 className="w-8 h-8 text-slate-300" />
                                    </div>
                                    <p className="font-medium text-slate-500">Pizarra vacía</p>
                                    <p className="text-sm mt-1">Esperando contenido del instructor...</p>
                                </div>
                            )}
                        </div>
                        
                        {/* Toolbar del estudiante */}
                        {content && (
                            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
                                <button
                                    onClick={copyToClipboard}
                                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                                             font-medium transition-all ${
                                                 copied
                                                     ? 'bg-green-100 text-green-700'
                                                     : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-900/20'
                                             }`}
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            ¡Copiado!
                                        </>
                                    ) : (
                                        <>
                                            <ClipboardCopy className="w-4 h-4" />
                                            Copiar contenido
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Whiteboard;
