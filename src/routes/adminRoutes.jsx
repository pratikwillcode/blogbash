import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Posts from "../pages/admin/Posts";
import Comments from "../pages/admin/Comments";
import Reports from "../pages/admin/Reports";
import Settings from "../pages/admin/Settings";
import EditUser from "../pages/admin/EditUser";

const adminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { path: "", element: <Dashboard /> },
    { path: "users", element: <Users /> },
    { path: "posts", element: <Posts /> },
    { path: "comments", element: <Comments /> },
    { path: "reports", element: <Reports /> },
    { path: "settings", element: <Settings /> },
    { path: "edit-user/:userId", element: <EditUser /> }, 
  ],
};

export default adminRoutes;
