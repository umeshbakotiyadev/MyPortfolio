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

// Load Latest Blogs on Homepage
const latestBlogContainer = document.getElementById('latest-blog-container');
if (latestBlogContainer && typeof BLOG_DATA !== 'undefined') {
    const latestBlogs = BLOG_DATA.slice(0, 2);
    latestBlogContainer.innerHTML = '';
    latestBlogs.forEach((blog, index) => {
        latestBlogContainer.innerHTML += `
            <div class="col-lg-6" data-aos="fade-up" data-aos-delay="${index * 100}">
                <article class="studio-card h-100">
                    <div class="mb-4 overflow-hidden rounded-4">
                        <img src="${blog.image}" alt="${blog.title}" class="img-fluid w-100" style="aspect-ratio: 16/9; object-fit: cover;" onerror="this.src='img/3.png'">
                    </div>
                    <div class="d-flex gap-2 mb-3">
                        <span class="badge-custom">${blog.category}</span>
                        <span class="small text-muted align-self-center">${blog.date}</span>
                    </div>
                    <h3 class="h4 mb-3">${blog.title}</h3>
                    <p class="text-muted mb-4" style="font-size: 0.95rem;">${blog.summary}</p>
                    <a href="blog-details.html?id=${blog.id}" class="text-accent fw-bold">Read Article <i class="fas fa-arrow-right ms-2"></i></a>
                </article>
            </div>
        `;
    });
    // Refresh AOS with a tiny delay
    setTimeout(() => {
        if (window.AOS) {
            AOS.init({ duration: 800, once: true });
            AOS.refresh();
        }
    }, 100);
}

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
