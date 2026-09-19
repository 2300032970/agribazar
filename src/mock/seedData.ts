import {
  User,
  FarmerProfile,
  Crop,
  DiseaseDetection,
  Professional,
  Consultation,
  Recommendation,
  Product,
  CropListing,
  BuyerOffer,
  MarketPricePoint,
  FPOProfile,
  Vehicle,
  TransportBooking,
  StorageFacility,
  StorageBooking,
  Transaction,
  NotificationItem,
  MessageItem
} from '../types';

export const initialUsers: Record<string, User> = {
  farmer: {
    id: 'usr_farmer_1',
    name: 'Ramesh Kumar',
    email: 'farmer@demo.com',
    role: 'farmer',
    phone: '+91 98480 12345',
    location: 'Georai, Warangal, Telangana',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    isVerified: true
  },
  buyer: {
    id: 'usr_buyer_1',
    name: 'Priya Agro Foods Ltd (Kavita Reddy)',
    email: 'buyer@demo.com',
    role: 'buyer',
    phone: '+91 94401 56789',
    location: 'Bowenpally Agricultural Wholesale Market, Hyderabad',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    isVerified: true
  },
  professional: {
    id: 'usr_expert_1',
    name: 'Dr. K. Srinivas Rao, Ph.D.',
    email: 'expert@demo.com',
    role: 'professional',
    phone: '+91 98492 34567',
    location: 'PJTSAU Agricultural Research Station, Warangal',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    isVerified: true
  },
  seller: {
    id: 'usr_seller_1',
    name: 'Kisan Krishi Kendra (Suresh Patil)',
    email: 'seller@demo.com',
    role: 'seller',
    phone: '+91 99890 87654',
    location: 'Mandi Road, Warangal',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    isVerified: true
  },
  fpo: {
    id: 'usr_fpo_1',
    name: 'Kakatiya Farmers Producer Co. Ltd',
    email: 'fpo@demo.com',
    role: 'fpo',
    phone: '+91 98765 43210',
    location: 'Narsampet, Warangal Rural',
    avatarUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=150&auto=format&fit=crop&q=80',
    isVerified: true
  },
  transport: {
    id: 'usr_transport_1',
    name: 'Sri Balaji Agri Logistics (Mahesh Yadav)',
    email: 'transport@demo.com',
    role: 'transport',
    phone: '+91 98481 99887',
    location: 'NH 163 Bypass, Warangal',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    isVerified: true
  },
  storage: {
    id: 'usr_storage_1',
    name: 'Deccan Cold Chain & Dry Warehouses Ltd',
    email: 'storage@demo.com',
    role: 'storage',
    phone: '+91 94901 11223',
    location: 'Industrial Area, Hanamkonda',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    isVerified: true
  },
  admin: {
    id: 'usr_admin_1',
    name: 'State Agriculture Admin (Dr. Sharma)',
    email: 'admin@demo.com',
    role: 'admin',
    phone: '+91 94400 00001',
    location: 'Directorate of Agriculture, Hyderabad',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isVerified: true
  }
};

export const initialFarmerProfile: FarmerProfile = {
  id: 'fp_1',
  userId: 'usr_farmer_1',
  name: 'Ramesh Kumar',
  phone: '+91 98480 12345',
  email: 'farmer@demo.com',
  location: 'Georai Village, Warangal District, Telangana',
  preferredLanguage: 'en',
  landArea: 4.5,
  soilType: 'Red Sandy Loam with high organic matter',
  irrigationType: 'Borewell with Drip Irrigation System',
  cropsCultivated: ['Tomato', 'Rice', 'Chilli', 'Cotton'],
  farmName: 'Ramesh Prakruthi Farm',
  bio: 'Second-generation progressive farmer adopting integrated pest management and natural bio-fertilizers.'
};

export const initialCrops: Crop[] = [
  {
    id: 'crop_1',
    farmerId: 'usr_farmer_1',
    cropName: 'Tomato',
    variety: 'Vaishnavi F1 Hybrid',
    quantity: 65,
    quantityUnit: 'Quintals',
    landArea: 1.0,
    sowingDate: '2026-06-15',
    expectedHarvestDate: '2026-09-22',
    location: 'Plot 2, North Field',
    qualityGrade: 'Grade A',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80',
    status: 'Ready for Harvest',
    notes: 'Firm red fruit with high brix content. Healthy yield expected.',
    history: [
      { date: '2026-06-15', action: 'Sowing', note: 'Direct transplanting completed' },
      { date: '2026-07-20', action: 'De-weeding', note: 'Hand weeding & mulching applied' },
      { date: '2026-09-18', action: 'Ripening', note: '85% fruits reached harvest maturity' }
    ]
  },
  {
    id: 'crop_2',
    farmerId: 'usr_farmer_1',
    cropName: 'Rice',
    variety: 'BPT 5204 (Sona Masoori)',
    quantity: 120,
    quantityUnit: 'Quintals',
    landArea: 2.0,
    sowingDate: '2026-07-01',
    expectedHarvestDate: '2026-11-10',
    location: 'Plot 1, East Canal Field',
    qualityGrade: 'Grade A',
    imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=500&auto=format&fit=crop&q=80',
    status: 'Growing',
    notes: 'Panicle initiation stage. Regular water management in place.',
    history: [
      { date: '2026-07-01', action: 'Transplanting', note: '21-day nursery seedlings planted' },
      { date: '2026-08-10', action: 'Bio-Fertilizer', note: 'Azospirillum & PSB applied' }
    ]
  },
  {
    id: 'crop_3',
    farmerId: 'usr_farmer_1',
    cropName: 'Chilli',
    variety: 'Teja S17 Hot Red',
    quantity: 40,
    quantityUnit: 'Quintals',
    landArea: 1.0,
    sowingDate: '2026-07-10',
    expectedHarvestDate: '2026-12-05',
    location: 'Plot 3, South Field',
    qualityGrade: 'Grade A',
    imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=500&auto=format&fit=crop&q=80',
    status: 'Growing',
    notes: 'Flowering initiated. Monitored for thrips and mites.'
  },
  {
    id: 'crop_4',
    farmerId: 'usr_farmer_1',
    cropName: 'Cotton',
    variety: 'Bunny Bt II',
    quantity: 25,
    quantityUnit: 'Quintals',
    landArea: 0.5,
    sowingDate: '2026-06-25',
    expectedHarvestDate: '2026-11-25',
    location: 'Plot 4, West Field',
    qualityGrade: 'Grade B',
    imageUrl: 'https://images.unsplash.com/photo-1594488518063-2391216d6c29?w=500&auto=format&fit=crop&q=80',
    status: 'Growing',
    notes: 'Square formation stage. Trap crops planted along borders.'
  }
];

