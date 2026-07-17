import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import { getProducts } from '../services/api'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
    <section className="product-list">
      <h1 className="product-list__heading">Products</h1>
      <div className="product-list__grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default Home
