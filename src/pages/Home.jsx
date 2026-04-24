import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { products, getFeaturedProducts } from '../data/products'
import ProductCard from '../components/ProductCard'
import './Home.css'

const Home = () => {
  const activeProducts = useMemo(() => products.filter(p => !p.disabled), [])
  const featuredProducts = useMemo(() => getFeaturedProducts(activeProducts), [activeProducts])
  const newArrivals = useMemo(
    () => activeProducts.filter(p => p.newArrival).slice(0, 3),
    [activeProducts]
  )

  return (
    <div className="home page-transition">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-image">
          <img src="src/images/hero image.png" alt="Hero" />
        </div>
        <div className="hero-content">
          <h1 className="hero-headline">Handcrafted Clothing. Made Local.</h1>
          <div className="hero-text">
            <p>Define Defiance collection out now!</p>
          </div>
          <Link to="/shop" className="btn shop-now-btn">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section section">
        <div className="container">
          <h2 className="section-title">New Arrivals</h2>
          {newArrivals.length > 0 ? (
            <div className="products-grid">
              {newArrivals.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p>No new arrivals yet.</p>
          )}
        </div>
      </section>

      {/* <section className="featured-section section">
        <div className="container">
          <h2 className="section-title">Our Favorites</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section> */}
    </div>
  )
}

export default Home

