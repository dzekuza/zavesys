'use client';

import { useWindowWidth } from '@/hooks/useWindowWidth';
import { Collar, COLLARS, ALL_CHARMS, SIZES } from '@/lib/data';
import { UrgencyBar } from './UrgencyBar';
import { TrustBadges } from './TrustBadges';

interface ConfigPanelProps {
  collar: Collar;
  setCollar: (c: Collar) => void;
  selectedCharms: (string | null)[];
  toggleCharm: (id: string) => void;
  size: string;
  setSize: (s: string) => void;
  engraving: string;
  setEngraving: (v: string) => void;
  onAddToCart: () => void;
  isDark: boolean;
  showEngraving: boolean;
}

export function ConfigPanel({
  collar, setCollar, selectedCharms, toggleCharm,
  size, setSize, engraving, setEngraving, onAddToCart, isDark, showEngraving,
}: ConfigPanelProps) {
  const w = useWindowWidth();
  const isMobile = w < 768;

  const panelBg = isDark ? 'rgba(30,22,18,0.85)' : 'rgba(255,255,255,0.92)';
  const borderColor = isDark ? 'rgba(255,255,255,0.1)' : '#E8E3DC';
  const textPrimary = isDark ? '#FAF7F2' : '#3D3530';
  const textSecondary = isDark ? 'rgba(250,247,242,0.55)' : '#6B6460';
  const divider = isDark ? 'rgba(255,255,255,0.08)' : '#F0EBE5';

  const sectionStyle: React.CSSProperties = { paddingBottom: 16, marginBottom: 16, borderBottom: `1px solid ${divider}` };

  return (
    <div
      className="config-panel"
      style={{
        width: isMobile ? '100%' : 400, flexShrink: 0,
        maxHeight: isMobile ? 'none' : '600px',
        position: isMobile ? 'relative' : 'sticky', top: isMobile ? 0 : 80,
        overflowY: 'auto', overscrollBehavior: 'contain',
        background: panelBg, backdropFilter: 'blur(24px)',
        borderRadius: isMobile ? '24px 24px 0 0' : 24,
        border: `1px solid ${borderColor}`,
        margin: isMobile ? '0' : '80px 24px 24px 0',
        padding: isMobile ? '24px 20px 40px' : '28px 28px 32px',
        display: 'flex', flexDirection: 'column', gap: 0,
        transition: 'background 400ms',
        boxShadow: isMobile ? '0 -8px 40px rgba(0,0,0,0.1)' : '0 8px 40px rgba(0,0,0,0.1)',
      }}
    >
      {/* Header */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: isDark ? 'rgba(250,247,242,0.35)' : '#9B948F', marginBottom: 10 }}>Collar set</div>
        <h1 style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', color: textPrimary, lineHeight: 1.15, marginBottom: 6 }}>
          Build your collar
        </h1>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 24, fontWeight: 500, color: textPrimary }}>€28</span>
          <span style={{ fontSize: 13, color: textSecondary }}>· 5 charms included</span>
        </div>
      </div>

      {/* Collar colour */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: isDark ? 'rgba(250,247,242,0.35)' : '#9B948F', marginBottom: 14 }}>
          Collar colour — <span style={{ textTransform: 'none', letterSpacing: 0, fontSize: 12, fontWeight: 400, color: textSecondary }}>{collar.name}</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {COLLARS.map(c => (
            <button
              key={c.id}
              onClick={() => setCollar(c)}
              title={c.name}
              style={{
                width: 40, height: 40, borderRadius: '50%', background: c.color, border: 'none', cursor: 'pointer',
                outline: collar.id === c.id ? `3px solid ${textPrimary}` : '3px solid transparent',
                outlineOffset: 3, transition: 'all 200ms',
                boxShadow: collar.id === c.id ? `0 0 0 1px ${panelBg}` : 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* Charm picker */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: isDark ? 'rgba(250,247,242,0.35)' : '#9B948F' }}>
            Charms — <span style={{ textTransform: 'none', letterSpacing: 0, fontSize: 12, fontWeight: 400, color: textSecondary }}>{selectedCharms.filter(Boolean).length}/5 selected</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3,1fr)' : 'repeat(4,1fr)', gap: 10 }}>
          {ALL_CHARMS.map(c => {
            const isSelected = selectedCharms.includes(c.id);
            const isFull = selectedCharms.filter(Boolean).length >= 5 && !isSelected;
            return (
              <button
                key={c.id}
                onClick={() => !isFull && toggleCharm(c.id)}
                title={c.name}
                style={{
                  aspectRatio: '1', borderRadius: 14, background: c.bg, border: 'none',
                  cursor: isFull ? 'not-allowed' : 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
                  opacity: isFull ? 0.3 : 1,
                  outline: isSelected ? `2.5px solid ${textPrimary}` : '2.5px solid transparent',
                  transform: isSelected ? 'scale(1.06)' : 'scale(1)',
                  transition: 'all 180ms ease',
                  boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                }}
              >
                <span style={{ fontSize: 22 }}>{c.e}</span>
                <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(61,53,48,0.6)' }}>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Size */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: isDark ? 'rgba(250,247,242,0.35)' : '#9B948F', marginBottom: 14 }}>Size</div>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: 8, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
          {SIZES.map(s => (
            <button
              key={s}
              onClick={() => setSize(s)}
              style={{
                fontSize: 13, fontWeight: 500, padding: '10px 16px', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                border: size === s ? `2px solid ${textPrimary}` : `1.5px solid ${borderColor}`,
                background: size === s ? textPrimary : 'transparent',
                color: size === s ? (isDark ? '#3D3530' : '#FAF7F2') : textSecondary,
                transition: 'all 150ms',
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: '#A8D5A2', cursor: 'pointer' }}>Sizing guide →</div>
      </div>

      {/* Engraving */}
      {showEngraving && (
        <div style={sectionStyle}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: isDark ? 'rgba(250,247,242,0.35)' : '#9B948F', marginBottom: 14 }}>
            Name tag engraving <span style={{ textTransform: 'none', letterSpacing: 0, fontSize: 11, color: isDark ? 'rgba(250,247,242,0.25)' : '#B0A8A2' }}>— optional</span>
          </div>
          <input
            type="text"
            value={engraving}
            onChange={e => setEngraving(e.target.value.slice(0, 20))}
            placeholder="Your dog's name"
            maxLength={20}
            style={{
              fontSize: 14, width: '100%', padding: '11px 14px', borderRadius: 12,
              border: `1.5px solid ${borderColor}`,
              background: isDark ? 'rgba(255,255,255,0.06)' : 'white',
              color: textPrimary, outline: 'none', transition: 'border-color 150ms',
              fontFamily: "'DM Sans',sans-serif",
            }}
            onFocus={e => (e.target.style.borderColor = '#A8D5A2')}
            onBlur={e => (e.target.style.borderColor = borderColor)}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: 11, color: isDark ? 'rgba(250,247,242,0.25)' : '#9B948F' }}>{engraving.length}/20 characters</span>
          </div>
          {engraving && (
            <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: isDark ? 'rgba(255,255,255,0.05)' : '#F3EDE6', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E8E3DC'}` }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{ width: 1.5, height: 8, background: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(61,53,48,0.2)', borderRadius: 1 }} />
                <div style={{
                  background: isDark ? 'rgba(255,255,255,0.12)' : 'white',
                  border: isDark ? '1px solid rgba(255,255,255,0.18)' : '1px solid #D4C9BF',
                  borderRadius: 6, padding: '4px 10px',
                  boxShadow: isDark ? 'none' : '0 2px 6px rgba(61,53,48,0.1)',
                }}>
                  <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.04em', color: isDark ? 'rgba(250,247,242,0.8)' : '#3D3530', whiteSpace: 'nowrap' }}>{engraving}</span>
                </div>
              </div>
              <span style={{ fontSize: 12, color: isDark ? 'rgba(250,247,242,0.3)' : '#9B948F' }}>Tag preview</span>
            </div>
          )}
        </div>
      )}

      <UrgencyBar collar={collar} isDark={isDark} />

      {/* Summary */}
      <div style={{ marginBottom: 20, padding: '14px 16px', borderRadius: 12, background: isDark ? 'rgba(255,255,255,0.05)' : '#F3EDE6' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 13, color: textSecondary }}>{collar.name} collar</span>
          <span style={{ fontSize: 13, color: textPrimary }}>€28</span>
        </div>
        {selectedCharms.filter(Boolean).length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 13, color: textSecondary }}>{selectedCharms.filter(Boolean).length} charms incl.</span>
            <span style={{ fontSize: 13, color: '#A8D5A2' }}>included</span>
          </div>
        )}
        {engraving && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, color: textSecondary }}>"{engraving}"</span>
            <span style={{ fontSize: 13, color: '#A8D5A2' }}>included</span>
          </div>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={onAddToCart}
        style={{
          fontSize: 16, fontWeight: 500, padding: '15px', borderRadius: 100, border: 'none',
          background: '#A8D5A2', color: '#2a5a25', cursor: 'pointer',
          width: '100%', transition: 'background 150ms',
          boxShadow: '0 4px 16px rgba(168,213,162,0.4)',
          fontFamily: "'DM Sans',sans-serif",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#8fc489')}
        onMouseLeave={e => (e.currentTarget.style.background = '#A8D5A2')}
      >
        Add to cart — €28
      </button>

      <div style={{ marginTop: 12, display: 'flex', gap: 16, justifyContent: 'center' }}>
        {['💧 Waterproof', '⚡ 5-sec swap', '🇱🇹 Made in LT'].map(t => (
          <span key={t} style={{ fontSize: 11, color: isDark ? 'rgba(250,247,242,0.3)' : '#9B948F' }}>{t}</span>
        ))}
      </div>

      <TrustBadges isDark={isDark} />
    </div>
  );
}
