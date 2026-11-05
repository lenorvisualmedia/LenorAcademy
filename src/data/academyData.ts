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
  category?: 'Flagship' | 'Diploma' | 'Fast-Track' | 'Crash Course';
  track?: 'flagship' | 'diploma' | 'short';
  certification?: string;
  eligibility?: string;
  batchSize?: string;
  softwareCount?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Campuses & Travel' | 'Equipment & Labs' | 'Courses & Eligibility' | 'Placement & Career' | 'Fees & EMI' | 'Hostel & Food';
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
  eyebrow: "Lenor Academy® · Photography · Videography · Editing · Cinematography · Drone · Graphic Design",
  address: "CP Building, Makkaraparamba, Malappuram, Kerala",
  mainBranch: "Makkaraparamba, Malappuram (3 Campuses + Outdoor Hut)",
  kochiBranch: "Madavanna, Ernakulam (Kochi)",
  branches: [
    {
      id: "makkaraparamba",
      name: "Makkaraparamba Main Branch",
      location: "Makkaraparamba, Malappuram, Kerala",
      address: "CP Building, Makkaraparamba, Malappuram, Kerala - 676507",
      campuses: [
        {
          name: "South Campus",
          role: "Main air-conditioned lecture classrooms, high-end post-production editing labs, and dedicated Product Lab."
        },
        {
          name: "North Campus",
          role: "Dedicated computer suites and specialized creative labs for Video Editing & Graphic Designing."
        },
        {
          name: "Studio Campus",
          role: "Commercial studio stage for product lighting & indoor photography, dedicated Film Review Screening Theatre for student projects, and Drone Simulator Lab."
        },
        {
          name: "Outdoor Property & Hut",
          role: "Nearby natural lush green outdoor setting for natural-light photography and creative outdoor cinematography."
        }
      ]
    },
    {
      id: "ernakulam",
      name: "Ernakulam Branch",
      location: "Madavanna, Ernakulam (Kochi), Kerala",
      address: "Madavanna, Ernakulam, Kochi, Kerala",
      role: "City branch connected directly to transit hubs with verified PG and hostel facilities."
    }
  ],
  phone: "+91 91883 74232",
  email: "lenorvisualmedia@gmail.com",
  admissionsEmail: "admissions@lenoracademy.com",
  careersEmail: "careers@lenoracademy.com",
  brochurePath: "/Lenor_Academy_Brochure_2026.pdf",
  instagram: "https://instagram.com/lenoracademy",
  youtube: "https://youtube.com/@lenoracademy",
  accreditations: [
    "Media & Entertainment Skills Council (MESC) under NSDC",
    "HRDS under Skill India",
    "ISO 9001:2015 Qualified Media Academy"
  ],
  gearArsenal: {
    cinema: ["RED Epic Cinema Rig"],
    cameras: [
      "Sony A7 IV (M4)",
      "Sony A7 V (M5)",
      "Sony A7S III (S3)",
      "Sony A7 III (M3)",
      "Sony A6400",
      "Sony ZV-E10 (Vlog)",
      "Nikon ZR",
      "Nikon Z6 III",
      "Nikon Z5 II"
    ],
    gimbals: [
      "DJI RS5",
      "DJI RS4",
      "DJI RS4 Mini",
      "DJI RS3",
      "Zhiyun Crane 2",
      "Hoverboard-Based Dynamic Balancing Systems"
    ],
    drones: [
      "DJI Mini 5 Pro",
      "DJI Neo 2",
      "Dedicated Drone Simulator Lab"
    ],
    editingRigs: "High-end editing workstations with 1 dedicated PC per student during editing sessions",
    batchRatio: "Max 28–30 students per batch · 1 Camera per 3–4 students · 1 PC per student"
  },
  studentKit: {
    providedByAcademy: "All Cameras, Cinema Rigs, Gimbals, Drones, Lighting, Modifiers, and High-End Editing PCs are fully provided by the Academy at zero equipment fee.",
    studentBrings: [
      {
        item: "High-Speed SSD or External Hard Drive",
        desc: "To store, back up, and take home raw footage, project timelines, and portfolio exports."
      },
      {
        item: "Reusable Handling Gloves",
        desc: "To safeguard precision cinema cameras, lenses, and gimbals from hand sweat during prolonged production shoots."
      },
      {
        item: "Personal Wired Headset",
        desc: "For personal hygiene and precise audio monitoring / sound design during 2–3 hour editing lab sessions."
      }
    ]
  },
  travelConnectivity: {
    nearestStation: "Angadippuram Railway Station (10–15 km by bus directly to Makkaraparamba)",
    longDistanceHub: "Tirur Railway Station (Mainline railway hub with frequent trains across India + direct bus to Makkaraparamba)"
  },
  stayAndFood: {
    facilities: "10 Academy-managed stay facilities in Malappuram (~9 for boys, 1 dedicated ladies' hostel with resident warden within walking distance).",
    amenities: "Wi-Fi, 24/7 water, and fully equipped kitchens in every stay.",
    capacity: "Accommodating 200+ students from across India and abroad.",
    food: "Reasonable dining within walking distance: Kudumbashree hotels from ₹40, local eateries serving authentic Kerala meals, biriyani, and mandi.",
    refundPolicy: "Flexible 1-week refund policy if shifting to an outside private room.",
    ernakulamStay: "Academy provides verified PG & hostel contacts within Ernakulam town."
  },
  financing: {
    provider: "Bajaj Finance Easy EMI Facility Available",
    details: "Zero-stress monthly installments arranged through Bajaj Finance representatives."
  },
  stats: {
    studentsPlaced: "500+",
    studentsTrained: "3,000+",
    activeStudents: "525+",
    facultyCount: "50+",
    computersCount: "180+",
    mirrorlessCamerasCount: "70+",
    establishedYear: "2018",
    keralaRankTitle: "Kerala’s Only Institute with 525+ Active Photography Students",
    hiringPartners: "45+",
    placementRate: "100%",
    practicalRatio: "80%",
    dailyEnquiries: "5–6 daily hiring calls in Alumni Network"
  },
  vision: "To become a leading institution in visual media education by empowering aspiring creators with professional knowledge, creative skills, modern technology and industry experience.",
  mission: "To transform creative passion into professional careers through quality education, practical training and modern infrastructure.",
  founders: [
    {
      name: "Faisal Babu K.",
      role: "Founder, Managing Director & CEO",
      badge: "Indian Army Veteran & Entrepreneur",
      bio: "An Indian Army veteran and entrepreneur, Faisal Babu K. is the driving force behind Lenor Academy's strategic vision and institutional development. With a strong commitment to excellence in creative media education, he oversees the academy's operations, academic development, and long-term expansion.",
      focus: "His leadership is focused on bridging the gap between education and industry through practical, career-oriented training, while building Lenor Academy into a recognized institution for creative media education across India."
    },
    {
      name: "Farshan K.",
      role: "Co-Founder & Director – Marketing & Growth",
      badge: "BMMC Graduate · Digital Content Creator",
      bio: "Farshan K. holds a Bachelor's degree in Multimedia Communication (BMMC) and brings a strong creative background in digital media, content production, and brand development.",
      experience: "As a digital content creator associated with Lenor Weddings and Lenor Entertainment, he has gained valuable experience in digital storytelling, audience engagement, and creative media production.",
      focus: "At Lenor Academy, he spearheads marketing, brand development, student outreach, and growth initiatives. His combination of creative expertise and business insight contributes to strengthening the academy's presence and connecting aspiring media professionals with industry-focused education."
    }
  ],
  officialCourses: [
    { id: "mmp", name: "MMP – Media Master Programme", duration: "12 Months" },
    { id: "vmp", name: "VMP – Visual Media Production", duration: "6 Months" },
    { id: "mdep", name: "Media Design & Editing Professional", duration: "6 Months" },
    { id: "egdc", name: "Editing & Graphic Designing Course", duration: "3 Months" },
    { id: "photo", name: "Photography Course", duration: "2 Months" },
    { id: "video", name: "Videography Course", duration: "6 Days" },
    { id: "drone", name: "Drone Course", duration: "5 Days" }
  ]
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
    image: "/assets/aea971a7-2000-4f9c-b503-af69a67cc1cd.webp",
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
    image: "/assets/92829f40-f725-4982-bb4c-b75dfa06bac4.webp",
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
    image: "/assets/4b32a154-0d06-4137-bfbe-d8c580a9073f.webp",
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
    image: "/assets/4c0b7179-9592-44af-b728-d534e7d57e88.webp",
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
    image: "/assets/1ce9c5f9-bfab-442c-b731-56fcfd8ce758.webp",
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
    image: "/assets/eeede332-45b6-4379-bf2c-7d17aaecd564.webp",
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
    name: "Media Master Programme (MMP)",
    duration: "1 Year",
    badge: "Flagship Comprehensive · 100% Placement Assurance",
    modulesCount: "8+ Softwares · 6 Core Modules",
    description: "Our signature professional diploma designed to build complete media directors capable of shooting cinema, cutting commercials, designing brands, and leading productions.",
    featured: true,
    price: "₹ 1,45,000",
    installments: "Flexible installment options & Bajaj Finance EMI assistance available",
    category: "Flagship",
    track: "flagship",
    certification: "MESC under NSDC + Lenor Academy Certificate + Internship & Experience Certificate",
    eligibility: "Plus Two (for 100% Placement Assurance within 6 months) / 10th Pass (with Placement Assistance)",
    batchSize: "Max 28–30 students · 1 camera per 3–4 students · 1 PC per student",
    softwareCount: "8+ Softwares: Premiere Pro, DaVinci Resolve, After Effects, Photoshop, Lightroom, Illustrator, InDesign, Canva",
    modules: [
      "Module 01: Advanced Photography (Lighting, Studio, Product, Portrait, Candid, Automotive, Street, Wildlife, Food)",
      "Module 02: Cinematic Videography (RED Epic cinema handling, Gimbals, Hoverboard balancing, Lighting, Shot planning)",
      "Module 03: Photo Editing & Color Science (Photoshop Camera Raw, High Pass, Masking, Lightroom batch grading)",
      "Module 04: Video Post-Production (Premiere Pro, DaVinci Resolve log color grading, After Effects motion graphics)",
      "Module 05: Graphic Design & Brand Identity (Illustrator, InDesign, Canva, Vector illustration, Social media systems)",
      "Module 06: Soft Skills, Personality Camp & AI (4-5 Day Off-Grid camp, Client pitching, AI generative workflows)"
    ],
    highlights: [
      "100% Placement Assurance within 6 months (for Plus Two graduates)",
      "Hands-on cinema camera training on RED Epic & Sony cinema setups",
      "4–5 Day Off-Grid Personality Camp (stay together away from phones & social media)",
      "8+ Industry-standard software applications mastered from basic to advanced",
      "Dedicated Drone Simulator Lab + Live outdoor flight training with DJI Mini 5 Pro & Neo 2",
      "Hoverboard-based gimbal balancing & dynamic tracking shots",
      "AI-integrated workflows: Auto transcription, text-based edit, scene gen & Generative Fill",
      "Curated commercial LUTs, presets, and asset packs provided for lifetime use"
    ]
  },
  {
    id: "visual-media-production",
    name: "Visual Media Production (VMP)",
    duration: "6 Months",
    badge: "Intensive Camera & Post Accelerator",
    modulesCount: "5 Core Modules + Short Film Project",
    description: "An intensive sprint for creators who want to master camera craft, gimbal movements, drone piloting, and post-production. Ideal for aspiring wedding and commercial cinematographers.",
    featured: false,
    price: "₹ 85,000",
    installments: "Convenient installment plan & Bajaj Finance EMI available",
    category: "Flagship",
    track: "flagship",
    certification: "MESC under NSDC + Lenor Academy Certificate",
    eligibility: "10th Standard (SSLC)",
    batchSize: "Max 28–30 students · 1 camera per 3–4 students · 1 PC per student",
    softwareCount: "Premiere Pro, DaVinci Resolve, After Effects, Photoshop, Lightroom",
    modules: [
      "Module 01: Photography (Studio Lighting, Product, Automotive, Portrait, Candid, Landscape)",
      "Module 02: Videography (Gimbal balancing & movement, Automotive & Model shoots, Dynamic lighting)",
      "Module 03: Photo Editing (Photoshop retouching, Camera Raw, Lightroom color processing)",
      "Module 04: Video Editing (Premiere Pro timeline, DaVinci Resolve log color grading, After Effects essentials)",
      "Module 05: Drone & Business (Theory, Simulator Lab, Flight practice, Photography Business & Freelance)"
    ],
    highlights: [
      "80% hands-on practical training in live studio and outdoor environments",
      "Independent Short Film graduation project shot & edited independently",
      "Comprehensive Drone Training: Theory, Simulator Lab, and live flying practice",
      "DaVinci Resolve log footage color grading and Premiere Pro commercial timeline assembly",
      "Photography Business & Freelancing client acquisition strategies",
      "Placement Assistance with active referrals across our studio network",
      "Free pack of professional LUTs and presets included"
    ]
  },
  {
    id: "media-designing-editing",
    name: "Media Designing & Editing Professional",
    duration: "6 Months",
    badge: "Post-Production & Graphic Design Master",
    modulesCount: "Combined Design & Video Suite",
    description: "A comprehensive dual-discipline programme teaching graphic design, photo retouching, and professional video editing together for creators who want total post-production mastery.",
    featured: false,
    price: "₹ 85,000",
    installments: "Installment options & Bajaj Finance EMI available",
    category: "Flagship",
    track: "flagship",
    certification: "MESC under NSDC + Lenor Academy Certificate",
    eligibility: "10th Standard (SSLC)",
    batchSize: "Max 28–30 students · 1 dedicated high-end PC per student",
    softwareCount: "Photoshop, Illustrator, InDesign, Canva, Premiere Pro, DaVinci Resolve, After Effects, Lightroom",
    modules: [
      "Module 01: Graphic Designing (Thumbnails, Vector graphics, Illustration, Branding & Visual identity)",
      "Module 02: Social Media & Ad Assets (Content creation, Reels graphics, Banners, Promotional videos)",
      "Module 03: Advanced Video Editing (Viral reels, Wedding highlights, Multicamera, Podcasts)",
      "Module 04: Color Grading & Motion (DaVinci Resolve log color nodes, After Effects motion graphics)",
      "Module 05: AI Integration (Generative Fill, Auto captions, Text-based editing, 3D mockups)"
    ],
    highlights: [
      "Graphic Design + Photo Editing + Video Editing combined in one course",
      "High-end editing workstations with 1 dedicated PC per student during edit classes",
      "Master Premiere Pro, DaVinci Resolve Studio, After Effects, Photoshop, Illustrator, InDesign & Canva",
      "Real-world projects: Multicam podcast editing, commercial reels, and branding systems",
      "AI-powered workflows: Generative fill, scene generation, and auto captions",
      "Placement Assistance & lifetime access to curated LUTs and design presets",
      "MESC under NSDC recognized certification"
    ]
  },
  {
    id: "diploma-graphic-designing",
    name: "Diploma in Graphic Designing",
    duration: "3 Months",
    badge: "Visual Identity & Social Media Design",
    modulesCount: "4 Core Design Applications + AI",
    description: "Master modern brand design, social media visuals, high-converting thumbnails, and advertising campaigns with AI integration on high-end creative workstations.",
    featured: false,
    price: "₹ 45,000",
    installments: "Convenient installments & Bajaj Finance EMI available",
    category: "Diploma",
    track: "diploma",
    certification: "HRDS Certificate under Skill India + Lenor Academy Certificate",
    eligibility: "10th Standard (SSLC)",
    batchSize: "Dedicated high-end PC per student",
    softwareCount: "Adobe Photoshop, Adobe Illustrator, Adobe InDesign, Canva",
    modules: [
      "Module 01: Vector Graphics & Brand Identity (Illustrator logos, typography, visual hierarchy)",
      "Module 02: High-Converting Digital Media (YouTube thumbnails, social media reels graphics, ad banners)",
      "Module 03: Editorial & Publishing Design (InDesign magazine layouts, brochures, marketing collaterals)",
      "Module 04: AI Design Integration (Generative Fill, mood boards, brand story development, 3D mockups)"
    ],
    highlights: [
      "HRDS Certificate under Skill India + Lenor Academy Certificate",
      "Practical project-driven learning across Photoshop, Illustrator, InDesign & Canva",
      "Deep integration of AI generative tools for rapid concepting and 3D mockups",
      "Build a polished commercial portfolio ready for design agencies and freelance clients",
      "Conducted on high-end editing PCs with 1-on-1 mentor guidance",
      "Placement Assistance with active alumni network job leads"
    ]
  },
  {
    id: "professional-editing-course",
    name: "Professional Editing Course",
    duration: "3 Months",
    badge: "Photo Retouching & Cinematic Video Post",
    modulesCount: "Complete Post-Production Suite",
    description: "From Camera Raw retouching and frequency separation to DaVinci Resolve log color grading, Premiere Pro pacing, and After Effects 3D tracking.",
    featured: false,
    price: "₹ 45,000",
    installments: "Flexible installments & Bajaj Finance EMI available",
    category: "Diploma",
    track: "diploma",
    certification: "HRDS Certificate under Skill India + Lenor Academy Certificate",
    eligibility: "10th Standard (SSLC)",
    batchSize: "Dedicated high-end PC per student",
    softwareCount: "Photoshop, Lightroom, Premiere Pro, DaVinci Resolve, After Effects",
    modules: [
      "Module 01: Photo Editing (Photoshop Camera Raw, High Pass, Frequency separation, Lightroom batch tones)",
      "Module 02: Premiere Pro Editing (Modelling reels, Automotive reels, Commercials, Wedding highlights)",
      "Module 03: DaVinci Resolve Color Science (Working with log footage, node trees, CST, creative LUTs)",
      "Module 04: After Effects FX (Speed ramping, trending mask animations, 3D camera & object tracking)",
      "Module 05: AI Editing Tools (Auto transcription, auto captions, text-based edit, object removal)"
    ],
    highlights: [
      "HRDS Certificate under Skill India + Lenor Academy Certificate",
      "Not just basic splicing: full professional color grading and 3D tracking motion graphics",
      "Hands-on training on dedicated high-end editing PCs",
      "AI-integrated editing tools (automatic captioning, object removal, text-based edit)",
      "Includes free professional LUTs, presets, and sound assets for personal and commercial work",
      "Placement Assistance with studio and post-house referrals"
    ]
  },
  {
    id: "photography-videography-course",
    name: "Photography & Videography Course",
    duration: "2 Months",
    badge: "Foundation & Intermediate Practical",
    modulesCount: "2 Practical Disciplines",
    description: "The ideal hands-on sprint for beginners, vacation learners, and creators exploring the field before purchasing cameras. 100% equipment provided by Lenor.",
    featured: false,
    price: "₹ 35,000",
    installments: "Convenient payment options available",
    category: "Fast-Track",
    track: "short",
    certification: "ISO-Qualified Lenor Academy Certificate",
    eligibility: "8th Standard Pass (No upper age limit)",
    batchSize: "Small batches · 1 camera per 3–4 students",
    softwareCount: "Camera handling, Lighting rigs & Gimbal calibration",
    modules: [
      "Module 01: Practical Photography (Camera settings, exposure triangle, studio & natural lighting, portraits, product, automotive)",
      "Module 02: Dynamic Videography (Gimbal mechanical balancing, 4-axis calibration, tracking movements, candid lighting)"
    ],
    highlights: [
      "ISO-Qualified Lenor Academy Certificate with industry credibility",
      "Zero equipment needed: Practise with Lenor's Sony M3/M4/M5, Nikon Z series, and DJI gimbals",
      "Build a starter portfolio with real model shoots and automotive sessions",
      "Explore both photography and videography to determine your ideal creative specialization",
      "Open to students from 8th standard upwards with no upper age limit",
      "Seamless foundation to upgrade into 6-month or 1-year programmes"
    ]
  },
  {
    id: "videography-crash-course",
    name: "Videography Crash Course",
    duration: "6 Days",
    badge: "Exclusive 2–3 Students / Batch",
    modulesCount: "Hyper-Focused Camera & Gimbal Sprint",
    description: "Tailored for photographers who already understand exposure and want to master cinematic videography, gimbal balancing, dynamic movement, and audio recording in 6 days.",
    featured: false,
    price: "₹ 18,000",
    installments: "Direct course registration fee",
    category: "Crash Course",
    track: "short",
    certification: "Lenor Academy Certificate",
    eligibility: "Photographers and creators with basic camera knowledge",
    batchSize: "Strictly 2–3 students per batch for individual attention",
    softwareCount: "Camera settings, DJI RS gimbals & Audio rigs",
    modules: [
      "Day 1–2: Gimbal Mechanical Balancing, Motor Calibration & Parameter Settings",
      "Day 3–4: Camera Settings for Video (Frame rates, shutter rule, profiles) & Dynamic Lighting",
      "Day 5: Clean Audio Recording & Lavalier/Shotgun mic setups",
      "Day 6: Full-Day Practical Production Shoot with mentor feedback"
    ],
    highlights: [
      "Ultra-exclusive micro batch of only 2 to 3 students for maximum hands-on time",
      "Designed specifically for photographers looking to immediately offer video services",
      "Gimbal calibration, whip pans, parallax tracking, and forward push movements",
      "Schedule: Monday to Friday 2:30 PM – 5:30 PM + Saturday Full-Day shoot",
      "Gain real confidence conducting professional commercial and wedding video shoots"
    ]
  },
  {
    id: "drone-course",
    name: "Drone Operations & Aerial Cinematography",
    duration: "5 Days",
    badge: "Theory · Simulator Lab · Live Flight",
    modulesCount: "3-Stage Flight Training",
    description: "A complete 5-day aerial program progressing from flight mechanics and safety regulations to dedicated simulator drills and live flight with DJI Mini 5 Pro & DJI Neo 2.",
    featured: false,
    price: "₹ 15,000",
    installments: "Direct course registration fee",
    category: "Crash Course",
    track: "short",
    certification: "Lenor Academy Certificate (DGCA licensing curriculum in progress)",
    eligibility: "Open to all aspiring drone pilots and visual creators",
    batchSize: "Small batch flight groups",
    softwareCount: "Drone Simulator Lab + DJI Mini 5 Pro & DJI Neo 2",
    modules: [
      "Stage 01: Drone Theory (Airspace safety, aerodynamics, DGCA regulations, weather calculations)",
      "Stage 02: Dedicated Drone Simulator Lab (Virtual flight maneuvers, obstacle handling, muscle memory)",
      "Stage 03: Live Outdoor Flying (DJI Mini 5 Pro & DJI Neo 2 hands-on flight practice)",
      "Stage 04: Aerial Cinematography (Parallax orbits, top-down reveals, cinematic gimbal tilts)"
    ],
    highlights: [
      "Dedicated Drone Simulator Lab to master controls before touching real aircraft",
      "Hands-on flying experience on modern DJI Mini 5 Pro and DJI Neo 2 drones",
      "Learn commercial aerial composition, reveal shots, and subject tracking",
      "Preparation for high-paying real estate, wedding, and commercial aerial jobs",
      "Licensing roadmap: DGCA license integration currently in progress over next 5–6 months"
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
    cardImage: "/assets/92829f40-f725-4982-bb4c-b75dfa06bac4.webp",
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
    cardImage: "/assets/aea971a7-2000-4f9c-b503-af69a67cc1cd.webp",
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
    cardImage: "/assets/4c0b7179-9592-44af-b728-d534e7d57e88.webp",
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
    cardImage: "/assets/1ce9c5f9-bfab-442c-b731-56fcfd8ce758.webp",
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
    cardImage: "/assets/266814ca686b58ce6fb30ca1ba66a3d5.webp",
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
    cardImage: "/assets/af9e05d02e3d78a034a5eda12208dccf.webp",
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
    cardImage: "/assets/8ba53ea25eca22da1f3017b76d4e1868.webp",
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
    cardImage: "/assets/40c26ca8e28d1ad43b398e249b22603d.webp",
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
    image: "/assets/f9607b8e989abbaa401503b580e2dbe8.webp",
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
    image: "/assets/eeede332-45b6-4379-bf2c-7d17aaecd564.webp",
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
    image: "/assets/1fb7aa06fcb8e992f56088cc1a94cdd3.webp",
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
    image: "/assets/430e290e-ef97-4964-a65b-a23923adad3f.webp",
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
    image: "/assets/179f0e839c946970e2d9cfc3d4064f35.webp",
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
    image: "/assets/28b8b129bd95e6d83b42819751b4ad6b.webp",
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
    image: "/assets/d332320c1e882f01b6c1f0cab9e8fdd7.webp",
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
    image: "/assets/d239a7ff1fed20dcbd601af8a22cc445.webp",
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
    image: "/assets/8ce65b342d3f8d32510b479fdae70e64.webp",
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
    image: "/assets/40c26ca8e28d1ad43b398e249b22603d.webp",
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
    image: "/assets/0cd570dbfecb6b5862083a6e2a300467.webp",
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
    image: "/assets/266814ca686b58ce6fb30ca1ba66a3d5.webp",
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
    image: "/assets/af9e05d02e3d78a034a5eda12208dccf.webp",
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
    image: "/assets/8ba53ea25eca22da1f3017b76d4e1868.webp",
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

// --------------------------------------------------------------------
// FREQUENTLY ASKED QUESTIONS (OFFICIAL LENOR ACADEMY FAQ)
// --------------------------------------------------------------------
export const FAQS: FAQItem[] = [
  {
    id: "faq-location",
    category: "Campuses & Travel",
    question: "Where is Lenor Academy located?",
    answer: "Lenor Academy has two main branches: Makkaraparamba, Malappuram, and Madavanna, Ernakulam (Kochi). At our Makkaraparamba branch, training takes place across three specialized campuses: South Campus (air-conditioned lecture classrooms, high-end editing labs, and Product Lab), North Campus (dedicated creative labs for video editing and graphic designing), and Studio Campus (commercial lighting stage, dedicated Film Screening Theatre for student project reviews, and Drone Simulator Lab). In addition, we have a natural outdoor property/hut setup nearby for natural-light photography and outdoor shoots. All classrooms are air-conditioned with Wi-Fi."
  },
  {
    id: "faq-equipment",
    category: "Equipment & Labs",
    question: "Do we have to bring our own equipment when we come to study?",
    answer: "No. The Academy provides all the cameras, cinema rigs, gimbals, editing PCs, drones, and studio equipment required for training. You do not need to buy expensive cameras or computers. You only need to bring three personal essentials: 1) A high-speed SSD or external hard drive (to back up and store your project files and raw footage), 2) Reusable handling gloves (to protect precision camera bodies and lenses from hand sweat during long shoots), and 3) A personal wired headset (for personal hygiene during 2–3 hour editing lab sessions)."
  },
  {
    id: "faq-companies",
    category: "Placement & Career",
    question: "Which companies offer placement opportunities?",
    answer: "Opportunities exist across multiple industries, including advertising agencies, film and media production houses, digital marketing firms, wedding and event cinema companies, and e-commerce brands. In our 6-month and 1-year programmes, students learn end-to-end skills (shooting, editing, drone, and design), making them uniquely valuable to employers. We connect students with job opportunities within Kerala and across Gulf regions such as Dubai and Saudi Arabia."
  },
  {
    id: "faq-online",
    category: "Courses & Eligibility",
    question: "Are online classes available?",
    answer: "All our courses are strictly conducted offline with an 80% practical hands-on approach. Photography, videography, and post-production cannot be learned through theory alone. Students need to hold cameras, experiment with lighting, fly drones, balance gimbals, and edit on professional workstations under the live guidance of experienced mentors. This practical rigor ensures students graduate with real industry confidence."
  },
  {
    id: "faq-railway",
    category: "Campuses & Travel",
    question: "Which is the nearest railway station, and how can I reach the Academy?",
    answer: "Angadippuram Railway Station is the nearest station (approximately 10–15 km away; direct buses are readily available from Angadippuram to Makkaraparamba). Alternatively, students travelling long distances often prefer Tirur Railway Station, which has frequent express train connectivity from across India; from Tirur, you can take a direct bus to Makkaraparamba."
  },
  {
    id: "faq-fee-emi",
    category: "Fees & EMI",
    question: "Can I pay the course fee in installments, and is EMI available?",
    answer: "Yes. We maintain a structured installment schedule for our courses. In addition, we offer a dedicated Bajaj Finance Easy EMI facility. When you express interest in EMI, our team connects you directly with the Bajaj Finance representatives who guide you through convenient monthly payment options."
  },
  {
    id: "faq-certificates",
    category: "Courses & Eligibility",
    question: "What certificate will I receive, and what is its value?",
    answer: "Certification depends on your chosen course: Students completing the 1-Year Media Master Programme or 6-Month programmes receive a Media & Entertainment Skills Council (MESC) Certificate under NSDC, along with the official Lenor Academy Certificate, plus an Internship & Experience Certificate. Students completing 3-Month courses (Graphic Designing or Editing) receive an HRDS Certificate under Skill India along with the Academy Certificate. Students completing the 2-Month course receive an ISO-Qualified Lenor Academy Certificate. Beyond certificates, our core focus is ensuring every student builds an undeniable, industry-grade portfolio."
  },
  {
    id: "faq-salary",
    category: "Placement & Career",
    question: "How much salary can I expect after completing the course?",
    answer: "In visual media, salaries are directly tied to your skill set, output quality, and portfolio. Generally, starter salaries in this field range from ₹15,000 to ₹80,000+ per month. Some students start in the ₹10,000–₹15,000 bracket, while exceptional graduates with standout portfolios have started at ₹80,000 per month right after graduation. In job interviews, recruiters prioritize actual work, photos, video reels, and practical execution over certificates alone."
  },
  {
    id: "faq-stay-food",
    category: "Hostel & Food",
    question: "What are the accommodation and food facilities?",
    answer: "At our Malappuram branch, we manage around 10 stay facilities (~9 for boys and 1 dedicated ladies' hostel with resident warden within walking distance). Over 200 students currently stay in these accommodations, which feature Wi-Fi, 24/7 water, and fully equipped kitchens. Affordable dining is available nearby, including Kudumbashree hotels from ₹40, local Kerala meals, biriyani, and mandi. We also provide a 1-week refund policy if you choose to move to an outside private room. For our Ernakulam branch, we provide verified contacts for nearby PGs and hostels in town."
  },
  {
    id: "faq-placement-assistance",
    category: "Placement & Career",
    question: "What exactly is Placement Assistance?",
    answer: "We run an active Lenor Alumni WhatsApp Group connecting past and current batches. We receive 5 to 6 verified hiring enquiries daily from production houses, ad agencies, and studios across Kerala, Bangalore, Dubai, and Saudi Arabia. We share hiring posters, vacancy requirements, and direct company contact details so students can send their CVs and portfolios directly to employers. For our 1-Year Media Master Programme (Plus Two holders), we provide 100% Placement Assurance within 6 months of graduation."
  },
  {
    id: "faq-eligibility",
    category: "Courses & Eligibility",
    question: "What are the educational qualification requirements?",
    answer: "For the 2-Month Course, students who have passed 8th standard are eligible. For the 3-Month and 6-Month courses, 10th standard (SSLC) is required. For the 1-Year Media Master Programme, Plus Two is required for 100% Placement Assurance. However, 10th-pass students can also join the 1-Year Programme and receive complete practical training, graduating with Placement Assistance rather than Placement Assurance."
  },
  {
    id: "faq-age-limit",
    category: "Courses & Eligibility",
    question: "Is there an age limit to join?",
    answer: "There is no upper age limit. We value passion, curiosity, and willingness to learn above age. We have had students aged 14–16 join our 2-Month foundation courses, as well as professionals above 40 complete our 6-Month programmes. Anyone with an interest in visual storytelling is welcome."
  },
  {
    id: "faq-ai-integration",
    category: "Equipment & Labs",
    question: "What does AI Integration in the curriculum mean?",
    answer: "AI Integration does not mean isolated theory; it teaches students how to practically harness modern AI tools in their daily creative workflow. In video editing, students learn automatic transcription, AI captions, text-based editing, scene generation, and object removal. In graphic design and Photoshop, students learn Generative Fill, AI mood boarding, brand concepting, and 3D mockups. This makes our graduates faster, more agile, and future-proof."
  },
  {
    id: "faq-drone-licence",
    category: "Equipment & Labs",
    question: "Will I get a drone flying licence after completing the Drone Course?",
    answer: "Currently, our Drone Course focuses on Drone Theory, Simulator Training, Live Flight Practice, and Aerial Cinematography. We are actively working on official DGCA remote pilot licensing integration, expected within the next 5–6 months. We will announce licensing certification once official procedures are finalized."
  },
  {
    id: "faq-seat-booking",
    category: "Courses & Eligibility",
    question: "How does seat booking work, and why are seats limited?",
    answer: "We strictly cap batch sizes to approximately 28–30 students. This ensures optimal equipment access: roughly 1 camera for every 3–4 students during shoots, and 1 dedicated high-end PC per student during editing sessions. Because equipment ratios are strictly maintained, seats fill up quickly. Advance seat booking guarantees your slot in the upcoming batch."
  }
];
