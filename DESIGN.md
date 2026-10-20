# Lila Gerts — design system

Source of truth for the site. Where it disagrees with a skill's defaults, this file wins.
The current state comes first; how it got here is in the log at the end.

## What the site is

A one-page shop for **handmade gypsum candles, candle sets and pet candle holders** by Nina
Gercik, who works as самозанятая. Buyers are choosing a gift, mostly on a phone, and arrive from
Reels and from chats in Telegram, Instagram and TikTok. They should be able to buy without a
conversation: catalogue, cart, checkout, done. The invoice follows in Telegram or by email.

Design read: redesign that preserves the brand, for gift buyers on phones, in the language the
client drew herself (candy-stripe paper, a cherry sheet, a sticker logo, an illustrated mascot).
Dials: `DESIGN_VARIANCE 7` · `MOTION_INTENSITY 7` · `VISUAL_DENSITY 4`.

## The client's facts

Everything below came from Nina and goes on the page as given. Nothing here is invented, and
nothing is added to it without her word.

- **Material: gypsum, never ceramic.** Pet holders: gypsum, UV resin, acrylic paints.
- **"Ароматы", never "отдушки".** Seventeen of them, every one available for every candle.
- **Promises** (from her logo document): Безопасный состав · Эстетика в каждой детали ·
  Подарочная упаковка · Индивидуальный подход · Доставка от 5 000 ₽ бесплатно.
- **Contacts:** Telegram `t.me/Nina.G1999`, shop mail `lila_gerts@mail.ru`.
- **Delivery:** to the buyer's Ozon pickup point, flat 300 ₽ ("ставь везде 300 рублей"), free
  from 5 000 ₽. The "free from 5 000" half is her mockup and promise strip; that the two combine
  this way is our reading, asked back to her on 18 Oct.
- **Making time:** every candle 10–14 days; a pet holder 10–14 working days from the day the
  photographs arrive. Pet holders: **cats only**.
- **Returns:** the buyer sends the piece back; the money is returned once it arrives.
- **Seller:** Герцик Нина Евгеньевна, самозанятая. ИНН to follow (marked in `index.html`).
- **No testimonials** until she sends real ones. Invented reviews on a real shop are false claims,
  not placeholder text.

### Catalogue

| Product | Price | Variants | Facts (hers) |
|---|---|---|---|
| Свеча «Pion» | 500 ₽ | бордо · цвет на выбор | none given yet |
| Набор «Juli» | 2 999 ₽ | six colourways | gypsum oval tray, lidded container candle, peony candle; 9,5 × 17,5 × 9 cm; each candle ≥ 4 h, 80 ml wax |
| Набор «Nina» | 1 999 ₽ | бордовый | gypsum oval tray, two peony candles; 5 × 17,5 × 9 cm; each candle ≥ 4 h, 80 ml wax |
| Свеча «Moon» | 1 999 ₽ | белая · серая | 9 cm high, 11 × 11 cm; up to 12 h, 300 ml wax |
| Подсвечник «Китя» | 2 999 ₽ | by the buyer's cat photos | gifts: matches, tea lights, gift wrap, a card |

Every candle set ships with matches in a glass tube.

## Art direction

Nina drew five screens (15 Oct); two were screenshots of this build with her styling laid on
top. The site follows them:

- **Striped paper, cherry sheet.** The page is a pink stripe; the site is a cherry sheet laid on
  it, capped at `--page`, with the stripe showing past its edges.
- **First screen as drawn:** her logo and line centred, the mascot at the right edge standing on
  the stripe. The screen stops short of the fold by `--peek` so the stripe is visible on load.
- **The stripe carries** the promise band, the three doors (Свечи · Подсвечники · Конструктор
  свечей), the whole catalogue (dark text, maroon buttons, a thin dark rule round each photo) and
  the delivery band. Everything else sits on the cherry sheet.
- **Pet holders** in her tilted pink frames, the heading in her pink cloud.
- **The logo is the supplied sticker**, cut to transparency; never retyped. The bar wordmark is
  Grand Hotel.
- **The mascot is the studio's own illustration.** Recut on 20 Oct: holes in the hair (enclosed
  bits of the original black ground) removed, rim decontaminated, so it sits clean on any ground.

