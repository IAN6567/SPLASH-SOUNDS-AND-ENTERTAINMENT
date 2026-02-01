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

// ========== TESTIMONIALS FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', function() {
    // Testimonials data
    const testimonials = [
        {
            name: "Mark Lagat",
            title: "Wedding Client",
            rating: 5,
            text: "Splash Sounds made our wedding day absolutely magical! The sound system was crystal clear, and the DJ kept everyone on the dance floor all night. Their professionalism and attention to detail were outstanding. Highly recommend!",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Ian Kangwana",
            title: "Corporate Event Manager",
            rating: 5,
            text: "We hired Splash Sounds for our annual company conference and they exceeded all expectations. The audio quality was perfect for our presentations, and the lighting setup created the perfect ambiance. Their team was punctual, professional, and extremely talented.",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Stephen Muchiri",
            title: "Birthday Party Host",
            rating: 5,
            text: "For my 30th birthday party, I wanted everything to be perfect. Splash Sounds delivered beyond my wildest dreams! The DJ understood exactly what the crowd wanted, and the sound system was powerful yet clear. The event staff were incredibly helpful throughout the night.",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Sarah Wanjiku",
            title: "Event Planner",
            rating: 5,
            text: "As a professional event planner, I've worked with many sound and entertainment companies. Splash Sounds stands out for their reliability, quality equipment, and talented staff. They've never let me down and always make my events shine!",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b786d4d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        }
    ];

    // DOM Elements
    const testimonialSlider = document.getElementById('testimonialSlider');
    const testimonialDots = document.getElementById('testimonialDots');
    const prevTestimonialBtn = document.getElementById('prevTestimonial');
    const nextTestimonialBtn = document.getElementById('nextTestimonial');

    let currentTestimonial = 0;
    let testimonialCards = [];
    let dotElements = [];

    // Initialize testimonials
    function initTestimonials() {
        // Clear existing content
        testimonialSlider.innerHTML = '';
        testimonialDots.innerHTML = '';
        testimonialCards = [];
        dotElements = [];

        // Create testimonial cards and dots
        testimonials.forEach((testimonial, index) => {
            // Create testimonial card
            const card = document.createElement('div');
            card.className = `testimonial-card ${index === 0 ? 'active' : ''}`;
            
            // Generate star rating HTML
            const stars = '★'.repeat(testimonial.rating);
            
            card.innerHTML = `
                <div class="testimonial-content">
                    <p class="testimonial-text">${testimonial.text}</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">
                            <img src="${testimonial.avatar}" alt="${testimonial.name}" />
                        </div>
                        <div class="testimonial-info">
                            <h4>${testimonial.name}</h4>
                            <div class="title">${testimonial.title}</div>
                            <div class="testimonial-rating">
                                ${stars.split('').map(() => `<i class="fas fa-star"></i>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            testimonialSlider.appendChild(card);
            testimonialCards.push(card);

            // Create dot
            const dot = document.createElement('div');
            dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('data-index', index);
            dot.addEventListener('click', () => goToTestimonial(index));
            testimonialDots.appendChild(dot);
            dotElements.push(dot);
        });
    }

    // Navigation functions
    function goToTestimonial(index) {
        if (index < 0) index = testimonials.length - 1;
        if (index >= testimonials.length) index = 0;

        // Remove active class from all cards and dots
        testimonialCards.forEach(card => {
            card.classList.remove('active', 'prev');
        });
        
        dotElements.forEach(dot => {
            dot.classList.remove('active');
        });

        // Add active class to current card and dot
        testimonialCards[index].classList.add('active');
        dotElements[index].classList.add('active');
        
        // Add prev class to previous card (for smooth transition)
        const prevIndex = index === 0 ? testimonials.length - 1 : index - 1;
        testimonialCards[prevIndex].classList.add('prev');

        currentTestimonial = index;
    }

    function nextTestimonial() {
        goToTestimonial(currentTestimonial + 1);
    }

    function prevTestimonial() {
        goToTestimonial(currentTestimonial - 1);
    }

    // Event listeners for navigation
    prevTestimonialBtn.addEventListener('click', prevTestimonial);
    nextTestimonialBtn.addEventListener('click', nextTestimonial);

    // Auto-advance testimonials
    let testimonialInterval;
    
    function startAutoTestimonial() {
        testimonialInterval = setInterval(nextTestimonial, 8000);
    }
    
    function stopAutoTestimonial() {
        clearInterval(testimonialInterval);
    }
    
    // Initialize and start auto-advance
    initTestimonials();
    startAutoTestimonial();
    
    // Pause auto-advance on hover
    testimonialSlider.addEventListener('mouseenter', stopAutoTestimonial);
    testimonialSlider.addEventListener('mouseleave', startAutoTestimonial);
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    testimonialSlider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoTestimonial();
    });
    
    testimonialSlider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleTestimonialSwipe();
        startAutoTestimonial();
    });
    
    function handleTestimonialSwipe() {
        const swipeThreshold = 50;
        
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left
            nextTestimonial();
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe right
            prevTestimonial();
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') prevTestimonial();
        if (e.key === 'ArrowRight') nextTestimonial();
    });
});

// ========== FIX FOR PORTFOLIO GALLERY BUTTON ==========
// Remove any conflicting event listeners and let the link work normally
document.addEventListener('DOMContentLoaded', function() {
    // Remove any existing click handlers that might be preventing the link from working
    const viewPortfolioBtn = document.getElementById('viewPortfolioBtn');
    
    if (viewPortfolioBtn) {
        // Clone the button to remove all event listeners
        const newBtn = viewPortfolioBtn.cloneNode(true);
        viewPortfolioBtn.parentNode.replaceChild(newBtn, viewPortfolioBtn);
        
        console.log('Portfolio gallery button fixed - should now work as a normal link');
    }
});