/**
 * Optimized Meteors Effect - High Performance Version
 * Generates smooth, continuous meteors across full width
 */

class OptimizedMeteorsEffect {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      maxMeteors: 20,
      spawnRate: 800, // milliseconds between spawns
      minDuration: 2,
      maxDuration: 4,
      minSize: 1,
      maxSize: 3,
      ...options
    };
    this.meteors = [];
    this.animationId = null;
    this.lastSpawnTime = 0;
    this.isRunning = false;
    this.init();
  }

  init() {
    this.setupContainer();
    this.startAnimation();
  }

  setupContainer() {
    // Ensure container covers full hero section width
    this.container.style.position = 'absolute';
    this.container.style.top = '0';
    this.container.style.left = '0';
    this.container.style.width = '100%';
    this.container.style.height = '100%';
    this.container.style.overflow = 'hidden';
    this.container.style.pointerEvents = 'none';
    this.container.style.zIndex = '-1';
  }

  createMeteor() {
    const meteor = document.createElement('div');
    meteor.className = 'meteor';
    
    // Random properties
    const size = Math.random() * (this.options.maxSize - this.options.minSize) + this.options.minSize;
    const duration = Math.random() * (this.options.maxDuration - this.options.minDuration) + this.options.minDuration;
    const containerHeight = this.container.offsetHeight;
    const startY = Math.random() * containerHeight;
    const endY = startY + (Math.random() * 100 - 50); // slight variation in end position
    
    // Apply styles for smooth animation
    meteor.style.position = 'absolute';
    meteor.style.width = size + 'px';
    meteor.style.height = size + 'px';
    meteor.style.background = '#ffffff';
    meteor.style.borderRadius = '50%';
    meteor.style.boxShadow = `0 0 ${size * 3}px rgba(255, 255, 255, 0.6)`;
    meteor.style.left = '100%';
    meteor.style.top = startY + 'px';
    meteor.style.transform = 'rotate(215deg)';
    meteor.style.willChange = 'transform, opacity';
    meteor.style.backfaceVisibility = 'hidden';
    meteor.style.opacity = '1';
    
    // Create tail
    const tail = document.createElement('div');
    tail.style.position = 'absolute';
    tail.style.top = '50%';
    tail.style.left = '0';
    tail.style.width = '80px';
    tail.style.height = '1px';
    tail.style.background = 'linear-gradient(to right, #ffffff, transparent)';
    tail.style.transform = 'translateY(-50%)';
    meteor.appendChild(tail);
    
    this.container.appendChild(meteor);
    this.meteors.push(meteor);
    
    // Animate meteor using requestAnimationFrame for smoothness
    this.animateMeteor(meteor, duration, endY);
    
    return meteor;
  }

  animateMeteor(meteor, duration, endY) {
    const startTime = performance.now();
    const containerWidth = this.container.offsetWidth;
    const startX = containerWidth + 50; // Start slightly off screen
    const endX = -150; // Move completely off screen
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      // Linear movement for consistent speed
      const currentX = startX + (endX - startX) * progress;
      const currentY = startY + (endY - startY) * progress;
      
      meteor.style.left = currentX + 'px';
      meteor.style.top = currentY + 'px';
      
      // Fade in at start
      if (progress < 0.1) {
        meteor.style.opacity = (progress / 0.1).toString();
      }
      // Fade out near the end
      else if (progress > 0.85) {
        meteor.style.opacity = (1 - (progress - 0.85) / 0.15).toString();
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Remove meteor when animation completes
        this.removeMeteor(meteor);
      }
    };
    
    requestAnimationFrame(animate);
  }

  removeMeteor(meteor) {
    if (meteor.parentNode) {
      meteor.parentNode.removeChild(meteor);
      const index = this.meteors.indexOf(meteor);
      if (index > -1) {
        this.meteors.splice(index, 1);
      }
    }
  }

  startAnimation() {
    this.isRunning = true;
    this.animationLoop();
  }

  animationLoop() {
    if (!this.isRunning) return;
    
    const currentTime = performance.now();
    
    // Spawn new meteors based on spawn rate
    if (currentTime - this.lastSpawnTime > this.options.spawnRate) {
      if (this.meteors.length < this.options.maxMeteors) {
        this.createMeteor();
        this.lastSpawnTime = currentTime;
      }
    }
    
    // Continue animation loop
    this.animationId = requestAnimationFrame(() => this.animationLoop());
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  destroy() {
    this.stop();
    this.container.innerHTML = '';
    this.meteors = [];
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize meteors
  const meteorContainers = document.querySelectorAll('.meteors-container');
  
  meteorContainers.forEach(container => {
    new OptimizedMeteorsEffect(container, {
      maxMeteors: 15,
      spawnRate: 800, // Balanced spawning rate
      minDuration: 3,
      maxDuration: 5,
      minSize: 1,
      maxSize: 2
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
window.OptimizedMeteorsEffect = OptimizedMeteorsEffect;
