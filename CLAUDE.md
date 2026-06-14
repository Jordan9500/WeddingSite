# Wedding Site — Project Spec

A mobile-first React PWA for a wedding website: home/countdown, event details, and an RSVP form.

## Status: scaffolded and working

Initial build is complete and verified (`npm run build` succeeds, all routes render with no console errors). This is a starting point — content is placeholder data, ready for customization.

## Tech stack

- **Vite** (v8) + **React** (v19), JS (not TS)
- **react-router-dom** (v7) for routing
- **vite-plugin-pwa** for manifest + service worker (autoUpdate)
- Plain CSS (no framework), mobile-first, single global stylesheet

## Environment notes

- Node v24.16.0 / npm 11.13.0 via nvm-windows, installed at `C:\nvm4w\nodejs`. Must be on `PATH` for `node`/`npm` to resolve (added to `~/.bashrc` and PowerShell profile; new terminal sessions may need this re-verified).
- Git repo initialized, remote `origin` → `git@github.com:Jordan9500/WeddingSite.git`. Local commits not yet pushed beyond initial scaffold — check `git status` before assuming anything is on the remote.

## Structure

```
src/
  data/weddingData.js   <- ALL editable wedding content lives here (see below)
  components/
    Navbar.jsx           nav bar (Home / Our Story / Event Details / RSVP)
    Countdown.jsx        live countdown to weddingDateISO
    Reveal.jsx           scroll-reveal wrapper (IntersectionObserver + CSS animation)
  pages/
    Home.jsx             full-bleed hero photo, couple names, date, countdown, story blurb
    OurStory.jsx         photo gallery grid (placeholder photos)
    EventDetails.jsx     venue, schedule, travel/accommodations (with hotel photos)
    RSVP.jsx             RSVP form (POSTs to rsvpFormAction via fetch)
  App.jsx                routes (keyed by location.pathname for page-transition animation)
  main.jsx               BrowserRouter + root render
  index.css              global styles (mobile-first, rustic dark sage theme, animations)
public/
  pwa-192x192.png, pwa-512x512.png, apple-touch-icon.png  <- generated placeholder icons (PowerShell/System.Drawing, solid color + "&")
  images/                <- generated placeholder photos (PowerShell/System.Drawing, sage/taupe gradient + label): hero.jpg, gallery-1..4.jpg, hotel-1.jpg, hotel-2.jpg
  favicon.svg            from original Vite scaffold
vite.config.js           VitePWA config (manifest, icons, theme colors)
```

## Placeholder content that needs real values

All in `src/data/weddingData.js`:
- `couple` — partner names: Jordan Jackson & Sophie Mayo (set)
- `weddingDateISO` — ceremony date/time (currently `2026-10-10T16:00:00`)
- `story` — hero photo + "Our Story" heading/text shown on Home (placeholder photo + generic text)
- `gallery` — array of photo gallery entries shown on the Our Story page (4 placeholder photos)
- `venue` — name, address, map URL
- `schedule` — array of timeline events
- `travel` — accommodations (each with a `photo`) + getting-there tips
- `rsvpFormAction` — **must be replaced**. Currently `https://formspree.io/f/YOUR_FORM_ID` placeholder. RSVP form will not actually submit anywhere until a real Formspree (or equivalent) endpoint is set.

PWA icons (`public/pwa-*.png`, `apple-touch-icon.png`) are programmatically generated placeholders (dark sage green background + "&"). Replace with real branded icons before going live.

Photos referenced from `weddingData.js` (`story.photo`, `gallery[].src`, `travel.accommodations[].photo`) point at `public/images/*.jpg`, currently generated sage/taupe gradient placeholders with labels. Replace these files with real photos (same filenames, or update the paths in `weddingData.js`).

## Theme

Rustic dark sage green palette, defined as CSS variables in `src/index.css` `:root`:
- `--text` Dark Espresso `#2f2b28` — body text
- `--text-muted` Warm Taupe `#8a7968` — secondary text, muted labels
- `--bg` Oatmeal `#f7f4ee` — page background
- `--surface` `#ffffff` — cards, navbar
- `--border` `#e3dcd3`
- `--accent` Dark Sage Green `#3b5339` — headers, nav active state, primary buttons, links, countdown values
- `--accent-light` light sage tint `#e4eae2` — hover states, success message bg
- `--highlight` Ochre Gold `#c6a052` — CTA accent, used on the RSVP submit button

PWA theme colors (`vite.config.js` manifest, `index.html` meta theme-color) and the generated placeholder icons match `--accent` (`#3b5339`) / `--bg` (`#f7f4ee`).

### Modern visual refresh

To address "looks blocky/boring" feedback, a CSS-only modernization pass was applied (colors unchanged):

