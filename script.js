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
*NEW EVENT INQUIRY - Splash Sounds Kenya*

*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}
*Event Type:* ${eventType}
*Event Date:* ${eventDate}

*Message:*
${message}

_This message was sent from the Splash Sounds Kenya website contact form_
    `.trim();

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(whatsappMessage);

  // Your WhatsApp number with Kenya country code
  const whatsappNumber = "254752307098"; // Kenya country code + your number

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

// Enhanced service cards animation
const serviceCards = document.querySelectorAll('.service-card');

const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
      }, index * 100);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

serviceCards.forEach((card) => {
  card.style.opacity = '0';
  serviceObserver.observe(card);
});

// Logo hover effect
const logo = document.querySelector('.logo');
if (logo) {
  logo.addEventListener('mouseenter', () => {
    const logoImage = document.querySelector('.logo-image');
    if (logoImage) {
      logoImage.style.transform = 'scale(1.05) rotate(5deg)';
    }
  });
  
  logo.addEventListener('mouseleave', () => {
    const logoImage = document.querySelector('.logo-image');
    if (logoImage) {
      logoImage.style.transform = 'scale(1) rotate(0deg)';
    }
  });
}

// Current year for copyright
document.addEventListener("DOMContentLoaded", function () {
  const yearElement = document.querySelector(".copyright p");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace("2024", currentYear);
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