import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import ScrollRevealText from './ScrollRevealText';

const whyCards = [
  { num: '01', titleKey: 'why_card1_title', descKey: 'why_card1_desc' },
  { num: '02', titleKey: 'why_card2_title', descKey: 'why_card2_desc' },
  { num: '03', titleKey: 'why_card3_title', descKey: 'why_card3_desc' },
  { num: '04', titleKey: 'why_card4_title', descKey: 'why_card4_desc' },
];

function WhyCard({ card, index }) {
  const { t } = useLanguage();
  const cardRef = useRef(null);

  // Track scroll position for each card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 0.95', 'start 0.7'], // Starts reveal at 95% screen height, fully in at 70%
  });

  // Alternating entry slide values (left / right)
  const slideDistance = index % 2 === 0 ? -40 : 40;
  
  const x = useTransform(scrollYProgress, [0, 1], [slideDistance, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.93, 1]);

  // Watermark number scroll parallax
  const numberY = useTransform(scrollYProgress, [0, 1], [-25, 0]);
  const numberScale = useTransform(scrollYProgress, [0, 1], [0.75, 1]);

  return (
    <motion.div
      ref={cardRef}
      className="why-card"
      style={{ x, opacity, scale }}
      whileHover={{ y: -8 }}
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

        <div className="why-grid">
          {whyCards.map((card, i) => (
            <WhyCard key={card.num} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
