# Malnad Webs - Business Website Implementation Plan

## Overview
Build a single-page, framework-free (HTML/CSS/JS) business website for Malnad Webs — a digital services company that helps local businesses in the Malnad region establish their online presence. The site will feature bilingual support (English/Kannada), nature-inspired visuals, moderate animations, and a contact form via FormSubmit.co, deployed on GitHub Pages.

## Architecture
```
malnad-webs/
├── index.html              # Single-page structure with all sections
├── css/
│   ├── styles.css          # Main stylesheet (layout, components, responsive)
│   └── animations.css      # Scroll animations, transitions, hover effects
├── js/
│   ├── main.js             # Navigation, scroll handling, progress indicator
│   ├── animations.js       # Intersection Observer for scroll-triggered animations
│   └── language.js         # English/Kannada toggle logic with translation data
├── assets/
│   ├── images/             # Hero background, icons, logo, favicon
│   └── icons/              # Service category SVG icons
├── resources/
│   └── requirement_details.txt  # (existing)
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Pages deployment workflow (if needed)
```

**How it works:**
- `index.html` contains all 5 sections (Hero, About, Services, Why Choose Us, Contact) as `<section>` blocks
- CSS handles layout (Flexbox/Grid), responsive design, color theme, and animation keyframes
- JS handles smooth scrolling, navbar behavior, language switching, scroll-triggered animations, and scroll progress indicator
- FormSubmit.co handles contact form submission (no backend needed)
- Language toggle swaps text content using a JS translation dictionary

---

## Implementation Phases

### Phase 1: Project Structure, HTML Skeleton and Navigation
**Files**: `index.html`, `css/styles.css`

Set up the project folder structure and build the complete HTML skeleton with semantic markup for all 5 sections. Create the sticky navigation bar with smooth scroll links and mobile hamburger menu.

**Key code changes:**

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Malnad Webs - Weaving Digital Presence for Local Businesses in Malnad region. Websites, SEO, hosting and social media for earthmovers, builders, shops, cabs, coffee estates and more.">
    <title>Malnad Webs | Digital Solutions for Local Businesses</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/animations.css">
</head>
<body>
    <!-- Scroll Progress Bar -->
    <div class="scroll-progress" id="scrollProgress"></div>

    <!-- Navigation -->
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <a href="#hero" class="nav-logo">Malnad Webs</a>
            <button class="nav-toggle" id="navToggle" aria-label="Toggle menu">
                <span class="hamburger"></span>
            </button>
            <ul class="nav-menu" id="navMenu">
                <li><a href="#hero" class="nav-link" data-lang-key="nav_home">Home</a></li>
                <li><a href="#about" class="nav-link" data-lang-key="nav_about">About</a></li>
                <li><a href="#services" class="nav-link" data-lang-key="nav_services">Services</a></li>
                <li><a href="#why-us" class="nav-link" data-lang-key="nav_why">Why Us</a></li>
                <li><a href="#contact" class="nav-link" data-lang-key="nav_contact">Contact</a></li>
                <li>
                    <button class="lang-toggle" id="langToggle" aria-label="Switch language">
                        <span>ಕನ್ನಡ</span>
                    </button>
                </li>
            </ul>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="hero" class="hero-section">...</section>

    <!-- About Section -->
    <section id="about" class="about-section">...</section>

    <!-- Services Section -->
    <section id="services" class="services-section">...</section>

    <!-- Why Choose Us Section -->
    <section id="why-us" class="why-us-section">...</section>

    <!-- Contact Section -->
    <section id="contact" class="contact-section">...</section>

    <!-- Footer -->
    <footer class="footer">...</footer>

    <script src="js/main.js"></script>
    <script src="js/animations.js"></script>
    <script src="js/language.js"></script>
