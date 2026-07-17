import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../services/api'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p className="page-status">Loading products...</p>
  }

  if (error) {
    return <p className="page-status page-status--error">{error}</p>
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
