// ====== Mobile Navigation Toggle ======
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
  });
}

// ====== Active Nav Link on Scroll ======
const sections = document.querySelectorAll("section[id]");

function setActiveNavLink() {
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 120;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add("active");
      } else {
        navLink.classList.remove("active");
      }
    }
  });
}

window.addEventListener("scroll", setActiveNavLink);

// ====== Footer Year ======
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ====== EmailJS Configuration (v4) ======
function initializeEmailJS() {
  if (typeof emailjs !== "undefined") {
    // config.* comes from config.js
    emailjs.init(config.EMAILJS_PUBLIC_KEY);
    // console.log("✅ EmailJS initialized successfully!");
  } else {
    console.warn("⏳ Waiting for EmailJS to load...");
    setTimeout(initializeEmailJS, 100);
  }
}

// Start initialization when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeEmailJS);
} else {
  initializeEmailJS();
}

// ====== Contact Form Validation & Sending ======
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

function showError(inputEl, message) {
  const group = inputEl.closest(".form-group");
  const errorText = group.querySelector(".error-message");
  group.classList.add("invalid");
  if (errorText) errorText.textContent = message;
}

function clearError(inputEl) {
  const group = inputEl.closest(".form-group");
  const errorText = group.querySelector(".error-message");
  group.classList.remove("invalid");
  if (errorText) errorText.textContent = "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Form submitted!");

    const nameInput = form.querySelector("#name");
    const emailInput = form.querySelector("#email");
    const messageInput = form.querySelector("#message");

    clearError(nameInput);
    clearError(emailInput);
    clearError(messageInput);
    formStatus.textContent = "";

    if (!nameInput.value.trim()) {
      showError(nameInput, "Name is required.");
      return;
    }

    if (!emailInput.value.trim()) {
      showError(emailInput, "Email is required.");
      return;
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, "Please enter a valid email.");
      return;
    }

    if (!messageInput.value.trim()) {
      showError(messageInput, "Message is required.");
      return;
    }

    // Send email using EmailJS
    console.log("Validation passed, sending email...");
    formStatus.style.color = "#a5b4fc";
    formStatus.textContent = "Sending your message...";

    emailjs
      .sendForm(config.EMAILJS_SERVICE_ID, config.EMAILJS_TEMPLATE_ID, form)
      .then(function (response) {
        console.log("✅ Email sent successfully!", response);
        formStatus.style.color = "#4ade80";
        formStatus.textContent = "Thank you! Your message has been sent successfully.";
        form.reset();
      })
      .catch(function (error) {
        console.error("❌ Email error:", error);
        formStatus.style.color = "#f87171";
        formStatus.textContent = "Error sending message. Please try again.";
      });
  });

  ["input", "blur", "keyup"].forEach((evtName) => {
    form.addEventListener(
      evtName,
      (e) => {
        if (e.target.matches("input, textarea")) {
          clearError(e.target);
        }
      },
      true
    );
  });
}

// ====== Logo Animation ======
const logoSpans = document.querySelectorAll(".logo span");

if (logoSpans.length > 0) {
  logoSpans.forEach((span, idx) => {
    setTimeout(() => {
      span.classList.add("active");
    }, idx * 400);
  });
}
