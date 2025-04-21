import React, {useEffect, useState} from 'react'
import { Container, PostCard, PostForm } from '../components'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
import { GrFormNext } from "react-icons/gr";
import { Link } from 'react-router-dom'


function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then((post) => {
                if(post){
                    setPost(post)
                }
            })
        }else{
            navigate('/')
        }
    },[slug, navigate])

  return post ?  (
    <div className=''>
        <Container>
        <div className=' flex items-center gap-1 text-sm lg:px-10 px-7 py-8 '>
                            <Link to='/'>Home</Link>
                            <span className=' font-thin text-sm pt-0.5'>
                                <GrFormNext className=' font-thin' />
                            </span>
                             <Link to={`/edit-post/${slug}`}>Edit Post</Link>

                        </div>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost