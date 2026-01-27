import React from 'react';
import {
    ArrowRight,
    CheckCircle2,
    AlertTriangle,
    Info,
    Car,
    Cpu,
    Zap,
    Target,
    User,
    Quote,
    Layout,
    MessageSquare
} from 'lucide-react';

const ICON_MAP = {
    Car,
    Cpu,
    Zap,
    Target,
    User,
    Layout,
    MessageSquare
};

const SlideRenderer = ({ slide }) => {
    if (!slide) return null;
    const { type, contentData, title } = slide;

    const renderContent = () => {
        switch (type) {
            case 'hero':
                return (
                    <div className="relative h-[80vh] w-full rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-1000 group">
                        <img
                            src={contentData.image}
                            alt={contentData.heading}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-12 w-full">
                            <h3 className="text-6xl font-black text-white mb-4 tracking-tight leading-none drop-shadow-xl">{contentData.heading}</h3>
                            <p className="text-2xl text-blue-100/90 font-medium max-w-2xl drop-shadow-lg">{contentData.paragraph}</p>
                            <div className="mt-8 flex items-center gap-4">
                                <div className="h-1 w-24 bg-accent rounded-full"></div>
                                <span className="text-accent uppercase tracking-[0.3em] font-black text-sm">Comenzar Módulo</span>
                            </div>
                        </div>
                    </div>
                );

            case 'stat-comparison':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 opacity-50"></div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-6">{contentData.heading}</h3>
                            <div className="flex flex-col sm:flex-row items-center gap-8 justify-center py-6">
                                <div className="text-center group">
                                    <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Antes</div>
                                    <div className="text-5xl font-black text-slate-300 line-through decoration-slate-400/50 decoration-4 group-hover:text-slate-400 transition-colors uppercase">{contentData.statSecondary}</div>
                                </div>
                                <ArrowRight className="w-12 h-12 text-secondary hidden sm:block animate-pulse" />
                                <div className="text-center">
                                    <div className="text-secondary text-xs font-bold uppercase tracking-widest mb-2 font-black">Hoy</div>
                                    <div className="text-7xl font-black text-primary drop-shadow-sm">{contentData.statPrimary}</div>
                                </div>
                            </div>
                            <div className="text-center bg-slate-50 py-3 rounded-xl border border-dashed border-slate-200">
                                <p className="text-slate-500 font-medium">{contentData.label}</p>
                            </div>
                            {contentData.quote && (
                                <div className="mt-8 flex gap-4 bg-blue-50/50 p-6 rounded-2xl italic text-blue-900 border-l-4 border-secondary">
                                    <Quote className="w-8 h-8 text-secondary flex-shrink-0 opacity-40" />
                                    <p className="text-lg">"{contentData.quote}"</p>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'profile':
                return (
                    <div className="flex flex-col md:flex-row gap-10 items-center md:items-start animate-in fade-in slide-in-from-left-4 duration-700">
                        <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white ring-8 ring-slate-100 rotate-2">
                            <img src={contentData.image} alt={contentData.heading} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 space-y-6">
                            <div>
                                <h3 className="text-4xl lg:text-5xl font-black text-primary mb-2 tracking-tight">{contentData.heading}</h3>
                                <p className="text-xl text-slate-500 font-bold border-b border-slate-100 pb-4">{contentData.subheading}</p>
                            </div>
                            <div className="space-y-4">
                                {contentData.bullets.map((bullet, i) => (
                                    <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                                        <span className="text-xl group-hover:scale-110 transition-transform">{bullet}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'narrative':
                return (
                    <div className="space-y-8 animate-in fade-in duration-700">
                        <div className="prose prose-xl prose-slate max-w-none">
                            <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{contentData.heading}</h3>
                            <p className="text-slate-600 leading-relaxed text-xl">{contentData.paragraph}</p>
                        </div>
                        {contentData.bullets && (
                            <div className="grid gap-4">
                                {contentData.bullets.map((bullet, i) => (
                                    <div key={i} className="flex items-start gap-5 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm group hover:border-blue-200 transition-all hover:-translate-y-1">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                        <span className="text-slate-700 font-bold text-lg pt-1">{bullet}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {contentData.highlight && (
                            <div className={`p-8 rounded-3xl border-l-[8px] shadow-lg ${contentData.highlight.type === 'success' ? 'bg-emerald-50 border-emerald-400 text-emerald-900' : 'bg-blue-50 border-blue-400 text-blue-900'
                                }`}>
                                <p className="text-2xl font-black leading-tight">{contentData.highlight.text}</p>
                            </div>
                        )}
                    </div>
                );

            case 'warning':
                return (
                    <div className="space-y-8 animate-in zoom-in-95 duration-500">
                        <div className="bg-red-50 border-2 border-red-100 rounded-[2rem] p-10 relative overflow-hidden ring-8 ring-red-50/50">
                            <div className="absolute -top-10 -right-10 w-48 h-48 bg-red-100/50 rounded-full"></div>
                            <div className="flex items-center gap-5 mb-8">
                                <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-red-200">
                                    <AlertTriangle className="w-8 h-8" />
                                </div>
                                <h3 className="text-4xl font-black text-red-900 tracking-tight">{contentData.heading}</h3>
                            </div>
                            <p className="text-2xl text-red-800/90 font-bold leading-relaxed mb-10">{contentData.paragraph}</p>
                            {contentData.highlight && (
                                <div className="bg-red-600 p-8 rounded-2xl text-white shadow-2xl shadow-red-300 transform -rotate-1">
                                    <p className="text-3xl font-black text-center uppercase tracking-widest">{contentData.highlight.text}</p>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'concept':
                return (
                    <div className="grid md:grid-cols-2 gap-12 items-center animate-in fade-in slide-in-from-right-4 duration-700">
                        <div className="space-y-8 order-2 md:order-1">
                            <h3 className="text-4xl font-black text-slate-800 tracking-tight">{contentData.heading}</h3>
                            <p className="text-xl text-slate-600 leading-relaxed font-medium">{contentData.paragraph}</p>
                            <div className="space-y-4">
                                {contentData.bullets.map((bullet, i) => (
                                    <div key={i} className="flex items-center gap-5 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-blue-200 transition-colors">
                                        <span className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black text-lg shadow-md">{i + 1}</span>
                                        <span className="text-slate-700 font-black text-lg">{bullet}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="order-1 md:order-2 bg-slate-100 rounded-[2.5rem] p-4 shadow-inner group">
                            <div className="overflow-hidden rounded-[2rem] shadow-2xl ring-4 ring-white">
                                <img src={contentData.image} alt="Concept diagram" className="w-full h-auto group-hover:scale-105 transition-transform duration-700" />
                            </div>
                        </div>
                    </div>
                );

            case 'analogy':
                return (
                    <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
                        <div className="text-center mb-4">
                            <h3 className="text-4xl font-black text-slate-800 tracking-tight">{contentData.heading}</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {[contentData.left, contentData.right].map((side, i) => {
                                const IconComp = ICON_MAP[side.icon] || Info;
                                return (
                                    <div key={i} className={`p-10 rounded-[2rem] border-2 transition-all duration-500 hover:scale-[1.02] shadow-xl ${i === 0
                                        ? 'bg-white border-slate-100 shadow-slate-200/50'
                                        : 'bg-primary border-primary shadow-blue-900/40 text-white'
                                        }`}>
                                        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-lg transform -rotate-3 ${i === 0 ? 'bg-secondary text-white' : 'bg-accent text-primary'
                                            }`}>
                                            <IconComp className="w-12 h-12" />
                                        </div>
                                        <h4 className={`text-xl font-bold mb-4 uppercase tracking-widest opacity-80 ${i === 0 ? 'text-slate-500' : 'text-blue-100'}`}>{side.title}</h4>
                                        <p className={`text-4xl font-black leading-tight ${i === 0 ? 'text-primary' : 'text-accent'}`}>{side.text}</p>
                                    </div>
                                )
                            })}
                        </div>
                        {contentData.footer && (
                            <div className="text-center p-8 bg-yellow-50 rounded-3xl border-2 border-yellow-100 shadow-lg shadow-yellow-200/20">
                                <p className="text-yellow-900 font-black text-xl flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <span className="p-2 bg-accent rounded-lg">
                                        <Zap className="w-6 h-6 text-primary" strokeWidth={3} />
                                    </span>
                                    {contentData.footer}
                                </p>
                            </div>
                        )}
                    </div>
                );

            case 'comparison':
                return (
                    <div className="space-y-8 animate-in fade-in duration-700">
                        <div className="prose prose-xl prose-slate max-w-none">
                            <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{contentData.heading}</h3>
                            <p className="text-slate-600 leading-relaxed text-xl">{contentData.paragraph}</p>
                        </div>
                        <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-xl bg-white">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        {contentData.headers.map((header, i) => (
                                            <th key={i} className="p-6 text-sm font-black uppercase tracking-widest text-slate-500">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {contentData.rows.map((row, i) => (
                                        <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                                            {row.map((cell, j) => (
                                                <td key={j} className={`p-6 text-lg ${j === 1 ? 'font-bold text-primary' : 'text-slate-600'}`}>
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'list-comparison':
                return (
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Left Side: SI */}
                            <div className="bg-emerald-50/50 rounded-[2rem] p-8 border border-emerald-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <h4 className="text-2xl font-black text-emerald-900 tracking-tight">{contentData.leftTitle}</h4>
                                </div>
                                <div className="space-y-4">
                                    {contentData.leftItems.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-emerald-100 shadow-sm">
                                            <span className="text-emerald-500 font-black mt-0.5">✓</span>
                                            <span className="text-emerald-900 font-bold">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side: NO */}
                            <div className="bg-red-50/50 rounded-[2rem] p-8 border border-red-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                        <AlertTriangle className="w-8 h-8" />
                                    </div>
                                    <h4 className="text-2xl font-black text-red-900 tracking-tight">{contentData.rightTitle}</h4>
                                </div>
                                <div className="space-y-4">
                                    {contentData.rightItems.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-red-100 shadow-sm">
                                            <span className="text-red-500 font-black mt-0.5">✕</span>
                                            <span className="text-red-900 font-bold">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'poll':
                return (
                    <div className="text-center py-20 animate-in zoom-in-95 duration-700">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                            <MessageSquare className="w-12 h-12 text-primary" />
                        </div>
                        <h3 className="text-4xl font-black text-slate-800 mb-6">{title}</h3>
                        <p className="text-2xl text-slate-500 font-medium max-w-xl mx-auto mb-10">
                            Mira el panel de la derecha para participar en la encuesta en vivo.
                        </p>
                        <div className="flex justify-center">
                            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-full font-black text-sm uppercase tracking-widest">
                                <div className="w-2 h-2 rounded-full bg-accent animate-ping"></div>
                                Activo Ahora
                            </div>
                        </div>
                    </div>
                );

            default:
                // Mantener compatibilidad con formato antiguo si existe
                if (slide.content) {
                    return (
                        <div className="prose prose-xl prose-slate max-w-none animate-in fade-in duration-500">
                            <p className="text-xl leading-relaxed text-slate-700">{slide.content}</p>
                        </div>
                    );
                }
                return (
                    <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
                        <p className="text-red-700 font-bold">Tipo de diapositiva desconocido: {type}</p>
                    </div>
                );
        }
    };

    return (
        <div className="slide-content w-full py-4">
            {renderContent()}
        </div>
    );
};

export default SlideRenderer;
