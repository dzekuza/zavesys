'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useWindowWidth } from '@/hooks/useWindowWidth'
import { LandingNav } from '@/components/landing/LandingNav'
import type { ProductDetail } from '@/lib/catalog'

interface SingleProductPageProps {
  product: ProductDetail
}

export function SingleProductPage ({ product }: SingleProductPageProps) {
  const width = useWindowWidth() ?? 1200
  const isMobile = width < 768

  const productLabel = useMemo(
    () => (product.productType === 'charm' ? 'Single charm' : 'Collar set'),
    [product.productType]
  )

  return (
    <div style={{ minHeight: '100vh', background: '#FAF7F2', fontFamily: "'DM Sans',sans-serif", color: '#3D3530' }}>
      <LandingNav topOffset={0} />

      <main style={{ maxWidth: 1160, margin: '0 auto', padding: isMobile ? '92px 20px 80px' : '112px 40px 96px' }}>
        <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.05fr 0.95fr', gap: isMobile ? 20 : 42, alignItems: 'start' }}>
          <div style={{ borderRadius: 24, background: `radial-gradient(circle at 20% 20%, ${product.accentColor}55, transparent 45%), linear-gradient(160deg, ${product.tintColor}, #fff)`, padding: isMobile ? 20 : 28, border: '1px solid rgba(61,53,48,0.08)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 12px', borderRadius: 999, background: '#fff', border: '1px solid rgba(61,53,48,0.08)', marginBottom: 18 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: product.accentColor }} />
              <span style={{ fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#6f6761' }}>{productLabel}</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.76)', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(61,53,48,0.07)' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', aspectRatio: isMobile ? '1 / 1' : '4 / 3', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>

          <div style={{ paddingTop: isMobile ? 8 : 12 }}>
            {product.badge && (
              <div style={{ display: 'inline-flex', padding: '5px 11px', borderRadius: 100, background: `${product.accentColor}22`, color: '#3D3530', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>
                {product.badge}
              </div>
            )}
            <h1 style={{ margin: 0, fontSize: isMobile ? 34 : 48, lineHeight: 1.03, letterSpacing: '-0.04em' }}>{product.name}</h1>
            <p style={{ margin: '12px 0 0', fontSize: 16, color: '#8f8680', maxWidth: 520, lineHeight: 1.65 }}>{product.shortDescription}</p>

            <div style={{ marginTop: 24, padding: isMobile ? '18px 16px' : '22px 20px', borderRadius: 18, border: '1px solid rgba(61,53,48,0.08)', background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16 }}>
                <div style={{ fontSize: 28, letterSpacing: '-0.03em' }}>{product.price}</div>
                <span style={{ fontSize: 12, color: '#8f8680' }}>Ships from Vilnius, LT</span>
              </div>
              <p style={{ margin: '14px 0 0', fontSize: 14, color: '#6f6761', lineHeight: 1.6 }}>{product.compatibilityNote}</p>
              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <Link href={product.ctaHref} style={{ textDecoration: 'none', borderRadius: 999, background: '#A8D5A2', color: '#2a5a25', padding: isMobile ? '11px 16px' : '12px 18px', fontSize: 14, fontWeight: 500 }}>
                  {product.ctaLabel}
                </Link>
                <Link href="/products" style={{ textDecoration: 'none', borderRadius: 999, border: '1px solid rgba(61,53,48,0.12)', color: '#3D3530', padding: isMobile ? '11px 16px' : '12px 18px', fontSize: 14 }}>
                  View more products
                </Link>
              </div>
            </div>

            <div style={{ marginTop: 22, padding: '18px 18px', borderRadius: 16, border: `1px solid ${product.accentColor}55`, background: `${product.accentColor}14` }}>
              <div style={{ fontSize: 12, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#6f6761', marginBottom: 8 }}>About this item</div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7 }}>{product.longDescription}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
