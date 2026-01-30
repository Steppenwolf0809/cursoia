import React from 'react';

const ToolComparisonTable = ({ contentData }) => {
    const { heading, columns, rows, tip } = contentData;

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-700">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-8">{heading}</h2>

            <div className="flex-1 overflow-hidden rounded-[2rem] border border-slate-200 shadow-2xl bg-white mb-6">
                <div className="overflow-auto h-full">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                            <tr>
                                {columns.map((col, i) => (
                                    <th key={i} className={`p-6 text-sm font-black uppercase tracking-widest text-slate-500 ${i === 0 ? 'w-1/4' : ''}`}>
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {rows.map((row, i) => (
                                <tr key={i} className="hover:bg-blue-50/50 transition-colors group">
                                    {row.map((cell, j) => (
                                        <td key={j} className={`p-6 text-lg align-middle ${j === 0 ? 'font-black text-primary' : 'text-slate-600'
                                            }`}>
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {tip && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center justify-center gap-3">
                    <span className="text-2xl">💡</span>
                    <p className="text-blue-900 font-bold">{tip}</p>
                </div>
            )}
        </div>
    );
};

export default ToolComparisonTable;
