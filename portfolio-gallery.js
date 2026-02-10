// Portfolio Gallery Page JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Event data - ADD YOUR 10 IMAGES HERE
  const events = [
    {
      id: 1,
      image: "wedspl.jpg",
      title: "Elegant Wedding Reception",
      description:
        "Complete sound system with wireless mics and professional DJ services for a beautiful wedding celebration at Safari Park Hotel.",
      type: "wedding",
      date: "March 15, 2024",
      location: "Private residence, Elgon view",
      guests: "250 guests",
      services: ["Sound System", "DJ Services", "Lighting"],
    },
    {
      id: 2,
      image: "bbspl.jpg",
      title: "Golden Circle Corporate Gala",
      description:
        "Full event production with stage setup, lighting, and audio for Golden Circle annual celebration at Kempinski Hotel.",
      type: "corporate",
      date: "February 28, 2024",
      location: "Kempinski Hotel, Nairobi",
      guests: "300 guests",
      services: ["Sound System", "Stage Setup", "Lighting", "Event Staffing"],
    },
    {
      id: 3,
      image: "brtspl.jpg",
      title: "Surprise Birthday Celebration",
      description:
        "DJ and sound system for a vibrant outdoor birthday party with custom playlist and dance floor lighting.",
      type: "birthday",
      date: "January 20, 2024",
      location: "Private Residence, Karen",
      guests: "150 guests",
      services: ["DJ Services", "Sound System", "Lighting"],
    },
    {
      id: 4,
      image: "splsyt.jpg",
      title: "Live Music Concert",
      description:
        "Full concert sound system with mixing and live audio engineering for a major music festival in Eldoret.",
      type: "concert",
      date: "December 10, 2023",
      location: "Eldoret Sports Club",
      guests: "500+ guests",
      services: ["Concert Sound System", "Mixing", "Live Audio Engineering"],
    },
    {
      id: 5,
      image: "splashsound.jpg",
      title: "Club Sound Installation",
      description:
        "Premium club sound system installation with state-of-the-art equipment for maximum audio quality.",
      type: "other",
      date: "November 5, 2023",
      location: "kapseret, Eldoret",
      guests: "Installation",
      services: ["Sound System Installation", "Acoustic Treatment"],
    },
    {
      id: 6,
      image: "dj deno.jpg",
      title: "Professional DJ Setup",
      description:
        "State-of-the-art DJ equipment setup for seamless mixing and entertainment at corporate events.",
      type: "corporate",
      date: "October 18, 2023",
      location: "Kapseret, Eldoret",
      guests: "200 guests",
      services: ["DJ Services", "MC Services", "Sound System"],
    },
    {
      id: 7,
      image: "light deno.jpg",
      title: "Lighting Effects Setup",
      description:
        "Professional lighting setup for creating the perfect ambiance and visual effects for events.",
      type: "other",
      date: "September 22, 2023",
      location: "Carnivore Restaurant, Nairobi",
      guests: "180 guests",
      services: ["Lighting Design", "LED Effects", "Spotlights"],
    },
    {
      id: 8,
      image: "staff splash.jpeg",
      title: "Event Staff Team",
      description:
        "Professional event staff team ensuring smooth operations from setup to teardown.",
      type: "other",
      date: "August 30, 2023",
      location: "Various Locations",
      guests: "Professional Team",
      services: ["Event Staffing", "Setup Crew", "Technical Support"],
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Corporate Conference",
      description:
        "Sound and lighting setup for a major corporate conference with multiple speaker sessions.",
      type: "corporate",
      date: "July 14, 2023",
      location: "Sports club, Eldoret",
      guests: "400 guests",
      services: ["Conference Sound", "Wireless Mics", "Lighting"],
    },
    {
      id: 10,
      image:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Music Festival",
      description:
        "Large-scale sound systems for outdoor music festival with multiple stages and performers.",
      type: "concert",
      date: "June 3, 2023",
      location: "Lobo village, Eldoret",
      guests: "1000+ guests",
      services: ["Festival Sound", "Stage Setup", "Power Management"],
    },
    // Add more events here if you have more images
  ];

  // DOM Elements
  const galleryGrid = document.getElementById("galleryGrid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const imageModal = document.getElementById("imageModal");
  const closeModal = document.querySelector(".close-modal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalDate = document.getElementById("modalDate");
  const modalLocation = document.getElementById("modalLocation");
  const modalGuests = document.getElementById("modalGuests");
  const prevImageBtn = document.getElementById("prevImage");
  const nextImageBtn = document.getElementById("nextImage");

  let currentFilter = "all";
  let currentIndex = 0;
  let displayedEvents = 6;
  let filteredEvents = [...events];

  // Initialize gallery
  function initGallery() {
    renderGallery();
    setupEventListeners();
  }

  // Render gallery items
  function renderGallery() {
    galleryGrid.innerHTML = "";

    const eventsToShow = filteredEvents.slice(0, displayedEvents);

    eventsToShow.forEach((event, index) => {
      const galleryItem = createGalleryItem(event, index);
      galleryGrid.appendChild(galleryItem);
    });

    // Show/hide load more button
    if (displayedEvents >= filteredEvents.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "block";
    }
  }

  // Create gallery item HTML
  function createGalleryItem(event, index) {
    const div = document.createElement("div");
    div.className = `gallery-item ${event.type}`;
    div.innerHTML = `
            <div class="gallery-image">
                <img src="${event.image}" alt="${event.title}" loading="lazy">
            </div>
            <div class="gallery-content">
                <span class="event-type">${getTypeLabel(event.type)}</span>
                <h3>${event.title}</h3>
                <p>${event.description.substring(0, 100)}...</p>
                <div class="event-meta">
                    <span><i class="fas fa-calendar-alt"></i> ${
                      event.date
                    }</span>
                    <span><i class="fas fa-users"></i> ${event.guests}</span>
                </div>
                <button class="view-details" data-index="${index}">
                    <i class="fas fa-expand"></i> View Details
                </button>
            </div>
        `;
    return div;
  }

  // Get type label
  function getTypeLabel(type) {
    const labels = {
      wedding: "Wedding",
      corporate: "Corporate",
      birthday: "Birthday",
      concert: "Concert",
      other: "Other Event",
    };
    return labels[type] || type;
  }

  // Filter events
  function filterEvents(type) {
    currentFilter = type;
    displayedEvents = 6;

    if (type === "all") {
      filteredEvents = [...events];
    } else {
      filteredEvents = events.filter((event) => event.type === type);
    }

    renderGallery();
  }

  // Show image modal
  function showImageModal(index) {
    const event = filteredEvents[index];
    currentIndex = index;

    modalImage.src = event.image;
    modalImage.alt = event.title;
    modalTitle.textContent = event.title;
    modalDescription.textContent = event.description;
    modalDate.textContent = event.date;
    modalLocation.textContent = event.location;
    modalGuests.textContent = event.guests;

    imageModal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  // Navigation in modal
  function showNextImage() {
    currentIndex = (currentIndex + 1) % filteredEvents.length;
    showImageModal(currentIndex);
  }

  function showPrevImage() {
    currentIndex =
      (currentIndex - 1 + filteredEvents.length) % filteredEvents.length;
    showImageModal(currentIndex);
  }

  // Setup event listeners
  function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        filterEvents(button.dataset.filter);
      });
    });

    // Load more button
    loadMoreBtn.addEventListener("click", () => {
      displayedEvents += 6;
      renderGallery();
    });

    // View details buttons
    document.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("view-details") ||
        e.target.closest(".view-details")
      ) {
        const button = e.target.classList.contains("view-details")
          ? e.target
          : e.target.closest(".view-details");
        const index = parseInt(button.dataset.index);
        showImageModal(index);
      }
    });

    // Close modal
    closeModal.addEventListener("click", () => {
      imageModal.style.display = "none";
      document.body.style.overflow = "auto";
    });

    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === imageModal) {
        imageModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });

    // Modal navigation
    prevImageBtn.addEventListener("click", showPrevImage);
    nextImageBtn.addEventListener("click", showNextImage);

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (imageModal.style.display === "block") {
        if (e.key === "Escape") {
          imageModal.style.display = "none";
          document.body.style.overflow = "auto";
        } else if (e.key === "ArrowRight") {
          showNextImage();
        } else if (e.key === "ArrowLeft") {
          showPrevImage();
        }
      }
    });
  }

  // Initialize the gallery
  initGallery();
});