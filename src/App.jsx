import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Support from './pages/Support'
import CartPage from './pages/CartPage'
import NotFound from './pages/NotFound'
import { CartProvider } from './context/CartContext'
import './App.css'

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/support" element={<Support />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App

