/* ==========================================================================
   Taif Al-Arwo Law Firm Website - Interaction Logic (Original Clean app.js)
   ========================================================================== */

// --- SERVICES DATA CONFIGURATION ---
const corporateServices = [
    {
        id: "corp_1",
        title: "تأسيس الشركات",
        desc: "تأسيس مختلف أنواع الشركات وفق الأنظمة المعمول بها في المملكة العربية السعودية.",
        icon: "building"
    },
    {
        id: "corp_2",
        title: "تأسيس الشركات الأجنبية",
        desc: "مرافقة المستثمرين الأجانب في إجراءات التأسيس وممارسة الأعمال وإصدار التراخيص الاستثمارية.",
        icon: "globe"
    },
    {
        id: "corp_3",
        title: "التراخيص والاستثمار",
        desc: "استخراج التراخيص اللازمة ومتابعة كافة الإجراءات النظامية لضمان سلامة مساركم الاستثماري.",
        icon: "file-check"
    },
    {
        id: "corp_4",
        title: "عقود الشركات والاتفاقيات",
        desc: "إعداد ومراجعة وصياغة العقود والاتفاقيات التجارية بمختلف أنواعها وتوثيقها رسمياً.",
        icon: "file-text"
    },
    {
        id: "corp_5",
        title: "الحوكمة والامتثال",
        desc: "تعزيز الامتثال للأنظمة وتطبيق أفضل ممارسات الحوكمة المؤسسية لتجنب المخاطر القانونية.",
        icon: "shield"
    },
    {
        id: "corp_6",
        title: "الملكية الفكرية",
        desc: "تسجيل وحماية العلامات التجارية، براءات الاختراع، وحقوق الملكية الفكرية والأسرار التجارية.",
        icon: "award"
    },
    {
        id: "corp_7",
        title: "القضايا التجارية",
        desc: "التمثيل القانوني والترافع في المنازعات التجارية والدفاع عن مصالح الشركات أمام المحاكم المختصة.",
        icon: "gavel"
    },
    {
        id: "corp_8",
        title: "التنفيذ والتحصيل",
        desc: "متابعة إجراءات التنفيذ القضائي وتحصيل الحقوق والديون والمطالبات المالية المستحقة بكفاءة.",
        icon: "badge-dollar-sign"
    },
    {
        id: "corp_9",
        title: "تصفية الشركات",
        desc: "إدارة دعاوى الإفلاس وتصفية الشركات وحل النزاعات بين الشركاء مع حماية الحقوق القانونية.",
        icon: "trending-down"
    },
    {
        id: "corp_10",
        title: "الاستشارات القانونية للشركات",
        desc: "تقديم الدعم والاستشارات القانونية والشرعية المستمرة لمختلف قطاعات الأعمال والشركات.",
        icon: "help-circle"
    }
];

