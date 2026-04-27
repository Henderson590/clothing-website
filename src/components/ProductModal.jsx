import React, { useMemo, useState } from 'react'
import { useCart } from '../context/CartContext'
import './ProductModal.css'

const ProductModal = ({ product, onClose }) => {
  const sizes = useMemo(() => (product.sizes && product.sizes.length > 0 ? product.sizes : ['One Size']), [product.sizes])
  const colors = useMemo(() => (product.colors && product.colors.length > 0 ? product.colors : ['Standard']), [product.colors])

  const [selectedSize, setSelectedSize] = useState(sizes[0])
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showPreOrderForm, setShowPreOrderForm] = useState(false)
  const { addToCart, setIsCartOpen } = useCart()

  const images = useMemo(() => {
    if (product.images && product.images.length > 0) return product.images
    if (product.image) return [product.image]
    return []
  }, [product.images, product.image])

  const isSurchargeSize = (size) => ['2XL', '3XL'].includes(size)
  const selectedItemSize = selectedSize || 'One Size'
  const selectedSizeSurcharge = isSurchargeSize(selectedItemSize) ? 5 : 0
  const selectedSizePrice = product.price + selectedSizeSurcharge

  const handleAddToCart = () => {
    addToCart(
      product,
      selectedItemSize,
      selectedColor || 'Standard',
      quantity
    )
    setIsCartOpen(true)
    onClose()
  }

  const handlePreOrderClick = () => {
    setShowPreOrderForm(true)
  }

  const handleQuantityChange = (delta) => {
    const newQuantity = Math.max(1, quantity + delta)
    setQuantity(newQuantity)
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const goPrev = () => {
    if (images.length === 0) return
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goNext = () => {
    if (images.length === 0) return
    setActiveImageIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ×
        </button>

        {showPreOrderForm ? (
          <PreOrderForm product={product} onClose={onClose} />
        ) : (
          <div className="modal-body">
            {/* Product Image */}
            <div className="modal-image-container">
              {images.length > 0 ? (
                <>
                  <div className="modal-image-wrapper">
                    <img src={images[activeImageIndex]} alt={product.name} className="modal-image" />
                    {images.length > 1 && (
                      <>
                        <button className="modal-nav-btn left" onClick={goPrev} aria-label="Previous image">‹</button>
                        <button className="modal-nav-btn right" onClick={goNext} aria-label="Next image">›</button>
                      </>
                    )}
                  </div>
                  {images.length > 1 && (
                    <div className="modal-thumbs">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          className={`thumb-btn ${idx === activeImageIndex ? 'active' : ''}`}
                          onClick={() => setActiveImageIndex(idx)}
                          aria-label={`View image ${idx + 1}`}
                        >
                          <img src={img} alt={`${product.name} ${idx + 1}`} />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="modal-image-placeholder">
                  {/* INSERT PRODUCT IMAGE HERE (recommended size: 1200x1200) */}
                  <p>Product Image</p>
                  <p style={{ fontSize: '14px', marginTop: '10px' }}>1200x1200</p>
                </div>
              )}
            </div>

            <div className="modal-info">
              <h2 className="modal-title">{product.name}</h2>
              {product.limitedEdition && (
                <div className="modal-limited">LIMITED EDITION</div>
              )}

              {product.preorder ? (
                <>
                  {product.description && (
                    <p className="product-description">{product.description}</p>
                  )}
                  <button className="add-to-cart-btn" onClick={handlePreOrderClick}>
                    Pre-Order
                  </button>
                </>
              ) : (
                <>
                  <p className="modal-price">${selectedSizePrice.toFixed(2)}</p>
                  {selectedSizeSurcharge > 0 && (
                    <p className="size-surcharge-note">Includes +$5 surcharge for size {selectedItemSize}</p>
                  )}

                  {/* Product Description */}
                  {product.description && (
                    <p className="product-description" style={{ whiteSpace: "pre-line" }}>{product.description}</p>
                  )}

                  {/* Size Selector */}
                  <div className="selector-group">
                    <label className="selector-label">Size</label>
                    <div className="size-selector">
                      {sizes.map(size => (
                        <button
                          key={size}
                          className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                          onClick={() => setSelectedSize(size)}

                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Selector */}
                  <div className="selector-group">
                    <label className="selector-label">Color</label>
                    <div className="color-selector">
                      {colors.map(color => (
                        <button
                          key={color}
                          className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                          onClick={() => setSelectedColor(color)}
                          style={{ backgroundColor: color.toLowerCase() }}
                          title={color}
                        >
                          {selectedColor === color && <span className="color-check">✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="selector-group">
                    <label className="selector-label">Quantity</label>
                    <div className="quantity-selector">
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(-1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="quantity-value">{quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart or Pre-Order Button */}
                  <button className="add-to-cart-btn" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductModal

