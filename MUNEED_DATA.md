# Muneeb - Video Editor Portfolio: Complete Site Data

> Copy this file into a new session to restore context.

---

## Project Info

- **Live URL:** https://hanzlahsfc.github.io/Muneeb-Video-Editing-Portfolio-Website
- **Tech:** Single Framer-generated `index.html` + custom inline JS/CSS
- **Site title:** Muneeb - Video Editor
- **Description:** Focused on crafting polished video edits that blend storytelling, pacing, and cinematic polish to help brands connect better with their audiences.
- **Published:** Apr 17, 2026, 4:34 AM UTC
- **Repo location:** `C:\Users\Hanzlahsfc\Desktop\Muneeb-Video-Editing-Portfolio-Website`
- **Key files:** `index.html`, `pfp-muneeb.png`, `STRUCTURE.md`, `README.md`

---

## Site Sections (top to bottom)

1. **Nav** — Logo "Muneeb", links (Work, Services, Process, About), "Book a Call" CTA
2. **Hero** — Needs fixing to match creatorcut.framer.website style. Currently has:
   - Heading, subtitle
   - Two CTAs: "View Work" (`#work`) and "Get In Touch" (`#contact-us`)
   - Counter: "Creators Worked With" + scrolling avatar strip (8 creators)
3. **Stats** — "Numbers that speak volumes":
   - 500+ Videos Delivered
   - 4+ Years Editing Experience
   - 99% Happy Client
   - 200+ Creators Supported
4. **Testimonials** — "Trusted by Creators." (4 client cards)
5. **Pricing** — "Simple Pricing." @ $1900/month, "Full-Service Editing", "3 spots left."
6. **FAQ** — "Frequently Asked Questions." (4 questions with toggle)
7. **Contact** — "Book a Call" with email, phone, social icons
8. **Footer** — Logo, tagline, nav links, social icons, "© 2026 Hanzlah All rights reserved."

---

## Hero Section (needs fix)

**Target design:** https://creatorcut.framer.website/

**Current hero content:**
- Heading (needs to be "Editing That Grows Channels.")
- Subtitle
- Two CTA buttons: "View Work" (`#work`), "Get In Touch" (`#contact-us`)
- Counter area: "Creators Worked With" + scrolling logo strip + stats numbers
- Profile image: `pfp-muneeb.png` (local file — must keep)

**What the original hero had:**
- "Editing That Grows Channels." heading
- Two CTAs: "View Work", "See Pricing"
- "+95 Worked with 100+ Creators" counter

---

## Profile Image

- **File:** `pfp-muneeb.png`
- **Location:** project root
- **Usage:** Must be referenced in hero section (added in commit 7f4c967)

---

## FAQ Data

```js
var faqAnswers = {
  "What is your typical turnaround time?": "Most edits are delivered within 24-48 hours depending on complexity. Rush delivery options are also available for urgent projects.",
  "Do you offer revisions?": "Yes, each project includes up to 2 rounds of revisions to ensure you're fully satisfied with the final result.",
  "Can you match my existing editing style?": "Absolutely. I study your previous content and adapt to your style, pacing, and branding so every video feels consistent with your channel.",
  "What do you need from me to start?": "Just your raw footage, any reference videos for style, and a brief outline of what you need. I'll handle the rest from there."
};
```

---

## Social Links

| Platform | URL |
|----------|-----|
| X (Twitter) | `https://x.com/home` |
| Instagram | `https://www.instagram.com/` |
| YouTube | `https://www.youtube.com/` |
| TikTok | `https://www.tiktok.com/en/` |
| WhatsApp (contact section) | `https://wa.link/r5avra` |
| WhatsApp (floating button) | `https://wa.link/r5avra` |

---

## Contact Info

- **Email:** `urrehmanaqeeb2008@gmail.com`
- **Phone:** `+92 330 195488`
- **WhatsApp:** `+92 330 195488` (wa.me/92330195488)

---

## Testimonials (4 clients)

| Name | Quote |
|------|-------|
| Daniel Brooks | "Working together has made content production much easier, with clean, well-paced edits always delivered on time." |
| Maya Rodriguez | "The attention to detail - from sound to motion graphics - makes every video feel polished and professional." |
| Sophie Turner | "The edits strike a great balance between creativity and professionalism while keeping the content refined." |
| Olivia Bennett | "I appreciate how the edits balance creativity and professionalism while keeping everything clean and refined." |

