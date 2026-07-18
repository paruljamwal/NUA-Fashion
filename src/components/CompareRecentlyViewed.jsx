import { Link } from 'react-router-dom'
import { COLORS, SIZES } from '../data/variants'
import { getProductName } from '../utils/productName'

function CompareRecentlyViewed({ items }) {
  if (!items || items.length < 2) return null

  return (
    <section className="compare">
      <h2 className="compare__heading">Compare Recently Viewed</h2>
      <div className="compare__grid">
        {items.map((item) => {
          const name = getProductName(item.product)
          const colorName = COLORS.find((color) => color.id === item.color)?.name
          const sizeLabel = SIZES.find((size) => size.id === item.size)?.label
          const rating = item.product.rating?.rate ?? 0
          const count = item.product.rating?.count ?? 0
          const viewTo =
            item.color && item.size
              ? `/product/${item.product.id}?color=${item.color}&size=${item.size}`
              : `/product/${item.product.id}`

          return (
            <article key={item.product.id} className="compare__card">
              <div className="compare__media">
                <img
                  src={item.product.image}
                  alt={name}
                  className="compare__image"
                  loading="lazy"
                />
              </div>

              <div className="compare__info">
                <h3 className="compare__title">{name}</h3>
                <p className="compare__category">{item.product.category}</p>
                <p className="compare__price">${item.product.price.toFixed(2)}</p>
                <p className="compare__rating">
                  {rating.toFixed(1)} / 5 · {count} reviews
                </p>
                {(colorName || sizeLabel) && (
                  <div className="compare__meta-row">
                    {colorName && <span>Color: {colorName}</span>}
                    {sizeLabel && <span>Size: {sizeLabel}</span>}
                  </div>
                )}
                <Link to={viewTo} className="compare__btn">
                  View Product
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default CompareRecentlyViewed
