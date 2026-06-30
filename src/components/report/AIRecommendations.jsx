'use client';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';
import { Lightbulb, ArrowRight, CheckCircle2, TrendingUp, Target, AlertTriangle } from 'lucide-react';

const CATEGORY_ICONS = {
  Performance: TrendingUp,
  SEO: Target,
  Design: Lightbulb,
  Conversion: TrendingUp,
  Accessibility: CheckCircle2,
  UX: Target,
  Trust: CheckCircle2,
  Mobile: AlertTriangle,
};

const CATEGORY_COLORS = {
  Performance: '#10b981',
  SEO: '#6366f1',
  Design: '#8b5cf6',
  Conversion: '#ec4899',
  Accessibility: '#f59e0b',
  UX: '#06b6d4',
  Trust: '#34d399',
  Mobile: '#f97316',
};

export default function AIRecommendations({ recommendations = [] }) {
  const high = recommendations.filter(r => r.priority === 'high');
  const medium = recommendations.filter(r => r.priority === 'medium');
  const low = recommendations.filter(r => r.priority === 'low');

  const groups = [
    { label: 'High Priority', items: high, color: '#ef4444', desc: 'Fix these first — biggest business impact' },
    { label: 'Medium Priority', items: medium, color: '#f59e0b', desc: 'Important improvements for growth' },
    { label: 'Low Priority', items: low, color: '#10b981', desc: 'Optimizations and polish' },
  ].filter(g => g.items.length > 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Header */}
      <div style={{ padding: '20px 24px', borderRadius: 16, background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.06))', border: '1px solid rgba(99,102,241,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Lightbulb size={18} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 800 }}>AI Improvement Recommendations</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{recommendations.length} prioritized actions ranked by business impact</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {[
            { label: 'High Priority', count: high.length, color: '#ef4444' },
            { label: 'Medium', count: medium.length, color: '#f59e0b' },
            { label: 'Low', count: low.length, color: '#10b981' },
          ].map(b => (
            <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: b.color, display: 'inline-block' }} />
              {b.count} {b.label}
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation groups */}
      {groups.map(group => (
        <div key={group.label}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: group.color, flexShrink: 0 }} />
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>{group.label}</h3>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>— {group.desc}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {group.items.map((rec, i) => {
              const Icon = CATEGORY_ICONS[rec.category] || Lightbulb;
              const color = CATEGORY_COLORS[rec.category] || '#6366f1';

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="glass"
                  style={{ padding: 24, borderRadius: 16 }}
                >
                  {/* Header row */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 8, background: `${color}15`, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={16} color={color} />
                      </div>
                      <div>
                        <span style={{ fontSize: 11, color, fontWeight: 600, display: 'block', marginBottom: 2 }}>{rec.category}</span>
                        <Badge priority={rec.priority} />
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)', padding: '4px 10px', borderRadius: 99, flexShrink: 0 }}>
                      Effort: {rec.effort}
                    </div>
                  </div>

                  {/* Problem */}
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#ef4444', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>⚠ Problem</div>
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{rec.problem}</p>
                  </div>

                  {/* Divider */}
                  <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', margin: '12px 0' }} />

                  {/* Solution */}
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#10b981', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>✓ AI Recommendation</div>
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{rec.solution}</p>
                  </div>

                  {/* Impact */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.12)' }}>
                    <TrendingUp size={13} color="#10b981" />
                    <span style={{ fontSize: 13, color: '#10b981', fontWeight: 500 }}>{rec.impact}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
