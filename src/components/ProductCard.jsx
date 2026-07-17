function ProductCard({ product }) {
  return (
    <article className="product-card">
      <img
        src={product.image}
        alt={product.title}
        className="product-card__image"
        loading="lazy"
      />
      <h2 className="product-card__title">{product.title}</h2>
      <p className="product-card__price">${product.price}</p>
    </article>
  )
}

export default ProductCard
