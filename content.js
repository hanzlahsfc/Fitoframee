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
    { id: 'Spmo2Esb9-w', title: 'orianabrowsstudio' },
    { id: '69YvCKQcFxY', title: 'KFC x AngelRivero' }
  ],

  /* Skills, rendered as the animated icon/timeline list (mirrors the live
     site's layout). `icon` maps to an inline SVG in app.js. */
  skills: [
    { icon: 'software', key: 'skill.1' },
    { icon: 'color',    key: 'skill.2' },
    { icon: 'fx',       key: 'skill.3' },
    { icon: 'sound',    key: 'skill.4' },
    { icon: 'extras',   key: 'skill.5' }
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
      'hero.role':       'Editor de video / Videógrafo',
      'hero.bio':        'Me puedes llamar Fito, nací en Caracas-Venezuela, en el 94, tengo más de 4 años dedicados a la parte audiovisual, trabajando de manera individual y siendo parte de distintos equipos o proyectos creativos.',
      'hero.cta1':       'Ver videos',
      'hero.cta2':       'Contáctame',

      'about.kicker':    'Sobre mí',
      'about.title':     'Un poco de mí',
      'about.bio':       'Me puedes llamar Fito, nací en Caracas-Venezuela, en el 94, tengo más de 4 años dedicados a la parte audiovisual, trabajando de manera individual y siendo parte de distintos equipos o proyectos creativos.',
      'about.brands':    'He tenido la oportunidad de colaborar con marcas como: Gatorade, KFC, Cinepic, Sedal, Central Madeirense, Fina Partner, entre otros.',

      'skills.kicker':   'Skills',
      'skills.title':    'Con lo que trabajo',
      'skills.sub':      'Herramientas y áreas en las que me desenvuelvo día a día.',
      'skill.1.t':       'Software',
      'skill.1.d':       'Trabajo con Davinci Studio (versión paga).',
      'skill.2.t':       'Color',
      'skill.2.d':       'Color grading y look creativo.',
      'skill.3.t':       'Efectos',
      'skill.3.d':       'Vfx y animaciones.',
      'skill.4.t':       'Sonido',
      'skill.4.d':       'Diseño de sonido, mejora de voces, entre otras cosas.',
      'skill.5.t':       'Extras',
      'skill.5.d':       'Trabajo individual y en equipo, buena compresión de lo que se necesita, buena narrativa visual y conocimiento en producción.',

      'extras.kicker':   'Extras',
      'extras.title':    'Más que solo "cortar" material.',
      'extras.sub':      'Trabajo individual y en equipo, buena compresión de lo que se necesita, buena narrativa visual y conocimiento en producción.',
      'extras.1.t':      'Trabajo en equipo',
      'extras.1.d':      'Trabajo individual y en equipo, con buena compresión de lo que se necesita.',
      'extras.2.t':      'Narrativa visual',
      'extras.2.d':      'Buena narrativa visual para que cada pieza cuente algo.',
      'extras.3.t':      'Producción',
      'extras.3.d':      'Conocimiento en producción, dentro y fuera del set.',

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

      'faq.kicker':      'Preguntas',
      'faq.title':       'Preguntas Comunes',
      'faq.sub':         'Lo que más me suelen preguntar.',
      'faq.q1':          '¿Con qué equipos trabajo?',
      'faq.a1':          'Tengo una pc de mesa i7-12700KF 3.60 GHz, con 32 GB de ram, una NVIDIA GeForce RTX 4060 y un monitor LG UltraGear.',
      'faq.q2':          '¿Dónde estoy ubicado?',
      'faq.a2':          'Actualmente estoy en Caracas-Venezuela.',
      'faq.q3':          '¿Qué internet tengo?',
      'faq.a3':          'Tengo Fibra de 150 Mbps.',
      'faq.q4':          '¿Qué equipo poseo para hacer producciones?',
      'faq.a4':          'Tengo una cámara Sony Fx30 y una Sony Zve-10, estabilizador Zhiyun Webill 3s, tres kits de luces Godox SL100 Bi con sus difusores, entre otros accesorios.',

      'contact.kicker':  'Contacto',
      'contact.title':   'Contáctame',
      'contact.sub':     'Escríbeme y hablamos de tu proyecto.',
      'contact.email':   'Email',
      'contact.phone':   'Celular',
      'contact.loc':     'Locación',
      'contact.locval':  'Caracas, Venezuela.',
      'contact.social':  'Mis redes sociales :',

      'footer.tagline':  'Editor de video y videógrafo. Caracas, Venezuela.',
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
      'hero.role':       'Video Editor / Videographer',
      'hero.bio':        'You can call me Fito. I was born in Caracas, Venezuela in ‘94, and I have over 4 years dedicated to audiovisual work — both on my own and as part of different teams and creative projects.',
      'hero.cta1':       'View videos',
      'hero.cta2':       'Contact me',

      'about.kicker':    'About',
      'about.title':     'A little about me',
      'about.bio':       'You can call me Fito. I was born in Caracas, Venezuela in ‘94, and I have over 4 years dedicated to audiovisual work — both on my own and as part of different teams and creative projects.',
      'about.brands':    'I’ve had the opportunity to collaborate with brands such as: Gatorade, KFC, Cinepic, Sedal, Central Madeirense, Fina Partner, among others.',

      'skills.kicker':   'Skills',
      'skills.title':    'What I work with',
      'skills.sub':      'The tools and areas I work in every day.',
      'skill.1.t':       'Software',
      'skill.1.d':       'I work with DaVinci Studio (paid version).',
      'skill.2.t':       'Color',
      'skill.2.d':       'Color grading and creative looks.',
      'skill.3.t':       'Effects',
      'skill.3.d':       'VFX and animation.',
      'skill.4.t':       'Sound',
      'skill.4.d':       'Sound design, voice enhancement, and more.',
      'skill.5.t':       'Extras',
      'skill.5.d':       'I work both solo and in teams, with a solid grasp of what’s needed, strong visual storytelling, and production know-how.',

      'extras.kicker':   'Extras',
      'extras.title':    'More than just "cutting" footage.',
      'extras.sub':      'I work solo and in teams, with a solid grasp of what’s needed, strong visual storytelling, and production know-how.',
      'extras.1.t':      'Teamwork',
      'extras.1.d':      'I work both solo and in teams, with a solid grasp of what’s needed.',
      'extras.2.t':      'Visual storytelling',
      'extras.2.d':      'Strong visual narrative, so every piece actually says something.',
      'extras.3.t':      'Production',
      'extras.3.d':      'Production know-how, on set and off.',

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

      'faq.kicker':      'FAQ',
      'faq.title':       'Common Questions',
      'faq.sub':         'The things I get asked most.',
      'faq.q1':          'What equipment do I work with?',
      'faq.a1':          'I have a desktop PC with an i7-12700KF 3.60 GHz, 32 GB of RAM, an NVIDIA GeForce RTX 4060, and an LG UltraGear monitor.',
      'faq.q2':          'Where am I based?',
      'faq.a2':          'I’m currently in Caracas, Venezuela.',
      'faq.q3':          'What internet do I have?',
      'faq.a3':          'I have 150 Mbps fibre.',
      'faq.q4':          'What gear do I own for productions?',
      'faq.a4':          'I have a Sony FX30 and a Sony ZV-E10 camera, a Zhiyun Weebill 3S gimbal, three Godox SL100 Bi light kits with diffusers, and other accessories.',

      'contact.kicker':  'Contact',
      'contact.title':   'Contact me',
      'contact.sub':     'Drop me a line and let’s talk about your project.',
      'contact.email':   'Email',
      'contact.phone':   'Phone',
      'contact.loc':     'Location',
      'contact.locval':  'Caracas, Venezuela.',
      'contact.social':  'My social media:',

      'footer.tagline':  'Video editor and videographer. Caracas, Venezuela.',
      'footer.privacy':  'Privacy & Policy',
      'footer.terms':    'Terms Condition',
      'footer.designed': 'Designed by',

      'lang.label':      'EN'
    }
  }
};
