'use client'

import { useState } from 'react'
import { useWindowWidth } from '@/hooks/useWindowWidth'

interface ProductInfoTabsProps {
  isDark: boolean
}

const PRODUCT_DESCRIPTION = 'Ready for any adventure, our Waterproof Dog Collar & Leash Set combines durability, comfort, and convenience. The lightweight, adjustable collar is dirt- and odor-resistant, easy to clean, and features a safe-release buckle. Personalize it with our silicone dog charms for a custom touch. The 5ft waterproof leash has a padded handle, built-in hands-free waste bag holder, and an easy-clip system for quick adjustments. Tough, practical, and stylish-this set keeps you and your dog prepared for every walk.'

const INFO_TABS = [
  {
    id: 'description',
    label: 'Description',
    content: PRODUCT_DESCRIPTION
  },
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
  const [activeTab, setActiveTab] = useState<ProductInfoTabId>('features')
  const windowWidth = useWindowWidth() ?? 1200
  const isMobile = windowWidth < 768

  const textPrimary = isDark ? '#FAF7F2' : '#3D3530'
  const textSecondary = isDark ? 'rgba(250,247,242,0.65)' : '#6B6460'
  const textMuted = isDark ? 'rgba(250,247,242,0.45)' : '#6B6460'
  const sectionBg = isDark ? '#241A16' : '#FFFFFF'

  const currentTab = INFO_TABS.find((tab) => tab.id === activeTab) || INFO_TABS[0]

  return (
    <section style={{ background: sectionBg, padding: isMobile ? '28px 16px' : '28px 16px 36px' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', gap: 8, overflow: 'hidden' }}>
            {INFO_TABS.map((tab) => {
              const isActive = tab.id === activeTab
              return (
                <button
                  key={tab.id}
                  className='btn-press'
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    height: 39.5,
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: textPrimary, marginBottom: 8 }}>
              {currentTab.label}
            </div>
            <div style={{ fontSize: 14, lineHeight: '24.5px', color: textMuted }}>
              {currentTab.content}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