</body>
</html>
```

```css
/* css/styles.css - Base reset, CSS variables, navbar */
:root {
    /* Nature-inspired Malnad palette */
    --primary-green: #2D6A4F;
    --dark-green: #1B4332;
    --light-green: #52B788;
    --accent-green: #95D5B2;
    --earth-brown: #8B6F47;
    --warm-cream: #FEFAE0;
    --off-white: #F5F5F0;
    --text-dark: #2C2C2C;
    --text-light: #F5F5F0;

    --font-primary: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    --max-width: 1200px;
    --nav-height: 70px;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { font-family: var(--font-primary); color: var(--text-dark); }

/* Scroll progress bar */
.scroll-progress {
    position: fixed; top: 0; left: 0;
    height: 3px; background: var(--light-green);
    z-index: 1001; width: 0%;
    transition: width 0.1s linear;
}

/* Sticky Navbar */
.navbar {
    position: fixed; top: 0; width: 100%;
    background: rgba(27, 67, 50, 0.95);
    backdrop-filter: blur(10px);
    z-index: 1000; height: var(--nav-height);
}
.nav-container {
    max-width: var(--max-width); margin: 0 auto;
    display: flex; justify-content: space-between;
    align-items: center; padding: 0 2rem;
    height: 100%;
}
.nav-menu {
    display: flex; list-style: none;
    align-items: center; gap: 2rem;
}
.nav-link {
    color: var(--text-light); text-decoration: none;
    font-weight: 500; transition: color 0.3s;
}
.nav-link:hover { color: var(--accent-green); }

/* Hamburger menu for mobile */
.nav-toggle { display: none; background: none; border: none; cursor: pointer; }
.hamburger, .hamburger::before, .hamburger::after {
    display: block; width: 25px; height: 3px;
    background: var(--text-light); border-radius: 2px;
    transition: transform 0.3s;
}
.hamburger { position: relative; }
.hamburger::before, .hamburger::after {
    content: ''; position: absolute;
}
.hamburger::before { top: -8px; }
.hamburger::after { top: 8px; }

/* Language toggle button */
.lang-toggle {
    background: var(--light-green); color: var(--dark-green);
    border: none; padding: 0.4rem 1rem;
    border-radius: 20px; cursor: pointer;
    font-weight: 600; font-size: 0.85rem;
    transition: background 0.3s;
}
.lang-toggle:hover { background: var(--accent-green); }

/* Mobile responsive */
@media (max-width: 768px) {
    .nav-toggle { display: block; }
    .nav-menu {
        position: fixed; top: var(--nav-height);
        right: -100%; width: 70%; height: calc(100vh - var(--nav-height));
        flex-direction: column; background: var(--dark-green);
        padding: 2rem; gap: 1.5rem;
        transition: right 0.3s ease;
    }
    .nav-menu.active { right: 0; }
}
```

**Test cases for this phase:**

- Test case 1: Verify all section anchor links scroll to correct sections

  ```
  Manual test:
  1. Open index.html in browser
  2. Click each nav link (Home, About, Services, Why Us, Contact)
  3. Verify smooth scroll to the corresponding section
  4. Verify URL hash updates (#hero, #about, etc.)
  ```

- Test case 2: Verify mobile hamburger menu opens and closes

  ```
  Manual test:
  1. Open browser DevTools, set viewport to 375px wide
  2. Verify hamburger icon is visible, nav links are hidden
  3. Click hamburger — menu slides in from right
  4. Click a nav link — menu closes and page scrolls
  5. Click hamburger again — menu closes
  ```

- Test case 3: Verify navbar stays fixed on scroll

  ```
  Manual test:
  1. Scroll down the page
  2. Verify navbar remains visible at the top
  3. Verify scroll progress bar fills as you scroll
  ```

**Technical details and assumptions:**
- Using CSS custom properties (variables) for consistent theming across all phases
- Navbar uses `backdrop-filter: blur()` for a frosted glass effect (supported in all modern browsers)
- Mobile breakpoint at 768px — standard tablet/phone threshold
- `scroll-behavior: smooth` in CSS handles basic smooth scrolling; JS will enhance for offset handling

---

### Phase 2: Section Content, Layout and Styling
**Files**: `index.html`, `css/styles.css`

Build out the full content and visual design for all 5 sections: Hero (with tagline and CTA), About Us, Services (icon card grid), Why Choose Us, and Contact (FormSubmit.co form). Add the footer.

**Key code changes:**

```html
<!-- Hero Section -->
<section id="hero" class="hero-section">
    <div class="hero-overlay"></div>
    <div class="hero-content">
        <p class="hero-tagline" data-lang-key="hero_tagline">Weaving Digital Presence for Local Businesses</p>
        <h1 class="hero-title" data-lang-key="hero_title">Bring Your Local Business Online</h1>
        <p class="hero-subtitle" data-lang-key="hero_subtitle">
            We help earthmovers, builders, shops, cab services, coffee estates 
            and businesses across the Malnad region build their digital identity.
        </p>
        <a href="#contact" class="btn btn-primary" data-lang-key="hero_cta">Get Started</a>
    </div>
</section>

<!-- About Section -->
<section id="about" class="about-section">
    <div class="container">
        <h2 class="section-title" data-lang-key="about_title">About Malnad Webs</h2>
        <div class="about-content">
            <div class="about-text">
                <p data-lang-key="about_p1">
                    We are a team passionate about empowering local businesses in the 
                    beautiful Malnad region. We believe every business, big or small, 
                    deserves a strong digital presence.
                </p>
                <p data-lang-key="about_p2">
                    Our mission is to bridge the gap between traditional local enterprises 
                    and the digital world, making technology accessible and affordable.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- Services Section - Icon Card Grid -->
<section id="services" class="services-section">
    <div class="container">
        <h2 class="section-title" data-lang-key="services_title">Our Services</h2>
        <p class="section-subtitle" data-lang-key="services_subtitle">
            We create tailored digital solutions for every type of local business
        </p>
        <div class="services-grid">
            <div class="service-card">
                <div class="service-icon"><!-- SVG icon --></div>
                <h3 data-lang-key="service_website">Business Websites</h3>
                <p data-lang-key="service_website_desc">
                    Custom websites for earthmovers, builders, retailers, cab services, 
                    coffee estates and more.
                </p>
            </div>
            <div class="service-card">
                <div class="service-icon"><!-- SVG icon --></div>
                <h3 data-lang-key="service_hosting">Hosting Support</h3>
                <p data-lang-key="service_hosting_desc">
                    Reliable hosting setup and ongoing maintenance so you never worry 
                    about downtime.
                </p>
            </div>
            <div class="service-card">
                <div class="service-icon"><!-- SVG icon --></div>
                <h3 data-lang-key="service_seo">SEO & Google Ranking</h3>
                <p data-lang-key="service_seo_desc">
                    Get found on Google. We optimize your site so local customers 
                    can discover your business easily.
                </p>
            </div>
            <div class="service-card">
                <div class="service-icon"><!-- SVG icon --></div>
                <h3 data-lang-key="service_social">Social Media Handling</h3>
                <p data-lang-key="service_social_desc">
                    We manage your social media accounts to build your brand 
                    and engage with customers online.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- Contact Section with FormSubmit.co -->
<section id="contact" class="contact-section">
    <div class="container">
        <h2 class="section-title" data-lang-key="contact_title">Get In Touch</h2>
        <form action="https://formsubmit.co/YOUR_EMAIL_HERE" method="POST" class="contact-form">
            <input type="hidden" name="_subject" value="New inquiry from Malnad Webs website">
            <input type="hidden" name="_captcha" value="true">
            <input type="hidden" name="_template" value="table">
            <input type="text" name="_honey" style="display:none">
            <div class="form-group">
                <label for="name" data-lang-key="form_name">Your Name</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email" data-lang-key="form_email">Your Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="business" data-lang-key="form_business">Business Type</label>
                <select id="business" name="business_type">
                    <option value="" data-lang-key="form_select">Select your business type</option>
                    <option value="earthmover">Earthmover / JCB</option>
                    <option value="builder">Builder / Constructor</option>
                    <option value="retail">Retail Shop</option>
                    <option value="cab">Cab / Taxi Service</option>
                    <option value="estate">Coffee / Spice Estate</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label for="message" data-lang-key="form_message">Your Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" data-lang-key="form_submit">Send Message</button>
        </form>
    </div>
</section>
```

```css
/* css/styles.css - Section styles */

/* Shared */
.container { max-width: var(--max-width); margin: 0 auto; padding: 0 2rem; }
.section-title {
    font-size: 2.2rem; text-align: center;
    color: var(--dark-green); margin-bottom: 1rem;
}
.section-subtitle { text-align: center; color: #666; margin-bottom: 3rem; }
.btn-primary {
    background: var(--primary-green); color: white;
    padding: 0.9rem 2.5rem; border: none; border-radius: 30px;
    font-size: 1rem; cursor: pointer; text-decoration: none;
    display: inline-block; transition: background 0.3s, transform 0.2s;
}
.btn-primary:hover { background: var(--light-green); transform: translateY(-2px); }

/* Hero */
.hero-section {
    height: 100vh; display: flex; align-items: center;
    justify-content: center; text-align: center;
    background: linear-gradient(135deg, var(--dark-green), var(--primary-green));
    color: var(--text-light); position: relative;
    padding-top: var(--nav-height);
}
.hero-tagline { font-size: 1rem; letter-spacing: 3px; text-transform: uppercase; opacity: 0.8; }
.hero-title { font-size: 3.5rem; margin: 1rem 0; line-height: 1.2; }
.hero-subtitle { font-size: 1.2rem; max-width: 600px; margin: 0 auto 2rem; opacity: 0.9; }

/* About */
.about-section { padding: 6rem 0; background: var(--off-white); }
.about-text p { font-size: 1.1rem; line-height: 1.8; margin-bottom: 1rem; color: #444; }

/* Services Grid */
.services-section { padding: 6rem 0; background: white; }
.services-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
}
.service-card {
    background: var(--off-white); padding: 2.5rem 2rem;
    border-radius: 12px; text-align: center;
    border: 1px solid #e8e8e0;
    transition: transform 0.3s, box-shadow 0.3s;
}
.service-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(45, 106, 79, 0.15);
}
.service-icon { font-size: 2.5rem; margin-bottom: 1rem; color: var(--primary-green); }
.service-card h3 { color: var(--dark-green); margin-bottom: 0.8rem; }
.service-card p { color: #666; line-height: 1.6; }

/* Why Choose Us */
.why-us-section { padding: 6rem 0; background: var(--warm-cream); }

/* Contact */
.contact-section { padding: 6rem 0; background: var(--off-white); }
.contact-form { max-width: 600px; margin: 0 auto; }
.form-group { margin-bottom: 1.5rem; }
.form-group label {
    display: block; margin-bottom: 0.5rem;
    font-weight: 600; color: var(--dark-green);
}
.form-group input, .form-group select, .form-group textarea {
    width: 100%; padding: 0.8rem 1rem;
    border: 2px solid #ddd; border-radius: 8px;
    font-size: 1rem; font-family: var(--font-primary);
    transition: border-color 0.3s;
}
.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
    outline: none; border-color: var(--primary-green);
}

/* Footer */
.footer {
    background: var(--dark-green); color: var(--text-light);
    text-align: center; padding: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
    .hero-title { font-size: 2.2rem; }
    .hero-subtitle { font-size: 1rem; }
    .section-title { font-size: 1.8rem; }
}
```

**Test cases for this phase:**

- Test case 1: Verify all sections render correctly at desktop (1440px), tablet (768px), and mobile (375px)

  ```
  Manual test:
  1. Open index.html in browser
  2. Check desktop: services grid shows 4 columns, hero text is large
  3. Resize to 768px: grid adjusts to 2 columns, hamburger appears
  4. Resize to 375px: grid shows 1 column, text sizes reduce
  5. No horizontal scrollbar at any width
  ```

- Test case 2: Verify contact form submission works with FormSubmit.co

  ```
  Manual test:
  1. Replace YOUR_EMAIL_HERE with actual email
  2. Fill out all fields, submit the form
  3. Verify redirect to FormSubmit confirmation page
  4. Check email inbox for the submitted form data
  5. Verify honeypot field is hidden (spam protection)
  ```

- Test case 3: Verify service cards hover effect

  ```
  Manual test:
  1. Hover over each service card
  2. Verify card lifts up (translateY) and shadow appears
  3. Verify transition is smooth (0.3s)
  ```

**Technical details and assumptions:**
- FormSubmit.co honeypot field (`_honey`) added for spam protection
- `_captcha` set to `true` for additional bot prevention
- Service grid uses `auto-fit` with `minmax(260px, 1fr)` for automatic responsive columns
- Hero uses CSS gradient background; can later be replaced with an actual photo with overlay
- Contact form includes a "Business Type" dropdown to help categorize inquiries

---

### Phase 3: JavaScript - Navigation, Scroll Progress and Animations
**Files**: `js/main.js`, `js/animations.js`, `css/animations.css`

Implement all interactive JavaScript: mobile menu toggle, scroll progress indicator, active nav link highlighting on scroll, and scroll-triggered animations (fade-ins, animated service cards, counters).

**Key code changes:**

```javascript
// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollProgress = document.getElementById('scrollProgress');
    const sections = document.querySelectorAll('section');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded',
            navMenu.classList.contains('active'));
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Scroll progress bar
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });

    // Active nav link highlighting based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll with navbar offset
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        });
    });
});
```

```javascript
// js/animations.js
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right')
        .forEach(el => observer.observe(el));

    // Staggered animation for service cards
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.service-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, index * 150); // 150ms stagger between cards
                });
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) cardObserver.observe(servicesGrid);
});
```

```css
/* css/animations.css */

