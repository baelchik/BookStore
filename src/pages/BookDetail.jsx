import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { addReview, getBookById, getReviews } from '../api'
import { addToCart, addToWishlist, isInWishlist, removeFromWishlist } from '../storage'
import {
  calculateDiscount,
  formatDate,
  formatPrice,
  getAverageRating,
  renderStars,
  validateEmail,
} from '../utils'

export default function BookDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', rating: 5, text: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const nextBook = await getBookById(id)
      setBook(nextBook)
      setReviews(await getReviews(id))
      setSaved(isInWishlist(id))
      setLoading(false)
    })()
  }, [id])

  if (loading) {
    return <div className="premium-card py-16 text-center font-black">Загрузка...</div>
  }

  if (!book) {
    return (
      <div className="premium-card py-16 text-center">
        <h1 className="section-title">Книга не найдена</h1>
        <button onClick={() => navigate('/catalog')} className="btn-primary mt-6">
          В каталог
        </button>
      </div>
    )
  }

  const price = book.discount ? calculateDiscount(book.price, book.discount) : book.price
  const averageRating = Number(getAverageRating(reviews)) || book.rating

  const submit = async (event) => {
    event.preventDefault()
    setError('')

    if (!form.name.trim() || !form.email.trim() || !form.text.trim()) {
      setError('Заполните все поля')
      return
    }

    if (!validateEmail(form.email)) {
      setError('Введите корректный email')
      return
    }

    const savedReview = await addReview({
      bookId: book.id,
      ...form,
      date: new Date().toISOString(),
    })
    setReviews([savedReview, ...reviews])
    setForm({ name: '', email: '', rating: 5, text: '' })
  }

  const toggleWishlist = () => {
    saved ? removeFromWishlist(book.id) : addToWishlist(book)
    setSaved(!saved)
  }

  return (
    <div className="page-transition space-y-10">
      <Link to="/catalog" className="font-black text-moss-700 hover:text-moss-600">
        Назад в каталог
      </Link>

      <section className="grid gap-8 lg:grid-cols-[420px_1fr]">
        <div className="premium-card overflow-hidden p-4">
          <img
            src={book.image}
            alt={book.title}
            className="h-[560px] w-full rounded-lg object-cover"
          />
        </div>

        <div className="premium-card p-6 sm:p-8">
          <p className="eyebrow">{book.category}</p>
          <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">
            {book.title}
          </h1>
          <p className="mt-4 text-2xl font-bold text-muted">{book.author}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="star text-xl">{renderStars(averageRating)}</span>
            <b className="text-muted">
              {averageRating} / 5 · {reviews.length || book.reviewCount} отзывов
            </b>
          </div>

          <div className="my-8 rounded-lg border border-line bg-paper p-6">
            {book.discount ? (
              <p className="font-bold text-muted line-through">{formatPrice(book.price)}</p>
            ) : null}
            <p className="text-5xl font-black text-ink">{formatPrice(price)}</p>
            {book.discount ? (
              <p className="mt-2 font-black text-clay-600">Скидка {book.discount}%</p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={() => addToCart(book)} className="btn-primary text-base">
              Добавить в корзину
            </button>
            <button onClick={toggleWishlist} className="btn-secondary text-base">
              {saved ? 'В избранном' : 'В избранное'}
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Info label="Издатель" value={book.publisher} />
            <Info label="Год" value={book.year} />
            <Info label="Страниц" value={book.pages} />
            <Info label="ISBN" value={book.isbn} />
          </div>
        </div>
      </section>

      <section className="premium-card p-6 sm:p-8">
        <h2 className="section-title mb-4">Описание</h2>
        <p className="max-w-4xl text-lg leading-8 text-muted">{book.description}</p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[360px_1fr]">
        <form onSubmit={submit} className="premium-card space-y-4 p-6">
          <h3 className="text-2xl font-black">Написать отзыв</h3>
          {error ? (
            <p className="rounded-lg bg-clay-50 p-3 font-bold text-clay-600">{error}</p>
          ) : null}
          <input
            className="input-field"
            placeholder="Имя"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
          <input
            className="input-field"
            placeholder="Email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
          <select
            className="input-field"
            value={form.rating}
            onChange={(event) => setForm({ ...form, rating: Number(event.target.value) })}
          >
            {[5, 4, 3, 2, 1].map((number) => (
              <option key={number} value={number}>
                {number} звезд
              </option>
            ))}
          </select>
          <textarea
            className="input-field min-h-32"
            placeholder="Текст отзыва"
            value={form.text}
            onChange={(event) => setForm({ ...form, text: event.target.value })}
          />
          <button className="btn-primary w-full">Опубликовать</button>
        </form>

        <div className="space-y-4">
          <h3 className="text-2xl font-black">Отзывы</h3>
          {reviews.length ? (
            reviews.map((review) => (
              <article key={review.id} className="premium-card p-5">
                <div className="flex flex-wrap justify-between gap-3">
                  <b>{review.name}</b>
                  <span className="star">{renderStars(review.rating)}</span>
                </div>
                <p className="mt-3 leading-7 text-muted">{review.text}</p>
                <small className="mt-3 block font-semibold text-muted">
                  {formatDate(review.date)}
                </small>
              </article>
            ))
          ) : (
            <div className="premium-card p-6 text-muted">Отзывов пока нет.</div>
          )}
        </div>
      </section>
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div className="rounded-lg border border-line bg-paper p-4">
      <p className="text-sm font-bold text-muted">{label}</p>
      <p className="mt-1 font-black">{value || '—'}</p>
    </div>
  )
}
