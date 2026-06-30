'use client';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis
} from 'recharts';
import GlassCard from '../ui/GlassCard';
import MetricBar from '../ui/MetricBar';
import ScoreCircle from './ScoreCircle';
import { TrendingUp, Smartphone, Monitor, Zap, AlertCircle, CheckCircle2 } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: 'rgba(13,17,23,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px', backdropFilter: 'blur(16px)' }}>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{label}</p>
        {payload.map(p => (
          <p key={p.name} style={{ fontSize: 13, fontWeight: 600, color: p.color }}>{p.name}: {p.value}{p.name === 'Score' ? '' : ''}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function PerformancePanel({ data }) {
  if (!data) return null;

  const vitals = [
    { label: 'LCP', value: data.lcp, unit: 's', good: data.lcp <= 2.5, warning: data.lcp <= 4.0, desc: 'Largest Contentful Paint' },
    { label: 'FID', value: data.fid, unit: 'ms', good: data.fid <= 100, warning: data.fid <= 300, desc: 'First Input Delay' },
    { label: 'CLS', value: data.cls, unit: '', good: data.cls <= 0.1, warning: data.cls <= 0.25, desc: 'Cumulative Layout Shift' },
    { label: 'FCP', value: data.fcp, unit: 's', good: data.fcp <= 1.8, warning: data.fcp <= 3.0, desc: 'First Contentful Paint' },
    { label: 'TTFB', value: data.ttfb, unit: 'ms', good: data.ttfb <= 200, warning: data.ttfb <= 500, desc: 'Time To First Byte' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
        {/* Score */}
        <GlassCard delay={0} style={{ padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ padding: 28, textAlign: 'center' }}>
            <ScoreCircle score={data.score} size={120} label="Performance" status="" />
          </div>
        </GlassCard>

        {/* Mobile / Desktop */}
        <GlassCard delay={0.1} style={{ padding: 24 }}>
          <div style={{ padding: 24 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 20 }}>Device Performance</h3>
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Smartphone size={14} color="var(--text-muted)" />
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Mobile</span>
                <span style={{ marginLeft: 'auto', fontWeight: 700, fontSize: 14, color: data.mobile >= 70 ? '#10b981' : '#f59e0b' }}>{data.mobile}</span>
              </div>
              <MetricBar label="" value={data.mobile} showLabel={false} delay={0.3} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Monitor size={14} color="var(--text-muted)" />
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Desktop</span>
                <span style={{ marginLeft: 'auto', fontWeight: 700, fontSize: 14, color: data.desktop >= 70 ? '#10b981' : '#f59e0b' }}>{data.desktop}</span>
              </div>
              <MetricBar label="" value={data.desktop} showLabel={false} delay={0.4} />
            </div>
          </div>
        </GlassCard>

        {/* Quick stats */}
        <GlassCard delay={0.2} style={{ padding: 24 }}>
          <div style={{ padding: 24 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 16 }}>Page Stats</h3>
            {[
              { label: 'Page Size', value: `${data.pageSize} MB`, icon: Zap },
              { label: 'HTTP Requests', value: data.requests, icon: TrendingUp },
              { label: 'Speed Index', value: `${data.speedIndex}/100`, icon: TrendingUp },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{value}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Core Web Vitals */}
      <GlassCard delay={0.15}>
        <div style={{ padding: 28 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <TrendingUp size={17} color="#6366f1" /> Core Web Vitals
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
            {vitals.map(v => {
              const color = v.good ? '#10b981' : v.warning ? '#f59e0b' : '#ef4444';
              const status = v.good ? 'Good' : v.warning ? 'Needs Work' : 'Poor';
              return (
                <div key={v.label} style={{
                  padding: '14px 16px',
                  borderRadius: 12,
                  background: `${color}08`,
                  border: `1px solid ${color}20`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>{v.label}</span>
                    {v.good ? <CheckCircle2 size={14} color={color} /> : <AlertCircle size={14} color={color} />}
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800, color, marginBottom: 2 }}>{v.value}{v.unit}</div>
                  <div style={{ fontSize: 10, color }}>● {status}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{v.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </GlassCard>

      {/* Chart: Score vs Benchmark */}
      <GlassCard delay={0.2}>
        <div style={{ padding: 28 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Performance vs Industry Benchmark</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data.chartData} barGap={8}>
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.4)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.4)' }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Your Score" fill="url(#perfGrad)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="benchmark" name="Benchmark" fill="rgba(255,255,255,0.08)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}
