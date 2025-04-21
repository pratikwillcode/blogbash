import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { BsChevronDown, BsChevronUp } from "react-icons/bs"

function Home() {
    const [posts, setPosts] = useState([])
    const [totalPosts, setTotalPosts] = useState(12)
    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                const allPosts = posts.documents.reverse()
                setPosts(allPosts)
                setHasMore(allPosts.length > 12)
            }
            setLoading(false)
        })
    }, [])

    const currentPosts = posts.slice(0, totalPosts)

    const loadMore = () => {
        const nextPosts = totalPosts + 12
        setTotalPosts(nextPosts)
        if (nextPosts >= posts.length) {
            setHasMore(false)
        }
    }

    const showLess = () => {
        setTotalPosts(12)
        setHasMore(posts.length > 12)
    }

    return (
        <div className='w-full md:pb-8'>
            <Container>
                {loading ? (
                    <div className='flex justify-center items-center py-8'>
                        <div
                            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status">
                            <span
                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                            >
                                Loading...
                            </span>
                        </div>
                        <div className='px-1'>Loading</div>
                    </div>
                ) : (
                    <div>
                        <div className='flex flex-col p-12 items-center bg-gray-50 mb-8 text-center dark:bg-[#161616] dark:text-gray-300'>
                            <h1 className='text-2xl font-bold text-center pr-4'>Blog</h1>
                            <p>Our latest news, updates, and stories for everyone</p>
                        </div>

                        <div className='grid xl:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 xl:px-4'>
                            {currentPosts.map((post) => (
                                <div key={post.$id} className='p-4 flex items-center justify-center w-full'>
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>

                        {posts.length > 12 && (
                            <div className='flex justify-center items-center gap-2 pt-4'>
                                {hasMore ? (
                                    <button className='text-blue-700 px-2 py-1 font-semibold' onClick={loadMore}>
                                        <div className='flex items-center'>
                                            Load More
                                            <span className='px-2 pt-0.5'><BsChevronDown /></span>
                                        </div>
                                    </button>
                                ) : (
                                    <button className='text-blue-700 px-2 py-1 font-semibold' onClick={showLess}>
                                        <div className='flex items-center'>
                                            Show Less
                                            <span className='px-2 pt-0.5'><BsChevronUp /></span>
                                        </div>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Home
