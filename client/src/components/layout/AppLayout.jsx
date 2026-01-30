import React from 'react';
import { ChevronRight } from 'lucide-react';
import SlideRenderer from '../SlideRenderer';
import AnimatedSlide from '../AnimatedSlide';

const AppLayout = ({ modules, activeModuleId, activeSlideId, onNavigate, children, rightPanel }) => {
    const activeModule = modules.find(m => m.id === activeModuleId);
    const activeSlideIndex = activeModule.slides.findIndex(s => s.id === activeSlideId);
    const activeSlide = activeModule.slides[activeSlideIndex];

    // Progress calculation
    const totalSlides = activeModule.slides.length;
    const progress = ((activeSlideIndex + 1) / totalSlides) * 100;

    // Calculate next slide logic
    const handleNext = () => {
        if (activeSlideIndex < totalSlides - 1) {
            onNavigate(activeModuleId, activeModule.slides[activeSlideIndex + 1].id);
        } else {
            const currentModuleIndex = modules.indexOf(activeModule);
            if (currentModuleIndex < modules.length - 1) {
                const nextModule = modules[currentModuleIndex + 1];
                onNavigate(nextModule.id, nextModule.slides[0].id);
            }
        }
    };

    const handlePrev = () => {
        if (activeSlideIndex > 0) {
            onNavigate(activeModuleId, activeModule.slides[activeSlideIndex - 1].id);
        }
    };

    return (
        <div className="flex h-screen bg-slate-100 overflow-hidden font-sans text-slate-900 selection:bg-secondary selection:text-white">

            {/* Sidebar - Fixed width */}
            <aside className="w-72 bg-primary text-white flex flex-col shadow-2xl z-20 flex-shrink-0">
                <div className="p-6 border-b border-blue-800/50 bg-blue-900/50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent to-yellow-600 rounded-xl flex items-center justify-center shadow-lg border border-yellow-400/20">
                            <span className="font-bold text-2xl text-white">IA</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-lg leading-tight tracking-tight">Curso IA</h1>
                            <p className="text-blue-300 text-xs font-medium uppercase tracking-wide opacity-80">Derecho Notarial</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-transparent">
                    {modules.map(module => {
                        const isActive = module.id === activeModuleId;
                        const Icon = module.icon;
                        return (
                            <button
                                key={module.id}
                                onClick={() => onNavigate(module.id, module.slides[0].id)}
                                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20 ring-1 ring-blue-500/50'
                                    : 'text-blue-200 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-0 h-full w-1 bg-accent" />
                                )}
                                <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? 'text-accent' : 'text-blue-400 group-hover:text-blue-200'}`} />
                                <span className={`font-medium text-sm text-left truncate transition-transform ${isActive ? 'translate-x-1' : ''}`}>{module.title}</span>
                                {isActive && <ChevronRight className="w-4 h-4 ml-auto text-blue-300" />}
                            </button>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-blue-800/50 bg-blue-900/30">
                    <div className="flex items-center gap-3 px-2 py-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center font-bold text-sm border border-blue-600/50 text-blue-100 shadow-inner">JZ</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-medium text-sm truncate">José Luis Zapata</p>
                            <p className="text-xs text-blue-300 truncate">Instructor</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content + Right Panel wrapper to handle layout */}
            <div className="flex-1 flex flex-col xl:flex-row min-w-0">

                {/* Main Content - Flexible */}
                <main className="flex-1 flex flex-col relative bg-slate-50/50">
                    {/* Progress Bar */}
                    <div className="h-1 bg-slate-200 w-full">
                        <div
                            className="h-full bg-accent transition-all duration-700 ease-out shadow-[0_0_10px_rgba(214,158,46,0.5)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto w-full">
                        <div className="max-w-3xl mx-auto p-8 lg:p-12 pb-32">
                            <AnimatedSlide slideKey={activeSlide.id}>
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100/80 text-primary text-xs font-bold tracking-wider mb-6 border border-blue-200 uppercase">
                                    Módulo {modules.indexOf(activeModule) + 1}
                                </span>

                                <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-8 leading-tight tracking-tight">
                                    {activeSlide.title}
                                </h2>

                                <div className="h-1.5 w-24 bg-gradient-to-r from-accent to-yellow-300 rounded-full mb-10"></div>

                                <SlideRenderer slide={activeSlide} />
                            </AnimatedSlide>
                        </div>
                    </div>

                    {/* Footer Navigation */}
                    <div className="absolute bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-200 p-4 px-8 flex items-center justify-between z-10">
                        <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider hidden sm:block">
                            {activeSlideIndex + 1} <span className="text-slate-300">/</span> {totalSlides}
                        </div>
                        <div className="flex gap-4 w-full sm:w-auto justify-between sm:justify-end">
                            <button
                                onClick={handlePrev}
                                disabled={activeSlideIndex === 0}
                                className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                            >
                                Anterior
                            </button>
                            <button
                                onClick={handleNext}
                                className="px-8 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-blue-800 shadow-lg shadow-blue-900/20 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                            >
                                {activeSlideIndex < totalSlides - 1 ? 'Siguiente' : 'Siguiente Módulo'}
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </main>

                {/* Right Panel - Fixed width but responsive on smaller screens if needed */}
                {activeSlide.type === 'poll' && (
                    <aside className="w-full xl:w-[420px] bg-white border-t xl:border-t-0 xl:border-l border-slate-200 flex flex-col shadow-xl z-10 flex-shrink-0 order-first xl:order-last h-[400px] xl:h-auto">
                        <div className="p-6 bg-slate-50 border-b border-slate-100">
                            <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                                Interacción
                            </h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
                            {rightPanel}
                        </div>
                    </aside>
                )}

            </div>
        </div>
    );
};

export default AppLayout;
