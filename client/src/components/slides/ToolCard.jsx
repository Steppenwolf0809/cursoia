import React from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

const ToolCard = ({ contentData }) => {
    const {
        heading,
        company,
        tagline,
        logo,
        color,
        strengths,
        whenToUse,
        website,
        pricing
    } = contentData;

    return (
        <div className="h-full flex flex-col animate-in fade-in zoom-in-95 duration-500">
            {/* Header Card */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 relative overflow-hidden mb-6 group">
                <div
                    className="absolute top-0 left-0 w-full h-2"
                    style={{ backgroundColor: color }}
                ></div>

                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="w-32 h-32 rounded-3xl bg-slate-50 p-4 border border-slate-100 shadow-inner flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                        <img
                            src={logo}
                            alt={`${heading} logo`}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/150?text=Logo';
                            }}
                        />
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <div className="flex flex-col md:flex-row items-center md:items-baseline gap-3 mb-2">
                            <h2 className="text-4xl font-black text-slate-800 tracking-tight">{heading}</h2>
                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-slate-100 text-slate-500">
                                {company}
                            </span>
                        </div>
                        <p className="text-2xl text-slate-500 font-medium italic mb-4">"{tagline}"</p>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                            <a
                                href={`https://${website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-slate-50 text-slate-600 font-bold hover:bg-slate-100 hover:text-primary transition-colors border border-slate-200"
                            >
                                <ExternalLink className="w-4 h-4" />
                                {website}
                            </a>
                            <div className="px-5 py-2 rounded-xl bg-green-50 text-green-700 font-bold border border-green-100">
                                {pricing}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-6 flex-1">
                {/* Strengths */}
                <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-100 flex flex-col">
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                            💪
                        </span>
                        Fortalezas
                    </h3>
                    <div className="space-y-4 flex-1">
                        {strengths.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-700 font-medium leading-tight">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* When to Use */}
                <div
                    className="rounded-[2rem] p-8 shadow-lg border relative overflow-hidden text-white flex flex-col"
                    style={{ backgroundColor: color }}
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-16 -mb-16 blur-xl"></div>

                    <h3 className="text-xl font-black text-white/90 uppercase tracking-widest mb-6 flex items-center gap-3 relative z-10">
                        <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                            ⚡
                        </span>
                        Cuándo Usar
                    </h3>
                    <div className="space-y-4 relative z-10 flex-1">
                        {whenToUse.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10">
                                <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0"></div>
                                <span className="font-medium leading-tight">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolCard;
