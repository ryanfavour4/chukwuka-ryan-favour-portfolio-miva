/* Shared navigation: this file runs on every page, so check elements before using them. */
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("nav");

if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
        const isOpen = navigation.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation",
        );
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            navigation.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
        }
    });
}

document.querySelectorAll(".year").forEach(function (year) {
    year.textContent = new Date().getFullYear();
});

/* Academic planner: tasks are deliberately stored only in an array, not a database. */
let tasks = [];
let nextTaskId = 1;
let currentFilter = "all";
const taskForm = document.querySelector("#task-form");
const taskList = document.querySelector("#task-list");
const taskInput = document.querySelector("#task-input");
const categoryInput = document.querySelector("#task-category");

function addTask(event) {
    event.preventDefault();
    const title = taskInput.value.trim();
    if (!title) {
        taskInput.setCustomValidity("Please enter a task, not just spaces.");
        taskInput.reportValidity();
        return;
    }
    tasks.push({
        id: nextTaskId++,
        title: title,
        category: categoryInput.value,
        completed: false,
    });
    taskInput.value = "";
    currentFilter = "all";
    updateFilters();
    displayTasks();
    taskInput.focus();
}

function completeTask(id) {
    const task = tasks.find(function (item) {
        return item.id === id;
    });
    if (task) task.completed = !task.completed;
    displayTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });
    displayTasks();
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

function displayTasks() {
    taskList.replaceChildren();
    const visibleTasks = tasks.filter(function (task) {
        if (currentFilter === "active") return !task.completed;
        if (currentFilter === "completed") return task.completed;
        return true;
    });
    visibleTasks.forEach(function (task) {
        const item = document.createElement("li");
        item.className = "task-item" + (task.completed ? " completed" : "");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute(
            "aria-label",
            "Mark " +
                task.title +
                " as " +
                (task.completed ? "incomplete" : "completed"),
        );
        checkbox.addEventListener("change", function () {
            completeTask(task.id);
        });
        const content = document.createElement("div");
        content.className = "task-content";
        const title = document.createElement("span");
        title.className = "task-title";
        // textContent keeps anything typed by a visitor safe: it is never interpreted as HTML.
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
            deleteTask(task.id);
        });
        item.append(checkbox, content, remove);
        taskList.append(item);
    });
    const empty = document.querySelector("#empty-tasks");
    empty.hidden = visibleTasks.length > 0;
    empty.querySelector("h3").textContent = tasks.length
        ? "All clear here."
        : "A fresh start.";
    empty.querySelector("p").textContent = tasks.length
        ? "No tasks in this view. Check another tab or add something new."
        : "Your list is clear. Add your first task and take a small step forward.";
    updateTaskStatistics();
}

function updateFilters() {
    document.querySelectorAll("[data-filter]").forEach(function (button) {
        const selected = button.dataset.filter === currentFilter;
        button.classList.toggle("selected", selected);
        button.setAttribute("aria-pressed", String(selected));
    });
}

if (taskForm) {
    taskForm.addEventListener("submit", addTask);
    taskInput.addEventListener("input", function () {
        taskInput.setCustomValidity("");
    });
    document.querySelectorAll("[data-filter]").forEach(function (button) {
        button.addEventListener("click", function () {
            currentFilter = button.dataset.filter;
            updateFilters();
            displayTasks();
        });
    });
    const studyTips = [
        "Try 25 minutes of focused study, then take a 5-minute break. Small sessions add up.",
        "Close your notes and explain what you learned in your own words. Teaching is a powerful way to remember.",
        "Start with one small, specific task. Momentum is easier to build than perfection.",
        "Review a little each day instead of leaving everything for the night before an exam.",
        "Keep a glass of water nearby and give your eyes a break from the screen.",
    ];
    document.querySelector("#study-tip").textContent =
        studyTips[new Date().getDate() % studyTips.length];
    displayTasks();
}

/* Contact form: validates locally and never sends personal data to a server. */
const contactForm = document.querySelector("#contact-form");
function validateContactField(id) {
    const input = document.getElementById(id);
    const value = input.value.trim();
    let error = "";
    if (!value) error = "Please fill in this field.";
    else if (id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        error = "Please enter a valid email address.";
    else if (id === "phone" && !/^\d+$/.test(value))
        error = "Use digits only, without spaces or symbols.";
    else if (id === "message" && value.length < 10)
        error = "Please write at least 10 characters.";
    document.getElementById(id + "-error").textContent = error;
    input.setAttribute("aria-invalid", String(Boolean(error)));
    return !error;
}
if (contactForm) {
    const fieldIds = ["full-name", "email", "phone", "message"];
    fieldIds.forEach(function (id) {
        document.getElementById(id).addEventListener("input", function () {
            document.querySelector("#form-success").hidden = true;
            if (this.getAttribute("aria-invalid") === "true")
                validateContactField(id);
        });
    });
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const results = fieldIds.map(validateContactField);
        const valid = results.every(function (result) {
            return result;
        });
        document.querySelector("#form-success").hidden = !valid;
        if (!valid)
            document.getElementById(fieldIds[results.indexOf(false)]).focus();
    });
}

/* Working project previews: lightweight examples, built without libraries. */
const projectDetail = document.querySelector("#project-detail");

