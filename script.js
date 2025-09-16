// Initialize page
document.addEventListener("DOMContentLoaded", () => {

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

  // Initialize animated chart
  initializeChart()
})

// Chart initialization and animation
function initializeChart() {
  const ctx = document.getElementById('heroChart')
  if (!ctx) return

  // Chart data
  const data = [
    { month: "Jan", value: 50 },
    { month: "Feb", value: 90 },
    { month: "Mar", value: 140 },
    { month: "Apr", value: 200 },
    { month: "May", value: 240 },
    { month: "Jun", value: 300 },
  ]

  // Create gradient
  const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400)
  gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)')
  gradient.addColorStop(1, 'rgba(59, 130, 246, 0)')

  // Chart configuration
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => d.month),
      datasets: [{
        label: 'Revenue',
        data: data.map(d => d.value),
        borderColor: '#3b82f6',
        backgroundColor: gradient,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      },
      scales: {
        x: {
          display: false
        },
        y: {
          display: false
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart'
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  })

  // Animate counter numbers
  animateCounters()
}

// Animate counter numbers
function animateCounters() {
  // Main hero number
  const heroNumber = document.getElementById('countUpNumber')
  if (heroNumber) {
    const countUp = new CountUp(heroNumber, 125, {
      duration: 2.5,
      useEasing: true,
      useGrouping: true,
      separator: ',',
      decimal: '.',
    })
    countUp.start()
  }

  // Side stats
  const statValues = document.querySelectorAll('.stat-value')
  statValues.forEach((stat, index) => {
    const targetValue = parseFloat(stat.getAttribute('data-count'))
    const countUp = new CountUp(stat, targetValue, {
      duration: 2.5 + (index * 0.2),
      useEasing: true,
      useGrouping: true,
      separator: ',',
      decimal: '.',
    })
    
    // Start animation with delay
    setTimeout(() => {
      countUp.start()
    }, 500 + (index * 200))
  })
}
