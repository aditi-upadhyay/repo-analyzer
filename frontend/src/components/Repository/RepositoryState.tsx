import type { TableColumn } from "../../types/table";
import Table from "../Table";
import { useState } from "react";

function RepositoryState() {
    const [activeTab, setActiveTab] = useState("All Repositories");
    const tabs = ["All Repositories", "Github", "Zip"];

    const repos: TableColumn[] = [
        { name: "auth-gateway-api", status: "Analyzed", updated: "2 mins ago", color: "text-green-600 bg-green-50", action: "View Documentation" },
        { name: "customer-portal-frontend", status: "Processing", updated: "15 mins ago", color: "text-blue-600 bg-blue-50", action: "View Documentation" },
        { name: "data-pipeline-worker", status: "Analyzed", updated: "1 hour ago", color: "text-green-600 bg-green-50", action: "View Documentation" },
        { name: "legacy-payment-system", status: "Failed", updated: "Yesterday", color: "text-red-600 bg-red-50", action: "View Documentation" },
    ];
    return (
        <div className="w-full flex p-6 flex-col gap-4">
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
                <div className="flex bg-blue-secondary rounded-xl justify-center items-center gap-2 p-2 px-6">
                    <span className="material-symbols-outlined text-lg text-white cursor-pointer">add</span>
                    <span className="text-sm font-semibold text-white cursor-pointer">Add repository</span>
                </div>
            </div>
            <Table repos={repos} header="Repository State" />
        </div>
    );
}

export default RepositoryState;