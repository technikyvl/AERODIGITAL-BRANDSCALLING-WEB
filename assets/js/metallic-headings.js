/**
 * Metallic Headings with Reveal from Shadow Animation
 * Lightweight and performant implementation
 */

class MetallicHeadings {
  constructor() {
    this.headings = [];
    this.observer = null;
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.findHeadings();
    this.setupIntersectionObserver();
    this.addMetallicClasses();
    this.observeHeadings();
  }

  findHeadings() {
    // Find all headings that should have metallic effect
    const headingSelectors = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      '.cs_section_title',
      '.cs_hero_number',
      '.cs_fs_50',
      '.cs_fs_70'
    ];

    this.headings = [];
    headingSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        // Skip if already processed or is a child of another heading
        if (!element.classList.contains('metallic-processed') && 
            !element.closest('.metallic-heading')) {
          this.headings.push(element);
        }
      });
    });
  }

  addMetallicClasses() {
    this.headings.forEach((heading, index) => {
      // Add base metallic class
      heading.classList.add('metallic-heading');
      
      // Add size-specific class
      const fontSize = this.getComputedFontSize(heading);
      if (fontSize >= 48) {
        heading.classList.add('large');
      }
      
      // Add reveal animation class
      heading.classList.add('reveal-from-shadow');
      
      // Add staggered delay based on position
      heading.style.setProperty('--animation-delay', `${index * 0.1}s`);
      
      // Mark as processed
      heading.classList.add('metallic-processed');
    });
  }

  getComputedFontSize(element) {
    const computedStyle = window.getComputedStyle(element);
    return parseFloat(computedStyle.fontSize);
  }

  setupIntersectionObserver() {
    // Use Intersection Observer for better performance
    const options = {
      root: null,
      rootMargin: '0px 0px -10% 0px', // Trigger when 10% of element is visible
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.revealHeading(entry.target);
        }
      });
    }, options);
  }

  observeHeadings() {
    this.headings.forEach(heading => {
      this.observer.observe(heading);
    });
  }

  revealHeading(heading) {
    // Add revealed class with delay
    const delay = heading.style.getPropertyValue('--animation-delay') || '0s';
    
    setTimeout(() => {
      heading.classList.add('revealed');
      
      // Add animated shine effect after reveal
      setTimeout(() => {
        heading.classList.add('animated-shine');
      }, 500);
    }, parseFloat(delay) * 1000);

    // Stop observing this heading
    this.observer.unobserve(heading);
  }

  // Method to manually trigger reveal (useful for page load)
  revealAllHeadings() {
    this.headings.forEach((heading, index) => {
      setTimeout(() => {
        heading.classList.add('revealed');
        setTimeout(() => {
          heading.classList.add('animated-shine');
        }, 500);
      }, index * 100);
    });
  }

  // Method to add metallic effect to new headings dynamically
  addHeading(element) {
    if (!element.classList.contains('metallic-processed')) {
      element.classList.add('metallic-heading', 'reveal-from-shadow', 'metallic-processed');
      
      const fontSize = this.getComputedFontSize(element);
      if (fontSize >= 48) {
        element.classList.add('large');
      }
      
      this.observer.observe(element);
    }
  }

  // Cleanup method
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.headings = [];
  }
}

// Initialize when DOM is ready
let metallicHeadingsInstance = null;

function initMetallicHeadings() {
  if (!metallicHeadingsInstance) {
    metallicHeadingsInstance = new MetallicHeadings();
  }
  return metallicHeadingsInstance;
}

// Auto-initialize
initMetallicHeadings();

// Expose for manual control
window.MetallicHeadings = {
  init: initMetallicHeadings,
  revealAll: () => metallicHeadingsInstance?.revealAllHeadings(),
  addHeading: (element) => metallicHeadingsInstance?.addHeading(element),
  destroy: () => {
    metallicHeadingsInstance?.destroy();
    metallicHeadingsInstance = null;
  }
};

// Performance optimization: Use requestIdleCallback if available
if (window.requestIdleCallback) {
  requestIdleCallback(() => {
    initMetallicHeadings();
  });
} else {
  // Fallback for browsers without requestIdleCallback
  setTimeout(initMetallicHeadings, 100);
}
