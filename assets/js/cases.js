const CONTACT_URL = "https://t.me/nikmorus";

const CASES = [
  {
    id: "case-02",
    slug: "miniapp-mvp-online-school",
    category: "Онлайн-образование",
    filter: "edu",
    title: "MiniApp-MVP каталога для онлайн-школы",
    summary:
      "Онлайн-школа запускала новый формат и хотела быстро проверить спрос без долгой сборки продукта.",
    goal: "Собрать заявки и измерить интерес к программе",
    timeline: "4 дня",
    status: "",
    images: [
      "./assets/images/cases/case-02.png",
      "./assets/images/cases/case-02-2.png",
      "./assets/images/cases/case-02-3.png"
    ],
    caseUrl: "https://nickolascage52.github.io/School_MVP-/",
    contactUrl: CONTACT_URL,
    sourceUrl: "https://nickolascage52.github.io/School_MVP-/",
    kpis: [
      { label: "Заявки", value: "212", tone: "main" },
      { label: "Конверсия", value: "6.2%", tone: "main" },
      { label: "CPL", value: "-28%", tone: "main" },
      { label: "Время до MVP", value: "4 дня", tone: "secondary" },
      { label: "Стоимость итерации", value: "-19%", tone: "secondary" }
    ],
    problem:
      "Нужно было быстро проверить интерес к новому формату без разработки отдельного сайта и долгого цикла согласований.",
    solution:
      "Собрали MiniApp с каталогом и заявкой в Telegram, подключили аналитику и трекинг UTM, настроили маршрутизацию лидов.",
    result:
      "Школа получила валидные заявки в первый запуск и измеримые данные для решения о масштабировании.",
    stack: ["Telegram Mini Apps", "JavaScript", "n8n", "Google Sheets", "UTM Analytics"],
    process: [
      { step: "Discovery", time: "День 1", note: "Цели, воронка, карта событий" },
      { step: "Prototype", time: "День 2", note: "Прототип каталога и формы" },
      { step: "Build", time: "День 3", note: "Интеграции и сборка сценариев" },
      { step: "Launch", time: "День 4", note: "Публикация и контроль метрик" }
    ],
    workDone: [
      "UX-поток каталога и заявки",
      "Сегментация интереса по программе",
      "UTM-метки и трекинг конверсий",
      "Интеграция заявок в таблицу/CRM",
      "Инструкции для команды продаж"
    ]
  },
  {
    id: "case-03",
    slug: "b2b-sales-automation",
    category: "B2B сервис",
    filter: "b2b",
    title: "Автоматизация продаж для B2B-сервиса",
    summary:
      "Команда обрабатывала лиды вручную и теряла скорость ответа. Внедрили процесс, который убрал рутину по статусам и КП.",
    goal: "Ускорить менеджеров и убрать рутину по статусам/КП",
    timeline: "7 дней",
    status: "",
    images: [
      "./assets/images/cases/case-03.png",
      "./assets/images/cases/case-03-2.png",
      "./assets/images/cases/case-03-3.png"
    ],
    caseUrl: "https://t.me/Finance_Technical_Bot",
    contactUrl: CONTACT_URL,
    kpis: [
      { label: "Экономия времени", value: "18 ч/нед", tone: "main" },
      { label: "Скорость ответа", value: "20 мин", tone: "main" },
      { label: "Статусы", value: "100%", tone: "main" },
      { label: "Доля обработанных лидов", value: "+24%", tone: "secondary" },
      { label: "Ошибки статусов", value: "-33%", tone: "secondary" }
    ],
    problem:
      "Лиды распределялись вручную, менеджеры дублировали действия и пропускали часть обращений в пиковые часы.",
    solution:
      "Настроили pipeline с квалификацией, автопроставлением статусов и автоматической генерацией коммерческих предложений.",
    result:
      "Команда продаж стала отвечать быстрее и работать по прозрачному SLA, а руководитель получил единый контур контроля.",
    stack: ["Telegram Bot", "CRM", "n8n", "Webhooks", "Google Docs API"],
    process: [
      { step: "Discovery", time: "День 1", note: "Аудит воронки и SLA" },
      { step: "Prototype", time: "День 2", note: "Схема маршрутизации лидов" },
      { step: "Build", time: "Дни 3-6", note: "Интеграции, статусы, КП" },
      { step: "Launch", time: "День 7", note: "Запуск и handoff продажам" }
    ],
    workDone: [
      "Карта маршрутов лидов по источникам",
      "Правила квалификации и приоритетов",
      "Автопостановка задач менеджерам",
      "Генерация КП по шаблонам",
      "Оповещения о рисках SLA"
    ]
  },
  {
    id: "case-04",
    slug: "modular-houses-website",
    category: "E-commerce / Недвижимость",
    filter: "ecom",
    title: "Сайт для компании по продаже модульных домов",
    summary:
      "Собрали конвертящий сайт с упором на комплектации, квиз и прозрачную структуру модели, чтобы повысить заявки из рекламы.",
    goal: "Конвертящий сайт + квиз/форма + аналитика",
    timeline: "10 дней",
    status: "",
    images: [
      "./assets/images/cases/case-04.png",
      "./assets/images/cases/case-04-2.png",
      "./assets/images/cases/case-04-3.png"
    ],
    caseUrl: "https://xn--80adi5aimmhr.xn--p1ai/",
    contactUrl: CONTACT_URL,
    kpis: [
      { label: "Конверсия в заявку", value: "4.1%", tone: "main" },
      { label: "Рост заявок", value: "+36%", tone: "main" },
      { label: "CPL", value: "-19%", tone: "main" },
      { label: "Время на сайте", value: "+27%", tone: "secondary" },
      { label: "Доля квиз-заявок", value: "41%", tone: "secondary" }
    ],
    problem:
      "Трафик шел на старую посадочную страницу с низкой конверсией и неструктурированной подачей комплектаций.",
    solution:
      "Пересобрали архитектуру сайта, выделили оффер и CTA, добавили квиз, формы и аналитический контур по этапам воронки.",
    result:
      "После запуска увеличился объем целевых заявок, а стоимость привлечения снизилась при том же рекламном бюджете.",
    stack: ["HTML/CSS/JS", "Quiz Flow", "Yandex Metrica", "GA4", "CRM Integration"],
    process: [
      { step: "Discovery", time: "Дни 1-2", note: "Аудит трафика и оффера" },
      { step: "Prototype", time: "Дни 3-4", note: "Прототип экранов и квиза" },
      { step: "Build", time: "Дни 5-9", note: "Верстка, формы, аналитика" },
      { step: "Launch", time: "День 10", note: "Публикация и QA трафика" }
    ],
    workDone: [
      "Структура оффера и продуктовой линейки",
      "Квиз с логикой подбора комплектации",
      "Формы с валидацией и anti-spam",
      "События аналитики по этапам",
      "А/Б-готовые блоки первого экрана"
    ]
  },
  {
    id: "case-05",
    slug: "retro-lamps-website",
    category: "E-commerce",
    filter: "ecom",
    title: "Сайт по продаже настольных светильников в ретро-стиле",
    summary:
      "Нужен был стильный магазин-лендинг под ретро-бренд с фокусом на визуал, карточки товара и бесшовный заказ.",
    goal: "Увеличить продажи и средний чек через UX",
    timeline: "8 дней",
    status: "",
    images: [
      "./assets/images/cases/case-05.png",
      "./assets/images/cases/case-05-2.png",
      "./assets/images/cases/case-05-3.png"
    ],
    caseUrl: "https://nickolascage52.github.io/Site_for_pixart/",
    contactUrl: CONTACT_URL,
    sourceUrl: "https://nickolascage52.github.io/Site_for_pixart/",
    kpis: [
      { label: "Конверсия", value: "3.4%", tone: "main" },
      { label: "Средний чек", value: "+17%", tone: "main" },
      { label: "Добавления в корзину", value: "+29%", tone: "main" },
      { label: "CTR кнопок CTA", value: "+22%", tone: "secondary" },
      { label: "Отказы на мобайле", value: "-14%", tone: "secondary" }
    ],
    problem:
      "Продукт визуально сильный, но старый интерфейс не передавал ценность и плохо конвертировал мобильный трафик.",
    solution:
      "Собрали брендовый интерфейс с акцентом на карточки, микроанимации, быстрый путь к покупке и понятный выбор моделей.",
    result:
      "Повысили вовлеченность и рост ключевых e-commerce метрик без увеличения рекламных расходов.",
    stack: ["UI Motion", "Vanilla JS", "Catalog UX", "Analytics", "Checkout Flow"],
    process: [
      { step: "Discovery", time: "День 1", note: "Разбор поведения пользователей" },
      { step: "Prototype", time: "Дни 2-3", note: "Сетка и UI-кит" },
      { step: "Build", time: "Дни 4-7", note: "Верстка и микровзаимодействия" },
      { step: "Launch", time: "День 8", note: "Релиз и QA ключевых экранов" }
    ],
    workDone: [
      "Пересборка hero и каталога",
      "Карточки товара с акцентом на выгоды",
      "Микроанимации CTA и hover",
      "Оптимизация мобильной сетки",
      "События аналитики на воронку заказа"
    ]
  },
  {
    id: "case-06",
    slug: "seafood-order-automation",
    category: "Логистика / B2B",
    filter: "logistics",
    title: "Автоматизация заказов по поставке морепродуктов",
    summary:
      "Заказы из мессенджеров и почты терялись, подтверждение занимало много времени. Автоматизировали цепочку заказа и статусов.",
    goal: "Автоматизировать прием, подтверждение, документы и статусы",
    timeline: "12 дней",
    status: "",
    images: [
      "./assets/images/cases/case-06.png",
      "./assets/images/cases/case-06-2.png",
      "./assets/images/cases/case-06-3.png"
    ],
    caseUrl: "https://nickolascage52.github.io/worldseafood-mvp",
    contactUrl: CONTACT_URL,
    kpis: [
      { label: "Обработка заказа", value: "-44%", tone: "main" },
      { label: "Ошибки в заказах", value: "-31%", tone: "main" },
      { label: "Подтверждение", value: "<= 22 мин", tone: "main" },
      { label: "Пропущенные позиции", value: "-27%", tone: "secondary" },
      { label: "SLA подтверждения", value: "96%", tone: "secondary" }
    ],
    problem:
      "Заказы поступали в разные каналы, менеджеры вручную сводили позиции и часто задерживали подтверждение клиенту.",
    solution:
      "Сделали единый вход заказа, автоматическое подтверждение, генерацию счетов и статусы в реальном времени для команды.",
    result:
      "Операционный цикл стал предсказуемым: меньше ошибок, быстрее подтверждение и прозрачная логистика по этапам.",
    stack: ["MiniApp", "Telegram", "n8n", "CRM", "Docs API", "Webhooks"],
    process: [
      { step: "Discovery", time: "Дни 1-2", note: "Аудит каналов заказов" },
      { step: "Prototype", time: "Дни 3-4", note: "Схема статусов и документов" },
      { step: "Build", time: "Дни 5-11", note: "Сборка автоматизаций" },
      { step: "Launch", time: "День 12", note: "Обучение команды и запуск" }
    ],
    workDone: [
      "Единый формат приема заказа",
      "Проверка наличия и валидация позиций",
      "Автогенерация счета и накладной",
      "Статусы заказа в реальном времени",
      "Уведомления менеджерам и клиенту"
    ]
  },
  {
    id: "case-01",
    slug: "fintech-lead-bot",
    category: "Финтех / B2B",
    filter: "fintech",
    title: "Лид-бот для финтех-сервиса",
    summary:
      "B2B финтех-сервис получал лиды из рекламы и Telegram. Кейс обновляется: сейчас идет доработка сценариев квалификации и интеграций.",
    goal: "Автоматическая квалификация + запись в CRM",
    timeline: "В разработке",
    status: "В разработке",
    images: [
      "./assets/images/cases/case-01.png",
      "./assets/images/cases/case-01-2.png",
      "./assets/images/cases/case-01-3.png"
    ],
    caseUrl: "https://nickolascage52.github.io/KliningCompany_MVP_site/",
    contactUrl: CONTACT_URL,
    kpis: [],
    problem:
      "Лиды поступают из нескольких каналов, а качество первичной квалификации нестабильно и зависит от ручной обработки.",
    solution:
      "Собираем финальную версию бота с адаптивным скриптом квалификации и маршрутизацией заявок по приоритетам.",
    result:
      "После завершения релиза откроем итоговые KPI по качеству квалификации, скорости ответа и доле валидных лидов.",
    stack: ["Telegram Bot", "CRM", "Webhook Router", "LLM Prompting", "Analytics"],
    process: [
      { step: "Discovery", time: "Итерация 1", note: "Сценарии квалификации" },
      { step: "Prototype", time: "Итерация 2", note: "Ветки диалога и scoring" },
      { step: "Build", time: "Итерация 3", note: "Интеграции и тесты" },
      { step: "Launch", time: "Итерация 4", note: "Пилот и пост-оптимизация" }
    ],
    workDone: [
      "Каркас диалога и business-rules",
      "Маршрутизация лидов в CRM",
      "Логика квалификации по сегментам",
      "Система уведомлений менеджеров",
      "Тест-кейсы для финального релиза"
    ]
  }
];