export const sampleDiseasesDatabase: Record<string, {
  name: string;
  cropName: string;
  severity: 'Low' | 'Moderate' | 'High';
  confidencePercentage: number;
  imageUrl: string;
  symptoms: string[];
  preventionGuidance: string[];
  recommendedBioInputs: string[];
}> = {
  tomato_early_blight: {
    name: 'Tomato Early Blight (Alternaria solani)',
    cropName: 'Tomato',
    severity: 'High',
    confidencePercentage: 94,
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80',
    symptoms: [
      'Concentric dark brown circular rings (target-board spots) on lower leaves',
      'Yellow chlorotic halos surrounding brown lesions',
      'Premature defoliation starting from the bottom of the plant upwards',
      'Dark sunken leathery lesions on stems and fruit calyx'
    ],
    preventionGuidance: [
      'Practice crop rotation with non-solanaceous crops for 2-3 seasons',
      'Maintain adequate plant spacing (60 cm x 45 cm) to optimize canopy aeration',
      'Apply drip irrigation or furrow watering to prevent wetting leaf foliage',
      'Sterilize pruning scissors and remove infected bottom leaves immediately'
    ],
    recommendedBioInputs: [
      'Bio-Fungicide Trichoderma Viride (2.5 kg/acre soil application)',
      'Pseudomonas Fluorescens Liquid Spray (5 ml/Litre)',
      'Copper Hydroxide 53.8% DF (Permitted protectant spray under expert advisory)'
    ]
  },
  tomato_late_blight: {
    name: 'Tomato Late Blight (Phytophthora infestans)',
    cropName: 'Tomato',
    severity: 'High',
    confidencePercentage: 91,
    imageUrl: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=500&auto=format&fit=crop&q=80',
    symptoms: [
      'Water-soaked dark lesions on leaf tips expanding rapidly in humid conditions',
      'White cottony fungal down on the lower leaf surface during morning hours',
      'Greasy brown lesions rapidly killing foliage and causing fruit rot'
    ],
    preventionGuidance: [
      'Avoid overhead sprinkler irrigation',
      'Ensure soil drainage during unseasonal rainy spells',
      'Destroy volunteer tomato or potato seedlings around the field'
    ],
    recommendedBioInputs: [
      'Bacillus Subtilis bio-formulation (3 g/Litre)',
      'Bordeaux Mixture (1% spray preventive)'
    ]
  },
  rice_blast: {
    name: 'Rice Blast (Magnaporthe oryzae)',
    cropName: 'Rice',
    severity: 'High',
    confidencePercentage: 96,
    imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=500&auto=format&fit=crop&q=80',
    symptoms: [
      'Spindle/diamond-shaped lesions with greyish-white centres and brown borders',
      'Lesions coalescing to cause complete drying and burning of leaf blades',
      'Neck rot causing empty white panicles at maturity'
    ],
    preventionGuidance: [
      'Avoid excessive split doses of Nitrogenous fertilizer',
      'Maintain continuous shallow water layer during vulnerable seedling stage',
      'Seed treatment with bio-agents before nursery sowing'
    ],
    recommendedBioInputs: [
      'Pseudomonas Fluorescens Talc formulation (10 g/kg seed)',
      'Isoprothiolane 40% EC or Tricyclazole under certified agronomist prescription'
    ]
  },
  powdery_mildew: {
    name: 'Powdery Mildew (Erysiphe cichoracearum)',
    cropName: 'Chilli',
    severity: 'Moderate',
    confidencePercentage: 88,
    imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=500&auto=format&fit=crop&q=80',
    symptoms: [
      'White powdery talcum-like fungal patches on leaf surfaces',
      'Leaves curl upward and exhibit chlorosis',
      'Premature leaf dropping and reduced fruit set'
    ],
    preventionGuidance: [
      'Ensure proper sunlight penetration into the crop canopy',
      'Remove severely infested lower foliage',
      'Spray early morning when wind velocity is minimal'
    ],
    recommendedBioInputs: [
      'Wettable Sulphur 80% WDG (2 g/Litre)',
      'Neem Seed Kernel Extract (NSKE 5%) spray'
    ]
  },
  aphids: {
    name: 'Aphid Infestation (Aphis gossypii)',
    cropName: 'Cotton',
    severity: 'Moderate',
    confidencePercentage: 92,
    imageUrl: 'https://images.unsplash.com/photo-1594488518063-2391216d6c29?w=500&auto=format&fit=crop&q=80',
    symptoms: [
      'Clusters of small greenish-yellow sap-sucking insects on tender shoots and under leaves',
      'Sticky honeydew secretion with black sooty mold growth',
      'Crinkled and downward curling leaves'
    ],
    preventionGuidance: [
      'Install yellow sticky traps (10-15 per acre)',
      'Encourage natural predatory ladybird beetles and lacewings',
      'Avoid excessive synthetic nitrogen applications'
    ],
    recommendedBioInputs: [
      'Cold-Pressed Neem Oil 10,000 PPM (3 ml/Litre with soap emulsifier)',
      'Verticillium Lecanii bio-insecticide (4 g/Litre)'
    ]
  }
};

