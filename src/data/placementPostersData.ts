// Official Verified Placement & Creative Entrepreneur Announcements (54 Records)
// Derived from authentic Lenor Academy placement posters

export interface PlacementPoster {
  id: string;
  name: string;
  role: string;
  company: string;
  category: 'All' | 'Videography' | 'Photography' | 'Editing' | 'Design' | 'Faculty' | 'Entrepreneur';
  type: 'Placed' | 'Entrepreneur' | 'Faculty';
  location: string;
  isGulf?: boolean;
  posterImage: string;
  highlight?: string;
}

export const PLACEMENT_POSTERS: PlacementPoster[] = [
  {
    "id": "pl-01",
    "name": "Nishmal",
    "role": "Junior Videographer",
    "company": "Skillage",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-01.webp"
  },
  {
    "id": "pl-02",
    "name": "Muhammed Shibili T",
    "role": "Videographer Cum Editor",
    "company": "Ogo Creation",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-02.webp"
  },
  {
    "id": "pl-03",
    "name": "Muhammed Rihan K.V",
    "role": "Videographer Cum Editor",
    "company": "Cutpeh",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-03.webp"
  },
  {
    "id": "pl-04",
    "name": "Muhammed Adinan N",
    "role": "Photographer & Editor",
    "company": "Wedding Studio",
    "category": "Photography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-04.webp"
  },
  {
    "id": "pl-05",
    "name": "Muhammed Rishad P",
    "role": "Junior Videographer & Editor Instructor",
    "company": "CyberWise Skillversity",
    "category": "Faculty",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-05.webp"
  },
  {
    "id": "pl-06",
    "name": "Mohammad Ajmal",
    "role": "Co-Founder & Creative Lead",
    "company": "Graphg",
    "category": "Entrepreneur",
    "type": "Entrepreneur",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-06.webp"
  },
  {
    "id": "pl-07",
    "name": "Janish",
    "role": "Co-Founder & Visual Storyteller",
    "company": "Visual Graphy",
    "category": "Entrepreneur",
    "type": "Entrepreneur",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-07.webp"
  },
  {
    "id": "pl-08",
    "name": "Muhammed Irfan P",
    "role": "Founder & Director",
    "company": "Drive Films",
    "category": "Entrepreneur",
    "type": "Entrepreneur",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-08.webp"
  },
  {
    "id": "pl-09",
    "name": "Muhammed Sahal M",
    "role": "Founder & Creative Director",
    "company": "S4L Productions",
    "category": "Entrepreneur",
    "type": "Entrepreneur",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-09.webp"
  },
  {
    "id": "pl-10",
    "name": "Mohammed Aslah MP",
    "role": "Co-Founder & Media Artist",
    "company": "Graphg",
    "category": "Entrepreneur",
    "type": "Entrepreneur",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-10.webp"
  },
  {
    "id": "pl-11",
    "name": "Rahian",
    "role": "Co-Founder & Cinematographer",
    "company": "Visual Graphy",
    "category": "Entrepreneur",
    "type": "Entrepreneur",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-11.webp"
  },
  {
    "id": "pl-12",
    "name": "Nihad K",
    "role": "Videographer",
    "company": "Adza Media",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-12.webp"
  },
  {
    "id": "pl-13",
    "name": "Aflah K A",
    "role": "Editor",
    "company": "Agile Production",
    "category": "Editing",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-13.webp"
  },
  {
    "id": "pl-14",
    "name": "Muhammed Adnan M",
    "role": "Multimedia Instructor",
    "company": "ABZ Institute",
    "category": "Faculty",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-14.webp"
  },
  {
    "id": "pl-15",
    "name": "Bashid CK",
    "role": "Founder & Creative Lead",
    "company": "Bcclix",
    "category": "Entrepreneur",
    "type": "Entrepreneur",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-15.webp"
  },
  {
    "id": "pl-16",
    "name": "Mohammed Rifayi K",
    "role": "Videographer Cum Editor",
    "company": "Mazusin",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-16.webp"
  },
  {
    "id": "pl-17",
    "name": "Anil MM",
    "role": "Founder & Wedding Cinematographer",
    "company": "Everlens Weddings",
    "category": "Entrepreneur",
    "type": "Entrepreneur",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-17.webp"
  },
  {
    "id": "pl-18",
    "name": "Nisha Shifa CK",
    "role": "Videographer Cum Editor",
    "company": "Imfashionst",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-18.webp"
  },
  {
    "id": "pl-19",
    "name": "Dilshad A",
    "role": "Videographer",
    "company": "Aqvertise (Be Seen)",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-19.webp"
  },
  {
    "id": "pl-20",
    "name": "Muhammed Afsal Khan EV",
    "role": "Videographer Cum Editor",
    "company": "Fitbizz Fitness",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-20.webp"
  },
  {
    "id": "pl-21",
    "name": "Farshad K",
    "role": "Graphic Designer",
    "company": "Lora Ads (Design the Future)",
    "category": "Design",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-21.webp"
  },
  {
    "id": "pl-22",
    "name": "Mohammed Uvais K",
    "role": "Videographer Cum Editor",
    "company": "Abate Group of Institutions",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-22.webp"
  },
  {
    "id": "pl-23",
    "name": "Mohammed Faris M",
    "role": "Videographer Cum Editor",
    "company": "Ideapedia Production",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-23.webp"
  },
  {
    "id": "pl-24",
    "name": "Rinsha Fathima",
    "role": "Videographer Cum Editor",
    "company": "Ad Luma Production",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-24.webp"
  },
  {
    "id": "pl-25",
    "name": "Murshid",
    "role": "Social Media Manager & Creator",
    "company": "Spice Health & Fitness",
    "category": "Design",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-25.webp"
  },
  {
    "id": "pl-26",
    "name": "Bibin Babu",
    "role": "Videographer Cum Editor",
    "company": "Abate Group of Institutions",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-26.webp"
  },
  {
    "id": "pl-27",
    "name": "Muhammed Shameem MT",
    "role": "Videographer Cum Editor",
    "company": "Flows Media",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-27.webp"
  },
  {
    "id": "pl-28",
    "name": "Bibin Bose Aliyar",
    "role": "Videographer Cum Editor Faculty",
    "company": "CreatorX Academy",
    "category": "Faculty",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-28.webp"
  },
  {
    "id": "pl-29",
    "name": "Muhammed Rishal P",
    "role": "Videographer Cum Editor & Tour Guide",
    "company": "Calicut Vacations",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-29.webp"
  },
  {
    "id": "pl-30",
    "name": "Ramees Musthaq",
    "role": "Videographer Cum Editor",
    "company": "Creative Academy",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-30.webp"
  },
  {
    "id": "pl-31",
    "name": "Muhammed Shibil K",
    "role": "Videographer Cum Editor",
    "company": "Sign Digits",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-31.webp"
  },
  {
    "id": "pl-32",
    "name": "Muhammed Hisham",
    "role": "Founder & Creative Director",
    "company": "Frameo Productions",
    "category": "Entrepreneur",
    "type": "Entrepreneur",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-32.webp"
  },
  {
    "id": "pl-33",
    "name": "Mahir Shakir P",
    "role": "Videographer",
    "company": "Ad Luma Production",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-33.webp"
  },
  {
    "id": "pl-34",
    "name": "Muhammed Asharaf AK",
    "role": "Junior Graphic Designing Instructor",
    "company": "Lenor Academy",
    "category": "Faculty",
    "type": "Faculty",
    "location": "Makkaraparamba Campus",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-34.webp"
  },
  {
    "id": "pl-35",
    "name": "Muhammed Najmal PP",
    "role": "Junior Editing Instructor",
    "company": "Lenor Academy",
    "category": "Faculty",
    "type": "Faculty",
    "location": "Makkaraparamba Campus",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-35.webp"
  },
  {
    "id": "pl-36",
    "name": "Muhammed Aflah K",
    "role": "Videographer Cum Editor",
    "company": "Moto Gloss",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-36.webp"
  },
  {
    "id": "pl-37",
    "name": "Muhammed Nabeeh",
    "role": "Videographer Cum Editor Faculty",
    "company": "LearnAxis Group of Institutions",
    "category": "Faculty",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-37.webp"
  },
  {
    "id": "pl-38",
    "name": "Anulal Krishna",
    "role": "Videographer Cum Editor",
    "company": "Bisorto (Oman)",
    "category": "Videography",
    "type": "Placed",
    "location": "Oman (Gulf Placement)",
    "isGulf": true,
    "posterImage": "/assets/placements/placement-38.webp"
  },
  {
    "id": "pl-39",
    "name": "Sreeram Sreejan TV",
    "role": "Junior Photography Instructor",
    "company": "Lenor Academy",
    "category": "Faculty",
    "type": "Faculty",
    "location": "Makkaraparamba Campus",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-39.webp"
  },
  {
    "id": "pl-40",
    "name": "Afrad PP",
    "role": "Videographer Cum Editor",
    "company": "Alpha Academy",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-40.webp"
  },
  {
    "id": "pl-41",
    "name": "Saniya Varghese",
    "role": "Junior Graphic Designing Instructor",
    "company": "Lenor Academy",
    "category": "Faculty",
    "type": "Faculty",
    "location": "Makkaraparamba Campus",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-41.webp"
  },
  {
    "id": "pl-42",
    "name": "Shajahan",
    "role": "Videographer and Editor",
    "company": "Marza Group (Qatar, Doha)",
    "category": "Videography",
    "type": "Placed",
    "location": "Qatar, Doha (Gulf Placement)",
    "isGulf": true,
    "posterImage": "/assets/placements/placement-42.webp"
  },
  {
    "id": "pl-43",
    "name": "Mohammed Uvais K",
    "role": "Photographer, Videographer & Editor",
    "company": "Abate Group of Companies",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-43.webp"
  },
  {
    "id": "pl-44",
    "name": "Muhammed Afsin KK",
    "role": "Junior Editing Instructor",
    "company": "Lenor Academy",
    "category": "Faculty",
    "type": "Faculty",
    "location": "Makkaraparamba Campus",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-44.webp"
  },
  {
    "id": "pl-45",
    "name": "Ibrahim Badusha NT",
    "role": "Photographer, Videographer & Editor",
    "company": "Reem Mall",
    "category": "Photography",
    "type": "Placed",
    "location": "Makkaraparamba, Malappuram",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-45.webp"
  },
  {
    "id": "pl-46",
    "name": "Manjunath A J",
    "role": "Video Editor & Retoucher",
    "company": "Kurkure Photography",
    "category": "Editing",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-46.webp"
  },
  {
    "id": "pl-47",
    "name": "Arshad P",
    "role": "Videographer Cum Editor",
    "company": "Skillage",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-47.webp"
  },
  {
    "id": "pl-48",
    "name": "Anshid Aboobacker",
    "role": "Videographer Cum Editor",
    "company": "Xandy Learning",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-48.webp"
  },
  {
    "id": "pl-49",
    "name": "Adithyan R",
    "role": "Video Editor",
    "company": "Weqeliq Media",
    "category": "Editing",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-49.webp"
  },
  {
    "id": "pl-50",
    "name": "Adithya Krishna",
    "role": "Videographer",
    "company": "STM Productions",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-50.webp"
  },
  {
    "id": "pl-51",
    "name": "Mohammed Shanib M",
    "role": "Architectural Media Specialist",
    "company": "COVO Architecture",
    "category": "Design",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-51.webp"
  },
  {
    "id": "pl-52",
    "name": "Farshad K",
    "role": "Videographer Cum Editor",
    "company": "Adrex (Focus Room)",
    "category": "Videography",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-52.webp"
  },
  {
    "id": "pl-53",
    "name": "Muhammed Mishab MP",
    "role": "Videographer Cum Editor",
    "company": "Lead X Ads Valanchery",
    "category": "Videography",
    "type": "Placed",
    "location": "Valanchery, Malappuram",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-53.webp"
  },
  {
    "id": "pl-54",
    "name": "Bibin Boss",
    "role": "Photography, Videography & Editing Faculty",
    "company": "CreatorX Academy",
    "category": "Faculty",
    "type": "Placed",
    "location": "Kerala, India",
    "isGulf": false,
    "posterImage": "/assets/placements/placement-54.webp"
  }
];
