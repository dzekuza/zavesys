'use client';

import { useWindowWidth } from '@/hooks/useWindowWidth';
import { LANDING_REVIEWS } from '@/lib/data';

export function Reviews() {
  const w = useWindowWidth();
  const isMobile = w < 768;

  return (
    <section style={{ padding: isMobile ? '60px 20px' : '100px 40px', background: '#F3EDE6' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9B948F', marginBottom: 14 }}>Customer love</div>
          <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 40, fontWeight: 500, letterSpacing: '-0.02em', color: '#3D3530' }}>Dogs and owners approve.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: isMobile ? 16 : 28 }}>
          {LANDING_REVIEWS.map((r, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 20, padding: 32, border: '1px solid #E8E3DC' }}>
              <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
                {Array.from({ length: r.rating }).map((_, j) => <span key={j} style={{ color: '#F9E4A0', fontSize: 16 }}>★</span>)}
              </div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: '#3D3530', lineHeight: 1.7, marginBottom: 24 }}>"{r.text}"</p>
              <div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, color: '#3D3530' }}>{r.name}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: '#9B948F', marginTop: 2 }}>{r.dog}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