export const initialDiseaseDetections: DiseaseDetection[] = [
  {
    id: 'dd_1',
    farmerId: 'usr_farmer_1',
    cropName: 'Tomato',
    cropVariety: 'Vaishnavi F1',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80',
    detectedDisease: 'Tomato Early Blight (Alternaria solani)',
    confidencePercentage: 94,
    severity: 'High',
    detectedAt: '2026-09-18 10:30 AM',
    symptoms: sampleDiseasesDatabase.tomato_early_blight.symptoms,
    preventionGuidance: sampleDiseasesDatabase.tomato_early_blight.preventionGuidance,
    recommendedBioInputs: sampleDiseasesDatabase.tomato_early_blight.recommendedBioInputs,
    disclaimer: 'AI-Assisted Detection — Possible Disease. This guidance is general and advisory only. Consult an Agricultural Professional before applying chemical treatments.',
    consultationCreated: true
  }
];

export const initialProfessionals: Professional[] = [
  {
    id: 'pro_1',
    userId: 'usr_expert_1',
    name: 'Dr. K. Srinivas Rao, Ph.D.',
    qualification: 'M.Sc. (Ag), Ph.D. in Plant Pathology (PJTSAU)',
    specialization: 'Crop Disease Diagnostics, Integrated Pest Management (IPM)',
    experienceYears: 16,
    cropsHandled: ['Tomato', 'Chilli', 'Rice', 'Cotton', 'Turmeric'],
    location: 'Warangal Agricultural Research Hub, Telangana',
    languages: ['Telugu', 'English', 'Hindi'],
    consultationFee: 250,
    availability: 'Available Today',
    rating: 4.9,
    reviewsCount: 142,
    verificationBadge: true,
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    credentials: 'State Agri University Gold Medalist, Certified IPM Specialist, Govt ID Verified',
    bio: '16+ years of research and extension experience diagnosing complex fungal and bacterial infections across Telangana and Andhra Pradesh.'
  },
  {
    id: 'pro_2',
    userId: 'usr_expert_2',
    name: 'Dr. Ananya Sharma',
    qualification: 'Ph.D. in Soil Science & Agronomy (IARI New Delhi)',
    specialization: 'Soil Fertility, Bio-Nutrient Management, Micro-Irrigation',
    experienceYears: 11,
    cropsHandled: ['Rice', 'Maize', 'Vegetables', 'Pulses'],
    location: 'Hyderabad Regional Extension Centre',
    languages: ['Hindi', 'English', 'Telugu'],
    consultationFee: 300,
    availability: 'Available Tomorrow',
    rating: 4.8,
    reviewsCount: 98,
    verificationBadge: true,
    avatarUrl: 'https://images.unsplash.com/photo-1594824813571-638f02636136?w=150&auto=format&fit=crop&q=80',
    credentials: 'ICAR Senior Scientist Awardee, Soil Health Expert',
    bio: 'Dedicated to helping farmers optimize organic fertilizer blends and lower chemical input costs while boosting soil micro-flora.'
  },
  {
    id: 'pro_3',
    userId: 'usr_expert_3',
    name: 'Prof. Venkat Ramana Reddy',
    qualification: 'M.Sc. (Horticulture), Ex-HDO',
    specialization: 'Commercial Vegetable Production & Polyhouse Protected Farming',
    experienceYears: 22,
    cropsHandled: ['Tomato', 'Capsicum', 'Watermelon', 'Papaya'],
    location: 'Karimnagar District, Telangana',
    languages: ['Telugu', 'English'],
    consultationFee: 200,
    availability: 'Available Today',
    rating: 4.95,
    reviewsCount: 215,
    verificationBadge: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    credentials: 'Retired Assistant Director of Horticulture, Govt of Telangana',
    bio: 'Over two decades advising commercial vegetable growers on pest management and high-yield pruning techniques.'
  }
];

export const initialConsultations: Consultation[] = [
  {
    id: 'cons_1',
    farmerId: 'usr_farmer_1',
    farmerName: 'Ramesh Kumar',
    professionalId: 'pro_1',
    professionalName: 'Dr. K. Srinivas Rao, Ph.D.',
    cropName: 'Tomato (Vaishnavi F1)',
    date: '2026-09-19',
    timeSlot: '11:00 AM - 11:30 AM',
    issueDescription: 'Concentric leaf spots and lower leaf yellowing detected by AI scan. Need treatment protocol.',
    cropImageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80',
    status: 'Completed',
    createdAt: '2026-09-18 10:45 AM',
    meetingLink: '/consultation/room/cons_1'
  }
];