/* Base states - elements start hidden */
.fade-up {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in {
    opacity: 0;
    transition: opacity 0.6s ease;
}
.slide-left {
    opacity: 0;
    transform: translateX(-40px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}
.slide-right {
    opacity: 0;
    transform: translateX(40px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

/* Animated state */
.fade-up.animate-in,
.fade-in.animate-in,
.slide-left.animate-in,
.slide-right.animate-in {
    opacity: 1;
    transform: translate(0, 0);
}

/* Service cards - start hidden, stagger in */
.service-card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease,
                box-shadow 0.3s ease;
}
.service-card.animate-in {
    opacity: 1;
    transform: translateY(0);
}

/* Active nav link */
.nav-link.active {
    color: var(--accent-green);
    border-bottom: 2px solid var(--accent-green);
    padding-bottom: 4px;
}

/* Hover effects for service cards (keep from Phase 2, enhanced) */
.service-card.animate-in:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(45, 106, 79, 0.15);
}

/* Button pulse on hero */
@keyframes subtlePulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(82, 183, 136, 0.4); }
    50% { box-shadow: 0 0 0 12px rgba(82, 183, 136, 0); }
}
.hero-section .btn-primary {
    animation: subtlePulse 3s infinite;
}
```

**Test cases for this phase:**

- Test case 1: Verify scroll progress bar fills correctly

  ```
  Manual test:
  1. Scroll to top — progress bar width is 0%
  2. Scroll to middle — progress bar is roughly 50%
  3. Scroll to bottom — progress bar is 100%
  4. Verify green bar is visible at top of viewport
  ```

- Test case 2: Verify scroll-triggered animations fire once

  ```
  Manual test:
  1. Open page — sections below fold should be invisible
  2. Scroll down — elements fade/slide in as they enter viewport
  3. Scroll back up and down again — animations do NOT replay
  4. Service cards should stagger in with slight delays
  ```

- Test case 3: Verify active nav link updates on scroll

  ```
  Manual test:
  1. Scroll to About section — "About" nav link highlights
  2. Scroll to Services — "Services" highlights, "About" de-highlights
  3. Continue through all sections
  ```

**Technical details and assumptions:**
- Using Intersection Observer API (supported in all modern browsers, no polyfill needed)
- Service card animations stagger at 150ms intervals for a cascading effect
- Scroll event listeners are kept lightweight; could add `requestAnimationFrame` throttling if performance is an issue
- Animation classes (`fade-up`, `slide-left`, etc.) must be added to HTML elements in Phase 2's markup

---

### Phase 4: Bilingual Support (English/Kannada Toggle)
**Files**: `js/language.js`

Implement the language toggle feature that switches all visible text between English and Kannada. Store the user's language preference in `localStorage` so it persists across page visits.

**Key code changes:**

```javascript
// js/language.js
document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('langToggle');
    let currentLang = localStorage.getItem('malnadwebs-lang') || 'en';

    const translations = {
        en: {
            // Navigation
            nav_home: 'Home',
            nav_about: 'About',
            nav_services: 'Services',
            nav_why: 'Why Us',
            nav_contact: 'Contact',

            // Hero
            hero_tagline: 'Weaving Digital Presence for Local Businesses',
            hero_title: 'Bring Your Local Business Online',
            hero_subtitle: 'We help earthmovers, builders, shops, cab services, coffee estates and businesses across the Malnad region build their digital identity.',
            hero_cta: 'Get Started',

            // About
            about_title: 'About Malnad Webs',
            about_p1: 'We are a team passionate about empowering local businesses in the beautiful Malnad region. We believe every business, big or small, deserves a strong digital presence.',
            about_p2: 'Our mission is to bridge the gap between traditional local enterprises and the digital world, making technology accessible and affordable.',

            // Services
            services_title: 'Our Services',
            services_subtitle: 'We create tailored digital solutions for every type of local business',
            service_website: 'Business Websites',
            service_website_desc: 'Custom websites for earthmovers, builders, retailers, cab services, coffee estates and more.',
            service_hosting: 'Hosting Support',
            service_hosting_desc: 'Reliable hosting setup and ongoing maintenance so you never worry about downtime.',
            service_seo: 'SEO & Google Ranking',
            service_seo_desc: 'Get found on Google. We optimize your site so local customers can discover your business easily.',
            service_social: 'Social Media Handling',
            service_social_desc: 'We manage your social media accounts to build your brand and engage with customers online.',

            // Why Us
            why_title: 'Why Choose Us',

            // Contact
            contact_title: 'Get In Touch',
            form_name: 'Your Name',
            form_email: 'Your Email',
            form_business: 'Business Type',
            form_select: 'Select your business type',
            form_message: 'Your Message',
            form_submit: 'Send Message',

            // Footer
            footer_text: '© 2026 Malnad Webs. All rights reserved.'
        },
        kn: {
            // Navigation
            nav_home: 'ಮುಖಪುಟ',
            nav_about: 'ನಮ್ಮ ಬಗ್ಗೆ',
            nav_services: 'ಸೇವೆಗಳು',
            nav_why: 'ನಮ್ಮನ್ನು ಏಕೆ',
            nav_contact: 'ಸಂಪರ್ಕಿಸಿ',

            // Hero
            hero_tagline: 'ಸ್ಥಳೀಯ ವ್ಯಾಪಾರಗಳಿಗೆ ಡಿಜಿಟಲ್ ಉಪಸ್ಥಿತಿ',
            hero_title: 'ನಿಮ್ಮ ಸ್ಥಳೀಯ ವ್ಯಾಪಾರವನ್ನು ಆನ್‌ಲೈನ್‌ಗೆ ತನ್ನಿ',
            hero_subtitle: 'ಮಣ್ಣು ತೆಗೆಯುವವರು, ಕಟ್ಟಡ ನಿರ್ಮಾಪಕರು, ಅಂಗಡಿಗಳು, ಕ್ಯಾಬ್ ಸೇವೆಗಳು, ಕಾಫಿ ಎಸ್ಟೇಟ್‌ಗಳು ಮತ್ತು ಮಲೆನಾಡು ಪ್ರದೇಶದ ವ್ಯಾಪಾರಗಳಿಗೆ ಡಿಜಿಟಲ್ ಗುರುತು ನಿರ್ಮಿಸಲು ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.',
            hero_cta: 'ಪ್ರಾರಂಭಿಸಿ',

            // About
            about_title: 'ಮಲೆನಾಡು ವೆಬ್ಸ್ ಬಗ್ಗೆ',
            about_p1: 'ಸುಂದರ ಮಲೆನಾಡು ಪ್ರದೇಶದ ಸ್ಥಳೀಯ ವ್ಯಾಪಾರಗಳನ್ನು ಸಬಲಗೊಳಿಸುವ ಉತ್ಸಾಹ ಹೊಂದಿರುವ ತಂಡ ನಾವು. ಪ್ರತಿಯೊಂದು ವ್ಯಾಪಾರ, ದೊಡ್ಡದಿರಲಿ ಅಥಬಾ ಚಿಕ್ಕದಿರಲಿ, ಬಲವಾದ ಡಿಜಿಟಲ್ ಉಪಸ್ಥಿತಿಗೆ ಅರ್ಹ ಎಂದು ನಾವು ನಂಬುತ್ತೇವೆ.',
            about_p2: 'ಸಾಂಪ್ರದಾಯಿಕ ಸ್ಥಳೀಯ ಉದ್ಯಮಗಳು ಮತ್ತು ಡಿಜಿಟಲ್ ಜಗತ್ತಿನ ನಡುವಿನ ಅಂತರವನ್ನು ಕಡಿಮೆ ಮಾಡುವುದು ನಮ್ಮ ಧ್ಯೇಯ.',

            // Services
            services_title: 'ನಮ್ಮ ಸೇವೆಗಳು',
            services_subtitle: 'ಪ್ರತಿ ರೀತಿಯ ಸ್ಥಳೀಯ ವ್ಯಾಪಾರಕ್ಕಾಗಿ ಡಿಜಿಟಲ್ ಪರಿಹಾರಗಳು',
            service_website: 'ವ್ಯಾಪಾರ ವೆಬ್‌ಸೈಟ್‌ಗಳು',
            service_website_desc: 'ಮಣ್ಣು ತೆಗೆಯುವವರು, ಕಟ್ಟಡ ನಿರ್ಮಾಪಕರು, ಚಿಲ್ಲರೆ ವ್ಯಾಪಾರಿಗಳು, ಕ್ಯಾಬ್ ಸೇವೆಗಳು ಮತ್ತು ಇನ್ನೂ ಹೆಚ್ಚಿನವುಗಳಿಗಾಗಿ ಕಸ್ಟಮ್ ವೆಬ್‌ಸೈಟ್‌ಗಳು.',
            service_hosting: 'ಹೋಸ್ಟಿಂಗ್ ಬೆಂಬಲ',
            service_hosting_desc: 'ವಿಶ್ವಾಸಾರ್ಹ ಹೋಸ್ಟಿಂಗ್ ಮತ್ತು ನಿರಂತರ ನಿರ್ವಹಣೆ.',
            service_seo: 'SEO ಮತ್ತು Google ರ‍್ಯಾಂಕಿಂಗ್',
            service_seo_desc: 'Google ನಲ್ಲಿ ಕಂಡುಬನ್ನಿ. ಸ್ಥಳೀಯ ಗ್ರಾಹಕರು ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ಸುಲಭವಾಗಿ ಕಂಡುಕೊಳ್ಳಲು ನಾವು ಸೈಟ್ ಅನ್ನು ಅತ್ಯುತ್ತಮಗೊಳಿಸುತ್ತೇವೆ.',
            service_social: 'ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ನಿರ್ವಹಣೆ',
            service_social_desc: 'ನಿಮ್ಮ ಬ್ರಾಂಡ್ ನಿರ್ಮಿಸಲು ಮತ್ತು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಗ್ರಾಹಕರೊಂದಿಗೆ ತೊಡಗಿಸಿಕೊಳ್ಳಲು ನಾವು ನಿಮ್ಮ ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ಖಾತೆಗಳನ್ನು ನಿರ್ವಹಿಸುತ್ತೇವೆ.',

            // Why Us
            why_title: 'ನಮ್ಮನ್ನು ಏಕೆ ಆಯ್ಕೆ ಮಾಡಬೇಕು',

            // Contact
            contact_title: 'ಸಂಪರ್ಕಿಸಿ',
            form_name: 'ನಿಮ್ಮ ಹೆಸರು',
            form_email: 'ನಿಮ್ಮ ಇಮೇಲ್',
            form_business: 'ವ್ಯಾಪಾರ ಪ್ರಕಾರ',
            form_select: 'ನಿಮ್ಮ ವ್ಯಾಪಾರ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
            form_message: 'ನಿಮ್ಮ ಸಂದೇಶ',
            form_submit: 'ಸಂದೇಶ ಕಳುಹಿಸಿ',

            // Footer
            footer_text: '© 2026 ಮಲೆನಾಡು ವೆಬ್ಸ್. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.'
        }
    };

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('malnadwebs-lang', lang);
        document.documentElement.lang = lang === 'kn' ? 'kn' : 'en';

        // Update toggle button text
        langToggle.querySelector('span').textContent =
            lang === 'en' ? 'ಕನ್ನಡ' : 'English';

        // Update all translatable elements
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (translations[lang][key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });
    }

    // Toggle handler
    langToggle.addEventListener('click', () => {
        setLanguage(currentLang === 'en' ? 'kn' : 'en');
    });

    // Apply saved preference on load
    if (currentLang !== 'en') {
        setLanguage(currentLang);
    }
});
```

**Test cases for this phase:**

- Test case 1: Verify language toggle switches all text

  ```
  Manual test:
  1. Load page — all text should be in English
  2. Click "ಕನ್ನಡ" button in navbar
  3. Verify ALL visible text switches to Kannada (nav, hero, about, services, contact form labels)
  4. Toggle button should now read "English"
  5. Click "English" — verify all text reverts to English
  ```

- Test case 2: Verify language preference persists across page reloads

  ```
  Manual test:
  1. Switch to Kannada
  2. Reload the page (F5)
  3. Page should load in Kannada (not reset to English)
  4. Clear localStorage — page should default to English
  ```

- Test case 3: Verify HTML lang attribute updates

  ```
  Manual test:
  1. Open DevTools > Elements
  2. Check <html lang="en">
  3. Toggle to Kannada
  4. Verify <html lang="kn">
  5. This is important for accessibility and SEO
  ```

**Technical details and assumptions:**
- Translation dictionary is stored inline in `language.js` — sufficient for a single-page site with limited text
- Uses `data-lang-key` attributes on HTML elements to map to translation keys
- `localStorage` key: `malnadwebs-lang` — avoids conflicts with other sites
- Form labels switch language but form input values remain as-is (user types in whichever language they prefer)
- `<html lang>` attribute is updated for accessibility screen readers

---

### Phase 5: Assets, SEO, Favicon and Final Polish
**Files**: `index.html`, `css/styles.css`, `assets/`

Add SVG icons for services, create a favicon, add Open Graph meta tags for social sharing, add structured data (JSON-LD) for local business SEO, and perform final visual polish.

**Key code changes:**

```html
<!-- Add to <head> in index.html -->
<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">

