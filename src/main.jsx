import 'rsuite/dist/rsuite.min.css';
import { BrowserRouter } from 'react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CustomProvider } from 'rsuite'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CustomProvider theme='dark'>
        <App />
      </CustomProvider>
    </BrowserRouter>
  </StrictMode>,
)
