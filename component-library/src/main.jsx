import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './components/Phase2/Navbar/Navbar.jsx'
import divv from './components/Phase2/Navbar/Navbar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
  </StrictMode>,
)
