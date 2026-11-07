/* ============================================================
   Portfolio site — shared script just because why not.
   This will run on every page, so every section first checks that its
   elements actually exist on the current page before using them.
   Structure: one named function per job, called at the bottom.
   Behaviour is unchanged from the original — only the shape
   of the code changed, so it is easier to read and defend.
   ============================================================ */

/* ---------------- Navigation ---------------- */

function closeNavigation(navigation, menuButton) {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
}

function toggleNavigation(navigation, menuButton) {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation",
    );
}

function initNavigation() {
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector("nav");
    if (!menuButton || !navigation) return;

    menuButton.addEventListener("click", function () {
        toggleNavigation(navigation, menuButton);
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeNavigation(navigation, menuButton);
    });
}

/* ---------------- Footer year ---------------- */

function updateFooterYear() {
    document.querySelectorAll(".year").forEach(function (year) {
        year.textContent = new Date().getFullYear();
    });
}

/* ---------------- Academic planner ----------------
   Tasks live only in this array while the page is open —
   deliberately no database, no server, nothing saved. */

let tasks = [];
let nextTaskId = 1;
let currentFilter = "all";

function getPlannerElements() {
    return {
        form: document.querySelector("#task-form"),
        list: document.querySelector("#task-list"),
        input: document.querySelector("#task-input"),
        category: document.querySelector("#task-category"),
        empty: document.querySelector("#empty-tasks"),
    };
}

function addTask(event, elements) {
    event.preventDefault();
    const title = elements.input.value.trim();
    if (!title) {
        elements.input.setCustomValidity("Please enter a task, not just spaces.");
        elements.input.reportValidity();
        return;
    }
    tasks.push({
        id: nextTaskId++,
        title: title,
        category: elements.category.value,
        completed: false,
    });
    elements.input.value = "";
    setFilter("all");
    displayTasks(elements);
    elements.input.focus();
}

function completeTask(id, elements) {
    const task = tasks.find(function (item) {
        return item.id === id;
    });
    if (task) task.completed = !task.completed;
    displayTasks(elements);
}

function deleteTask(id, elements) {
    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });
    displayTasks(elements);
}

function getVisibleTasks() {
    return tasks.filter(function (task) {
        if (currentFilter === "active") return !task.completed;
        if (currentFilter === "completed") return task.completed;
        return true;
    });
}

