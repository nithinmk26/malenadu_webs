/* ============================================================
   MALNAD WEBS — app.js
   Particle Canvas · Scroll Reveal · Navbar · Lang Toggle · WhatsApp Form
   ============================================================ */

(function () {
  'use strict';

  /* ── CONFIG (loaded from config.json) ─────────────────────── */
  let CFG = null;
  let currentLang = localStorage.getItem('malnadwebs-lang') || 'en';

  async function loadConfig() {
    try {
      const res = await fetch('config.json');
      CFG = await res.json();
    } catch (e) {
      CFG = null;
    }
    init();
  }

  /* ── INIT ─────────────────────────────────────────────────── */
  function init() {
    initNavbar();
    initHamburger();
    initParticles();
    initScrollReveal();
    initLangToggle();
    initStatCounters();
    initContactForm();
    initActiveNavLinks();
    initTestimonials();
    initFaq();
    applyWhatsAppLinks();
    if (currentLang === 'kn') applyLang('kn');
  }

  /* ── WHATSAPP LINKS ───────────────────────────────────────── */
  function applyWhatsAppLinks() {
    if (!CFG) return;
    const wa = CFG.company.whatsapp;
    const msg = encodeURIComponent(CFG.company.whatsapp_default_message);
    const url = `https://wa.me/${wa}?text=${msg}`;

    document.querySelectorAll('#waLink, #waIconLink, #fabWa, #waFooterLink').forEach(el => {
      if (el.tagName === 'A') {
        if (el.id === 'waLink' || el.id === 'waFooterLink') {
          el.href = `https://wa.me/${wa}`;
          el.textContent = CFG.company.phone;
        } else {
          el.href = url;
        }
      }
    });
  }

  /* ── NAVBAR SCROLL ────────────────────────────────────────── */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── HAMBURGER ────────────────────────────────────────────── */
  function initHamburger() {
    const btn = document.getElementById('hamburger');
    const links = document.getElementById('navLinks');
    btn.addEventListener('click', () => {
      btn.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        btn.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  /* ── ACTIVE NAV LINKS (IntersectionObserver) ──────────────── */
  function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(s => observer.observe(s));
  }

  /* ── SCROLL REVEAL ────────────────────────────────────────── */
  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => observer.observe(el));
  }

  /* ── STAT COUNTERS ────────────────────────────────────────── */
  function initStatCounters() {
    const counters = document.querySelectorAll('.stat-value[data-target]');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1500;
    const start = performance.now();
    const easeOut = t => 1 - Math.pow(1 - t, 3);

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      el.textContent = Math.floor(easeOut(progress) * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  /* ── LANGUAGE TOGGLE ──────────────────────────────────────── */
  function initLangToggle() {
    const btn = document.getElementById('langToggle');
    const label = document.getElementById('langLabel');

    btn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'kn' : 'en';
      localStorage.setItem('malnadwebs-lang', currentLang);
      label.textContent = currentLang === 'en' ? 'ಕನ್ನಡ' : 'English';
      applyLang(currentLang);
    });
  }

  function applyLang(lang) {
    const label = document.getElementById('langLabel');
    if (label) label.textContent = lang === 'en' ? 'ಕನ್ನಡ' : 'English';

    /* Text nodes: data-lang-en / data-lang-kn */
    document.querySelectorAll('[data-lang-en]').forEach(el => {
      const text = el.getAttribute(`data-lang-${lang}`);
      if (!text) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else if (el.dataset.langEn && el.dataset.langEn.includes('<')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    });

    /* Placeholders: data-ph-en / data-ph-kn */
    document.querySelectorAll('[data-ph-en]').forEach(el => {
      const ph = el.getAttribute(`data-ph-${lang}`);
      if (ph) el.placeholder = ph;
    });

    /* Select options */
    document.querySelectorAll('select option[data-lang-en]').forEach(opt => {
      const text = opt.getAttribute(`data-lang-${lang}`);
      if (text) opt.textContent = text;
    });

    /* Hero title special case (contains HTML) */
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      const enHtml = 'Bring Your Local<br/>Business <span class="accent-text">Online</span>';
      const knHtml = 'ನಿಮ್ಮ ಸ್ಥಳೀಯ ವ್ಯಾಪಾರವನ್ನು<br/><span class="accent-text">ಆನ್‌ಲೈನ್‌ಗೆ</span> ತನ್ನಿ';
      heroTitle.innerHTML = lang === 'en' ? enHtml : knHtml;
    }

    document.documentElement.lang = lang === 'kn' ? 'kn' : 'en';
  }

  /* ── WHATSAPP CONTACT FORM ────────────────────────────────── */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      const name = document.getElementById('formName').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const business = document.getElementById('formBusiness').value;
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !phone) {
        shakeForm(form);
        return;
      }

      const waNumber = (CFG && CFG.company.whatsapp) ? CFG.company.whatsapp : '91XXXXXXXXXX';

      const lines = [
        `👋 *New Enquiry – Malnad Webs*`,
        ``,
        `*Name:* ${name}`,
        `*Phone:* ${phone}`,
        business ? `*Business Type:* ${business}` : '',
        message ? `*Message:* ${message}` : '',
      ].filter(l => l !== '').join('\n');

      const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(lines)}`;
      window.open(url, '_blank', 'noopener,noreferrer');

      showFormSuccess(form);
    });
  }

  function shakeForm(form) {
    form.style.animation = 'none';
    form.offsetHeight; // reflow
    form.style.animation = 'shake 0.4s ease';
    setTimeout(() => form.style.animation = '', 500);
  }

  function showFormSuccess(form) {
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<span>✅ Opening WhatsApp…</span>';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
    }, 3000);
  }

  /* ── PARTICLE CANVAS ──────────────────────────────────────── */
  function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, particles;
    const COUNT = Math.min(140, Math.floor((window.innerWidth * window.innerHeight) / 8000));
    const COLORS = ['rgba(251,146,60,', 'rgba(251,191,36,', 'rgba(234,88,12,'];

    const heroEl = canvas.closest('section') || canvas.parentElement;
    function resize() {
      W = canvas.width = heroEl.offsetWidth;
      H = canvas.height = heroEl.offsetHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    }

    function initParticlesList() {
      particles = Array.from({ length: COUNT }, createParticle);
    }

    function drawLine(a, b) {
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 140) return;
      const alpha = (1 - dist / 140) * 0.15;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(251,146,60,${alpha})`;
      ctx.lineWidth = 0.5;
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    let raf;
    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          drawLine(p, particles[j]);
        }
      }
      raf = requestAnimationFrame(draw);
    }

    const resizeObs = new ResizeObserver(() => {
      resize();
      initParticlesList();
    });
    resizeObs.observe(heroEl);

    resize();
    initParticlesList();
    draw();

    /* Pause when hero not visible */
    const heroSection = document.getElementById('home');
    const visObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (!raf) draw();
      } else {
        cancelAnimationFrame(raf);
        raf = null;
      }
    }, { threshold: 0 });
    visObs.observe(heroSection);
  }

  /* ── TESTIMONIALS ─────────────────────────────────────────── */
  function initTestimonials() {
    const track = document.getElementById('testimonialsTrack');
    const dotsWrap = document.getElementById('testimonialsDots');
    if (!track || !dotsWrap) return;

    const cards = Array.from(track.querySelectorAll('.tcard'));
    if (!cards.length) return;

    /* Stagger-reveal cards on intersection */
    const revealObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        cards.forEach((c, i) => {
          setTimeout(() => c.classList.add('revealed'), i * 100);
        });
        revealObs.disconnect();
      }
    }, { threshold: 0.15 });
    revealObs.observe(track);

    /* Mobile dot-slider: only activate when single-column */
    function buildDots() {
      dotsWrap.innerHTML = '';
      const cols = getComputedStyle(track).gridTemplateColumns.split(' ').length;
      if (cols > 1) return; /* grid handles it, no dots needed */

      cards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'tdot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Review ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      });
    }

    let current = 0;
    function goTo(idx) {
      current = idx;
      const cardW = cards[0].offsetWidth + 24;
      track.style.transform = `translateX(-${idx * cardW}px)`;
      dotsWrap.querySelectorAll('.tdot').forEach((d, i) => {
        d.classList.toggle('active', i === idx);
      });
    }

    buildDots();
    window.addEventListener('resize', buildDots, { passive: true });
  }

  /* ── FAQ ACCORDION ────────────────────────────────────────── */
  function initFaq() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
      const btn = item.querySelector('.faq-q');
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        /* close all */
        items.forEach(i => i.classList.remove('open'));
        btn.setAttribute('aria-expanded', 'false');
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ── SHAKE ANIMATION (CSS injected) ──────────────────────── */
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%,100%{transform:translateX(0)}
      20%{transform:translateX(-8px)}
      40%{transform:translateX(8px)}
      60%{transform:translateX(-5px)}
      80%{transform:translateX(5px)}
    }
  `;
  document.head.appendChild(shakeStyle);

  /* ── BOOT ─────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadConfig);
  } else {
    loadConfig();
  }

})();
