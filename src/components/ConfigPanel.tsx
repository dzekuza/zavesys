'use client';

import { useState, useMemo } from 'react';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { Collar, COLLARS, ALL_CHARMS, SIZES } from '@/lib/data';
import { TrustBadges } from './TrustBadges';

const MOBILE_FEATURES = [
  { iconSrc: '/Dog_Collar_Flat_Lay (3)/A_light_green_drop_shape_with_a_subtle_curve_on_qVGIeFtL Background Removed.png', text: 'Water-proof' },
  { iconSrc: '/Dog_Collar_Flat_Lay (3)/A_simple_circular_graphic_depicts_a_clock_face_8DikilGN Background Removed.png', text: 'Easy to use' },
  { iconSrc: '/Dog_Collar_Flat_Lay (3)/In_a_flat_design_style_a_light_green_heart_shape_mhu_5XWt Background Removed.png', text: 'Eco-friendly' },
  { iconSrc: '/Dog_Collar_Flat_Lay (3)/A_light_blue_icon_depicts_a_simple_square_box_k_3i4pxx Background Removed.png', text: 'Free returns' },
];

interface ConfigPanelProps {
  collar: Collar;
  setCollar: (c: Collar) => void;
  selectedCharms: (string | null)[];
  toggleCharm: (id: string) => void;
  moveCharm: (fromIndex: number, toIndex: number) => void;
  size: string;
  setSize: (s: string) => void;
  onAddToCart: () => void;
  isDark: boolean;
}

type CharmTab = 'all' | 'letter' | 'icon';

