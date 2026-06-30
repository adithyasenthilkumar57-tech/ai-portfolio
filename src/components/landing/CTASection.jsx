'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Scan, ArrowRight, Zap } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="section-padding" style={{ position: 'relative', zIndex: 1 }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            textAlign: 'center',
            padding: '80px 40px',
            borderRadius: 28,
            background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.06) 50%, rgba(6,182,212,0.05) 100%)',
            border: '1px solid rgba(99,102,241,0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background glows */}
          <div style={{ position: 'absolute', top: -60, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)', filter: 'blur(40px)' }} />
          <div style={{ position: 'absolute', bottom: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)', filter: 'blur(40px)' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="tag-label" style={{ justifyContent: 'center', marginBottom: 20 }}>
              <Zap size={12} /> Free Forever · No Credit Card Required
            </div>

            <h2 style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20 }}>
              Ready to see what your
              <br />
              <span className="gradient-text">website cannot tell you?</span>
            </h2>

            <p style={{ fontSize: 17, color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.7 }}>
              Join 50,000+ businesses who use SiteLens AI to understand and improve their digital presence.
            </p>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/scanner" className="btn-primary" style={{ fontSize: 17, padding: '15px 36px' }}>
                <Scan size={19} />
                Analyze My Website — Free
                <ArrowRight size={17} />
              </Link>
              <Link href="/auth/signup" className="btn-secondary" style={{ fontSize: 17, padding: '15px 32px' }}>
                Create Free Account
              </Link>
            </div>

            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 20 }}>
              ✓ No signup required &nbsp;·&nbsp; ✓ Instant results &nbsp;·&nbsp; ✓ Full report in seconds
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
