// src/pages/admin/AdminLayout.jsx
import { Outlet, NavLink } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen ">
      {/* Sidebar */}
      <aside className="bg-gray-800 dark:bg-gray-700 text-white w-full md:w-64 p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <NavLink
            to="/admin/"
            end
            className={({ isActive }) =>
              `block px-2 py-1 rounded hover:bg-gray-700 hover:dark:bg-gray-950 ${isActive ? 'bg-gray-700 dark:bg-gray-950' : ''}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `block px-2 py-1 rounded hover:bg-gray-700 hover:dark:bg-gray-950 ${isActive ? 'bg-gray-700 dark:bg-gray-950' : ''}`
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/admin/posts"
            className={({ isActive }) =>
              `block px-2 py-1 rounded hover:bg-gray-700 hover:dark:bg-gray-950 ${isActive ? 'bg-gray-700 dark:bg-gray-950' : ''}`
            }
          >
            Posts
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-auto bg-white dark:bg-[#24272B] text-black dark:text-gray-300">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
