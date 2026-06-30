'use client';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import GlassCard from '../ui/GlassCard';
import MetricBar from '../ui/MetricBar';
import ScoreCircle from './ScoreCircle';
import { Accessibility, AlertCircle } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: 'rgba(13,17,23,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px' }}>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{label}</p>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#f59e0b' }}>{payload[0]?.value}%</p>
      </div>
    );
  }
  return null;
};

function getBarColor(value) {
  if (value >= 85) return '#10b981';
  if (value >= 70) return '#6366f1';
  if (value >= 50) return '#f59e0b';
  return '#ef4444';
}

export default function AccessibilityPanel({ data }) {
  if (!data) return null;

  const wcagLevel = data.score >= 85 ? 'AA' : data.score >= 65 ? 'Partial AA' : 'A';
  const wcagColor = data.score >= 85 ? '#10b981' : data.score >= 65 ? '#f59e0b' : '#ef4444';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
        <GlassCard delay={0} style={{ padding: 28 }}>
          <div style={{ padding: 28, textAlign: 'center' }}>
            <ScoreCircle score={data.score} size={120} label="Accessibility" status="" />
            <div style={{ marginTop: 16, padding: '10px 16px', borderRadius: 10, background: `${wcagColor}10`, border: `1px solid ${wcagColor}25` }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>WCAG Compliance</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: wcagColor }}>{wcagLevel}</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard delay={0.1}>
          <div style={{ padding: 28 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Accessibility size={17} color="#f59e0b" /> Accessibility Scores
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data.chartData} layout="vertical" barSize={16}>
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }} width={100} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {data.chartData.map((entry, index) => (
                    <Cell key={index} fill={getBarColor(entry.value)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Detail metrics */}
      <GlassCard delay={0.15}>
        <div style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Detailed Accessibility Metrics</h3>
          {[
            { label: 'Color Contrast Ratio', value: data.colorContrast },
            { label: 'Alternative Text Coverage', value: data.altText },
            { label: 'Keyboard Navigation', value: data.keyboardNav },
            { label: 'ARIA Labels', value: data.ariaLabels },
            { label: 'Focus Management', value: data.focusManagement },
          ].map((m, i) => (
            <MetricBar key={m.label} label={m.label} value={m.value} delay={i * 0.08} />
          ))}
        </div>
      </GlassCard>

      {/* WCAG info */}
      <GlassCard delay={0.2}>
        <div style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <AlertCircle size={16} color="#f59e0b" />
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Accessibility Impact</h3>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {data.score >= 80
              ? 'Your website is largely accessible to users with disabilities. Screen reader compatibility and keyboard navigation are functioning well. Focus on ARIA improvements to reach full WCAG AA compliance.'
              : data.score >= 60
              ? 'Your website has partial accessibility support but fails in key areas. Users relying on screen readers or keyboard navigation may face significant barriers. Addressing color contrast and ARIA labels should be the priority.'
              : 'Your website has significant accessibility gaps that prevent many users with disabilities from using it effectively. This also creates legal risk in several jurisdictions. Immediate remediation is strongly recommended.'}
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 10 }}>
            💡 Accessibility improvements also positively impact SEO — search engines favor accessible websites.
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
