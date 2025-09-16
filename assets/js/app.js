/* ========================================
   AERO DIGITAL - APP.JS
   NeoBlue Dark Dashboard Theme
   ======================================== */

(function() {
    'use strict';

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================

    // Debounce function for performance optimization
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // ========================================
    // NAVBAR FUNCTIONALITY
    // ========================================

    class Navbar {
        constructor() {
            this.navbar = document.querySelector('.navbar');
            this.navLinks = document.querySelectorAll('.nav-link');
            this.sections = document.querySelectorAll('section[id]');
            this.init();
        }

        init() {
            this.handleScroll();
            this.handleNavClick();
            this.handleActiveLink();
        }

        handleScroll() {
            const scrollHandler = throttle(() => {
                if (window.scrollY > 100) {
                    this.navbar.classList.add('scrolled');
                } else {
                    this.navbar.classList.remove('scrolled');
                }
            }, 16);

            window.addEventListener('scroll', scrollHandler);
        }

        handleNavClick() {
            this.navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    
                    if (targetId.startsWith('#')) {
                        const targetSection = document.querySelector(targetId);
                        if (targetSection) {
                            const offsetTop = targetSection.offsetTop - 80;
                            window.scrollTo({
                                top: offsetTop,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });
        }

        handleActiveLink() {
            const scrollHandler = throttle(() => {
                let current = '';
                
                this.sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    const sectionHeight = section.offsetHeight;
                    
                    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                        current = section.getAttribute('id');
                    }
                });

                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            }, 100);

            window.addEventListener('scroll', scrollHandler);
        }
    }

    // ========================================
    // ANIMATION SYSTEM
    // ========================================

    class AnimationController {
        constructor() {
            this.animatedElements = document.querySelectorAll('.fade-in, .slide-up, .scale-in');
            this.init();
        }

        init() {
            this.observeElements();
            this.handleScroll();
        }

        observeElements() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            this.animatedElements.forEach(element => {
                observer.observe(element);
            });
        }

        handleScroll() {
            const scrollHandler = throttle(() => {
                this.animatedElements.forEach(element => {
                    if (isInViewport(element) && !element.classList.contains('visible')) {
                        element.classList.add('visible');
                    }
                });
            }, 100);

            window.addEventListener('scroll', scrollHandler);
        }
    }

    // ========================================
    // INTERACTIVE COMPONENTS
    // ========================================

    class InteractiveComponents {
        constructor() {
            this.init();
        }

        init() {
            this.handleCardHovers();
            this.handleButtonClicks();
            this.handleFileActions();
            this.handleLanguageSelector();
        }

        handleCardHovers() {
            const cards = document.querySelectorAll('.card, .folder-card, .file-card, .testimonial-card, .metric-card, .feature-card, .team-member');
            
            cards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-4px) scale(1.01)';
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0) scale(1)';
                });
            });
        }

        handleButtonClicks() {
            const buttons = document.querySelectorAll('.btn');
            
            buttons.forEach(button => {
                button.addEventListener('click', (e) => {
                    // Create ripple effect
                    const ripple = document.createElement('span');
                    const rect = button.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    ripple.classList.add('ripple');
                    
                    button.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
        }

        handleFileActions() {
            const fileActions = document.querySelectorAll('.file-action');
            
            fileActions.forEach(action => {
                action.addEventListener('click', (e) => {
                    e.preventDefault();
                    const fileCard = action.closest('.file-card');
                    const fileName = fileCard.querySelector('.file-title').textContent;
                    
                    // Simulate download
                    this.showNotification(`Pobieranie pliku: ${fileName}`, 'success');
                });
            });
        }

        handleLanguageSelector() {
            const languageSelector = document.querySelector('.language-selector');
            
            if (languageSelector) {
                languageSelector.addEventListener('click', () => {
                    this.showNotification('Funkcja zmiany języka będzie dostępna wkrótce', 'info');
                });
            }
        }

        showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.textContent = message;
            
            // Add styles
            Object.assign(notification.style, {
                position: 'fixed',
                top: '20px',
                right: '20px',
                padding: '12px 20px',
                borderRadius: '8px',
                color: '#FFFFFF',
                fontWeight: '500',
                zIndex: '10000',
                transform: 'translateX(100%)',
                transition: 'transform 0.3s ease',
                maxWidth: '300px',
                wordWrap: 'break-word'
            });

            // Set background color based on type
            const colors = {
                success: '#00B8F0',
                error: '#FF4757',
                info: '#2E6CFF',
                warning: '#FFA502'
            };
            notification.style.backgroundColor = colors[type] || colors.info;

            document.body.appendChild(notification);

            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);

            // Remove after 3 seconds
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 3000);
        }
    }

    // ========================================
    // CTA PULSE ANIMATION
    // ========================================

    class CtaAnimations {
        constructor() {
            this.init();
        }

        init() {
            this.handlePulseButtons();
        }

        handlePulseButtons() {
            const pulseButtons = document.querySelectorAll('.btn.pulse');
            
            pulseButtons.forEach(button => {
                // Add custom pulse animation
                button.addEventListener('mouseenter', () => {
                    button.style.animation = 'none';
                    button.style.transform = 'scale(1.05)';
                });

                button.addEventListener('mouseleave', () => {
                    button.style.animation = 'pulse 2s infinite';
                    button.style.transform = 'scale(1)';
                });
            });
        }
    }

    // ========================================
    // PERFORMANCE OPTIMIZATIONS
    // ========================================

    class PerformanceOptimizer {
        constructor() {
            this.init();
        }

        init() {
            this.preloadImages();
            this.optimizeScroll();
            this.handleResize();
        }

        preloadImages() {
            // Preload critical images if any
            const criticalImages = [
                // Add any critical image URLs here
            ];

            criticalImages.forEach(src => {
                const img = new Image();
                img.src = src;
            });
        }

        optimizeScroll() {
            let ticking = false;
            
            const scrollHandler = () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        // Scroll-based animations and calculations
                        ticking = false;
                    });
                    ticking = true;
                }
            };

            window.addEventListener('scroll', scrollHandler, { passive: true });
        }

        handleResize() {
            const resizeHandler = debounce(() => {
                // Handle responsive adjustments
                this.adjustLayout();
            }, 250);

            window.addEventListener('resize', resizeHandler);
        }

        adjustLayout() {
            // Adjust layout based on screen size
            const isMobile = window.innerWidth <= 768;
            const isTablet = window.innerWidth <= 1024;
            
            // Add any responsive adjustments here
            document.body.classList.toggle('mobile', isMobile);
            document.body.classList.toggle('tablet', isTablet);
        }
    }

    // ========================================
    // ACCESSIBILITY ENHANCEMENTS
    // ========================================

    class AccessibilityEnhancer {
        constructor() {
            this.init();
        }

        init() {
            this.handleKeyboardNavigation();
            this.handleFocusManagement();
            this.handleAriaLabels();
        }

        handleKeyboardNavigation() {
            // Enhanced keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    document.body.classList.add('keyboard-navigation');
                }
            });

            document.addEventListener('mousedown', () => {
                document.body.classList.remove('keyboard-navigation');
            });
        }

        handleFocusManagement() {
            // Focus management for modals and overlays
            const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    // Close any open modals or overlays
                    const activeElement = document.activeElement;
                    if (activeElement && activeElement.blur) {
                        activeElement.blur();
                    }
                }
            });
        }

        handleAriaLabels() {
            // Add ARIA labels to interactive elements
            const buttons = document.querySelectorAll('.btn:not([aria-label])');
            buttons.forEach(button => {
                if (!button.getAttribute('aria-label') && button.textContent) {
                    button.setAttribute('aria-label', button.textContent.trim());
                }
            });
        }
    }

    // ========================================
    // INITIALIZATION
    // ========================================

    // Wait for DOM to be ready
    function init() {
        // Initialize all modules
        new Navbar();
        new AnimationController();
        new InteractiveComponents();
        new CtaAnimations();
        new PerformanceOptimizer();
        new AccessibilityEnhancer();

        // Add loaded class to body
        document.body.classList.add('loaded');

        // Log initialization
        console.log('🚀 Aero Digital website initialized successfully!');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ========================================
    // ADDITIONAL STYLES FOR JAVASCRIPT FUNCTIONALITY
    // ========================================

    // Add ripple effect styles
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .keyboard-navigation *:focus {
            outline: 2px solid #2E6CFF !important;
            outline-offset: 2px !important;
        }
        
        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }
        
        .loaded {
            opacity: 1;
        }
        
        body {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);

})();
