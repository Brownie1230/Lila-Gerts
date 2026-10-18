# Lila Gerts — design system

Source of truth for the site. Overrides any skill default.

## Design read

Premium-consumer landing page for a handmade ceramics and candle studio, speaking to private
buyers who choose by look and feel, with a soft tactile boutique language, built on native CSS,
Cormorant Garamond, Onest, and the client's own Pantone palette.

### Correction, 4 Oct (material)

The pieces are **cast gypsum, not ceramic**. The mould is standard and only the ear shape
changes between pet figurines; the value is the hand painting done from the buyer's photographs,
so that is what the copy says. A figurine ships with five replaceable tea lights, which is why it
carries no scent choice. Every candle set also ships with matches in a glass tube.

### Correction, 4 Oct

The first build read the brief as a cake atelier. It is not. Lila Gerts makes **ceramic figurines
and candles**: dessert-shaped candles, cat figurines, decorative pieces, finished with bows and
lace. The red-velvet photograph in reference board 1 was the client's **colour reference**, not a
product, and the client said so in the brief chat. Palette and type survive the correction
unchanged. The cross-section metaphor does not: product copy, section plan and imagery are being
rebuilt around the real objects.

### The client's own brief, verbatim

Contact and claims come from the information card the client sent, so they go on the page as
given, not invented:

- Telegram `t.me/Nina.G1999`, email `nina.gercik@mail.ru`
- Shipping to the buyer's chosen Ozon pickup point, free over 3 000 ₽
- "Наши свечи безопасны и не выделяют опасных веществ при горении"
- "Эстетика в каждой детали"
- "Качественная подарочная упаковка" (the card reads "Качественные", corrected here)
- "Индивидуальный стиль и подход"

There is no phone and no public address: Telegram is the ordering channel. The wordmark is script
"Lila" over serif caps "GERTS" with a line-art bow. The client is open on the base colour: cream
and cherry as supplied, or white if white reads better.

**No testimonials exist.** The two in the first build were written by me as template filler. On a
real shop that sells to real buyers, invented reviews are not placeholder text, they are false
claims, so the section is removed until the client supplies real ones.

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

## House system

Built on the system from the client's own portfolio (`bonifirmaarm-design/portfolio`),
adopted at their request so this site is made the same way as their other work. What that
brings, and what it overrides:

- **Sticky first screen, stage over it.** The first screen is `position: sticky`; the content
  block rides up over it with rounded top corners and a deep shadow, while the wordmark blurs
  and shrinks on `animation-timeline: scroll(root)`. This is the page's one authorial device.
- **Case spreads, not cards.** Each product line gets a plate with the main photograph, a second
  photograph inset over its corner, a dash list of what it is, a two-column fact table and the
  colours it comes in. Same structure three times, so it reads as a system.
- **No eyebrows.** The house rule is zero; it overrides `design-taste-frontend`, which allows one
  per three sections. Headings carry themselves.
- **No "icon + title + text" cards** as page structure. Lists use a hairline dash marker.
- **One icon, drawn by hand**, an arrow at stroke 1.6. This overrides the skill's "never hand-roll
  an icon" rule, and the Phosphor sprite is gone with it.
- **Browser surfaces are designed**: text selection, caret, accent colour, scrollbar, focus ring.
- **Numbers and sums never wrap**: non-breaking space plus `white-space: nowrap`.
- Container 1320px, side padding `clamp(20px, 5vw, 72px)`, section rhythm `clamp(64px, 9vw, 132px)`,
  spreads separated by `clamp(72px, 11vw, 168px)`.

The palette, the type and the brand stay Lila Gerts; only the construction is shared.

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
cross-sections built from the palette. They were drawn from the red-velvet photograph in
reference board 1 back when that was misread as the product. Since the brand makes ceramics and
candles, the cross-section is the wrong signature and these are **retired** as soon as real
product photography lands. A ceramics and candle brand sells on the object: photography is the
hero here, not texture.

They are **not** a substitute for product photography. Slots marked `data-photo-slot` in
`index.html` take real shots at the sizes listed in README.md. Stock photo hosts were unreachable
from the build environment, so no stock imagery is used or faked.

## Ordering

Buyers do not want to negotiate in a chat: they pick, pay and leave. The order form therefore
collects everything an Ozon shipment needs without any messenger: item, scent, colour pair, name,
phone and pickup point. The form reshapes itself around the item, since a pet figurine takes
photographs instead of a scent.

