import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getBooks, getCategories, getPsychologyAndMotivationBooks } from '../api'
import BookCard from '../components/BookCard'

export default function Catalog() {
  const [params, setParams] = useSearchParams()
  const [books, setBooks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState(params.get('category') || '')
  const [psychology, setPsychology] = useState(params.get('psychology') === 'true')
  const [sort, setSort] = useState(params.get('sort') || 'rating')
  const [query, setQuery] = useState('')
  const [price, setPrice] = useState([0, 2500])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const [nextBooks, nextCategories] = await Promise.all([
        psychology ? getPsychologyAndMotivationBooks() : getBooks(),
        getCategories(),
      ])
      setBooks(Array.isArray(nextBooks) ? nextBooks : [])
      setCategories(Array.isArray(nextCategories) ? nextCategories : [])
      setLoading(false)
    })()
  }, [psychology])

  useEffect(() => {
    const next = new URLSearchParams()
    if (psychology) next.set('psychology', 'true')
    if (category) next.set('category', category)
    if (sort !== 'rating') next.set('sort', sort)
    setParams(next, { replace: true })
  }, [category, psychology, setParams, sort])

  const filtered = useMemo(() => {
    const text = query.toLowerCase().trim()
    const sorters = {
      price_asc: (a, b) => a.price - b.price,
      price_desc: (a, b) => b.price - a.price,
      rating: (a, b) => (b.rating || 0) - (a.rating || 0),
      newest: (a, b) => new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0),
      title: (a, b) => a.title.localeCompare(b.title, 'ru'),
    }

    return [...books]
      .filter((book) => {
        const matchesCategory = !category || book.category === category
        const matchesPrice = book.price >= price[0] && book.price <= price[1]
        const matchesText = `${book.title} ${book.author} ${book.category}`
          .toLowerCase()
          .includes(text)
        return matchesCategory && matchesPrice && matchesText
      })
      .sort(sorters[sort] || sorters.rating)
  }, [books, category, price, query, sort])

  const resetFilters = () => {
    setCategory('')
    setPsychology(false)
    setSort('rating')
    setQuery('')
    setPrice([0, 2500])
  }

  return (
    <div className="page-transition grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside>
        <div className="premium-card sticky top-24 space-y-5 p-5">
          <div>
            <p className="eyebrow">Фильтры</p>
            <h1 className="mt-2 text-2xl font-black">Каталог</h1>
          </div>

          <input
            className="input-field"
            placeholder="Книга или автор"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          <button
            onClick={() => setPsychology(!psychology)}
            className={psychology ? 'btn-primary w-full' : 'btn-secondary w-full'}
          >
            Психология и мотивация
          </button>

          <label>
            <span className="mb-2 block text-sm font-black text-muted">Жанр</span>
            <select
              className="input-field"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">Все жанры</option>
              {categories.map((item) => {
                const name = item.name || item
                return (
                  <option key={item.id || name} value={name}>
                    {name}
                  </option>
                )
              })}
            </select>
          </label>

          <div>
            <span className="mb-2 block text-sm font-black text-muted">Цена</span>
            <div className="grid grid-cols-2 gap-3">
              <input
                className="input-field"
                type="number"
                value={price[0]}
                onChange={(event) => setPrice([Number(event.target.value), price[1]])}
              />
              <input
                className="input-field"
                type="number"
                value={price[1]}
                onChange={(event) => setPrice([price[0], Number(event.target.value)])}
              />
            </div>
          </div>

          <label>
            <span className="mb-2 block text-sm font-black text-muted">Сортировка</span>
            <select
              className="input-field"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="rating">По рейтингу</option>
              <option value="newest">Новинки</option>
              <option value="price_asc">Цена по возрастанию</option>
              <option value="price_desc">Цена по убыванию</option>
              <option value="title">По названию</option>
            </select>
          </label>

          <button onClick={resetFilters} className="btn-outline w-full">
            Сбросить
          </button>
        </div>
      </aside>

      <main>
        <div className="mb-6 rounded-lg border border-line bg-surface p-6 shadow-inset">
          <p className="eyebrow">{psychology ? 'Подборка' : 'Все книги'}</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="section-title">
              {psychology ? 'Психология и мотивация' : category || 'Каталог книг'}
            </h2>
            <p className="font-black text-muted">Найдено: {filtered.length}</p>
          </div>
        </div>

        {loading ? (
          <div className="premium-card p-10 text-center font-black">Загрузка...</div>
        ) : filtered.length ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="premium-card p-10 text-center">
            <h3 className="text-2xl font-black">Ничего не найдено</h3>
            <p className="mt-2 text-muted">Попробуйте изменить фильтры или поиск.</p>
          </div>
        )}
      </main>
    </div>
  )
}
