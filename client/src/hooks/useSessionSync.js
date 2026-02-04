import { useState, useEffect } from 'react';
import { supabase, SESSION_CODE } from '../lib/supabase';

export function useSessionSync(isAdmin = false) {
    const [sessionState, setSessionState] = useState({
        currentModule: 'module-1',
        currentSlide: '1-0',
        isGalleryVisible: false,
        isFreeMode: false,
        freeModuleId: null,
        whiteboardContent: '',
        whiteboardVisible: false
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
                    isGalleryVisible: payload.new.is_gallery_visible,
                    isFreeMode: payload.new.is_free_mode ?? false,
                    freeModuleId: payload.new.free_module_id ?? null,
                    whiteboardContent: payload.new.whiteboard_content ?? '',
                    whiteboardVisible: payload.new.whiteboard_visible ?? false
                });
            })
            .subscribe();

        // Fallback: for students, periodically refetch state in case realtime updates are missed
        const pollId = !isAdmin
            ? setInterval(() => {
                fetchSessionState();
            }, 2000)
            : null;

        return () => {
            subscription.unsubscribe();
            if (pollId) {
                clearInterval(pollId);
            }
        };
    }, [isAdmin]);

    async function fetchSessionState() {
        const { data, error } = await supabase
            .from('session_state')
            .select('*')
            .eq('session_code', SESSION_CODE)
            .single();

        if (error) {
            console.error('[useSessionSync] fetchSessionState error:', error);
        }

        if (data) {
            setSessionState({
                currentModule: data.current_module,
                currentSlide: data.current_slide,
                isGalleryVisible: data.is_gallery_visible,
                isFreeMode: data.is_free_mode ?? false,
                freeModuleId: data.free_module_id ?? null,
                whiteboardContent: data.whiteboard_content ?? '',
                whiteboardVisible: data.whiteboard_visible ?? false
            });
        }
        setLoading(false);
    }

    // Funciones solo para Admin
    async function setCurrentSlide(moduleId, slideId) {
        if (!isAdmin) return;

        const { error } = await supabase
            .from('session_state')
            .update({
                current_module: moduleId,
                current_slide: slideId,
                updated_at: new Date().toISOString()
            })
            .eq('session_code', SESSION_CODE);

        if (error) {
            console.error('[useSessionSync] setCurrentSlide error:', error);
        }
    }

    async function toggleFreeMode() {
        if (!isAdmin) return;
        const enable = !sessionState.isFreeMode;

        // Optimistic update so UI reacts instantly even if realtime update is delayed
        setSessionState(prev => ({
            ...prev,
            isFreeMode: enable,
            freeModuleId: enable ? 'all' : null
        }));

        const { error } = await supabase
            .from('session_state')
            .update({
                is_free_mode: enable,
                free_module_id: enable ? 'all' : null,
                updated_at: new Date().toISOString()
            })
            .eq('session_code', SESSION_CODE);

        if (error) {
            console.error('[useSessionSync] toggleFreeMode error:', error);
        }
    }

    async function toggleGalleryVisibility() {
        if (!isAdmin) return;

        const { error } = await supabase
            .from('session_state')
            .update({
                is_gallery_visible: !sessionState.isGalleryVisible,
                updated_at: new Date().toISOString()
            })
            .eq('session_code', SESSION_CODE);

        if (error) {
            console.error('[useSessionSync] toggleGalleryVisibility error:', error);
        }
    }

    async function updateWhiteboard(content, visible) {
        if (!isAdmin) return;

        const { error } = await supabase
            .from('session_state')
            .update({
                whiteboard_content: content,
                whiteboard_visible: visible,
                updated_at: new Date().toISOString()
            })
            .eq('session_code', SESSION_CODE);

        if (error) {
            console.error('[useSessionSync] updateWhiteboard error:', error);
        }
    }

    async function toggleWhiteboardVisibility() {
        if (!isAdmin) return;

        const { error } = await supabase
            .from('session_state')
            .update({
                whiteboard_visible: !sessionState.whiteboardVisible,
                updated_at: new Date().toISOString()
            })
            .eq('session_code', SESSION_CODE);

        if (error) {
            console.error('[useSessionSync] toggleWhiteboardVisibility error:', error);
        }
    }

    return {
        sessionState,
        loading,
        setCurrentSlide,
        toggleGalleryVisibility,
        toggleFreeMode,
        updateWhiteboard,
        toggleWhiteboardVisibility,
        isAdmin
    };
}
