'use client';

import { useState } from 'react';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { COLLARS, SIZES, CartItem, Collar } from '@/lib/data';
import { Nav } from './Nav';
import { CollarStage } from './CollarStage';
import { ConfigPanel } from './ConfigPanel';
import { ProductInfoTabs } from './ProductInfoTabs';
import { MiniCart } from './MiniCart';
import { BentoSection } from './BentoSection';
import { UpsellModal } from './UpsellModal';
import { PhotoSlider } from './landing/PhotoSlider';
import { Reviews } from './landing/Reviews';

export function ProductConfigurator() {
  const [isDark, setIsDark] = useState(false);
  const [showEngraving, setShowEngraving] = useState(true);

  const [collar, setCollar] = useState<Collar>(COLLARS[0]);
  const [selectedCharms, setSelectedCharms] = useState<(string | null)[]>(['c1', 'c2', 'c3', null, null]);
  const [size, setSize] = useState<string>(SIZES[1]);
  const [engraving, setEngraving] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);

  const w = useWindowWidth();
  const isMobile = w < 768;

  const pageBg = isDark ? '#2A1E18' : '#FAF7F2';

  const toggleCharm = (id: string) => {
    setSelectedCharms(prev => {
      if (prev.includes(id)) return prev.map(c => c === id ? null : c);
      const emptyIdx = prev.indexOf(null);
      if (emptyIdx === -1) return prev;
      const next = [...prev];
      next[emptyIdx] = id;
      return next;
    });
  };

  const addToCart = () => {
    setCart(prev => [...prev, { collar, charms: [...selectedCharms], size, engraving }]);
    setShowUpsell(true);
  };

  const removeFromCart = (i: number) => {
    setCart(prev => prev.filter((_, idx) => idx !== i));
  };

  const handleUpsellClose = () => { setShowUpsell(false); setCartOpen(true); };
  const handleAddCharms = (ids: string[]) => {
    if (ids.length > 0) setCart(prev => [...prev, { collar, charms: ids, size: '', engraving: '', extra: true }]);
  };

  return (
    <div style={{ background: pageBg, minHeight: '100vh', transition: 'background 400ms', fontFamily: "'DM Sans',sans-serif" }}>
      <Nav isDark={isDark} cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />

      <div
        style={{
          display: isMobile ? 'flex' : 'grid',
          flexDirection: isMobile ? 'column' : undefined,
          gridTemplateColumns: isMobile ? undefined : 'minmax(0, 1fr) 400px',
          columnGap: isMobile ? undefined : 24,
          minHeight: '100vh',
          paddingTop: 0,
          alignItems: 'start'
        }}
      >
        <CollarStage collar={collar} selectedCharms={selectedCharms} isDark={isDark} engraving={engraving} />
        <ConfigPanel
          collar={collar} setCollar={setCollar}
          selectedCharms={selectedCharms} toggleCharm={toggleCharm}
          size={size} setSize={setSize}
          engraving={engraving} setEngraving={setEngraving}
          onAddToCart={addToCart}
          isDark={isDark}
          showEngraving={showEngraving}
        />
      </div>
      <ProductInfoTabs isDark={isDark} />

      <BentoSection isDark={isDark} />
      <PhotoSlider />
      <Reviews />

      <footer style={{ background: '#3D3530', padding: isMobile ? '32px 24px' : '40px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.03em', color: '#FAF7F2', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#A8D5A2' }} />
          Žavesys
        </div>
        <div style={{ fontSize: 12, color: 'rgba(250,247,242,0.35)' }}>© 2025 · Made with care in Lithuania</div>
        <div style={{ fontSize: 13, color: 'rgba(250,247,242,0.4)', fontStyle: 'italic' }}>Vandeniui atspari.</div>
      </footer>

      {cartOpen && <MiniCart items={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} />}
      {showUpsell && <UpsellModal collar={collar} onClose={handleUpsellClose} onAddCharms={handleAddCharms} />}

    </div>
  );
}
