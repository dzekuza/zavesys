'use client'

import { useState } from 'react'
import { useWindowWidth } from '@/hooks/useWindowWidth'

interface ProductInfoTabsProps {
  isDark: boolean
}

const PRODUCT_DESCRIPTION = 'Ready for any adventure, our Waterproof Dog Collar & Leash Set combines durability, comfort, and convenience. The lightweight, adjustable collar is dirt- and odor-resistant, easy to clean, and features a safe-release buckle. Personalize it with our silicone dog charms for a custom touch. The 5ft waterproof leash has a padded handle, built-in hands-free waste bag holder, and an easy-clip system for quick adjustments. Tough, practical, and stylish-this set keeps you and your dog prepared for every walk.'

const INFO_TABS = [
  {
    id: 'features',
    label: 'Product Features',
    content: 'Waterproof collar and leash materials, lightweight adjustable fit, safe-release buckle, dirt and odor resistance, easy-clip leash adjustment, padded handle, and built-in waste bag holder.'
  },
  {
    id: 'includes',
    label: 'Set Includes',
    content: '1 waterproof adjustable collar, 1 waterproof 5ft leash, and compatibility with silicone snap-on charms for personalization.'
  },
  {
    id: 'care',
    label: 'Care',
    content: 'Rinse with water after muddy or beach walks and wipe dry with a soft cloth. Air dry flat. Avoid direct high heat to preserve shape and finish.'
  },
  {
    id: 'shipping',
    label: 'Shipping & Returns',
    content: 'Fast shipping across Lithuania and EU. Free shipping on qualifying orders and easy returns within the return window if unused and in original condition.'
  }
] as const

type ProductInfoTabId = typeof INFO_TABS[number]['id']

export function ProductInfoTabs ({ isDark }: ProductInfoTabsProps) {
  const windowWidth = useWindowWidth()
  const isMobile = windowWidth < 768
  const [activeTab, setActiveTab] = useState<ProductInfoTabId>(INFO_TABS[0].id)

  const textPrimary = isDark ? '#FAF7F2' : '#3D3530'
  const textSecondary = isDark ? 'rgba(250,247,242,0.65)' : '#6B6460'
  const textMuted = isDark ? 'rgba(250,247,242,0.35)' : '#9B948F'
  const borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#E8E3DC'
  const sectionBg = isDark ? '#241A16' : '#F8F4EE'

  const currentTab = INFO_TABS.find((tab) => tab.id === activeTab) || INFO_TABS[0]

  return (
    <section style={{ background: sectionBg, padding: isMobile ? '24px 20px 56px' : '28px 40px 72px' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ maxWidth: 920 }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: textMuted, marginBottom: 10 }}>
            Description
          </div>
          <p style={{ margin: 0, fontSize: isMobile ? 14 : 15, lineHeight: 1.8, color: textSecondary }}>
            {PRODUCT_DESCRIPTION}
          </p>
        </div>

        <div style={{ marginTop: 18, borderRadius: 18, border: `1px solid ${borderColor}`, background: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 8, padding: 10, borderBottom: `1px solid ${borderColor}`, overflowX: 'auto' }}>
            {INFO_TABS.map((tab) => {
              const isActive = tab.id === activeTab
              return (
                <button
                  key={tab.id}
                  className='btn-press'
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 10,
                    border: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    fontSize: 13,
                    fontWeight: 500,
                    color: isActive ? (isDark ? '#3D3530' : '#FAF7F2') : textSecondary,
                    background: isActive ? textPrimary : (isDark ? 'rgba(255,255,255,0.05)' : '#F4EFE8'),
                    transition: 'background-color 180ms ease-out, color 180ms ease-out, transform 100ms ease-out'
                  }}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div style={{ padding: isMobile ? '16px 16px 18px' : '18px 20px 22px' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: textPrimary, marginBottom: 8 }}>
              {currentTab.label}
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.75, color: textSecondary }}>
              {currentTab.content}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
