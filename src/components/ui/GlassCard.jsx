'use client';
import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  hover = false,
  glow = false,
  onClick,
  delay = 0,
  animate = true,
}) {
  const glowStyle = glow
    ? { boxShadow: '0 0 40px rgba(99, 102, 241, 0.08), inset 0 1px 0 rgba(255,255,255,0.05)' }
    : {};

  const baseClass = `glass ${hover ? 'glass-hover' : ''} ${className}`;

  if (animate) {
    return (
      <motion.div
        className={baseClass}
        style={glowStyle}
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={hover ? { y: -4, boxShadow: '0 24px 60px rgba(99, 102, 241, 0.12)' } : {}}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseClass} style={glowStyle} onClick={onClick}>
      {children}
    </div>
  );
}
