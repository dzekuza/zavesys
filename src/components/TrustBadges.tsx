'use client';

export function TrustBadges({ isDark }: { isDark: boolean }) {
  const textColor = isDark ? 'rgba(250,247,242,0.45)' : '#9B948F';
  const iconColor = isDark ? 'rgba(250,247,242,0.25)' : '#C8C0B8';

  const badges = [
    { icon: '↩', label: '30-day returns' },
    { icon: '🔒', label: 'Secure checkout' },
    { icon: '🚚', label: 'Free over €40' },
    { icon: '🇱🇹', label: 'Made in LT' },
  ];

  return (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', padding: '16px 0 4px', flexShrink: 0 }}>
      {badges.map(b => (
        <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ fontSize: 13, color: iconColor }}>{b.icon}</span>
          <span style={{ fontSize: 11, fontWeight: 500, color: textColor }}>{b.label}</span>
        </div>
      ))}
    </div>
  );
}
