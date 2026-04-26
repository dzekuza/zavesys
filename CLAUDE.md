# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # start dev server (usually port 3000 or 3001 if 3000 is taken)
npm run build     # production build + TypeScript check — run this before pushing
npm run lint      # ESLint
```

There are no tests. TypeScript type-checking runs as part of `next build`.

## Stack

- **Next.js 16.2.4** with App Router and Turbopack. See AGENTS.md — this version may differ from training data. Check `node_modules/next/dist/docs/` for current API.
- **React 19** — `use client` is required on all interactive components; the project uses no RSC data fetching.
- **Tailwind CSS v4** — configured via `@theme` blocks in `globals.css`, not `tailwind.config.*`. Use `cn()` from `src/lib/utils.ts` for conditional classes.
- **Styling convention**: inline `style` objects are the dominant pattern throughout the codebase. Tailwind utility classes appear mostly in `src/components/ui/`. Don't mix the two styles in the same component.
- **Animations**: GSAP (ScrollTrigger scroll animations in `LandingPage`) + framer-motion (`src/components/ui/hero-floating.tsx`, `hero-3.tsx`). GSAP is imported dynamically inside `useEffect` to keep it out of the initial bundle — maintain that pattern.

## Architecture

Two independent user flows, each with its own orchestrator:

**Landing page** (`/`) → `src/app/page.tsx` → `LandingPage.tsx`
Assembles `src/components/landing/` subcomponents. GSAP scroll animations are wired here via `data-animate="section"` and `data-animate="card"` attributes on wrapper divs. `StickyCTA` and `ExitModal` are toggled by scroll/mouseleave state owned by `LandingPage`.

**Configurator** (`/configure`) → `src/app/configure/page.tsx` → `ProductConfigurator.tsx`
Owns all cart/selection state and passes it down to `CollarStage` (visual preview), `ConfigPanel` (4-step selection UI), `MiniCart`, and `UpsellModal`. State shape: `selectedCollar`, `selectedCharms: (string|null)[]`, `size`, `engraving`, `cartItems: CartItem[]`.

**Products page** (`/products`) → `src/app/products/page.tsx`
Self-contained page component with local `SimpleNav` and `CollarCard`/`CharmCard` helpers defined at module level in the same file.

## Data layer

All product data lives in `src/lib/data.ts` — no API calls, no database. Key exports:
- `COLLARS` — 4 collar definitions (id, name, hex color, bgTint, glowColor)
- `ALL_CHARMS` — 12 charms with emoji and bg color
- `SIZES` — XS/S/M/L with neck range strings
- `CHARM_POSITIONS` / `FLOAT_DURATIONS` — used by `CollarStage` for animated charm placement
- `PRODUCTS` / `LANDING_REVIEWS` / `TICKER_ITEMS` — landing page static content
- `CartItem` interface — the shape passed into `MiniCart` and `UpsellModal`

## Design tokens

Brand colors are CSS custom properties defined in `src/app/globals.css`:
- `--color-sage: #A8D5A2` (green accent, CTAs)
- `--color-bark: #3D3530` (primary text/dark bg)
- `--color-cream: #FAF7F2` (page background)
- `--color-blossom / --color-sky / --color-honey` — collar palette tints

The `isDark` boolean prop on many components (e.g. `BentoSection`, `CollarStage`, `UrgencyBar`) switches between cream and dark-bark themes using inline style ternaries.

## Responsive pattern

`src/hooks/useWindowWidth.ts` returns `number | undefined` (undefined on SSR). All callers must use `useWindowWidth() ?? 1200` to default to desktop layout on first render — this is intentional to avoid hydration mismatches. Do not change the fallback value without updating all callers.

## Fonts

`DM Sans` (body/UI), `Caveat` (handwritten accent), `Mouse Memoirs` (loaded from `/public`). Always specify `fontFamily: "'DM Sans',sans-serif"` inline on top-level wrappers; there is no global body font set in CSS.
