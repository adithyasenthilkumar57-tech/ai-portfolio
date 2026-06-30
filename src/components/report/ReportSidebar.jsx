'use client';
import { LayoutDashboard, TrendingUp, Palette, Search, Accessibility, TrendingDown, Lightbulb, ArrowLeftRight } from 'lucide-react';

const sections = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'performance', label: 'Performance', icon: TrendingUp },
  { id: 'design', label: 'Design Intelligence', icon: Palette },
  { id: 'seo', label: 'SEO Analysis', icon: Search },
  { id: 'ux', label: 'User Experience', icon: Accessibility },
  { id: 'conversion', label: 'Conversion', icon: TrendingDown },
  { id: 'ai', label: 'AI Suggestions', icon: Lightbulb },
  { id: 'improver', label: 'AI Improver', icon: ArrowLeftRight },
];

export default function ReportSidebar({ active, onChange, scores = {} }) {
  function getScoreColor(key) {
    const score = scores[key];
    if (!score) return 'var(--text-muted)';
    if (score >= 85) return '#10b981';
    if (score >= 70) return '#6366f1';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  }

  const scoreMap = {
    performance: scores.perf,
    seo: scores.seo,
    design: scores.design,
    ux: scores.ux,
    conversion: scores.conversion,
  };

  return (
    <aside style={{
      width: 220,
      flexShrink: 0,
      background: 'rgba(13, 17, 23, 0.6)',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      padding: '24px 12px',
      height: '100%',
      overflowY: 'auto',
    }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 10px', marginBottom: 8 }}>
        Report Sections
      </div>
      {sections.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        const score = scoreMap[id];
        const scoreColor = getScoreColor(id);

        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              width: '100%',
              padding: '9px 12px',
              borderRadius: 8,
              border: 'none',
              background: isActive ? 'rgba(99,102,241,0.12)' : 'transparent',
              color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 13,
              fontWeight: isActive ? 600 : 400,
              textAlign: 'left',
              transition: 'all 0.2s',
              marginBottom: 2,
              borderLeft: isActive ? '2px solid #6366f1' : '2px solid transparent',
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
          >
            <Icon size={15} />
            <span style={{ flex: 1 }}>{label}</span>
            {score !== undefined && (
              <span style={{ fontSize: 11, fontWeight: 700, color: scoreColor }}>{score}</span>
            )}
          </button>
        );
      })}
    </aside>
  );
}
