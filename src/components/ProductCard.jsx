import React from 'react'
import './ProductCard.css'

const ProductCard = ({ product, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(product)
    }
  }

  const primaryImage = product.images && product.images.length > 0 ? product.images[0] : product.image

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image-container">
        {primaryImage ? (
          <img src={primaryImage} alt={product.name} className="product-image" />
        ) : (
          <div className="product-image-placeholder">
            {/* INSERT PRODUCT IMAGE HERE (recommended size: 1200x1200) */}
            <p>Image Placeholder</p>
            <p style={{ fontSize: '12px', marginTop: '5px' }}>1200x1200</p>
          </div>
        )}
      </div>
      <div className="product-info">
        {product.limitedEdition && (
          <p className="product-limited">LIMITED EDITION</p>
        )}
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default ProductCard

