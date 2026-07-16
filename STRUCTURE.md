# Project Structure

## Files

| File | Role | Edit? |
|------|------|-------|
| `index.html` | Framer SSR export: markup + ~200KB generated CSS | **Avoid** — only `<head>`/meta |
| `content.js` | **All site copy (ES + EN), videos, contact, socials** | **Yes — start here** |
| `app.js` | Maps `content.js` onto the markup; language switch; behaviour | Yes |
| `custom-styles.css` | Overrides on top of Framer's CSS | Yes |
| `assets/` | Fito's photos from the live site | — |

Legacy files from the previous owner's build (`profile.jpg`, `pfp-fitoframe.png`,
`vaibhav-suri.jpeg`, `shulin-chen.jpeg`, `josh-redic.jpeg`, `hamza-khan.jpeg`,
`allen-lee.jpeg`, `index.html.backup`, `fetched.html`, `numbers_section.txt`,
`find_images.py`) are no longer referenced by the rendered page.

## `index.html` layout

```
<head>   meta / title / OG  ── safe to edit
         custom-styles.css?v=2
         Framer font + design CSS (200KB) ── DO NOT TOUCH
<body>   #main > .framer-gvib3
           ├── nav (x2 — one per breakpoint: "desktop", "mobile-close")
           ├── section  Hero        → name, role, bio, brands line
           ├── section  Stats       → HIDDEN (invented numbers)
           ├── section  Services    → repurposed as SKILLS (4 cards)
           ├── section  Work        → the 8 YouTube Shorts
           ├── section  Why Me      → repurposed as EXTRAS
           ├── section  Process     → HIDDEN (invented workflow)
           ├── section  Testimonials→ HIDDEN (invented people)
           ├── section  Pricing     → HIDDEN (invented $1900 plan)
           ├── section  Contact     → email / phone / socials
           ├── section  FAQ         → Fito's 4 real questions
           └── footer               → credit line + socials
         SVG icon templates (used via <use href="#id">) ── keep
         content.js?v=2
         app.js?v=2
```

## How content gets in

The export's class names are minified, so `app.js` matches on the **template's original
English text** instead:

```js
['Video Agency', 'hero.role']            // exact match
[{ p: 'Fitoframe is a video agency' }, 'hero.bio']   // prefix match (long paragraphs)
```

`indexContent()` tags the deepest matching element with `data-i18n="hero.role"`;
`applyText()` then swaps `textContent` on every tagged element for the active language.
Language choice persists in `localStorage` under `fito-lang`.

## `app.js` functions

| Function | Does |
|----------|------|
| `indexContent()` | Tags elements with `data-i18n` keys |
| `applyText()` | Writes the active language into tagged elements |
| `initStripTemplate()` | Hides testimonials / pricing / stats / process / Calendly |
| `initBrandsLine()` | Injects the "Gatorade, KFC…" line under the hero bio |
| `initPortfolio()` | Renders the 8 Shorts; click plays inline |
| `initFAQ()` | Maps the 4 accordion rows to Fito's Q&As; toggling |
| `initContact()` | Real email / phone |
| `initSocials()` | Rebuilds contact + footer social rows |
| `initLegacyLinks()` | Repoints anything left aimed at the previous owner |
| `initImages()` | Fito's photos onto profile + skill cards |
| `initFooter()` | "Copyright Fitoframe© 2025. Designed by Hanzlahsfc" |
| `initLangSwitcher()` | Inserts the ES/EN toggle into **every** nav |
| `initColorSlider()` | Before/after grading slider |
| `initMobileMenu()` | Hamburger menu |
| `initFixLinks()` | Smooth-scroll (Framer blocks native anchors) |

## Gotchas

- **`hide()` must use `!important`.** Framer ships
  `[data-framer-component-type="RichTextContainer"] p.framer-text { display: block !important }`,
  which silently beats a plain inline `display:none`.
- **Framer renders one nav per breakpoint.** Anything injected into "the nav" must go
  into *all* of them, or it vanishes on mobile.
- **Framer duplicates link labels** for its hover effect — nav text reads
  `"ProcessProcess"`. Match on `href`, not text.
- **Cards need `data-type="short"`.** Without it, `custom-styles.css` treats a card as
  long-form and forces it to 16:9 full-row.
- **Bump `?v=` when editing CSS/JS**, or browsers serve the stale build.
