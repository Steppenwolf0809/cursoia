import React, { useState } from 'react';
import { useGallery } from '../hooks/useGallery';
import { Star, EyeOff, X, MessageSquare, Sparkles, Bot, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryDisplay = ({ exerciseId, moduleId, showAll = false, showHighlighted = true, allowVoting = false, adminMode = false }) => {
    const { submissions, highlightSubmission, hideSubmission, loading } = useGallery(exerciseId, moduleId);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [expandedCards, setExpandedCards] = useState({});

    const toggleCardExpansion = (e, submissionId) => {
        e.stopPropagation();
        setExpandedCards(prev => ({
            ...prev,
            [submissionId]: !prev[submissionId]
        }));
    };

    const getSubmissionId = (submission, fallbackIndex = 0) => {
        if (!submission) return `submission-${fallbackIndex}`;
        return submission.id || `${submission.participant_id || submission.participant_name || 'anon'}-${submission.created_at || fallbackIndex}`;
    };

    const safeSubmissions = Array.isArray(submissions) ? submissions.filter(Boolean) : [];
    const filteredSubmissions = safeSubmissions.filter(sub => {
        if (showAll) return true;
        if (showHighlighted) return sub.is_highlighted;
        return true;
    });

    if (loading) {
        return <div className="p-10 text-center text-slate-500">Cargando galería...</div>;
    }

    if (filteredSubmissions.length === 0) {
        return (
            <div className="p-10 text-center bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                <p className="text-slate-500 font-medium">Aún no hay envíos destacados para este ejercicio.</p>
                <p className="text-slate-400 text-sm mt-2">Los mejores prompts aparecerán aquí.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredSubmissions.map((sub, index) => {
                    const submissionId = getSubmissionId(sub, index);
                    const isExpanded = expandedCards[submissionId];
                    
                    return (
                    <motion.div
                        key={submissionId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        layoutId={`card-${submissionId}`}
                        className={`
                            bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg cursor-pointer transition-all duration-300 border
                            ${sub.is_highlighted ? 'border-yellow-400 ring-2 ring-yellow-100' : 'border-slate-200'}
                        `}
                    >
                        {/* Header con nombre e IA usada */}
                        <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                                    {sub.participant_name?.charAt(0).toUpperCase() || 'A'}
                                </div>
                                <div>
                                    <span className="font-bold text-slate-800 block">
                                        {sub.participant_name || 'Anónimo'}
                                    </span>
                                    {(sub.ai_name || sub.ai_model) && (
                                        <span className="text-xs text-slate-500 flex items-center gap-1">
                                            <Bot size={12} />
                                            {sub.ai_name}{sub.ai_model && ` • ${sub.ai_model}`}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {sub.is_highlighted && (
                                <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                                    <Star className="w-4 h-4 fill-yellow-500" />
                                    <span className="text-xs font-bold">Destacado</span>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-5" onClick={() => setSelectedSubmission(sub)}>
                            {/* Prompt */}
                            {sub.prompt_text && (
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MessageSquare size={16} className="text-blue-500" />
                                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Prompt</span>
                                    </div>
                                    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                                        <p className={`text-slate-700 text-sm leading-relaxed whitespace-pre-wrap font-mono ${isExpanded ? '' : 'line-clamp-4'}`}>
                                            {sub.prompt_text}
                                        </p>
                                        {sub.prompt_text.length > 200 && (
                                            <button
                                                onClick={(e) => toggleCardExpansion(e, submissionId)}
                                                className="mt-2 text-xs text-blue-600 font-medium flex items-center gap-1 hover:text-blue-700"
                                            >
                                                {isExpanded ? (
                                                    <>Ver menos <ChevronUp size={14} /></>
                                                ) : (
                                                    <>Ver más <ChevronDown size={14} /></>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Result */}
                            {sub.result_text && (
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles size={16} className="text-emerald-500" />
                                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Resultado</span>
                                    </div>
                                    <div className="bg-emerald-50/30 border border-emerald-100/50 rounded-xl p-4">
                                        <p className={`text-slate-700 text-sm leading-relaxed whitespace-pre-wrap ${isExpanded ? '' : 'line-clamp-5'}`}>
                                            {sub.result_text}
                                        </p>
                                        {sub.result_text.length > 250 && !isExpanded && (
                                            <button
                                                onClick={(e) => toggleCardExpansion(e, submissionId)}
                                                className="mt-2 text-xs text-emerald-600 font-medium flex items-center gap-1 hover:text-emerald-700"
                                            >
                                                Ver más <ChevronDown size={14} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Image if exists */}
                            {sub.image_url && (
                                <div className="mt-4 rounded-xl overflow-hidden border border-slate-200">
                                    <img 
                                        src={sub.image_url} 
                                        alt="Captura" 
                                        className="w-full h-48 object-cover"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Footer with actions */}
                        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                            <span className="text-xs text-slate-400">
                                {sub.created_at ? new Date(sub.created_at).toLocaleDateString() : ''}
                            </span>
                            
                            {adminMode && (
                                <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                                    <button
                                        onClick={() => highlightSubmission(sub.id, !sub.is_highlighted)}
                                        className={`p-2 rounded-lg transition-colors ${sub.is_highlighted ? 'bg-yellow-100 text-yellow-600' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                                        title={sub.is_highlighted ? "Quitar destacado" : "Destacar"}
                                    >
                                        <Star size={16} />
                                    </button>
                                    <button
                                        onClick={() => hideSubmission(sub.id)}
                                        className="p-2 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition-colors"
                                        title="Ocultar"
                                    >
                                        <EyeOff size={16} />
                                    </button>
                                </div>
                            )}
                            
                            {!adminMode && (
                                <button 
                                    onClick={() => setSelectedSubmission(sub)}
                                    className="text-xs text-blue-600 font-medium hover:text-blue-700"
                                >
                                    Ver completo
                                </button>
                            )}
                        </div>
                    </motion.div>
                    );
                })}
            </div>

            {/* Full Screen Modal */}
            <AnimatePresence>
                {selectedSubmission && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm"
                        onClick={() => setSelectedSubmission(null)}
                    >
                        <motion.div
                            layoutId={`card-${getSubmissionId(selectedSubmission)}`}
                            className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="bg-slate-50 px-8 py-5 border-b border-slate-200 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xl">
                                        {selectedSubmission.participant_name?.charAt(0).toUpperCase() || 'A'}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-xl">
                                            {selectedSubmission.participant_name || 'Anónimo'}
                                        </h3>
                                        {(selectedSubmission.ai_name || selectedSubmission.ai_model) && (
                                            <span className="text-sm text-slate-500 flex items-center gap-1">
                                                <Bot size={14} />
                                                {selectedSubmission.ai_name}{selectedSubmission.ai_model && ` • ${selectedSubmission.ai_model}`}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {selectedSubmission.is_highlighted && (
                                        <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-full">
                                            <Star className="w-4 h-4 fill-yellow-500" />
                                            <span className="text-sm font-bold">Destacado</span>
                                        </div>
                                    )}
                                    <button
                                        onClick={() => setSelectedSubmission(null)}
                                        className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8 overflow-y-auto max-h-[calc(90vh-100px)]">
                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* Left: Prompt */}
                                    {selectedSubmission.prompt_text && (
                                        <div>
                                            <div className="flex items-center gap-2 mb-4">
                                                <div className="p-2 bg-blue-100 rounded-lg">
                                                    <MessageSquare size={20} className="text-blue-600" />
                                                </div>
                                                <span className="font-bold text-slate-700">Prompt</span>
                                            </div>
                                            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
                                                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap font-mono text-sm">
                                                    {selectedSubmission.prompt_text}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Right: Result */}
                                    {selectedSubmission.result_text && (
                                        <div>
                                            <div className="flex items-center gap-2 mb-4">
                                                <div className="p-2 bg-emerald-100 rounded-lg">
                                                    <Sparkles size={20} className="text-emerald-600" />
                                                </div>
                                                <span className="font-bold text-slate-700">Resultado</span>
                                            </div>
                                            <div className="bg-emerald-50/30 border border-emerald-100/50 rounded-2xl p-6">
                                                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                                                    {selectedSubmission.result_text}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Full width image if exists */}
                                {selectedSubmission.image_url && (
                                    <div className="mt-8">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="p-2 bg-purple-100 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                                            </div>
                                            <span className="font-bold text-slate-700">Captura</span>
                                        </div>
                                        <div className="rounded-2xl overflow-hidden border border-slate-200">
                                            <img
                                                src={selectedSubmission.image_url}
                                                alt="Captura del envío"
                                                className="w-full max-h-[500px] object-contain bg-slate-100"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GalleryDisplay;
