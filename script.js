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


  // Initialize animated chart after a short delay to ensure Chart.js is loaded
  setTimeout(() => {
    initializeChart()
  }, 1000)
})

// Chart initialization and animation
function initializeChart() {
  console.log('Initializing chart...')
  const ctx = document.getElementById('heroChart')
  if (!ctx) {
    console.log('Chart canvas not found')
    return
  }

  // Check if Chart is available
  if (typeof Chart === 'undefined') {
    console.log('Chart.js not loaded, retrying...')
    setTimeout(() => {
      initializeChart()
    }, 1000)
    return
  }

  console.log('Chart.js loaded, creating chart...')

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
  console.log('Creating chart with data:', data)
  console.log('Canvas context:', ctx.getContext('2d'))
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

  console.log('Chart created successfully')
  console.log('Chart instance:', chart)
  
  // Animate counter numbers
  animateCounters()
  
  // Force chart to resize
  setTimeout(() => {
    if (chart && chart.resize) {
      chart.resize()
    }
  }, 100)
  
  // Return chart for debugging
  window.heroChart = chart
}

// Animate counter numbers
function animateCounters() {
  // Main hero number
  const heroNumber = document.getElementById('countUpNumber')
  if (heroNumber) {
    animateNumber(heroNumber, 0, 125, 2500)
  }

  // Side stats
  const statValues = document.querySelectorAll('.stat-value')
  statValues.forEach((stat, index) => {
    const targetValue = parseFloat(stat.getAttribute('data-count'))
    setTimeout(() => {
      animateNumber(stat, 0, targetValue, 2000)
    }, 500 + (index * 200))
  })
}

// Simple number animation function
function animateNumber(element, start, end, duration) {
  const startTime = performance.now()
  
  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // Easing function
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const currentValue = start + (end - start) * easeOutQuart
    
    element.textContent = Math.floor(currentValue)
    
    if (progress < 1) {
      requestAnimationFrame(updateNumber)
    }
  }
  
  requestAnimationFrame(updateNumber)
}
