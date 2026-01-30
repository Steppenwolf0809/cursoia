import React, { useState } from 'react';
import { useGallery } from '../hooks/useGallery'; // Use the hook defined in instructions
import { Star, Eye, EyeOff, Maximize2, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryDisplay = ({ exerciseId, showAll = false, showHighlighted = true, allowVoting = false, adminMode = false }) => {
    const { submissions, highlightSubmission, hideSubmission, loading } = useGallery(exerciseId);
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    const filteredSubmissions = submissions.filter(sub => {
        if (showAll) return true;
        if (showHighlighted) return sub.is_highlighted;
        return true; // Default behavior
    });

    if (loading) {
        return <div className="p-10 text-center text-slate-500">Cargando galería...</div>;
    }

    if (filteredSubmissions.length === 0) {
        return (
            <div className="p-10 text-center bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                <p className="text-slate-500 font-medium">Aún no hay envíos destacados para este ejercicio.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSubmissions.map((sub, index) => (
                    <motion.div
                        key={sub.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        layoutId={`card-${sub.id}`}
                        onClick={() => setSelectedSubmission(sub)}
                        className={`
                            bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 border group
                            ${sub.is_highlighted ? 'border-yellow-300 ring-4 ring-yellow-50' : 'border-slate-200'}
                        `}
                    >
                        {/* Image Preview if exists */}
                        {sub.image_url && (
                            <div className="h-40 bg-slate-100 relative overflow-hidden">
                                <img src={sub.image_url} alt="Submission" className="w-full h-full object-cover" />
                            </div>
                        )}

                        <div className="p-5">
                            <div className="flex justify-between items-start mb-3">
                                <span className="font-bold text-slate-700 text-sm">
                                    {sub.participant_name || 'Anónimo'}
                                </span>
                                {sub.is_highlighted && (
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                )}
                            </div>

                            {/* Prompt Snippet */}
                            {sub.prompt_text && (
                                <div className="mb-3">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Prompt</span>
                                    <p className="text-sm text-slate-600 line-clamp-2 bg-slate-50 p-2 rounded-lg border border-slate-100 font-mono">
                                        {sub.prompt_text}
                                    </p>
                                </div>
                            )}

                            {/* Result Snippet */}
                            {sub.result_text && (
                                <div>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Resultado</span>
                                    <p className="text-sm text-slate-800 line-clamp-3">
                                        {sub.result_text}
                                    </p>
                                </div>
                            )}

                            {/* Admin Controls */}
                            {adminMode && (
                                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end gap-2" onClick={e => e.stopPropagation()}>
                                    <button
                                        onClick={() => highlightSubmission(sub.id, !sub.is_highlighted)}
                                        className={`p-2 rounded-lg transition-colors ${sub.is_highlighted ? 'bg-yellow-100 text-yellow-600' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                                    >
                                        <Star size={16} />
                                    </button>
                                    <button
                                        onClick={() => hideSubmission(sub.id)}
                                        className="p-2 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition-colors"
                                    >
                                        <EyeOff size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedSubmission && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
                        onClick={() => setSelectedSubmission(null)}
                    >
                        <motion.div
                            layoutId={`card-${selectedSubmission.id}`}
                            className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Image Side (if exists) */}
                            {selectedSubmission.image_url ? (
                                <div className="md:w-1/2 bg-slate-100 relative h-64 md:h-auto">
                                    <img
                                        src={selectedSubmission.image_url}
                                        alt="Submission"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            ) : null}

                            {/* Content Side */}
                            <div className={`p-8 flex flex-col overflow-y-auto ${selectedSubmission.image_url ? 'md:w-1/2' : 'w-full'}`}>
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                                            {selectedSubmission.participant_name?.charAt(0) || 'A'}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800 text-lg">
                                                {selectedSubmission.participant_name || 'Anónimo'}
                                            </h3>
                                            <span className="text-slate-500 text-sm">
                                                {new Date(selectedSubmission.created_at).toLocaleTimeString()}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedSubmission(null)}
                                        className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {selectedSubmission.prompt_text && (
                                        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2 flex items-center gap-2">
                                                <MessageSquare size={14} /> Prompt
                                            </span>
                                            <p className="text-slate-700 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                                                {selectedSubmission.prompt_text}
                                            </p>
                                        </div>
                                    )}

                                    {selectedSubmission.result_text && (
                                        <div>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Resultado</span>
                                            <p className="text-slate-800 text-lg leading-relaxed whitespace-pre-wrap">
                                                {selectedSubmission.result_text}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GalleryDisplay;
