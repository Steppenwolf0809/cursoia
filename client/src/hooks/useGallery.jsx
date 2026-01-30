import { useState, useEffect } from 'react';

// Simple mock store in memory (reset on refresh)
// In a real app, this would come from the backend via API
const mockSubmissions = {};

export const useGallery = (exerciseId) => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!exerciseId) {
            setSubmissions([]);
            return;
        }

        setLoading(true);
        // Simulate fetch delay
        const timer = setTimeout(() => {
            setSubmissions(mockSubmissions[exerciseId] || []);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [exerciseId]);

    const highlightSubmission = async (id, isHighlighted) => {
        console.log('Highlight', id, isHighlighted);
        if (!exerciseId || !mockSubmissions[exerciseId]) return;

        const index = mockSubmissions[exerciseId].findIndex(s => s.id === id);
        if (index !== -1) {
            mockSubmissions[exerciseId][index].is_highlighted = isHighlighted;
            setSubmissions([...mockSubmissions[exerciseId]]);
        }
    };

    const hideSubmission = async (id) => {
        console.log('Hide', id);
        // In a real app this would delete or set a hidden flag
    };

    const submitToGallery = async (data) => {
        console.log('Submit to gallery', data);

        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 800));

        if (!data.exerciseId) return { error: "No exercise ID" };

        if (!mockSubmissions[data.exerciseId]) {
            mockSubmissions[data.exerciseId] = [];
        }

        const newSubmission = {
            id: Date.now().toString(),
            created_at: new Date().toISOString(),
            is_highlighted: false,
            ...data
        };

        mockSubmissions[data.exerciseId].push(newSubmission);

        // Update local state if we are viewing this exercise
        if (exerciseId === data.exerciseId) {
            setSubmissions([...mockSubmissions[exerciseId]]);
        }

        return { error: null };
    };

    return {
        submissions,
        highlightSubmission,
        hideSubmission,
        submitToGallery,
        loading
    };
};