Scents and items live as plain `<option>` lines in `index.html` so the range can be changed
without touching code. The seller said the range will keep moving, so nothing about it is
hard-coded elsewhere.

"Ароматы", never "отдушки": men order more often than women here and read the first word faster.

Orders reach the seller only once `data-endpoint` on the form names a handler. Until then the
form composes the order and copies it, and says so plainly rather than claiming it was sent.

## Copy rules

- Russian throughout; the brand name and collection names stay Latin.
- The `design-taste-frontend` skill bans the em-dash outright. That rule exists to kill a stylistic
  tell in English marketing copy. In Russian the тире is orthography, so the ban is **kept for
  decoration** (headlines, labels, pills, buttons, captions) and **overridden in body copy**, where
  the dash is set correctly with non-breaking space before it. Project rules beat skill defaults.
- One label per intent: ordering is always "Заказать торт", never a synonym.
- No invented precision. Any number on the page is either structural (price floor, lead time)
  or absent.

## Correction, 15 Oct — the client art-directed the site herself

She sent an archive of five screens she drew (`1–4 стр.png`, `корзина.png`), the real logo
file, a mascot illustration and photographs of the Moon candle. Two of those screens are
screenshots of **this** build with her own styling laid over them, so the brief is not a
rejection: she is extending what exists. What her mockup settles, and what it overrides:

- **Striped paper, cherry sheet.** The page field is a pink stripe, `#FBD2D4` over `#FCEEEC`,
  about 51px per stripe on her 1906px canvas, so 38px here. The site proper is a cherry sheet
  laid on it, `#310907`, capped at `--page` with the stripes showing past its edges. The
  promise strip and the three category doors ride the striped paper, not the sheet.
- **Dark is now the default**, and the cream theme moved behind the toggle. All five of her
  screens are cherry; the earlier "light is the page theme and it is locked" line is overruled
  by the client's own drawing. `prefers-color-scheme` no longer flips the page: the brand reads
  dark to everyone until they ask otherwise.
- **The wordmark is the supplied logo**, not type: script "Lila" over a fat didone "GERTS" with
  a bow, drawn as a sticker with a cream outline. It replaces the Grand Hotel setting in the
  bar, the first screen and the footer. Grand Hotel stays only as the small bar wordmark.
- **The mascot** is placed on the cherry sheet only. Cut from a black background, it keeps a
  dark fringe along the hair that would show on the stripes.
- **Shop, not enquiry.** Her screens have prices, "в корзину" on every card and a cart page
  with line items and a sum, so the single order form is gone: catalogue → cart → checkout.
  The cart lives in localStorage and travels no further until the order is sent.
- **Free shipping from 5 000 ₽**, not 3 000. She corrected the figure on our own screenshot.
- **Подсвечники, not фигурки.** "Уют, созданный руками: авторские свечи и гипсовые
  подсвечники". The pet piece is a candle holder, «Китя».
- Prices as given: Pion 500 ₽, Moon 1 999 ₽, Китя 2 999 ₽.
- A price is set in the text face with lining tabular figures. Cormorant's old-style figures
  render "500" with lowercase-looking zeros, which is charming on a heading and wrong on a
  price.

### Same day: the real catalogue arrived

Nine full-resolution photographs were uploaded straight to `main`, named with the product and
the price. They overturn the reading taken from her mockup, where every card said
«Свеча Pion, 500 руб.»: only two of the nine are a Pion. The catalogue is now hers, verbatim:

| Товар | Цена | Варианты |
|---|---|---|
| Свеча «Pion» | 500 ₽ | бордо · цвет на выбор |
| Набор «Juli» | 2 999 ₽ | розовый и зелёный · розовый · белый и розовый · голубой · розовый и жёлтый · зелёный и жёлтый |
| Набор «Nina» | 1 999 ₽ | бордовый |
| Свеча «Moon» | 1 999 ₽ | белая · серая |
| Подсвечник «Китя» | 2 999 ₽ | по фото питомца |

This also confirms her cart screen: «Juli» 2 999 ₽ plus «Moon» 1 999 ₽ is the 4 998 ₽ she drew.
One filename carries an instruction — "под этим товаром можно выбрать цвет" — so that card
points at the constructor.

The crops taken from her mockup PNG are gone; cards are built from the originals at 720×960.
The colour notes invented for those crops are gone with them: every name and every colour word
on the page is now hers.

The mascot is the studio's own, not a found image: asked where it came from, the developer
said it is theirs. Nothing to clear.

