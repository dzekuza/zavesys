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

const SVG_W = 600;
const SVG_H = 520;
const CX = SVG_W / 2;
const CY = SVG_H / 2;
const COLLAR_Y = CY + 30;

function FlatLayView({ isDark }: { isDark: boolean }) {
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 24, overflow: 'hidden', position: 'relative' }}>
      <img
        src="/A_sage_green_pet_collar_displays_the_name_HARRY_2CvCRWm.webp"
        alt="Sage green collar flat-lay"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <div style={{ position: 'absolute', top: 16, left: 16, background: isDark ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', borderRadius: 20, padding: '4px 12px', fontSize: 10, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: isDark ? 'rgba(255,255,255,0.8)' : '#3D3530' }}>
        Flat-lay · cream background
      </div>
    </div>
  );
}

function OnDogView({ collar, isDark }: { collar: Collar; isDark: boolean }) {
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 24, overflow: 'hidden', position: 'relative' }}>
      <img
        src="/A_golden_retriever_sits_contentedly_on_a_grassy_QlXAm7ix.webp"
        alt="Golden retriever wearing collar"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, display: 'flex', alignItems: 'center', gap: 10, background: isDark ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.88)', backdropFilter: 'blur(10px)', borderRadius: 14, padding: '10px 14px' }}>
        <div style={{ height: 10, borderRadius: 5, width: 64, background: collar.color, boxShadow: `0 2px 8px ${collar.glowColor}`, flexShrink: 0, transition: 'background-color 400ms ease-out' }} />
        <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: isDark ? 'rgba(255,255,255,0.85)' : '#3D3530' }}>{collar.name} collar</div>
      </div>
    </div>
  );
}

