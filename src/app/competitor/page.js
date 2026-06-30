'use client';
import ParticleBackground from '@/components/ui/ParticleBackground';
import Navbar from '@/components/layout/Navbar';
import CompetitorAnalysis from '@/components/competitor/CompetitorAnalysis';

export default function CompetitorPage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <ParticleBackground />
      <Navbar />
      <main style={{ paddingTop: 96, paddingBottom: 80, position: 'relative', zIndex: 1 }}>
        <div className="section-container">
          <div style={{ marginBottom: 32 }}>
            <div className="tag-label"><span>⚡</span> Competitor Intelligence</div>
            <h1 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: 10 }}>
              Compare Against Your{' '}
              <span className="gradient-text-cyan">Competitors</span>
            </h1>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', maxWidth: 500, lineHeight: 1.6 }}>
              Enter two websites and get a comprehensive side-by-side intelligence report showing exactly where you win and where you need to improve.
            </p>
          </div>
          <CompetitorAnalysis />
        </div>
      </main>
    </div>
  );
}
