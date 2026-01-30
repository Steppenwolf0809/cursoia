import React from 'react';
import { Brain, Search, BookOpen, Sparkles, MessageSquare, Building2, Wrench, Zap } from 'lucide-react';

const ICON_MAP = {
    Brain,
    Search,
    BookOpen,
    Sparkles,
    MessageSquare,
    Building2,
    Wrench,
    Zap
};

const ToolStack = ({ contentData }) => {
    const { heading, subheading, tools, footer } = contentData;

    return (
        <div className="h-full flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-700">
            <div className="text-center mb-10">
                <h2 className="text-5xl font-black text-slate-800 mb-4 tracking-tight">{heading}</h2>
                <p className="text-2xl text-slate-500 font-medium uppercase tracking-widest">{subheading}</p>
            </div>

            <div className="w-full max-w-4xl space-y-4">
                {tools.map((tool, i) => {
                    const Icon = ICON_MAP[tool.icon] || Zap;
                    return (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6 hover:scale-105 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group z-10 relative">
                            <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-colors shadow-inner">
                                <Icon className="w-7 h-7" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-black text-slate-800">{tool.name}</h3>
                                <p className="text-lg text-slate-500">{tool.use}</p>
                            </div>
                            <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-300 font-bold group-hover:bg-accent group-hover:text-primary transition-colors">
                                {i + 1}
                            </div>
                        </div>
                    )
                })}
            </div>

            {footer && (
                <div className="mt-12 text-center max-w-2xl px-8 py-4 bg-slate-100 rounded-2xl">
                    <p className="text-slate-600 font-medium italic">"{footer}"</p>
                </div>
            )}
        </div>
    );
};

export default ToolStack;
