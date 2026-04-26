'use client';

import { useWindowWidth } from '@/hooks/useWindowWidth';
import { useRouter } from 'next/navigation';
import { LandingNav } from '@/components/landing/LandingNav';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { Accordion } from '@/components/shared/Accordion';
import type { AccordionItem } from '@/components/shared/Accordion';

const PRODUCT_FAQS: AccordionItem[] = [
  {
    id: 'waterproof',
    title: 'Are Pawlette collars waterproof?',
    content:
      'Yes. All Pawlette collars are made from food-grade silicone — fully waterproof and safe for swimming, rain, and muddy walks. The material does not absorb odours or stains, so a quick rinse is all you need after a wet adventure.',
  },
  {
    id: 'charms',
    title: 'How do the swap charms work?',
    content:
      'Each charm uses a snap connector that clicks on and off in around 5 seconds — no tools, no fiddling. You can mix and match all 12 charm designs freely between any Pawlette collar.',
  },
  {
    id: 'size',
    title: 'How do I choose the right collar size?',
    content:
      "Measure around the widest part of your dog's neck and add 2–3 cm for comfort. XS fits 20–28 cm, S fits 28–36 cm, M fits 36–44 cm, and L fits 44–54 cm. If your dog is between sizes, size up.",
  },
  {
    id: 'engrave',
    title: "Can I engrave my dog's name on the collar?",
    content:
      "Yes — personalised engraving is available at checkout. You can add your dog's name, a short message, or a phone number for safety. Engraving is laser-etched directly into the silicone for a clean, permanent finish.",
  },
  {
    id: 'origin',
    title: 'Where are Pawlette collars made?',
    content:
      "Every collar is designed and handcrafted in Vilnius, Lithuania. We're a small team and each order is made with care — not mass-produced in a factory.",
  },
  {
    id: 'durability',
    title: 'How durable is the silicone material?',
    content:
      'Pawlette collars are built to last. Food-grade silicone is highly resistant to UV, saltwater, chlorine, and everyday wear. The collar will not crack, fade, or fray with regular use. We back every collar with a 12-month durability guarantee.',
  },
  {
    id: 'charm-compatibility',
    title: 'Are charms compatible with all collar sizes?',
    content:
      'Yes — all Pawlette charms use a universal snap connector that works across every collar size (XS through L). Any charm you buy today will fit any collar you buy in the future.',
  },
];

const ORDERS_FAQS: AccordionItem[] = [
  {
    id: 'shipping-time',
    title: 'How long does shipping take?',
    content:
      'Standard delivery within Lithuania takes 1–3 business days. EU shipping takes 3–7 business days. Orders are dispatched the next business day after payment is confirmed. You will receive a tracking link by email as soon as your parcel is on its way.',
  },
  {
    id: 'returns',
    title: 'What is your returns policy?',
    content:
      'We accept returns within 30 days of delivery for unused, unaltered items in their original packaging. Personalised (engraved) orders cannot be returned unless the item is faulty. To start a return, email us at hello@pawlette.lt with your order number.',
  },
  {
    id: 'gift-wrapping',
    title: 'Do you offer gift wrapping?',
    content:
      'Yes! Select "Gift wrapping" at checkout and we will pack your order in our signature kraft box with a ribbon and a handwritten note card. You can add a personal message during checkout at no extra charge. Gift wrapping costs €2.50.',
  },
];

