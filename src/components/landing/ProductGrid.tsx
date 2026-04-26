'use client';

import { useState } from 'react';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { PRODUCTS, Product } from '@/lib/data';

function ProductCard({ product }: { product: Product }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'white', borderRadius: 20, overflow: 'hidden',
        border: '1px solid #E8E3DC', cursor: 'pointer',
        boxShadow: hov ? '0 8px 32px rgba(61,53,48,0.12)' : '0 2px 8px rgba(61,53,48,0.06)',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 200ms ease',
      }}
    >
      <div style={{ height: 200, background: product.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, position: 'relative', padding: 24 }}>
        {product.badge && (
          <div style={{ position: 'absolute', top: 14, right: 14, background: product.badgeBg || '#eef7ee', borderRadius: 20, padding: '3px 10px', fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: product.badgeColor || '#3a7a3a' }}>
            {product.badge}
          </div>
        )}
        <div style={{ height: 12, borderRadius: 6, width: 160, background: product.collarColor, boxShadow: `0 3px 10px ${product.collarColor}88` }} />
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {product.charms.map((c, i) => (
            <div key={i} style={{ width: i === 1 ? 44 : 34, height: i === 1 ? 44 : 34, borderRadius: '50%', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: i === 1 ? 22 : 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              {c.e}
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '20px 22px 22px' }}>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 500, color: '#3D3530', marginBottom: 4 }}>{product.name}</div>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: '#9B948F', marginBottom: 14, lineHeight: 1.5 }}>{product.desc}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, fontWeight: 500, color: '#3D3530' }}>
            {product.price} <span style={{ fontSize: 12, fontWeight: 400, color: '#9B948F' }}>· 5 charms</span>
          </div>
          <a href="/configure" style={{ textDecoration: 'none' }}>
            <button style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, padding: '8px 18px', borderRadius: 100, border: 'none', background: '#A8D5A2', color: '#2a5a25', cursor: 'pointer', transition: 'background 150ms' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#8fc489')}
              onMouseLeave={e => (e.currentTarget.style.background = '#A8D5A2')}>
              Add to cart
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export function ProductGrid() {
  const w = useWindowWidth();
  const isMobile = w < 768;
  const isTablet = w < 1024;

  return (
    <section id="shop" style={{ padding: isMobile ? '60px 20px' : '100px 40px', background: '#FAF7F2' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9B948F', marginBottom: 12 }}>Collar sets</div>
            <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 40, fontWeight: 500, letterSpacing: '-0.02em', color: '#3D3530', lineHeight: 1.1 }}>Shop all collars</h2>
          </div>
          <a href="#" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: '#9B948F', textDecoration: 'none' }}>View all →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: isMobile ? 16 : 24 }}>
          {PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
