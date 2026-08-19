// 1. نظام تفعيل الدارك واللايت مود مع حفظ الاختيار
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

let savedTheme = "light";
try {
    savedTheme = localStorage.getItem("theme") || "light";
} catch (e) {
    console.warn("localStorage is not available.");
}

document.documentElement.setAttribute("data-theme", savedTheme);
if(themeIcon) {
    themeIcon.setAttribute("data-lucide", savedTheme === "dark" ? "sun" : "moon");
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        document.documentElement.setAttribute("data-theme", newTheme);
        try {
            localStorage.setItem("theme", newTheme);
        } catch (e) {}
        
        if(themeIcon) {
            themeIcon.setAttribute("data-lucide", newTheme === "dark" ? "sun" : "moon");
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
    });
}

// 2. القائمة المنسدلة لشاشات الموبايل
const mobileToggle = document.getElementById("mobile-toggle");
const navMenu = document.getElementById("nav-menu");
if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

// 3. إدارة وعرض كروت الخدمات
const corporateGrid = document.getElementById("corporate-services-grid");
const individualsGrid = document.getElementById("individuals-services-grid");
const homePreviewGrid = document.getElementById("home-services-preview");

const corporateServices = [
    { title: "تأسيس الشركات", desc: "تأسيس مختلف أنواع الشركات وفق الأنظمة المعمول بها في المملكة." },
    { title: "تأسيس الشركات الأجنبية", desc: "مرافقة المستثمرين الأجانب في إجراءات التأسيس وممارسة الأعمال." },
    { title: "التراخيص والاستثمار", desc: "استخراج التراخيص اللازمة ومتابعة الإجراءات النظامية للاستثمار." },
    { title: "عقود الشركات والاتفاقيات", desc: "إعداد ومراجعة وصياغة العقود والاتفاقيات التجارية بمختلف أنواعها." },
    { title: "الحوكمة والامتثال", desc: "تعزيز الامتثال للأنظمة وتطبيق أفضل ممارسات الحوكمة المؤسسية." },
    { title: "الملكية الفكرية", desc: "تسجيل وحماية العلامات التجارية وحقوق الملكية الفكرية." },
    { title: "القضايا التجارية", desc: "التمثيل القانوني في المنازعات التجارية والدفاع عن مصالح الشركات." },
    { title: "التنفيذ والتحصيل", desc: "متابعة إجراءات التنفيذ وتحصيل الحقوق والمطالبات المالية." },
    { title: "تصفية الشركات", desc: "إدارة دعاوى الإفلاس، مع حماية الحقوق، وإيجاد حلول قانونية ومالية فعّالة" },
    { title: "الاستشارات القانونية للشركات", desc: "تقديم الدعم والاستشارات القانونية المستمرة لمختلف قطاعات الأعمال." }
];

const individualServices = [
    { title: "الأحوال الشخصية", desc: "التمثيل القانوني في قضايا الأحوال الشخصية وحماية الحقوق الأسرية." },
    { title: "التركات والمواريث", desc: "إدارة إجراءات حصر التركات وقسمتها وتسوية منازعات الميراث." },
    { title: "التنفيذ وتحصيل الحقوق", desc: "متابعة إجراءات التنفيذ وتحصيل الحقوق المالية بكفاءة." },
    { title: "المطالبات المالية", desc: "تمثيل العملاء في المطالبات المالية واسترداد الحقوق." },
    { title: "القضايا العمالية", desc: "تقديم الدعم القانوني في المنازعات العمالية وتمثيل أصحاب العمل والموظفين." },
    { title: "القضايا العقارية", desc: "التمثيل القانوني في المنازعات العقارية وحماية الحقوق المتعلقة بالعقارات." },
    { title: "القضايا التجارية", desc: "تمثيل العملاء في المنازعات التجارية لحماية مصالحهم." },
    { title: "القضايا الإدارية", desc: "التمثيل أمام الجهات والمحاكم الإدارية في مختلف المنازعات الإدارية." },
    { title: "القضايا الجزائية", desc: "الدفاع وتمثيل العملاء في القضايا الجزائية بمختلف مراحلها وإجراءاتها." },
    { title: "قضايا الجرائم المعلوماتية", desc: "تقديم الدعم القانوني في قضايا الجرائم الإلكترونية." },
    { title: "قضايا المخدرات والمؤثرات العقلية", desc: "التمثيل القانوني في شامل قضايا المخدرات والمؤثرات العقلية." },
    { title: "قضايا الفساد المالي والإداري", desc: "تمثيل العملاء في قضايا الفساد المالي والإداري." },
    { title: "توثيق العقارات وإفراغها وتسجيلها", desc: "إنجاز إجراءات توثيق العقارات وإفراغها ونقل ملكيتها." },
    { title: "خدمات الإقامة المميزة", desc: "تقديم الدعم القانوني في إجراءات الإقامة المميزة واستيفاء متطلباتها النظامية." },
    { title: "الاستشارات القانونية", desc: "تقديم استشارات قانونية متخصصة للأفراد في مختلف المجالات القانونية." }
];

