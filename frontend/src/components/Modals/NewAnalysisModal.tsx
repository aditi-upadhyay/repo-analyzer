import { useState } from "react";

interface NewAnalysisModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function NewAnalysisModal({ isOpen, onClose }: NewAnalysisModalProps) {
    const [activeTab, setActiveTab] = useState("GitHub URL");
    const tabs = [
        { name: "GitHub URL", icon: "link" },
        { name: "Upload ZIP", icon: "upload_file" },
        { name: "Local path", icon: "folder" },
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div
                className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-8 pb-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">New Analysis</h2>
                            <p className="text-slate-500 mt-2 font-medium">Connect your repository to begin the structural audit.</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer text-slate-400"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="px-8 border-b border-slate-100 flex gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`flex items-center gap-2 py-4 border-b-2 transition-all cursor-pointer font-bold text-sm ${activeTab === tab.name
                                ? "border-blue-secondary text-blue-secondary"
                                : "border-transparent text-slate-400 hover:text-slate-600"
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                    {activeTab === "GitHub URL" && (
                        <>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Repository URL</label>
                                <input
                                    type="text"
                                    placeholder="https://github.com/username/repo"
                                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-secondary/30 focus:bg-white transition-all text-slate-700 placeholder:text-slate-300 font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Token (Optional)</label>
                                <input
                                    type="password"
                                    placeholder="ghp_xxxxxxxxxxxx"
                                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-secondary/30 focus:bg-white transition-all text-slate-700 placeholder:text-slate-300 font-medium"
                                />
                                <p className="text-[10px] font-bold text-slate-400 italic">Required only for private repositories.</p>
                            </div>
                        </>
                    )}

                    {activeTab === "Upload ZIP" && (
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Archive</label>
                            <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-12 flex flex-col items-center justify-center gap-4 bg-slate-50/50 hover:bg-white hover:border-blue-secondary/30 transition-all cursor-pointer group">
                                <div className="size-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-blue-secondary group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-4xl">cloud_upload</span>
                                </div>
                                <div className="text-center">
                                    <p className="text-slate-700 font-bold">Click to upload or drag and drop</p>
                                    <p className="text-slate-400 text-sm font-medium">ZIP, TAR.GZ (Max. 500MB)</p>
                                </div>
                                <input type="file" className="hidden" accept=".zip,.tar.gz" />
                            </div>
                        </div>
                    )}

                    {activeTab === "Local path" && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Directory Path</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="/Users/username/projects/my-repo"
                                        className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-secondary/30 focus:bg-white transition-all text-slate-700 placeholder:text-slate-300 font-medium"
                                    />
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">folder</span>
                                </div>
                                <p className="text-[10px] font-bold text-slate-400 italic">Enter the absolute path to your local project directory.</p>
                            </div>
                        </div>
                    )}

                    {/* Info Note */}
                    <div className="bg-blue-light/50 border border-blue-secondary/10 p-5 rounded-2xl flex gap-4 items-start">
                        <div className="size-8 bg-blue-secondary rounded-lg flex items-center justify-center text-white flex-shrink-0">
                            <span className="material-symbols-outlined text-lg">info</span>
                        </div>
                        <div>
                            <h4 className="text-xs font-black text-blue-secondary uppercase tracking-widest mb-1">DEPLOYMENT NOTE</h4>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed">
                                {activeTab === "Upload ZIP"
                                    ? "Uploaded archives are processed securely. Ensure the file contains the root of your project."
                                    : "Our AI architect will perform a shallow scan. Large repositories may take a few minutes to index."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-8 pt-4 bg-slate-50/50 flex justify-end items-center gap-4 border-t border-slate-100">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button className="flex items-center gap-2 bg-blue-secondary hover:bg-blue-primary text-white py-3 px-8 rounded-2xl font-bold shadow-xl shadow-blue-600/20 transition-all cursor-pointer group">
                        Analyze repository
                        <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewAnalysisModal;
