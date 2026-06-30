'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ParticleBackground from '@/components/ui/ParticleBackground';
import Navbar from '@/components/layout/Navbar';
import ScannerCard from '@/components/scanner/ScannerCard';
import ScanProgress from '@/components/scanner/ScanProgress';

function ScannerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [scanning, setScanning] = useState(false);
  const [scanUrl, setScanUrl] = useState('');

  useEffect(() => {
    if (searchParams.get('scanning') === '1') {
      const url = searchParams.get('url') || localStorage.getItem('sitelens_url') || 'https://example.com';
      setScanUrl(url);
      setScanning(true);
    }
  }, [searchParams]);

  const handleStart = (url) => {
    setScanUrl(url);
    localStorage.setItem('sitelens_url', url);
    setScanning(true);
  };

  const handleComplete = () => {
    router.push('/report');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px', position: 'relative', zIndex: 1 }}>
      {/* Atmospheric glows */}
      <div className="glow-orb glow-orb-indigo" style={{ width: 500, height: 500, top: '10%', left: '-10%', opacity: 0.5 }} />
      <div className="glow-orb glow-orb-violet" style={{ width: 400, height: 400, bottom: '10%', right: '-10%', opacity: 0.4 }} />

      {!scanning ? (
        <ScannerCard onStart={handleStart} />
      ) : (
        <ScanProgress url={scanUrl} onComplete={handleComplete} />
      )}
    </div>
  );
}

export default function ScannerPage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <ParticleBackground />
      <Navbar />
      <Suspense fallback={<div />}>
        <ScannerContent />
      </Suspense>
    </div>
  );
}
