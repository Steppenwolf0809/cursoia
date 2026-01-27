import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

const ActionPanel = ({ instruction, timer }) => {
    const [timeLeft, setTimeLeft] = useState(timer);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(timer);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const progress = ((timer - timeLeft) / timer) * 100;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Timer className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-lg">Actividad Práctica</h3>
                    <p className="text-slate-500 text-sm">Sigue las instrucciones</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-between">
                <div className="prose prose-slate text-slate-600 mb-8 bg-slate-50 p-4 rounded-lg border border-slate-100 italic">
                    {instruction}
                </div>

                <div className="flex flex-col items-center">
                    <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                        {/* Circular Progress Background */}
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                className="text-slate-100"
                            />
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={2 * Math.PI * 88}
                                strokeDashoffset={2 * Math.PI * 88 * (1 - progress / 100)}
                                className={`transition-all duration-1000 ease-linear ${timeLeft < 30 ? 'text-red-500' : 'text-indigo-500'}`}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-mono font-bold text-slate-700 tabular-nums">
                                {formatTime(timeLeft)}
                            </span>
                            <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">Tiempo Restante</span>
                        </div>
                    </div>

                    <div className="flex gap-4 w-full">
                        <button
                            onClick={toggleTimer}
                            className={`flex-1 py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all active:scale-95 ${isActive
                                ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-200'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
                                }`}
                        >
                            {isActive ? (
                                <>
                                    <Pause className="w-5 h-5" /> Pausar
                                </>
                            ) : (
                                <>
                                    <Play className="w-5 h-5" /> {timeLeft < timer ? 'Continuar' : 'Iniciar'}
                                </>
                            )}
                        </button>
                        <button
                            onClick={resetTimer}
                            className="p-3 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors active:scale-95"
                            title="Reiniciar"
                        >
                            <RotateCcw className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActionPanel;
