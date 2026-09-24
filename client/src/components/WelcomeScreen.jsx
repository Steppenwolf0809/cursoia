import { useState } from 'react';
import { UserCircle, ShieldCheck } from 'lucide-react';
import { ES_AVANZADO } from '../data/cursos';

export function WelcomeScreen({ onComplete, onAdminClick, onRegister }) {
    const [name, setName] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim()) return;

        setSubmitting(true);
        setError(null);

        try {
            const participant = await onRegister(name.trim());
            if (participant) {
                onComplete(participant);
            } else {
                setError("No se pudo conectar. ¿Ejecutaste el script SQL en Supabase?");
            }
        } catch (err) {
            console.error(err);
            setError("Error de conexión. Revisa la consola.");
        } finally {
            setSubmitting(false);
        }
    }

    if (ES_AVANZADO) {
        return (
            <div className="av-lienzo flex min-h-screen flex-col items-center justify-center p-4 text-av-texto">
                <div className="w-full max-w-md rounded-2xl border border-av-linea bg-av-fondo-2 p-8">
                    <div className="mb-8">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-av-acento font-av-titulo text-lg font-extrabold text-av-sobre-acento">IA</div>
                            <span className="font-av-mono text-[11px] uppercase tracking-[0.12em] text-av-acento">Curso avanzado</span>
                        </div>
                        <h1 className="font-av-titulo text-3xl font-semibold leading-tight tracking-tight">IA avanzada para abogados</h1>
                        <p className="mt-2 text-av-texto-2">Ingresa tu nombre para unirte a la sesión.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tu nombre completo"
                            className="w-full rounded-xl border border-av-linea bg-av-panel px-4 py-3 text-lg text-av-texto placeholder:text-av-texto-2 focus:border-av-acento focus:outline-none"
                            autoFocus
                        />
                        <button
                            type="submit"
                            disabled={!name.trim() || submitting}
                            className="w-full rounded-xl bg-av-acento py-3 font-av-titulo text-lg font-semibold text-av-sobre-acento transition-colors hover:bg-av-acento-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {submitting ? 'Ingresando...' : 'Comenzar'}
                        </button>
                    </form>

                    {error && (
                        <div className="mt-4 rounded-lg border border-av-alerta/50 bg-av-alerta/10 p-3 text-center text-sm text-av-alerta">
                            {error}
                        </div>
                    )}

                    <div className="mt-8 border-t border-av-linea pt-6 text-center">
                        <button
                            onClick={onAdminClick}
                            className="mx-auto flex items-center justify-center gap-2 text-sm text-av-texto-2 transition-colors hover:text-av-texto"
                        >
                            <ShieldCheck className="h-4 w-4" />
                            Soy Instructor
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl relative z-10">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-600/30">
                        <UserCircle className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        IA para Todos
                    </h1>
                    <p className="text-slate-300">
                        Ingresa tu nombre para unirte a la sesión interactiva.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre completo"
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 
                                   text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none 
                                   text-lg backdrop-blur-sm transition-all focus:bg-slate-800/80"
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={!name.trim() || submitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 
                                   rounded-xl font-bold text-lg hover:from-blue-500 hover:to-indigo-500 
                                   disabled:opacity-50 disabled:cursor-not-allowed
                                   transition-all shadow-lg shadow-blue-900/40 transform active:scale-[0.98]"
                    >
                        {submitting ? 'Ingresando...' : 'Comenzar'}
                    </button>
                </form>

                {error && (
                    <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center font-medium animate-pulse">
                        {error}
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                    <button
                        onClick={onAdminClick}
                        className="text-slate-400 text-sm hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto"
                    >
                        <ShieldCheck className="w-4 h-4" />
                        Soy Instructor
                    </button>
                </div>
            </div>

            <p className="fixed bottom-4 text-slate-500 text-sm">
                © 2026 Curso de Inteligencia Artificial
            </p>
        </div>
    );
}
