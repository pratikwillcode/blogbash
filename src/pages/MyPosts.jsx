import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components'
import HorizontalPostCard from '../components/HorizontalPostCard'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GrFormNext } from "react-icons/gr";
import { Link } from 'react-router-dom';

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); // Change this to your desired posts per page
  const [totalPages, setTotalPages] = useState(0);
  const userData = useSelector(state => state.userData)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()


  useEffect(() => {
    if (userData) {

      appwriteService.getMyPosts(userData.$id).then((posts) => {
        if (posts) {
          // posts.documents = posts.documents.filter(post => post.userId === userData.$id)
          setPosts(posts.documents.reverse())
          setLoading(false)
        }

      })
    }
  }, [])

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
      pageNumbers.push(i);
    }
    setTotalPages(pageNumbers.length);
  }, [posts])

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='w-full py-4 md:py-8'>
      <Container>
        {loading ? <div className=' flex justify-center items-center'>
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...
            </span>
          </div>
          <div className=' px-1'>
            Loading
          </div>
        </div> :

          currentPosts && currentPosts.length > 0 ?
            <div>
              <div className='xl:px-28 flex items-center gap-1 text-sm px-5 py-2 md:py-4'>
                            <Link to='/'>Home</Link> <span className=' font-thin text-sm pt-0.5'><GrFormNext className=' font-thin' /></span> <Link to='/my-posts'>My Posts</Link>

                        </div>

              <div className=' flex flex-col xl:px-24'>
                {currentPosts.map((post) => (
                  <div key={post.$id} className=' p-4'>
                    <HorizontalPostCard {...post} />
                  </div>
                ))}
              </div>

              <div className='pagination w-full flex justify-center items-center gap-2 pt-4'>
                <button className=' bg-blue-700 text-white px-2 py-1 rounded-md  hover:scale-105 transition-all duration-300 ease-in-out' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                  Previous
                </button>
                <div>
                  <p className=''><span>{currentPage}</span> of {totalPages}</p>
                </div>
                <button className=' bg-blue-700 text-white px-2 py-1 rounded-md  hover:scale-105 transition-all duration-300 ease-in-out' onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(posts.length / postsPerPage)}>
                  Next
                </button>
              </div>
            </div> :
            <div>
              <div className='xl:px-28 flex items-center gap-1 text-sm px-5 py-2 md:py-4'>
                            <Link to='/'>Home</Link> <span className=' font-thin text-sm pt-0.5'><GrFormNext className=' font-thin' /></span> <Link to='/my-posts'>My Posts</Link>

                        </div>
             <div className=' flex justify-center items-center min-h-48 flex-col'>
              <h1 className=' text-xl font-medium'>You have not created any Posts</h1>
              <h2>Let's start by creating a new one</h2>
              <div>
                <button onClick={() => navigate('/add-post')} className=' bg-blue-600 text-white px-2 py-1 m-2 rounded-md'>Add Post</button>
              </div>
            </div>
            </div>
        }
      </Container>
    </div>
  )
}

export default MyPosts