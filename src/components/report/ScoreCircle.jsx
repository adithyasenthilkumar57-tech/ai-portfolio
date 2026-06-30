'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function getColor(score) {
  if (score >= 85) return '#10b981';
  if (score >= 70) return '#6366f1';
  if (score >= 50) return '#f59e0b';
  return '#ef4444';
}

function getStatus(score) {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Fair';
  return 'Poor';
}

export default function ScoreCircle({ score, size = 180, label = 'Overall Score', status }) {
  const [displayScore, setDisplayScore] = useState(0);
  const radius = (size - 24) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = getColor(score);
  const offset = circumference - (displayScore / 100) * circumference;

  useEffect(() => {
    let start = null;
    const duration = 1500;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [score]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        {/* Glow */}
        <div style={{
          position: 'absolute',
          inset: '10%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
          filter: 'blur(12px)',
        }} />

        {/* SVG Ring */}
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', position: 'relative', zIndex: 1 }}>
          {/* Track */}
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={8} />
          {/* Progress */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ filter: `drop-shadow(0 0 8px ${color}60)` }}
          />
        </svg>

        {/* Center */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
          <span style={{ fontSize: size / 4.5, fontWeight: 900, color, letterSpacing: '-0.04em', lineHeight: 1 }}>
            {displayScore}
          </span>
          <span style={{ fontSize: size / 12, color: 'var(--text-muted)', marginTop: 2 }}>/100</span>
        </div>
      </div>

      {label && <div style={{ marginTop: 10, fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</div>}
      {status && (
        <div style={{ marginTop: 6, fontSize: 12, color, fontWeight: 600, background: `${color}15`, padding: '3px 10px', borderRadius: 99 }}>
          {status || getStatus(score)}
        </div>
      )}
    </div>
  );
}
