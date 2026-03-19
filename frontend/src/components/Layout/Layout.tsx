import SideBar from "./SideBar";
import NavBar from "./NavBar";
import Main from "./Main";
function Layout() {
    return (
        <div className="flex h-screen">
            <div className="w-1/6">
                <SideBar />
            </div>
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <div className="flex-shrink-0">
                    <NavBar title="Repo Analyzer" />
                </div>
                <div className="flex-1 overflow-y-auto bg-gray-50">
                    <Main />
                </div>
            </div>
        </div>
    );
}

export default Layout;