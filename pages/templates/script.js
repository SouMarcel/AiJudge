// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ===== HERO ANIMATIONS =====
// Animate floating cards in hero section
const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// Animate trust numbers counting up
const animateNumbers = () => {
    const numbers = document.querySelectorAll('.trust-number, .stat-value');
    
    numbers.forEach(number => {
        const target = number.textContent;
        
        // Only animate if it's a number
        if (/^\d+/.test(target)) {
            const value = parseInt(target.replace(/\D/g, ''));
            const suffix = target.replace(/[\d,\.]/g, '');
            const duration = 2000;
            const increment = value / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    number.textContent = value.toLocaleString('pt-BR') + suffix;
                    clearInterval(timer);
                } else {
                    number.textContent = Math.floor(current).toLocaleString('pt-BR') + suffix;
                }
            }, 16);
        }
    });
};

// Trigger number animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateNumbers, 500);
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// ===== DEMO CARD ANIMATION =====
// Simulate the demo process animation
const startDemoAnimation = () => {
    const processSteps = document.querySelectorAll('.process-step');
    let currentStep = 0;
    
    const animateStep = () => {
        if (currentStep < processSteps.length) {
            // Remove processing class from previous step
            if (currentStep > 0) {
                processSteps[currentStep - 1].classList.remove('processing');
                processSteps[currentStep - 1].classList.add('active');
            }
            
            // Add processing class to current step
            if (currentStep < processSteps.length - 1) {
                processSteps[currentStep].classList.add('processing');
            } else {
                processSteps[currentStep].classList.add('active');
            }
            
            currentStep++;
            
            // Random delay between steps (1-2 seconds)
            const delay = Math.random() * 1000 + 1000;
            setTimeout(animateStep, delay);
        } else {
            // Reset after completion
            setTimeout(() => {
                processSteps.forEach(step => {
                    step.classList.remove('active', 'processing');
                });
                currentStep = 0;
                setTimeout(animateStep, 2000);
            }, 3000);
        }
    };
    
    // Start the animation
    animateStep();
};

// Observe demo card and start animation when visible
const demoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(startDemoAnimation, 500);
            demoObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const demoCard = document.querySelector('.ia-demo-card');
if (demoCard) {
    demoObserver.observe(demoCard);
}

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-mesh, .legal-pattern');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== FEATURE CARDS INTERACTION =====
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Add subtle tilt effect
        this.style.transform = 'translateY(-10px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0)';
    });
    
    // Track mouse movement for 3D effect
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});

// ===== TESTIMONIALS INTERACTION =====
const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Pause other cards' animations
        testimonialCards.forEach(c => {
            if (c !== this) {
                c.style.opacity = '0.6';
            }
        });
    });
    
    card.addEventListener('mouseleave', function() {
        // Resume all cards
        testimonialCards.forEach(c => {
            c.style.opacity = '1';
        });
    });
});

// ===== CURSOR EFFECT (OPTIONAL) =====
// Add a custom cursor effect for premium feel
const createCursor = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-gold);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Scale cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .feature-card, .testimonial-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = 'var(--primary-gold-light)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'var(--primary-gold)';
        });
    });
};

// Only create custom cursor on desktop
if (window.innerWidth > 1024) {
    createCursor();
}

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    setTimeout(() => {
        document.querySelector('.hero-content')?.classList.add('animate-in');
        document.querySelector('.hero-visual')?.classList.add('animate-in');
    }, 100);
});

// ===== FORM VALIDATION (for future forms) =====
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// ===== ACCESSIBILITY =====
// Add skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#hero';
skipLink.className = 'skip-link';
skipLink.textContent = 'Pular para o conteúdo principal';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary-gold);
    color: var(--navy-dark);
    padding: 0.5rem 1rem;
    text-decoration: none;
    font-weight: 600;
    z-index: 10000;
    border-radius: 0 0 8px 0;
`;
skipLink.addEventListener('focus', function() {
    this.style.top = '0';
});
skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// ===== ANALYTICS TRACKING (placeholder) =====
const trackEvent = (category, action, label) => {
    // Integrate with Google Analytics or other analytics service
    console.log('Event tracked:', { category, action, label });
    
    // Example: gtag('event', action, { event_category: category, event_label: label });
};

// Track CTA button clicks
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('CTA', 'click', btn.textContent);
    });
});

// Track feature card interactions
featureCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        const title = card.querySelector('.feature-title').textContent;
        trackEvent('Feature', 'click', title);
    });
});

// ===== CONSOLE SIGNATURE =====
console.log('%c🏛️ ai.Judge', 'font-size: 24px; font-weight: bold; color: #D4AF37;');
console.log('%cO futuro do Direito começa aqui.', 'font-size: 14px; color: #B0B0B0;');
console.log('%cInteressado em trabalhar conosco? Entre em contato!', 'font-size: 12px; color: #808080;');

// ===== PERFORMANCE MONITORING =====
// Log page load time
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Página carregada em ${(loadTime / 1000).toFixed(2)}s`);
});

// ===== EASTER EGG =====
// Konami code easter egg
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        // Trigger easter egg
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        console.log('🎉 Easter egg ativado! Você encontrou o código Konami!');
    }
});

// ===== UTILITY FUNCTIONS =====
// Debounce function for performance
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function for scroll events
const throttle = (func, limit) => {
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
};

// Export functions for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        trackEvent,
        validateEmail,
        debounce,
        throttle
    };
}
