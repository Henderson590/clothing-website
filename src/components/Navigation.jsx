import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Navigation.css'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartItems } = useCart()
  const location = useLocation()

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <>
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            <h1>806 Threads</h1>
          </Link>
          <div className="header-right">
            <Link 
              to="/cart"
              className="cart-link"
              aria-label="Open cart"
            >
              <span className="cart-icon">🛒</span>
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </Link>
            <button 
              className={`hamburger ${isMenuOpen ? 'open' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-in Navigation Menu */}
      <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="nav-menu-content">
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/shop" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Shop
          </Link>
          <Link to="/support" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Support / Contact
          </Link>
        </div>
      </nav>

      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <div 
          className="nav-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

    </>
  )
}

export default Navigation

