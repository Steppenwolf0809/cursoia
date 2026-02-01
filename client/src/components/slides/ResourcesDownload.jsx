import React, { useState } from 'react';
import { FileText, Download, CheckCircle, Package, Video, Link as LinkIcon, Lock, CheckSquare, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const ICON_MAP = {
    FileText,
    Package,
    Video,
    Link: LinkIcon,
    CheckSquare,
    BookOpen,
    Sparkles
};

const ResourcesDownload = ({ contentData }) => {
    const [downloadingState, setDownloadingState] = useState({});

    const handleDownload = (index, url) => {
        // Simulate download for UX
        setDownloadingState(prev => ({ ...prev, [index]: 'loading' }));

        setTimeout(() => {
            setDownloadingState(prev => ({ ...prev, [index]: 'completed' }));
            // In a real scenario, we would trigger the download here
            window.open(url, '_blank');
        }, 1500);
    };

    return (
        <div className="h-full flex flex-col justify-center p-8 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <div className="inline-block p-4 rounded-full bg-blue-50 mb-6">
                    <Download className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-5xl font-black text-slate-800 tracking-tight">
                    {contentData.heading}
                </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
                {contentData.resources.map((resource, index) => {
                    const Icon = ICON_MAP[resource.icon] || FileText;
                    const status = downloadingState[index] || 'idle';

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className="flex items-start gap-6">
                                <div className="w-20 h-20 rounded-2xl bg-slate-50 text-slate-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                                    <Icon size={32} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-slate-800">
                                            {resource.title}
                                        </h3>
                                        <span className="px-2 py-1 rounded bg-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            {resource.type}
                                        </span>
                                    </div>
                                    <p className="text-slate-600 font-medium mb-6">
                                        {resource.description}
                                    </p>

                                    <button
                                        onClick={() => handleDownload(index, resource.downloadUrl)}
                                        disabled={status === 'completed'}
                                        className={`
                                            w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300
                                            ${status === 'idle' ? 'bg-slate-900 text-white hover:bg-slate-800' : ''}
                                            ${status === 'loading' ? 'bg-slate-100 text-slate-400 cursor-wait' : ''}
                                            ${status === 'completed' ? 'bg-green-100 text-green-700 cursor-default' : ''}
                                        `}
                                    >
                                        {status === 'idle' && (
                                            <>
                                                <Download size={18} /> Descargar
                                            </>
                                        )}
                                        {status === 'loading' && (
                                            <>
                                                <div className="w-5 h-5 border-2 border-slate-400 border-t-slate-600 rounded-full animate-spin" />
                                                Descargando...
                                            </>
                                        )}
                                        {status === 'completed' && (
                                            <>
                                                <CheckCircle size={18} /> Descargado
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default ResourcesDownload;
