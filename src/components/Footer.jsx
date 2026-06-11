import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-ink font-black text-white">
                B
              </span>
              <h3 className="text-2xl font-black">BookStore</h3>
            </div>
            <p className="mt-4 max-w-sm leading-7 text-muted">
              Книжный магазин с подборками, избранным, корзиной и быстрым оформлением заказа.
            </p>
          </div>

          <FooterGroup title="Разделы">
            <Link to="/">Главная</Link>
            <Link to="/catalog">Каталог</Link>
            <Link to="/wishlist">Избранное</Link>
            <Link to="/cart">Корзина</Link>
          </FooterGroup>

          <FooterGroup title="Жанры">
            <Link to="/catalog?psychology=true">Психология</Link>
            <Link to="/catalog?category=Бизнес">Бизнес</Link>
            <Link to="/catalog?category=Классика">Классика</Link>
            <Link to="/catalog?category=Наука">Наука</Link>
          </FooterGroup>

          <div>
            <h4 className="font-black">Контакты</h4>
            <p className="mt-4 leading-7 text-muted">
              info@bookstore.kg
              <br />
              +996 (312) 123-456
              <br />
              Бишкек, Кыргызстан
            </p>
          </div>
        </div>

        <div className="section-divider my-8" />
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} BookStore Premium. Все права защищены.
        </p>
      </div>
    </footer>
  )
}

function FooterGroup({ title, children }) {
  return (
    <div>
      <h4 className="font-black">{title}</h4>
      <div className="mt-4 grid gap-2 font-semibold text-muted [&_a:hover]:text-moss-700">
        {children}
      </div>
    </div>
  )
}
