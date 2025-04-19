import React from 'react'
import { Link } from 'react-router-dom'
import ThemeBtn from '../ThemeBtn'

function Logo() {
  return (
    <div className='flex justify-center items-center'>
      <div className=' w-16 h-16 flex items-center gap-2'>
        <Link to='/'>
          {/* <img src='/Logo2.png' alt='logo' /> */}
          <div className='flex h-full items-center'>
            <h1><span>Blog</span><span className=' text-red-600'>Bash</span></h1>
          </div>
        </Link>
        <div className='pt-1'>
          <ThemeBtn />
        </div>

      </div>

    </div>
  )
}

export default Logo