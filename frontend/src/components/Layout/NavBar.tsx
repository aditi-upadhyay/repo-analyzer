function NavBar({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white">

      {/* Left Section */}
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

        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium">
          A
        </div>

      </div>

    </div>
  );
}

export default NavBar;