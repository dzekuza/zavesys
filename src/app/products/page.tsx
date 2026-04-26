'use client';

import { useState } from 'react';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { PRODUCTS, ALL_CHARMS, Product } from '@/lib/data';

type Filter = 'all' | 'collars' | 'charms';

function SimpleNav() {
  const w = useWindowWidth();
  const isMobile = w < 768;
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300, height: 60,
      background: 'rgba(250,247,242,0.9)', backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(61,53,48,0.06)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: isMobile ? '0 20px' : '0 48px',
    }}>
      <a
        href="/"
        style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, color: '#9B948F', textDecoration: 'none', transition: 'color 150ms ease-out' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#3D3530')}
        onMouseLeave={e => (e.currentTarget.style.color = '#9B948F')}
      >
        ← Back
      </a>
      <a
        href="/"
        style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 20, fontWeight: 500, letterSpacing: '-0.03em', color: '#3D3530', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}
      >
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#A8D5A2' }} />
        Žavesys
      </a>
      <a
        href="/configure"
        className="btn-press"
        style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, padding: '8px 18px', borderRadius: 100, background: '#A8D5A2', color: '#2a5a25', textDecoration: 'none', transition: 'background-color 150ms ease-out, transform 100ms ease-out' }}
        onMouseEnter={e => (e.currentTarget.style.background = '#8fc489')}
        onMouseLeave={e => (e.currentTarget.style.background = '#A8D5A2')}
      >
        Build yours →
      </a>
    </header>
  );
}

