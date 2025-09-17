/**
 * Clean Elegant Headings with Reveal from Shadow Animation
 * Lightweight and performant implementation
 */

class CleanHeadings {
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
    this.addCleanClasses();
    this.observeHeadings();
  }

  findHeadings() {
    // Find all headings that should have clean effect
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
        if (!element.classList.contains('clean-processed') && 
            !element.closest('.clean-heading')) {
          this.headings.push(element);
        }
      });
    });
  }

  addCleanClasses() {
    this.headings.forEach((heading, index) => {
      // Add base clean class
      heading.classList.add('clean-heading');
      
      // Add size-specific class
      const fontSize = this.getComputedFontSize(heading);
      if (fontSize >= 48) {
        heading.classList.add('large');
      }
      
      // Add dark background class for better contrast
      heading.classList.add('dark-bg');
      
      // Add reveal animation class
      heading.classList.add('reveal-from-shadow');
      
      // Add staggered delay based on position
      heading.style.setProperty('--animation-delay', `${index * 0.1}s`);
      
      // Mark as processed
      heading.classList.add('clean-processed');
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

  // Method to add clean effect to new headings dynamically
  addHeading(element) {
    if (!element.classList.contains('clean-processed')) {
      element.classList.add('clean-heading', 'dark-bg', 'reveal-from-shadow', 'clean-processed');
      
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
let cleanHeadingsInstance = null;

function initCleanHeadings() {
  if (!cleanHeadingsInstance) {
    cleanHeadingsInstance = new CleanHeadings();
  }
  return cleanHeadingsInstance;
}

// Auto-initialize
initCleanHeadings();

// Expose for manual control
window.CleanHeadings = {
  init: initCleanHeadings,
  revealAll: () => cleanHeadingsInstance?.revealAllHeadings(),
  addHeading: (element) => cleanHeadingsInstance?.addHeading(element),
  destroy: () => {
    cleanHeadingsInstance?.destroy();
    cleanHeadingsInstance = null;
  }
};

// Performance optimization: Use requestIdleCallback if available
if (window.requestIdleCallback) {
  requestIdleCallback(() => {
    initCleanHeadings();
  });
} else {
  // Fallback for browsers without requestIdleCallback
  setTimeout(initCleanHeadings, 100);
}
