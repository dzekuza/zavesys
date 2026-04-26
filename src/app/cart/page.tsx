'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { LandingNav } from '@/components/landing/LandingNav';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { PrimaryButton } from '@/components/shared/PrimaryButton';

interface CartItem {
  collar: { id: string; name: string; color: string };
  charms: (string | null)[];
  size: string;
  engraving: string;
  extra?: boolean;
}

const COLLAR_PRICE = 28;
const EXTRA_CHARM_PRICE = 6;
const SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 4.9;

function collarCharmCount(item: CartItem): number {
  return item.charms.filter(Boolean).length;
}

function itemPrice(item: CartItem): number {
  return COLLAR_PRICE + (item.extra ? EXTRA_CHARM_PRICE : 0);
}

export default function CartPage() {
  const router = useRouter();
  const width = useWindowWidth() ?? 1200;
  const isMobile = width < 768;

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem('pawlette_cart');
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setCartItems(parsed);
      }
    } catch {
      // ignore malformed localStorage data
    }
  }, []);

  function removeItem(index: number) {
    setCartItems(prev => {
      const next = prev.filter((_, i) => i !== index);
      try {
        localStorage.setItem('pawlette_cart', JSON.stringify(next));
      } catch { /* noop */ }
      return next;
    });
  }

  const subtotal = cartItems.reduce((sum, item) => sum + itemPrice(item), 0);
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const amountToFreeShipping = Math.max(0, SHIPPING_THRESHOLD - subtotal);

  // Don't render cart contents until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div style={{ background: 'var(--color-cream)', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
        <LandingNav topOffset={0} cartCount={0} onCart={() => router.push('/cart')} />
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--color-cream)', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <LandingNav topOffset={0} cartCount={cartItems.length} onCart={() => router.push('/cart')} />

      <main style={{ paddingTop: 100, paddingBottom: 80 }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: isMobile ? '0 20px' : '0 40px',
        }}>
          {/* Page heading */}
          <h1 style={{
            fontFamily: "'Luckiest Guy', cursive",
            fontSize: isMobile ? 32 : 48,
            color: 'var(--color-bark)',
            margin: '0 0 8px',
            letterSpacing: '0.02em',
          }}>
            Your Cart
          </h1>

          {cartItems.length > 0 && (
            <p style={{ color: 'var(--color-bark)', opacity: 0.6, fontSize: 15, margin: '0 0 40px' }}>
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </p>
          )}

          {cartItems.length === 0 ? (
            /* ── Empty state ── */
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 60,
              paddingBottom: 80,
              gap: 24,
              textAlign: 'center',
            }}>
              <span style={{ fontSize: 96, lineHeight: 1 }}>🐾</span>
              <h2 style={{
                fontFamily: "'Luckiest Guy', cursive",
                fontSize: isMobile ? 26 : 36,
                color: 'var(--color-bark)',
                margin: 0,
                letterSpacing: '0.02em',
              }}>
                Your cart is empty
              </h2>
              <p style={{
                color: 'var(--color-bark)',
                opacity: 0.6,
                fontSize: 16,
                maxWidth: 360,
                lineHeight: 1.6,
                margin: 0,
              }}>
                Build a collar your dog will actually be excited to wear.
              </p>
              <PrimaryButton href="/configure" variant="sage" size="lg">
                Design Your Collar
              </PrimaryButton>
            </div>
          ) : (
            /* ── Two-column layout ── */
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 32 : 40,
              alignItems: 'flex-start',
            }}>
              {/* Left: Items list */}
              <div style={{ flex: isMobile ? 'none' : '2', width: isMobile ? '100%' : 'auto' }}>
                {/* Free shipping progress bar */}
                {amountToFreeShipping > 0 && (
                  <div style={{
                    background: 'white',
                    border: '1.5px solid rgba(61,53,48,0.1)',
                    borderRadius: 16,
                    padding: '16px 20px',
                    marginBottom: 24,
                  }}>
                    <p style={{
                      fontSize: 14,
                      color: 'var(--color-bark)',
                      margin: '0 0 10px',
                      fontWeight: 500,
                    }}>
                      Add <strong>€{amountToFreeShipping.toFixed(2)}</strong> more for free shipping 🚚
                    </p>
                    <div style={{
                      height: 8,
                      background: 'rgba(61,53,48,0.1)',
                      borderRadius: 100,
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${Math.min(100, (subtotal / SHIPPING_THRESHOLD) * 100)}%`,
                        background: 'var(--color-sage)',
                        borderRadius: 100,
                        transition: 'width 0.4s ease',
                      }} />
                    </div>
                  </div>
                )}

                {amountToFreeShipping === 0 && (
                  <div style={{
                    background: 'rgba(168,213,162,0.18)',
                    border: '1.5px solid var(--color-sage)',
                    borderRadius: 16,
                    padding: '12px 20px',
                    marginBottom: 24,
                    fontSize: 14,
                    color: 'var(--color-bark)',
                    fontWeight: 600,
                  }}>
                    You qualify for free shipping! 🎉
                  </div>
                )}

                {/* Cart items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {cartItems.map((item, index) => {
                    const charmCount = collarCharmCount(item);
                    const price = itemPrice(item);
                    return (
                      <div key={index} style={{
                        background: 'white',
                        border: '1.5px solid rgba(61,53,48,0.1)',
                        borderRadius: 20,
                        padding: isMobile ? '18px 16px' : '20px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 18,
                        position: 'relative',
                      }}>
                        {/* Colour swatch */}
                        <div style={{
                          width: 52,
                          height: 52,
                          borderRadius: '50%',
                          background: item.collar.color,
                          flexShrink: 0,
                          boxShadow: `0 2px 12px ${item.collar.color}88`,
                          border: '2px solid rgba(255,255,255,0.8)',
                        }} />

                        {/* Item details */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{
                            fontFamily: "'Luckiest Guy', cursive",
                            fontSize: 17,
                            color: 'var(--color-bark)',
                            margin: '0 0 6px',
                            letterSpacing: '0.02em',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}>
                            Collar Set — {item.collar.name}
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
                            {/* Size badge */}
                            <span style={{
                              display: 'inline-block',
                              background: 'rgba(61,53,48,0.08)',
                              color: 'var(--color-bark)',
                              fontSize: 12,
                              fontWeight: 600,
                              padding: '3px 10px',
                              borderRadius: 100,
                            }}>
                              {item.size}
                            </span>
                            {/* Charm count badge */}
                            {charmCount > 0 && (
                              <span style={{
                                display: 'inline-block',
                                background: 'rgba(168,213,162,0.25)',
                                color: 'var(--color-bark)',
                                fontSize: 12,
                                fontWeight: 600,
                                padding: '3px 10px',
                                borderRadius: 100,
                              }}>
                                {charmCount} {charmCount === 1 ? 'charm' : 'charms'}
                              </span>
                            )}
                            {/* Engraving badge */}
                            {item.engraving && (
                              <span style={{
                                display: 'inline-block',
                                background: 'rgba(249,228,160,0.4)',
                                color: 'var(--color-bark)',
                                fontSize: 12,
                                fontWeight: 600,
                                padding: '3px 10px',
                                borderRadius: 100,
                              }}>
                                "{item.engraving}"
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Price + remove */}
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          gap: 8,
                          flexShrink: 0,
                        }}>
                          <span style={{
                            fontFamily: "'Luckiest Guy', cursive",
                            fontSize: 20,
                            color: 'var(--color-bark)',
                            letterSpacing: '0.01em',
                          }}>
                            €{price.toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(index)}
                            aria-label="Remove item"
                            style={{
                              background: 'rgba(61,53,48,0.07)',
                              border: 'none',
                              borderRadius: '50%',
                              width: 28,
                              height: 28,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 14,
                              color: 'var(--color-bark)',
                              fontWeight: 700,
                              flexShrink: 0,
                              transition: 'background 0.15s',
                            }}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Continue shopping */}
                <div style={{ marginTop: 24 }}>
                  <Link href="/configure" style={{
                    color: 'var(--color-bark)',
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: 'none',
                    opacity: 0.75,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}>
                    ← Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Right: Order summary */}
              <div style={{
                flex: isMobile ? 'none' : '1',
                width: isMobile ? '100%' : 'auto',
                position: isMobile ? 'static' : 'sticky',
                top: 120,
              }}>
                <div style={{
                  background: 'white',
                  border: '1.5px solid rgba(61,53,48,0.1)',
                  borderRadius: 24,
                  padding: '28px 28px 32px',
                }}>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 16,
                    fontWeight: 600,
                    color: 'var(--color-bark)',
                    margin: '0 0 24px',
                    letterSpacing: '0',
                  }}>
                    Order Summary
                  </p>

                  {/* Line items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 15, color: 'var(--color-bark)', opacity: 0.7 }}>
                        Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                      </span>
                      <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-bark)' }}>
                        €{subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 15, color: 'var(--color-bark)', opacity: 0.7 }}>
                        Shipping
                      </span>
                      {shipping === 0 ? (
                        <span style={{ fontSize: 15, fontWeight: 600, color: '#4CAF50' }}>
                          Free
                        </span>
                      ) : (
                        <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-bark)' }}>
                          €{shipping.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Divider */}
                    <div style={{
                      height: 1,
                      background: 'rgba(61,53,48,0.1)',
                      margin: '6px 0',
                    }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                        fontSize: 22,
                        color: 'var(--color-bark)',
                        letterSpacing: '0.01em',
                      }}>
                        €{total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Free shipping progress inside summary on mobile if not shown above */}
                  {isMobile && amountToFreeShipping > 0 && (
                    <div style={{ marginTop: 20 }}>
                      <p style={{ fontSize: 13, color: 'var(--color-bark)', opacity: 0.65, margin: '0 0 8px' }}>
                        €{amountToFreeShipping.toFixed(2)} away from free shipping
                      </p>
                      <div style={{
                        height: 6,
                        background: 'rgba(61,53,48,0.1)',
                        borderRadius: 100,
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${Math.min(100, (subtotal / SHIPPING_THRESHOLD) * 100)}%`,
                          background: 'var(--color-sage)',
                          borderRadius: 100,
                        }} />
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div style={{ marginTop: 28 }}>
                    <PrimaryButton href="/checkout" variant="sage" size="lg" fullWidth>
                      Proceed to Checkout
                    </PrimaryButton>
                  </div>

                  {/* Trust note */}
                  <p style={{
                    fontSize: 13,
                    color: 'var(--color-bark)',
                    opacity: 0.65,
                    textAlign: 'center',
                    margin: '14px 0 0',
                    lineHeight: 1.5,
                  }}>
                    Secure checkout · Ships from Vilnius 🇱🇹
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
