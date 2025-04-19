import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import { useSelector, useDispatch } from 'react-redux'
import appwrite from '../appwrite/config'
import { AiOutlineCloudUpload } from "react-icons/ai";
import authService from '../appwrite/auth';
import Loader from '../components/Loader';
import { setProfileDetails as setSliceProfileDetails } from '../store/authSlice';
import { Link } from 'react-router-dom';
import { GrFormNext } from "react-icons/gr";
import Animator from '../components/Animator';



function Profile() {
  const profileDetailsData = useSelector((state) => state.profileDetails)
  const [profileDetails, setProfileDetails] = useState(profileDetailsData)
  const [profilePicture, setProfilePicture] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [linkedInUrl, setLinkedInUrl] = useState('')
  const [twitterUrl, setTwitterUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [validGithubUrl, setValidGithubUrl] = useState(true)
  const [validLinkedInUrl, setValidLinkedInUrl] = useState(true)
  const [validTwitterUrl, setValidTwitterUrl] = useState(true)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [inValidPassword, setInValidPassword] = useState(false)
  const [notMatchingPassword, setNotMatchingPassword] = useState(false)
  const [invalidNewPasswordLength, setInvalidNewPasswordLength] = useState(false)
  const [incorrectOldPassword, setIncorrectOldPassword] = useState(false)
  const [ShowNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [isNameValid, setIsNameValid] = useState(true)
  const dispatch = useDispatch()



  useEffect(() => {
    if (profileDetailsData) {
      setProfileDetails(profileDetailsData)
      setProfilePicture(profileDetailsData.profilePicture)
      setName(profileDetailsData.name)
      setEmail(profileDetailsData.email)
      setLinkedInUrl(profileDetailsData.linkedInUrl)
      setTwitterUrl(profileDetailsData.twitterUrl)
      setGithubUrl(profileDetailsData.githubUrl)
      setLoading(false)
    }
  }, [profileDetailsData])



  const handleChange = (e) => {
    const file = e.target.files[0]
    setProfilePicture(URL.createObjectURL(file))
    appwrite.uploadFile(file).then((res) => {
      setProfilePicture(res.$id)
    }).catch((error) => {
      console.log("Upload Profile Picture Error", error)
    })
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    if (oldPassword === '' || newPassword === '' || confirmPassword === '') {
      setInValidPassword(true)
    } else if (newPassword !== confirmPassword) {
      setInValidPassword(false)
      setNotMatchingPassword(true)
    }
    else if (newPassword.length < 8 || confirmPassword.length < 8) {
      setInValidPassword(false)
      setNotMatchingPassword(false)
      setInvalidNewPasswordLength(true)
    }
    else if (oldPassword.length < 8) {
      setInValidPassword(false)
      setNotMatchingPassword(false)
      setInvalidNewPasswordLength(false)
      setIncorrectOldPassword(true)
    }
    else {
      setLoading(true)
      setInValidPassword(false)
      setNotMatchingPassword(false)
      setInvalidNewPasswordLength(false)

      authService.updatePassword(newPassword, oldPassword).then((res) => {
        setIncorrectOldPassword(false)
        setLoading(false)
        setNotificationMessage('Password Updated Successfully')
        setShowNotification(true)
        setOldPassword('')
        setNewPassword('')
        setConfirmPassword('')

      }).catch((error) => {
        setLoading(false)
        setIncorrectOldPassword(true)

      })
    }
  }

  const uploadNewImage = () => {
    document.querySelector('input[type="file"]').click()
  }

  const updateProfile = async () => {
    const data = {
      name,
      email,
      linkedInUrl,
      twitterUrl,
      githubUrl,
      profilePicture
    }
    if (!validateUrls()) {
      return
    }
    setLoading(true)
    try {
      const profile = await appwrite.updateProfile(profileDetailsData.$id, data)
      if (profile) {
        const profileDetails = await appwrite.getProfileDetails(profileDetailsData.$id)
        dispatch(setSliceProfileDetails(profileDetails))
      }
      setLoading(false)
      setNotificationMessage('Profile Updated Successfully')
      setShowNotification(true)
    } catch (error) {
      setLoading(false)
      console.log("Update Profile Error", error)
    }
  }

  const validateUrls = () => {
    let validProfileDetails = true
    if (linkedInUrl && !linkedInUrl
      .match(/^(https:\/\/www.linkedin.com\/in\/)([A-Za-z0-9_-]+)(\/)?$/)) {
      setValidLinkedInUrl(false)
      validProfileDetails = false
    }
    else {
      setValidLinkedInUrl(true)
    }
    if (twitterUrl && !twitterUrl
      .match(/^(https:\/\/twitter.com\/)([A-Za-z0-9_-]+)(\/)?$/)) {
      setValidTwitterUrl(false)
      validProfileDetails = false
    }
    else {
      setValidTwitterUrl(true)
    }
    if (githubUrl && !githubUrl
      .match(/^(https:\/\/github.com\/)([A-Za-z0-9_-]+)(\/)?$/)) {
      setValidGithubUrl(false)
      validProfileDetails = false
    }
    else {
      setValidGithubUrl(true)
    }
    if (name === '') {
      setIsNameValid(false)
      validProfileDetails = false
    }
    else {
      setIsNameValid(true)
    }
    return validProfileDetails
  }

  const removeAttribute = (e) => {
    e.target.removeAttribute('readonly')
  }

  return (
    <div>
      <Animator>
      {loading && <div className=' w-full h-screen'> <Loader /></div>}
      <Container>
        <div className='xl:px-32 flex items-center gap-1 text-sm sm:px-28 px-12 py-2 md:py-4 md:pt-8'>
          <Link to='/'>Home</Link> <span className=' font-thin text-sm pt-0.5'><GrFormNext className=' font-thin' /></span> <Link to='/profile'>Profile</Link>

        </div>
        {profileDetails &&
          <div className=' px-24 p-8 flex gap-16 flex-col md:flex-row max-md:justify-center max-md:items-center'>

            <div className='lg:w-1/6 md:w-2/6 sm:w-2/6 max-sm:w-4/6 items-center flex flex-col gap-2'>
              {/* <img className=' rounded-full border-2' src={`${profileDetails.profilePicture ? profileDetails.profilePicture : 'default-profile.jpg'}`} alt='' /> */}
              <div className='relative'>

                <img className=' lg:w-44 lg:h-44 sm:w-28 sm:h-28 max-sm:w-28 max-sm:h-28  rounded-full border-2 dark:border-[#222F3E] shadow-xl dark:shadow-2xl' src={profilePicture ? appwrite.getFilePreviewUrl(profilePicture) : 'image.png'} alt='' />
                <div onClick={uploadNewImage} className=' absolute bottom-0 right-0 bg-white rounded-full p-3 text-2xl  border-2 shadow-lg '>
                  <AiOutlineCloudUpload className=' text-gray-800' />
                </div>
              </div>
              <input className='hidden' type='file' onChange={(e) => handleChange(e)} />
              <div className=' flex flex-col justify-center items-center'>
                <h1>{name}</h1>
                <p> {email}</p>
              </div>

            </div>
            <div>
              <h1 className='py-4 font-medium text-lg pb-6'>Profile Settings</h1>
              <div className=' flex flex-col gap-4'>
                <div className=' flex flex-col'>


                  <label className=' text-xs font-bold'>Full Name</label>
                  <input className=' border-2 p-1 dark:bg-[#222F3E] dark:border-[#222F3E]' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                  {!isNameValid && <p className=' text-red-500 text-xs'>Please enter a valid name</p>}
                </div>
                <div className=' flex flex-col'>
                  <label className=' text-xs font-bold'>Email</label>
                  <input className=' border-none p-1 dark:bg-[#222F3E] dark:border-[#222F3E]' type='text' value={email} readOnly />
                </div>
                <div className=' flex flex-col'>
                  <label className=' text-xs font-bold'>Your LinkedIn</label>
                  <input className=' border-2 p-1 dark:bg-[#222F3E] dark:border-[#222F3E]' type='text' value={linkedInUrl ? linkedInUrl : ''} onChange={(e) => setLinkedInUrl(e.target.value)} />
                  {linkedInUrl && !validLinkedInUrl ? <p className=' text-red-500 text-xs'>Please enter a valid LinkedIn URL</p> : null}
                </div>
                <div className=' flex flex-col'>
                  <label className=' text-xs font-bold'>Your Twitter</label>
                  <input className=' border-2 p-1 dark:bg-[#222F3E] dark:border-[#222F3E]' type='text' value={twitterUrl ? twitterUrl : ''} onChange={(e) => setTwitterUrl(e.target.value)} />
                  {twitterUrl && !validTwitterUrl ? <p className=' text-red-500 text-xs'>Please enter a valid Twitter URL</p> : null}
                </div>
                <div className=' flex flex-col'>
                  <label className=' text-xs font-bold'>Your Github</label>
                  <input className=' border-2 p-1 dark:bg-[#222F3E] dark:border-[#222F3E]' type='text' value={githubUrl ? githubUrl : ''} onChange={(e) => setGithubUrl(e.target.value)} />
                  {githubUrl && !validGithubUrl ? <p className=' text-red-500 text-xs'>Please enter a valid Github URL</p> : null}
                </div>
              </div>
              <div className=' py-4'>
                <button onClick={updateProfile} className=' bg-blue-500 text-white p-2 rounded-md'>Update Profile</button>
              </div>
            </div>
            <div>
              <h1 className='py-4 font-medium text-lg pb-6'>Update Password</h1>
              <div className=' flex flex-col gap-4'>
                <div className=' flex flex-col'>
                  <label className=' text-xs font-bold '>Old Password</label>
                  <input autoComplete='false'  className=' border-2 p-1 oldpassword dark:bg-[#222F3E] dark:border-[#222F3E]' type='password' value={oldPassword} readOnly onClick={(e)=>removeAttribute(e)} onChange={(e) => setOldPassword(e.target.value)} />
                </div>
                <div className=' flex flex-col'>
                  <label className=' text-xs font-bold '>New Password</label>
                  <input className=' border-2 p-1 dark:bg-[#222F3E] dark:border-[#222F3E]' type='password ' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className=' flex flex-col'>
                  <label className=' text-xs font-bold '>Confirm Password</label>
                  <input className=' border-2 p-1 dark:bg-[#222F3E] dark:border-[#222F3E]' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className=' py-4 flex flex-col gap-2'>
                  {/* <button className=' hover:bg-blue-600 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer bg-blue-500 text-white p-2 rounded-md '>Update Password</button> */}
                  <button onClick={(e) => handlePasswordChange(e)} className=' hover:bg-red-600 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer bg-red-500 text-white p-2 rounded-md '>Update Password</button>
                  {inValidPassword && <span className='text-xs text-red-600 px-1 font-semibold'>All the fields are mandatory.</span>}
                  {notMatchingPassword && <span className='text-xs text-red-600 px-1 font-semibold'>New password does not match.</span>}
                  {invalidNewPasswordLength && <span className='text-xs text-red-600 px-1 font-semibold'> password should be atleast 8 characters long.</span>}
                  {incorrectOldPassword && <span className='text-xs text-red-600 px-1 font-semibold'>Entered Old Password is incorrect.</span>}

                </div>




              </div>

            </div>

          </div>
        }
        <div className={`${ShowNotification ? 'fixed top-0 bottom-0 left-0 right-0 w-full h-screen z-50' : 'hidden'}`}>
          <div onClick={(e) => {
            setShowNotification(false)
          }} className='bg-gray-800 bg-opacity-80  h-full flex justify-center items-center flex-col'>

            <div id="toast-success" className="flex items-center w-full max-w-sm p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-black dark:shadow-xl" role="alert">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="sr-only">Check icon</span>
              </div>
              <div className="ms-3 text-sm font-normal">{notificationMessage}</div>
              <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
              </button>
            </div>


          </div>
        </div>



      </Container>
      </Animator>
    </div>
  )
}

export default Profile