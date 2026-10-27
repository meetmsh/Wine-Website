---
name: Uncorked Wines & Spirits
description: A neighborhood bottle shop with the confidence of a window campaign.
colors:
  oxblood: "#641b2e"
  oxblood-deep: "#35141f"
  brass: "#b99a62"
  paper: "#fbfaf7"
  paper-deep: "#eae4d7"
  ink: "#29251f"
  ink-2: "#655b52"
  ink-3: "#75665e"
  line: "#ded8ce"
  line-strong: "#bfb0a3"
typography:
  display:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(61px,6.1vw,90px)"
    fontWeight: 500
    lineHeight: 1.03
    letterSpacing: "-.035em"
  headline:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(35px,3.7vw,51px)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-.03em"
  title:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "-.015em"
  body:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "16px"
    lineHeight: 1.55
  label:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 500
  action:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 500
  field:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "16px"
rounded:
  square: "0"
  circle: "50%"
spacing:
  gutter: "clamp(18px,2.6vw,40px)"
  compact: "12px"
  field-gap: "16px"
  panel-gap: "24px"
  mobile-section: "40px"
components:
  button-primary:
    backgroundColor: "{colors.oxblood}"
    textColor: "#fff9ef"
    typography: "{typography.action}"
    rounded: "{rounded.square}"
    padding: "0 25px"
    height: "51px"
  button-add:
    textColor: "{colors.oxblood}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "8px 12px"
  button-add-hover:
    backgroundColor: "{colors.oxblood}"
    textColor: "white"
  input-newsletter:
    textColor: "{colors.ink}"
    typography: "{typography.field}"
    rounded: "{rounded.square}"
    padding: "13px"
    height: "52px"
  category-selected:
    backgroundColor: "{colors.oxblood}"
    textColor: "white"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "8px 16px"
---

# Design System: Uncorked Wines & Spirits

## Overview

**Creative North Star: "The Neighborhood Window Campaign"**

Uncorked pairs its established grape logo with the confidence of a photographic shop-window campaign. Warm paper, burgundy and aged gold connect the shopping interface to the supplied neighborhood identity. High-contrast serif headlines provide expression; plain sans-serif controls keep browsing direct.

The system alternates generous campaign areas with compact, readable product shelves. Bottle photography, fine rules and quiet surface changes carry the visual structure. The durable identity comes from the logo, palette, typography and photographic material, rather than a fixed page composition. The first storefront expression is recorded in [.impeccable/surfaces/storefront.md](.impeccable/surfaces/storefront.md).

**Key Characteristics:**
- Burgundy-and-gold neighborhood identity.
- Expressive serif headlines with practical sans-serif retail information.
- Square photographic surfaces and compact product shelves.
- Fine rules, warm tonal layers and restrained movement.

## Colors

The palette combines wine-dark branding, aged metal and warm paper neutrals; frontmatter values are normative.

### Primary
- **Oxblood:** the brand field, primary actions, selected categories, product brands and text emphasis.
- **Deep Oxblood:** the darker hover state for burgundy primary actions.

### Secondary
- **Aged Brass:** focus outlines, the age-gate divider and the gold component of the supplied logo. Campaign imagery also uses locally defined pale-gold text and button treatments. These contextual cream and gold steps are deliberate material variations, rather than new brand accents.

### Neutral
- **Paper:** the default page and header surface.
- **Deep Paper:** a warm surface primitive; pale bottle grounds and olive-paper craft-beer surfaces add contextual tonal separation.
- **Ink:** primary body and product information.
- **Secondary Ink:** descriptions, store information and disclosures.
- **Tertiary Ink:** available as a global primitive; do not infer a separate text hierarchy without usage evidence.
- **Fine Rule / Strong Rule:** shelf dividers, borders and underlined retail links.

**The Brand Anchor Rule.** The store name is typeset, not an image (owner decision, 2026-10-21; refined 2026-10-23). The `Wordmark` component uses Fraunces (soft axis 100, display optical size): an upright "Un" at weight 500 runs into an italic "corked" at 400, a nod to the cork coming out. Below sits "WINES & SPIRITS" in Geist 600 caps tracked .34em, with the ampersand in brass. Sizes: 34px header, 40px footer and age gate, 27px mobile. Fraunces is reserved for the logotype; Bodoni Moda remains the editorial display face.

