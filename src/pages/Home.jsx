import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import QuickAddDrawer from '../components/QuickAddDrawer/QuickAddDrawer'
import { getProducts } from '../services/api'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
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
        <h1 className="product-list__heading">Products</h1>
        <div className="product-list__grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickAdd={openQuickAdd}
            />
          ))}
        </div>
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
