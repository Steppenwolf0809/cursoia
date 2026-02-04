import { useState, useEffect } from 'react';
import { useSessionSync } from '../hooks/useSessionSync';
import { useGallery } from '../hooks/useGallery';
import { ChevronLeft, ChevronRight, Eye, EyeOff, Star, Trash2, BarChart3, Dumbbell, Unlock, Lock, Image as ImageIcon, X, Maximize2, ExternalLink } from 'lucide-react';

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
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedSubmission, setSelectedSubmission] = useState(null);

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
    const isFreeModeActive = sessionState.isFreeMode;

    // Separar envíos con y sin imagen
    const submissionsWithImage = submissions.filter(sub => sub.image_url);
    const submissionsWithoutImage = submissions.filter(sub => !sub.image_url);

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

    // Componente para tarjeta de envío
    const SubmissionCard = ({ sub }) => (
        <div key={sub.id} className={`group relative rounded-xl border transition-all overflow-hidden
                                      ${sub.is_highlighted
                ? 'bg-yellow-900/20 border-yellow-500/50 shadow-lg shadow-yellow-900/10'
                : 'bg-slate-800 border-slate-700 hover:border-slate-600'}`}>
            {/* Imagen grande arriba si existe */}
            {sub.image_url && (
                <div 
                    className="relative w-full h-48 bg-slate-900 cursor-pointer overflow-hidden"
                    onClick={() => setSelectedImage(sub.image_url)}
                >
                    <img
                        src={sub.image_url}
                        alt="Captura del envío"
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                    <div className="hidden absolute inset-0 items-center justify-center text-slate-500">
                        <ImageIcon className="w-8 h-8" />
                    </div>
                    {/* Overlay al hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Maximize2 className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                    {/* Badge de imagen */}
                    <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <ImageIcon className="w-3 h-3" />
                        Con imagen
                    </div>
                </div>
            )}
            
            <div className="p-4">
                {/* Header con nombre y acciones */}
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                            {sub.participant_name?.charAt(0).toUpperCase() || 'A'}
                        </div>
                        <div>
                            <span className="text-sm font-bold text-slate-200 block">
                                {sub.participant_name || 'Anónimo'}
                            </span>
                            <span className="text-xs text-slate-500">
                                {sub.exercise_id}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <button
                            onClick={() => highlightSubmission(sub.id, !sub.is_highlighted)}
                            className={`p-2 rounded-lg transition-all
                                        ${sub.is_highlighted ? 'bg-yellow-500 text-slate-900 shadow-lg' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
                            title={sub.is_highlighted ? "Quitar destacado" : "Destacar para mostrar"}
                        >
                            <Star className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => hideSubmission(sub.id)}
                            className="p-2 rounded-lg bg-slate-700 text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors"
                            title="Ocultar envío"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Contenido de texto */}
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
                    
                    {/* Prompt */}
                    {sub.prompt_text && (
                        <div className="bg-black/30 p-2 rounded text-xs text-slate-300 font-mono line-clamp-2">
                            <span className="text-blue-400 font-bold">Prompt:</span> {sub.prompt_text}
                        </div>
                    )}
                    
                    {/* Resultado */}
                    {sub.result_text && (
                        <p className="text-sm text-slate-300 line-clamp-3">
                            <span className="text-green-400 font-bold">Resultado:</span> {sub.result_text}
                        </p>
                    )}
                </div>

                {/* Footer con acciones adicionales */}
                {sub.image_url && (
                    <div className="mt-3 pt-3 border-t border-slate-700/50 flex justify-between items-center">
                        <button
                            onClick={() => setSelectedImage(sub.image_url)}
                            className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                        >
                            <ExternalLink className="w-3 h-3" />
                            Ver imagen completa
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

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

                {/* Acceso Rápido - Ejercicios del Módulo */}
                <div className="flex items-center gap-2">
                    {currentModule?.slides?.filter(s => s.type === 'exercise' || s.type === 'exercise-interactive').map((slide, idx) => (
                        <button
                            key={slide.id}
                            onClick={() => jumpToSlideIndex(currentModule.slides.findIndex(s => s.id === slide.id))}
                            className="px-3 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white transition-all font-medium text-sm flex items-center gap-2 shadow-lg shadow-green-900/20"
                            title={`Ir a: ${slide.title}`}
                        >
                            <Dumbbell className="w-4 h-4" />
                            Ejercicio {idx + 1}
                        </button>
                    ))}
                    {currentModule?.slides?.filter(s => s.type === 'poll').map((slide) => (
                        <button
                            key={slide.id}
                            onClick={() => jumpToSlideIndex(currentModule.slides.findIndex(s => s.id === slide.id))}
                            className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all font-medium text-sm flex items-center gap-2 shadow-lg shadow-blue-900/20"
                            title={`Ir a: ${slide.title}`}
                        >
                            <BarChart3 className="w-4 h-4" />
                            Encuesta
                        </button>
                    ))}
                </div>

                {/* Controles */}
                <div className="flex items-center gap-4">
                    <div className="h-8 w-px bg-slate-700 mx-2"></div>

                    {/* Botón Modo Libre - Siempre visible */}
                    <button
                        onClick={async () => {
                            await toggleFreeMode();
                        }}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-medium text-sm
                                    ${isFreeModeActive
                                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'}`}
                        title={isFreeModeActive ? "Desactivar navegación libre para alumnos" : "Permitir a alumnos navegar libremente en todos los módulos"}
                    >
                        {isFreeModeActive ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                        {isFreeModeActive ? 'Modo Libre ON' : 'Modo Libre'}
                    </button>

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
                        {submissionsWithImage.length > 0 && (
                            <span className="ml-1 bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                                {submissionsWithImage.length} 📷
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Panel de envíos */}
            {showSubmissions && (
                <div className="absolute bottom-full left-0 right-0 bg-slate-900/98 backdrop-blur-md border-t border-slate-700 p-6 max-h-[70vh] overflow-y-auto shadow-2xl">
                    <div className="max-w-7xl mx-auto">
                        {/* Header con estadísticas */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <h4 className="font-bold text-xl flex items-center gap-2">
                                    <Star className="w-6 h-6 text-yellow-400" />
                                    Envíos de la Galería
                                </h4>
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 bg-slate-800 rounded-full text-sm text-slate-300">
                                        Total: {submissions.length}
                                    </span>
                                    {submissionsWithImage.length > 0 && (
                                        <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm flex items-center gap-1">
                                            <ImageIcon className="w-4 h-4" />
                                            Con imagen: {submissionsWithImage.length}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => setShowSubmissions(false)}
                                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {submissions.length === 0 ? (
                            <div className="text-center py-12 text-slate-500">
                                <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                                <p className="text-lg">No hay envíos todavía.</p>
                                <p className="text-sm mt-2">Los participantes aún no han compartido sus resultados.</p>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {/* Sección: Envíos con Imagen */}
                                {submissionsWithImage.length > 0 && (
                                    <div>
                                        <h5 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                            <ImageIcon className="w-5 h-5" />
                                            Envíos con Imagen ({submissionsWithImage.length})
                                        </h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                            {submissionsWithImage.map((sub) => (
                                                <SubmissionCard key={sub.id} sub={sub} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Sección: Envíos de Solo Texto */}
                                {submissionsWithoutImage.length > 0 && (
                                    <div>
                                        <h5 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                                            Envíos de Texto ({submissionsWithoutImage.length})
                                        </h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {submissionsWithoutImage.map((sub) => (
                                                <SubmissionCard key={sub.id} sub={sub} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Modal de imagen completa */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <img
                        src={selectedImage}
                        alt="Imagen completa"
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}
