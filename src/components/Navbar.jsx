import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartDrawer from './CartDrawer'

function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { itemCount } = useCart()

  return (
    <>
      <header className="navbar">
        <div className="navbar__inner">
          <Link to="/" className="navbar__brand">
            NUA Fashion
          </Link>
{/* 
          <nav className="navbar__nav">
            <Link to="/" className="navbar__link">
              Home
            </Link>
          </nav> */}

          <button
            type="button"
            className="navbar__cart"
            aria-label="Open cart"
            onClick={() => setIsCartOpen(true)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 6h15l-1.5 9h-12z" />
              <path d="M6 6L5 3H2" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
            {itemCount > 0 && (
              <span className="navbar__cart-count">{itemCount}</span>
            )}
          </button>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export default Navbar
