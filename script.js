// ===== Initialize all functionality when DOM is ready =====
function initAll() {
  // ===== Gallery Filter Logic =====
  const filterButtons = document.querySelectorAll('.filter-buttons button');
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Show only "Farm Views" on initial load
  galleryItems.forEach(item => {
    const category = item.getAttribute('data-category');
    if (category === 'views') {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });

  // Handle filter button clicks
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const activeBtn = document.querySelector('.filter-buttons button.active');
      if (activeBtn) activeBtn.classList.remove('active');
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (category === filterValue) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // ===== Smooth scroll for navbar links =====
  document.querySelectorAll('.task-bar-list a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ===== "Book Now" scrolls to Location =====
  const bookNowBtn = document.getElementById("bookNowBtn");
  if (bookNowBtn) {
    bookNowBtn.addEventListener("click", () => {
      const locationSection = document.getElementById("location");
      if (locationSection) {
        locationSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // ===== Highlight active nav link on scroll =====
  const navLinks = document.querySelectorAll(".task-bar-list a[href^='#']");
  const sections = [];

  navLinks.forEach(link => {
    const selector = link.getAttribute("href");
    const section = document.querySelector(selector);
    if (section) {
      sections.push({ id: selector, el: section });
    }
  });

  window.addEventListener("scroll", () => {
    let currentId = "";

    sections.forEach(obj => {
      const sectionTop = obj.el.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        currentId = obj.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === currentId) {
        link.classList.add("active");
      }
    });
  });

  // ===== Navbar background change on scroll =====
  const header = document.querySelector(".header-taskbar");

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  // DOM is already loaded
  initAll();
}

// ===== AOS Animation Initialization =====
// Wait for AOS library to load before initializing
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 500,
      easing: "ease-out",
      once: true,
    });
  } else {
    // If AOS isn't loaded yet, wait a bit and try again
    setTimeout(initAOS, 100);
  }
}

// Initialize AOS when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAOS);
} else {
  initAOS();
}

// ===== Image Lightbox Logic =====
// Wait for DOM to be fully loaded before initializing lightbox
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");

  // Check if elements exist
  if (!lightbox || !lightboxImg || !closeBtn) {
    console.error("Lightbox elements not found");
    return;
  }

  const openLightbox = (src, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("visible");
    document.body.classList.add("no-scroll");
  };

  const closeLightbox = () => {
    lightbox.classList.remove("visible");
    lightboxImg.src = "";
    document.body.classList.remove("no-scroll");
  };

  // Attach click to the REAL images, not the divs
  document.querySelectorAll(".gallery-item img").forEach(image => {
    image.addEventListener("click", () => {
      // If the parent .gallery-item is hidden (filtered out), ignore click
      const parentItem = image.closest(".gallery-item");
      if (parentItem && parentItem.classList.contains("hidden")) return;

      openLightbox(image.src, image.alt);
    });
  });

  // Also catch clicks anywhere on the card (helps on mobile)
  document.querySelectorAll(".gallery-item").forEach(card => {
    card.addEventListener("click", (e) => {
      // Avoid double-handling if the image handler already fired
      if (e.target.tagName.toLowerCase() === "img") return;
      if (card.classList.contains("hidden")) return;
      const img = card.querySelector("img");
      if (!img) return;
      openLightbox(img.src, img.alt);
    });
  });

  // Close when clicking X
  closeBtn.addEventListener("click", closeLightbox);

  // Close when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLightbox();
    }
  });
}

// Initialize lightbox when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLightbox);
} else {
  // DOM is already loaded
  initLightbox();
}
