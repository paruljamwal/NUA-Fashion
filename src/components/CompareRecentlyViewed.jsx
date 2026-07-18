import { Link } from 'react-router-dom'
import { COLORS, SIZES } from '../data/variants'
import { getProductName, getProductSubtitle } from '../utils/productName'

function CompareCard({ item, isCheaper, isHigherRated }) {
  const product = item.product
  const name = getProductName(product)
  const category = getProductSubtitle(product)
  const colorData = COLORS.find((color) => color.id === item.color)
  const sizeLabel = SIZES.find((size) => size.id === item.size)?.label
  const rating = product.rating?.rate ?? 0
  const count = product.rating?.count ?? 0
  const viewTo =
    item.color && item.size
      ? `/product/${product.id}?color=${item.color}&size=${item.size}`
      : `/product/${product.id}`

  return (
    <article className="product-card compare__card">
      <div className="compare__tags">
        {isCheaper && <span className="compare__tag">Better price</span>}
        {isHigherRated && (
          <span className="compare__tag compare__tag--rating">
            Higher rated
          </span>
        )}
      </div>

      <div className="product-card__media">
        <img
          src={product.image}
          alt={name}
          className="product-card__image"
          loading="lazy"
        />
      </div>

      <div className="product-card__info">
        <h3 className="product-card__title">{name}</h3>
        {category && <p className="product-card__subtitle">{category}</p>}

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
          </p>
        </div>

        <div className="compare__variants">
          {colorData && (
            <span className="compare__variant">
              <span
                className="compare__swatch"
                style={{ backgroundColor: colorData.hex }}
                aria-hidden="true"
              />
              {colorData.name}
            </span>
          )}
          {sizeLabel && (
            <span className="compare__variant">Size {sizeLabel}</span>
          )}
        </div>
      </div>

      <Link to={viewTo} className="product-card__btn">
        View Product
      </Link>
    </article>
  )
}

function CompareRecentlyViewed({ items }) {
  if (!items || items.length < 2) return null

  const [left, right] = items
  const leftPrice = left.product.price
  const rightPrice = right.product.price
  const leftRating = left.product.rating?.rate ?? 0
  const rightRating = right.product.rating?.rate ?? 0
  const priceDiff = Math.abs(leftPrice - rightPrice)
  const cheaperId =
    leftPrice === rightPrice
      ? null
      : leftPrice < rightPrice
        ? left.product.id
        : right.product.id
  const higherRatedId =
    leftRating === rightRating
      ? null
      : leftRating > rightRating
        ? left.product.id
        : right.product.id

  return (
    <section className="compare">
      <div className="compare__header">
        <h2 className="compare__heading">Compare Recently Viewed</h2>
        <p className="compare__subtitle">
          Side-by-side look at your last two picks
        </p>
      </div>

      <div className="compare__stage">
        <CompareCard
          item={left}
          isCheaper={cheaperId === left.product.id}
          isHigherRated={higherRatedId === left.product.id}
        />

        <span className="compare__vs" aria-hidden="true">
          VS
        </span>

        <CompareCard
          item={right}
          isCheaper={cheaperId === right.product.id}
          isHigherRated={higherRatedId === right.product.id}
        />
      </div>

      <div className="compare__summary">
        <div className="compare__summary-item">
          <span className="compare__summary-label">Price difference</span>
          <span className="compare__summary-value">
            {priceDiff === 0 ? 'Same price' : `$${priceDiff.toFixed(2)}`}
          </span>
        </div>
        <div className="compare__summary-item">
          <span className="compare__summary-label">Rating difference</span>
          <span className="compare__summary-value">
            {leftRating === rightRating
              ? 'Same rating'
              : `${Math.abs(leftRating - rightRating).toFixed(1)} pts`}
          </span>
        </div>
      </div>
    </section>
  )
}

export default CompareRecentlyViewed
