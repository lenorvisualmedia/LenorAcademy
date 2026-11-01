export interface ProgramModule {
  name: string;
  items: string[];
}

export interface Program {
  id: string;
  name: string;
  duration: string;
  badge: string;
  modulesCount: string;
  description: string;
  featured: boolean;
  price: string;
  installments: string;
  modules: string[];
  highlights: string[];
}

export interface JourneyStop {
  stopNumber: string;
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  chips: string[];
  description: string;
}

export interface PlacedStudent {
  id: string;
  name: string;
  role: string;
  company: string;
  category: 'Photography' | 'Videography' | 'Editing' | 'Design';
  location: string;
  batch: string;
  instagram: string;
  avatar?: string;
  quote?: string;
  cardImage: string;
  cardPreset: 'bursts' | 'stars' | 'shards' | 'cosmos' | 'rainbow' | 'swirl' | 'glitter' | 'gold';
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Workshops' | 'Camps' | 'Ceremonies' | 'Open days';
  date: string;
  time: string;
  venue: string;
  description: string;
  image?: string;
  status: 'Upcoming' | 'Past';
  registrationOpen: boolean;
  spotsLeft?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Photography' | 'Videography' | 'Editing' | 'Design' | 'Careers';
  readTime: string;
  date: string;
  summary: string;
  author: string;
  authorRole: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  content: string[];
}

export interface SuccessStory {
  id: string;
  studentName: string;
  category: 'Photography' | 'Videography' | 'Video Editing' | 'Design';
  course: string;
  batch: string;
  quote: string;
  joinedYear: string;
  learnedModule: string;
  currentRole: string;
  currentCompany: string;
  location: string;
  image: string;
  imageAlt: string;
  detailedStory?: string;
}

export interface JobOpening {
  id: string;
  title: string;
  craft: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
}

// --------------------------------------------------------------------
// ACADEMY GENERAL INFO
// --------------------------------------------------------------------
export const ACADEMY_INFO = {
  name: "LENOR ACADEMY®",
  tagline: "Learn what you love®",
  subTagline: "Let passion drive your profession",
  eyebrow: "Lenor Academy® · Photography · Videography · Editing",
  address: "CP Building, Makkaraparamba, Malappuram, Kerala",
  phone: "+91 91883 74232",
  email: "info@lenoracademy.com",
  admissionsEmail: "admissions@lenoracademy.com",
  careersEmail: "careers@lenoracademy.com",
  brochurePath: "/Lenor_Academy_Brochure_2026.pdf",
  instagram: "https://instagram.com/lenoracademy",
  youtube: "https://youtube.com/@lenoracademy",
  stats: {
    studentsPlaced: "500+",
    hiringPartners: "45+",
    placementRate: "98%",
    practicalRatio: "85%",
  }
};

