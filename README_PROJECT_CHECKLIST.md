# BookStore Premium — чеклист финальной защиты

Учтены требования с фото:

## Функционал
- Минимум 30+ React-компонентов: `src/components/premium`.
- Главная, каталог, детальная страница, корзина, checkout, wishlist, profile.
- Sidebar/filter/search/sort в каталоге.
- Корзина, промокоды, оформление заказа.
- LocalStorage для корзины, избранного и пользователя.
- Fallback-data: сайт работает даже без `/api`.

## Дополнительные баллы
- Структура готова под Vercel deploy.
- Есть компоненты-заготовки под ChatBot, Telegram notify, Firebase realtime, AdminPanel.
- Можно быстро подключить настоящий backend/json-server.

## Запуск
```bash
npm install
npm run dev
```

## Deploy
```bash
npm run build
```
Потом загрузить проект на GitHub и импортировать репозиторий в Vercel.
