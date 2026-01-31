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
