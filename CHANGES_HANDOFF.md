# Muneeb Portfolio — Session Handoff

Quick log of what was changed, what's verified, what's still open. All edits are in
`index.html` (custom `<script>` at the bottom + `<head>`) and `custom-styles.css`.

## Local preview note
YouTube playback needs the page served over **http(s)** (local server or deployed).
Opening the file directly via `file://` triggers YouTube "Error 153". Run:
`python -m http.server 8765` then open `http://localhost:8765/index.html`.
Hard-refresh (Ctrl+Shift+R) to bust CSS/JS cache.

---

## Done & verified (desktop)

- **Portfolio cards** → rebuilt as 6 vertical **9:16 YouTube Shorts** in a responsive
  grid (`initPortfolio()`). Thumbnail + play button; **click plays the video inline**
  (swaps in the embed with autoplay). Video IDs are listed in `initPortfolio()`.
- **Cards grid** → `grid-template-columns: repeat(auto-fit, minmax(min(100%,300px),1fr))`
  so it's 3-col desktop / 2-col tablet / **1-col (one at a time) on mobile** automatically.
- **Contact section** → full rebuild: labelled Email/Phone pills (**white text**),
  socials removed ("Follow Me On" gone), empty right-side box hidden, red gradient removed.
- **FAQ** → fixed a broken IIFE (SyntaxError that stopped the whole script); answers now
  inject, stray "Frequently Asked Questions" row hidden, **accordion toggles** on click.
- **Feature tiles** ("Native Style" = scissors, "Fast Turnaround" = lightning) icons added.
- **Psychology-Driven** → placeholder image replaced with an editing-timeline image;
  play-button overlay removed (it's a still image).
- **Footer socials** → only X, Instagram, TikTok (YouTube + WhatsApp hidden).
- **Short-Form Repurposing service card** → removed entirely (`initRemoveShortForm()`).
- **Logo removed** from header and footer (`.framer-1b0m7h5-container`,
  `.framer-1gcn1uh-container` hidden).
- **Footer effect** → added red radial glow + accent divider line (was dull).
- **WhatsApp floating button** → nudged lower (bottom 52px).
- **VIEWPORT META FIX (big one)** → `index.html` line ~13 had a corrupted tag
  (`-->eta name="viewport"...`, missing `<m`), so **mobile rendered the desktop layout
  zoomed out**. Restored `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`.
  This is the fix for "mobile looks like a zoomed-out desktop site".

## In progress (last thing being worked on)

- **Nav / Book links smooth-scroll.** Links were `./#section` (forced a page reload).
  Rewrote to `#section` and added a **capture-phase click handler** in `initFixLinks()`
  that calls `preventDefault` + `scrollIntoView({behavior:'smooth'})`, because Framer's
  own JS calls `preventDefault` and blocks native anchor scrolling.
  **Not yet re-verified in browser** — needs a reload + click test on Work/Services/
  Process/About/Book Call to confirm they scroll to the right sections.

## Still open / not done

- **Mobile visual QA.** Could not render a true phone viewport in this environment
  (the automation browser was locked at 1280px). The viewport-meta fix + auto-fit grid
  should make mobile reflow correctly, but it needs a real device check.
  Reference target for mobile = creatorcut.framer.website (1 full-width video at a time).
- **Videos "not playing" on the user's phone** — most likely they were viewing the
  **old deployed build**. Needs redeploy (this push) + test over https. Confirm it plays
  on the live GitHub Pages URL.
- **Color Grading before/after slider** ("doesn't work") — reported earlier, not yet fixed.
- **Phone field icon** still uses the envelope (mail) icon in the Framer markup (cosmetic).

## Key selectors / functions (for next session)

- Portfolio grid: `.framer-m18xux` (cards are `.framer-m18xux > div > .pf-card`)
- Contact: `.framer-1s1nl7r`, info block `.framer-1q1vsss`
- FAQ items: `.framer-jVp2e`, answers injected as `.faq-answer`
- Footer: `footer.framer-axgd5s`
- Custom JS entry: `initAll()` at bottom of `index.html` calls initFAQ, initSlideshows,
  initPortfolio, initFeatureIcons, initPsychologyImage, initFixLinks, initRemoveShortForm.