// --------------------------------------------------------------------
// 9 STOPS JOURNEY
// --------------------------------------------------------------------
export const JOURNEY_STOPS: JourneyStop[] = [
  {
    stopNumber: "01",
    tag: "Stop 01 · Both programmes",
    title: "Photography",
    subtitle: "Pick up the camera.",
    image: "/assets/aea971a7-2000-4f9c-b503-af69a67cc1cd.jpg",
    imageAlt: "Photographer raising a camera",
    chips: [
      "Lighting in Photography",
      "Camera Settings & Composition",
      "Indoor Product",
      "Landscape",
      "Modeling",
      "Automotive",
      "Aerial (Drone)",
      "Street",
      "Candid",
      "Wildlife",
      "Travel",
      "Documentary",
      "Food Photography",
      "Photography Business"
    ],
    description: "Master optics, sensory control, natural and studio strobes, composition rules, and the exact business acumen required to book private and commercial clients."
  },
  {
    stopNumber: "02",
    tag: "Stop 02 · Both programmes",
    title: "Videography",
    subtitle: "Learn to move.",
    image: "/assets/92829f40-f725-4982-bb4c-b75dfa06bac4.jpg",
    imageAlt: "Two people shooting with a gimbal",
    chips: [
      "Gimbal Balancing",
      "Gimbal Movements",
      "Aerial Videography (Drone)",
      "Cinematography",
      "Shortfilm Making",
      "Portrait",
      "Indoor",
      "Automotive",
      "Candid Lighting",
      "Hoverboard Camera Movement"
    ],
    description: "Move from static frames to dynamic cinematic storytelling. Train with high-payload gimbals, follow-focus rigs, aerial quadcopters, and precision fluid heads."
  },
  {
    stopNumber: "03",
    tag: "Stop 03 · Both programmes",
    title: "Photo Editing",
    subtitle: "Find the look.",
    image: "/assets/4b32a154-0d06-4137-bfbe-d8c580a9073f.jpg",
    imageAlt: "Photo prints beside an editing workstation",
    chips: [
      "Grading & Retouching",
      "High-End Frequency Separation",
      "Portraits",
      "Landscapes",
      "Wedding Color Tones",
      "Modeling Lookbooks",
      "Adobe Photoshop",
      "Adobe Lightroom Classic"
    ],
    description: "Develop your signature color science and master editorial grade skin retouching, color grading, tone mapping, and batch workflow optimization."
  },
  {
    stopNumber: "04",
    tag: "Stop 04 · Both programmes",
    title: "Video Editing",
    subtitle: "Cut the story.",
    image: "/assets/4c0b7179-9592-44af-b728-d534e7d57e88.jpg",
    imageAlt: "Editor at a colour grading desk",
    chips: [
      "Reels & Vertical Narrative",
      "Teaser & Trailer Pacing",
      "Wedding Highlights",
      "Musical Albums",
      "Content Creation",
      "Short Films",
      "Adobe Premiere Pro",
      "DaVinci Resolve Studio",
      "After Effects FX",
      "AI Integrated Workflows"
    ],
    description: "Master the timeline, rhythm, sound design, multi-cam assembly, color grading nodes in DaVinci Resolve, and modern AI assistive tools."
  },
  {
    stopNumber: "05",
    tag: "Stop 05 · Media Master only",
    title: "Graphic Design & Motion",
    subtitle: "Build the brand.",
    image: "/assets/1ce9c5f9-bfab-442c-b731-56fcfd8ce758.jpg",
    imageAlt: "Designer with colour swatches and tablet",
    chips: [
      "Photoshop Techniques",
      "Creative Photo Compositing",
      "Illustrator & Identity Systems",
      "Vector Illustration",
      "InDesign Typography & Layouts",
      "After Effects Motion Graphics",
      "Kinetic Typography",
      "AI Generative Integration"
    ],
    description: "Translate visual ideas into commercial brand campaigns, title sequences, posters, dynamic kinetic graphics, and cohesive marketing collaterals."
  },
  {
    stopNumber: "06",
    tag: "Stop 06 · Media Master only",
    title: "Soft Skills",
    subtitle: "Become the professional.",
    image: "/assets/eeede332-45b6-4379-bf2c-7d17aaecd564.jpg",
    imageAlt: "Three professionals in conversation",
    chips: [
      "Communication with High-End Clients",
      "Creative Leadership",
      "Critical Thinking & Direction",
      "Time & Production Management",
      "Personal Branding & Social Media",
      "Portfolio Curation & Resume",
      "Interview & Pitching Skills",
      "Body Language & Set Grooming",
      "Personality Building Camp"
    ],
    description: "The differentiator between a technician and a sought-after visual director. Gain poise, presentation skills, contract negotiation abilities, and teamwork etiquette."
  }
];

