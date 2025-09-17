/**
 * Meteors Effect - HTML/CSS Version
 * Generates animated meteors falling across the screen
 */

class MeteorsEffect {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      number: 15,
      minDelay: 0,
      maxDelay: 0.5,
      minDuration: 3,
      maxDuration: 6,
      ...options
    };
    this.meteors = [];
    this.animationId = null;
    this.init();
  }

  init() {
    this.createInitialMeteors();
    this.startContinuousFlow();
  }

  createInitialMeteors() {
    for (let i = 0; i < this.options.number; i++) {
      this.createMeteor();
    }
  }

  createMeteor() {
    const meteor = document.createElement('div');
    meteor.className = 'meteor';
    
    // Random vertical position
    const randomY = Math.floor(Math.random() * 400) - 200; // -200 to 200
    
    // Random animation properties
    const delay = Math.random() * (this.options.maxDelay - this.options.minDelay) + this.options.minDelay;
    const duration = Math.random() * (this.options.maxDuration - this.options.minDuration) + this.options.minDuration;
    
    // Apply styles
    meteor.style.left = '50%';
    meteor.style.top = randomY + 'px';
    meteor.style.animationDelay = delay + 's';
    meteor.style.animationDuration = duration + 's';
    
    this.container.appendChild(meteor);
    this.meteors.push(meteor);
    
    // Remove meteor after animation completes
    setTimeout(() => {
      if (meteor.parentNode) {
        meteor.parentNode.removeChild(meteor);
        const index = this.meteors.indexOf(meteor);
        if (index > -1) {
          this.meteors.splice(index, 1);
        }
      }
    }, (duration + delay) * 1000);
    
    return meteor;
  }

  startContinuousFlow() {
    const createMeteorInterval = () => {
      this.createMeteor();
      // Random interval between 0.5 and 2 seconds
      const nextInterval = Math.random() * 1500 + 500;
      this.animationId = setTimeout(createMeteorInterval, nextInterval);
    };
    
    createMeteorInterval();
  }

  destroy() {
    this.container.innerHTML = '';
    this.meteors = [];
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize meteors
  const meteorContainers = document.querySelectorAll('.meteors-container');
  
  meteorContainers.forEach(container => {
    new MeteorsEffect(container, {
      number: 15,
      minDelay: 0,
      maxDelay: 0.5,
      minDuration: 3,
      maxDuration: 6
    });
  });
  
  // Initialize heading reveal animations
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, .cs_section_title, .cs_hero_number, .cs_fs_50, .cs_fs_70');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'reveal 700ms ease-out forwards';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  headings.forEach(heading => {
    observer.observe(heading);
  });
});

// Expose for manual control
window.MeteorsEffect = MeteorsEffect;
