const CART_KEY = 'bookstore_cart'
const WISHLIST_KEY = 'bookstore_wishlist'
const USER_KEY = 'bookstore_user'
const USERS_KEY = 'bookstore_users'
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback } }
const write = (key, value) => { localStorage.setItem(key, JSON.stringify(value)); window.dispatchEvent(new Event('bookstore:update')); return value }
export const getCart = () => read(CART_KEY, [])
export const addToCart = (book) => { const cart = getCart(); const item = cart.find(i => i.id === book.id); item ? item.quantity += 1 : cart.push({ ...book, quantity: 1 }); return write(CART_KEY, cart) }
export const removeFromCart = (bookId) => write(CART_KEY, getCart().filter(i => i.id !== bookId))
export const updateCartQuantity = (bookId, quantity) => quantity <= 0 ? removeFromCart(bookId) : write(CART_KEY, getCart().map(i => i.id === bookId ? { ...i, quantity } : i))
export const clearCart = () => write(CART_KEY, [])
export const getWishlist = () => read(WISHLIST_KEY, [])
export const addToWishlist = (book) => write(WISHLIST_KEY, getWishlist().some(i => i.id === book.id) ? getWishlist() : [...getWishlist(), book])
export const removeFromWishlist = (bookId) => write(WISHLIST_KEY, getWishlist().filter(i => i.id !== bookId))
export const isInWishlist = (bookId) => getWishlist().some(i => String(i.id) === String(bookId))
export const getUser = () => read(USER_KEY, null)
export const setUser = (user) => write(USER_KEY, user)
export const clearUser = () => { localStorage.removeItem(USER_KEY); window.dispatchEvent(new Event('bookstore:update')) }
export const getUsers = () => read(USERS_KEY, [])
export const registerByEmail = ({ name, email }) => {
  const normalizedEmail = String(email || '').trim().toLowerCase()
  const users = getUsers()
  const existing = users.find(user => user.email === normalizedEmail)
  const user = existing
    ? { ...existing, name: name.trim() || existing.name }
    : { id: Date.now(), name: name.trim(), email: normalizedEmail, createdAt: new Date().toISOString() }
  const nextUsers = existing
    ? users.map(item => item.email === normalizedEmail ? user : item)
    : [...users, user]
  write(USERS_KEY, nextUsers)
  return setUser(user)
}