function renderServices(gridElement, servicesArray) {
    if (!gridElement) return;
    gridElement.innerHTML = servicesArray.map(service => `
        <div class="service-card">
            <h4 class="service-card-title">${service.title}</h4>
            <p class="service-card-desc">${service.desc}</p>
            <a href="https://wa.me/966536939093" target="_blank" class="service-btn-wa">
                <span>اطلب استشارة</span>
                <i data-lucide="arrow-left"></i>
            </a>
        </div>
    `).join('');
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

if (corporateGrid) renderServices(corporateGrid, corporateServices);
if (individualsGrid) renderServices(individualsGrid, individualServices);
if (homePreviewGrid) renderServices(homePreviewGrid, corporateServices.slice(0, 3));

// التبديل بين التبويبات في صفحة الخدمات
const tabBtns = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".services-panel");

if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            panels.forEach(p => p.classList.remove("active"));
            
            btn.classList.add("active");
            const targetTab = btn.getAttribute("data-tab");
            const targetPanel = document.getElementById(`${targetTab}-panel`);
            if (targetPanel) targetPanel.classList.add("active");
        });
    });
}

// 4. إدارة وعرض وفلترة المقالات
const articlesGrid = document.getElementById("articles-grid");
const filterBtns = document.querySelectorAll(".filter-btn");
const articleModal = document.getElementById("article-modal");
const modalBodyContent = document.getElementById("modal-body-content");
const modalCloseBtn = document.getElementById("modal-close");

const articlesData = [
    { 
        id: 1,
        category: "corporate", 
        tag: "أنظمة الشركات", 
        date: "31 يوليو 2026", 
        title: "نظام الشركات الجديد: تيسير الاستثمار وحماية حقوق المساهمين", 
        excerpt: "قراءة تحليلية لأهم المواد المستحدثة وكيفية الاستفادة منها لتنظيم الكيان القانوني لشركتك.",
        content: `
            <span class="modal-article-tag">أنظمة الشركات</span>
            <h2 class="modal-article-title">نظام الشركات الجديد: تيسير الاستثمار وحماية حقوق المساهمين</h2>
            <span class="modal-article-date">تاريخ النشر: 31 يوليو 2026</span>
            <div class="modal-article-body">
                <p style="background: var(--beige-light); padding: 15px; border-right: 4px solid var(--brand-primary); border-radius: 8px; margin-bottom: 20px;">
                    يأتي نظام الشركات الجديد ليعزز البيئة التنظيمية وتيسير الإجراءات والمتطلبات النظامية لتحفيز بيئة الأعمال ودعم الاستثمار، وتوفير إطار فعال وعادل للحوكمة.
                </p>
                <h3 style="color: var(--brand-dark); margin-top: 20px; margin-bottom: 10px;">أولاً: مرونة هيكلية وتسهيل التأسيس</h3>
                <p style="margin-bottom: 15px;">أتاح النظام استحداث كيان قانوني جديد يُعرف بـ "الشركة المساهمة المبسطة"، والتي تستهدف رواد الأعمال وأصحاب المشاريع الناشئة والجريئة، حيث تلغي العديد من القيود المعقدة وتمنح الشركاء حرية أكبر في صياغة النظام الأساس للشركة.</p>
                
                <h3 style="color: var(--brand-dark); margin-top: 20px; margin-bottom: 10px;">ثانياً: حماية حقوق الأقلية والشفافية</h3>
                <p style="margin-bottom: 15px;">عزز النظام الضمانات القانونية لحماية حقوق المساهمين من خلال إرساء قواعد واضحة للشفافية والإفصاح، ووضع آليات فاعلة لمساءلة أعضاء مجلس الإدارة في حال الإضرار بمصالح الشركة أو الشركاء.</p>
                
                <h3 style="color: var(--brand-dark); margin-top: 20px; margin-bottom: 10px;">ثالثاً: معالجة تحديات الشركات العائلية</h3>
                <p>وضع النظام أطرًا نظامية تساعد في استدامة الشركات العائلية وتنظيم انتقال الملكية، وتجنب النزاعات التي قد تؤثر على مسيرتها الاقتصادية.</p>
            </div>
        `
    },
    { 
        id: 2,
        category: "labor", 
        tag: "نظام العمل", 
        date: "22 أبريل 2026", 
        title: "حقوق العامل وصاحب العمل في العقود المجددة", 
        excerpt: "دليل مبسط وواضح يوضح الضوابط النظامية لإنهاء أو تجديد عقود العمل في القطاع الخاص.",
        content: `
            <span class="modal-article-tag">نظام العمل</span>
            <h2 class="modal-article-title">حقوق العامل وصاحب العمل في العقود المجددة</h2>
            <span class="modal-article-date">تاريخ النشر: 22 أبريل 2026</span>
            <div class="modal-article-body">
                <p style="margin-bottom: 15px;">يحدد نظام العمل السعودي بوضوح آليات تجديد العقود وتعديل بنودها بما يحفظ حقوق الطرفين. عند تجديد عقد العمل، يعتبر العقد مقصوراً على الشروط السابقة ما لم يتم الاتفاق كتابياً على تعديلها.</p>
                <p>نسلط الضوء في هذا المقال على أبرز التنبيهات القانونية عند تجديد عقود العمل، وفترات الإنذار النظامية، والتعويضات المرتبطة بالإنهاء غير المشروع.</p>
            </div>
        `
    },
    { 
        id: 3,
        category: "commercial", 
        tag: "النزاعات التجارية", 
        date: "15 مارس 2026", 
        title: "كيف تحمي شركتك الناشئة من التعثرات القانونية؟", 
        excerpt: "نصائح وإرشادات قانونية هامة لرائد الأعمال لتفادي النزاعات المالية والعقود غير المحكمة.",
        content: `
            <span class="modal-article-tag">النزاعات التجارية</span>
            <h2 class="modal-article-title">كيف تحمي شركتك الناشئة من التعثرات القانونية؟</h2>
            <span class="modal-article-date">تاريخ النشر: 15 مارس 2026</span>
            <div class="modal-article-body">
                <p style="margin-bottom: 15px;">تواجه الشركات الناشئة في مراحلها الأولى تحديات قانونية وتنظيمية متعددة. الصياغة الدقيقة للعقود مع الشركاء والموردين هي خط الدفاع الأول ضد النزاعات.</p>
                <p>نوصي دائماً بضرورة المراجعة القانونية لكافة العقود التجارية وتوثيق الشراكات لتفادي أي نزاعات قضائية مستقبلية.</p>
            </div>
        `
    }
];

