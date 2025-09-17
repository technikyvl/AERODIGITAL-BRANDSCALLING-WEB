/**
 * New Header Component - React/Next.js Style
 * Handles mobile menu toggle and scroll effects
 */

class NewHeader {
  constructor() {
    this.header = document.querySelector('.new-header');
    this.nav = document.querySelector('.new-nav');
    this.mobileToggle = document.querySelector('.new-mobile-toggle');
    this.mobileMenu = document.querySelector('.new-mobile-menu');
    this.isOpen = false;
    
    this.init();
  }

  init() {
    this.setupScrollEffect();
    this.setupMobileToggle();
    this.setupMobileMenuClose();
  }

  setupScrollEffect() {
    let ticking = false;
    
    const updateHeader = () => {
      const scrolled = window.scrollY > 50;
      
      if (scrolled) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    // Initial check
    updateHeader();
  }

  setupMobileToggle() {
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', () => {
        this.toggleMobileMenu();
      });
    }
  }

  setupMobileMenuClose() {
    // Close menu when clicking on links
    const mobileLinks = document.querySelectorAll('.new-mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.header.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      this.openMobileMenu();
    } else {
      this.closeMobileMenu();
    }
  }

  openMobileMenu() {
    this.nav.setAttribute('data-state', 'active');
    this.mobileToggle.setAttribute('aria-expanded', 'true');
    this.mobileToggle.setAttribute('aria-label', 'Close Menu');
    
    // Animate hamburger to X
    const lines = this.mobileToggle.querySelectorAll('.new-mobile-toggle-line');
    if (lines.length >= 3) {
      lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      lines[1].style.opacity = '0';
      lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu() {
    this.isOpen = false;
    this.nav.setAttribute('data-state', 'closed');
    this.mobileToggle.setAttribute('aria-expanded', 'false');
    this.mobileToggle.setAttribute('aria-label', 'Open Menu');
    
    // Reset hamburger animation
    const lines = this.mobileToggle.querySelectorAll('.new-mobile-toggle-line');
    if (lines.length >= 3) {
      lines[0].style.transform = 'none';
      lines[1].style.opacity = '1';
      lines[2].style.transform = 'none';
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  new NewHeader();
});

// Expose for manual control
window.NewHeader = NewHeader;
