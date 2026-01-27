import React, { useState } from 'react';
import AppLayout from './components/layout/AppLayout';
import { COURSE_MODULES } from './data/course-content';

// Import Components
import PromptBuilder from './components/PromptBuilder';
import ToolRadar from './components/ToolRadar';
import LivePoll from './components/LivePoll';
import CaseStudyPanel from './components/CaseStudyPanel';
import ResourceLibrary from './components/ResourceLibrary';
import ActionPanel from './components/ActionPanel';
import { Settings } from 'lucide-react';

const COMPONENT_MAP = {
  PromptBuilder,
  ToolRadar,
  LivePoll,
  CaseStudyPanel,
  ResourceLibrary,
  action: ActionPanel
};

function App() {
  const [activeModuleId, setActiveModuleId] = useState(COURSE_MODULES[0].id);
  const [activeSlideId, setActiveSlideId] = useState(COURSE_MODULES[0].slides[0].id);

  const activeModule = COURSE_MODULES.find(m => m.id === activeModuleId);
  const activeSlide = activeModule.slides.find(s => s.id === activeSlideId);

  const handleNavigate = (moduleId, slideId) => {
    setActiveModuleId(moduleId);
    setActiveSlideId(slideId);
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

    // Force key to reset component state when switching slides
    return (
      <div key={activeSlide.id} className="animate-in slide-in-from-right-8 fade-in duration-500">
        <Component {...data} />
      </div>
    );
  };

  return (
    <AppLayout
      modules={COURSE_MODULES}
      activeModuleId={activeModuleId}
      activeSlideId={activeSlideId}
      onNavigate={handleNavigate}
      rightPanel={renderRightPanel()}
    />
  );
}

export default App;
