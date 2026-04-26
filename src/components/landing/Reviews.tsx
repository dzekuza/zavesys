'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useWindowWidth } from '@/hooks/useWindowWidth';

const STAR_ICON = '/Dog_Collar_Flat_Lay_A_yellow_star_with_a_soft_green_outline_floats_HzBh2qMJ Background Removed.png';
const INTERVAL = 3000;

const stories = [
  { id: 1, author: 'Laima K.', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face', preview: '/A_woman_and_her_golden_retriever_sit_together_on_jKVk75j-.webp', quote: 'Snaps on in seconds and still looks brand new after muddy walks.', rating: 5 },
  { id: 2, author: 'Marta S.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face', preview: '/A_golden_retriever_sits_contentedly_on_a_grassy_QlXAm7ix.webp', quote: 'We swim weekly and the collar stays clean, soft, and comfortable.', rating: 5 },
  { id: 3, author: 'Rūta P.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face', preview: '/A_man_and_a_woman_sit_on_a_couch_with_a_small_wj6F8xDr.webp', quote: 'Ordered three as gifts. Packaging and quality are both amazing.', rating: 5 },
  { id: 4, author: 'Aiste J.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face', preview: '/A_man_sits_at_an_outdoor_cafe_with_a_French_BfuQAh4h.webp', quote: 'Our daily cafe stop gets compliments every single time.', rating: 4.9 },
  { id: 5, author: 'Monika T.', avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop&crop=face', preview: '/A_woman_with_brown_hair_runs_along_a_sandy_beach_pMc16cB6.webp', quote: 'Lightweight enough for runs and secure enough for full sprints.', rating: 5 },
  { id: 6, author: 'Greta N.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face', preview: '/In_a_gentle_golden-hour_light_a_woman_with_FmObGqWG.webp', quote: 'Golden hour photos look unreal with the Blossom set.', rating: 5 },
  { id: 7, author: 'Tomas V.', avatar: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=80&h=80&fit=crop&crop=face', preview: '/A_man_and_a_woman_sit_on_a_couch_with_a_small_wj6F8xDr.webp', quote: 'Super easy to swap charms for weekend and weekday looks.', rating: 4.8 },
  { id: 8, author: 'Egle R.', avatar: 'https://images.unsplash.com/photo-1542204625-de293a6b4178?w=80&h=80&fit=crop&crop=face', preview: '/A_woman_and_her_golden_retriever_sit_together_on_jKVk75j-.webp', quote: 'The colors are perfect and the fit is comfy all day.', rating: 5 },
  { id: 9, author: 'Karolis P.', avatar: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=80&h=80&fit=crop&crop=face', preview: '/A_golden_retriever_sits_contentedly_on_a_grassy_QlXAm7ix.webp', quote: 'Park play, rain, and zoomies — still no wear after weeks.', rating: 5 },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <img key={i} src={encodeURI(STAR_ICON)} alt="" aria-hidden style={{ width: 16, height: 16, objectFit: 'contain' }} />
      ))}
      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginLeft: 4 }}>{rating.toFixed(1)}</span>
    </div>
  );
}

export function Reviews() {
  const w = useWindowWidth() ?? 1200;
  const isMobile = w < 640;
  const isTablet = w < 1024;
  const perPage = isMobile ? 1 : isTablet ? 2 : 3;
  const total = stories.length;
  const maxIndex = total - perPage;

  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  const startTimers = useCallback(() => {
    clearTimers();
    setProgress(0);
    const tickMs = 30;
    progressRef.current = setInterval(() => {
      setProgress(p => Math.min(p + (tickMs / INTERVAL) * 100, 100));
    }, tickMs);
    intervalRef.current = setInterval(() => {
      setIndex(i => (i >= maxIndex ? 0 : i + 1));
      setProgress(0);
    }, INTERVAL);
  }, [maxIndex]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    startTimers();
    return clearTimers;
  }, [startTimers]);

  const go = (dir: 1 | -1) => {
    setIndex(i => Math.max(0, Math.min(maxIndex, i + dir)));
    startTimers();
  };

  const cardW = isMobile ? 280 : isTablet ? 260 : 300;
  const gap = 16;

  return (
    <section style={{ padding: isMobile ? '60px 0' : '100px 0', background: '#F3EDE6', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: isMobile ? '0 20px' : '0 40px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9B948F', marginBottom: 14, fontFamily: "'DM Sans',sans-serif" }}>Customer love</div>
            <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: isMobile ? 28 : 40, fontWeight: 500, letterSpacing: '-0.02em', color: '#3D3530', margin: 0 }}>
              Dogs and owners approve.
            </h2>
          </div>
          {/* Arrows */}
          <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
            {([[-1, '←'], [1, '→']] as const).map(([dir, label]) => (
              <button
                key={label}
                onClick={() => go(dir)}
                disabled={dir === -1 ? index === 0 : index >= maxIndex}
                aria-label={dir === -1 ? 'Previous' : 'Next'}
                style={{
                  width: 44, height: 44, borderRadius: '50%', border: '1.5px solid #E8E3DC',
                  background: 'white', cursor: 'pointer', fontSize: 18, color: '#3D3530',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 150ms, opacity 150ms',
                  opacity: (dir === -1 ? index === 0 : index >= maxIndex) ? 0.3 : 1,
                }}
                onMouseEnter={e => { if (!(e.currentTarget as HTMLButtonElement).disabled) e.currentTarget.style.background = '#F3EDE6'; }}
                onMouseLeave={e => (e.currentTarget.style.background = 'white')}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Slider */}
        <div style={{ overflow: 'hidden' }}>
          <div
            style={{
              display: 'flex', gap, transition: 'transform 400ms cubic-bezier(0.22,1,0.36,1)',
              transform: `translateX(-${index * (cardW + gap)}px)`,
            }}
          >
            {stories.map(story => (
              <div
                key={story.id}
                style={{ flexShrink: 0, width: cardW, borderRadius: 20, overflow: 'hidden', position: 'relative', aspectRatio: '3/4' }}
              >
                <img src={story.preview} alt={story.author} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                {/* gradient overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }} />
                {/* content */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 18px' }}>
                  <StarRow rating={story.rating} />
                  <p style={{ margin: '8px 0 14px', fontFamily: "'DM Sans',sans-serif", fontSize: 13, lineHeight: 1.5, color: 'rgba(255,255,255,0.92)' }}>
                    &ldquo;{story.quote}&rdquo;
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img src={story.avatar} alt={story.author} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.5)' }} />
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>{story.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 24, height: 2, background: 'rgba(61,53,48,0.1)', borderRadius: 2 }}>
          <div style={{ height: '100%', borderRadius: 2, background: '#3D3530', width: `${progress}%`, transition: 'width 30ms linear' }} />
        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 16 }}>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setIndex(i); startTimers(); }}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === index ? 20 : 6, height: 6, borderRadius: 3, border: 'none', cursor: 'pointer', padding: 0,
                background: i === index ? '#3D3530' : 'rgba(61,53,48,0.2)',
                transition: 'width 250ms ease, background 250ms ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
