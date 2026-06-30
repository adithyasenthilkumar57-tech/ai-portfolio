'use client';
import GlassCard from '../ui/GlassCard';
import MetricBar from '../ui/MetricBar';
import ScoreCircle from './ScoreCircle';
import { TrendingUp, TrendingDown, Users, Star, ShoppingCart, Target } from 'lucide-react';

export default function ConversionPanel({ data }) {
  if (!data) return null;

  const prediction = data.conversionPrediction;
  const benchmarkConv = 3.5;
  const diff = (prediction - benchmarkConv).toFixed(1);
  const isAbove = prediction >= benchmarkConv;

  const metrics = [
    { label: 'CTA Visibility', value: data.ctaVisibility, icon: Target },
    { label: 'Form Usability', value: data.formUsability, icon: ShoppingCart },
    { label: 'Social Proof', value: data.socialProof, icon: Star },
    { label: 'Urgency Elements', value: data.urgencyElements, icon: TrendingUp },
    { label: 'Value Proposition', value: data.valueProposition, icon: Users },
    { label: 'Trust Signals', value: data.trustSignals, icon: Star },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <GlassCard delay={0} style={{ padding: 28, textAlign: 'center' }}>
          <div style={{ padding: 28 }}>
            <ScoreCircle score={data.score} size={120} label="Conversion Score" status="" />
          </div>
        </GlassCard>

        {/* Conversion Prediction */}
        <GlassCard delay={0.1} style={{ padding: 28 }}>
          <div style={{ padding: 28 }}>
            <h3 style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500, marginBottom: 10 }}>AI Conversion Prediction</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 48, fontWeight: 900, color: isAbove ? '#10b981' : '#f59e0b', letterSpacing: '-0.04em' }}>{prediction}%</span>
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>est. CVR</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
              {isAbove ? <TrendingUp size={14} color="#10b981" /> : <TrendingDown size={14} color="#f59e0b" />}
              <span style={{ fontSize: 13, color: isAbove ? '#10b981' : '#f59e0b', fontWeight: 500 }}>
                {isAbove ? '+' : ''}{diff}% vs {benchmarkConv}% benchmark
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {prediction >= benchmarkConv
                ? 'Your estimated conversion rate is above industry average. Targeted optimization could push it even higher.'
                : 'Your conversion rate is below industry average. Addressing CTA placement and trust signals could significantly improve this.'}
            </p>
          </div>
        </GlassCard>
      </div>

      <GlassCard delay={0.15}>
        <div style={{ padding: 28 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Target size={17} color="#ec4899" /> Conversion Optimization Metrics
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {metrics.map((m, i) => (
              <div key={m.label}>
                <MetricBar label={m.label} value={m.value} delay={i * 0.07} />
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Quick wins */}
      <GlassCard delay={0.2}>
        <div style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>⚡ Quick Conversion Wins</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { action: 'Add urgency to primary CTA ("Limited spots remaining")', impact: '+8-12% CVR' },
              { action: 'Place customer count/social proof above the fold', impact: '+6-15% CVR' },
              { action: 'Remove friction from signup/checkout flow', impact: '+10-20% CVR' },
              { action: 'Add money-back guarantee badge near CTA', impact: '+5-8% CVR' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderRadius: 10, background: 'rgba(236,72,153,0.05)', border: '1px solid rgba(236,72,153,0.12)' }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.action}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#10b981', marginLeft: 16, flexShrink: 0 }}>{item.impact}</span>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
