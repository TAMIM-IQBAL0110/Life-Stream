import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Finddonor from './pages/Finddonor.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Finddonor />
  </StrictMode>,
)
