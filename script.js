// Intersection Observer for scroll animations
document.addEventListener("DOMContentLoaded", () => {
  // Create intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
          
          // Add text shadow animations to text elements
          if (entry.target.classList.contains('hero-title') || 
              entry.target.classList.contains('section-title')) {
            entry.target.classList.add('animate-text-glow')
          }
          
          // Add card shadow animations to cards
          if (entry.target.classList.contains('service-card')) {
            entry.target.classList.add('animate-card-glow-blue')
          } else if (entry.target.classList.contains('value-card-featured')) {
            entry.target.classList.add('animate-card-glow-orange')
          } else if (entry.target.classList.contains('value-card')) {
            entry.target.classList.add('animate-card-glow')
          }
          
          // Add text shadow animations to card titles
          const cardTitle = entry.target.querySelector('h3')
          if (cardTitle) {
            if (entry.target.classList.contains('service-card')) {
              cardTitle.classList.add('animate-text-glow-blue')
            } else if (entry.target.classList.contains('value-card-featured')) {
              cardTitle.classList.add('animate-text-glow-orange')
            } else if (entry.target.classList.contains('value-card')) {
              cardTitle.classList.add('animate-text-glow')
            }
          }
          
          // Unobserve the element after animation
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  // Observe all elements with animate-on-scroll class
  const elementsToAnimate = document.querySelectorAll(".animate-on-scroll")
  elementsToAnimate.forEach((el) => {
    observer.observe(el)
  })

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]')
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Add scroll effect to navbar
  let lastScrollTop = 0
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.8)"
    }

    lastScrollTop = scrollTop
  })

  // Button hover effects
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
      this.style.boxShadow = "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
      this.style.boxShadow = ""
    })
  })

  // Enhanced text shadow animations on hover
  const textElements = document.querySelectorAll('h1, h2, h3, p')
  textElements.forEach((element) => {
    element.addEventListener('mouseenter', function() {
      this.style.transition = 'text-shadow 0.3s ease-in-out'
      this.style.textShadow = '0 0 15px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.2)'
    })

    element.addEventListener('mouseleave', function() {
      this.style.textShadow = ''
    })
  })

  // Card hover effects with enhanced shadows
  const cards = document.querySelectorAll('.service-card, .value-card, .dashboard-card')
  cards.forEach((card) => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease-in-out'
      this.style.transform = 'translateY(-8px)'
      
      if (this.classList.contains('service-card')) {
        this.style.boxShadow = '0 25px 50px -12px rgba(46, 108, 255, 0.25), 0 0 0 1px rgba(46, 108, 255, 0.1)'
      } else if (this.classList.contains('value-card-featured')) {
        this.style.boxShadow = '0 25px 50px -12px rgba(255, 87, 34, 0.25), 0 0 0 1px rgba(255, 87, 34, 0.1)'
      } else {
        this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.1)'
      }
    })

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)'
      this.style.boxShadow = ''
    })
  })

  // Add random delay to text shadow animations for more organic feel
  const animatedTexts = document.querySelectorAll('.animate-text-glow, .animate-text-glow-blue, .animate-text-glow-orange')
  animatedTexts.forEach((text, index) => {
    const randomDelay = Math.random() * 2 // 0-2 seconds
    text.style.animationDelay = `${randomDelay}s`
  })

  // Add random delay to card shadow animations
  const animatedCards = document.querySelectorAll('.animate-card-glow, .animate-card-glow-blue, .animate-card-glow-orange')
  animatedCards.forEach((card, index) => {
    const randomDelay = Math.random() * 3 // 0-3 seconds
    card.style.animationDelay = `${randomDelay}s`
  })
})
