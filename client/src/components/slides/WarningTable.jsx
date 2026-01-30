import React from 'react';
import { AlertTriangle } from 'lucide-react';

const WarningTable = ({ contentData }) => {
    const { heading, columns, rows } = contentData;

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-700">
            <div className="flex items-center gap-4 mb-8 justify-center">
                <div className="bg-red-100 p-3 rounded-2xl text-red-600">
                    <AlertTriangle className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black text-red-900 tracking-tight">{heading}</h2>
            </div>

            <div className="flex-1 overflow-hidden rounded-[2rem] border-2 border-red-100 shadow-2xl bg-white relative">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full -mr-20 -mt-20 opacity-50 z-0"></div>

                <div className="overflow-auto h-full relative z-10">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-red-50 border-b-2 border-red-100 sticky top-0 shadow-sm">
                            <tr>
                                {columns.map((col, i) => (
                                    <th key={i} className="p-6 text-sm font-black uppercase tracking-widest text-red-800">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-red-50">
                            {rows.map((row, i) => (
                                <tr key={i} className="hover:bg-red-50/30 transition-colors">
                                    {row.map((cell, j) => (
                                        <td key={j} className={`p-6 text-lg align-top ${j === 0 ? 'font-bold text-red-900 w-1/4' :
                                                j === 2 ? 'font-medium text-emerald-700 bg-emerald-50/20 rounded-lg' : 'text-slate-600'
                                            }`}>
                                            {j === 0 && <span className="mr-2">⛔</span>}
                                            {j === 2 && <span className="mr-2">✅</span>}
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WarningTable;
