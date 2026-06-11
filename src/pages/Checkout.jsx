import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createOrder } from '../api'
import { clearCart, getCart, setUser } from '../storage'
import { calculateDiscount, cartSubtotal, formatPrice, validateEmail, validatePhone } from '../utils'

export default function Checkout() {
  const navigate = useNavigate()
  const cart = getCart()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    notes: '',
  })

  const subtotal = cartSubtotal(cart)
  const shipping = subtotal >= 2500 ? 0 : 300
  const total = subtotal + shipping

  if (!cart.length) {
    return (
      <div className="premium-card py-16 text-center">
        <h1 className="section-title">Корзина пуста</h1>
        <Link to="/catalog" className="btn-primary mt-6">
          Выбрать книги
        </Link>
      </div>
    )
  }

  const change = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '' })
  }

  const validate = () => {
    const nextErrors = {}
    if (!form.firstName.trim()) nextErrors.firstName = 'Введите имя'
    if (!form.lastName.trim()) nextErrors.lastName = 'Введите фамилию'
    if (!validateEmail(form.email)) nextErrors.email = 'Некорректный email'
    if (!validatePhone(form.phone)) nextErrors.phone = 'Некорректный телефон'
    if (!form.address.trim()) nextErrors.address = 'Введите адрес'
    if (!form.city.trim()) nextErrors.city = 'Введите город'
    if (!form.zipCode.trim()) nextErrors.zipCode = 'Введите индекс'
    setErrors(nextErrors)
    return !Object.keys(nextErrors).length
  }

  const submit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    setLoading(true)
    const order = {
      id: Date.now(),
      userId: Date.now(),
      items: cart,
      customer: form,
      subtotal,
      shipping,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      deliveryDate: new Date(Date.now() + 5 * 86400000).toISOString(),
    }
    const result = await createOrder(order)
    setUser({
      id: order.userId,
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
    })
    clearCart()
    setLoading(false)
    navigate(`/profile?orderId=${result.id}`)
  }

  return (
    <div className="page-transition grid gap-8 lg:grid-cols-[1fr_360px]">
      <form onSubmit={submit} className="premium-card space-y-8 p-6 sm:p-8">
        <div>
          <p className="eyebrow">Доставка</p>
          <h1 className="section-title mt-2">Оформление заказа</h1>
        </div>

        <Group title="Личные данные">
          <Field name="firstName" label="Имя" form={form} errors={errors} change={change} />
          <Field name="lastName" label="Фамилия" form={form} errors={errors} change={change} />
          <Field name="email" label="Email" form={form} errors={errors} change={change} />
          <Field name="phone" label="Телефон" form={form} errors={errors} change={change} />
        </Group>

        <Group title="Адрес">
          <Field name="address" label="Адрес доставки" form={form} errors={errors} change={change} wide />
          <Field name="city" label="Город" form={form} errors={errors} change={change} />
          <Field name="zipCode" label="Индекс" form={form} errors={errors} change={change} />
          <label className="md:col-span-2">
            <span className="mb-2 block font-bold text-muted">Комментарий</span>
            <textarea
              name="notes"
              rows="4"
              className="input-field"
              value={form.notes}
              onChange={change}
            />
          </label>
        </Group>

        <button disabled={loading} className="btn-primary w-full text-base">
          {loading ? 'Оформляем...' : 'Подтвердить заказ'}
        </button>
      </form>

      <aside className="premium-card h-fit p-6 lg:sticky lg:top-24">
        <h2 className="text-3xl font-black">Ваш заказ</h2>
        <div className="mt-5 space-y-4">
          {cart.map((item) => {
            const price = item.discount ? calculateDiscount(item.price, item.discount) : item.price
            return (
              <div key={item.id} className="flex justify-between gap-3 text-sm">
                <span className="font-bold text-muted">
                  {item.title} × {item.quantity}
                </span>
                <b>{formatPrice(price * item.quantity)}</b>
              </div>
            )
          })}
        </div>
        <div className="my-6 space-y-3 border-y border-line py-6">
          <Row label="Товары" value={formatPrice(subtotal)} />
          <Row label="Доставка" value={shipping ? formatPrice(shipping) : 'Бесплатно'} />
          <Row label="Итого" value={formatPrice(total)} big />
        </div>
      </aside>
    </div>
  )
}

function Group({ title, children }) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-black">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  )
}

function Field({ name, label, form, errors, change, wide }) {
  return (
    <label className={wide ? 'md:col-span-2' : ''}>
      <span className="mb-2 block font-bold text-muted">{label}</span>
      <input
        name={name}
        value={form[name]}
        onChange={change}
        className={`input-field ${errors[name] ? 'border-clay-500' : ''}`}
      />
      {errors[name] ? <small className="font-bold text-clay-600">{errors[name]}</small> : null}
    </label>
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
