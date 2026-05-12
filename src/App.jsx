// local
import OfflinePage from "./pages/offline-page/OfflinePage"
import WelcomePage from "./pages/welcome-page/WelcomePage"
import PagesContainer from "./layout/pagesContainer"
import useTheme from "./hooks/themeHook"

// react
import { useState, useEffect } from "react"

// react router
import { Outlet } from "react-router"

function App() {

  const { theme } = useTheme()

  // state
  const [online, setOnline] = useState(navigator.onLine)
  const [openWelcomePage, setOpenWelcomePage] = useState(() => {
    const sessionWelcomePage = sessionStorage.getItem("welcomePage")
    if (sessionWelcomePage === "closed") return false
    return true
  })

  // handle online / offline
  useEffect(() => {
    const handleOnline = () => setOnline(true)
    const handleOffline = () => setOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // handle open / close welcome page by check sessionStorage
  useEffect(() => {
    if (openWelcomePage) {
      const timer = setTimeout(() => {
        setOpenWelcomePage(false)
        sessionStorage.setItem("welcomePage", "closed")
      }, 7000)
      return () => clearTimeout(timer)
    }
  }, [openWelcomePage])


  // handle theme when open app or change theme value
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light")
    } else {
      document.documentElement.classList.remove("light")
    }
  }, [theme])

  // handle conditional return
  if (openWelcomePage) {
    return (
      <>
        {online ? <WelcomePage /> : <OfflinePage />}
      </>
    )
  }

  return (
    <>
      {
        online ?

          <PagesContainer>
            <Outlet />
          </PagesContainer>

        : <OfflinePage />
      }
    </>
  )
}

export default App
