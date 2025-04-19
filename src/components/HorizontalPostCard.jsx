import React from 'react'

import appwrite from '../appwrite/config'
import { Link } from 'react-router-dom'
import parse from "html-react-parser";
import Animator from './Animator';

function HorizontalPostCard({ $id, title, featuredImage, content, topic }) {
    const dummyContent = `The idea of AI taking over is a common theme in science fiction, but in reality, it's a complex and nuanced topic. While AI has the potential to greatly impact society, whether it "takes over" depends on how it's developed, regulated, and integrated into various systems.
    `
    return (
        <Animator>
   
        <Link to={`/post/${$id}`}>
        <div className=" mx-auto bg-white rounded-lg shadow-md overflow-hidden  border-2 hover:bg-gray-100 transition-all duration-300 ease-in-out dark:bg-black dark:border-black dark:shadow-2xl dark:hover:bg-gray-900">
            <div className="md:flex">
                <div className=" p-4 rounded-md">
                    <img className="   md:max-w-2xl md:max-h-48 md:w-48 object-cover md:h-full lg:w-64 " src={appwrite.getFilePreviewUrl(featuredImage)} alt={title} />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{topic ? topic : 'Company retreats' }</div>
                    <h1 href="#" className="block mt-1 text-lg leading-tight font-medium  hover:underline">
                        {title}
                    </h1>
                    <div className="mt-2 text-slate- line-clamp-2 text-sm text-gray-500 dark:text-gray-400">{content ? parse(content) : dummyContent}
                    </div>
                    <h1 to={`/post/${$id}`} className="inline-flex items-center px-3 py-2 my-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </h1>
                </div>
            </div>
        </div>
    </Link>
    </Animator>
    )
}

export default HorizontalPostCard