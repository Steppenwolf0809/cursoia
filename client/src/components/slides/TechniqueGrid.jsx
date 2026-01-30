import React from 'react';
import { Lightbulb } from 'lucide-react';

const TechniqueGrid = ({ contentData }) => {
    const { heading, techniques } = contentData;

    return (
        <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-4xl font-black text-slate-800 tracking-tight mb-8 text-center">{heading}</h2>

            <div className="grid md:grid-cols-2 gap-6 flex-1 min-h-0">
                {techniques.map((tech, i) => (
                    <div key={i} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-[4rem] -mr-8 -mt-8 opacity-50 group-hover:scale-110 transition-transform"></div>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-100/50 text-blue-600 flex items-center justify-center font-black shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                {i + 1}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">{tech.name}</h3>
                        </div>

                        <p className="text-slate-600 mb-6 flex-grow">{tech.description}</p>

                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 group-hover:border-blue-200 transition-colors">
                            <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                                <Lightbulb className="w-3 h-3" />
                                Prompt
                            </div>
                            <p className="font-medium text-slate-700 italic">"{tech.prompt}"</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechniqueGrid;
