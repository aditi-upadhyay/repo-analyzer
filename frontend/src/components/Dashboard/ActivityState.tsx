import DocPreviewCard from "../DocPreviewCard";
import OverviewCard from "../OverviewCard";
import Table from "../Table";
import type { TableColumn } from "../../types/table";

function ActivityState() {

    const repos: TableColumn[] = [
        { name: "auth-gateway-api", status: "Analyzed", updated: "2 mins ago", color: "text-green-600 bg-green-50", action: "View Documentation" },
        { name: "customer-portal-frontend", status: "Processing", updated: "15 mins ago", color: "text-blue-600 bg-blue-50", action: "View Documentation" },
        { name: "data-pipeline-worker", status: "Analyzed", updated: "1 hour ago", color: "text-green-600 bg-green-50", action: "View Documentation" },
        { name: "legacy-payment-system", status: "Failed", updated: "Yesterday", color: "text-red-600 bg-red-50", action: "View Documentation" },
    ];

    return (
        <div className="flex h-full flex-col p-4 gap-4 max-w-7xl mx-auto w-full">
            <DocPreviewCard />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <OverviewCard icon="folder_managed" title="REPOSITORIES ANALYZED" description="42" />
                <OverviewCard icon="description" title="DOCUMENTS GENERATED" description="124" />

                <div className="flex flex-col gap-5 p-6 bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center gap-2 relative z-10">
                        <div className="size-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                            <span className="material-symbols-outlined text-xl">bolt</span>
                        </div>
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Quick Actions</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 relative z-10">
                        <button className="flex flex-col items-center justify-center gap-2 cursor-pointer bg-slate-50 hover:bg-blue-secondary hover:text-white p-4 rounded-xl transition-all duration-300 group/btn border border-slate-100 hover:border-blue-secondary hover:shadow-md">
                            <span className="material-symbols-outlined text-2xl text-slate-400 group-hover/btn:text-white">add_circle</span>
                            <span className="text-[10px] font-bold uppercase tracking-tighter">Analyze New</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-2 cursor-pointer bg-slate-50 hover:bg-blue-secondary hover:text-white p-4 rounded-xl transition-all duration-300 group/btn border border-slate-100 hover:border-blue-secondary hover:shadow-md">
                            <span className="material-symbols-outlined text-2xl text-slate-400 group-hover/btn:text-white">cloud_upload</span>
                            <span className="text-[10px] font-bold uppercase tracking-tighter">Upload Zip</span>
                        </button>
                    </div>

                    <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-500">
                        <span className="material-symbols-outlined text-8xl">bolt</span>
                    </div>
                </div>
            </div>

            <Table repos={repos} header="Recent Repositories"/>
        </div>
    );
}

export default ActivityState;