// --------------------------------------------------------------------
// ACADEMY PROGRAMMES
// --------------------------------------------------------------------
export const PROGRAMMES: Program[] = [
  {
    id: "media-master",
    name: "Media Master Programme",
    duration: "1 Year",
    badge: "Flagship Comprehensive",
    modulesCount: "6 Full Modules",
    description: "Our signature professional diploma designed to build end-to-end creative directors capable of shooting, editing, designing, and leading visual campaigns.",
    featured: true,
    price: "₹ 1,45,000",
    installments: "Flexible 3-stage installment options & zero-cost EMI assistance available",
    modules: [
      "Module 01: Photography (Lighting, Studio, Outdoor, Drone, Automotive, Commercial)",
      "Module 02: Videography (Cinematography, Gimbals, Hoverboard Movement, Short Films)",
      "Module 03: Photo Editing (Adobe Photoshop, Lightroom, Skin Retouching, Editorial Grading)",
      "Module 04: Video Editing (Adobe Premiere Pro, DaVinci Resolve, Color Science, Audio Design)",
      "Module 05: Graphic Design & Motion (Adobe Illustrator, InDesign, After Effects Kinetic Motion)",
      "Module 06: Soft Skills & Business (Client Pitching, Personality Camp, Portfolio Mentorship)"
    ],
    highlights: [
      "All 6 modules covered in full depth",
      "100% Placement assistance & hiring partner interviews",
      "Dedicated studio floor access with high-end lighting rigs",
      "Personality Building Camp included",
      "Official Lenor Media Master Diploma Certificate",
      "Lifetime creative alumni guild membership"
    ]
  },
  {
    id: "visual-media-production",
    name: "Visual Media Production",
    duration: "6 Months",
    badge: "Intensive Accelerator",
    modulesCount: "4 Core Modules",
    description: "An intensive sprint for creators who want to master camera craft and post-production without brand design theory. Ideal for aspiring wedding and commercial cinematographers.",
    featured: false,
    price: "₹ 85,000",
    installments: "Convenient 2-stage installment plan available",
    modules: [
      "Module 01: Photography (Camera Settings, Framing, Lighting, Studio & Outdoor)",
      "Module 02: Videography (Camera Movement, Drone, Gimbals, Cinematography)",
      "Module 03: Photo Editing (Photoshop Retouching, Lightroom Color Processing)",
      "Module 04: Video Editing (Premiere Pro, DaVinci Resolve, Reels, Story Cutting)"
    ],
    highlights: [
      "4 core craft modules focused on camera & editing",
      "85% hands-on live studio and location shooting",
      "Portfolio development of 10+ polished client-ready projects",
      "Placement interview referrals across studio network",
      "Official Lenor Visual Media Production Certificate"
    ]
  }
];

