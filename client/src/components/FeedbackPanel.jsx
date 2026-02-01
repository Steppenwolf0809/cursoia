import { useState, useEffect } from 'react';
import { Star, MessageSquare, TrendingUp, X, Trash2, RefreshCw } from 'lucide-react';
import { supabase, SESSION_CODE } from '../lib/supabase';

const FeedbackPanel = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPanel, setShowPanel] = useState(false);
    const [stats, setStats] = useState({
        total: 0,
        average: 0,
        distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    });

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    async function fetchFeedbacks() {
        setLoading(true);
        const { data, error } = await supabase
            .from('feedback_responses')
            .select('*')
            .eq('session_code', SESSION_CODE)
            .order('created_at', { ascending: false });

        if (data) {
            setFeedbacks(data);
            calculateStats(data);
        }
        setLoading(false);
    }

    function calculateStats(data) {
        const total = data.length;
        if (total === 0) return;

        const sum = data.reduce((acc, f) => acc + f.rating, 0);
        const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        
        data.forEach(f => {
            distribution[f.rating]++;
        });

        setStats({
            total,
            average: (sum / total).toFixed(1),
            distribution
        });
    }

    async function deleteFeedback(id) {
        if (!confirm('¿Eliminar este feedback?')) return;
        
        const { error } = await supabase
            .from('feedback_responses')
            .delete()
            .eq('id', id);

        if (!error) {
            fetchFeedbacks();
        }
    }

    return (
        <>
            {/* Botón flotante para abrir el panel */}
            <button
                onClick={() => setShowPanel(true)}
                className="fixed bottom-24 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-purple-600 text-white shadow-2xl hover:bg-purple-700 transition-all"
            >
                <MessageSquare className="w-5 h-5" />
                <span>Ver Feedback</span>
                {stats.total > 0 && (
                    <span className="ml-1 bg-white text-purple-600 text-xs font-bold px-2 py-0.5 rounded-full">
                        {stats.total}
                    </span>
                )}
            </button>

            {/* Panel de feedback */}
            {showPanel && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-200">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">Feedback de Participantes</h2>
                                <p className="text-slate-500 text-sm">Solo visible para administradores</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={fetchFeedbacks}
                                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                                    title="Actualizar"
                                >
                                    <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                                </button>
                                <button
                                    onClick={() => setShowPanel(false)}
                                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Stats */}
                        {stats.total > 0 && (
                            <div className="grid grid-cols-3 gap-4 p-6 border-b border-slate-200 bg-slate-50">
                                <div className="text-center">
                                    <div className="text-3xl font-black text-slate-800">{stats.total}</div>
                                    <div className="text-sm text-slate-500">Respuestas</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-black text-yellow-500 flex items-center justify-center gap-1">
                                        {stats.average}
                                        <Star className="w-6 h-6 fill-yellow-500" />
                                    </div>
                                    <div className="text-sm text-slate-500">Promedio</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-black text-green-500">
                                        {Math.round((stats.distribution[4] + stats.distribution[5]) / stats.total * 100)}%
                                    </div>
                                    <div className="text-sm text-slate-500">Satisfechos</div>
                                </div>
                            </div>
                        )}

                        {/* Lista de feedbacks */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {loading ? (
                                <div className="text-center py-12 text-slate-400">
                                    <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
                                    Cargando...
                                </div>
                            ) : feedbacks.length === 0 ? (
                                <div className="text-center py-12 text-slate-400">
                                    <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-30" />
                                    <p>No hay feedback todavía</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {feedbacks.map((feedback) => (
                                        <div key={feedback.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <Star
                                                                key={star}
                                                                className={`w-5 h-5 ${
                                                                    star <= feedback.rating
                                                                        ? 'text-yellow-400 fill-yellow-400'
                                                                        : 'text-slate-300'
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-sm text-slate-500">
                                                        {feedback.participant_name}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => deleteFeedback(feedback.id)}
                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            
                                            {feedback.comment && (
                                                <div className="mb-3">
                                                    <p className="text-sm font-medium text-slate-700 mb-1">Opinión:</p>
                                                    <p className="text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-100">
                                                        {feedback.comment}
                                                    </p>
                                                </div>
                                            )}
                                            
                                            {feedback.suggestion && (
                                                <div>
                                                    <p className="text-sm font-medium text-slate-700 mb-1">Sugerencias:</p>
                                                    <p className="text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-100">
                                                        {feedback.suggestion}
                                                    </p>
                                                </div>
                                            )}
                                            
                                            <div className="mt-3 text-xs text-slate-400">
                                                {new Date(feedback.created_at).toLocaleString('es-ES')}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FeedbackPanel;
