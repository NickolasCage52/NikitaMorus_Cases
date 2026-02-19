/**
 * Модуль отправки заявок на serverless endpoint.
 * Токен бота и chat_id только на сервере; здесь только URL endpoint.
 */
(function (global) {
  "use strict";

  var NAME_MIN = 2;
  var NAME_MAX = 60;
  var CONTACT_MIN = 3;
  var CONTACT_MAX = 80;
  var MESSAGE_MIN = 10;
  var MESSAGE_MAX = 2000;

  function getPayloadFromForm(form) {
    var fd = new FormData(form);
    var source = form.dataset.source || "cases-landing";
    var caseSlug = (form.dataset.caseSlug || "").trim();
    return {
      name: (fd.get("name") || "").trim(),
      contact: (fd.get("contact") || "").trim(),
      message: (fd.get("message") || "").trim(),
      source: source,
      caseSlug: caseSlug || null,
      company: (fd.get("company") || "").trim(),
    };
  }

  function validateLead(payload) {
    if (!payload.name || payload.name.length < NAME_MIN) return "Имя: от 2 до 60 символов.";
    if (payload.name.length > NAME_MAX) return "Имя: не более 60 символов.";
    if (!payload.contact || payload.contact.length < CONTACT_MIN) return "Контакт: от 3 до 80 символов.";
    if (payload.contact.length > CONTACT_MAX) return "Контакт: не более 80 символов.";
    if (!payload.message || payload.message.length < MESSAGE_MIN) return "Сообщение: не менее 10 символов.";
    if (payload.message.length > MESSAGE_MAX) return "Сообщение: не более 2000 символов.";
    if (payload.company) return "Заявка не принята.";
    return null;
  }

  function userMessage(errorCode) {
    var messages = {
      validation_error: "Проверьте поля: имя 2–60 символов, контакт 3–80, сообщение 10–2000.",
      rate_limited: "Слишком много запросов. Попробуйте через 10 минут.",
      telegram_error: "Не удалось отправить заявку. Попробуйте позже.",
    };
    return messages[errorCode] || "Ошибка отправки. Попробуйте ещё раз.";
  }

  var FETCH_TIMEOUT_MS = 15000;

  function submitLead(endpoint, payload) {
    if (!endpoint || typeof endpoint !== "string" || !endpoint.startsWith("http")) {
      return Promise.resolve({ ok: false, error: "not_configured" });
    }
    var clientError = validateLead(payload);
    if (clientError) {
      return Promise.resolve({ ok: false, error: clientError });
    }
    var controller = new AbortController();
    var timeoutId = setTimeout(function () {
      controller.abort();
    }, FETCH_TIMEOUT_MS);
    return fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        contact: payload.contact,
        message: payload.message,
        source: payload.source,
        caseSlug: payload.caseSlug || null,
        company: payload.company || "",
      }),
      signal: controller.signal,
    })
      .then(function (res) {
        clearTimeout(timeoutId);
        return res.json().then(
          function (data) {
            if (res.ok && data.ok) return { ok: true };
            var msg = (data && data.error) ? userMessage(data.error) : userMessage("telegram_error");
            return { ok: false, error: msg };
          },
          function () {
            return { ok: false, error: userMessage("telegram_error") };
          }
        );
      })
      .catch(function (err) {
        clearTimeout(timeoutId);
        if (err && err.name === "AbortError") {
          return { ok: false, error: "Превышено время ожидания. Попробуйте позже." };
        }
        return { ok: false, error: "Нет связи. Проверьте интернет и попробуйте снова." };
      });
  }

  global.Leads = {
    getPayloadFromForm: getPayloadFromForm,
    validateLead: validateLead,
    submitLead: submitLead,
  };
})(typeof window !== "undefined" ? window : this);
