import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addItem = (product) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
      )

      if (existing) {
        return prev.map((item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        )
      }

      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          size: product.size,
          color: product.color,
          quantity: product.quantity || 1,
        },
      ]
    })
  }

  const removeItem = (id, size, color) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && item.size === size && item.color === color)
      )
    )
  }

  const changeQty = (id, size, color, quantity) => {
    if (quantity < 1) return

    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    )
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        changeQty,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }

  return context
}
