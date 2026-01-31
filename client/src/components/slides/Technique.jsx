import React from 'react';
import {
    User,
    FileText,
    Layout,
    Copy,
    HelpCircle,
    MessageSquare,
    RefreshCw,
    Wand2,
    Lightbulb
} from 'lucide-react';

const ICON_MAP = {
    UserCircle: User,
    FileText,
    Layout,
    Copy,
    HelpCircle,
    MessageSquare,
    RefreshCw,
    Wand2,
    Lightbulb
};

const Technique = ({ contentData }) => {
    const { heading, icon, paragraph, examples, tip, codeBlock, highlight } = contentData;
    const IconComp = ICON_MAP[icon] || Lightbulb;

    return (
        <div className="h-full flex flex-col gap-4 sm:gap-6 animate-in fade-in slide-in-from-right-4 duration-700">
            {/* Header */}
            <div className="flex items-start gap-3 sm:gap-6">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-primary text-white flex items-center justify-center shadow-lg shadow-blue-900/20 flex-shrink-0 rotate-3">
                    <IconComp className="w-7 h-7 sm:w-10 sm:h-10" strokeWidth={1.5} />
                </div>
                <div className="flex-1 space-y-1 sm:space-y-2 min-w-0">
                    <h2 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">{heading}</h2>
                    <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-medium">{paragraph}</p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 grid md:grid-cols-5 gap-4 sm:gap-6 min-h-0">
                {/* Left/Top Column: Examples or CodeBlock */}
                <div className="md:col-span-3 space-y-3 sm:space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                    {codeBlock ? (
                        <div className="bg-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-700 font-mono text-xs sm:text-sm relative group overflow-hidden">
                            <div className="absolute top-0 right-0 px-3 sm:px-4 py-1 bg-slate-800 rounded-bl-lg sm:rounded-bl-xl text-xs text-slate-400 font-bold uppercase tracking-widest">
                                {codeBlock.title}
                            </div>
                            <pre className="text-blue-200 whitespace-pre-wrap leading-relaxed pt-5 sm:pt-6 overflow-x-auto">
                                {codeBlock.code}
                            </pre>
                        </div>
                    ) : (
                        <div className="grid gap-3 sm:gap-4">
                            {examples && examples.map((example, i) => (
                                <div key={i} className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group">
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 sm:mb-2 group-hover:text-primary transition-colors">
                                        {example.label}
                                    </div>
                                    <p className="text-base sm:text-lg text-slate-700 font-medium border-l-4 border-slate-100 pl-3 sm:pl-4 group-hover:border-primary transition-colors">
                                        {example.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right/Bottom Column: Highlights and Tips */}
                <div className="md:col-span-2 space-y-3 sm:space-y-4 flex flex-col">
                    {highlight && (
                        <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border shadow-lg ${highlight.type === 'success'
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                                : highlight.type === 'info'
                                    ? 'bg-blue-50 border-blue-200 text-blue-900'
                                    : 'bg-red-50 border-red-200 text-red-900'
                            }`}>
                            <p className="text-base sm:text-lg font-bold leading-tight flex flex-col gap-2">
                                <span className={`text-xs uppercase tracking-widest font-black opacity-60 ${highlight.type === 'success' ? 'text-emerald-700' :
                                        highlight.type === 'info' ? 'text-blue-700' : 'text-red-700'
                                    }`}>
                                    Clave
                                </span>
                                {highlight.text}
                            </p>
                        </div>
                    )}

                    {tip && (
                        <div className="bg-yellow-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-yellow-100 shadow-sm flex-1 flex flex-col justify-center">
                            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-yellow-700 font-black uppercase tracking-widest text-xs sm:text-sm">
                                <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-600" />
                                Pro Tip
                            </div>
                            <p className="text-yellow-900 font-bold text-base sm:text-lg italic leading-relaxed">
                                "{tip}"
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Technique;
