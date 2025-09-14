const $ = require("jquery") // Declare the $ variable

$(document).ready(() => {
  function initializeEntranceAnimations() {
    setTimeout(() => {
      // Hero section animations with enhanced effects
      $(".hero-badge").addClass("animate-fade-scale animate-delay-1")
      $(".hero-title").addClass("animate-fade-up animate-delay-2")
      $(".hero-subtitle").addClass("animate-fade-up animate-delay-3")
      $(".hero-text").addClass("animate-fade-up animate-delay-4")
      $(".hero-buttons .btn-services").each(function (index) {
        $(this).addClass("animate-slide-left animate-delay-" + (index + 5))
      })

      // Floating elements animation
      $(".floating-element").each(function (index) {
        $(this).css("animation-delay", index * 0.5 + "s")
      })
    }, 100)

    // Section headers with stagger
    $(".section-badge").addClass("animate-fade-scale animate-delay-1")
    $(".section-title").addClass("animate-fade-up animate-delay-2")
    $(".section-subtitle").addClass("animate-fade-up animate-delay-3")
  }

  function animateOnScroll() {
    const windowTop = $(window).scrollTop()
    const windowBottom = windowTop + $(window).height()

    // Service cards with enhanced stagger animation
    $(".service-card.modern").each(function (index) {
      const elementTop = $(this).offset().top
      const elementBottom = elementTop + $(this).outerHeight()

      if (elementBottom > windowTop && elementTop < windowBottom - 100) {
        setTimeout(() => {
          $(this).addClass("animate-fade-scale")
          // Animate progress bars
          $(this)
            .find(".progress-bar")
            .each(function () {
              const width = $(this).data("width")
              $(this).css("width", width + "%")
            })
        }, index * 150)
      }
    })

    // About section cards
    $(".about-text-card, .stat-card").each(function (index) {
      const elementTop = $(this).offset().top
      const elementBottom = elementTop + $(this).outerHeight()

      if (elementBottom > windowTop && elementTop < windowBottom - 100) {
        setTimeout(() => {
          $(this).addClass("animate-fade-scale")
          // Animate progress bars
          $(this)
            .find(".progress-bar")
            .each(function () {
              const width = $(this).data("width")
              $(this).css("width", width + "%")
            })
        }, index * 200)
      }
    })

    // Gallery items with enhanced animation
    $(".gallery-item").each(function (index) {
      const elementTop = $(this).offset().top
      const elementBottom = elementTop + $(this).outerHeight()

      if (elementBottom > windowTop && elementTop < windowBottom - 100) {
        setTimeout(() => {
          $(this).addClass("animate-fade-scale")
        }, index * 100)
      }
    })

    // Contact cards animation
    $(".contact-card").each(function (index) {
      const elementTop = $(this).offset().top
      const elementBottom = elementTop + $(this).outerHeight()

      if (elementBottom > windowTop && elementTop < windowBottom - 100) {
        setTimeout(() => {
          $(this).addClass("animate-slide-right")
        }, index * 100)
      }
    })

    // Tech items animation
    $(".tech-item").each(function (index) {
      const elementTop = $(this).offset().top
      const elementBottom = elementTop + $(this).outerHeight()

      if (elementBottom > windowTop && elementTop < windowBottom - 100) {
        setTimeout(() => {
          $(this).addClass("animate-slide-left")
        }, index * 100)
      }
    })
  }

  // Initialize entrance animations
  initializeEntranceAnimations()

  $(".mobile-menu-toggle").click(function () {
    $(this).toggleClass("active")
    $(".nav-menu").toggleClass("active")

    // Add body scroll lock when menu is open
    if ($(this).hasClass("active")) {
      $("body").css("overflow", "hidden")
    } else {
      $("body").css("overflow", "auto")
    }
  })

  // Smooth Scrolling for Navigation Links
  $('.nav-link[href^="#"]').click(function (e) {
    e.preventDefault()

    var target = $(this.getAttribute("href"))
    if (target.length) {
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - 80,
          },
          1000,
        )
    }

    // Close mobile menu after clicking
    $(".nav-menu").removeClass("active")
    $(".mobile-menu-toggle").removeClass("active")

    // Update active nav link
    $(".nav-link").removeClass("active")
    $(this).addClass("active")
  })

  // Header Background Change on Scroll
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".header").addClass("scrolled")
    } else {
      $(".header").removeClass("scrolled")
    }

    // Parallax effect for hero background
    $(".hero-background").css("transform", `translateY(${$(this).scrollTop() * 0.5}px)`)

    // Floating elements parallax
    $(".floating-element").each(function (index) {
      const speed = 0.3 + index * 0.1
      $(this).css("transform", `translateY(${$(this).scrollTop() * speed}px)`)
    })

    // Update active navigation and animate on scroll
    updateActiveNav()
    animateOnScroll()
  })

  // Update Active Navigation
  function updateActiveNav() {
    var scrollPos = $(window).scrollTop() + 100

    $('.nav-link[href^="#"]').each(function () {
      var target = $(this.getAttribute("href"))
      if (target.length && target.offset().top <= scrollPos && target.offset().top + target.outerHeight() > scrollPos) {
        $(".nav-link").removeClass("active")
        $(this).addClass("active")
      }
    })
  }

  // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe cards and gallery items
    const animateElements = document.querySelectorAll('.card, .gallery-item, .gallery-item-4, .contact-card, .feature-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

  $(".filter-btn").click(function () {
    const filter = $(this).data("filter")

    // Update active button
    $(".filter-btn").removeClass("active")
    $(this).addClass("active")

    // Filter gallery items
    if (filter === "all") {
      $(".gallery-item").fadeIn(300)
    } else {
      $(".gallery-item").fadeOut(300)
      $(`.gallery-item[data-category="${filter}"]`).fadeIn(300)
    }
  })

  $(".form-group input, .form-group textarea")
    .focus(function () {
      $(this).parent().addClass("focused")
    })
    .blur(function () {
      if ($(this).val() === "") {
        $(this).parent().removeClass("focused")
      }
    })

  $(".service-card.modern").hover(
    function () {
      $(this).find(".service-image").addClass("shimmer-effect")
      $(this).css("transform", "translateY(-15px) scale(1.02)")
    },
    function () {
      $(this).find(".service-image").removeClass("shimmer-effect")
      $(this).css("transform", "translateY(0) scale(1)")
    },
  )

  $(".gallery-item").hover(
    function () {
      $(this).find("img").css({
        transform: "scale(1.1) rotate(2deg)",
        filter: "brightness(1.1) contrast(1.1)",
      })
    },
    function () {
      $(this).find("img").css({
        transform: "scale(1) rotate(0deg)",
        filter: "brightness(1) contrast(1)",
      })
    },
  )

  $("#contactForm").submit(function (e) {
    e.preventDefault()

    // Get form data
    var name = $("#name").val()
    var email = $("#email").val()
    var phone = $("#phone").val()
    var message = $("#message").val()

    // Basic validation
    if (!name || !email || !message) {
      showNotification("Bitte füllen Sie alle Pflichtfelder aus.", "error")
      return
    }

    // Email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      showNotification("Bitte geben Sie eine gültige E-Mail-Adresse ein.", "error")
      return
    }

    // Enhanced form submission with loading state
    var submitBtn = $(this).find('button[type="submit"]')
    var originalText = submitBtn.find(".btn-text").text()

    submitBtn.addClass("loading")
    submitBtn.find(".btn-text").text("Wird gesendet...")
    submitBtn.prop("disabled", true)

    setTimeout(() => {
      showNotification("Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.", "success")
      $("#contactForm")[0].reset()
      $(".form-group").removeClass("focused")
      submitBtn.removeClass("loading")
      submitBtn.find(".btn-text").text(originalText)
      submitBtn.prop("disabled", false)
    }, 2000)
  })

  function showNotification(message, type) {
    const notification = $(`
      <div class="notification ${type}">
        <div class="notification-content">
          <span class="notification-icon">${type === "success" ? "✓" : "⚠"}</span>
          <span class="notification-message">${message}</span>
        </div>
      </div>
    `)

    $("body").append(notification)

    setTimeout(() => {
      notification.addClass("show")
    }, 100)

    setTimeout(() => {
      notification.removeClass("show")
      setTimeout(() => {
        notification.remove()
      }, 300)
    }, 4000)
  }

  $("<style>")
    .prop("type", "text/css")
    .html(`
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 10px;
        padding: 15px 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        transform: translateX(400px);
        transition: all 0.3s ease;
        z-index: 10000;
        max-width: 350px;
      }

      .notification.show {
        transform: translateX(0);
      }

      .notification.success {
        border-left: 4px solid #d4af37;
      }

      .notification.error {
        border-left: 4px solid #e74c3c;
      }

      .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .notification-icon {
        font-weight: bold;
        font-size: 1.2rem;
      }

      .notification.success .notification-icon {
        color: #d4af37;
      }

      .notification.error .notification-icon {
        color: #e74c3c;
      }

      .header.scrolled {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 249, 250, 0.98));
        backdrop-filter: blur(20px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      }

      .service-card:hover .service-content {
        transform: translateY(-5px);
      }

      .gallery-item:hover {
        z-index: 10;
      }

      .contact-card:hover .contact-icon {
        transform: scale(1.1) rotate(5deg);
        background: linear-gradient(135deg, #f4d03f, #d4af37);
      }

      .tech-item:hover .tech-icon {
        transform: scale(1.2);
        filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.5));
      }

      @media (max-width: 768px) {
        .notification {
          right: 10px;
          left: 10px;
          max-width: none;
          transform: translateY(-100px);
        }

        .notification.show {
          transform: translateY(0);
        }
      }
    `)
    .appendTo("head")

  $(".service-btn, .btn-services").click(function (e) {
    if ($(this).text().includes("Buchen") || $(this).text().includes("TERMIN")) {
      e.preventDefault()
      showNotification(
        "Für Terminbuchungen rufen Sie uns bitte unter 0123 456 789 an oder nutzen Sie unser Kontaktformular.",
        "success",
      )
    }
  })

  // Initial animation check
  animateOnScroll()

  function createEnhancedSparkles() {
    const sparkleContainers = $(".hero, .about-section, .services-section")

    setInterval(() => {
      sparkleContainers.each(function () {
        if (Math.random() > 0.7) {
          // Reduced frequency for better performance
          const sparkle = $('<div class="enhanced-sparkle"></div>')
          sparkle.css({
            position: "absolute",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            width: Math.random() * 8 + 4 + "px",
            height: Math.random() * 8 + 4 + "px",
            background: `linear-gradient(45deg, 
              rgba(212, 175, 55, ${Math.random() * 0.8 + 0.3}), 
              rgba(244, 208, 63, ${Math.random() * 0.6 + 0.4}))`,
            borderRadius: "50%",
            animation: "enhancedTwinkle 4s ease-in-out infinite",
            zIndex: 5,
            pointerEvents: "none",
            boxShadow: `0 0 ${Math.random() * 20 + 10}px rgba(212, 175, 55, 0.6)`,
          })

          $(this).append(sparkle)

          setTimeout(() => {
            sparkle.remove()
          }, 4000)
        }
      })
    }, 800)
  }

  // Enhanced sparkle animation
  $("<style>")
    .prop("type", "text/css")
    .html(`
      @keyframes enhancedTwinkle {
        0%, 100% { 
          opacity: 0; 
          transform: scale(0) rotate(0deg); 
        }
        25% { 
          opacity: 0.8; 
          transform: scale(0.5) rotate(90deg); 
        }
        50% { 
          opacity: 1; 
          transform: scale(1) rotate(180deg); 
        }
        75% { 
          opacity: 0.6; 
          transform: scale(0.8) rotate(270deg); 
        }
      }
    `)
    .appendTo("head")

  createEnhancedSparkles()
})

