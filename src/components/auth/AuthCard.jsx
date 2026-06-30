'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Zap, ArrowRight } from 'lucide-react';

export default function AuthCard({ mode = 'login' }) {
  const isLogin = mode === 'login';
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        background: 'rgba(13, 17, 23, 0.9)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 24,
        padding: 48,
        maxWidth: 440,
        width: '100%',
        margin: '0 auto',
        boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top glow */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 200, height: 1, background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.9), transparent)' }} />

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Zap size={18} color="white" />
        </div>
        <span style={{ fontWeight: 800, fontSize: 17 }}>SiteLens AI</span>
      </div>

      <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>
        {isLogin ? 'Welcome back' : 'Get started free'}
      </h1>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 28 }}>
        {isLogin ? 'Sign in to your SiteLens AI account' : 'Create your account in 30 seconds'}
      </p>

      {/* Google button */}
      <button
        style={{
          width: '100%',
          padding: '12px 20px',
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.04)',
          color: 'var(--text-primary)',
          fontSize: 14,
          fontWeight: 600,
          fontFamily: 'inherit',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          transition: 'all 0.2s',
          marginBottom: 20,
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
      >
        <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
        Continue with Google
      </button>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>or continue with email</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* Form */}
      <form onSubmit={e => { e.preventDefault(); }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {!isLogin && (
          <InputField icon={User} type="text" placeholder="Full name" value={name} onChange={setName} />
        )}
        <InputField icon={Mail} type="email" placeholder="Email address" value={email} onChange={setEmail} />
        <div style={{ position: 'relative' }}>
          <InputField icon={Lock} type={showPass ? 'text' : 'password'} placeholder="Password" value={password} onChange={setPassword} />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '13px', marginTop: 4 }}>
          {isLogin ? 'Sign in' : 'Create account'}
          <ArrowRight size={16} />
        </button>
      </form>

      {isLogin && (
        <div style={{ textAlign: 'center', marginTop: 14 }}>
          <a href="#" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Forgot your password?</a>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'var(--text-muted)' }}>
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <Link href={isLogin ? '/auth/signup' : '/auth/login'} style={{ color: '#6366f1', fontWeight: 600, textDecoration: 'none' }}>
          {isLogin ? 'Sign up free' : 'Sign in'}
        </Link>
      </div>
    </motion.div>
  );
}

function InputField({ icon: Icon, type, placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 16px',
      borderRadius: 12,
      border: `1px solid ${focused ? 'rgba(99,102,241,0.6)' : 'rgba(255,255,255,0.08)'}`,
      background: focused ? 'rgba(99,102,241,0.04)' : 'rgba(255,255,255,0.02)',
      transition: 'all 0.2s',
    }}>
      <Icon size={15} color={focused ? '#6366f1' : 'var(--text-muted)'} />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ flex: 1, background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: 14, fontFamily: 'inherit', outline: 'none' }}
      />
    </div>
  );
}
