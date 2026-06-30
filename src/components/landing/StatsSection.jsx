'use client';
import { motion } from 'framer-motion';
import AnimatedCounter from '../ui/AnimatedCounter';

const stats = [
  { value: 50000, suffix: '+', label: 'Websites Analyzed', sublabel: 'and growing daily' },
  { value: 98, suffix: '%', label: 'Accuracy Rate', sublabel: 'vs manual audits' },
  { value: 3, suffix: 's', label: 'Average Scan Time', sublabel: 'lightning fast' },
  { value: 127, suffix: '%', label: 'Avg. Improvement', sublabel: 'after applying fixes' },
];

export default function StatsSection() {
  return (
    <section style={{ position: 'relative', zIndex: 1, padding: '80px 0' }}>
      {/* Glow backdrop */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, transparent, rgba(99,102,241,0.04), transparent)',
        pointerEvents: 'none',
      }} />

      <div className="section-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 1,
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 20,
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.02)',
        }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                padding: '40px 32px',
                textAlign: 'center',
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                background: 'var(--bg-primary)',
              }}
            >
              <div style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 6 }} className="gradient-text-indigo">
                <AnimatedCounter end={s.value} suffix={s.suffix} duration={2000} />
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