$(document).ready(() => {
  // Enhanced hover effects with jQuery
  $(".nail-service-card").hover(
    function () {
      $(this).addClass("nail-card-hovered")
    },
    function () {
      $(this).removeClass("nail-card-hovered")
    },
  )

  // Click handler for booking buttons
  $(".nail-service-btn").click(function (e) {
    e.stopPropagation()
    const serviceName = $(this).closest(".nail-service-content").find("h3").text()

    // Add click animation
    $(this).addClass("nail-btn-clicked")
    setTimeout(() => {
      $(this).removeClass("nail-btn-clicked")
    }, 200)

    // Simulate booking action
    alert(`Buchung für "${serviceName}" wird geöffnet...`)

    // Here you would typically redirect to booking page or open modal
    // window.location.href = `/booking?service=${encodeURIComponent(serviceName)}`;
  })

  // Touch support for mobile devices
  $(".nail-service-card").on("touchstart", function () {
    $(this).addClass("nail-touch-active")
  })

  $(".nail-service-card").on("touchend", function () {
    $(this).removeClass("nail-touch-active")
  })

  // Intersection Observer for scroll animations
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running"
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

    $(".nail-service-card").each(function () {
      observer.observe(this)
    })
  }

  // Add smooth scrolling for better UX
  $("html").css("scroll-behavior", "smooth")

  // Performance optimization: Preload images on hover
  $(".nail-service-card").one("mouseenter", function () {
    const img = $(this).find("img")[0]
    if (img && !img.complete) {
      img.loading = "eager"
    }
  })
})

// Additional CSS classes for enhanced interactions
const additionalStyles = `
    .nail-card-hovered {
        transform: translateY(-5px);
        transition: transform 0.3s ease;
    }
    
    .nail-btn-clicked {
        transform: scale(0.95);
        transition: transform 0.1s ease;
    }
    
    .nail-touch-active .nail-card-inner {
        transform: rotateY(180deg);
    }
    
    @media (hover: none) and (pointer: coarse) {
        .nail-service-card:hover .nail-card-inner {
            transform: none;
        }
        
        .nail-touch-active .nail-card-inner {
            transform: rotateY(180deg);
        }
    }
`

// Inject additional styles
const styleSheet = document.createElement("style")
styleSheet.textContent = additionalStyles
document.head.appendChild(styleSheet)