<!-- Open Graph / Social Sharing -->
<meta property="og:title" content="Malnad Webs | Digital Solutions for Local Businesses">
<meta property="og:description" content="We digitalize local businesses in the Malnad region — websites, SEO, hosting and social media for earthmovers, builders, shops, cabs, coffee estates and more.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://YOUR_DOMAIN_HERE">
<meta property="og:image" content="https://YOUR_DOMAIN_HERE/assets/images/og-image.png">

<!-- Structured Data for Local Business SEO -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Malnad Webs",
    "description": "Digital solutions for local businesses in the Malnad region",
    "url": "https://YOUR_DOMAIN_HERE",
    "areaServed": {
        "@type": "Place",
        "name": "Malnad Region, Karnataka, India"
    },
    "serviceType": ["Web Design", "SEO", "Social Media Management", "Web Hosting"]
}
</script>
```

```svg
<!-- assets/favicon.svg - Simple leaf/web favicon -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="14" fill="#2D6A4F"/>
    <text x="16" y="21" text-anchor="middle" fill="#F5F5F0"
          font-family="sans-serif" font-size="14" font-weight="bold">M</text>
</svg>
```

```css
/* Final polish additions to styles.css */

/* Smooth font rendering */
body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Focus styles for accessibility */
a:focus-visible, button:focus-visible, input:focus-visible,
textarea:focus-visible, select:focus-visible {
    outline: 3px solid var(--light-green);
    outline-offset: 2px;
}

