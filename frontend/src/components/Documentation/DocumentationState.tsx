import Table from "../Table";
import NewAnalysisModal from "../Modals/NewAnalysisModal";
import DocumentationView from "./DocumentationView";
import { useDocumentation } from "../../context/DocumentationContext";
import { RepositoryStatus } from "../../enums/repository.enum";

function DocumentationState() {
    const {
        isModalOpen,
        setIsModalOpen,
        activeTab,
        setActiveTab,
        view,
        setView,
        setSelectedRepo,
        repositories,
        isLoading
    } = useDocumentation();

    const tabs = ["All Repositories", "Github", "Zip"];

    const getStatusColor = (status: string) => {
        switch (status) {
            case RepositoryStatus.COMPLETED:
            case "Analyzed":
                return "text-green-600 bg-green-50";
            case RepositoryStatus.ANALYZING:
            case "Processing":
                return "text-blue-600 bg-blue-50";
            case RepositoryStatus.FAILED:
            case "Failed":
                return "text-red-600 bg-red-50";
            case RepositoryStatus.PENDING:
                return "text-slate-600 bg-slate-50";
            default:
                return "text-slate-600 bg-slate-50";
        }
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "N/A";
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString(undefined, {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return dateStr;
        }
    };

    if (view === "details") {
        return (
            <div className="w-full h-full flex flex-col relative">
                <button
                    onClick={() => setView("table")}
                    className="absolute top-2 left-6 z-50 flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-blue-secondary transition-colors cursor-pointer bg-white/80 backdrop-blur-sm p-2 rounded-lg border border-slate-100 shadow-sm"
                >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Back to Repositories
                </button>
                <DocumentationView />
            </div>
        );
    }

    if (isLoading && repositories.length === 0) {
        return <div className="p-6 text-slate-500">Loading repositories...</div>;
    }

    return (
        <div className="w-full flex p-6 flex-col gap-4 h-full">
            <div className="flex justify-between items-center">
                <div className="flex rounded-xl border border-slate-200 p-2 align-center">
                    {tabs.map((tab) => (
                        <span
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`text-sm font-semibold text-slate-700 cursor-pointer p-2 px-2 rounded-lg ${activeTab === tab ? "bg-white border border-slate-200" : ""}`}
                        >
                            {tab}
                        </span>
                    ))}
                </div>
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="flex bg-blue-secondary rounded-xl justify-center items-center gap-2 p-2 px-6 cursor-pointer"
                >
                    <span className="material-symbols-outlined text-lg text-white">add</span>
                    <span className="text-sm font-semibold text-white">Add repository</span>
                </div>
            </div>
            <Table
                data={repositories}
                header="Repository State"
                columnHeaders={["Repository", "Status", "Last Updated", "Actions"]}
                totalEntries={repositories.length}
                columnEntries={6}
                renderRow={(repo, i) => (
                    <tr key={repo._id || i} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-lg bg-blue-light flex items-center justify-center text-blue-primary group-hover:bg-blue-secondary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-lg">folder</span>
                                </div>
                                <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-secondary transition-colors">{repo.name}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(repo.status)}`}>
                                {repo.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{formatDate(repo.updated)}</td>
                        <td className="px-6 py-4 text-right">
                            <button
                                onClick={() => {
                                    setSelectedRepo(repo);
                                    setView("details");
                                }}
                                className="text-slate-400 hover:text-blue-secondary transition-colors cursor-pointer"
                            >
                                <span className="text-primary font-semibold hover:text-primary/80 transition-colors text-sm">View Documentation</span>
                            </button>
                        </td>
                    </tr>
                )}
            />
            <NewAnalysisModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

export default DocumentationState;