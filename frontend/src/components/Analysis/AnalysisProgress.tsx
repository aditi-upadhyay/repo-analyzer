import React from "react";

interface AnalysisStepProps {
    label: string;
    status: "completed" | "running" | "pending";
    time?: string;
}

const AnalysisStep = ({ label, status, time }: AnalysisStepProps) => {
    const getIcon = () => {
        switch (status) {
            case "completed":
                return <span className="material-symbols-outlined text-green-500 font-bold">check_circle</span>;
            case "running":
                return (
                    <div className="relative flex items-center justify-center">
                        <span className="material-symbols-outlined text-blue-secondary font-bold animate-pulse">radio_button_checked</span>
                        <div className="absolute size-4 rounded-full border-2 border-blue-secondary/30 animate-ping"></div>
                    </div>
                );
            default:
                return <span className="material-symbols-outlined text-slate-200 font-bold">radio_button_unchecked</span>;
        }
    };

    return (
        <div className={`flex items-center justify-between py-3 ${status === "pending" ? "opacity-50" : "opacity-100"}`}>
            <div className="flex items-center gap-4">
                <div className="size-6 flex items-center justify-center">
                    {getIcon()}
                </div>
                <span className={`text-sm font-bold ${status === "completed" ? "text-slate-700" : status === "running" ? "text-slate-900" : "text-slate-400"}`}>
                    {label}
                </span>
            </div>
            <span className={`text-xs font-bold font-mono ${status === "running" ? "text-blue-secondary animate-pulse" : "text-slate-400"}`}>
                {status === "running" ? "running..." : time || "—"}
            </span>
        </div>
    );
};

const AnalysisProgress: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-6 max-w-2xl mx-auto space-y-12">
            {/* Repo Card */}
            <div className="p-4 px-6 rounded-2xl border border-slate-100 bg-white shadow-sm flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="size-10 rounded-xl bg-blue-light flex items-center justify-center text-blue-secondary">
                    <span className="material-symbols-outlined text-2xl">account_tree</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-900 tracking-tight">facebook/react</span>
                    <span className="text-[10px] font-bold text-slate-400 font-mono tracking-tighter uppercase">github.com/facebook/react</span>
                </div>
            </div>

            {/* Title Section */}
            <div className="text-center space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Analyzing your repository</h2>
                <p className="text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
                    AI is scanning files, extracting functions, and generating documentation
                </p>
            </div>

            {/* Progress Section */}
            <div className="w-full max-w-md space-y-4 animate-in fade-in zoom-in-95 duration-700 delay-200">
                <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-blue-secondary rounded-full transition-all duration-1000 ease-out shadow-sm"
                        style={{ width: "65%" }}
                    >
                        <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white/20 to-transparent"></div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">65%</span>
                </div>
            </div>

            {/* Steps Section */}
            <div className="w-full max-w-md divide-y divide-slate-50 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                <AnalysisStep label="Cloning repository" status="completed" time="2s" />
                <AnalysisStep label="Scanning JS/JSX files" status="completed" time="5s" />
                <AnalysisStep label="Extracting functions" status="completed" time="8s" />
                <AnalysisStep label="Sending context to AI" status="running" />
                <AnalysisStep label="Generating documentation" status="pending" />
            </div>
        </div>
    );
};

export default AnalysisProgress;
