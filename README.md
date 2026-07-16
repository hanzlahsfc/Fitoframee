# Fitoframe — Rodolfo Delgado Portfolio

Personal portfolio for **Rodolfo Delgado ("Fito")** — video editor and videographer,
based in Caracas, Venezuela.

All content mirrors the live WordPress site at <https://fitoframe.com>, rebuilt on a
Framer design export, with an added **Spanish / English switcher**.

## Tech Stack

- **HTML** — `index.html`, a Framer SSR export (markup + ~200KB of generated CSS)
- **CSS** — `custom-styles.css`, our overrides on top of Framer's
- **JS** — `content.js` (all copy) + `app.js` (behaviour)

## How it works

The Framer export has minified, meaningless class names (`.framer-m18xux`), so the
markup can't be hand-edited safely. Instead:

1. `app.js` **indexes** the template's original English strings on load and tags each
   element with a content key (`data-i18n="hero.role"`).
2. Switching language just re-reads `content.js` and swaps `textContent`.

This means **you never edit `index.html` to change copy** — you edit `content.js`.

## Editing Guide

### Text (both languages)

Everything is in **`content.js`**, under `FITO.t.es` and `FITO.t.en`:

```js
'hero.role': 'Editor de video / Videógrafo',   // in t.es
'hero.role': 'Video Editor / Videographer',    // in t.en
```

Keys are shared, so both languages must define the same key.

### Videos

`FITO.videos` in `content.js` — an array of YouTube Short IDs, shown in order:

```js
videos: ['1VqphvdhG0k', 'BaiPzLLSxzo', ...]
```

Cards are vertical 9:16 and play inline on click.

### Contact / socials

`FITO.contact` and `FITO.social` in `content.js`.

### Photos

In `assets/`, pulled from the live site:

| File | What it is | Used for |
|------|-----------|----------|
| `fito-1.jpg` | Sony FX30 body | Software skill card |
| `fito-2.jpg` | Fito with camera at sunset | Profile / OG image |
| `fito-3.jpg` | Sony ZV-E10 REC button | Effects skill card |
| `fito-4.jpg` | Shooting on location | Sound + Extras cards |
| `fito-logo.png` | Site logo | (unused — logo is hidden) |

Mapped in `initImages()` in `app.js`.

### Adding a new language

1. Add a third block to `FITO.t` (e.g. `pt: { ... }`) with the same keys.
2. Add a button to `buildSwitcher()` in `app.js`.

## Local preview

YouTube embeds need http(s) — opening `index.html` via `file://` fails:

```
python -m http.server 8765
```

then <http://localhost:8765/index.html>. Hard-refresh (Ctrl+Shift+R) after editing
CSS/JS, or bump the `?v=` on the asset URLs in `index.html`.

## Deployment

Hosted on **GitHub Pages** — push to `master` to deploy.

The `?v=N` query on `custom-styles.css` / `content.js` / `app.js` in `index.html` is a
cache-buster. **Bump it when you change those files**, otherwise returning visitors
(especially on phones) keep the old cached build.

## License

All rights reserved. Design originally from Framer.
