// Global Headings Reveal Animation
class HeadingsReveal {
  constructor() {
    this.observer = null;
    this.init();
  }
  
  init() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers - show all headings immediately
      this.showAllHeadings();
      return;
    }
    
    this.setupIntersectionObserver();
  }
  
  setupIntersectionObserver() {
    // Select all headings that should be animated (exclude h1 as it has its own animations)
    const headings = document.querySelectorAll(`
      h2, h3, h4, h5, h6,
      .hero-title, .section-title, .card-title,
      .cs_section_title, .cs_fs_50, .cs_fs_40, .cs_fs_30, .cs_fs_25, .cs_fs_21, .cs_fs_18,
      .title, .hcard__body .title
    `);
    
    if (headings.length === 0) return;
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class to trigger animation
          entry.target.classList.add('visible');
          // Stop observing this element (animate only once)
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.25, // Trigger when 25% of element is visible
      rootMargin: '0px 0px -20px 0px' // Trigger slightly before element enters viewport
    });
    
    // Observe all headings
    headings.forEach(heading => {
      this.observer.observe(heading);
    });
  }
  
  showAllHeadings() {
    // Fallback: show all headings immediately for older browsers
    const headings = document.querySelectorAll(`
      h2, h3, h4, h5, h6,
      .hero-title, .section-title, .card-title,
      .cs_section_title, .cs_fs_50, .cs_fs_40, .cs_fs_30, .cs_fs_25, .cs_fs_21, .cs_fs_18,
      .title, .hcard__body .title
    `);
    
    headings.forEach(heading => {
      heading.classList.add('visible');
    });
  }
  
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new HeadingsReveal();
});
