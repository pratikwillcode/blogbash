import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { login, logout, setProfileDetails } from './store/authSlice'
import { Header, Footer } from './components/index'
import { Outlet } from 'react-router-dom'
import profileSerive from './appwrite/config'
import { useSelector } from 'react-redux'
import { ThemeProvider } from './context/theme'

function App() {
  const [loading, setLoading] = useState(true)

  const isLoggedIn = useSelector(state => state.status)
  const [userId, setUserId] = useState("")
  const dispatch = useDispatch()

  const getInitialTheme = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedPrefs = window.localStorage.getItem("color-theme")
      if (typeof storedPrefs === "string") {
        return storedPrefs
      }

      const userMedia = window.matchMedia("(prefers-color-scheme: dark)")
      if (userMedia.matches) {
        return "dark"
      }
    }
    // If you want to use light theme as the default, return "light" instead
    return "dark"
  }

  

  const [themeMode, setThemeMode] = useState(getInitialTheme())
  const lightTheme = () => {
    //code to set the theme to local storage
    window.localStorage.setItem("color-theme", "light")    
    setThemeMode("light")
    window.dispatchEvent(new Event('theme-change'));

  }
  const darkTheme = () => {
    window.localStorage.setItem("color-theme", "dark")
    setThemeMode("dark")
    window.dispatchEvent(new Event('theme-change'));

  }

  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light")
    document.querySelector("html").classList.add(themeMode)
  }, [themeMode])

  useEffect(() => {
    authService.getCurrentuser()
      .then((userData) => {
        if (userData) {
          setUserId(userData.$id)
          dispatch(login( {userData} ))
        } else {
          setUserId('')
          dispatch(logout())
        }
      }).catch((e) => {
        console.log("Get Current User Failed" + e.message);
      }).finally(() => {
        setLoading(false)
      })

  }, [isLoggedIn])

  useEffect(() => {
    if (isLoggedIn && userId) {
      profileSerive.getProfileDetails(userId)
        .then((profileDetails) => {
          if(profileDetails){

            dispatch(setProfileDetails(profileDetails))
          }
        }).catch((e) => {
          console.log("Get Profile Details Failed" + e.message);
        })
    }
  }, [isLoggedIn, userId])

  return !loading ? (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
  <div className='min-h-screen flex flex-wrap content-between bg-white dark:bg-[#24272B] text-black dark:text-gray-300'>
    <div className='w-full block font-body'>
      <Header />
      <main>

        <Outlet />
      </main>
      <Footer />
    </div>
  </div>
  </ThemeProvider>) : null
}

export default App
