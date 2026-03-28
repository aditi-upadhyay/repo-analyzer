import { useAuth } from "../../context/AuthContext";

function NavBar({ title }: { title: string }) {
  const { user } = useAuth();

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-6 flex-1">
        <span className="text-lg font-semibold whitespace-nowrap">
          {title}
        </span>
        <div className="flex items-center bg-gray-100 border border-gray-200 rounded-full px-4 py-1.5 gap-2 flex-1 max-w-2xl transition">
          <span className="material-symbols-outlined text-gray-500 text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search repositories, files..."
            className="bg-transparent outline-none text-sm flex-1 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-5 text-gray-600">
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <span className="material-symbols-outlined">help</span>
        </button>
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