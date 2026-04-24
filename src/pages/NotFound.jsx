import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className="notfound page-transition">
      <section className="notfound-section section">
        <div className="container notfound-card">
          <h1 className="notfound-title">404</h1>
          <p className="notfound-text">The page you’re looking for doesn’t exist.</p>
          <div className="notfound-actions">
            <Link to="/" className="btn">Go Home</Link>
            <Link to="/shop" className="btn btn-ghost">Shop</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NotFound

