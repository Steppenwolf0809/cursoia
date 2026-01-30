import { useState, useEffect } from 'react';

export const useParticipant = () => {
    const [participant, setParticipant] = useState(null);

    useEffect(() => {
        // Load from local storage or generate
        try {
            const stored = localStorage.getItem('course_participant');
            if (stored) {
                setParticipant(JSON.parse(stored));
            } else {
                const newParticipant = {
                    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
                    name: 'Estudiante ' + Math.floor(Math.random() * 1000)
                };
                localStorage.setItem('course_participant', JSON.stringify(newParticipant));
                setParticipant(newParticipant);
            }
        } catch (e) {
            console.error("Error accessing localStorage", e);
            // Fallback
            setParticipant({ id: 'anon', name: 'Estudiante' });
        }
    }, []);

    const updateParticipant = (name) => {
        if (!participant) return;
        const updated = { ...participant, name };
        setParticipant(updated);
        localStorage.setItem('course_participant', JSON.stringify(updated));
    };

    return { participant, updateParticipant };
};
