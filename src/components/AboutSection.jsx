import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../context/LanguageContext';
import ScrollRevealText from './ScrollRevealText';

const stats = [
  { icon: '🌿', titleKey: 'stat_regional', title: 'Regional Focus', desc: 'Estates, homestays, and agricultural retail markets.' },
  { icon: '🚜', titleKey: 'stat_local', title: 'Local Industries', desc: 'Earthmovers, builders, and transport services.' },
  { icon: '💬', titleKey: 'stat_support', title: '100% Regional Support', desc: 'Consultations and designs directly in Kannada and English.' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function AboutSection() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  
  // Intersection observer for entry animations of children
  const [inViewRef, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  // Scroll tracking for parallax effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  // Scroll-driven transforms
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const textScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);
  
  const cardOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const cardY = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 1], [150, 0, 0, -150]);
  const cardRotateX = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 1], [15, 0, 0, -15]);

  return (
    <section id="about" className="about-section" ref={sectionRef} aria-labelledby="about-heading" style={{ overflow: 'hidden', position: 'relative' }}>
      {/* Ambient Floating Blobs (Bio-luminescent forest glow) */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            style={{
              position: 'absolute',
              top: '10%',
              right: '-15%',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.04) 0%, transparent 75%)',
              filter: 'blur(80px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -50, 20, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            style={{
              position: 'absolute',
              bottom: '5%',
              left: '-10%',
              width: '350px',
              height: '350px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(var(--accent-orange-rgb), 0.03) 0%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
            animate={{
              x: [0, -20, 15, 0],
              y: [0, 30, -30, 0],
              scale: [1, 1.08, 0.95, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
        </>
      )}

      <div className="container">
        <motion.div
          ref={inViewRef}
          className="about-grid"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Text Content with scroll-driven animations */}
          <motion.div 
            className="about-text" 
            style={{ 
              opacity: prefersReducedMotion ? 1 : textOpacity, 
              y: prefersReducedMotion ? 0 : textY,
              scale: prefersReducedMotion ? 1 : textScale
            }}
          >
            <div id="about-heading">
              <ScrollRevealText className="section-title section-title-gradient">
                {t('about_title')}
              </ScrollRevealText>
            </div>
            <div className="about-title-underline" />
            <p className="about-paragraph">
              {t('about_p1')}
            </p>
            <p className="about-paragraph">
              {t('about_p2')}
            </p>
          </motion.div>

          {/* Stats Card with scroll-driven animations */}
          <motion.div
            className="stats-card"
            style={{ 
              opacity: prefersReducedMotion ? 1 : cardOpacity, 
              y: prefersReducedMotion ? 0 : cardY,
              rotateX: prefersReducedMotion ? 0 : cardRotateX
            }}
            whileHover={prefersReducedMotion ? undefined : { 
              y: -8, 
              scale: 1.02,
              rotate: 1,
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 50px rgba(var(--primary-rgb), 0.15)'
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          >
            <span className="stats-badge">
              Western Ghats Core
            </span>
            <h3>Bridging Hills with Webs</h3>

            <ul className="stats-list">
              {stats.map((stat, i) => (
                <motion.li
                  key={i}
                  className="stat-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                >
                  <motion.div
                    className="stat-icon"
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.2, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div>
                    <strong>{stat.title}</strong>
                    <p>{stat.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