function CollarCard({ product }: { product: Product }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      data-animate="card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ cursor: 'pointer', borderRadius: 20, transform: hov ? 'translateY(-4px)' : 'translateY(0)', transition: 'transform 200ms ease-out' }}
    >
      <div style={{ height: 280, position: 'relative', overflow: 'hidden', borderRadius: 20 }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hov ? 'scale(1.05)' : 'scale(1)', transition: 'transform 400ms ease-out' }}
        />
        {product.badge && (
          <div style={{ position: 'absolute', top: 14, right: 14, background: product.badgeBg || '#eef7ee', borderRadius: 20, padding: '3px 12px', fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: product.badgeColor || '#3a7a3a' }}>
            {product.badge}
          </div>
        )}
        {/* Collar color swatch */}
        <div style={{ position: 'absolute', bottom: 14, left: 14, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(250,247,242,0.9)', backdropFilter: 'blur(6px)', borderRadius: 100, padding: '6px 10px' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: product.collarColor, border: '1px solid rgba(61,53,48,0.12)' }} />
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 500, color: '#3D3530', letterSpacing: '0.04em' }}>{product.name.replace(' set', '')}</span>
        </div>
      </div>
      <div style={{ padding: '16px 4px 8px' }}>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, fontWeight: 500, color: '#3D3530', marginBottom: 4 }}>{product.name}</div>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: '#9B948F', marginBottom: 14, lineHeight: 1.5 }}>{product.desc}</div>
        <div style={{ display: 'flex', gap: 5, marginBottom: 16 }}>
          {product.charms.slice(0, 5).map((charm, i) => (
            <div key={i} title={`Charm ${i + 1}`} style={{ width: 26, height: 26, borderRadius: '50%', background: charm.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>
              {charm.e}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 20, fontWeight: 500, color: '#3D3530' }}>
            {product.price}
            <span style={{ fontSize: 12, fontWeight: 400, color: '#9B948F', marginLeft: 6 }}>· 5 charms</span>
          </div>
          <a href="/configure" style={{ textDecoration: 'none' }}>
            <button
              className="btn-press"
              onMouseEnter={e => (e.currentTarget.style.background = '#8fc489')}
              onMouseLeave={e => (e.currentTarget.style.background = '#A8D5A2')}
              style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, padding: '9px 20px', borderRadius: 100, border: 'none', background: '#A8D5A2', color: '#2a5a25', cursor: 'pointer', transition: 'background-color 150ms ease-out, transform 100ms ease-out' }}
            >
              Customise
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const w = useWindowWidth();
  const isMobile = w < 768;
  const isTablet = w < 1024;
  const [filter, setFilter] = useState<Filter>('all');

  const filterOptions: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All products' },
    { key: 'collars', label: 'Collar sets' },
    { key: 'charms', label: 'Charms' },
  ];

  const showCollars = filter === 'all' || filter === 'collars';
  const showCharms = filter === 'all' || filter === 'charms';

  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh', fontFamily: "'DM Sans',sans-serif" }}>
      <SimpleNav />

      {/* Page header */}
      <div style={{ paddingTop: 60 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: isMobile ? '52px 20px 40px' : '72px 40px 48px' }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9B948F', marginBottom: 12 }}>
            {PRODUCTS.length} collar sets · {ALL_CHARMS.length} charms
          </div>
          <h1 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: isMobile ? 36 : 52, fontWeight: 500, letterSpacing: '-0.03em', color: '#3D3530', lineHeight: 1.05, margin: 0 }}>
            All products
          </h1>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ borderBottom: '1px solid rgba(61,53,48,0.08)', position: 'sticky', top: 60, background: 'rgba(250,247,242,0.95)', backdropFilter: 'blur(10px)', zIndex: 200 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: isMobile ? '0 20px' : '0 40px', display: 'flex', gap: 0 }}>
          {filterOptions.map(({ key, label }) => (
            <button
              key={key}
              className="btn-press"
              onClick={() => setFilter(key)}
              style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500,
                padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer',
                color: filter === key ? '#3D3530' : '#9B948F',
                borderBottom: filter === key ? '2px solid #3D3530' : '2px solid transparent',
                transition: 'color 150ms ease-out, border-color 150ms ease-out, transform 100ms ease-out',
                marginBottom: -1,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: isMobile ? '0 20px 80px' : '0 40px 100px' }}>

        {/* Collar sets */}
        {showCollars && (
          <section style={{ paddingTop: isMobile ? 48 : 64 }}>
            {filter === 'all' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
                <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 24, fontWeight: 500, letterSpacing: '-0.02em', color: '#3D3530', margin: 0 }}>Collar sets</h2>
                <span style={{ fontSize: 13, color: '#9B948F' }}>Each includes 5 snap-on charms</span>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: isMobile ? 16 : 28 }}>
              {PRODUCTS.map(p => <CollarCard key={p.id} product={p} />)}
            </div>
          </section>
        )}

        {/* Divider */}
        {filter === 'all' && (
          <div style={{ height: 1, background: 'rgba(61,53,48,0.08)', margin: isMobile ? '56px 0' : '72px 0' }} />
        )}

        {/* Individual charms */}
        {showCharms && (
          <section style={{ paddingTop: filter === 'charms' ? (isMobile ? 48 : 64) : 0 }}>
            {filter === 'all' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
                <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 24, fontWeight: 500, letterSpacing: '-0.02em', color: '#3D3530', margin: 0 }}>Individual charms</h2>
                <span style={{ fontSize: 13, color: '#9B948F' }}>Add extras · €4 each</span>
              </div>
            )}
            {filter === 'charms' && (
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 24, fontWeight: 500, letterSpacing: '-0.02em', color: '#3D3530', margin: 0 }}>Charms</h2>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: '#9B948F', marginTop: 8 }}>Snap on and off in five seconds. Compatible with all collar sets.</p>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3,1fr)' : isTablet ? 'repeat(4,1fr)' : 'repeat(6,1fr)', gap: isMobile ? 12 : 16 }}>
              {ALL_CHARMS.map((charm, i) => (
                <CharmCard key={charm.id} charm={charm} index={i} />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Footer */}
      <footer style={{ background: '#3D3530', padding: isMobile ? '32px 20px' : '40px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.03em', color: '#FAF7F2', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#A8D5A2' }} />
          Žavesys
        </div>
        <div style={{ fontSize: 12, color: 'rgba(250,247,242,0.35)' }}>© 2025 · Made with care in Lithuania</div>
        <div style={{ fontSize: 13, color: 'rgba(250,247,242,0.4)', fontStyle: 'italic' }}>Vandeniui atspari.</div>
      </footer>
    </div>
  );
}

function CharmCard({ charm, index }: { charm: typeof ALL_CHARMS[number]; index: number }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 16, padding: '20px 12px 16px', textAlign: 'center', cursor: 'pointer',
        background: hov ? charm.bg + '30' : 'rgba(61,53,48,0.03)',
        border: `1.5px solid ${hov ? charm.bg : 'transparent'}`,
        transform: hov ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'transform 200ms ease-out, background-color 200ms ease-out, border-color 200ms ease-out',
      }}
    >
      <div style={{ width: 52, height: 52, borderRadius: '50%', background: charm.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 12px', boxShadow: hov ? `0 6px 20px ${charm.bg}80` : 'none', transition: 'box-shadow 200ms ease-out' }}>
        {charm.e}
      </div>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, color: '#3D3530', marginBottom: 2 }}>{charm.name}</div>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: '#9B948F' }}>€4</div>
    </div>
  );
}
