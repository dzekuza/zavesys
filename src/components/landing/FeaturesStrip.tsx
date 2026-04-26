'use client';

const FEATURES = [
  {
    iconSrc: '/Dog_Collar_Flat_Lay (3)/A_light_green_drop_shape_with_a_subtle_curve_on_qVGIeFtL Background Removed.png',
    text: 'Waterproof'
  },
  {
    iconSrc: '/Dog_Collar_Flat_Lay (3)/A_simple_circular_graphic_depicts_a_clock_face_8DikilGN Background Removed.png',
    text: 'Easy to use'
  },
  {
    iconSrc: '/Dog_Collar_Flat_Lay (3)/In_a_flat_design_style_a_light_green_heart_shape_mhu_5XWt Background Removed.png',
    text: 'Eco-friendly'
  },
  {
    iconSrc: '/Dog_Collar_Flat_Lay (3)/A_light_blue_icon_depicts_a_simple_square_box_k_3i4pxx Background Removed.png',
    text: 'Free delivery'
  }
]

export function FeaturesStrip({ variant }: { variant: 'cream' | 'bold' }) {
  const textColor = variant === 'bold' ? 'rgba(250,247,242,0.6)' : '#6B6460';

  return (
    <div style={{ padding: '20px 40px' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', display: 'flex', justifyContent: 'space-around', gap: 20, flexWrap: 'wrap' }}>
        {FEATURES.map(f => (
          <div key={f.text} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center' }}>
            <img
              src={encodeURI(f.iconSrc)}
              alt=""
              aria-hidden="true"
              style={{ width: 64, height: 64, objectFit: 'contain', flexShrink: 0 }}
            />
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, color: textColor }}>{f.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
