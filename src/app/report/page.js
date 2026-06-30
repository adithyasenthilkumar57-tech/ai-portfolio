'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import ReportSidebar from '@/components/report/ReportSidebar';
import ScoreCircle from '@/components/report/ScoreCircle';
import MetricBar from '@/components/ui/MetricBar';
import PerformancePanel from '@/components/report/PerformancePanel';
import DesignPanel from '@/components/report/DesignPanel';
import SEOPanel from '@/components/report/SEOPanel';
import UXPanel from '@/components/report/UXPanel';
import AccessibilityPanel from '@/components/report/AccessibilityPanel';
import ConversionPanel from '@/components/report/ConversionPanel';
import AIRecommendations from '@/components/report/AIRecommendations';
import WebsiteImprover from '@/components/report/WebsiteImprover';
import GlassCard from '@/components/ui/GlassCard';
import { analyzeWebsite } from '@/lib/aiEngine';
import { Globe, Calendar, RefreshCw, Download, Share2, ArrowLeft } from 'lucide-react';

export default function ReportPage() {
  const router = useRouter();
  const [report, setReport] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = localStorage.getItem('sitelens_url') || 'https://example.com';
    const result = analyzeWebsite(url);
    setReport(result);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid rgba(99,102,241,0.3)', borderTop: '3px solid #6366f1', margin: '0 auto 16px', animation: 'spin-slow 1s linear infinite' }} />
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Loading report...</p>
        </div>
      </div>
    );
  }

  const scores = report?.scores || {};

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return <OverviewSection report={report} />;
      case 'performance': return <PerformancePanel data={report.performance} />;
      case 'design': return <DesignPanel data={report.design} />;
      case 'seo': return <SEOPanel data={report.seo} />;
      case 'ux': return <UXPanel data={report.ux} />;
      case 'accessibility': return <AccessibilityPanel data={report.accessibility} />;
      case 'conversion': return <ConversionPanel data={report.conversion} />;
      case 'ai': return <AIRecommendations recommendations={report.recommendations} />;
      case 'improver': return <WebsiteImprover content={report.improvedContent} domain={report.domain} />;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Sub-header */}
      <div style={{
        position: 'fixed',
        top: 64,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(2,4,9,0.95)',
        backdropFilter: 'blur(20px)',
        padding: '10px 24px',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/scanner" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13 }}>
              <ArrowLeft size={14} /> New Scan
            </Link>
            <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />
            <Globe size={14} color="var(--text-muted)" />
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{report?.domain}</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>·</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Score: </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: report?.overall >= 85 ? '#10b981' : report?.overall >= 70 ? '#6366f1' : '#f59e0b' }}>{report?.overall}/100</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-ghost" style={{ fontSize: 13 }}><RefreshCw size={13} /> Re-scan</button>
            <button className="btn-ghost" style={{ fontSize: 13 }}><Share2 size={13} /> Share</button>
            <button className="btn-secondary" style={{ padding: '7px 14px', fontSize: 13 }}><Download size={13} /> Export PDF</button>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div style={{ display: 'flex', flex: 1, paddingTop: 112, height: 'calc(100vh - 112px)' }}>
        {/* Sidebar */}
        <div style={{ position: 'fixed', top: 112, left: 0, bottom: 0, zIndex: 40 }}>
          <ReportSidebar active={activeSection} onChange={setActiveSection} scores={scores} />
        </div>

        {/* Content */}
        <main style={{ marginLeft: 220, flex: 1, overflowY: 'auto', padding: '32px 32px 80px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function OverviewSection({ report }) {
  if (!report) return null;
  const scoreEntries = [
    { label: 'Performance', key: 'perf', color: '#10b981' },
    { label: 'SEO', key: 'seo', color: '#6366f1' },
    { label: 'Design', key: 'design', color: '#8b5cf6' },
    { label: 'UX', key: 'ux', color: '#06b6d4' },
    { label: 'Accessibility', key: 'accessibility', color: '#f59e0b' },
    { label: 'Conversion', key: 'conversion', color: '#ec4899' },
    { label: 'Security', key: 'security', color: '#34d399' },
    { label: 'Trust', key: 'trust', color: '#f97316' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Main score card */}
      <GlassCard delay={0} glow>
        <div style={{ padding: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <ScoreCircle score={report.overall} size={160} label="" status="" />
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Intelligence Score</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{report.status}</div>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 280 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>{report.domain}</h2>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
                Analyzed on {new Date(report.analyzedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              {scoreEntries.slice(0, 4).map(e => (
                <MetricBar key={e.key} label={e.label} value={report.scores[e.key]} delay={scoreEntries.indexOf(e) * 0.07} />
              ))}
            </div>
            <div style={{ minWidth: 200 }}>
              {scoreEntries.slice(4).map(e => (
                <MetricBar key={e.key} label={e.label} value={report.scores[e.key]} delay={4 * 0.07 + scoreEntries.indexOf(e) * 0.07} />
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Score grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14 }}>
        {scoreEntries.map((e, i) => {
          const score = report.scores[e.key];
          return (
            <GlassCard key={e.key} hover delay={i * 0.05} style={{ padding: 18, textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ padding: 18, textAlign: 'center' }}>
                <div style={{ fontSize: 30, fontWeight: 900, color: e.color, letterSpacing: '-0.03em', marginBottom: 4 }}>{score}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500, marginBottom: 6 }}>{e.label}</div>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${score}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.05 }} style={{ height: '100%', background: e.color, borderRadius: 99 }} />
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Top recommendations preview */}
      <GlassCard delay={0.3}>
        <div style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Top Priority Fixes</h3>
            <button onClick={() => {}} style={{ fontSize: 12, color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>View all →</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {report.recommendations.filter(r => r.priority === 'high').slice(0, 3).map((rec, i) => (
              <div key={i} style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '2px 8px', borderRadius: 99, flexShrink: 0, marginTop: 2 }}>HIGH</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{rec.problem}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{rec.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
