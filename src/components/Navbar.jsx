import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { getCart, getUser, getWishlist } from '../storage'
import { debounce } from '../utils'
import { searchBooks } from '../api'

export default function Navbar() {
  const navigate = useNavigate()
  const [counts, setCounts] = useState({ cart: 0, wishlist: 0, user: null })
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const update = () => {
    setCounts({
      cart: getCart().reduce((sum, item) => sum + item.quantity, 0),
      wishlist: getWishlist().length,
      user: getUser(),
    })
  }

  useEffect(() => {
    update()
    window.addEventListener('bookstore:update', update)
    window.addEventListener('storage', update)
    return () => {
      window.removeEventListener('bookstore:update', update)
      window.removeEventListener('storage', update)
    }
  }, [])

  const runSearch = useMemo(
    () =>
      debounce(async (value) => {
        const text = value.trim()
        setResults(text ? (await searchBooks(text)).slice(0, 5) : [])
      }, 220),
    []
  )

  const navClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-extrabold ${
      isActive
        ? 'bg-moss-50 text-moss-700'
        : 'text-muted hover:bg-paper hover:text-ink'
    }`

  const openBook = (id) => {
    navigate(`/book/${id}`)
    setQuery('')
    setResults([])
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur-xl">
      <div className="container py-3">
        <div className="grid gap-3 lg:grid-cols-[220px_1fr_auto] lg:items-center">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-ink text-lg font-black text-white">
              B
            </span>
            <span>
              <span className="block text-lg font-black leading-none tracking-tight">
                BookStore
              </span>
              <span className="text-xs font-bold uppercase tracking-[.18em] text-muted">
                premium
              </span>
            </span>
          </Link>

          <div className="relative">
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                runSearch(event.target.value)
              }}
              placeholder="Найти книгу или автора"
              className="input-field bg-paper/70 pl-5"
            />
            {results.length ? (
              <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-96 overflow-auto rounded-lg border border-line bg-surface p-2 shadow-lift">
                {results.map((book) => (
                  <button
                    key={book.id}
                    onClick={() => openBook(book.id)}
                    className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-paper"
                  >
                    <img
                      src={book.image}
                      alt=""
                      className="h-16 w-11 rounded-md object-cover"
                    />
                    <span>
                      <b className="line-clamp-2 text-sm">{book.title}</b>
                      <small className="mt-1 block text-muted">{book.author}</small>
                    </span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <nav className="flex flex-wrap items-center gap-1">
            <NavLink to="/catalog" className={navClass}>
              Каталог
            </NavLink>
            <NavLink to="/catalog?psychology=true" className={navClass}>
              Психология
            </NavLink>
            <NavLink to="/wishlist" className={navClass}>
              Избранное {counts.wishlist ? counts.wishlist : ''}
            </NavLink>
            <NavLink to="/cart" className={navClass}>
              Корзина {counts.cart ? counts.cart : ''}
            </NavLink>
            <NavLink to="/profile" className={navClass}>
              {counts.user ? 'Профиль' : 'Войти'}
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}
