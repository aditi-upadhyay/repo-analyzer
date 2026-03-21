import React from "react";

interface TableProps<T> {
    header: string;
    data: T[];
    columnHeaders: string[];
    renderRow: (item: T, index: number) => React.ReactNode;
}

function Table<T>({ header, data, columnHeaders, renderRow }: TableProps<T>) {
    return (
        <div className="flex-1 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-white">
                <div className="flex flex-col gap-1">
                    <span className="text-lg text-slate-900 font-bold">{header}</span>
                    <span className="text-xs text-slate-500">Overview of the most recently analyzed projects</span>
                </div>
                <button className="text-sm font-semibold text-blue-secondary hover:text-blue-primary transition-colors cursor-pointer">View all</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            {columnHeaders.map((col, index) => (
                                <th
                                    key={index}
                                    className={`px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider ${index === columnHeaders.length - 1 ? "text-right" : ""}`}
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.map((item, i) => renderRow(item, i))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;