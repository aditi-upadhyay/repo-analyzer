import Button from "../Button";
import { SidebarItem } from "../../enums/sidebar.enum";

function SideBar() {
    return (
        <div className="h-full flex flex-col  gap-6 bg-white border-r border-slate-200 p-6">

            <div className="flex items-center gap-4">
                <div className="size-10 bg-blue-secondary rounded-lg flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-2xl">
                        auto_awesome
                    </span>
                </div>

                <div className="flex flex-col">
                    <span className="font-semibold text-lg">AI DocGen</span>
                    <span className="text-xs text-slate-500">
                        Developer Tools
                    </span>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-3 ">
                {SidebarItem.map((item) => (
                    <Button
                        key={item.title}
                        icon={item.icon}
                        label={item.title}
                        selected={item.title === "Dashboard"}
                    />
                ))}

            </div>

            <div className="">
                <div className="flex items-center gap-3">

                    <div className="size-8 bg-slate-200 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-sm">
                            person
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm font-medium">Aditi</span>
                        <span className="text-xs text-slate-500">Developer</span>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default SideBar;