if (projectDetail) {
    const project = new URLSearchParams(window.location.search).get("project");

    const demos = [
        '<div class="eyebrow">ZANGAPAY · ARCHITECTURE OVERVIEW</div><h2>Wallets, Cards &amp; KYC Services.</h2><p>A resilient backend payments architecture designed with Node.js, TypeScript and PostgreSQL.</p><div class="demo-resources"><article class="demo-item"><h3>Virtual Cards</h3><p>Instant issuance, dynamic spending limits, and webhook-driven transaction authorization.</p></article><article class="demo-item"><h3>Wallet Engine</h3><p>Multi-currency balances, automated ledger auditing, and double-entry transaction safety.</p></article><article class="demo-item"><h3>KYC &amp; Security</h3><p>Automated identity verification, webhook notifications, and role-based access control.</p></article></div>',
        '<div class="eyebrow">SUMPAY · TRADING CALCULATOR</div><h2>Instant crypto &amp; gift-card payout estimation.</h2><p>Sample pricing preview: USDT @ ₦1,650/$, BTC @ ₦1,680/$, Steam Gift Card @ ₦1,250/$. Enter trade amounts in USD, separated by commas.</p><form id="calculator-form"><div class="field"><label for="scores">Trading amounts (USD)</label><input id="scores" placeholder="100, 250, 500" required aria-describedby="calculator-result"></div><button class="button primary" type="submit">Estimate payout ↗</button><p id="calculator-result" role="status"></p></form>',
        '<div class="eyebrow">GEO MAP APP · DEMO PREVIEW</div><h2>Interactive Donation Project Mapping.</h2><p>Visualizing community projects, schools and relief centres in real time.</p><div class="demo-resources"><article class="demo-item"><h3>Education Hubs</h3><p>Primary school centres with live campaign status and student counts.</p></article><article class="demo-item"><h3>Relief Centres</h3><p>Community food banks and supply hubs mapped with GPS coordinates.</p></article><article class="demo-item"><h3>Campaign Tracking</h3><p>Interactive donor progress markers and verified delivery routes.</p></article></div>',
        '<div class="eyebrow">MYITURA · TECH STACK HIGHLIGHT</div><h2>High-Performance Hypermedia Web App.</h2><p>Built with Go, Templ and HTMX for instant server rendering and fluid client interactivity.</p><div class="demo-resources"><article class="demo-item"><h3>Go Backend</h3><p>Compiled binaries with minimal memory footprint and fast startup times.</p></article><article class="demo-item"><h3>Templ Components</h3><p>Type-safe server-rendered HTML components compiled to clean Go code.</p></article><article class="demo-item"><h3>HTMX Extensions</h3><p>Declarative AJAX, CSS transitions and WebSockets directly in HTML markup.</p></article></div>',
        '<div class="eyebrow">KROWDFI · PRODUCT ARCHITECTURE</div><h2>Crowdfunding &amp; Community Payouts.</h2><p>Empowering African founders and initiatives with transparent group funding.</p><div class="demo-resources"><article class="demo-item"><h3>Escrow Safety</h3><p>Milestone-based release of funds with multi-party signature approvals.</p></article><article class="demo-item"><h3>Transparent Backing</h3><p>Real-time progress updates, tiered rewards, and backer validation.</p></article><article class="demo-item"><h3>Instant Settlement</h3><p>Automated bank disbursements upon reaching verified funding milestones.</p></article></div>',
        '<div class="eyebrow">REACT-VALIDATOR · OVERVIEW</div><h2>Published React Validation Library.</h2><p>Declarative form validation with zero dependencies and TypeScript type inference.</p><div class="demo-resources"><article class="demo-item"><h3>Lightweight</h3><p>&lt; 2.1 kB minified and gzipped, zero runtime dependencies.</p></article><article class="demo-item"><h3>Type-Safe</h3><p>Full TypeScript inference for schema shapes and validation error maps.</p></article><article class="demo-item"><h3>Custom Rules</h3><p>Simple composable validator functions for synchronous and async rules.</p></article></div>',
    ];

    if (project !== null && ["0", "1", "2", "3", "4", "5"].includes(project)) {
        projectDetail.hidden = false;

        projectDetail.innerHTML = demos[Number(project)];

        const calculator = document.querySelector("#calculator-form");

        if (calculator)
            calculator.addEventListener("submit", function (event) {
                event.preventDefault();
                const pieces = document
                    .querySelector("#scores")
                    .value.split(",")
                    .map(function (part) {
                        return part.trim();
                    });
                const amounts = pieces.map(Number);
                const output = document.querySelector("#calculator-result");
                if (
                    pieces.some(function (piece) {
                        return !piece;
                    }) ||
                    amounts.some(function (amount) {
                        return (
                            !Number.isFinite(amount) || amount <= 0
                        );
                    })
                ) {
                    output.textContent =
                        "Please enter numbers greater than 0, separated by commas.";
                    return;
                }
                const rate = 1650;
                const totalUSD = amounts.reduce(function (sum, amount) {
                    return sum + amount;
                }, 0);
                const totalNGN = totalUSD * rate;
                output.textContent =
                    "Total: $" +
                    totalUSD.toLocaleString() +
                    " · Estimated Payout: ₦" +
                    totalNGN.toLocaleString() +
                    " (at ₦" +
                    rate.toLocaleString() +
                    "/$)";
            });
        projectDetail.scrollIntoView({ block: "start" });
    }
}

