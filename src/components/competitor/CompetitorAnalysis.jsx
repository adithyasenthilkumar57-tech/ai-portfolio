'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowLeftRight, TrendingUp, Search, Palette, Shield, Users, Zap } from 'lucide-react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Legend, Tooltip,
  BarChart, Bar, XAxis, YAxis
} from 'recharts';
import GlassCard from '../ui/GlassCard';
import { analyzeWebsite } from '@/lib/aiEngine';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: 'rgba(13,17,23,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px' }}>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>{label}</p>
        {payload.map(p => (
          <p key={p.name} style={{ fontSize: 13, fontWeight: 600, color: p.fill || p.color, marginBottom: 2 }}>{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

function ScoreChip({ value, color }) {
  return (
    <span style={{ fontSize: 22, fontWeight: 900, color, letterSpacing: '-0.03em' }}>{value}</span>
  );
}

export default function CompetitorAnalysis() {
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    if (!url1 || !url2) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 2200));
    const r1 = analyzeWebsite(url1.startsWith('http') ? url1 : 'https://' + url1);
    const r2 = analyzeWebsite(url2.startsWith('http') ? url2 : 'https://' + url2);
    setResult({ r1, r2 });
    setLoading(false);
  };

  const radarData = result ? [
    { subject: 'Performance', A: result.r1.scores.perf, B: result.r2.scores.perf },
    { subject: 'SEO', A: result.r1.scores.seo, B: result.r2.scores.seo },
    { subject: 'Design', A: result.r1.scores.design, B: result.r2.scores.design },
    { subject: 'UX', A: result.r1.scores.ux, B: result.r2.scores.ux },
    { subject: 'Accessibility', A: result.r1.scores.accessibility, B: result.r2.scores.accessibility },
    { subject: 'Security', A: result.r1.scores.security, B: result.r2.scores.security },
  ] : [];

  const barData = result ? [
    { name: 'Performance', You: result.r1.scores.perf, Competitor: result.r2.scores.perf },
    { name: 'SEO', You: result.r1.scores.seo, Competitor: result.r2.scores.seo },
    { name: 'Design', You: result.r1.scores.design, Competitor: result.r2.scores.design },
    { name: 'UX', You: result.r1.scores.ux, Competitor: result.r2.scores.ux },
    { name: 'Conversion', You: result.r1.scores.conversion, Competitor: result.r2.scores.conversion },
    { name: 'Trust', You: result.r1.scores.trust, Competitor: result.r2.scores.trust },
  ] : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Input section */}
      <GlassCard animate={false}>
        <div style={{ padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <ArrowLeftRight size={18} color="#06b6d4" />
            <h2 style={{ fontSize: 18, fontWeight: 800 }}>Competitor Analysis</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'center' }}>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: 8 }}>YOUR WEBSITE</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(99,102,241,0.3)', background: 'rgba(99,102,241,0.04)' }}>
                <Globe size={15} color="#6366f1" />
                <input
                  value={url1}
                  onChange={e => setUrl1(e.target.value)}
                  placeholder="yourwebsite.com"
                  style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: 14, fontFamily: 'inherit', outline: 'none', flex: 1 }}
                />
              </div>
            </div>

            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowLeftRight size={16} color="var(--text-muted)" />
            </div>

            <div>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: 8 }}>COMPETITOR WEBSITE</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.04)' }}>
                <Globe size={15} color="#ef4444" />
                <input
                  value={url2}
                  onChange={e => setUrl2(e.target.value)}
                  placeholder="competitor.com"
                  style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: 14, fontFamily: 'inherit', outline: 'none', flex: 1 }}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <button
              onClick={handleCompare}
              disabled={loading || !url1 || !url2}
              className="btn-primary"
              style={{ padding: '12px 32px', opacity: loading || !url1 || !url2 ? 0.6 : 1 }}
            >
              {loading ? '⚡ Comparing...' : <><ArrowLeftRight size={16} /> Compare Websites</>}
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Results */}
      {result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Score summary */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 20, alignItems: 'center' }}>
            <GlassCard animate={false} style={{ padding: 24, textAlign: 'center', borderColor: 'rgba(99,102,241,0.2)' }}>
              <div style={{ padding: 24 }}>
                <div style={{ fontSize: 12, color: '#6366f1', fontWeight: 600, marginBottom: 8 }}>{result.r1.domain}</div>
                <div style={{ fontSize: 52, fontWeight: 900, color: result.r1.overall >= result.r2.overall ? '#10b981' : '#f59e0b', letterSpacing: '-0.04em' }}>{result.r1.overall}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{result.r1.status}</div>
              </div>
            </GlassCard>
            <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>VS</div>
            <GlassCard animate={false} style={{ padding: 24, textAlign: 'center', borderColor: 'rgba(239,68,68,0.2)' }}>
              <div style={{ padding: 24 }}>
                <div style={{ fontSize: 12, color: '#ef4444', fontWeight: 600, marginBottom: 8 }}>{result.r2.domain}</div>
                <div style={{ fontSize: 52, fontWeight: 900, color: result.r2.overall >= result.r1.overall ? '#10b981' : '#f59e0b', letterSpacing: '-0.04em' }}>{result.r2.overall}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{result.r2.status}</div>
              </div>
            </GlassCard>
          </div>

          {/* Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <GlassCard animate={false}>
              <div style={{ padding: 24 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Radar Comparison</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.06)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }} />
                    <Radar name="You" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} strokeWidth={2} />
                    <Radar name="Competitor" dataKey="B" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} strokeWidth={2} />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }} />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            <GlassCard animate={false}>
              <div style={{ padding: 24 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Side-by-Side Scores</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={barData} barGap={4}>
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.35)' }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.35)' }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="You" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Competitor" fill="#ef4444" radius={[4, 4, 0, 0]} fillOpacity={0.7} />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>

          {/* Metric comparison table */}
          <GlassCard animate={false}>
            <div style={{ padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 18 }}>Detailed Comparison</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Metric', result.r1.domain, result.r2.domain, 'Winner'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '8px 14px', fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Overall Score', v1: result.r1.overall, v2: result.r2.overall },
                    { label: 'Performance', v1: result.r1.scores.perf, v2: result.r2.scores.perf },
                    { label: 'SEO', v1: result.r1.scores.seo, v2: result.r2.scores.seo },
                    { label: 'Design', v1: result.r1.scores.design, v2: result.r2.scores.design },
                    { label: 'UX', v1: result.r1.scores.ux, v2: result.r2.scores.ux },
                    { label: 'Accessibility', v1: result.r1.scores.accessibility, v2: result.r2.scores.accessibility },
                    { label: 'Conversion', v1: result.r1.scores.conversion, v2: result.r2.scores.conversion },
                    { label: 'Security', v1: result.r1.scores.security, v2: result.r2.scores.security },
                  ].map(row => {
                    const youWin = row.v1 >= row.v2;
                    return (
                      <tr key={row.label}>
                        <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text-secondary)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{row.label}</td>
                        <td style={{ padding: '10px 14px', fontSize: 14, fontWeight: 700, color: youWin ? '#10b981' : 'var(--text-secondary)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{row.v1}</td>
                        <td style={{ padding: '10px 14px', fontSize: 14, fontWeight: 700, color: !youWin ? '#10b981' : 'var(--text-secondary)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{row.v2}</td>
                        <td style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: youWin ? '#10b981' : '#ef4444' }}>
                            {youWin ? '✓ You' : '✓ Competitor'} ({youWin ? `+${row.v1 - row.v2}` : `+${row.v2 - row.v1}`})
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}
