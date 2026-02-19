# Настройка приёма заявок в Telegram (Leads Bot)

Заявки с форм сайта отправляются на serverless endpoint, который валидирует данные и пересылает их в Telegram. **Токен бота хранится только в секретах (Cloudflare Workers), не в коде и не в репозитории.**

---

## 1. Создание бота и получение токена

1. Откройте [@BotFather](https://t.me/BotFather) в Telegram.
2. Отправьте `/newbot`, укажите имя и username бота.
3. Сохраните выданный **токен** (например `123456789:ABCdefGHI...`).  
   **Важно:** если токен когда-либо попадал в чат или в git — сразу замените его через BotFather (`/revoke` или создайте нового бота) и обновите секрет в Cloudflare.

---

## 2. Узнать chat_id (куда слать заявки)

**Вариант A — личные сообщения вам:**

1. Напишите боту любое сообщение (например «привет»).
2. Откройте в браузере (подставьте свой `BOT_TOKEN`):  
   `https://api.telegram.org/bot<BOT_TOKEN>/getUpdates`
3. В ответе найдите `"chat":{"id": 123456789}` — это ваш `chat_id`.

**Вариант B — группа:**

1. Добавьте бота в группу.
2. Напишите в группе сообщение.
3. Снова откройте `getUpdates` — в ответе будет `chat.id` группы (обычно отрицательное число, например `-1001234567890`).

После того как узнали chat_id, **удалите или смените токен**, если открывали getUpdates в браузере с токеном в URL.

---

## 3. Cloudflare Workers: деплой и секреты

### 3.1. Установка Wrangler

```bash
npm i -g wrangler
wrangler login
```

### 3.2. KV namespace для rate limit

```bash
cd worker
wrangler kv:namespace create LEADS_RATE
```

В выводе будет `id = "..."`. Подставьте его в `worker/wrangler.toml` в блок `kv_namespaces`:

```toml
kv_namespaces = [
  { binding = "LEADS_RATE", id = "ВАШ_ID" }
]
```

### 3.3. Секреты (никогда не коммитьте значения)

```bash
cd worker
wrangler secret put BOT_TOKEN
# Введите токен бота когда запросит

wrangler secret put ADMIN_CHAT_ID
# Введите chat_id (число или строка)

wrangler secret put ALLOWED_ORIGIN
# Введите точный origin сайта, например: https://nickolascage52.github.io
# Несколько доменов: используйте секрет ALLOWED_ORIGINS и перечислите через запятую:
#   wrangler secret put ALLOWED_ORIGINS
#   https://nickolascage52.github.io,http://localhost:4173
```

### 3.4. Деплой

```bash
cd worker
wrangler deploy
```

В выводе будет URL воркера, например:  
`https://leads-bot.<your-subdomain>.workers.dev`

Endpoint для заявок: **`https://leads-bot.<your-subdomain>.workers.dev/api/lead`**

---

## 4. Настройка фронта (GitHub Pages)

В коде сайта **не должно быть токена**. Только URL endpoint. Значение подставляется при сборке из переменной окружения.

**Способ 1 — через .env (локально и в CI):**

1. В корне проекта создайте файл `.env` (не коммитьте его; он в `.gitignore`).
2. Добавьте строку (подставьте свой URL воркера из шага 3.4):

```
LEADS_ENDPOINT=https://leads-bot.<your-subdomain>.workers.dev/api/lead
```

3. Выполните сборку: `npm run build`. Скрипт подставит `LEADS_ENDPOINT` в `dist/assets/js/cases.js`.
4. Для GitHub Pages: в репозитории **Settings** → **Secrets and variables** → **Actions** добавьте секрет (или переменную) `LEADS_ENDPOINT` с URL воркера; workflow при сборке подставит его в `dist`.

**Способ 2 — вручную:** откройте `assets/js/cases.js`, задайте `const LEADS_ENDPOINT = "https://...";`, затем `npm run build`. Не коммитьте URL с секретами.

Без заданного `LEADS_ENDPOINT` форма покажет «Форма временно недоступна» и кнопка будет отключена.

---

## 5. Проверка endpoint через curl

Подставьте свой URL endpoint (из шага 3.4) в переменную и выполните:

```bash
export LEADS_ENDPOINT="https://leads-bot.<your-subdomain>.workers.dev/api/lead"
curl -X POST "$LEADS_ENDPOINT" \
  -H "Content-Type: application/json" \
  -H "Origin: https://nickolascage52.github.io" \
  -d '{"name":"Тест","contact":"@user","message":"Проверка формы с сайта (не менее 10 символов)","source":"cases-site","caseSlug":null,"company":""}'
```

Ожидается ответ `{"ok":true}` и сообщение в Telegram.

**Проверка honeypot (тихий дроп):** при заполненном поле `company` сервер возвращает `200 {"ok":true}`, но в Telegram ничего не отправляет.

```bash
curl -X POST "$LEADS_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"Спам","contact":"xx","message":"длинное сообщение больше десяти символов","company":"filled"}'
```

Ожидается `200` и `{"ok":true}` без сообщения в чате.

**Проверка rate limit (5 запросов / 10 мин на IP):** отправьте 6-й запрос подряд с одного IP — должен вернуться `429` и `{"ok":false,"error":"rate_limited"}`.

---

## 6. Ротация токена (если токен мог утечь)

1. В [@BotFather](https://t.me/BotFather): `/mybots` → выберите бота → API Token → Revoke current token (или создайте нового бота).
2. В Cloudflare: `wrangler secret put BOT_TOKEN` и введите новый токен.
3. Передеплойте воркер: `wrangler deploy`.
4. Если токен попал в git history — смените его (п.1–2). Удаление из истории (например `git filter-repo` / BFG) опционально, но смена токена обязательна.

---

## Безопасность и чеклист

- [ ] **Токен не в репо:** `BOT_TOKEN` и `ADMIN_CHAT_ID` только в Secrets (wrangler secret put), не в коде и не в git.
- [ ] **Фронт не дергает Telegram:** только POST на ваш serverless endpoint; в клиентском коде нет токена и chat_id.
- [ ] **CORS не `*`:** в секрете `ALLOWED_ORIGIN` или `ALLOWED_ORIGINS` указан только ваш домен GitHub Pages (и при необходимости локальный origin для разработки).
- [ ] **Rate limit включён:** KV namespace `LEADS_RATE` создан и привязан в `wrangler.toml`; лимит 5 запросов / 10 мин на IP.
- [ ] **Ротация токена:** если токен когда-либо светился в чате или в истории репозитория — отзовите его в BotFather и задайте новый через `wrangler secret put BOT_TOKEN`.