function renderArticles(filter = "all") {
    if (!articlesGrid) return;
    
    const filteredData = filter === "all" 
        ? articlesData 
        : articlesData.filter(art => art.category === filter);

    articlesGrid.innerHTML = filteredData.map(art => `
        <article class="article-card">
            <div class="article-card-header">
                <span class="article-tag">${art.tag}</span>
                <span class="article-date">${art.date}</span>
            </div>
            <h3 class="article-card-title">${art.title}</h3>
            <p class="article-card-excerpt">${art.excerpt}</p>
            <button class="article-read-link read-more-btn" data-id="${art.id}" style="background:none; border:none; cursor:pointer; padding:0; font-family:inherit; font-size:inherit;">
                اقرأ المقال كاملاً <i data-lucide="arrow-left"></i>
            </button>
        </article>
    `).join('');
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // تفعيل تفاعل أزرار قراءة المقال الكامل
    document.querySelectorAll(".read-more-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const articleId = parseInt(btn.getAttribute("data-id"));
            const selectedArticle = articlesData.find(a => a.id === articleId);
            
            if (selectedArticle && articleModal && modalBodyContent) {
                modalBodyContent.innerHTML = selectedArticle.content;
                articleModal.classList.add("active");
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        });
    });
}

if (articlesGrid) {
    renderArticles("all");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const selectedFilter = btn.getAttribute("data-filter");
            renderArticles(selectedFilter);
        });
    });
}

// إغلاق النافذة المنبثقة
if (modalCloseBtn && articleModal) {
    modalCloseBtn.addEventListener("click", () => {
        articleModal.classList.remove("active");
    });

    articleModal.addEventListener("click", (e) => {
        if (e.target === articleModal) {
            articleModal.classList.remove("active");
        }
    });
}

// --- ربط نموذج التسجيل بجداول جوجل (Google Sheets) ---
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz_YOUR_SCRIPT_ID_HERE/exec"; // يجب تغييره بالرابط الصحيح

const contactForm = document.getElementById("website-contact-form");
const contactStatusMsg = document.getElementById("contact-status-msg");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const name = document.getElementById("contact-name").value.trim();
        const phone = document.getElementById("contact-phone").value.trim();
        const service = document.getElementById("contact-service").value;
        const submitBtn = document.getElementById("contact-submit-btn");

        if (!name || !phone || !service) return;

        // تعطيل الزر أثناء الإرسال
        submitBtn.disabled = true;
        submitBtn.textContent = "جاري الإرسال...";
        submitBtn.style.opacity = "0.7";
        contactStatusMsg.style.display = "none";

        try {
            // إرسال البيانات إلى Google Apps Script
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
                body: JSON.stringify({
                    name: name,
                    phone: phone,
                    service: service,
                    date: new Date().toLocaleDateString('ar-EG'),
                    status: "جديد"
                })
            });

            // نظراً لاستخدام no-cors نعرض رسالة النجاح فوراً
            contactStatusMsg.textContent = "تم استلام طلبك بنجاح! سيتم التواصل معك قريباً.";
            contactStatusMsg.style.color = "var(--brand-primary)";
            contactStatusMsg.style.display = "block";
            contactForm.reset();

        } catch (error) {
            console.error("Error:", error);
            contactStatusMsg.textContent = "حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً.";
            contactStatusMsg.style.color = "#e74c3c";
            contactStatusMsg.style.display = "block";
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "إرسال الطلب الآن";
            submitBtn.style.opacity = "1";
        }
    });
}