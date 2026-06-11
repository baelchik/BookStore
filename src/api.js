import axios from 'axios'
import { books, categories, reviews as seedReviews } from './data/books'

const API_BASE = '/api'
let localReviews = [...seedReviews]
let localOrders = []
const delay = (value) => new Promise(resolve => setTimeout(() => resolve(value), 120))
const normalize = (value) => String(value || '').toLowerCase().trim()
const sortBooks = (items, params = {}) => {
  const sorted = [...items]
  const field = params._sort
  const order = params._order === 'desc' ? -1 : 1
  if (field) sorted.sort((a, b) => (a[field] > b[field] ? 1 : -1) * order)
  return sorted
}
const toArray = (value, key) => {
  if (Array.isArray(value)) return value
  if (Array.isArray(value?.[key])) return value[key]
  if (Array.isArray(value?.data)) return value.data
  return null
}

const request = async (path, options = {}) => {
  try {
    const { data } = await axios({ url: `${API_BASE}${path}`, ...options })
    return typeof data === 'object' && data !== null ? data : null
  } catch {
    return null
  }
}

export const getBooks = async (params = {}) => {
  const remote = await request('/books', { params })
  const remoteBooks = toArray(remote, 'books')
  if (remoteBooks) return remoteBooks
  let result = [...books]
  if (params.category) result = result.filter(b => b.category === params.category)
  if (params.q) {
    const q = normalize(params.q)
    result = result.filter(b => normalize(`${b.title} ${b.author} ${b.category}`).includes(q))
  }
  return delay(sortBooks(result, params))
}

export const getBookById = async (id) => {
  const remote = await request(`/books/${id}`)
  return remote || delay(books.find(book => String(book.id) === String(id)) || null)
}

export const searchBooks = (query) => getBooks({ q: query, _sort: 'title' })
export const getCategories = async () => {
  const remote = await request('/categories')
  return toArray(remote, 'categories') || delay(categories)
}
export const getPsychologyBooks = (params = {}) => getBooks({ ...params, category: 'Психология', _sort: params._sort || 'rating', _order: params._order || 'desc' })
export const getMotivationBooks = (params = {}) => getBooks({ ...params, category: 'Мотивация', _sort: params._sort || 'rating', _order: params._order || 'desc' })
export const getPsychologyAndMotivationBooks = async (params = {}) => [...await getPsychologyBooks(params), ...await getMotivationBooks(params)]
export const searchPsychologyBooks = (query) => getBooks({ q: query, category: 'Психология', _sort: 'rating', _order: 'desc' })
export const searchMotivationBooks = (query) => getBooks({ q: query, category: 'Мотивация', _sort: 'rating', _order: 'desc' })
export const getReviews = async (bookId) => (await request('/reviews', { params: { bookId } })) || delay(localReviews.filter(r => String(r.bookId) === String(bookId)))
export const addReview = async (review) => {
  const remote = await request('/reviews', { method: 'post', data: review })
  const saved = remote || { ...review, id: Date.now() }
  localReviews = [saved, ...localReviews]
  return delay(saved)
}
export const createOrder = async (order) => {
  const remote = await request('/orders', { method: 'post', data: order })
  const saved = remote || { ...order, id: order.id || Date.now() }
  localOrders = [saved, ...localOrders]
  return delay(saved)
}
export const getOrders = async (userId) => (await request('/orders', { params: { userId } })) || delay(localOrders.filter(o => String(o.userId) === String(userId)))
export const validatePromoCode = async (code) => ({ WELCOME20: 20, SAVE10: 10, PREMIUM15: 15 }[String(code).toUpperCase()] ? { code, discount: { WELCOME20: 20, SAVE10: 10, PREMIUM15: 15 }[String(code).toUpperCase()] } : null)
