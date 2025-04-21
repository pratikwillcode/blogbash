// src/pages/admin/Posts.jsx
import { useEffect, useState } from "react";
import postsService from "../../appwrite/config";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = useSelector((state) => state?.userData?.labels?.includes("admin"));

  useEffect(() => {
    if (isAdmin) {
      const getAllPosts = async () => {
        try {
          const data = await postsService.getPosts();
          setPosts(data?.documents);
        } catch (error) {
          console.error("Error fetching posts:", error);
        } finally {
          setLoading(false);
        }
      };
      getAllPosts();
    }
  }, [isAdmin]);

  const handleDelete = async (postId) => {
    try {
      await postsService.deletePost(postId);
      setPosts(posts.filter(post => post.$id !== postId));  // Remove post from UI
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
  <h2 className="text-2xl font-semibold mb-4">Posts</h2>
  
  <div className="overflow-x-auto">
    <table className="min-w-full table-auto border border-gray-300 ">
      <thead className="bg-gray-100 dark:bg-gray-700">
        <tr>
          <th className="px-4 py-2 text-left text-sm">Title</th>
          <th className="px-4 py-2 text-left text-sm">Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.$id} className="border-t border-gray-200">
            <td className="px-4 py-2 text-sm">{post.title}</td>
            <td className="px-4 py-2 flex flex-wrap gap-2">
              <button
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                onClick={() => handleDelete(post.$id)}
              >
                Delete
              </button>
              <Link to={`/edit-post/${post.$id}`}>
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

export default Posts;