// --------------------------------------------------------------------
// PLACEMENTS & ALUMNI
// --------------------------------------------------------------------
export const PLACED_STUDENTS: PlacedStudent[] = [
  {
    id: "st-1",
    name: "Farhan Mansoor",
    role: "Lead Automotive Videographer",
    company: "Apex Motoring Media",
    category: "Videography",
    location: "Kochi, Kerala",
    batch: "Batch 2024",
    instagram: "farhan.lens",
    quote: "Lenor taught me how to move with the camera. Within 2 months of graduation, I was tracking supercars on closed strips.",
    cardImage: "/assets/92829f40-f725-4982-bb4c-b75dfa06bac4.jpg",
    cardPreset: "bursts"
  },
  {
    id: "st-2",
    name: "Anjana Krishnan",
    role: "Senior Wedding Photographer",
    company: "Memory Weaver Studios",
    category: "Photography",
    location: "Calicut, Kerala",
    batch: "Batch 2024",
    instagram: "anjana_frames",
    quote: "From zero lighting knowledge to commanding 500-guest wedding ceremonies. Lenor's mentor drills made me fearless.",
    cardImage: "/assets/aea971a7-2000-4f9c-b503-af69a67cc1cd.jpg",
    cardPreset: "stars"
  },
  {
    id: "st-3",
    name: "Muhammed Rashid",
    role: "Colorist & Offline Editor",
    company: "Wavefront Post House",
    category: "Editing",
    location: "Ernakulam, Kerala",
    batch: "Batch 2023",
    instagram: "rashid_cuts",
    quote: "DaVinci node structures and timeline rhythm were drilled into us daily. I stepped right into commercial post-production.",
    cardImage: "/assets/4c0b7179-9592-44af-b728-d534e7d57e88.jpg",
    cardPreset: "shards"
  },
  {
    id: "st-4",
    name: "Nikhil Varma",
    role: "Motion Designer",
    company: "BrandCraft Creative Agency",
    category: "Design",
    location: "Bengaluru, India",
    batch: "Batch 2024",
    instagram: "nikhil.motion",
    quote: "The combination of graphic design and kinetic motion in the Media Master programme gave me a massive edge in Bangalore agencies.",
    cardImage: "/assets/1ce9c5f9-bfab-442c-b731-56fcfd8ce758.jpg",
    cardPreset: "cosmos"
  },
  {
    id: "st-5",
    name: "Devika Nambiar",
    role: "Commercial Fashion Retoucher",
    company: "Vogue Retouch Studio",
    category: "Editing",
    location: "Mumbai, India",
    batch: "Batch 2023",
    instagram: "devika_retouch",
    quote: "High-end frequency separation and colour grading taught at Lenor are strictly international industry standard.",
    cardImage: "/assets/266814ca686b58ce6fb30ca1ba66a3d5.jpg",
    cardPreset: "swirl"
  },
  {
    id: "st-6",
    name: "Salmanul Faris",
    role: "Cinematographer & Drone Pilot",
    company: "Skyline Productions",
    category: "Videography",
    location: "Dubai, UAE",
    batch: "Batch 2024",
    instagram: "salman.aerials",
    quote: "Gimbal hoverboard movement and FPV drone workshops directly landed me international contract assignments.",
    cardImage: "/assets/af9e05d02e3d78a034a5eda12208dccf.jpg",
    cardPreset: "gold"
  },
  {
    id: "st-7",
    name: "Aiswarya Menon",
    role: "Studio Portrait Artist",
    company: "Lumiere Portrait Lab",
    category: "Photography",
    location: "Malappuram, Kerala",
    batch: "Batch 2024",
    instagram: "aiswarya.portrait",
    quote: "The lighting masterclasses at the Makkaraparamba studio changed everything I knew about shape and mood.",
    cardImage: "/assets/8ba53ea25eca22da1f3017b76d4e1868.jpg",
    cardPreset: "rainbow"
  },
  {
    id: "st-8",
    name: "Jithin Thomas",
    role: "Creative Director",
    company: "Pixel Craft Media",
    category: "Design",
    location: "Coimbatore, Tamil Nadu",
    batch: "Batch 2023",
    instagram: "jithin_director",
    quote: "Lenor didn't just teach software; it taught creative leadership, pitching, and client communication.",
    cardImage: "/assets/40c26ca8e28d1ad43b398e249b22603d.jpg",
    cardPreset: "glitter"
  }
];

export const HIRING_PARTNERS = [
  "Apex Motoring Media",
  "Memory Weaver Studios",
  "Wavefront Post House",
  "BrandCraft Agency",
  "Lumiere Lab",
  "Skyline Productions",
  "Pixel Craft Media",
  "Monochrome Films",
  "Vogue Retouching",
  "Red Dot Cinemas",
  "Aura Wedding Films",
  "Hyperdrive Ads"
];

// --------------------------------------------------------------------
// EVENTS & WORKSHOPS
// --------------------------------------------------------------------
export const EVENTS_DATA: EventItem[] = [
  {
    id: "ev-hoverboard",
    title: "Hoverboard Camera Movement Workshop",
    category: "Workshops",
    date: "15 November 2026",
    time: "10:00 AM – 4:00 PM",
    venue: "Lenor Academy Studio Floor, Makkaraparamba",
    description: "An intensive masterclass learning frictionless tracking shots, low-angle whip moves, and camera stabilization techniques using motorized self-balancing boards.",
    image: "/assets/f9607b8e989abbaa401503b580e2dbe8.jpg",
    status: "Upcoming",
    registrationOpen: true,
    spotsLeft: 8
  },
  {
    id: "ev-personality",
    title: "Personality Building & Client Pitch Camp",
    category: "Camps",
    date: "28 November 2026",
    time: "9:00 AM – 5:30 PM",
    venue: "Lenor Academy Auditorium, Makkaraparamba",
    description: "Two days of high-intensity communication, body language training, portfolio presentation simulations, and mock client negotiations.",
    image: "/assets/eeede332-45b6-4379-bf2c-7d17aaecd564.jpg",
    status: "Upcoming",
    registrationOpen: true,
    spotsLeft: 12
  },
  {
    id: "ev-drone-day",
    title: "Aerial & Drone Cinematography Day",
    category: "Workshops",
    date: "12 December 2026",
    time: "7:00 AM – 2:00 PM",
    venue: "Scenic Ridge Outdoor Range, Malappuram",
    description: "Practical outdoor flight day mastering parallax shots, reveal flights, safety regulations, weather calculations, and cinematic framing from the sky.",
    image: "/assets/1fb7aa06fcb8e992f56088cc1a94cdd3.jpg",
    status: "Upcoming",
    registrationOpen: true,
    spotsLeft: 6
  },
  {
    id: "ev-open-studio",
    title: "Open Studio Day & Creative Experience",
    category: "Open days",
    date: "20 December 2026",
    time: "11:00 AM – 5:00 PM",
    venue: "Lenor Academy, Makkaraparamba",
    description: "Meet faculty mentors, test drive mirrorless setups, explore the color grading suites, review student films, and receive immediate portfolio critique.",
    image: "/assets/430e290e-ef97-4964-a65b-a23923adad3f.jpg",
    status: "Upcoming",
    registrationOpen: true,
    spotsLeft: 25
  },
  {
    id: "ev-convocation",
    title: "Annual Convocation & Graduation Gala",
    category: "Ceremonies",
    date: "10 January 2027",
    time: "3:00 PM – 8:00 PM",
    venue: "Grand Convention Center, Malappuram",
    description: "Honoring our graduating Media Master and Visual Media Production batches with industry keynote speakers, student awards, and agency showcase.",
    image: "/assets/179f0e839c946970e2d9cfc3d4064f35.jpg",
    status: "Upcoming",
    registrationOpen: false
  }
];

