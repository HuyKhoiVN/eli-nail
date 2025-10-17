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

  // Cache DOM elements for better performance
  const $serviceCards = $(".service-card.modern, .nail-service-card")
  const $galleryItems = $(".gallery-item")
  const $contactCards = $(".contact-card")
  const $priceCards = $(".price-card")
  const $sectionHeaders = $(".section-header")

  function animateOnScroll() {
    const windowTop = $(window).scrollTop()
    const windowBottom = windowTop + $(window).height()

    // Service cards with enhanced stagger animation (optimized)
    $serviceCards.each(function (index) {
      if ($(this).hasClass("animate-scale")) return // Skip if already animated
      
      const elementTop = $(this).offset().top
      const elementBottom = elementTop + $(this).outerHeight()

      if (elementBottom > windowTop && elementTop < windowBottom - 100) {
        setTimeout(() => {
          $(this).addClass("animate-scale")
        }, index * 100) // Reduced delay
      }
    })

    // Gallery items with enhanced animation (optimized)
    $galleryItems.each(function (index) {
      if ($(this).hasClass("animate-in")) return // Skip if already animated
      
      const elementTop = $(this).offset().top
      const elementBottom = elementTop + $(this).outerHeight()

      if (elementBottom > windowTop && elementTop < windowBottom - 100) {
        setTimeout(() => {
          $(this).addClass("animate-in")
        }, index * 50) // Reduced delay
      }
    })

    // Contact cards animation (optimized)
    $contactCards.each(function (index) {
      if ($(this).hasClass("animate-slide-right")) return // Skip if already animated
      
      const elementTop = $(this).offset().top
      const elementBottom = elementTop + $(this).outerHeight()

      if (elementBottom > windowTop && elementTop < windowBottom - 100) {
        setTimeout(() => {
          $(this).addClass("animate-slide-right")
        }, index * 100) // Reduced delay
      }
    })

    // Price cards animation (optimized)
    $priceCards.each(function (index) {
      if ($(this).hasClass("animate-scale")) return // Skip if already animated
      
      const elementTop = $(this).offset().top
      const elementBottom = elementTop + $(this).outerHeight()

      if (elementBottom > windowTop && elementTop < windowBottom - 100) {
        setTimeout(() => {
          $(this).addClass("animate-scale")
        }, index * 150) // Reduced delay
      }
    })

    // Section headers animation (optimized)
    $sectionHeaders.each(function () {
      if ($(this).hasClass("animated")) return // Skip if already animated
      
      const elementTop = $(this).offset().top
      const elementBottom = elementTop + $(this).outerHeight()

      if (elementBottom > windowTop && elementTop < windowBottom - 100) {
        $(this).addClass("animated")
        $(this).find(".section-badge").addClass("animate-scale")
        $(this).find(".section-title").addClass("animate-in")
        $(this).find(".section-subtitle").addClass("animate-in")
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

  // Throttled scroll handler for better performance
  let scrollTimeout = null
  $(window).scroll(function () {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
    
    scrollTimeout = setTimeout(() => {
      const scrollTop = $(window).scrollTop()

      // Optimized parallax for floating elements only (reduced frequency)
      $(".floating-element").each(function (index) {
        const speed = 0.05 + index * 0.02 // Reduced speed for better performance
        $(this).css("transform", `translateY(${scrollTop * speed}px)`)
      })

      // Update existing scroll functions
      if (scrollTop > 100) {
        $(".header").addClass("scrolled")
      } else {
        $(".header").removeClass("scrolled")
      }

      updateActiveNav()
      animateOnScroll()
    }, 16) // ~60fps throttling
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
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in")

        // Special handling for different elements
        if (entry.target.classList.contains("gallery-item")) {
          setTimeout(() => {
            entry.target.style.animationPlayState = "running"
          }, Math.random() * 300)
        }

        if (entry.target.classList.contains("price-card")) {
          setTimeout(() => {
            entry.target.style.animationPlayState = "running"
          }, Math.random() * 200)
        }
      }
    })
  }, observerOptions)

  // Observe all animated elements
  const animateElements = document.querySelectorAll(
    ".gallery-item, .price-card, .contact-card, .nail-service-card, .section-header",
  )
  animateElements.forEach((el) => {
    observer.observe(el)
  })

  window.openImageModal = (button) => {
    const galleryItem = $(button).closest(".gallery-item")
    const img = galleryItem.find("img")
    const title = galleryItem.find(".gallery-title").text()
    const category = galleryItem.find(".gallery-category").text()

    $("#modalImage").attr("src", img.attr("src"))
    $("#modalTitle").text(title)
    $("#modalCategory").text(category)
    $("#imageModal").fadeIn(300)

    // Prevent body scroll
    $("body").css("overflow", "hidden")
  }

  window.closeImageModal = () => {
    $("#imageModal").fadeOut(300)
    $("body").css("overflow", "auto")
  }

  // Close modal when clicking outside the image
  $("#imageModal").click(function (e) {
    if (e.target === this) {
      window.closeImageModal()
    }
  })

  // Close modal with Escape key
  $(document).keydown((e) => {
    if (e.keyCode === 27) {
      window.closeImageModal()
    }
  })

  let currentSlideIndex = 0
  const totalSlides = $(".price-card").length

  window.slideCarousel = (direction) => {
    const carousel = $(".prices-carousel")
    const cardWidth = $(".price-card").outerWidth(true)

    currentSlideIndex += direction

    if (currentSlideIndex < 0) {
      currentSlideIndex = totalSlides - 1
    } else if (currentSlideIndex >= totalSlides) {
      currentSlideIndex = 0
    }

    const scrollPosition = currentSlideIndex * cardWidth
    carousel.animate({ scrollLeft: scrollPosition }, 300)

    updateDots()
  }

  window.currentSlide = (slideIndex) => {
    const carousel = $(".prices-carousel")
    const cardWidth = $(".price-card").outerWidth(true)

    currentSlideIndex = slideIndex - 1
    const scrollPosition = currentSlideIndex * cardWidth
    carousel.animate({ scrollLeft: scrollPosition }, 300)

    updateDots()
  }

  function updateDots() {
    $(".dot").removeClass("active")
    $(".dot").eq(currentSlideIndex).addClass("active")
  }

  // Touch/swipe support for carousel
  let startX = 0
  let scrollLeft = 0

  $(".prices-carousel").on("touchstart mousedown", function (e) {
    startX = e.type === "touchstart" ? e.originalEvent.touches[0].pageX : e.pageX
    scrollLeft = $(this).scrollLeft()
  })

  $(".prices-carousel").on("touchmove mousemove", function (e) {
    if (startX === 0) return
    e.preventDefault()

    const x = e.type === "touchmove" ? e.originalEvent.touches[0].pageX : e.pageX
    const walk = (x - startX) * 2
    $(this).scrollLeft(scrollLeft - walk)
  })

  $(".prices-carousel").on("touchend mouseup mouseleave", () => {
    startX = 0
  })

  // Optimized auto-play carousel with visibility check
  let carouselInterval = setInterval(() => {
    const pricesSection = document.querySelector(".prices-section")
    if (pricesSection && pricesSection.offsetParent !== null) {
      window.slideCarousel(1)
    }
  }, 8000) // Increased interval for better performance

  $(".price-card").hover(
    function () {
      $(this).find("img").css({
        transform: "scale(1.1)",
        filter: "brightness(1.1) contrast(1.1)",
      })
    },
    function () {
      $(this).find("img").css({
        transform: "scale(1)",
        filter: "brightness(1) contrast(1)",
      })
    },
  )

  // Click to zoom price cards
  $(".price-card").click(function () {
    const img = $(this).find("img")
    const title = $(this).find("h3").text()

    $("#modalImage").attr("src", img.attr("src"))
    $("#modalTitle").text(title)
    $("#modalCategory").text("Preisliste")
    $("#imageModal").fadeIn(300)

    $("body").css("overflow", "hidden")
  })

  // Initial animation check
  animateOnScroll()
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

  // Add smooth scrolling for better UX
  $("html").css("scroll-behavior", "smooth")

  // Performance optimization: Preload images on hover and lazy load
  $(".nail-service-card").one("mouseenter", function () {
    const img = $(this).find("img")[0]
    if (img && !img.complete) {
      img.loading = "eager"
    }
  })

  // Lazy loading for images not in viewport
  const lazyImages = document.querySelectorAll('img[data-src]')
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute('data-src')
        observer.unobserve(img)
      }
    })
  })

  lazyImages.forEach(img => imageObserver.observe(img))
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
