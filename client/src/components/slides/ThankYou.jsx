import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

const ThankYou = ({ contentData }) => {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in-95 duration-1000">
            {contentData.confetti && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-bounce" />
                    <div className="absolute top-20 right-20 w-6 h-6 bg-blue-400 rounded-full animate-pulse" />
                    <div className="absolute bottom-20 left-20 w-5 h-5 bg-green-400 rounded-full animate-bounce" />
                    <div className="absolute bottom-10 right-10 w-4 h-4 bg-pink-400 rounded-full animate-pulse" />
                </div>
            )}
            
            <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl mb-8 animate-in zoom-in duration-700">
                    <Sparkles className="w-16 h-16 text-white" />
                </div>
            </div>
            
            <h2 className="text-5xl sm:text-6xl font-black text-slate-800 mb-6 tracking-tight">
                {contentData.heading}
            </h2>
            
            {contentData.message && (
                <p className="text-xl sm:text-2xl text-slate-600 max-w-2xl leading-relaxed mb-8">
                    {contentData.message}
                </p>
            )}
            
            {contentData.footer && (
                <div className="flex items-center gap-2 text-slate-500 mt-8">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    <span className="text-lg font-medium">{contentData.footer}</span>
                </div>
            )}
        </div>
    );
};

export default ThankYou;
