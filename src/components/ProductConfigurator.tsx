'use client'

import { useState } from 'react'
import { useWindowWidth } from '@/hooks/useWindowWidth'
import { CommerceFooter } from '@/components/shared/CommerceFooter'
import { COLLARS, SIZES, type CartItem, type Collar } from '@/lib/data'
import { BentoSection } from './BentoSection'
import { CollarStage } from './CollarStage'
import { ConfigPanel } from './ConfigPanel'
import { MiniCart } from './MiniCart'
import { UpsellModal } from './UpsellModal'
import { LandingNav } from './landing/LandingNav'
import { PhotoSlider } from './landing/PhotoSlider'
import { Reviews } from './landing/Reviews'

const COLLAR_GALLERY: Record<string, string[]> = {
  blossom: [
    '/In_a_minimalist_style_a_delicate_pink_hzs32ACd.webp',
    '/collar-pink.png',
    '/A_woman_and_her_golden_retriever_sit_together_on_jKVk75j-.webp',
  ],
  sage: [
    '/A_sage_green_pet_collar_displays_the_name_HARRY_2CvCRWm.webp',
    '/A_golden_retriever_sits_contentedly_on_a_grassy_QlXAm7ix.webp',
    '/A_woman_and_her_golden_retriever_sit_together_on_jKVk75j-.webp',
  ],
  sky: [
    '/A_yellow_star-shaped_charm_is_attached_to_a_pink_jWdEg3nN.webp',
    '/A_golden_retriever_sits_contentedly_on_a_grassy_QlXAm7ix.webp',
    '/A_woman_with_brown_hair_runs_along_a_sandy_beach_pMc16cB6.webp',
  ],
  honey: [
    '/A_soft_sage_green_silicone_toy_with_a_sun-shaped_TAoMQ7Zb.webp',
    '/collar-yellow.png',
    '/A_golden_retriever_sits_contentedly_on_a_grassy_QlXAm7ix.webp',
  ],
}

