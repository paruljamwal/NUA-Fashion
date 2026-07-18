import { Link } from 'react-router-dom'
import { getProductName, getProductSubtitle } from '../utils/productName'

function ProductCard({ product, onQuickAdd }) {
  const rating = product.rating?.rate ?? 0
  const count = product.rating?.count ?? 0
  const name = getProductName(product)
  const subtitle = getProductSubtitle(product)

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
            alt={name}
            className="product-card__image"
            loading="lazy"
          />
        </div>

        <div className="product-card__info">
          <h2 className="product-card__title">{name}</h2>
          {subtitle && <p className="product-card__subtitle">{subtitle}</p>}

          <div className="product-card__row">
            <p className="product-card__rating">
              <svg
                className="product-card__star"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.4l1.1-6.5L2.6 9.3l6.5-.9L12 2.5z"
                />
              </svg>
              <span>{rating.toFixed(1)}</span>
              {count > 0 && (
                <span className="product-card__count">({count})</span>
              )}
            </p>
            <p className="product-card__price">
              <span className="product-card__price-current">
                ${product.price.toFixed(2)}
              </span>
              <span className="product-card__price-old">
                ${(product.price * 1.25).toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </Link>

      <button type="button" className="product-card__btn" onClick={handleQuickAdd}>
        Quick Add
      </button>
    </article>
  )
}

export default ProductCard