export const initialRecommendations: Recommendation[] = [
  {
    id: 'rec_1',
    consultationId: 'cons_1',
    farmerId: 'usr_farmer_1',
    farmerName: 'Ramesh Kumar',
    professionalId: 'pro_1',
    professionalName: 'Dr. K. Srinivas Rao, Ph.D.',
    crop: 'Tomato',
    identifiedProblem: 'Early Blight (Alternaria solani) with secondary fungal spread due to morning dew.',
    recommendation: 'Immediate canopy thinning on lower 6 inches. Apply bio-control Trichoderma soil drenching accompanied by protective copper spray.',
    suggestedPractice: 'Avoid evening irrigation. Clip infected foliage using sterile shears and dispose outside field.',
    relevantProduct: 'Trichoderma Viride Bio-Fungicide & Cold-Pressed Neem Bio-Shield',
    usageInstructions: 'Mix 2.5 kg Trichoderma with 50 kg farmyard manure and broadcast around root zones. Spray bio-neem extract at 3 ml/L after 48 hours.',
    followUpDate: '2026-09-26',
    createdAt: '2026-09-19 11:25 AM'
  }
];

export const initialProducts: Product[] = [
  {
    id: 'prod_1',
    sellerId: 'usr_seller_1',
    sellerName: 'Kisan Krishi Kendra (Suresh Patil)',
    sellerRating: 4.8,
    sellerDistanceKm: 3.5,
    name: 'Trichoderma Viride 1.5% WP (Bio-Fungicide)',
    category: 'Bio-inputs',
    manufacturer: 'AgriBiotech India Organics',
    applicableCrop: ['Tomato', 'Chilli', 'Rice', 'Cotton', 'All Vegetables'],
    price: 240,
    originalPrice: 280,
    unit: '1 Kg Pack',
    stock: 85,
    rating: 4.9,
    reviewsCount: 68,
    location: 'Mandi Road, Warangal',
    imageUrl: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=400&auto=format&fit=crop&q=80',
    description: 'Eco-friendly fungal antagonist effective against Alternaria, Fusarium wilt, damping off, and root rot.',
    usage: 'Mix 10g per litre of water or 2.5kg with 100kg compost for soil application.',
    isOrganic: true,
    isVerifiedSeller: true
  },
  {
    id: 'prod_2',
    sellerId: 'usr_seller_1',
    sellerName: 'Kisan Krishi Kendra (Suresh Patil)',
    sellerRating: 4.8,
    sellerDistanceKm: 3.5,
    name: 'Neem-Care Pure Neem Oil 10,000 PPM (Azadirachtin)',
    category: 'Crop Protection',
    manufacturer: 'Prakruthi Bio-Inputs Ltd',
    applicableCrop: ['Tomato', 'Chilli', 'Cotton', 'Vegetables'],
    price: 360,
    originalPrice: 420,
    unit: '1 Litre Bottle',
    stock: 54,
    rating: 4.7,
    reviewsCount: 52,
    location: 'Mandi Road, Warangal',
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&auto=format&fit=crop&q=80',
    description: 'Cold-pressed concentrated neem extract controlling sucking pests, aphids, whiteflies, and lepidopteran larvae.',
    usage: '3 ml per Litre of water with surfactant. Spray every 10 days.',
    isOrganic: true,
    isVerifiedSeller: true
  },
  {
    id: 'prod_3',
    sellerId: 'usr_seller_2',
    sellerName: 'Annapurna Seed & Fert Store',
    sellerRating: 4.6,
    sellerDistanceKm: 7.2,
    name: 'Vaishnavi F1 Hybrid Tomato Seeds',
    category: 'Seeds',
    manufacturer: 'Seminis Seeds India',
    applicableCrop: ['Tomato'],
    price: 850,
    originalPrice: 920,
    unit: '10g Packet (approx 3,000 seeds)',
    stock: 120,
    rating: 4.9,
    reviewsCount: 94,
    location: 'Hunter Road, Hanamkonda',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80',
    description: 'High-yielding determinate hybrid with deep red firm fruits, TYLCV virus tolerance, and excellent shelf life.',
    usage: 'Nursery tray sowing; transplant at 25-28 days.',
    isOrganic: false,
    isVerifiedSeller: true
  },
  {
    id: 'prod_4',
    sellerId: 'usr_seller_1',
    sellerName: 'Kisan Krishi Kendra (Suresh Patil)',
    sellerRating: 4.8,
    sellerDistanceKm: 3.5,
    name: 'Bio-NPK Consortia Liquid Fertilizer',
    category: 'Fertilizers',
    manufacturer: 'National Agro Nutrients',
    applicableCrop: ['Rice', 'Maize', 'Chilli', 'Cotton'],
    price: 320,
    originalPrice: 380,
    unit: '1 Litre Bottle',
    stock: 40,
    rating: 4.8,
    reviewsCount: 41,
    location: 'Mandi Road, Warangal',
    imageUrl: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=400&auto=format&fit=crop&q=80',
    description: 'Bacterial consortium containing Nitrogen fixers (Azotobacter), Phosphorus solubilizers (PSB), and Potash mobilizing bacteria (KMB).',
    usage: 'Drip fertigation: 1 Litre per acre; or seed treatment.',
    isOrganic: true,
    isVerifiedSeller: true
  },
  {
    id: 'prod_5',
    sellerId: 'usr_seller_3',
    sellerName: 'Telangana Agri Machinery & Sprayers',
    sellerRating: 4.9,
    sellerDistanceKm: 11.0,
    name: '16L 12V Heavy-Duty Battery Knapsack Sprayer',
    category: 'Equipment',
    manufacturer: 'KisanForce Tools',
    applicableCrop: ['All Crops'],
    price: 2650,
    originalPrice: 3200,
    unit: 'Complete Kit with 4 Nozzles',
    stock: 22,
    rating: 4.9,
    reviewsCount: 112,
    location: 'Station Road, Warangal',
    imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=400&auto=format&fit=crop&q=80',
    description: 'Rechargeable 12V 12Ah lithium battery with adjustable brass lance and continuous 6-hour operation.',
    usage: 'Standard spraying for bio-inputs and liquid nutrients.',
    isOrganic: false,
    isVerifiedSeller: true
  }
];

