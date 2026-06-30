import { useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { HiOutlineComputerDesktop, HiOutlineServerStack, HiOutlineMagnifyingGlass, HiOutlineShare, HiOutlineEnvelopeOpen } from 'react-icons/hi2';
import ScrollRevealText from './ScrollRevealText';

const services = [
  { titleKey: 'service_website', descKey: 'service_website_desc', Icon: HiOutlineComputerDesktop },
  { titleKey: 'service_hosting', descKey: 'service_hosting_desc', Icon: HiOutlineServerStack },
  { titleKey: 'service_seo', descKey: 'service_seo_desc', Icon: HiOutlineMagnifyingGlass },
  { titleKey: 'service_social', descKey: 'service_social_desc', Icon: HiOutlineShare },
  { titleKey: 'service_einvitation', descKey: 'service_einvitation_desc', Icon: HiOutlineEnvelopeOpen },
];

function ServiceCard({ service, index }) {
  const { t } = useLanguage();
  const cardRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Mouse-tracking glow coordinates
  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  }, []);

  // Scroll tracking for each individual service card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 0.95', 'start 0.65'], // starts when top of card is 95% down, fully visible by 65%
  });

  // Map scroll progress to scale, y-translation, and opacity (checking prefersReducedMotion)
  const scale = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? 1 : 0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? 0 : 40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? 1 : 0, 1]);

  return (
    <motion.div
      ref={cardRef}
      className="service-card"
      style={{ scale, y, opacity }}
      onMouseMove={handleMouseMove}
      whileHover={prefersReducedMotion ? undefined : { y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      <motion.div
        className="service-icon-wrapper"
        whileHover={prefersReducedMotion ? undefined : { scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        <service.Icon size={32} />
      </motion.div>
      <h3>{t(service.titleKey)}</h3>
      <p>{t(service.descKey)}</p>
    </motion.div>
  );
}

export default function ServicesSection() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="services" className="services-section" ref={containerRef} aria-labelledby="services-heading" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Decorative Parallax Background Blur (Bio-luminescent floating moss) */}
      {!prefersReducedMotion && (
        <motion.div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '-10%',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.03) 0%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
          animate={{
            x: [0, 30, -15, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      <div className="container">
        <div className="section-header">
          <h2 id="services-heading" className="section-title-wrapper">
            <ScrollRevealText className="section-title section-title-gradient">
              {t('services_title')}
            </ScrollRevealText>
          </h2>
          <div className="title-underline" />
          <p className="section-subtitle">{t('services_subtitle')}</p>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <ServiceCard key={service.titleKey} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