// --------------------------------------------------------------------
// BLOG ARTICLES
// --------------------------------------------------------------------
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "photographer-business-class",
    title: "Why every photographer needs a business class",
    category: "Photography",
    readTime: "6 min read",
    date: "24 October 2026",
    author: "Lenor Faculty Guild",
    authorRole: "Studio Mentors",
    image: "/assets/28b8b129bd95e6d83b42819751b4ad6b.jpg",
    imageAlt: "Mirrorless camera seen from above",
    featured: true,
    summary: "The greatest technical skills with a camera won't save a business that doesn't understand client management, pricing floors, usage rights, and contracts. Here is what creative schools rarely tell you.",
    content: [
      "Many emerging photographers believe that having an eye for light and an expensive lens will automatically fill an inquiry inbox. But in the commercial and wedding markets, talent is merely the baseline table stakes.",
      "What actually sustains a career is knowing how to calculate your day rate, invoice for licensing, structure delivery contracts, and manage clients throughout the creative cycle.",
      "At Lenor Academy, we treat the business of photography as equal in importance to exposure triangle mechanics. We walk students through real commercial quote templates, dispute handling, and personal branding before they ever take their final exams."
    ]
  },
  {
    id: "lighting-where-to-start",
    title: "Lighting in photography: where to start",
    category: "Photography",
    readTime: "5 min read",
    date: "18 October 2026",
    author: "Shahan K.",
    authorRole: "Lead Photography Instructor",
    image: "/assets/d332320c1e882f01b6c1f0cab9e8fdd7.jpg",
    imageAlt: "Vintage camera with a strap",
    summary: "Hard light vs soft light, modifiers, parabolic umbrellas, and how to read the shadows on your subject's cheekbones.",
    content: [
      "Light is not merely illumination; it is the brush that carves dimension into a two-dimensional sensor.",
      "Beginners often fear strobes and cling to natural window light. The breakthrough happens when you understand the inverse-square law and modifier feathering.",
      "Once you grasp how light drops off and how feathering creates natural micro-gradients across a portrait, the entire studio opens up."
    ]
  },
  {
    id: "gimbal-balancing-step-by-step",
    title: "Gimbal balancing, step by step",
    category: "Videography",
    readTime: "7 min read",
    date: "12 October 2026",
    author: "Nikhil Raj",
    authorRole: "Cinematography Faculty",
    image: "/assets/d239a7ff1fed20dcbd601af8a22cc445.jpg",
    imageAlt: "Gimbal on a tabletop tripod",
    summary: "Never burn out a motor again. The 4-axis calibration ritual every professional camera operator performs before hitting Record.",
    content: [
      "If you power on your 3-axis stabilizer before mechanical balance is reached, the brushless motors will constantly fight gravity and overheat.",
      "Step 1: Balance vertical tilt with lens pointed at the ceiling. Step 2: Balance horizontal tilt. Step 3: Roll axis. Step 4: Pan axis with the gimbal tilted 45 degrees.",
      "A correctly balanced rig requires zero motor effort at rest. Your footage immediately gains the organic smoothness of a dolly."
    ]
  },
  {
    id: "davinci-resolve-color-nodes",
    title: "Color grading workflows: DaVinci Resolve node trees",
    category: "Editing",
    readTime: "8 min read",
    date: "05 October 2026",
    author: "Arun Paul",
    authorRole: "Post-Production Supervisor",
    image: "/assets/8ce65b342d3f8d32510b479fdae70e64.jpg",
    imageAlt: "Video editing timeline",
    summary: "Constructing a clean, non-destructive node tree from camera color space transform to exposure balance and creative look curves.",
    content: [
      "In modern video post-production, DaVinci Resolve is the universal standard. But beginners often pile contrast, saturation, and power windows onto a single node.",
      "The secret is modular node separation: Exposure -> Balance -> CST -> Look Curve -> Film Grain. This gives you absolute control over revisions without unravelling your primary pass."
    ]
  },
  {
    id: "graphic-design-principles-for-directors",
    title: "Graphic design principles every visual director must know",
    category: "Design",
    readTime: "4 min read",
    date: "28 September 2026",
    author: "Fatima Noor",
    authorRole: "Design & Brand Faculty",
    image: "/assets/40c26ca8e28d1ad43b398e249b22603d.jpg",
    imageAlt: "Designer working with colour swatches",
    summary: "Visual hierarchy, negative space, and font pairing: how understanding typography makes you a radically better video editor.",
    content: [
      "A cinematic short film can be utterly ruined by amateurish title typography. Typography communicates tone, era, and credibility before a single word is parsed.",
      "Learn the difference between geometric sans, humanist serifs, and editorial display fonts. Let your graphic sensibilities frame every camera composition."
    ]
  },
  {
    id: "breaking-into-drone-work",
    title: "Navigating the skies: Breaking into professional drone work",
    category: "Careers",
    readTime: "5 min read",
    date: "19 September 2026",
    author: "Suhail V.P.",
    authorRole: "Aerial Specialist",
    image: "/assets/0cd570dbfecb6b5862083a6e2a300467.jpg",
    imageAlt: "White drone against a pale sky",
    summary: "From real estate inspections to wedding aerials and automotive reveals: how to monetize your certified pilot hours.",
    content: [
      "Flying a drone is relatively easy thanks to GPS lock. Flying a drone like a camera jib operator—smooth, multi-axis, intentional—is an art form that clients pay top dollar for.",
      "We break down the legal permissions, payload choices, and cinematic maneuvers that keep clients coming back."
    ]
  }
];

