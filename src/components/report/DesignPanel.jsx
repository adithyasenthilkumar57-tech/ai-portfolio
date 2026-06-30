'use client';
import GlassCard from '../ui/GlassCard';
import MetricBar from '../ui/MetricBar';
import ScoreCircle from './ScoreCircle';
import { CheckCircle2, AlertTriangle, Palette } from 'lucide-react';

export default function DesignPanel({ data }) {
  if (!data) return null;

  const metrics = [
    { label: 'Color System', value: data.colorSystem },
    { label: 'Typography', value: data.typography },
    { label: 'Spacing & Layout', value: data.spacing },
    { label: 'Visual Hierarchy', value: data.visualHierarchy },
    { label: 'Consistency', value: data.consistency },
    { label: 'Modernness', value: data.modernness },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Score + Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
        <GlassCard delay={0} style={{ padding: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ padding: 28, textAlign: 'center' }}>
            <ScoreCircle score={data.score} size={130} label="Design Score" status="" />
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12, lineHeight: 1.5 }}>
              Based on color, typography, spacing, and visual hierarchy analysis
            </p>
          </div>
        </GlassCard>

        <GlassCard delay={0.1}>
          <div style={{ padding: 28 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Palette size={17} color="#8b5cf6" /> Design Metrics
            </h3>
            {metrics.map((m, i) => (
              <MetricBar key={m.label} label={m.label} value={m.value} delay={i * 0.08} />
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Strengths and Problems */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <GlassCard delay={0.15}>
          <div style={{ padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: '#10b981', display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle2 size={16} /> Detected Strengths
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {data.strengths.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', borderRadius: 8, background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}>
                  <CheckCircle2 size={14} color="#10b981" style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        <GlassCard delay={0.2}>
          <div style={{ padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: 6 }}>
              <AlertTriangle size={16} /> Design Issues
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {data.problems.map((p, i) => {
                const color = p.severity === 'high' ? '#ef4444' : p.severity === 'medium' ? '#f59e0b' : '#6366f1';
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', borderRadius: 8, background: `${color}08`, border: `1px solid ${color}20` }}>
                    <AlertTriangle size={14} color={color} style={{ flexShrink: 0, marginTop: 1 }} />
                    <div>
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{p.issue}</span>
                      <div style={{ marginTop: 4 }}>
                        <span style={{ fontSize: 10, fontWeight: 600, color, background: `${color}15`, padding: '1px 8px', borderRadius: 99 }}>
                          {p.severity.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* AI Design Review */}
      <GlassCard delay={0.25}>
        <div style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Palette size={15} color="white" />
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>AI Design Critic Review</h3>
            <span style={{ marginLeft: 'auto', fontSize: 11, color: '#6366f1', background: 'rgba(99,102,241,0.1)', padding: '3px 10px', borderRadius: 99 }}>AI Generated</span>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            The overall design system shows{' '}
            {data.score >= 80
              ? 'strong fundamentals with a cohesive visual identity. Color usage is intentional, and typographic hierarchy is generally well-executed. A few refinements in component consistency and mobile responsiveness could elevate this to an exceptional level.'
              : data.score >= 65
              ? 'moderate design quality. While the foundational elements are present, there are noticeable inconsistencies in spacing, typography scale, and color application. The visual hierarchy needs clearer differentiation between primary and secondary content.'
              : 'significant design challenges. The current design lacks consistency and modern visual principles. A systematic redesign with clear design tokens, improved typography, and cohesive color palette would substantially improve user perception and trust.'}
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