Left out on purpose: her "Коллекция ↓" under the hero buttons; "Посмотреть работы" already goes
there.

## Colour

| Token | Value | Role |
|---|---|---|
| `--stripe-a` / `--stripe-b` | `#FBD2D4` / `#FCEEEC` | the paper, sampled from her mockup; 38px stripe (24px on phones) |
| `--bg` | `#310907` | the sheet, sampled from her mockup |
| `--ink` | `#F7E9DC` | text on the sheet |
| `--accent` = `--c-rose` | `#E3A0A8` | the one accent: buttons, chips, focus, counts. Her buttons use exactly this |
| `--on-paper` | `#310907` | text on the stripe |
| paper buttons | `#35000B` | "в корзину" on the stripe, as drawn |

Brand chips from her original Pantone boards stay in `tokens.css` (`--c-cherry #5D0703`,
`--c-inferno #4E0000`, `--c-cream #EEDCC8`, `--c-pearl #E9D4C3`, `--c-sponge #E4C89B`); the cream
panel ("Свечу можно жечь дома") and the light theme are built from them.

### Theme

**Cherry is the default for everyone**, because all five of her screens are cherry. The cream
theme exists behind the toggle and is remembered per visitor. The system's
`prefers-color-scheme` is deliberately not followed: the brand reads dark until someone asks.
The grain overlay follows the site's theme too, so every visitor sees the same page.

## Type

| Role | Face | Notes |
|---|---|---|
| Headings | Cormorant Garamond 400–600 | High-contrast old-style serif with real Cyrillic; fits a heritage-craft gift brand. |
| Body, UI, forms, **prices** | Onest 400–600 | Grotesque drawn for Cyrillic first. Prices use lining tabular figures: Cormorant's old-style zeros read as letters. |
| Script | Grand Hotel | **Latin only.** Bar wordmark and "Lila Gerts" inside the hero line. Never Russian text. |

Self-hosted from `assets/fonts/` (SIL OFL 1.1), split by `unicode-range` so a browser fetches only
the subsets the page uses. Emphasis inside a heading uses italic of the same family.

## Layout and shape

Order on the page: bar · first screen · promise band and doors · catalogue (stripe) · pet holders ·
constructor · about the candles (cream panel) · how to order · delivery (stripe) · terms of sale ·
privacy · footer. Overlays: product sheet, cart drawer, toast.

**Shape rule:** buttons and chips are full pill; photographs and cards are 2px; panels and
overlays use `--r`. Container 1320px, side padding `clamp(20px, 5vw, 72px)`.

No eyebrows above headings. Lists use a hairline dash marker. Numbers and sums never wrap.

## How the shop behaves

- **Every "в корзину" opens the product sheet**: big photo, her facts, scent (optional:
  "Подобрать вместе в переписке"), quantity. A card cannot hold seventeen scents, and every candle
  needs one. Same product in two scents is two cart lines. The scent list is read from the
  constructor's `<select>`, so there is one list.
- **Cart drawer** from the right, reachable from anywhere; checkout sits under the lines. Goods,
  delivery and total are shown separately. The cart lives in `localStorage` only.
- **Toast** after an add, with "Открыть корзину"; the bar count bumps. Nothing opens on its own.
- **Filters** Все / Свечи / Наборы over the cards, by `data-cat`.
- **Constructor**: form, scent and a colour pair become one custom line; its cart line shows the
  two chosen colours in place of a photo.
- **Checkout** (name, phone, Ozon point, note, consent). The phone needs 10–15 digits in any
  format. Name, phone and pickup point are remembered in the browser for next time. Each order
  gets a number `LG-ДДММ-NNNN`, used in the email subject, in the thank-you screen and in the
  copied text, so buyer and seller can refer to it in a chat. The button locks while sending.
- **Sending**: FormSubmit's AJAX endpoint for `lila_gerts@mail.ru`, one flat table row per field.
  It answers 200 even when it refuses, so success is read from the body. **An order is never
  swallowed**: on any failure, or with no endpoint, the order text is copied for the buyer to
  paste into Telegram, and the page says so.

