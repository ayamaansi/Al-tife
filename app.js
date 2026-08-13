document.addEventListener("DOMContentLoaded", () => {
    // 1. نظام تفعيل الدارك واللايت مود مع حفظ الاختيار
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    if(themeIcon) {
        themeIcon.setAttribute("data-lucide", savedTheme === "dark" ? "sun" : "moon");
    }
document.addEventListener("DOMContentLoaded", () => {
    // التحقق من حالة تسجيل الدخول وتعديل أزرار الهيدر إن وجدت
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    // يمكنك البحث عن عنصر معين في الهيدر لتغيير مظهره بناءً على حالة الدخول
    // (اختياري حسب رغبتك في تطوير الواجهة لاحقاً)
});
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
        { title: "تأسيس الشركات", desc: "إعداد عقود التأسيس وصياغة الاتفاقيات وتوثيقها لدى الجهات الرسمية." },
        { title: "الحوكمة والامتثال", desc: "بناء أطر الحوكمة المؤسسية وتطوير اللوائح الداخليّة للشركات." },
        { title: "تسوية النزاعات التجارية", desc: "التمثيل القضائي والوساطة القانونية لحل النزاعات التجارية بكفاءة." }
    ];

    const individualServices = [
        { title: "قضايا الأحوال الشخصية", desc: "الترافع في قضايا الطلاق، الحضانة، النفقة، وقضايا التركات والتقسيم." },
        { title: "النزاعات العمالية", desc: "الدفاع عن حقوق العمال وأصحاب العمل وفق نظام العمل السعودي." },
        { title: "توثيق العقود والوكالات", desc: "صياغة وتدقيق العقود الخاصة بالاستثمار والأفراد لضمان الحماية القانونية." }
    ];

    function renderServices(gridElement, servicesArray) {
        if (!gridElement) return;
        gridElement.innerHTML = servicesArray.map(service => `
            <div class="service-card">
                <h4 class="service-card-title">${service.title}</h4>
                <p class="service-card-desc">${service.desc}</p>
                <a href="https://wa.me/966536939093" target="_blank" class="service-btn-wa">
                    <span>اطلب الخدمة</span>
                    <i data-lucide="arrow-left"></i>
                </a>
            </div>
        `).join('');
        lucide.createIcons();
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

    // 4. إدارة وعرض وفلترة المقالات مع فتح النافذة المنبثقة (Modal) للمقال الكامل
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
        lucide.createIcons();

        // تفعيل تفاعل أزرار قراءة المقال الكامل
        document.querySelectorAll(".read-more-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const articleId = parseInt(btn.getAttribute("data-id"));
                const selectedArticle = articlesData.find(a => a.id === articleId);
                
                if (selectedArticle && articleModal && modalBodyContent) {
                    modalBodyContent.innerHTML = selectedArticle.content;
                    articleModal.classList.add("active");
                    lucide.createIcons();
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
});