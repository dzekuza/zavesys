'use client';

import { useState } from 'react';
import { useWindowWidth } from '@/hooks/useWindowWidth';

export function BentoSection({ isDark }: { isDark: boolean }) {
  const w = useWindowWidth() ?? 1200;
  const isMobile = w < 768;
  const isTablet = w < 1024;

  const bg = isDark ? '#2A1E18' : '#FAF7F2';
  const cardBg = isDark ? 'rgba(255,255,255,0.05)' : 'white';
  const cardBgAlt = isDark ? 'rgba(255,255,255,0.03)' : '#FAF7F2';
  const border = isDark ? 'rgba(255,255,255,0.08)' : '#E8E3DC';
  const textPrimary = isDark ? '#FAF7F2' : '#3D3530';
  const textSecondary = isDark ? 'rgba(250,247,242,0.6)' : '#6B6460';
  const textMuted = isDark ? 'rgba(250,247,242,0.3)' : '#9B948F';

  const [sizingNeck, setSizingNeck] = useState(36);
  const sizeLabel = sizingNeck <= 28 ? 'XS' : sizingNeck <= 36 ? 'S' : sizingNeck <= 44 ? 'M' : 'L';
  const sizeBreed = sizingNeck <= 28 ? 'Chihuahua, Pomeranian' : sizingNeck <= 36 ? 'Beagle, Cocker Spaniel' : sizingNeck <= 44 ? 'Labrador, Border Collie' : 'Golden Retriever, Husky';
  const sizeFill = ((sizingNeck - 20) / (52 - 20)) * 100;

  const gridCols = isMobile ? '1fr' : isTablet ? 'repeat(6,1fr)' : 'repeat(12,1fr)';

  return (
    <section style={{ background: bg, padding: isMobile ? '48px 16px' : '80px 48px', transition: 'background 400ms' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gap: 16, gridTemplateColumns: gridCols }}>

        {/* Material card */}
        <div style={{ gridColumn: isMobile ? 'span 1' : isTablet ? 'span 6' : 'span 7', borderRadius: 20, background: '#A8D5A2', padding: '40px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 260 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(42,90,37,0.6)', marginBottom: 14 }}>The material</div>
            <div style={{ fontFamily: "'Mouse Memoirs','DM Sans',sans-serif", fontSize: 48, fontWeight: 400, letterSpacing: '0.01em', color: '#2a5a25', lineHeight: 1.05, marginBottom: 16 }}>
              Waterproof.<br />No odor. No stains.
            </div>
            <div style={{ fontSize: 15, color: 'rgba(42,90,37,0.75)', lineHeight: 1.7, maxWidth: 380 }}>
              TPU-coated nylon that shrugs off lakes, mud, and rain. Wipe with a damp cloth — it comes up looking new every time.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            {['Lakes', 'Mud', 'Rain', 'Snow'].map(label => (
              <div key={label} style={{ background: 'rgba(42,90,37,0.12)', borderRadius: 100, padding: '6px 14px', fontSize: 12, fontWeight: 500, color: '#2a5a25' }}>{label}</div>
            ))}
          </div>
        </div>

        {/* Made in LT card */}
        <div style={{ gridColumn: isMobile ? 'span 1' : isTablet ? 'span 6' : 'span 5', borderRadius: 20, background: '#3D3530', padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 260 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.35)', marginBottom: 14 }}>Origin</div>
            <div style={{ fontFamily: "'Mouse Memoirs','DM Sans',sans-serif", fontSize: 48, fontWeight: 400, letterSpacing: '0.01em', color: '#FAF7F2', lineHeight: 1.05, marginBottom: 12 }}>
              Handmade in<br />Vilnius, Lithuania.
            </div>
            <div style={{ fontSize: 14, color: 'rgba(250,247,242,0.55)', lineHeight: 1.7 }}>
              Small batch. Cut and assembled by hand in our workshop. Each collar ships in a linen pouch.
            </div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 500, color: 'rgba(250,247,242,0.2)', fontStyle: 'italic', letterSpacing: '-0.01em', marginTop: 20 }}>
            Vandeniui atspari.
          </div>
        </div>

        {/* Sizing interactive */}
        <div style={{ gridColumn: isMobile ? 'span 1' : isTablet ? 'span 3' : 'span 5', borderRadius: 20, background: cardBg, border: `1px solid ${border}`, padding: '32px 32px 28px' }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: textMuted, marginBottom: 16 }}>Sizing guide</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <div style={{ fontFamily: "'Mouse Memoirs','DM Sans',sans-serif", fontSize: 48, fontWeight: 400, letterSpacing: '0.01em', color: textPrimary, lineHeight: 1 }}>{sizeLabel}</div>
            <div style={{ fontSize: 15, color: textSecondary }}>{sizingNeck} cm</div>
          </div>
          <div style={{ fontSize: 13, color: textMuted, marginBottom: 20 }}>{sizeBreed}</div>
          <div style={{ position: 'relative', height: 6, background: isDark ? 'rgba(255,255,255,0.1)' : '#E8E3DC', borderRadius: 3, marginBottom: 20 }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${sizeFill}%`, background: '#A8D5A2', borderRadius: 3, transition: 'width 100ms' }} />
          </div>
          <input
            type="range" min={20} max={52} step={1} value={sizingNeck}
            onChange={e => setSizingNeck(+e.target.value)}
            style={{ width: '100%', accentColor: '#A8D5A2', cursor: 'pointer', marginBottom: 12 }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {(['XS', 'S', 'M', 'L'] as const).map((s, i) => (
              <div key={s} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: sizeLabel === s ? textPrimary : textMuted, transition: 'color 150ms' }}>{s}</div>
                <div style={{ fontSize: 10, color: textMuted }}>{['20–28', '28–36', '36–44', '44–52'][i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Snap system */}
        <div style={{ gridColumn: isMobile ? 'span 1' : isTablet ? 'span 3' : 'span 4', borderRadius: 20, background: '#F4B5C0', padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(61,20,30,0.45)', marginBottom: 14 }}>Charm system</div>
            <div style={{ fontFamily: "'Mouse Memoirs','DM Sans',sans-serif", fontSize: 48, fontWeight: 400, letterSpacing: '0.01em', color: 'rgba(61,20,30,0.85)', lineHeight: 1.05, marginBottom: 10 }}>Snaps on in 5 seconds.</div>
            <div style={{ fontSize: 14, color: 'rgba(61,20,30,0.6)', lineHeight: 1.6 }}>Magnetic connector. No clips. No tools. No fuss.</div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 20, alignItems: 'center' }}>
            {['🌸', '⭐', '🦋', '🌿'].map((e, i) => (
              <div key={i} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{e}</div>
            ))}
            <div style={{ fontSize: 12, color: 'rgba(61,20,30,0.5)', marginLeft: 4 }}>+8 more</div>
          </div>
        </div>

        {/* Care tips */}
        <div style={{ gridColumn: isMobile ? 'span 1' : isTablet ? 'span 3' : 'span 3', borderRadius: 20, background: cardBgAlt, border: `1px solid ${border}`, padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: textMuted, marginBottom: 2 }}>Care</div>
          {([['Rinse', 'After every swim or muddy walk.'], ['Air dry', 'Lay flat. No tumble dryers.'], ['Wipe charms', 'Damp cloth, then air dry.'], ['Store flat', 'In the linen pouch.']] as const).map(([t, d]) => (
            <div key={t} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#A8D5A2', marginTop: 5, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: textPrimary }}>{t}</div>
                <div style={{ fontSize: 12, color: textMuted, lineHeight: 1.5 }}>{d}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
