// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 50,
    disable: 'mobile' // Disable animations on mobile if they continue to cause scroll issues
});


// Header Scroll Effect
const nav = document.querySelector(".navbar");
const navbarToggler = document.querySelector(".navbar-toggler");
const togglerIcon = navbarToggler.querySelector("i");

window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 50) {
        nav.classList.add("header-scrolled");
    } else {
        nav.classList.remove("header-scrolled");
    }
});

navbarToggler.addEventListener("click", () => {
    if (navbarToggler.classList.contains("collapsed")) {
        togglerIcon.classList.replace("fa-xmark", "fa-bars-staggered");
    } else {
        togglerIcon.classList.replace("fa-bars-staggered", "fa-xmark");
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
            togglerIcon.classList.replace("fa-xmark", "fa-bars-staggered");
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