const FILTERS = [
  { id: "all", label: "Все" },
  { id: "fintech", label: "Финтех" },
  { id: "edu", label: "Онлайн-образование" },
  { id: "b2b", label: "B2B" },
  { id: "ecom", label: "E-commerce" },
  { id: "logistics", label: "Логистика" }
];

const state = {
  activeFilter: "all",
  currentCaseSlug: ""
};

function TopBar() {
  return `
    <header class="section topbar">
      <a class="brand" href="#top">Морус Никита</a>
      <nav class="topnav" aria-label="Навигация по странице">
        <a href="./#cases">Кейсы</a>
        <a href="./#process">Процесс</a>
        <a href="${CONTACT_URL}" target="_blank" rel="noopener noreferrer">Контакты</a>
      </nav>
      <a class="btn topbar-cta" href="${CONTACT_URL}" target="_blank" rel="noopener noreferrer">Разобрать задачу</a>
    </header>
  `;
}

function Hero() {
  return `
    <section class="section hero" id="top">
      <div class="hero-card">
        <span class="eyebrow">Портфолио разработчика</span>
        <h1><span class="gradient-text">Кейсы</span> разработчика Морус Никиты</h1>
        <p>
          Проектирую AI-инструменты, автоматизации и конвертящие страницы, которые дают понятный бизнес-эффект:
          больше квалифицированных лидов, быстрее обработка и меньше ручной рутины.
        </p>
        <div class="hero-actions">
          <a href="./#cases" class="btn btn-primary">Смотреть кейсы</a>
          <a href="${CONTACT_URL}" class="btn" target="_blank" rel="noopener noreferrer">Написать мне</a>
        </div>
      </div>
    </section>
  `;
}

