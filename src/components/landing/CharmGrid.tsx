'use client';

import { useState } from 'react';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { ALL_CHARMS } from '@/lib/data';

export function CharmGrid() {
  const w = useWindowWidth() ?? 1200;
  const isMobile = w < 768;
  const [selected, setSelected] = useState<string | null>(null);
  const selectedCharm = ALL_CHARMS.find(c => c.id === selected);

  return (
    <section id="charms" style={{ padding: isMobile ? '60px 20px' : '100px 40px', background: '#FAF7F2' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 80, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9B948F', marginBottom: 16 }}>The charm collection</div>
            <h2 style={{ fontFamily: "'Luckiest Guy',sans-serif", fontSize: 48, fontWeight: 400, color: '#3D3530', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 20 }}>
              Your dog. Your style.
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: '#6B6460', lineHeight: 1.7, marginBottom: 32, maxWidth: 380 }}>
              Each charm clicks on in seconds and comes off just as easily. Collect them all, swap by mood, season, or occasion.
            </p>
            <button className="btn-press"
              style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 500, padding: '14px 32px', borderRadius: 100, cursor: 'pointer', background: '#A8D5A2', color: '#2a5a25', border: '2px solid transparent', transition: 'background-color 150ms ease-out, transform 100ms ease-out' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#8fc489')}
              onMouseLeave={e => (e.currentTarget.style.background = '#A8D5A2')}>
              Shop all charms
            </button>
            {selectedCharm && (
              <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: selectedCharm.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={encodeURI(selectedCharm.image)}
                    alt=""
                    aria-hidden="true"
                    style={{ width: 24, height: 24, objectFit: 'contain' }}
                  />
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, color: '#3D3530' }}>{selectedCharm.name} charm</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: '#9B948F' }}>€6 · snap-on · waterproof</div>
                </div>
              </div>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3,1fr)' : 'repeat(4,1fr)', gap: isMobile ? 10 : 16 }}>
            {ALL_CHARMS.map(c => (
              <div key={c.id}
                data-animate="card"
                onClick={() => setSelected(c.id === selected ? null : c.id)}
                style={{
                  width: '100%', aspectRatio: '1', borderRadius: 16, background: c.bg,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
                  cursor: 'pointer',
                  transition: 'transform 180ms ease-out, box-shadow 180ms ease-out, outline-color 120ms ease-out',
                  outline: c.id === selected ? '3px solid #3D3530' : '3px solid transparent',
                  outlineOffset: 3,
                  transform: c.id === selected ? 'scale(1.08)' : 'scale(1)',
                  boxShadow: c.id === selected ? '0 6px 20px rgba(0,0,0,0.12)' : 'none',
                }}
              >
                <img
                  src={encodeURI(c.image)}
                  alt=""
                  aria-hidden="true"
                  style={{ width: isMobile ? 62 : 86, height: isMobile ? 62 : 86, objectFit: 'contain' }}
                />
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: isMobile ? 9 : 10, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(61,53,48,0.55)' }}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