function createTaskItem(task, elements) {
    const item = document.createElement("li");
    item.className = "task-item" + (task.completed ? " completed" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute(
        "aria-label",
        "Mark " + task.title + " as " + (task.completed ? "incomplete" : "completed"),
    );
    checkbox.addEventListener("change", function () {
        completeTask(task.id, elements);
    });

    const content = document.createElement("div");
    content.className = "task-content";
    const title = document.createElement("span");
    title.className = "task-title";
    // textContent keeps anything typed by a visitor safe:
    // it is never interpreted as HTML.
    title.textContent = task.title;
    const category = document.createElement("span");
    category.className = "task-category";
    category.textContent = task.category;
    content.append(title, category);

    const remove = document.createElement("button");
    remove.className = "delete-task";
    remove.type = "button";
    remove.title = "Delete task";
    remove.setAttribute("aria-label", "Delete " + task.title);
    remove.innerHTML =
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/></svg>';
    remove.addEventListener("click", function () {
        deleteTask(task.id, elements);
    });

    item.append(checkbox, content, remove);
    return item;
}

function updateTaskStatistics() {
    const total = tasks.length;
    const completed = tasks.filter(function (task) {
        return task.completed;
    }).length;
    const percent = total ? Math.round((completed / total) * 100) : 0;
    document.querySelector("#total-tasks").textContent = total;
    document.querySelector("#completed-tasks").textContent = completed;
    document.querySelector("#completion-percent").textContent = percent + "%";
    document.querySelector("#task-progress").value = percent;
    document.querySelector("#task-count").textContent =
        total + (total === 1 ? " task" : " tasks");
}

function updateEmptyMessage(elements, visibleCount) {
    elements.empty.hidden = visibleCount > 0;
    elements.empty.querySelector("h3").textContent = tasks.length
        ? "All clear here."
        : "A fresh start.";
    elements.empty.querySelector("p").textContent = tasks.length
        ? "No tasks in this view. Check another tab or add something new."
        : "Your list is clear. Add your first task and take a small step forward.";
}

function displayTasks(elements) {
    elements.list.replaceChildren();
    const visibleTasks = getVisibleTasks();
    visibleTasks.forEach(function (task) {
        elements.list.append(createTaskItem(task, elements));
    });
    updateEmptyMessage(elements, visibleTasks.length);
    updateTaskStatistics();
}

function setFilter(filter) {
    currentFilter = filter;
    document.querySelectorAll("[data-filter]").forEach(function (button) {
        const selected = button.dataset.filter === currentFilter;
        button.classList.toggle("selected", selected);
        button.setAttribute("aria-pressed", String(selected));
    });
}

function showDailyStudyTip() {
    const studyTips = [
        "Try 25 minutes of focused study, then take a 5-minute break. Small sessions add up.",
        "Close your notes and explain what you learned in your own words. Teaching is a powerful way to remember.",
        "Start with one small, specific task. Momentum is easier to build than perfection.",
        "Review a little each day instead of leaving everything for the night before an exam.",
        "Keep a glass of water nearby and give your eyes a break from the screen.",
    ];
    document.querySelector("#study-tip").textContent =
        studyTips[new Date().getDate() % studyTips.length];
}

function initPlanner() {
    const elements = getPlannerElements();
    if (!elements.form) return;

    elements.form.addEventListener("submit", function (event) {
        addTask(event, elements);
    });
    elements.input.addEventListener("input", function () {
        elements.input.setCustomValidity("");
    });
    document.querySelectorAll("[data-filter]").forEach(function (button) {
        button.addEventListener("click", function () {
            setFilter(button.dataset.filter);
            displayTasks(elements);
        });
    });
    showDailyStudyTip();
    displayTasks(elements);
}

/* ---------------- Contact form ----------------
   Validates locally only — never sends personal data to a server. */

const contactFieldIds = ["full-name", "email", "phone", "message"];

function getContactError(id, value) {
    if (!value) return "Please fill in this field.";
    if (id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Please enter a valid email address.";
    if (id === "phone" && !/^\d+$/.test(value))
        return "Use digits only, without spaces or symbols.";
    if (id === "message" && value.length < 10)
        return "Please write at least 10 characters.";
    return "";
}

function validateContactField(id) {
    const input = document.getElementById(id);
    const error = getContactError(id, input.value.trim());
    document.getElementById(id + "-error").textContent = error;
    input.setAttribute("aria-invalid", String(Boolean(error)));
    return !error;
}

function handleContactSubmit(event) {
    event.preventDefault();
    const results = contactFieldIds.map(validateContactField);
    const valid = results.every(function (result) {
        return result;
    });
    document.querySelector("#form-success").hidden = !valid;
    if (!valid)
        document.getElementById(contactFieldIds[results.indexOf(false)]).focus();
}

function initContactForm() {
    const contactForm = document.querySelector("#contact-form");
    if (!contactForm) return;

    contactFieldIds.forEach(function (id) {
        document.getElementById(id).addEventListener("input", function () {
            document.querySelector("#form-success").hidden = true;
            if (this.getAttribute("aria-invalid") === "true")
                validateContactField(id);
        });
    });
    contactForm.addEventListener("submit", handleContactSubmit);
}

/* ---------------- Project detail previews ----------------
   Lightweight examples, built without libraries. The demo HTML
   is data, kept in one place, so the display logic stays clean. */

function getProjectDemos() {
    return [
        '<div class="eyebrow">ZANGAPAY · ARCHITECTURE OVERVIEW</div><h2>Wallets, Cards &amp; KYC Services.</h2><p>A resilient backend payments architecture designed with Node.js, TypeScript and PostgreSQL.</p><div class="demo-resources"><article class="demo-item"><h3>Virtual Cards</h3><p>Instant issuance, dynamic spending limits, and webhook-driven transaction authorization.</p></article><article class="demo-item"><h3>Wallet Engine</h3><p>Multi-currency balances, automated ledger auditing, and double-entry transaction safety.</p></article><article class="demo-item"><h3>KYC &amp; Security</h3><p>Automated identity verification, webhook notifications, and role-based access control.</p></article></div>',
        '<div class="eyebrow">SUMPAY · TRADING CALCULATOR</div><h2>Instant crypto &amp; gift-card payout estimation.</h2><p>Sample pricing preview: USDT @ ₦1,650/$, BTC @ ₦1,680/$, Steam Gift Card @ ₦1,250/$. Enter trade amounts in USD, separated by commas.</p><form id="calculator-form"><div class="field"><label for="scores">Trading amounts (USD)</label><input id="scores" placeholder="100, 250, 500" required aria-describedby="calculator-result"></div><button class="button primary" type="submit">Estimate payout ↗</button><p id="calculator-result" role="status"></p></form>',
        '<div class="eyebrow">GEO MAP APP · DEMO PREVIEW</div><h2>Interactive Donation Project Mapping.</h2><p>Visualizing community projects, schools and relief centres in real time.</p><div class="demo-resources"><article class="demo-item"><h3>Education Hubs</h3><p>Primary school centres with live campaign status and student counts.</p></article><article class="demo-item"><h3>Relief Centres</h3><p>Community food banks and supply hubs mapped with GPS coordinates.</p></article><article class="demo-item"><h3>Campaign Tracking</h3><p>Interactive donor progress markers and verified delivery routes.</p></article></div>',
        '<div class="eyebrow">MYITURA · TECH STACK HIGHLIGHT</div><h2>High-Performance Hypermedia Web App.</h2><p>Built with Go, Templ and HTMX for instant server rendering and fluid client interactivity.</p><div class="demo-resources"><article class="demo-item"><h3>Go Backend</h3><p>Compiled binaries with minimal memory footprint and fast startup times.</p></article><article class="demo-item"><h3>Templ Components</h3><p>Type-safe server-rendered HTML components compiled to clean Go code.</p></article><article class="demo-item"><h3>HTMX Extensions</h3><p>Declarative AJAX, CSS transitions and WebSockets directly in HTML markup.</p></article></div>',
        '<div class="eyebrow">KROWDFI · PRODUCT ARCHITECTURE</div><h2>Crowdfunding &amp; Community Payouts.</h2><p>Empowering African founders and initiatives with transparent group funding.</p><div class="demo-resources"><article class="demo-item"><h3>Escrow Safety</h3><p>Milestone-based release of funds with multi-party signature approvals.</p></article><article class="demo-item"><h3>Transparent Backing</h3><p>Real-time progress updates, tiered rewards, and backer validation.</p></article><article class="demo-item"><h3>Instant Settlement</h3><p>Automated bank disbursements upon reaching verified funding milestones.</p></article></div>',
        '<div class="eyebrow">REACT-VALIDATOR · OVERVIEW</div><h2>Published React Validation Library.</h2><p>Declarative form validation with zero dependencies and TypeScript type inference.</p><div class="demo-resources"><article class="demo-item"><h3>Lightweight</h3><p>&lt; 2.1 kB minified and gzipped, zero runtime dependencies.</p></article><article class="demo-item"><h3>Type-Safe</h3><p>Full TypeScript inference for schema shapes and validation error maps.</p></article><article class="demo-item"><h3>Custom Rules</h3><p>Simple composable validator functions for synchronous and async rules.</p></article></div>',
    ];
}

function parseCalculatorAmounts(inputValue) {
    const pieces = inputValue.split(",").map(function (part) {
        return part.trim();
    });
    const amounts = pieces.map(Number);
    const valid =
        !pieces.some(function (piece) {
            return !piece;
        }) &&
        !amounts.some(function (amount) {
            return !Number.isFinite(amount) || amount <= 0;
        });
    return { pieces: pieces, amounts: amounts, valid: valid };
}

function formatPayout(amounts) {
    const rate = 1650;
    const totalUSD = amounts.reduce(function (sum, amount) {
        return sum + amount;
    }, 0);
    const totalNGN = totalUSD * rate;
    return (
        "Total: $" +
        totalUSD.toLocaleString() +
        " · Estimated Payout: ₦" +
        totalNGN.toLocaleString() +
        " (at ₦" +
        rate.toLocaleString() +
        "/$)"
    );
}

function handleCalculatorSubmit(event) {
    event.preventDefault();
    const parsed = parseCalculatorAmounts(document.querySelector("#scores").value);
    const output = document.querySelector("#calculator-result");
    if (!parsed.valid) {
        output.textContent =
            "Please enter numbers greater than 0, separated by commas.";
        return;
    }
    output.textContent = formatPayout(parsed.amounts);
}

function initCalculator() {
    const calculator = document.querySelector("#calculator-form");
    if (calculator) calculator.addEventListener("submit", handleCalculatorSubmit);
}

function initProjectDetail() {
    const projectDetail = document.querySelector("#project-detail");
    if (!projectDetail) return;

    const project = new URLSearchParams(window.location.search).get("project");
    if (project === null || !["0", "1", "2", "3", "4", "5"].includes(project)) return;

    projectDetail.hidden = false;
    projectDetail.innerHTML = getProjectDemos()[Number(project)];
    initCalculator();
    projectDetail.scrollIntoView({ block: "start" });
}

/* ---------------- Start everything ---------------- */

initNavigation();
updateFooterYear();
initPlanner();
initContactForm();
initProjectDetail();