**Still missing:** whether an order is paid by an invoice sent in Telegram after the fact, which
is what the page says now, or by a real payment on the site, which needs self-employment
registration and a provider; and whether the nine originals should stay in the repository root,
where they add about 30 MB to every clone.

## Shop pass, 16 Oct

Design read: redesign that preserves the brand, for a handmade-candle shop whose buyers choose a
gift on a phone. The client's mockup is the brief; this pass makes it behave like a shop. Dials
`DESIGN_VARIANCE 7` · `MOTION_INTENSITY 7` · `VISUAL_DENSITY 4`. The shop layer lives in
`assets/css/shop.css`; `app.css` stays the house system.

What changed and why:

- **First screen follows her drawing**: logo and line centred, mascot at the right edge standing
  on the stripe. The screen stops short of the fold by `--peek`, so the stripe she stands on is
  visible on first load. This overrides the skill's anti-centre rule: the client drew it centred.
  It assembles in reading order on load (mark, line, actions, then the mascot rising).
- **Cart drawer** replaces the cart section at the foot of the page. Buying no longer means
  scrolling past every section; checkout sits in the drawer under the lines. Native `<dialog>`
  gives focus trapping, Esc and the backdrop; the script adds only the exit animation.
- **Product sheet**: every "в корзину" opens it, because every candle needs a scent and a card
  cannot hold seventeen. Scent is optional ("Подобрать вместе в переписке"). The scent list is
  read from the constructor's `<select>`, so there is one list to edit. Same product in two
  scents is two cart lines.
- **Filters** Все / Свечи / Наборы over the eleven cards, driven by `data-cat`.
- **Toast** acknowledges an add without opening anything; the counter on the bar bumps.
- **Pet frames** take her pink, slightly tilted frames instead of repeating the catalogue grid.
  On a phone they become a swipe row: three tall frames stacked would be a corridor.
- **Delivery sits on the stripe paper**, between two cherry sheets, echoing the promise band.
  That removes the second cream panel; "О свечах" stays the one cream block.
- A constructor candle has no photograph, so its cart line shows the two colours that were
  picked.
- **Share card** `og.jpg` (1200×630, logo and mascot on cherry between stripes) with an absolute
  URL, because the link is passed around in Telegram. Favicon is the logo on cherry.

Buttons and chips are full pill; photographs and cards are 2px; panels and overlays use `--r`.
That is the documented shape rule.

### Same pass: closing the gaps with her mockup

Compared screen by screen against her five PNGs, three things still differed and now match:

- **The catalogue sits on the stripe**, continuing the band under the three doors, as on her
  second screen: dark text, maroon `#35000B` buttons, a thin dark rule round each photograph.
  The cherry sheet now starts at the pet section.
- **The pet heading sits in her pink cloud**, drawn in CSS as two loose outlines, not an image.
- **Footer contacts are labelled** ("Telegram:", "Эл. почта:"), as on her fourth screen.

Left out on purpose: her "Коллекция ↓" under the hero buttons. "Посмотреть работы" already
goes to the catalogue, and two links with one job on one screen is one too many.

## Her answers, 18 Oct

Nina answered the fifteen questions. What went onto the page, in her words where she gave them:

- **Orders go to `lila_gerts@mail.ru`**, her shop address, which also replaces the personal one
  everywhere on the page. The form posts to FormSubmit's AJAX endpoint for that address: no key,
  but the first order triggers an "Activate Form" email she must click once. FormSubmit answers
  200 even when it refuses, so success is read from the body. When sending fails, the order is
  copied for the buyer to paste into Telegram: an order is never swallowed. The privacy text
  names the service.
- **Delivery is a flat 300 ₽** to any Ozon pickup point ("ставь везде 300 рублей"), and free
  from 5 000 ₽ as on her mockup and promise strip. The cart shows goods, delivery and total.
- **Product facts** (composition, size, burn time) live as `data-incl`, `data-size`, `data-burn`
  on each card and fill the product sheet. Pion has none: she gave figures for the sets and Moon
  only, and none are invented for it.
- **Every candle takes 10–14 days.** Pet holders keep her own "10–14 рабочих дней со дня
  отправки фотографий".
- **Cats only** on the pet holder.
- **Terms of sale** section: seller (Герцик Нина Евгеньевна, самозанятая; ИНН to follow, marked
  in an HTML comment), payment, making time, delivery, and her return rule.

Still to come from her: ИНН, the colour palette and customer reviews (promised 19 Oct), links to
Instagram and TikTok, ЮKassa approval, and the domain, which she wants.
