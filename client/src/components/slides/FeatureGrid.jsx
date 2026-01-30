import React from 'react';
import { Mic, Image, FileText, Cpu, Zap, Activity, Globe } from 'lucide-react';

const ICON_MAP = {
    Mic,
    Image,
    FileText,
    Cpu,
    Zap,
    Activity,
    Globe
};

const FeatureGrid = ({ contentData }) => {
    const { heading, features, tip } = contentData;

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-700">
            <h2 className="text-4xl font-black text-slate-800 tracking-tight mb-10 text-center">{heading}</h2>

            <div className="grid md:grid-cols-2 gap-8 flex-1">
                {features.map((feature, i) => {
                    const Icon = ICON_MAP[feature.icon] || Zap;
                    return (
                        <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-lg hover:shadow-2xl transition-all group hover:border-blue-100 flex gap-6 items-start">
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-blue-200 group-hover:rotate-3 shrink-0">
                                <Icon className="w-8 h-8" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">{feature.title}</h3>
                                <p className="text-lg text-slate-600 leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            {tip && (
                <div className="mt-8 text-center">
                    <span className="inline-block py-2 px-6 bg-yellow-50 text-yellow-800 rounded-full font-bold border border-yellow-100 shadow-sm">
                        💡 {tip}
                    </span>
                </div>
            )}
        </div>
    );
};

export default FeatureGrid;
