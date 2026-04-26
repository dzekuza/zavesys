'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useWindowWidth } from '@/hooks/useWindowWidth';

const NAV_LINKS = [
  { label: 'Shop collars', href: '/products' },
  { label: 'Build yours', href: '/configure' },
  { label: 'How it works', href: '/#charms' },
  { label: 'Sizing guide', href: '/guide/how-to-measure-dog-collar' },
  { label: 'Care & materials', href: '/guide/silicone-vs-nylon-dog-collars' },
];

interface LandingNavProps {
  cartCount?: number;
  onCart?: () => void;
  topOffset?: number;
}

export function LandingNav({ cartCount = 0, onCart, topOffset = 36 }: LandingNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const w = useWindowWidth() ?? 1200;
  const isMobile = w < 768;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header style={{
        position: 'fixed', top: topOffset, left: 0, right: 0, zIndex: 200, height: 64,
        background: scrolled || menuOpen ? 'rgba(250,247,242,0.97)' : 'rgba(250,247,242,0)',
        backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
        borderBottom: scrolled || menuOpen ? '1px solid #E8E3DC' : '1px solid transparent',
        transition: 'background 250ms ease, backdrop-filter 250ms ease, border-color 250ms ease',
        display: 'grid', alignItems: 'center',
        gridTemplateColumns: '1fr auto 1fr',
        padding: isMobile ? '0 20px' : '0 40px',
      }}>
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
        {isMobile && <div />}

        <Link href="/" aria-label="Žavesys home" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/pawcharms.svg" alt="Žavesys" style={{ height: 44, width: 'auto', display: 'block' }} />
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
          <button onClick={onCart} aria-label="Cart" style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: 8, color: '#3D3530' }}>
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

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: '#3D3530', display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center', width: 36, height: 36 }}
          >
            <span style={{ display: 'block', width: 20, height: 1.5, background: '#3D3530', borderRadius: 2, transition: 'transform 250ms ease, opacity 250ms ease', transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: 20, height: 1.5, background: '#3D3530', borderRadius: 2, transition: 'opacity 250ms ease', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 20, height: 1.5, background: '#3D3530', borderRadius: 2, transition: 'transform 250ms ease, opacity 250ms ease', transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <div
        aria-hidden={!menuOpen}
        style={{
          position: 'fixed', inset: 0, zIndex: 199,
          background: '#FAF7F2',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '0 40px',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 250ms ease',
        }}
      >
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Luckiest Guy',sans-serif",
                fontSize: 'clamp(36px, 8vw, 64px)',
                fontWeight: 400,
                color: '#3D3530',
                textDecoration: 'none',
                lineHeight: 1.15,
                transition: 'color 150ms ease, transform 150ms ease',
                display: 'block',
                transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
                transitionDelay: menuOpen ? `${i * 40}ms` : '0ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#A8D5A2'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#3D3530'; }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div style={{ position: 'absolute', bottom: 40, left: 40, right: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: '#9B948F' }}>Made in Vilnius, Lithuania</span>
          <a href="mailto:hello@pawcharms.lt" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: '#9B948F', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#3D3530')}
            onMouseLeave={e => (e.currentTarget.style.color = '#9B948F')}
          >hello@pawcharms.lt</a>
        </div>
      </div>
    </>
  );
}
