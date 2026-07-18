/* ==========================================================================
   content.js — single source of truth for all site copy (ES / EN).
   --------------------------------------------------------------------------
   Everything here mirrors the live site at https://fitoframe.com.
   Spanish is the original wording from the live site (verbatim).
   English is the translation.

   To edit copy, edit ONLY this file. app.js maps it onto the Framer markup.
   ========================================================================== */

window.FITO = {

  /* The Shorts shown in the Videos grid, in order.
     Titles are the real YouTube titles (via oEmbed); the channel is the same
     for all, so it's stored once rather than repeated per video.
     To add one: drop in { id, title } — the id is the part of the URL after
     /shorts/ , without the ?feature=share. */
  channel: 'Rodolfo Delgado',
  videos: [
    { id: 'mjvyK836Ob4', title: 'Simple x Digitel' },
    { id: 'OLFriuRU4Yg', title: 'Sportbiz' },
    { id: 'dmxDzJAww1U', title: 'Fina' },
    { id: 'BNFYlDpXblI', title: 'Gatorade - Entreno' },
    { id: 'Spmo2Esb9-w', title: 'orianabrowsstudio' },
    { id: '69YvCKQcFxY', title: 'KFC x AngelRivero' }
  ],

  /* A featured LANDSCAPE (16:9) piece, shown full-width below the vertical
     Shorts grid. Kept separate from `videos` because those are all 9:16 and
     this would be cropped in that grid. Set to null to hide it. */
  featured: { id: '2xFi-WzkJMc', title: 'Abuela' },

  /* Skills, rendered as the animated icon/timeline list (mirrors the live
     site's layout). `icon` maps to an inline SVG in app.js. */
  skills: [
    { icon: 'software', key: 'skill.1' },
    { icon: 'color',    key: 'skill.2' },
    { icon: 'fx',       key: 'skill.3' },
    { icon: 'sound',    key: 'skill.4' },
    { icon: 'extras',   key: 'skill.5' }
  ],

  /* Service cards under the skills timeline. Rendered alternating left/right;
     the Color Grading card (with the before/after wipe) is appended after these.
     Images are self-hosted Unsplash placeholders — swap the files in assets/
     for Fito's own frames and nothing else needs to change. */
  services: [
    { key: 'svc.1', img: 'svc-editing.jpg' },
    { key: 'svc.2', img: 'svc-vfx.jpg' },
    { key: 'svc.3', img: 'svc-sound.jpg' }
  ],

  /* Contact details — identical in both languages. */
  contact: {
    email: 'xrodolfo94@gmail.com',
    phone: '+584242384933',
    /* wa.me wants digits only, no "+" or spaces. */
    whatsapp: '584242384933'
  },

  social: {
    instagram: 'https://www.instagram.com/fitoframe',
    tiktok: 'https://www.tiktok.com/@fitoframe',
    x: 'https://twitter.com/fitoframe',
    linkedin: 'https://www.linkedin.com/in/rodolfodelgadoedit/'
  },

  /* The "Why Me" retention graph's headline number.
     ------------------------------------------------------------------
     NOTE: this figure is inherited from the previous owner's template. It is
     NOT measured from Fito's work, and fitoframe.com makes no such claim. It
     reads as a verifiable performance stat to any client looking at the page.
     Replace it with a real number, or set it to null to render the graph
     without a percentage.
     ------------------------------------------------------------------ */
  retentionStat: 90,

  /* The designer credit in the footer (from the live site).
     Left in English in both languages, exactly as the live site has it. */
  designer: {
    label: 'Designed by',
    name: 'Hanzlahsfc',
    url: 'https://wa.me/923095731148'
  },

  t: {
    es: {
      'nav.videos':      'Videos',
      'nav.skills':      'Skills',
      'nav.about':       'Sobre mí',
      'nav.faq':         'Preguntas',
      'nav.contact':     'Contáctame',

      'hero.name':       'Rodolfo Delgado',
      /* Editing-only: the videography side is retired (camera out of action). */
      'hero.role':       'Editor de video',
      'hero.bio':        'Me puedes llamar Fito, nací en Caracas-Venezuela, en el 94, tengo más de 4 años dedicados a la parte audiovisual, trabajando de manera individual y siendo parte de distintos equipos o proyectos creativos.',
      'hero.cta1':       'Ver videos',
      'hero.cta2':       'Contáctame',

      'about.kicker':    'Sobre mí',
      'about.title':     'Un poco de mí',
      'about.bio':       'Me puedes llamar Fito, nací en Caracas-Venezuela, en el 94, tengo más de 4 años dedicados a la parte audiovisual, trabajando de manera individual y siendo parte de distintos equipos o proyectos creativos.',
      'about.brands':    'He tenido la oportunidad de colaborar con marcas como: Gatorade, KFC, Cinepic, Jac, Fina Partner, entre otros.',

      'skills.kicker':   'Skills',
      'skills.title':    'Con lo que trabajo',
      'skills.sub':      'Herramientas y áreas en las que me desenvuelvo día a día.',
      'skill.1.t':       'Software',
      'skill.1.d':       'Trabajo con Davinci Studio (versión paga).',
      'skill.2.t':       'Color',
      'skill.2.d':       'Color correction y color grading.',
      'skill.3.t':       'Efectos',
      'skill.3.d':       'Vfx y titulos animados.',
      'skill.4.t':       'Sonido',
      'skill.4.d':       'Diseño de sonido, mejora de voces, entre otras cosas.',
      'skill.5.t':       'Extras',
      'skill.5.d':       'Trabajo individual y en equipo, buena compresión de lo que se necesita, buena narrativa visual y conocimiento en producción.',

      'extras.kicker':   'Por qué yo',
      'extras.title':    'Más que solo "cortar" material.',
      'extras.sub':      'Cada frame se piensa con intención — de los cortes y el motion al color y el sonido.',
      'extras.1.t':      'Edición basada en retención',
      'extras.1.d':      'Tu contenido debe fluir tan natural que el espectador nunca piense en la edición.',
      'extras.2.t':      'Revisiones hasta quedar conforme',
      'extras.2.d':      'Sé la diferencia entre un "Jump-cut" de YouTube y un "Zoom-cut" de TikTok.',
      'extras.3.t':      'Entrega rápida',
      'extras.3.d':      'Entrega en 48-72 horas para contenido short-form. No más fechas de subida perdidas.',
      /* Labels for the animated retention graph. See the NOTE on extras.stat.value. */
      'extras.stat.kicker': 'RETENCIÓN DE AUDIENCIA',
      'extras.stat.sub':    'retención promedio por edición',

      'work.kicker':     'Videos',
      'work.title':      'Videos',
      'work.sub':        'Una muestra de mi trabajo audiovisual.',

      'process.kicker':  'Proceso',
      'process.title':   'Del archivo en bruto al render.',
      'process.sub':     'Cómo trabajamos juntos, paso a paso.',
      'process.1.t':     'Recibo el material',
      'process.1.d':     'Me compartes tu material por Google Drive o Dropbox.',
      'process.2.t':     'Edición y ritmo',
      'process.2.d':     'Aplico ritmo, diseño de sonido y motion graphics.',
      'process.3.t':     'Revisiones',
      'process.3.d':     'Recibes 2 rondas de revisiones por Frame.io.',
      'process.4.t':     'Entrega',
      'process.4.d':     'Archivos en alta resolución, hechos para destacar y listos para publicar.',

      'grading.before':  'Antes',
      'grading.after':   'Después',
      'grading.title':   'Color',
      'grading.desc':    'El color es una de las partes que más disfruto del proceso. Aplico corrección de color y luego color grading, trabajando con material grabado en formato logarítmico de cualquier cámara. Buscando el atractivo visual mediante a la riqueza del color, la consistencia entre tomas, cuidando los detalles.',

      /* Service cards. Every claim here traces back to something real:
         his skills list (Color / Vfx / Sonido / DaVinci) and his actual client
         work. Nothing camera-side — that service is retired. */
      'svc.1.t':         'VFX y animaciones',
      'svc.1.d':         'Integro efectos visuales según lo que cada video realmente necesita. También le doy mucho peso al uso de títulos y subtítulos animados, que ayudan a mantener el patrón de interrupción y a elevar la retención.',
      'svc.2.t':         'Edición con IA',
      'svc.2.d':         'Incorporo inteligencia artificial como una herramienta más dentro del flujo de edición. La uso para asistir transiciones, resolver vacíos visuales o crear elementos de VFX con plataformas como Higgsfield, Kling y Seedance, siempre buscando que el resultado se integre de forma natural con el resto del video.',
      'svc.3.t':         'Diseño de sonido',
      'svc.3.d':         'El sonido es tan importante como la imagen. Trabajo la limpieza de voces y construyo una estructura completa de audio: ambiente, música y efectos que acompañan y refuerzan cada edición.',

      'faq.kicker':      'Preguntas',
      'faq.title':       'Preguntas Comunes',
      'faq.sub':         'Lo que más me suelen preguntar.',
      'faq.q1':          '¿Con qué equipos trabajo?',
      'faq.a1':          'Tengo una pc de mesa i7-12700KF 3.60 GHz, con 32 GB de ram, una NVIDIA GeForce RTX 4060 y un monitor LG UltraGear.',
      'faq.q2':          '¿Dónde estoy ubicado?',
      'faq.a2':          'Actualmente estoy en Caracas-Venezuela.',
      'faq.q3':          '¿Qué internet tengo?',
      'faq.a3':          'Tengo Fibra de 150 Mbps.',
      /* faq.q4/a4 (the camera + lighting gear question) is retired with the
         videography side — the kit is out of action, so the answer is no
         longer true. app.js hides the 4th accordion row. */

      'contact.kicker':  'Contacto',
      'contact.title':   'Contáctame',
      'contact.sub':     'Escríbeme y hablamos de tu proyecto.',
      'contact.email':   'Email',
      'contact.phone':   'Celular',
      'contact.loc':     'Locación',
      'contact.locval':  'Caracas, Venezuela.',
      'contact.social':  'Mis redes sociales :',

      'footer.tagline':  'Editor de video. Caracas, Venezuela.',
      'footer.privacy':  'Privacy & Policy',
      'footer.terms':    'Terms Condition',
      'footer.designed': 'Designed by',

      'lang.label':      'ES'
    },

    en: {
      'nav.videos':      'Videos',
      'nav.skills':      'Skills',
      'nav.about':       'About',
      'nav.faq':         'FAQ',
      'nav.contact':     'Contact me',

      'hero.name':       'Rodolfo Delgado',
      /* Editing-only: the videography side is retired (camera out of action). */
      'hero.role':       'Video Editor',
      'hero.bio':        'You can call me Fito. I was born in Caracas, Venezuela in ‘94, and I have over 4 years dedicated to audiovisual work — both on my own and as part of different teams and creative projects.',
      'hero.cta1':       'View videos',
      'hero.cta2':       'Contact me',

      'about.kicker':    'About',
      'about.title':     'A little about me',
      'about.bio':       'You can call me Fito. I was born in Caracas, Venezuela in ‘94, and I have over 4 years dedicated to audiovisual work — both on my own and as part of different teams and creative projects.',
      'about.brands':    'I’ve had the opportunity to collaborate with brands such as: Gatorade, KFC, Cinepic, Jac, Fina Partner, among others.',

      'skills.kicker':   'Skills',
      'skills.title':    'What I work with',
      'skills.sub':      'The tools and areas I work in every day.',
      'skill.1.t':       'Software',
      'skill.1.d':       'I work with DaVinci Studio (paid version).',
      'skill.2.t':       'Color',
      'skill.2.d':       'Color correction and color grading.',
      'skill.3.t':       'Effects',
      'skill.3.d':       'VFX and animated titles.',
      'skill.4.t':       'Sound',
      'skill.4.d':       'Sound design, voice enhancement, and more.',
      'skill.5.t':       'Extras',
      'skill.5.d':       'I work both solo and in teams, with a solid grasp of what’s needed, strong visual storytelling, and production know-how.',

      'extras.kicker':   'Why Me',
      'extras.title':    'More than just "cutting" footage.',
      'extras.sub':      'Every frame is shaped with intention — from clean cuts and motion to balanced color and sound.',
      'extras.1.t':      'Retention Based Edit',
      'extras.1.d':      'Your content should flow so naturally the viewer never thinks about the edit.',
      'extras.2.t':      'Revisions Until Satisfied',
      'extras.2.d':      'I know the difference between a YouTube "Jump-cut" and a TikTok "Zoom-cut."',
      'extras.3.t':      'Fast Turnaround',
      'extras.3.d':      '48-72 hour delivery for short-form content. No more missed upload dates.',
      /* Labels for the animated retention graph. See the NOTE on extras.stat.value. */
      'extras.stat.kicker': 'AUDIENCE RETENTION',
      'extras.stat.sub':    'avg. viewer retention per edit',

      'work.kicker':     'Videos',
      'work.title':      'Videos',
      'work.sub':        'A selection of my audiovisual work.',

      'process.kicker':  'Process',
      'process.title':   'From Raw File to Render.',
      'process.sub':     'How we work together, step by step.',
      'process.1.t':     'Content received',
      'process.1.d':     'You share your footage via Google Drive or Dropbox.',
      'process.2.t':     'Edit & Flow',
      'process.2.d':     'I apply pacing, sound design, and motion graphics.',
      'process.3.t':     'Revisions',
      'process.3.d':     'You get 2 rounds of revisions via Frame.io.',
      'process.4.t':     'Delivery',
      'process.4.d':     'High-resolution files, built for impact and ready to publish.',

      'grading.before':  'Before',
      'grading.after':   'After',
      'grading.title':   'Color',
      'grading.desc':    'Color is one of the parts I enjoy most in the process. I apply color correction and then color grading, working with footage shot in log format from any camera — pursuing visual appeal through rich color, consistency between shots, and attention to detail.',

      /* See the Spanish block: every claim traces back to his real skills list
         and real client work. Nothing camera-side. */
      'svc.1.t':         'VFX & Animation',
      'svc.1.d':         'I integrate visual effects based on what each video truly needs. I also put a lot of emphasis on animated titles and subtitles, which help maintain pattern interruption and boost retention.',
      'svc.2.t':         'AI-Powered Editing',
      'svc.2.d':         'I use AI as another tool in the editing workflow — assisting with transitions, filling visual gaps, and creating VFX elements through platforms like Higgsfield, Kling and Seedance, always making sure the result blends naturally with the rest of the video.',
      'svc.3.t':         'Sound Design',
      'svc.3.d':         'Sound is just as important as the image. I work on voice cleanup and build a complete audio structure: ambience, music and effects that support and elevate every edit.',

      'faq.kicker':      'FAQ',
      'faq.title':       'Common Questions',
      'faq.sub':         'The things I get asked most.',
      'faq.q1':          'What equipment do I work with?',
      'faq.a1':          'I have a desktop PC with an i7-12700KF 3.60 GHz, 32 GB of RAM, an NVIDIA GeForce RTX 4060, and an LG UltraGear monitor.',
      'faq.q2':          'Where am I based?',
      'faq.a2':          'I’m currently in Caracas, Venezuela.',
      'faq.q3':          'What internet do I have?',
      'faq.a3':          'I have 150 Mbps fibre.',
      /* faq.q4/a4 (the camera + lighting gear question) is retired with the
         videography side — see the Spanish block. */

      'contact.kicker':  'Contact',
      'contact.title':   'Contact me',
      'contact.sub':     'Drop me a line and let’s talk about your project.',
      'contact.email':   'Email',
      'contact.phone':   'Phone',
      'contact.loc':     'Location',
      'contact.locval':  'Caracas, Venezuela.',
      'contact.social':  'My social media:',

      'footer.tagline':  'Video editor. Caracas, Venezuela.',
      'footer.privacy':  'Privacy & Policy',
      'footer.terms':    'Terms Condition',
      'footer.designed': 'Designed by',

      'lang.label':      'EN'
    }
  }
};
