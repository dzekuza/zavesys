'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LandingNav } from '@/components/landing/LandingNav';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { useWindowWidth } from '@/hooks/useWindowWidth';

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = 'orders' | 'profile' | 'addresses' | 'wishlist';

// ─── Shared input style ───────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: '100%',
  borderRadius: 10,
  border: '1.5px solid #E8E3DC',
  padding: '10px 14px',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 14,
  color: 'var(--color-bark)',
  background: '#fff',
  outline: 'none',
  boxSizing: 'border-box',
};

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_ORDERS = [
  {
    id: 'PW-001',
    name: 'Blossom Collar Set',
    status: 'Delivered',
    date: 'Mar 12, 2026',
    price: '€34.90',
    color: '#F9C8D0',
  },
  {
    id: 'PW-002',
    name: 'Sage Collar Set',
    status: 'Delivered',
    date: 'Apr 3, 2026',
    price: '€34.90',
    color: '#A8D5A2',
  },
];

const MOCK_ADDRESS = {
  name: 'Rysard G.',
  line1: 'Gedimino pr. 9',
  line2: 'Vilnius, LT-01103',
  country: 'Lithuania',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function OrderCard({ order }: { order: (typeof MOCK_ORDERS)[number] }) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1.5px solid #E8E3DC',
        borderRadius: 16,
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        marginBottom: 16,
      }}
    >
      {/* Color swatch */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: order.color,
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 15,
            color: 'var(--color-bark)',
            marginBottom: 4,
          }}
        >
          {order.name}
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: '#9B948F',
          }}
        >
          Order #{order.id} · {order.date}
        </div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div
          style={{
            display: 'inline-block',
            background: '#E8F5E6',
            color: '#3A7A35',
            borderRadius: 20,
            padding: '3px 12px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            marginBottom: 6,
          }}
        >
          {order.status}
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--color-bark)',
          }}
        >
          {order.price}
        </div>
      </div>
    </div>
  );
}

function TabOrders() {
  return (
    <div>
      <h2
        style={{
          fontFamily: "'Luckiest Guy', cursive",
          fontSize: 26,
          color: 'var(--color-bark)',
          marginBottom: 24,
          letterSpacing: '0.02em',
        }}
      >
        Your Orders
      </h2>
      {MOCK_ORDERS.map((o) => (
        <OrderCard key={o.id} order={o} />
      ))}
    </div>
  );
}

function TabProfile() {
  const [name, setName] = useState('Rysard G.');
  const [email, setEmail] = useState('hello@pawlette.com');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2
        style={{
          fontFamily: "'Luckiest Guy', cursive",
          fontSize: 26,
          color: 'var(--color-bark)',
          marginBottom: 24,
          letterSpacing: '0.02em',
        }}
      >
        Profile
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 440 }}>
        <div>
          <label
            style={{
              display: 'block',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: '#9B948F',
              marginBottom: 6,
            }}
          >
            Full name
          </label>
          <input
            style={inputStyle}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label
            style={{
              display: 'block',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: '#9B948F',
              marginBottom: 6,
            }}
          >
            Email address
          </label>
          <input
            style={inputStyle}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          onClick={handleSave}
          style={{
            marginTop: 8,
            padding: '12px 28px',
            background: saved ? '#7bbf74' : 'var(--color-sage)',
            color: 'var(--color-bark)',
            border: 'none',
            borderRadius: 12,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
            transition: 'background 0.2s',
            alignSelf: 'flex-start',
          }}
        >
          {saved ? 'Saved!' : 'Save changes'}
        </button>
      </div>
    </div>
  );
}

