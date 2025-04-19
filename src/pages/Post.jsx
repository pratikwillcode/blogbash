import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { BiLogoLinkedinSquare } from "react-icons/bi";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Animator from '../components/Animator';

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.userData);
    const profileDetails = useSelector((state) => state.profileDetails);

    const isAuthor = post && userData ? post.userId === userData.$id : false;
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.screen.width);
    const [deletePostPopup, setDeletePostPopup] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleLike = () => {
        setIsLiked(!isLiked);
        if (isDisliked) setIsDisliked(false);
    }

    const handleDislike = () => {
        setIsDisliked(!isDisliked);
        if (isLiked) setIsLiked(false);
    }

    useEffect(() => {
        if (slug) {
            setLoading(true);
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
                setLoading(false);
            });
        } else navigate("/");
    }, [slug, navigate]);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };
    window.onresize = () => {
        setScreenWidth(window.screen.width);
    }
    const dummyContent = `The idea of AI taking over is a common theme in science fiction, but in reality, it's a complex and nuanced topic. While AI has the potential to greatly impact society, whether it "takes over" depends on how it's developed, regulated, and integrated into various systems.`


    return post ? (

        <div className=" min-h-screen p-4  ">
            <Animator>
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
                    <div className=" flex flex-col  lg:max-w-6xl mx-auto md:px-24 lg:px-40 sm:px-12 px-4">
                        <div className=" flex justify-between items-center py-4">
                            <NavLink to='/' className=' underline underline-offset-4 pb-1'>Home</NavLink>
                            <div className=" flex items-center gap-2 ">
                                <h2 className="">Was this helpful?</h2>
                                <div className=" flex">
                                    {isLiked ?
                                        <div onClick={handleLike} className="text-blue-700 rounded-full p-2 hover:bg-blue-50 dark:hover:bg-blue-400 transition-all delay-75 duration-300 ease-in-out cursor-pointer"><BiSolidLike /></div> :
                                        <div onClick={handleLike} className=" hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:text-gray-300 rounded-full p-2 transition-all delay-75 duration-300 ease-in-out cursor-pointer"> <BiLike />
                                        </div>}


                                    {isDisliked ?
                                        <div onClick={handleDislike} className="text-red-700 rounded-full p-2 hover:bg-red-50  dark:hover:bg-red-200 transition-all delay-75 duration-300 ease-in-out cursor-pointer"><BiSolidDislike /></div> :
                                        <div onClick={handleDislike} className=" hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:text-gray-300 rounded-full p-2 transition-all  delay-75 duration-300 ease-in-out cursor-pointer"> <BiDislike />
                                        </div>}
                                </div>

                            </div>

                        </div>

                        <div className=" flex justify-between items-center pb-5">
                            <div>
                                <h1 className=" text-4xl font-normal capitalize">{post.title}</h1>
                            </div>


                        </div>

                        {profileDetails &&
                            <div className="flex  justify-between">
                                <div className=" flex gap-4 pb-4 py-1" >
                                    <div className=" ">
                                        <img className=" rounded-full border-2 shadow-md w-16 h-16 " src={profileDetails.profilePicture ? appwriteService.getFilePreviewUrl(profileDetails.profilePicture) : '/image.png'} alt="" /></div>
                                    <div className=" flex flex-col justify-between  py-1 ">
                                        <h1 className=" capitalize px-1">{profileDetails.name}</h1>
                                        <div className=" flex  w-full gap-2 items-center h-full pl-1">
                                            
                                            {profileDetails.twitterUrl &&
                                                <Link to={profileDetails.twitterUrl} target="_blank" >
                                                    <div className=" text-blue-700 bg-white dark:bg-transparent dark:text-gray-300 text-lg hover:border-b-2 border-blue-700 dark:border-gray-300"><BsTwitterX className="mb-1" /></div>
                                                </Link>}
                                                {profileDetails.linkedInUrl &&
                                                <Link to={profileDetails.linkedInUrl} target="_blank" >
                                                    <div className=" text-blue-700 bg-white dark:bg-transparent dark:text-gray-300 text-xl hover:border-b-2 border-blue-700 dark:border-gray-300"><BiLogoLinkedinSquare className="mb-1" /></div>
                                                </Link>}
                                            {profileDetails.githubUrl &&
                                                <Link className="" to={profileDetails.githubUrl} target="_blank" >
                                                    <div className=" text-blue-700 bg-white dark:bg-transparent dark:text-gray-300 text-lg hover:border-b-2
                                         border-blue-700 dark:border-gray-300"><BsGithub className="mb-1" /></div>
                                                </Link>}
                                        </div>
                                    </div>
                                </div>
                                {isAuthor && <div className="flex gap-4 pt-1">
                                    <Link to={`/edit-post/${post.$id}`}>

                                        {/* <button className={` text-white  bg-green-500 px-2 py-1 rounded-lg  border-2 hover:bg-white hover:text-green-500 `}>Edit</button> */}
                                        <button className={`   px-2 py-1 rounded-md  border-2  text-green-500 border-green-500 hover:bg-green-500 hover:text-white  transition-all duration-300 ease-in-out`}>{screenWidth > 768 ? 'Edit' : <AiFillEdit />} </button>

                                    </Link>

                                    <div>
                                        {/* <button onClick={deletePost} className={` text-white bg-red-600 px-2 py-1 rounded-md  border-2 hover:bg-white hover:text-red-500 `}>{screenWidth > 768 ? 'Delete' : <AiFillDelete/>}</button> */}
                                        <button onClick={(e) => setDeletePostPopup(true)} className={`  px-2 py-1 rounded-md  border-2  text-red-500 border-red-600 hover:bg-red-500 hover:text-white  transition-all duration-300 ease-in-out`}>{screenWidth > 768 ? 'Delete' : <AiFillDelete />}</button>
                                    </div>

                                </div>}


                            </div>}
                        <div className=" flex gap-4 flex-col w-full">
                            <div className="flex-1 shadow-md ">
                                <img className=" w-full object-cover" src={appwriteService.getFilePreviewUrl(post.featuredImage)} alt={post.title} />
                                {/* <img className=" object-contain min-w-[100%] h-[80%]"  src={appwriteService.getFilePreviewUrl(post.featuredImage)} alt={post.title} /> */}
                            </div>
                            <div className=" flex-1 mb-16 text-justify">
                                {post.content ? parse(post.content) : dummyContent}
                            </div>
                        </div>
                        <div>
                            <div className=" flex items-center gap-2 flex-col p-4">
                                <h2>Was this helpful?</h2>
                                <div className=" flex text-xl">
                                    {isLiked ?
                                        <div onClick={handleLike} className="text-blue-700 rounded-full p-2 hover:bg-blue-50 dark:hover:bg-blue-400 transition-all delay-75 duration-300 ease-in-out cursor-pointer"><BiSolidLike /></div> :
                                        <div onClick={handleLike} className=" hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:text-gray-300 rounded-full p-2 transition-all delay-75 duration-300 ease-in-out cursor-pointer"> <BiLike />
                                        </div>}


                                    {isDisliked ?
                                        <div onClick={handleDislike} className="text-red-700 rounded-full p-2 hover:bg-red-50  dark:hover:bg-red-200 transition-all delay-75 duration-300 ease-in-out cursor-pointer"><BiSolidDislike /></div> :
                                        <div onClick={handleDislike} className=" hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:text-gray-300 rounded-full p-2 transition-all delay-75 duration-300 ease-in-out cursor-pointer"> <BiDislike />
                                        </div>}
                                </div>

                            </div>
                        </div>
                    </div>}
                </Container>
            </Animator>
            {deletePostPopup &&

                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <Animator>

                        <div className="bg-white dark:bg-black p-4 rounded-lg ">
                            <h1 className="p-4">Are you sure you want to delete this post?</h1>
                            <div className="flex justify-end gap-4 p-4">
                                <button className=" border-2 border-gray-500 rounded-md p-1 px-2 bg-white dark:bg-black hover:bg-gray-100 transition-all  ease-in-out dark:hover:text-black dark:hover:bg-gray-300 dark:hover:border-white" onClick={() => setDeletePostPopup(false)} >Cancel</button>
                                <button className=" border-2 bg-red-600 border-red-600 text-white dark:text-red-600 dark:bg-black rounded-md p-1 px-2 hover:bg-red-700 transition-all  ease-in-out dark:hover:bg-red-600 dark:hover:text-white" onClick={deletePost} >Delete</button>
                            </div>
                        </div>
                    </Animator>
                </div>}
        </div>
    ) : null;
}