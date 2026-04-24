// src/pages/CartPage.jsx  (replace your existing file contents with this)
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import PayPalCheckout from '../components/PayPalCheckout'
import { calculateShippingFromZip } from '../data/calculateShipping'
import './CartPage.css'

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart, setIsCartOpen } = useCart()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    state: '',
    city: '',
    zip: '',
    emailOrPhone: ''
  })

  const [deliveryMethod, setDeliveryMethod] = useState('mail') // 'hand' | 'mail'
  const [showCheckout, setShowCheckout] = useState(false)
  const [promoInput, setPromoInput] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [promoStatus, setPromoStatus] = useState('idle') // 'idle' | 'valid' | 'invalid'
  const [showThankYou, setShowThankYou] = useState(false)

  const cityValue = formData.city.trim()
  const stateValue = formData.state.trim()
  const locationReady = cityValue !== '' && stateValue !== ''
  const isAmarillo = locationReady && cityValue.toLowerCase() === 'amarillo'

  useEffect(() => {
    if (!isAmarillo && deliveryMethod !== 'mail') {
      setDeliveryMethod('mail')
    }
  }, [isAmarillo, deliveryMethod])

  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const discountValue = useMemo(() => {
    if (!appliedPromo) return 0
    if (appliedPromo.type === 'percent') {
      return (itemsTotal * appliedPromo.value) / 100
    }
    if (appliedPromo.type === 'flat') {
      return appliedPromo.value
    }
    return 0
  }, [appliedPromo, itemsTotal])

  // fallback / base shipping (legacy behavior if no ZIP or API)
  const baseShipping = useMemo(() => {
    if (!formData.zip) return 0
    return calculateShippingFromZip(formData.zip)
  }, [formData.zip])

  // choose shipping value to baseShipping
  const shippingToUse = baseShipping

  // compute PayPal fee (we treat this as a "tax" line so customer covers it)
  // Use 2.99% + $0.49 (adjust rate if you have other merchant fees)
  const paypalFee = useMemo(() => {
    const taxable = Math.max(0, itemsTotal + shippingToUse - discountValue)
    const fee = Number((taxable * 0.0299 + 0.49).toFixed(2))
    return fee
  }, [itemsTotal, shippingToUse, discountValue])

  const subtotal = getTotalPrice()
  const total = Math.max(0, subtotal + shippingToUse - discountValue + paypalFee)

  // After showing thank you, redirect home after brief delay
  useEffect(() => {
    if (!showThankYou) return
    const timer = setTimeout(() => {
      navigate('/')
    }, 5000)
    return () => clearTimeout(timer)
  }, [showThankYou, navigate])

  const handleSuccessfulCheckout = () => {
    setShowCheckout(false)
    clearCart()
    setIsCartOpen(false)
    setShowThankYou(true)
  }

  const handleCheckoutClick = () => {
    if (cartItems.length === 0) return

    // Ensure shipping is resolved (if user entered ZIP, we prefer calculatedShipping)
    // But we won't block on shipping: if it's still loading, fallback to shippingToUse.
    // Save checkout form data and shipping info to localStorage for PayPal function to read
    const checkoutMeta = {
      form: formData,
      shipping: shippingToUse,
      paypalFee: paypalFee
    }
    localStorage.setItem('checkoutFormData', JSON.stringify(checkoutMeta))

    if (total <= 0) {
      handleSuccessfulCheckout()
      return
    }
    setShowCheckout(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const applyPromo = async () => {
    const code = promoInput.trim().toUpperCase()

    const response = await fetch("/.netlify/functions/promo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code })
    })

    const data = await response.json()

    if (data.valid) {
      setAppliedPromo(data.promo)
      setPromoStatus("valid")
    } else {
      setAppliedPromo(null)
      setPromoStatus("invalid")
    }
  }

  return (
    <div className="cart-page page-transition">
      <div className="container cart-container">
        <div className="cart-left">
          <h1 className="cart-title">Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <>
              <div className="cart-items-list">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item-row">
                    <div className="cart-item-image">
                      {item.image ? (
                        <img src={item.image} alt={item.name} />
                      ) : (
                        <div className="cart-image-placeholder">
                          <p>Image</p>
                        </div>
                      )}
                    </div>
                    <div className="cart-item-info">
                      <div className="cart-item-top">
                        <div>
                          <h3 className="item-name">{item.name}</h3>
                          <p className="item-meta">Size: {item.size} | Color: {item.color}</p>
                        </div>
                        <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                          Remove
                        </button>
                      </div>
                      <div className="cart-item-bottom">
                        <div className="quantity-control">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">+</button>
                        </div>
                        <div className="item-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer delivery details */}
              <div className="customer-info">
                <h2>Delivery Details</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>First Name</label>
                    <input name="firstName" value={formData.firstName} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input name="lastName" value={formData.lastName} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input name="address" value={formData.address} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input name="state" value={formData.state} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input name="city" value={formData.city} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>ZIP</label>
                    <input name="zip" value={formData.zip} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Email / Phone</label>
                    <input name="emailOrPhone" value={formData.emailOrPhone} onChange={handleChange} />
                  </div>
                </div>

              </div>
            </>
          )}
        </div>

        <div className="cart-right">
          <div className="summary-card">
            <h2>Order Summary</h2>
            <div className="summary-line">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-line">
              <span>Shipping / Delivery</span>
              <span>${(shippingToUse || 0).toFixed(2)}</span>
            </div>

            <div className={`promo-row ${promoStatus}`}>
              <div className="promo-input-wrapper">
                {promoStatus === 'valid' && <span className="promo-icon success">✔</span>}
                {promoStatus === 'invalid' && <span className="promo-icon error">✕</span>}
                {promoStatus === 'idle' && <span className="promo-icon idle">%</span>}
                <input
                  type="text"
                  placeholder="Promo code"
                  value={promoInput}
                  onChange={(e) => {
                    setPromoInput(e.target.value)
                    setPromoStatus('idle')
                  }}
                />
              </div>
              <button className="promo-apply-btn" onClick={applyPromo}>
                Apply
              </button>
            </div>

            {appliedPromo && (
              <div className="summary-line discount-line">
                <span>Discount ({appliedPromo.code})</span>
                <span>- ${discountValue.toFixed(2)}</span>
              </div>
            )}

            {/* PayPal fee shown as "Tax / Fees" so customer covers it */}
            <div className="summary-line">
              <span>Processing Fee</span>
              <span>${paypalFee.toFixed(2)}</span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <p className="shipping-note">
              Shipping costs are estimated based on the provided location. Processing fees are included to cover transaction costs.
            </p>

            <button
              className="checkout-btn"
              disabled={cartItems.length === 0}
              onClick={handleCheckoutClick}
            >
              {total <= 0 ? 'Submit test purchase' : 'Checkout'}
            </button>

          </div>
        </div>
      </div>

      {showCheckout && cartItems.length > 0 && (
        <div className="paypal-overlay" onClick={() => setShowCheckout(false)}>
          <div className="paypal-modal" onClick={(e) => e.stopPropagation()}>
            <div className="paypal-modal-header">
              <h3>Secure Checkout</h3>
              <button
                className="paypal-close"
                onClick={() => setShowCheckout(false)}
                aria-label="Close PayPal checkout"
              >
                ×
              </button>
            </div>
            <div className="paypal-modal-body">
              <PayPalCheckout
                cartItems={cartItems}
                totalPrice={total}
                itemsTotal={itemsTotal}
                shippingValue={shippingToUse}
                discountValue={discountValue}
                paypalFee={paypalFee}
                onSuccess={handleSuccessfulCheckout}
              />
            </div>
          </div>
        </div>
      )}

      {showThankYou && (
        <div className="paypal-overlay">
          <div className="paypal-modal">
            <div className="paypal-modal-header">
              <h3>Thank You</h3>
            </div>
            <div className="paypal-modal-body">
              <p>Thank you for your purchase! Redirecting you to the home page.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