export const initialCropListings: CropListing[] = [
  {
    id: 'list_1',
    farmerId: 'usr_farmer_1',
    farmerName: 'Ramesh Kumar',
    farmerPhone: '+91 98480 12345',
    crop: 'Tomato',
    variety: 'Vaishnavi F1 Hybrid',
    quantity: 50,
    quantityUnit: 'Quintals',
    qualityGrade: 'Grade A',
    expectedPrice: 2500,
    location: 'Georai, Warangal, Telangana',
    harvestDate: '2026-09-22',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80',
    createdAt: '2026-09-18',
    status: 'Active',
    description: 'Fresh harvest lot of high-grade red table tomatoes, harvested at 90% maturity with zero pesticide residue.'
  },
  {
    id: 'list_2',
    farmerId: 'usr_farmer_2',
    farmerName: 'Gopal Reddy',
    farmerPhone: '+91 98480 98765',
    crop: 'Rice',
    variety: 'BPT 5204 (Sona Masoori)',
    quantity: 100,
    quantityUnit: 'Quintals',
    qualityGrade: 'Grade A',
    expectedPrice: 2800,
    location: 'Narsampet, Warangal',
    harvestDate: '2026-10-01',
    imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=500&auto=format&fit=crop&q=80',
    createdAt: '2026-09-17',
    status: 'Active',
    description: 'Cleaned, single-origin Sona Masoori paddy with 12% moisture level.'
  }
];

export const initialBuyerOffers: BuyerOffer[] = [
  {
    id: 'off_1',
    listingId: 'list_1',
    cropName: 'Tomato',
    farmerId: 'usr_farmer_1',
    farmerName: 'Ramesh Kumar',
    buyerId: 'usr_buyer_1',
    buyerName: 'Kavita Reddy',
    buyerCompany: 'Priya Agro Foods & Processing Ltd',
    buyerLocation: 'Bowenpally Wholesale Market, Hyderabad',
    offeredPrice: 2650, // Higher than asking price of 2500!
    requestedQuantity: 40,
    totalOfferAmount: 106000,
    status: 'Pending',
    notes: 'Premium grade tomatoes needed urgently for retail packaging. Direct bank escrow payment on truck weighment.',
    createdAt: '2026-09-19 09:15 AM'
  },
  {
    id: 'off_2',
    listingId: 'list_1',
    cropName: 'Tomato',
    farmerId: 'usr_farmer_1',
    farmerName: 'Ramesh Kumar',
    buyerId: 'usr_buyer_2',
    buyerName: 'Vikram Mehta',
    buyerCompany: 'Deccan Fresh Veggies Hub',
    buyerLocation: 'Monda Market, Secunderabad',
    offeredPrice: 2480,
    requestedQuantity: 50,
    totalOfferAmount: 124000,
    status: 'Pending',
    notes: 'Will purchase entire 50 quintal lot with farmgate pickup provided.',
    createdAt: '2026-09-19 10:00 AM'
  }
];

