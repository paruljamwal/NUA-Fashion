function ProductCardSkeleton() {
  return (
    <article className="product-card-skeleton">
      <div className="product-card-skeleton__media" />
      <div className="product-card-skeleton__body">
        <div className="product-card-skeleton__line product-card-skeleton__line--title" />
        <div className="product-card-skeleton__line product-card-skeleton__line--title-short" />
        <div className="product-card-skeleton__line product-card-skeleton__line--price" />
        <div className="product-card-skeleton__btn" />
      </div>
    </article>
  )
}

export default ProductCardSkeleton