/* Skip to content link for accessibility */
.skip-link {
    position: absolute; top: -100%;
    left: 0; padding: 1rem;
    background: var(--dark-green); color: white;
    z-index: 9999;
}
.skip-link:focus { top: 0; }

/* Print styles */
@media print {
    .navbar, .scroll-progress, .lang-toggle { display: none; }
    .hero-section { height: auto; padding: 2rem 0; }
}
```

**Test cases for this phase:**

- Test case 1: Verify favicon displays in browser tab

  ```
  Manual test:
  1. Open index.html in browser
  2. Check browser tab shows the green "M" favicon
  3. Test in Chrome, Firefox, Edge
  ```

- Test case 2: Run Lighthouse audit for SEO and accessibility scores

  ```
  Manual test:
  1. Open Chrome DevTools > Lighthouse
  2. Run audit for Performance, Accessibility, Best Practices, SEO
  3. Target scores: Performance > 90, Accessibility > 90, SEO > 90
  4. Fix any flagged issues
  ```

- Test case 3: Verify Open Graph preview

  ```
  Manual test:
  1. Use a social media debugger (Facebook Sharing Debugger or opengraph.xyz)
  2. Enter the deployed URL
  3. Verify title, description, and image render correctly in preview
  ```

**Technical details and assumptions:**
- Using inline SVG favicon instead of .ico for modern browser support and sharp rendering
- JSON-LD structured data helps Google understand the business type for local search
- `YOUR_DOMAIN_HERE` placeholders must be replaced with actual domain before deployment
- Focus-visible styles added for keyboard accessibility compliance
- Skip-to-content link added for screen reader users

---

### Phase 6: GitHub Pages Deployment Setup
**Files**: `.github/workflows/deploy.yml`, `README.md`

Configure GitHub Pages deployment, add a README for the project, and ensure the site is live.

**Key code changes:**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

```markdown
# README.md content
# Malnad Webs