export const initialMarketPrices: MarketPricePoint[] = [
  {
    id: 'mp_1',
    crop: 'Tomato',
    variety: 'Vaishnavi / Hybrid Red',
    marketName: 'Warangal Agricultural Market Committee',
    district: 'Warangal',
    state: 'Telangana',
    pricePerQuintal: 2450,
    pricePerKg: 24.5,
    priceChange: 3.5,
    minPrice: 2200,
    maxPrice: 2600,
    modalPrice: 2450,
    date: 'Today (19 Sep 2026)',
    distanceKmFromFarmer: 18,
    transportCostEstimate: 95
  },
  {
    id: 'mp_2',
    crop: 'Tomato',
    variety: 'Vaishnavi / Hybrid Red',
    marketName: 'Bowenpally Agricultural Market',
    district: 'Hyderabad',
    state: 'Telangana',
    pricePerQuintal: 2750,
    pricePerKg: 27.5,
    priceChange: 6.2,
    minPrice: 2500,
    maxPrice: 2950,
    modalPrice: 2750,
    date: 'Today (19 Sep 2026)',
    distanceKmFromFarmer: 145,
    transportCostEstimate: 210
  },
  {
    id: 'mp_3',
    crop: 'Tomato',
    variety: 'Vaishnavi / Hybrid Red',
    marketName: 'Khammam Agricultural Mandi',
    district: 'Khammam',
    state: 'Telangana',
    pricePerQuintal: 2580,
    pricePerKg: 25.8,
    priceChange: -1.2,
    minPrice: 2350,
    maxPrice: 2700,
    modalPrice: 2580,
    date: 'Today (19 Sep 2026)',
    distanceKmFromFarmer: 110,
    transportCostEstimate: 165
  },
  {
    id: 'mp_4',
    crop: 'Rice',
    variety: 'BPT 5204 (Sona Masoori)',
    marketName: 'Warangal Agricultural Market Committee',
    district: 'Warangal',
    state: 'Telangana',
    pricePerQuintal: 2680,
    pricePerKg: 26.8,
    priceChange: 2.1,
    minPrice: 2500,
    maxPrice: 2850,
    modalPrice: 2680,
    date: 'Today (19 Sep 2026)',
    distanceKmFromFarmer: 18,
    transportCostEstimate: 95
  },
  {
    id: 'mp_5',
    crop: 'Rice',
    variety: 'BPT 5204 (Sona Masoori)',
    marketName: 'Miryalaguda Paddy Mandi',
    district: 'Nalgonda',
    state: 'Telangana',
    pricePerQuintal: 2840,
    pricePerKg: 28.4,
    priceChange: 4.0,
    minPrice: 2700,
    maxPrice: 2980,
    modalPrice: 2840,
    date: 'Today (19 Sep 2026)',
    distanceKmFromFarmer: 135,
    transportCostEstimate: 190
  },
  {
    id: 'mp_6',
    crop: 'Chilli',
    variety: 'Teja S17 Hot Red',
    marketName: 'Khammam Chilli Yard',
    district: 'Khammam',
    state: 'Telangana',
    pricePerQuintal: 18900,
    pricePerKg: 189.0,
    priceChange: 5.4,
    minPrice: 17500,
    maxPrice: 20200,
    modalPrice: 18900,
    date: 'Today (19 Sep 2026)',
    distanceKmFromFarmer: 110,
    transportCostEstimate: 180
  },
  {
    id: 'mp_7',
    crop: 'Chilli',
    variety: 'Teja S17 Hot Red',
    marketName: 'Guntur Mirchi Yard',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    pricePerQuintal: 19800,
    pricePerKg: 198.0,
    priceChange: 7.1,
    minPrice: 18200,
    maxPrice: 21500,
    modalPrice: 19800,
    date: 'Today (19 Sep 2026)',
    distanceKmFromFarmer: 240,
    transportCostEstimate: 340
  },
  {
    id: 'mp_8',
    crop: 'Cotton',
    variety: 'Bunny Bt / Medium Staple',
    marketName: 'Warangal Cotton Yard',
    district: 'Warangal',
    state: 'Telangana',
    pricePerQuintal: 7350,
    pricePerKg: 73.5,
    priceChange: 1.8,
    minPrice: 7100,
    maxPrice: 7550,
    modalPrice: 7350,
    date: 'Today (19 Sep 2026)',
    distanceKmFromFarmer: 18,
    transportCostEstimate: 95
  },
  {
    id: 'mp_9',
    crop: 'Maize',
    variety: 'Yellow Feed Grain',
    marketName: 'Warangal Agricultural Market Committee',
    district: 'Warangal',
    state: 'Telangana',
    pricePerQuintal: 2180,
    pricePerKg: 21.8,
    priceChange: 0.9,
    minPrice: 2050,
    maxPrice: 2280,
    modalPrice: 2180,
    date: 'Today (19 Sep 2026)',
    distanceKmFromFarmer: 18,
    transportCostEstimate: 95
  }
];

export const initialFPOs: FPOProfile[] = [
  {
    id: 'fpo_1',
    userId: 'usr_fpo_1',
    name: 'Kakatiya Farmers Producer Co. Ltd',
    registrationNumber: 'U01409TG2020PTC145892',
    location: 'Narsampet Road, Warangal Rural',
    state: 'Telangana',
    memberFarmersCount: 485,
    cropsHandled: ['Tomato', 'Chilli', 'Rice', 'Maize', 'Turmeric'],
    services: [
      'Collective Crop Aggregation & Export Sales',
      'Subsidized Seed & Bio-Fertilizer Bulk Procurement',
      'Shared Tractor & Harvester Machinery Pool',
      'Custom Processing & Sorting Plant'
    ],
    contactPerson: 'K. Rajendra Prasad (CEO)',
    phone: '+91 98765 43210',
    email: 'contact@kakatiya-fpo.org',
    verificationStatus: 'Verified',
    activeAggregationDrives: [
      {
        id: 'agg_1',
        crop: 'Tomato (Processing Grade)',
        targetQuintals: 300,
        collectedQuintals: 215,
        targetPricePerQtl: 2600,
        closingDate: '2026-09-24'
      },
      {
        id: 'agg_2',
        crop: 'Sona Masoori Rice (Export Quality)',
        targetQuintals: 1000,
        collectedQuintals: 640,
        targetPricePerQtl: 2900,
        closingDate: '2026-10-15'
      }
    ]
  },
  {
    id: 'fpo_2',
    userId: 'usr_fpo_2',
    name: 'Telangana Krishi Vikas Producer Company',
    registrationNumber: 'U01111TG2021PTC152341',
    location: 'Jangaon District Centre, Telangana',
    state: 'Telangana',
    memberFarmersCount: 320,
    cropsHandled: ['Cotton', 'Chilli', 'Pulses'],
    services: ['Cotton Ginning Aggregation', 'Soil Testing Lab Access', 'Credit Linkage with NABARD'],
    contactPerson: 'M. Sridhar (Managing Director)',
    phone: '+91 94408 77654',
    email: 'info@krishivikasfpo.in',
    verificationStatus: 'Verified',
    activeAggregationDrives: [
      {
        id: 'agg_3',
        crop: 'Teja Red Chilli (Dry)',
        targetQuintals: 150,
        collectedQuintals: 80,
        targetPricePerQtl: 19500,
        closingDate: '2026-10-30'
      }
    ]
  }
];

