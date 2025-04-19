import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components'
import HorizontalPostCard from '../components/HorizontalPostCard'
import appwriteService from '../appwrite/config'
import { set } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { TbMathGreater } from "react-icons/tb";
// import { FaGreaterThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa6";
import { GrFormNext } from "react-icons/gr";


const AllPost = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10); // Change this to your desired posts per page
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents.reverse())
                setLoading(false)
            }

        })
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
                    <div className='px-1'>
                        Loading
                    </div>
                </div> :
                    <div>
                        <div className='xl:px-28 flex items-center gap-1 text-sm px-5 py-2 md:py-4'>
                            <Link to='/'>Home</Link> <span className=' font-thin text-sm pt-0.5'><GrFormNext className=' font-thin' /></span> <Link to='/all-posts'>All Posts</Link>

                        </div>

                        <div className=' flex flex-col xl:px-24'>
                            {currentPosts.map((post) => (
                                <div key={post.$id} className=' p-4'>
                                    <HorizontalPostCard {...post} />
                                </div>
                            ))}
                        </div>

                        <div className='pagination w-full flex justify-center items-center gap-2 pt-4'>
                            <button className=' bg-blue-700 text-white px-2 py-1' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                Prev
                            </button>
                            <div>
                                <p className=''><span>{currentPage}</span> of {totalPages}</p>
                            </div>
                            <button className=' bg-blue-700 text-white px-2 py-1' onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(posts.length / postsPerPage)}>
                                Next
                            </button>
                        </div>
                    </div>}
            </Container>
        </div>
    )
}

export default AllPost;