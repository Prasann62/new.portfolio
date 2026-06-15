// Shared JavaScript utilities for all portfolio pages

document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal implementation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0) {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Stop observing once it has revealed to prevent repeated triggers
                    observer.unobserve(entry.target);
                }
            });
        };

        const revealObserver = new IntersectionObserver(revealCallback, {
            root: null, // Viewport
            threshold: 0.15, // Trigger when 15% is visible
            rootMargin: '0px 0px -50px 0px' // Offset slightly from bottom
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }
});
