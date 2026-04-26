'use client';

import { useWindowWidth } from '@/hooks/useWindowWidth';
import {
  Stories,
  StoriesContent,
  Story,
  StoryAuthor,
  StoryAuthorImage,
  StoryAuthorName,
  StoryImage,
  StoryOverlay,
  StoryTitle
} from '@/components/ui/stories-carousel';

const STAR_ICON = '/Dog_Collar_Flat_Lay_A_yellow_star_with_a_soft_green_outline_floats_HzBh2qMJ Background Removed.png';

const stories = [
  {
    id: 1,
    author: 'Laima K.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
    fallback: 'LK',
    preview: '/A_woman_and_her_golden_retriever_sit_together_on_jKVk75j-.webp',
    title: 'Luna (Beagle) loves Sage',
    quote: 'Snaps on in seconds and still looks brand new after muddy walks.',
    rating: 5
  },
  {
    id: 2,
    author: 'Marta S.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    fallback: 'MS',
    preview: '/A_golden_retriever_sits_contentedly_on_a_grassy_QlXAm7ix.webp',
    title: 'Beach walk tested',
    quote: 'We swim weekly and the collar stays clean, soft, and comfortable.',
    rating: 5
  },
  {
    id: 3,
    author: 'Rūta P.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    fallback: 'RP',
    preview: '/A_man_and_a_woman_sit_on_a_couch_with_a_small_wj6F8xDr.webp',
    title: 'Gift-ready sets',
    quote: 'Ordered three as gifts. Packaging and quality are both amazing.',
    rating: 5
  },
  {
    id: 4,
    author: 'Aiste J.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
    fallback: 'AJ',
    preview: '/A_man_sits_at_an_outdoor_cafe_with_a_French_BfuQAh4h.webp',
    title: 'Cafe style daily',
    quote: 'Our daily cafe stop gets compliments every single time.',
    rating: 4.9
  },
  {
    id: 5,
    author: 'Monika T.',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop&crop=face',
    fallback: 'MT',
    preview: '/A_woman_with_brown_hair_runs_along_a_sandy_beach_pMc16cB6.webp',
    title: 'Run-ready collar',
    quote: 'Lightweight enough for runs and secure enough for full sprints.',
    rating: 5
  },
  {
    id: 6,
    author: 'Greta N.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
    fallback: 'GN',
    preview: '/In_a_gentle_golden-hour_light_a_woman_with_FmObGqWG.webp',
    title: 'Golden hour walk',
    quote: 'Golden hour photos look unreal with the Blossom set.',
    rating: 5
  },
  {
    id: 7,
    author: 'Tomas V.',
    avatar: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=80&h=80&fit=crop&crop=face',
    fallback: 'TV',
    preview: '/A_man_and_a_woman_sit_on_a_couch_with_a_small_wj6F8xDr.webp',
    title: 'Weekend couch vibes',
    quote: 'Super easy to swap charms for weekend and weekday looks.',
    rating: 4.8
  },
  {
    id: 8,
    author: 'Egle R.',
    avatar: 'https://images.unsplash.com/photo-1542204625-de293a6b4178?w=80&h=80&fit=crop&crop=face',
    fallback: 'ER',
    preview: '/A_woman_and_her_golden_retriever_sit_together_on_jKVk75j-.webp',
    title: 'Matching with Mochi',
    quote: 'The colors are perfect and the fit is comfy all day.',
    rating: 5
  },
  {
    id: 9,
    author: 'Karolis P.',
    avatar: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=80&h=80&fit=crop&crop=face',
    fallback: 'KP',
    preview: '/A_golden_retriever_sits_contentedly_on_a_grassy_QlXAm7ix.webp',
    title: 'Park day approved',
    quote: 'Park play, rain, and zoomies - still no wear after weeks.',
    rating: 5
  },
  {
    id: 10,
    author: 'Simona B.',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop&crop=face',
    fallback: 'SB',
    preview: '/A_man_sits_at_an_outdoor_cafe_with_a_French_BfuQAh4h.webp',
    title: 'Coffee stop style',
    quote: 'Looks premium in person and photographs beautifully.',
    rating: 4.9
  },
  {
    id: 11,
    author: 'Lukas M.',
    avatar: 'https://images.unsplash.com/photo-1474176857210-7287d38d27c6?w=80&h=80&fit=crop&crop=face',
    fallback: 'LM',
    preview: '/A_woman_with_brown_hair_runs_along_a_sandy_beach_pMc16cB6.webp',
    title: 'Beach run tested',
    quote: 'Salt water and sand rinse off fast - zero hassle.',
    rating: 5
  },
  {
    id: 12,
    author: 'Aurelia D.',
    avatar: 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=80&h=80&fit=crop&crop=face',
    fallback: 'AD',
    preview: '/In_a_gentle_golden-hour_light_a_woman_with_FmObGqWG.webp',
    title: 'Evening stroll glow',
    quote: 'Evening strolls feel special with these charm combos.',
    rating: 4.9
  }
];

export function Reviews() {
  const w = useWindowWidth();
  const isMobile = w < 768;

  return (
    <section style={{ padding: isMobile ? '60px 20px' : '100px 40px', background: '#F3EDE6' }}>
      <div style={{}}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9B948F', marginBottom: 14 }}>Customer love</div>
          <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 40, fontWeight: 500, letterSpacing: '-0.02em', color: '#3D3530' }}>Dogs and owners approve.</h2>
        </div>
        <Stories className='w-full'>
          <StoriesContent>
            {stories.map((story) => (
              <Story
                key={story.id}
                data-animate='card'
                style={{ width: isMobile ? 220 : 240, aspectRatio: isMobile ? '4 / 5' : '3 / 4' }}
              >
                <StoryImage alt={story.title} src={story.preview} />
                <StoryOverlay side='top' />
                <StoryOverlay side='bottom' />
                <StoryTitle className='text-left'>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <img
                          key={`${story.id}-star-${idx}`}
                          src={encodeURI(STAR_ICON)}
                          alt=""
                          aria-hidden="true"
                          style={{ width: 24, height: 24, objectFit: 'contain' }}
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{story.rating.toFixed(1)}</span>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 12,
                      lineHeight: 1.45,
                      color: 'rgba(255,255,255,0.95)',
                      textShadow: '0 1px 10px rgba(0,0,0,0.25)'
                    }}
                  >
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </StoryTitle>
                <StoryAuthor>
                  <StoryAuthorImage
                    fallback={story.fallback}
                    name={story.author}
                    src={story.avatar}
                  />
                  <StoryAuthorName>{story.author}</StoryAuthorName>
                </StoryAuthor>
              </Story>
            ))}
          </StoriesContent>
        </Stories>
      </div>
    </section>
  );
}
