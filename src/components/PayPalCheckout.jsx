// src/components/PayPalCheckout.jsx
import React, { useEffect, useRef } from 'react'
import './PayPalCheckout.css'

const CURRENCY = 'USD'

const PayPalCheckout = ({ cartItems, totalPrice, itemsTotal, shippingValue, discountValue = 0, paypalFee = 0, onSuccess }) => {
  const paypalRef = useRef(null)

  // Calculate totals
  const computedItemsTotal = itemsTotal != null
    ? itemsTotal
    : cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const effectiveShipping = shippingValue != null
    ? shippingValue
    : Math.max(0, totalPrice - computedItemsTotal + discountValue)

  const effectiveDiscount = Math.max(0, discountValue || 0)

  useEffect(() => {
    if (window.paypal) {
      if (paypalRef.current) {
        paypalRef.current.innerHTML = ''
      }

      const buttons = window.paypal.Buttons({
        createOrder: function (data, actions) {
          // Read buyer & shipping info saved in localStorage by CartPage
          let checkoutMeta = null
          try {
            checkoutMeta = JSON.parse(localStorage.getItem('checkoutFormData'))
          } catch (e) {
            checkoutMeta = null
          }

          const buyer = (checkoutMeta && checkoutMeta.form) ? checkoutMeta.form : {}
          const shippingFromStorage = (checkoutMeta && typeof checkoutMeta.shipping === 'number') ? checkoutMeta.shipping : effectiveShipping
          const paypalFeeFromStorage = (checkoutMeta && typeof checkoutMeta.paypalFee === 'number') ? checkoutMeta.paypalFee : paypalFee

          // Format each item to show on PayPal
          const paypalItems = cartItems.map(item => ({
            name: `${item.name} - Size: ${item.size} - Color: ${item.color}`,
            quantity: item.quantity.toString(),
            unit_amount: {
              currency_code: CURRENCY,
              value: item.price.toFixed(2)
            }
          }))

          const purchaseUnit = {
            purchase_units: [
              {
                description: `Order for ${buyer.firstName || ''} ${buyer.lastName || ''}`.trim() || `Order of ${cartItems.length} item(s)`,
                custom_id: `${buyer.firstName || ''} ${buyer.lastName || ''} - ${buyer.emailOrPhone || ''}`.trim(),

                amount: {
                  currency_code: CURRENCY,
                  value: totalPrice.toFixed(2),
                  breakdown: {
                    item_total: {
                      currency_code: CURRENCY,
                      value: computedItemsTotal.toFixed(2)
                    },
                    shipping: {
                      currency_code: CURRENCY,
                      value: (shippingFromStorage || 0).toFixed(2)
                    },
                    discount: {
                      currency_code: CURRENCY,
                      value: effectiveDiscount.toFixed(2)
                    },
                    tax_total: {
                      currency_code: CURRENCY,
                      value: Number((paypalFeeFromStorage || 0).toFixed(2))
                    }
                  }
                },

                items: paypalItems
              }
            ]
          }

          // Include shipping address if we have it from the form (this populates PayPal receipt)
          if (buyer && (buyer.address || buyer.city || buyer.state || buyer.zip)) {
            purchaseUnit.purchase_units[0].shipping = {
              name: {
                full_name: `${buyer.firstName || ''} ${buyer.lastName || ''}`.trim()
              },
              address: {
                address_line_1: buyer.address || '',
                admin_area_2: buyer.city || '',
                admin_area_1: buyer.state || '',
                postal_code: buyer.zip || '',
                country_code: 'US'
              }
            }
          }

          return actions.order.create(purchaseUnit)
        },

        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            console.log("Payment completed:", details)
            if (onSuccess) {
              onSuccess()
            }
          })
        },

        onError: function (err) {
          console.error("PayPal error:", err)
        },

        style: {
          layout: 'vertical',
          color: 'black',
          shape: 'rect',
          label: 'paypal'
        }
      })

      buttons.render(paypalRef.current)

      return () => {
        if (buttons.close) {
          buttons.close()
        } else if (paypalRef.current) {
          paypalRef.current.innerHTML = ''
        }
      }
    } else {
      console.error('PayPal SDK not loaded. Make sure to include the script in index.html')
    }
  }, [
    cartItems,
    totalPrice,
    onSuccess,
    itemsTotal,
    effectiveShipping,
    effectiveDiscount,
    paypalFee
  ])

  return (
    <div className="paypal-checkout">
      <div className="order-summary">
        <h3>Order Summary</h3>

        {cartItems.map(item => (
          <div key={`${item.id}-${item.size}-${item.color}`} className="order-item">
            <span>
              {item.name} ({item.size}, {item.color}) × {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <div className="order-total">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div ref={paypalRef} className="paypal-buttons"></div>

      <p className="paypal-note">Secure checkout powered by PayPal</p>
    </div>
  )
}

export default PayPalCheckout
