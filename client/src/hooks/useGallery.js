import { useState, useEffect } from 'react';
import { supabase, SESSION_CODE } from '../lib/supabase';

export function useGallery(exerciseId = null, moduleId = null) {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Normalizar valores para evitar cambios de tamaño en el array de dependencias
    const stableExerciseId = exerciseId || null;
    const stableModuleId = moduleId || null;

    useEffect(() => {
        console.log('[useGallery] Fetching submissions for:', { stableExerciseId, stableModuleId, SESSION_CODE });
        fetchSubmissions();

        // Suscribirse a nuevos envíos - usar un canal único por sesión
        const channelName = `gallery_changes_${SESSION_CODE}`;
        const subscription = supabase
            .channel(channelName)
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'gallery_submissions',
                filter: `session_code=eq.${SESSION_CODE}`
            }, (payload) => {
                console.log('[useGallery] Real-time update received:', payload);
                fetchSubmissions();
            })
            .subscribe((status) => {
                console.log('[useGallery] Subscription status:', status);
            });

        return () => {
            subscription.unsubscribe();
        };
    }, [stableExerciseId, stableModuleId]);

    async function fetchSubmissions() {
        let query = supabase
            .from('gallery_submissions')
            .select('*')
            .eq('session_code', SESSION_CODE)
            .eq('is_visible', true)
            .order('is_highlighted', { ascending: false })
            .order('created_at', { ascending: false });

        // Usar stableModuleId y stableExerciseId que son los valores normalizados
        // Si hay exerciseId, filtrar solo por exerciseId (es único en todo el sistema)
        // Si solo hay moduleId, filtrar por moduleId
        if (stableExerciseId) {
            query = query.eq('exercise_id', stableExerciseId);
        } else if (stableModuleId) {
            // Solo filtrar por moduleId si no hay exerciseId específico
            query = query.eq('module_id', stableModuleId);
        }

        const { data, error } = await query;
        if (error) {
            console.error('[useGallery] fetchSubmissions error:', error);
        }
        setSubmissions(data || []);
        setLoading(false);
    }

    async function submitToGallery({ exerciseId, moduleId, participantId, participantName, promptText, resultText, aiName, aiModel, imageFile }) {
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
                module_id: moduleId,
                participant_id: participantId,
                participant_name: participantName || 'Anónimo',
                prompt_text: promptText,
                result_text: resultText,
                ai_name: aiName,
                ai_model: aiModel,
                image_url: imageUrl
            })
            .select()
            .single();

        return { data, error };
    }

    // Funciones Admin
    async function highlightSubmission(submissionId, highlighted = true) {
        if (!submissionId) return;
        await supabase
            .from('gallery_submissions')
            .update({ is_highlighted: highlighted })
            .eq('id', submissionId);
        await fetchSubmissions();
    }

    async function hideSubmission(submissionId) {
        if (!submissionId) return;
        await supabase
            .from('gallery_submissions')
            .update({ is_visible: false })
            .eq('id', submissionId);
        await fetchSubmissions();
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
