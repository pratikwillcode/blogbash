import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const logoutHandler = () => {
        setLoading(true)
        authService.logout()
        .then(() => {
            dispatch(logout());
            window.location.reload()
            setLoading(false)
        })
    }
    return (
        <div className=''>

        {loading ?  <div className=' flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#24272B] w-[100%]'>
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
        <button className='inline-bock px-3 pb-3 md:pb-0 duration-200  transition-all ease-in-out hover:text-black dark:hover:text-white'
        onClick={logoutHandler}>Logout</button>}
        </div>
    )
}

export default LogoutBtn