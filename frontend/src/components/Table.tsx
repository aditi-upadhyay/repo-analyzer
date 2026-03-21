import React from "react";

interface TableProps<T> {
    header: string;
    data: T[];
    columnHeaders: string[];
    renderRow: (item: T, index: number) => React.ReactNode;
    totalEntries?: number;
    columnEntries?: number;
}

function Table<T>({
    header,
    data,
    columnHeaders,
    renderRow,
    totalEntries = 0,
    columnEntries = 10,
}: TableProps<T>) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const startEntry = totalEntries > 0 ? (currentPage - 1) * columnEntries + 1 : 0;
    const endEntry = Math.min(currentPage * columnEntries, totalEntries);
    const pagesRequired = Math.ceil(totalEntries / columnEntries);
    return (
        <div className="flex flex-col justify-between flex-1 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div>
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
                            {data.slice((currentPage - 1) * columnEntries, currentPage * columnEntries).map((item, i) => renderRow(item, i))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-white">
                <div className="text-sm text-slate-500 font-medium">
                    Showing {startEntry} to {endEntry} of {totalEntries} entries
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="size-8 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <span className="material-symbols-outlined text-lg">chevron_left</span>
                    </button>
                    {Array.from({ length: pagesRequired }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`size-8 flex items-center justify-center rounded-lg ${i + 1 === currentPage ? "bg-blue-secondary text-white" : "text-slate-600 hover:bg-slate-50"
                                } text-sm font-bold shadow-sm transition-all cursor-pointer`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(pagesRequired, prev + 1))}
                        disabled={currentPage === pagesRequired}
                        className="size-8 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <span className="material-symbols-outlined text-lg">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Table;