'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Scan, Zap, TrendingUp, Shield, Eye } from 'lucide-react';

const metrics = [
  { label: 'Performance', value: 92, color: '#10b981', icon: TrendingUp },
  { label: 'SEO', value: 86, color: '#6366f1', icon: Zap },
  { label: 'UX Score', value: 90, color: '#8b5cf6', icon: Eye },
  { label: 'Security', value: 95, color: '#06b6d4', icon: Shield },
];

function HeroVisual() {
  const [scanY, setScanY] = useState(-10);
  const [activeMetric, setActiveMetric] = useState(0);

  useEffect(() => {
    let y = -10;
    let dir = 1;
    const interval = setInterval(() => {
      y += dir * 0.8;
      if (y > 110) dir = -1;
      if (y < -10) dir = 1;
      setScanY(y);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setActiveMetric(prev => (prev + 1) % metrics.length), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 520, margin: '0 auto' }} className="animate-float-slow">
      {/* Main website mockup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          background: 'rgba(13, 17, 23, 0.9)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20,
          overflow: 'hidden',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 80px rgba(99,102,241,0.1)',
          position: 'relative',
        }}
      >
        {/* Browser chrome */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {['#ef4444', '#f59e0b', '#10b981'].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.8 }} />
            ))}
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 6, padding: '4px 10px', fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6, maxWidth: 240, margin: '0 auto' }}>
            <Shield size={10} /> yourwebsite.com
          </div>
        </div>

        {/* Website content mock */}
        <div style={{ padding: 20, position: 'relative', overflow: 'hidden', minHeight: 220 }}>
          {/* Scan line */}
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: `${scanY}%`,
            height: 2,
            background: 'linear-gradient(90deg, transparent, #6366f1, #8b5cf6, transparent)',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.8)',
            zIndex: 10,
            pointerEvents: 'none',
          }} />

          {/* Mock content blocks */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ height: 14, background: 'rgba(255,255,255,0.12)', borderRadius: 4, width: '70%', marginBottom: 8 }} />
            <div style={{ height: 10, background: 'rgba(255,255,255,0.06)', borderRadius: 4, width: '90%', marginBottom: 6 }} />
            <div style={{ height: 10, background: 'rgba(255,255,255,0.06)', borderRadius: 4, width: '75%' }} />
          </div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <div style={{ height: 28, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: 6, width: 90, opacity: 0.8 }} />
            <div style={{ height: 28, background: 'rgba(255,255,255,0.06)', borderRadius: 6, width: 80 }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[80, 60, 90, 50].map((h, i) => (
              <div key={i} style={{ height: 50, background: 'rgba(255,255,255,0.04)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating metric cards */}
      {metrics.map((m, i) => {
        const positions = [
          { top: '8%', left: '-22%' },
          { top: '35%', right: '-22%' },
          { bottom: '30%', left: '-18%' },
          { bottom: '8%', right: '-18%' },
        ];
        const pos = positions[i];
        return (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
            style={{
              position: 'absolute',
              ...pos,
              background: 'rgba(13, 17, 23, 0.9)',
              backdropFilter: 'blur(16px)',
              border: `1px solid ${activeMetric === i ? m.color + '40' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 12,
              padding: '10px 14px',
              minWidth: 120,
              boxShadow: activeMetric === i ? `0 0 30px ${m.color}20` : 'none',
              transition: 'all 0.5s ease',
              zIndex: 5,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <m.icon size={12} color={m.color} />
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>{m.label}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: m.color }}>{m.value}</span>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>/100</span>
            </div>
            <div style={{ marginTop: 6, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${m.value}%` }}
                transition={{ duration: 1, delay: 1 + i * 0.2 }}
                style={{ height: '100%', background: m.color, borderRadius: 99 }}
              />
            </div>
          </motion.div>
        );
      })}

      {/* AI brain pulse */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: -20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.4), transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
    </div>
  );
}

export default function HeroSection() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: 64 }}>
      {/* Atmospheric glows */}
      <div className="glow-orb glow-orb-indigo" style={{ width: 600, height: 600, top: '-10%', left: '-15%', opacity: 0.6 }} />
      <div className="glow-orb glow-orb-violet" style={{ width: 500, height: 500, top: '20%', right: '-10%', opacity: 0.5 }} />
      <div className="glow-orb glow-orb-cyan" style={{ width: 400, height: 400, bottom: '-5%', left: '30%', opacity: 0.4 }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1, width: '100%', padding: '80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          {/* Left — Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="tag-label">
                <Zap size={12} />
                AI-Powered Website Intelligence
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontSize: 'clamp(40px, 5vw, 68px)',
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                marginBottom: 24,
              }}
            >
              Your Website Has{' '}
              <span className="gradient-text">Hidden Problems.</span>
              {' '}AI Finds Them.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}
            >
              Analyze performance, design, SEO, accessibility, and user experience with one intelligent website audit. Get actionable AI insights in seconds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}
            >
              <Link href="/scanner" className="btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>
                <Scan size={18} /> Analyze My Website
                <ArrowRight size={16} />
              </Link>
              <Link href="/report" className="btn-secondary" style={{ fontSize: 16, padding: '14px 28px' }}>
                <Play size={15} /> View AI Report Demo
              </Link>
            </motion.div>

            {/* Trust metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}
            >
              {[
                { value: '50K+', label: 'Sites Analyzed' },
                { value: '98%', label: 'Accuracy Rate' },
                { value: '<3s', label: 'Analysis Time' },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>{stat.value}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ position: 'relative' }}
            className="hero-visual-container"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .hero-visual-container { display: none; }
          .section-container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
