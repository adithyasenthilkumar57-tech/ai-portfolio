'use client';
import GlassCard from '../ui/GlassCard';
import MetricBar from '../ui/MetricBar';
import ScoreCircle from './ScoreCircle';
import { User, MessageSquare, Smartphone, Shield, TrendingUp, AlertCircle } from 'lucide-react';

export default function UXPanel({ data }) {
  if (!data) return null;

  const metrics = [
    { label: 'Navigation Clarity', value: data.navigation, icon: TrendingUp },
    { label: 'Readability', value: data.readability, icon: MessageSquare },
    { label: 'CTA Effectiveness', value: data.cta, icon: TrendingUp },
    { label: 'Trust Factors', value: data.trustFactors, icon: Shield },
    { label: 'Mobile Experience', value: data.mobileExp, icon: Smartphone },
    { label: 'Conversion Flow', value: data.conversionFlow, icon: TrendingUp },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
        <GlassCard delay={0} style={{ padding: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ padding: 28, textAlign: 'center' }}>
            <ScoreCircle score={data.score} size={130} label="UX Score" status="" />
          </div>
        </GlassCard>

        <GlassCard delay={0.1}>
          <div style={{ padding: 28 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <User size={17} color="#06b6d4" /> UX Dimensions
            </h3>
            {metrics.map((m, i) => (
              <MetricBar key={m.label} label={m.label} value={m.value} delay={i * 0.08} />
            ))}
          </div>
        </GlassCard>
      </div>

      {/* AI UX Review */}
      <GlassCard delay={0.15}>
        <div style={{ padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertCircle size={16} color="#06b6d4" />
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>AI UX Review</h3>
            <span style={{ marginLeft: 'auto', fontSize: 11, color: '#06b6d4', background: 'rgba(6,182,212,0.1)', padding: '3px 10px', borderRadius: 99 }}>AI Generated</span>
          </div>
          <div style={{ background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.15)', borderRadius: 12, padding: '16px 20px' }}>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75 }}>"{data.review}"</p>
          </div>
        </div>
      </GlassCard>

      {/* UX Score breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
        {[
          { label: 'First Impression', value: Math.round(data.score * 0.95), color: '#6366f1', desc: 'Above the fold impact' },
          { label: 'Navigation', value: data.navigation, color: '#8b5cf6', desc: 'Ease of navigation' },
          { label: 'Trust Signals', value: data.trustFactors, color: '#06b6d4', desc: 'Credibility elements' },
          { label: 'Mobile UX', value: data.mobileExp, color: '#10b981', desc: 'Mobile experience quality' },
        ].map(item => (
          <GlassCard key={item.label} delay={0.2} hover>
            <div style={{ padding: 18, textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: item.color, marginBottom: 4 }}>{item.value}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.desc}</div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
