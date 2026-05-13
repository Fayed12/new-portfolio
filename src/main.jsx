// local
import './index.css'
import router from './router/mainRouter'
import ThemeProvider from './context/themeProvider'

// react
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// react router
import { RouterProvider } from 'react-router'

// toastify
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
