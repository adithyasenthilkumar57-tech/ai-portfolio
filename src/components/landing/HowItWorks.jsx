'use client';
import { motion } from 'framer-motion';
import { Globe, Cpu, FileText, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Globe,
    step: '01',
    title: 'Enter Your Website URL',
    desc: 'Simply paste your website URL. No plugins, no code, no setup required.',
    color: '#6366f1',
  },
  {
    icon: Cpu,
    step: '02',
    title: 'AI Analyzes Everything',
    desc: 'Our AI engine scans performance, SEO, design, accessibility, and UX simultaneously.',
    color: '#8b5cf6',
  },
  {
    icon: FileText,
    step: '03',
    title: 'Get Your Intelligence Report',
    desc: 'Receive a complete ranked list of issues and prioritized AI recommendations in seconds.',
    color: '#06b6d4',
  },
];

export default function HowItWorks() {
  return (
    <section className="section-padding" style={{ position: 'relative', zIndex: 1 }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div className="tag-label" style={{ justifyContent: 'center' }}>
            <Cpu size={12} /> How It Works
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 16 }}>
            From URL to{' '}
            <span className="gradient-text-cyan">full intelligence</span>
            <br />in under 10 seconds.
          </h2>
        </motion.div>

        <div style={{ position: 'relative' }}>
          {/* Connecting line */}
          <div style={{
            position: 'absolute',
            top: 36,
            left: '16.66%',
            right: '16.66%',
            height: 1,
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)',
            opacity: 0.3,
            zIndex: 0,
          }} className="connecting-line" />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, position: 'relative', zIndex: 1 }}>
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{ textAlign: 'center' }}
              >
                {/* Icon circle */}
                <div style={{ position: 'relative', display: 'inline-flex', marginBottom: 24 }}>
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      background: `${s.color}15`,
                      border: `1px solid ${s.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <s.icon size={28} color={s.color} />
                  </motion.div>
                  <div style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: s.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 800,
                    color: 'white',
                  }}>
                    {i + 1}
                  </div>
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: 'var(--text-primary)' }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 240, margin: '0 auto' }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 700px) {
          .connecting-line { display: none; }
        }
      `}</style>
    </section>
  );
}
