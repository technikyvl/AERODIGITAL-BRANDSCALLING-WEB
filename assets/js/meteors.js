/**
 * Meteors Effect - HTML/CSS Version
 * Generates animated meteors falling across the screen
 */

class MeteorsEffect {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      number: 28,
      minDelay: 0.2,
      maxDelay: 0.8,
      minDuration: 2,
      maxDuration: 10,
      ...options
    };
    this.meteors = [];
    this.init();
  }

  init() {
    this.createMeteors();
    this.startAnimation();
  }

  createMeteors() {
    // Clear existing meteors
    this.container.innerHTML = '';
    this.meteors = [];

    for (let i = 0; i < this.options.number; i++) {
      const meteor = this.createMeteor(i);
      this.container.appendChild(meteor);
      this.meteors.push(meteor);
    }
  }

  createMeteor(index) {
    const meteor = document.createElement('div');
    meteor.className = 'meteor';
    
    // Random position - full screen coverage
    const randomX = Math.floor(Math.random() * 1200) - 600; // -600 to 600
    const randomY = Math.floor(Math.random() * 400) - 200; // -200 to 200
    
    // Random animation properties
    const delay = Math.random() * 0.6 + 0.2; // 0.2 to 0.8
    const duration = Math.floor(Math.random() * 8 + 2); // 2 to 10
    
    // Apply styles
    meteor.style.left = randomX + 'px';
    meteor.style.top = randomY + 'px';
    meteor.style.animationDelay = delay + 's';
    meteor.style.animationDuration = duration + 's';
    
    return meteor;
  }

  startAnimation() {
    // Create meteors continuously for seamless flow
    setInterval(() => {
      this.createMeteors();
    }, 2000); // Create new meteors every 2 seconds
    
    // Also create initial batch
    this.createMeteors();
  }

  destroy() {
    this.container.innerHTML = '';
    this.meteors = [];
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const meteorContainers = document.querySelectorAll('.meteors-container');
  
  meteorContainers.forEach(container => {
    new MeteorsEffect(container, {
      number: 28,
      minDelay: 0.2,
      maxDelay: 0.8,
      minDuration: 2,
      maxDuration: 10
    });
  });
});

// Expose for manual control
window.MeteorsEffect = MeteorsEffect;
