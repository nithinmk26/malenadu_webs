import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import ParticleField from './ParticleField';

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.4 + i * 0.08,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function HeroSection() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Scale and move background image for multi-layered parallax (respecting reduced motion)
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '35%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 1.12]);
  
  // Fade out hero content and push it up as we scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, prefersReducedMotion ? 0 : -80]);

  // Fade out and translate the scroll-down indicator
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const indicatorY = useTransform(scrollYProgress, [0, 0.2], [0, prefersReducedMotion ? 0 : 20]);

  const titleWords = t('hero_title').split(' ');

  return (
    <section id="hero" className="hero-section" ref={sectionRef} aria-labelledby="hero-title">
      {/* Parallax Background */}
      <motion.div className="hero-bg" style={{ y: bgY, scale: bgScale }}>
        <img
          src="./images/malnad_hero_bg.webp"
          alt="Lush green Malnad mist hills coffee estate representing Western Ghats"
          className="hero-bg-image"
          loading="eager"
        />
        <div className="hero-overlay" />
      </motion.div>

      {/* Drifting Mist Fog Layer */}
      {!prefersReducedMotion && (
        <div className="fog-container" aria-hidden="true">
          <div className="fog-layer fog-layer-1" />
          <div className="fog-layer fog-layer-2" />
        </div>
      )}

      {/* Floating Particles */}
      <ParticleField count={22} />

      {/* Hero Content */}
      <motion.div
        className="hero-content"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Tagline */}
        <motion.p
          className="hero-tagline"
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('hero_tagline')}
        </motion.p>

        {/* Animated Title — word by word */}
        <h1 id="hero-title" className="hero-title">
          {titleWords.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              className="hero-title-word"
              custom={i}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : "hidden"}
              animate="visible"
              variants={prefersReducedMotion ? undefined : wordVariants}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="hero-subtitle"
          custom={0.9}
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : "hidden"}
          animate="visible"
          variants={prefersReducedMotion ? undefined : fadeUp}
        >
          {t('hero_subtitle')}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="hero-cta-wrapper"
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.a
            href="#contact"
            className="btn btn-primary"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>{t('hero_cta')}</span>
            {/* Pulsing glow ring */}
            {!prefersReducedMotion && (
              <motion.div
                style={{
                  position: 'absolute',
                  inset: -3,
                  borderRadius: '9999px',
                  border: '2px solid rgba(var(--primary-rgb), 0.4)',
                  pointerEvents: 'none',
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="scroll-down-mouse"
        style={{
          opacity: indicatorOpacity,
          y: indicatorY,
          position: 'absolute',
          bottom: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          pointerEvents: 'none',
        }}
      >
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-tertiary)', fontWeight: 600 }}>Scroll</span>
        <div style={{ width: '22px', height: '36px', borderRadius: '11px', border: '2px solid rgba(var(--primary-rgb), 0.4)', position: 'relative', display: 'flex', justifyContent: 'center', padding: '6px' }}>
          <motion.div
            style={{ width: '3px', height: '7px', borderRadius: '2px', backgroundColor: 'var(--primary)' }}
            animate={prefersReducedMotion ? undefined : { y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      {/* Wave Divider */}
      <div className="wave-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <motion.path
            d="M0,40 C360,100 720,20 1080,70 C1260,95 1380,50 1440,40 L1440,120 L0,120 Z"
            fill="hsl(215, 15%, 8%)"
            initial={prefersReducedMotion ? undefined : { d: 'M0,80 C360,80 720,80 1080,80 C1260,80 1380,80 1440,80 L1440,120 L0,120 Z' }}
            animate={prefersReducedMotion ? undefined : { d: 'M0,40 C360,100 720,20 1080,70 C1260,95 1380,50 1440,40 L1440,120 L0,120 Z' }}
            transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </div>
    </section>
  );
}
