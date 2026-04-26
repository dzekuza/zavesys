import { ALL_CHARMS, PRODUCTS } from '@/lib/data'

const CHARM_IMAGE_BY_ID: Record<string, string> = {
  c1: '/charms/005_A_smooth_matte_lavender_flower-shaped_object_is_VsK9Nys5 Background Removed.png',
  c2: '/charms/001_In_a_minimalist_style_a_single_matte_sage_green_er7Mx31d Background Removed.png',
  c3: '/charms/002_A_pale_yellow_star-shaped_object_floats_against_-1rXjWFC Background Removed.png',
  c4: '/charms/002_A_pale_yellow_star-shaped_object_floats_against_-1rXjWFC Background Removed.png',
  c5: '/charms/005_A_smooth_matte_lavender_flower-shaped_object_is_VsK9Nys5 Background Removed.png',
  c6: '/charms/004_A_light_blue_paw_print_shaped_object_is_centrally_0i_pOMaJ Background Removed.png',
  c7: '/charms/001_In_a_minimalist_style_a_single_matte_sage_green_er7Mx31d Background Removed.png',
  c8: '/charms/005_A_smooth_matte_lavender_flower-shaped_object_is_VsK9Nys5 Background Removed.png',
  c9: '/charms/003_A_soft_pink_heart-shaped_object_is_presented_with_TtBIxLMs Background Removed.png',
  c10: '/charms/001_In_a_minimalist_style_a_single_matte_sage_green_er7Mx31d Background Removed.png',
  c11: '/charms/003_A_soft_pink_heart-shaped_object_is_presented_with_TtBIxLMs Background Removed.png',
  c12: '/charms/005_A_smooth_matte_lavender_flower-shaped_object_is_VsK9Nys5 Background Removed.png'
}

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

const collarProducts: ProductDetail[] = PRODUCTS.map((product) => {
  const cleanName = product.name.replace(' set', '')
  const slug = `collar-${cleanName.toLowerCase()}`
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
  slug: `charm-${charm.id}`,
  id: `charm-${charm.id}`,
  productType: 'charm',
  name: `${charm.name} charm`,
  price: '€4',
  shortDescription: 'Snap-on charm for all PawCharms collars.',
  longDescription: `${charm.name} charm clicks on and off in around five seconds. Collect your favourites and rotate styles every day without tools.`,
  image: encodeURI(CHARM_IMAGE_BY_ID[charm.id]),
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