export function ProductConfigurator () {
  const width = useWindowWidth() ?? 1200
  const isMobile = width < 768
  const [collar, setCollar] = useState<Collar>(COLLARS[0])
  const [selectedCharms, setSelectedCharms] = useState<(string | null)[]>(['c1', 'c2', 'c3', null, null])
  const [size, setSize] = useState<string>(SIZES[1])
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [showUpsell, setShowUpsell] = useState(false)
  const [leftTab, setLeftTab] = useState<'gallery' | 'preview'>('gallery')

  const toggleCharm = (id: string) => {
    setSelectedCharms(prev => {
      if (prev.includes(id)) return prev.map(c => c === id ? null : c)
      const idx = prev.indexOf(null)
      if (idx === -1) return prev
      const next = [...prev]
      next[idx] = id
      return next
    })
  }

  const clearSlot = (index: number) => {
    setSelectedCharms(prev => {
      const next = [...prev]
      next[index] = null
      return next
    })
  }

  const moveCharm = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return
    setSelectedCharms(prev => {
      if (
        fromIndex < 0 || toIndex < 0 ||
        fromIndex >= prev.length || toIndex >= prev.length ||
        !prev[fromIndex]
      ) return prev
      const next = [...prev]
      const src = next[fromIndex]
      next[fromIndex] = next[toIndex]
      next[toIndex] = src
      return next
    })
  }

  const addToCart = () => {
    setCart(prev => [...prev, { collar, charms: [...selectedCharms], size, engraving: '' }])
    setShowUpsell(true)
  }

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpsellClose = () => {
    setShowUpsell(false)
    setCartOpen(true)
  }

  const handleAddCharms = (ids: string[]) => {
    if (ids.length === 0) return
    setCart(prev => [...prev, { collar, charms: ids, size: '', engraving: '', extra: true }])
  }

  const NAV_H = 72

  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh', fontFamily: "'DM Sans',sans-serif" }}>
      <LandingNav topOffset={0} cartCount={cart.length} onCart={() => setCartOpen(true)} />

      {/* ─── Configurator hero ─── */}
      <div style={{
        display: isMobile ? 'flex' : 'grid',
        flexDirection: isMobile ? 'column' : undefined,
        gridTemplateColumns: isMobile ? undefined : '1fr 440px',
        gap: isMobile ? 0 : 32,
        minHeight: isMobile ? 'auto' : '80vh',
        maxWidth: 1200,
        margin: '0 auto',
        width: '100%',
        marginTop: isMobile ? 0 : NAV_H,
      }}>

        {/* LEFT — product gallery grid */}
        <div style={{
          position: isMobile ? 'relative' : 'sticky',
          top: NAV_H,
          height: isMobile ? 'auto' : '80vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>

          {/* Tab bar */}
          <div style={{
            position: 'relative',
            display: 'flex',
            gap: 4,
            marginBottom: 16,
            background: 'rgba(61,53,48,0.07)',
            borderRadius: 100,
            padding: 4,
            width: 'fit-content',
          }}>
            {(['gallery', 'preview'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setLeftTab(tab)}
                style={{
                  padding: '7px 18px',
                  borderRadius: 100,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "'DM Sans',sans-serif",
                  letterSpacing: '0.04em',
                  background: leftTab === tab ? '#FAF7F2' : 'transparent',
                  color: leftTab === tab ? '#3D3530' : 'rgba(61,53,48,0.45)',
                  boxShadow: leftTab === tab ? '0 1px 4px rgba(61,53,48,0.12)' : 'none',
                  transition: 'background 150ms, color 150ms, box-shadow 150ms',
                }}
              >
                {tab === 'gallery' ? 'Gallery' : 'Preview'}
              </button>
            ))}
          </div>

          {/* Gallery view */}
          {leftTab === 'gallery' && (
            <div style={{
              position: 'relative',
              flex: 1,
              minHeight: isMobile ? 320 : 0,
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: '3fr 2fr',
              gridTemplateRows: '1fr 1fr',
              gap: 10,
            }}>
              {/* Featured image — spans both rows */}
              <div style={{ gridRow: '1 / 3', borderRadius: 20, overflow: 'hidden', position: 'relative' }}>
                <img
                  key={COLLAR_GALLERY[collar.id]?.[0]}
                  src={COLLAR_GALLERY[collar.id]?.[0]}
                  alt={`${collar.name} collar`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{
                  position: 'absolute', bottom: 14, left: 14,
                  background: collar.color, borderRadius: 100, padding: '5px 14px',
                  fontSize: 11, fontWeight: 700, fontFamily: "'DM Sans',sans-serif",
                  color: '#3D3530', letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>
                  {collar.name}
                </div>
              </div>
              <div style={{ borderRadius: 16, overflow: 'hidden' }}>
                <img src={COLLAR_GALLERY[collar.id]?.[1]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ borderRadius: 16, overflow: 'hidden' }}>
                <img src={COLLAR_GALLERY[collar.id]?.[2]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          )}

          {/* Configurator preview */}
          {leftTab === 'preview' && (
            <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <CollarStage
                collar={collar}
                selectedCharms={selectedCharms}
                isDark={false}
                moveCharm={moveCharm}
                onClearSlot={clearSlot}
                showGallery={false}
              />
            </div>
          )}
        </div>

        {/* RIGHT — config form */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          overflowY: isMobile ? 'visible' : 'auto',
        }}>
          {/* Heading block */}
          <div style={{ marginBottom: 32 }}>
            <p style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#9B948F',
              margin: '0 0 8px',
            }}>
              Collar Set
            </p>
            <h1 style={{
              fontFamily: "'Luckiest Guy',cursive",
              fontSize: isMobile ? 34 : 40,
              color: '#3D3530',
              margin: '0 0 10px',
              lineHeight: 1.05,
              letterSpacing: '0.02em',
            }}>
              Build your collar
            </h1>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{
                fontSize: 28,
                fontWeight: 700,
                color: '#3D3530',
                letterSpacing: '-0.01em',
              }}>
                €28
              </span>
              <span style={{ fontSize: 13, color: '#9B948F' }}>
                free shipping over €50
              </span>
            </div>
          </div>

          <ConfigPanel
            collar={collar}
            setCollar={setCollar}
            selectedCharms={selectedCharms}
            toggleCharm={toggleCharm}
            size={size}
            setSize={setSize}
            onAddToCart={addToCart}
            isDark={false}
          />
        </div>
      </div>

      <BentoSection isDark={false} />
      <PhotoSlider />
      <Reviews />
      <CommerceFooter />

      {cartOpen && (
        <MiniCart
          items={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
        />
      )}
      {showUpsell && (
        <UpsellModal
          collar={collar}
          onClose={handleUpsellClose}
          onAddCharms={handleAddCharms}
        />
      )}
    </div>
  )
}
