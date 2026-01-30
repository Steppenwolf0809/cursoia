import React from 'react';
import { GitFork, ArrowDown, ArrowRight, CheckCircle2 } from 'lucide-react';

const DecisionTree = ({ contentData }) => {
    const { heading, decisions } = contentData;

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-700">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-8 text-center">{heading}</h2>

            <div className="flex-1 flex flex-col items-center justify-center gap-6 max-w-4xl mx-auto w-full">
                {decisions.map((step, i) => (
                    <div key={i} className="w-full flex flex-col items-center animate-in slide-in-from-top-4" style={{ animationDelay: `${i * 200}ms` }}>

                        {/* Question Box */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-slate-100 w-full relative z-10">
                            <h3 className="text-xl font-bold text-slate-800 text-center flex items-center justify-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-sm font-black border border-slate-200">
                                    {i + 1}
                                </span>
                                {step.question}
                            </h3>
                        </div>

                        {/* Connection Lines */}
                        {i < decisions.length - 1 && (
                            <div className="h-8 w-0.5 bg-slate-300 my-2"></div>
                        )}

                        {/* Outcomes (Only distinct if not 'Siguiente pregunta') */}
                        <div className="flex w-full justify-between mt-4 px-12 gap-4">
                            {/* YES Path */}
                            {step.yes.includes('→') ? (
                                <div className="flex-1 bg-emerald-50 rounded-xl p-4 border border-emerald-100 text-emerald-800 font-bold text-center shadow-sm transform hover:scale-105 transition-transform flex items-center justify-center gap-2">
                                    <CheckCircle2 className="w-5 h-5" />
                                    {step.yes.replace('→ ', '')}
                                </div>
                            ) : (
                                <div className="flex-1"></div> // Spacer
                            )}

                            {/* NO Path */}
                            {step.no.includes('→') ? (
                                <div className="flex-1 bg-blue-50 rounded-xl p-4 border border-blue-100 text-blue-800 font-bold text-center shadow-sm transform hover:scale-105 transition-transform">
                                    {step.no.replace('→ ', '')}
                                </div>
                            ) : (
                                <div className="flex-1"></div> // Spacer
                            )}
                        </div>

                        {/* Arrow for next step if continuing */}
                        {(!step.yes.includes('→') || !step.no.includes('→')) && i < decisions.length - 1 && (
                            <div className="text-slate-300 mt-2">
                                <ArrowDown className="w-6 h-6 animate-bounce" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DecisionTree;
