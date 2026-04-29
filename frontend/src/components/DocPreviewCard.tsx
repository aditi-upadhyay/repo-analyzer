import React from 'react';

interface DocPreviewCardProps {
    repositoryName?: string;
    onViewClick?: () => void;
    isLoading?: boolean;
}

const DocPreviewCard: React.FC<DocPreviewCardProps> = ({ repositoryName, onViewClick, isLoading }) => {
    if (isLoading) {
        return (
            <div className="group relative overflow-hidden rounded-2xl bg-blue-secondary/80 p-5 sm:p-6 animate-pulse shrink-0">
                <div className="h-28 md:h-16 w-full bg-white/10 rounded-xl"></div>
            </div>
        );
    }

    if (!repositoryName) return null;

    return (
        <div className="group relative overflow-hidden rounded-2xl bg-blue-secondary p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 shrink-0">
            <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 opacity-10 transition-transform duration-500 group-hover:scale-110 pointer-events-none">
                <span className="material-symbols-outlined text-[10rem] sm:text-[12rem] text-white">auto_stories</span>
            </div>

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
                <div className="flex gap-4 sm:gap-5 items-center min-w-0">
                    <div className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white shadow-inner backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                        <span className="material-symbols-outlined text-2xl sm:text-3xl">auto_stories</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-green-400 animate-pulse"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-white/70">Recently generated</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">Documentation: {repositoryName}</h3>
                    </div>
                </div>

                <button
                    onClick={onViewClick}
                    className="group/btn flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-blue-secondary shadow-md transition-all hover:bg-slate-50 hover:shadow-lg active:scale-95"
                >
                    View Latest Docs
                    <span className="material-symbols-outlined text-lg transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                </button>
            </div>
        </div>
    );
};

export default DocPreviewCard;
