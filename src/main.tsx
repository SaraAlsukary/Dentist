import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify'
import "animate.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer position="top-right" />
    <App />
  </StrictMode>,
)
