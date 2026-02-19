# Что вставить в консоль для запуска

Данные уже подставлены в `worker/.env` (файл в .gitignore, в репозиторий не попадёт).

---

## 1. Установка Wrangler (один раз)

В PowerShell:

```powershell
npm install -g wrangler
wrangler login
```

(Откроется браузер — войдите в аккаунт Cloudflare.)

---

## 2. KV для лимита запросов (один раз)

```powershell
cd worker
wrangler kv:namespace create LEADS_RATE
```

В выводе будет строка вида `id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"`.  
Скопируйте этот **id** и вставьте его в `worker/wrangler.toml`: замените `PUT_YOUR_KV_NAMESPACE_ID` на этот id.

---

## 3. Секреты (значения взять из worker/.env)

По очереди выполните (когда запросит ввод — вставьте значение из `worker/.env` и Enter):

```powershell
cd worker
wrangler secret put BOT_TOKEN
```
→ когда попросит, вставьте строку из .env после `BOT_TOKEN=` (без кавычек) и Enter.

```powershell
wrangler secret put ADMIN_CHAT_ID
```
→ вставьте: `-5268288627`

```powershell
wrangler secret put ALLOWED_ORIGINS
```
→ вставьте: `https://nickolascage52.github.io`  
(Если сайт на другом домене — укажите его.)

---

## 4. Деплой воркера

```powershell
cd worker
wrangler deploy
```

В конце будет строка вида:
`Published leads-bot (x.xx sec)  
  https://leads-bot.<ВАШ_АККАУНТ>.workers.dev`

Скопируйте этот URL. Endpoint для заявок: **`https://leads-bot.<ВАШ_АККАУНТ>.workers.dev/api/lead`**

---

## 5. Подставить endpoint на сайте

Откройте **`assets/js/cases.js`**, найдите в начале:

```javascript
const LEADS_ENDPOINT = "";
```

Замените на (подставьте свой URL из шага 4):

```javascript
const LEADS_ENDPOINT = "https://leads-bot.ВАШ_АККАУНТ.workers.dev/api/lead";
```

Сохраните. После этого форма на сайте будет отправлять заявки в Telegram.

---

## 6. Локальный запуск сайта (проверка фронта)

Из корня проекта:

```powershell
npx serve .
```

или откройте `index.html` через расширение Live Server.  
Проверьте форму внизу страницы.

---

## 7. Проверка endpoint (curl)

После деплоя (подставьте свой URL):

```powershell
curl -X POST "https://leads-bot.ВАШ_АККАУНТ.workers.dev/api/lead" -H "Content-Type: application/json" -H "Origin: https://nickolascage52.github.io" -d "{\"name\":\"Тест\",\"contact\":\"@user\",\"message\":\"Проверка формы с сайта\",\"source\":\"cases-landing\",\"company\":\"\"}"
```

Ожидается ответ `{"ok":true}` и сообщение в Telegram в чате с ID -5268288627.

---

**Важно:** токен бота был передан в чате. После первой настройки желательно в @BotFather отозвать этот токен, создать новый и заново выполнить `wrangler secret put BOT_TOKEN` с новым значением.
