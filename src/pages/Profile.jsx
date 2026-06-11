import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOrders } from '../api'
import { clearUser, getUser, registerByEmail } from '../storage'
import { formatDate, formatPrice, validateEmail } from '../utils'

export default function Profile() {
  const [user, setUser] = useState(getUser())
  const [orders, setOrders] = useState([])
  const [form, setForm] = useState({ name: '', email: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      getOrders(user.id).then((items) => setOrders(Array.isArray(items) ? items : []))
    } else {
      setOrders([])
    }
  }, [user])

  const submitRegistration = (event) => {
    event.preventDefault()
    setError('')

    if (!form.name.trim()) {
      setError('Введите имя')
      return
    }

    if (!validateEmail(form.email)) {
      setError('Введите корректный email')
      return
    }

    const nextUser = registerByEmail(form)
    setUser(nextUser)
    setForm({ name: '', email: '' })
  }

  if (!user) {
    return (
      <div className="page-transition grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
        <section className="premium-card p-6 sm:p-8">
          <p className="eyebrow">Аккаунт</p>
          <h1 className="section-title mt-2">Регистрация по email</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            Создайте профиль, чтобы сохранять данные покупателя и быстрее оформлять заказы.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Info title="Email" text="Основной вход в профиль" />
            <Info title="Избранное" text="Книги остаются сохраненными" />
            <Info title="Заказы" text="История появится после покупки" />
          </div>
        </section>

        <form onSubmit={submitRegistration} className="premium-card space-y-4 p-6">
          <h2 className="text-2xl font-black">Войти или зарегистрироваться</h2>
          {error ? (
            <p className="rounded-lg bg-clay-50 p-3 font-bold text-clay-600">{error}</p>
          ) : null}
          <label>
            <span className="mb-2 block font-bold text-muted">Имя</span>
            <input
              className="input-field"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Например, Алина"
            />
          </label>
          <label>
            <span className="mb-2 block font-bold text-muted">Email</span>
            <input
              className="input-field"
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="name@example.com"
            />
          </label>
          <button className="btn-primary w-full">Продолжить</button>
          <Link to="/catalog" className="btn-secondary w-full">
            Сначала выбрать книги
          </Link>
        </form>
      </div>
    )
  }

  const spent = orders.reduce((sum, order) => sum + order.total, 0)

  const logout = () => {
    clearUser()
    setUser(null)
  }

  return (
    <div className="page-transition space-y-8">
      <section className="premium-card p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="eyebrow">Покупатель</p>
            <h1 className="section-title mt-2">Профиль</h1>
          </div>
          <button onClick={logout} className="btn-secondary">
            Выйти
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card label="Имя" value={user.name} />
          <Card label="Email" value={user.email} />
          <Card label="Покупки" value={formatPrice(spent)} />
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-black">История заказов</h2>
          <p className="font-black text-muted">{orders.length}</p>
        </div>

        {orders.length ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <article key={order.id} className="premium-card p-5">
                <div className="flex flex-wrap justify-between gap-4">
                  <div>
                    <b>Заказ #{order.id}</b>
                    <p className="mt-1 text-muted">
                      {formatDate(order.createdAt)} · доставка {formatDate(order.deliveryDate)}
                    </p>
                  </div>
                  <b className="text-2xl">{formatPrice(order.total)}</b>
                </div>
                <div className="mt-4 grid gap-2">
                  {order.items.map((item) => (
                    <p key={item.id} className="font-bold text-muted">
                      {item.title} × {item.quantity}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="premium-card p-8 text-muted">Заказов пока нет.</div>
        )}
      </section>
    </div>
  )
}

function Info({ title, text }) {
  return (
    <div className="rounded-lg border border-line bg-paper p-4">
      <h3 className="font-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
    </div>
  )
}

function Card({ label, value }) {
  return (
    <div className="rounded-lg border border-line bg-paper p-5">
      <p className="font-bold text-muted">{label}</p>
      <p className="mt-2 text-xl font-black">{value}</p>
    </div>
  )
}
