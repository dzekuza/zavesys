'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { LandingNav } from '@/components/landing/LandingNav'
import { PhotoSlider } from '@/components/landing/PhotoSlider'
import { CommerceFooter } from '@/components/shared/CommerceFooter'
import { Accordion } from '@/components/shared/Accordion'
import type { AccordionItem } from '@/components/shared/Accordion'
import { PrimaryButton } from '@/components/shared/PrimaryButton'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { useWindowWidth } from '@/hooks/useWindowWidth'
import { COLLARS, PRODUCTS } from '@/lib/data'
import { slugFromProductName } from '@/lib/catalog'
import type { Collar } from '@/lib/data'
import type { ProductDetail } from '@/lib/catalog'

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut', delay } }),
}

const DISPLAY_SIZES = ['S', 'M', 'L'] as const
type DisplaySize = (typeof DISPLAY_SIZES)[number]

const SIZE_INDEX: Record<string, number> = { XS: 0, S: 1, M: 2, L: 3 }

const SIZE_DETAILS: Record<DisplaySize, { range: string; breeds: string }> = {
  S: { range: '28–36', breeds: 'Beagle, Cocker Spaniel' },
  M: { range: '36–44', breeds: 'Labrador, Border Collie' },
  L: { range: '44–52', breeds: 'German Shepherd, Husky' },
}

const ALL_GUIDE_SIZES = [
  { key: 'XS', range: '20–28' },
  { key: 'S', range: '28–36' },
  { key: 'M', range: '36–44' },
  { key: 'L', range: '44–52' },
]

type InfoTab = 'features' | 'includes' | 'care' | 'shipping'

const DESKTOP_TABS: Array<{ id: InfoTab; label: string }> = [
  { id: 'features', label: 'Product Features' },
  { id: 'includes', label: 'Set Includes' },
  { id: 'care', label: 'Care' },
  { id: 'shipping', label: 'Shipping & Returns' },
]

const TAB_CONTENT: Record<InfoTab, string> = {
  features:
    'Waterproof collar and leash materials, lightweight adjustable fit, safe-release buckle, dirt and odor resistance, easy-clip leash adjustment, padded handle, and built-in waste bag holder.',
  includes:
    'Base collar in your chosen colour and size. Five interchangeable snap-on charms. Adjustable safe-release buckle. Linen storage pouch.',
  care:
    'Rinse after every swim or muddy walk. Air dry flat — no tumble dryers. Wipe charms with a damp cloth, then air dry. Store flat in the linen pouch.',
  shipping:
    'Free shipping on orders over €40. Delivered in 2–4 business days. Returns accepted within 30 days of purchase in original condition.',
}

const MOBILE_ACCORDION: AccordionItem[] = [
  { id: 'features', title: 'Product Features', content: TAB_CONTENT.features },
  { id: 'shipping', title: 'Shipping & Returns', content: TAB_CONTENT.shipping },
  { id: 'warranty', title: 'Warranty', content: "12-month warranty against manufacturing defects. If something breaks, we'll replace it — no questions asked." },
]

const CARE_BULLETS = [
  { title: 'Rinse', desc: 'After every swim or muddy walk.' },
  { title: 'Air dry', desc: 'Lay flat. No tumble dryers.' },
  { title: 'Wipe charms', desc: 'Damp cloth, then air dry.' },
  { title: 'Store flat', desc: 'In the linen pouch.' },
]

interface Props {
  product: ProductDetail
}