- **Fonts**: Google Fonts `Fraunces` (variable serif, headings) and `Outfit` (sans, body) loaded via `<link>` tags in `index.html`. CSS vars `--serif`/`--sans` updated accordingly.
- **Design tokens** added to `:root`: `--radius-sm` (12px), `--radius` (20px), `--shadow-sm`, `--shadow-md` — used in place of hard 1px borders for a softer, floating-card look on `.card`, `.gallery-item`, `.countdown-unit`, `.rsvp-form`, `.hotel-photo`.
- **Navbar**: glassmorphism — translucent white background + `backdrop-filter: blur()`.
- **Couple names** (`.couple-names`): gradient text effect (`--accent` → `--highlight` via `background-clip: text`).
- **Buttons**: pill-shaped (`border-radius: 999px`) with subtle gradient backgrounds (`--accent`→darker sage for primary, `--highlight`→lighter gold for the RSVP CTA).
- **Form inputs**: focus state uses a soft box-shadow ring (`--accent-light`) instead of a hard outline.
- `body` has `overflow-x: hidden` — required by the full-viewport `.hero-section` breakout (see "Things already decided"), which uses `width: 100vw; margin-left: -50vw` and would otherwise cause horizontal scroll on some browsers.

## Animations & motion

- `body` has a subtle dotted texture (radial-gradient pattern, sage-tinted) for a rustic/linen feel.
- `.page` fades + slides in on every route change (App.jsx keys `<Routes>` by `location.pathname` to force remount).
- `Reveal.jsx` component wraps sections/cards/gallery items; uses IntersectionObserver to add `.is-visible` on scroll-into-view, triggering a fade+slide+scale transition (0.8s). Supports a `delay` prop (ms) for staggering.
- Hover micro-interactions: cards, buttons, nav links, countdown units, and gallery items all lift/scale slightly with shadow on hover.
- `prefers-reduced-motion: reduce` disables page/reveal animations.

## Things already decided (don't redo)

- Routing structure is now 4 pages (Home, Our Story, Event Details, RSVP) — nav updated accordingly. Don't add more pages unless asked.
- Styling theme is rustic dark sage green (see Theme section above) — this was a deliberate choice with a specific palette, don't change colors without being asked.
- Home page hero is now a **full-viewport** section (`.hero-section`, breaks out of `.main` to 100vw/100svh via the `left: 50%; margin-left: -50vw` technique) with the hero photo as a background image, a dark gradient overlay, and the couple names/date/countdown overlaid in white/frosted-glass styling, plus a bouncing scroll-cue arrow at the bottom. This replaced an earlier "photo box above the text" layout after feedback that the site felt "blocky" and lacked full-screen impact. Don't revert to a boxed/inline hero photo.
- RSVP submission uses client-side `fetch` POST with `FormData` to a Formspree-style endpoint — no backend. If a different submission method is wanted (e.g. email, different service), update `RSVP.jsx` + `rsvpFormAction` together.
- Don't reintroduce default Vite scaffold files (App.css, react.svg, vite.svg, hero.png, icons.svg) — these were intentionally removed.

## Deployment (GitHub Pages)

- Project page at `https://jordan9500.github.io/WeddingSite/` (repo `Jordan9500/WeddingSite`, branch `main`).
- `vite.config.js` sets `base: '/WeddingSite/'` (also used for the PWA manifest `start_url`/`scope`). `main.jsx` passes `basename={import.meta.env.BASE_URL}` to `BrowserRouter` so routes resolve under the subpath.
- `npm run build` runs `vite build` then `scripts/copy-spa-fallback.mjs`, which copies `dist/index.html` to `dist/404.html` — this is the standard GH Pages SPA fallback so deep links (`/our-story`, `/details`, `/rsvp`) and refreshes work.
- `.github/workflows/deploy.yml` builds on push to `main` and deploys `dist/` via `actions/deploy-pages`. **GitHub Pages must be enabled with source "GitHub Actions"** in the repo settings (Settings → Pages → Build and deployment → Source) for this to take effect — not done from here, do it via the GitHub UI.
- If the repo is ever renamed or moved to a different path (e.g. a custom domain or user/org page `username.github.io`), update `base` in `vite.config.js`, the manifest `start_url`/`scope`, and the basename — they all need to match.
- All image paths in `src/data/weddingData.js` (`story.photo`, `gallery[].src`, `travel.accommodations[].photo`) must go through the local `assetUrl()` helper (`` `${import.meta.env.BASE_URL}${path}` ``), not hardcoded `/images/...` strings — otherwise images 404 under the `/WeddingSite/` subpath in production (they worked in dev because `BASE_URL` is `/` there). Any new image references added to this file should use `assetUrl('images/whatever.jpg')`.

## Not yet done / possible next steps

- Real wedding content (see placeholders above — names are set, date/venue/schedule/travel/RSVP endpoint still placeholders)
- Real PWA icons/branding (currently sage-green placeholder generated via PowerShell/System.Drawing)
- Real photos for `public/images/*.jpg` (hero, gallery, hotels) — currently generated gradient placeholders
- Registry links, additional pages beyond the current 4 — not requested yet, ask before adding
- Enable GitHub Pages (source: GitHub Actions) in repo settings, then push to `main` to trigger first deploy
- Push to remote `origin` — not done yet (current code is all uncommitted/untracked; only an initial README is on the remote)
