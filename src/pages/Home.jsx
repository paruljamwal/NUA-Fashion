import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import QuickAddDrawer from '../components/QuickAddDrawer/QuickAddDrawer'
import { getProducts } from '../services/api'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const fetchProducts = () => {
    setLoading(true)
    setError(null)

    getProducts()
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Something went wrong.')
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (!toastMessage) return

    const timer = setTimeout(() => {
      setToastMessage('')
    }, 2000)

    return () => clearTimeout(timer)
  }, [toastMessage])

  const filteredProducts = useMemo(() => {
    const query = searchText.trim().replace(/\s+/g, ' ').toLowerCase()

    if (!query) return products

    return products.filter((product) => {
      const title = product.title.toLowerCase()
      const category = product.category.toLowerCase()
      const description = product.description.toLowerCase()
      const price = String(product.price)

      return (
        title.includes(query) ||
        category.includes(query) ||
        description.includes(query) ||
        price.includes(query)
      )
    })
  }, [products, searchText])

  const openQuickAdd = (product) => {
    setSelectedProduct(product)
    setIsQuickAddOpen(true)
  }

  const closeQuickAdd = () => {
    setIsQuickAddOpen(false)
  }

  const handleAdded = () => {
    setToastMessage('Added to cart')
  }

  const handleAddError = () => {
    setToastMessage('Unable to add item. Please try again.')
  }

  if (loading) {
    return (
      <section className="product-list">
        <h1 className="product-list__heading">Products</h1>
        <div className="product-list__grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <div className="page-status page-status--error">
        <p>{error}</p>
        <button type="button" className="page-status__retry" onClick={fetchProducts}>
          Retry
        </button>
      </div>
    )
  }

  return (
    <>
      <section className="product-list">
        <div className="product-list__header">
          <h1 className="product-list__heading">Products</h1>
          <label className="product-list__search">
            <svg
              className="product-list__search-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              type="text"
              className="product-list__search-input"
              placeholder="Search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              aria-label="Search products"
            />
            {searchText && (
              <button
                type="button"
                className="product-list__search-clear"
                onClick={() => setSearchText('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </label>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="product-list__empty">
            <p className="product-list__empty-title">No products found</p>
            <p className="product-list__empty-text">
              Try a different search, or view all products.
            </p>
            <button
              type="button"
              className="product-list__empty-btn"
              onClick={() => setSearchText('')}
            >
              View all
            </button>
          </div>
        ) : (
          <div className="product-list__grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickAdd={openQuickAdd}
              />
            ))}
          </div>
        )}
      </section>

      <QuickAddDrawer
        product={selectedProduct}
        isOpen={isQuickAddOpen}
        onClose={closeQuickAdd}
        onAdded={handleAdded}
        onError={handleAddError}
      />

      {toastMessage && (
        <div className="cart-toast" role="status">
          {toastMessage}
        </div>
      )}
    </>
  )
}

export default Home
