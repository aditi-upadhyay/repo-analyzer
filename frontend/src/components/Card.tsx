function Card({ icon, title, description }: { icon: string, title: string, description: string }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 flex gap-4 items-center">
            <div className="size-10 rounded-full bg-[#e9f2fe] text-[#0066ff] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">
                    {icon}
                </span>
            </div>
            <div className="flex flex-col">
                <span className="font-semibold">{title}
                </span>
                <span className="text-sm text-slate-500">{description}

                </span>
            </div>
        </div>
    )
}

export default Card