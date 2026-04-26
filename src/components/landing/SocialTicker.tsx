'use client';

import { TICKER_ITEMS } from '@/lib/data';

const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

export function SocialTicker() {
  return (
    <div style={{
      background: '#3D3530', height: 36, overflow: 'hidden',
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 201,
      display: 'flex', alignItems: 'center',
    }}>
      <div className="ticker-track">
        {items.map((t, i) => (
          <span key={i} style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: 13,
            color: 'rgba(250,247,242,0.65)', padding: '0 32px',
            display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0,
          }}>
            {t}
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(250,247,242,0.2)', display: 'inline-block', marginLeft: 16 }} />
          </span>
        ))}
      </div>
    </div>
  );
}
