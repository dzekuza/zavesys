'use client'

import { useState } from 'react'
import { CommerceFooter } from '@/components/shared/CommerceFooter'
import { COLLARS, SIZES, type CartItem, type Collar } from '@/lib/data'
import { BentoSection } from './BentoSection'
import { CollarStage } from './CollarStage'
import { ConfigPanel } from './ConfigPanel'
import { MiniCart } from './MiniCart'
import { ProductInfoTabs } from './ProductInfoTabs'
import { UpsellModal } from './UpsellModal'
import { LandingNav } from './landing/LandingNav'
import { PhotoSlider } from './landing/PhotoSlider'
import { Reviews } from './landing/Reviews'

export function ProductConfigurator () {
  const isDark = false
  const [collar, setCollar] = useState<Collar>(COLLARS[0])
  const [selectedCharms, setSelectedCharms] = useState<(string | null)[]>(['c1', 'c2', 'c3', null, null])
  const [size, setSize] = useState<string>(SIZES[1])
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [showUpsell, setShowUpsell] = useState(false)

  const pageBg = isDark ? '#2A1E18' : '#FAF7F2'

  const toggleCharm = (id: string) => {
    setSelectedCharms((previousCharms) => {
      if (previousCharms.includes(id)) {
        return previousCharms.map((charm) => (charm === id ? null : charm))
      }

      const emptyIndex = previousCharms.indexOf(null)
      if (emptyIndex === -1) {
        return previousCharms
      }

      const nextCharms = [...previousCharms]
      nextCharms[emptyIndex] = id
      return nextCharms
    })
  }

  const clearSlot = (index: number) => {
    setSelectedCharms((previousCharms) => {
      const nextCharms = [...previousCharms]
      nextCharms[index] = null
      return nextCharms
    })
  }

  const moveCharm = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) {
      return
    }

    setSelectedCharms((previousCharms) => {
      if (
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= previousCharms.length ||
        toIndex >= previousCharms.length ||
        !previousCharms[fromIndex]
      ) {
        return previousCharms
      }

      const nextCharms = [...previousCharms]
      const sourceCharm = nextCharms[fromIndex]
      nextCharms[fromIndex] = nextCharms[toIndex]
      nextCharms[toIndex] = sourceCharm
      return nextCharms
    })
  }

  const addToCart = () => {
    setCart((previousCart) => [
      ...previousCart,
      { collar, charms: [...selectedCharms], size, engraving: '' }
    ])
    setShowUpsell(true)
  }

  const removeFromCart = (index: number) => {
    setCart((previousCart) => previousCart.filter((_, itemIndex) => itemIndex !== index))
  }

  const handleUpsellClose = () => {
    setShowUpsell(false)
    setCartOpen(true)
  }

  const handleAddCharms = (ids: string[]) => {
    if (ids.length === 0) {
      return
    }

    setCart((previousCart) => [
      ...previousCart,
      { collar, charms: ids, size: '', engraving: '', extra: true }
    ])
  }

  return (
    <div style={{ background: pageBg, minHeight: '100vh', transition: 'background 400ms' }}>
      <LandingNav topOffset={0} cartCount={cart.length} onCart={() => setCartOpen(true)} />

      <div className='flex flex-col items-start gap-6 px-4 pt-[88px] pb-6 md:grid md:grid-cols-[minmax(0,1fr)_420px] md:gap-6 md:px-10 md:pt-24 md:pb-8'>
        <CollarStage
          collar={collar}
          selectedCharms={selectedCharms}
          isDark={isDark}
          moveCharm={moveCharm}
          onClearSlot={clearSlot}
        />
        <ConfigPanel
          collar={collar}
          setCollar={setCollar}
          selectedCharms={selectedCharms}
          toggleCharm={toggleCharm}
          size={size}
          setSize={setSize}
          onAddToCart={addToCart}
          isDark={isDark}
        />
      </div>

      <ProductInfoTabs isDark={isDark} />
      <BentoSection isDark={isDark} />
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
