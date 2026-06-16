import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

function generateParticles(count) {
  const colors = [
    'rgba(245, 178, 40, 0.3)',  // Solar gold
    'rgba(224, 108, 51, 0.2)',  // Amber orange
    'rgba(255, 255, 255, 0.15)', // Warm white
  ];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 3, // Firefly sizes: 3px to 9px
    duration: Math.random() * 12 + 10, // Slower, calm floating durations: 10s to 22s
    delay: Math.random() * -15, // Pre-warm the loop so particles are already spread out
    opacity: Math.random() * 0.4 + 0.2,
    color: colors[Math.random() < 0.5 ? 0 : Math.random() < 0.5 ? 1 : 2],
  }));
}

export default function ParticleField({ count = 25 }) {
  const particles = useMemo(() => generateParticles(count), [count]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="particle-field">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 1.5}px ${p.color}`,
          }}
          animate={prefersReducedMotion ? undefined : {
            y: [0, -40 - Math.random() * 50, 15, 0],
            x: [0, 20 + Math.random() * 30, -15, 0],
            opacity: [p.opacity, p.opacity * 2.0, p.opacity * 0.4, p.opacity],
            scale: [1, 1.25, 0.8, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
