import React from 'react'
import appwrite from '../appwrite/config'
import { Link } from 'react-router-dom'
import parse from "html-react-parser";
import { motion, useInView, useAnimation } from 'framer-motion'
import Animator from './Animator';



function Postcard({ $id, title, featuredImage, content, authorName, createdOn }) {
  const getDate = (date) => {
    date = Date.parse(date)
    date = new Date(date)
    return date.toLocaleDateString('en-IN')
  }

  const getTodaysDate = () => {
    const date = new Date()
    return date.toLocaleDateString('en-IN')
  }

  const dummyContent = `The idea of AI taking over is a common theme in science fiction, but in reality, it's a complex and nuanced topic. While AI has the potential to greatly impact society, whether it "takes over" depends on how it's developed, regulated, and integrated into various systems.`
  return (
    <div className=' w-full'>
      <Animator>    <Link to={`/post/${$id}`} className=''>
      <div className=" bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out border border-gray-200 rounded-lg shadow dark:bg-black dark:border-none dark:shadow-lg dark:hover:bg-gray-800 h-full">

        <img className="rounded-t-lg w-full object-cover h-56" src={appwrite.getFilePreviewUrl(featuredImage)} alt={title} />

        <div className="p-5 min-h-48 border-b-2 dark:border-gray-600 dark:hover:border-gray-500">
          <div >
            <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-gray-300 capitalize">{title}</h5>
          </div>
          <div className="mb-3 font-normal text-gray-500 text-sm dark:text-gray-400 line-clamp-2">{content ? parse(content) : dummyContent}</div>
          <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </div>
        </div>
        <div className=' px-4 py-2 text-sm'>
          <h3 className=' w-full text-end py-1 capitalize'>{authorName ? authorName : 'Test User'}</h3>
          <h3 className=' w-full text-end py-1'>{createdOn ? getDate(createdOn) : getTodaysDate()}</h3>
        </div>
      </div>
    </Link>
    </Animator>
    </div>


  )
}

export default Postcard