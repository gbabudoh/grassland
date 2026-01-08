export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  aura: string;
  signature: string;
  image: string;
  gallery: {
    type: "image" | "video" | "3d";
    url: string;
    thumbnail?: string;
  }[];
  insights: string;
  tags: string[];
  stock: number;
  colors: string[];
  sizes: string[];
  aiRating: number;
  material: string;
  type: "footwear" | "apparel" | "accessory";
  isPreOrder?: boolean;
  technicalSpecs?: {
    label: string;
    value: string;
  }[];
}

export const PRODUCTS: Product[] = [
  {
    id: "g1-performance-matrix",
    name: "G1 Performance Matrix",
    price: 245,
    category: "Velocity",
    aura: "Aggressive",
    signature: "NRL-ALPHA-9",
    image: "/grassland_banner_2_1767749443673.png",
    gallery: [
      { type: "image", url: "/grassland_banner_2_1767749443673.png" },
      { type: "3d", url: "3d-model" },
      { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { type: "image", url: "/grassland_banner_1_1767749428961.png" },
      { type: "image", url: "/grassland_banner_3_1767749460228.png" },
      { type: "image", url: "/grassland_banner_2_1767749443673.png" },
      { type: "image", url: "/grassland_banner_1_1767749428961.png" },
      { type: "image", url: "/grassland_banner_3_1767749460228.png" }
    ],
    insights: "Optimized for high-torque energy return. Neural link stable at peak velocity.",
    tags: ["Carbon Fiber", "Bio-Tech", "Pro"],
    stock: 12,
    colors: ["Charcoal", "Silver"],
    sizes: ["8", "9", "10", "11", "12"],
    aiRating: 98,
    material: "Forged Carbon",
    type: "footwear",
    technicalSpecs: [
      { label: "Weight", value: "240g" },
      { label: "Launch Date", value: "Q1 2026" },
      { label: "Durability", value: "9.8/10" }
    ]
  },
  {
    id: "v2-stealth-runner",
    name: "V2 Stealth Runner",
    price: 185,
    category: "Hybrid",
    aura: "Stealth",
    signature: "NRL-SHADOW-4",
    image: "/grassland_banner_1_1767749428961.png",
    gallery: [
      { type: "image", url: "/grassland_banner_1_1767749428961.png" },
      { type: "3d", url: "3d-model" },
      { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { type: "image", url: "/grassland_banner_2_1767749443673.png" }
    ],
    insights: "Maximum silence. Zero thermal signature detection. Ultra-low profile.",
    tags: ["Minimalist", "Night-Ops", "Silent"],
    stock: 5,
    colors: ["Phantom Black"],
    sizes: ["7", "8", "9", "10"],
    aiRating: 94,
    material: "Kinetic Mesh",
    type: "footwear",
    technicalSpecs: [
      { label: "Decibel Rating", value: "< 5dB" },
      { label: "Thermal Masking", value: "Active" }
    ]
  },
  {
    id: "n-core-compression",
    name: "Neural Core Compression",
    price: 85,
    category: "Velocity",
    aura: "Fluid",
    signature: "NRL-CORE-X",
    image: "/grassland_banner_3_1767749460228.png",
    gallery: [
      { type: "image", url: "/grassland_banner_3_1767749460228.png" },
      { type: "image", url: "/grassland_banner_2_1767749443673.png" }
    ],
    insights: "Bio-thermal regulation for peak athletic output. Moisture synchronization active.",
    tags: ["Compression", "Thermal", "Tech"],
    stock: 45,
    colors: ["Phantom Black", "Electric Blue"],
    sizes: ["S", "M", "L", "XL"],
    aiRating: 92,
    material: "Neural Thread",
    type: "apparel",
    isPreOrder: true
  },
  {
    id: "m1-chrono-link",
    name: "M1 Chrono Link",
    price: 320,
    category: "Hybrid",
    aura: "Rigid",
    signature: "NRL-TIME-1",
    image: "/grassland_banner_1_1767749428961.png",
    gallery: [
      { type: "image", url: "/grassland_banner_1_1767749428961.png" },
      { type: "video", url: "https://www.w3schools.com/html/movie.mp4" },
      { type: "image", url: "/grassland_banner_3_1767749460228.png" }
    ],
    insights: "Real-time biometric monitoring and archive sync. Grade 5 titanium chassis.",
    tags: ["Biometric", "Smart", "Titanium"],
    stock: 15,
    colors: ["Silver", "Slate"],
    sizes: ["One Size"],
    aiRating: 99,
    material: "Grade 5 Titanium",
    type: "accessory"
  }
];