const individualServices = [
    {
        id: "ind_1",
        title: "الأحوال الشخصية",
        desc: "التمثيل القانوني في قضايا الأحوال الشخصية، الزواج، الطلاق، الحضانة، وحماية الحقوق الأسرية.",
        icon: "users"
    },
    {
        id: "ind_2",
        title: "التركات والمواريث",
        desc: "إدارة وتوثيق إجراءات حصر التركات وقسمتها بالتراضي أو القضاء وتسوية منازعات الميراث.",
        icon: "landmark"
    },
    {
        id: "ind_3",
        title: "التنفيذ وتحصيل الحقوق",
        desc: "متابعة إجراءات تنفيذ الأحكام القضائية وتحصيل الحقوق المالية للأفراد بكفاءة وسرعة.",
        icon: "check-circle"
    },
    {
        id: "ind_4",
        title: "المطالبات المالية",
        desc: "تمثيل العملاء في قضايا المطالبات المالية، استرداد الحقوق، الديون والقضايا الصرفية.",
        icon: "banknote"
    },
    {
        id: "ind_5",
        title: "القضايا العمالية",
        desc: "تقديم الدعم القانوني والترافع في المنازعات العمالية وتمثيل أصحاب العمل والموظفين.",
        icon: "briefcase"
    },
    {
        id: "ind_6",
        title: "القضايا العقارية",
        desc: "التمثيل القانوني في المنازعات العقارية، عقود الإيجار، الملكية وحماية الحقوق المتعلقة بالعقارات.",
        icon: "home"
    },
    {
        id: "ind_7",
        title: "القضايا التجارية للأفراد",
        desc: "تمثيل الأفراد والتجار في المنازعات التجارية الفردية لحماية مصالحهم الاستثمارية والمالية.",
        icon: "scale"
    },
    {
        id: "ind_8",
        title: "القضايا الإدارية",
        desc: "التمثيل والترافع أمام ديوان المظالم والجهات والمحاكم الإدارية في مختلف المنازعات الحكومية.",
        icon: "building-2"
    },
    {
        id: "ind_9",
        title: "القضايا الجزائية",
        desc: "الدفاع وتمثيل العملاء في القضايا الجنائية والجزائية بمختلف مراحلها القضائية وإجراءات التحقيق.",
        icon: "shield-alert"
    },
    {
        id: "ind_10",
        title: "قضايا الجرائم المعلوماتية",
        desc: "تقديم الدعم والمشورة القانونية والترافع في قضايا الجرائم الإلكترونية والابتزاز والقرصنة الرقمية.",
        icon: "lock"
    },
    {
        id: "ind_11",
        title: "قضايا المخدرات والمؤثرات العقلية",
        desc: "التمثيل القانوني المتكامل والدفاع في قضايا المخدرات والمؤثرات العقلية أمام الجهات المختصة.",
        icon: "activity"
    },
    {
        id: "ind_12",
        title: "قضايا الفساد المالي والإداري",
        desc: "تمثيل العملاء والدفاع عنهم في قضايا النزاهة والفساد المالي والإداري والرشوة وتبديد الأموال.",
        icon: "fingerprint"
    },
    {
        id: "ind_13",
        title: "توثيق العقارات وإفراغها وتسجيلها",
        desc: "إنجاز إجراءات توثيق العقارات وإفراغ الصكوك ونقل ملكيتها بالطرق النظامية المعتمدة.",
        icon: "key"
    },
    {
        id: "ind_14",
        title: "خدمات الإقامة المميزة",
        desc: "تقديم الدعم القانوني وإعداد الملفات للحصول على الإقامة المميزة واستيفاء متطلباتها النظامية.",
        icon: "user-check"
    },
    {
        id: "ind_15",
        title: "الاستشارات القانونية للأفراد",
        desc: "تقديم استشارات قانونية وشرعية متخصصة للأفراد في كافة مجالات الحياة والأنظمة السعودية.",
        icon: "help-circle"
    }
];

