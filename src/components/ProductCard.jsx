import { Link } from 'react-router-dom'

function ProductCard({ product, onQuickAdd }) {
  const rating = product.rating?.rate ?? 0
  const count = product.rating?.count ?? 0

  const handleQuickAdd = (event) => {
    event.preventDefault()
    onQuickAdd(product)
  }

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__link">
        <div className="product-card__media">
          <img
            src={product.image}
            alt={product.title}
            className="product-card__image"
            loading="lazy"
          />
        </div>

        <div className="product-card__body">
          <h2 className="product-card__title">{product.title}</h2>
          <p className="product-card__rating">
            {rating.toFixed(1)} / 5 · {count} reviews
          </p>
          <p className="product-card__price">${product.price.toFixed(2)}</p>
        </div>
      </Link>

      <button type="button" className="product-card__btn" onClick={handleQuickAdd}>
        Quick Add
      </button>
    </article>
  )
}

export default ProductCard