function CharmsStep({
  selectedCharms, toggleCharm, textMuted, textSecondary, textPrimary, borderColor, isDark,
}: {
  selectedCharms: (string | null)[];
  toggleCharm: (id: string) => void;
  textMuted: string;
  textSecondary: string;
  textPrimary: string;
  borderColor: string;
  isDark: boolean;
}) {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<CharmTab>('all');
  const selectedCount = selectedCharms.filter(Boolean).length;

  const filtered = useMemo(() => {
    let list = tab === 'all' ? [...ALL_CHARMS] : ALL_CHARMS.filter(c => c.category === tab);
    if (query.trim()) list = list.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
    return list;
  }, [query, tab]);

  const TABS: { id: CharmTab; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'letter', label: 'Letters' },
    { id: 'icon', label: 'Icons' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: textMuted }}>
          Choose charms
        </div>
        <div style={{ fontSize: 12, fontWeight: 400, color: textSecondary }}>
          {selectedCount > 0 ? `${selectedCount} selected` : <span style={{ color: textMuted, fontStyle: 'italic' }}>optional</span>}
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 6 }}>
        {TABS.map(t => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                fontSize: 12, fontWeight: 500, fontFamily: "'DM Sans',sans-serif",
                background: active ? textPrimary : (isDark ? 'rgba(255,255,255,0.07)' : '#EDE8E2'),
                color: active ? (isDark ? '#3D3530' : '#FAF7F2') : textMuted,
                transition: 'background-color 150ms ease-out, color 150ms ease-out',
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <input
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search charms…"
        style={{
          width: '100%', boxSizing: 'border-box',
          padding: '9px 12px', borderRadius: 10,
          border: `1.5px solid ${borderColor}`,
          background: isDark ? 'rgba(255,255,255,0.06)' : '#F8F5F1',
          color: textPrimary, fontSize: 13,
          fontFamily: "'DM Sans',sans-serif",
          outline: 'none', transition: 'border-color 150ms ease-out',
        }}
        onFocus={e => (e.target.style.borderColor = '#A8D5A2')}
        onBlur={e => (e.target.style.borderColor = borderColor)}
      />

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {filtered.map(c => {
          const isSelected = selectedCharms.includes(c.id);
          const isFull = selectedCount >= 5 && !isSelected; // max 5 slots on collar
          return (
            <button
              key={c.id}
              className={!isFull ? 'btn-press' : undefined}
              onClick={() => !isFull && toggleCharm(c.id)}
              title={c.name}
              style={{
                borderRadius: 14,
                background: isDark ? 'rgba(255,255,255,0.06)' : '#F0EBE5',
                cursor: isFull ? 'not-allowed' : 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
                padding: '10px 6px 8px',
                opacity: isFull ? 0.3 : 1,
                outline: 'none',
                border: isSelected ? `2px solid ${textPrimary}` : '2px solid transparent',
                transition: 'border-color 120ms ease-out, opacity 150ms ease-out, transform 100ms ease-out',
                boxShadow: isSelected ? `0 0 0 1px rgba(61,53,48,0.08)` : 'none',
              }}
            >
              <img
                src={encodeURI(c.image)}
                alt=""
                aria-hidden="true"
                style={{ width: 52, height: 52, objectFit: 'contain' }}
              />
              <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(61,53,48,0.6)', textAlign: 'center', lineHeight: 1.2 }}>{c.name}</span>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '24px 0', fontSize: 13, color: textMuted }}>
            No charms found
          </div>
        )}
      </div>
    </div>
  );
}

const STEPS = ['Colour', 'Charms', 'Size'] as const;
type Step = 0 | 1 | 2;

export function ConfigPanel({
  collar, setCollar, selectedCharms, toggleCharm, moveCharm,
  size, setSize, onAddToCart, isDark,
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
  const isLast = step === 2;

  const next = () => {
    if (step < 2) setStep(s => (s + 1) as Step);
  };
  const back = () => {
    if (step > 0) setStep(s => (s - 1) as Step);
  };

  return (
    <div
      className="config-panel"
      style={{
        width: isMobile ? '100%' : 400, flexShrink: 0, alignSelf: isMobile ? 'stretch' : 'flex-end',
        height: 'auto',
        position: isMobile ? 'relative' : 'sticky',
        top: isMobile ? 'auto' : 80,
        zIndex: 100,
        background: panelBg, backdropFilter: 'blur(24px)',
        borderRadius: 24,
        border: `1px solid ${borderColor}`,
        margin: isMobile ? 0 : '24px 0',
        padding: isMobile ? '24px 16px 28px' : '24px 28px 28px',
        display: 'flex', flexDirection: 'column', gap: 0,
        transition: 'background-color 400ms ease-out',
        boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 12, paddingBottom: 0, borderBottom: 'none' }}>
        <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: textMuted, marginBottom: 6 }}>Collar set</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h1 style={{
            fontSize: isMobile ? 32 : 22,
            fontFamily: isMobile ? "'Mouse Memoirs','DM Sans',sans-serif" : "'DM Sans',sans-serif",
            fontWeight: isMobile ? 400 : 500,
            letterSpacing: isMobile ? '-0.013em' : '-0.02em',
            color: textPrimary,
            lineHeight: 1.15,
          }}>
            Build your collar
          </h1>
          <span style={{ fontSize: 20, fontWeight: 500, color: textPrimary }}>€28</span>
        </div>
      </div>

      {/* Step tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
        {STEPS.map((label, i) => {
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


      {/* Step content — keyed by step to trigger fade-in animation on change */}
      <div key={step} className="fade-in" style={{ flex: '0 0 auto', minHeight: 0, overflow: 'visible', padding: '2px 4px 4px', margin: '0 -4px' }}>

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
        {step === 1 && <CharmsStep
          selectedCharms={selectedCharms}
          toggleCharm={toggleCharm}
          textMuted={textMuted}
          textSecondary={textSecondary}
          textPrimary={textPrimary}
          borderColor={borderColor}
          isDark={isDark}
        />}

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

      <div
        style={{
          marginTop: 14,
          padding: '14px',
          borderRadius: 12,
          background: isDark ? 'rgba(255,255,255,0.04)' : '#F3EDE6',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E8E3DC'}`,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          flexShrink: 0,
        }}
      >
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: textMuted }}>
          Order overview
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: textSecondary }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: collar.color, display: 'inline-block' }} />
            Collar
          </span>
          <span style={{ color: textPrimary, fontWeight: 500 }}>{collar.name}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: textSecondary }}>
          <span>Charms</span>
          <span style={{ color: textPrimary, fontWeight: 500 }}>
            {selectedCharms.filter(Boolean).length} charm{selectedCharms.filter(Boolean).length !== 1 ? 's' : ''}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: textSecondary }}>
          <span>Size</span>
          <span style={{ color: textPrimary, fontWeight: 500 }}>{size ? size.split(' — ')[0] : '—'}</span>
        </div>

        <div style={{ height: 1, background: divider, margin: '2px 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, fontWeight: 600, color: textPrimary }}>
          <span>Total</span>
          <span>€28</span>
        </div>
      </div>


      {isMobile ? (
        <div style={{ display: 'flex', gap: 4, paddingTop: 16 }}>
          {MOBILE_FEATURES.map(f => (
            <div key={f.text} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <img src={encodeURI(f.iconSrc)} alt="" aria-hidden="true" style={{ width: 64, height: 64, objectFit: 'contain' }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: '#6B6460', textAlign: 'center', fontFamily: "'DM Sans',sans-serif", lineHeight: 1.3 }}>{f.text}</span>
            </div>
          ))}
        </div>
      ) : (
        <TrustBadges isDark={isDark} />
      )}
    </div>
  );
}
