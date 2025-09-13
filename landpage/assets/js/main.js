// Main JavaScript for Geometric Realm Landpage

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Race icon interactions
    const raceIcons = document.querySelectorAll('.race-icon');
    const raceCards = document.querySelectorAll('.race-card');

    raceIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const race = this.getAttribute('data-race');
            const targetCard = document.querySelector(`.${race}-race`);
            
            if (targetCard) {
                targetCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Add highlight effect
                targetCard.style.animation = 'pulse 1s ease-in-out';
                setTimeout(() => {
                    targetCard.style.animation = '';
                }, 1000);
            }
        });

        // Hover effect
        icon.addEventListener('mouseenter', function() {
            const race = this.getAttribute('data-race');
            this.style.filter = 'drop-shadow(0 0 30px currentColor)';
            this.style.transform = 'scale(1.2)';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.filter = '';
            this.style.transform = 'scale(1)';
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .mechanic-item, .race-card, .mode-card, .news-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Parallax effect for geometric background
    const geometricShapes = document.querySelectorAll('.shape-circle, .shape-triangle, .shape-square, .shape-hexagon');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        geometricShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `translateY(${rate * speed}px)`;
        });
    });

    // Dynamic particle system for hero section
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        createParticles(heroVisual);
    }

    function createParticles(container) {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: ${getRandomColor()};
                border-radius: 50%;
                pointer-events: none;
                opacity: ${Math.random() * 0.5 + 0.3};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-particle ${Math.random() * 10 + 10}s infinite linear;
            `;
            container.appendChild(particle);
        }
    }

    function getRandomColor() {
        const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#43e97b'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            from {
                transform: translate(0, 0);
            }
            to {
                transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
            }
        }
    `;
    document.head.appendChild(style);

    // Form interaction (placeholder for future forms)
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                // Placeholder for future form/modal
                showNotification('预约功能即将开放，敬请期待！');
            }
        });
    });

    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--gradient-1);
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slide-in 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slide-out 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Add notification animations
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        @keyframes slide-in {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slide-out {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
            }
            50% {
                transform: scale(1.05);
                box-shadow: 0 0 20px 10px rgba(99, 102, 241, 0);
            }
        }
    `;
    document.head.appendChild(notificationStyle);

    // Lazy loading for images (when added)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Typing effect for hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let index = 0;

        function typeWriter() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }

        // Uncomment to enable typing effect
        // setTimeout(typeWriter, 1000);
    }

    // Mouse trail effect (subtle)
    let mouseTrail = [];
    const maxTrail = 20;

    document.addEventListener('mousemove', (e) => {
        mouseTrail.push({ x: e.clientX, y: e.clientY });
        
        if (mouseTrail.length > maxTrail) {
            mouseTrail.shift();
        }
        
        // Update trail elements
        updateTrail();
    });

    function updateTrail() {
        // Remove old trail elements
        document.querySelectorAll('.mouse-trail').forEach(el => el.remove());
        
        // Create new trail elements
        mouseTrail.forEach((point, index) => {
            const trail = document.createElement('div');
            trail.className = 'mouse-trail';
            trail.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                left: ${point.x}px;
                top: ${point.y}px;
                opacity: ${index / mouseTrail.length * 0.5};
                transform: translate(-50%, -50%);
                z-index: 9999;
            `;
            document.body.appendChild(trail);
        });
    }

    // Performance optimization: throttle scroll events
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }

    function updateAnimations() {
        // Update scroll-based animations here
        ticking = false;
    }

    window.addEventListener('scroll', requestTick);

    // Clean up event listeners on page unload
    window.addEventListener('beforeunload', () => {
        window.removeEventListener('scroll', requestTick);
        document.removeEventListener('mousemove', updateTrail);
    });

    // Initialize tooltips if needed
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });

    function showTooltip(e) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = e.target.getAttribute('data-tooltip');
        tooltip.style.cssText = `
            position: absolute;
            background: var(--card-bg);
            color: var(--text-primary);
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            font-size: 0.875rem;
            white-space: nowrap;
            z-index: 1000;
            pointer-events: none;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        e.target.tooltipElement = tooltip;
    }

    function hideTooltip(e) {
        if (e.target.tooltipElement) {
            e.target.tooltipElement.remove();
            delete e.target.tooltipElement;
        }
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        // Escape key to close modals (when implemented)
        if (e.key === 'Escape') {
            // Close any open modals
        }
        
        // Arrow keys for navigation
        if (e.key === 'ArrowDown') {
            // Navigate to next section
            const currentSection = getCurrentSection();
            if (currentSection) {
                const nextSection = currentSection.nextElementSibling;
                if (nextSection && nextSection.tagName === 'SECTION') {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        } else if (e.key === 'ArrowUp') {
            // Navigate to previous section
            const currentSection = getCurrentSection();
            if (currentSection) {
                const prevSection = currentSection.previousElementSibling;
                if (prevSection && prevSection.tagName === 'SECTION') {
                    prevSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });

    function getCurrentSection() {
        const scrollPosition = window.pageYOffset + window.innerHeight / 2;
        const sections = document.querySelectorAll('section[id]');
        
        let currentSection = null;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= scrollPosition && rect.bottom >= scrollPosition) {
                currentSection = section;
            }
        });
        
        return currentSection;
    }

    // Initialize AOS (Animate On Scroll) custom implementation
    const animatedSections = document.querySelectorAll('section');
    animatedSections.forEach(section => {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });
        
        sectionObserver.observe(section);
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Remove any loading screen if added
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    });

    // Debug mode (remove in production)
    const debugMode = false;
    if (debugMode) {
        console.log('Geometric Realm Landpage Initialized');
        console.log('Features loaded:', {
            smoothScrolling: true,
            parallaxEffect: true,
            particleSystem: true,
            intersectionObserver: true,
            lazyLoading: true
        });
    }
});