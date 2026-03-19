function OverviewCard({ icon, title, description }: { icon: string, title: string, description: string }) {
    return (
        <div className="flex p-6 bg-white rounded-xl border border-slate-200 flex-col gap-4 relative overflow-hidden group hover:border-blue-secondary hover:shadow-md transition-all duration-300 cursor-pointer">
            <div className="size-10 rounded-full bg-blue-light text-blue-primary flex items-center justify-center shrink-0 group-hover:bg-blue-secondary group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined">
                    {icon}
                </span>
            </div>
            <div className="flex flex-col gap-1 relative z-10">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{title}</span>
                <span className="text-4xl font-bold text-slate-900 group-hover:text-blue-secondary transition-colors duration-300">{description}</span>
            </div>
            <div className="absolute -right-6 -bottom-6 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-[0.07] group-hover:scale-110 transition-all duration-500 pointer-events-none">
                <span className="material-symbols-outlined text-9xl">
                    {icon}
                </span>
            </div>
        </div>
    )
}

export default OverviewCard