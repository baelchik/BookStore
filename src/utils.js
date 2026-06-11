export const debounce = (func, delay) => { let id; return (...args) => { clearTimeout(id); id = setTimeout(() => func(...args), delay) } }
export const formatPrice = (price) => `${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(price || 0)} сом`
export const calculateDiscount = (price, percent) => Math.round((price || 0) * (1 - (percent || 0) / 100))
export const getAverageRating = (reviews) => reviews?.length ? (reviews.reduce((s, r) => s + Number(r.rating || 0), 0) / reviews.length).toFixed(1) : 0
export const renderStars = (rating = 0) => '★'.repeat(Math.round(rating)).padEnd(5, '☆')
export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
export const validatePhone = (phone) => /^\+?[\d\s().-]{9,}$/.test(phone)
export const formatDate = (date) => new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
export const cartSubtotal = (items) => items.reduce((sum, item) => sum + (item.discount ? calculateDiscount(item.price, item.discount) : item.price) * item.quantity, 0)