## Typography

**Display Font:** Bodoni Moda, with Georgia and serif fallbacks.
**Body Font:** Geist, with Arial and sans-serif fallbacks.

The serif carries campaign emotion, section headings and product-detail titles. Geist carries navigation, product-card names, prices, fields and support copy. Bodoni's italic is an emphasis within the headline, not a separate labeling system. Geist Mono is loaded but does not establish a visible retail role.

### Hierarchy
- **Display:** the frontmatter campaign role; mobile uses `clamp(43px,11.3vw,65px)`. Age-gate and detail headings use smaller contextual serif scales.
- **Headline:** the frontmatter shelf role; mobile shelf headings are (34px); the wide craft-beer heading uses (47px).
- **Title:** product-card names use the frontmatter title role, reduced to (14px) on mobile.
- **Body:** the frontmatter base role. Most retail descriptions use (12–14px), with generous line spacing. Longer descriptions stay around (40–47ch).
- **Label:** compact retail controls and support text use the frontmatter label size. Search and newsletter inputs use the field role. Prices use tabular figures.

**The Retail Reading Rule.** The catalog's repeated support and action text uses (12px), product-card names use at least (14px), and search/newsletter input text uses (16px). These describe the final retail overrides, not every shared or legacy style.

Shared buttons and text links use (13px); uppercase utility labels use (12px). Small notice, footer and toast status annotations retain contextual (10-11px) sizes; these are not general retail text roles.

## Layout

The shared container caps at (1440px), with fluid gutters of `clamp(18px,2.6vw,40px)`. The hero (two photographic slides, 400px tall on desktop and 370px on mobile, under a left-weighted dark shade) and the offer band align to the container edges. Desktop product grids use four equal columns with (24px) gaps, tightening to (18px) below (1100px). Homepage shelves become native horizontal scroll regions at (700px), showing about 1.85 cards with (14px) gaps, scroll snapping, keyboard-focusable groups and a visible swipe hint. Shop results and related products retain two-column mobile grids. Shelf sections use (65px) top and (70px) bottom padding on desktop and (43px)/(42px) on mobile. The craft-beer shelf uses a side heading on wide screens, returning to a heading above the grid at (1100px).

Campaign photography sits in an inset rectangular frame, cropped at center (20%) on desktop and (62% center) on mobile. Category panels sit side by side on desktop and stack on mobile. The email signup sits mid-page on home (after the craft-beer shelf, where the neighborhood interlude used to be) and at the foot of every other page: a container-aligned block pairing a wine-pour photograph with an oxblood panel holding the serif headline, three checked perks and the name/email form. Both become single columns at (700px).

The desktop header has a logo/search/bag row and a category row, with a separate notice strip. At (1100px) the visit shortcut disappears. At (700px) the notice disappears, search moves to its own row, categories scroll horizontally, and a menu opens a two-column list. The mobile sticky header uses a negative top offset (-63px), allowing the identity row to scroll away while search and categories remain accessible. Product details and newsletter fields stack at (700px); the footer changes from four columns to two there. The viewport fits the display, with safe-area padding for shared content, the bag, footer and toast.

Product-detail images retain contained bottle silhouettes. New surfaces should retain this distinction between expansive editorial material and efficient shopping grids.

## Elevation & Depth

Depth comes primarily from warm surface changes, photography, fine borders and dark image overlays. Product cards remain flat. The expanded mobile menu uses a soft downward shadow (`0 16px 22px #27101726`); transient toast feedback uses (`0 8px 28px #27101726`). The shopping-bag dialog uses a translucent backdrop (`#26141c99`).

