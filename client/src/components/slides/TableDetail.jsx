import React from 'react';

const TableDetail = ({ contentData }) => {
    const { heading, columns, rows } = contentData;

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-700">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-8 text-center">{heading}</h2>

            <div className="flex-1 overflow-hidden rounded-[2.5rem] border border-slate-200 shadow-xl bg-white">
                <div className="overflow-auto h-full custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-900 text-white sticky top-0 z-10">
                            <tr>
                                {columns.map((col, i) => (
                                    <th key={i} className="p-6 text-sm font-bold uppercase tracking-widest border-b-4 border-accent">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {rows.map((row, i) => (
                                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                                    {row.map((cell, j) => (
                                        <td key={j} className={`p-6 text-lg align-top ${j === 0 ? 'font-black text-slate-800 w-1/4' :
                                                j === 2 ? 'italic text-slate-500 bg-yellow-50/30' : 'text-slate-600'
                                            }`}>
                                            {cell.startsWith('"') ? <span className="font-serif text-xl">{cell}</span> : cell}
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

export default TableDetail;
