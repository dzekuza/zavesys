'use client';

import { useState, useEffect } from 'react';
import { SocialTicker } from './landing/SocialTicker';
import { LandingNav } from './landing/LandingNav';
import { HeroCream, HeroBold } from './landing/Hero';
import { FeaturesStrip } from './landing/FeaturesStrip';
import { HowItWorks } from './landing/HowItWorks';
import { ProductGrid } from './landing/ProductGrid';
import { CharmGrid } from './landing/CharmGrid';
import { About } from './landing/About';
import { Reviews } from './landing/Reviews';
import { LandingFooter } from './landing/LandingFooter';
import { StickyCTA } from './landing/StickyCTA';
import { ExitModal } from './landing/ExitModal';

type Variant = 'cream' | 'bold';

export function LandingPage() {
  const [variant, setVariant] = useState<Variant>('cream');
  const [heroSize, setHeroSize] = useState(72);
  const [showReviews, setShowReviews] = useState(true);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [exitShown, setExitShown] = useState(false);

  useEffect(() => {
    const fn = () => setShowStickyCTA(window.scrollY > 500);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (exitShown) return;
    const fn = (e: MouseEvent) => {
      if (e.clientY < 20) { setShowExitModal(true); setExitShown(true); }
    };
    document.addEventListener('mouseleave', fn);
    return () => document.removeEventListener('mouseleave', fn);
  }, [exitShown]);

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif" }}>
      <SocialTicker />
      <LandingNav />

      {variant === 'cream'
        ? <HeroCream heroSize={heroSize} />
        : <HeroBold heroSize={heroSize} />}

      <FeaturesStrip variant={variant} />
      <HowItWorks />
      <ProductGrid />
      <CharmGrid />
      <About variant={variant} />
      {showReviews && <Reviews />}
      <LandingFooter />

      <StickyCTA visible={showStickyCTA} />
      {showExitModal && <ExitModal onClose={() => setShowExitModal(false)} />}

      {/* Tweaks panel */}
      <div style={{
        position: 'fixed', bottom: 24, left: 24, zIndex: 200,
        display: 'flex', flexDirection: 'column', gap: 8,
        background: 'rgba(250,247,242,0.95)', backdropFilter: 'blur(12px)',
        border: '1px solid #E8E3DC', borderRadius: 16, padding: '16px 20px',
        boxShadow: '0 4px 24px rgba(61,53,48,0.12)',
        minWidth: 200,
      }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9B948F', marginBottom: 4 }}>Tweaks</div>

        <div style={{ display: 'flex', gap: 6 }}>
          {(['cream', 'bold'] as Variant[]).map(v => (
            <button key={v} onClick={() => setVariant(v)} style={{
              flex: 1, fontSize: 12, fontWeight: 500, padding: '6px 10px', borderRadius: 8, cursor: 'pointer',
              border: 'none', transition: 'all 150ms',
              background: variant === v ? '#3D3530' : '#F3EDE6',
              color: variant === v ? '#FAF7F2' : '#9B948F',
              fontFamily: "'DM Sans',sans-serif",
            }}>
              {v === 'cream' ? '☀️ Cream' : '🌙 Dark'}
            </button>
          ))}
        </div>

        <div>
          <div style={{ fontSize: 11, color: '#9B948F', marginBottom: 4 }}>Hero size: {heroSize}px</div>
          <input type="range" min={48} max={96} step={4} value={heroSize} onChange={e => setHeroSize(+e.target.value)}
            style={{ width: '100%', accentColor: '#A8D5A2' }} />
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <input type="checkbox" checked={showReviews} onChange={e => setShowReviews(e.target.checked)} style={{ accentColor: '#A8D5A2' }} />
          <span style={{ fontSize: 12, color: '#6B6460', fontFamily: "'DM Sans',sans-serif" }}>Show reviews</span>
        </label>
      </div>
    </div>
  );
}
