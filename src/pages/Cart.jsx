import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { clearCart, getCart, removeFromCart, updateCartQuantity } from '../storage'
import { calculateDiscount, cartSubtotal, formatPrice } from '../utils'

export default function Cart() {
  const navigate = useNavigate()
  const [cart, setCart] = useState(getCart())
  const [promo, setPromo] = useState('')
  const [discount, setDiscount] = useState(0)
  const [error, setError] = useState('')
  const subtotal = cartSubtotal(cart)
  const quantity = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart])
  const discountAmount = Math.round((subtotal * discount) / 100)
  const total = subtotal - discountAmount

  const refresh = (items) => setCart(items)

  const applyPromo = () => {
    const codes = { WELCOME20: 20, SAVE10: 10, PREMIUM15: 15 }
    const value = codes[promo.toUpperCase()]
    if (!value) {
      setDiscount(0)
      setError('Промокод не найден')
      return
    }
    setDiscount(value)
    setError('')
  }

  if (!cart.length) {
    return (
      <div className="premium-card py-16 text-center">
        <h1 className="section-title">Корзина пуста</h1>
        <p className="mt-3 text-muted">Добавьте книги, чтобы оформить заказ.</p>
        <Link to="/catalog" className="btn-primary mt-6">
          Перейти в каталог
        </Link>
      </div>
    )
  }

  return (
    <div className="page-transition grid gap-8 lg:grid-cols-[1fr_360px]">
      <main>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Ваш заказ</p>
            <h1 className="section-title">Корзина</h1>
          </div>
          <p className="font-black text-muted">{quantity} товаров</p>
        </div>

        <div className="space-y-4">
          {cart.map((item) => {
            const price = item.discount
              ? calculateDiscount(item.price, item.discount)
              : item.price

            return (
              <article
                key={item.id}
                className="premium-card grid gap-4 p-4 sm:grid-cols-[92px_1fr_auto] sm:items-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-32 w-24 rounded-lg object-cover sm:h-32 sm:w-full"
                />
                <div>
                  <h3 className="text-xl font-black">{item.title}</h3>
                  <p className="mt-1 font-semibold text-muted">{item.author}</p>
                  <p className="mt-3 text-xl font-black">{formatPrice(price)}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                  <div className="flex items-center rounded-lg border border-line bg-paper p-1">
                    <button
                      className="h-9 w-9 rounded-md font-black hover:bg-surface"
                      onClick={() => refresh(updateCartQuantity(item.id, item.quantity - 1))}
                    >
                      −
                    </button>
                    <b className="w-9 text-center">{item.quantity}</b>
                    <button
                      className="h-9 w-9 rounded-md font-black hover:bg-surface"
                      onClick={() => refresh(updateCartQuantity(item.id, item.quantity + 1))}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => refresh(removeFromCart(item.id))}
                    className="rounded-lg bg-clay-50 px-4 py-2 font-black text-clay-600 hover:bg-clay-100"
                  >
                    Удалить
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </main>

      <aside className="premium-card h-fit p-6 lg:sticky lg:top-24">
        <h2 className="text-3xl font-black">Итого</h2>
        <div className="mt-6 flex gap-2">
          <input
            className="input-field"
            placeholder="WELCOME20"
            value={promo}
            onChange={(event) => setPromo(event.target.value.toUpperCase())}
          />
          <button onClick={applyPromo} className="btn-primary px-4">
            OK
          </button>
        </div>
        {error ? <p className="mt-2 font-bold text-clay-600">{error}</p> : null}

        <div className="my-6 space-y-3 border-y border-line py-6">
          <Row label="Товары" value={formatPrice(subtotal)} />
          {discount ? (
            <Row label={`Скидка ${discount}%`} value={`−${formatPrice(discountAmount)}`} />
          ) : null}
          <Row label="К оплате" value={formatPrice(total)} big />
        </div>

        <button onClick={() => navigate('/checkout')} className="btn-primary w-full">
          Оформить заказ
        </button>
        <button onClick={() => refresh(clearCart())} className="btn-secondary mt-3 w-full">
          Очистить корзину
        </button>
      </aside>
    </div>
  )
}

function Row({ label, value, big }) {
  return (
    <div className={`flex justify-between gap-4 ${big ? 'text-2xl font-black' : 'font-bold'}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}
