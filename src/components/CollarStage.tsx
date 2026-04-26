'use client';

import { useState } from 'react';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { Collar, ALL_CHARMS, CHARM_POSITIONS } from '@/lib/data';

const VIEWS = [
  { label: 'Product' },
  { label: 'Flat-lay' },
  { label: 'On dog' },
  { label: 'Close-up' },
];

function FlatLayView({ collar, isDark }: { collar: Collar; isDark: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: isDark ? 'rgba(250,247,242,0.3)' : '#9B948F', marginBottom: 4 }}>
        Flat-lay · cream background
      </div>
      <div style={{ width: 300, height: 180, background: isDark ? 'rgba(250,247,242,0.06)' : '#FAF7F2', borderRadius: 16, border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#E8E3DC'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <div style={{ height: 14, borderRadius: 7, width: 200, background: collar.color, boxShadow: `0 4px 12px ${collar.glowColor}` }} />
        <div style={{ display: 'flex', gap: 10 }}>
          {(['🌸', '🌿', '⭐', '☀️', '🦋'] as const).map((e, i) => (
            <div key={i} style={{ width: 36, height: 36, borderRadius: '50%', background: ['#F4B5C0', '#A8D5A2', '#B8D8F4', '#F9E4A0', '#D4B8F4'][i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{e}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OnDogView({ collar, isDark }: { collar: Collar; isDark: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: isDark ? 'rgba(250,247,242,0.3)' : '#9B948F' }}>Lifestyle shot</div>
      <div style={{ width: 260, height: 200, background: isDark ? 'rgba(255,255,255,0.04)' : '#F3EDE6', borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E8E3DC'}` }}>
        <div style={{ fontSize: 64 }}>🐕</div>
        <div style={{ height: 10, borderRadius: 5, width: 80, background: collar.color, boxShadow: `0 2px 8px ${collar.glowColor}`, position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: '#F4B5C0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>🌸</div>
        </div>
        <div style={{ fontSize: 12, color: isDark ? 'rgba(250,247,242,0.3)' : '#9B948F' }}>Photography placeholder</div>
      </div>
    </div>
  );
}

function CloseUpView({ isDark }: { isDark: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: isDark ? 'rgba(250,247,242,0.3)' : '#9B948F' }}>Charm close-up</div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 300 }}>
        {(['#F4B5C0', '#A8D5A2', '#B8D8F4', '#D4B8F4'] as const).map((bg, i) => (
          <div key={i} style={{ width: 72, height: 72, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, boxShadow: `0 6px 20px ${bg}88` }}>
            {['🌸', '🌿', '⭐', '🦋'][i]}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: isDark ? 'rgba(250,247,242,0.3)' : '#9B948F' }}>Snap-on mechanism</div>
    </div>
  );
}

interface CollarStageProps {
  collar: Collar;
  selectedCharms: (string | null)[];
  isDark: boolean;
  engraving: string;
}

export function CollarStage({ collar, selectedCharms, isDark, engraving }: CollarStageProps) {
  const w = useWindowWidth();
  const isMobile = w < 768;
  const [activeView, setActiveView] = useState(0);

  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: isMobile ? '55vh' : '100vh', overflow: 'hidden' }}>

      {/* Gallery thumbnail strip */}
      {!isMobile && (
        <div style={{ position: 'absolute', left: 32, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 10, zIndex: 10 }}>
          {VIEWS.map((v, i) => (
            <button
              key={i}
              onClick={() => setActiveView(i)}
              title={v.label}
              style={{
                width: 52, height: 52, borderRadius: 12, border: 'none', cursor: 'pointer', overflow: 'hidden',
                outline: i === activeView ? `2px solid ${isDark ? '#FAF7F2' : '#3D3530'}` : '2px solid transparent',
                outlineOffset: 2,
                background: i === activeView
                  ? (isDark ? 'rgba(255,255,255,0.12)' : 'rgba(61,53,48,0.08)')
                  : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(61,53,48,0.04)'),
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
                transition: 'all 150ms',
              }}
            >
              {i === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <div style={{ height: 5, width: 28, borderRadius: 3, background: collar.color, transition: 'background 300ms' }} />
                  <div style={{ display: 'flex', gap: 3 }}>
                    {['#F4B5C0', '#A8D5A2', '#B8D8F4'].map((c, j) => <div key={j} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
                  </div>
                </div>
              )}
              {i === 1 && <div style={{ fontSize: 18 }}>📷</div>}
              {i === 2 && <div style={{ fontSize: 22 }}>🐕</div>}
              {i === 3 && <div style={{ fontSize: 22 }}>🔍</div>}
              <div style={{ fontSize: 8, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', color: isDark ? 'rgba(250,247,242,0.4)' : 'rgba(61,53,48,0.4)' }}>{v.label}</div>
            </button>
          ))}
        </div>
      )}

      {/* Background glow */}
      <div style={{
        position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        background: collar.color, opacity: isDark ? 0.12 : 0.2,
        filter: 'blur(80px)', transition: 'background 500ms ease', pointerEvents: 'none',
      }} />

      {/* Main visual container */}
      <div style={{ position: 'relative', width: 400, height: 360, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* Alternate views */}
        {activeView === 1 && (
          <div className="fade-in" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FlatLayView collar={collar} isDark={isDark} />
          </div>
        )}
        {activeView === 2 && (
          <div className="fade-in" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <OnDogView collar={collar} isDark={isDark} />
          </div>
        )}
        {activeView === 3 && (
          <div className="fade-in" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CloseUpView isDark={isDark} />
          </div>
        )}

        {/* Main animated collar */}
        <div style={{ opacity: activeView === 0 ? 1 : 0, transition: 'opacity 200ms', pointerEvents: activeView === 0 ? 'auto' : 'none', position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          {/* Collar bar */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, 30px)',
            width: 280, height: 18, borderRadius: 9,
            background: collar.color,
            boxShadow: `0 0 40px ${collar.glowColor}, 0 4px 16px ${collar.glowColor}`,
            transition: 'background 400ms ease, box-shadow 400ms ease',
          }} />

          {/* Name tag */}
          {engraving && (
            <div className="fade-in" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, 52px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 2, height: 14, background: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(61,53,48,0.2)', borderRadius: 1 }} />
              <div style={{
                background: isDark ? 'linear-gradient(145deg,rgba(255,255,255,0.18),rgba(255,255,255,0.08))' : 'linear-gradient(145deg,#fff 0%,#F3EDE6 100%)',
                border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid #D4C9BF',
                borderRadius: 8, padding: '6px 14px 7px',
                boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.12)' : '0 4px 12px rgba(61,53,48,0.12),inset 0 1px 0 rgba(255,255,255,0.9)',
                minWidth: 60, textAlign: 'center',
              }}>
                <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: '0.04em', color: isDark ? 'rgba(250,247,242,0.85)' : '#3D3530', whiteSpace: 'nowrap' }}>
                  {engraving}
                </div>
              </div>
            </div>
          )}

          {/* Snap connector dots */}
          {[-70, 0, 70].map(x => (
            <div key={x} style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: `translate(calc(-50% + ${x}px), 38px)`,
              width: 8, height: 8, borderRadius: '50%',
              background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(61,53,48,0.12)',
            }} />
          ))}

          {/* Floating charms */}
          {CHARM_POSITIONS.map((pos, i) => {
            const charm = selectedCharms[i] ? ALL_CHARMS.find(c => c.id === selectedCharms[i]) : null;
            return (
              <div
                key={i}
                className={`charm-float-${i}`}
                style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                  width: charm ? 58 : 44, height: charm ? 58 : 44,
                  borderRadius: '50%',
                  background: charm ? charm.bg : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(61,53,48,0.06)'),
                  border: charm ? 'none' : `2px dashed ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(61,53,48,0.15)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: charm ? 26 : 18,
                  boxShadow: charm ? '0 8px 24px rgba(0,0,0,0.18)' : 'none',
                  transition: 'width 250ms,height 250ms,background 250ms,border 250ms',
                  color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(61,53,48,0.2)',
                }}
              >
                {charm ? charm.e : <span style={{ fontSize: 14 }}>+</span>}
              </div>
            );
          })}

          {/* Connector lines */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 400 360">
            {CHARM_POSITIONS.map((pos, i) => {
              if (!selectedCharms[i]) return null;
              const cx = 200 + pos.x;
              const cy = 180 + pos.y;
              const collarX = 200 + pos.x * 0.5;
              const collarY = 210;
              return (
                <line key={i}
                  x1={cx} y1={cy + 20} x2={collarX} y2={collarY - 2}
                  stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(61,53,48,0.08)'}
                  strokeWidth="1.5" strokeDasharray="4 4"
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Collar label */}
      <div style={{ position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: isDark ? 'rgba(250,247,242,0.3)' : '#9B948F' }}>
          {activeView === 0 ? `${collar.name} collar` : VIEWS[activeView].label}
        </div>
        {activeView === 0 && (
          <div style={{ marginTop: 8, display: 'flex', gap: 4, justifyContent: 'center' }}>
            {CHARM_POSITIONS.map((_, i) => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: selectedCharms[i] ? collar.color : (isDark ? 'rgba(255,255,255,0.15)' : 'rgba(61,53,48,0.15)'), transition: 'background 300ms' }} />
            ))}
          </div>
        )}
        <div style={{ fontSize: 12, color: isDark ? 'rgba(250,247,242,0.25)' : '#9B948F', marginTop: 8 }}>
          {selectedCharms.filter(Boolean).length} / 5 charms selected
        </div>
      </div>
    </div>
  );
}
