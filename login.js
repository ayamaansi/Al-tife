// رابط سكربت المصادقة (OTP) من جوجل - سيتم إضافته لاحقاً
const GOOGLE_AUTH_URL = "https://script.google.com/macros/s/AKfycbziFUFY7J8Tyg_RBCx61OJm2iSOK5R72ABGVIcqCCclrZiq8QI5R8zN8z8sl_Dc8rbf/exec"; 

document.addEventListener("DOMContentLoaded", () => {
    const emailForm = document.getElementById("email-form");
    const otpForm = document.getElementById("otp-form");
    const emailInput = document.getElementById("admin-email");
    const sendBtn = document.getElementById("send-btn");
    const verifyBtn = document.getElementById("verify-btn");
    const errorMsg = document.getElementById("error-msg");
    const successMsg = document.getElementById("success-msg");
    const stepDescription = document.getElementById("step-description");
    const backToEmailBtn = document.getElementById("back-to-email");
    const otpInputs = document.querySelectorAll(".otp-char");

    let currentEmail = "";

    // إدارة الانتقال التلقائي بين حقول الكود الـ 6
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });

    function showMessage(msg, isError = true) {
        if (isError) {
            errorMsg.textContent = msg;
            errorMsg.style.display = "block";
            successMsg.style.display = "none";
        } else {
            successMsg.textContent = msg;
            successMsg.style.display = "block";
            errorMsg.style.display = "none";
        }
    }

    // 1. إرسال الإيميل لطلب الكود
    emailForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        if (!email) return;

        if (GOOGLE_AUTH_URL === "YOUR_AUTH_SCRIPT_URL_HERE") {
            showMessage("لم يتم ربط النظام برابط جوجل بعد. الرجاء إضافة الرابط في ملف login.js", true);
            return;
        }

        sendBtn.disabled = true;
        sendBtn.innerHTML = `<span>جاري الإرسال...</span> <i data-lucide="loader" class="spin"></i>`;
        lucide.createIcons();
        errorMsg.style.display = "none";

        try {
            const response = await fetch(`${GOOGLE_AUTH_URL}?action=sendOTP&email=${encodeURIComponent(email)}`, {
                method: "GET"
            });
            const result = await response.json();

            if (result.status === "success") {
                currentEmail = email;
                emailForm.style.display = "none";
                otpForm.style.display = "block";
                stepDescription.textContent = "تم إرسال كود التحقق بنجاح! الرجاء مراجعة بريدك الإلكتروني.";
                showMessage("تم إرسال الكود بنجاح", false);
                otpInputs[0].focus();
            } else {
                showMessage(result.message || "عفواً، هذا الإيميل غير مصرح له بالدخول.");
            }
        } catch (error) {
            showMessage("حدث خطأ: " + error.message);
            console.error(error);
        } finally {
            sendBtn.disabled = false;
            sendBtn.innerHTML = `<span>إرسال كود التحقق</span> <i data-lucide="send"></i>`;
            lucide.createIcons();
        }
    });

    // 2. التحقق من الكود
    otpForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        let otpCode = "";
        otpInputs.forEach(input => otpCode += input.value);
        
        if (otpCode.length !== 6) {
            showMessage("الرجاء إدخال الكود المكون من 6 أرقام كاملة.");
            return;
        }

        verifyBtn.disabled = true;
        verifyBtn.innerHTML = `<span>جاري التحقق...</span> <i data-lucide="loader" class="spin"></i>`;
        lucide.createIcons();
        errorMsg.style.display = "none";

        try {
            const response = await fetch(`${GOOGLE_AUTH_URL}?action=verifyOTP&otp=${encodeURIComponent(otpCode)}`, {
                method: "GET"
            });
            const result = await response.json();

            if (result.status === "success") {
                showMessage("تم تسجيل الدخول بنجاح! جاري التوجيه...", false);
                localStorage.setItem("isLoggedIn", "true");
                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 1000);
            } else {
                showMessage(result.message || "الكود خاطئ أو منتهي الصلاحية.");
            }
        } catch (error) {
            showMessage("حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.");
            console.error(error);
        } finally {
            verifyBtn.disabled = false;
            verifyBtn.innerHTML = `<span>تسجيل الدخول</span> <i data-lucide="log-in"></i>`;
            lucide.createIcons();
        }
    });

    // 3. العودة لتعديل الإيميل
    backToEmailBtn.addEventListener("click", (e) => {
        e.preventDefault();
        otpForm.style.display = "none";
        emailForm.style.display = "block";
        stepDescription.textContent = "الرجاء إدخال البريد الإلكتروني المعتمد للمكتب لتلقي كود الدخول.";
        errorMsg.style.display = "none";
        successMsg.style.display = "none";
        otpInputs.forEach(input => input.value = "");
    });
});