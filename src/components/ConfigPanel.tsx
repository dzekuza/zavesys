'use client'

import { useState } from 'react'
import { useWindowWidth } from '@/hooks/useWindowWidth'
import { type Collar } from '@/lib/data'
import { CharmsStep } from './config-panel/CharmsStep'
import { ColourStep } from './config-panel/ColourStep'
import { ConfigPanelFeatures } from './config-panel/ConfigPanelFeatures'
import { ConfigPanelHeader } from './config-panel/ConfigPanelHeader'
import { ConfigPanelStepTabs } from './config-panel/ConfigPanelStepTabs'
import { OrderOverview } from './config-panel/OrderOverview'
import { SizeStep } from './config-panel/SizeStep'

interface ConfigPanelProps {
  collar: Collar
  setCollar: (collar: Collar) => void
  selectedCharms: (string | null)[]
  toggleCharm: (id: string) => void
  size: string
  setSize: (size: string) => void
  onAddToCart: () => void
  isDark: boolean
}

type Step = 0 | 1 | 2

export function ConfigPanel ({
  collar,
  setCollar,
  selectedCharms,
  toggleCharm,
  size,
  setSize,
  onAddToCart,
  isDark
}: ConfigPanelProps) {
  const width = useWindowWidth() ?? 1200
  const isMobile = width < 768
  const [step, setStep] = useState<Step>(0)

  const panelBg = isDark ? 'rgba(30,22,18,0.85)' : 'rgba(255,255,255,0.92)'
  const borderColor = isDark ? 'rgba(255,255,255,0.1)' : '#E8E3DC'
  const textPrimary = isDark ? '#FAF7F2' : '#3D3530'
  const textSecondary = isDark ? 'rgba(250,247,242,0.55)' : '#6B6460'
  const textMuted = isDark ? 'rgba(250,247,242,0.35)' : '#9B948F'
  const divider = isDark ? 'rgba(255,255,255,0.08)' : '#F0EBE5'
  const isLastStep = step === 2

  const next = () => {
    if (step < 2) {
      setStep((currentStep) => (currentStep + 1) as Step)
    }
  }

  const back = () => {
    if (step > 0) {
      setStep((currentStep) => (currentStep - 1) as Step)
    }
  }

  return (
    <div
      className='config-panel'
      style={{
        width: isMobile ? '100%' : 400,
        flexShrink: 0,
        alignSelf: isMobile ? 'stretch' : 'flex-end',
        position: isMobile ? 'relative' : 'sticky',
        top: isMobile ? 'auto' : 80,
        zIndex: 100,
        background: panelBg,
        backdropFilter: 'blur(24px)',
        borderRadius: 24,
        border: `1px solid ${borderColor}`,
        margin: isMobile ? 0 : '24px 0',
        padding: isMobile ? '24px 16px 28px' : '24px 28px 28px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background-color 400ms ease-out',
        boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
        boxSizing: 'border-box'
      }}
    >
      <ConfigPanelHeader
        isMobile={isMobile}
        textMuted={textMuted}
        textPrimary={textPrimary}
      />

      <ConfigPanelStepTabs
        isDark={isDark}
        step={step}
        setStep={setStep}
        textMuted={textMuted}
        textPrimary={textPrimary}
      />

      <div
        key={step}
        className='fade-in'
        style={{
          flex: '0 0 auto',
          minHeight: 0,
          overflow: 'visible',
          padding: '2px 4px 4px',
          margin: '0 -4px'
        }}
      >
        {step === 0 && (
          <ColourStep
            collar={collar}
            next={next}
            panelBg={panelBg}
            setCollar={setCollar}
            textMuted={textMuted}
            textPrimary={textPrimary}
            textSecondary={textSecondary}
          />
        )}

        {step === 1 && (
          <CharmsStep
            borderColor={borderColor}
            isDark={isDark}
            selectedCharms={selectedCharms}
            textMuted={textMuted}
            textPrimary={textPrimary}
            textSecondary={textSecondary}
            toggleCharm={toggleCharm}
          />
        )}

        {step === 2 && (
          <SizeStep
            borderColor={borderColor}
            isDark={isDark}
            next={next}
            setSize={setSize}
            size={size}
            textMuted={textMuted}
            textPrimary={textPrimary}
          />
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 20, flexShrink: 0 }}>
        {step > 0 && (
          <button
            className='btn-press'
            onClick={back}
            style={{
              flex: '0 0 auto',
              padding: '11px 18px',
              borderRadius: 100,
              border: `1.5px solid ${borderColor}`,
              background: 'transparent',
              color: textSecondary,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "'DM Sans',sans-serif",
              transition: 'border-color 150ms ease-out, color 150ms ease-out, transform 100ms ease-out'
            }}
          >
            ← Back
          </button>
        )}

        {!isLastStep ? (
          <button
            className='btn-press'
            onClick={next}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: 100,
              border: 'none',
              background: textPrimary,
              color: isDark ? '#3D3530' : '#FAF7F2',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "'DM Sans',sans-serif",
              transition: 'background-color 150ms ease-out, transform 100ms ease-out'
            }}
          >
            Next →
          </button>
        ) : (
          <button
            className='btn-press'
            onClick={onAddToCart}
            style={{
              flex: 1,
              fontSize: 15,
              fontWeight: 500,
              padding: '12px',
              borderRadius: 100,
              border: 'none',
              background: '#A8D5A2',
              color: '#2a5a25',
              cursor: 'pointer',
              fontFamily: "'DM Sans',sans-serif",
              transition: 'background-color 150ms ease-out, transform 100ms ease-out',
              boxShadow: '0 4px 16px rgba(168,213,162,0.4)'
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.background = '#8fc489'
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background = '#A8D5A2'
            }}
          >
            Add to cart — €28
          </button>
        )}
      </div>

      <OrderOverview
        collar={collar}
        divider={divider}
        isDark={isDark}
        selectedCharms={selectedCharms}
        size={size}
        textMuted={textMuted}
        textPrimary={textPrimary}
        textSecondary={textSecondary}
      />

      <ConfigPanelFeatures isDark={isDark} isMobile={isMobile} />
    </div>
  )
}