export function SingleProductPage({ product }: Props) {
  const width = useWindowWidth() ?? 1200
  const isMobile = width < 768
  const isCompactHero = width < 1280
  const isCompactBento = width < 1180
  const isScrollableRecommendations = width < 1200

  const isCollar = product.productType === 'collar'
  const initialCollar = COLLARS.find((c) => c.color === product.accentColor) ?? COLLARS[0]

  const [selectedCollar, setSelectedCollar] = useState<Collar>(initialCollar)
  const [selectedSize, setSelectedSize] = useState<DisplaySize>('S')
  const [desktopTab, setDesktopTab] = useState<InfoTab>('features')
  const [added, setAdded] = useState(false)
  const router = useRouter()

  const handleAddToCart = () => {
    const item = {
      collar: selectedCollar,
      charms: [],
      size: selectedSize,
      engraving: '',
    }
    const existing = JSON.parse(localStorage.getItem('pawlette_cart') ?? '[]')
    localStorage.setItem('pawlette_cart', JSON.stringify([...existing, item]))
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      router.push('/cart')
    }, 800)
  }

  const collarProduct = PRODUCTS.find((p) => p.collarColor === selectedCollar.color)
  const displayImage = isCollar ? (collarProduct?.image ?? product.image) : product.image
  const displayName = isCollar ? (collarProduct?.name ?? product.name) : product.name
  const displayBadge = isCollar ? collarProduct?.badge : product.badge
  const displayBadgeColor = collarProduct?.badgeColor
  const displayBadgeBg = collarProduct?.badgeBg

  return (
    <div
      style={{
        background: 'var(--color-cream)',
        color: 'var(--color-bark)',
        minHeight: '100vh',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <LandingNav topOffset={0} />

      <div style={{ paddingTop: 64 }}>
        {/* ── Product hero ── */}
        {isCompactHero ? (
          <section
            style={{
              background: 'var(--color-cream)',
              padding: isMobile ? '24px 16px' : '32px 24px 48px',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              maxWidth: isMobile ? undefined : 960,
              margin: isMobile ? undefined : '0 auto',
            }}
          >
            <motion.div variants={FADE_UP} initial="hidden" animate="show" custom={0}>
              <ProductImage
                src={displayImage}
                alt={displayName}
                height={isMobile ? 384 : 560}
                badge={displayBadge}
                badgeBg={displayBadgeBg}
                badgeColor={displayBadgeColor}
                isCollar={isCollar}
                accentColor={product.accentColor}
              />
            </motion.div>
            <motion.div variants={FADE_UP} initial="hidden" animate="show" custom={0.1}>
              <ProductInfoBlock
                displayName={displayName}
                product={product}
                selectedCollar={selectedCollar}
                selectedSize={selectedSize}
                isCollar={isCollar}
                isMobile={isMobile}
                onCollarChange={setSelectedCollar}
                onSizeChange={setSelectedSize}
              />
            </motion.div>
            <motion.div variants={FADE_UP} initial="hidden" animate="show" custom={0.18}>
              <PrimaryButton variant={added ? 'sage' : 'dark'} fullWidth onClick={handleAddToCart}>
                {added ? '✓ Added to cart' : `${product.price} — Add to cart`}
              </PrimaryButton>
            </motion.div>
            <motion.div variants={FADE_UP} initial="hidden" animate="show" custom={0.24}>
              {isMobile ? (
                <Accordion items={MOBILE_ACCORDION} isMobile />
              ) : (
                <DesktopTabsPanel desktopTab={desktopTab} onSelect={setDesktopTab} />
              )}
            </motion.div>
          </section>
        ) : (
          <section
            style={{
              background: 'var(--color-cream)',
              padding: '24px 64px 64px',
              display: 'flex',
              gap: 64,
              alignItems: 'flex-start',
            }}
          >
            {/* Left: sticky image area */}
            <motion.div variants={FADE_UP} initial="hidden" animate="show" custom={0} style={{ flexShrink: 0 }}>
              {isCollar ? (
                <div style={{ position: 'sticky', top: 80, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[[0, 1], [2, 3]].map((row, ri) => (
                    <div key={ri} style={{ display: 'flex', gap: 16 }}>
                      {row.map((i) => (
                        <ProductImage
                          key={i}
                          src={displayImage}
                          alt={displayName}
                          height={360}
                          width={360}
                          badge={i === 0 ? displayBadge : undefined}
                          badgeBg={displayBadgeBg}
                          badgeColor={displayBadgeColor}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    position: 'sticky', top: 80,
                    width: 480, height: 480, borderRadius: 24,
                    background: product.accentColor,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={displayImage}
                    alt={displayName}
                    style={{ width: '72%', height: '72%', objectFit: 'contain' }}
                  />
                </div>
              )}
            </motion.div>

            {/* Right: product info */}
            <motion.div
              variants={FADE_UP} initial="hidden" animate="show" custom={0.1}
              style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 24 }}
            >
              <ProductInfoBlock
                displayName={displayName}
                product={product}
                selectedCollar={selectedCollar}
                selectedSize={selectedSize}
                isCollar={isCollar}
                isMobile={isMobile}
                onCollarChange={setSelectedCollar}
                onSizeChange={setSelectedSize}
              />
              <PrimaryButton variant={added ? 'sage' : 'dark'} fullWidth onClick={handleAddToCart}>
                {added ? '✓ Added to cart' : `${product.price} — Add to cart`}
              </PrimaryButton>
              <DesktopTabsPanel desktopTab={desktopTab} onSelect={setDesktopTab} />
            </motion.div>
          </section>
        )}

        {/* ── Bento section ── */}
        <section
          style={{
            background: 'var(--color-surface-2)',
            padding: isMobile ? '24px 16px' : '64px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {isMobile ? (
            <>
              <WaterproofCard />
              <HandmadeCard />
              {isCollar && (
                <SizingGuide selectedSize={selectedSize} onSizeChange={setSelectedSize} sizeIndex={SIZE_INDEX} allSizes={ALL_GUIDE_SIZES} sizeDetails={SIZE_DETAILS} />
              )}
              <CharmCard />
              <CareCard isMobile />
            </>
          ) : (
            <>
              {/* Row 1: Waterproof + Handmade */}
              <div style={{ display: 'flex', gap: 16, flexWrap: isCompactBento ? 'wrap' : 'nowrap' }}>
                <div style={{ flex: isCompactBento ? '1 1 320px' : 1, minWidth: isCompactBento ? 320 : 0 }}><WaterproofCard /></div>
                <div style={{ flex: isCompactBento ? '1 1 320px' : 1, minWidth: isCompactBento ? 320 : 0 }}><HandmadeCard /></div>
              </div>
              {/* Row 2: Sizing + Charm + Care */}
              <div style={{ display: 'flex', gap: 16, alignItems: 'stretch', flexWrap: isCompactBento ? 'wrap' : 'nowrap' }}>
                {isCollar && (
                  <div style={{ flex: isCompactBento ? '1 1 320px' : 1, minWidth: isCompactBento ? 320 : 0 }}>
                    <SizingGuide selectedSize={selectedSize} onSizeChange={setSelectedSize} sizeIndex={SIZE_INDEX} allSizes={ALL_GUIDE_SIZES} sizeDetails={SIZE_DETAILS} />
                  </div>
                )}
                <div style={{ flex: isCompactBento ? '1 1 320px' : 1, minWidth: isCompactBento ? 320 : 0 }}><CharmCard /></div>
                <div style={{ flex: isCompactBento ? '1 1 320px' : 1, minWidth: isCompactBento ? 320 : 0 }}><CareCard isMobile={false} /></div>
              </div>
            </>
          )}
        </section>

        {/* ── Photo slider ── */}
        <PhotoSlider />

        {/* ── You might also like ── */}
        <YouMightAlsoLike
          currentAccentColor={product.accentColor}
          isMobile={isMobile}
          isScrollable={isScrollableRecommendations}
        />
      </div>

      <CommerceFooter />
    </div>
  )
}

function DesktopTabsPanel({
  desktopTab,
  onSelect,
}: {
  desktopTab: InfoTab
  onSelect: (tab: InfoTab) => void
}) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 16,
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      }}
    >
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {DESKTOP_TABS.map((tab) => {
          const active = tab.id === desktopTab
          return (
            <button
              key={tab.id}
              onClick={() => onSelect(tab.id)}
              style={{
                borderRadius: 10, border: 'none', cursor: 'pointer',
                padding: '8px 12px', fontSize: 13, fontWeight: 500,
                background: active ? 'var(--color-bark)' : '#f4efe8',
                color: active ? 'var(--color-cream)' : 'var(--color-bark-light)',
                fontFamily: "'DM Sans', sans-serif",
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <p
        style={{
          margin: 0, fontSize: 14,
          color: 'var(--color-bark-light)', lineHeight: '24.5px',
        }}
      >
        {TAB_CONTENT[desktopTab]}
      </p>
    </div>
  )
}

/* ── Sub-components ── */

function ProductImage({
  src, alt, height, width, badge, badgeBg, badgeColor, isCollar, accentColor,
}: {
  src: string; alt: string; height: number; width?: number
  badge?: string; badgeBg?: string; badgeColor?: string
  isCollar?: boolean; accentColor?: string
}) {
  const isCharm = isCollar === false
  return (
    <div
      style={{
        borderRadius: 20, overflow: 'hidden', position: 'relative',
        height, width: width ?? '100%', flexShrink: width ? 0 : undefined,
        background: isCharm ? accentColor : undefined,
        display: isCharm ? 'flex' : undefined,
        alignItems: isCharm ? 'center' : undefined,
        justifyContent: isCharm ? 'center' : undefined,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: isCharm ? '72%' : '100%',
          height: isCharm ? '72%' : '100%',
          objectFit: isCharm ? 'contain' : 'cover',
        }}
      />
      {badge && (
        <div style={{ position: 'absolute', top: 14, right: 14, background: badgeBg, borderRadius: 20, padding: '3.5px 10px' }}>
          <span style={{ fontSize: 10, fontWeight: 500, color: badgeColor, letterSpacing: '0.6px', textTransform: 'uppercase' }}>
            {badge}
          </span>
        </div>
      )}
    </div>
  )
}

function ProductInfoBlock({
  displayName, product, selectedCollar, selectedSize,
  isCollar, isMobile, onCollarChange, onSizeChange,
}: {
  displayName: string
  product: ProductDetail
  selectedCollar: Collar
  selectedSize: DisplaySize
  isCollar: boolean
  isMobile: boolean
  onCollarChange: (c: Collar) => void
  onSizeChange: (s: DisplaySize) => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
      {/* Name + price */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: 12, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 0 : 8, minWidth: 0, flex: 1 }}>
          <p style={{ margin: 0, fontSize: isMobile ? 24 : 32, fontWeight: 500, lineHeight: isMobile ? '32px' : '40px', color: 'var(--color-bark)' }}>
            {displayName}
          </p>
          <p style={{ margin: 0, fontSize: 16, lineHeight: '24px', color: 'var(--color-bark-muted)' }}>
            {product.shortDescription}
          </p>
        </div>
        <p style={{ margin: 0, marginLeft: 'auto', fontSize: isMobile ? 20 : 24, fontWeight: 500, lineHeight: '30px', color: 'var(--color-bark)', whiteSpace: 'nowrap' }}>
          {product.price}
        </p>
      </div>

      {/* Colour selector */}
      {isCollar && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SectionLabel>
            Select colour —{' '}
            <span style={{ fontWeight: 400, color: 'var(--color-bark-light)', textTransform: 'none', letterSpacing: 0 }}>
              {selectedCollar.name}
            </span>
          </SectionLabel>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {COLLARS.map((collar) => {
              const active = collar.id === selectedCollar.id
              return (
                <motion.button
                  key={collar.id}
                  onClick={() => onCollarChange(collar)}
                  aria-label={`Select ${collar.name} colour`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    width: 48, height: 48, borderRadius: 16,
                    background: collar.color,
                    border: active ? '2px solid var(--color-bark)' : '3px solid transparent',
                    boxShadow: active ? 'none' : `0 2px 8px 0 ${collar.glowColor}`,
                    cursor: 'pointer', padding: 0,
                  }}
                />
              )
            })}
          </div>
        </div>
      )}

      {/* Size selector */}
      {isCollar && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SectionLabel>Size</SectionLabel>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {DISPLAY_SIZES.map((size) => {
              const active = size === selectedSize
              return (
                <motion.button
                  key={size}
                  onClick={() => onSizeChange(size)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    flex: '1 1 96px', padding: '12px 4px', borderRadius: 10, border: 'none',
                    background: active ? 'var(--color-bark)' : '#fff',
                    color: active ? 'var(--color-cream)' : 'rgba(45,45,45,0.87)',
                    fontSize: 16, fontWeight: 500, cursor: 'pointer',
                    textAlign: 'center', letterSpacing: '0.44px',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {size}
                </motion.button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}


function WaterproofCard() {
  return (
    <div
      style={{
        background: 'var(--color-sage)', borderRadius: 20, padding: 24,
        display: 'flex', flexDirection: 'column', gap: 24, height: '100%', boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SectionLabel color="rgba(42,90,37,0.6)">The material</SectionLabel>
        <div style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: 48, color: 'var(--color-interactive-text)', lineHeight: '50.4px', letterSpacing: '0.48px' }}>
          <p style={{ margin: 0 }}>Waterproof.</p>
          <p style={{ margin: 0 }}>No odor. No stains.</p>
        </div>
        <p style={{ margin: 0, fontSize: 15, color: 'rgba(42,90,37,0.75)', lineHeight: '25.5px' }}>
          TPU-coated nylon that shrugs off lakes, mud, and rain. Wipe with a damp cloth — it comes up looking new every time.
        </p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {['Lakes', 'Mud', 'Rain', 'Snow'].map((tag) => (
          <div key={tag} style={{ background: 'rgba(42,90,37,0.12)', borderRadius: 100, padding: '6px 14px' }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-interactive-text)' }}>{tag}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function HandmadeCard() {
  return (
    <div
      style={{
        background: 'var(--color-bark)', borderRadius: 20, padding: 24,
        display: 'flex', flexDirection: 'column', gap: 16, height: '100%', boxSizing: 'border-box',
      }}
    >
      <SectionLabel color="rgba(250,247,242,0.35)">Origin</SectionLabel>
      <div style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: 48, color: 'var(--color-cream)', lineHeight: '50.4px', letterSpacing: '0.48px' }}>
        <p style={{ margin: 0 }}>Handmade in</p>
        <p style={{ margin: 0 }}>Vilnius, Lithuania.</p>
      </div>
      <p style={{ margin: 0, fontSize: 14, color: 'rgba(250,247,242,0.55)', lineHeight: '23.8px' }}>
        Small batch. Cut and assembled by hand in our workshop. Each collar ships in a linen pouch.
      </p>
      <p style={{ margin: 0, fontSize: 22, fontStyle: 'italic', fontWeight: 500, color: 'rgba(250,247,242,0.2)', lineHeight: '33px', letterSpacing: '-0.22px' }}>
        Vandeniui atspari.
      </p>
    </div>
  )
}

function CharmCard() {
  return (
    <div
      style={{
        background: 'var(--color-blossom)', borderRadius: 20, padding: '32px 28px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        minHeight: 260, gap: 24, height: '100%', boxSizing: 'border-box',
      }}
    >
      <div>
        <SectionLabel color="rgba(61,20,30,0.45)">Charm system</SectionLabel>
        <p style={{ margin: '0 0 8px', fontFamily: "'Luckiest Guy', cursive", fontSize: 48, color: 'rgba(61,20,30,0.85)', lineHeight: '50.4px', letterSpacing: '0.48px' }}>
          Snaps on in 5 seconds.
        </p>
        <p style={{ margin: 0, fontSize: 14, color: 'rgba(61,20,30,0.6)', lineHeight: '22.4px' }}>
          Magnetic connector. No clips. No tools. No fuss.
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {['🌸', '⭐', '🦋', '🌿'].map((emoji) => (
          <div key={emoji} style={{ width: 36, height: 36, borderRadius: 18, background: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
            {emoji}
          </div>
        ))}
        <span style={{ fontSize: 12, color: 'rgba(61,20,30,0.5)', marginLeft: 4 }}>+8 more</span>
      </div>
    </div>
  )
}

function CareCard({ isMobile }: { isMobile: boolean }) {
  if (isMobile) {
    return (
      <div style={{ background: 'var(--color-cream)', border: '1px solid var(--color-border)', borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <p style={{ margin: 0, fontFamily: "'Luckiest Guy', cursive", fontSize: 48, color: 'rgba(61,20,30,0.85)', lineHeight: '50.4px', letterSpacing: '0.48px' }}>
          Care
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[[0, 1], [2, 3]].map((row, ri) => (
            <div key={ri} style={{ display: 'flex', gap: 24 }}>
              {row.map((i) => (
                <div key={i} style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 500, color: 'var(--color-bark)' }}>{CARE_BULLETS[i].title}</p>
                  <p style={{ margin: 0, fontSize: 12, color: 'var(--color-bark-muted)', lineHeight: '18px' }}>{CARE_BULLETS[i].desc}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--color-cream)', border: '1px solid var(--color-border)', borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 16, height: '100%', boxSizing: 'border-box' }}>
      <SectionLabel>Care</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {CARE_BULLETS.map((item) => (
          <div key={item.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--color-sage)', flexShrink: 0, marginTop: 7 }} />
            <div>
              <p style={{ margin: '0 0 1px', fontSize: 13, fontWeight: 500, color: 'var(--color-bark)', lineHeight: '19.5px' }}>{item.title}</p>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--color-bark-muted)', lineHeight: '18px' }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface SizingGuideProps {
  selectedSize: DisplaySize
  onSizeChange: (s: DisplaySize) => void
  sizeIndex: Record<string, number>
  allSizes: Array<{ key: string; range: string }>
  sizeDetails: Record<DisplaySize, { range: string; breeds: string }>
}

function SizingGuide({ selectedSize, onSizeChange, sizeIndex, allSizes, sizeDetails }: SizingGuideProps) {
  const details = sizeDetails[selectedSize]
  const progressPct = (sizeIndex[selectedSize] / 3) * 100

  return (
    <div
      style={{
        background: '#fff', border: '1px solid var(--color-border)', borderRadius: 20,
        padding: 24, display: 'flex', flexDirection: 'column', gap: 12,
        height: '100%', boxSizing: 'border-box',
      }}
    >
      <SectionLabel>Sizing guide</SectionLabel>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
        <span style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: 48, color: 'var(--color-bark)', lineHeight: '48px', letterSpacing: '0.48px' }}>
          {selectedSize}
        </span>
        <span style={{ fontSize: 15, color: 'var(--color-bark-light)', lineHeight: '22.5px', marginBottom: 4 }}>
          {details.range} cm
        </span>
      </div>
      <p style={{ margin: 0, fontSize: 13, color: 'var(--color-bark-muted)' }}>{details.breeds}</p>
      <div style={{ background: 'var(--color-border)', borderRadius: 3, height: 6, marginTop: 4 }}>
        <div style={{ background: 'var(--color-sage)', borderRadius: 3, height: 6, width: `${Math.max(progressPct, 8)}%`, transition: 'width 0.2s ease' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        {allSizes.map((s) => {
          const isActive = s.key === selectedSize
          const isSelectable = DISPLAY_SIZES.includes(s.key as DisplaySize)
          return (
            <button
              key={s.key}
              onClick={() => isSelectable && onSizeChange(s.key as DisplaySize)}
              style={{ background: 'none', border: 'none', cursor: isSelectable ? 'pointer' : 'default', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: 0, fontFamily: "'DM Sans', sans-serif" }}
            >
              <span style={{ fontSize: 12, fontWeight: 500, color: isActive ? 'var(--color-bark)' : 'var(--color-bark-muted)', lineHeight: '18px' }}>{s.key}</span>
              <span style={{ fontSize: 10, color: 'var(--color-bark-muted)', lineHeight: '15px' }}>{s.range}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function YouMightAlsoLike({
  currentAccentColor,
  isMobile,
  isScrollable,
}: {
  currentAccentColor: string
  isMobile: boolean
  isScrollable: boolean
}) {
  const products = isMobile
    ? PRODUCTS.filter((p) => p.collarColor !== currentAccentColor)
    : [...PRODUCTS]

  return (
    <section style={{ background: 'var(--color-cream)', padding: isMobile ? '64px 16px 48px' : '64px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, gap: 12 }}>
        <div>
          <SectionLabel>Recommended</SectionLabel>
          <p style={{ margin: '8px 0 0', fontFamily: "'Luckiest Guy', cursive", fontSize: 48, color: 'var(--color-bark)', lineHeight: '52.8px', letterSpacing: '-0.96px' }}>
            You might also like
          </p>
        </div>
        <Link href="/products" style={{ textDecoration: 'none', fontSize: 14, color: 'var(--color-bark-muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>
          View all →
        </Link>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 16,
          overflowX: isScrollable ? 'auto' : 'visible',
          paddingBottom: isScrollable ? 8 : 0,
          scrollSnapType: isScrollable ? 'x mandatory' : undefined,
          msOverflowStyle: isScrollable ? 'none' : undefined,
          scrollbarWidth: isScrollable ? 'none' : undefined,
        }}
      >
        {products.map((p) => {
          const slug = slugFromProductName(p.name)
          return (
            <Link
              key={p.id}
              href={`/products/${slug}`}
              style={{
                textDecoration: 'none', color: 'inherit',
                flexShrink: 0, width: 272,
                scrollSnapAlign: isScrollable ? 'start' : undefined,
              }}
            >
              <div style={{ borderRadius: 20, overflow: 'hidden', height: 200, position: 'relative' }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {p.badge && (
                  <div style={{ position: 'absolute', top: 14, right: 14, background: p.badgeBg, borderRadius: 20, padding: '3.5px 10px' }}>
                    <span style={{ fontSize: 10, fontWeight: 500, color: p.badgeColor, letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                      {p.badge}
                    </span>
                  </div>
                )}
              </div>
              <div style={{ padding: '16px 4px 0' }}>
                <p style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 500, color: 'var(--color-bark)' }}>{p.name}</p>
                <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--color-bark-muted)' }}>{p.desc}</p>
                <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                  <div style={{ width: 14, height: 14, borderRadius: 7, background: p.collarColor, border: '1px solid rgba(61,53,48,0.15)' }} />
                  {p.charms.slice(0, 4).map((c, i) => (
                    <div key={i} style={{ width: 12, height: 12, borderRadius: 6, background: c.bg, border: '1px solid rgba(61,53,48,0.12)', alignSelf: 'center' }} />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 18, fontWeight: 500, color: 'var(--color-bark)' }}>
                    {p.price}{' '}
                    <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--color-bark-muted)' }}>· 5 charms</span>
                  </span>
                  <PrimaryButton variant="sage" size="sm">Add to cart</PrimaryButton>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