> Weaving Digital Presence for Local Businesses

A static website for Malnad Webs — a digital services company helping local businesses
in the Malnad region (Karnataka, India) establish their online presence.

## Tech Stack
- HTML5, CSS3, Vanilla JavaScript
- No frameworks or build tools
- FormSubmit.co for contact form
- GitHub Pages for hosting

## Local Development
1. Clone this repository
2. Open `index.html` in a browser (or use Live Server extension in VS Code)
3. No build step required

## Deployment
Automatically deployed to GitHub Pages on push to `main` branch.
```

**Test cases for this phase:**

- Test case 1: Verify GitHub Pages deployment works

  ```
  Manual test:
  1. Push code to main branch
  2. Go to GitHub repo > Settings > Pages
  3. Verify source is set to GitHub Actions
  4. Wait for workflow to complete
  5. Visit the deployed URL — site should load correctly
  ```

- Test case 2: Verify all assets load on deployed site

  ```
  Manual test:
  1. Open deployed URL
  2. Open DevTools > Network tab
  3. Check that CSS, JS, images, favicon all load (no 404s)
  4. Check console for any errors
  ```

- Test case 3: Test deployed site on mobile device

  ```
  Manual test:
  1. Open deployed URL on a real mobile phone
  2. Verify responsive layout, hamburger menu, touch scrolling
  3. Test language toggle
  4. Submit contact form
  ```

**Technical details and assumptions:**
- Using GitHub Actions workflow for deployment (recommended over legacy branch-based Pages)
- The workflow deploys the entire root directory since there's no build step
- `concurrency` setting prevents parallel deployments
- Repository must have GitHub Pages enabled in Settings (source: GitHub Actions)

---

## Technical Considerations

- **Dependencies**: Zero external dependencies. No npm, no build tools, no frameworks. Only external service is FormSubmit.co for the contact form.
- **Edge Cases**:
  - Users with JavaScript disabled will still see all content (CSS handles layout) but won't get animations or language toggle
  - Very old browsers (IE11) won't support CSS Grid, `backdrop-filter`, or Intersection Observer — acceptable given the target audience uses modern phones
  - FormSubmit.co free tier has a monthly submission limit — monitor usage
- **Testing Strategy**: All testing is manual (browser-based) since this is a static site with no build pipeline. Use Chrome DevTools, Lighthouse, and real device testing.
- **Performance**: No framework overhead, no build step, minimal JS. Expected Lighthouse performance score > 95. Total page weight target: under 500KB.
- **Security**:
  - FormSubmit.co honeypot field and CAPTCHA prevent spam submissions
  - No user data stored on the site itself
  - HTTPS enforced by GitHub Pages by default
  - No sensitive data in the repository

## Testing Notes
- Each phase includes its own manual test cases
- Use VS Code Live Server extension for local development testing
- Chrome DevTools device emulation for responsive testing
- Lighthouse audit after Phase 5 for performance/accessibility/SEO scoring
- Test language toggle thoroughly — ensure no English text remains after switching to Kannada

## Success Criteria
- [ ] Single-page site loads with all 5 sections (Hero, About, Services, Why Us, Contact)
- [ ] Responsive layout works on mobile (375px), tablet (768px), and desktop (1440px)
- [ ] Language toggle switches all text between English and Kannada, preference persists
- [ ] Contact form submits successfully via FormSubmit.co and email is received
- [ ] Scroll animations (fade-in, service card stagger, progress bar) work smoothly
- [ ] Lighthouse scores: Performance > 90, Accessibility > 90, SEO > 90
- [ ] Site is live and accessible on GitHub Pages
- [ ] No console errors, no broken assets, no horizontal scroll on mobile
