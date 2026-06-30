'use client';
import ParticleBackground from '@/components/ui/ParticleBackground';
import AuthCard from '@/components/auth/AuthCard';

export default function SignupPage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <ParticleBackground />
      <div className="glow-orb glow-orb-violet" style={{ width: 500, height: 500, top: '-10%', right: '-15%', opacity: 0.5, position: 'fixed' }} />
      <div className="glow-orb glow-orb-cyan" style={{ width: 400, height: 400, bottom: '-10%', left: '-10%', opacity: 0.4, position: 'fixed' }} />
      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <AuthCard mode="signup" />
      </div>
    </div>
  );
}
