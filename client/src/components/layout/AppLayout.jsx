import React, { useEffect, useMemo, useState } from 'react';
import { ChevronRight, FileDown, Save, StickyNote, Trash2, PencilLine, RefreshCw, X, Menu } from 'lucide-react';
import SlideRenderer from '../SlideRenderer';
import AnimatedSlide from '../AnimatedSlide';
import SlideAvanzado from '../avanzado/SlideAvanzado';
import { partir } from '../avanzado/rotulos';
import { ES_AVANZADO } from '../../data/cursos';

// Clases del marco. El básico conserva las suyas tal cual; el avanzado usa los tokens av-*.
const M = ES_AVANZADO ? {
    raiz: 'flex h-screen bg-av-fondo overflow-hidden font-av-texto text-av-texto selection:bg-av-acento selection:text-av-sobre-acento',
    cabeceraMovil: 'lg:hidden fixed top-0 left-0 right-0 h-16 bg-av-fondo-2 border-b border-av-linea text-av-texto flex items-center justify-between px-4 z-30 safe-area-top',
    selloMovil: 'w-10 h-10 bg-av-acento rounded-[10px] flex items-center justify-center',
    selloMovilTexto: 'font-av-titulo font-extrabold text-lg text-av-sobre-acento',
    lateralColor: 'bg-av-fondo-2 text-av-texto border-r border-av-linea',
    lateralCabecera: 'p-6 border-b border-av-linea',
    sello: 'w-11 h-11 bg-av-acento rounded-[10px] flex items-center justify-center',
    selloTexto: 'font-av-titulo font-extrabold text-lg text-av-sobre-acento',
    marcaTitulo: 'font-av-titulo font-semibold text-[17px] leading-tight',
    marcaSub: 'font-av-mono text-[11px] uppercase tracking-[0.12em] text-av-acento',
    marca: 'IA para abogados',
    marcaSubTexto: 'Curso avanzado',
    navActivo: 'bg-av-panel text-av-texto ring-1 ring-av-linea',
    navDisponible: 'text-av-texto-2 hover:bg-white/5 hover:text-av-texto cursor-pointer',
    navBloqueado: 'text-av-texto-2/50 cursor-not-allowed opacity-60',
    barraActiva: 'absolute left-0 top-0 h-full w-1.5 lg:w-1 bg-av-acento',
    iconoActivo: 'text-av-acento',
    iconoDisponible: 'text-av-texto-2 group-hover:text-av-texto',
    iconoBloqueado: 'text-av-texto-2/40',
    chevron: 'text-av-texto-2',
    pie: 'p-4 border-t border-av-linea',
    avatar: 'w-10 h-10 rounded-full bg-av-panel flex items-center justify-center font-av-mono text-xs border border-av-linea text-av-acento',
    pieNombre: 'text-av-texto font-medium text-sm truncate',
    pieRol: 'text-xs text-av-texto-2 truncate',
    salir: 'p-1.5 text-av-texto-2 hover:text-av-texto hover:bg-av-panel rounded-lg transition-colors',
    principal: 'flex-1 flex flex-col relative av-lienzo min-w-0 overflow-hidden',
    progresoFondo: 'h-1 bg-av-linea w-full flex-shrink-0',
    progreso: 'h-full bg-av-acento transition-all duration-700 ease-out',
    contenedor: 'max-w-5xl mx-auto px-4 pt-7 sm:px-8 lg:px-16 lg:pt-12 pb-28 lg:pb-32',
    notasColor: 'bg-av-acento text-av-sobre-acento font-semibold shadow-2xl shadow-black/40 hover:bg-av-acento-2',
    navPieColor: 'bg-av-fondo-2/95 backdrop-blur-md border-t border-av-linea',
    contador: 'font-av-mono text-xs text-av-texto-2 uppercase tracking-[0.12em] hidden sm:block',
    anteriorColor: 'border border-av-linea text-av-texto font-medium hover:bg-av-panel',
    siguienteColor: 'bg-av-acento text-av-sobre-acento font-semibold hover:bg-av-acento-2',
    panelDerechoColor: 'bg-av-fondo-2 border-av-linea',
    panelDerechoCabecera: 'p-3 sm:p-6 border-b border-av-linea',
    panelDerechoTitulo: 'font-av-mono text-av-texto-2 text-[11px] uppercase tracking-[0.12em] flex items-center gap-2',
    panelDerechoPunto: 'w-2 h-2 rounded-full bg-av-acento animate-pulse',
    panelDerechoCuerpo: 'flex-1 overflow-y-auto overscroll-y-contain p-4 sm:p-6 min-h-[150px]',
} : {
    raiz: 'flex h-screen bg-slate-100 overflow-hidden font-sans text-slate-900 selection:bg-secondary selection:text-white',
    cabeceraMovil: 'lg:hidden fixed top-0 left-0 right-0 h-16 bg-primary text-white flex items-center justify-between px-4 z-30 shadow-lg safe-area-top',
    selloMovil: 'w-10 h-10 bg-gradient-to-br from-accent to-yellow-600 rounded-xl flex items-center justify-center shadow-lg',
    selloMovilTexto: 'font-bold text-lg text-white',
    lateralColor: 'bg-primary text-white shadow-2xl',
    lateralCabecera: 'p-6 border-b border-blue-800/50 bg-blue-900/50',
    sello: 'w-12 h-12 bg-gradient-to-br from-accent to-yellow-600 rounded-xl flex items-center justify-center shadow-lg border border-yellow-400/20',
    selloTexto: 'font-bold text-2xl text-white',
    marcaTitulo: 'font-bold text-lg leading-tight tracking-tight',
    marcaSub: 'text-blue-300 text-xs font-medium uppercase tracking-wide opacity-80',
    marca: 'Curso IA',
    marcaSubTexto: 'Curso introductorio',
    navActivo: 'bg-blue-600 text-white shadow-lg shadow-blue-900/20 ring-1 ring-blue-500/50',
    navDisponible: 'text-blue-200 hover:bg-white/5 hover:text-white cursor-pointer',
    navBloqueado: 'text-blue-400/50 cursor-not-allowed opacity-60',
    barraActiva: 'absolute left-0 top-0 h-full w-1.5 lg:w-1 bg-accent',
    iconoActivo: 'text-accent',
    iconoDisponible: 'text-blue-400 group-hover:text-blue-200',
    iconoBloqueado: 'text-blue-500/40',
    chevron: 'text-blue-300',
    pie: 'p-4 border-t border-blue-800/50 bg-blue-900/30',
    avatar: 'w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center font-bold text-sm border border-blue-600/50 text-blue-100 shadow-inner',
    pieNombre: 'text-white font-medium text-sm truncate',
    pieRol: 'text-xs text-blue-300 truncate',
    salir: 'p-1.5 text-blue-300 hover:text-white hover:bg-blue-800 rounded-lg transition-colors',
    principal: 'flex-1 flex flex-col relative bg-slate-50/50 min-w-0 overflow-hidden',
    progresoFondo: 'h-1 bg-slate-200 w-full flex-shrink-0',
    progreso: 'h-full bg-accent transition-all duration-700 ease-out shadow-[0_0_10px_rgba(214,158,46,0.5)]',
    contenedor: 'max-w-3xl mx-auto p-4 sm:p-6 lg:p-12 pb-28 lg:pb-32',
    notasColor: 'bg-primary text-white shadow-2xl shadow-blue-900/30 hover:bg-blue-800',
    navPieColor: 'bg-white/95 backdrop-blur-md border-t border-slate-200',
    contador: 'text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider hidden sm:block',
    anteriorColor: 'border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 hover:border-slate-300',
    siguienteColor: 'bg-primary text-white font-medium hover:bg-blue-800 shadow-lg shadow-blue-900/20',
    panelDerechoColor: 'bg-white border-slate-200 shadow-xl',
    panelDerechoCabecera: 'p-3 sm:p-6 bg-slate-50 border-b border-slate-100',
    panelDerechoTitulo: 'font-bold text-slate-400 text-xs uppercase tracking-wider flex items-center gap-2',
    panelDerechoPunto: 'w-2 h-2 rounded-full bg-accent animate-pulse',
    panelDerechoCuerpo: 'flex-1 overflow-y-auto overscroll-y-contain p-4 sm:p-6 bg-slate-50/30 min-h-[150px]',
};

