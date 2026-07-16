# Muneeb - Video Editor Portfolio

A professional video editor portfolio website showcasing client work, testimonials, and editing services. Built from a Framer design export with custom interactivity.

## Tech Stack

- **HTML** — Single self-contained file (Framer SSR output + custom scripts)
- **CSS** — Inline Framer-generated styles (200KB+ of design system)
- **JavaScript** — Custom inline scripts for interactivity

## Features

- Portfolio video slideshow with dot/arrow navigation
- FAQ accordion with toggle functionality
- Responsive design (desktop, tablet, mobile)
- WhatsApp floating button
- Social media links (X, Instagram, YouTube, TikTok, WhatsApp)
- Scroll-triggered appear animations
- Contact section with email and phone

## Editing Guide

### FAQ Answers

Open `index.html` and find the `faqData` object. Edit the answers:

```js
var faqData = {
    "What is your typical turnaround time?": "Your answer here",
    "Do you offer revisions?": "Your answer here",
    // ...
};
```

### Portfolio Videos

Search for `<section class="framer-slideshow">` in `index.html`. Inside each `<li>`, find the `<video>` tag and replace the `src` attribute with your video URL.

### Social Links

Search for `href="https://x.com/home"`, `href="https://www.instagram.com/"`, etc., and replace with your profile URLs.

### Phone / Email

- Email: `urrehmanaqeeb2008@gmail.com`
- Phone: `+92 330 195488`
- WhatsApp: `wa.me/92330195488`

Search for these in the file to update.

## Deployment

The site is hosted on **GitHub Pages**. Push to the `master` branch to auto-deploy.

Live URL: `https://hanzlahsfc.github.io/Muneeb-Video-Editing-Portfolio-Website`

## License

All rights reserved. Design originally from Framer.
