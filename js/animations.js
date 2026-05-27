// js/animations.js
document.addEventListener('DOMContentLoaded', () => {
    // Configure standard Intersection Observer options
    const observerOptions = {
        threshold: 0.1, // trigger when 10% of element is in view
        rootMargin: '0px 0px -60px 0px' // offset bottom of screen slightly to feel natural
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Unobserve to trigger animation only once
            }
        });
    }, observerOptions);

    // Select and observe all generic fade-in/slide-in elements
    const animElements = document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right');
    animElements.forEach(el => observer.observe(el));

    // Staggered animation observer for container grids (like service cards or why-choose-us items)
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find all child elements to stagger (cards)
                const items = entry.target.querySelectorAll('.stagger-item, .service-card, .why-us-card');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-in');
                    }, index * 120); // 120ms stagger between consecutive cards
                });
                staggerObserver.unobserve(entry.target); // Trigger only once
            }
        });
    }, { threshold: 0.05 });

    // Observe services grid and why-us grid if present
    const staggerGrids = document.querySelectorAll('.services-grid, .why-us-grid');
    staggerGrids.forEach(grid => staggerObserver.observe(grid));
});
