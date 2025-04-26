import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { login as authLogin, setProfileDetails } from '../store/authSlice'
import { Logo, Input, Button } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import appwriteService from '../appwrite/config'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)



    const login = async (data) => {
        if (!validateEmail(data.email)) return
        setEmailError('')
        if (!validatePassword(data.password)) return
        setPasswordError('')

        try {
            setLoading(true)
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentuser()
                if (userData) {
                    const profileDetails = await appwriteService.getProfileDetails(userData.$id)
                    if (profileDetails) {
                        dispatch(setProfileDetails(profileDetails))
                    }
                    dispatch(authLogin(userData))
                    navigate('/')
                }
            }

        } catch (e) {
            setLoading(false)
            setError('Invalid email or password')
        }
    }

    const validateEmail = (value) => {
        if (!value) {
            setEmailError('Email is required')
            return false
        }
        if (!/^\S+@\S+\.\S+$/.test(value)) {
            setEmailError('Invalid email address')
            return false
        }
        return true
    }

    const validatePassword = (value) => {
        if (!value) {
            setPasswordError('Password is required')
            return false
        }
        return true
    }
    return (
        <div className=' w-full h-screen flex bg-gray-50 dark:bg-[#24272B]'>
            {loading ? <div className=' flex justify-center items-center w-full' >
                        <div
                            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status">
                            <span
                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                            >Loading...
                            </span>
                        </div>
                        <div className=' px-1'>
                            Loading
                        </div>
                    </div> :
            <div className='flex md:items-center md:justify-center w-full '>
                <div className={`mx-auto w-full max-w-lg  rounded-md p-10 border border-black/10 bg-white dark:bg-black`}>
                    {/* <div className='mb-2 flex justify-center'>
                        <span className=' w-full flex items-center justify-center pr-4'>
                            <Logo width='100%' />
                        </span>
                    </div> */}
                    <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
                    <p className="mt-2 text-center text-base text-black/60 dark:text-gray-400">
                        Don&apos;t have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                    <form onSubmit={handleSubmit(login)} className='mt-8'>
                        <div className='space-y-5'>
                            <Input
                                label='Email'
                                placeholder='Enter your email'
                                type='email'
                                {...register('email', {
                                    required: false,
                                    // validate: {
                                    //     matchPatern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || invalidEmail()
                                    // }
                                })}

                            />
                            <span className='text-red-500'>{emailError}</span>
                            <Input
                                label='Password'
                                placeholder='Enter your password'
                                type='password'
                                {...register('password', { required: false })}
                            />
                            <span className='text-red-500'>{passwordError}</span>
                            {/* Forgot Password link */}
                                <div className="text-right">
                                  <NavLink to="/forgot-password" className="text-blue-500 text-sm hover:underline">
                                    Forgot Password?
                                  </NavLink>
                                </div>
                            <div className=' flex items-center justify-center'><Button type="submit" className=" px-8">Sign In</Button>
                            </div>
                            <span className='text-red-500 w-full  flex  justify-center'>{error}</span>
                        </div>
                    </form>
                </div>
            </div>}
        </div>
    )
}

export default Login
