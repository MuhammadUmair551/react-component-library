import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Alert from './components/Alert & Toast/Alert.jsx'
import Toast from './components/Alert & Toast/Toast.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toast />
  </StrictMode>,
)
