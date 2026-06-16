import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../context/LanguageContext';
import ScrollRevealText from './ScrollRevealText';

const contactDetails = [
  { icon: '📞', label: 'Phone / WhatsApp', value: '+91 9845X XXXXX' },
  { icon: '✉️', label: 'Email', value: 'hello@malnadwebs.com' },
  { icon: '📍', label: 'Location', value: 'Malnad Region, Karnataka, India' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const formVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ContactSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="container">
        <div className="section-header">
          <div id="contact-heading">
            <ScrollRevealText className="section-title section-title-gradient">
              {t('contact_title')}
            </ScrollRevealText>
          </div>
          <div className="title-underline" />
        </div>

        <motion.div
          ref={ref}
          className="contact-card"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Info Panel */}
          <motion.div className="contact-info" variants={containerVariants}>
            <motion.h3 variants={itemVariants}>
              {t('contact_title')}
            </motion.h3>
            <motion.p className="contact-info-subtitle" variants={itemVariants}>
              {t('contact_subtitle')}
            </motion.p>

            <div className="contact-detail-list">
              {contactDetails.map((detail, i) => (
                <motion.div
                  key={i}
                  className="contact-detail"
                  variants={itemVariants}
                >
                  <motion.div
                    className="contact-detail-icon"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {detail.icon}
                  </motion.div>
                  <div>
                    <strong>{detail.label}</strong>
                    <p>{detail.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form Panel */}
          <motion.div className="contact-form-panel" variants={formVariants}>
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  textAlign: 'center',
                  gap: '1rem',
                }}
              >
                <motion.div
                  style={{ fontSize: '4rem' }}
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  ✅
                </motion.div>
                <h3 style={{ fontSize: '1.8rem' }}>Thank You!</h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '350px' }}>
                  Your message has been sent. We'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form
                action="https://formsubmit.co/nithinmk26@gmail.com"
                method="POST"
                id="contactForm"
                onSubmit={() => setFormSubmitted(true)}
              >
                <input type="hidden" name="_subject" value="New Inquiry from Malnad Webs!" />
                <input type="hidden" name="_captcha" value="true" />
                <input type="hidden" name="_template" value="table" />
                <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">{t('form_name')}</label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder={t('form_name_placeholder')}
                      whileFocus={{ borderColor: 'var(--primary)' }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">{t('form_email')}</label>
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder={t('form_email_placeholder')}
                      whileFocus={{ borderColor: 'var(--primary)' }}
                    />
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="business">{t('form_business')}</label>
                    <div className="select-wrapper">
                      <select id="business" name="business_type">
                        <option value="" disabled defaultValue>{t('option_select')}</option>
                        <option value="earthmover">{t('option_earthmover')}</option>
                        <option value="builder">{t('option_builder')}</option>
                        <option value="retail">{t('option_retail')}</option>
                        <option value="cab">{t('option_cab')}</option>
                        <option value="estate">{t('option_estate')}</option>
                        <option value="other">{t('option_other')}</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="message">{t('form_message')}</label>
                    <motion.textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder={t('form_message_placeholder')}
                      whileFocus={{ borderColor: 'var(--primary)' }}
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="btn btn-primary btn-submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{t('form_submit')}</span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
