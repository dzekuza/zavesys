'use client'

import { useState } from 'react'
import { LandingNav } from '@/components/landing/LandingNav'
import { CommerceFooter } from '@/components/shared/CommerceFooter'
import { ALL_CHARMS, PRODUCTS } from '@/lib/data'
import { CharmCard } from './CharmCard'
import { ProductCard } from './ProductCard'
import { ProductFilter, ProductsFilterTabs } from './ProductsFilterTabs'

export function ProductsPageContent () {
  const [filter, setFilter] = useState<ProductFilter>('all')

  const showCollars = filter === 'all' || filter === 'collars'
  const showCharms = filter === 'all' || filter === 'charms'

  return (
    <div style={{ minHeight: '100vh', background: '#FAF7F2', paddingTop: 64, color: '#3D3530' }}>
      <LandingNav topOffset={0} />
      <ProductsFilterTabs filter={filter} onChange={setFilter} />

      <main style={{ maxWidth: 1160, margin: '0 auto', padding: '20px 20px 80px' }}>
        {showCollars && (
          <section>
            {(filter === 'all' || filter === 'collars') && (
              <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
                <h2 style={{ margin: 0, fontSize: 24, fontWeight: 500, letterSpacing: '-0.02em', color: '#3D3530', fontFamily: "'DM Sans',sans-serif" }}>
                  Collar sets
                </h2>
                <span style={{ fontSize: 13, color: '#9B948F' }}>
                  Each includes 5 snap-on charms
                </span>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 28 }}>
              {PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {filter === 'all' && (
          <div style={{ height: 1, background: 'rgba(61,53,48,0.08)', margin: '72px 0' }} />
        )}

        {showCharms && (
          <section style={{ paddingTop: filter === 'charms' ? 64 : 0 }}>
            {filter === 'all' && (
              <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
                <h2 style={{ margin: 0, fontSize: 24, fontWeight: 500, letterSpacing: '-0.02em', color: '#3D3530', fontFamily: "'DM Sans',sans-serif" }}>
                  Individual charms
                </h2>
                <span style={{ fontSize: 13, color: '#9B948F' }}>
                  Add extras · €4 each
                </span>
              </div>
            )}

            {filter === 'charms' && (
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ margin: 0, fontSize: 24, fontWeight: 500, letterSpacing: '-0.02em', color: '#3D3530', fontFamily: "'DM Sans',sans-serif" }}>
                  Charms
                </h2>
                <p style={{ marginTop: 8, fontSize: 14, color: '#9B948F' }}>
                  Snap on and off in five seconds. Compatible with all collar sets.
                </p>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 16 }}>
              {ALL_CHARMS.map((charm) => (
                <CharmCard key={charm.id} charm={charm} />
              ))}
            </div>
          </section>
        )}
      </main>

      <CommerceFooter />
    </div>
  )
}
