import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BookCard from '../components/BookCard'
import { getWishlist } from '../storage'

export default function Wishlist() {
  const [items, setItems] = useState(getWishlist())
  const sync = () => setItems(getWishlist())

  useEffect(() => {
    sync()
    window.addEventListener('bookstore:update', sync)
    return () => window.removeEventListener('bookstore:update', sync)
  }, [])

  if (!items.length) {
    return (
      <div className="premium-card py-16 text-center">
        <h1 className="section-title">Избранное пусто</h1>
        <p className="mt-3 text-muted">Сохраняйте понравившиеся книги, чтобы вернуться к ним позже.</p>
        <Link to="/catalog" className="btn-primary mt-6">
          В каталог
        </Link>
      </div>
    )
  }

  return (
    <div className="page-transition">
      <div className="mb-8">
        <p className="eyebrow">Сохраненные книги</p>
        <h1 className="section-title mt-2">Избранное ({items.length})</h1>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onAddToCart={sync}
            onWishlistChange={sync}
          />
        ))}
      </div>
    </div>
  )
}
