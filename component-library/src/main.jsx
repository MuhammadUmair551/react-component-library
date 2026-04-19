import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import InputField from './components/InputField.jsx'
import Badge from './components/Badges & Tags/Badge.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Badge />
  </StrictMode>,
)
