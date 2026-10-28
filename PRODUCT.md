# Product

## Platform
Web. Next.js 15, React 19, TypeScript, CSS Modules.

## Purpose and audience
Uncorked Wines & Spirits is a neighborhood bottle shop at 1450 Washington St, Hoboken, NJ 07030. Adults 21+ browse wine, beer, spirits, ready-to-drink beverages and cigars. The user supplied the existing grape logo and the Uncorked Hoboken and Sparrow Wine sites as references.

## Requirements
Eight navigation entries: Red, White, Rosé, Sparkling, Spirits, Beer, Ready to drink, Cigars. Top search. Hero slider. 21+ entry screen. Red and white selection panels. Wines of the week, Curated craft beer, Featured craft spirits, Ready to drink product sections. Newsletter with full name and email in an engaging prominent section.

## Brand
The store name is typeset as a wordmark (owner removed the grape logo on 2026-10-21); keep neighborhood friendliness while adding bold editorial presentation. Prices in USD. This supersedes the old illustrative UK wine-club concept.

## Truth and boundaries
Store contact and hours verified from https://www.uncorkedhoboken.com/ on 2026-10-21. Product selections, prices and availability are illustrative until inventory integration. Never imply verified stock. Basket is device-local; checkout is not connected. Newsletter placement and UI authorized; mailing service destination is undecided, so collect no false success and expose pending connection honestly. No claims of free delivery, discounts, reviews or awards without supplied evidence. The store supplied (2026-10-22) a tiered mix-and-match wine discount: 4+ bottles 15% off, 6+ bottles 20% off, 12+ bottles 22% off, applied to the wine in the bag; sale prices on individual products are illustrative samples like all catalog prices. The store also supplied (2026-10-22) free local delivery on orders over $40 in Hoboken and nearby; no specific zip codes are claimed. Tasting dates and lineups on /tastings are a labeled sample calendar until the live events feed is connected; reservations go to the live events page. Age gate is self-attestation, 21+, a Yes/No pop-up asked on every visit (a yes lasts for the browser session only), with an underage denial state.

## Technical context
Use .next-dev for development and .next for production to prevent chunk conflicts. Preserve legacy wine detail URLs, but storefront uses the new multi-category catalog. Product images and store assets carry source provenance.

## Service and content readiness — October 28, 2026

Availability is read from server-side HTTPS webhook configuration. Without it, checkout and gift-card pages present a phone contact before collecting personal information; the newsletter presents the shop's Instagram instead of an unusable form. Checkout is an order-request intake, with availability, final price and payment confirmed by the shop. Gift cards require an explicit provider issuance acknowledgement or an HTTPS payment redirect. Both providers must honor the forwarded Idempotency-Key for safe retries across deployments. The server reprices cart items; catalog prices remain illustrative.

No actual provider URLs, tokens or approved business policy text were supplied during this implementation. The local Privacy information and Shopping information pages describe existing website behavior, and direct visitors to the shop for complete business terms. Do not describe these pages as approved legal policies or the services as live. There is no verified loyalty program; do not promise earned points. Search matches every entered word prefix in any order, preserving accent folding and wine-first results. Tastings remain a labeled sample calendar; the first Tuscan lineup now contains only its Chianti rather than an unrelated Chardonnay.

Owner correction after the audit fixes: keep the full eGift-card form and Pay and send button visible even when its provider is unconfigured. Explain availability next to the action, preserve entered details, and clearly report that no payment was taken if an unavailable purchase is attempted. Checkout and newsletter availability behavior is unchanged.
