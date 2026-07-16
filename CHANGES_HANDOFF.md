# Fitoframe — Session Handoff

## This session: migrated all content from the live site + added ES/EN

The site was still the previous owner's video-agency template ("Muneeb Ur Rehman",
Next Gen Content, Upwork). It's now **Rodolfo Delgado's ("Fito") personal portfolio**,
matching <https://fitoframe.com>, in Spanish and English.

### Architecture change

Copy no longer lives in `index.html`. The old inline `<script>` was replaced by:

- **`content.js`** — all copy (ES + EN), video IDs, contact, socials. *Edit this.*
- **`app.js`** — maps that onto the Framer markup + language switching.

`app.js` indexes the template's original English strings and tags elements with
`data-i18n` keys, so switching language is just a text swap. See `STRUCTURE.md`.

### Content migrated from fitoframe.com

| Section | Now |
|---------|-----|
| Hero | Rodolfo Delgado — Editor de video / Videógrafo |
| About | "Un poco de mí" + the Gatorade/KFC/Cinepic/Sedal brands line |
| Skills | Software (DaVinci), Color, Efectos, Sonido |
| Videos | His 8 real YouTube Shorts, vertical 9:16, play inline |
| FAQ | His 4 real questions (PC specs, location, internet, camera gear) |
| Contact | xrodolfo94@gmail.com · +584242384933 · Caracas |
| Socials | Instagram / TikTok / X / LinkedIn — all @fitoframe |
| Footer | "Copyright Fitoframe© 2025. Designed by Hanzlahsfc" |
| Photos | `assets/fito-1..4.jpg` pulled from the live site |

### Removed (deliberately)

None of this exists on the live site, and none of it is true of Fito — it was the
template's invented agency marketing:

- Testimonials from named people (Vaibhav Suri, Shulin Chen, Josh Redic, …)
- The **$1900/month** pricing card
- Stats: "1B+ views", "500 videos delivered", "200+ creators"
- The 4-step process (Google Drive / Frame.io / "2 rounds of revisions")
- The **Calendly widget**, which was still booking into the previous owner's account
- Links to the previous owner's X / Instagram / Upwork, and a `wa.link` WhatsApp
  that resolved to their number

### Language switcher

ES | EN pill in the nav. Defaults to Spanish for Spanish-language browsers, English
otherwise; choice persists in `localStorage` (`fito-lang`) and sets `<html lang>`.
Injected into **every** nav (Framer renders one per breakpoint).

## Verified in-browser

- ES ⇄ EN swaps every string; persists across reload; both switchers stay in sync
- 8 Short cards render 9:16 (363×645) and play inline on click
- FAQ: 4 rows, answers inject, accordion toggles
- **Colour-grading before/after slider now works** (was an open bug — tracks 25%→75%,
  clip-path + handle + aria all update)
- Mobile @390px: 1 column, no horizontal overflow, switcher visible, hamburger works
- No broken images; no console errors
- Every visible outbound link is Fito's (or the designer credit)

## Still open

- **Screenshots couldn't be captured** in this environment (the renderer times out on
  this page), so verification was geometric/DOM-based rather than visual. Worth a real
  eyeball pass, especially the hero and skill cards.
- The old `index.html` markup still hardcodes `./muneeb.jpg` (404); `app.js` swaps it at
  runtime. Fine, but cleaner to fix the src directly.
- Unused legacy files still in the repo — see `STRUCTURE.md`.
- `graded.jpeg` / `ungraded.jpeg` (the colour-grading demo) are the previous build's
  sample frames, not Fito's. Swap for his own before/after if you want it fully his.
- Hidden-but-present: one Upwork anchor remains in the DOM (`display:none`).

## Gotchas worth knowing

- `hide()` **must** use `!important` — Framer's
  `[data-framer-component-type="RichTextContainer"] p.framer-text{display:block!important}`
  beats plain inline styles. This silently cost time.
- **Bump the `?v=` on the asset URLs in `index.html` when you edit CSS/JS.** A stale
  cached `content.js` is what made an earlier fix look like it wasn't applying — and is
  the likely cause of the old "videos don't play on my phone" report.
- Serve over http for YouTube: `python -m http.server 8765`.
