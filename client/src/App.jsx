import React, { useState, useEffect } from 'react';
import AppLayout from './components/layout/AppLayout';
import { COURSE_MODULES } from './data/course-content';

// Import Components
import PromptBuilder from './components/PromptBuilder';
import ToolRadar from './components/ToolRadar';
import LivePoll from './components/LivePoll';
import CaseStudyPanel from './components/CaseStudyPanel';
import ResourceLibrary from './components/ResourceLibrary';
import ActionPanel from './components/ActionPanel';
import GallerySubmit from './components/GallerySubmit';
import GalleryDisplay from './components/GalleryDisplay';
import { Settings } from 'lucide-react';

// Supabase & Hooks
import { useSessionSync } from './hooks/useSessionSync';
import { useParticipant } from './hooks/useParticipant';
import { WelcomeScreen } from './components/WelcomeScreen';
import { AdminPanel } from './components/AdminPanel';
import { AdminLogin } from './components/AdminLogin';

const COMPONENT_MAP = {
  PromptBuilder,
  ToolRadar,
  LivePoll,
  CaseStudyPanel,
  ResourceLibrary,
  action: ActionPanel,
  gallery: GallerySubmit,
  GallerySubmit: GallerySubmit,
  GalleryDisplay: GalleryDisplay
};

function App() {
  // Admin State - Persist in localStorage
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('course_admin_auth') === 'true';
  });
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // Hooks
  const { participant, isRegistered, registerParticipant } = useParticipant();
  const { sessionState, setCurrentSlide, toggleFreeMode } = useSessionSync(isAdmin);

  // Navigation State
  const [activeModuleId, setActiveModuleId] = useState(COURSE_MODULES[0].id);
  const [activeSlideId, setActiveSlideId] = useState(COURSE_MODULES[0].slides[0].id);

  // Effect to update localStorage when isAdmin changes
  useEffect(() => {
    if (isAdmin) {
      localStorage.setItem('course_admin_auth', 'true');
    } else {
      localStorage.removeItem('course_admin_auth');
    }
  }, [isAdmin]);

  // Sync Logic
  // 1. If User: update local state when sessionState changes
  useEffect(() => {
    if (!isAdmin && sessionState.currentModule && sessionState.currentSlide) {
      // Si está en modo libre, NO sincronizar con el instructor
      // El estudiante tiene control total de su navegación
      if (sessionState.isFreeMode) {
        return;
      }

      // Modo normal: sincronizar con el instructor
      const moduleId = sessionState.currentModule;
      const moduleExists = COURSE_MODULES.find(m => m.id === moduleId);
      if (moduleExists) {
        const slideId = sessionState.currentSlide;
        const slideExists = moduleExists.slides.find(s => s.id === slideId);
        if (slideExists) {
          setActiveModuleId(moduleId);
          setActiveSlideId(slideId);
        }
      }
    }
  }, [sessionState, isAdmin]);

  // Derived state
  const activeModule = COURSE_MODULES.find(m => m.id === activeModuleId) || COURSE_MODULES[0];
  const activeSlide = activeModule.slides.find(s => s.id === activeSlideId) || activeModule.slides[0];

  // Indices for AdminPanel
  const currentModuleIndex = COURSE_MODULES.findIndex(m => m.id === activeModuleId);
  const currentSlideIndex = activeModule.slides.findIndex(s => s.id === activeSlideId);

  const handleNavigate = async (moduleId, slideId) => {
    // If Admin, update Supabase
    if (isAdmin) {
      await setCurrentSlide(moduleId, slideId);
      // Local update happens via optimistic update or simplified flow:
      setActiveModuleId(moduleId);
      setActiveSlideId(slideId);
    } else {
      // Estudiante: permitir navegación solo dentro del módulo libre habilitado
      if (sessionState.isFreeMode && moduleId === sessionState.freeModuleId) {
        setActiveModuleId(moduleId);
        setActiveSlideId(slideId);
      }
    }
  };

  const renderRightPanel = () => {
    if (!activeSlide.interaction) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center p-8 opacity-50">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <Settings className="w-10 h-10 text-slate-300" />
          </div>
          <p className="font-medium text-lg text-slate-500">Modo Lectura</p>
          <p className="text-sm">Avanza para encontrar actividades</p>
        </div>
      );
    }

    const { type, data } = activeSlide.interaction;
    const Component = COMPONENT_MAP[type];

    if (!Component) return <div className="text-red-500">Componente no encontrado: {type}</div>;

    // Pass pollId if it's a poll
    const extraProps = {};
    if (type === 'LivePoll' || type === 'poll') { // Handle both keys if 'poll' is used in data
      // Use slide ID as poll ID to ensure uniqueness across slides
      extraProps.id = activeSlide.id;
      extraProps.isAdmin = isAdmin;
    }

    // Pass moduleId for gallery submissions and displays
    // Usar activeModuleId (del estado actual) en lugar del moduleId de los datos de la slide
    if (type === 'gallery' || type === 'GallerySubmit' || type === 'GalleryDisplay') {
      extraProps.moduleId = activeModuleId;
      console.log('[App] Passing moduleId to gallery:', activeModuleId, 'Slide:', activeSlide.id);
    }

    // Force key to reset component state when switching slides
    // El orden es importante: extraProps debe ir DESPUÉS de data para sobrescribir moduleId
    return (
      <div key={activeSlide.id} className="animate-in slide-in-from-right-8 fade-in duration-500 h-full">
        <Component {...data} {...extraProps} />
      </div>
    );
  };

  // Render Logic

  // 1. Show Welcome Screen if not registered and not Admin (and not trying to login)
  if (!isAdmin && !isRegistered && !showAdminLogin) {
    return (
      <WelcomeScreen
        onComplete={() => { }} // State updates automatically via hook state
        onAdminClick={() => setShowAdminLogin(true)}
        onRegister={registerParticipant}
      />
    );
  }

  return (
    <div className="app relative">
      {/* Admin Login Modal */}
      <AdminLogin
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLogin={() => {
          setIsAdmin(true);
          setShowAdminLogin(false);
        }}
      />

      <AppLayout
        modules={COURSE_MODULES}
        activeModuleId={activeModuleId}
        activeSlideId={activeSlideId}
        onNavigate={handleNavigate}
        rightPanel={renderRightPanel()}
        isAdmin={isAdmin}
        participant={participant}
        sessionState={sessionState}
        onToggleFreeMode={toggleFreeMode}
        onLogout={() => {
          if (window.confirm('¿Seguro que quieres cerrar sesión?')) {
            localStorage.removeItem('course_participant');
            localStorage.removeItem('course_admin_auth'); // Clear admin state too
            setIsAdmin(false); // Force state update
            window.location.href = '/';
          }
        }}
      />

      {/* Admin Controls Overlay */}
      {isAdmin && (
        <AdminPanel
          modules={COURSE_MODULES}
          currentModuleIndex={currentModuleIndex}
          currentSlideIndex={currentSlideIndex}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}

export default App;
