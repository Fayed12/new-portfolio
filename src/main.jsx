// local
import './index.css'
import router from './router/mainRouter'
import ThemeProvider from './context/themeProvider'

// react
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// react router
import { RouterProvider } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
