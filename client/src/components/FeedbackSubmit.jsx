import { useState } from 'react';
import { Star, Send, MessageSquare, CheckCircle, ThumbsUp } from 'lucide-react';
import { supabase, SESSION_CODE } from '../lib/supabase';
import { useParticipant } from '../hooks/useParticipant';

const FeedbackSubmit = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);
    
    const { participant } = useParticipant();

    const ratingLabels = {
        1: 'Muy insatisfecho',
        2: 'Insatisfecho',
        3: 'Neutral',
        4: 'Satisfecho',
        5: 'Muy satisfecho'
    };

    async function handleSubmit() {
        if (rating === 0) return;
        
        setSubmitting(true);
        
        const { error } = await supabase
            .from('feedback_responses')
            .insert({
                session_code: SESSION_CODE,
                participant_id: participant?.id || null,
                participant_name: participant?.name || 'Anónimo',
                rating: rating,
                comment: comment.trim(),
                suggestion: suggestion.trim()
            });

        if (!error) {
            setSubmitted(true);
        } else {
            console.error('Error submitting feedback:', error);
        }
        
        setSubmitting(false);
    }

    if (submitted) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                    ¡Gracias por tu feedback!
                </h3>
                <p className="text-slate-600">
                    Tu opinión nos ayuda a mejorar el curso.
                </p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col p-4 animate-in slide-in-from-right duration-500">
            <div className="mb-6">
                <h3 className="font-bold text-slate-800 text-lg mb-1">Evalúa el curso</h3>
                <p className="text-slate-500 text-sm">Tu feedback es anónimo</p>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
                {/* Escala de recomendación */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                        ¿Qué tan satisfecho estás con el curso?
                    </label>
                    <div className="flex items-center justify-center gap-2 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="p-1 transition-transform hover:scale-110"
                            >
                                <Star
                                    className={`w-8 h-8 transition-colors ${
                                        star <= (hoverRating || rating)
                                            ? 'text-yellow-400 fill-yellow-400'
                                            : 'text-slate-300'
                                    }`}
                                />
                            </button>
                        ))}
                    </div>
                    {rating > 0 && (
                        <p className="text-center text-sm font-medium text-yellow-600">
                            {ratingLabels[rating]}
                        </p>
                    )}
                </div>

                {/* Comentario general */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        ¿Qué te pareció el curso?
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Comparte tu experiencia, qué te gustó, qué no..."
                        className="w-full p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none resize-none text-sm"
                        rows={4}
                    />
                </div>

                {/* Sugerencias de mejora */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4" />
                        ¿Qué podríamos mejorar?
                    </label>
                    <textarea
                        value={suggestion}
                        onChange={(e) => setSuggestion(e.target.value)}
                        placeholder="Sugerencias, ideas, temas que faltaron..."
                        className="w-full p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none resize-none text-sm"
                        rows={3}
                    />
                </div>
            </div>

            {/* Botón enviar */}
            <div className="mt-4 pt-4 border-t border-slate-200">
                <button
                    onClick={handleSubmit}
                    disabled={rating === 0 || submitting}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-900/20"
                >
                    {submitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Enviando...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Enviar feedback
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default FeedbackSubmit;
