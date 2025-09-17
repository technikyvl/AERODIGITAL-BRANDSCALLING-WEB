/**
 * Meteors Effect - HTML/CSS Version
 * Generates animated meteors falling across the screen
 */

class MeteorsEffect {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      number: 24,
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
    
    // Random position
    const randomX = Math.floor(Math.random() * 800) - 400; // -400 to 400
    const randomY = Math.floor(Math.random() * 200) - 100; // -100 to 100
    
    // Random animation properties
    const delay = Math.random() * (this.options.maxDelay - this.options.minDelay) + this.options.minDelay;
    const duration = Math.floor(Math.random() * (this.options.maxDuration - this.options.minDuration) + this.options.minDuration);
    
    // Apply styles
    meteor.style.left = randomX + 'px';
    meteor.style.top = randomY + 'px';
    meteor.style.animationDelay = delay + 's';
    meteor.style.animationDuration = duration + 's';
    
    return meteor;
  }

  startAnimation() {
    // Restart animation periodically to keep meteors flowing
    setInterval(() => {
      this.createMeteors();
    }, 8000); // Restart every 8 seconds
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
      number: 24,
      minDelay: 0.2,
      maxDelay: 0.8,
      minDuration: 2,
      maxDuration: 10
    });
  });
});

// Expose for manual control
window.MeteorsEffect = MeteorsEffect;
