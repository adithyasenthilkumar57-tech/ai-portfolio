'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Scan, Globe, Play, Zap } from 'lucide-react';

const EXAMPLE_URLS = [
  'https://stripe.com',
  'https://linear.app',
  'https://vercel.com',
  'https://notion.so',
];

export default function ScannerCard({ onStart }) {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState('');

  const validate = (val) => {
    if (!val.trim()) return 'Please enter a website URL.';
    const regex = /^(https?:\/\/)?([\w-]+\.)+[\w]{2,}(\/.*)?$/i;
    if (!regex.test(val.trim())) return 'Please enter a valid URL (e.g., https://yoursite.com)';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate(url);
    if (err) { setError(err); return; }
    setError('');
    let finalUrl = url.trim();
    if (!finalUrl.startsWith('http')) finalUrl = 'https://' + finalUrl;
    localStorage.setItem('sitelens_url', finalUrl);
    onStart ? onStart(finalUrl) : router.push('/scanner?scanning=1&url=' + encodeURIComponent(finalUrl));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        background: 'rgba(13, 17, 23, 0.8)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 24,
        padding: 48,
        maxWidth: 640,
        width: '100%',
        margin: '0 auto',
        boxShadow: '0 40px 100px rgba(0,0,0,0.4), 0 0 80px rgba(99,102,241,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top glow */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 200, height: 1, background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.8), transparent)' }} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{ width: 60, height: 60, borderRadius: 18, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <Zap size={26} color="white" />
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>Analyze Any Website</h1>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Enter a URL and get a complete AI-powered website intelligence report in seconds.
        </p>
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'flex',
          gap: 0,
          borderRadius: 14,
          border: `1px solid ${focused ? 'rgba(99,102,241,0.6)' : 'rgba(255,255,255,0.08)'}`,
          background: focused ? 'rgba(99,102,241,0.04)' : 'rgba(255,255,255,0.02)',
          transition: 'all 0.3s',
          boxShadow: focused ? '0 0 0 3px rgba(99,102,241,0.1)' : 'none',
          overflow: 'hidden',
          marginBottom: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 16, color: 'var(--text-muted)', flexShrink: 0 }}>
            <Globe size={17} />
          </div>
          <input
            type="text"
            value={url}
            onChange={e => { setUrl(e.target.value); setError(''); }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="https://yourwebsite.com"
            style={{
              flex: 1,
              padding: '16px 14px',
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              fontSize: 16,
              fontFamily: 'inherit',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            className="btn-primary"
            style={{ borderRadius: 0, borderTopRightRadius: 12, borderBottomRightRadius: 12, padding: '14px 24px', flexShrink: 0 }}
          >
            <Scan size={17} /> Analyze
          </button>
        </div>

        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 13, color: '#ef4444', marginBottom: 12, paddingLeft: 4 }}>
            {error}
          </motion.p>
        )}
      </form>

      {/* Example URLs */}
      <div style={{ marginTop: 20 }}>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>Try an example:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {EXAMPLE_URLS.map(u => (
            <button
              key={u}
              onClick={() => { setUrl(u); setError(''); }}
              style={{
                padding: '5px 12px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.03)',
                color: 'var(--text-muted)',
                fontSize: 12,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.target.style.borderColor = 'rgba(99,102,241,0.4)'; e.target.style.color = 'var(--text-secondary)'; }}
              onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.color = 'var(--text-muted)'; }}
            >
              {u.replace('https://', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Demo CTA */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 28, paddingTop: 24, textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>Want to see a full report first?</p>
        <button
          onClick={() => { localStorage.setItem('sitelens_url', 'https://example.com'); router.push('/report'); }}
          className="btn-secondary"
          style={{ fontSize: 13, padding: '10px 20px' }}
        >
          <Play size={14} /> View Demo Report
        </button>
      </div>
    </motion.div>
  );
}