// --------------------------------------------------------------------
// SUCCESS STORIES
// --------------------------------------------------------------------
export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: "story-editor",
    studentName: "Adil Shan",
    category: "Video Editing",
    course: "Media Master Programme",
    batch: "Batch 2024",
    quote: "I came to Lenor knowing just how to splice clips on my phone. One year later, I was color grading music videos and cutting commercial ads for major brands.",
    joinedYear: "2023",
    learnedModule: "Premiere Pro, DaVinci Resolve Studio & After Effects",
    currentRole: "Lead Colorist & Editor",
    currentCompany: "Horizon Visuals, Kochi",
    location: "Kochi, Kerala",
    image: "/assets/266814ca686b58ce6fb30ca1ba66a3d5.jpg",
    imageAlt: "Editor working at a grading desk",
    detailedStory: "Adil joined with a deep interest in cinema but zero formal training. During his 12 months in the Media Master programme, he spent hundreds of hours in Lenor's dedicated edit lab, completing 35 practical project assignments."
  },
  {
    id: "story-videographer",
    studentName: "Rinshad K.",
    category: "Videography",
    course: "Visual Media Production",
    batch: "Batch 2024",
    quote: "The gimbal drills, lighting setups, and hoverboard balance training prepared me for real set pressure. On my very first commercial shoot, the director thought I had five years of industry experience.",
    joinedYear: "2024",
    learnedModule: "Cinematography, Gimbal Balancing & Aerial Drone",
    currentRole: "Chief Cinematographer",
    currentCompany: "Monochrome Weddings & Films",
    location: "Calicut, Kerala",
    image: "/assets/af9e05d02e3d78a034a5eda12208dccf.jpg",
    imageAlt: "Camera operator in silhouette",
    detailedStory: "Rinshad wanted a fast, hyper-focused accelerator. Enrolling in the 6-month Visual Media Production course, he honed his physical movement and lighting instincts, quickly establishing himself as one of Malappuram's top wedding cinematographers."
  },
  {
    id: "story-photographer",
    studentName: "Fathima Hameed",
    category: "Photography",
    course: "Media Master Programme",
    batch: "Batch 2023",
    quote: "Lenor didn't just teach me how to hold a camera; it gave me the confidence to build my own portrait studio and pitch to fashion retailers.",
    joinedYear: "2023",
    learnedModule: "Studio Lighting, Portraiture & Retouching",
    currentRole: "Founder & Creative Director",
    currentCompany: "Lumina Studios",
    location: "Malappuram, Kerala",
    image: "/assets/8ba53ea25eca22da1f3017b76d4e1868.jpg",
    imageAlt: "Film camera on a tripod",
    detailedStory: "Starting with a modest beginner DSLR, Fathima mastered three-point studio strobes, product composition, and high-end beauty retouching. Today, her studio books commercial lookbooks and editorial portraits months in advance."
  }
];

