import React from 'react';
import { ExternalLink, Sparkles, Star } from 'lucide-react';

const AIRecommendations = ({ contentData }) => {
    const { heading, subheading, tools, surprise } = contentData;

    return (
        <div className="h-full flex flex-col animate-in fade-in zoom-in-95 duration-700">
            {/* Header */}
            <div className="text-center mb-6">
                <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-2 tracking-tight">{heading}</h2>
                {subheading && (
                    <p className="text-lg sm:text-xl text-slate-500 font-medium">{subheading}</p>
                )}
            </div>

            {/* Grid de IAs */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 flex-1">
                {tools.map((tool, i) => (
                    <a
                        key={i}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 p-3 sm:p-5 flex flex-col items-center text-center hover:-translate-y-1 hover:border-blue-200 relative overflow-hidden"
                    >
                        {/* Color accent */}
                        <div 
                            className="absolute top-0 left-0 w-full h-1 sm:h-1.5"
                            style={{ backgroundColor: tool.color }}
                        />
                        
                        {/* Logo */}
                        <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-slate-50 p-1.5 sm:p-3 border border-slate-100 flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                            <img
                                src={tool.logo}
                                alt={`${tool.name} logo`}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/80?text=IA';
                                }}
                            />
                        </div>

                        {/* Info */}
                        <h3 className="text-base sm:text-xl font-black text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                            {tool.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 mb-2 sm:mb-3 line-clamp-2">
                            {tool.description}
                        </p>

                        {/* Badge de nivel */}
                        <div className={`mt-auto px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold ${
                            tool.level === 'Principiante' 
                                ? 'bg-green-100 text-green-700' 
                                : tool.level === 'Intermedio'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-purple-100 text-purple-700'
                        }`}>
                            {tool.level}
                        </div>

                        {/* Link indicator */}
                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                        </div>
                    </a>
                ))}
            </div>

            {/* Sorpresa de la semana */}
            {surprise && (
                <div className="mt-4 sm:mt-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-2xl sm:rounded-3xl p-3 sm:p-5 flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                        <Sparkles className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500 fill-amber-500" />
                            <span className="text-xs sm:text-sm font-bold text-purple-700 uppercase tracking-wider">Sorpresa de esta semana</span>
                        </div>
                        <h4 className="text-sm sm:text-lg font-black text-slate-800 mb-0.5 sm:mb-1">{surprise.name}</h4>
                        <p className="text-xs sm:text-sm text-slate-600">{surprise.description}</p>
                    </div>
                    <a
                        href={surprise.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors flex-shrink-0"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Probar
                    </a>
                </div>
            )}
        </div>
    );
};

export default AIRecommendations;
