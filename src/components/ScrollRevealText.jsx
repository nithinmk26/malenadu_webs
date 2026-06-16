import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ScrollRevealText component
 * Achieves a premium agency-grade scroll-linked text color reveal.
 * As the user scrolls, the text highlights from a muted state to full brightness.
 */
export default function ScrollRevealText({ children, className = '', highlightColor = 'var(--text-primary)', baseColor = 'rgba(255, 255, 255, 0.18)' }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'start 0.55'], // start reveal when element is 85% down, complete by 55%
  });

  // Animate gradient from right to left (unrevealed to revealed)
  // Background-size is 200%, so position x goes from 100% (all base color) to 0% (all highlight color)
  const backgroundPositionX = useTransform(scrollYProgress, [0, 1], ['100%', '0%']);

  return (
    <motion.span
      ref={containerRef}
      className={`scroll-reveal-text ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${highlightColor} 50%, ${baseColor} 50%)`,
        backgroundSize: '200% 100%',
        backgroundPositionX,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        display: 'inline-block',
        transition: 'background-position 0.1s linear',
      }}
    >
      {children}
    </motion.span>
  );
}
