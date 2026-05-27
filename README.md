# 🌿 Malnad Webs

> "Weaving Digital Presence for Local Businesses"

A stunning, premium, single-page bilingual (English & Kannada) business website for **Malnad Webs** — a specialized digital services company helping regional enterprises in the Malnad region establish and grow their online brand.

---

## ✨ Features

- **Rich Aesthetics**: Nature-inspired, premium forest HSL color palettes with glassmorphic cards, custom shadows, and smooth HSL gradient typography.
- **Bilingual (English/Kannada)**: Instant language-switching toggle. Your selection persists across visits via `localStorage` and dynamically updates meta headers (e.g. `<html lang>`) for high SEO and accessibility compliance.
- **Scroll Animations**: Light-weight, high-performance animations utilizing the modern `IntersectionObserver` API. Elements cascade, float, and fade smoothly as they enter the viewport.
- **Responsive Layout**: Fluid layouts engineered using CSS Grid and Flexbox. Resizes gracefully on mobile (375px), tablet (768px), and desktop (1440px) screen widths without horizontal overflows.
- **Zero-Build, Pure Performance**: Handcrafted using semantic HTML5, vanilla CSS3, and modern ES6 Javascript. Zero external framework overhead (`Lighthouse performance score > 95`).
- **Secure Serverless Contacts**: Contact form submissions are routed securely via **FormSubmit.co** with anti-spam honeypot layers and captcha validation.
- **Local Business SEO**: Includes structured metadata, Open Graph (OG) social card previews, and JSON-LD schema schemas.
- **Automated Deployment**: Connected to GitHub Actions for continuous delivery straight to GitHub Pages.

---

## 📂 Project Structure

```
malenadu_webs/
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Pages automated deployment workflow
├── assets/
│   ├── favicon.svg          # Beautiful, layered leaf SVG favicon
│   └── images/
│       └── malnad_hero_bg.png # Misty forest hills custom hero banner
├── css/
│   ├── styles.css           # Core styling, HSL variables, layout, grid systems
│   └── animations.css       # Scroll trigger animations & micro-interactions
├── js/
│   ├── main.js              # Navbar shrink, mobile hamburger, smooth scrolling, active link highlighting
│   ├── animations.js        # Intersection Observer trigger-once and staggering card engines
│   └── language.js          # Bilingual dictionary & client-side translation swap engine
├── resources/
│   ├── logo1.png            # Original raw business logo file
│   └── resource.txt         # Requirements details text
├── index.html               # Main single-page HTML skeleton with semantic markup
└── README.md                # Project documentation
```

---

## 🛠️ Local Development & Testing

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/nithinmk26/malenadu_webs.git
   cd malenadu_webs
   ```
2. **Launch in Browser**:
   - Since there are no build steps, frameworks, or bundlers, you can double-click `index.html` to open it locally.
   - For the absolute best local experience (and to test language persistence), run a simple HTTP server in the root directory:
     ```bash
     # If you have Python installed
     python -m http.server 8000
     
     # If you have Node/npm installed
     npx serve
     ```
   - Open your browser and navigate to `http://localhost:8000` or `http://localhost:3000`.

---

## 🚀 Deployment

The site is configured to deploy automatically via **GitHub Actions** on every commit pushed to the `main` branch. 
To enable this:
1. Ensure your repository source for GitHub Pages is set to **GitHub Actions** in **Settings > Pages**.
2. Push your changes:
   ```bash
   git add .
   git commit -m "feat: initial implementation of Malnad Webs bilingual site"
   git push origin main
   ```
3. Monitor progress in the **Actions** tab of your repository. Once the job succeeds, your site will be live at:
   `https://nithinmk26.github.io/malenadu_webs/`
