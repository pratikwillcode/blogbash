import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login, setProfileDetails } from '../store/authSlice'
import { Logo, Input, Button } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import profileService from '../appwrite/config'


function Signup() {
    const dispatch = useDispatch()  
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const { register, handleSubmit } = useForm()
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [nameError, setNameError] = useState('')
    const [loading, setLoading] = useState(false)

    const create = async (data) => {
        if (!validateData(data)) return
        setNameError('')
        setEmailError('')
        setPasswordError('')
        try {
            setLoading(true)
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentuser()
                if (userData){
                    const profileDetails = await profileService.getProfileDetails(userData.$id)
                    if (profileDetails){
                        dispatch(setProfileDetails(profileDetails))
                    }
                    dispatch(login(userData));
                        navigate('/')
                    
                }

            }
        }
        catch (e) {
            setLoading(false)
            setError(e.message)
        }
    }

    const validateData = (data) => {
        let isValid = true
        if (!data.name) {
            setNameError('Name is required')
            isValid = false
        }
        else{
            setNameError('')
        }
        if (!data.email) {
            setEmailError('Email is required')
            isValid = false
        }else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
            setEmailError('Invalid email address')
            isValid = false
        }
        else{
            setEmailError('')
        }

        if (!data.password) {
            setPasswordError('Password is required')
            isValid = false
        }
        else if (data.password.length < 6) {
            setPasswordError('Password must be at least 6 characters')
            isValid = false
        }
        else{
            setPasswordError('')
        }
        return isValid
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
                        <div className='px-1'>
                            Loading
                        </div>
                    </div> :
        <div className="flex md:items-center md:justify-center w-full ">
            <div className={`mx-auto w-full max-w-lg bg-white dark:bg-black rounded-md p-10 border border-black/10 md:py-14`}>
                {/* <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div> */}
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60 dark:text-gray-400">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)} className="mt-8">
                    <div className=' space-y-5'>
                    <Input
                        label="Full Name:"
                        placeholder="Enter your full name"
                        {...register('name', {
                            required: false
                        })}
                    />
                    <span className="text-red-600 mt-2">{nameError}</span>
                    <Input
                        label='Email'
                        placeholder='Enter your email'
                        type='email'
                        {...register('email', {
                            required: false
                        })}

                    />
                    <span className="text-red-600 mt-2">{emailError}</span>
                    <Input
                    label='Password'
                    type='password'
                    placeholder='Enter your password'
                    {...register('password', {
                        required: false
                    })}
                    
                    />
                    <span className="text-red-600 mt-2">{passwordError}</span>
                    <Button type="submit" className="w-full">Create Account</Button>
                    </div>
                </form>

            </div>
        </div>}
        </div>
    )
}

export default Signup