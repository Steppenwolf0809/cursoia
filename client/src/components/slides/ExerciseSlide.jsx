import React, { useState } from 'react';
import { Play, Copy, Check, Clock, Lightbulb, ArrowRight, SplitSquareHorizontal } from 'lucide-react';

const ExerciseSlide = ({ contentData }) => {
    const { heading, instructions, promptWeak, hints, task, compare, reflection, tips, duration, prompt } = contentData;
    const [copied, setCopied] = useState(false);

    // Normalize data (support old format)
    const displayInstructions = instructions || contentData.instruction;
    const displayPrompt = promptWeak || prompt;
    const displayTips = hints || tips;

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Header */}
            <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-4 shadow-lg shadow-blue-200">
                    <Play className="w-4 h-4 fill-white" />
                    EJERCICIO PRÁCTICO
                </div>
                <h2 className="text-4xl font-black text-slate-800 tracking-tight">{heading}</h2>
            </div>

            <div className="flex-1 bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 overflow-y-auto custom-scrollbar">
                <p className="text-xl text-slate-600 font-medium mb-8 text-center max-w-4xl mx-auto leading-relaxed">
                    {displayInstructions}
                </p>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column: Input / Challenge */}
                    <div className="space-y-6">
                        {displayPrompt && (
                            <div className="bg-slate-900 rounded-2xl p-6 shadow-lg relative group">
                                <div className="absolute top-0 right-0 px-4 py-1.5 bg-rose-500 text-white text-xs font-bold uppercase tracking-widest rounded-bl-xl">
                                    Prompt Débil 🚫
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-slate-400 font-mono text-sm">ENTRADA</span>
                                    <button
                                        onClick={() => handleCopy(displayPrompt)}
                                        className="text-slate-400 hover:text-white transition-colors"
                                    >
                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                                <p className="text-white text-lg font-mono leading-relaxed">{displayPrompt}</p>
                            </div>
                        )}

                        {task && (
                            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                                <h4 className="text-blue-900 font-black uppercase tracking-widest mb-3 text-sm">Tu Tarea</h4>
                                <p className="text-blue-800 text-lg font-medium">{task}</p>
                            </div>
                        )}

                        {compare && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-slate-800 font-black uppercase tracking-widest text-sm">
                                    <SplitSquareHorizontal className="w-5 h-5 text-indigo-500" />
                                    Comparar Resultados
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    {compare.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                                            <span className="font-bold text-slate-700">{item.tool}</span>
                                            <ArrowRight className="w-4 h-4 text-slate-300" />
                                            <span className="text-slate-500 text-sm font-medium">{item.focus}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Hints / Reflection */}
                    <div className="space-y-6">
                        {displayTips && (
                            <div className="bg-amber-50/80 rounded-2xl p-6 border border-amber-100">
                                <div className="flex items-center gap-2 text-amber-700 font-black uppercase tracking-widest mb-4">
                                    <Lightbulb className="w-5 h-5" />
                                    Pistas Clave
                                </div>
                                <ul className="space-y-3">
                                    {displayTips.map((tip, index) => (
                                        <li key={index} className="flex items-start gap-3 text-slate-700 text-lg font-medium">
                                            <span className="text-amber-500 mt-1.5">•</span>
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {reflection && (
                            <div className="bg-indigo-50/80 rounded-2xl p-6 border border-indigo-100">
                                <h4 className="text-indigo-900 font-black uppercase tracking-widest mb-4 text-sm">Preguntas de Reflexión</h4>
                                <ul className="space-y-3">
                                    {reflection.map((q, i) => (
                                        <li key={i} className="flex items-start gap-3 text-indigo-900 text-lg font-medium">
                                            <span className="text-indigo-400 mt-1">?</span>
                                            {q}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {duration && (
                            <div className="flex items-center justify-center gap-2 text-slate-400 font-bold uppercase tracking-widest text-sm mt-8">
                                <Clock className="w-5 h-5" />
                                Tiempo: {duration}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExerciseSlide;