function FilterTabs() {
  const tabs = FILTERS.map(
    (tab) => `
      <button
        class="filter-tab ${state.activeFilter === tab.id ? "is-active" : ""}"
        data-filter="${tab.id}"
        type="button"
      >
        ${tab.label}
      </button>
    `
  ).join("");

  return `
    <section class="section filters" aria-label="Фильтр кейсов">
      <div class="filter-wrap" role="tablist" aria-label="Категории кейсов">
        <span class="filter-indicator" aria-hidden="true"></span>
        ${tabs}
      </div>
    </section>
  `;
}

function KpiBadge(kpi) {
  return `
    <div class="kpi">
      <div class="kpi-label">${kpi.label}</div>
      <div class="kpi-value">${kpi.value}</div>
    </div>
  `;
}

function CaseCard(item, index) {
  const kpiMarkup = (item.kpis || []).slice(0, 3).map((kpi) => KpiBadge(kpi)).join("");
  const hasKpis = (item.kpis || []).length > 0;

  return `
    <article class="case-card reveal" style="--stagger:${index};" data-category="${item.filter}">
      <div class="case-content">
        <div class="row">
          <span class="badge">${item.category}</span>
          ${item.status ? `<span class="badge">${item.status}</span>` : ""}
        </div>
        <h3 class="case-title">${item.title}</h3>
        <p class="desc">${item.summary}</p>

        <div class="meta">
          <div class="meta-item">
            <div class="meta-label">Цель</div>
            <div class="meta-value">${item.goal}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">Срок</div>
            <div class="meta-value">${item.timeline}</div>
          </div>
        </div>

        <div class="shot">
          <img src="${item.images[0]}" alt="Скриншот кейса: ${item.title}" loading="lazy" decoding="async" />
          <div class="shot-placeholder hidden">Скриншот проекта</div>
        </div>

        ${
          hasKpis
            ? `<div class="kpis">${kpiMarkup}</div>`
            : `<div class="meta-item" style="margin-top:14px;"><div class="meta-label">Статус</div><div class="meta-value">Кейс в разработке, показатели появятся после завершения этапа теста.</div></div>`
        }

        <div class="case-links">
          <a class="link" href="./?case=${item.slug}">Открыть кейс →</a>
          ${
            item.sourceUrl
              ? `<a class="link" href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer">Исходники →</a>`
              : ""
          }
        </div>
      </div>
    </article>
  `;
}

function CaseDetail(caseItem) {
  const caseIndex = CASES.findIndex((item) => item.slug === caseItem.slug);
  const prevCase = caseIndex > 0 ? CASES[caseIndex - 1] : null;
  const nextCase = caseIndex < CASES.length - 1 ? CASES[caseIndex + 1] : null;

  const mediaMarkup = caseItem.images
    .map(
      (src, idx) => `
      <div class="shot shot-detail">
        <img src="${src}" alt="Медиа ${idx + 1}: ${caseItem.title}" loading="lazy" decoding="async" />
        <div class="shot-placeholder hidden">Скриншот проекта</div>
      </div>
    `
    )
    .join("");

  const detailKpis = (caseItem.kpis || []).length
    ? caseItem.kpis
        .map(
          (kpi) => `
      <div class="kpi ${kpi.tone === "secondary" ? "kpi-secondary" : ""}">
        <div class="kpi-label">${kpi.label}</div>
        <div class="kpi-value">${kpi.value}</div>
      </div>
    `
        )
        .join("")
    : `<div class="meta-item"><div class="meta-label">Статус</div><div class="meta-value">Кейс находится в разработке. KPI появятся после релиза.</div></div>`;

  return `
    <section class="section detail-hero reveal" id="top">
      <div class="hero-card detail-hero-card">
        <a class="link back-link" href="./">← Вернуться ко всем кейсам</a>
        <div class="row">
          <span class="badge">${caseItem.category}</span>
          ${caseItem.status ? `<span class="badge">${caseItem.status}</span>` : ""}
        </div>
        <h1 class="detail-title">${caseItem.title}</h1>
        <p>${caseItem.summary}</p>
        <div class="hero-actions">
          <a href="${caseItem.contactUrl || "#"}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Связаться</a>
          <a href="${caseItem.caseUrl}" class="btn" target="_blank" rel="noopener noreferrer">Открыть проект</a>
        </div>
      </div>
    </section>

    <section class="section detail-media reveal">
      <h2 class="section-title">Галерея</h2>
      <div class="detail-media-grid">${mediaMarkup}</div>
    </section>

    <section class="section detail-triplet reveal">
      <article class="trust-card">
        <h3>Задача</h3>
        <p>${caseItem.problem}</p>
      </article>
      <article class="trust-card">
        <h3>Решение</h3>
        <p>${caseItem.solution}</p>
      </article>
      <article class="trust-card">
        <h3>Результат</h3>
        <p>${caseItem.result}</p>
      </article>
    </section>

    <section class="section reveal">
      <h2 class="section-title">KPI и показатели</h2>
      <div class="detail-kpi-grid">${detailKpis}</div>
    </section>

    <section class="section trust">
      <article class="trust-card reveal">
        <h2 class="section-title">Стек / инструменты</h2>
        <div class="chips">
          ${caseItem.stack.map((tech) => `<span class="chip">${tech}</span>`).join("")}
        </div>
      </article>
      <article class="trust-card reveal">
        <h2 class="section-title">Что было сделано</h2>
        <ul class="list">
          ${caseItem.workDone.map((done) => `<li>${done}</li>`).join("")}
        </ul>
      </article>
    </section>

    <section class="section work reveal">
      <h2 class="section-title">Процесс</h2>
      <div class="steps">
        ${caseItem.process
          .map(
            (stage, idx) => `
          <article class="step">
            <div class="step-index">${idx + 1}</div>
            <h3>${stage.step}</h3>
            <p><strong>${stage.time}</strong> · ${stage.note}</p>
          </article>
        `
          )
          .join("")}
      </div>
    </section>

    <section class="section detail-nav reveal">
      <a class="link" href="${prevCase ? `./?case=${prevCase.slug}` : "./"}">${prevCase ? "← Предыдущий кейс" : "← К списку"}</a>
      <a class="link" href="./">Вернуться ко всем кейсам</a>
      <a class="link" href="${nextCase ? `./?case=${nextCase.slug}` : "./"}">${nextCase ? "Следующий кейс →" : "К списку →"}</a>
    </section>

    ${CTAForm()}
    ${Footer()}
  `;
}

function HowWeWork() {
  return `
    <section class="section work" id="process">
      <h2 class="section-title">Как мы работаем</h2>
      <p class="section-sub">Короткий цикл от задачи до измеримого результата.</p>
      <div class="steps">
        <article class="step reveal">
          <div class="step-index">1</div>
          <h3>Бриф и приоритеты</h3>
          <p>Фиксируем цель, ограничения и ключевую метрику на запуск.</p>
        </article>
        <article class="step reveal">
          <div class="step-index">2</div>
          <h3>Прототип и дизайн-логика</h3>
          <p>Собираем flow, контент и экранные сценарии без перегруза.</p>
        </article>
        <article class="step reveal">
          <div class="step-index">3</div>
          <h3>Сборка и интеграции</h3>
          <p>Подключаем CRM, мессенджеры, аналитику и автоматизацию.</p>
        </article>
        <article class="step reveal">
          <div class="step-index">4</div>
          <h3>Запуск и handoff</h3>
          <p>Передаем доступы, инструкцию и даем поддержку на старте.</p>
        </article>
      </div>
    </section>
  `;
}

function TrustBlock() {
  return `
    <section class="section trust">
      <article class="trust-card reveal">
        <h2 class="section-title">Технологии и стек</h2>
        <p class="section-sub">Используем только то, что ускоряет запуск и управляемость.</p>
        <div class="chips">
          <span class="chip">n8n</span>
          <span class="chip">Telegram Bot API</span>
          <span class="chip">Mini Apps</span>
          <span class="chip">HTML/CSS/JS</span>
          <span class="chip">CRM (amo/Bitrix)</span>
          <span class="chip">Google Sheets</span>
          <span class="chip">Webhooks</span>
          <span class="chip">Analytics</span>
        </div>
      </article>
      <article class="trust-card reveal">
        <h2 class="section-title">Что вы получите</h2>
        <ul class="list">
          <li>Рабочий инструмент под вашу задачу, а не шаблонную концепцию</li>
          <li>Понятные метрики результата: скорость, конверсия, CPL, SLA</li>
          <li>End-to-end процесс: лид → квалификация → CRM → статусы</li>
          <li>Документацию и handoff для команды после запуска</li>
        </ul>
      </article>
    </section>
  `;
}

function CTAForm() {
  return `
    <section class="section cta" id="cta">
      <div class="cta-wrap reveal">
        <div class="cta-grid">
          <div>
            <h2 class="section-title">Обсудим ваш кейс</h2>
            <p class="section-sub">Напишите задачу и контакт. Вернемся с планом внедрения и сроками.</p>
            <form class="form" action="#" method="post" novalidate>
              <div class="field">
                <label for="name">Имя</label>
                <input id="name" name="name" type="text" placeholder="Как к вам обращаться" required />
              </div>
              <div class="field">
                <label for="telegram">Telegram</label>
                <input id="telegram" name="telegram" type="text" placeholder="@username" required />
              </div>
              <div class="field">
                <label for="message">Сообщение</label>
                <textarea id="message" name="message" rows="4" placeholder="Коротко о задаче"></textarea>
              </div>
              <a class="btn btn-primary pulse" href="${CONTACT_URL}" target="_blank" rel="noopener noreferrer">Заказать услугу</a>
              <p class="disclaimer">Нажимая кнопку, вы соглашаетесь на обработку данных для обратной связи.</p>
            </form>
          </div>
          <aside class="contacts">
            <h3>Контакты</h3>
            <p><a href="${CONTACT_URL}" target="_blank" rel="noopener noreferrer">Telegram</a></p>
            <p><a href="${CONTACT_URL}" target="_blank" rel="noopener noreferrer">Email / Telegram</a></p>
            <p><a href="${CONTACT_URL}" target="_blank" rel="noopener noreferrer">Behance / Telegram</a></p>
            <p><a href="${CONTACT_URL}" target="_blank" rel="noopener noreferrer">Dribbble / Telegram</a></p>
            <p><a href="${CONTACT_URL}" target="_blank" rel="noopener noreferrer">GitHub / Telegram</a></p>
            <p class="disclaimer">Ответ обычно в течение рабочего дня.</p>
          </aside>
        </div>
      </div>
    </section>
  `;
}

function Footer() {
  return `
    <footer class="footer">
      <small>Кейсы разработчика Морус Никиты</small>
      <div class="footer-links">
        <a class="link" href="${CONTACT_URL}" target="_blank" rel="noopener noreferrer">Telegram</a>
        <a class="link" href="${CONTACT_URL}" target="_blank" rel="noopener noreferrer">Email</a>
        <a class="link" href="${CONTACT_URL}" target="_blank" rel="noopener noreferrer">Behance</a>
        <a class="link" href="${CONTACT_URL}" target="_blank" rel="noopener noreferrer">Dribbble</a>
        <a class="link" href="${CONTACT_URL}" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </footer>
  `;
}

function getFilteredCases() {
  if (state.activeFilter === "all") {
    return CASES;
  }

  return CASES.filter((item) => item.filter === state.activeFilter);
}

function parseCaseSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get("case") || "";
}

function renderCases() {
  const grid = document.querySelector("#casesGrid");
  if (!grid) return;

  const cards = getFilteredCases()
    .map((item, index) => CaseCard(item, index))
    .join("");

  grid.innerHTML = cards;
  bindScreenshotFallback();
  bindCardTilt();
  observeReveal();
}

function renderPage() {
  const app = document.querySelector("#app");
  if (!app) return;

  state.currentCaseSlug = parseCaseSlug();
  const currentCase = CASES.find((item) => item.slug === state.currentCaseSlug);

  if (currentCase) {
    app.innerHTML = `
      ${TopBar()}
      ${CaseDetail(currentCase)}
    `;
    bindScreenshotFallback();
    bindCardTilt();
    observeReveal();
    bindDetailParallax();
    return;
  }

  app.innerHTML = `
    ${TopBar()}
    ${Hero()}
    ${FilterTabs()}
    <section class="section" id="cases">
      <div class="grid" id="casesGrid"></div>
    </section>
    ${HowWeWork()}
    ${TrustBlock()}
    ${CTAForm()}
    ${Footer()}
  `;

  renderCases();
  bindFilterTabs();
  updateFilterIndicator();
}

function bindFilterTabs() {
  const tabButtons = Array.from(document.querySelectorAll(".filter-tab"));

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.activeFilter = button.dataset.filter || "all";
      tabButtons.forEach((tab) => tab.classList.remove("is-active"));
      button.classList.add("is-active");
      updateFilterIndicator();
      renderCases();
    });
  });
}

function updateFilterIndicator() {
  const wrap = document.querySelector(".filter-wrap");
  const indicator = document.querySelector(".filter-indicator");
  const active = document.querySelector(".filter-tab.is-active");

  if (!wrap || !indicator || !active) return;

  const wrapRect = wrap.getBoundingClientRect();
  const activeRect = active.getBoundingClientRect();
  const x = activeRect.left - wrapRect.left;

  indicator.style.width = `${activeRect.width}px`;
  indicator.style.transform = `translateX(${x}px)`;
}

function bindScreenshotFallback() {
  const screenshots = document.querySelectorAll(".shot");

  screenshots.forEach((shot) => {
    const img = shot.querySelector("img");
    const placeholder = shot.querySelector(".shot-placeholder");

    if (!img || !placeholder) return;

    const showPlaceholder = () => {
      img.classList.add("hidden");
      placeholder.classList.remove("hidden");
    };

    img.addEventListener("error", showPlaceholder, { once: true });

    if (img.complete && img.naturalWidth === 0) {
      showPlaceholder();
    }
  });
}

function bindCardTilt() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return;
  }

  const cards = document.querySelectorAll(".case-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * 6;
      const ry = (px - 0.5) * 7;

      card.style.setProperty("--rx", `${rx}deg`);
      card.style.setProperty("--ry", `${ry}deg`);
      card.style.setProperty("--mx", `${Math.round(px * 100)}%`);
      card.style.setProperty("--my", `${Math.round(py * 100)}%`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--mx", "50%");
      card.style.setProperty("--my", "50%");
    });
  });
}

function observeReveal() {
  const items = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  items.forEach((item) => observer.observe(item));
}

function bindDetailParallax() {
  const hero = document.querySelector(".detail-hero-card");
  if (!hero || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    hero.style.setProperty("--hero-x", `${Math.round(x * 100)}%`);
    hero.style.setProperty("--hero-y", `${Math.round(y * 100)}%`);
  });
}

window.addEventListener("resize", updateFilterIndicator);
window.addEventListener("DOMContentLoaded", renderPage);
