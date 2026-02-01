import React from 'react';
import { MessageSquare, Star, Send } from 'lucide-react';

const FeedbackSlide = ({ contentData }) => {
    return (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl mb-8">
                <MessageSquare className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-black text-slate-800 mb-6 tracking-tight">
                {contentData.heading || 'Tu opinión importa'}
            </h2>
            
            <p className="text-xl text-slate-600 max-w-2xl leading-relaxed mb-8">
                {contentData.paragraph || 'Ayúdanos a mejorar. Comparte tu experiencia y sugerencias.'}
            </p>
            
            <div className="flex items-center gap-2 bg-yellow-50 px-6 py-3 rounded-full border border-yellow-200">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-slate-700 font-medium">
                    Tu feedback es anónimo
                </span>
            </div>
        </div>
    );
};

export default FeedbackSlide;
