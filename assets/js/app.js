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
    // WORLD MAP FUNCTIONALITY
    // ========================================

    class WorldMap {
        constructor() {
            this.svg = document.getElementById('world-map-svg');
            this.dotsContainer = document.querySelector('.map-dots');
            this.connectionPoints = [
                { start: { lat: 40.7128, lng: -74.0060 }, end: { lat: 51.5074, lng: -0.1278 } }, // NYC to London
                { start: { lat: 35.6762, lng: 139.6503 }, end: { lat: 40.7128, lng: -74.0060 } }, // Tokyo to NYC
                { start: { lat: -33.8688, lng: 151.2093 }, end: { lat: 35.6762, lng: 139.6503 } }, // Sydney to Tokyo
                { start: { lat: 48.8566, lng: 2.3522 }, end: { lat: 40.7128, lng: -74.0060 } }, // Paris to NYC
                { start: { lat: 55.7558, lng: 37.6176 }, end: { lat: 48.8566, lng: 2.3522 } }, // Moscow to Paris
            ];
            this.init();
        }

        init() {
            if (this.svg) {
                this.createMapBackground();
                this.createConnections();
                this.createDots();
                this.animateConnections();
            }
        }

        createMapBackground() {
            // Create a simple world map outline using SVG paths
            const mapPaths = [
                // North America
                "M 50 120 Q 80 100 120 110 Q 160 120 200 100 Q 240 90 280 100 Q 320 110 360 100 Q 400 90 440 100 Q 480 110 520 100 Q 560 90 600 100 Q 640 110 680 100 Q 720 90 750 100 L 750 200 Q 720 210 680 200 Q 640 190 600 200 Q 560 210 520 200 Q 480 190 440 200 Q 400 210 360 200 Q 320 190 280 200 Q 240 210 200 200 Q 160 190 120 200 Q 80 210 50 200 Z",
                // Europe
                "M 350 150 Q 380 140 410 150 Q 440 160 470 150 Q 500 140 530 150 Q 560 160 590 150 Q 620 140 650 150 Q 680 160 710 150 L 710 200 Q 680 210 650 200 Q 620 190 590 200 Q 560 210 530 200 Q 500 190 470 200 Q 440 210 410 200 Q 380 190 350 200 Z",
                // Asia
                "M 500 120 Q 530 110 560 120 Q 590 130 620 120 Q 650 110 680 120 Q 710 130 740 120 L 740 200 Q 710 210 680 200 Q 650 190 620 200 Q 590 210 560 200 Q 530 190 500 200 Z",
                // Africa
                "M 380 250 Q 410 240 440 250 Q 470 260 500 250 Q 530 240 560 250 Q 590 260 620 250 Q 650 240 680 250 L 680 350 Q 650 360 620 350 Q 590 340 560 350 Q 530 360 500 350 Q 470 340 440 350 Q 410 360 380 350 Z",
                // Australia
                "M 600 320 Q 630 310 660 320 Q 690 330 720 320 L 720 380 Q 690 390 660 380 Q 630 370 600 380 Z"
            ];

            // Add gradient definition
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.setAttribute('id', 'path-gradient');
            gradient.setAttribute('x1', '0%');
            gradient.setAttribute('y1', '0%');
            gradient.setAttribute('x2', '100%');
            gradient.setAttribute('y2', '0%');
            
            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('stop-color', 'white');
            stop1.setAttribute('stop-opacity', '0');
            
            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '5%');
            stop2.setAttribute('stop-color', '#2E6CFF');
            stop2.setAttribute('stop-opacity', '1');
            
            const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop3.setAttribute('offset', '95%');
            stop3.setAttribute('stop-color', '#2E6CFF');
            stop3.setAttribute('stop-opacity', '1');
            
            const stop4 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop4.setAttribute('offset', '100%');
            stop4.setAttribute('stop-color', 'white');
            stop4.setAttribute('stop-opacity', '0');
            
            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            gradient.appendChild(stop3);
            gradient.appendChild(stop4);
            defs.appendChild(gradient);
            this.svg.appendChild(defs);

            // Add continent outlines
            mapPaths.forEach((pathData, index) => {
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', pathData);
                path.setAttribute('fill', 'rgba(255, 255, 255, 0.1)');
                path.setAttribute('stroke', 'rgba(255, 255, 255, 0.2)');
                path.setAttribute('stroke-width', '0.5');
                this.svg.appendChild(path);
            });
        }

        projectPoint(lat, lng) {
            const x = (lng + 180) * (800 / 360);
            const y = (90 - lat) * (400 / 180);
            return { x, y };
        }

        createCurvedPath(start, end) {
            const midX = (start.x + end.x) / 2;
            const midY = Math.min(start.y, end.y) - 50;
            return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
        }

        createConnections() {
            this.connectionPoints.forEach((connection, index) => {
                const startPoint = this.projectPoint(connection.start.lat, connection.start.lng);
                const endPoint = this.projectPoint(connection.end.lat, connection.end.lng);
                
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', this.createCurvedPath(startPoint, endPoint));
                path.setAttribute('fill', 'none');
                path.setAttribute('stroke', 'url(#path-gradient)');
                path.setAttribute('stroke-width', '1');
                path.classList.add('map-path');
                path.style.animationDelay = `${index * 0.5}s`;
                
                this.svg.appendChild(path);
            });
        }

        createDots() {
            this.connectionPoints.forEach((connection, index) => {
                // Start point
                const startPoint = this.projectPoint(connection.start.lat, connection.start.lng);
                const startDot = this.createDot(startPoint.x, startPoint.y, index * 0.5);
                this.dotsContainer.appendChild(startDot);

                // End point
                const endPoint = this.projectPoint(connection.end.lat, connection.end.lng);
                const endDot = this.createDot(endPoint.x, endPoint.y, index * 0.5);
                this.dotsContainer.appendChild(endDot);
            });
        }

        createDot(x, y, delay) {
            const dot = document.createElement('div');
            dot.className = 'map-dot';
            dot.style.left = `${(x / 800) * 100}%`;
            dot.style.top = `${(y / 400) * 100}%`;
            dot.style.animationDelay = `${delay}s`;
            return dot;
        }

        animateConnections() {
            // The CSS animations will handle the path drawing
            // This method can be used for additional JavaScript-based animations
            setTimeout(() => {
                this.connectionPoints.forEach((connection, index) => {
                    const paths = this.svg.querySelectorAll('.map-path');
                    if (paths[index]) {
                        paths[index].style.strokeDasharray = '1000';
                        paths[index].style.strokeDashoffset = '1000';
                        paths[index].style.animation = `drawPath 2s ease-in-out ${index * 0.5}s forwards`;
                    }
                });
            }, 100);
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
        new WorldMap();

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
