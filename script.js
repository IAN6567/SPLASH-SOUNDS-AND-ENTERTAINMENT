// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// WhatsApp form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const eventType = document.getElementById("event-type").value;
  const eventDate = document.getElementById("event-date").value;
  const message = document.getElementById("message").value;

  // Basic form validation
  if (!name || !email || !phone || !eventType || !eventDate || !message) {
    alert("Please fill in all required fields.");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Phone validation (basic)
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""))) {
    alert("Please enter a valid phone number.");
    return;
  }

  // Date validation
  const selectedDate = new Date(eventDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    alert("Please select a future date for your event.");
    return;
  }

  // Format the message for WhatsApp
  const whatsappMessage = `
*NEW EVENT INQUIRY - Splash Sounds Website*

*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}
*Event Type:* ${eventType}
*Event Date:* ${eventDate}

*Message:*
${message}

_This message was sent from the Splash Sounds website contact form_
    `.trim();

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(whatsappMessage);

  // WhatsApp phone number (replace with actual business number)
  const whatsappNumber = "15551234567"; // Example: US number format

  // Create WhatsApp URL
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  // Open WhatsApp in a new tab
  window.open(whatsappURL, "_blank");

  // Show success message
  alert(
    `Thank you ${name}! Your message has been prepared for WhatsApp. You'll be redirected to send it to our team.`
  );

  // Optional: Reset form after submission
  // this.reset();
});

// Alternative method with phone number input
function sendToWhatsApp() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const eventType = document.getElementById("event-type").value;
  const eventDate = document.getElementById("event-date").value;
  const message = document.getElementById("message").value;

  if (!name || !phone) {
    alert("Please at least provide your name and phone number.");
    return;
  }

  const whatsappMessage = `
*Event Inquiry - Splash Sounds*

*Name:* ${name}
*Phone:* ${phone}
${email ? `*Email:* ${email}` : ""}
${eventType ? `*Event Type:* ${eventType}` : ""}
${eventDate ? `*Event Date:* ${eventDate}` : ""}

${message ? `*Message:* ${message}` : ""}

_Website Contact Form_
    `.trim();

  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappNumber = "15551234567"; // Replace with actual number

  window.open(
    `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
    "_blank"
  );
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Portfolio image loading animation
const portfolioItems = document.querySelectorAll(".portfolio-item");

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const portfolioObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

portfolioItems.forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translateY(20px)";
  item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  portfolioObserver.observe(item);
});

// Service cards animation
const serviceCards = document.querySelectorAll(".service-card");

const serviceObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 200);
      }
    });
  },
  { threshold: 0.1 }
);

serviceCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  serviceObserver.observe(card);
});

// Current year for copyright
document.addEventListener("DOMContentLoaded", function () {
  const yearElement = document.querySelector(".copyright p");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace("2023", currentYear);
  }
});

// Form input animations
const formInputs = document.querySelectorAll(".form-control");

formInputs.forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", function () {
    if (this.value === "") {
      this.parentElement.classList.remove("focused");
    }
  });
});
