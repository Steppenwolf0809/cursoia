import React from 'react';
import { CheckCircle2, Video, Search, FileText, Mic, Globe } from 'lucide-react';

const ICON_MAP = {
    Video,
    Search,
    FileText,
    Mic,
    Globe
};

const FeatureHighlight = ({ contentData }) => {
    const { heading, paragraph, image, steps, sources, tip, highlight, limits } = contentData;

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-700">
            <div className="mb-4 sm:mb-6">
                <h2 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight mb-2 sm:mb-3">{heading}</h2>
                <p className="text-base sm:text-xl text-slate-600 font-medium max-w-4xl">{paragraph}</p>
            </div>

            <div className="flex-1 grid md:grid-cols-2 gap-4 sm:gap-8 items-stretch min-h-0">
                {/* Visual Side */}
                <div className="relative group order-1 md:order-1">
                    <div className="absolute inset-0 bg-blue-600 rounded-2xl sm:rounded-[2.5rem] rotate-2 opacity-5 scale-95 group-hover:rotate-1 transition-transform duration-500"></div>
                    <div className="h-full rounded-xl sm:rounded-[2rem] overflow-hidden border-2 sm:border-4 border-white shadow-xl sm:shadow-2xl bg-slate-100 relative">
                        {image ? (
                            <img src={image} alt={heading} className="w-full h-full object-contain bg-slate-50" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <span className="text-6xl sm:text-9xl">🖼️</span>
                            </div>
                        )}

                        {highlight && (
                            <div className={`absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 p-3 sm:p-4 rounded-lg sm:rounded-xl backdrop-blur-md border shadow-lg ${highlight.type === 'success'
                                    ? 'bg-emerald-900/80 border-emerald-500/50 text-white'
                                    : 'bg-slate-900/80 border-slate-500/50 text-white'
                                }`}>
                                <p className="font-bold text-center leading-snug text-sm sm:text-base">{highlight.text}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Side */}
                <div className="flex flex-col gap-4 sm:gap-6 justify-center order-2 md:order-2">
                    {/* Steps List */}
                    {steps && (
                        <div className="space-y-2 sm:space-y-3">
                            {steps.map((step, i) => (
                                <div key={i} className="flex items-center gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl border border-slate-100 shadow-sm hover:border-blue-200 transition-colors">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-100/50 text-blue-700 flex items-center justify-center font-black text-xs sm:text-sm flex-shrink-0">
                                        {i + 1}
                                    </div>
                                    <p className="text-slate-700 font-bold text-base sm:text-lg">{step.replace(/^\d+\.\s/, '')}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Sources List */}
                    {sources && (
                        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-lg">
                            <h3 className="text-xs sm:text-sm font-black text-slate-400 uppercase tracking-widest mb-3 sm:mb-4">Tipos de Fuentes Soportadas</h3>
                            <div className="grid grid-cols-1 gap-2 sm:gap-3">
                                {sources.map((source, i) => {
                                    const iconName = source.type === 'YouTube' ? 'Video' :
                                        source.type === 'Web' ? 'Globe' :
                                            source.type === 'Audio' ? 'Mic' : 'FileText';
                                    const Icon = ICON_MAP[iconName] || FileText;

                                    return (
                                        <div key={i} className="flex items-center gap-2 sm:gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 flex-shrink-0" />
                                            <div className="min-w-0">
                                                <span className="font-black text-slate-700 mr-1 sm:mr-2 text-sm sm:text-base">{source.type}</span>
                                                <span className="text-slate-500 text-xs sm:text-sm">{source.description}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Limits or Tips */}
                    {(limits || tip) && (
                        <div className="bg-yellow-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-yellow-100 flex items-start gap-2 sm:gap-3">
                            <div className="p-1 sm:p-1.5 bg-yellow-100 rounded-full text-yellow-700 mt-0.5 flex-shrink-0">
                                <span className="text-xs font-black">TIP</span>
                            </div>
                            <p className="text-yellow-900 font-medium leading-relaxed text-sm sm:text-base">
                                {limits || tip}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeatureHighlight;
