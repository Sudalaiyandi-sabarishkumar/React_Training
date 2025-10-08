function DesktopBottomBar() {
    return (
      <div className="hidden md:flex fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-xl rounded-lg p-2 gap-2 z-50">
        <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
          <Inbox className="w-5 h-5" />
          <span className="text-sm">Inbox</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
          <Calendar className="w-5 h-5" />
          <span className="text-sm">Planner</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded">
          <LayoutGrid className="w-5 h-5" />
          <span className="text-sm font-medium">Board</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
          <Menu className="w-5 h-5" />
          <span className="text-sm">Switch boards</span>
        </button>
      </div>
    );
  }