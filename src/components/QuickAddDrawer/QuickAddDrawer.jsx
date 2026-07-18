import { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext'
import { COLORS, SIZES } from '../../data/variants'
import { mockAddToCart } from '../../utils/mockApi'
import './QuickAddDrawer.scss'

function QuickAddDrawer({ product, isOpen, onClose, onAdded, onError }) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState(COLORS[0].id)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setSelectedSize('')
      setSelectedColor(COLORS[0].id)
      setQuantity(1)
      setIsAdding(false)
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

  useEffect(() => {
    const sizeData = SIZES.find((size) => size.id === selectedSize)
    const stock = sizeData?.stock ?? 0

    if (stock > 0 && quantity > stock) {
      setQuantity(stock)
    }
  }, [selectedSize, quantity])

  if (!product) return null

  const rating = product.rating?.rate ?? 0
  const count = product.rating?.count ?? 0
  const subtotal = product.price * quantity

  const selectedSizeData = SIZES.find((size) => size.id === selectedSize)
  const selectedColorData = COLORS.find((color) => color.id === selectedColor)
  const selectedStock = selectedSizeData?.stock ?? 0
  const isSoldOut = selectedStock === 0
  const isLowStock = selectedStock > 0 && selectedStock <= 5
  const canAddToCart = Boolean(selectedSize) && !isSoldOut

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const increaseQty = () => {
    if (selectedStock > 0 && quantity < selectedStock) {
      setQuantity(quantity + 1)
    }
  }

  const handleAddToCart = async () => {
    if (!canAddToCart || isAdding) return

    const safeQuantity = Math.min(quantity, selectedStock)
    setIsAdding(true)

    try {
      await mockAddToCart()

      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        size: selectedSizeData.label,
        color: selectedColorData.name,
        quantity: safeQuantity,
      })
      onClose()
      onAdded()
    } catch {
      onError?.()
    } finally {
      setIsAdding(false)
    }
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
              {SIZES.map((size) => {
                const isLow = size.stock > 0 && size.stock <= 5
                const isOut = size.stock === 0

                return (
                  <button
                    key={size.id}
                    type="button"
                    className={`quick-add__choice ${
                      selectedSize === size.id ? 'is-active' : ''
                    } ${isLow ? 'is-low' : ''} ${isOut ? 'is-soldout' : ''}`}
                    onClick={() => {
                      if (size.stock === 0) return
                      setSelectedSize(size.id)
                    }}
                    disabled={isOut}
                  >
                    {size.label}
                  </button>
                )
              })}
            </div>
            {isSoldOut && (
              <p className="quick-add__soldout">This size is sold out.</p>
            )}
            {isLowStock && (
              <p className="quick-add__low-stock">
                Only {selectedStock} left in stock
              </p>
            )}
          </div>

          <div className="quick-add__option">
            <p className="quick-add__label">Quantity</p>
            <div className="quick-add__qty">
              <button
                type="button"
                onClick={decreaseQty}
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={increaseQty}
                aria-label="Increase quantity"
                disabled={!selectedStock || quantity >= selectedStock}
              >
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
            disabled={!canAddToCart || isAdding}
            onClick={handleAddToCart}
          >
            {isAdding
              ? 'Adding...'
              : !selectedSize
                ? 'Select a size'
                : isSoldOut
                  ? 'Sold Out'
                  : 'Add to Cart'}
          </button>
        </div>
      </aside>
    </>
  )
}

export default QuickAddDrawer
