import React from 'react';
import { Download, FileText, Link as LinkIcon, File, Video } from 'lucide-react';

const ResourceLibrary = ({ resources }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="p-6 bg-slate-50 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Download className="w-5 h-5 text-secondary" />
                    Recursos Descargables
                </h3>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 gap-4">
                    {resources.map((res, index) => {
                        const Icon = res.type === 'PDF' ? FileText : res.type === 'Notion' ? LinkIcon : res.type === 'Video' ? Video : File;

                        return (
                            <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group cursor-pointer hover:border-secondary">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-slate-100 rounded-lg text-slate-500 group-hover:bg-blue-100 group-hover:text-secondary transition-colors">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 group-hover:text-secondary transition-colors">{res.name}</h4>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                            <span className="font-semibold bg-slate-100 px-2 py-0.5 rounded text-slate-600">{res.type}</span>
                                            <span>•</span>
                                            <span>{res.size}</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="p-2 text-slate-400 hover:text-secondary hover:bg-blue-50 rounded-full transition-colors">
                                    <Download className="w-5 h-5" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ResourceLibrary;
