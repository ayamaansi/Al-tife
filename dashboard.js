document.addEventListener("DOMContentLoaded", () => {
    // --- 1. الحماية وتسجيل الدخول ---
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "login.html";
        return;
    }

    // --- 2. الإعدادات والمتغيرات الرئيسية ---
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz_YOUR_SCRIPT_ID_HERE/exec"; 

    let officialClients = JSON.parse(localStorage.getItem("officialClients")) || [];
    let legalCases = JSON.parse(localStorage.getItem("legalCases")) || [];
    let legalDocuments = JSON.parse(localStorage.getItem("legalDocuments")) || [];
    let financials = JSON.parse(localStorage.getItem("financials")) || [];
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let websiteRequests = [];

    // عناصر الواجهة
    const activeCasesCount = document.getElementById("active-cases-count");
    const weeklyHearingsCount = document.getElementById("weekly-hearings-count");
    const totalClientsCount = document.getElementById("total-clients-count");
    const newRequestsBadge = document.getElementById("new-requests-badge");

    const upcomingHearingsBody = document.getElementById("upcoming-hearings-body");
    const websiteRequestsBody = document.getElementById("website-requests-body");
    const clientsTableBody = document.getElementById("clients-table-body");
    const casesTableBody = document.getElementById("cases-table-body");
    const documentsTableBody = document.getElementById("documents-table-body");
    const financeTableBody = document.getElementById("finance-table-body");
    const tasksList = document.getElementById("tasks-list");

    const caseClientSelect = document.getElementById("case-client");
    const docClientSelect = document.getElementById("doc-client");
    const finClientSelect = document.getElementById("fin-client");

    const notifBell = document.getElementById("notif-bell");
    const notifDropdown = document.getElementById("notif-dropdown");
    const notifCount = document.getElementById("notif-count");
    const notifList = document.getElementById("notif-list");
    const globalSearch = document.getElementById("global-search");

    // --- 3. نظام الإشعارات الذكي ---
    function checkNotifications() {
        let notifications = [];
        const today = new Date();
        
        // التحقق من الجلسات القادمة (خلال 3 أيام)
        legalCases.forEach(c => {
            if (c.date) {
                const caseDate = new Date(c.date);
                const diffTime = Math.abs(caseDate - today);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                if (caseDate >= today && diffDays <= 3) {
                    notifications.push(`تذكير: جلسة للموكل "${c.clientName}" بعد ${diffDays} يوم/أيام.`);
                }
            }
        });

        if (notifications.length > 0) {
            notifCount.textContent = notifications.length;
            notifCount.style.display = "flex";
            notifList.innerHTML = notifications.map(n => `<li style="padding: 1rem; border-bottom: 1px solid var(--dash-border); font-size: 0.9rem;">🔔 ${n}</li>`).join('');
        } else {
            notifCount.style.display = "none";
            notifList.innerHTML = `<li style="padding: 1rem; text-align: center; color: var(--dash-text-muted); font-size: 0.9rem;">لا توجد تنبيهات حالياً</li>`;
        }
    }

    if(notifBell) {
        notifBell.addEventListener("click", () => {
            notifDropdown.style.display = notifDropdown.style.display === "none" ? "block" : "none";
        });
    }

    // --- 4. شريط البحث السريع ---
    if(globalSearch) {
        globalSearch.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            // بحث مبسط في جداول الموكلين والقضايا
            document.querySelectorAll(".dashboard-table tbody tr").forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(query) ? "" : "none";
            });
        });
    }

    // --- 5. دوال عرض البيانات (Render) ---
    function updateDashboardStats() {
        if(totalClientsCount) totalClientsCount.textContent = officialClients.length;
        if(activeCasesCount) activeCasesCount.textContent = legalCases.length;
        
        const upcoming = legalCases.filter(c => c.date && new Date(c.date) >= new Date());
        if(weeklyHearingsCount) weeklyHearingsCount.textContent = upcoming.length;
    }

    function renderWebsiteRequests() {
        if (!websiteRequestsBody) return;
        if (newRequestsBadge) newRequestsBadge.textContent = websiteRequests.length;
        if (websiteRequests.length === 0) {
            websiteRequestsBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:2rem; color:var(--dash-text-muted);">لا توجد طلبات واردة حالياً.</td></tr>`;
            return;
        }
        websiteRequestsBody.innerHTML = websiteRequests.map((req, index) => `
            <tr>
                <td><strong>${req.name}</strong></td>
                <td dir="ltr">${req.phone}</td>
                <td><span class="badge in-progress">${req.service}</span></td>
                <td>${req.date}</td>
                <td><button class="action-btn" style="padding: 0.3rem 0.8rem; font-size: 0.85rem;" onclick="convertToClient(${index})">تحويل لموكل</button></td>
            </tr>
        `).join('');
    }

    function renderClientsTable() {
        if (!clientsTableBody) return;
        if (officialClients.length === 0) {
            clientsTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--dash-text-muted);">لا يوجد موكلين رسميين مسجلين.</td></tr>`;
        } else {
            clientsTableBody.innerHTML = officialClients.map((cl, index) => `
                <tr>
                    <td><strong>${cl.name}</strong></td>
                    <td>${cl.idNumber}</td>
                    <td>${cl.poa || '-'}</td>
                    <td dir="ltr">${cl.phone}</td>
                    <td><span class="badge completed">سارية</span></td>
                    <td><button class="action-btn" style="background:transparent; color:#e74c3c; padding:0.3rem;" onclick="deleteClient(${index})"><i data-lucide="trash-2" style="width:18px;height:18px;"></i></button></td>
                </tr>
            `).join('');
        }

        const clientOptions = `<option value="" disabled selected>اختر الموكل</option>` + officialClients.map(cl => `<option value="${cl.name}">${cl.name}</option>`).join('');
        if (caseClientSelect) caseClientSelect.innerHTML = clientOptions;
        if (docClientSelect) docClientSelect.innerHTML = clientOptions;
        if (finClientSelect) finClientSelect.innerHTML = clientOptions;
    }

    function renderCasesTables() {
        if (!casesTableBody || !upcomingHearingsBody) return;
        if (legalCases.length === 0) {
            casesTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--dash-text-muted);">لا توجد قضايا مسجلة.</td></tr>`;
            upcomingHearingsBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--dash-text-muted);">لا توجد جلسات محددة.</td></tr>`;
        } else {
            casesTableBody.innerHTML = legalCases.map((c, index) => `
                <tr><td><strong>${c.caseNumber}</strong></td><td>${c.clientName}</td><td>${c.opponent || '-'}</td><td>${c.court}</td><td><span class="badge pending">منظورة</span></td><td><button class="action-btn" style="background:transparent; color:#e74c3c; padding:0.3rem;" onclick="deleteCase(${index})"><i data-lucide="trash-2" style="width:18px;height:18px;"></i></button></td></tr>
            `).join('');

            const hearings = legalCases.filter(c => c.date).sort((a,b) => new Date(a.date) - new Date(b.date));
            if(hearings.length === 0) {
                upcomingHearingsBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--dash-text-muted);">لا توجد جلسات محددة.</td></tr>`;
            } else {
                upcomingHearingsBody.innerHTML = hearings.map(h => {
                    const origIndex = legalCases.indexOf(h);
                    return `<tr><td><strong>${h.caseNumber}</strong></td><td>${h.clientName}</td><td>${h.court}</td><td dir="ltr" style="font-weight:bold; color:var(--dash-gold);">${h.date}</td><td style="display:flex;gap:0.5rem;"><button class="action-btn" style="background:var(--dash-gold); color:white; padding:0.2rem 0.5rem; font-size:0.8rem;">تأجيل</button><button class="action-btn" style="background:transparent; color:#e74c3c; padding:0.2rem 0.5rem;" onclick="deleteCase(${origIndex})"><i data-lucide="trash-2" style="width:16px;height:16px;"></i></button></td></tr>`;
                }).join('');
            }
        }
    }

    function renderDocumentsTable() {
        if (!documentsTableBody) return;
        if (legalDocuments.length === 0) {
            documentsTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:2rem; color:var(--dash-text-muted);">الأرشيف فارغ حالياً.</td></tr>`;
        } else {
            documentsTableBody.innerHTML = legalDocuments.map(doc => `
                <tr>
                    <td><strong>${doc.name}</strong></td>
                    <td><span class="badge" style="background:#e8f4f8; color:#3498db;">${doc.type}</span></td>
                    <td>${doc.clientName}</td>
                    <td>${doc.date}</td>
                    <td><a href="${doc.link}" target="_blank" class="action-btn" style="background:#3498db; color:white; text-decoration:none; padding:0.3rem 0.8rem; font-size:0.85rem;"><i data-lucide="external-link" style="width:14px; height:14px; vertical-align:middle;"></i> فتح الملف</a></td>
                </tr>
            `).join('');
        }
    }

    function renderFinancials() {
        if (!financeTableBody) return;
        let totalRev = 0, totalPd = 0, totalOut = 0;
        
        if (financials.length === 0) {
            financeTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:2rem; color:var(--dash-text-muted);">لا توجد بيانات مالية.</td></tr>`;
        } else {
            financeTableBody.innerHTML = financials.map(f => {
                const remain = f.total - f.paid;
                totalRev += f.total; totalPd += f.paid; totalOut += remain;
                return `<tr><td><strong>${f.clientName}</strong></td><td>${f.service}</td><td>${f.total}</td><td style="color:#10b981;">${f.paid}</td><td style="color:#ef4444;">${remain}</td></tr>`;
            }).join('');
        }

        document.getElementById("total-revenue").innerHTML = `${totalRev} <span style="font-size:1rem; color:var(--dash-text-muted);">ر.س</span>`;
        document.getElementById("total-paid").innerHTML = `${totalPd} <span style="font-size:1rem; color:var(--dash-text-muted);">ر.س</span>`;
        document.getElementById("total-outstanding").innerHTML = `${totalOut} <span style="font-size:1rem; color:var(--dash-text-muted);">ر.س</span>`;
    }

    function renderTodos() {
        if (!tasksList) return;
        if (todos.length === 0) {
            tasksList.innerHTML = `<li style="color:var(--dash-text-muted); text-align:center; padding: 1rem;">قائمة المهام فارغة. أحسنتِ! 🎉</li>`;
            return;
        }
        tasksList.innerHTML = todos.map((t, i) => `
            <li style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--dash-bg); border-radius: var(--radius-sm); border: 1px solid var(--dash-border); ${t.done ? 'opacity: 0.6;' : ''}">
                <div style="display: flex; align-items: center; gap: 0.8rem; cursor:pointer;" onclick="toggleTodo(${i})">
                    <input type="checkbox" ${t.done ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--dash-primary);">
                    <span style="font-size: 1.05rem; font-weight: 600; ${t.done ? 'text-decoration: line-through; color: var(--dash-text-muted);' : 'color: var(--dash-text-main);'}">${t.text}</span>
                </div>
                <button class="action-btn" style="background: transparent; color: #e74c3c; box-shadow: none; padding: 0.2rem;" onclick="deleteTodo(${i})"><i data-lucide="trash-2"></i></button>
            </li>
        `).join('');
    }

    function refreshAllViews() {
        updateDashboardStats();
        renderWebsiteRequests();
        renderClientsTable();
        renderCasesTables();
        renderDocumentsTable();
        renderFinancials();
        renderTodos();
        checkNotifications();
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // --- 6. جلب الطلبات من الموقع ---
    async function loadRequestsFromAPI() {
        const refreshBtn = document.getElementById("refresh-requests-btn");
        if(refreshBtn) { refreshBtn.innerHTML = `<i data-lucide="loader"></i> جاري التحديث...`; refreshBtn.disabled = true; }
        if (!GOOGLE_SCRIPT_URL.includes("YOUR_SCRIPT_ID_HERE")) {
            try {
                const response = await fetch(GOOGLE_SCRIPT_URL);
                const data = await response.json();
                if (data && Array.isArray(data)) websiteRequests = data;
            } catch (error) { console.warn("API Error", error); }
        }
        refreshAllViews();
        if(refreshBtn) { refreshBtn.innerHTML = `<i data-lucide="refresh-cw"></i> تحديث`; refreshBtn.disabled = false; lucide.createIcons(); }
    }
    const refreshBtn = document.getElementById("refresh-requests-btn");
    if(refreshBtn) refreshBtn.addEventListener("click", loadRequestsFromAPI);

    // --- 7. الإجراءات والنماذج (Forms) ---
    window.convertToClient = function(index) {
        const req = websiteRequests[index];
        if(confirm(`هل تم توقيع عقد وكالة مع "${req.name}"؟`)) {
            officialClients.push({ name: req.name, idNumber: "لم يتم الإدخال", poa: "لم يتم الإدخال", phone: req.phone });
            localStorage.setItem("officialClients", JSON.stringify(officialClients));
            websiteRequests.splice(index, 1);
            refreshAllViews();
            alert("تم إضافة الموكل بنجاح!");
        }
    };

    window.deleteClient = function(index) {
        if(confirm("هل أنت متأكد من حذف هذا الموكل؟ سيتم حذفه من النظام.")) {
            officialClients.splice(index, 1);
            localStorage.setItem("officialClients", JSON.stringify(officialClients));
            refreshAllViews();
        }
    };

    window.deleteCase = function(index) {
        if(confirm("هل أنت متأكد من حذف هذه القضية / الجلسة؟")) {
            legalCases.splice(index, 1);
            localStorage.setItem("legalCases", JSON.stringify(legalCases));
            refreshAllViews();
        }
    };

    window.toggleTodo = function(index) {
        todos[index].done = !todos[index].done;
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
        lucide.createIcons();
    };

    window.deleteTodo = function(index) {
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
        lucide.createIcons();
    };

    const forms = [
        { id: "add-client-form", modal: "client-modal", action: (e) => {
            officialClients.push({ name: document.getElementById("cl-name").value, idNumber: document.getElementById("cl-id").value, poa: document.getElementById("cl-poa").value, phone: document.getElementById("cl-phone").value });
            localStorage.setItem("officialClients", JSON.stringify(officialClients));
        }},
        { id: "add-case-form", modal: "case-modal", action: (e) => {
            legalCases.push({ clientName: document.getElementById("case-client").value, opponent: document.getElementById("case-opponent").value, caseNumber: document.getElementById("case-number").value, court: document.getElementById("case-court").value, date: document.getElementById("case-date").value });
            localStorage.setItem("legalCases", JSON.stringify(legalCases));
        }},
        { id: "add-document-form", modal: "document-modal", action: (e) => {
            legalDocuments.push({ name: document.getElementById("doc-name").value, type: document.getElementById("doc-type").value, clientName: document.getElementById("doc-client").value, link: document.getElementById("doc-link").value, date: new Date().toLocaleDateString('ar-EG') });
            localStorage.setItem("legalDocuments", JSON.stringify(legalDocuments));
        }},
        { id: "add-finance-form", modal: "finance-modal", action: (e) => {
            financials.push({ clientName: document.getElementById("fin-client").value, service: document.getElementById("fin-service").value, total: parseFloat(document.getElementById("fin-total").value), paid: parseFloat(document.getElementById("fin-paid").value) });
            localStorage.setItem("financials", JSON.stringify(financials));
        }},
        { id: "add-task-form", modal: null, action: (e) => {
            todos.unshift({ text: document.getElementById("task-input").value, done: false });
            localStorage.setItem("todos", JSON.stringify(todos));
        }}
    ];

    forms.forEach(f => {
        const el = document.getElementById(f.id);
        if (el) {
            el.addEventListener("submit", (e) => {
                e.preventDefault();
                f.action(e);
                el.reset();
                refreshAllViews();
                if (f.modal) document.getElementById(f.modal).style.display = "none";
            });
        }
    });

    // النوافذ (Modals) التنقل
    function setupModal(btnId, modalId, closeId) {
        const btn = document.getElementById(btnId);
        const modal = document.getElementById(modalId);
        const closeBtn = document.getElementById(closeId);
        if(btn && modal) btn.addEventListener("click", () => modal.style.display = "flex");
        if(closeBtn && modal) closeBtn.addEventListener("click", () => modal.style.display = "none");
        if(modal) modal.addEventListener("click", (e) => { if(e.target === modal) modal.style.display = "none"; });
    }
    setupModal("add-client-btn", "client-modal", "client-modal-close");
    setupModal("add-case-btn", "case-modal", "case-modal-close");
    setupModal("add-document-btn", "document-modal", "document-modal-close");
    setupModal("add-finance-btn", "finance-modal", "finance-modal-close");

    const sidebarLinks = document.querySelectorAll(".sidebar-menu .sidebar-link[data-target]");
    const contentSections = document.querySelectorAll(".dashboard-content-section");
    sidebarLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            sidebarLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
            const targetId = link.getAttribute("data-target");
            contentSections.forEach(section => {
                section.style.display = (section.id === targetId) ? "block" : "none";
            });
        });
    });

    // بدء التشغيل
    loadRequestsFromAPI(); 
    refreshAllViews(); 
});
