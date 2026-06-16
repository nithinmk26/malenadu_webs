import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

function generateParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.15,
  }));
}

export default function ParticleField({ count = 25 }) {
  const particles = useMemo(() => generateParticles(count), [count]);

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
          }}
          animate={{
            y: [0, -30 - Math.random() * 40, 10, 0],
            x: [0, 15 + Math.random() * 20, -10, 0],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity * 0.5, p.opacity],
            scale: [1, 1.3, 0.8, 1],
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
