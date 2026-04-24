import React, { useMemo, useState } from 'react'
import { products, getCategoryData } from '../data/products'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import './Shop.css'

const Shop = () => {
  const activeProducts = useMemo(() => products.filter(p => !p.disabled), [])
  const [selectedCategory, setSelectedCategory] = useState('All') // now acts as selected group
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isGroupDrawerOpen, setIsGroupDrawerOpen] = useState(false)
  const [activeGroups, setActiveGroups] = useState(new Set())
  const [activeGroupCategories, setActiveGroupCategories] = useState({})

  const { categories, groups } = useMemo(() => getCategoryData(activeProducts), [activeProducts])
  const topCategories = useMemo(() => ['All', ...Object.keys(groups)], [groups])

  const hasGroupFilters = useMemo(() => {
    if (activeGroups.size > 0) return true
    return Object.values(activeGroupCategories).some(set => set && set.size > 0)
  }, [activeGroups, activeGroupCategories])

  const filteredProducts = useMemo(() => {
    return activeProducts.filter(product => {
      // Main selection now filters by categoryGroup (top buttons)
      const matchesCategory = selectedCategory === 'All' || product.categoryGroup === selectedCategory

      // Group filter (multi-select)
      if (!hasGroupFilters) {
        return matchesCategory
      }

      const groupActive = activeGroups.has(product.categoryGroup)
      const categorySet = activeGroupCategories[product.categoryGroup]
      const categoryActive = categorySet && categorySet.size > 0 ? categorySet.has(product.category) : true

      return matchesCategory && groupActive && categoryActive
    })
  }, [selectedCategory, hasGroupFilters, activeGroups, activeGroupCategories])

  const handleProductClick = (product) => {
    setSelectedProduct(product)
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
  }

  const toggleGroup = (group) => {
    setActiveGroups(prev => {
      const next = new Set(prev)
      if (next.has(group)) {
        next.delete(group)
      } else {
        next.add(group)
      }
      return next
    })
  }

  const toggleCategoryInGroup = (group, category) => {
    setActiveGroupCategories(prev => {
      const currentSet = prev[group] ? new Set(prev[group]) : new Set()
      if (currentSet.has(category)) {
        currentSet.delete(category)
      } else {
        currentSet.add(category)
      }
      return { ...prev, [group]: currentSet }
    })
    // Ensure the parent group is active when a category under it is toggled on
    setActiveGroups(prev => {
      const next = new Set(prev)
      next.add(group)
      return next
    })
  }

  const clearGroupFilters = () => {
    setActiveGroups(new Set())
    setActiveGroupCategories({})
  }

  return (
    <div className="shop page-transition">
      <section className="shop-section section">
        <div className="container">
          <h1 className="page-title">Shop</h1>

          {/* Category Filter */}
          <div className="category-filter">
            <button
              className="category-group-toggle"
              onClick={() => setIsGroupDrawerOpen(true)}
              aria-label="Open category groups"
            >
              ☰
            </button>
            {topCategories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={handleProductClick}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-products">
              <p>No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}

      {/* Group Drawer */}
      {isGroupDrawerOpen && (
        <div className="group-drawer-overlay" onClick={() => setIsGroupDrawerOpen(false)}>
          <div className="group-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="group-drawer-header">
              <h3>Filter by Collection</h3>
              <button className="drawer-close" onClick={() => setIsGroupDrawerOpen(false)} aria-label="Close group filter">
                ×
              </button>
            </div>
            <div className="group-drawer-body">
              {Object.keys(groups).length === 0 && (
                <p className="group-empty">No grouped categories yet.</p>
              )}
              {Object.entries(groups).map(([group, cats]) => (
                <div key={group} className="group-block">
                  <label className="group-label">
                    <span>{group}</span>
                  </label>
                  <div className="group-categories">
                    {cats.map(cat => (
                      <label key={cat} className="group-category-label">
                        <input
                          type="checkbox"
                          checked={!!(activeGroupCategories[group] && activeGroupCategories[group].has(cat))}
                          onChange={() => toggleCategoryInGroup(group, cat)}
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="group-drawer-footer">
              <button className="clear-groups-btn" onClick={clearGroupFilters}>
                Clear group filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Shop

