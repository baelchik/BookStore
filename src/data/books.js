export const categories = [
  { id: 1, name: 'Психология', icon: '🧠' }, { id: 2, name: 'Мотивация', icon: '⚡' },
  { id: 3, name: 'Бизнес', icon: '💼' }, { id: 4, name: 'Классика', icon: '🏛️' },
  { id: 5, name: 'Фантастика', icon: '🚀' }, { id: 6, name: 'Детективы', icon: '🕵️' },
  { id: 7, name: 'Наука', icon: '🔬' }, { id: 8, name: 'История', icon: '📜' }
]

export const books = [
  { id: 1, title: 'Атомные привычки', author: 'Джеймс Клир', category: 'Мотивация', price: 1450, discount: 15, rating: 4.9, reviewCount: 842, year: 2018, pages: 320, publisher: 'МИФ', isbn: '978-5-00146-604-8', dateAdded: '2026-05-22', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600', description: 'Практичная система маленьких улучшений, которые дают большой результат.' },
  { id: 2, title: 'Думай медленно... решай быстро', author: 'Даниэль Канеман', category: 'Психология', price: 1780, rating: 4.8, reviewCount: 611, year: 2011, pages: 656, publisher: 'АСТ', isbn: '978-5-17-080053-7', dateAdded: '2026-05-13', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600', description: 'Классика о мышлении, когнитивных искажениях и принятии решений.' },
  { id: 3, title: 'Психология влияния', author: 'Роберт Чалдини', category: 'Психология', price: 1690, discount: 10, rating: 4.7, reviewCount: 529, year: 2021, pages: 448, publisher: 'Питер', isbn: '978-5-4461-1913-1', dateAdded: '2026-04-19', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600', description: 'Фундаментальные принципы убеждения, продаж и социальной психологии.' },
  { id: 4, title: 'От нуля к единице', author: 'Питер Тиль', category: 'Бизнес', price: 1320, rating: 4.6, reviewCount: 384, year: 2014, pages: 240, publisher: 'Альпина', isbn: '978-5-9614-5085-4', dateAdded: '2026-05-29', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600', description: 'Как строить компании, которые создают новое, а не копируют старое.' },
  { id: 5, title: '451° по Фаренгейту', author: 'Рэй Брэдбери', category: 'Классика', price: 890, discount: 20, rating: 4.9, reviewCount: 902, year: 1953, pages: 256, publisher: 'Эксмо', isbn: '978-5-04-102547-2', dateAdded: '2026-03-01', image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=600', description: 'Антиутопия о мире, где книги запрещены, а мышление считается угрозой.' },
  { id: 6, title: 'Проект “Аве Мария”', author: 'Энди Вейер', category: 'Фантастика', price: 1550, rating: 4.8, reviewCount: 477, year: 2021, pages: 544, publisher: 'АСТ', isbn: '978-5-17-136461-8', dateAdded: '2026-05-31', image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600', description: 'Умная научная фантастика о выживании, космосе и неожиданной дружбе.' },
  { id: 7, title: 'Sapiens. Краткая история человечества', author: 'Юваль Ной Харари', category: 'История', price: 1890, rating: 4.7, reviewCount: 760, year: 2011, pages: 512, publisher: 'Синдбад', isbn: '978-5-00131-091-0', dateAdded: '2026-04-08', image: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?q=80&w=600', description: 'Большой взгляд на эволюцию культуры, общества и цивилизации.' },
  { id: 8, title: 'Краткая история времени', author: 'Стивен Хокинг', category: 'Наука', price: 1290, rating: 4.6, reviewCount: 423, year: 1988, pages: 288, publisher: 'Амфора', isbn: '978-5-367-01377-1', dateAdded: '2026-02-14', image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600', description: 'Доступное введение в космологию, черные дыры и устройство Вселенной.' },
  { id: 9, title: 'Шерлок Холмс. Полное собрание', author: 'Артур Конан Дойл', category: 'Детективы', price: 2100, discount: 12, rating: 4.9, reviewCount: 690, year: 1892, pages: 1088, publisher: 'Азбука', isbn: '978-5-389-07435-4', dateAdded: '2026-01-11', image: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=600', description: 'Легендарные расследования самого известного сыщика литературы.' }
]

export const reviews = [
  { id: 1, bookId: 1, name: 'Алина', rating: 5, text: 'Сильно. После книги реально проще держать привычки.', date: '2026-05-30' },
  { id: 2, bookId: 2, name: 'Руслан', rating: 5, text: 'Не легкая, но очень полезная книга.', date: '2026-05-21' }
]