function CloseUpView({ isDark }: { isDark: boolean }) {
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 24, overflow: 'hidden', position: 'relative' }}>
      <img
        src="/A_yellow_star-shaped_charm_is_attached_to_a_pink_jWdEg3nN.webp"
        alt="Star charm close-up"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <div style={{ position: 'absolute', bottom: 16, left: 16, background: isDark ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', borderRadius: 20, padding: '4px 12px', fontSize: 10, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: isDark ? 'rgba(255,255,255,0.8)' : '#3D3530' }}>
        Snap-on mechanism
      </div>
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
  const w = useWindowWidth() ?? 1200;
  const isMobile = w < 768;
  const [activeView, setActiveView] = useState(0);
  const selectedCharmCount = selectedCharms.filter(Boolean).length;

  return (
    <div style={{
      flex: 1,
      width: isMobile ? '100%' : undefined,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      minHeight: isMobile ? '55vh' : '100vh',
      overflow: 'hidden',
    }}>

      {/* Background glow */}
      <div style={{
        position: 'absolute', width: 700, height: 700, borderRadius: '50%',
        background: collar.color, opacity: isDark ? 0.1 : 0.18,
        filter: 'blur(100px)', transition: 'background-color 500ms ease-out', pointerEvents: 'none',
      }} />

      {/* Gallery thumbnail strip */}
      {!isMobile && (
        <div style={{ position: 'absolute', left: 28, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 10, zIndex: 10 }}>
          {VIEWS.map((v, i) => (
            <button
              key={i}
              className="btn-press"
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
                transition: 'outline-color 150ms ease-out, background-color 150ms ease-out, transform 100ms ease-out',
              }}
            >
              {i === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <div style={{ height: 5, width: 28, borderRadius: 3, background: collar.color, transition: 'background-color 300ms ease-out' }} />
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

      {/* Main visual container */}
      <div style={{
        position: 'relative',
        width: isMobile ? '90%' : `min(${SVG_W}px, calc(100% - 140px))`,
        height: isMobile ? '360px' : `min(${SVG_H}px, 76vh)`,
        marginLeft: isMobile ? 0 : 80,
      }}>

        {/* Image views */}
        {activeView === 1 && (
          <div className="fade-in" style={{ position: 'absolute', inset: 0 }}>
            <FlatLayView isDark={isDark} />
          </div>
        )}
        {activeView === 2 && (
          <div className="fade-in" style={{ position: 'absolute', inset: 0 }}>
            <OnDogView collar={collar} isDark={isDark} />
          </div>
        )}
        {activeView === 3 && (
          <div className="fade-in" style={{ position: 'absolute', inset: 0 }}>
            <CloseUpView isDark={isDark} />
          </div>
        )}

        {/* Collar animation — view 0 */}
        <div style={{
          opacity: activeView === 0 ? 1 : 0,
          transition: 'opacity 200ms ease-out',
          pointerEvents: activeView === 0 ? 'auto' : 'none',
          position: 'absolute', inset: 0,
        }}>
          <div
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 2,
              borderRadius: 12,
              padding: '8px 10px',
              background: isDark ? 'rgba(20,15,12,0.65)' : 'rgba(255,255,255,0.86)',
              border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E8E3DC',
              backdropFilter: 'blur(8px)'
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: isDark ? 'rgba(250,247,242,0.45)' : '#9B948F', marginBottom: 4 }}>
              Builder guide
            </div>
            <div style={{ fontSize: 12, color: isDark ? 'rgba(250,247,242,0.75)' : '#6B6460' }}>
              Pick charms in step 2 to fill slots 1-5.
            </div>
          </div>

          {/* Collar bar */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, 30px)',
            width: 360, height: 20, borderRadius: 10,
            background: collar.color,
            boxShadow: `0 0 50px ${collar.glowColor}, 0 4px 20px ${collar.glowColor}`,
            transition: 'background-color 400ms ease-out, box-shadow 400ms ease-out',
          }} />

          {/* Snap connector dots */}
          {[-110, 0, 110].map(x => (
            <div key={x} style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: `translate(calc(-50% + ${x}px), 42px)`,
              width: 9, height: 9, borderRadius: '50%',
              background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(61,53,48,0.12)',
            }} />
          ))}

          {/* Name tag */}
          {engraving && (
            <div className="fade-in" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, 58px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 2, height: 16, background: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(61,53,48,0.2)', borderRadius: 1 }} />
              <div style={{
                background: isDark ? 'linear-gradient(145deg,rgba(255,255,255,0.18),rgba(255,255,255,0.08))' : 'linear-gradient(145deg,#fff 0%,#F3EDE6 100%)',
                border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid #D4C9BF',
                borderRadius: 8, padding: '6px 14px 7px',
                boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 12px rgba(61,53,48,0.12)',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: '0.04em', color: isDark ? 'rgba(250,247,242,0.85)' : '#3D3530', whiteSpace: 'nowrap' }}>{engraving}</div>
              </div>
            </div>
          )}

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
                  width: charm ? 62 : 48, height: charm ? 62 : 48,
                  borderRadius: '50%',
                  background: charm ? charm.bg : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(61,53,48,0.06)'),
                  border: charm ? 'none' : `2px dashed ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(61,53,48,0.15)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: charm ? 28 : 18,
                  boxShadow: charm ? '0 8px 28px rgba(0,0,0,0.18)' : 'none',
                  transition: 'width 250ms ease-out, height 250ms ease-out, background-color 250ms ease-out, border-color 250ms ease-out, box-shadow 250ms ease-out',
                  color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(61,53,48,0.2)',
                }}
              >
                {charm ? charm.e : <span style={{ fontSize: 14 }}>+</span>}
                <div
                  style={{
                    position: 'absolute',
                    bottom: -20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    color: isDark ? 'rgba(250,247,242,0.45)' : '#8F8781',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {`Slot ${i + 1}`}
                </div>
              </div>
            );
          })}

          {/* Connector lines */}
          <svg
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {CHARM_POSITIONS.map((pos, i) => {
              if (!selectedCharms[i]) return null;
              const cx = CX + pos.x;
              const cy = CY + pos.y + 31;
              const collarX = CX + pos.x * 0.5;
              const collarY = COLLAR_Y - 2;
              return (
                <line key={i}
                  x1={cx} y1={cy} x2={collarX} y2={collarY}
                  stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(61,53,48,0.08)'}
                  strokeWidth="1.5" strokeDasharray="4 4"
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Bottom label */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: isDark ? 'rgba(250,247,242,0.3)' : '#9B948F' }}>
          {activeView === 0 ? `${collar.name} collar` : VIEWS[activeView].label}
        </div>
        {activeView === 0 && (
          <div style={{ marginTop: 10, display: 'flex', gap: 5, justifyContent: 'center', alignItems: 'center' }}>
            {CHARM_POSITIONS.map((_, i) => (
              <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: selectedCharms[i] ? collar.color : (isDark ? 'rgba(255,255,255,0.15)' : 'rgba(61,53,48,0.15)'), transition: 'background-color 300ms ease-out' }} />
            ))}
          </div>
        )}
        <div style={{ fontSize: 12, color: isDark ? 'rgba(250,247,242,0.25)' : '#9B948F', marginTop: 6 }}>
          {selectedCharmCount} / 5 charms selected{selectedCharmCount < 5 ? ` · ${5 - selectedCharmCount} left` : ''}
        </div>
      </div>
    </div>
  );
}
