// src/pages/admin/Users.jsx
import { useEffect, useState } from "react";
import usersService from "../../appwrite/config";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await usersService.fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (userId) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      var response = await usersService.deleteUserViaFunction(userId);
      if(response.success = true){
        await usersService.deleteUserProfile(userId);
      }
      setUsers((prev) => prev.filter((user) => user.$id !== userId));
      alert(`User ${userId} deleted successfully!`);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Something went wrong while deleting the user.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.$id} className="border-t border-gray-200 dark:border-gray-600">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleDelete(user.$id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                      <Link to={`/admin/edit-user/${user.$id}`}>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                          Edit
                        </button>
                      </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
