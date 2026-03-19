import Card from "../Card";

const EmptyState = () => {
    const cards = [
        {
            icon: "rocket_launch",
            title: "Quick Start",
            description: "Follow our guide to document your first stack."
        },
        {
            icon: "insights",
            title: "Repo Analytics",
            description: "Connect a repository to see complexity insights."
        },
        {
            icon: "menu_book",
            title: "Live Docs",
            description: "Your generated docs will appear here once ready."
        }
    ]

    return (
        <div className="flex h-full flex-col p-4 gap-4 bg-gray-100">
            <div className="flex items-center justify-center gap-4">

                {cards.map(card => (
                    <Card icon={card.icon} title={card.title} description={card.description} />
                ))}
            </div>
            <div className="flex items-center flex-1 flex-col border border-slate-200 p-8 rounded-3xl bg-white">
                <div className="flex flex-col items-center gap-6">
                    <div className="flex bg-gray-100 relative size-42 flex items-center justify-center rounded-3xl bg-slate-50">
                        <span className="material-symbols-outlined !text-[8rem] text-primary/40 select-none text-[#308ce866]">
                            data_object
                        </span>
                        <span className="material-symbols-outlined absolute top-4 right-4 text-primary animate-pulse text-[#308ce866]">add_circle</span>
                    </div>
                    <div className="flex flex-col items-center pr-4 pl-4 w-2/3 gap-2">
                        <span className="text-2xl font-semibold">
                            Get started with your first repository
                        </span>
                        <span className="text-sm text-gray-500 text-center">
                            Analyze a GitHub repository or upload a ZIP file to automatically generate AI-powered documentation, flowcharts, and API references.
                        </span>
                    </div>
                    <div className="flex gap-6 w-3/4 cursor-pointer">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 flex gap-4 flex-col">
                            <div className="size-10 rounded-full bg-[#e9f2fe] text-[#0066ff] flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined">
                                    terminal
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="font-semibold">Analyze a GitHub repository
                                </span>
                                <span className="text-sm text-slate-500">Connect your GitHub account to import and analyze repositories.</span>
                                <div className="flex items-center gap-2 text-[#0066ff]">
                                    <button className="text-sm">Connect GitHub</button>
                                    <span className="material-symbols-outlined !text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </div>

                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 flex gap-4 flex-col">
                            <div className="size-10 rounded-full bg-[#e9f2fe] text-[#0066ff] flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined">
                                    upload_file
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="font-semibold">Upload a ZIP file
                                </span>
                                <span className="text-sm text-slate-500">Upload a compressed archieve of your local code for immediate analysis </span>
                                <div className="flex items-center gap-2 text-[#0066ff]">
                                    <button className="text-sm">Choose File</button>
                                    <span className="material-symbols-outlined !text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmptyState