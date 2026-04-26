'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LandingNav } from '@/components/landing/LandingNav';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import type { CartItem } from '@/lib/data';

const COLLAR_PRICE = 28;
const SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 4.99;

function inputStyle(focused: boolean): React.CSSProperties {
  return {
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: 10,
    border: focused ? '1.5px solid var(--color-bark)' : '1.5px solid #E8E3DC',
    padding: '10px 14px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    color: 'var(--color-bark)',
    background: '#fff',
    outline: 'none',
    transition: 'border-color 0.18s',
  };
}

function cardStyle(): React.CSSProperties {
  return {
    background: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    boxShadow: '0 1px 4px rgba(61,53,48,0.06)',
  };
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--color-bark)',
      letterSpacing: '0',
      marginBottom: 16,
    }}>
      {children}
    </div>
  );
}

function InputField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled,
  autoComplete,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  disabled?: boolean;
  autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12,
        fontWeight: 600,
        color: '#9B948F',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        disabled={disabled}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputStyle(focused),
          ...(disabled ? { background: '#F5F2EE', color: '#9B948F', cursor: 'not-allowed' } : {}),
        }}
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12,
        fontWeight: 600,
        color: '#9B948F',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}>
        {label}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputStyle(focused),
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239B948F' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 14px center',
          paddingRight: 36,
          cursor: 'pointer',
        }}
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function CharmBubbles({ charms }: { charms: (string | null)[] }) {
  const filled = charms.filter(Boolean);
  if (!filled.length) return null;
  return (
    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
      {filled.map((c, i) => (
        <span key={i} style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 16,
          background: '#F5F2EE',
          borderRadius: 8,
          padding: '2px 6px',
          lineHeight: 1,
        }}>{c}</span>
      ))}
    </div>
  );
}

export default function CheckoutPage() {
  const width = useWindowWidth() ?? 1200;
  const isMobile = width < 768;
  const router = useRouter();

  // Form state
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postal, setPostal] = useState('');
  const [country, setCountry] = useState('LT');

  // Cart
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('pawlette_cart');
      if (raw) setCartItems(JSON.parse(raw));
    } catch {
      // ignore parse errors
    }
  }, []);

  const subtotal = cartItems.length > 0
    ? cartItems.reduce((sum, item) => sum + COLLAR_PRICE + (item.extra ? 5 : 0), 0)
    : 0;
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : subtotal === 0 ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  function handlePlaceOrder() {
    localStorage.removeItem('pawlette_cart');
    router.push('/');
  }

  const COUNTRIES = [
    { value: 'LT', label: 'Lithuania' },
    { value: 'LV', label: 'Latvia' },
    { value: 'EE', label: 'Estonia' },
    { value: 'PL', label: 'Poland' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'NL', label: 'Netherlands' },
    { value: 'SE', label: 'Sweden' },
    { value: 'FI', label: 'Finland' },
    { value: 'DK', label: 'Denmark' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'US', label: 'United States' },
  ];

  // ── Form column
  const formColumn = (
    <div style={{ flex: isMobile ? undefined : '3 1 0', minWidth: 0 }}>
      {/* Contact */}
      <div style={cardStyle()}>
        <SectionTitle>Contact</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <InputField
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={setEmail}
            autoComplete="email"
          />
          <InputField
            label="Phone number"
            type="tel"
            placeholder="+370 600 00000"
            value={phone}
            onChange={setPhone}
            autoComplete="tel"
          />
        </div>
      </div>

      {/* Shipping address */}
      <div style={cardStyle()}>
        <SectionTitle>Shipping address</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <InputField
              label="First name"
              placeholder="Mia"
              value={firstName}
              onChange={setFirstName}
              autoComplete="given-name"
            />
            <InputField
              label="Last name"
              placeholder="Kowalski"
              value={lastName}
              onChange={setLastName}
              autoComplete="family-name"
            />
          </div>
          <InputField
            label="Address"
            placeholder="Gedimino pr. 1"
            value={address}
            onChange={setAddress}
            autoComplete="street-address"
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <InputField
              label="City"
              placeholder="Vilnius"
              value={city}
              onChange={setCity}
              autoComplete="address-level2"
            />
            <InputField
              label="Postal code"
              placeholder="01103"
              value={postal}
              onChange={setPostal}
              autoComplete="postal-code"
            />
          </div>
          <SelectField
            label="Country"
            value={country}
            onChange={setCountry}
            options={COUNTRIES}
          />
        </div>
      </div>

      {/* Payment */}
      <div style={cardStyle()}>
        <SectionTitle>Payment</SectionTitle>

        {/* Stripe badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          marginBottom: 16,
          color: '#9B948F',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
        }}>
          <LockIcon />
          <span>Secure payment via Stripe</span>
        </div>

        {/* Fake card UI */}
        <div style={{
          background: 'linear-gradient(135deg, var(--color-bark) 0%, #5C4E47 100%)',
          borderRadius: 14,
          padding: '22px 22px 18px',
          marginBottom: 18,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* decorative circles */}
          <div style={{
            position: 'absolute', top: -30, right: -30,
            width: 100, height: 100, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          }} />
          <div style={{
            position: 'absolute', bottom: -20, right: 40,
            width: 70, height: 70, borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
          }} />

          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 18,
          }}>
            Pawlette
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: 18,
          }}>
            •••• •••• •••• ••••
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', fontFamily: "'DM Sans', sans-serif" }}>CARD HOLDER</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontFamily: "'DM Sans', sans-serif" }}>Your Name</div>
            </div>
            <div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', fontFamily: "'DM Sans', sans-serif" }}>EXPIRES</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontFamily: "'DM Sans', sans-serif" }}>MM / YY</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <InputField
            label="Card number"
            placeholder="1234 5678 9012 3456"
            disabled
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <InputField
              label="Expiry date"
              placeholder="MM / YY"
              disabled
            />
            <InputField
              label="CVC"
              placeholder="•••"
              disabled
            />
          </div>
        </div>

        <div style={{
          marginTop: 14,
          padding: '10px 14px',
          background: '#F5F2EE',
          borderRadius: 10,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          color: '#9B948F',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          <LockIcon />
          Payment fields are powered by Stripe — your card details are never stored by Pawlette.
        </div>
      </div>

      {/* Submit on mobile — rendered inside form column so it sits naturally */}
      {isMobile && (
        <button
          onClick={handlePlaceOrder}
          style={{
            width: '100%',
            background: 'var(--color-sage)',
            color: 'var(--color-bark)',
            border: 'none',
            borderRadius: 14,
            padding: '16px 24px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: '0',
            cursor: 'pointer',
            marginBottom: 40,
            boxShadow: '0 4px 16px rgba(168,213,162,0.4)',
          }}
        >
          Place order — €{total.toFixed(2)}
        </button>
      )}
    </div>
  );

  // ── Summary column
  const summaryColumn = (
    <div style={{ flex: isMobile ? undefined : '2 1 0', width: isMobile ? '100%' : undefined, minWidth: 0 }}>
      <div style={{
        ...cardStyle(),
        position: isMobile ? 'static' : 'sticky',
        top: 100,
        marginBottom: isMobile ? 20 : 0,
      }}>
        <SectionTitle>Order summary</SectionTitle>

        {/* Items */}
        {cartItems.length === 0 ? (
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: '#9B948F',
            padding: '12px 0',
            textAlign: 'center',
          }}>
            Your cart is empty
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
            {cartItems.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
              }}>
                {/* Collar colour swatch */}
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: item.collar.bgTint,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1.5px solid #E8E3DC',
                }}>
                  <div style={{
                    width: 24,
                    height: 8,
                    borderRadius: 4,
                    background: item.collar.color,
                  }} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--color-bark)',
                  }}>
                    {item.collar.name} collar
                    {item.size ? ` — ${item.size}` : ''}
                  </div>
                  {item.engraving && (
                    <div style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: 13,
                      color: '#9B948F',
                      marginTop: 2,
                    }}>
                      "{item.engraving}"
                    </div>
                  )}
                  <CharmBubbles charms={item.charms} />
                </div>

                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--color-bark)',
                  whiteSpace: 'nowrap',
                }}>
                  €{(COLLAR_PRICE + (item.extra ? 5 : 0)).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Divider */}
        <div style={{ height: 1, background: '#E8E3DC', marginBottom: 16 }} />

        {/* Totals */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#9B948F' }}>
              Subtotal
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--color-bark)' }}>
              €{subtotal.toFixed(2)}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#9B948F' }}>
              Shipping
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: shipping === 0 && subtotal > 0 ? '#5A9E54' : 'var(--color-bark)' }}>
              {subtotal === 0 ? '—' : shipping === 0 ? 'Free' : `€${shipping.toFixed(2)}`}
            </span>
          </div>
          {subtotal > 0 && shipping > 0 && (
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: '#9B948F',
              background: '#F5F2EE',
              borderRadius: 8,
              padding: '7px 10px',
            }}>
              Add €{(SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for free shipping
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#E8E3DC', margin: '16px 0' }} />

        {/* Total */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            fontWeight: 700,
            color: 'var(--color-bark)',
          }}>
            Total
          </span>
          <span style={{
            fontFamily: "'Luckiest Guy', cursive",
            fontSize: 20,
            color: 'var(--color-bark)',
            letterSpacing: '0.02em',
          }}>
            €{total.toFixed(2)}
          </span>
        </div>

        {/* Submit button — only on desktop */}
        {!isMobile && (
          <button
            onClick={handlePlaceOrder}
            style={{
              width: '100%',
              background: 'var(--color-sage)',
              color: 'var(--color-bark)',
              border: 'none',
              borderRadius: 14,
              padding: '16px 24px',
              fontFamily: "'Luckiest Guy', cursive",
              fontSize: 18,
              letterSpacing: '0.04em',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(168,213,162,0.4)',
              transition: 'transform 0.12s, box-shadow 0.12s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(168,213,162,0.5)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(168,213,162,0.4)';
            }}
          >
            Place order — €{total.toFixed(2)}
          </button>
        )}

        {/* Trust note */}
        <div style={{
          marginTop: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          color: '#9B948F',
        }}>
          <LockIcon />
          SSL encrypted — safe & secure checkout
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      background: 'var(--color-cream)',
      minHeight: '100vh',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <LandingNav topOffset={0} cartCount={cartItems.length} onCart={() => {}} />

      <div style={{ paddingTop: 80 }}>
        {/* Page header */}
        <div style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: isMobile ? '28px 16px 0' : '40px 24px 0',
        }}>
          <h1 style={{
            fontFamily: "'Luckiest Guy', cursive",
            fontSize: isMobile ? 28 : 36,
            color: 'var(--color-bark)',
            letterSpacing: '0.04em',
            margin: '0 0 6px',
          }}>
            Checkout
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            color: 'rgba(61,53,48,0.55)',
            margin: '0 0 28px',
          }}>
            Almost there — fill in your details to complete your order.
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: isMobile ? '0 16px 40px' : '0 24px 60px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 0 : 28,
          alignItems: 'flex-start',
        }}>
          {/* On mobile: summary first, then form */}
          {isMobile ? (
            <>
              {summaryColumn}
              {formColumn}
            </>
          ) : (
            <>
              {formColumn}
              {summaryColumn}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
