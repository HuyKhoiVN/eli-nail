
$(document).ready(() => {
  function initializeEntranceAnimations() {
    // Add animation classes to elements on page load
    setTimeout(() => {
      // Hero section animations with text running effect
      $(".hero-title").addClass("animate-text-running animate-delay-1")
      $(".hero-subtitle").addClass("animate-fade-up animate-delay-2")
      $(".stat-item").each(function (index) {
        $(this).addClass("animate-fade-scale animate-delay-" + (index + 3))
      })
      $(".hero-buttons .btn").each(function (index) {
        $(this).addClass("animate-slide-left animate-delay-" + (index + 6))
      })
    }, 100)

    // Section headers with stagger
    $(".section-title").addClass("animate-fade-up animate-delay-1")
    $(".section-subtitle").addClass("animate-fade-up animate-delay-2")
  }

  function animateOnScroll() {
    const windowTop = $(window).scrollTop()
    const windowBottom = windowTop + $(window).height()

    // Service cards with stagger animation
    $(".service-card").each(function (index) {
      const elementTop = $(this).offset().top
      const elementBottom = elementTop + $(this).outerHeight()

      if (elementBottom > windowTop && elementTop < windowBottom - 100) {
        setTimeout(() => {
          $(this).addClass("animate-fade-scale")
        }, index * 100) // Stagger delay
      }
    })

    // Feature cards animation
    $(".feature-card").each(function (index) {
      const elementTop = $(this).offset().top
      const elementBottom = elementTop + $(this).outerHeight()

      if (elementBottom > windowTop && elementTop < windowBottom - 100) {
        setTimeout(() => {
          $(this).addClass("animate-slide-right")
        }, index * 100)
      }
    })

    // Gallery items animation
    $(".gallery-item").each(function (index) {
      const elementTop = $(this).offset().top
      const elementBottom = elementTop + $(this).outerHeight()

      if (elementBottom > windowTop && elementTop < windowBottom - 100) {
        setTimeout(() => {
          $(this).addClass("animate-fade-scale")
        }, index * 100)
      }
    })

    // Testimonial cards animation
    $(".testimonial-card").each(function (index) {
      const elementTop = $(this).offset().top
      const elementBottom = elementTop + $(this).outerHeight()

      if (elementBottom > windowTop && elementTop < windowBottom - 100) {
        setTimeout(() => {
          $(this).addClass("animate-slide-left")
        }, index * 150)
      }
    })

    // Brand items animation
    $(".brand-item").each(function (index) {
      const elementTop = $(this).offset().top
      const elementBottom = elementTop + $(this).outerHeight()

      if (elementBottom > windowTop && elementTop < windowBottom - 100) {
        setTimeout(() => {
          $(this).addClass("animate-fade-up")
        }, index * 80)
      }
    })
  }

  // Initialize entrance animations
  initializeEntranceAnimations()

  // Mobile Menu Toggle
  $(".mobile-menu-toggle").click(function () {
    $(this).toggleClass("active")
    $(".nav-menu").toggleClass("active")
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

    // Update active navigation based on scroll position
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

  $(".gallery-item").hover(
    function () {
      $(this).find("img").css({
        transform: "scale(1.15)",
        filter: "brightness(1.1)",
      })
    },
    function () {
      $(this).find("img").css({
        transform: "scale(1)",
        filter: "brightness(1)",
      })
    },
  )

  $(".service-card").hover(
    function () {
      $(this).css("transform", "translateY(-12px)")
      $(this).find(".service-icon").css("animation", "iconPulse 0.6s ease-out")
    },
    function () {
      $(this).css("transform", "translateY(0)")
    },
  )

  // Contact Form Submission
  $("#contactForm").submit(function (e) {
    e.preventDefault()

    // Get form data
    var name = $("#name").val()
    var email = $("#email").val()
    var phone = $("#phone").val()
    var message = $("#message").val()

    // Basic validation
    if (!name || !email || !message) {
      alert("Bitte füllen Sie alle Pflichtfelder aus.")
      return
    }

    // Email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.")
      return
    }

    // Simulate form submission
    var submitBtn = $(this).find('button[type="submit"]')
    var originalText = submitBtn.text()

    submitBtn.text("Wird gesendet...").prop("disabled", true)

    setTimeout(() => {
      alert("Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.")
      $("#contactForm")[0].reset()
      submitBtn.text(originalText).prop("disabled", false)
    }, 2000)
  })

  // Initial animation check
  animateOnScroll()

  function createSparkles() {
    var sparkleContainer = $(".hero, .testimonials")

    setInterval(() => {
      sparkleContainer.each(function () {
        var sparkle = $('<div class="sparkle"></div>')
        sparkle.css({
          position: "absolute",
          left: Math.random() * 100 + "%",
          top: Math.random() * 100 + "%",
          width: Math.random() * 6 + 3 + "px",
          height: Math.random() * 6 + 3 + "px",
          background: "rgba(212, 175, 55, " + (Math.random() * 0.8 + 0.3) + ")",
          borderRadius: "50%",
          animation: "twinkle 3s ease-in-out infinite",
          zIndex: 10,
          pointerEvents: "none",
        })

        $(this).append(sparkle)

        setTimeout(() => {
          sparkle.remove()
        }, 3000)
      })
    }, 400)
  }

  $("<style>")
    .prop("type", "text/css")
    .html(`
            .header.scrolled {
                background: linear-gradient(135deg, rgba(44, 85, 48, 0.95), rgba(30, 58, 33, 0.98));
                backdrop-filter: blur(15px);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            }
            
            @keyframes twinkle {
                0%, 100% { 
                    opacity: 0; 
                    transform: scale(0) rotate(0deg); 
                }
                50% { 
                    opacity: 1; 
                    transform: scale(1) rotate(180deg); 
                }
            }
            
            .sparkle {
                box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
            }
            
            .service-icon:hover {
                animation: iconPulse 0.6s ease-out !important;
            }
            
            .gallery-item {
                transition: all 0.4s ease;
            }
            
            .gallery-item:hover {
                box-shadow: 0 15px 50px rgba(0, 0, 0, 0.25);
            }
            
            .feature-card:hover .feature-icon {
                animation: iconPulse 0.6s ease-out;
            }
            
            .brand-item:hover {
                background: linear-gradient(135deg, #fff, #f0f0f0);
                box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
            }
        `)
    .appendTo("head")

  createSparkles()

  // Booking Button Click Handler
  $(".booking-btn, .btn-primary").click(function (e) {
    if ($(this).attr("href") === "#booking" || $(this).text().includes("Termin")) {
      e.preventDefault()
      alert(
        "Für Terminbuchungen rufen Sie uns bitte unter 0123 456 789 an oder senden Sie uns eine Nachricht über das Kontaktformular.",
      )
    }
  })

  $(".form-group input, .form-group textarea")
    .focus(function () {
      $(this).parent().addClass("focused")
      $(this).addClass("animate-fade-scale")
    })
    .blur(function () {
      if ($(this).val() === "") {
        $(this).parent().removeClass("focused")
      }
    })

  $("<style>")
    .prop("type", "text/css")
    .html(`
            .form-group.focused input,
            .form-group.focused textarea {
                border: 2px solid transparent;
                background: linear-gradient(white, white) padding-box,
                           linear-gradient(135deg, #d4af37, #f4d03f) border-box;
                box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15);
                transform: scale(1.02);
            }
            
            .form-group input,
            .form-group textarea {
                transition: all 0.3s ease;
            }
        `)
    .appendTo("head")

  $(window).scroll(function () {
    const scrolled = $(this).scrollTop()
    const parallaxElements = $(".hero-bg-image, .section-bg-image")

    parallaxElements.each(function () {
      const speed = 0.5
      const yPos = -(scrolled * speed)
      $(this).css("transform", `translateY(${yPos}px)`)
    })
  })
})
