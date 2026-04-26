'use client';

import { useState } from 'react';

export function ExitModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="fade-in" style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(61,53,48,0.5)', backdropFilter: 'blur(4px)' }}>
      <div className="slide-up" style={{ width: 480, background: '#FAF7F2', borderRadius: 28, padding: '48px 44px', position: 'relative', boxShadow: '0 24px 80px rgba(61,53,48,0.2)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 18, right: 20, background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#9B948F', lineHeight: 1 }}>×</button>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 28 }}>
          {(['#F4B5C0', '#A8D5A2', '#B8D8F4', '#D4B8F4', '#F9E4A0'] as const).map((c, i) => (
            <div key={i} style={{ width: 44, height: 44, borderRadius: '50%', background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
              {['🌸', '🌿', '⭐', '🦋', '☀️'][i]}
            </div>
          ))}
        </div>

        {!sent ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9B948F', marginBottom: 12 }}>Before you go</div>
              <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', color: '#3D3530', lineHeight: 1.2, marginBottom: 12 }}>10% off your first collar.</h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: '#6B6460', lineHeight: 1.7 }}>Join our list. Get a discount code instantly. No spam — just new drops and dog content.</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{ flex: 1, fontFamily: "'DM Sans',sans-serif", fontSize: 14, padding: '12px 16px', borderRadius: 100, border: '1.5px solid #E8E3DC', background: 'white', color: '#3D3530', outline: 'none' }}
                onFocus={e => (e.target.style.borderColor = '#A8D5A2')}
                onBlur={e => (e.target.style.borderColor = '#E8E3DC')}
              />
              <button
                onClick={() => email && setSent(true)}
                style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, padding: '12px 22px', borderRadius: 100, border: 'none', background: '#A8D5A2', color: '#2a5a25', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Get 10% off
              </button>
            </div>
            <div style={{ textAlign: 'center', marginTop: 14, fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: '#9B948F' }}>
              <span onClick={onClose} style={{ cursor: 'pointer', textDecoration: 'underline' }}>No thanks, I'll pay full price</span>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🌸</div>
            <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 24, fontWeight: 500, color: '#3D3530', marginBottom: 10 }}>You're in!</h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: '#6B6460', lineHeight: 1.7, marginBottom: 24 }}>Check your inbox for your 10% off code. Valid on your first order.</p>
            <button onClick={onClose} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, padding: '12px 28px', borderRadius: 100, border: 'none', background: '#A8D5A2', color: '#2a5a25', cursor: 'pointer' }}>Shop now →</button>
          </div>
        )}
      </div>
    </div>
  );
}
