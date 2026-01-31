import React, { useState } from 'react';
import { useGallery } from '../hooks/useGallery';
import { useParticipant } from '../hooks/useParticipant';
import { Send, CheckCircle, Image as ImageIcon, Loader2, Bot, Star } from 'lucide-react';

const GallerySubmit = ({ 
    exerciseId, 
    moduleId, 
    promptLabel, 
    resultLabel, 
    allowImage = false, 
    showPrompt = true, 
    showAIModel = false,
    additionalFields = []
}) => {
    const [promptText, setPromptText] = useState('');
    const [resultText, setResultText] = useState('');
    const [aiName, setAiName] = useState('');
    const [aiModel, setAiModel] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [additionalData, setAdditionalData] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const { submitToGallery } = useGallery();
    const { participant } = useParticipant();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAdditionalFieldChange = (name, value) => {
        setAdditionalData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const renderAdditionalField = (field) => {
        const { name, label, type, options, max } = field;
        const value = additionalData[name] || '';

        switch (type) {
            case 'select':
                return (
                    <div key={name}>
                        <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">
                            {label}
                        </label>
                        <select
                            value={value}
                            onChange={(e) => handleAdditionalFieldChange(name, e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none text-slate-700 text-base transition-colors bg-slate-50 focus:bg-white"
                        >
                            <option value="">Selecciona...</option>
                            {options?.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            
            case 'rating':
                return (
                    <div key={name}>
                        <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">
                            {label}
                        </label>
                        <div className="flex gap-2">
                            {Array.from({ length: max || 5 }, (_, i) => i + 1).map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => handleAdditionalFieldChange(name, star)}
                                    className={`p-2 rounded-xl transition-all ${
                                        value >= star 
                                            ? 'text-yellow-400 bg-yellow-50' 
                                            : 'text-slate-300 hover:text-yellow-300'
                                    }`}
                                >
                                    <Star className="w-8 h-8 fill-current" />
                                </button>
                            ))}
                        </div>
                    </div>
                );
            
            case 'text':
            default:
                return (
                    <div key={name}>
                        <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">
                            {label}
                        </label>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleAdditionalFieldChange(name, e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none text-slate-700 text-base transition-colors bg-slate-50 focus:bg-white"
                            placeholder={label}
                        />
                    </div>
                );
        }
    };

    const handleSubmit = async () => {
        if (!promptText.trim() && !resultText.trim() && !imageFile) {
            setError("Por favor completa al menos un campo.");
            return;
        }

        setSubmitting(true);
        setError(null);

        const submitData = {
            exerciseId,
            moduleId,
            participantId: participant?.id,
            participantName: participant?.name,
            promptText,
            resultText,
            aiName,
            aiModel,
            imageFile,
            additionalData
        };
        console.log('[GallerySubmit] Submitting:', submitData);

        try {
            const { data, error: submitError } = await submitToGallery(submitData);

            if (submitError) throw submitError;

            console.log('[GallerySubmit] Submission successful:', data);
            setSubmitted(true);
        } catch (err) {
            console.error('[GallerySubmit] Submission error:', err);
            setError("Hubo un error al enviar. Inténtalo de nuevo.");
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-sm">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-green-800 mb-2">¡Enviado con éxito!</h3>
                <p className="text-green-700 font-medium text-lg mb-8">
                    Tu resultado ya está en la galería del grupo.
                </p>
                <button
                    onClick={() => {
                        setSubmitted(false);
                        setPromptText('');
                        setResultText('');
                        setAiName('');
                        setAiModel('');
                        setImageFile(null);
                        setImagePreview(null);
                        setAdditionalData({});
                    }}
                    className="px-6 py-2 bg-white text-green-700 font-bold rounded-lg shadow-sm border border-green-200 hover:bg-green-50 transition-colors"
                >
                    Enviar otro resultado
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden flex flex-col h-full">
            <div className="bg-slate-50 px-8 py-6 border-b border-slate-100">
                <h3 className="text-2xl font-black text-slate-800">Tu Turno</h3>
                <p className="text-slate-500 font-medium">Completa el ejercicio y comparte tu resultado</p>
            </div>

            <div className="p-8 flex-1 overflow-y-auto custom-scrollbar space-y-6">

                {showPrompt && (
                    <div>
                        <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">
                            {promptLabel || 'Tu prompt'}
                        </label>
                        <textarea
                            value={promptText}
                            onChange={(e) => setPromptText(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none resize-none text-slate-700 text-base transition-colors bg-slate-50 focus:bg-white"
                            rows={4}
                            placeholder={promptLabel ? `Escribe aquí ${promptLabel.toLowerCase()}...` : "Pega aquí el prompt que utilizaste..."}
                        />
                    </div>
                )}

                {/* Result Section - Solo si no hay campos adicionales que lo reemplacen */}
                {additionalFields.length === 0 && (
                    <div>
                        <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">
                            {resultLabel || 'El resultado'}
                        </label>
                        <textarea
                            value={resultText}
                            onChange={(e) => setResultText(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none resize-none text-slate-700 text-base transition-colors bg-slate-50 focus:bg-white"
                            rows={6}
                            placeholder={resultLabel ? `Escribe aquí ${resultLabel.toLowerCase()}...` : "Pega aquí el resultado interesante o tu conclusión..."}
                        />
                    </div>
                )}

                {/* AI and Model Section */}
                {showAIModel && (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center gap-2">
                                <Bot className="w-4 h-4" />
                                IA Usada
                            </label>
                            <input
                                type="text"
                                value={aiName}
                                onChange={(e) => setAiName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none text-slate-700 text-base transition-colors bg-slate-50 focus:bg-white"
                                placeholder="Ej: ChatGPT, Claude..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">
                                Modelo
                            </label>
                            <input
                                type="text"
                                value={aiModel}
                                onChange={(e) => setAiModel(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none text-slate-700 text-base transition-colors bg-slate-50 focus:bg-white"
                                placeholder="Ej: GPT-4, Opus..."
                            />
                        </div>
                    </div>
                )}

                {/* Additional Fields */}
                {additionalFields.length > 0 && (
                    <div className="space-y-5">
                        {additionalFields.map(renderAdditionalField)}
                    </div>
                )}

                {/* Image Upload */}
                {allowImage && (
                    <div>
                        <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">
                            {additionalFields.length > 0 ? '🖼️ La imagen generada' : 'Captura (Opcional)'}
                        </label>

                        {!imagePreview ? (
                            <div className="relative group">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="w-full h-32 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 group-hover:border-blue-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
                                    <ImageIcon className="w-8 h-8 mb-2" />
                                    <span className="font-medium text-sm">
                                        {additionalFields.length > 0 ? 'Sube tu imagen generada' : 'Click para subir una imagen'}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="relative rounded-xl overflow-hidden border border-slate-200">
                                <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover" />
                                <button
                                    onClick={() => {
                                        setImageFile(null);
                                        setImagePreview(null);
                                    }}
                                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors backdrop-blur-sm"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium text-center animate-pulse">
                        {error}
                    </div>
                )}

            </div>

            <div className="p-8 pt-0">
                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 transition-all flex items-center justify-center gap-2"
                >
                    {submitting ? (
                        <>
                            <Loader2 className="animate-spin" /> Enviando...
                        </>
                    ) : (
                        <>
                            Enviar a la Galería <Send size={20} />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default GallerySubmit;
