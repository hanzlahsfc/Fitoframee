# index.html — Structure Breakdown

This file is a single-page website. Here's how it's organized from top to bottom:

## `<head>` — CSS & Metadata (Lines 1-82)

| Section | Lines | What it is |
|---------|-------|------------|
| Meta tags | 6-31 | charset, viewport, title, description, OG tags |
| Font CSS | 33-77 | Inter and Satoshi font faces (loaded from Framer CDN) |
| Badge hide | 12 | `#__framer-badge-container{display:none}` |
| Breakpoint CSS | 79 | Responsive show/hide classes for 3 breakpoints |
| Framer CSS | 79 (cont'd) | 200KB+ of minified Framer-generated styles — **do not edit** |

## `<body>` — Visual Content (Lines 83-111, mostly inline)

The entire visible page is inside a **single compressed line** (starts at line 89). It contains:

```
div#main
  └── div.framer-gvib3 (page wrapper)
        ├── nav.framer-ujUI6 — Navigation bar (logo, links, Book a Call)
        ├── section 1 — Hero section (title, subtitle, CTA buttons)
        ├── section 2 — Stats bar (4+ years, 99% happy, 200+ creators)
        ├── section 3 — About section
        ├── section 4 — Portfolio/Work section
        │     └── framer-slideshow (x3) — Video carousels with dot nav
        ├── section 5 — Testimonials (4 client cards)
        ├── section 6 — Pricing card
        ├── section 7 — FAQ accordion (5 items, answers empty — injected by JS)
        └── section 8 — Contact (email, phone, social icons)
  ├── div.framer-whatsapp-container — WhatsApp social icon
  ├── a (floating WhatsApp button) — Green circle, bottom-right
  └── footer.framer-axgd5s — Logo, copyright
```

### How to edit content

**Portfolio videos** — Search for `framer-slideshow`. Inside each `<li>`, find:
```html
<video src="https://..." poster="..." ...></video>
```
Replace `src` with your video URL.

**FAQ questions** — Search for `framer-jVp2e`. Each one has a question inside `framer-1jye8hs`. Answers are injected via JS (see below).

**Social links** — Search for these URLs and replace:
- `https://x.com/home` → your X profile
- `https://www.instagram.com/` → your Instagram
- `https://www.youtube.com/` → your YouTube
- `https://www.tiktok.com/en/` → your TikTok
- `https://wa.me/92330195488` → your WhatsApp

## `<body>` — Scripts (Lines 112-255)

| Lines | What it is | Can I remove it? |
|-------|------------|------------------|
| 112-113 | Framer URL parameter preserver | **Yes** — safe to remove |
| 115 | `#__framer-badge-container` | Hidden by CSS, **safe to remove** |
| 116 | Framer animator library (spring physics) | Keep — powers scroll animations |
| 117 | Appear animation JSON config | Keep — works with animator |
| 118 | Appear animation loader | Keep — triggers scroll animations |
| 119 | `NODE_ENV=production` shim | Safe to remove |
| 120 | Framer modulepreload links | Inert (no loader script), safe to remove |
| 120-131 | SVG icon templates | **Keep** — used by `<use href="#svg-id">` throughout |
| **132-255** | **Custom JS — FAQ + Slideshow** | **OUR CODE — edit freely** |

## Custom Script (Lines 132-255)

### `faqData` (Lines 135-139)
Object mapping question text → answer text. **Edit answers here.**

### `initFAQ()` (Lines 141-178)
Finds all `.framer-jVp2e` accordion items, injects answers, adds click toggles.

### `initSlideshows()` (Lines 180-243)
Finds all `.framer-slideshow` elements, enables dot/arrow navigation.

## Summary

```
HEAD ──── meta ª fonts ª Framer CSS (200KB) ──── DO NOT TOUCH
BODY ──── compressed Framer SSR HTML ──── edit videos/social links here
          ª framer-slideshow (portfolio videos)
          ª framer-jVp2e (FAQ accordion questions)
          ª social link URLs
SCRIPTS ─ framer animator (keep for animations)
          ª appear animation loader (keep for scroll effects)
          └── OUR CUSTOM JS (FAQ + slideshow logic)
```
