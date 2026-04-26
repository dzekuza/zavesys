'use client'

import { useWindowWidth } from '@/hooks/useWindowWidth'
import { CommerceFooter } from '@/components/shared/CommerceFooter'
import { LandingNav } from '@/components/landing/LandingNav'
import type { ProductDetail } from '@/lib/catalog'
import { ProductDetailMedia } from './ProductDetailMedia'
import { ProductDetailSummary } from './ProductDetailSummary'

interface SingleProductPageProps {
  product: ProductDetail
}

export function SingleProductPage ({ product }: SingleProductPageProps) {
  const width = useWindowWidth() ?? 1200
  const isMobile = width < 768

  return (
    <div style={{ minHeight: '100vh', background: '#FAF7F2', color: '#3D3530' }}>
      <LandingNav topOffset={0} />

      <main
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          padding: isMobile ? '92px 20px 80px' : '112px 40px 96px'
        }}
      >
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.05fr 0.95fr',
            gap: isMobile ? 20 : 42,
            alignItems: 'start'
          }}
        >
          <ProductDetailMedia isMobile={isMobile} product={product} />
          <ProductDetailSummary isMobile={isMobile} product={product} />
        </section>
      </main>

      <CommerceFooter />
    </div>
  )
}
