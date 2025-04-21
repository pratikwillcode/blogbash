import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/posts", label: "Posts" },
  { to: "/admin/comments", label: "Comments" },
  { to: "/admin/reports", label: "Reports" },
  { to: "/admin/settings", label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r shadow-md">
      <div className="p-4 text-xl font-bold border-b">Admin Panel</div>
      <nav className="p-2 space-y-1">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-gray-100 ${
                isActive ? "bg-gray-100 font-medium" : ""
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
