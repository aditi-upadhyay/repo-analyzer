function Button({ icon, label, selected }: { icon: string, label: string, selected: boolean }) {
    return (
        <button
            className={`flex items-center gap-3 p-2 rounded-lg  cursor-pointer ${selected ? "bg-blue-light text-blue-primary" : "hover:bg-slate-100"
                }`}
        >
            <span className="material-symbols-outlined">{icon}</span>
            <span>{label}</span>
        </button>
    );
}

export default Button;