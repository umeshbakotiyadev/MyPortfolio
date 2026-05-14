// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Header Scroll Effect
const nav = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 50) {
        nav.classList.add("header-scrolled");
    } else {
        nav.classList.remove("header-scrolled");
    }
});

// Mobile Nav Hide on Click
const navLinks = document.querySelectorAll(".nav-link");
const navCollapse = document.querySelector(".navbar-collapse");
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (navCollapse.classList.contains("show")) {
            const bsCollapse = new bootstrap.Collapse(navCollapse);
            bsCollapse.hide();
        }
    });
});

// Contact Form Logic
const scriptURL = 'https://script.google.com/macros/s/AKfycbyh_bGN0ngSTpqHxopKayo1_L95rC6-Rw7TeAqQK84Sl3KkQ7UQ1quBI1Iv-E5LuW2D/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        
        submitBtn.innerText = "SENDING...";
        submitBtn.disabled = true;

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                msg.innerHTML = "MESSAGE SENT SUCCESSFULLY!";
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                setTimeout(() => { msg.innerHTML = ""; }, 5000);
                form.reset();
            })
            .catch(error => {
                console.error('Error!', error.message);
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                msg.innerHTML = "ERROR. PLEASE TRY AGAIN.";
            });
    });
}
