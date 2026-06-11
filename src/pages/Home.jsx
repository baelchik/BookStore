import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBooks, getCategories, getPsychologyAndMotivationBooks } from '../api'
import BookCard from '../components/BookCard'
import {
  FeatureGrid,
  HeroSlider,
  ProjectChecklist,
  PromoBanner,
  SectionHeader,
  StatsBar,
  TrustBadges,
} from '../components/Premium'

export default function Home() {
  const [data, setData] = useState({
    books: [],
    categories: [],
    psych: [],
    loading: true,
  })

  useEffect(() => {
    loadHomeData()
  }, [])

  const toArray = (value) => {
    if (Array.isArray(value)) return value
    if (Array.isArray(value?.data)) return value.data
    if (Array.isArray(value?.categories)) return value.categories
    if (Array.isArray(value?.books)) return value.books
    return []
  }

  const loadHomeData = async () => {
    try {
      const [booksResult, categoriesResult, psychResult] = await Promise.all([
        getBooks(),
        getCategories(),
        getPsychologyAndMotivationBooks(),
      ])

      setData({
        books: toArray(booksResult),
        categories: toArray(categoriesResult),
        psych: toArray(psychResult).slice(0, 4),
        loading: false,
      })
    } catch (error) {
      console.error('Home loading error:', error)
      setData({ books: [], categories: [], psych: [], loading: false })
    }
  }

  if (data.loading) {
    return (
      <div className="premium-card py-16 text-center text-xl font-black">
        Загружаем витрину...
      </div>
    )
  }

  const featured = [...data.books]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4)

  const newest = [...data.books]
    .sort((a, b) => new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0))
    .slice(0, 4)

  return (
    <div className="page-transition space-y-16">
      <HeroSlider />
      <StatsBar />

      <section>
        <SectionHeader
          title="Популярные жанры"
          eyebrow="Каталог"
          action={
            <Link to="/catalog" className="btn-outline">
              Все книги
            </Link>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.categories.slice(0, 8).map((category) => {
            const name = category.name || category
            return (
              <Link
                key={category.id || name}
                to={`/catalog?category=${encodeURIComponent(name)}`}
                className="premium-card group p-6 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="text-sm font-black text-moss-700">
                  {name.slice(0, 2).toUpperCase()}
                </span>
                <h3 className="mt-4 text-2xl font-black group-hover:text-moss-700">
                  {name}
                </h3>
              </Link>
            )
          })}
        </div>
      </section>

      <section>
        <SectionHeader
          title="Рекомендуемые книги"
          eyebrow="Выбор читателей"
          action={
            <Link to="/catalog?sort=rating" className="btn-secondary">
              Открыть подборку
            </Link>
          }
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      <PromoBanner />

      <section>
        <SectionHeader
          title="Психология и мотивация"
          eyebrow="Для развития"
          action={
            <Link to="/catalog?psychology=true" className="btn-secondary">
              Смотреть все
            </Link>
          }
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.psych.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Новинки" eyebrow="Свежие поступления" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newest.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      <TrustBadges />
      <FeatureGrid />
      <ProjectChecklist />
    </div>
  )
}
