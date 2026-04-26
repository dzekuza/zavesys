'use client';

import { useState, useEffect } from 'react';
import { useWindowWidth } from '@/hooks/useWindowWidth';

interface LandingNavProps {
  cartCount?: number;
  onCart?: () => void;
}

export function LandingNav({ cartCount = 0, onCart }: LandingNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const w = useWindowWidth();
  const isMobile = w < 768;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 36, left: 0, right: 0, zIndex: 200, height: 64,
      background: scrolled ? 'rgba(250,247,242,0.95)' : 'rgba(250,247,242,0)',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid #E8E3DC' : '1px solid transparent',
      transition: 'all 250ms ease',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: isMobile ? '0 20px' : '0 40px',
    }}>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 22, fontWeight: 500, letterSpacing: '-0.03em', color: '#3D3530', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#A8D5A2' }} />
        Žavesys
      </div>

      {!isMobile && (
        <nav style={{ display: 'flex', gap: 32 }}>
          {['Shop', 'Charms', 'About', 'Care'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, color: '#9B948F', textDecoration: 'none', transition: 'color 150ms' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#3D3530')}
              onMouseLeave={e => (e.currentTarget.style.color = '#9B948F')}
            >{l}</a>
          ))}
        </nav>
      )}

      <button onClick={onCart} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: 8, color: '#3D3530' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        {cartCount > 0 && (
          <span style={{ position: 'absolute', top: 4, right: 4, width: 16, height: 16, borderRadius: '50%', background: '#A8D5A2', color: '#2a5a25', fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans',sans-serif" }}>
            {cartCount}
          </span>
        )}
      </button>
    </header>
  );
}
