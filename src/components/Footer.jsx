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

export default function Footer() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

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
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="container footer-inner">
        {/* Brand */}
        <motion.a
          href="#hero"
          className="footer-brand"
          onClick={(e) => handleClick(e, '#hero')}
          whileHover={{ scale: 1.03 }}
          aria-label="Malnad Webs Homepage"
        >
          <div className="footer-logo-icon">🍃</div>
          <span className="footer-logo-text">Malnad Webs</span>
        </motion.a>

        <motion.p
          className="footer-tagline"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 0.8, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {t('footer_tagline')}
        </motion.p>

        {/* Navigation */}
        <ul className="footer-nav">
          {footerLinks.map((link, i) => (
            <motion.li
              key={link.key}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i + 0.3, duration: 0.4 }}
            >
              <a href={link.href} onClick={(e) => handleClick(e, link.href)}>
                {t(link.key)}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Animated Divider */}
        <motion.div
          className="footer-divider"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'center' }}
        />

        <motion.p
          className="footer-copyright"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {t('footer_text')}
        </motion.p>
      </div>
    </motion.footer>
  );
}
