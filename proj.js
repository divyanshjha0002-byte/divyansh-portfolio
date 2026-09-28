/* =====================================================
   DIVYANSH JHA PORTFOLIO
   Vanilla JavaScript
===================================================== */


/* ================= DOM ELEMENTS ================= */

const navbar = document.getElementById("navbar");
const navMenu = document.getElementById("navMenu");
const menuToggle = document.getElementById("menuToggle");
const themeToggle = document.getElementById("themeToggle");

const navLinks = document.querySelectorAll(".nav-link");

const typingText = document.getElementById("typingText");

const backToTop = document.getElementById("backToTop");

const currentYear = document.getElementById("currentYear");

const contactForm = document.getElementById("contactForm");

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

const revealElements = document.querySelectorAll(".reveal");

const skillItems = document.querySelectorAll(".skill-item");


/* =====================================================
   CURRENT YEAR
===================================================== */

currentYear.textContent = new Date().getFullYear();


/* =====================================================
   MOBILE MENU
===================================================== */

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

    const isOpen = navMenu.classList.contains("open");

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
    );

});


/* Close mobile menu after clicking a link */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        menuToggle.setAttribute(
            "aria-label",
            "Open menu"
        );

    });

});


/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

function updateNavbar() {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}


window.addEventListener("scroll", updateNavbar);

updateNavbar();


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section[id]");


function updateActiveNavigation() {

    let currentSection = "";

    const scrollPosition =
        window.scrollY + 180;


    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (href === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);

updateActiveNavigation();


/* =====================================================
   TYPING ANIMATION
===================================================== */

const typingWords = [

    "Web Developer",
    "Software Engineer in the Making",
    "Creative Learner",
    "Content Creator"

];

let wordIndex = 0;
let characterIndex = 0;

let isDeleting = false;


function typeEffect() {

    const currentWord =
        typingWords[wordIndex];


    if (!isDeleting) {

        typingText.textContent =
            currentWord.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (characterIndex === currentWord.length) {

            isDeleting = true;

            setTimeout(
                typeEffect,
                1500
            );

            return;
        }

    } else {

        typingText.textContent =
            currentWord.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (characterIndex === 0) {

            isDeleting = false;

            wordIndex++;

            if (
                wordIndex >= typingWords.length
            ) {

                wordIndex = 0;

            }

        }

    }


    const typingSpeed =
        isDeleting ? 45 : 85;


    setTimeout(
        typeEffect,
        typingSpeed
    );

}


typeEffect();


/* =====================================================
   DARK / LIGHT THEME
===================================================== */

const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "light") {

    document.body.classList.add("light-theme");

    themeToggle.textContent = "🌙";

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle(
        "light-theme"
    );


    const isLight =
        document.body.classList.contains(
            "light-theme"
        );


    themeToggle.textContent =
        isLight ? "🌙" : "☀️";


    localStorage.setItem(
        "portfolio-theme",
        isLight ? "light" : "dark"
    );

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   SKILL ANIMATIONS
===================================================== */

const skillObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }


                const skill =
                    entry.target;

                const progress =
                    skill.dataset.progress;

                const progressBar =
                    skill.querySelector(
                        ".progress-bar"
                    );


                progressBar.style.width =
                    `${progress}%`;


                skillObserver.unobserve(skill);

            });

        },
        {
            threshold: 0.3
        }
    );


skillItems.forEach(skill => {

    skillObserver.observe(skill);

});


/* =====================================================
   PROJECT FILTER
===================================================== */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        /* Remove active class */

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        /* Add active class */

        button.classList.add("active");


        const selectedFilter =
            button.dataset.filter;


        projectCards.forEach(card => {

            const category =
                card.dataset.category;


            if (
                selectedFilter === "all" ||
                category === selectedFilter
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


/* =====================================================
   CONTACT FORM VALIDATION
===================================================== */

contactForm.addEventListener("submit", event => {

    event.preventDefault();


    /* Clear old messages */

    document.getElementById(
        "nameError"
    ).textContent = "";

    document.getElementById(
        "emailError"
    ).textContent = "";

    document.getElementById(
        "messageError"
    ).textContent = "";


    const name =
        document.getElementById("name")
            .value.trim();

    const email =
        document.getElementById("email")
            .value.trim();

    const message =
        document.getElementById("message")
            .value.trim();


    let isValid = true;


    /* NAME */

    if (name.length < 2) {

        document.getElementById(
            "nameError"
        ).textContent =
            "Please enter your name.";

        isValid = false;

    }


    /* EMAIL */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        document.getElementById(
            "emailError"
        ).textContent =
            "Please enter a valid email address.";

        isValid = false;

    }


    /* MESSAGE */

    if (message.length < 10) {

        document.getElementById(
            "messageError"
        ).textContent =
            "Message should contain at least 10 characters.";

        isValid = false;

    }


    const formMessage =
        document.getElementById(
            "formMessage"
        );


    /* INVALID */

    if (!isValid) {

        formMessage.textContent =
            "Please fix the errors above.";

        formMessage.className =
            "form-message error";

        return;

    }


    /* VALID */

    formMessage.textContent =
        "Your message is valid! The form itself does not send emails because this website has no backend.";


    formMessage.className =
        "form-message success";


    /*
        Create a mailto option.

        This opens the user's email application.
    */

    const subject =
        encodeURIComponent(
            `Portfolio message from ${name}`
        );

    const body =
        encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );


    const mailLink =
        document.createElement("a");


    mailLink.href =
        `mailto:divyanshjha0002@gmail.com?subject=${subject}&body=${body}`;

    mailLink.textContent =
        " Open Email App";


    mailLink.style.display =
        "inline-block";

    mailLink.style.marginTop =
        "8px";

    mailLink.style.color =
        "#60a5fa";

    mailLink.style.fontWeight =
        "600";


    formMessage.appendChild(mailLink);


    /* Clear form */

    contactForm.reset();

});


/* =====================================================
   BACK TO TOP
===================================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =====================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener("click", event => {

    const clickedInsideMenu =
        navMenu.contains(event.target);

    const clickedMenuButton =
        menuToggle.contains(event.target);


    if (
        !clickedInsideMenu &&
        !clickedMenuButton &&
        navMenu.classList.contains("open")
    ) {

        navMenu.classList.remove("open");

        menuToggle.setAttribute(
            "aria-label",
            "Open menu"
        );

    }

});


/* =====================================================
   ESC KEY CLOSES MENU
===================================================== */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        navMenu.classList.remove("open");

        menuToggle.setAttribute(
            "aria-label",
            "Open menu"
        );

    }

});


/* =====================================================
   PREVENT FAKE LINKS
===================================================== */

document.querySelectorAll(
    'a[href="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        event => event.preventDefault()
    );

});