# Быстрый запуск Worker (заявки в Telegram)

В **worker/.env** уже указаны BOT_TOKEN, ADMIN_CHAT_ID и ALLOWED_ORIGINS. Осталось отправить их в Cloudflare и задеплоить.

## 1. Установка и вход

```bash
npm i -g wrangler
wrangler login
```

(Откроется браузер для входа в Cloudflare.)

## 2. Задать секреты в Cloudflare

Перейдите в папку worker и по очереди выполните команды. Когда wrangler запросит значение — откройте файл **worker/.env**, скопируйте нужную строку (только значение после `=`) и вставьте в терминал.

```bash
cd worker
wrangler secret put BOT_TOKEN
# Вставьте значение BOT_TOKEN из .env, Enter

wrangler secret put ADMIN_CHAT_ID
# Вставьте значение ADMIN_CHAT_ID из .env, Enter

wrangler secret put ALLOWED_ORIGINS
# Вставьте значение ALLOWED_ORIGINS из .env (например https://nickolascage52.github.io), Enter
```

Либо запустите скрипт (если wrangler в PATH):

```bash
cd worker
node set-secrets.js
```

## 3. Деплой

```bash
cd worker
wrangler deploy
```

В выводе будет URL, например: `https://leads-bot.<ваш-аккаунт>.workers.dev`  
**Endpoint для формы:** `https://leads-bot.<ваш-аккаунт>.workers.dev/api/lead`

## 4. Подключить сайт

В корне проекта в **.env** добавьте (или задайте в GitHub Actions секрет LEADS_ENDPOINT):

```
LEADS_ENDPOINT=https://leads-bot.<ваш-аккаунт>.workers.dev/api/lead
```

Выполните `npm run build` и задеплойте сайт. Форма начнёт отправлять заявки в Telegram.

---

**Опционально (rate limit и защита от дублей):**  
Создайте KV: `wrangler kv:namespace create LEADS_RATE`, подставьте выданный `id` в **worker/wrangler.toml** в блок `kv_namespaces`, раскомментируйте блок и снова выполните `wrangler deploy`.
