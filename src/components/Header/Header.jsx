import React from 'react'
import { Container, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Nav from './Nav'
import Logo from './Logo'

function Header() {
  const authStatus = useSelector(state => state.status)
  const navigate = useNavigate()

  const navItems = [
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
  return (
   
    <header className='sticky top-0 z-[20] mx-auto flex w-full items-center  flex-wrap justify-between sm:px-8 px-4 bg-white border-b-2 dark:border-gray-700 dark:bg-black '>
    <Logo />
    <Nav />
  </header>
  )
}

export default Header