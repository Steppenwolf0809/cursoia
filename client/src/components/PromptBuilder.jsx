import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

const PromptBuilder = ({ templateString, placeholders }) => {
    // Initialize state using placeholders
    const [inputs, setInputs] = useState(
        Object.keys(placeholders).reduce((acc, key) => ({ ...acc, [key]: placeholders[key] }), {})
    );
    const [copied, setCopied] = useState(false);
    const [finalPrompt, setFinalPrompt] = useState('');

    // Update final prompt when inputs change
    useEffect(() => {
        let result = templateString;
        // We sort keys by length descending to avoid replacing substrings of other keys if that were an issue,
        // though brackets usually prevent this.
        Object.entries(inputs).forEach(([key, value]) => {
            // Create a regex to replace all occurrences of [Key]
            // We escape the key just in case, though standard keys are simple text
            const regex = new RegExp(`\\[${key}\\]`, 'g');
            result = result.replace(regex, value || `[${key}]`);
        });
        setFinalPrompt(result);
    }, [inputs, templateString]);

    const handleCopy = () => {
        navigator.clipboard.writeText(finalPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-primary">Constructor de Prompts</h3>
            </div>

            <div className="grid gap-5 mb-6">
                {Object.keys(placeholders).map((key) => (
                    <div key={key}>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">{key}</label>
                        <input
                            type="text"
                            value={inputs[key]}
                            onChange={(e) => setInputs({ ...inputs, [key]: e.target.value })}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-secondary focus:bg-white focus:border-transparent outline-none transition-all duration-200 text-slate-800 placeholder-slate-400"
                            placeholder={`Ingresa ${key}...`}
                        />
                    </div>
                ))}
            </div>

            <div className="relative">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Prompt Resultante</label>
                <div className="bg-slate-800 p-5 rounded-lg border border-slate-700 text-slate-100 font-mono text-sm leading-relaxed whitespace-pre-wrap shadow-inner min-h-[120px]">
                    {finalPrompt}
                </div>
                <button
                    onClick={handleCopy}
                    className={`absolute top-8 right-2 p-2 rounded-md shadow-sm border transition-all duration-200 
            ${copied
                            ? 'bg-green-100 border-green-200 text-green-700'
                            : 'bg-white border-slate-600 text-slate-500 hover:text-white hover:bg-slate-700'}`}
                    title="Copiar prompt"
                >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
};

export default PromptBuilder;
