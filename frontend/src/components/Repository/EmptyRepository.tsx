function EmptyRepository() {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full bg-slate-50/50 p-8 relative overflow-hidden">
            <div className="absolute top-1/4 left-1/4 size-64 bg-blue-light/50 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 size-96 bg-indigo-50/50 rounded-full blur-3xl -z-10" />

            <div className="relative mb-12 group flex flex-col items-center">
                <div className="size-38 bg-white rounded-[2rem] shadow-2xl shadow-blue-900/10 flex items-center justify-center p-8 relative z-10  border border-white/50 backdrop-blur-sm">
                    <div className="size-22 bg-blue-secondary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20 relative">
                        <span className="material-symbols-outlined !text-6xl">folder</span>
                        <div className="absolute -top-3 -right-3 size-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-blue-secondary  border border-slate-50">
                            <span className="material-symbols-outlined text-lg font-bold">auto_awesome</span>
                        </div>
                    </div>
                </div>

                <div className="absolute -bottom-4 bg-white/80 backdrop-blur-md px-6 py-2 rounded-xl shadow-lg border border-slate-100 z-20 flex items-center gap-2 transform transition-all duration-300 group-hover:-translate-y-1">
                    <div className="size-2 bg-slate-300 rounded-xl animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Waiting for Data</span>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-60 bg-blue-50/80 rounded-[3rem] -rotate-6 transition-transform duration-700 group-hover:-rotate-12" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-60 bg-indigo-50/80 rounded-[3rem] rotate-12 transition-transform duration-700 group-hover:rotate-18" />
            </div>

            <div className="max-w-xl text-center flex flex-col items-center gap-6 mb-12">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
                    No Repositories Analyzed Yet
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed font-medium">
                    Connect your first GitHub repository to start generating AI-powered documentation and architectural insights in seconds.
                </p>
            </div>

            <button className="flex items-center gap-3 bg-blue-secondary text-white p-5 px-8 rounded-2xl font-bold shadow-xl shadow-blue-600/30 transition-all duration-300 group relative overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-white/20 translate-x-full skew-x-12" />
                <span className="material-symbols-outlined text-2xl relative z-10">add_circle</span>
                <span className="text-lg relative z-10">Analyze New Repository</span>
            </button>   

            <div className="mt-20 flex flex-wrap justify-center gap-10 opacity-70 transition-opacity hover:opacity-100 duration-500">
                <FeatureItem label="Full code coverage" />
                <FeatureItem label="AI architectural maps" />
                <FeatureItem label="Instant PR reviews" />
            </div>

        </div>
    );
}

function FeatureItem({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-2 group cursor-default">
            <div className="size-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-green-50 group-hover:text-green-500 transition-colors duration-300">
                <span className="material-symbols-outlined text-sm font-bold">check</span>
            </div>
            <span className="text-sm font-bold text-slate-400 group-hover:text-slate-700 transition-colors duration-300 uppercase tracking-tighter">
                {label}
            </span>
        </div>
    );
}

export default EmptyRepository;