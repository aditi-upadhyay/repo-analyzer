import SideBar from "./SideBar";
import NavBar from "./NavBar";
import Main from "./Main";
function Layout() {
    return (
        <div className="flex h-screen">
            <div className="w-1/6">
                <SideBar />
            </div>
            <div className="flex-1">
                <div className="h-16">
                    <NavBar title="Repo Analyzer" />
                </div>
                <div >
                    <Main />
                </div>
            </div>
        </div>
    );
}

export default Layout;