// local
import './index.css'
import router from './router/mainRouter'

// react
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// react router
import { RouterProvider } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
