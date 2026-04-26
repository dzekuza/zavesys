'use client';

import { useState } from 'react';
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

const STEPS = ['Colour', 'Charms', 'Size', 'Engraving'] as const;
type Step = 0 | 1 | 2 | 3;

export function ConfigPanel({
  collar, setCollar, selectedCharms, toggleCharm,
  size, setSize, engraving, setEngraving, onAddToCart, isDark, showEngraving,
}: ConfigPanelProps) {
  const w = useWindowWidth() ?? 1200;
  const isMobile = w < 768;
  const [step, setStep] = useState<Step>(0);

  const panelBg = isDark ? 'rgba(30,22,18,0.85)' : 'rgba(255,255,255,0.92)';
  const borderColor = isDark ? 'rgba(255,255,255,0.1)' : '#E8E3DC';
  const textPrimary = isDark ? '#FAF7F2' : '#3D3530';
  const textSecondary = isDark ? 'rgba(250,247,242,0.55)' : '#6B6460';
  const textMuted = isDark ? 'rgba(250,247,242,0.35)' : '#9B948F';
  const divider = isDark ? 'rgba(255,255,255,0.08)' : '#F0EBE5';
  const stepCount = showEngraving ? 4 : 3;
  const isLast = step === (showEngraving ? 3 : 2);

  const next = () => {
    if (step < stepCount - 1) setStep(s => (s + 1) as Step);
  };
  const back = () => {
    if (step > 0) setStep(s => (s - 1) as Step);
  };

  const visibleSteps = showEngraving ? STEPS : STEPS.slice(0, 3);

  return (
    <div
      className="config-panel"
      style={{
        width: isMobile ? 'auto' : 400, flexShrink: 0, alignSelf: isMobile ? 'stretch' : 'flex-end',
        height: 'auto',
        maxHeight: isMobile ? '80vh' : 'none',
        position: 'sticky', top: isMobile ? 0 : 80,
        overflowY: 'hidden', overscrollBehavior: 'contain',
        zIndex: 100,
        background: panelBg, backdropFilter: 'blur(24px)',
        borderRadius: 24,
        border: `1px solid ${borderColor}`,
        margin: isMobile ? '0 12px 16px' : '80px 24px 24px 0',
        padding: isMobile ? '20px 20px 32px' : '24px 28px 28px',
        display: 'flex', flexDirection: 'column', gap: 0,
        transition: 'background-color 400ms ease-out',
        boxShadow: isMobile ? '0 -8px 40px rgba(0,0,0,0.1)' : '0 8px 40px rgba(0,0,0,0.1)',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 16, paddingBottom: 14, borderBottom: `1px solid ${divider}` }}>
        <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: textMuted, marginBottom: 6 }}>Collar set</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h1 style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', color: textPrimary, lineHeight: 1.15 }}>
            Build your collar
          </h1>
          <span style={{ fontSize: 20, fontWeight: 500, color: textPrimary }}>€28</span>
        </div>
      </div>

      {/* Step tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
        {visibleSteps.map((label, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <button
              key={label}
              className={i <= step ? 'btn-press' : undefined}
              onClick={() => i <= step && setStep(i as Step)}
              style={{
                flex: 1, padding: '7px 4px', borderRadius: 10, border: 'none',
                cursor: i <= step ? 'pointer' : 'default',
                fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 500,
                letterSpacing: '0.04em',
                background: active
                  ? textPrimary
                  : done
                    ? (isDark ? 'rgba(168,213,162,0.2)' : '#E8F5E6')
                    : (isDark ? 'rgba(255,255,255,0.06)' : '#F3EDE6'),
                color: active
                  ? (isDark ? '#3D3530' : '#FAF7F2')
                  : done
                    ? '#A8D5A2'
                    : textMuted,
                transition: 'background-color 200ms ease-out, color 200ms ease-out, transform 100ms ease-out',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
              }}
            >
              {done && <span style={{ fontSize: 10 }}>✓</span>}
              {label}
            </button>
          );
        })}
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: isDark ? 'rgba(255,255,255,0.08)' : '#F0EBE5', borderRadius: 2, marginBottom: 20 }}>
        <div style={{
          height: '100%', borderRadius: 2, background: '#A8D5A2',
          width: `${((step + 1) / stepCount) * 100}%`,
          transition: 'width 300ms ease-out',
        }} />
      </div>

      {/* Step content — keyed by step to trigger fade-in animation on change */}
      <div key={step} className="fade-in" style={{ flex: '0 0 auto', minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', padding: '2px 4px 4px', margin: '0 -4px' }}>

        {/* Step 0 — Colour */}
        {step === 0 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: textMuted, marginBottom: 14 }}>
              Select colour — <span style={{ textTransform: 'none', letterSpacing: 0, fontSize: 12, fontWeight: 400, color: textSecondary }}>{collar.name}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
              {COLLARS.map(c => (
                <button
                  key={c.id}
                  className="btn-press"
                  onClick={() => { setCollar(c); setTimeout(next, 200); }}
                  style={{
                    aspectRatio: '1', borderRadius: 16, background: c.color, cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
                    outline: 'none',
                    border: collar.id === c.id ? `3px solid ${textPrimary}` : '3px solid transparent',
                    transition: 'border-color 150ms ease-out, box-shadow 200ms ease-out, transform 100ms ease-out',
                    boxShadow: collar.id === c.id ? `0 0 0 1px ${panelBg}, 0 4px 12px ${c.glowColor}` : `0 2px 8px ${c.glowColor}`,
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(61,53,48,0.7)', marginTop: 4 }}>{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1 — Charms */}
        {step === 1 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: textMuted, marginBottom: 14 }}>
              Choose charms — <span style={{ textTransform: 'none', letterSpacing: 0, fontSize: 12, fontWeight: 400, color: textSecondary }}>{selectedCharms.filter(Boolean).length}/5 selected</span>
            </div>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, alignItems: 'flex-start' }}>
              {ALL_CHARMS.map(c => {
                const isSelected = selectedCharms.includes(c.id);
                const isFull = selectedCharms.filter(Boolean).length >= 5 && !isSelected;
                return (
                  <button
                    key={c.id}
                    className={!isFull ? 'btn-press' : undefined}
                    onClick={() => !isFull && toggleCharm(c.id)}
                    title={c.name}
                    style={{
                      width: 64, height: 64, flexShrink: 0, borderRadius: 14, background: c.bg,
                      cursor: isFull ? 'not-allowed' : 'pointer',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
                      opacity: isFull ? 0.3 : 1,
                      outline: 'none',
                      border: isSelected ? `1px solid ${textPrimary}` : '1px solid transparent',
                      transform: isSelected ? 'scale(1.06)' : 'scale(1)',
                      transition: 'transform 180ms ease-out, box-shadow 180ms ease-out, border-color 120ms ease-out, opacity 150ms ease-out',
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
        )}

        {/* Step 2 — Size */}
        {step === 2 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: textMuted, marginBottom: 14 }}>Select size</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {SIZES.map(s => (
                <button
                  key={s}
                  className="btn-press"
                  onClick={() => { setSize(s); setTimeout(next, 200); }}
                  style={{
                    padding: '12px 14px', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                    outline: 'none', display: 'flex', flexDirection: 'column', gap: 2,
                    border: size === s ? `2px solid ${textPrimary}` : `1.5px solid ${borderColor}`,
                    background: size === s ? textPrimary : 'transparent',
                    transition: 'border-color 150ms ease-out, background-color 150ms ease-out, color 150ms ease-out, transform 100ms ease-out',
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600, color: size === s ? (isDark ? '#3D3530' : '#FAF7F2') : textPrimary }}>
                    {s.split(' — ')[0]}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 400, color: size === s ? (isDark ? 'rgba(61,53,48,0.65)' : 'rgba(250,247,242,0.65)') : textMuted }}>
                    {s.split(' — ')[1]}
                  </span>
                </button>
              ))}
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: '#A8D5A2', cursor: 'pointer' }}>Sizing guide →</div>
          </div>
        )}

        {/* Step 3 — Engraving */}
        {step === 3 && showEngraving && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: textMuted, marginBottom: 14 }}>
              Name tag <span style={{ textTransform: 'none', letterSpacing: 0, fontSize: 11, color: isDark ? 'rgba(250,247,242,0.25)' : '#B0A8A2' }}>— optional</span>
            </div>
            <input
              type="text"
              value={engraving}
              onChange={e => setEngraving(e.target.value.slice(0, 20))}
              placeholder="Your dog's name"
              maxLength={20}
              style={{
                fontSize: 14, width: '100%', boxSizing: 'border-box', padding: '12px 14px', borderRadius: 12,
                border: `1.5px solid ${borderColor}`,
                background: isDark ? 'rgba(255,255,255,0.06)' : 'white',
                color: textPrimary, outline: 'none', transition: 'border-color 150ms ease-out',
                fontFamily: "'DM Sans',sans-serif",
              }}
              onFocus={e => (e.target.style.borderColor = '#A8D5A2')}
              onBlur={e => (e.target.style.borderColor = borderColor)}
            />
            <div style={{ fontSize: 11, color: textMuted, marginTop: 6 }}>{engraving.length}/20 characters</div>
            {engraving && (
              <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: isDark ? 'rgba(255,255,255,0.05)' : '#F3EDE6', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E8E3DC'}` }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <div style={{ width: 1.5, height: 8, background: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(61,53,48,0.2)', borderRadius: 1 }} />
                  <div style={{ background: isDark ? 'rgba(255,255,255,0.12)' : 'white', border: isDark ? '1px solid rgba(255,255,255,0.18)' : '1px solid #D4C9BF', borderRadius: 6, padding: '4px 10px', boxShadow: isDark ? 'none' : '0 2px 6px rgba(61,53,48,0.1)' }}>
                    <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.04em', color: isDark ? 'rgba(250,247,242,0.8)' : '#3D3530', whiteSpace: 'nowrap' }}>{engraving}</span>
                  </div>
                </div>
                <span style={{ fontSize: 12, color: textMuted }}>Tag preview</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Nav buttons */}
      <div style={{ display: 'flex', gap: 8, marginTop: 20, flexShrink: 0 }}>
        {step > 0 && (
          <button className="btn-press" onClick={back} style={{
            flex: '0 0 auto', padding: '11px 18px', borderRadius: 100, border: `1.5px solid ${borderColor}`,
            background: 'transparent', color: textSecondary, cursor: 'pointer', fontSize: 14, fontWeight: 500,
            fontFamily: "'DM Sans',sans-serif", transition: 'border-color 150ms ease-out, color 150ms ease-out, transform 100ms ease-out',
          }}>
            ← Back
          </button>
        )}
        {!isLast ? (
          <button className="btn-press" onClick={next} style={{
            flex: 1, padding: '12px', borderRadius: 100, border: 'none',
            background: textPrimary, color: isDark ? '#3D3530' : '#FAF7F2',
            cursor: 'pointer', fontSize: 14, fontWeight: 500,
            fontFamily: "'DM Sans',sans-serif", transition: 'background-color 150ms ease-out, transform 100ms ease-out',
          }}>
            Next →
          </button>
        ) : (
          <button className="btn-press" onClick={onAddToCart} style={{
            flex: 1, fontSize: 15, fontWeight: 500, padding: '12px', borderRadius: 100, border: 'none',
            background: '#A8D5A2', color: '#2a5a25', cursor: 'pointer',
            fontFamily: "'DM Sans',sans-serif", transition: 'background-color 150ms ease-out, transform 100ms ease-out',
            boxShadow: '0 4px 16px rgba(168,213,162,0.4)',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = '#8fc489')}
            onMouseLeave={e => (e.currentTarget.style.background = '#A8D5A2')}
          >
            Add to cart — €28
          </button>
        )}
      </div>

      {/* Mini summary */}
      <div style={{ marginTop: 14, padding: '10px 14px', borderRadius: 10, background: isDark ? 'rgba(255,255,255,0.04)' : '#F3EDE6', fontSize: 12, color: textMuted, display: 'flex', gap: 12, flexWrap: 'wrap', flexShrink: 0 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: collar.color, display: 'inline-block' }} />
          {collar.name}
        </span>
        {selectedCharms.filter(Boolean).length > 0 && (
          <span>{selectedCharms.filter(Boolean).length} charm{selectedCharms.filter(Boolean).length > 1 ? 's' : ''}</span>
        )}
        {size && <span>{size.split(' ')[0]}</span>}
        {engraving && <span>"{engraving}"</span>}
      </div>

      <TrustBadges isDark={isDark} />
    </div>
  );
}
