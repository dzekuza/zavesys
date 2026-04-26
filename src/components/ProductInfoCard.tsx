'use client'

import { useWindowWidth } from '@/hooks/useWindowWidth'

interface ProductInfoCardProps {
  isDark: boolean
}

const PRODUCT_INFO_ITEMS = [
  {
    title: 'Product Features',
    content: 'Waterproof collar and leash materials, lightweight adjustable fit, safe-release buckle, dirt and odor resistance, easy-clip leash adjustment, padded handle, and built-in waste bag holder.'
  },
  {
    title: 'Set Includes',
    content: '1 waterproof adjustable collar, 1 waterproof 5ft leash, and compatibility with silicone snap-on charms for personalization.'
  },
  {
    title: 'Care',
    content: 'Rinse with water after muddy or beach walks and wipe dry with a soft cloth. Air dry flat. Avoid direct high heat to preserve shape and finish.'
  },
  {
    title: 'Shipping & Returns',
    content: 'Fast shipping across Lithuania and EU. Free shipping on qualifying orders and easy returns within the return window if unused and in original condition.'
  }
] as const

export function ProductInfoCard ({ isDark }: ProductInfoCardProps) {
  const windowWidth = useWindowWidth()
  const isMobile = windowWidth < 768
  const borderColor = isDark ? 'rgba(255,255,255,0.1)' : '#E8E3DC'
  const divider = isDark ? 'rgba(255,255,255,0.08)' : '#F0EBE5'
  const textPrimary = isDark ? '#FAF7F2' : '#3D3530'
  const textSecondary = isDark ? 'rgba(250,247,242,0.55)' : '#6B6460'
  const textMuted = isDark ? 'rgba(250,247,242,0.35)' : '#9B948F'

  return (
    <div
      style={{
        width: isMobile ? 'auto' : 400,
        margin: isMobile ? '0 12px 16px' : '0 24px 24px 0',
        alignSelf: isMobile ? 'stretch' : 'flex-end',
        position: isMobile ? 'static' : 'sticky',
        top: isMobile ? undefined : 520,
        zIndex: 90,
        borderRadius: 24,
        border: `1px solid ${borderColor}`,
        background: isDark ? 'rgba(30,22,18,0.85)' : 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(24px)',
        padding: isMobile ? '20px 20px 24px' : '24px 28px 24px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.1)'
      }}
    >
      <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: textMuted, marginBottom: 8 }}>
        Description
      </div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: textSecondary }}>
        Ready for any adventure, our Waterproof Dog Collar &amp; Leash Set combines durability, comfort, and convenience. The lightweight, adjustable collar is dirt- and odor-resistant, easy to clean, and features a safe-release buckle. Personalize it with our silicone dog charms for a custom touch. The 5ft waterproof leash has a padded handle, built-in hands-free waste bag holder, and an easy-clip system for quick adjustments. Tough, practical, and stylish-this set keeps you and your dog prepared for every walk.
      </p>

      <div style={{ marginTop: 14, borderRadius: 12, overflow: 'hidden', border: `1px solid ${borderColor}`, background: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF' }}>
        {PRODUCT_INFO_ITEMS.map((item, index) => (
          <details
            key={item.title}
            style={{
              borderTop: index === 0 ? 'none' : `1px solid ${divider}`
            }}
          >
            <summary
              style={{
                listStyle: 'none',
                cursor: 'pointer',
                padding: '11px 12px',
                fontSize: 13,
                fontWeight: 500,
                color: textPrimary
              }}
            >
              {item.title}
            </summary>
            <div
              style={{
                padding: '0 12px 12px',
                fontSize: 12,
                lineHeight: 1.6,
                color: textSecondary
              }}
            >
              {item.content}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
