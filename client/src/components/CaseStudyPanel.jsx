import React, { useState } from 'react';
import { Briefcase, Copy, Check, ArrowRight, MousePointer2 } from 'lucide-react';

const CaseStudyPanel = ({ cases }) => {
    const [selectedCase, setSelectedCase] = useState(cases[0]);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(selectedCase.template);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 flex flex-col h-full overflow-hidden">
            <div className="p-6 bg-slate-50 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-secondary" />
                    Laboratorio de Casos
                </h3>
                <p className="text-sm text-slate-500 mt-1">Selecciona un escenario para ver el prompt recomendado.</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3 block">Escenarios Disponibles</label>
                <div className="grid gap-3 mb-8">
                    {cases.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => setSelectedCase(c)}
                            className={`text-left p-4 rounded-xl border transition-all duration-200 group ${selectedCase.id === c.id
                                ? 'bg-blue-50 border-secondary shadow-sm ring-1 ring-secondary'
                                : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className={`font-bold transition-colors ${selectedCase.id === c.id ? 'text-secondary' : 'text-slate-700'}`}>{c.title}</span>
                                {selectedCase.id === c.id && <MousePointer2 className="w-4 h-4 text-secondary" />}
                            </div>
                        </button>
                    ))}
                </div>

                {selectedCase && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Prompt Optimizado</label>
                            <div className="flex gap-2">
                                {selectedCase.fields && selectedCase.fields.map((v, i) => (
                                    <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 uppercase tracking-wide border border-amber-200">
                                        {v}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="bg-slate-800 text-slate-100 p-6 rounded-xl font-mono text-sm leading-relaxed whitespace-pre-wrap shadow-inner border border-slate-700">
                                {selectedCase.template}
                            </div>
                            <button
                                onClick={handleCopy}
                                className="absolute top-4 right-4 p-2 bg-slate-700/50 hover:bg-slate-600 text-white rounded-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 border border-slate-600"
                                title="Copiar al portapapeles"
                            >
                                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CaseStudyPanel;
