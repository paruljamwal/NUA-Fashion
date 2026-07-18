import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getProductById } from '../services/api'
import { useCart } from '../context/CartContext'
import { COLORS, SIZES } from '../data/variants'

const BRANDS = ['NUA Atelier', 'Studio NUA', 'Maison Lane', 'Cove & Co']
const DEFAULT_COLOR = COLORS[0].id
const DEFAULT_SIZE = 's'

function Product() {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const colorParam = searchParams.get('color')
  const sizeParam = searchParams.get('size')

  const selectedColor = COLORS.some((color) => color.id === colorParam)
    ? colorParam
    : DEFAULT_COLOR
  const selectedSize = SIZES.some((size) => size.id === sizeParam)
    ? sizeParam
    : DEFAULT_SIZE

  useEffect(() => {
    if (colorParam !== selectedColor || sizeParam !== selectedSize) {
      setSearchParams(
        { color: selectedColor, size: selectedSize },
        { replace: true }
      )
    }
  }, [colorParam, sizeParam, selectedColor, selectedSize, setSearchParams])

  useEffect(() => {
    setLoading(true)
    setError(null)
    setActiveImageIndex(0)
    setQuantity(1)

    getProductById(id)
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="page-status">
        <span className="spinner" aria-label="Loading" />
      </div>
    )
  }

  if (error) {
    return <p className="page-status page-status--error">{error}</p>
  }

  if (!product) {
    return <p className="page-status">Product not found.</p>
  }

  const brand = BRANDS[product.id % BRANDS.length]
  const oldPrice = (product.price * 1.25).toFixed(2)
  const rating = product.rating?.rate ?? 0
  const count = product.rating?.count ?? 0
  const gallery = [product.image, product.image, product.image, product.image]

  const selectedSizeData = SIZES.find((size) => size.id === selectedSize)
  const selectedColorData = COLORS.find((color) => color.id === selectedColor)
  const isSoldOut = selectedSizeData && !selectedSizeData.inStock
  const canAddToCart = Boolean(selectedSize) && !isSoldOut

  const updateColor = (color) => {
    setSearchParams({ color, size: selectedSize })
  }

  const updateSize = (size) => {
    setSearchParams({ color: selectedColor, size })
  }

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    if (!canAddToCart) return

    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      size: selectedSizeData.label,
      color: selectedColorData.name,
      quantity,
    })
  }

  return (
    <section className="product-detail">
      <div className="product-detail__gallery">
        <div className="product-detail__thumbs">
          {gallery.map((image, index) => (
            <button
              key={index}
              type="button"
              className={`product-detail__thumb ${
                activeImageIndex === index ? 'is-active' : ''
              }`}
              onClick={() => setActiveImageIndex(index)}
            >
              <img
                src={image}
                alt={`${product.title} view ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>

        <div className="product-detail__main-image">
          <img
            src={gallery[activeImageIndex]}
            alt={product.title}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className="product-detail__info">
        <p className="product-detail__brand">{brand}</p>
        <h1 className="product-detail__title">{product.title}</h1>

        <p className="product-detail__rating">
          {rating.toFixed(1)} / 5 · {count} reviews
        </p>

        <div className="product-detail__pricing">
          <span className="product-detail__price">${product.price.toFixed(2)}</span>
          <span className="product-detail__old-price">${oldPrice}</span>
        </div>

        <div className="product-detail__option">
          <p className="product-detail__label">
            Color: {selectedColorData?.name}
          </p>
          <div className="product-detail__colors">
            {COLORS.map((color) => (
              <button
                key={color.id}
                type="button"
                className={`product-detail__color ${
                  selectedColor === color.id ? 'is-active' : ''
                }`}
                style={{ backgroundColor: color.hex }}
                aria-label={color.name}
                onClick={() => updateColor(color.id)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail__option">
          <p className="product-detail__label">Size</p>
          <div className="product-detail__sizes">
            {SIZES.map((size) => (
              <button
                key={size.id}
                type="button"
                className={`product-detail__size ${
                  selectedSize === size.id ? 'is-active' : ''
                } ${!size.inStock ? 'is-soldout' : ''}`}
                onClick={() => updateSize(size.id)}
              >
                {size.label}
              </button>
            ))}
          </div>
          {isSoldOut && (
            <p className="product-detail__soldout">This size is sold out.</p>
          )}
        </div>

        <div className="product-detail__option">
          <p className="product-detail__label">Quantity</p>
          <div className="product-detail__qty">
            <button type="button" onClick={decreaseQuantity} aria-label="Decrease quantity">
              −
            </button>
            <span>{quantity}</span>
            <button type="button" onClick={increaseQuantity} aria-label="Increase quantity">
              +
            </button>
          </div>
        </div>

        <button
          type="button"
          className="product-detail__add"
          disabled={!canAddToCart}
          onClick={handleAddToCart}
        >
          {isSoldOut ? 'Sold Out' : 'Add to Cart'}
        </button>
      </div>
    </section>
  )
}

export default Product
