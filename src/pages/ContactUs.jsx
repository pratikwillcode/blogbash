import React, { useState, useEffect } from 'react'
import Container from '../components/container/Container'
import { useSelector } from 'react-redux'
import Animator from '../components/Animator'

function ContactUs() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const user = useSelector(state => state.userData)

    useEffect(() => {

    if (user) {
        setFirstName(user.name)
        setEmail(user.email)
    }
    }
    , [user])



    return (
        <div className=' md:px-20 px-10 bg-gray-50 dark:bg-[#24272B]'>
            <Animator>
            <Container>
                <div className='flex w-full flex-col sm:flex-row  py-8  sm:py-44 gap-4  '>
                    <div className='flex-1 '>
                        <h1 className=' text-3xl font-medium'>Contact us</h1>
                        <div className=' py-6 font-normal'>Need to get in touch with us? Fill out the form with your enquirey or mail us at <span className=' text-blue-700'>pratikawari045@gmail.com</span> with your queries.</div>
                    </div>
                    <div className='flex-1  flex sm:justify-center  '>
                        <form className=' border-2 dark:border-none dark:shadow-xl flex flex-col p-4  gap-3 shadow-xl rounded-md bg-white dark:bg-black' method='POST' action='https://formspree.io/f/xayrlknl'>
                            <div className=' flex gap-2 flex-col sm:flex-row'>
                                <div className='flex flex-col w-full sm:w-40'>
                                    <label className=' text-xs font-semibold py-1'>First Name*</label>
                                    <input required type="text" name='firstName' className='px-2 bg-gray-100 border-gray-100 dark:border-none border-2 leading-8 rounded-sm dark:bg-[#222F3E] ' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div className='flex flex-col w-full sm:w-40'>
                                    <label className=' text-xs font-semibold py-1'>Last Name</label>
                                    <input  type="text" name='lastName' className='px-2 bg-gray-100 border-gray-100 dark:border-none border-2 leading-8 rounded-sm dark:bg-[#222F3E] ' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>

                            </div>
                            <div className='flex flex-col'>
                                <label className=' text-xs font-semibold py-1'>Email*</label>
                                <input required type="email" name='email' className='px-2 bg-gray-100 border-gray-100 dark:border-none border-2 leading-8 rounded-sm dark:bg-[#222F3E] ' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className=' flex flex-col'>
                                <label className=' text-xs font-semibold py-1'>What can we help you with?</label>
                                <textarea required value={message} name='message' className='px-2 bg-gray-100 border-gray-100 dark:border-none border-2 leading-8 rounded-sm dark:bg-[#222F3E] ' onChange={(e) => setMessage(e.target.value)}></textarea>
                            </div>
                            <div className=''>
                                <button className=' bg-blue-600 text-white dark:text-gray-300 px-3 py-1 text-md rounded-sm font-medium'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>

            </Container>
            </Animator>
        </div>
    )
}

export default ContactUs