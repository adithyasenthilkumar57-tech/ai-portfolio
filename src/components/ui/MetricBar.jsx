'use client';
import { motion } from 'framer-motion';

function getScoreClass(value) {
  if (value >= 85) return { bar: 'score-bar-excellent', text: 'score-excellent' };
  if (value >= 70) return { bar: 'score-bar-good', text: 'score-good' };
  if (value >= 50) return { bar: 'score-bar-fair', text: 'score-fair' };
  return { bar: 'score-bar-poor', text: 'score-poor' };
}

export default function MetricBar({ label, value, showLabel = true, height = 6, delay = 0 }) {
  const { bar, text } = getScoreClass(value);

  return (
    <div style={{ marginBottom: '12px' }}>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{label}</span>
          <span style={{ fontSize: '13px', fontWeight: 600 }} className={text}>{value}%</span>
        </div>
      )}
      <div style={{
        height: `${height}px`,
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '99px',
        overflow: 'hidden',
      }}>
        <motion.div
          className={bar}
          style={{ height: '100%', borderRadius: '99px' }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}
