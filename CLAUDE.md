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
    Navbar.jsx           site header (brand + Home / Our Story / Event Details / RSVP)
    Footer.jsx           site footer (couple/date/venue + nav links)
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

**Light olive/sage green** palette — went through several iterations (light oatmeal → dark green → desaturated dark green → this) after feedback that dark versions were "too dark"/"garish"; this one uses a user-supplied swatch set (light yellow-greens through near-black olive, plus a gray scale) for an accessible light theme with strong dark-green-on-light-bg contrast. Defined as CSS variables in `src/index.css` `:root`:
- `--text` `#181b0d` — near-black olive, body text/headings (high contrast on light bg)
- `--text-muted` `#585956` — mid gray, secondary text/labels
- `--bg` `#eff1ec` — very light sage-gray, page background (with a subtle light-green gradient + dot texture, see below)
- `--surface` `#ffffff` — white, cards/navbar/RSVP form
- `--border` `#c7c9c3` — light gray border, card/input definition
- `--accent` `#535d38` — dark olive green, links, headings accent, nav active bg, countdown values, primary button gradient (paired with `--on-accent` text)
- `--accent-light` `#d6e5ab` — light green, hover backgrounds, countdown gradient, RSVP success bg
- `--highlight` `#9eb168` — mid sage-yellow-green, RSVP CTA button gradient (paired with `--on-highlight` text)
- `--on-accent` `#f5f7f0` — light text used on top of dark `--accent` surfaces (primary button, active nav link)
- `--on-highlight` `#181b0d` — dark text used on top of light `--highlight` surfaces (RSVP CTA button)
- `--focus-ring` `rgba(83, 93, 56, 0.25)` — input focus glow

`body`'s background is a subtle light gradient (`linear-gradient(160deg, #f6f8f1 0%, #eff1ec 50%, #dde6c9 100%)`, near-white to pale green) layered under a faint dark-olive dot texture (`rgba(83, 93, 56, 0.05)`).

PWA theme colors: `vite.config.js` manifest `theme_color` = `--accent` (`#535d38`), `background_color` = `--bg` (`#eff1ec`); `index.html` meta theme-color = `#535d38`. The existing placeholder PWA icons (dark sage `#3b5339` bg + white "&") still read fine against this palette; not regenerated.

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

## Layout: "website" not "app" (latest pass)

After the modern visual refresh, feedback was that the site felt like a PWA/app shell rather than a normal website (full-screen hero + floating glass pill nav, narrow single-column layout capped at 640px everywhere, no footer/typical site structure). This was addressed without removing PWA/offline support (`vite-plugin-pwa` stays as-is):

- **Navbar** (`Navbar.jsx` + `.navbar`/`.navbar-inner`/`.navbar-brand`/`.nav-links`): rebuilt as a traditional site header — solid white `--surface` bar with a bottom border (no glass blur/pill), a site "brand" (first names + `&`) on the left linking home, and nav links on the right with an underline for the active/hover state (`.nav-link.active` uses `border-bottom-color: var(--accent)` instead of a filled pill).
- **Mobile nav**: below `768px`, `.nav-links` is replaced by a hamburger toggle (`.navbar-toggle`, animates to an X via `aria-expanded`) that opens a full-width dropdown panel (`.nav-links.open`) below the header; `Navbar.jsx` tracks open/closed state with `useState` and closes the menu automatically on route change via `useLocation`. At `min-width: 768px` the toggle is hidden and `.nav-links` becomes a normal inline row.
- **Content width**: `.main` is now `max-width: 720px` by default, widening to `max-width: 1080px` (with more padding) at `min-width: 1024px`, instead of being capped at 640px on all screen sizes. `.navbar-inner` and `.footer-inner` match the 1080px max-width so the header/footer align with page content on desktop.
- **Hero** (`.hero-section`): still a full-bleed breakout (`100vw` via `left: 50%; margin-left: -50vw`) with the photo background, gradient overlay, and overlaid couple names/date/countdown — but reduced from `100svh` to `70vh` (mobile) / `78vh` (≥1024px) so it reads as a large banner rather than a full-screen app splash screen, and page content is visible/peeking below the fold.
- **Footer** (`Footer.jsx` + `.site-footer`/`.footer-inner`/`.footer-links`): new — couple names, wedding date + venue, and nav links, added to `App.jsx` below `<main>`. `.app` is a flex column so the footer sits at the bottom of short pages.
- **Event Details** (`EventDetails.jsx`): Venue and Schedule cards are wrapped in a `.details-grid` div, which becomes a 2-column CSS grid (`1fr 1.4fr`) at `min-width: 1024px`; Travel & Accommodations stays full-width below.
- **Gallery** (`.gallery-grid`, Our Story page): 2 columns on mobile, 3 columns at `min-width: 640px`, 4 columns at `min-width: 1024px`.

## Things already decided (don't redo)

- Routing structure is now 4 pages (Home, Our Story, Event Details, RSVP) — nav updated accordingly. Don't add more pages unless asked.
- Styling theme is light olive/sage green (see Theme section above) — this was a deliberate choice with a specific palette, don't change colors without being asked.
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
