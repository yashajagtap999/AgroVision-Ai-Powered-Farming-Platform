// Premium Animations (GSAP and custom hover/ripple bindings)

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Ripple click effects
    initRippleEffects();

    // 2. Initialize Magnetic buttons
    initMagneticButtons();

    // 3. Scroll Reveal for fade-in sections (fallback if AOS is not fully loaded)
    initScrollReveal();

    // 4. GSAP Landing page entry animations
    if (typeof gsap !== 'undefined') {
        initGsapEntrance();
    }
});

// Ripple Click Effect (Disabled for clean, simple farmer UI)
function initRippleEffects() {
    // Disabled button ripple animation to keep UI simple
}

// Magnetic Buttons (Disabled for clean, simple farmer UI)
function initMagneticButtons() {
    // Disabled magnetic button translation to keep UI simple
}

// Scroll Reveal Observer
function initScrollReveal() {
    const fadeSections = document.querySelectorAll('.fade-in-section');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        fadeSections.forEach(section => {
            observer.observe(section);
        });
    } else {
        // Fallback for older browsers
        fadeSections.forEach(section => {
            section.classList.add('is-visible');
        });
    }
}

// GSAP Landing Sequence
function initGsapEntrance() {
    // Register scroll trigger if loaded
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    const tl = gsap.timeline();

    // 1. Navbar slide down
    tl.from('.navbar-custom', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    });

    // 2. Hero badge fade in
    tl.from('.hero-badge', {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
    }, '-=0.5');

    // 3. Hero Titles staggering
    tl.from('.hero-title, .hero-description', {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4');

    // 4. Hero buttons fade in
    tl.from('.hero-buttons', {
        x: -20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
    }, '-=0.4');

    // 5. Hero Illustration slide in from right
    tl.from('.hero-image-wrapper', {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out'
    }, '-=1');

    // Scroll trigger animation for feature cards
    if (document.querySelectorAll('.feature-card-premium').length > 0) {
        gsap.from('.feature-card-premium', {
            scrollTrigger: {
                trigger: '.features-section',
                start: 'top bottom',
            },
            y: 50,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power2.out'
        });
    }
}
