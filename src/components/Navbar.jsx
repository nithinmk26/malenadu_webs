import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const navItems = [
  { key: 'nav_home', href: '#hero' },
  { key: 'nav_about', href: '#about' },
  { key: 'nav_services', href: '#services' },
  { key: 'nav_why', href: '#why-us' },
  { key: 'nav_contact', href: '#contact' },
];

export default function Navbar() {
  const { t, toggleLang, lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navItems.map((item) => item.href.slice(1));
      let current = sections[0];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const navHeight = 80;
      const top = el.offsetTop - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
      history.pushState(null, null, href);
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
        style={{
          background: scrolled
            ? 'rgba(10, 8, 6, 0.92)'
            : 'rgba(14, 11, 9, 0.5)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(245, 178, 40, 0.12)'
            : '1px solid rgba(245, 178, 40, 0.05)',
          boxShadow: scrolled
            ? '0 10px 40px rgba(0, 0, 0, 0.5)'
            : 'none',
        }}
      >
        <div className="navbar-inner">
          <a
            href="#hero"
            className="nav-brand"
            onClick={(e) => handleNavClick(e, '#hero')}
            aria-label="Malnad Webs Homepage"
          >
            <motion.div
              className="nav-logo-icon"
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              🍃
            </motion.div>
            <span className="nav-logo-text">Malnad Webs</span>
          </a>

          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.key} style={{ position: 'relative' }}>
                <a
                  href={item.href}
                  className={`nav-link ${activeSection === item.href.slice(1) ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {t(item.key)}
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      className="nav-link-underline"
                      layoutId="nav-underline"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
            <li>
              <motion.button
                className="lang-toggle"
                onClick={toggleLang}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Switch Language"
              >
                <motion.span
                  animate={{ rotate: lang === 'kn' ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ display: 'inline-flex' }}
                >
                  🌐
                </motion.span>
                {t('lang_switch')}
              </motion.button>
            </li>
          </ul>

          <button
            className={`nav-toggle ${mobileOpen ? 'active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation"
            aria-expanded={mobileOpen}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              className="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  className={`nav-link ${activeSection === item.href.slice(1) ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  {t(item.key)}
                </motion.a>
              ))}
              <motion.button
                className="lang-toggle"
                onClick={toggleLang}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                style={{ marginTop: '1rem', justifyContent: 'center' }}
              >
                🌐 {t('lang_switch')}
              </motion.button>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