// --- BLOG ARTICLES DATA ---
const articlesData = {
    "1": {
        title: "نظام الشركات الجديد: تيسير الاستثمار وحماية حقوق المساهمين",
        date: "٣١ يوليو ٢٠٢٦",
        tag: "الأنظمة التجارية",
        content: `
            <p>يعد نظام الشركات الجديد في المملكة العربية السعودية خطوة تنظيمية رائدة تهدف إلى تمكين القطاع الخاص وتذليل العقبات أمام الشركات الوطنية والاستثمارات الأجنبية، تماشياً مع مستهدفات رؤية المملكة 2030.</p>
            <h5>أبرز ملامح النظام الجديد:</h5>
            <p>١. <strong>إدخال أشكال جديدة للشركات:</strong> مثل شركة المساهمة المبسطة التي تلبي احتياجات الشركات الناشئة ورواد الأعمال.</p>
            <p>٢. <strong>تيسير إجراءات التأسيس:</strong> إلغاء الكثير من المتطلبات الروتينية والاكتفاء بالمتطلبات الجوهرية لحماية مصالح الشركاء والغير.</p>
            <p>٣. <strong>تنظيم الشركات العائلية:</strong> وضع إطار قانوني واضح لتنظيم ملكية وإدارة الشركات العائلية من خلال إبرام ميثاق عائلي ملزم لتجنب النزاعات القانونية وضمان استمرارية الشركة عبر الأجيال.</p>
            <p>٤. <strong>تعزيز الحوكمة وحقوق الأقلية:</strong> وفر النظام حماية أكبر لمساهمي الأقلية ووضع ضوابط صارمة لصفقات الأطراف ذات العلاقة وتعارض المصالح.</p>
            <p>في مكتبنا، نساعدكم على موائمة شركاتكم القائمة مع متطلبات النظام الجديد وتأسيس الكيانات الجديدة وفقًا له للحصول على أقصى فائدة وحماية نظامية.</p>
        `
    },
    "2": {
        title: "أهمية تطبيق حوكمة الشركات في المنشآت الصغيرة والمتوسطة",
        date: "٢٥ يوليو ٢٠٢٦",
        tag: "الامتثال والحوكمة",
        content: `
            <p>يسود اعتقاد خاطئ بين رواد الأعمال وأصحاب المشاريع الصغيرة والمتوسطة بأن نظام الحوكمة حكر على الشركات المساهمة الضخمة المدرجة في البورصة. والحقيقة العلمية والعملية تثبت عكس ذلك تماماً.</p>
            <h5>لماذا تحتاج الشركات الصغيرة للحوكمة؟</h5>
            <p>١. <strong>الفصل بين الملكية والإدارة:</strong> يضمن اتخاذ القرارات بناءً على المصلحة التجارية العليا للشركة وليس بناءً على أهواء شخصية للشركاء.</p>
            <p>٢. <strong>جذب المستثمرين والتمويل:</strong> تفضل البنوك وصناديق الاستثمار الجريء التعامل مع منشآت تطبق معايير حوكمة وشفافية واضحة وموثقة.</p>
            <p>٣. <strong>الاستدامة والنمو:</strong> تعمل القواعد والإجراءات المحددة على تنظيم تدفقات العمل وتقليل الفاقد وتجنب المسؤوليات النظامية والغرامات الناتجة عن عدم الامتثال للأنظمة والقوانين.</p>
            <p>نعمل في مكتب المحامية طيف العروي على صياغة لوائح حوكمة مخصصة ومرنة تتناسب مع حجم وطبيعة منشأتكم وتضمن نموها بثبات وأمان.</p>
        `
    },
    "3": {
        title: "الدليل القانوني الشامل للمستثمر الأجنبي في المملكة",
        date: "١٢ يوليو ٢٠٢٦",
        tag: "الاستثمار الأجنبي",
        content: `
            <p>شهد البيئة الاستثمارية في المملكة العربية السعودية قفزات تنظيمية هائلة جعلتها الوجهة الأكثر جاذبية لرؤوس الأموال الأجنبية في المنطقة. ومع ذلك، تتطلب عملية الدخول والتأسيس فهماً دقيقاً للأنظمة المحلية.</p>
            <h5>خطوات التأسيس للمستثمر الأجنبي:</h5>
            <p>١. <strong>إصدار ترخيص الاستثمار:</strong> من خلال وزارة الاستثمار السعودية (MISA) وتحديد نوع النشاط والهيكل القانوني الأمثل.</p>
            <p>٢. <strong>تأسيس الشركة قانونياً:</strong> صياغة عقد التأسيس وإصدار السجل التجاري من وزارة التجارة.</p>
            <p>٣. <strong>التراخيص التشغيلية:</strong> الحصول على موافقات الجهات الحكومية ذات العلاقة بالنشاط (مثل هيئة الغذاء والدواء، وزارة الصناعة، وغيرها).</p>
            <p>٤. <strong>التسجيل الضريبي والعمالي:</strong> استكمال التسجيل في هيئة الزكاة والضريبة والجمارك ومكتب العمل والتأمينات الاجتماعية.</p>
            <p>يقدم مكتبنا خدمات متكاملة للمستثمرين الأجانب تشمل تقديم المشورة والتراخيص وتمثيلهم أمام كافة الجهات الرسمية لضمان بداية آمنة وممتثلة.</p>
        `
    }
};

