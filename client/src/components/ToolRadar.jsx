import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Star, Zap, FileText, Target, MessageSquare, Box } from 'lucide-react';

const iconMap = {
    MessageSquare,
    FileText,
    Target,
    Zap
};

const ToolRadar = ({ tools }) => {
    const [expandedIndex, setExpandedIndex] = useState(0);

    return (
        <div className="space-y-4">
            {tools.map((tool, index) => {
                const Icon = iconMap[tool.icon] || Box;
                const isExpanded = expandedIndex === index;

                return (
                    <div
                        key={index}
                        className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all duration-300 transform 
              ${isExpanded ? 'border-secondary ring-1 ring-secondary scale-[1.02] shadow-md' : 'border-slate-200 hover:border-slate-300'}`}
                    >
                        <button
                            onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
                            className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl transition-colors duration-300 ${isExpanded ? 'bg-secondary text-white' : 'bg-slate-100 text-slate-500'}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className={`font-bold text-lg transition-colors ${isExpanded ? 'text-secondary' : 'text-slate-800'}`}>
                                        {tool.name}
                                    </h4>
                                    <p className="text-sm text-slate-500 line-clamp-1 opacity-80">{tool.description}</p>
                                </div>
                            </div>
                            <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                <ChevronDown className={`w-5 h-5 ${isExpanded ? 'text-secondary' : 'text-slate-400'}`} />
                            </div>
                        </button>

                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="px-5 pb-5 pt-0 bg-white">
                                <div className="h-px w-full bg-slate-100 mb-4"></div>
                                <p className="text-slate-600 mb-4 leading-relaxed">{tool.description}</p>

                                <div className="grid grid-cols-1 gap-3">
                                    <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                                        <div className="flex items-center gap-2 mb-1 text-green-700 font-bold text-sm uppercase tracking-wide">
                                            <Star className="w-4 h-4 fill-green-700" /> Fortalezas
                                        </div>
                                        <p className="text-sm text-slate-700 font-medium">{tool.strengths}</p>
                                    </div>

                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                        <div className="flex items-center gap-2 mb-1 text-blue-700 font-bold text-sm uppercase tracking-wide">
                                            <Zap className="w-4 h-4 fill-blue-700" /> Cuándo usar
                                        </div>
                                        <p className="text-sm text-slate-700 font-medium">{tool.whenToUse}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ToolRadar;
