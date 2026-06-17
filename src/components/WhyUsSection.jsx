import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import ScrollRevealText from './ScrollRevealText';

const whyCards = [
  { num: '01', titleKey: 'why_card1_title', descKey: 'why_card1_desc' },
  { num: '02', titleKey: 'why_card2_title', descKey: 'why_card2_desc' },
  { num: '03', titleKey: 'why_card3_title', descKey: 'why_card3_desc' },
  { num: '04', titleKey: 'why_card4_title', descKey: 'why_card4_desc' },
];

const processSteps = [
  { titleKey: 'Consult', descKey: 'We understand your business goals' },
  { titleKey: 'Design', descKey: 'We craft a beautiful website for you' },
  { titleKey: 'Launch', descKey: 'Go live with hosting & SEO setup' },
  { titleKey: 'Grow', descKey: 'Ongoing support & growth strategy' },
];

function WhyCard({ card, index }) {
  const { t } = useLanguage();
  const cardRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 0.95', 'start 0.7'],
  });

  const slideDistance = index % 2 === 0 ? -40 : 40;
  
  const x = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? 0 : slideDistance, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? 1 : 0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? 1 : 0.93, 1]);

  const numberY = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? 0 : -25, 0]);
  const numberScale = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? 1 : 0.75, 1]);

  return (
    <motion.div
      ref={cardRef}
      className="why-card"
      style={{ x, opacity, scale }}
      whileHover={prefersReducedMotion ? undefined : { y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      <motion.div
        className="why-number"
        style={{ y: numberY, scale: numberScale }}
      >
        {card.num}
      </motion.div>
      <h3>{t(card.titleKey)}</h3>
      <p>{t(card.descKey)}</p>
    </motion.div>
  );
}

export default function WhyUsSection() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const processRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress: processScroll } = useScroll({
    target: processRef,
    offset: ['start 0.8', 'center center']
  });

  const pathLength = useTransform(processScroll, [0, 1], [0, 1]);

  return (
    <section id="why-us" className="why-section" ref={containerRef} aria-labelledby="why-heading">
      <div className="container">
        <div className="section-header">
          <div id="why-heading">
            <ScrollRevealText className="section-title section-title-gradient">
              {t('why_title')}
            </ScrollRevealText>
          </div>
          <div className="title-underline" />
          <p className="section-subtitle">{t('why_subtitle')}</p>
        </div>

        <div className="why-grid" style={{ marginBottom: '6rem' }}>
          {whyCards.map((card, i) => (
            <WhyCard key={card.num} card={card} index={i} />
          ))}
        </div>

        {/* Animated Process Timeline */}
        <div className="process-section" ref={processRef} style={{ position: 'relative', marginTop: '4rem' }}>
          <div className="section-header" style={{ marginBottom: '3rem' }}>
            <h2 className="section-title" style={{ fontSize: '2.5rem' }}>How It Works</h2>
            <div className="title-underline" style={{ width: '60px' }} />
          </div>

          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
            {/* SVG Connector Line */}
            {!prefersReducedMotion && (
              <svg style={{ position: 'absolute', top: '24px', left: '5%', width: '90%', height: '4px', zIndex: 0 }} preserveAspectRatio="none">
                <line x1="0" y1="2" x2="100%" y2="2" stroke="rgba(245, 178, 40, 0.2)" strokeWidth="4" strokeDasharray="8 8" />
                <motion.line 
                  x1="0" y1="2" x2="100%" y2="2" 
                  stroke="var(--primary)" 
                  strokeWidth="4" 
                  style={{ pathLength }} 
                />
              </svg>
            )}

            {processSteps.map((step, i) => (
              <motion.div 
                key={step.titleKey}
                style={{ flex: '1 1 200px', textAlign: 'center', zIndex: 1, position: 'relative' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.2, type: 'spring', stiffness: 100 }}
              >
                <motion.div 
                  style={{ 
                    width: '48px', height: '48px', borderRadius: '50%', 
                    background: 'linear-gradient(135deg, var(--primary), var(--accent-orange))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.5rem', fontWeight: 'bold', color: 'var(--bg-darker)',
                    boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.4)'
                  }}
                  whileHover={{ scale: 1.15, rotate: 10 }}
                >
                  0{i + 1}
                </motion.div>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>{step.titleKey}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{step.descKey}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
