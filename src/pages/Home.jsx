import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import HorizontalPostCard from '../components/HorizontalPostCard'
import { BsChevronDown } from "react-icons/bs";
import { BsChevronUp } from 'react-icons/bs';

function Home() {
    const [posts, setPosts] = useState([])
    const [totalPosts, setTotalPosts] = useState(9)
    const [loadText, setLoadText] = useState('Load More')
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {

                setPosts(posts.documents.reverse())
                setLoading(false)
            }
            else{
                setLoading(false)
            }
        })
    }, [])

    const currentPosts = posts.slice(0, totalPosts)

    const toggleLoadText = (e) => {
        if (loadText == 'Load More') {
            setLoadText('Show Less')
            setTotalPosts(18)
        }
        else {
            setLoadText('Load More')
            setTotalPosts(9)
        }
    }

    
    return (
        <div className='w-full  md:pb-8'>
            <Container>
                {loading ? <div className=' flex justify-center items-center py-8'>
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
                    <div className='flex flex-col p-12 items-center bg-gray-50 mb-8 text-center dark:bg-[#161616] dark:text-gray-300' >
                        <h1 className='text-2xl font-bold text-center pr-4'>Blog</h1>
                        <p className=''>Our latest news, updates, and stories for everyone</p>
                    </div>
                <div className=' grid lg:grid-cols-3 sm:grid-cols-2 xl:px-4 '>
                    {currentPosts.map((post) => (
                        <div key={post.$id} className=' p-4 flex items-center justify-center w-full '>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
                <div className='flex justify-center items-center gap-2 pt-4'>
                    <button className=' text-blue-700  px-2 py-1 font-semibold' onClick={() => toggleLoadText()} >
                        <div className='flex items-center'>
                        {loadText} <span className=' px-2 pt-0.5'>{loadText === 'Load More' ? <BsChevronDown /> : <BsChevronUp />}</span>
                        </div>
                    </button>

                </div>
                </div>}
            </Container>
        </div>
    )
}

export default Home