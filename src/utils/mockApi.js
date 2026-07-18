export function mockAddToCart() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 80% chance of success, 20% chance of failure
      const chance = Math.floor(Math.random() * 10) + 1
      // If the chance is 8 or less, the item is added to the cart
      // Otherwise, the item is not added to the cart
      if (chance <= 8) {
        resolve()
      } else {
        reject(new Error('Unable to add item. Please try again.'))
      }
    }, 1200) // 1.2 seconds delay
  })
}
