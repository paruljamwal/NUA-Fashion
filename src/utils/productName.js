export function getProductName(product) {
  const title = product.title || ''
  const shortTitle = title.split(',')[0].trim()

  return shortTitle || title
}

export function getProductSubtitle(product) {
  return product.category || ''
}
