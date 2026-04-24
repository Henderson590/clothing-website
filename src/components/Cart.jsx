import React, { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import PayPalCheckout from './PayPalCheckout'
import './Cart.css'

const Cart = ({ onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart, setIsCartOpen } = useCart()
  const [showCheckout, setShowCheckout] = React.useState(false)

  useEffect(() => {
    // Prevent body scroll when cart is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleCheckout = () => {
    setShowCheckout(true)
  }

  if (showCheckout && cartItems.length > 0) {
    return (
      <div className="cart-overlay" onClick={handleOverlayClick}>
        <div className="cart-content" onClick={(e) => e.stopPropagation()}>
          <button className="cart-close" onClick={onClose} aria-label="Close cart">
            ×
          </button>
          <div className="checkout-section">
            <h2>Checkout</h2>
            <PayPalCheckout 
              cartItems={cartItems}
              totalPrice={getTotalPrice()}
              onSuccess={() => {
                // Close checkout and clear cart when payment succeeds
                clearCart()
                setIsCartOpen(false)
                onClose()
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-overlay" onClick={handleOverlayClick}>
      <div className="cart-content" onClick={(e) => e.stopPropagation()}>
        <button className="cart-close" onClick={onClose} aria-label="Close cart">
          ×
        </button>

        <h2 className="cart-title">Your Cart</h2>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty</p>
            <button className="btn" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div className="cart-image-placeholder">
                        {/* INSERT PRODUCT IMAGE HERE */}
                        <p>Image</p>
                      </div>
                    )}
                  </div>
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-info">
                      Size: {item.size} | Color: {item.color}
                    </p>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="cart-item-controls">
                    <div className="cart-quantity">
                      <button
                        className="quantity-btn-small"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="quantity-value-small">{item.quantity}</span>
                      <button
                        className="quantity-btn-small"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-subtotal">
                <span className="subtotal-label">Subtotal:</span>
                <span className="subtotal-value">${getTotalPrice().toFixed(2)}</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart

