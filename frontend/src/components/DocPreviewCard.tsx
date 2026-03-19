import React from 'react';

const DocPreviewCard: React.FC = () => {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-blue-secondary p-6 transition-all duration-300 hover:-translate-y-0.5">
            <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 opacity-10 transition-transform duration-500 group-hover:scale-110">
                <span className="material-symbols-outlined text-[12rem] text-white">auto_stories</span>
            </div>

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex gap-5 items-center">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white shadow-inner backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                        <span className="material-symbols-outlined text-3xl">auto_stories</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-green-400 animate-pulse"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-white/70">Recently generated</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">Documentation: auth-gateway-api</h3>
                    </div>
                </div>

                <button className="group/btn flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-blue-secondary shadow-md transition-all hover:bg-slate-50 hover:shadow-lg active:scale-95">
                    View Latest Docs
                    <span className="material-symbols-outlined text-lg transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                </button>
            </div>
        </div>
    );
};

export default DocPreviewCard;
