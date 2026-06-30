'use client';
import Link from 'next/link';
import { Zap, GitBranch, Globe, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '48px 24px',
      background: 'rgba(2,4,9,0.9)',
      position: 'relative',
      zIndex: 1,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={15} color="white" />
              </div>
              <span style={{ fontWeight: 800, fontSize: 16, color: 'var(--text-primary)' }}>SiteLens AI</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 220 }}>
              See what your website cannot tell you. AI-powered intelligence for the modern web.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            {[Globe, GitBranch, Mail].map((Icon, i) => (
                <a key={i} href="#" style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.target.closest('a').style.borderColor = 'rgba(99,102,241,0.5)'; e.target.closest('a').style.color = 'var(--text-primary)'; }}
                  onMouseLeave={e => { e.target.closest('a').style.borderColor = 'rgba(255,255,255,0.08)'; e.target.closest('a').style.color = 'var(--text-muted)'; }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Product</h4>
            {['Analyze Website', 'Competitor Compare', 'AI Suggestions', 'Report Dashboard', 'Scan History'].map(item => (
              <Link key={item} href="/scanner" style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', marginBottom: 8, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--text-secondary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Company</h4>
            {['About', 'Blog', 'Careers', 'Press', 'Contact'].map(item => (
              <a key={item} href="#" style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', marginBottom: 8, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--text-secondary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Legal</h4>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security', 'GDPR'].map(item => (
              <a key={item} href="#" style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', marginBottom: 8, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--text-secondary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            © 2026 SiteLens AI. All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Built with <span style={{ color: '#ef4444' }}>♥</span> for the future web
          </p>
        </div>
      </div>
    </footer>
  );
}