export default function FaqPage() {
  const router = useRouter();
  const w = useWindowWidth() ?? 1200;
  const isMobile = w < 768;

  return (
    <div
      style={{
        background: 'var(--color-cream)',
        minHeight: '100vh',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <LandingNav topOffset={0} cartCount={0} onCart={() => router.push('/cart')} />

      {/* Hero */}
      <section
        style={{
          paddingTop: 120,
          paddingBottom: isMobile ? 48 : 64,
          paddingLeft: isMobile ? 24 : 48,
          paddingRight: isMobile ? 24 : 48,
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          {/* Section label */}
          <span
            style={{
              display: 'inline-block',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-bark)',
              opacity: 0.5,
              marginBottom: 16,
            }}
          >
            FAQ
          </span>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "'Luckiest Guy', cursive",
              fontSize: isMobile ? 48 : 72,
              fontWeight: 400,
              color: 'var(--color-bark)',
              lineHeight: 1.05,
              letterSpacing: '0.01em',
              margin: '0 0 20px',
            }}
          >
            Got questions?
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: isMobile ? 16 : 18,
              color: 'var(--color-bark)',
              opacity: 0.65,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Everything you need to know about Pawlette collars, charms, and
            orders. Can&apos;t find an answer?{' '}
            <a
              href="mailto:hello@pawlette.lt"
              style={{
                color: 'var(--color-bark)',
                textDecoration: 'underline',
                textUnderlineOffset: 3,
              }}
            >
              Drop us a message.
            </a>
          </p>
        </div>
      </section>

      {/* FAQ columns */}
      <section
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          padding: isMobile ? '0 24px 80px' : '0 48px 120px',
        }}
      >
        {isMobile ? (
          /* Single column on mobile */
          <div>
            <CategoryBlock
              title="Product"
              accent="var(--color-sage)"
              items={PRODUCT_FAQS}
              isMobile={isMobile}
            />
            <div style={{ height: 48 }} />
            <CategoryBlock
              title="Orders & Shipping"
              accent="var(--color-sage)"
              items={ORDERS_FAQS}
              isMobile={isMobile}
            />
          </div>
        ) : (
          /* Two columns on desktop */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 64,
              alignItems: 'start',
            }}
          >
            <CategoryBlock
              title="Product"
              accent="var(--color-sage)"
              items={PRODUCT_FAQS}
              isMobile={isMobile}
            />
            <CategoryBlock
              title="Orders & Shipping"
              accent="var(--color-sage)"
              items={ORDERS_FAQS}
              isMobile={isMobile}
            />
          </div>
        )}
      </section>

      {/* Bottom CTA band */}
      <section
        style={{
          background: 'var(--color-bark)',
          padding: isMobile ? '48px 24px' : '64px 48px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: isMobile ? 22 : 28,
            color: 'var(--color-sage)',
            margin: '0 0 8px',
            letterSpacing: '0.01em',
          }}
        >
          Still not sure?
        </p>
        <h2
          style={{
            fontFamily: "'Luckiest Guy', cursive",
            fontSize: isMobile ? 32 : 44,
            fontWeight: 400,
            color: 'var(--color-cream)',
            margin: '0 0 24px',
            letterSpacing: '0.01em',
          }}
        >
          We&apos;re happy to help.
        </h2>
        <a
          href="mailto:hello@pawlette.lt"
          style={{
            display: 'inline-block',
            background: 'var(--color-sage)',
            color: 'var(--color-bark)',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            padding: '14px 32px',
            borderRadius: 100,
          }}
        >
          Email us
        </a>
      </section>

      <LandingFooter />
    </div>
  );
}

/* ── Internal helper ── */

interface CategoryBlockProps {
  title: string;
  accent: string;
  items: AccordionItem[];
  isMobile: boolean;
}

function CategoryBlock({ title, accent, items, isMobile }: CategoryBlockProps) {
  return (
    <div>
      {/* Category label with sage underline accent */}
      <div style={{ marginBottom: 32 }}>
        <h2
          style={{
            fontFamily: "'Luckiest Guy', cursive",
            fontSize: isMobile ? 22 : 26,
            fontWeight: 400,
            color: 'var(--color-bark)',
            margin: '0 0 8px',
            letterSpacing: '0.01em',
          }}
        >
          {title}
        </h2>
        <div
          style={{
            width: 40,
            height: 3,
            borderRadius: 2,
            background: accent,
          }}
        />
      </div>

      <Accordion items={items} isMobile={isMobile} />
    </div>
  );
}