The shared easing is `cubic-bezier(.23,1,.32,1)`, with `cubic-bezier(.32,.72,0,1)` for the bag. The native dialog transitions horizontal position over (260ms) and opacity over (180ms), including discrete display/overlay transitions. Keyboard activation skips bag and manual carousel movement. Persistent toast feedback transitions opacity over (180ms) and position over (220ms). Button press feedback is brief (120ms); hover is gated to fine pointers with hover capability. Reduced motion removes spatial effects and makes transitions effectively immediate. Scroll reveal is opt-in per block with `data-reveal` (children rise 16px and fade in, staggered 70ms, capped at six) or `data-reveal="self"` (the block itself rises 22px); one observer in `MotionRoot` drives it, content stays visible without JS or with reduced motion, and anything already on screen at load is never hidden. Hero photographs cross-fade over 700ms while settling from 1.045 scale; the bag pill bumps to 1.07 for 320ms when an item is added; the mobile menu drops in 8px over 240ms. Carousel image fades use (250ms) for responsive manual changes. The carousel exposes pause and manual selection, suspends automatic progression during hover/focus, and disables automatic progression for reduced motion.

## Shapes

Panels, cards, inputs and primary buttons use square corners. Circular bag counters and carousel arrows are purposeful exceptions. Dividers and most borders are (1px); global focus outlines are (2px) oxblood with (4px) offset; dark campaign regions use pale gold. Product bottles remain fully contained against pale photographic surfaces; campaign photography fills and crops its surface.

## Components

### Buttons

Compact and direct. Main calls to action use burgundy with pale text, a (51px) minimum height and square corners; the photographic campaign reverses this to pale gold with dark wine text. Add-to-bag actions use a fine burgundy-tinted border and switch to burgundy fill on hover or added state. Their minimum height is (44px), including mobile. Keep visible contextual focus treatment.

### Chips

Category filters are square text tabs, with burgundy fill and white text for the selected category. They maintain a (44px) minimum height and scroll horizontally when needed. Hover uses a pale wine tint. Selection is also represented semantically with `aria-current`.

### Cards / Containers

Product cards have no enclosing shadow or rounded shell. A pale image rectangle holds the bottle, followed by brand, product name, detail, and a fine-rule price/action row. With a fine pointer, image hover reveals a burgundy detail link and lifts the bottle slightly. Mobile keeps details directly visible and lets price/actions wrap.

### Inputs / Fields

Search uses a white rectangular field with a fine neutral border; newsletter fields use pale paper within a burgundy region. Search and newsletter text remain (16px). Newsletter inputs are (52px) high. Labels and privacy information remain visible outside the fields. Keep the global focus outline and burgundy caret. Catalog sorting uses a native select with (16px) text and a (44px) minimum height; the product purchase quantity select uses (16px) text and a (51px) minimum height.

### Navigation

Geist category links use a fine burgundy underline that scales in on supported hover. The sticky warm-paper header keeps the store identity, search and bag available. Mobile retains the scrollable category row in addition to the expandable menu. The store name is the typeset wordmark.

### Header, Search and Category Menu

The header is a three-column row: a compact (138px, 112px mobile) logo, a centered search field up to (600px), and visit/bag actions. Search is a warm filled pill (48px) that turns white with an oxblood border and soft ring on focus, and the bag is a pale-gold pill showing the bag total and count (count only on mobile); `/` focuses it, and it opens a suggestion panel (popular terms when empty, up to five live product matches with sale-aware prices, then "See all results"). The eight category links carry small chevrons; with a fine pointer, hovering opens one Stripe-style dropdown surface that morphs its width, height and position between categories (260ms `--ease-in-out`) with a caret tracking the trigger. Panels hold a serif title, one line of copy, shop/live-store links, featured products and, for wine, the six-bottle offer. The dropdown is a pointer enhancement; every destination stays reachable through the links and the shop.

### Collections

Below Wines of the week, a Collections carousel replaces the former red/white panels: square pale cards (3:4) with a contained bottle photograph and a centered sans label, four per view on desktop (three at 1100px, about two on mobile), native scroll snapping, chevron arrows and pill page dots. Campaign surfaces (offer band, hero) align to the shared container edges, so the logo, offer band and hero start on the same line.

### Premium Layer (Linear-inspired, warm light)

The owner chose to keep the warm paper world and borrow Linear's craft rather than its dark theme. The sticky header is frosted paper (`#fbfaf7d9`, 18px blur) and only gains a hairline and soft shadow once the page scrolls. Search is a white pill up to 760px wide with a hairline border, an inset highlight and an oxblood glow on focus; while it is idle, a hint line cycles example searches with a short blur-in. Search matches word starts and ignores accents. Scroll reveals add a 6px blur to the rise. Hero copy arrives in sequence (headline, text, actions) with a focus pull from 10px blur. Product and collection tiles carry a faint inner hairline and a cursor-following white spotlight on fine pointers. Primary buttons have an inner top highlight, a layered shadow and an arrow that nudges on hover. The offer band carries a single small "Terms and conditions apply." line under the ladder status.

