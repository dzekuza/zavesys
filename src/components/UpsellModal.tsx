'use client';

import { useState } from 'react';
import { Collar, ALL_CHARMS } from '@/lib/data';

const extras = ALL_CHARMS.slice(5);

interface UpsellModalProps {
  collar: Collar;
  onClose: () => void;
  onAddCharms: (ids: string[]) => void;
}

export function UpsellModal({ collar, onClose, onAddCharms }: UpsellModalProps) {
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (id: string) =>
    setPicked(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(61,53,48,0.5)', backdropFilter: 'blur(4px)' }}>
      <div className="slide-up" style={{ width: 480, background: '#FAF7F2', borderRadius: 28, padding: '40px 40px 32px', position: 'relative', boxShadow: '0 24px 80px rgba(61,53,48,0.2)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 18, right: 20, background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#9B948F', lineHeight: 1 }}>×</button>

        {/* Success indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, padding: '12px 16px', background: '#eef7ee', borderRadius: 12, border: '1px solid #c8e8c4' }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#A8D5A2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, color: '#2a5a25', flexShrink: 0 }}>✓</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#2a5a25' }}>{collar.name} collar added to cart</div>
            <div style={{ fontSize: 12, color: '#5a9a55' }}>Your 5 included charms are ready to pick.</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9B948F', marginBottom: 10 }}>Complete your set</div>
          <h2 style={{ fontSize: 22, fontWeight: 500, color: '#3D3530', lineHeight: 1.2, marginBottom: 8 }}>Add extra charms for €6 each.</h2>
          <p style={{ fontSize: 14, color: '#6B6460', lineHeight: 1.6 }}>Swap by mood, season, or occasion. Most owners buy 2–3 extras.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 24 }}>
          {extras.map(c => {
            const sel = picked.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggle(c.id)}
                style={{
                  borderRadius: 14, background: c.bg,
                  border: sel ? '2.5px solid #3D3530' : '2.5px solid transparent',
                  padding: '12px 8px', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  transform: sel ? 'scale(1.05)' : 'scale(1)', transition: 'all 150ms',
                  fontFamily: "'DM Sans',sans-serif",
                }}
              >
                <span style={{ fontSize: 24 }}>{c.e}</span>
                <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(61,53,48,0.6)' }}>{c.name}</span>
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={onClose}
            style={{ flex: 1, fontSize: 14, fontWeight: 500, padding: '13px', borderRadius: 100, border: '2px solid #E8E3DC', background: 'white', color: '#6B6460', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}
          >
            No thanks
          </button>
          <button
            onClick={() => { onAddCharms(picked); onClose(); }}
            style={{ flex: 2, fontSize: 14, fontWeight: 500, padding: '13px', borderRadius: 100, border: 'none', background: '#A8D5A2', color: '#2a5a25', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}
          >
            {picked.length > 0 ? `Add ${picked.length} charm${picked.length > 1 ? 's' : ''} — +€${picked.length * 6}` : 'Go to cart →'}
          </button>
        </div>
      </div>
    </div>
  );
}
