'use client';

import { useState } from 'react';
import { useWindowWidth } from '@/hooks/useWindowWidth';

const FAQS = [
  {
    q: 'Are PawCharms collars waterproof?',
    a: 'Yes. All Žavesys collars are made from food-grade silicone — fully waterproof and safe for swimming, rain, and muddy walks. The material does not absorb odours or stains.',
  },
  {
    q: 'How do the swap charms work?',
    a: 'Each charm uses a snap connector that clicks on and off in around 5 seconds — no tools, no fiddling. You can mix and match all 12 charm designs freely between collars.',
  },
  {
    q: 'How do I choose the right collar size?',
    a: "Measure around the widest part of your dog's neck and add 2–3 cm for comfort. XS fits 20–28 cm, S fits 28–36 cm, M fits 36–44 cm, and L fits 44–54 cm.",
  },
  {
    q: "Can I engrave my dog's name on the collar?",
    a: "Yes — personalised engraving is available at checkout. You can add your dog's name, a short message, or a phone number for safety.",
  },
  {
    q: 'Where are PawCharms collars made?',
    a: "Every collar is designed and handcrafted in Vilnius, Lithuania. We're a small team and each order is made with care.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const w = useWindowWidth() ?? 1200;
  const isMobile = w < 768;

  return (
    <section style={{ background: '#FAF7F2', padding: isMobile ? '64px 24px' : '96px 48px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: isMobile ? 28 : 36,
          fontWeight: 500,
          color: '#3D3530',
          letterSpacing: '-0.02em',
          marginBottom: 48,
          marginTop: 0,
        }}>
          Common questions
        </h2>

        {FAQS.map((faq, i) => (
          <div
            key={i}
            style={{ borderTop: '1px solid rgba(61,53,48,0.1)', ...(i === FAQS.length - 1 ? { borderBottom: '1px solid rgba(61,53,48,0.1)' } : {}) }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              aria-controls={`faq-answer-${i}`}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                padding: '22px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 16,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: isMobile ? 15 : 17,
                fontWeight: 500,
                color: '#3D3530',
                lineHeight: 1.4,
              }}>
                {faq.q}
              </span>
              <span style={{
                flexShrink: 0,
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: open === i ? '#3D3530' : '#F0EBE4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 200ms ease',
                fontSize: 18,
                color: open === i ? '#FAF7F2' : '#3D3530',
                lineHeight: 1,
              }}>
                {open === i ? '−' : '+'}
              </span>
            </button>
            <div
              id={`faq-answer-${i}`}
              style={{
                maxHeight: open === i ? '400px' : '0px',
                opacity: open === i ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 320ms ease, opacity 220ms ease'
              }}
            >
              <p style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: isMobile ? 14 : 15,
                color: '#6B6560',
                lineHeight: 1.7,
                margin: '0 0 22px',
                paddingRight: 44,
              }}>
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
