/* ============================================================
   SolBeat Cleaning Inc. — all site copy and business facts.
   Every fact here is real. No invented stats, reviews, or
   testimonials — the business is approaching its first year
   and has no sales yet. Trust is built on Beatrice's real
   background, the guarantee, insurance/vetting, and honesty.
   ============================================================ */

export const business = {
  name: 'SolBeat Cleaning Inc.',
  shortName: 'SolBeat',
  motto: "We don't cut corners. We clean them.",
  founded: 'Founded late last year — now approaching our first full year in Steinbach.',
  address: '300 First St, Steinbach, MB R5G 0T6',
  phone: '+1 (204) 381-8505',
  phoneHref: 'tel:+12043818505',
  hours: '8:00 AM – 6:00 PM, 7 days a week',
  freeEstimates: true,
  // Street-level pin for 300 First St — OSM has no house-number entry,
  // so this is the centre of the First Street block downtown Steinbach.
  mapCenter: [49.5254, -96.6864],
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=300+First+St,+Steinbach,+MB+R5G+0T6',
}

export const serviceAreas = [
  'Steinbach',
  'Mitchell',
  'Blumenort',
  'La Broquerie',
  'Kleefeld',
  'Giroux',
  'Ste. Anne',
  'New Bothwell',
  'Grunthal',
  'Niverville',
  'Landmark',
]

export const founder = {
  name: 'Beatrice Akinleye',
  title: 'Founder & CEO',
  summary:
    'Over a decade of experience in cleaning, quality assurance, and operations.',
  credentials: [
    {
      title: 'Quality Assurance',
      detail: 'Post-graduate certificate, Conestoga College',
    },
    {
      title: 'Manufacturing Management',
      detail: 'Post-graduate certificate, Conestoga College',
    },
    {
      title: 'Supply Chain Management',
      detail: 'Post-graduate certificate, Conestoga College',
    },
  ],
  experience: [
    { company: 'Prima Klean', area: 'Professional cleaning' },
    { company: 'Advantage Solutions (CDS Canada)', area: 'Operations' },
    { company: 'UPS', area: 'Logistics' },
    { company: 'Royal Mills and Foods', area: 'Quality control' },
  ],
}

export const residentialServices = [
  {
    name: 'Move In / Move Out Cleaning',
    blurb:
      'Every cupboard, baseboard, and corner cleaned so the place is ready to hand over — or ready to call home.',
  },
  {
    name: 'Spring Cleaning',
    blurb:
      'The big seasonal reset: the grit, dust, and buildup a Manitoba winter leaves behind, dealt with top to bottom.',
  },
  {
    name: 'One-Time Cleanings',
    blurb:
      'Before guests, after a renovation, or just because — a single thorough clean with no commitment attached.',
  },
  {
    name: 'Recurring Cleanings',
    blurb:
      'Weekly, bi-weekly, or monthly visits on a schedule that fits your household, with the same careful checklist every time.',
  },
  {
    name: 'Detail Dusting',
    blurb:
      'Trim, ledges, blinds, light fixtures, vents — the surfaces most cleans skip are the ones we start with.',
  },
  {
    name: 'Kitchen Appliances',
    blurb:
      'Ovens, stovetops, range hoods, fridges, and microwaves degreased and cleaned inside and out.',
  },
  {
    name: 'Bathroom Floors',
    blurb:
      'Scrubbed grout lines, disinfected tile, and the edges behind the toilet nobody wants to think about.',
  },
  {
    name: 'Bath Tub Cleaning',
    blurb:
      'Soap scum, hard-water film, and buildup removed so the tub is actually clean — not just wiped.',
  },
  {
    name: 'Junk Removal (Inside & Out)',
    blurb:
      'Unwanted items hauled away from basements, garages, and yards so the space is usable again.',
  },
]

