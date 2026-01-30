import React from 'react';
import { CheckCircle2, ArrowRight, Star } from 'lucide-react';

const SummarySlide = ({ contentData }) => {
    const { heading, bullets, callToAction, keyPoints, nextModule } = contentData;

    // Support for legacy Module 1 format if needed, but prioritize new format
    const items = bullets || keyPoints?.map(kp => kp.description || kp.title) || [];
    const actionText = callToAction || nextModule;

    return (
        <div className="h-full flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-700">
            <div className="max-w-4xl w-full flex flex-col gap-10">
                {/* Header */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-6 shadow-sm">
                        <CheckCircle2 className="w-5 h-5" />
                        Módulo Completado
                    </div>
                    <h2 className="text-5xl font-black text-slate-800 tracking-tight">{heading}</h2>
                </div>

                {/* Bullets List */}
                <div className="grid md:grid-cols-2 gap-4">
                    {items.map((item, index) => (
                        <div key={index} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 hover:shadow-md hover:scale-[1.02] transition-all">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Star className="w-4 h-4 fill-current" />
                            </div>
                            <p className="text-slate-700 font-bold text-lg leading-snug">{item}</p>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                {actionText && (
                    <div className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] p-8 text-center shadow-xl shadow-blue-200 transform hover:scale-105 transition-transform cursor-default group">
                        <p className="text-blue-200 text-sm font-black uppercase tracking-[0.2em] mb-3">Siguiente Paso</p>
                        <div className="flex items-center justify-center gap-3 text-white">
                            <span className="text-2xl font-bold">{actionText}</span>
                            <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SummarySlide;
