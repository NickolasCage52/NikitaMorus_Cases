/**
 * Читает worker/.env и отправляет BOT_TOKEN, ADMIN_CHAT_ID, ALLOWED_ORIGIN в Cloudflare.
 * Запуск: из папки worker выполнить: node set-secrets.js
 * Нужен: npm i -g wrangler && wrangler login
 */
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const envPath = path.join(__dirname, ".env");
if (!fs.existsSync(envPath)) {
  console.error("Файл worker/.env не найден. Создайте его по образцу .env.example.");
  process.exit(1);
}

const raw = fs.readFileSync(envPath, "utf8").replace(/\r\n/g, "\n");
const env = {};
raw.split("\n").forEach((line) => {
  const idx = line.indexOf("=");
  if (idx <= 0) return;
  const key = line.slice(0, idx).trim();
  let val = line.slice(idx + 1).trim();
  if (/^["']/.test(val)) val = val.replace(/^["']|["']$/g, "");
  if (key && val !== undefined) env[key] = val;
});

const keys = ["BOT_TOKEN", "ADMIN_CHAT_ID", "ALLOWED_ORIGIN", "ALLOWED_ORIGINS"];
const toSet = keys.filter((k) => env[k]);
if (toSet.length === 0) {
  console.error("В .env не найдены BOT_TOKEN, ADMIN_CHAT_ID или ALLOWED_ORIGIN(s).");
  process.exit(1);
}

function setSecret(key) {
  return new Promise((resolve, reject) => {
    const val = env[key];
    if (!val) return resolve();
    const child = spawn("wrangler", ["secret", "put", key], {
      stdio: ["pipe", "inherit", "inherit"],
      cwd: __dirname,
      shell: true,
    });
    child.on("error", reject);
    child.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`wrangler exit ${code}`))));
    child.stdin.write(val + "\n");
    child.stdin.end();
  });
}

(async () => {
  console.log("Отправка секретов в Cloudflare...");
  for (const key of toSet) {
    try {
      await setSecret(key);
      console.log(`  OK: ${key}`);
    } catch (e) {
      console.error(`  Ошибка для ${key}:`, e.message);
      console.log("  Можно задать вручную: cd worker && wrangler secret put " + key);
      process.exit(1);
    }
  }
  console.log("Готово. Деплой: wrangler deploy");
})();
