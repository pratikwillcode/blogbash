import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import service from "../../appwrite/config";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

const Dashboard = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const isAdmin = useSelector((state) => state?.userData?.labels?.includes("admin"));
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white p-2 rounded shadow">
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-sm">Count: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  const CustomActiveBar = (props) => {
    const { fill, x, y, width, height } = props;
    return (
      <g>
        <rect x={x} y={y} width={width} height={height} fill="#6366f1" rx={4} ry={4} />
      </g>
    );
  };

  useEffect(() => {
    if (isAdmin === undefined) return; // wait until isAdmin is known (true or false)
  
    const fetchUsers = async () => {
      try {
        const data = await service.fetchUsers();
        setUsers(data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        if (!isAdmin) {
          setLoading(false);
        }
      }
    };
  
    fetchUsers();
  }, []);  

  useEffect(() => {
    if (isAdmin) {
      const fetchPosts = async () => {
        try {
          const data = await service.getPosts();
          setPosts(data?.documents || []);
        } catch (error) {
          console.error("Error fetching posts:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPosts();
    }
  }, [isAdmin]);

  if (loading) return <div className="p-4 text-lg">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Total Users</h3>
          <p className="text-2xl mt-2 text-gray-900 dark:text-gray-100">{users.length}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Total Posts</h3>
          <p className="text-2xl mt-2 text-gray-900 dark:text-gray-100">{posts.length}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Reports</h3>
          <p className="text-2xl mt-2 text-gray-900 dark:text-gray-100">2</p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

  {/* Bar Chart */}
  <div className="bg-white dark:bg-gray-800 shadow p-4 rounded">
    <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Users vs Posts</h3>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={[{ name: 'Users', count: users.length }, { name: 'Posts', count: posts.length }]}>
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" fill="#8884d8" barSize={50} activeBar={<CustomActiveBar />}/>
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* Pie Chart */}
  <div className="bg-white dark:bg-gray-800 shadow p-4 rounded">
    <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Distribution</h3>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={[
            { name: "Users", value: users.length },
            { name: "Posts", value: posts.length }
          ]}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          <Cell fill="#8884d8" />
          <Cell fill="#82ca9d" />
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>

    </div>
  );
};

export default Dashboard;