export const commercialServices = [
  {
    name: 'Common Area Cleaning',
    blurb:
      'Lobbies, hallways, stairwells, and shared washrooms kept presentable for the people who use them every day.',
  },
  {
    name: 'Recurring Commercial Cleaning',
    blurb:
      'A dependable schedule — daily, weekly, or monthly — with a documented checklist so standards never drift.',
  },
  {
    name: 'Pipeline Cleaning',
    blurb:
      'Specialized pipeline cleaning handled with the same process discipline as everything else we do.',
  },
  {
    name: 'One-Time & Recurring Contracts',
    blurb:
      'From a single deep clean before an inspection to an ongoing contract, scoped in writing with a free estimate first.',
  },
  {
    name: 'Junk Removal',
    blurb:
      'Old fixtures, packaging, and clutter removed from your premises so the space works for your business again.',
  },
]

/* FAQ — used verbatim on the Contact page accordion. */
export const faq = [
  {
    q: 'What areas do you serve?',
    a: 'Steinbach, Mitchell, Blumenort, La Broquerie, Kleefeld, Giroux, Ste. Anne, New Bothwell, Grunthal, Niverville. Outside this area, contact to check reach.',
  },
  {
    q: 'Do I need to provide cleaning supplies or equipment?',
    a: 'No — team brings everything; client products used on request (brand preference/allergy concerns).',
  },
  {
    q: 'Are your cleaners insured and vetted?',
    a: 'Yes — background-checked, trained, and insured.',
  },
  {
    q: 'How do I book a cleaning?',
    a: 'Online through the contact/booking form, or by phone.',
  },
  {
    q: 'Can I schedule recurring cleanings?',
    a: 'Yes — weekly, bi-weekly, monthly packages for residential and commercial.',
  },
  {
    q: 'How long does a cleaning take?',
    a: 'Standard home cleaning ~2-3 hours; deep cleans and commercial jobs may take longer.',
  },
  {
    q: 'Do I need to be home during the cleaning?',
    a: 'No — secure entry instructions accepted, property locked up after.',
  },
  {
    q: "What happens if I'm not satisfied?",
    a: "Report within 24 hours and it's corrected at no extra charge.",
  },
  {
    q: 'Do you offer eco-friendly cleaning options?',
    a: 'Yes, on request.',
  },
  {
    q: 'How do I pay?',
    a: 'Cash, credit/debit, or e-transfer; due after service unless on a recurring plan.',
  },
]

/* ------------------------------------------------------------
   Blog — written in Beatrice's voice. Body is an array of
   blocks: { t: 'p' | 'h2' | 'ul' | 'check', ... }
   ------------------------------------------------------------ */
