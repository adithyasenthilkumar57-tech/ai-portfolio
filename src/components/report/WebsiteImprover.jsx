'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, ArrowLeftRight, Copy, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export default function WebsiteImprover({ content, domain }) {
  const [view, setView] = useState('before');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(null);

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 2500));
    setGenerating(false);
    setGenerated(true);
    setView('after');
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const beforeContent = {
    headline: `Welcome to ${domain}`,
    subheadline: `We provide quality services to our valued customers. Contact us to learn more about what we offer.`,
    cta: 'Learn More',
  };

  const afterContent = content;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ padding: '20px 24px', borderRadius: 16, background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(236,72,153,0.06))', border: '1px solid rgba(139,92,246,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Wand2 size={18} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 800 }}>AI Website Improver</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>AI generates better headlines, CTAs, and website structure</p>
          </div>
        </div>
      </div>

      {/* Toggle */}
      <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 4, width: 'fit-content' }}>
        {['before', 'after'].map(tab => (
          <button
            key={tab}
            onClick={() => tab === 'after' && !generated ? null : setView(tab)}
            style={{
              padding: '8px 20px',
              borderRadius: 9,
              border: 'none',
              background: view === tab ? 'rgba(255,255,255,0.08)' : 'transparent',
              color: view === tab ? 'var(--text-primary)' : 'var(--text-muted)',
              fontFamily: 'inherit',
              fontSize: 13,
              fontWeight: view === tab ? 600 : 400,
              cursor: tab === 'after' && !generated ? 'not-allowed' : 'pointer',
              opacity: tab === 'after' && !generated ? 0.5 : 1,
              transition: 'all 0.2s',
            }}
          >
            {tab === 'before' ? '📄 Current Content' : '✨ AI Improved'}
          </button>
        ))}
      </div>

      {/* Content comparison */}
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {view === 'before' ? (
            <div className="glass" style={{ borderRadius: 16, padding: 28 }}>
              <div style={{ marginBottom: 8, fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Current Website Content (Detected)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <ContentItem label="Headline" value={beforeContent.headline} isDull />
                <ContentItem label="Sub-headline" value={beforeContent.subheadline} isDull />
                <ContentItem label="CTA Button" value={beforeContent.cta} isDull />
              </div>
            </div>
          ) : (
            <div className="glass" style={{ borderRadius: 16, padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Sparkles size={14} color="#8b5cf6" />
                <span style={{ fontSize: 11, fontWeight: 600, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>AI Generated Improvements</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <ContentItem label="Headline" value={afterContent.headline} copyKey="headline" onCopy={handleCopy} copied={copied} isImproved />
                <ContentItem label="Sub-headline" value={afterContent.subheadline} copyKey="subheadline" onCopy={handleCopy} copied={copied} isImproved />
                <ContentItem label="CTA Button" value={afterContent.cta} copyKey="cta" onCopy={handleCopy} copied={copied} isImproved />
              </div>
              <div style={{ marginTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20 }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>AI Structure Recommendations</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {afterContent.structure.map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 14px', borderRadius: 10, background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.12)' }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#8b5cf6', minWidth: 70, flexShrink: 0 }}>{s.section}</span>
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s.suggestion}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Generate button */}
      {!generated && (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="btn-primary"
            style={{ fontSize: 15, padding: '14px 36px', opacity: generating ? 0.8 : 1 }}
          >
            {generating ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                  <Loader2 size={17} />
                </motion.div>
                Generating AI Content...
              </>
            ) : (
              <>
                <Wand2 size={17} />
                Generate Better Version
              </>
            )}
          </button>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 10 }}>
            AI will rewrite your headline, CTA, and structure recommendations
          </p>
        </div>
      )}
    </div>
  );
}

function ContentItem({ label, value, isDull, isImproved, copyKey, onCopy, copied }) {
  return (
    <div style={{ padding: '14px 16px', borderRadius: 10, background: isImproved ? 'rgba(139,92,246,0.06)' : 'rgba(255,255,255,0.02)', border: `1px solid ${isImproved ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.06)'}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: isImproved ? '#8b5cf6' : 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {isImproved && '✨ '}{label}
        </span>
        {onCopy && (
          <button onClick={() => onCopy(value, copyKey)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied === copyKey ? '#10b981' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
            {copied === copyKey ? <CheckCircle2 size={13} /> : <Copy size={13} />}
            {copied === copyKey ? 'Copied' : 'Copy'}
          </button>
        )}
      </div>
      <p style={{ fontSize: 14, color: isDull ? 'var(--text-muted)' : 'var(--text-primary)', lineHeight: 1.6 }}>{value}</p>
    </div>
  );
}
