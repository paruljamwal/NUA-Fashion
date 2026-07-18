const STORAGE_KEY = 'nua-recently-viewed'

export function getRecentlyViewed() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function addRecentlyViewed(entry) {
  const id = Number(entry.id)
  if (!id) return

  const current = getRecentlyViewed().filter((item) => Number(item.id) !== id)

  current.push({
    id,
    color: entry.color || '',
    size: entry.size || '',
  })

  localStorage.setItem(STORAGE_KEY, JSON.stringify(current.slice(-2)))
}
