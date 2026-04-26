'use client';

const FEATURES = [
  { icon: '💧', text: 'Waterproof' },
  { icon: '⚡', text: '5-second swap' },
  { icon: '🇱🇹', text: 'Made in Lithuania' },
  { icon: '♻️', text: 'Eco-friendly materials' },
  { icon: '↩️', text: 'Free returns' },
];

export function FeaturesStrip({ variant }: { variant: 'cream' | 'bold' }) {
  const bg = variant === 'bold' ? '#2E2420' : '#F3EDE6';
  const textColor = variant === 'bold' ? 'rgba(250,247,242,0.6)' : '#6B6460';

  return (
    <div style={{ background: bg, padding: '20px 40px' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', display: 'flex', justifyContent: 'space-around', gap: 20, flexWrap: 'wrap' }}>
        {FEATURES.map(f => (
          <div key={f.text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>{f.icon}</span>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, color: textColor }}>{f.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
