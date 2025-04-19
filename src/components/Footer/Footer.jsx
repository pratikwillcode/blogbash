import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Header/Logo'
import { AiFillHeart } from 'react-icons/ai'
import { AiFillGithub } from 'react-icons/ai'
import { AiOutlineTwitter } from 'react-icons/ai'

function Footer() {
  return (
    <section className="relative overflow-hidden py-10  border border-t-2 border-t-black dark:border-gray-700 dark:bg-black ">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="100px" />
                            </div>
                            <div className=' flex items-center'>Made with <span className=' text-red-600 px-1'><AiFillHeart /></span>By<a href='https://www.linkedin.com/in/pratik-awari-608908218/' target='_blank' className='px-1 underline'>Pratik</a>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500 dark:text-gray-300">
                                Company
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 dark:text-gray-200 hover:text-gray-700"
                                        to="https://github.com/pratikwillcode" target="_blank"
                                    >
                                        Github
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 dark:text-gray-200 hover:text-gray-700"
                                        to="https://www.linkedin.com/in/pratik-awari-608908218/" target="_blank"
                                    >
                                        LinkedIn
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 dark:text-gray-200 hover:text-gray-700"
                                        to="https://twitter.com/PratikAwari28" target="_blank"
                                    >
                                        Twitter
                                    </Link>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500 dark:text-gray-300">
                                Support
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 dark:text-gray-200 hover:text-gray-700"
                                        to="/about"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 dark:text-gray-200 hover:text-gray-700"
                                        to="/contact-us"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 dark:text-gray-200 hover:text-gray-700"
                                        to="/contact-us"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-gray-900 dark:text-gray-200 hover:text-gray-700"
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500 dark:text-gray-300">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 dark:text-gray-200 hover:text-gray-700"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 dark:text-gray-200 hover:text-gray-700"
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-gray-900 dark:text-gray-200 hover:text-gray-700"
                                        to="/"
                                    >
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Footer