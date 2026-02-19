/**
 * Serverless endpoint для приёма заявок с сайта и отправки в Telegram.
 * Секреты: BOT_TOKEN, ADMIN_CHAT_ID, ALLOWED_ORIGIN(s) — только через wrangler secret put.
 */

const RATE_LIMIT_WINDOW = 600;   // 10 min
const RATE_LIMIT_MAX = 5;
const DUP_TTL = 30;
const NAME_MIN = 2;
const NAME_MAX = 60;
const CONTACT_MIN = 3;
const CONTACT_MAX = 80;
const MESSAGE_MIN = 10;
const MESSAGE_MAX_LENGTH = 2000;

function jsonResponse(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

function corsHeaders(origin, allowed) {
  const list = allowed ? allowed.split(",").map((o) => o.trim()).filter(Boolean) : [];
  const allowOrigin = list.includes(origin) ? origin : null;
  const h = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
  if (allowOrigin) h["Access-Control-Allow-Origin"] = allowOrigin;
  return h;
}

function sanitize(str, maxLen) {
  if (typeof str !== "string") return "";
  return str.slice(0, maxLen).replace(/\s+/g, " ").trim();
}

/** Экранирование для Telegram HTML (parse_mode: "HTML") */
function escapeTg(s) {
  if (typeof s !== "string") return "";
  return s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] || c));
}

/** Хеш payload для защиты от дублей (SHA-256, первые 16 байт в hex) */
async function payloadHash(name, contact, message, source, caseSlug) {
  const canonical = [name, contact, message, source || "", caseSlug || ""].join("|");
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(canonical));
  const arr = new Uint8Array(buf);
  let hex = "";
  for (let i = 0; i < Math.min(16, arr.length); i++) hex += arr[i].toString(16).padStart(2, "0");
  return hex;
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin") || "";
    const allowedOrigins = env.ALLOWED_ORIGINS || env.ALLOWED_ORIGIN || "";
    const headers = { ...corsHeaders(origin, allowedOrigins) };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (request.method !== "POST") {
      return jsonResponse({ ok: false, error: "Method not allowed" }, 405, headers);
    }

    const url = new URL(request.url);
    if (!url.pathname.endsWith("/api/lead")) {
      return jsonResponse({ ok: false, error: "Not found" }, 404, headers);
    }

    const ip = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "unknown";
    const userAgent = request.headers.get("User-Agent") || "";

    if (env.LEADS_RATE) {
      const rlKey = `rl:${ip}`;
      const nowSec = Math.floor(Date.now() / 1000);
      const raw = await env.LEADS_RATE.get(rlKey);
      let count = 0;
      let windowEnd = nowSec + RATE_LIMIT_WINDOW;
      if (raw) {
        const parts = raw.split(":");
        count = parseInt(parts[0], 10) || 0;
        const expiry = parseInt(parts[1], 10) || 0;
        if (nowSec >= expiry) {
          count = 0;
          windowEnd = nowSec + RATE_LIMIT_WINDOW;
        } else {
          windowEnd = expiry;
        }
      }
      if (count >= RATE_LIMIT_MAX) {
        return jsonResponse({ ok: false, error: "rate_limited" }, 429, headers);
      }
      await env.LEADS_RATE.put(rlKey, `${count + 1}:${windowEnd}`, { expirationTtl: windowEnd - nowSec + 1 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ ok: false, error: "validation_error" }, 400, headers);
    }

    const honeypot = (body.company || "").trim();
    if (honeypot) {
      return jsonResponse({ ok: true }, 200, headers);
    }

    const name = sanitize(body.name, NAME_MAX);
    const contact = sanitize(body.contact, CONTACT_MAX);
    const message = sanitize(body.message || "", MESSAGE_MAX_LENGTH);

    if (name.length < NAME_MIN || name.length > NAME_MAX) {
      return jsonResponse({ ok: false, error: "validation_error" }, 400, headers);
    }
    if (contact.length < CONTACT_MIN || contact.length > CONTACT_MAX) {
      return jsonResponse({ ok: false, error: "validation_error" }, 400, headers);
    }
    if (message.length < MESSAGE_MIN || message.length > MESSAGE_MAX_LENGTH) {
      return jsonResponse({ ok: false, error: "validation_error" }, 400, headers);
    }

    const source = sanitize(body.source || "cases-site", 64);
    const caseSlug = sanitize(body.caseSlug || "", 64);
    const now = new Date().toISOString();

    if (env.LEADS_RATE) {
      const hash = await payloadHash(name, contact, message, source, caseSlug);
      const dupKey = `dup:${hash}`;
      if (await env.LEADS_RATE.get(dupKey)) {
        return jsonResponse({ ok: true }, 200, headers);
      }
      await env.LEADS_RATE.put(dupKey, "1", { expirationTtl: DUP_TTL });
    }

    const lines = [
      "✅ Новая заявка",
      "",
      "👤 Имя: " + name,
      "📩 Контакт: " + contact,
      "📝 Сообщение: " + message,
      "🧩 Кейс: " + (caseSlug || "—"),
      "🌐 Source: " + source,
      "🕒 Time: " + now,
      "🧷 Meta: IP " + ip + " | UA " + userAgent.slice(0, 200),
    ];
    const htmlText = lines.map((line) => escapeTg(line)).join("<br>");

    const token = env.BOT_TOKEN;
    const chatId = env.ADMIN_CHAT_ID;
    if (!token || !chatId) {
      return jsonResponse({ ok: false, error: "telegram_error" }, 500, headers);
    }

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: htmlText,
        disable_web_page_preview: true,
        parse_mode: "HTML",
      }),
    });

    if (!tgRes.ok) {
      return jsonResponse({ ok: false, error: "telegram_error" }, 500, headers);
    }

    return jsonResponse({ ok: true }, 200, headers);
  },
};
