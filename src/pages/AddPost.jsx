import React from 'react'
import { Container, PostForm } from '../components'
import { Link } from 'react-router-dom'
import { GrFormNext } from "react-icons/gr";

function AddPost() {
  return (
    <div className=''>
      <Container>
      <div className=' flex items-center gap-1 text-sm lg:px-10 px-7 py-8 '>
                            <Link to='/'>Home</Link> <span className=' font-thin text-sm pt-0.5'><GrFormNext className=' font-thin' /></span> <Link to='/add-post'>Add Post</Link>

                        </div>
        <PostForm />
      </Container>
    </div>
  )
}

export default AddPost