### Product Pages

Product pages pair a sticky photo (badges top-left: brass "Staff pick", oxblood "Sale") with the buying column: serif brand and italic name, price, a short description, a three-cell "at a glance" spec row, an optional "Why we love it" staff quote on tinted paper with a brass hairline, quantity and Add to bag, and the delivery and wine-offer perks. Below sits a tinted story panel: serif tasting notes (nose, palate, finish), a five-step profile meter, pairing pills and a ruled details list, closed by a small sample-content note. Content lives in `lib/details.ts`; a product with a `staffPick` line also shows the brass badge on its cards site-wide.

### Mobile and Buying Controls

Product pages use a quantity stepper (54px, square, hairline border) beside an Add to bag button that carries the running total; on phones a frosted sticky bar with name, price and Add to bag slides up once those controls scroll away. Product cards stack price above a full-width 44px add button on phones. The phone menu is one column of 54px rows with Wine, Beer and Spirits as accordions of their groups. The bag shows brand above name, unit price when quantity is above 1, a Remove link, and a sticky checkout footer (totals, loyalty, CTA). The offer band compresses to a one-line headline and tier tiles on phones so the hero shows on the first screen. Controls are square everywhere; pills are reserved for the search field, the bag pill and removable filter chips. Scroll reveals are a short rise without blur.

### Wine Tastings

The home page carries a tastings section after Collections: a serif headline, one large photographic card for the next tasting (paper date tile top-left, dark bottom gradient, cream serif title) and a ruled list of the following dates with tinted date tiles. `/tastings` lists every tasting as a paper-tinted row with photo, date tile, long date and time, description, an "On the table" lineup with per-bottle add buttons and an "Add the whole lineup" action, and a primary "Reserve your spot" link to the live events page.

### Offers and Sale Tags

The top strip leads with the delivery offer (truck icon, "Free local delivery on orders over $40 · Hoboken and nearby"), with the address in the center and tastings/email links at right; on mobile only the delivery line remains. The bag shows a thin meter toward the $40 threshold, turning olive once unlocked.

The tiered wine offer (4+ bottles 15%, 6+ 20%, 12+ 22%, supplied by the store) appears as a medium inset band between the header and the hero: a serif headline ("Mix any wine. Save up to 22%."), a three-step ladder of tier tiles, each with a serif percentage and a thin progress rail that fills as wine enters the bag (reached tiers turn white, the current tier fills oxblood), a live status line, and a "Shop wine" action. The bag applies the highest reached tier to the wine subtotal and shows bottles toward the next tier. Products with a `salePrice` show a square oxblood "Sale" tag on the photo, the sale price in oxblood and the regular price struck through in tertiary ink.

### Age Gate and Shopping Bag

The entry gate is a centered (440px) native modal dialog over the storefront, with a blurred oxblood scrim; it cannot be dismissed with Escape. It combines the grape logo, serif headline, explicit 21+ confirmation, separate underage action, optional remembered choice and visible denial feedback. The bag is a full-height native dialog aligned to the right, with a width of up to (520px), fine-rule item rows and (44px) quantity controls. Preserve the visible sample-selection and disconnected-checkout disclosures.

## Do's and Don'ts

### Do:
- **Do** use the typeset wordmark and the burgundy-and-gold palette.
- **Do** pair expressive Bodoni headings with Geist shopping information.
- **Do** maintain readable retail copy, visible focus and compact controls with at least (44px) action targets where established.
- **Do** use contained product imagery and cropped editorial photography for their respective roles.
- **Do** preserve reduced-motion behavior and visible sample/integration disclosures.

### Don't:
- **Don't** reintroduce the grape logo image or restyle the wordmark per surface; use the `Wordmark` component.
- **Don't** add generic rounded, shadowed shells around the flat product shelves.
- **Don't** shrink retail text to fit more products into a row.
- **Don't** hide product facts or essential shopping actions behind hover-only interactions on mobile.