// --------------------------------------------------------------------
// CAREERS & OPEN ROLES
// --------------------------------------------------------------------
export const JOB_OPENINGS: JobOpening[] = [
  {
    id: "job-faculty-photo",
    title: "Faculty · Commercial Photography",
    craft: "Photography",
    type: "Full-Time / Part-Time",
    location: "Makkaraparamba, Malappuram",
    description: "Lead studio and outdoor photography classes, mentor emerging artists in lighting principles, and conduct portfolio evaluation sessions.",
    requirements: [
      "Minimum 3+ years active commercial/editorial photography experience",
      "Proficiency with studio strobe systems (Godox, Profoto, Elinchrom)",
      "Deep mastery of Adobe Lightroom Classic & Photoshop",
      "Passion for mentoring and patient communication"
    ]
  },
  {
    id: "job-faculty-edit",
    title: "Faculty · Video Editing & Color Science",
    craft: "Video Editing",
    type: "Full-Time / Part-Time",
    location: "Makkaraparamba, Malappuram",
    description: "Guide students through narrative assembly, pacing, multi-track audio mastering, and professional color grading pipelines in DaVinci Resolve.",
    requirements: [
      "Strong portfolio of commercials, short films, or high-end wedding films",
      "Advanced mastery of DaVinci Resolve Studio and Adobe Premiere Pro",
      "Understanding of modern color management (ACES, CST, Log profiles)",
      "Comfortable teaching live classes and conducting project reviews"
    ]
  },
  {
    id: "job-studio-assistant",
    title: "Studio Floor Assistant & Gear Tech",
    craft: "Studio Operations",
    type: "Full-Time",
    location: "Makkaraparamba, Malappuram",
    description: "Manage camera bodies, lenses, lighting modifiers, gimbals, and studio maintenance; assist mentors and students during live practical shoots.",
    requirements: [
      "Familiarity with cinema and mirrorless cameras, batteries, and grip gear",
      "Strong attention to detail, gear cleaning, and inventory tracking",
      "Proactive, helpful attitude on studio set"
    ]
  },
  {
    id: "job-admissions",
    title: "Admissions & Student Career Counsellor",
    craft: "Admissions & Outreach",
    type: "Full-Time",
    location: "Makkaraparamba, Malappuram",
    description: "Guide prospective students and parents through course curricula, career pathways, campus tours, and enrollment documentation.",
    requirements: [
      "Excellent spoken Malayalam and English communication skills",
      "Warm, empathetic counselling manner with genuine interest in media careers",
      "Basic understanding of creative industries and media workflows"
    ]
  }
];
