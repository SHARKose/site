# MediaHub

Premium video publishing and sharing platform built with Next.js, TypeScript, Tailwind CSS, Framer Motion, Prisma and PostgreSQL.

## Что включено

- Современный дизайн и адаптивный интерфейс
- SSR/SSG поддержка через App Router
- Реальные данные из Prisma + PostgreSQL
- Готовая структура страниц: главная, все видео, просмотр, загрузка, плейлисты, хештеги, профиль, избранное, история
- Видео-плеер на базе Video.js
- Prisma ORM и PostgreSQL схема
- Пример данных для быстрой загрузки
- Серверные API-маршруты для видео и поиска
- Одно нажатие запуска через VS Code Task

## Установка

1. Скопируйте `.env.example` в `.env` и настройте `DATABASE_URL`.
2. Установите зависимости:

```bash
npm install
```

3. Сгенерируйте Prisma Client:

```bash
npx prisma generate
```

4. Создайте миграцию и запустите её:

```bash
npx prisma migrate dev --name init
```

5. Заполните базу данных тестовыми данными:

```bash
npm run db:seed
```

6. Запустите в режиме разработки:

```bash
npm run dev
```

## Запуск в production

```bash
npm run build
npm start
```

## Проект

Страница `app/page.tsx` содержит главный экран.

Страница `app/video/[slug]/page.tsx` содержит страницу просмотра видео.

Страница `app/media/page.tsx` — раздел «Все видео».

Страница `app/upload/page.tsx` — загрузка видео.

Страницы `app/playlists/page.tsx`, `app/tags/page.tsx`, `app/profile/page.tsx`, `app/favorites/page.tsx`, `app/history/page.tsx` содержат базовую структуру.
