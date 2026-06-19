import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const translations = {
  en: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_services: 'Services',
    nav_why: 'Why Us',
    nav_contact: 'Contact',

    hero_tagline: 'Weaving Digital Presence for Local Businesses',
    hero_title: 'Bring Your Local Business Online',
    hero_subtitle: 'We help earthmovers, builders, shops, cab services, coffee estates and businesses across the Malnad region build their digital identity.',
    hero_cta: 'Get Started',

    about_title: 'About Malnad Webs',
    about_p1: 'We are a passionate team dedicated to empowering local businesses in the beautiful Malnad region. We believe every business, big or small, deserves a high-quality, professional digital identity.',
    about_p2: 'Our mission is to bridge the gap between traditional local enterprises and the modern digital world, making premium web development, SEO, and social media hosting accessible and affordable.',

    services_title: 'Our Services',
    services_subtitle: 'We create tailored digital solutions to help local businesses thrive online',
    service_website: 'Business Websites',
    service_website_desc: 'Custom-designed, responsive websites optimized for earthmovers, builders, retail shops, cab services, estates and cafes.',
    service_hosting: 'Hosting Support',
    service_hosting_desc: 'Reliable, secure server setup and ongoing technical maintenance so you never have to worry about downtime or bugs.',
    service_seo: 'SEO & Google Ranking',
    service_seo_desc: 'Get found by local customers on Google Search and Maps. We optimize your metadata to ensure high search visibility.',
    service_social: 'Social Media Management',
    service_social_desc: 'Engage with customers and build your local brand on Facebook, Instagram, and WhatsApp through professional content design.',

    why_title: 'Why Choose Us',
    why_subtitle: 'Empowering your local venture with modern digital solutions, zero tech hassle, and direct support.',
    why_card1_title: 'Malnad Roots',
    why_card1_desc: 'We are based right here in the Malnad region. We understand the specific needs of local businesses, from misty coffee estates to heavy machinery operators.',
    why_card2_title: 'Zero Tech Hassle',
    why_card2_desc: 'We handle everything from start to finish: web styling, secure server setup, custom domain mapping, SEO, and weekly updates.',
    why_card3_title: 'Fair & Transparent Pricing',
    why_card3_desc: 'No hidden charges, zero setup jargon, and no unnecessary overhead. Transparent pricing tailored specifically for regional enterprises.',
    why_card4_title: 'Support in Kannada & English',
    why_card4_desc: 'Speak directly with us in your preferred language. We are always just a phone call or a WhatsApp message away to help you.',

    contact_title: 'Get In Touch',
    contact_subtitle: 'Ready to take your business online? Drop us a line below, and we will get back to you within 24 hours.',
    form_name: 'Your Name',
    form_name_placeholder: 'Enter your full name',
    form_email: 'Your Email',
    form_email_placeholder: 'Enter your email address',
    form_business: 'Business Type',
    form_message: 'Your Message',
    form_message_placeholder: 'Tell us a bit about your business and digital goals...',
    form_submit: 'Send Message',

    option_select: 'Select your business type',
    option_earthmover: 'Earthmover / JCB / Tractors',
    option_builder: 'Builder / Construction Contractor',
    option_retail: 'Retail / Wholesale Shop',
    option_cab: 'Cab / Taxi / Travel Services',
    option_estate: 'Coffee / Spice Estate',
    option_other: 'Other Local Business',

    footer_tagline: 'Helping the heart of Karnataka go digital.',
    footer_text: '© 2026 Malnad Webs. Weaving Digital Presence. All rights reserved.',
    lang_switch: 'ಕನ್ನಡ',
  },
  kn: {
    nav_home: 'ಮುಖಪುಟ',
    nav_about: 'ನಮ್ಮ ಬಗ್ಗೆ',
    nav_services: 'ಸೇವೆಗಳು',
    nav_why: 'ನಮ್ಮನ್ನು ಏಕೆ',
    nav_contact: 'ಸಂಪರ್ಕಿಸಿ',

    hero_tagline: 'ಸ್ಥಳೀಯ ವ್ಯಾಪಾರಗಳಿಗೆ ಡಿಜಿಟಲ್ ಉಪಸ್ಥಿತಿ',
    hero_title: 'ನಿಮ್ಮ ಸ್ಥಳೀಯ ವ್ಯಾಪಾರವನ್ನು ಆನ್‌ಲೈನ್‌ಗೆ ತನ್ನಿ',
    hero_subtitle: 'ಮಣ್ಣು ತೆಗೆಯುವ ಯಂತ್ರಗಳು, ಕಟ್ಟಡ ನಿರ್ಮಾಪಕರು, ಅಂಗಡಿಗಳು, ಕ್ಯಾಬ್ ಸೇವೆಗಳು, ಕಾಫಿ ಎಸ್ಟೇಟ್‌ಗಳು ಮತ್ತು ಮಲೆನಾಡು ಪ್ರದೇಶದ ಎಲ್ಲಾ ವ್ಯಾಪಾರಗಳಿಗೆ ಡಿಜಿಟಲ್ ಗುರುತು ನಿರ್ಮಿಸಲು ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.',
    hero_cta: 'ಪ್ರಾರಂಭಿಸಿ',

    about_title: 'ಮಲೆನಾಡು ವೆಬ್ಸ್ ಬಗ್ಗೆ',
    about_p1: 'ಸುಂದರ ಮಲೆನಾಡು ಪ್ರದೇಶದ ಸ್ಥಳೀಯ ವ್ಯಾಪಾರಗಳನ್ನು ಸಬಲಗೊಳಿಸುವ ಉತ್ಸಾಹ ಹೊಂದಿರುವ ಪ್ರಾದೇಶಿಕ ತಂಡ ನಮ್ಮದು. ಪ್ರತಿಯೊಂದು ವ್ಯಾಪಾರವೂ ಒಂದು ಅತ್ಯುನ್ನತ ಗುಣಮಟ್ಟದ ಡಿಜಿಟಲ್ ಅಸ್ತಿತ್ವಕ್ಕೆ ಅರ್ಹವಾಗಿದೆ ಎಂದು ನಾವು ಬಲವಾಗಿ ನಂಬುತ್ತೇವೆ.',
    about_p2: 'ಸಾಂಪ್ರದಾಯಿಕ ಸ್ಥಳೀಯ ಉದ್ಯಮಗಳು ಮತ್ತು ಆಧುನಿಕ ಡಿಜಿಟಲ್ ಜಗತ್ತಿನ ನಡುವೆ ಸೇತುವೆಯಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುವುದು, ಅತ್ಯಂತ ಕಡಿಮೆ ಬೆಲೆಯಲ್ಲಿ ವೆಬ್‌ಸೈಟ್‌ಗಳು, ಎಸ್‌ಇಒ ಮತ್ತು ಸೋಶಿಯಲ್ ಮೀಡಿಯಾ ಸೇವೆಗಳನ್ನು ಲಭ್ಯವಾಗಿಸುವುದು ನಮ್ಮ ಉದ್ದೇಶ.',

    services_title: 'ನಮ್ಮ ಸೇವೆಗಳು',
    services_subtitle: 'ಸ್ಥಳೀಯ ಉದ್ಯಮಗಳು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಬೆಳೆಯಲು ನಾವು ಕಸ್ಟಮೈಸ್ಡ್ ಡಿಜಿಟಲ್ ಪರಿಹಾರಗಳನ್ನು ಒದಗಿಸುತ್ತೇವೆ',
    service_website: 'ವ್ಯಾಪಾರ ವೆಬ್‌ಸೈಟ್‌ಗಳು',
    service_website_desc: 'ಜೆಸಿಬಿ/ಮಣ್ಣು ಹರಡುವ ಯಂತ್ರ ಹೊಂದಿರುವವರು, ಕಟ್ಟಡ ಗುತ್ತಿಗೆದಾರರು, ಚಿಲ್ಲರೆ ಅಂಗಡಿಗಳು, ಟ್ರಾವೆಲ್ಸ್ ಮತ್ತು ಎಸ್ಟೇಟ್‌ಗಳಿಗಾಗಿ ಅತ್ಯಾಧುನಿಕ ರೆಸ್ಪಾನ್ಸಿವ್ ವೆಬ್‌ಸೈಟ್‌ಗಳು.',
    service_hosting: 'ಹೋಸ್ಟಿಂಗ್ ಮತ್ತು ತಾಂತ್ರಿಕ ಬೆಂಬಲ',
    service_hosting_desc: 'ವಿಶ್ವಾಸಾರ್ಹ ಸರ್ವರ್ ಸೆಟಪ್ ಮತ್ತು ನಿರಂತರ ನಿರ್ವಹಣೆ. ವೆಬ್‌ಸೈಟ್ ಡೌನ್‌ಟೈಮ್ ಅಥವಾ ದೋಷಗಳ ಚಿಂತೆ ನಿಮಗೆ ಇನ್ನು ಇರುವುದಿಲ್ಲ.',
    service_seo: 'SEO ಮತ್ತು ಗೂಗಲ್ ಶ್ರೇಯಾಂಕ',
    service_seo_desc: 'ಸ್ಥಳೀಯ ಗ್ರಾಹಕರು ಗೂಗಲ್ ಸರ್ಚ್ ಮತ್ತು ಮ್ಯಾಪ್ಸ್ ಮೂಲಕ ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ಸುಲಭವಾಗಿ ಕಂಡುಕೊಳ್ಳಲು ನಾವು ಸರ್ಚ್ ಆಪ್ಟಿಮೈಸೇಶನ್ ಮಾಡುತ್ತೇವೆ.',
    service_social: 'ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ನಿರ್ವಹಣೆ',
    service_social_desc: 'ನಿಮ್ಮ ಬ್ರಾಂಡ್ ಬೆಳೆಸಲು ಫೇಸ್‌ಬುಕ್, ಇನ್‌ಸ್ಟಾಗ್ರಾಮ್ ಮತ್ತು ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಆಕರ್ಷಕ ವಿಷಯಗಳನ್ನು ರಚಿಸಿ ನಿರ್ವಹಿಸುತ್ತೇವೆ.',

    why_title: 'ನಮ್ಮನ್ನು ಏಕೆ ಆಯ್ಕೆ ಮಾಡಬೇಕು',
    why_subtitle: 'ಯಾವುದೇ ತಾಂತ್ರಿಕ ತೊಂದರೆಗಳಿಲ್ಲದೆ, ಸ್ಥಳೀಯ ಸಂಸ್ಕೃತಿಗೆ ಹೊಂದುವ ಡಿಜಿಟಲ್ ಪರಿಹಾರಗಳು ಮತ್ತು ನೇರ ಗ್ರಾಹಕ ಬೆಂಬಲ.',
    why_card1_title: 'ಮಲೆನಾಡಿನ ನಂಟು',
    why_card1_desc: 'ನಾವು ನಿಮ್ಮದೇ ಮಲೆನಾಡು ಭಾಗದವರಾಗಿದ್ದು, ಸ್ಥಳೀಯ ಉದ್ಯಮಗಳು ಮತ್ತು ಕಾಫಿ-ಸಾಂಬಾರ ಬೆಳೆಗಾರರ ನಿರ್ದಿಷ್ಟ ಅಗತ್ಯಗಳನ್ನು ಚೆನ್ನಾಗಿ ಅರಿತಿದ್ದೇವೆ.',
    why_card2_title: 'ತಾಂತ್ರಿಕ ಜಂಜಾಟವಿಲ್ಲ',
    why_card2_desc: 'ವೆಬ್ ವಿನ್ಯಾಸ, ಡೊಮೇನ್ ಲಿಂಕ್ ಮಾಡುವುದು, ಹೋಸ್ಟಿಂಗ್ ಸರ್ವರ್ ಮೇಂಟೆನೆನ್ಸ್, ಎಸ್‌ಇಒ ಮತ್ತು ವೀಕ್ಲಿ ಅಪ್‌ಡೇಟ್‌ಗಳವರೆಗೆ ಪ್ರತಿಯೊಂದನ್ನೂ ನಾವೇ ನೋಡಿಕೊಳ್ಳುತ್ತೇವೆ.',
    why_card3_title: 'ಸ್ಪಷ್ಟ ಮತ್ತು ಕೈಗೆಟುಕುವ ದರಗಳು',
    why_card3_desc: 'ಯಾವುದೇ ಗುಪ್ತ ಶುಲ್ಕಗಳಿಲ್ಲ, ಕಠಿಣ ತಾಂತ್ರಿಕ ಶಬ್ದಗಳ ಗೊಂದಲವಿಲ್ಲ. ಸಣ್ಣ ಮತ್ತು ಮಧ್ಯಮ ಪ್ರಾದೇಶಿಕ ಉದ್ಯಮಗಳಿಗೆ ಸೂಕ್ತವಾಗುವ ಅತ್ಯಂತ ಪಾರದರ್ಶಕ ದರಗಳು.',
    why_card4_title: 'ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಬೆಂಬಲ',
    why_card4_desc: 'ನಿಮ್ಮ ನೆಚ್ಚಿನ ಭಾಷೆಯಲ್ಲೇ ನಮ್ಮೊಂದಿಗೆ ಮಾತನಾಡಿ. ಯಾವುದೇ ಸಹಾಯಕ್ಕೆ ನಾವು ಕೇವಲ ಒಂದು ಫೋನ್ ಕರೆ ಅಥವಾ ವಾಟ್ಸಾಪ್ ಸಂದೇಶದಷ್ಟು ಹತ್ತಿರದಲ್ಲಿದ್ದೇವೆ.',

    contact_title: 'ಸಂಪರ್ಕಿಸಿ',
    contact_subtitle: 'ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ಆನ್‌ಲೈನ್‌ಗೆ ತರಲು ಸಿದ್ಧರಿದ್ದೀರಾ? ಕೆಳಗಿನ ಫಾರಂ ಭರ್ತಿ ಮಾಡಿ, ೨೪ ಗಂಟೆಯೊಳಗೆ ನಾವು ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.',
    form_name: 'ನಿಮ್ಮ ಹೆಸರು',
    form_name_placeholder: 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ',
    form_email: 'ನಿಮ್ಮ ಇಮೇಲ್ ವಿಳಾಸ',
    form_email_placeholder: 'ನಿಮ್ಮ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ',
    form_business: 'ವ್ಯಾಪಾರದ ಪ್ರಕಾರ',
    form_message: 'ನಿಮ್ಮ ಸಂದೇಶ',
    form_message_placeholder: 'ನಿಮ್ಮ ಉದ್ಯಮದ ಅಗತ್ಯಗಳನ್ನು ಇಲ್ಲಿ ತಿಳಿಸಿ...',
    form_submit: 'ಸಂದೇಶ ಕಳುಹಿಸಿ',

    option_select: 'ನಿಮ್ಮ ವ್ಯಾಪಾರ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    option_earthmover: 'ಜೆಸಿಬಿ / ಮಣ್ಣು ತೆಗೆಯುವ ಯಂತ್ರ / ಟ್ರ್ಯಾಕ್ಟರ್',
    option_builder: 'ಕಟ್ಟಡ ನಿರ್ಮಾಪಕ / ಸಿವಿಲ್ ಗುತ್ತಿಗೆದಾರ',
    option_retail: 'ಚಿಲ್ಲರೆ / ಸಗಟು ವ್ಯಾಪಾರ ಅಂಗಡಿ',
    option_cab: 'ಕ್ಯಾಬ್ / ಟ್ಯಾಕ್ಸಿ / ಟ್ರಾವೆಲ್ಸ್ ಸರ್ವಿಸಸ್',
    option_estate: 'ಕಾಫಿ / ಸಾಂಬಾರ ಪದಾರ್ಥಗಳ ಎಸ್ಟೇಟ್',
    option_other: 'ಇತರ ಸ್ಥಳೀಯ ವ್ಯಾಪಾರ',

    footer_tagline: 'ಕರ್ನಾಟಕದ ಪ್ರಕೃತಿ ಮಡಿಲಿನ ವ್ಯಾಪಾರಗಳನ್ನು ಡಿಜಿಟಲ್ ಲೋಕಕ್ಕೆ ಕೊಂಡೊಯ್ಯುತ್ತಿದ್ದೇವೆ.',
    footer_text: '© 2026 ಮಲೆನಾಡು ವೆಬ್ಸ್. ಸ್ಥಳೀಯ ವ್ಯಾಪಾರಗಳಿಗೆ ಡಿಜಿಟಲ್ ಉಪಸ್ಥಿತಿ. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
    lang_switch: 'English',
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang === 'kn' || urlLang === 'en') {
        document.documentElement.lang = urlLang;
        return urlLang;
      }
      const localLang = localStorage.getItem('malnadwebs-lang');
      if (localLang === 'kn' || localLang === 'en') {
        document.documentElement.lang = localLang;
        return localLang;
      }
    } catch {}
    document.documentElement.lang = 'en';
    return 'en';
  });

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'en' ? 'kn' : 'en';
      try {
        localStorage.setItem('malnadwebs-lang', next);
      } catch {}
      
      // Update URL search parameters
      const url = new URL(window.location.href);
      if (next === 'kn') {
        url.searchParams.set('lang', 'kn');
      } else {
        url.searchParams.delete('lang');
      }
      window.history.pushState(null, '', url.pathname + url.search + url.hash);
      
      document.documentElement.lang = next;
      return next;
    });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      const targetLang = (urlLang === 'kn' || urlLang === 'en') ? urlLang : 'en';
      setLang(targetLang);
      document.documentElement.lang = targetLang;
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const t = useCallback(
    (key) => translations[lang]?.[key] || translations.en[key] || key,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
