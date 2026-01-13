import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { EcommerceApp } from './CommerceApp'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EcommerceApp/>
  </StrictMode>,
)
