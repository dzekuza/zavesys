'use client';

import { useWindowWidth } from '@/hooks/useWindowWidth';

const FOOTER_COLS = [
  { title: 'Shop', links: ['Collar sets', 'Charms', 'Gift sets', 'Sale'] },
  { title: 'Help', links: ['Sizing guide', 'Shipping', 'Returns', 'Care instructions'] },
  { title: 'Brand', links: ['Our story', 'Find on Etsy', 'Instagram', 'Contact'] },
];

export function LandingFooter() {
  const w = useWindowWidth() ?? 1200;
  const isMobile = w < 768;

  return (
    <footer style={{ background: '#3D3530', padding: isMobile ? '40px 20px 32px' : '60px 40px 40px' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '2fr 1fr 1fr 1fr', gap: isMobile ? 24 : 48, marginBottom: isMobile ? 32 : 56 }}>
          <div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 22, fontWeight: 500, letterSpacing: '-0.03em', color: '#FAF7F2', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#A8D5A2' }} />
              Žavesys
            </div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: 'rgba(250,247,242,0.5)', lineHeight: 1.7, maxWidth: 260 }}>Waterproof dog collars with snap-on charms. Handmade in Vilnius, Lithuania.</p>
            <div style={{ marginTop: 20, fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: 'rgba(250,247,242,0.35)', fontStyle: 'italic' }}>Vandeniui atspari.</div>
          </div>
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.35)', marginBottom: 16 }}>{col.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(l => (
                  <a key={l} href="#" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: 'rgba(250,247,242,0.55)', textDecoration: 'none', transition: 'color 150ms' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#FAF7F2')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,247,242,0.55)')}>
                    {l}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(250,247,242,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: 'rgba(250,247,242,0.3)' }}>© 2025 Žavesys. Made with care in Lithuania.</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: 'rgba(250,247,242,0.3)' }}>@zavesys · Etsy · Instagram</div>
        </div>
      </div>
    </footer>
  );
}
