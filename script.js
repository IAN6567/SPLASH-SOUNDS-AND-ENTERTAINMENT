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

// Booking Modal Functionality
const bookingModal = document.getElementById('bookingModal');
const openBookingModal = document.getElementById('openBookingModal');
const openBookingModalFromContact = document.getElementById('openBookingModalFromContact');
const closeModal = document.querySelector('.close-modal');
const bookingForm = document.getElementById('bookingForm');

// Function to open modal
function openModal() {
    bookingModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Function to close modal
function closeModalFunc() {
    bookingModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Open modal from hero section button
openBookingModal.addEventListener('click', function(e) {
    e.preventDefault();
    openModal();
});

// Open modal from contact section button
openBookingModalFromContact.addEventListener('click', function() {
    openModal();
});

// Close modal
closeModal.addEventListener('click', function() {
    closeModalFunc();
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === bookingModal) {
        closeModalFunc();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && bookingModal.style.display === 'block') {
        closeModalFunc();
    }
});

// Format phone number to international format for WhatsApp
function formatPhoneNumber(phone) {
    // Remove all non-digit characters
    let cleaned = phone.replace(/\D/g, '');
    
    // If number starts with 0, replace with 254 (Kenya country code)
    if (cleaned.startsWith('0')) {
        cleaned = '254' + cleaned.substring(1);
    }
    
    // If number doesn't start with country code, add it
    if (!cleaned.startsWith('254')) {
        cleaned = '254' + cleaned;
    }
    
    return cleaned;
}

// Validate Kenyan phone number
function isValidKenyanPhone(phone) {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Check if it's a valid Kenyan number format
    // Accepts: 07xxxxxxxx, 01xxxxxxxx, +2547xxxxxxxx, +2541xxxxxxxx, 2547xxxxxxxx, 2541xxxxxxxx
    const kenyanRegex = /^(?:(?:\+?254)|(?:0))?[17]\d{8}$/;
    
    return kenyanRegex.test(cleaned);
}

// Booking form submission - SEND TO TWO NUMBERS
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('booking-name').value;
    const phone = document.getElementById('booking-phone').value;
    const eventType = document.getElementById('booking-event-type').value;
    const guests = document.getElementById('booking-guests').value;
    const date = document.getElementById('booking-date').value;
    const budget = document.getElementById('booking-budget').value;
    const message = document.getElementById('booking-message').value;
    
    // Get selected services
    const serviceCheckboxes = document.querySelectorAll('input[name="booking-services"]:checked');
    const services = Array.from(serviceCheckboxes).map(cb => cb.value).join(', ');
    
    // Basic validation
    if (!name || !phone || !eventType || !date || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Phone validation for Kenyan numbers
    if (!isValidKenyanPhone(phone)) {
        alert("Please enter a valid Kenyan phone number starting with 07, 01, or +254 (e.g., 0712345678, +254712345678)");
        return;
    }
    
    // Date validation
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        alert("Please select a future date for your event.");
        return;
    }
    
    // Format the message for WhatsApp
    const whatsappMessage = `
*EVENT BOOKING REQUEST - Splash Sounds Kenya*

*Name:* ${name}
*Phone:* ${phone}
*Event Type:* ${eventType}
${guests ? `*Number of Guests:* ${guests}` : ''}
*Event Date:* ${date}
${budget ? `*Budget Range:* ${budget}` : ''}
${services ? `*Services Needed:* ${services}` : ''}

*Event Details:*
${message}

_This booking request was sent from the Splash Sounds Kenya website_
    `.trim();
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Format phone number for WhatsApp
    const formattedPhone = formatPhoneNumber(phone);
    
    // WhatsApp numbers to send to
    const whatsappNumbers = [
        "254723281784", // First number
        "254723281784"  // Second number (same as requested)
    ];
    
    // Function to send message to a number
    function sendToWhatsApp(number) {
        const whatsappURL = `https://wa.me/${number}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    }
    
    // Send to first number
    sendToWhatsApp(whatsappNumbers[0]);
    
    // Small delay before sending to second number
    setTimeout(() => {
        sendToWhatsApp(whatsappNumbers[1]);
    }, 1000);
    
    // Show success message
    alert(`Thank you ${name}! Your booking request has been prepared for WhatsApp. You'll be redirected to send it to our team.`);
    
    // Close modal and reset form
    closeModalFunc();
    this.reset();
});