// --- APPLICATION LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
    // State management
    let activeTab = "corporate"; // 'corporate' or 'individuals'
    let isExpanded = true; // Show all by default since toggle button is removed

    // DOM Elements
    const corporatePanel = document.getElementById("corporate-grid");
    const individualsPanel = document.getElementById("individuals-grid");
    const tabButtons = document.querySelectorAll(".tab-btn");
    const toggleAllBtn = document.getElementById("toggle-all-services");
    const toggleAllBtnText = toggleAllBtn ? toggleAllBtn.querySelector(".btn-text") : null;
    const toggleAllBtnIcon = toggleAllBtn ? toggleAllBtn.querySelector(".btn-icon") : null;
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    const mobileToggle = document.getElementById("mobile-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link, .nav-cta-btn");
    const whatsappBase = "https://wa.me/966500000000"; // Replace with client actual WhatsApp number

    // Render Services Grid
    function renderServices() {
        // Clear grids
        corporatePanel.innerHTML = "";
        individualsPanel.innerHTML = "";

        // Determine how many to show
        const corpLimit = isExpanded ? corporateServices.length : 6;
        const indLimit = isExpanded ? individualServices.length : 6;

        // Render Corporate Services
        for (let i = 0; i < Math.min(corpLimit, corporateServices.length); i++) {
            const service = corporateServices[i];
            const card = createServiceCard(service, "corporate");
            corporatePanel.appendChild(card);
        }

        // Render Individual Services
        for (let i = 0; i < Math.min(indLimit, individualServices.length); i++) {
            const service = individualServices[i];
            const card = createServiceCard(service, "individuals");
            individualsPanel.appendChild(card);
        }

        // Reinitialize Lucide Icons for dynamic content
        lucide.createIcons();
    }

    // Helper: Create Card Element
    function createServiceCard(service, type) {
        const card = document.createElement("div");
        card.className = "service-card fade-in-scroll visible";
        
        // Encode message for WhatsApp
        const waMsg = encodeURIComponent(`السلام عليكم ورحمة الله وبركاته، أرغب في الاستفسار عن خدمة: [${service.title}] وحجز جلسة استشارية.`);
        const waUrl = `${whatsappBase}?text=${waMsg}`;

        card.innerHTML = `
            <div class="service-icon-box">
                <i data-lucide="${service.icon}"></i>
            </div>
            <h4 class="service-card-title">${service.title}</h4>
            <p class="service-card-desc">${service.desc}</p>
            <a href="${waUrl}" target="_blank" class="service-btn">
                طلب استشارة <i data-lucide="message-square"></i>
            </a>
        `;
        return card;
    }

    // Switch Tab Action
    function switchTab(tabName) {
        activeTab = tabName;

        // Update Tab buttons visual state
        tabButtons.forEach(btn => {
            if (btn.getAttribute("data-target") === tabName) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        // Show/hide active panels
        if (tabName === "corporate") {
            document.getElementById("corporate-panel").classList.add("active");
            document.getElementById("individuals-panel").classList.remove("active");
        } else {
            document.getElementById("corporate-panel").classList.remove("active");
            document.getElementById("individuals-panel").classList.add("active");
        }

        // Keep expanded state when switching tabs
        isExpanded = true;
        updateToggleButtonState();
        renderServices();
    }

    // Update Expand/Collapse Button state
    function updateToggleButtonState() {
        if (isExpanded) {
            toggleAllBtnText.textContent = "عرض خدمات أقل";
            toggleAllBtnIcon.setAttribute("data-lucide", "eye-off");
        } else {
            toggleAllBtnText.textContent = "عرض جميع الخدمات";
            toggleAllBtnIcon.setAttribute("data-lucide", "eye");
        }
        lucide.createIcons();
    }

    // --- EVENT LISTENERS ---

    // Tab Button Clicks
    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const target = button.getAttribute("data-target");
            switchTab(target);
        });
    });

    // "View All" Button Click
    if (toggleAllBtn) {
        toggleAllBtn.addEventListener("click", () => {
            isExpanded = !isExpanded;
            updateToggleButtonState();
            renderServices();
        });
    }

    // "Business Success Partner" Button redirects to Corporate tab and scrolls
    const partnerBtn = document.getElementById("go-to-corporate");
    if (partnerBtn) {
        partnerBtn.addEventListener("click", () => {
            switchTab("corporate");
            const servicesSection = document.getElementById("services");
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }

    // Dropdown Item Clicks in Navbar
    dropdownItems.forEach(item => {
        item.addEventListener("click", (e) => {
            const tab = item.getAttribute("data-tab");
            switchTab(tab);
            
            // On mobile, close nav drawer
            navMenu.classList.remove("active");
            mobileToggle.querySelector("i").setAttribute("data-lucide", "menu");
            lucide.createIcons();
        });
    });

    // Mobile Menu Toggle
    mobileToggle.addEventListener("click", () => {
        const isActive = navMenu.classList.toggle("active");
        const iconName = isActive ? "x" : "menu";
        mobileToggle.querySelector("i").setAttribute("data-lucide", iconName);
        lucide.createIcons();
    });

    // Close mobile menu on clicking any navigation link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            mobileToggle.querySelector("i").setAttribute("data-lucide", "menu");
            lucide.createIcons();
        });
    });

    // Hide Navbar on Scroll — show only at top of page
    let lastScrollY = 0;
    const header = document.querySelector(".main-header");

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY <= 10) {
            // At the very top: always show the header fully
            header.classList.remove("header-hidden");
            header.classList.remove("scrolled");
        } else {
            // Scrolled past top: hide the header
            header.classList.add("header-hidden");
            header.classList.add("scrolled");
        }

        lastScrollY = currentScrollY;
    });

    // --- CONSULTATION FORM SUBMISSION ---
    const consultationForm = document.getElementById("consultation-form");
    if (consultationForm) {
        consultationForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Retrieve form values
            const name = document.getElementById("client-name").value;
            const phone = document.getElementById("client-phone").value;
            const service = document.getElementById("service-type").value;
            const message = document.getElementById("client-message").value;

            // Custom elegant toast notification
            const toast = document.createElement("div");
            toast.style.position = "fixed";
            toast.style.bottom = "20px";
            toast.style.right = "20px";
            toast.style.backgroundColor = "#0F3D2F";
            toast.style.color = "#FFFFFF";
            toast.style.padding = "1rem 2rem";
            toast.style.borderRadius = "8px";
            toast.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
            toast.style.borderRight = "4px solid #C59378";
            toast.style.zIndex = "3000";
            toast.style.direction = "rtl";
            toast.style.fontFamily = "Tajawal, sans-serif";
            toast.style.animation = "slideUp 0.3s ease-out";
            
            toast.innerHTML = `
                <div style="font-weight: 700; margin-bottom: 5px; font-size: 0.95rem;">تم إرسال طلبك بنجاح!</div>
                <div style="font-size: 0.82rem; color: #DCA68A;">شكرًا لك يا ${name}. سيتواصل معك فريقنا القانوني قريبًا.</div>
            `;

            document.body.appendChild(toast);
            consultationForm.reset();

            // Remove toast after 5 seconds
            setTimeout(() => {
                toast.style.opacity = "0";
                toast.style.transition = "opacity 0.5s ease";
                setTimeout(() => toast.remove(), 500);
            }, 5000);
        });
    }

    // --- MODAL VIEWER FOR BLOG ARTICLES ---
    const modal = document.getElementById("article-modal");
    const modalBody = document.getElementById("modal-article-body");
    const closeModal = modal ? modal.querySelector(".close-modal") : null;

    function openArticle(id) {
        const article = articlesData[id];
        if (!article) return;

        modalBody.innerHTML = `
            <span class="article-tag" style="display:inline-block; margin-bottom:10px;">${article.tag}</span>
            <h2 class="modal-article-title">${article.title}</h2>
            <div class="modal-article-meta" style="font-size:0.85rem; color:#8E9E97; margin-bottom:20px;">
                <span>تاريخ النشر: ${article.date}</span> | <span>مكتب المحامية طيف العروي</span>
            </div>
            <div class="modal-article-content">
                ${article.content}
            </div>
            <div style="margin-top:30px; border-top:1px solid rgba(197, 147, 120, 0.2); padding-top:20px;">
                <a href="${whatsappBase}?text=${encodeURIComponent(`السلام عليكم، قرأت مقالكم المتميز بخصوص [${article.title}] وأرغب في استشارة قانونية متعلقة بهذا الشأن.`)}" target="_blank" class="btn btn-whatsapp" style="width:100%; text-align:center;">
                     طلب استشارة بخصوص هذا الموضوع <i data-lucide="message-square"></i>
                </a>
            </div>
        `;

        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent background scroll
        lucide.createIcons();
    }

    function closeArticleModal() {
        modal.classList.remove("active");
        document.body.style.overflow = ""; // Re-enable scroll
    }

    // Delegate clicks on articles
    document.addEventListener("click", (e) => {
        const trigger = e.target.closest(".open-article");
        if (trigger) {
            e.preventDefault();
            const id = trigger.getAttribute("data-id");
            openArticle(id);
        }
    });

    if (closeModal) {
        closeModal.addEventListener("click", closeArticleModal);
    }
    
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeArticleModal();
            }
        });
    }

    // --- FAQ ACCORDION LOGIC ---
    const accordionItems = document.querySelectorAll(".accordion-item");
    
    // Set initial minus icon for the default active item
    const defaultActiveItem = document.querySelector(".accordion-item.active");
    if (defaultActiveItem) {
        const defaultIcon = defaultActiveItem.querySelector(".accordion-icon");
        if (defaultIcon) {
            defaultIcon.setAttribute("data-lucide", "minus");
        }
    }
    
    accordionItems.forEach(item => {
        const trigger = item.querySelector(".accordion-trigger");
        if (trigger) {
            trigger.addEventListener("click", () => {
                const isActive = item.classList.contains("active");
                
                // Close all accordion items
                accordionItems.forEach(i => {
                    i.classList.remove("active");
                    const icon = i.querySelector(".accordion-icon");
                    if (icon) icon.setAttribute("data-lucide", "plus");
                });
                
                // Toggle active on clicked item
                if (!isActive) {
                    item.classList.add("active");
                    const icon = item.querySelector(".accordion-icon");
                    if (icon) icon.setAttribute("data-lucide", "minus");
                }
                
                // Re-create icons to reflect changes
                lucide.createIcons();
            });
        }
    });

    // --- SCROLL ANIMATIONS (INTERSECTION OBSERVER) ---
    const scrollElements = document.querySelectorAll(".sector-card, .article-card, .feature-item, .about-main-card");
    
    // Set class to prepare for animation
    scrollElements.forEach(el => el.classList.add("fade-in-scroll"));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Animates once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    scrollElements.forEach(el => observer.observe(el));

    // --- INITIALIZATION ---
    renderServices();
});
