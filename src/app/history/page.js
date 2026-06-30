'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ParticleBackground from '@/components/ui/ParticleBackground';
import Navbar from '@/components/layout/Navbar';
import GlassCard from '@/components/ui/GlassCard';
import { demoHistory } from '@/lib/demoData';
import { Globe, TrendingUp, TrendingDown, ArrowRight, Calendar, BarChart3, Plus } from 'lucide-react';

export default function HistoryPage() {
  const router = useRouter();

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <ParticleBackground />
      <Navbar />
      <main style={{ paddingTop: 96, paddingBottom: 80, position: 'relative', zIndex: 1 }}>
        <div className="section-container">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="tag-label"><BarChart3 size={12} /> Scan History</div>
              <h1 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: 8 }}>
                Your Website <span className="gradient-text-indigo">Intelligence History</span>
              </h1>
              <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Track your website improvements over time</p>
            </div>
            <button
              onClick={() => router.push('/scanner')}
              className="btn-primary"
              style={{ fontSize: 14 }}
            >
              <Plus size={15} /> New Scan
            </button>
          </div>

          {/* Stats summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 28 }}>
            {[
              { label: 'Total Scans', value: demoHistory.length, icon: BarChart3, color: '#6366f1' },
              { label: 'Avg. Improvement', value: '+11 pts', icon: TrendingUp, color: '#10b981' },
              { label: 'Sites Tracked', value: demoHistory.length, icon: Globe, color: '#8b5cf6' },
              { label: 'Best Score', value: Math.max(...demoHistory.map(s => s.currentScore)), icon: BarChart3, color: '#06b6d4' },
            ].map((s, i) => (
              <GlassCard key={s.label} delay={i * 0.05} hover>
                <div style={{ padding: 18 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <s.icon size={14} color={s.color} />
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</span>
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Scan list */}
          <GlassCard animate={false}>
            <div style={{ padding: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Recent Scans</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {['Website', 'Previous Score', 'Current Score', 'Improvement', 'Date', 'Action'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '10px 14px', fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {demoHistory.map((scan, i) => {
                      const improved = scan.improvement > 0;
                      const scoreColor = scan.currentScore >= 85 ? '#10b981' : scan.currentScore >= 70 ? '#6366f1' : '#f59e0b';
                      return (
                        <motion.tr
                          key={scan.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.06 }}
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <td style={{ padding: '14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Globe size={14} color="#6366f1" />
                              </div>
                              <div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{scan.domain}</div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>https://{scan.url}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '14px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 14, color: 'var(--text-muted)' }}>{scan.previousScore}</td>
                          <td style={{ padding: '14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <span style={{ fontSize: 15, fontWeight: 700, color: scoreColor }}>{scan.currentScore}</span>
                          </td>
                          <td style={{ padding: '14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              {improved ? <TrendingUp size={14} color="#10b981" /> : <TrendingDown size={14} color="#ef4444" />}
                              <span style={{ fontSize: 13, fontWeight: 700, color: improved ? '#10b981' : '#ef4444' }}>
                                {improved ? '+' : ''}{scan.improvement}
                              </span>
                            </div>
                          </td>
                          <td style={{ padding: '14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--text-muted)' }}>
                              <Calendar size={12} />
                              {new Date(scan.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                          </td>
                          <td style={{ padding: '14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <button
                              onClick={() => { localStorage.setItem('sitelens_url', 'https://' + scan.domain); router.push('/report'); }}
                              style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 8, padding: '6px 12px', color: '#6366f1', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
                              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.1)'; }}
                              onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
                            >
                              View Report <ArrowRight size={12} />
                            </button>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  );
}
