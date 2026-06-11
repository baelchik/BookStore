import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { addToCart, addToWishlist, isInWishlist, removeFromWishlist } from '../storage'
import { calculateDiscount, formatPrice, renderStars } from '../utils'

export default function BookCard({ book, onAddToCart, onWishlistChange }) {
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSaved(isInWishlist(book.id))
  }, [book.id])

  const price = book.discount ? calculateDiscount(book.price, book.discount) : book.price

  const toggleWishlist = () => {
    saved ? removeFromWishlist(book.id) : addToWishlist(book)
    setSaved(!saved)
    onWishlistChange?.()
  }

  const add = () => {
    addToCart(book)
    onAddToCart?.()
  }

  return (
    <article className="book-card group flex h-full flex-col">
      <Link
        to={`/book/${book.id}`}
        className="relative block aspect-[4/5] overflow-hidden bg-paper"
      >
        <img
          src={book.image}
          alt={book.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/70 to-transparent" />
        <span className="absolute left-3 top-3 rounded-md bg-surface/95 px-3 py-1 text-xs font-black text-moss-700 shadow-inset">
          {book.category}
        </span>
        {book.discount ? (
          <span className="absolute right-3 top-3 rounded-md bg-clay-600 px-3 py-1 text-xs font-black text-white">
            -{book.discount}%
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <Link
            to={`/book/${book.id}`}
            className="line-clamp-2 text-xl font-black leading-tight text-ink hover:text-moss-700"
          >
            {book.title}
          </Link>
          <p className="mt-2 font-semibold text-muted">{book.author}</p>
        </div>

        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="star">{renderStars(book.rating)}</span>
          <span className="font-bold text-muted">{book.reviewCount} отзывов</span>
        </div>

        <div className="mt-auto border-t border-line pt-4">
          {book.discount ? (
            <p className="text-sm font-bold text-muted line-through">
              {formatPrice(book.price)}
            </p>
          ) : null}
          <p className="text-2xl font-black text-ink">{formatPrice(price)}</p>
        </div>

        <div className="grid grid-cols-[1fr_48px] gap-3">
          <button onClick={add} className="btn-primary">
            В корзину
          </button>
          <button
            onClick={toggleWishlist}
            className="btn-secondary px-0 text-lg"
            aria-label="Добавить в избранное"
          >
            {saved ? '♥' : '♡'}
          </button>
        </div>
      </div>
    </article>
  )
}
