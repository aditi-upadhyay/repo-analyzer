function EmptyDocumentation() {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full bg-slate-50/50 p-8 relative overflow-hidden">
            <div className="absolute top-1/4 left-1/4 size-64 bg-blue-light/50 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 size-96 bg-indigo-50/50 rounded-full blur-3xl -z-10" />

            <div className="relative mb-12 group flex flex-col items-center">
                <div className="size-38 bg-white rounded-[2rem] shadow-2xl shadow-blue-900/10 flex items-center justify-center p-8 relative z-10  border border-white/50 backdrop-blur-sm">
                    <div className="size-22 bg-blue-secondary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20 relative">
                        <span className="material-symbols-outlined !text-6xl">docs</span>
                        <div className="absolute -top-3 -right-3 size-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-blue-secondary  border border-slate-50">
                            <span className="material-symbols-outlined text-lg font-bold">auto_awesome</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-xl text-center flex flex-col items-center gap-6 mb-12">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
                    No Documentation Generated Yet
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed font-medium">
                    Connect your first GitHub repository to start generating AI-powered documentation and architectural insights in seconds.
                </p>
            </div>

            <button className="flex items-center gap-3 bg-blue-secondary text-white p-5 px-8 rounded-2xl font-bold shadow-xl shadow-blue-600/30 transition-all duration-300 group relative overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-white/20 translate-x-full skew-x-12" />
                <span className="material-symbols-outlined text-2xl relative z-10">add_circle</span>
                <span className="text-lg relative z-10">Generate documentation</span>
            </button>   



        </div>
    );
}

export default EmptyDocumentation;