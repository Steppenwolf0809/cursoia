import React from 'react';
import { ArrowUpRight, Database } from 'lucide-react';

const StatHighlight = ({ contentData }) => {
    const { heading, statPrimary, statLabel, paragraph, comparison, tip } = contentData;

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-700 justify-center">

            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Visual Side */}
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 blur-[100px] opacity-20 rounded-full"></div>
                    <div className="relative bg-white rounded-[3rem] p-10 border border-slate-100 shadow-2xl text-center overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-50 to-transparent"></div>

                        <h2 className="text-2xl font-bold text-slate-500 uppercase tracking-widest mb-2 relative z-10">{heading}</h2>
                        <div className="text-[8rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600 relative z-10 drop-shadow-sm">
                            {statPrimary}
                        </div>
                        <div className="text-2xl font-bold text-slate-700 mt-2 relative z-10">{statLabel}</div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="space-y-8">
                    <p className="text-2xl text-slate-600 leading-relaxed font-medium">
                        {paragraph}
                    </p>

                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
                        {comparison.map((item, i) => (
                            <div key={i} className={`flex items-center justify-between p-4 ${i !== comparison.length - 1 ? 'border-b border-slate-200' : ''
                                } ${item.tool === 'Gemini' ? 'bg-blue-100/50 -mx-4 px-8 rounded-xl my-1' : ''}`}>
                                <div className="font-bold text-slate-700 text-lg w-24">{item.tool}</div>
                                <div className="font-mono text-slate-500">{item.tokens}</div>
                                <div className="flex items-center gap-2 text-slate-400 text-sm">
                                    <ArrowUpRight className="w-4 h-4" />
                                    {item.analogy}
                                </div>
                            </div>
                        ))}
                    </div>

                    {tip && (
                        <div className="flex items-center gap-3 text-sm text-slate-500 italic bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                            <span className="text-xl">💡</span>
                            {tip}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatHighlight;