export const initialVehicles: Vehicle[] = [
  {
    id: 'veh_1',
    providerId: 'usr_transport_1',
    providerName: 'Sri Balaji Agri Logistics (Mahesh Yadav)',
    vehicleType: 'Mini Truck',
    vehicleNumber: 'TS 03 UA 5421 (Tata Ace Gold)',
    capacityTonnes: 2.5,
    baseRatePerKm: 28,
    location: 'Warangal Bypass',
    isAvailable: true,
    driverName: 'Ravi Teja',
    driverPhone: '+91 98481 11222',
    rating: 4.9
  },
  {
    id: 'veh_2',
    providerId: 'usr_transport_1',
    providerName: 'Sri Balaji Agri Logistics (Mahesh Yadav)',
    vehicleType: 'Tractor Trolley',
    vehicleNumber: 'TS 03 T 8974 (Mahindra 575 DI)',
    capacityTonnes: 4.0,
    baseRatePerKm: 22,
    location: 'Georai - Narsampet Area',
    isAvailable: true,
    driverName: 'Satish Kumar',
    driverPhone: '+91 98481 33445',
    rating: 4.8
  },
  {
    id: 'veh_3',
    providerId: 'usr_transport_2',
    providerName: 'Telangana Highway Heavy Carriers',
    vehicleType: 'Lorry / Truck',
    vehicleNumber: 'TS 09 Z 4512 (Eicher Pro 12T)',
    capacityTonnes: 12.0,
    baseRatePerKm: 45,
    location: 'Hyderabad Road Checkpost',
    isAvailable: true,
    driverName: 'Gurpreet Singh',
    driverPhone: '+91 99887 76655',
    rating: 4.7
  }
];

export const initialTransportBookings: TransportBooking[] = [
  {
    id: 'tb_1',
    bookingCode: 'TR-2026-981',
    farmerId: 'usr_farmer_1',
    farmerName: 'Ramesh Kumar',
    providerId: 'usr_transport_1',
    providerName: 'Sri Balaji Agri Logistics',
    vehicleType: 'Mini Truck',
    cropName: 'Tomato (Vaishnavi F1)',
    quantityTonnes: 4.0,
    pickupLocation: 'Ramesh Prakruthi Farm, Georai, Warangal',
    destinationLocation: 'Bowenpally Wholesale Agricultural Market, Hyderabad',
    distanceKm: 145,
    totalFare: 4060,
    bookingDate: '2026-09-19',
    scheduledDate: '2026-09-20 06:00 AM',
    status: 'In Transit',
    currentCheckpoint: 'Jangaon Toll Plaza (78 km to destination)',
    estimatedArrival: 'Today at 01:30 PM'
  }
];

export const initialStorageFacilities: StorageFacility[] = [
  {
    id: 'store_1',
    providerId: 'usr_storage_1',
    facilityName: 'Deccan Cold Chain & Refrigerated Warehouses',
    location: 'Plot 42, IDA Rampur, Warangal',
    district: 'Warangal',
    storageType: 'Cold Storage',
    totalCapacityTonnes: 5000,
    availableCapacityTonnes: 1420,
    chargesPerQuintalPerMonth: 65,
    contactPerson: 'Srinivas Varma',
    contactPhone: '+91 94901 11223',
    isVerified: true,
    temperatureControlled: true,
    subsidyAvailable: true
  },
  {
    id: 'store_2',
    providerId: 'usr_storage_2',
    facilityName: 'Telangana State Warehousing Corp (SWC Hub)',
    location: 'Mandi Road, Kazipet',
    district: 'Hanamkonda',
    storageType: 'Dry Ventilated Warehouse',
    totalCapacityTonnes: 8500,
    availableCapacityTonnes: 3200,
    chargesPerQuintalPerMonth: 35,
    contactPerson: 'D. Ramesh Babu',
    contactPhone: '+91 94401 22334',
    isVerified: true,
    temperatureControlled: false,
    subsidyAvailable: true
  },
  {
    id: 'store_3',
    providerId: 'usr_storage_3',
    facilityName: 'Kakatiya Modern Grain Silos',
    location: 'Enumamula Grain Market Yard',
    district: 'Warangal',
    storageType: 'Grain Silo',
    totalCapacityTonnes: 12000,
    availableCapacityTonnes: 4800,
    chargesPerQuintalPerMonth: 42,
    contactPerson: 'Anand Murthy',
    contactPhone: '+91 98490 66778',
    isVerified: true,
    temperatureControlled: true,
    subsidyAvailable: true
  }
];

