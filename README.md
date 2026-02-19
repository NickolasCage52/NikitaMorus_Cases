# Кейсы разработчика — лендинг

Статический лендинг кейсов (Vanilla HTML/CSS/JS). Сборка копирует `index.html` и папку `assets` в `dist`. Деплой — GitHub Pages через Actions. Заявки с формы уходят на serverless endpoint (Cloudflare Worker), см. [LEADS_BOT_SETUP.md](LEADS_BOT_SETUP.md).

## Переменная LEADS_ENDPOINT

Чтобы форма заявок работала, при сборке должна быть задана переменная **LEADS_ENDPOINT** (URL вашего Cloudflare Worker, например `https://leads-bot.xxx.workers.dev/api/lead`). Задайте её в `.env` в корне проекта (см. `.env.example`) и выполните `npm run build` — значение подставится в `dist`. Без неё форма покажет «Форма временно недоступна».

## Локальный запуск

```bash
npm install
npm run build
npm run dev
```

Откройте http://localhost:4173 (или порт, который выведет сервер).

Проверка собранного сайта одной командой:

```bash
npm run preview
```

(собирает проект и поднимает сервер с папки `dist`)

## Деплой на GitHub Pages

1. Репозиторий на GitHub → **Settings** → **Pages** → **Source**: GitHub Actions.
2. Ветка `main`: при пуше запускается workflow `.github/workflows/deploy.yml`: сборка и публикация `dist`.
3. Сайт будет доступен по адресу: `https://<username>.github.io/<repo-name>/`.

Подробнее: [LEADS_BOT_SETUP.md](LEADS_BOT_SETUP.md) — настройка приёма заявок в Telegram (endpoint, секреты Worker).

**Проверка деплоя:** после пуша откройте вкладку **Actions** в репозитории → дождитесь успешного завершения workflow → откройте URL GitHub Pages (указан в шаге Deploy или в Settings → Pages).