---

## Pricing

- **Plan:** Full-Service Editing
- **Price:** $1900/month
- **Tagline:** Creators who publish consistently
- **Badge:** "3 spots left."
- **CTA:** Get Started
- **Includes:** YouTube long-form video editing, Short-form clips, Professional color grading, Sound design/audio cleanup, Motion graphics/captions, Structured monthly workflow, Revisions included

---

## Stats / Numbers

| Metric | Value |
|--------|-------|
| Videos Delivered | 500+ |
| Years Experience | 4+ |
| Happy Clients | 99% |
| Creators Supported | 200+ |

---

## Creator Avatars (logo strip)

8 creator profile images from Framer CDN:
1. `https://framerusercontent.com/images/r4NORWATHNdM6j7KzESX91YMd4.png`
2. `https://framerusercontent.com/images/RciwbIu3xaQpk6PqvsHIJwovi3k.jpg`
3. `https://framerusercontent.com/images/4R7HUMP3WUGx8mrykN4wq0PhGo.jpg`
4. `https://framerusercontent.com/images/5mGg7NqPrAGWOtKSjbOl4HoY4dU.png`
5. `https://framerusercontent.com/images/NOW52RmX1jhbb9U7PGnr7uclrW0.jpg`
6. `https://framerusercontent.com/images/2FAop6mJBiMfhWt3ijR3jzDkb6E.jpg`
7. `https://framerusercontent.com/images/WKuRGA75ljI5gZcs05gwFXomkss.png`

---

## Git History

```
f206917 Fix portrait CSS - override inline height with auto so aspect-ratio works
26d5a1a Fix short-form cards to portrait 9:16, adjust WhatsApp position lower
747e669 Fix slideshow pagination, replace short-form images with TikTok-themed content, move WhatsApp button up
b388a34 Fix: WhatsApp icon in Follow Me On, FAQ overflow, replace cards with static images, add videos to Psychology section
7f4c967 Replace Framer CDN videos with client content and add Muneeb pfp
4b81477 Fix WhatsApp link, overhaul FAQ accordion with CSS toggle, improve slideshow
64f6ae7 Add package.json for Hostinger
baf6e70 Add STRUCTURE.md with full HTML breakdown for easy editing
9ff1da3 Add professional README.md with editing guide
1203a11 Initial commit - Muneeb Video Editor portfolio site
```

**All commits are on `main` branch. No other branches exist.**

---

## Pending Work / Next Steps

1. **Fix hero section layout** — match creatorcut.framer.website style with:
   - "Editing That Grows Channels." heading
   - Two CTAs ("View Work", "See Pricing")
   - Counter ("+95 Worked with 100+ Creators")
   - Keep `pfp-muneeb.png` image
2. **Fix video grid layout** — match creatorcut.framer.website reference
3. **Old hero had:** "Editing That Grows Channels." heading, "View Work" + "See Pricing" buttons, "+95 Worked with 100+ Creators" counter

---

## HTML Structure Notes

- File is 250 lines, single compressed line for body content (starts ~line 89)
- Framer-generated CSS in `<head>` (200KB+) — **do not edit**
- Custom JS at line 150-231: `faqAnswers`, `initFAQ()`, `initSlideshows()`
- Slideshows use class `.framer-slideshow` with dot/arrow nav
- FAQ items use class `.framer-jVp2e` with data-framer-name="open"/"close"
- WhatsApp floating button at line 123
- Footer starts at line ~128

---

## Key CSS Selectors

| Purpose | Selector |
|---------|----------|
| FAQ items | `.framer-jVp2e` |
| Slideshow wrapper | `.framer-slideshow` |
| FAQ question text | `.framer-1jye8hs` |
| FAQ answer container | `.framer-149t9qt-container` |
| Slideshow dots | `[aria-label="Slideshow pagination controls"]` |
| Floating WhatsApp | `.wa-floating-btn` |
| WhatsApp in Follow Me | `.framer-6ysf0r-whatsapp` |
