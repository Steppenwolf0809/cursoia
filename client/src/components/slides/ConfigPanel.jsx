import React from 'react';
import { Settings, Sliders, Info, ShieldCheck } from 'lucide-react';

const ConfigPanel = ({ contentData }) => {
    const { heading, parameters } = contentData;

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-700">
            <h2 className="text-4xl font-black text-slate-800 tracking-tight mb-8 text-center flex items-center justify-center gap-4">
                <Settings className="w-10 h-10 text-slate-400" />
                {heading}
            </h2>

            <div className="flex-1 bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl border border-slate-700 relative overflow-hidden flex flex-col justify-center gap-8">
                {/* Decorative UI elements */}
                <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                {parameters.map((param, i) => (
                    <div key={i} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div className="flex items-center gap-3">
                                <Sliders className="w-5 h-5 text-blue-400" />
                                <h3 className="text-xl font-bold text-white">{param.name}</h3>
                            </div>
                            <span className="text-slate-400 text-sm font-medium">{param.description}</span>
                        </div>

                        {/* Visualization based on parameter properties */}
                        {param.low && (
                            <div className="space-y-3">
                                <div className="h-4 bg-slate-700 rounded-full relative overflow-hidden">
                                    <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50"></div>
                                    <div className="absolute top-1 left-[30%] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                                </div>
                                <div className="flex justify-between text-xs text-slate-500 font-mono">
                                    <span>{param.low}</span>
                                    <span className="text-right">{param.high}</span>
                                </div>
                                <div className="mt-2 text-xs text-blue-300 bg-blue-500/10 px-3 py-1 rounded-lg inline-block border border-blue-500/20">
                                    Recomendado: {param.recommended}
                                </div>
                            </div>
                        )}

                        {param.example && (
                            <div className="bg-black/30 p-4 rounded-xl border-l-2 border-green-500 font-mono text-sm text-green-300">
                                {param.example}
                            </div>
                        )}

                        {param.benefit && (
                            <div className="flex items-center gap-3 text-emerald-400 bg-emerald-900/20 p-3 rounded-xl border border-emerald-900/30">
                                <ShieldCheck className="w-5 h-5" />
                                <span className="font-medium">{param.benefit}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConfigPanel;
