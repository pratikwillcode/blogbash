export default function Navbar() {
    return (
      <header className="flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm">
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        <button className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">
          Logout
        </button>
      </header>
    );
  }
  