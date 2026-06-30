'use client';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip
} from 'recharts';
import GlassCard from '../ui/GlassCard';
import MetricBar from '../ui/MetricBar';
import ScoreCircle from './ScoreCircle';
import { Search, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: 'rgba(13,17,23,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#6366f1' }}>{payload[0]?.value}</p>
      </div>
    );
  }
  return null;
};

export default function SEOPanel({ data }) {
  if (!data) return null;

  const checks = [
    { label: 'Meta Description Present', pass: data.metaPresent },
    { label: 'Canonical Tag', pass: data.canonicalPresent },
    { label: 'robots.txt', pass: data.robotsTxt },
    { label: 'XML Sitemap', pass: data.sitemap },
    { label: 'Structured Data (Schema)', pass: data.structuredData },
    { label: 'Single H1 Tag', pass: data.h1Count === 1 },
    { label: 'Images with Alt Text', pass: data.imagesWithAlt > 70 },
    { label: 'Title Length Optimal', pass: data.titleLength >= 30 && data.titleLength <= 60 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
        <GlassCard delay={0} style={{ padding: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ padding: 28, textAlign: 'center' }}>
            <ScoreCircle score={data.score} size={130} label="SEO Score" status="" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#10b981' }}>{checks.filter(c => c.pass).length}/{checks.length}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Checks Passed</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#6366f1' }}>{data.imagesWithAlt}%</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Alt Text</div>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard delay={0.1}>
          <div style={{ padding: 28 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Search size={17} color="#6366f1" /> SEO Radar Analysis
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={data.chartData}>
                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }} />
                <Radar name="Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} strokeWidth={2} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Technical SEO Checklist */}
      <GlassCard delay={0.15}>
        <div style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Technical SEO Checklist</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 10 }}>
            {checks.map(c => (
              <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, background: c.pass ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.06)', border: `1px solid ${c.pass ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'}` }}>
                {c.pass ? <CheckCircle2 size={15} color="#10b981" /> : <XCircle size={15} color="#ef4444" />}
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Keywords */}
      <GlassCard delay={0.2}>
        <div style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Keyword Opportunities</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Keyword', 'Monthly Volume', 'Difficulty', 'Opportunity'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.keywords.map(k => (
                  <tr key={k.word} style={{ transition: 'background 0.2s' }}>
                    <td style={{ padding: '10px 12px', fontSize: 13, color: 'var(--text-primary)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{k.word}</td>
                    <td style={{ padding: '10px 12px', fontSize: 13, color: 'var(--text-secondary)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{k.volume.toLocaleString()}</td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <MetricBar label="" value={k.difficulty} showLabel={false} height={4} />
                    </td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: k.difficulty < 60 ? '#10b981' : k.difficulty < 75 ? '#f59e0b' : '#ef4444', background: k.difficulty < 60 ? 'rgba(16,185,129,0.1)' : k.difficulty < 75 ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)', padding: '2px 8px', borderRadius: 99 }}>
                        {k.difficulty < 60 ? 'High' : k.difficulty < 75 ? 'Medium' : 'Low'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
