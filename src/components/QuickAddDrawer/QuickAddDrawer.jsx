import { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext'
import { COLORS, SIZES } from '../../data/variants'
import './QuickAddDrawer.scss'

function QuickAddDrawer({ product, isOpen, onClose, onAdded }) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState(COLORS[0].id)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (isOpen) {
      setSelectedSize('')
      setSelectedColor(COLORS[0].id)
      setQuantity(1)
    }
  }, [isOpen, product?.id])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!product) return null

  const rating = product.rating?.rate ?? 0
  const count = product.rating?.count ?? 0
  const subtotal = product.price * quantity

  const selectedSizeData = SIZES.find((size) => size.id === selectedSize)
  const selectedColorData = COLORS.find((color) => color.id === selectedColor)
  const isSoldOut = selectedSizeData && !selectedSizeData.inStock
  const canAddToCart = Boolean(selectedSize) && !isSoldOut

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const increaseQty = () => {
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
    onClose()
    onAdded()
  }

  return (
    <>
      <div
        className={`quick-add__overlay ${isOpen ? 'is-open' : ''}`}
        onClick={onClose}
      />

      <aside
        className={`quick-add ${isOpen ? 'is-open' : ''}`}
        aria-hidden={!isOpen}
      >
        <div className="quick-add__header">
          <h2 className="quick-add__title">{product.title}</h2>
          <button
            type="button"
            className="quick-add__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="quick-add__body">
          <div className="quick-add__media">
            <img src={product.image} alt={product.title} />
          </div>

          <p className="quick-add__price">${product.price.toFixed(2)}</p>
          <p className="quick-add__rating">
            {rating.toFixed(1)} / 5 · {count} reviews
          </p>

          <div className="quick-add__option">
            <p className="quick-add__label">
              Color: {selectedColorData?.name}
            </p>
            <div className="quick-add__colors">
              {COLORS.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  className={`quick-add__color ${
                    selectedColor === color.id ? 'is-active' : ''
                  }`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.name}
                  onClick={() => setSelectedColor(color.id)}
                />
              ))}
            </div>
          </div>

          <div className="quick-add__option">
            <p className="quick-add__label">Size</p>
            <div className="quick-add__choices">
              {SIZES.map((size) => (
                <button
                  key={size.id}
                  type="button"
                  className={`quick-add__choice ${
                    selectedSize === size.id ? 'is-active' : ''
                  } ${!size.inStock ? 'is-soldout' : ''}`}
                  onClick={() => setSelectedSize(size.id)}
                >
                  {size.label}
                </button>
              ))}
            </div>
            {isSoldOut && (
              <p className="quick-add__soldout">This size is sold out.</p>
            )}
          </div>

          <div className="quick-add__option">
            <p className="quick-add__label">Quantity</p>
            <div className="quick-add__qty">
              <button type="button" onClick={decreaseQty} aria-label="Decrease quantity">
                −
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={increaseQty} aria-label="Increase quantity">
                +
              </button>
            </div>
          </div>
        </div>

        <div className="quick-add__footer">
          <div className="quick-add__subtotal">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button
            type="button"
            className="quick-add__submit"
            disabled={!canAddToCart}
            onClick={handleAddToCart}
          >
            {!selectedSize ? 'Select a size' : isSoldOut ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </aside>
    </>
  )
}

export default QuickAddDrawer