## Motion

`MOTION_INTENSITY 7`. Each animation has one job; all of them go static under
`prefers-reduced-motion`, and dialogs then close instantly.

| Motion | Job |
|---|---|
| First screen assembles on load (logo, line, actions, then the mascot rising) | hierarchy |
| Stage rides over the sticky first screen; the hero recedes (`animation-timeline: scroll()`) | storytelling, the page's one authorial device |
| Scroll reveal (IntersectionObserver), staggered in cards | storytelling |
| Drawer slides in, sheet rises, both play an exit | state change |
| Toast, counter bump | feedback |
| Card photo slow zoom, pet frames straighten on hover | feedback |
| Promise ticker (the only marquee) | ambient brand line, pauses on hover |

No scroll event listeners anywhere.

## Robustness

- Every `color-mix()` that matters has a solid fallback before it (old iOS drops the declaration;
  the bar would turn transparent, the cream panel's list unreadable).
- `100vh` before every `100dvh`.
- **No `<dialog>`** (iOS before 15.4): the script sets `no-dialog` on `<html>`, toggles the `open`
  attribute itself, adds a scrim, handles Esc and restores focus. Scroll lock is a class, not
  `:has()`.
- Verified on 20 Oct: axe-core (WCAG 2.1 AA + best practice) clean on the page, the sheet and the
  drawer in both themes; contrast audit clean; 39 scripted purchase scenarios pass.

## Performance

Catalogue photos ship at 720 and 360 wide with `srcset`, so phones take the small ones. The grain
tile is 17 KB (was 366 KB): its constant alpha is folded into `opacity`. A phone loads about
1.1 MB for the whole page (was 1.8 MB).

## Search and sharing

- `og.jpg` (1200×630, logo and mascot on cherry between stripes) with absolute URLs, because the
  link travels through Telegram.
- schema.org `OnlineStore` and an `ItemList` of `Product`/`Offer` (`MadeToOrder`), **built at
  runtime from the cards**, so a price edited on a card is the price search engines read.
- `404.html` in the site's style; its `<base>` switches itself between `/Lila-Gerts/` and `/`.

## Copy rules

- Russian throughout; brand and collection names stay Latin.
- One label per intent: "в корзину", "Добавить в корзину" (inside the sheet), "Оформить заказ",
  "Написать в Telegram". No synonyms.
- The skill bans the em-dash; in Russian the тире is orthography, so the ban holds for decoration
  (headings, labels, buttons, captions) and is lifted in body copy.
- No invented facts or precision. A product with no figures from her shows none.

## Open items

From Nina: ИНН · colour palette · real reviews · Instagram and TikTok links · whether single
Pion matches the set candles · confirmation of the delivery reading · ЮKassa approval · a domain.
From the developer: one test order to trigger FormSubmit's activation email, then a second to
confirm delivery to her inbox.

## Log

- **4 Oct** First build misread a Pantone colour photo as the product (a cake atelier); rebuilt
  around candles and figurines. Then: gypsum, not ceramic. Ordering made messenger-free; 17 real
  scents; colour pairs from her images. Invented testimonials removed.
- **15 Oct** Her archive: five drawn screens, the logo, the mascot, Moon photos. Site rebuilt on
  stripe and cherry, dark made default, catalogue and cart introduced, free shipping moved to
  5 000 ₽. The same day the nine originals arrived with names and prices in the filenames and
  replaced the crops; only two were Pion, the rest sets.
- **16 Oct** Shop pass: drawer, product sheet, filters, toast, her first-screen composition,
  pet frames, delivery on the stripe, share card, favicon. Then the catalogue moved onto the
  stripe, the cloud heading and footer labels, to match her screens exactly.
- **18 Oct** Her answers: shop mail, flat 300 ₽ delivery, product facts, 10–14 days, cats only,
  terms of sale with seller and returns; FormSubmit wired.
- **20 Oct** Quality pass: mascot recut; burger icon centring bug; old-browser fallbacks; order
  numbers, thank-you screen, phone check, remembered details; responsive images; grain 366→17 KB;
  structured data; 404 page; axe-core clean; this file rewritten.