export const initialStorageBookings: StorageBooking[] = [
  {
    id: 'sb_1',
    bookingCode: 'SB-8842',
    farmerId: 'usr_farmer_1',
    farmerName: 'Ramesh Kumar',
    facilityId: 'store_1',
    facilityName: 'Deccan Cold Chain & Refrigerated Warehouses',
    cropName: 'Chilli (Dry Teja)',
    quantityQuintals: 30,
    durationMonths: 3,
    totalCost: 5850,
    startDate: '2026-08-15',
    status: 'Active',
    createdAt: '2026-08-14'
  }
];

export const initialTransactions: Transaction[] = [
  {
    id: 'tx_1',
    transactionNumber: 'TXN-AGRI-89210',
    userId: 'usr_farmer_1',
    userName: 'Ramesh Kumar',
    userRole: 'farmer',
    type: 'Credit',
    category: 'Crop Sale',
    relatedEntityId: 'off_1',
    amount: 106000,
    date: '2026-09-19 11:40 AM',
    status: 'Successful',
    paymentMethod: 'Escrow Wallet',
    description: 'Crop sale proceeds for 40 Quintals Tomato to Priya Agro Foods'
  },
  {
    id: 'tx_2',
    transactionNumber: 'TXN-AGRI-89195',
    userId: 'usr_farmer_1',
    userName: 'Ramesh Kumar',
    userRole: 'farmer',
    type: 'Debit',
    category: 'Product Purchase',
    relatedEntityId: 'prod_1',
    amount: 600,
    date: '2026-09-19 10:15 AM',
    status: 'Successful',
    paymentMethod: 'UPI / NetBanking',
    description: 'Purchase of Trichoderma Bio-Fungicide & Bio-Neem Spray'
  },
  {
    id: 'tx_3',
    transactionNumber: 'TXN-AGRI-89150',
    userId: 'usr_farmer_1',
    userName: 'Ramesh Kumar',
    userRole: 'farmer',
    type: 'Debit',
    category: 'Consultation Fee',
    relatedEntityId: 'cons_1',
    amount: 250,
    date: '2026-09-18 10:50 AM',
    status: 'Successful',
    paymentMethod: 'UPI / NetBanking',
    description: 'Agronomist consultation fee for Dr. K. Srinivas Rao'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    userId: 'usr_farmer_1',
    type: 'buyer_offer',
    title: 'New High Offer on Tomato Listing!',
    message: 'Kavita Reddy (Priya Agro Foods) submitted an offer of ₹2,650/Qtl for 40 Quintals Tomato (exceeds your asking price of ₹2,500).',
    timestamp: '15 mins ago',
    isRead: false,
    linkUrl: '/farmer/sell-crops'
  },
  {
    id: 'notif_2',
    userId: 'usr_farmer_1',
    type: 'recommendation',
    title: 'Agronomist Recommendation Available',
    message: 'Dr. K. Srinivas Rao has submitted your prescription notes for Early Blight management.',
    timestamp: '1 hour ago',
    isRead: false,
    linkUrl: '/farmer/professionals'
  },
  {
    id: 'notif_3',
    userId: 'usr_farmer_1',
    type: 'transport',
    title: 'Vehicle Dispatched & Tracking Live',
    message: 'Mini Truck (TS 03 UA 5421) is en route to Bowenpally Mandi. Current location: Jangaon.',
    timestamp: '2 hours ago',
    isRead: false,
    linkUrl: '/farmer/transport'
  },
  {
    id: 'notif_4',
    userId: 'usr_farmer_1',
    type: 'disease_alert',
    title: 'Early Blight Advisory for Warangal District',
    message: 'Department of Agriculture issued high humidity fungal risk warning for tomato and potato growers.',
    timestamp: 'Yesterday',
    isRead: true,
    linkUrl: '/farmer/disease-detection'
  }
];

export const initialMessages: MessageItem[] = [
  {
    id: 'msg_1',
    senderId: 'usr_buyer_1',
    senderName: 'Kavita Reddy (Buyer)',
    senderRole: 'buyer',
    recipientId: 'usr_farmer_1',
    recipientName: 'Ramesh Kumar',
    conversationId: 'conv_farmer_buyer',
    text: 'Namaste Ramesh ji! We saw your Vaishnavi Tomato listing. We are ready to take 40 quintals at ₹2,650/qtl. Can you dispatch tomorrow morning?',
    timestamp: '09:20 AM'
  },
  {
    id: 'msg_2',
    senderId: 'usr_farmer_1',
    senderName: 'Ramesh Kumar',
    senderRole: 'farmer',
    recipientId: 'usr_buyer_1',
    recipientName: 'Kavita Reddy (Buyer)',
    conversationId: 'conv_farmer_buyer',
    text: 'Namaste madam. Yes, the crates are harvested and graded Grade A. I have accepted your offer and booked a Mini Truck for tomorrow 6 AM.',
    timestamp: '09:45 AM'
  },
  {
    id: 'msg_3',
    senderId: 'usr_expert_1',
    senderName: 'Dr. K. Srinivas Rao (Agronomist)',
    senderRole: 'professional',
    recipientId: 'usr_farmer_1',
    recipientName: 'Ramesh Kumar',
    conversationId: 'conv_farmer_expert',
    text: 'Ramesh garu, make sure you do not spray copper fungicides in peak afternoon sun. Always spray either before 9 AM or after 4 PM.',
    timestamp: 'Yesterday'
  }
];
