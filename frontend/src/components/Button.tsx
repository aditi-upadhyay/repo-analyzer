function Button({ icon, label, selected }: { icon: string, label: string, selected: boolean }) {
    return (
        <button
            className={`flex items-center gap-3 p-2 rounded-lg  cursor-pointer ${selected ? "bg-[#e9f2fe] text-[#0066ff]" : "hover:bg-slate-100"
                }`}
        >
            <span className="material-symbols-outlined">{icon}</span>
            <span>{label}</span>
        </button>
    );
}

export default Button;