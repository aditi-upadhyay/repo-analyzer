import Button from "../Button";
import { SidebarItem } from "../../enums/sidebar.enum";
import { useAuth } from "../../context/AuthContext";

function SideBar({ onClose }: { onClose?: () => void }) {
    const { user } = useAuth();
    return (
        <div className="h-full flex flex-col  gap-6 bg-white border-r border-slate-200 p-6">

            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="size-10 bg-blue-secondary rounded-lg flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-2xl">
                            auto_awesome
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <span className="font-semibold text-lg whitespace-nowrap">AI DocGen</span>
                        <span className="text-xs text-slate-500 whitespace-nowrap">
                            Developer Tools
                        </span>
                    </div>
                </div>
                {/* Close button for mobile */}
                <button 
                    className="md:hidden text-gray-500 hover:text-gray-700 p-1" 
                    onClick={onClose}
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            <div className="flex-1 flex flex-col gap-3 ">
                {SidebarItem.map((item) => (
                    <Button
                        key={item.title}
                        icon={item.icon}
                        label={item.title}
                        to={item.route}
                        onClick={onClose}
                    />
                ))}

            </div>

            <div className="mt-auto">
                <div className="flex items-center gap-3">

                    <div className="size-8 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                        {user?.avatarUrl ? (
                            <img
                                src={user.avatarUrl}
                                alt={user.fullName || user.username}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="material-symbols-outlined text-sm">
                                person
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium truncate">{user?.fullName || user?.username || "Guest"}</span>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default SideBar;