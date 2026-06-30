'use client';
import { motion } from 'framer-motion';
import { Zap, BarChart3, Palette, Search, Accessibility, TrendingUp, Shield, Users } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const features = [
  {
    icon: TrendingUp,
    color: '#10b981',
    title: 'Performance Analysis',
    desc: 'Core Web Vitals, load speed, resource optimization, and real-world performance metrics — all analyzed instantly.',
  },
  {
    icon: Search,
    color: '#6366f1',
    title: 'Deep SEO Audit',
    desc: 'On-page SEO, meta tags, keyword opportunities, content structure, and technical SEO issues uncovered.',
  },
  {
    icon: Palette,
    color: '#8b5cf6',
    title: 'Design Intelligence',
    desc: 'AI reviews color systems, typography, spacing, visual hierarchy, and layout quality like a senior designer.',
  },
  {
    icon: Users,
    color: '#06b6d4',
    title: 'UX Evaluation',
    desc: 'Navigation patterns, conversion flows, trust factors, and user journey analysis powered by behavioral AI.',
  },
  {
    icon: Accessibility,
    color: '#f59e0b',
    title: 'Accessibility Checker',
    desc: 'WCAG compliance, color contrast, screen reader compatibility, keyboard navigation, and ARIA labels.',
  },
  {
    icon: BarChart3,
    color: '#ec4899',
    title: 'Conversion Prediction',
    desc: 'AI estimates your conversion likelihood and identifies exactly where you\'re losing potential customers.',
  },
  {
    icon: Shield,
    color: '#34d399',
    title: 'Trust & Security Score',
    desc: 'HTTPS, security headers, social proof, professional appearance — everything that makes visitors stay or leave.',
  },
  {
    icon: Zap,
    color: '#f97316',
    title: 'AI Recommendations',
    desc: 'Prioritized, actionable improvement plans. Not generic advice — specific fixes ranked by business impact.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="section-padding" style={{ position: 'relative', zIndex: 1 }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div className="tag-label" style={{ justifyContent: 'center' }}>
            <BarChart3 size={12} /> Complete Intelligence Suite
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 16 }}>
            Everything your website needs
            <br />
            <span className="gradient-text-indigo">analyzed in one report.</span>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-secondary)', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
            SiteLens AI combines 8 intelligence modules to give you the most comprehensive website analysis available.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {features.map((f, i) => (
            <GlassCard key={f.title} hover delay={i * 0.05} style={{ padding: 28 }}>
              <div style={{ padding: 28 }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `${f.color}15`,
                  border: `1px solid ${f.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}>
                  <f.icon size={20} color={f.color} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
