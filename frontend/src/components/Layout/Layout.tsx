import SideBar from "./SideBar";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { DocumentationProvider } from "../../context/DocumentationContext";
import { useState } from "react";

function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <DocumentationProvider>
            <div className="flex h-screen bg-gray-50 overflow-hidden relative">
                {/* Mobile sidebar overlay */}
                {isSidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <div className={`
                    fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out
                    md:relative md:translate-x-0 md:w-1/4 lg:w-1/6 h-full
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}>
                    <SideBar onClose={() => setIsSidebarOpen(false)} />
                </div>

                <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
                    <div className="flex-shrink-0 z-10 relative">
                        <NavBar title="Repo Analyzer" onMenuClick={() => setIsSidebarOpen(true)} />
                    </div>
                    <div className="flex-1 overflow-y-auto bg-gray-50">
                        <Outlet />
                    </div>
                </div>
            </div>
        </DocumentationProvider>
    );
}

export default Layout;