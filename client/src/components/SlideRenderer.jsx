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
    MessageSquare,
    Globe,
    FileText,
    Image,
    Mic,
    Building2,
    Wrench,
    Search,
    BookOpen,
    Sparkles,
    Settings,
    Sliders,
    ShieldCheck,
    GitFork,
    Lightbulb,
    Copy,
    HelpCircle,
    RefreshCw,
    Wand2,
    Activity
} from 'lucide-react';

import ExerciseSlide from './slides/ExerciseSlide';
import SummarySlide from './slides/SummarySlide';
import ToolCard from './slides/ToolCard';
import Technique from './slides/Technique';
import TechniqueAdvanced from './slides/TechniqueAdvanced';
import TechniqueGrid from './slides/TechniqueGrid';
import FeatureHighlight from './slides/FeatureHighlight';
import FeatureGrid from './slides/FeatureGrid';
import ToolStack from './slides/ToolStack';
import ToolComparisonTable from './slides/ToolComparisonTable';
import TableDetail from './slides/TableDetail';
import WarningTable from './slides/WarningTable';
import ConfigPanel from './slides/ConfigPanel';
import StatHighlight from './slides/StatHighlight';
import DecisionTree from './slides/DecisionTree';
import CaseIntro from './slides/CaseIntro';
import PromptTemplate from './slides/PromptTemplate';
import Rules from './slides/Rules';
import Break from './slides/Break';
import ToolComparisonVoice from './slides/ToolComparisonVoice';
import SetupGuide from './slides/SetupGuide';
import PromptCollection from './slides/PromptCollection';
import FeatureShowcase from './slides/FeatureShowcase';
import Workflow from './slides/Workflow';
import GalleryView from './slides/GalleryView';
import KeyPoints from './slides/KeyPoints';
import ResourcesDownload from './slides/ResourcesDownload';
import ToolSummary from './slides/ToolSummary';
import QuoteLarge from './slides/QuoteLarge';
import NextSteps from './slides/NextSteps';
import Contact from './slides/Contact';
import ExerciseInteractive from './slides/ExerciseInteractive';

const ICON_MAP = {
    Car,
    Cpu,
    Zap,
    Target,
    User,
    Layout,
    MessageSquare,
    Globe,
    FileText,
    Image,
    Mic,
    Building2,
    Wrench,
    Search,
    BookOpen,
    Sparkles,
    Settings,
    Sliders,
    ShieldCheck,
    GitFork,
    Lightbulb,
    Copy,
    HelpCircle,
    RefreshCw,
    Wand2,
    Activity
};

