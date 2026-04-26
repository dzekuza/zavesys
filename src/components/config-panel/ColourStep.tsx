import { COLLARS, type Collar } from '@/lib/data'

interface ColourStepProps {
  collar: Collar
  next: () => void
  panelBg: string
  setCollar: (collar: Collar) => void
  textMuted: string
  textPrimary: string
  textSecondary: string
}

export function ColourStep ({
  collar,
  next,
  panelBg,
  setCollar,
  textMuted,
  textPrimary,
  textSecondary
}: ColourStepProps) {
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: textMuted,
          marginBottom: 14
        }}
      >
        Select colour —{' '}
        <span
          style={{
            textTransform: 'none',
            letterSpacing: 0,
            fontSize: 12,
            fontWeight: 400,
            color: textSecondary
          }}
        >
          {collar.name}
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
        {COLLARS.map((option) => (
          <button
            key={option.id}
            className='btn-press'
            onClick={() => {
              setCollar(option)
              setTimeout(next, 200)
            }}
            style={{
              aspectRatio: '1',
              borderRadius: 16,
              background: option.color,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              outline: 'none',
              border: collar.id === option.id ? `3px solid ${textPrimary}` : '3px solid transparent',
              transition: 'border-color 150ms ease-out, box-shadow 200ms ease-out, transform 100ms ease-out',
              boxShadow: collar.id === option.id
                ? `0 0 0 1px ${panelBg}, 0 4px 12px ${option.glowColor}`
                : `0 2px 8px ${option.glowColor}`
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: 'rgba(61,53,48,0.7)',
                marginTop: 4
              }}
            >
              {option.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
