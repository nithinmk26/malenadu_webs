import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../context/LanguageContext';

const footerLinks = [
  { key: 'nav_home', href: '#hero' },
  { key: 'nav_about', href: '#about' },
  { key: 'nav_services', href: '#services' },
  { key: 'nav_why', href: '#why-us' },
  { key: 'nav_contact', href: '#contact' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } },
};

export default function Footer() {
  const { t } = useLanguage();

  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <motion.footer
      className="footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container footer-inner">
        {/* Brand */}
        <motion.a
          href="#hero"
          className="footer-brand"
          onClick={(e) => handleClick(e, '#hero')}
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ type: 'spring', stiffness: 300 }}
          variants={itemVariants}
          aria-label="Malnad Webs Homepage"
        >
          <div className="footer-logo-icon">🍃</div>
          <span className="footer-logo-text">Malnad Webs</span>
        </motion.a>

        <motion.p className="footer-tagline" variants={itemVariants}>
          {t('footer_tagline')}
        </motion.p>

        {/* Navigation */}
        <ul className="footer-nav">
          {footerLinks.map((link) => (
            <motion.li key={link.key} variants={itemVariants}>
              <a href={link.href} onClick={(e) => handleClick(e, link.href)} style={{ display: 'inline-block', transition: 'color 0.3s ease' }}>
                <motion.span whileHover={{ scale: 1.1, color: 'var(--primary)' }} transition={{ type: 'spring', stiffness: 400 }}>
                  {t(link.key)}
                </motion.span>
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Animated Divider */}
        <motion.div
          className="footer-divider"
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          }}
          style={{ transformOrigin: 'center' }}
        />

        <motion.p className="footer-copyright" variants={itemVariants}>
          {t('footer_text')}
        </motion.p>
      </div>
    </motion.footer>
  );
}
