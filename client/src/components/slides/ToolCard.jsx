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
            <div className="bg-white rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-8 shadow-xl border border-slate-100 relative overflow-hidden mb-4 sm:mb-6 group">
                <div
                    className="absolute top-0 left-0 w-full h-2"
                    style={{ backgroundColor: color }}
                ></div>

                <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-8 relative z-10">
                    <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl bg-slate-50 p-2 sm:p-4 border border-slate-100 shadow-inner flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
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

                    <div className="text-center md:text-left flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row items-center md:items-baseline gap-2 sm:gap-3 mb-2">
                            <h2 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">{heading}</h2>
                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-slate-100 text-slate-500">
                                {company}
                            </span>
                        </div>
                        <p className="text-lg sm:text-2xl text-slate-500 font-medium italic mb-3 sm:mb-4">"{tagline}"</p>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-4">
                            <a
                                href={`https://${website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 rounded-xl bg-slate-50 text-slate-600 font-bold hover:bg-slate-100 hover:text-primary transition-colors border border-slate-200 text-sm sm:text-base"
                            >
                                <ExternalLink className="w-4 h-4" />
                                <span className="truncate max-w-[150px]">{website}</span>
                            </a>
                            <div className="px-3 sm:px-5 py-2 rounded-xl bg-green-50 text-green-700 font-bold border border-green-100 text-sm sm:text-base">
                                {pricing}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 flex-1">
                {/* Strengths */}
                <div className="bg-white rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 shadow-lg border border-slate-100 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-black text-slate-800 uppercase tracking-widest mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm sm:text-base">
                            💪
                        </span>
                        Fortalezas
                    </h3>
                    <div className="space-y-3 sm:space-y-4 flex-1">
                        {strengths.map((item, i) => (
                            <div key={i} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors">
                                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-700 font-medium leading-tight text-sm sm:text-base">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* When to Use */}
                <div
                    className="rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 shadow-lg border relative overflow-hidden text-white flex flex-col"
                    style={{ backgroundColor: color }}
                >
                    <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full -mr-12 -mt-12 sm:-mr-16 sm:-mt-16 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-black/10 rounded-full -ml-12 -mb-12 sm:-ml-16 sm:-mb-16 blur-xl"></div>

                    <h3 className="text-lg sm:text-xl font-black text-white/90 uppercase tracking-widest mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 relative z-10">
                        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/20 flex items-center justify-center text-sm sm:text-base">
                            ⚡
                        </span>
                        Cuándo Usar
                    </h3>
                    <div className="space-y-3 sm:space-y-4 relative z-10 flex-1">
                        {whenToUse.map((item, i) => (
                            <div key={i} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10">
                                <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0"></div>
                                <span className="font-medium leading-tight text-sm sm:text-base">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolCard;
