import React from 'react'
import { useCart } from '../context/CartContext'

function CartDrawer({ isOpen, onClose }) {
  const { items, removeItem, changeQty, subtotal } = useCart()

  const grandTotal = subtotal

  return (
    <>
      <div
        className={`cart-drawer__overlay ${isOpen ? 'is-open' : ''}`}
        onClick={onClose}
      />

      <aside className={`cart-drawer ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">Your Cart</h2>
          <button
            type="button"
            className="cart-drawer__close"
            onClick={onClose}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <p className="cart-drawer__empty">Your cart is empty.</p>
          ) : (
            <ul className="cart-drawer__list">
              {items.map((item) => (
                <li
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="cart-drawer__item"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-drawer__image"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="cart-drawer__details">
                    <h3 className="cart-drawer__name">{item.title}</h3>
                    <p className="cart-drawer__meta">Size: {item.size}</p>
                    <p className="cart-drawer__meta">Color: {item.color}</p>
                    <p className="cart-drawer__price">${item.price.toFixed(2)}</p>

                    <div className="cart-drawer__actions">
                      <div className="cart-drawer__qty">
                        <button
                          type="button"
                          onClick={() =>
                            changeQty(item.id, item.size, item.color, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() =>
                            changeQty(item.id, item.size, item.color, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="cart-drawer__remove"
                        onClick={() => removeItem(item.id, item.size, item.color)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="cart-drawer__footer">
          <div className="cart-drawer__row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="cart-drawer__row cart-drawer__row--total">
            <span>Grand Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </aside>
    </>
  )
}

export default React.memo(CartDrawer)
