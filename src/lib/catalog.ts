import { ALL_CHARMS, PRODUCTS } from '@/lib/data'

export interface ProductDetail {
  slug: string
  id: string
  productType: 'collar' | 'charm'
  name: string
  price: string
  shortDescription: string
  longDescription: string
  image: string
  badge?: string
  accentColor: string
  tintColor: string
  ctaHref: string
  ctaLabel: string
  compatibilityNote: string
}

export function slugFromProductName (name: string) {
  return `collar-${name.replace(' set', '').toLowerCase()}`
}

export function slugFromCharmId (id: string) {
  return `charm-${id}`
}

const collarProducts: ProductDetail[] = PRODUCTS.map((product) => {
  const cleanName = product.name.replace(' set', '')
  const slug = slugFromProductName(product.name)
  return {
    slug,
    id: `collar-${product.id}`,
    productType: 'collar',
    name: product.name,
    price: product.price,
    shortDescription: product.desc,
    longDescription: `${cleanName} is a waterproof silicone collar set with five snap-on charms. Designed for daily wear and easy cleaning after rain, beach days, or muddy walks.`,
    image: product.image,
    badge: product.badge,
    accentColor: product.collarColor,
    tintColor: product.bg,
    ctaHref: '/configure',
    ctaLabel: 'Build your set',
    compatibilityNote: 'Includes 5 charms. You can swap or add any individual charm at any time.'
  }
})

const charmProducts: ProductDetail[] = ALL_CHARMS.map((charm) => ({
  slug: slugFromCharmId(charm.id),
  id: `charm-${charm.id}`,
  productType: 'charm',
  name: `${charm.name} charm`,
  price: '€4',
  shortDescription: 'Snap-on charm for all PawCharms collars.',
  longDescription: `${charm.name} charm clicks on and off in around five seconds. Collect your favourites and rotate styles every day without tools.`,
  image: encodeURI(charm.image),
  accentColor: charm.bg,
  tintColor: `${charm.bg}33`,
  ctaHref: '/configure',
  ctaLabel: 'Add in configurator',
  compatibilityNote: 'Compatible with every PawCharms collar set.'
}))

export const PRODUCT_CATALOG: ProductDetail[] = [...collarProducts, ...charmProducts]

export function getProductBySlug (slug: string): ProductDetail | undefined {
  return PRODUCT_CATALOG.find((product) => product.slug === slug)
}
