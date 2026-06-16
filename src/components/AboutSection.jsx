import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  
  // Intersection observer for entry animations of children
  const [inViewRef, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  // Scroll tracking for parallax effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Soft, eye-friendly scroll parallax motions
  const textY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const cardY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const decorativeBlobY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section id="about" className="about-section" ref={sectionRef} aria-labelledby="about-heading" style={{ overflow: 'hidden', position: 'relative' }}>
      {/* Decorative Parallax Background Blur */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.03) 0%, transparent 70%)',
          filter: 'blur(60px)',
          y: decorativeBlobY,
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        <motion.div
          ref={inViewRef}
          className="about-grid"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Text Content with upward scroll parallax */}
          <motion.div className="about-text" style={{ y: textY }}>
            <div id="about-heading">
              <ScrollRevealText className="section-title section-title-gradient">
                {t('about_title')}
              </ScrollRevealText>
            </div>
            <motion.div className="about-title-underline" variants={itemVariants} />
            <motion.p className="about-paragraph" variants={itemVariants}>
              {t('about_p1')}
            </motion.p>
            <motion.p className="about-paragraph" variants={itemVariants}>
              {t('about_p2')}
            </motion.p>
          </motion.div>

          {/* Stats Card with downward scroll parallax */}
          <motion.div
            className="stats-card"
            style={{ y: cardY }}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.span className="stats-badge" variants={itemVariants}>
              Western Ghats Core
            </motion.span>
            <motion.h3 variants={itemVariants}>Bridging Hills with Webs</motion.h3>

            <ul className="stats-list">
              {stats.map((stat, i) => (
                <motion.li
                  key={i}
                  className="stat-item"
                  variants={itemVariants}
                  custom={i}
                >
                  <motion.div
                    className="stat-icon"
                    whileHover={{ scale: 1.1, rotate: 5 }}
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
