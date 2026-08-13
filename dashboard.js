document.addEventListener("DOMContentLoaded", () => {
    // 1. نظام الحماية للداش بورد
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "login.html";
        return;
    }

    // العناصر الحية
    const activeCasesElem = document.getElementById("active-cases-count");
    const todayConsultElem = document.getElementById("today-consultations-count");
    const totalClientsElem = document.getElementById("total-clients-count");

    const homeTableBody = document.getElementById("home-table-body");
    const clientsTableBody = document.getElementById("clients-table-body");
    const casesTableBody = document.getElementById("cases-table-body");
    const scheduleTableBody = document.getElementById("schedule-table-body");

    let stats = JSON.parse(localStorage.getItem("dashboardStats")) || {
        activeCases: 0,
        todayConsultations: 0,
        totalClients: 0
    };

    let customClients = JSON.parse(localStorage.getItem("customClientsList")) || [];
    let customSchedules = JSON.parse(localStorage.getItem("customSchedulesList")) || [];

    function renderStats() {
        if (activeCasesElem) activeCasesElem.textContent = stats.activeCases;
        if (todayConsultElem) todayConsultElem.textContent = stats.todayConsultations;
        if (totalClientsElem) totalClientsElem.textContent = stats.totalClients;
    }

    function renderTables() {
        if (homeTableBody) {
            if (customClients.length === 0) {
                homeTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 2rem;">لا توجد بيانات مسجلة حتى الآن</td></tr>`;
            } else {
                homeTableBody.innerHTML = customClients.map((c, index) => `
                    <tr>
                        <td>${c.name}</td>
                        <td>${c.service}</td>
                        <td>${c.date}</td>
                        <td>
                            <select onchange="updateStatus(${index}, this.value)" style="padding: 0.3rem 0.6rem; border-radius: 6px; border: 1px solid var(--border-color); font-family: inherit; font-weight: 700; background: var(--beige-light); color: var(--text-primary); cursor: pointer;">
                                <option value="جديد" ${c.status === 'جديد' ? 'selected' : ''}>جديد</option>
                                <option value="قيد الإجراء" ${c.status === 'قيد الإجراء' ? 'selected' : ''}>قيد الإجراء</option>
                                <option value="مكتمل" ${c.status === 'مكتمل' ? 'selected' : ''}>مكتمل</option>
                                <option value="مجدولة" ${c.status === 'مجدولة' ? 'selected' : ''}>مجدولة</option>
                            </select>
                        </td>
                        <td>
                            <button class="action-btn" style="background: #e74c3c; padding: 0.3rem 0.8rem; font-size: 0.85rem;" onclick="deleteClient(${index})">حذف 🗑️</button>
                        </td>
                    </tr>
                `).join('');
            }
        }

        if (clientsTableBody) {
            clientsTableBody.innerHTML = customClients.length === 0 
                ? `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 2rem;">لا توجد عملاء مسجلون</td></tr>`
                : customClients.map(c => `<tr><td>${c.name}</td><td>${c.service}</td><td>${c.date}</td><td><span class="badge completed">${c.status || 'نشط'}</span></td></tr>`).join('');
        }

        if (casesTableBody) {
            casesTableBody.innerHTML = customClients.length === 0 
                ? `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 2rem;">لا توجد قضايا نشطة</td></tr>`
                : customClients.map(c => `<tr><td>${c.name}</td><td>${c.service}</td><td>${c.date}</td><td><span class="badge in-progress">${c.status || 'قيد المتابعة'}</span></td></tr>`).join('');
        }

        if (scheduleTableBody) {
            if (customSchedules.length === 0) {
                scheduleTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 2rem;">لا توجد مواعيد مجدولة حالياً</td></tr>`;
            } else {
                scheduleTableBody.innerHTML = customSchedules.map((s, index) => `
                    <tr>
                        <td>${s.name}</td>
                        <td>${s.type}</td>
                        <td>${s.date}</td>
                        <td><span class="badge pending">مجدولة</span></td>
                        <td>
                            <button class="action-btn" style="background: #e74c3c; padding: 0.3rem 0.8rem; font-size: 0.85rem;" onclick="deleteSchedule(${index})">حذف 🗑️</button>
                        </td>
                    </tr>
                `).join('');
            }
        }
    }

    renderStats();
    renderTables();

    window.updateStat = function(statKey, newValue) {
        stats[statKey] = newValue;
        localStorage.setItem("dashboardStats", JSON.stringify(stats));
        renderStats();
    };

    window.updateStatus = function(index, newStatus) {
        customClients[index].status = newStatus;
        localStorage.setItem("customClientsList", JSON.stringify(customClients));
        renderTables();
    };

    window.deleteClient = function(index) {
        const deletedItem = customClients[index];
        if (deletedItem.type === "عميل جديد") {
            if (stats.totalClients > 0) stats.totalClients -= 1;
            if (stats.activeCases > 0) stats.activeCases -= 1;
            window.updateStat('totalClients', stats.totalClients);
            window.updateStat('activeCases', stats.activeCases);
        } else if (deletedItem.type === "استشارة") {
            if (stats.todayConsultations > 0) stats.todayConsultations -= 1;
            window.updateStat('todayConsultations', stats.todayConsultations);
        }
        customClients.splice(index, 1);
        localStorage.setItem("customClientsList", JSON.stringify(customClients));
        renderTables();
    };

    window.deleteSchedule = function(index) {
        customSchedules.splice(index, 1);
        localStorage.setItem("customSchedulesList", JSON.stringify(customSchedules));
        renderTables();
    };

    // نوافذ الإضافة المنبثقة
    const clientModal = document.getElementById("client-modal");
    const addClientBtn = document.getElementById("add-client-btn");
    const closeClientModalBtn = document.getElementById("client-modal-close");
    const addClientForm = document.getElementById("add-client-form");

    if (addClientBtn && clientModal) {
        addClientBtn.addEventListener("click", () => { clientModal.style.display = "flex"; clientModal.classList.add("active"); });
    }
    if (closeClientModalBtn && clientModal) {
        closeClientModalBtn.addEventListener("click", () => { clientModal.style.display = "none"; clientModal.classList.remove("active"); });
    }
    if (addClientForm) {
        addClientForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("client-name-input").value.trim();
            const service = document.getElementById("client-service-input").value.trim();
            if (name && service) {
                customClients.unshift({ name, service, date: "13 أغسطس 2026", type: "عميل جديد", status: "جديد" });
                localStorage.setItem("customClientsList", JSON.stringify(customClients));
                stats.totalClients += 1;
                stats.activeCases += 1;
                window.updateStat('totalClients', stats.totalClients);
                window.updateStat('activeCases', stats.activeCases);
                renderTables();
                addClientForm.reset();
                clientModal.style.display = "none";
                clientModal.classList.remove("active");
                lucide.createIcons();
            }
        });
    }

    const consultModal = document.getElementById("consult-modal");
    const addConsultBtn = document.getElementById("add-consult-btn");
    const closeConsultModalBtn = document.getElementById("consult-modal-close");
    const addConsultForm = document.getElementById("add-consult-form");

    if (addConsultBtn && consultModal) {
        addConsultBtn.addEventListener("click", () => { consultModal.style.display = "flex"; consultModal.classList.add("active"); });
    }
    if (closeConsultModalBtn && consultModal) {
        closeConsultModalBtn.addEventListener("click", () => { consultModal.style.display = "none"; consultModal.classList.remove("active"); });
    }
    if (addConsultForm) {
        addConsultForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("consult-name-input").value.trim();
            const service = document.getElementById("consult-topic-input").value.trim();
            if (name && service) {
                customClients.unshift({ name, service, date: "13 أغسطس 2026", type: "استشارة", status: "قيد الإجراء" });
                localStorage.setItem("customClientsList", JSON.stringify(customClients));
                stats.todayConsultations += 1;
                window.updateStat('todayConsultations', stats.todayConsultations);
                renderTables();
                addConsultForm.reset();
                consultModal.style.display = "none";
                consultModal.classList.remove("active");
                lucide.createIcons();
            }
        });
    }

    const scheduleModal = document.getElementById("schedule-modal");
    const addScheduleBtn = document.getElementById("add-schedule-btn");
    const closeScheduleModalBtn = document.getElementById("schedule-modal-close");
    const addScheduleForm = document.getElementById("add-schedule-form");

    if (addScheduleBtn && scheduleModal) {
        addScheduleBtn.addEventListener("click", () => { scheduleModal.style.display = "flex"; scheduleModal.classList.add("active"); });
    }
    if (closeScheduleModalBtn && scheduleModal) {
        closeScheduleModalBtn.addEventListener("click", () => { scheduleModal.style.display = "none"; scheduleModal.classList.remove("active"); });
    }
    if (addScheduleForm) {
        addScheduleForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("sched-name-input").value.trim();
            const type = document.getElementById("sched-type-input").value.trim();
            const date = document.getElementById("sched-date-input").value.trim();

            if (name && type && date) {
                customSchedules.unshift({ name, type, date });
                localStorage.setItem("customSchedulesList", JSON.stringify(customSchedules));
                renderTables();
                addScheduleForm.reset();
                scheduleModal.style.display = "none";
                scheduleModal.classList.remove("active");
                lucide.createIcons();
            }
        });
    }

    // التنقل بين الأقسام
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

    // تبديل المظهر (Dark / Light Mode)
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    if(themeIcon) {
        themeIcon.setAttribute("data-lucide", savedTheme === "dark" ? "sun" : "moon");
        lucide.createIcons();
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            
            if(themeIcon) {
                themeIcon.setAttribute("data-lucide", newTheme === "dark" ? "sun" : "moon");
                lucide.createIcons();
            }
        });
    }
});