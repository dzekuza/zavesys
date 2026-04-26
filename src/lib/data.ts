export const COLLARS = [
  { id: 'blossom', name: 'Blossom', color: '#F4B5C0', bgTint: 'rgba(244,181,192,0.15)', glowColor: 'rgba(244,181,192,0.5)' },
  { id: 'sage',    name: 'Sage',    color: '#A8D5A2', bgTint: 'rgba(168,213,162,0.15)', glowColor: 'rgba(168,213,162,0.5)' },
  { id: 'sky',     name: 'Sky',     color: '#B8D8F4', bgTint: 'rgba(184,216,244,0.15)', glowColor: 'rgba(184,216,244,0.5)' },
  { id: 'honey',   name: 'Honey',   color: '#F9E4A0', bgTint: 'rgba(249,228,160,0.15)', glowColor: 'rgba(249,228,160,0.5)' },
] as const;

export type Collar = typeof COLLARS[number];

export const ALL_CHARMS = [
  { id: 'c1',  bg: '#F4B5C0', e: '🌸', name: 'Blossom' },
  { id: 'c2',  bg: '#A8D5A2', e: '🌿', name: 'Leaf' },
  { id: 'c3',  bg: '#B8D8F4', e: '⭐', name: 'Star' },
  { id: 'c4',  bg: '#F9E4A0', e: '☀️', name: 'Sun' },
  { id: 'c5',  bg: '#D4B8F4', e: '🦋', name: 'Butterfly' },
  { id: 'c6',  bg: '#F4B5C0', e: '🐾', name: 'Paw' },
  { id: 'c7',  bg: '#A8D5A2', e: '🌊', name: 'Wave' },
  { id: 'c8',  bg: '#D4B8F4', e: '💎', name: 'Gem' },
  { id: 'c9',  bg: '#F9E4A0', e: '🌙', name: 'Moon' },
  { id: 'c10', bg: '#B8D8F4', e: '🍀', name: 'Clover' },
  { id: 'c11', bg: '#F4B5C0', e: '🦴', name: 'Bone' },
  { id: 'c12', bg: '#D4B8F4', e: '🌺', name: 'Hibiscus' },
] as const;

export type Charm = typeof ALL_CHARMS[number];

export const SIZES = ['XS — 20–28 cm', 'S — 28–36 cm', 'M — 36–44 cm', 'L — 44–52 cm'] as const;

export const REVIEWS = [
  { name: 'Laima K.', dog: 'Luna, Beagle',   rating: 5, text: 'The collar survived two months of swimming and mud walks. Zero smell, zero stains.' },
  { name: 'Marta S.', dog: 'Bruno, Golden',  rating: 5, text: "Charms really do snap on in seconds. I was skeptical but it's genuinely that fast." },
  { name: 'Rūta P.',  dog: 'Mochi, Shiba',  rating: 5, text: 'Bought one, immediately ordered two more as gifts. Love that it\'s made in Lithuania.' },
] as const;

export interface CartItem {
  collar: Collar;
  charms: (string | null)[];
  size: string;
  engraving: string;
  extra?: boolean;
}

export const CHARM_POSITIONS = [
  { x: -140, y: -50 },
  { x: -70,  y: -100 },
  { x: 0,    y: -110 },
  { x: 70,   y: -100 },
  { x: 140,  y: -50 },
] as const;

export const FLOAT_DURATIONS = [3.8, 4.2, 3.5, 4.8, 3.2] as const;

// ── LANDING PAGE DATA ─────────────────────────────────────────────

export const PRODUCTS = [
  { id: 1, name: 'Blossom set', price: '€28', collarColor: '#F4B5C0', bg: '#FAF0F5',
    badge: 'New arrival', badgeColor: '#3a7a3a', badgeBg: '#eef7ee',
    desc: 'Blush collar, five interchangeable charms.',
    charms: [{ bg: '#A8D5A2', e: '🌿' }, { bg: '#B8D8F4', e: '⭐' }, { bg: '#F9E4A0', e: '☀️' }, { bg: '#D4B8F4', e: '🌸' }] },
  { id: 2, name: 'Sage set', price: '€28', collarColor: '#A8D5A2', bg: '#EEF5EE',
    badge: undefined, badgeColor: undefined, badgeBg: undefined,
    desc: 'Fresh and earthy. Botanical charms.',
    charms: [{ bg: '#F4B5C0', e: '🌸' }, { bg: '#D4B8F4', e: '🦋' }, { bg: '#F9E4A0', e: '🍃' }] },
  { id: 3, name: 'Sky set', price: '€28', collarColor: '#B8D8F4', bg: '#EEF2F9',
    badge: 'Waterproof', badgeColor: '#2a5080', badgeBg: '#ddeeff',
    desc: 'For the adventurous pup. Fully waterproof.',
    charms: [{ bg: '#D4B8F4', e: '💎' }, { bg: '#A8D5A2', e: '🌊' }, { bg: '#F4B5C0', e: '🐾' }] },
  { id: 4, name: 'Honey set', price: '€28', collarColor: '#F9E4A0', bg: '#FDF6E3',
    badge: 'Summer drop', badgeColor: '#8a6010', badgeBg: '#fdf0d0',
    desc: 'Warm and sunny. Seasonal summer charms.',
    charms: [{ bg: '#F4B5C0', e: '🌻' }, { bg: '#A8D5A2', e: '🍀' }, { bg: '#D4B8F4', e: '⭐' }] },
] as const;

export type Product = typeof PRODUCTS[number];

export const LANDING_REVIEWS = [
  { name: 'Laima K.', dog: 'Luna (Beagle)', rating: 5, text: "Ordered the Sage set and my dog gets compliments every walk. The charms really do snap on in seconds — I was skeptical but it's genuinely that fast." },
  { name: 'Marta S.', dog: 'Bruno (Golden)', rating: 5, text: 'The collar survived two months of swimming, mud walks, and a particularly rough beach day. Zero smell, zero stains. Absolutely worth it.' },
  { name: 'Rūta P.', dog: 'Mochi (Shiba)', rating: 5, text: "Bought one, immediately ordered two more as gifts. The Blossom collar in particular is just gorgeous. Love that it's made in Lithuania." },
] as const;

export const TICKER_ITEMS = [
  '🐾 Laima from Vilnius just ordered the Blossom set',
  '⭐ Marta rated the Sage collar 5 stars',
  '💧 Bruno survived a lake swim — collar looks brand new',
  '🛍 Rūta ordered 3 sets as gifts',
  '🌸 Mochi is wearing the new Hibiscus charm',
  '🇱🇹 Just restocked — Honey set is back',
  '⚡ "Took literally 5 seconds to swap" — Jurgita K.',
  '🐕 Luna got 4 compliments on one walk',
] as const;
