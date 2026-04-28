import { useAuth } from "../../context/AuthContext";
import { useDocumentation } from "../../context/DocumentationContext";

function NavBar({ title, onMenuClick }: { title: string, onMenuClick?: () => void }) {
  const { user } = useAuth();
  const { searchQuery, setSearchQuery } = useDocumentation();

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white gap-4">
      <div className="flex items-center gap-4 sm:gap-6 flex-1">
        <button 
          className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none flex items-center justify-center -ml-2"
          onClick={onMenuClick}
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
        <span className="text-lg font-semibold whitespace-nowrap hidden sm:block">
          {title}
        </span>
        <div className="flex items-center bg-gray-100 border border-gray-200 rounded-full px-4 py-1.5 gap-2 flex-1 max-w-2xl transition focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500/40">
          <span className="material-symbols-outlined text-gray-400 text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search repositories, files..."
            className="bg-transparent outline-none text-sm flex-1 placeholder-gray-400 text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="flex items-center justify-center p-0.5 hover:bg-gray-200 rounded-full transition"
            >
              <span className="material-symbols-outlined text-gray-400 text-[16px]">
                close
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-5 text-gray-600">
        {/* <button className="p-2 rounded-lg hover:bg-gray-100">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <span className="material-symbols-outlined">help</span>
        </button> */}
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 hidden md:block">
              {user.fullName || user.username}
            </span>
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.fullName}
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
            ) : (
              <div className="w-8 h-8 bg-blue-secondary text-white rounded-full flex items-center justify-center font-medium">
                {getInitials(user.fullName || user.username)}
              </div>
            )}
          </div>
        ) : (
          <div className="w-8 h-8 bg-blue-secondary text-white rounded-full flex items-center justify-center font-medium">
            ?
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;