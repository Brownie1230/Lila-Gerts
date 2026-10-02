# Lila Gerts — design system

Source of truth for the site. Overrides any skill default.

## Design read

Premium-consumer landing page for a cake atelier, speaking to private clients who choose by
taste and craft, with a heritage-confectionery language, built on native CSS, Cormorant Garamond,
Onest, and the client's own Pantone palette.

Dials: `DESIGN_VARIANCE 7` · `MOTION_INTENSITY 6` · `VISUAL_DENSITY 3` (premium-consumer preset).

## Palette

Taken verbatim from the client's two reference boards. This is the documented override of the
"warm cream + oxblood is the AI-default premium-consumer palette" rule: the client specified
these chips, they were not reached for.

| Token | Hex | Source |
|---|---|---|
| `--c-cherry` | `#5D0703` | Black Cherry (reference board 2) |
| `--c-inferno` | `#4E0000` | Pantone 4975 C, Red Inferno |
| `--c-velvet` | `#8E1612` | mid crimson, derived for crumb and hover states |
| `--c-cream` | `#EEDCC8` | Cream Vanilla (reference board 2) |
| `--c-pearl` | `#E9D4C3` | Pantone 12-1006 TCX, Mother of Pearl |
| `--c-rose` | `#E3A0A8` | Pantone 3519 C |
| `--c-sponge` | `#E4C89B` | sponge tone, derived from the reference photo |

**One accent, locked:** cherry red. No second accent anywhere on the page, including form states.

Page base is a paper tint of Cream Vanilla (`#F4E9DC`); ink is `#43120E`. Both carry the brand
hue, so the page never goes neutral grey.

### Theme

Light (cream) is the page theme and it is locked. The page makes exactly **one** colour-block
switch: the full-bleed Black Cherry section. That is a deliberate device lifted from reference
board 2, which is itself split cherry over cream, not an arbitrary section inversion.

A real dark mode ships under `prefers-color-scheme: dark` and under the manual toggle: cherry
base, cream ink. Both modes are brand colours, so brand identity survives the switch.

## Type

| Role | Face | Notes |
|---|---|---|
| Display, headings | Cormorant Garamond 300-700 | High-contrast old-style serif. Justified by a genuine heritage-confectionery brief, and it carries Cyrillic. Not Fraunces, not Instrument Serif. |
| Body, UI, forms | Onest 300-700 | Modern grotesque drawn for Cyrillic first. Not Inter. |
| Script accent | Grand Hotel | **Latin only, no Cyrillic.** Use for the wordmark and Latin collection names. Never set Russian text in it. |

All three are self-hosted from `assets/fonts/` (SIL OFL 1.1), subsets `latin`, `latin-ext`,
`cyrillic`, `cyrillic-ext`, `font-display: swap`.

Emphasis inside a headline uses italic of the same family, never a second family.

## Shape, depth, spacing

- **Radius: 2px on everything.** Cards, images, buttons, inputs. One system, no mixing.
- Shadows are tinted to the cherry hue, never pure black, and used only where elevation is real.
- Section rhythm `clamp(5rem, 10vw, 9rem)`; measure capped at 65ch.

## Motion

`MOTION_INTENSITY 6`. Every animation has one job:

| Motion | Job |
|---|---|
| Hero stagger on load | hierarchy: headline, then subtext, then actions |
| Scroll reveal (IntersectionObserver) | storytelling: sections arrive as the story advances |
| Hero image scroll-parallax (CSS `animation-timeline`) | depth on the one image that carries the brand |
| Button `:active` depress, link underline grow | feedback |

No scroll event listeners. Everything collapses to static under `prefers-reduced-motion: reduce`.

## Imagery

`assets/img/*.jpg` are **generated brand textures**, not photographs: abstract layered
cross-sections built from the palette, echoing the red-velvet strata in reference board 1. They
are the brand's visual signature and are production-usable as texture.

They are **not** a substitute for product photography. Slots marked `data-photo-slot` in
`index.html` take real shots at the sizes listed in README.md. Stock photo hosts were unreachable
from the build environment, so no stock imagery is used or faked.

## Copy rules

- Russian throughout; the brand name and collection names stay Latin.
- No em-dash or en-dash anywhere visible, in any language.
- One label per intent: ordering is always "Заказать торт", never a synonym.
- No invented precision. Any number on the page is either structural (price floor, lead time)
  or absent.
