import { Link } from 'react-router-dom'

export function HeroSlider() {
  return (
    <section className="overflow-hidden rounded-lg bg-hero-books bg-cover bg-center text-white shadow-lift">
      <div className="grid min-h-[520px] gap-10 p-6 sm:p-10 lg:grid-cols-[1.08fr_.92fr] lg:items-end lg:p-12">
        <div className="max-w-3xl self-center">
          <p className="eyebrow text-gold-100">Новая коллекция</p>
          <h1 className="mt-4 text-4xl font-black leading-none tracking-tight sm:text-6xl lg:text-7xl">
            Книги, которые хочется держать на видном месте.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/82">
            Подборки по жанрам, быстрый поиск и аккуратное оформление заказа в одном магазине.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/catalog" className="btn-primary bg-surface text-ink hover:bg-paper">
              Смотреть каталог
            </Link>
            <Link to="/catalog?psychology=true" className="btn-secondary bg-white/10 text-white hover:bg-white/15 hover:text-white">
              Подборка психологии
            </Link>
          </div>
        </div>

        <div className="grid gap-3 self-end sm:grid-cols-3 lg:grid-cols-1">
          {[
            ['9', 'книг в витрине'],
            ['8', 'жанров'],
            ['20%', 'промокод WELCOME20'],
          ].map(([value, label]) => (
            <div key={label} className="glass rounded-lg p-4 text-ink">
              <p className="text-3xl font-black">{value}</p>
              <p className="mt-1 text-sm font-bold text-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function StatsBar() {
  const items = [
    ['Подборки', 'Популярное, новинки и жанры на главной'],
    ['Доставка', 'Расчет заказа и адреса в пару шагов'],
    ['Отзывы', 'Рейтинг и мнения читателей у каждой книги'],
  ]

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {items.map(([title, text]) => (
        <div key={title} className="premium-card p-6">
          <h3 className="text-xl font-black text-moss-700">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
        </div>
      ))}
    </section>
  )
}

export function TrustBadges() {
  const items = ['Бестселлеры', 'Новинки', 'Классика', 'Научпоп']

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item} className="rounded-lg border border-line bg-surface px-5 py-4 font-black shadow-inset">
          {item}
        </div>
      ))}
    </section>
  )
}

export function PromoBanner() {
  return (
    <section className="grid overflow-hidden rounded-lg border border-line bg-ink text-white shadow-lift md:grid-cols-[1fr_auto]">
      <div className="p-8 sm:p-10">
        <p className="eyebrow text-gold-200">Промокод</p>
        <h2 className="mt-3 text-3xl font-black sm:text-5xl">WELCOME20</h2>
        <p className="mt-4 max-w-2xl text-white/72">
          Скидка 20% на первый заказ. Код можно применить в корзине перед оформлением.
        </p>
      </div>
      <div className="flex items-center border-t border-white/10 bg-moss-700 p-8 md:border-l md:border-t-0">
        <span className="text-5xl font-black">-20%</span>
      </div>
    </section>
  )
}

export function SectionHeader({ title, eyebrow, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? <p className="eyebrow mb-2">{eyebrow}</p> : null}
        <h2 className="section-title">{title}</h2>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}

export function FeatureGrid() {
  const features = [
    ['Для развития', 'Психология, привычки и мотивация'],
    ['Для вечера', 'Классика, детективы и фантастика'],
    ['Для любопытства', 'История, наука и сильный нон-фикшн'],
  ]

  return (
    <section>
      <SectionHeader title="Выберите настроение" eyebrow="Подборки" />
      <div className="grid gap-4 md:grid-cols-3">
        {features.map(([title, text]) => (
          <div key={title} className="premium-card p-6">
            <h3 className="text-2xl font-black">{title}</h3>
            <p className="mt-3 leading-7 text-muted">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function ProjectChecklist() {
  const items = [
    ['01', 'Найдите книгу по автору, жанру или названию'],
    ['02', 'Сохраните понравившееся в избранное'],
    ['03', 'Оформите заказ с доставкой и промокодом'],
  ]

  return (
    <section>
      <SectionHeader title="Покупка без лишних шагов" eyebrow="Сервис" />
      <div className="premium-card divide-y divide-line">
        {items.map(([number, text]) => (
          <div key={number} className="grid gap-3 p-5 sm:grid-cols-[64px_1fr] sm:items-center">
            <span className="text-2xl font-black text-moss-700">{number}</span>
            <p className="font-bold">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
