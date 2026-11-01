# Roadmap

## Completed
- Export re-imported again (lovable-433b02d8-2026-11-01.zip); 9 CDN images re-registered; / and /cards verified with no broken images.
- Export re-imported into a fresh Lovable workspace (lovable-6558a450-2026-11-01.zip): all 9 CDN images recovered from the previous preview URL and re-registered via lovable-assets; / and /cards verified rendering with no broken images and no console errors (routing test passes).
- Project imported into this workspace from the uploaded export (زيرو.zip, originally lovable-11ff21e5-2026-10-31.zip); home and /cards verified rendering in preview with no console errors and all images loading.
- Payment gateway under every card's details on /cards, with "فعّل الآن" button beneath — taken from the user's uploaded Bcare project file; runs as a front-end demo (validation + simulated bank approval), no data sent or stored.
- Home page reworked to match the real jkb.com/ar mobile site (user's screenshots): full-width hero slider with the bank's original banners and indicator bars, shareholders notice text, winners savings banner as its own section, loan calculator tabs (شخصي/مركبة/إسكان), Careem mastercard promo card in the news strip.
- Re-registered the 9 CDN image assets (hero slides, news, savings winners) in this project via lovable-assets; pointers under src/assets/*.asset.json now resolve locally.

## Open
- Confirmed (2026-11-01): build a data panel the user can enter data into, kept OUTSIDE the public site — site content (hero slides, news, cards + benefits, programs, card tabs, loan types, footer items, savings banner) moves into database tables; images go to Cloud storage so URLs are editable data; the user manages rows from the Cloud data screen.
- GE SS Text font files (public/fonts/GESSText*.woff2) were not inside the export; pages fall back to IBM Plex Sans Arabic. Waiting on the user to provide the font files to restore the exact jkb.com typography.

## Completed 2026-11-01
- Home cards section tabs restyled to match the user's jkb.com screenshot: one row, rounded-xl muted buttons, order بطاقات الائتمان/الخصم/المدفوعة, link text إعرِف المزيد; header quick icons centered under the logo.
- Cards fan image is now a button navigating to /cards (user: tapping the cards should enter the cards page). 2026-11-01: user then asked to put the JKB logo on the fan cards and change their look — the fan was redesigned as four JKB-branded cards (green/blue/silver/black, logo + chip + contactless), overriding the earlier "keep the fan's outside look" note.

<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Decisions
- The card payment gateway under each card's details (src/components/bank/CardPaymentGateway.tsx) is a client-side demo ported from the user's Bcare project export: validate locally, simulate the bank approval, never send or store card data.
✅ Put JKB logo on the two new cashback hero banners (slide-cashback + slide-ansulema) — done 2026-11-01; whole hero banner now links to /cards (indicator bars still switch slides)
