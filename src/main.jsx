import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import './styles/global.scss'
import './styles/layout.scss'
import './styles/navbar.scss'
import './styles/footer.scss'
import './styles/home.scss'
import './styles/product-card.scss'
import './styles/product-card-skeleton.scss'
import './styles/product-detail.scss'
import './styles/cart-drawer.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