const SlideRenderer = ({ slide, moduleId }) => {
    if (!slide) return null;
    const { type, contentData, title } = slide;

    const renderContent = () => {
        switch (type) {
            case 'hero':
                return (
                    <div className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] w-full rounded-2xl sm:rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-1000 group">
                        <img
                            src={contentData.image}
                            alt={contentData.heading}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6 sm:p-8 lg:p-12 w-full">
                            <h3 className="text-2xl sm:text-4xl lg:text-6xl font-black text-white mb-3 sm:mb-4 tracking-tight leading-tight drop-shadow-xl">{contentData.heading}</h3>
                            <p className="text-base sm:text-xl lg:text-2xl text-blue-100/90 font-medium max-w-2xl drop-shadow-lg">{contentData.paragraph}</p>
                            <div className="mt-6 sm:mt-8 flex items-center gap-4">
                                <div className="h-1 w-16 sm:w-24 bg-accent rounded-full"></div>
                                <span className="text-accent uppercase tracking-[0.2em] sm:tracking-[0.3em] font-black text-xs sm:text-sm">Comenzar Módulo</span>
                            </div>
                        </div>
                    </div>
                );

            case 'stat-comparison':
                return (
                    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-50 rounded-bl-full -mr-12 -mt-12 sm:-mr-16 sm:-mt-16 opacity-50"></div>
                            <h3 className="text-lg sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">{contentData.heading}</h3>
                            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 justify-center py-4 sm:py-6">
                                <div className="text-center group">
                                    <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Antes</div>
                                    <div className="text-3xl sm:text-5xl font-black text-slate-300 line-through decoration-slate-400/50 decoration-4 group-hover:text-slate-400 transition-colors uppercase">{contentData.statSecondary}</div>
                                </div>
                                <ArrowRight className="w-8 h-8 sm:w-12 sm:h-12 text-secondary sm:block animate-pulse rotate-90 sm:rotate-0" />
                                <div className="text-center">
                                    <div className="text-secondary text-xs font-bold uppercase tracking-widest mb-2 font-black">Hoy</div>
                                    <div className="text-5xl sm:text-7xl font-black text-primary drop-shadow-sm">{contentData.statPrimary}</div>
                                </div>
                            </div>
                            <div className="text-center bg-slate-50 py-3 rounded-xl border border-dashed border-slate-200">
                                <p className="text-slate-500 font-medium text-sm sm:text-base">{contentData.label}</p>
                            </div>
                            {contentData.quote && (
                                <div className="mt-6 sm:mt-8 flex gap-3 sm:gap-4 bg-blue-50/50 p-4 sm:p-6 rounded-2xl italic text-blue-900 border-l-4 border-secondary">
                                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-secondary flex-shrink-0 opacity-40" />
                                    <p className="text-sm sm:text-lg">"{contentData.quote}"</p>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'profile':
                return (
                    <div className="flex flex-col md:flex-row gap-6 sm:gap-10 items-center md:items-start animate-in fade-in slide-in-from-left-4 duration-700">
                        <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 flex-shrink-0 rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white ring-4 sm:ring-8 ring-slate-100 rotate-2">
                            <img src={contentData.image} alt={contentData.heading} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 space-y-4 sm:space-y-6 min-w-0">
                            <div>
                                <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-primary mb-2 tracking-tight text-center md:text-left">{contentData.heading}</h3>
                                <p className="text-base sm:text-xl text-slate-500 font-bold border-b border-slate-100 pb-4 text-center md:text-left">{contentData.subheading}</p>
                            </div>
                            <div className="space-y-3 sm:space-y-4">
                                {contentData.bullets.map((bullet, i) => (
                                    <div key={i} className="flex items-center gap-3 sm:gap-4 bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                                        <span className="text-base sm:text-xl group-hover:scale-110 transition-transform">{bullet}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'narrative':
                return (
                    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-700">
                        {/* Primera sección */}
                        <div className="prose prose-slate max-w-none">
                            <h3 className="text-xl sm:text-3xl font-bold text-slate-800 tracking-tight">{contentData.Heading1}</h3>
                            <p className="text-slate-600 leading-relaxed text-base sm:text-xl">{contentData.paragraph1}</p>
                        </div>
                        {contentData.bullets1 && (
                            <div className="grid gap-3 sm:gap-4">
                                {contentData.bullets1.map((bullet, i) => (
                                    <div key={i} className="flex items-start gap-3 sm:gap-5 p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-100 shadow-sm group hover:border-blue-200 transition-all hover:-translate-y-1">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-sm flex-shrink-0">
                                            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <span className="text-slate-700 font-bold text-base sm:text-lg pt-0.5 sm:pt-1">{bullet}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {/* Segunda sección */}
                        {contentData.Heading2 && (
                            <div className="prose prose-slate max-w-none">
                                <h3 className="text-xl sm:text-3xl font-bold text-slate-800 tracking-tight">{contentData.Heading2}</h3>
                                <p className="text-slate-600 leading-relaxed text-base sm:text-xl">{contentData.paragraph2}</p>
                            </div>
                        )}
                        {contentData.bullets2 && (
                            <div className="grid gap-3 sm:gap-4">
                                {contentData.bullets2.map((bullet, i) => (
                                    <div key={i} className="flex items-start gap-3 sm:gap-5 p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-100 shadow-sm group hover:border-blue-200 transition-all hover:-translate-y-1">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-sm flex-shrink-0">
                                            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <span className="text-slate-700 font-bold text-base sm:text-lg pt-0.5 sm:pt-1">{bullet}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {contentData.highlight && (
                            <div className={`p-4 sm:p-8 rounded-2xl sm:rounded-3xl border-l-4 sm:border-l-[8px] shadow-lg ${contentData.highlight.type === 'success' ? 'bg-emerald-50 border-emerald-400 text-emerald-900' : 'bg-blue-50 border-blue-400 text-blue-900'
                                }`}>
                                <p className="text-lg sm:text-2xl font-black leading-tight">{contentData.highlight.text}</p>
                            </div>
                        )}
                    </div>
                );

            case 'warning':
                const { bullets } = contentData;
                return (
                    <div className="space-y-6 sm:space-y-8 animate-in zoom-in-95 duration-500">
                        <div className="bg-red-50 border-2 border-red-100 rounded-2xl sm:rounded-[2rem] p-6 sm:p-10 relative overflow-hidden ring-4 sm:ring-8 ring-red-50/50">
                            <div className="absolute -top-6 -right-6 sm:-top-10 sm:-right-10 w-32 h-32 sm:w-48 sm:h-48 bg-red-100/50 rounded-full"></div>
                            <div className="flex items-center gap-3 sm:gap-5 mb-4 sm:mb-8">
                                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-xl shadow-red-200 flex-shrink-0">
                                    <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8" />
                                </div>
                                <h3 className="text-xl sm:text-4xl font-black text-red-900 tracking-tight">{contentData.heading}</h3>
                            </div>
                            <p className="text-lg sm:text-2xl text-red-800/90 font-bold leading-relaxed mb-6 sm:mb-10">{contentData.paragraph}</p>

                            {bullets && bullets.length > 0 && (
                                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                                    {bullets.map((bullet, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-3 text-gray-700 text-base sm:text-lg bg-red-100/50 p-3 sm:p-4 rounded-lg sm:rounded-xl font-medium"
                                        >
                                            <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                                            <span className="break-words">{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {contentData.highlight && (
                                <div className="bg-red-600 p-4 sm:p-8 rounded-xl sm:rounded-2xl text-white shadow-2xl shadow-red-300 transform -rotate-1 mt-4 sm:mt-6">
                                    <p className="text-lg sm:text-3xl font-black text-center uppercase tracking-widest">{contentData.highlight.text}</p>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'concept':
                return (
                    <div className="grid md:grid-cols-2 gap-6 sm:gap-12 items-center animate-in fade-in slide-in-from-right-4 duration-700">
                        <div className="space-y-4 sm:space-y-8 order-2 md:order-1">
                            <h3 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">{contentData.heading}</h3>
                            <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-medium">{contentData.paragraph}</p>
                            <div className="space-y-3 sm:space-y-4">
                                {contentData.bullets.map((bullet, i) => (
                                    <div key={i} className="flex items-center gap-3 sm:gap-5 p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-blue-200 transition-colors">
                                        <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary text-white flex items-center justify-center font-black text-base sm:text-lg shadow-md flex-shrink-0">{i + 1}</span>
                                        <span className="text-slate-700 font-bold sm:font-black text-base sm:text-lg">{bullet}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="order-1 md:order-2 bg-slate-100 rounded-2xl sm:rounded-[2.5rem] p-3 sm:p-4 shadow-inner group">
                            <div className="overflow-hidden rounded-xl sm:rounded-[2rem] shadow-2xl ring-2 sm:ring-4 ring-white">
                                <img src={contentData.image} alt="Concept diagram" className="w-full h-auto group-hover:scale-105 transition-transform duration-700" />
                            </div>
                        </div>
                    </div>
                );

            case 'analogy':
                return (
                    <div className="space-y-6 sm:space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
                        <div className="text-center mb-2 sm:mb-4">
                            <h3 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">{contentData.heading}</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
                            {[contentData.left, contentData.right].map((side, i) => {
                                const IconComp = ICON_MAP[side.icon] || Info;
                                return (
                                    <div key={i} className={`p-5 sm:p-10 rounded-2xl sm:rounded-[2rem] border-2 transition-all duration-500 hover:scale-[1.02] shadow-xl ${i === 0
                                        ? 'bg-white border-slate-100 shadow-slate-200/50'
                                        : 'bg-primary border-primary shadow-blue-900/40 text-white'
                                        }`}>
                                        <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-8 shadow-lg transform -rotate-3 ${i === 0 ? 'bg-secondary text-white' : 'bg-accent text-primary'
                                            }`}>
                                            <IconComp className="w-8 h-8 sm:w-12 sm:h-12" />
                                        </div>
                                        <h4 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-4 uppercase tracking-widest opacity-80 ${i === 0 ? 'text-slate-500' : 'text-blue-100'}`}>{side.title}</h4>
                                        <p className={`text-2xl sm:text-4xl font-black leading-tight ${i === 0 ? 'text-primary' : 'text-accent'}`}>{side.text}</p>
                                    </div>
                                )
                            })}
                        </div>
                        {contentData.footer && (
                            <div className="text-center p-4 sm:p-8 bg-yellow-50 rounded-2xl sm:rounded-3xl border-2 border-yellow-100 shadow-lg shadow-yellow-200/20">
                                <p className="text-yellow-900 font-bold sm:font-black text-base sm:text-xl flex flex-row items-center justify-center gap-2 sm:gap-4">
                                    <span className="p-2 bg-accent rounded-lg flex-shrink-0">
                                        <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" strokeWidth={3} />
                                    </span>
                                    <span className="text-left sm:text-center">{contentData.footer}</span>
                                </p>
                            </div>
                        )}
                    </div>
                );

            case 'comparison':
                return (
                    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-700">
                        <div className="prose prose-slate max-w-none">
                            <h3 className="text-xl sm:text-3xl font-bold text-slate-800 tracking-tight">{contentData.heading}</h3>
                            <p className="text-slate-600 leading-relaxed text-base sm:text-xl">{contentData.paragraph}</p>
                        </div>
                        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl bg-white">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[500px]">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            {contentData.headers.map((header, i) => (
                                                <th key={i} className="p-3 sm:p-6 text-xs sm:text-sm font-black uppercase tracking-widest text-slate-500">{header}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {contentData.rows.map((row, i) => (
                                            <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                                                {row.map((cell, j) => (
                                                    <td key={j} className={`p-3 sm:p-6 text-sm sm:text-lg ${j === 1 ? 'font-bold text-primary' : 'text-slate-600'}`}>
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            case 'list-comparison':
                return (
                    <div className="space-y-6 sm:space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                        <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
                            {/* Left Side: SI */}
                            <div className="bg-emerald-50/50 rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 border border-emerald-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0">
                                        <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
                                    </div>
                                    <h4 className="text-lg sm:text-2xl font-black text-emerald-900 tracking-tight">{contentData.leftTitle}</h4>
                                </div>
                                <div className="space-y-3 sm:space-y-4">
                                    {contentData.leftItems.map((item, i) => (
                                        <div key={i} className="flex items-start gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-emerald-100 shadow-sm">
                                            <span className="text-emerald-500 font-black mt-0.5 flex-shrink-0">✓</span>
                                            <span className="text-emerald-900 font-bold text-sm sm:text-base">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side: NO */}
                            <div className="bg-red-50/50 rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 border border-red-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0">
                                        <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8" />
                                    </div>
                                    <h4 className="text-lg sm:text-2xl font-black text-red-900 tracking-tight">{contentData.rightTitle}</h4>
                                </div>
                                <div className="space-y-3 sm:space-y-4">
                                    {contentData.rightItems.map((item, i) => (
                                        <div key={i} className="flex items-start gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-red-100 shadow-sm">
                                            <span className="text-red-500 font-black mt-0.5 flex-shrink-0">✕</span>
                                            <span className="text-red-900 font-bold text-sm sm:text-base">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'poll':
                return (
                    <div className="text-center py-12 sm:py-20 animate-in zoom-in-95 duration-700">
                        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-inner">
                            <MessageSquare className="w-8 h-8 sm:w-12 sm:h-12 text-primary" />
                        </div>
                        <h3 className="text-2xl sm:text-4xl font-black text-slate-800 mb-4 sm:mb-6 px-4">{title}</h3>
                        <p className="text-lg sm:text-2xl text-slate-500 font-medium max-w-xl mx-auto mb-8 sm:mb-10 px-4">
                            Mira el panel de la derecha para participar en la encuesta en vivo.
                        </p>
                        <div className="flex justify-center">
                            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary/10 text-primary rounded-full font-black text-xs sm:text-sm uppercase tracking-widest">
                                <div className="w-2 h-2 rounded-full bg-accent animate-ping"></div>
                                Activo Ahora
                            </div>
                        </div>
                    </div>
                );

            // --- NEW SLIDE TYPES ---
            case 'tool-card':
                return <ToolCard contentData={contentData} />;

            case 'technique':
                return <Technique contentData={contentData} />;

            case 'technique-advanced':
                return <TechniqueAdvanced contentData={contentData} />;

            case 'technique-grid':
                return <TechniqueGrid contentData={contentData} />;

            case 'feature-highlight':
                return <FeatureHighlight contentData={contentData} />;

            case 'feature-grid':
                return <FeatureGrid contentData={contentData} />;

            case 'tool-stack':
                return <ToolStack contentData={contentData} />;

            case 'tool-comparison-table':
                return <ToolComparisonTable contentData={contentData} />;

            case 'table-detail':
                return <TableDetail contentData={contentData} />;

            case 'warning-table':
                return <WarningTable contentData={contentData} />;

            case 'config-panel':
                return <ConfigPanel contentData={contentData} />;

            case 'stat-highlight':
                return <StatHighlight contentData={contentData} />;

            case 'decision-tree':
                return <DecisionTree contentData={contentData} />;

            case 'case-intro':
                return <CaseIntro contentData={contentData} />;

            case 'prompt-template':
                return <PromptTemplate contentData={contentData} />;

            case 'rules':
                return <Rules contentData={contentData} />;

            case 'break':
                return <Break contentData={contentData} />;

            case 'tool-comparison-voice':
                return <ToolComparisonVoice contentData={contentData} />;

            case 'setup-guide':
                return <SetupGuide contentData={contentData} />;

            case 'prompt-collection':
                return <PromptCollection contentData={contentData} />;

            case 'feature-showcase':
                return <FeatureShowcase contentData={contentData} />;

            case 'workflow':
                return <Workflow contentData={contentData} />;

            case 'gallery-view':
                return <GalleryView contentData={contentData} moduleId={moduleId} />;

            case 'key-points':
                return <KeyPoints contentData={contentData} />;

            case 'resources-download':
                return <ResourcesDownload contentData={contentData} />;

            case 'tool-summary':
                return <ToolSummary contentData={contentData} />;

            case 'quote-large':
                return <QuoteLarge contentData={contentData} />;

            case 'next-steps':
                return <NextSteps contentData={contentData} />;

            case 'contact':
                return <Contact contentData={contentData} />;

            case 'exercise-interactive':
                return <ExerciseInteractive contentData={contentData} interaction={slide.interaction} />;

            case 'exercise':
                return <ExerciseSlide contentData={contentData} />;

            case 'summary':
                return <SummarySlide contentData={contentData} />;

            case 'interactive':
                // Slides interactivas muestran su contenido en el panel derecho
                return (
                    <div className="text-center py-20 animate-in zoom-in-95 duration-700">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                            <Settings className="w-12 h-12 text-primary" />
                        </div>
                        <h3 className="text-4xl font-black text-slate-800 mb-6">{title}</h3>
                        <p className="text-2xl text-slate-500 font-medium max-w-xl mx-auto mb-10">
                            Usa el panel de la derecha para interactuar con esta actividad.
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
