'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Head of Growth',
    company: 'NovaTech',
    avatar: 'SC',
    avatarColor: '#6366f1',
    stars: 5,
    text: 'SiteLens AI identified 12 critical SEO issues we had no idea existed. After fixing them, our organic traffic increased by 67% in 6 weeks.',
  },
  {
    name: 'Marcus Webb',
    role: 'Freelance Designer',
    company: 'Webb Studio',
    avatar: 'MW',
    avatarColor: '#8b5cf6',
    stars: 5,
    text: "I use SiteLens AI for every client project. The design intelligence report saves me hours of manual review. Clients love the visual reports.",
  },
  {
    name: 'Priya Kapoor',
    role: 'Founder & CEO',
    company: 'LaunchPad SaaS',
    avatar: 'PK',
    avatarColor: '#06b6d4',
    stars: 5,
    text: "Our conversion rate was 1.2%. SiteLens spotted the exact issues. After three weeks of fixes, we're at 3.8%. The ROI is insane.",
  },
  {
    name: 'James Rodriguez',
    role: 'CTO',
    company: 'Retailio',
    avatar: 'JR',
    avatarColor: '#10b981',
    stars: 5,
    text: "The performance analysis is on par with expensive agency audits. We cut our page load time from 4.2s to 1.1s following SiteLens recommendations.",
  },
  {
    name: 'Aisha Okonkwo',
    role: 'Digital Marketing Lead',
    company: 'BrandForge',
    avatar: 'AO',
    avatarColor: '#f59e0b',
    stars: 5,
    text: 'The competitor analysis feature alone is worth it. We discovered exactly why our competitor ranked higher and fixed our gaps within a month.',
  },
  {
    name: 'Tom Lindström',
    role: 'Product Manager',
    company: 'Scandi Ventures',
    avatar: 'TL',
    avatarColor: '#ec4899',
    stars: 5,
    text: 'I was skeptical of another AI tool. But the depth of SiteLens reports genuinely surprised me. It caught things our senior devs had missed.',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding" style={{ position: 'relative', zIndex: 1 }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div className="tag-label" style={{ justifyContent: 'center' }}>
            <Star size={12} /> Loved by Teams Worldwide
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
            Trusted by builders who care
            <br />
            <span className="gradient-text">about results.</span>
          </h2>
        </motion.div>

        <div style={{ columns: 3, gap: 20, columnFill: 'balance' }} className="testimonials-grid">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass glass-hover"
              style={{ breakInside: 'avoid', marginBottom: 20, padding: 24 }}
            >
              <Quote size={20} color="var(--text-muted)" style={{ marginBottom: 12, opacity: 0.5 }} />
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 16 }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: `${t.avatarColor}20`,
                  border: `1px solid ${t.avatarColor}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  color: t.avatarColor,
                  flexShrink: 0,
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.role} · {t.company}</div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
                  {Array(t.stars).fill(0).map((_, j) => (
                    <Star key={j} size={11} color="#f59e0b" fill="#f59e0b" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) { .testimonials-grid { columns: 2 !important; } }
        @media (max-width: 600px) { .testimonials-grid { columns: 1 !important; } }
      `}</style>
    </section>
  );
}
