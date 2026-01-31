import { useState, useEffect } from 'react';
import { useSessionSync } from '../hooks/useSessionSync';
import { useGallery } from '../hooks/useGallery';
import { ChevronLeft, ChevronRight, Eye, EyeOff, Star, Trash2, BarChart3, Dumbbell, Unlock, Lock } from 'lucide-react';

// Hook personalizado para el slider
function useSlider(totalSlides, currentIndex, onChange) {
    const [isDragging, setIsDragging] = useState(false);
    
    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        const newIndex = Math.min(Math.max(Math.round(percentage * totalSlides) - 1, 0), totalSlides - 1);
        onChange(newIndex);
    };
    
    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);
    
    return { isDragging, handleClick, handleMouseDown, handleMouseUp };
}

export function AdminPanel({ modules, currentModuleIndex, currentSlideIndex, onNavigate }) {
    const { setCurrentSlide, toggleGalleryVisibility, toggleFreeMode, sessionState } = useSessionSync(true);
    const currentModule = modules && currentModuleIndex >= 0 ? modules[currentModuleIndex] : null;
    const currentModuleId = currentModule?.id || null;
    
    // Filtrar submissions por el módulo actual
    const { submissions, highlightSubmission, hideSubmission, refetch } = useGallery(null, currentModuleId);
    const [showSubmissions, setShowSubmissions] = useState(false);

    // Refetch submissions when module changes
    useEffect(() => {
        console.log('[AdminPanel] Module changed to:', currentModuleId);
        if (currentModuleId) {
            refetch();
        }
    }, [currentModuleId]);

    // Debug logs
    useEffect(() => {
        console.log('[AdminPanel] Current module:', currentModuleId, 'Submissions count:', submissions.length);
    }, [currentModuleId, submissions]);

    const totalSlides = currentModule?.slides?.length || 0;
    const isLastSlide = currentSlideIndex === totalSlides - 1;
    const isFreeModeActiveForCurrentModule = sessionState.isFreeMode && sessionState.freeModuleId === currentModule?.id;

    async function handlePrev() {
        if (!modules) return;

        if (currentSlideIndex > 0) {
            const newSlide = currentModule.slides[currentSlideIndex - 1];
            await setCurrentSlide(currentModule.id, newSlide.id);
            onNavigate(currentModule.id, newSlide.id);
        } else if (currentModuleIndex > 0) {
            const prevModule = modules[currentModuleIndex - 1];
            const lastSlideIndex = prevModule.slides.length - 1;
            await setCurrentSlide(prevModule.id, prevModule.slides[lastSlideIndex].id);
            onNavigate(prevModule.id, prevModule.slides[lastSlideIndex].id);
        }
    }

    async function handleNext() {
        if (!modules) return;

        if (currentSlideIndex < totalSlides - 1) {
            const newSlide = currentModule.slides[currentSlideIndex + 1];
            await setCurrentSlide(currentModule.id, newSlide.id);
            onNavigate(currentModule.id, newSlide.id);
        } else if (currentModuleIndex < modules.length - 1) {
            const nextModule = modules[currentModuleIndex + 1];
            await setCurrentSlide(nextModule.id, nextModule.slides[0].id);
            onNavigate(nextModule.id, nextModule.slides[0].id);
        }
    }

    async function jumpToSlide(slideType) {
        // Buscar la primera slide del tipo especificado SOLO en el módulo actual
        if (!currentModule) return;
        const targetSlide = currentModule.slides.find(s => s.type === slideType);
        if (targetSlide) {
            await setCurrentSlide(currentModule.id, targetSlide.id);
            onNavigate(currentModule.id, targetSlide.id);
        }
    }

    async function jumpToSlideIndex(index) {
        // Navegar a un slide específico por índice
        if (!currentModule || index < 0 || index >= totalSlides) return;
        const targetSlide = currentModule.slides[index];
        await setCurrentSlide(currentModule.id, targetSlide.id);
        onNavigate(currentModule.id, targetSlide.id);
    }

    // Hook para el slider
    const slider = useSlider(totalSlides, currentSlideIndex, jumpToSlideIndex);

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-4 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] border-t border-slate-700">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Navegación */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={handlePrev}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700"
                        title="Anterior Slide (Admin)"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="flex flex-col min-w-[200px]">
                        <span className="text-sm font-bold text-slate-200">
                            {currentModule?.title || 'Cargando...'}
                        </span>
                        
                        {/* Slider de slides */}
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-slate-400 w-8">{currentSlideIndex + 1}</span>
                            <div 
                                className="flex-1 h-2 bg-slate-700 rounded-full cursor-pointer relative group"
                                onClick={slider.handleClick}
                                onMouseDown={slider.handleMouseDown}
                                onMouseUp={slider.handleMouseUp}
                                onMouseLeave={slider.handleMouseUp}
                                title="Click para ir a un slide específico"
                            >
                                {/* Barra de progreso */}
                                <div 
                                    className="absolute left-0 top-0 h-full bg-blue-500 rounded-full transition-all duration-150"
                                    style={{ width: `${((currentSlideIndex + 1) / totalSlides) * 100}%` }}
                                />
                                {/* Marcadores de slides */}
                                <div className="absolute inset-0 flex">
                                    {currentModule?.slides?.map((slide, idx) => (
                                        <div
                                            key={slide.id}
                                            className={`flex-1 h-full ${idx < totalSlides - 1 ? 'border-r border-slate-600/50' : ''} 
                                                ${slide.type === 'poll' ? 'bg-blue-400/20' : slide.type === 'exercise' ? 'bg-green-400/20' : ''}`}
                                            title={`${idx + 1}. ${slide.title}${slide.type ? ` (${slide.type})` : ''}`}
                                        />
                                    ))}
                                </div>
                                {/* Handle del slider */}
                                <div 
                                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-blue-500 transition-all duration-150 hover:scale-125"
                                    style={{ left: `calc(${((currentSlideIndex + 1) / totalSlides) * 100}% - 8px)` }}
                                />
                            </div>
                            <span className="text-xs text-slate-400 w-8 text-right">{totalSlides}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleNext}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700"
                        title="Siguiente Slide (Admin)"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Acceso Rápido */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => jumpToSlide('poll')}
                        className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all font-medium text-sm flex items-center gap-2 shadow-lg shadow-blue-900/20"
                        title="Ir a Encuesta"
                    >
                        <BarChart3 className="w-4 h-4" />
                        Encuesta
                    </button>
                    <button
                        onClick={() => jumpToSlide('exercise')}
                        className="px-3 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white transition-all font-medium text-sm flex items-center gap-2 shadow-lg shadow-green-900/20"
                        title="Ir a Ejercicio"
                    >
                        <Dumbbell className="w-4 h-4" />
                        Ejercicio
                    </button>
                </div>

                {/* Controles */}
                <div className="flex items-center gap-4">
                    <div className="h-8 w-px bg-slate-700 mx-2"></div>

                    {/* Botón Modo Libre - Solo visible en última slide del módulo */}
                    {isLastSlide && (
                        <button
                            onClick={async () => {
                                if (!currentModule?.id) return;
                                await toggleFreeMode(currentModule.id);
                            }}
                            disabled={!currentModule?.id}
                            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-medium text-sm
                                        ${isFreeModeActiveForCurrentModule
                                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20'
                                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'}
                                        disabled:opacity-50 disabled:cursor-not-allowed`}
                            title={isFreeModeActiveForCurrentModule ? "Desactivar navegación libre para alumnos" : "Permitir a alumnos navegar libremente en este módulo"}
                        >
                            {isFreeModeActiveForCurrentModule ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                            {isFreeModeActiveForCurrentModule ? 'Modo Libre ON' : 'Modo Libre'}
                        </button>
                    )}

                    <button
                        onClick={toggleGalleryVisibility}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-medium text-sm
                                    ${sessionState.isGalleryVisible
                                ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'}`}
                    >
                        {sessionState.isGalleryVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        {sessionState.isGalleryVisible ? 'Galería Visible' : 'Galería Oculta'}
                    </button>

                    <button
                        onClick={() => setShowSubmissions(!showSubmissions)}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-medium text-sm
                                    ${showSubmissions
                                ? 'bg-blue-600 text-white hover:bg-blue-500'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'}`}
                    >
                        <Star className="w-4 h-4" />
                        Gestionar Envíos ({submissions.length})
                    </button>
                </div>
            </div>

            {/* Panel de envíos */}
            {showSubmissions && (
                <div className="absolute bottom-full left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-700 p-6 max-h-[60vh] overflow-y-auto shadow-2xl">
                    <div className="max-w-7xl mx-auto">
                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-400" />
                            Envíos de la Galería
                        </h4>

                        {submissions.length === 0 ? (
                            <div className="text-center py-12 text-slate-500">
                                No hay envíos todavía.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {submissions.map((sub) => (
                                    <div key={sub.id} className={`p-4 rounded-xl border transition-all
                                                                  ${sub.is_highlighted
                                            ? 'bg-yellow-900/20 border-yellow-500/50 shadow-lg shadow-yellow-900/10'
                                            : 'bg-slate-800 border-slate-700'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                                                {sub.participant_name}
                                            </span>
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => highlightSubmission(sub.id, !sub.is_highlighted)}
                                                    className={`p-1.5 rounded-lg transition-colors
                                                                ${sub.is_highlighted ? 'bg-yellow-500 text-slate-900' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
                                                    title={sub.is_highlighted ? "Quitar destacado" : "Destacar"}
                                                >
                                                    <Star className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => hideSubmission(sub.id)}
                                                    className="p-1.5 rounded-lg bg-slate-700 text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors"
                                                    title="Ocultar"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            {/* IA y Modelo */}
                                            {(sub.ai_name || sub.ai_model) && (
                                                <div className="flex items-center gap-2 text-xs">
                                                    <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded font-medium">
                                                        {sub.ai_name || 'IA'}
                                                    </span>
                                                    {sub.ai_model && (
                                                        <span className="text-slate-400">
                                                            {sub.ai_model}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                            {sub.prompt_text && (
                                                <div className="bg-black/30 p-2 rounded text-xs text-slate-300 font-mono">
                                                    <span className="text-blue-400 font-bold">Prompt:</span> {sub.prompt_text.slice(0, 100)}...
                                                </div>
                                            )}
                                            {sub.result_text && (
                                                <p className="text-sm text-slate-300">
                                                    <span className="text-green-400 font-bold">Resultado:</span> {sub.result_text.slice(0, 150)}...
                                                </p>
                                            )}
                                            {sub.image_url && (
                                                <img
                                                    src={sub.image_url}
                                                    alt="Submission"
                                                    className="w-full h-32 object-cover rounded-lg border border-slate-700"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