function TabAddresses() {
  return (
    <div>
      <h2
        style={{
          fontFamily: "'Luckiest Guy', cursive",
          fontSize: 26,
          color: 'var(--color-bark)',
          marginBottom: 24,
          letterSpacing: '0.02em',
        }}
      >
        Addresses
      </h2>
      {/* Saved address card */}
      <div
        style={{
          background: '#fff',
          border: '1.5px solid #E8E3DC',
          borderRadius: 16,
          padding: '20px 24px',
          marginBottom: 16,
          maxWidth: 380,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: '#E8F5E6',
            color: '#3A7A35',
            borderRadius: 20,
            padding: '2px 10px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          Default
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: 'var(--color-bark)',
            marginBottom: 6,
          }}
        >
          {MOCK_ADDRESS.name}
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: '#9B948F',
            lineHeight: 1.6,
          }}
        >
          {MOCK_ADDRESS.line1}
          <br />
          {MOCK_ADDRESS.line2}
          <br />
          {MOCK_ADDRESS.country}
        </div>
      </div>
      {/* Add address button */}
      <button
        style={{
          padding: '11px 24px',
          background: 'transparent',
          border: '1.5px solid var(--color-bark)',
          borderRadius: 12,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: 14,
          color: 'var(--color-bark)',
          cursor: 'pointer',
        }}
      >
        + Add address
      </button>
    </div>
  );
}

function TabWishlist() {
  return (
    <div>
      <h2
        style={{
          fontFamily: "'Luckiest Guy', cursive",
          fontSize: 26,
          color: 'var(--color-bark)',
          marginBottom: 24,
          letterSpacing: '0.02em',
        }}
      >
        Wishlist
      </h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 24px',
          background: '#fff',
          border: '1.5px solid #E8E3DC',
          borderRadius: 16,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>🐾</div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            fontWeight: 600,
            color: 'var(--color-bark)',
            marginBottom: 8,
          }}
        >
          Nothing saved yet
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: '#9B948F',
            marginBottom: 24,
          }}
        >
          Browse our collars and charm sets and save your favourites.
        </div>
        <Link
          href="/products"
          style={{
            display: 'inline-block',
            padding: '12px 28px',
            background: 'var(--color-sage)',
            color: 'var(--color-bark)',
            borderRadius: 12,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            textDecoration: 'none',
          }}
        >
          Shop products
        </Link>
      </div>
    </div>
  );
}

// ─── Logged-in dashboard ──────────────────────────────────────────────────────

const NAV_ITEMS: { id: Tab; label: string; icon: string }[] = [
  { id: 'orders', label: 'Orders', icon: '📦' },
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'addresses', label: 'Addresses', icon: '📍' },
  { id: 'wishlist', label: 'Wishlist', icon: '♡' },
];

function Dashboard({
  width,
  onLogout,
}: {
  width: number;
  onLogout: () => void;
}) {
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const isMobile = width < 768;

  const sidebar = (
    <div
      style={{
        width: isMobile ? '100%' : 240,
        flexShrink: 0,
      }}
    >
      {/* Avatar + name */}
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'row' : 'column',
          alignItems: isMobile ? 'center' : 'center',
          gap: isMobile ? 16 : 12,
          padding: isMobile ? '0 0 20px' : '0 0 32px',
          marginBottom: isMobile ? 0 : 8,
        }}
      >
        <div
          style={{
            width: isMobile ? 52 : 72,
            height: isMobile ? 52 : 72,
            borderRadius: '50%',
            background: 'var(--color-sage)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Luckiest Guy', cursive",
            fontSize: isMobile ? 18 : 26,
            color: 'var(--color-bark)',
            flexShrink: 0,
          }}
        >
          RG
        </div>
        {!isMobile && (
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: 'var(--color-bark)',
              }}
            >
              Rysard G.
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: '#9B948F',
                marginTop: 2,
              }}
            >
              Pawlette Member
            </div>
          </div>
        )}
        {isMobile && (
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: 'var(--color-bark)',
              }}
            >
              Rysard G.
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: '#9B948F',
              }}
            >
              Pawlette Member
            </div>
          </div>
        )}
      </div>

      {/* Nav items */}
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'row' : 'column',
          gap: isMobile ? 4 : 4,
          overflowX: isMobile ? 'auto' : 'visible',
          paddingBottom: isMobile ? 4 : 0,
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: isMobile ? '9px 14px' : '11px 16px',
                borderRadius: 12,
                border: 'none',
                background: isActive ? 'var(--color-sage)' : 'transparent',
                color: isActive ? 'var(--color-bark)' : '#9B948F',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: isActive ? 700 : 500,
                fontSize: 14,
                cursor: 'pointer',
                textAlign: 'left',
                whiteSpace: 'nowrap',
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              <span style={{ fontSize: 15 }}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Sign out — desktop only inline, mobile after content */}
      {!isMobile && (
        <button
          onClick={onLogout}
          style={{
            marginTop: 32,
            padding: '10px 16px',
            borderRadius: 12,
            border: '1.5px solid #E8E3DC',
            background: 'transparent',
            color: '#9B948F',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left',
          }}
        >
          Sign out
        </button>
      )}
    </div>
  );

  const content = (
    <div style={{ flex: 1, minWidth: 0 }}>
      {activeTab === 'orders' && <TabOrders />}
      {activeTab === 'profile' && <TabProfile />}
      {activeTab === 'addresses' && <TabAddresses />}
      {activeTab === 'wishlist' && <TabWishlist />}

      {isMobile && (
        <button
          onClick={onLogout}
          style={{
            marginTop: 32,
            padding: '12px 20px',
            borderRadius: 12,
            border: '1.5px solid #E8E3DC',
            background: 'transparent',
            color: '#9B948F',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Sign out
        </button>
      )}
    </div>
  );

  return (
    <div
      style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: isMobile ? '0 16px 60px' : '0 24px 80px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 24 : 48,
        alignItems: 'flex-start',
      }}
    >
      {sidebar}
      {/* Vertical divider on desktop */}
      {!isMobile && (
        <div
          style={{
            width: 1,
            alignSelf: 'stretch',
            background: '#E8E3DC',
            flexShrink: 0,
          }}
        />
      )}
      {content}
    </div>
  );
}

