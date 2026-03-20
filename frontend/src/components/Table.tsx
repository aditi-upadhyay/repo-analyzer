import type { TableColumn } from "../types/table";

function Table({ repos }: { repos: TableColumn[] }) {


    return (
        <div className="flex-1 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-white">
                <div className="flex flex-col gap-1">
                    <span className="text-lg text-slate-900 font-bold">Recent Repositories</span>
                    <span className="text-xs text-slate-500">Overview of the most recently analyzed projects</span>
                </div>
                <button className="text-sm font-semibold text-blue-secondary hover:text-blue-primary transition-colors cursor-pointer">View all</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Repository</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Updated</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {repos.map((repo, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-lg bg-blue-light flex items-center justify-center text-blue-primary group-hover:bg-blue-secondary group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-lg">folder</span>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-secondary transition-colors">{repo.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${repo.color}`}>
                                        {repo.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">{repo.updated}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-blue-secondary transition-colors">
                                        <span className="text-primary font-semibold hover:text-primary/80 transition-colors text-sm">{repo.action}</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;