export const blogPosts = [
  {
    slug: 'seasonal-deep-clean-checklist',
    title: 'The Southeast Manitoba Seasonal Deep-Clean Checklist',
    date: 'April 14, 2026',
    readTime: '7 min read',
    tag: 'Checklists',
    photoLabel: 'Spring cleaning supplies laid out on a porch step',
    excerpt:
      'Manitoba seasons are hard on a house. Here is the room-by-room checklist I actually use — spring thaw grit, fall furnace prep, and the winter entryway problem, all covered.',
    body: [
      {
        t: 'p',
        c: "Our seasons here in southeastern Manitoba are dramatic, and your house feels every one of them. Spring thaw drags grit and gravel dust inside for weeks. Summer brings pollen and open-window dust. Fall means the furnace kicks on and blows around everything that settled in the ducts. And winter is a five-month campaign of road salt, boot slush, and dry static dust. A deep clean isn't one job — it's four smaller, well-timed ones. Here is the checklist I use, season by season.",
      },
      { t: 'h2', c: 'Spring (after the thaw, usually late April)' },
      {
        t: 'p',
        c: "Wait until the gravel dust settles — in Steinbach and the surrounding towns, deep-cleaning your windows in early April just means doing them twice. Once the streets are dry, work top to bottom:",
      },
      {
        t: 'check',
        c: [
          'Wash windows inside and out, and vacuum the window tracks — the thaw leaves a layer of silt in the channels.',
          'Pull out the stove and fridge and clean behind and underneath. Winter cooking is heavy cooking; the grease film back there is real.',
          'Wash entryway walls and doors to about waist height. Salt spray travels farther up the wall than you think.',
          'Shampoo or spot-clean entry mats and the first two metres of carpet inside every exterior door.',
          'Wipe baseboards through the whole house — this is where five months of furnace dust lands.',
          'Swap the furnace filter, and vacuum the cold-air return grilles.',
        ],
      },
      { t: 'h2', c: 'Summer (pick a cool week in July)' },
      {
        t: 'check',
        c: [
          'Dust ceiling fan blades before you switch the fans on for the season — otherwise the first spin redistributes everything.',
          'Vacuum window screens and sills; open-window season means pollen and canola dust build up fast.',
          'Deep-clean the bathroom: grout lines, the base of the toilet, and the tub surround. Humidity makes summer the season buildup accelerates.',
          'Clean light fixtures and bulbs — you will genuinely notice brighter rooms.',
        ],
      },
      { t: 'h2', c: 'Fall (before the furnace runs daily)' },
      {
        t: 'check',
        c: [
          'Change the furnace filter and vacuum every heat register you can lift out. What is in the ducts in October is in your air by November.',
          'Deep-clean the oven before holiday baking season — it is a far easier job in October than December.',
          'Wash bedding you are rotating in for winter: duvets, flannel sheets, mattress covers.',
          'Clean out the fridge and wipe door seals — one soft-bristle brush pass around the gasket prevents winter mildew spots.',
        ],
      },
      { t: 'h2', c: 'Winter (the maintenance season)' },
      {
        t: 'p',
        c: "Winter deep-cleaning is mostly about containment. You cannot stop salt and slush from coming in — you can stop them at the door.",
      },
      {
        t: 'check',
        c: [
          'Keep a hard-surface boot tray and wash it weekly; a salt-crusted tray grinds residue into the floor around it.',
          'Mop hard entry floors with a vinegar-and-water solution to lift the white salt haze — plain water just smears it.',
          'Dust electronics and shelves more often than you think you need to; furnace air is dry, and static pulls dust to every surface.',
          'Run the range hood fan every time you cook. Closed-window season means grease has nowhere to go but your cabinets.',
        ],
      },
      { t: 'h2', c: 'Or hand me the list' },
      {
        t: 'p',
        c: "This is exactly the work SolBeat's spring cleaning and detail-dusting services cover — checklist and all. If a season got away from you, request a free estimate and I'll bring the checklist with me.",
      },
    ],
  },
  {
    slug: 'move-out-cleaning-guide',
    title: 'The Move-Out Clean That Gets Your Damage Deposit Back',
    date: 'May 26, 2026',
    readTime: '6 min read',
    tag: 'Guides',
    photoLabel: 'Empty, freshly cleaned kitchen with keys on the counter',
    excerpt:
      'Landlords check the same six places every time. A former quality-control inspector walks you through the move-out clean in the order that actually works.',
    body: [
      {
        t: 'p',
        c: "Before I cleaned homes, I inspected work for a living — and a move-out inspection is just an audit with a damage deposit attached. The good news: landlords and property managers check the same places every time. If you clean in the right order and hit those places properly, you keep your deposit. Here is how I run a move-out clean, start to finish.",
      },
      { t: 'h2', c: 'Rule one: empty first, clean second' },
      {
        t: 'p',
        c: "Never start cleaning while boxes are still in the unit. You will clean around things, miss what was underneath, and do half the work twice. Move everything out — including the stuff in the oven drawer you forgot existed — then clean the empty shell top to bottom, back to front, finishing at the door so you never walk across a wet, clean floor.",
      },
      { t: 'h2', c: 'The six places every inspection checks' },
      {
        t: 'check',
        c: [
          'Inside the oven. This is the single most-failed item I see. Use a proper oven cleaner, let it sit as long as the label says, and do the racks in the tub or a bin.',
          'Inside and under the fridge. Pull it out, clean the coils and the floor beneath, and leave the doors propped open if power will be off — a sealed warm fridge grows mildew in days.',
          'Bathroom: tub ring, grout, and the base of the toilet. A clean mirror does not compensate for a grey tub ring. Soap scum needs an acidic cleaner and patience, not force.',
          'Window tracks and sills. Vacuum first, then wipe. Inspectors run a finger through the track — be there first.',
          'Baseboards and door frames, especially scuffs at hand height and along hallways. A melamine sponge handles most marks.',
          'Light fixtures and vent covers. Dead-bug domes and dusty vents read as neglect even when everything else is spotless.',
        ],
      },
      { t: 'h2', c: 'What you can skip' },
      {
        t: 'p',
        c: "Normal wear and tear is not yours to fix — small nail holes, sun-faded paint, worn carpet in walkways. Your job is cleanliness, not renovation. Take dated photos of every room after you finish; if a dispute ever arises, those photos are your evidence.",
      },
      { t: 'h2', c: 'Give it the time it needs' },
      {
        t: 'p',
        c: "A proper move-out clean on a two-bedroom is a full day of hard work — mostly because of the oven and the bathroom. If you are also moving that same day, that math rarely works. Move-out cleaning is one of SolBeat's core residential services: I bring the supplies, work the same checklist an inspector uses, and if anything is reported within 24 hours, I correct it at no extra charge. Estimates are always free.",
      },
    ],
  },
  {
    slug: 'quality-assurance-mindset',
    title: 'What a Decade in Quality Assurance Taught Me About Cleaning Homes',
    date: 'June 15, 2026',
    readTime: '5 min read',
    tag: "Beatrice's desk",
    photoLabel: 'A hand-written cleaning checklist on a clipboard',
    excerpt:
      "Checklists, inspection points, and corrective action sound like factory language. They're also why your house gets cleaned the same way every single time.",
    body: [
      {
        t: 'p',
        c: "Before SolBeat, I spent over a decade in quality assurance, logistics, and operations — inspecting products, auditing processes, and asking one question over and over: how do you make good work repeatable? I studied it formally too, through post-graduate certificates in Quality Assurance, Manufacturing Management, and Supply Chain Management at Conestoga College. When I started a cleaning company, people assumed I was changing careers. I don't see it that way. I brought the career with me.",
      },
      { t: 'h2', c: 'Checklists beat memory' },
      {
        t: 'p',
        c: "In a factory, nobody 'just remembers' the inspection points — they are written down, every unit, every shift. I clean the same way. Every SolBeat job runs on a written checklist built for that home or business. Not because I would forget your baseboards, but because a checklist means the tenth visit is as thorough as the first. Consistency is not a personality trait; it is a system.",
      },
      { t: 'h2', c: 'Inspection points are where work fails' },
      {
        t: 'p',
        c: "QA taught me that work does not fail in the middle of a surface — it fails at the edges, the corners, the transitions. The line where the tub meets the tile. The hinge side of the oven door. The two centimetres of floor behind the bathroom door. That is exactly why our motto is what it is: we don't cut corners, we clean them. The corners are the inspection points.",
      },
      { t: 'h2', c: 'Corrective action, not excuses' },
      {
        t: 'p',
        c: "In manufacturing, when something is out of spec, you do not argue with the finding — you fix it and adjust the process so it does not recur. That is precisely how SolBeat's guarantee works: tell me within 24 hours if anything is not right, and it gets corrected at no extra charge. Then it goes on the checklist so it never happens again. That is not a marketing promise; it is a corrective-action loop.",
      },
      { t: 'h2', c: 'Why this matters for a new company' },
      {
        t: 'p',
        c: "SolBeat is young — approaching its first full year — and I will not pretend otherwise with invented reviews or made-up numbers. What I can offer is a process you can inspect: a written scope from your free estimate, a checklist you can read, insurance and vetting you can verify, and a guarantee with a deadline attached. Judge us the way an auditor would. I would not have it any other way.",
      },
    ],
  },
]

/* Lead magnet */
export const leadMagnet = {
  title: 'The Seasonal Deep-Clean Guide',
  blurb:
    "Beatrice's full season-by-season checklist for southeastern Manitoba homes — the same one behind our spring cleaning service. Free, as a printable PDF.",
  fileUrl: '/downloads/solbeat-seasonal-deep-clean-guide.pdf',
  fileName: 'solbeat-seasonal-deep-clean-guide.pdf',
}
