import { NavLink } from "react-router-dom";

function Button({ icon, label, selected, to, onClick }: { icon: string, label: string, selected?: boolean, to?: string, onClick?: () => void }) {
    if (to) {
        return (
            <NavLink
                to={to}
                onClick={onClick}
                className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${isActive ? "bg-blue-light text-blue-primary" : "text-slate-600 hover:bg-slate-100"
                    }`
                }
            >
                <span className="material-symbols-outlined">{icon}</span>
                <span className="text-sm font-medium">{label}</span>
            </NavLink>
        );
    }

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 p-2 rounded-lg  cursor-pointer transition-colors w-full text-left ${selected ? "bg-blue-light text-blue-primary" : "text-slate-600 hover:bg-slate-100"
                }`}
        >
            <span className="material-symbols-outlined">{icon}</span>
            <span className="text-sm font-medium">{label}</span>
        </button>
    );
}

export default Button;