import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Alert from './components/Alert & Toast/Alert.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Alert />
  </StrictMode>,
)
