import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Menu, X } from 'react-feather'
import LogoutBtn from './LogoutBtn'


function Nav() {
    const authStatus = useSelector(state => state.status)
    const isAdmin = useSelector(state => state?.userData?.labels?.includes('admin'));
    const navItems = [
        { name: 'Home', path: '/', active: true },
        { name: 'My Posts', path: '/my-posts', active: authStatus},
        { name: 'All Posts', path: '/all-posts', active: authStatus },
        { name: 'Add Post', path: '/add-post', active: authStatus },
        { name: 'Contact', path: '/contact-us', active: true},
        {name: 'About', path: '/about', active: true},
        { name: 'Login', path: '/login', active: !authStatus },
        { name: 'Sign Up', path: '/signup', active: !authStatus },
        { name: 'Profile', path: '/profile', active: authStatus },
        { name: 'Admin', path: '/Admin', active: authStatus && isAdmin },

    ]

    const navItems2 = [
        {
          name: 'Home',
          slug: "/",
          active: true
        },
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
        },
        {
          name: "Signup",
          slug: "/signup",
          active: !authStatus,
        },
        {
          name: "All Posts",
          slug: "/all-posts",
          active: authStatus,
        },
        {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus,
        }
      ]

    const [isOpen, setIsOpen] = useState(false)
    const toggleNavbar = () => {
        setIsOpen(!isOpen)
    }
  return (
    <>
            <nav className=''>
                <div className=' text-gray-500 dark:text-gray-300'>
                    <div className='hidden md:flex justify-between items-center'>
                        {navItems.map((item, index) => item.active &&
                            <NavLink key={index} to={item.path}
                                className={`  px-3 py-1  transition-all duration-300 ease-in-out ${item.name == 'Sign Up' || item.name == 'Login' ?
                                    'bg-blue-600 mx-2 text-white rounded-sm hover:text-white hover:bg-blue-700' : 'hover:text-black dark:hover:text-white'}  `}><div className=' cursor-pointer'>{item.name}</div></NavLink>
                        )}
                        
                        

                        {authStatus && <LogoutBtn />}
                        
                    </div>
                    <div className='md:hidden'>
                        <button onClick={toggleNavbar}>
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </nav>
            {isOpen &&
                <div className='flex flex-col items-center basis-full md:hidden'>
                    {navItems.map((item, index) => item.active &&
                        <NavLink key={index} to={item.path} className={`px-2 py-1 ${item.name == 'Sign Up' || item.name == 'Login' ?
                            'bg-blue-600 hover:bg-blue-700 my-2 text-white' : ''}`}>{item.name}</NavLink>
                    )}
                    
                    {authStatus && <LogoutBtn />}
                    
                </div>
            }
        </>
  )
}

export default Nav