// ─── Login card ───────────────────────────────────────────────────────────────

function LoginCard({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (email.trim() && password.trim()) {
      onLogin();
    }
  };

  return (
    <div
      style={{
        maxWidth: 440,
        width: '100%',
        margin: '0 auto',
        padding: '0 16px 80px',
      }}
    >
      <div
        style={{
          background: '#fff',
          border: '1.5px solid #E8E3DC',
          borderRadius: 24,
          padding: '40px 36px',
        }}
      >
        {/* Heading */}
        <h1
          style={{
            fontFamily: "'Luckiest Guy', cursive",
            fontSize: 32,
            color: 'var(--color-bark)',
            marginBottom: 8,
            letterSpacing: '0.02em',
            textAlign: 'center',
          }}
        >
          Welcome back
        </h1>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            color: '#9B948F',
            textAlign: 'center',
            marginBottom: 32,
          }}
        >
          Sign in to manage your orders and profile.
        </p>

        {/* Email */}
        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              display: 'block',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: '#9B948F',
              marginBottom: 6,
            }}
          >
            Email address
          </label>
          <input
            style={inputStyle}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: 28 }}>
          <label
            style={{
              display: 'block',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: '#9B948F',
              marginBottom: 6,
            }}
          >
            Password
          </label>
          <input
            style={inputStyle}
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
          />
        </div>

        {/* Sign in button */}
        <button
          onClick={handleSignIn}
          style={{
            width: '100%',
            padding: '13px 0',
            background: 'var(--color-sage)',
            color: 'var(--color-bark)',
            border: 'none',
            borderRadius: 12,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
            marginBottom: 20,
          }}
        >
          Sign in
        </button>

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 20,
          }}
        >
          <div style={{ flex: 1, height: 1, background: '#E8E3DC' }} />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: '#9B948F',
            }}
          >
            or
          </span>
          <div style={{ flex: 1, height: 1, background: '#E8E3DC' }} />
        </div>

        {/* Create account button */}
        <button
          style={{
            width: '100%',
            padding: '13px 0',
            background: 'transparent',
            color: 'var(--color-bark)',
            border: '1.5px solid var(--color-bark)',
            borderRadius: 12,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
          }}
        >
          Create account
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AccountPage() {
  const router = useRouter();
  const width = useWindowWidth() ?? 1200;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div
      style={{
        background: 'var(--color-cream)',
        minHeight: '100vh',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <LandingNav topOffset={0} cartCount={0} onCart={() => router.push('/cart')} />

      <div style={{ paddingTop: 100 }}>
        {isLoggedIn ? (
          <Dashboard width={width} onLogout={() => setIsLoggedIn(false)} />
        ) : (
          <LoginCard onLogin={() => setIsLoggedIn(true)} />
        )}
      </div>

      <LandingFooter />
    </div>
  );
}
