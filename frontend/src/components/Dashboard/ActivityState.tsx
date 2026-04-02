import DocPreviewCard from "../DocPreviewCard";
import OverviewCard from "../OverviewCard";
import Table from "../Table";
import NewAnalysisModal from "../Modals/NewAnalysisModal";
import { useState } from "react";
import { RepositoryStatus } from "../../enums/repository.enum";
import { useAuth } from "../../context/AuthContext";

function ActivityState({ data = [] }) {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {documents} = useAuth()

  const getStatusColor = (status: string) => {
    switch (status) {
      case RepositoryStatus.COMPLETED:
        return "text-green-600 bg-green-50";
      case RepositoryStatus.ANALYZING:
        return "text-slate-600 bg-slate-50";
      case RepositoryStatus.FAILED:
        return "text-red-600 bg-red-50";
      case RepositoryStatus.PENDING:
        return "text-blue-600 bg-blue-50";
      default:
        return "text-slate-600 bg-slate-50";
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col p-4 gap-4 max-w-7xl mx-auto w-full">
      <DocPreviewCard />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <OverviewCard
          icon="folder_managed"
          title="REPOSITORIES ANALYZED"
          description={data.length.toString()}
        />
        <OverviewCard
          icon="description"
          title="DOCUMENTS GENERATED"
          description={documents.length.toString()}
        />

        <div className="flex flex-col gap-5 p-6 bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-2 relative z-10">
            <div className="size-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">bolt</span>
            </div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              Quick Actions
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 relative z-10">
            <button
              className="flex flex-col items-center justify-center gap-2 cursor-pointer bg-slate-50 hover:bg-blue-secondary hover:text-white p-4 rounded-xl transition-all duration-300 group/btn border border-slate-100 hover:border-blue-secondary hover:shadow-md"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="material-symbols-outlined text-2xl text-slate-400 group-hover/btn:text-white">
                add_circle
              </span>
              <span className="text-[10px] font-bold uppercase tracking-tighter">
                Analyze New
              </span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 cursor-pointer bg-slate-50 hover:bg-blue-secondary hover:text-white p-4 rounded-xl transition-all duration-300 group/btn border border-slate-100 hover:border-blue-secondary hover:shadow-md">
              <span className="material-symbols-outlined text-2xl text-slate-400 group-hover/btn:text-white">
                cloud_upload
              </span>
              <span className="text-[10px] font-bold uppercase tracking-tighter">
                Upload Zip
              </span>
            </button>
          </div>

          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-500">
            <span className="material-symbols-outlined text-8xl">bolt</span>
          </div>
        </div>
      </div>

      <Table
        data={data}
        header="Recent Repositories"
        columnHeaders={["Repository", "Status", "Last Updated", "Actions"]}
        totalEntries={data.length}
        columnEntries={5}
        renderRow={(repo: any, i) => (
          <tr
            key={repo._id || i}
            className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
          >
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-blue-light flex items-center justify-center text-blue-primary group-hover:bg-blue-secondary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-lg">
                    folder
                  </span>
                </div>
                <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-secondary transition-colors">
                  {repo.name}
                </span>
              </div>
            </td>
            <td className="px-6 py-4">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(
                  repo.status
                )}`}
              >
                {repo.status}
              </span>
            </td>
            <td className="px-6 py-4 text-sm text-slate-500">
              {formatDate(repo.updated)}
            </td>
            <td className="px-6 py-4 text-right">
              <button className="text-slate-400 hover:text-blue-secondary transition-colors">
                <span className="text-primary font-semibold hover:text-primary/80 transition-colors text-sm">
                  View Documentation
                </span>
              </button>
            </td>
          </tr>
        )}
      />
      <NewAnalysisModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default ActivityState;