const AppLayout = ({ modules, activeModuleId, activeSlideId, onNavigate, children, rightPanel, participant, onLogout, isAdmin, sessionState, onToggleFreeMode }) => {
    const [isNotesOpen, setIsNotesOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detectar si es mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [editDraft, setEditDraft] = useState({ moduleTitle: '', slideTitle: '' });
    const [saveStatus, setSaveStatus] = useState('idle');
    const [notes, setNotes] = useState(() => {
        try {
            const stored = localStorage.getItem('course_notes');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            return [];
        }
    });

    const safeModules = modules?.length ? modules : [];
    const activeModule = safeModules.find(m => m.id === activeModuleId) || safeModules[0];
    const activeSlideIndex = activeModule?.slides?.findIndex(s => s.id === activeSlideId) ?? -1;
    const safeSlideIndex = activeSlideIndex >= 0 ? activeSlideIndex : 0;
    const activeSlide = activeModule?.slides?.[safeSlideIndex];

    // Progress calculation
    const totalSlides = activeModule?.slides?.length || 0;
    const progress = totalSlides ? ((safeSlideIndex + 1) / totalSlides) * 100 : 0;

    // Calculate next slide logic
    const handleNext = () => {
        if (!activeModule || !activeModule.slides?.length) return;
        if (safeSlideIndex < totalSlides - 1) {
            onNavigate(activeModuleId, activeModule.slides[safeSlideIndex + 1].id);
        } else if (isAdmin || sessionState?.isFreeMode) {
            // Admin o modo libre: puede pasar al siguiente módulo
            const currentModuleIndex = safeModules.indexOf(activeModule);
            if (currentModuleIndex < safeModules.length - 1) {
                const nextModule = safeModules[currentModuleIndex + 1];
                onNavigate(nextModule.id, nextModule.slides[0].id);
            }
        }
    };

    const handlePrev = () => {
        if (!activeModule || !activeModule.slides?.length) return;
        if (safeSlideIndex > 0) {
            onNavigate(activeModuleId, activeModule.slides[safeSlideIndex - 1].id);
        }
    };

    // Navegación por teclado para instructor
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Solo funciona para admin/instructor
            if (!isAdmin) return;
            
            // Ignorar si está escribiendo en un input, textarea o contenteditable
            const target = e.target;
            const isInput = target.tagName === 'INPUT' || 
                           target.tagName === 'TEXTAREA' || 
                           target.isContentEditable;
            
            if (isInput) return;

            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ':  // Barra espaciadora
                case 'PageDown':
                    e.preventDefault();
                    handleNext();
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    handlePrev();
                    break;
                case 'Home':
                    e.preventDefault();
                    // Ir a la primera slide
                    if (activeModule?.slides?.length > 0) {
                        onNavigate(activeModuleId, activeModule.slides[0].id);
                    }
                    break;
                case 'End':
                    e.preventDefault();
                    // Ir a la última slide
                    if (activeModule?.slides?.length > 0) {
                        onNavigate(activeModuleId, activeModule.slides[activeModule.slides.length - 1].id);
                    }
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isAdmin, activeModule, activeModuleId, safeSlideIndex, onNavigate]);

    useEffect(() => {
        try {
            localStorage.setItem('course_notes', JSON.stringify(notes));
        } catch (error) {
            // Ignore storage errors (private mode or full storage)
        }
    }, [notes]);

    const notesPayload = useMemo(() => {
        return {
            participantId: participant?.id || null,
            participantName: participant?.name || 'Estudiante',
            exportedAt: new Date().toISOString(),
            notes
        };
    }, [notes, participant]);

    const handleAddNote = () => {
        if (!activeModule || !activeSlide) return;
        setNotes(prevNotes => {
            const lastEntry = prevNotes[0];
            const isSameSlide = lastEntry?.moduleId === activeModule.id && lastEntry?.slideId === activeSlide.id;
            if (isSameSlide && !lastEntry?.text?.trim()) {
                return prevNotes;
            }
            const newEntry = {
                id: `${activeModule.id}-${activeSlide.id}-${Date.now()}`,
                moduleId: activeModule.id,
                moduleTitle: activeModule.title,
                moduleIndex: safeModules.indexOf(activeModule) + 1,
                slideId: activeSlide.id,
                slideTitle: activeSlide.title,
                text: ''
            };
            return [newEntry, ...prevNotes];
        });
        setIsNotesOpen(true);
    };

    const handleNoteChange = (noteId, value) => {
        setNotes(prevNotes => prevNotes.map(note => (note.id === noteId ? { ...note, text: value } : note)));
    };

    const handleDeleteNote = (noteId) => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
        if (editingNoteId === noteId) {
            setEditingNoteId(null);
        }
    };

    const handleEditNote = (note) => {
        setEditingNoteId(note.id);
        setEditDraft({ moduleTitle: note.moduleTitle, slideTitle: note.slideTitle });
    };

    const handleCancelEdit = () => {
        setEditingNoteId(null);
        setEditDraft({ moduleTitle: '', slideTitle: '' });
    };

    const handleSaveEdit = (noteId) => {
        setNotes(prevNotes => prevNotes.map(note => (
            note.id === noteId
                ? { ...note, moduleTitle: editDraft.moduleTitle.trim() || note.moduleTitle, slideTitle: editDraft.slideTitle.trim() || note.slideTitle }
                : note
        )));
        handleCancelEdit();
    };

    const handleUpdateToCurrent = (noteId) => {
        if (!activeModule || !activeSlide) return;
        setNotes(prevNotes => prevNotes.map(note => (
            note.id === noteId
                ? {
                    ...note,
                    moduleId: activeModule.id,
                    moduleTitle: activeModule.title,
                    moduleIndex: safeModules.indexOf(activeModule) + 1,
                    slideId: activeSlide.id,
                    slideTitle: activeSlide.title
                }
                : note
        )));
    };

    const handleDownloadNotes = () => {
        if (!notes.length) return;
        const content = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>${notes
            .map(note => (`
                <h2>${note.moduleTitle} / ${note.slideTitle}</h2>
                <p>${(note.text || '').replace(/\n/g, '<br />')}</p>
            `))
            .join('')}
        </body></html>`;
        const blob = new Blob([content], { type: 'application/msword;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'mis-notas-curso.doc';
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    const handleSaveNotes = async () => {
        if (!notes.length || saveStatus === 'saving') return;
        setSaveStatus('saving');
        try {
            const response = await fetch('/api/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(notesPayload)
            });
            if (!response.ok) {
                throw new Error('Error al guardar');
            }
            setSaveStatus('saved');
        } catch (error) {
            setSaveStatus('error');
        } finally {
            setTimeout(() => setSaveStatus('idle'), 2500);
        }
    };

    if (!activeModule || !activeSlide) {
        return null;
    }

    return (
        <div className={M.raiz}>
            {/* Overlay para cerrar menú en mobile */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Header - Mejorado para táctil */}
            <div className={M.cabeceraMovil}>
                <div className="flex items-center gap-3">
                    <div className={M.selloMovil}>
                        <span className={M.selloMovilTexto}>IA</span>
                    </div>
                    <span className="font-bold text-base truncate max-w-[200px]">
                        {ES_AVANZADO ? partir(activeModule.title)[0] : (activeModule?.title || 'Curso IA')}
                    </span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-3 rounded-xl hover:bg-white/10 transition-colors active:scale-95"
                    aria-label="Menú"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Sidebar - Fixed width on desktop, sliding on mobile */}
            <aside className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 w-72 ${M.lateralColor} flex flex-col z-40 flex-shrink-0 transition-transform duration-300`}>
                <div className={M.lateralCabecera}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={M.sello}>
                                <span className={M.selloTexto}>IA</span>
                            </div>
                            <div>
                                <h1 className={M.marcaTitulo}>{M.marca}</h1>
                                <p className={M.marcaSub}>{M.marcaSubTexto}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="lg:hidden p-3 rounded-xl hover:bg-white/10 transition-colors active:scale-95"
                            aria-label="Cerrar menú"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-transparent">
                    {modules.map(module => {
                        const isActive = module.id === activeModuleId;
                        const Icon = module.icon;
                        // Modo libre global: todos los módulos son accesibles cuando está activo
                        const isFreeModeActive = sessionState?.isFreeMode;
                        // La pizarra es especial: admin siempre puede entrar, estudiantes solo cuando está visible
                        const isWhiteboard = module.id === 'whiteboard';
                        const canClickWhiteboard = isAdmin || sessionState?.whiteboardVisible;
                        const canClick = isWhiteboard ? canClickWhiteboard : (isAdmin || isFreeModeActive);
                        return (
                            <button
                                key={module.id}
                                onClick={() => {
                                    if (canClick) {
                                        onNavigate(module.id, module.slides[0].id);
                                        if (isMobile) setIsMobileMenuOpen(false);
                                    }
                                }}
                                disabled={!canClick}
                                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden 
                                    ${isActive
                                        ? M.navActivo
                                        : canClick
                                            ? M.navDisponible
                                            : M.navBloqueado
                                    }`}
                            >
                                {isActive && (
                                    <div className={M.barraActiva} />
                                )}
                                <Icon className={`w-6 h-6 lg:w-5 lg:h-5 flex-shrink-0 transition-colors ${isActive ? M.iconoActivo : canClick ? M.iconoDisponible : M.iconoBloqueado}`} />
                                {ES_AVANZADO ? (
                                    <span className="flex-1 min-w-0 text-left">
                                        <span className="block text-sm font-medium">{partir(module.title)[0]}</span>
                                        {partir(module.title)[1] && (
                                            <span className="block text-[11.5px] leading-snug text-av-texto-2">{partir(module.title)[1]}</span>
                                        )}
                                    </span>
                                ) : (
                                    <span className={`font-medium text-base lg:text-sm text-left truncate transition-transform flex-1 ${isActive ? 'translate-x-1' : ''}`}>{module.title}</span>
                                )}
                                {isActive && <ChevronRight className={`w-5 h-5 lg:w-4 lg:h-4 ml-auto ${M.chevron}`} />}
                                {isFreeModeActive && !isAdmin && (
                                    <span className="ml-auto text-xs lg:text-[10px] text-emerald-400 font-medium uppercase tracking-wide">Libre</span>
                                )}
                                {isWhiteboard && isAdmin && sessionState?.whiteboardVisible && (
                                    <span className="ml-auto w-2.5 h-2.5 lg:w-2 lg:h-2 bg-green-400 rounded-full animate-pulse" title="Pizarra visible para estudiantes" />
                                )}
                            </button>
                        )
                    })}
                </nav>

                <div className={M.pie}>
                    <div className="flex items-center gap-3 px-2 py-2">
                        <div className={M.avatar}>
                            {isAdmin ? 'ADM' : (participant?.name?.slice(0, 2).toUpperCase() || 'WT')}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className={M.pieNombre}>
                                {isAdmin ? 'Administrador' : (participant?.name || 'Participante')}
                            </p>
                            <p className={M.pieRol}>
                                {isAdmin ? 'Control Total' : 'Estudiante'}
                            </p>
                        </div>
                        <button
                            onClick={onLogout}
                            className={M.salir}
                            title="Salir"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content + Right Panel wrapper to handle layout */}
            <div className="flex-1 flex flex-col xl:flex-row min-w-0 pt-16 lg:pt-0 h-[calc(100vh-64px)] lg:h-auto">

                {/* Main Content - Flexible */}
                <main className={M.principal}>
                    {/* Progress Bar */}
                    <div className={M.progresoFondo}>
                        <div
                            className={M.progreso}
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto overflow-x-hidden w-full overscroll-y-contain -webkit-overflow-scrolling-touch">
                        <div className={M.contenedor}>
                            <AnimatedSlide slideKey={activeSlide.id}>
                                {ES_AVANZADO ? (
                                    <SlideAvanzado slide={activeSlide} modulo={activeModule} indice={safeSlideIndex} total={totalSlides} isAdmin={isAdmin} />
                                ) : (
                                    <>
                                        <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100/80 text-primary text-xs font-bold tracking-wider mb-4 sm:mb-6 border border-blue-200 uppercase">
                                            Módulo {safeModules.indexOf(activeModule) + 1}
                                        </span>

                                        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-slate-800 mb-4 sm:mb-8 leading-tight tracking-tight">
                                            {activeSlide.title}
                                        </h2>

                                        <div className="h-1.5 w-20 sm:w-24 bg-gradient-to-r from-accent to-yellow-300 rounded-full mb-6 sm:mb-10"></div>

                                        <SlideRenderer slide={activeSlide} isAdmin={isAdmin} sessionState={sessionState} moduleId={activeModuleId} />
                                    </>
                                )}
                            </AnimatedSlide>
                        </div>
                    </div>

                    {!isAdmin && (
                        <button
                            type="button"
                            onClick={handleAddNote}
                            className={`fixed right-4 z-40 flex items-center gap-2 rounded-full ${M.notasColor} px-4 py-3 sm:px-5 sm:py-3 transition-all active:scale-95 text-sm sm:text-base min-h-[48px] ${
                                // En modo libre, subir el botón para no tapar el footer de navegación
                                sessionState?.isFreeMode
                                    ? 'bottom-24 sm:bottom-24'
                                    : 'bottom-6'
                            } ${isNotesOpen ? 'translate-x-[-320px] sm:translate-x-[-360px] md:translate-x-[-420px]' : ''}`}
                        >
                            <StickyNote className="w-5 h-5" />
                            <span className="hidden sm:inline">Tomar notas</span>
                            <span className="sm:hidden">Notas</span>
                        </button>
                    )}

                    {/* Footer Navigation - For Admins always, for students when free mode is active */}
                    {(isAdmin || sessionState?.isFreeMode) && (
                        <div className={`${isAdmin ? 'absolute z-10' : 'fixed z-50'} bottom-0 left-0 w-full ${M.navPieColor} p-3 sm:p-4 px-4 sm:px-8 flex items-center justify-between safe-area-bottom`}>
                            <div className={M.contador}>
                                {activeSlideIndex + 1} <span className="text-slate-300">/</span> {totalSlides}
                                {!isAdmin && sessionState?.isFreeMode && (
                                    <span className="ml-3 text-emerald-600 text-xs font-bold">● Modo libre activo</span>
                                )}
                            </div>
                            <div className="flex gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                <button
                                    onClick={handlePrev}
                                    disabled={activeSlideIndex === 0}
                                    className={`flex-1 sm:flex-none px-6 sm:px-6 py-3 sm:py-2.5 rounded-xl ${M.anteriorColor} disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 text-base sm:text-base min-h-[48px]`}
                                >
                                    <span className="hidden sm:inline">Anterior</span>
                                    <span className="sm:hidden flex items-center justify-center">←</span>
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={!isAdmin && activeSlideIndex === totalSlides - 1}
                                    className={`flex-1 sm:flex-none px-6 sm:px-8 py-3 sm:py-2.5 rounded-xl ${M.siguienteColor} transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base sm:text-base min-h-[48px]`}
                                >
                                    <span className="hidden sm:inline">{safeSlideIndex < totalSlides - 1 ? 'Siguiente' : (isAdmin ? 'Siguiente Módulo' : 'Fin del módulo')}</span>
                                    <span className="sm:hidden">{safeSlideIndex < totalSlides - 1 ? 'Sig.' : 'Fin'}</span>
                                    <ChevronRight className="w-5 h-5 sm:w-4 sm:h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </main>

                {/* Right Panel - Fixed width but responsive on smaller screens if needed */}
                {/* No mostrar panel derecho para gallery-view (la galería va en el área principal) */}
                {/* Tampoco para exercise-interactive (ya incluye su propio formulario) */}
                {(activeSlide.type === 'poll' || (activeSlide.interaction && activeSlide.type !== 'gallery-view' && activeSlide.type !== 'exercise-interactive')) && (
                    <aside className={`w-full xl:w-[420px] ${M.panelDerechoColor} border-t xl:border-t-0 xl:border-l flex flex-col z-10 flex-shrink-0 order-first xl:order-last h-auto xl:h-auto max-h-[45vh] xl:max-h-none`}>
                        <div className={M.panelDerechoCabecera}>
                            <h3 className={M.panelDerechoTitulo}>
                                <div className={M.panelDerechoPunto}></div>
                                Interacción
                            </h3>
                        </div>
                        <div className={M.panelDerechoCuerpo}>
                            {rightPanel}
                        </div>
                    </aside>
                )}



                {!isAdmin && (
                    <>
                        <aside
                            className={`fixed top-0 right-0 h-full w-full sm:max-w-sm bg-white border-l border-slate-200 shadow-2xl z-50 transform transition-transform duration-300 ${isNotesOpen ? 'translate-x-0' : 'translate-x-full'}`}
                            aria-hidden={!isNotesOpen}
                        >
                            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50 safe-area-top">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Notas del estudiante</p>
                                    <p className="text-sm text-slate-600">Guarda tus ideas por módulo</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsNotesOpen(false)}
                                    className="p-3 rounded-xl hover:bg-slate-100 text-slate-500 active:scale-95"
                                    aria-label="Cerrar notas"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200">
                                <span className="text-xs text-slate-400">{notes.length} entradas</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={handleAddNote}
                                        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-primary"
                                        title="Crea una nota con el módulo y la diapositiva que ves ahora"
                                    >
                                        <StickyNote className="w-4 h-4" />
                                        Nuevo
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleDownloadNotes}
                                        className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-blue-800"
                                    >
                                        <FileDown className="w-4 h-4" />
                                        Descargar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSaveNotes}
                                        className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                                    >
                                        <Save className="w-4 h-4" />
                                        {saveStatus === 'saving' ? 'Guardando...' : 'Guardar'}
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto p-5 space-y-4">
                                {notes.length === 0 ? (
                                    <div className="border border-dashed border-slate-200 rounded-2xl p-6 text-center text-slate-400 text-sm">
                                        Presiona “Tomar notas” para guardar ideas del módulo y la diapositiva actual.
                                    </div>
                                ) : (
                                    notes.map(note => (
                                        <div key={note.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                                            <div className="px-4 py-3 border-b border-slate-100">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">{note.moduleTitle}</p>
                                                        <p className="text-sm font-semibold text-slate-700">{note.slideTitle}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleUpdateToCurrent(note.id)}
                                                            className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-blue-50"
                                                            title="Actualizar al tema actual"
                                                        >
                                                            <RefreshCw className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleEditNote(note)}
                                                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                                                            title="Editar tema manualmente"
                                                        >
                                                            <PencilLine className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteNote(note.id)}
                                                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50"
                                                            title="Eliminar nota"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                                {editingNoteId === note.id && (
                                                    <div className="mt-3 space-y-2">
                                                        <input
                                                            type="text"
                                                            value={editDraft.moduleTitle}
                                                            onChange={(event) => setEditDraft(prev => ({ ...prev, moduleTitle: event.target.value }))}
                                                            placeholder="Editar módulo"
                                                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={editDraft.slideTitle}
                                                            onChange={(event) => setEditDraft(prev => ({ ...prev, slideTitle: event.target.value }))}
                                                            placeholder="Editar diapositiva"
                                                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                        />
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleSaveEdit(note.id)}
                                                                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary text-white"
                                                            >
                                                                Guardar
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={handleCancelEdit}
                                                                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-500"
                                                            >
                                                                Cancelar
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <textarea
                                                value={note.text}
                                                onChange={event => handleNoteChange(note.id, event.target.value)}
                                                placeholder="Escribe tus apuntes aquí..."
                                                className="w-full min-h-[140px] resize-none px-4 py-3 text-sm text-slate-700 focus:outline-none"
                                            />
                                        </div>
                                    ))
                                )}
                            </div>
                        </aside>
                    </>
                )}

            </div>
        </div>
    );
};

export default AppLayout;
