import React, { useState, useEffect } from 'react';
import { BarChart3, Loader2, Eye } from 'lucide-react';
import { usePolls } from '../hooks/usePolls';
import { useParticipant } from '../hooks/useParticipant';

const LivePoll = ({ id, question, options, isAdmin = false }) => {
    // Si no hay ID, generamos uno simple basado en la pregunta (para compatibilidad)
    const pollId = id || `poll-${question.replace(/\s+/g, '-').toLowerCase()}`;

    const { votes: rawVotes, loading, submitVote, hasVoted } = usePolls(pollId);
    const { participant } = useParticipant();
    
    // Admin siempre ve resultados
    const showResults = isAdmin || hasVoted;

    // Calcular agregados
    const votesCount = new Array(options.length).fill(0);
    rawVotes.forEach(vote => {
        if (vote.option_index >= 0 && vote.option_index < options.length) {
            votesCount[vote.option_index]++;
        }
    });

    const totalVotes = rawVotes.length;

    const handleVote = async (index) => {
        if (hasVoted) return;

        // Necesitamos un participante ID. Si no hay (no logueado), se puede generar uno temporal o requerir login.
        // Aquí usaremos el del hook, o uno generado si es null.
        const participantId = participant?.id || crypto.randomUUID();

        await submitVote(index, participantId);
    };

    if (loading) {
        return (
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-slate-100 flex justify-center items-center h-48">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
                <div className="flex items-center gap-2 text-slate-500">
                    <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-xs font-bold uppercase tracking-wider">Encuesta en vivo</span>
                </div>
                <div className="flex items-center gap-2">
                    {isAdmin && (
                        <div className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-700 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full flex items-center gap-1 sm:gap-2">
                            <Eye className="w-3 h-3" />
                            <span className="hidden sm:inline">Vista Admin</span>
                            <span className="sm:hidden">Admin</span>
                        </div>
                    )}
                    <div className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full flex items-center gap-1 sm:gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Online
                    </div>
                </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-6 leading-tight">{question}</h3>

            <div className="space-y-2 sm:space-y-3">
                {options.map((option, index) => {
                    const count = votesCount[index];
                    const percentage = totalVotes === 0 ? 0 : Math.round((count / totalVotes) * 100);

                    return (
                        <div key={index} className="relative group">
                            <button
                                onClick={() => handleVote(index)}
                                disabled={showResults}
                                className={`w-full text-left p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all relative z-10 overflow-hidden
                                    ${showResults
                                        ? 'border-transparent cursor-default'
                                        : 'border-slate-200 hover:border-blue-400 hover:bg-blue-50/30'}`}
                            >
                                <div className="relative z-10 flex justify-between items-center font-bold text-slate-700 text-sm sm:text-base">
                                    <span className="pr-2">{option}</span>
                                    {showResults && (
                                        <span className="text-xs sm:text-sm font-black text-slate-500 flex-shrink-0">
                                            {percentage}% ({count})
                                        </span>
                                    )}
                                </div>
                            </button>

                            {showResults && (
                                <div
                                    className="absolute top-0 left-0 h-full bg-blue-100/50 rounded-lg sm:rounded-xl transition-all duration-1000 ease-out z-0"
                                    style={{ width: `${percentage}%` }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {hasVoted && (
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-100 text-center animate-in fade-in slide-in-from-top-2">
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest mb-3 sm:mb-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        Voto Registrado
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 font-medium">Estadísticas basadas en {totalVotes} votos.</p>
                </div>
            )}
        </div>
    );
};

export default LivePoll;

