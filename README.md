# Кейсы разработчика Морус Никиты

Статический лендинг/портфолио кейсов с detail-view страницами в едином стиле.

## Локальный запуск

```bash
npm ci
npm run build
npm run dev
```

После запуска сервер покажет локальный URL в консоли (`http://localhost:4173` или следующий свободный порт).

## Структура и данные

- Данные кейсов: `assets/js/cases.js`
- Стили: `assets/css/styles.css`
- Главный HTML: `index.html`
- Скриншоты кейсов: `assets/images/cases/`

### Где менять ссылки кейсов

В `assets/js/cases.js` у каждого кейса:

- `caseUrl` — ссылка кнопки "Открыть проект"
- `contactUrl` — ссылка кнопки "Связаться"

## Detail view кейсов

Карточки открывают detail-view через query route:

- `./?case=<slug>`

Это работает стабильно на GitHub Pages без серверного роутинга.

## GitHub Pages Deploy

Workflow: `.github/workflows/deploy.yml`

- Запуск: автоматически при `push` в `main`
- Build output: `dist/`
- Deploy: GitHub Actions Pages
- Node: `20`
- Install: `npm ci`

### Про base path

Проект использует относительные пути (`./assets/...`), поэтому дополнительная настройка `base` не требуется.

### SPA fallback

При сборке создается `dist/404.html` как копия `index.html`, чтобы fallback корректно отрабатывал на GitHub Pages.
