document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault(); // منع الإرسال التقليدي للنموذج

            const usernameInput = document.getElementById("username").value.trim();
            const passwordInput = document.getElementById("password").value.trim();

            // بيانات الدخول المؤقتة (يمكنك تغييرها لاحقاً)
            const correctUser = "taif";
            const correctPass = "123456";

            if (usernameInput === correctUser && passwordInput === correctPass) {
                // حفظ حالة تسجيل الدخول في المتصفح
                localStorage.setItem("isLoggedIn", "true");
                
                // الانتقال فوراً إلى لوحة التحكم
                window.location.href = "dashboard.html";
            } else {
                alert("اسم المستخدم أو كلمة المرور غير صحيحة!");
            }
        });
    }
});