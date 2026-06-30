'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Loader2, Zap, Globe, Palette, TrendingUp, Search, User, Lightbulb } from 'lucide-react';

const STAGES = [
  { icon: Globe, label: 'Connecting to website...', color: '#06b6d4', duration: 1200 },
  { icon: Palette, label: 'Analyzing design system...', color: '#8b5cf6', duration: 1400 },
  { icon: TrendingUp, label: 'Checking performance metrics...', color: '#10b981', duration: 1200 },
  { icon: Search, label: 'Evaluating SEO signals...', color: '#6366f1', duration: 1300 },
  { icon: User, label: 'Understanding user experience...', color: '#f59e0b', duration: 1100 },
  { icon: Lightbulb, label: 'Generating AI recommendations...', color: '#ec4899', duration: 1500 },
];

export default function ScanProgress({ url, onComplete }) {
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const dotInterval = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 400);
    return () => clearInterval(dotInterval);
  }, []);

  useEffect(() => {
    let stageIdx = 0;
    let totalDuration = 0;
    const allDurations = STAGES.map(s => s.duration);
    const totalTime = allDurations.reduce((a, b) => a + b, 0);

    const runStages = async () => {
      for (let i = 0; i < STAGES.length; i++) {
        stageIdx = i;
        setCurrentStage(i);

        // Progress bar animation
        const start = allDurations.slice(0, i).reduce((a, b) => a + b, 0);
        const end = start + allDurations[i];
        const startProgress = (start / totalTime) * 100;
        const endProgress = (end / totalTime) * 100;

        const progInterval = setInterval(() => {
          setProgress(p => {
            if (p >= endProgress - 0.5) {
              clearInterval(progInterval);
              return endProgress;
            }
            return p + (endProgress - startProgress) / (allDurations[i] / 16);
          });
        }, 16);

        await new Promise(r => setTimeout(r, allDurations[i]));
        setCompletedStages(prev => [...prev, i]);
      }

      setProgress(100);
      await new Promise(r => setTimeout(r, 600));
      onComplete ? onComplete() : router.push('/report');
    };

    runStages();
  }, []);

  const domain = url ? url.replace(/https?:\/\//, '').replace(/www\./, '').split('/')[0] : 'yourwebsite.com';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'rgba(13, 17, 23, 0.9)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 24,
        padding: '48px 40px',
        maxWidth: 580,
        width: '100%',
        margin: '0 auto',
        boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 80px rgba(99,102,241,0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top border glow */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 300, height: 1, background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.9), transparent)' }} />

      {/* AI pulse animation */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ position: 'relative', display: 'inline-flex', marginBottom: 20 }}>
          {/* Outer rings */}
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.5 + i * 0.3, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '1px solid rgba(99,102,241,0.4)',
              }}
            />
          ))}
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 40px rgba(99,102,241,0.4)',
            position: 'relative',
            zIndex: 1,
          }}>
            <Zap size={28} color="white" />
          </div>
        </div>

        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Analyzing</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>{domain}</div>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Analysis Progress</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#6366f1' }}>{Math.round(progress)}%</span>
        </div>
        <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
          <motion.div
            style={{
              height: '100%',
              borderRadius: 99,
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)',
            }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Stages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {STAGES.map((stage, i) => {
          const isCompleted = completedStages.includes(i);
          const isCurrent = currentStage === i && !isCompleted;

          return (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: i <= currentStage ? 1 : 0.3, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '10px 14px',
                borderRadius: 10,
                background: isCurrent ? `${stage.color}08` : 'transparent',
                border: `1px solid ${isCurrent ? stage.color + '20' : 'transparent'}`,
                transition: 'all 0.3s',
              }}
            >
              {/* Status icon */}
              <div style={{ flexShrink: 0 }}>
                {isCompleted ? (
                  <CheckCircle2 size={18} color="#10b981" />
                ) : isCurrent ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                    <Loader2 size={18} color={stage.color} />
                  </motion.div>
                ) : (
                  <Circle size={18} color="rgba(255,255,255,0.15)" />
                )}
              </div>

              {/* Stage icon */}
              <stage.icon size={15} color={isCompleted || isCurrent ? stage.color : 'rgba(255,255,255,0.2)'} />

              {/* Label */}
              <span style={{
                fontSize: 14,
                fontWeight: isCurrent ? 500 : 400,
                color: isCompleted ? 'var(--text-secondary)' : isCurrent ? 'var(--text-primary)' : 'var(--text-muted)',
                flex: 1,
              }}>
                {isCurrent ? stage.label.replace('...', dots) : stage.label.replace('...', isCompleted ? '' : '...')}
              </span>

              {isCompleted && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}
                >
                  Done
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ textAlign: 'center', marginTop: 28, fontSize: 13, color: 'var(--text-muted)' }}
      >
        🔒 Your URL is never stored without permission
      </motion.div>
    </motion.div>
  );
}
