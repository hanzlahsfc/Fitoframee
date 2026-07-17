/* ==========================================================================
   app.js — maps content.js onto the Framer export, and drives the ES/EN switch.
   --------------------------------------------------------------------------
   The page is a Framer SSR export: class names are minified and the markup
   can't be hand-edited safely. So instead of rewriting the HTML, we index the
   template's original English strings once on load, tag each element with the
   content key it corresponds to, and then swap text on language change.

   Copy lives in content.js. Structural/behavioural code lives here.
   ========================================================================== */
(function () {
  'use strict';

  var FITO = window.FITO;
  if (!FITO) return;

  var LANG_KEY = 'fito-lang';
  var lang = 'es';

  /* ---------------------------------------------------------------------
     Template string -> content key.
     Long paragraphs are matched by prefix ({p: '...'}) because the export
     contains curly quotes and em dashes that are easy to get wrong.
     --------------------------------------------------------------------- */
  var MAP = [
    /* nav */
    ['Work', 'nav.videos'],
    ['Services', 'nav.skills'],
    ['About', 'nav.about'],
    ['About Me', 'nav.about'],
    ['Book Call', 'nav.contact'],
    /* The per-skill-card CTA. Given its own key so initStripTemplate can drop
       it — four identical "Contact me" buttons down the skills list is noise,
       and the live site has no CTA there. */
    ['Book Edit', 'skills.cta'],

    /* hero — the template's big H1 is "Video Agency" and the small pill above
       it is "Fitoframe Portfolio", so the name goes on the H1, not the pill. */
    ['Video Agency', 'hero.name'],
    ['Fitoframe Portfolio', 'hero.role'],
    [{ p: 'Fitoframe is a video agency' }, 'hero.bio'],
    [{ p: 'I’m Muneeb Ur Rehman' }, 'hero.bio'],
    [{ p: "I'm Muneeb Ur Rehman" }, 'hero.bio'],
    ['View Work', 'hero.cta1'],
    ['Book a Call', 'hero.cta2'],
    ['Book A 15-min Call', 'nav.contact'],

    /* skills (template's "Services") */
    ['Our best Services', 'skills.kicker'],
    ['Everything you need to scale your content', 'skills.title'],
    ['YouTube Long-Form Editing', 'skill.1.t'],
    [{ p: 'Professional long-form video editing' }, 'skill.1.d'],
    ['Color Grading', 'skill.2.t'],
    [{ p: 'Professional color correction' }, 'skill.2.d'],
    ['Thumbnail Design', 'skill.3.t'],
    [{ p: 'Custom YouTube thumbnail design' }, 'skill.3.d'],
    ['Short-Form Repurposing', 'skill.4.t'],
    [{ p: 'We turn long-form content' }, 'skill.4.d'],

    /* colour-grading demo */
    ['Before', 'grading.before'],
    ['After', 'grading.after'],

    /* work */
    ['Projects', 'work.kicker'],
    ['Selected Editing Work', 'work.title'],
    [{ p: 'A showcase of visual styles and creative editing' }, 'work.sub'],

    /* process — 'Process' also matches the nav/footer links, which is what we
       want: they should read "Proceso" too. The template's sub-heading here is
       a copy-paste of the work section's and says nothing about a process, so
       it gets real copy instead. */
    ['Process', 'process.kicker'],
    ['From Raw File to Render.', 'process.title'],
    [{ p: 'A showcase of visual styles, pacing, and creative editing' }, 'process.sub'],
    ['Content received', 'process.1.t'],
    [{ p: 'Drop your footage in our shared' }, 'process.1.d'],
    ['Edit & Flow', 'process.2.t'],
    [{ p: 'I apply pacing, sound design' }, 'process.2.d'],
    ['Revisions', 'process.3.t'],
    [{ p: 'You get 2 rounds of revisions' }, 'process.3.d'],
    ['Delivery & Reuse', 'process.4.t'],
    [{ p: 'High-resolution files built for impact' }, 'process.4.d'],

    /* extras (template's "Why Me") */
    ['Why Me', 'extras.kicker'],
    ['More than just "cutting" footage.', 'extras.title'],
    [{ p: 'Every frame is shaped with intention' }, 'extras.sub'],
    ['Retention Based Edit', 'extras.1.t'],
    [{ p: 'Your content should flow so naturally' }, 'extras.1.d'],
    ['Revisions Until Satisfied', 'extras.2.t'],
    [{ p: 'I know the difference between a YouTube' }, 'extras.2.d'],
    ['Fast Turnaround', 'extras.3.t'],
    [{ p: '48-72 hour delivery' }, 'extras.3.d'],

    /* contact */
    ['Get In Touch', 'contact.kicker'],
    ['Contact Us', 'contact.title'],
    [{ p: 'Schedule a quick call' }, 'contact.sub'],
    ['Email', 'contact.email'],
    ['Phone', 'contact.phone'],
    ['Follow Me On', 'contact.social'],

    /* faq */
    ['FAQ', 'faq.kicker'],
    ['Frequently Asked Questions.', 'faq.title'],
    [{ p: 'Common questions about our editing process' }, 'faq.sub'],

    /* footer */
    [{ p: 'Professional video editing for YouTube creators' }, 'footer.tagline']
  ];

  function t(key) {
    var dict = FITO.t[lang] || FITO.t.es;
    return dict[key] != null ? dict[key] : (FITO.t.es[key] || '');
  }

  /* Framer's stylesheet carries rules like
       [data-framer-component-type="RichTextContainer"] p.framer-text { display: block !important }
     which beat a plain inline style. Anything we hide has to be !important too,
     or it silently stays on screen. */
  function hide(el) {
    if (el) el.style.setProperty('display', 'none', 'important');
  }

  /* ---------------------------------------------------------------------
     Indexing: tag the deepest element holding each template string.
     --------------------------------------------------------------------- */
  var SEL = 'p, h1, h2, h3, h4, h5, h6, span, a, li, button, div';

  function tagMatches(matcher, key) {
    var all = document.querySelectorAll(SEL);
    var hits = [];
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (el.hasAttribute('data-i18n')) continue;
      /* The before/after grading slider is a self-contained Framer component
         whose internal caption also reads "Fitoframe Portfolio". Indexing it
         would stamp the hero's text inside the slider. Leave it alone. */
      if (el.closest('.framer-1gsef12-container')) continue;
      var text = (el.textContent || '').trim();
      if (!text) continue;
      var ok = typeof matcher === 'string'
        ? text === matcher
        : text.indexOf(matcher.p) === 0;
      if (ok) hits.push(el);
    }
    /* Keep only the deepest hits — a match on <p> also matches its wrappers. */
    for (var j = 0; j < hits.length; j++) {
      var el2 = hits[j];
      var isDeepest = true;
      for (var k = 0; k < hits.length; k++) {
        if (hits[k] !== el2 && el2.contains(hits[k])) { isDeepest = false; break; }
      }
      if (isDeepest) el2.setAttribute('data-i18n', key);
    }
  }

  function indexContent() {
    for (var i = 0; i < MAP.length; i++) tagMatches(MAP[i][0], MAP[i][1]);
  }

  function applyText() {
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute('data-i18n');
      var val = t(key);
      if (val) els[i].textContent = val;
    }
  }

  /* ---------------------------------------------------------------------
     Remove everything that isn't Fito's.
     The template ships an agency's invented testimonials, a $1900 pricing
     card, "1B+ views" stats and a Calendly booking widget still pointed at
     the previous owner's account. None of it exists on fitoframe.com, and
     none of it is true of Fito — so it goes.
     --------------------------------------------------------------------- */
  /* Hide the whole <section> that owns a given heading. Framer wraps each
     block in its own <section>, so that's the reliable unit to remove. */
  function hideSection(re) {
    var nodes = document.querySelectorAll('h1, h2, h3, h4, p, span');
    var done = false;
    for (var i = 0; i < nodes.length; i++) {
      if (!re.test((nodes[i].textContent || '').trim())) continue;
      var section = nodes[i].closest('section');
      if (section) { hide(section); done = true; }
    }
    return done;
  }

  function initStripTemplate() {
    hideSection(/^Testimonials$/);
    hideSection(/^Trusted by Creators\.$/);
    hideSection(/^Pricing$/);
    hideSection(/^Simple Pricing\.$/);
    hideSection(/^Numbers that speak volumes$/);
    hideSection(/^Creators Worked With$/);

    /* Stats bar, plus the hero's fake social-proof row (.framer-13tth74) —
       5 star icons, 3 stock avatars, "+95" and "1B+ Views Generated". It's one
       element holding the whole row. Matching its text doesn't work: the nodes
       concatenate to "+951B+ Views Generated", never an exact "+95". */
    ['.framer-ntw2a8', '.framer-p47fhg', '.framer-13tth74'].forEach(function (sel) {
      var els = document.querySelectorAll(sel);
      for (var i = 0; i < els.length; i++) hide(els[i]);
    });

    /* Per-card "Book Edit" CTAs in the skills list. */
    var skillCtas = document.querySelectorAll('[data-i18n="skills.cta"]');
    for (var c = 0; c < skillCtas.length; c++) hide(skillCtas[c].closest('a') || skillCtas[c]);

    /* The hero's status pill ("• Video Editor / Videographer"). The role still
       lives in <title> and the OG tags. */
    var roleBadges = document.querySelectorAll('[data-i18n="hero.role"]');
    for (var rb = 0; rb < roleBadges.length; rb++) {
      hide(roleBadges[rb].closest('.framer-10n4a2-container') || roleBadges[rb]);
    }

    var nodes = document.querySelectorAll('p, span, div');
    for (var i = 0; i < nodes.length; i++) {
      var txt = (nodes[i].textContent || '').trim();
      if (/^(\+95|1B\+ Views Generated)$/.test(txt)) {
        hide(nodes[i].closest('[data-framer-name]') || nodes[i]);
      }
    }

    /* Calendly widget — previous owner's booking account. */
    var cal = document.querySelector('.calendly-inline-widget');
    if (cal) {
      var wrap = cal.parentElement;
      hide(wrap && wrap.children.length === 1 ? wrap : cal);
    }

  }

  /* ---------------------------------------------------------------------
     Hero: make the ROLE the big title and drop the name smaller beneath it.
     Client's call — he wanted "Editor de video" as the headline (and it was
     invisible anyway, since the old role pill got hidden). The big <h1> that
     held the name is repurposed to the role key; a smaller name line is
     injected right under it. Must run AFTER initStripTemplate, which hides
     everything tagged hero.role — we retag the h1 here so it survives.
     --------------------------------------------------------------------- */
  function initHeroLayout() {
    var titles = document.querySelectorAll('h1[data-i18n="hero.name"], [data-i18n="hero.name"]');
    for (var i = 0; i < titles.length; i++) {
      var el = titles[i];
      if (el.tagName !== 'H1') continue;              // only the big heading(s)
      if (el.parentNode.querySelector('.fito-hero-name')) continue;

      el.setAttribute('data-i18n', 'hero.role');
      el.textContent = t('hero.role');
      el.classList.add('fito-hero-title');

      var name = document.createElement('div');
      name.className = 'fito-hero-name';
      name.setAttribute('data-i18n', 'hero.name');
      name.textContent = t('hero.name');
      el.parentNode.insertBefore(name, el.nextSibling);
    }
  }

  /* ---------------------------------------------------------------------
     The live site's "brands I've worked with" line has no equivalent slot in
     the template, so add it directly beneath the hero bio. There are two bio
     nodes (desktop + mobile breakpoint variants); each gets its own copy.
     --------------------------------------------------------------------- */
  function initBrandsLine() {
    var bios = document.querySelectorAll('[data-i18n="hero.bio"]');
    for (var i = 0; i < bios.length; i++) {
      var bio = bios[i];
      if (bio.parentElement && bio.parentElement.querySelector('.fito-brands')) continue;
      var p = document.createElement('p');
      p.className = 'fito-brands framer-text';
      p.setAttribute('data-i18n', 'about.brands');
      p.textContent = t('about.brands');
      bio.parentNode.insertBefore(p, bio.nextSibling);
    }
  }

  /* ---------------------------------------------------------------------
     Videos — the 8 real Shorts from fitoframe.com.
     --------------------------------------------------------------------- */
  function initPortfolio() {
    var wrap = document.querySelector('.framer-m18xux > div');
    if (!wrap) return;

    /* Layout comes from custom-styles.css: .framer-m18xux is the grid, this
       wrapper is display:contents, and `.pf-card[data-type="short"]` is the
       9:16 frame. Everything Fito publishes is a vertical Short, so every card
       carries data-type="short" — without it the stylesheet treats a card as
       long-form and forces it to 16:9 full-row.

       The card is a facade of a YouTube embed's unstarted state — channel
       avatar + title header and the red play button — so it matches the live
       site without paying for 8 real iframes on load. Clicking swaps in the
       actual embed. */
    var ytPlay =
      '<svg class="pf-yt" viewBox="0 0 68 48" aria-hidden="true">' +
        '<path class="pf-yt-bg" d="M66.52 7.74a8.6 8.6 0 0 0-6.05-6.08C55.08.24 34 .24 34 .24s-21.08 0-26.47 1.42a8.6 8.6 0 0 0-6.05 6.08A89.7 89.7 0 0 0 .06 24a89.7 89.7 0 0 0 1.42 16.26 8.6 8.6 0 0 0 6.05 6.08C12.92 47.76 34 47.76 34 47.76s21.08 0 26.47-1.42a8.6 8.6 0 0 0 6.05-6.08A89.7 89.7 0 0 0 67.94 24a89.7 89.7 0 0 0-1.42-16.26z"/>' +
        '<path d="M45 24 27 14v20z" fill="#fff"/>' +
      '</svg>';

    function esc(s) {
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    var html = '';
    for (var i = 0; i < FITO.videos.length; i++) {
      var v = FITO.videos[i];
      html +=
        '<div class="pf-card" data-type="short" data-id="' + v.id + '">' +
          '<img class="pf-thumb" src="https://i.ytimg.com/vi/' + v.id + '/oardefault.jpg" alt="' + esc(v.title) + '" loading="lazy" ' +
               'onerror="this.onerror=null;this.src=\'https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg\'">' +
          '<div class="pf-head">' +
            '<img class="pf-avatar" src="./assets/fito-2.jpg" alt="">' +
            '<span class="pf-meta">' +
              '<span class="pf-title">' + esc(v.title) + '</span>' +
              '<span class="pf-channel">' + esc(FITO.channel) + '</span>' +
            '</span>' +
          '</div>' +
          '<button class="pf-play" type="button" aria-label="Play: ' + esc(v.title) + '">' + ytPlay + '</button>' +
        '</div>';
    }

    /* Featured landscape piece: a full-row 16:9 card below the shorts.
       data-type="landscape" opts it out of the 9:16 short frame. */
    if (FITO.featured) {
      var f = FITO.featured;
      html +=
        '<div class="pf-card pf-featured" data-type="landscape" data-id="' + f.id + '">' +
          '<img class="pf-thumb" src="https://i.ytimg.com/vi/' + f.id + '/maxresdefault.jpg" alt="' + esc(f.title) + '" loading="lazy" ' +
               'onerror="this.onerror=null;this.src=\'https://i.ytimg.com/vi/' + f.id + '/hqdefault.jpg\'">' +
          '<div class="pf-head">' +
            '<img class="pf-avatar" src="./assets/fito-2.jpg" alt="">' +
            '<span class="pf-meta">' +
              '<span class="pf-title">' + esc(f.title) + '</span>' +
              '<span class="pf-channel">' + esc(FITO.channel) + '</span>' +
            '</span>' +
          '</div>' +
          '<button class="pf-play" type="button" aria-label="Play: ' + esc(f.title) + '">' + ytPlay + '</button>' +
        '</div>';
    }

    wrap.innerHTML = html;

    var cards = wrap.querySelectorAll('.pf-card');
    for (var c = 0; c < cards.length; c++) {
      cards[c].addEventListener('click', function () {
        if (this.querySelector('iframe')) return;
        var id = this.getAttribute('data-id');
        var landscape = this.getAttribute('data-type') === 'landscape';
        this.innerHTML =
          '<iframe src="https://www.youtube.com/embed/' + id + '?autoplay=1&playsinline=1" ' +
                  'allow="autoplay; encrypted-media" allowfullscreen title="' +
                  (landscape ? 'YouTube video' : 'YouTube Short') + '"></iframe>';
      });
    }

    /* The template's All / Short Form / Long Form filter bar — everything on
       the live site is one flat list of Shorts, so there's nothing to filter. */
    var bar = document.querySelector('.framer-103g85l');
    hide(bar);
  }

  /* ---------------------------------------------------------------------
     Skills — rebuilt as the live site's icon list on a timeline.
     The template shipped four huge alternating image/text blocks, which meant
     pairing one-line skills ("I work with DaVinci Studio") with a stock photo
     of a camera — irrelevant, and 2100px tall for four short lines. This is a
     compact list with icons that draws itself in as you scroll.
     --------------------------------------------------------------------- */
  var SKILL_ICONS = {
    software: '<path d="M7 18a4.5 4.5 0 0 1-.9-8.9 6 6 0 0 1 11.6-1.6A4.75 4.75 0 0 1 18 18"/><path d="M12 21V11m0 0-3 3m3-3 3 3"/>',
    color:    '<path d="M15.5 3.5a2.12 2.12 0 0 1 3 3L9 16l-4 1 1-4z"/><path d="M13 6l5 5"/><path d="M5 21h14"/>',
    fx:       '<rect x="3" y="3" width="13" height="13" rx="2"/><path d="M8 21h11a2 2 0 0 0 2-2V8"/><path d="M7 9.5h5M7 12.5h3"/>',
    sound:    '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>',
    extras:   '<circle cx="12" cy="9" r="5.5"/><path d="M8.2 13.4 7 22l5-2.6L17 22l-1.2-8.6"/>'
  };

  /* Drag/keyboard handling for the colour-grading before/after wipe.
     Position is a single --pos custom property; CSS clips the "before" layer
     and places the line + handle from it. */
  function initGradeSlider(slider) {
    if (!slider) return;
    var dragging = false;

    function setPos(pct) {
      pct = Math.max(0, Math.min(100, pct));
      slider.style.setProperty('--pos', pct + '%');
      slider.setAttribute('aria-valuenow', Math.round(pct));
    }
    function fromEvent(e) {
      var rect = slider.getBoundingClientRect();
      var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      setPos((x / rect.width) * 100);
    }
    function onDown(e) { dragging = true; fromEvent(e); }
    function onMove(e) { if (dragging) { if (e.cancelable) e.preventDefault(); fromEvent(e); } }
    function onUp() { dragging = false; }

    slider.addEventListener('mousedown', onDown);
    slider.addEventListener('touchstart', onDown, { passive: true });
    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchend', onUp);
    slider.addEventListener('keydown', function (e) {
      var now = parseFloat(slider.getAttribute('aria-valuenow')) || 50;
      if (e.key === 'ArrowLeft') { setPos(now - 4); e.preventDefault(); }
      if (e.key === 'ArrowRight') { setPos(now + 4); e.preventDefault(); }
    });
    setPos(50);
  }

  function initSkills() {
    var wrap = document.querySelector('.framer-1dg4u9r');
    if (!wrap) return;

    var html = '<div class="fito-skills-grid"><div class="fito-skills">' +
               '<span class="fito-skills-line"></span><ul class="fito-skills-list">';
    for (var i = 0; i < FITO.skills.length; i++) {
      var s = FITO.skills[i];
      html +=
        '<li class="fito-skill" style="transition-delay:' + (i * 90) + 'ms">' +
          '<span class="fito-skill-tick" aria-hidden="true"></span>' +
          '<span class="fito-skill-icon" aria-hidden="true">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
                 'stroke-linecap="round" stroke-linejoin="round">' + SKILL_ICONS[s.icon] + '</svg>' +
          '</span>' +
          '<span class="fito-skill-body">' +
            '<h3 class="fito-skill-title" data-i18n="' + s.key + '.t">' + t(s.key + '.t') + '</h3>' +
            '<p class="fito-skill-desc" data-i18n="' + s.key + '.d">' + t(s.key + '.d') + '</p>' +
          '</span>' +
        '</li>';
    }
    html += '</ul></div>' +
      /* Photo collage, mirroring the live site: his ZV-E10 and an on-location
         shot, overlapping, with a purple block behind. These are the two photos
         that actually belong next to his craft. */
      '<div class="fito-collage" aria-hidden="true">' +
        '<span class="fito-collage-block"></span>' +
        '<img class="fito-collage-a" src="./assets/fito-skills-left.jpg" alt="" loading="lazy">' +
        '<img class="fito-collage-b" src="./assets/fito-skills.png" alt="" loading="lazy">' +
      '</div>' +
    '</div>';

    /* Service cards, alternating text/image. */
    for (var v = 0; v < FITO.services.length; v++) {
      var sv = FITO.services[v];
      html +=
        /* --i drives the sticky stack offset so each card pins just below the
           previous one instead of fully covering it. */
        '<div class="fito-svc" style="--i:' + v + '">' +
          '<div class="fito-svc-text">' +
            '<h3 class="fito-grade-title" data-i18n="' + sv.key + '.t">' + t(sv.key + '.t') + '</h3>' +
            '<p class="fito-grade-desc" data-i18n="' + sv.key + '.d">' + t(sv.key + '.d') + '</p>' +
          '</div>' +
          '<div class="fito-svc-media">' +
            '<img src="./assets/' + sv.img + '" alt="" loading="lazy">' +
          '</div>' +
        '</div>';
    }

    html +=
    /* Colour-grading before/after. One source image shown twice: the left half
       flat/ungraded, the right half with a purple cinematic grade applied in
       CSS. Using two unrelated photos would demo nothing — grading is only
       legible as the same frame treated two ways.
       assets/grade-sample.jpg is an Unsplash placeholder; swap it for one of
       Fito's own frames and the effect still works. */
    '<div class="fito-grade" style="--i:' + FITO.services.length + '">' +
      '<div class="fito-grade-text">' +
        '<h3 class="fito-grade-title" data-i18n="grading.title">' + t('grading.title') + '</h3>' +
        '<p class="fito-grade-desc" data-i18n="grading.desc">' + t('grading.desc') + '</p>' +
      '</div>' +
      '<div class="fito-grade-slider" role="slider" tabindex="0" aria-label="Before / after colour grading" ' +
           'aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" style="--pos:50%">' +
        '<div class="fito-grade-layer fito-grade-after">' +
          '<img src="./assets/grade-sample.jpg" alt="" loading="lazy">' +
        '</div>' +
        '<div class="fito-grade-layer fito-grade-before">' +
          '<img src="./assets/grade-sample.jpg" alt="" loading="lazy">' +
        '</div>' +
        '<span class="fito-grade-label is-before" data-i18n="grading.before">' + t('grading.before') + '</span>' +
        '<span class="fito-grade-label is-after" data-i18n="grading.after">' + t('grading.after') + '</span>' +
        '<span class="fito-grade-line" aria-hidden="true"></span>' +
        '<span class="fito-grade-handle" aria-hidden="true">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M9 6 3 12l6 6M15 6l6 6-6 6"/>' +
          '</svg>' +
        '</span>' +
      '</div>' +
    '</div>';

    wrap.innerHTML = html;
    wrap.classList.add('fito-skills-host');
    initGradeSlider(wrap.querySelector('.fito-grade-slider'));

    /* Reveal on scroll, staggered by the inline transition-delay above. */
    var grid = wrap.querySelector('.fito-skills-grid');
    var root = wrap.querySelector('.fito-skills');
    var items = wrap.querySelectorAll('.fito-skill');
    function reveal() {
      grid.classList.add('is-in');
      root.classList.add('is-in');
      for (var j = 0; j < items.length; j++) items[j].classList.add('is-in');
    }
    if (!('IntersectionObserver' in window)) { reveal(); return; }
    var io = new IntersectionObserver(function (entries) {
      for (var e = 0; e < entries.length; e++) {
        if (!entries[e].isIntersecting) continue;
        reveal();
        io.disconnect();
      }
    }, { threshold: 0.15 });
    io.observe(grid);
  }

  /* ---------------------------------------------------------------------
     FAQ — 4 template accordion rows map 1:1 onto Fito's 4 questions.
     --------------------------------------------------------------------- */
  function initFAQ() {
    var items = document.querySelectorAll('[data-framer-name="close"], [data-framer-name="open"]');
    var n = 0;

    /* Derive how many questions exist rather than hardcoding: retiring one
       (e.g. the camera-gear question) should drop its row, not leave a blank
       accordion behind. */
    var total = 0;
    while (FITO.t.es['faq.q' + (total + 1)]) total++;

    for (var i = 0; i < items.length; i++) {
      var item = items[i];

      /* Find the row's question element: the deepest node holding the text. */
      var qEl = null;
      var all = item.querySelectorAll('*');
      for (var j = 0; j < all.length; j++) {
        var txt = (all[j].textContent || '').trim();
        if (txt && txt.length < 200 && all[j].children.length === 0) { qEl = all[j]; break; }
      }
      if (!qEl) { hide(item); continue; }

      n++;
      if (n > total) { hide(item); continue; }

      qEl.setAttribute('data-i18n', 'faq.q' + n);
      qEl.textContent = t('faq.q' + n);

      var box = item.querySelector('.framer-149t9qt-container');
      if (box && !box.querySelector('.faq-answer')) {
        var ans = document.createElement('div');
        ans.className = 'faq-answer';
        ans.setAttribute('data-i18n', 'faq.a' + n);
        ans.textContent = t('faq.a' + n);
        box.appendChild(ans);
      }

      item.style.cursor = 'pointer';
      (function (row, answerBox) {
        row.addEventListener('click', function (e) {
          if (answerBox && answerBox.contains(e.target)) return;
          var isOpen = row.getAttribute('data-framer-name') === 'open';
          row.setAttribute('data-framer-name', isOpen ? 'close' : 'open');
        });
      })(item, box);
    }
  }

  /* ---------------------------------------------------------------------
     Nav: "About" -> "FAQ".
     #about-me was the "Why Me" section, which now duplicates the skills list
     and is hidden — so the link scrolled to nothing. The FAQ is real content
     with no nav entry, so it takes the slot. Framer gives the FAQ section no
     id, hence one is added here.
     --------------------------------------------------------------------- */
  function initNavFaqLink() {
    var title = document.querySelector('[data-i18n="faq.title"]');
    var section = title && title.closest('section');
    if (!section) return;
    if (!section.id) section.id = 'faq';

    var links = document.querySelectorAll('a[href$="#about-me"]');
    for (var i = 0; i < links.length; i++) {
      links[i].setAttribute('href', '#faq');
      var labels = links[i].querySelectorAll('[data-i18n="nav.about"]');
      for (var j = 0; j < labels.length; j++) labels[j].setAttribute('data-i18n', 'nav.faq');
      if (links[i].getAttribute('data-i18n') === 'nav.about') {
        links[i].setAttribute('data-i18n', 'nav.faq');
      }
    }
  }

  /* ---------------------------------------------------------------------
     Contact — real email / phone / location, plus rebuilt socials.
     --------------------------------------------------------------------- */
  function initContact() {
    var links = document.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var href = a.getAttribute('href') || '';
      var txt = (a.textContent || '').trim();

      if (href.indexOf('mailto:') === 0 || /urrehmanaqeeb2008@gmail\.com/.test(txt)) {
        a.setAttribute('href', 'mailto:' + FITO.contact.email);
      }
      if (href.indexOf('tel:') === 0 || /\+92\s?330/.test(txt)) {
        a.setAttribute('href', 'tel:' + FITO.contact.phone);
      }
      /* WhatsApp links are handled in initLegacyLinks, which knows to leave
         the designer's own wa.me credit link alone. */
    }

    /* Swap the old contact strings wherever they're printed as text. */
    var nodes = document.querySelectorAll('p, span, a, div');
    for (var j = 0; j < nodes.length; j++) {
      var el = nodes[j];
      if (el.children.length) continue;
      var text = (el.textContent || '').trim();
      if (text === 'urrehmanaqeeb2008@gmail.com') el.textContent = FITO.contact.email;
      else if (/^\+92\s?330\s?195488$/.test(text)) el.textContent = FITO.contact.phone;
    }
  }

  function initSocials() {
    var icons = {
      instagram: '<path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 5.17a4.67 4.67 0 100 9.34 4.67 4.67 0 000-9.34zm0 7.7a3.03 3.03 0 110-6.06 3.03 3.03 0 010 6.06zm5.95-7.89a1.09 1.09 0 11-2.18 0 1.09 1.09 0 012.18 0z"/>',
      tiktok:    '<path d="M19.11 4.33a4.75 4.75 0 01-1.63-3.09V.75h-3.5v14.03a2.72 2.72 0 01-2.72 2.62 2.72 2.72 0 110-5.44c.28 0 .55.04.81.12v-3.6a6.32 6.32 0 105.41 6.25V7.9a8.16 8.16 0 004.78 1.53V5.93s-2.14.1-3.15-1.6z"/>',
      x:         '<path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.59l5.24 6.93zm-1.29 19.5h2.04L6.49 3.24H4.3z"/>',
      linkedin:  '<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>'
    };

    var order = [
      ['instagram', 'Instagram', FITO.social.instagram],
      ['tiktok', 'TikTok', FITO.social.tiktok],
      ['x', 'X', FITO.social.x],
      ['linkedin', 'LinkedIn', FITO.social.linkedin]
    ];

    var html = '';
    for (var i = 0; i < order.length; i++) {
      html +=
        '<a class="fito-social" href="' + order[i][2] + '" target="_blank" rel="noopener noreferrer" aria-label="' + order[i][1] + '">' +
          '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + icons[order[i][0]] + '</svg>' +
        '</a>';
    }

    /* Both the contact card (.framer-6ysf0r) and the footer (.framer-ec9yvd)
       ship social buttons wired to the previous owner's accounts — X
       @Ur_Aqeeb22, Instagram @aqeeb_ur.rehman and an Upwork profile. Replace
       the whole row in each so nothing stale can survive underneath. */
    var rows = document.querySelectorAll('.framer-6ysf0r, .framer-ec9yvd');
    for (var r = 0; r < rows.length; r++) {
      rows[r].innerHTML = html;
      rows[r].classList.add('fito-social-row');
      rows[r].style.setProperty('display', 'flex', 'important');
    }
  }

  /* ---------------------------------------------------------------------
     Anything still pointing at the previous owner.
     --------------------------------------------------------------------- */
  function initLegacyLinks() {
    var links = document.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var href = a.getAttribute('href') || '';
      if (!href) continue;

      /* Floating WhatsApp button still used a wa.link short URL that resolves
         to the previous owner's number. */
      if (/wa\.link|wa\.me|api\.whatsapp/i.test(href)) {
        if (href.indexOf(FITO.designer.url) === -1) {
          a.setAttribute('href', 'https://wa.me/' + FITO.contact.whatsapp);
        }
        continue;
      }
      if (/Ur_Aqeeb22/i.test(href)) a.setAttribute('href', FITO.social.x);
      else if (/aqeeb_ur/i.test(href)) a.setAttribute('href', FITO.social.instagram);
      else if (/upwork\.com/i.test(href)) hide(a);
      /* The extras photo was wrapped in a link to one of the old showreel
         videos. Fito's site links nothing there — leave the image, drop the link. */
      else if (/youtube\.com\/watch/i.test(href) && a.querySelector('img')) {
        a.removeAttribute('href');
        a.removeAttribute('target');
        a.style.cursor = 'default';
      }
    }
  }

  /* ---------------------------------------------------------------------
     Photos — Fito's own images from the live site.
     --------------------------------------------------------------------- */
  function setImg(img, src) {
    if (!img) return;
    /* Framer ships srcset/sizes that would otherwise win over .src. */
    img.removeAttribute('srcset');
    img.removeAttribute('sizes');
    img.src = src;
    img.style.objectFit = 'cover';
  }

  /* Walk out from a tagged heading to the nearest ancestor that owns an
     <img> — that's the card. Safer than indexing the minified DOM by position. */
  function cardFor(key) {
    var head = document.querySelector('[data-i18n="' + key + '"]');
    if (!head) return null;
    var el = head;
    for (var i = 0; i < 7 && el; i++) {
      if (el.querySelector && el.querySelector('img')) return el;
      el = el.parentElement;
    }
    return null;
  }

  /* Several skill cards are Framer slideshows with 3 photo slides, so setting
     just the first one leaves the template's stock images on slides 2-3.
     Fill every photo slide, cycling through the list. Arrow chrome is .svg —
     skip it. */
  function setCardImages(key, list) {
    var card = cardFor(key);
    if (!card) return;
    var imgs = card.querySelectorAll('img');
    var n = 0;
    for (var i = 0; i < imgs.length; i++) {
      var src = imgs[i].getAttribute('src') || '';
      if (/\.svg(\?|$)/i.test(src)) continue;
      setImg(imgs[i], list[n % list.length]);
      n++;
    }
  }

  function initImages() {
    /* Every leftover portrait of the previous owner -> Fito.
       Matched by filename rather than by position, because the export renders
       hidden per-breakpoint duplicates that a "first N images" pass hits
       instead of the visible one. */
    var imgs = document.querySelectorAll('img');
    for (var i = 0; i < imgs.length; i++) {
      var src = imgs[i].getAttribute('src') || '';
      if (/muneeb\.jpg|profile\.jpg|pfp-fitoframe\.png|graded\.jpeg$/i.test(src) && !/ungraded/i.test(src)) {
        if (/muneeb\.jpg|profile\.jpg|pfp-fitoframe\.png/i.test(src)) setImg(imgs[i], './assets/fito-pfp.jpg');
      }
    }

    /* Nothing else takes a photo any more. The skills list is icon-based, so
       there's no card to illustrate — pairing a Sony FX30 photo with "I work
       with DaVinci Studio" never made sense. fito-1/3/4 are unused for now;
       they want a home that's actually about his gear (see CHANGES_HANDOFF). */
  }

  /* ---------------------------------------------------------------------
     Footer — matches the live site's credit line.
     --------------------------------------------------------------------- */
  function initFooter() {
    var nodes = document.querySelectorAll('p, span, a, div');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.children.length) continue;
      var text = (el.textContent || '').trim();

      /* Reproduce the live site's credit line — "Copyright Fitoframe© 2025.
         Designed by Hanzlahsfc" — using the template's existing
         copyright + "Built By" + link trio, so the link stays clickable. */
      if (/^©\s*20\d\d\s+Hanzlah\s+All rights reserved\.?$/i.test(text)) {
        el.textContent = 'Copyright Fitoframe© 2025.';
      } else if (/^Built By$/i.test(text)) {
        el.textContent = FITO.designer.label;
      } else if (/^Hanzlah$/i.test(text)) {
        var a = el.closest('a');
        if (a) a.setAttribute('href', FITO.designer.url);
        el.textContent = FITO.designer.name;
      }
    }
  }

  /* ---------------------------------------------------------------------
     Language switcher
     --------------------------------------------------------------------- */
  function setLang(next) {
    lang = next;
    try { localStorage.setItem(LANG_KEY, next); } catch (e) {}
    document.documentElement.lang = next;
    applyText();
    var btns = document.querySelectorAll('.fito-lang button');
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute('data-lang') === next;
      btns[i].classList.toggle('is-active', on);
      btns[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  }

  function detectLang() {
    var saved = null;
    try { saved = localStorage.getItem(LANG_KEY); } catch (e) {}
    if (saved === 'es' || saved === 'en') return saved;
    /* The site is Venezuelan and Spanish-first; only default to English for
       browsers that clearly aren't Spanish. */
    var nav = (navigator.language || 'es').toLowerCase();
    return nav.indexOf('es') === 0 ? 'es' : 'en';
  }

  function buildSwitcher() {
    var box = document.createElement('div');
    box.className = 'fito-lang';
    box.innerHTML =
      '<button type="button" data-lang="es" aria-pressed="false">ES</button>' +
      '<span class="fito-lang-sep" aria-hidden="true"></span>' +
      '<button type="button" data-lang="en" aria-pressed="false">EN</button>';
    box.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-lang]');
      if (btn) setLang(btn.getAttribute('data-lang'));
    });
    return box;
  }

  /* The switcher floats at the top-right of the viewport, deliberately outside
     the header — dropped inside the nav it collided with the "Contact me" CTA.
     On mobile the nav pill spans nearly the full width, so a top-right float
     would sit on top of it; there it goes inside the nav next to the hamburger
     instead. Rather than hard-coding Framer's breakpoints, we just watch which
     nav is actually visible. */
  var floatingSwitcher = null;
  var desktopNav = null;

  function syncSwitcherPlacement() {
    if (!floatingSwitcher) return;
    var navVisible = desktopNav && desktopNav.getBoundingClientRect().width > 0;
    floatingSwitcher.style.display = navVisible ? 'inline-flex' : 'none';
  }

  function initLangSwitcher() {
    var navs = document.querySelectorAll('nav');

    for (var i = 0; i < navs.length; i++) {
      var nav = navs[i];
      var hamburger = nav.querySelector('[data-framer-name="Hamburger icon"]');
      if (hamburger) {
        /* Mobile nav — sit left of the hamburger. */
        if (!nav.querySelector('.fito-lang')) {
          var inNav = buildSwitcher();
          inNav.classList.add('in-nav');
          var host = hamburger.parentElement || nav;
          host.insertBefore(inNav, hamburger.parentElement === host ? hamburger : null);
        }
      } else if (!desktopNav) {
        desktopNav = nav;
      }
    }

    floatingSwitcher = buildSwitcher();
    floatingSwitcher.classList.add('is-floating');
    document.body.appendChild(floatingSwitcher);

    syncSwitcherPlacement();
    window.addEventListener('resize', syncSwitcherPlacement);
  }

  /* ---------------------------------------------------------------------
     Kept from the original build
     --------------------------------------------------------------------- */
  function initColorSlider() {
    var sliders = document.querySelectorAll('[role="slider"]');
    for (var s = 0; s < sliders.length; s++) {
      (function (slider) {
        var overlay = slider.children[1];
        var line = slider.children[4];
        var handle = slider.children[5];
        if (!overlay || !line || !handle) return;
        var dragging = false;
        function update(pos) {
          var rect = slider.getBoundingClientRect();
          var x = Math.max(0, Math.min(1, (pos - rect.left) / rect.width));
          var pct = Math.round(x * 100);
          overlay.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
          line.style.left = pct + '%';
          handle.style.left = pct + '%';
          slider.setAttribute('aria-valuenow', pct);
        }
        function onDown(e) { dragging = true; update(e.clientX || e.touches[0].clientX); }
        function onMove(e) { if (dragging) { e.preventDefault(); update(e.clientX || e.touches[0].clientX); } }
        function onUp() { dragging = false; }
        slider.addEventListener('mousedown', onDown);
        slider.addEventListener('touchstart', onDown, { passive: true });
        document.addEventListener('mousemove', onMove);
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('mouseup', onUp);
        document.addEventListener('touchend', onUp);
      })(sliders[s]);
    }
  }

  function initMobileMenu() {
    var nav = document.querySelector('nav[data-framer-name="mobile-close"]');
    if (!nav) return;
    var hamburger = nav.querySelector('[data-framer-name="Hamburger icon"]');
    var menu = nav.querySelector('.mobile-menu');
    if (!hamburger || !menu) return;
    hamburger.addEventListener('click', function () {
      var isOpen = menu.style.display === 'flex';
      menu.style.display = isOpen ? 'none' : 'flex';
      nav.style.borderRadius = isOpen ? '' : '24px 24px 0 0';
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.style.display = 'none';
        nav.style.borderRadius = '';
      }
    });
  }

  /* ---------------------------------------------------------------------
     "Why Me" — swap the card's placeholder image for a retention graph that
     draws itself as the section scrolls into view.
     The headline percentage comes from FITO.retentionStat; see the note on it
     in content.js — it is the template's invented figure, not Fito's data.
     --------------------------------------------------------------------- */
  function initRetentionGraph() {
    var head = document.querySelector('[data-i18n="extras.1.t"]');
    if (!head) return;
    var card = head;
    for (var j = 0; j < 6 && card; j++) {
      if (card.querySelector && card.querySelector('img')) break;
      card = card.parentElement;
    }
    var img = card && card.querySelector ? card.querySelector('img') : null;
    if (!img || card.querySelector('.retention-graph')) return;

    /* Drop the blur overlays / play button that belonged to the old media. */
    var blurEls = card.querySelectorAll('[style*="backdrop-filter"]');
    for (var b = 0; b < blurEls.length; b++) hide(blurEls[b]);
    var overlays = card.querySelectorAll('*');
    for (var k = 0; k < overlays.length; k++) {
      var el = overlays[k];
      if (el === img) continue;
      var cs = window.getComputedStyle(el);
      var r = el.getBoundingClientRect();
      if (cs.position === 'absolute' && r.width > 30 && r.width < 100 &&
          r.height > 30 && r.height < 100 && el.querySelector('svg, path')) {
        hide(el);
      }
    }

    var VB_W = 467, VB_H = 604, NS = 'http://www.w3.org/2000/svg';
    var stat = FITO.retentionStat;
    var panel = document.createElement('div');
    panel.className = 'retention-graph';
    panel.innerHTML =
      '<svg class="rg-svg" viewBox="0 0 ' + VB_W + ' ' + VB_H + '" xmlns="' + NS + '">' +
        '<defs>' +
          '<linearGradient id="rgArea" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0%" stop-color="#9933ff" stop-opacity="0.5"/>' +
            '<stop offset="100%" stop-color="#9933ff" stop-opacity="0"/>' +
          '</linearGradient>' +
          '<linearGradient id="rgLine" x1="0" y1="1" x2="1" y2="0">' +
            '<stop offset="0%" stop-color="#b366ff"/><stop offset="100%" stop-color="#8000ff"/>' +
          '</linearGradient>' +
          '<filter id="rgGlow" x="-40%" y="-40%" width="180%" height="180%">' +
            '<feGaussianBlur stdDeviation="5" result="b"/>' +
            '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>' +
          '</filter>' +
          '<clipPath id="rgClip"><rect x="0" y="0" width="0" height="' + VB_H + '"/></clipPath>' +
        '</defs>' +
        '<rect x="8" y="8" width="' + (VB_W - 16) + '" height="' + (VB_H - 16) + '" rx="24" ' +
          'fill="rgba(13,13,13,0.35)" stroke="rgba(255,255,255,0.08)"/>' +
        '<text class="rg-kicker" data-i18n="extras.stat.kicker" x="40" y="58">' + t('extras.stat.kicker') + '</text>' +
        (stat == null ? '' : '<text class="rg-pct" x="38" y="132">0%</text>') +
        '<text class="rg-sub" data-i18n="extras.stat.sub" x="40" y="' + (stat == null ? 122 : 162) + '">' + t('extras.stat.sub') + '</text>' +
        '<g class="rg-grid"></g>' +
        '<path class="rg-fill" fill="url(#rgArea)" clip-path="url(#rgClip)"/>' +
        '<path class="rg-stroke" fill="none" stroke="url(#rgLine)" stroke-width="4" ' +
          'stroke-linecap="round" stroke-linejoin="round" filter="url(#rgGlow)"/>' +
        '<circle class="rg-dot" r="7" fill="#fff" stroke="#8000ff" stroke-width="3"/>' +
      '</svg>';

    img.parentNode.insertBefore(panel, img);
    hide(img);

    var pts = [0.08, 0.20, 0.16, 0.33, 0.42, 0.38, 0.56, 0.64, 0.60, 0.78, 0.90];
    var gx0 = 40, gx1 = VB_W - 36, gy0 = 220, gy1 = VB_H - 56;
    function xAt(i) { return gx0 + (gx1 - gx0) * (i / (pts.length - 1)); }
    function yAt(v) { return gy1 - (gy1 - gy0) * v; }
    function path(area) {
      var d = '';
      for (var i = 0; i < pts.length; i++) {
        d += (i === 0 ? 'M ' : ' L ') + xAt(i).toFixed(1) + ' ' + yAt(pts[i]).toFixed(1);
      }
      if (area) d += ' L ' + xAt(pts.length - 1).toFixed(1) + ' ' + gy1 + ' L ' + xAt(0).toFixed(1) + ' ' + gy1 + ' Z';
      return d;
    }

    var stroke = panel.querySelector('.rg-stroke');
    var fill = panel.querySelector('.rg-fill');
    var dot = panel.querySelector('.rg-dot');
    var clipRect = panel.querySelector('#rgClip rect');
    var pctEl = panel.querySelector('.rg-pct');
    var grid = panel.querySelector('.rg-grid');
    stroke.setAttribute('d', path(false));
    fill.setAttribute('d', path(true));
    for (var g = 0; g <= 4; g++) {
      var gy = gy0 + (gy1 - gy0) * (g / 4);
      var ln = document.createElementNS(NS, 'line');
      ln.setAttribute('x1', gx0); ln.setAttribute('x2', gx1);
      ln.setAttribute('y1', gy); ln.setAttribute('y2', gy);
      ln.setAttribute('stroke', 'rgba(255,255,255,0.06)');
      ln.setAttribute('stroke-width', '1');
      grid.appendChild(ln);
    }
    var L = stroke.getTotalLength();
    stroke.style.strokeDasharray = L;

    function render(p) {
      stroke.style.strokeDashoffset = L * (1 - p);
      clipRect.setAttribute('width', (VB_W * p).toFixed(1));
      var pt = stroke.getPointAtLength(L * p);
      dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y);
      dot.style.opacity = p > 0.02 ? 1 : 0;
      if (pctEl) pctEl.textContent = Math.round(stat * p) + '%';
    }
    function onScroll() {
      var rect = panel.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var p = Math.max(0, Math.min(1, 1 - rect.top / vh));
      render(0.7 + 0.3 * p);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    render(0);
    onScroll();
  }

  function initFeatureIcons() {
    var scissors = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>';
    var zap = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
    var nativeBox = document.querySelector('.framer-8x6134');
    var fastBox = document.querySelector('.framer-3559ih');
    if (nativeBox) nativeBox.innerHTML = scissors;
    if (fastBox) fastBox.innerHTML = zap;
  }

  function initFixLinks() {
    function smoothScrollTo(el) {
      if (!el) return;
      var startY = window.pageYOffset;
      var targetY = el.getBoundingClientRect().top + startY;
      var diff = targetY - startY;
      var dur = 500, start = null;
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
        window.scrollTo(0, startY + diff * ease);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      setTimeout(function () { window.scrollTo(0, targetY); }, 560);
      setTimeout(function () { window.scrollTo(0, targetY); }, 780);
    }

    var links = document.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var key = a.getAttribute('data-i18n') || '';
      if (key === 'nav.contact' || key === 'hero.cta2') a.setAttribute('href', '#contact-us');
      var href = a.getAttribute('href') || '';
      var m = href.match(/^\.?\/?#(.+)$/);
      if (!m) continue;
      var id = m[1];
      a.setAttribute('href', '#' + id);
      (function (targetId) {
        a.addEventListener('click', function () {
          var el = document.getElementById(targetId);
          setTimeout(function () { smoothScrollTo(el); }, 0);
        });
      })(id);
    }

    if (location.hash) {
      var initEl = document.getElementById(location.hash.slice(1));
      if (initEl) setTimeout(function () { smoothScrollTo(initEl); }, 400);
    }
  }

  function initCursorTracker() {
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
    var dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);
    var mx = -100, my = -100, cx = -100, cy = -100;
    document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });
    document.querySelectorAll('a, button, .pf-card, [data-framer-name]').forEach(function (el) {
      el.addEventListener('mouseenter', function () { dot.classList.add('hovering'); });
      el.addEventListener('mouseleave', function () { dot.classList.remove('hovering'); });
    });
    (function tick() {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      dot.style.left = cx + 'px';
      dot.style.top = cy + 'px';
      requestAnimationFrame(tick);
    })();
  }

  /* --------------------------------------------------------------------- */
  function initAll() {
    lang = detectLang();

    indexContent();
    initStripTemplate();
    initHeroLayout();
    initBrandsLine();
    initSkills();
    initPortfolio();
    initFAQ();
    initNavFaqLink();
    initContact();
    initSocials();
    initLegacyLinks();
    initImages();
    initFooter();
    initRetentionGraph();
    initFeatureIcons();
    initColorSlider();
    initMobileMenu();
    initLangSwitcher();

    setLang(lang);

    initFixLinks();
    initCursorTracker();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
