import { useState } from 'react';
import { X } from 'lucide-react';

export function AdminLogin({ isOpen, onClose, onLogin }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    if (!isOpen) return null;

    function handleSubmit(e) {
        e.preventDefault();
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

        if (password === adminPassword) {
            onLogin();
            onClose();
            setPassword('');
            setError(false);
        } else {
            setError(true);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-sm relative shadow-2xl border border-slate-700">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold text-white mb-6 text-center">
                    Acceso Instructor
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError(false);
                            }}
                            placeholder="Contraseña"
                            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 
                                       text-white focus:border-blue-500 focus:outline-none"
                            autoFocus
                        />
                        {error && (
                            <p className="text-red-400 text-sm mt-2 font-medium">
                                Contraseña incorrecta
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold
                                   hover:bg-blue-700 transition-colors"
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
}
