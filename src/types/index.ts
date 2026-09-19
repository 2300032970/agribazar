export type UserRole =
  | 'farmer'
  | 'buyer'
  | 'professional'
  | 'seller'
  | 'fpo'
  | 'transport'
  | 'storage'
  | 'admin';

export type LanguageCode = 'en' | 'te' | 'hi';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  location: string;
  avatarUrl?: string;
  isVerified?: boolean;
}

export interface FarmerProfile {
  id: string;
  userId: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  preferredLanguage: LanguageCode;
  landArea: number; // in acres
  soilType: string;
  irrigationType: string;
  cropsCultivated: string[];
  farmName: string;
  bio?: string;
}

export type CropStatus = 'Growing' | 'Ready for Harvest' | 'Listed for Sale' | 'Sold';

export interface Crop {
  id: string;
  farmerId: string;
  cropName: string;
  variety: string;
  quantity: number; // in quintals/bags
  quantityUnit: string; // 'Quintals', 'Bags', 'Tonnes', 'Kg'
  landArea: number; // acres
  sowingDate: string;
  expectedHarvestDate: string;
  location: string;
  qualityGrade: 'Grade A' | 'Grade B' | 'Grade C';
  imageUrl: string;
  status: CropStatus;
  notes?: string;
  history?: Array<{
    date: string;
    action: string;
    note: string;
  }>;
}

export interface DiseaseDetection {
  id: string;
  farmerId: string;
  cropName: string;
  cropVariety?: string;
  imageUrl: string;
  detectedDisease: string; // e.g. "Tomato Early Blight"
  confidencePercentage: number;
  severity: 'Low' | 'Moderate' | 'High';
  detectedAt: string;
  symptoms: string[];
  preventionGuidance: string[];
  recommendedBioInputs: string[];
  disclaimer: string;
  consultationCreated?: boolean;
}

export interface Professional {
  id: string;
  userId: string;
  name: string;
  qualification: string;
  specialization: string;
  experienceYears: number;
  cropsHandled: string[];
  location: string;
  languages: string[];
  consultationFee: number; // in INR
  availability: 'Available Today' | 'Available Tomorrow' | 'In 2 Days' | 'Busy';
  rating: number;
  reviewsCount: number;
  verificationBadge: boolean;
  avatarUrl: string;
  credentials: string;
  bio: string;
}

export type ConsultationStatus = 'Requested' | 'Accepted' | 'Completed' | 'Cancelled';

export interface Consultation {
  id: string;
  farmerId: string;
  farmerName: string;
  professionalId: string;
  professionalName: string;
  cropName: string;
  date: string;
  timeSlot: string;
  issueDescription: string;
  cropImageUrl?: string;
  status: ConsultationStatus;
  createdAt: string;
  meetingLink?: string;
}

export interface Recommendation {
  id: string;
  consultationId: string;
  farmerId: string;
  farmerName: string;
  professionalId: string;
  professionalName: string;
  crop: string;
  identifiedProblem: string;
  recommendation: string;
  suggestedPractice: string;
  relevantProduct: string;
  usageInstructions: string;
  followUpDate: string;
  createdAt: string;
}

export type ProductCategory =
  | 'Seeds'
  | 'Fertilizers'
  | 'Bio-inputs'
  | 'Crop Protection'
  | 'Pesticides'
  | 'Equipment';

export interface Product {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  sellerDistanceKm: number;
  name: string;
  category: ProductCategory;
  manufacturer: string;
  applicableCrop: string[];
  price: number; // INR
  originalPrice?: number;
  unit: string; // e.g. '1 L', '500 g', '25 kg bag'
  stock: number;
  rating: number;
  reviewsCount: number;
  location: string;
  imageUrl: string;
  description: string;
  usage: string;
  isOrganic?: boolean;
  isVerifiedSeller: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: string;
  paymentStatus: 'Pending' | 'Successful' | 'Failed' | 'Refunded';
  paymentMethod: string;
  deliveryStatus: 'Order Placed' | 'Packed' | 'Shipped' | 'Delivered';
  estimatedDelivery: string;
  createdAt: string;
}

export interface CropListing {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  crop: string;
  variety: string;
  quantity: number;
  quantityUnit: string;
  qualityGrade: 'Grade A' | 'Grade B' | 'Grade C';
  expectedPrice: number; // INR per quintal/unit
  location: string;
  harvestDate: string;
  imageUrl: string;
  createdAt: string;
  status: 'Active' | 'Under Offer' | 'Sold';
  description?: string;
}

export interface BuyerOffer {
  id: string;
  listingId: string;
  cropName: string;
  farmerId: string;
  farmerName: string;
  buyerId: string;
  buyerName: string;
  buyerCompany: string;
  buyerLocation: string;
  offeredPrice: number; // per quintal
  requestedQuantity: number;
  totalOfferAmount: number;
  status: 'Pending' | 'Accepted' | 'Rejected';
  notes: string;
  createdAt: string;
}

export interface MarketPricePoint {
  id: string;
  crop: string;
  variety: string;
  marketName: string;
  district: string;
  state: string;
  pricePerQuintal: number;
  pricePerKg: number;
  priceChange: number; // percentage +/-
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  date: string;
  distanceKmFromFarmer: number;
  transportCostEstimate: number;
}

export interface FPOProfile {
  id: string;
  userId: string;
  name: string;
  registrationNumber: string;
  location: string;
  state: string;
  memberFarmersCount: number;
  cropsHandled: string[];
  services: string[];
  contactPerson: string;
  phone: string;
  email: string;
  verificationStatus: 'Verified' | 'Pending' | 'Rejected';
  activeAggregationDrives: Array<{
    id: string;
    crop: string;
    targetQuintals: number;
    collectedQuintals: number;
    targetPricePerQtl: number;
    closingDate: string;
  }>;
}

export type VehicleType = 'Tractor Trolley' | 'Mini Truck' | 'Lorry / Truck';

export interface Vehicle {
  id: string;
  providerId: string;
  providerName: string;
  vehicleType: VehicleType;
  vehicleNumber: string;
  capacityTonnes: number;
  baseRatePerKm: number;
  location: string;
  isAvailable: boolean;
  driverName: string;
  driverPhone: string;
  rating: number;
}

export type ShipmentStatus = 'Requested' | 'Confirmed' | 'Picked Up' | 'In Transit' | 'Delivered';

export interface TransportBooking {
  id: string;
  bookingCode: string;
  farmerId: string;
  farmerName: string;
  providerId: string;
  providerName: string;
  vehicleType: VehicleType;
  cropName: string;
  quantityTonnes: number;
  pickupLocation: string;
  destinationLocation: string;
  distanceKm: number;
  totalFare: number;
  bookingDate: string;
  scheduledDate: string;
  status: ShipmentStatus;
  currentCheckpoint?: string;
  estimatedArrival?: string;
}

export interface StorageFacility {
  id: string;
  providerId: string;
  facilityName: string;
  location: string;
  district: string;
  storageType: 'Cold Storage' | 'Dry Ventilated Warehouse' | 'Grain Silo';
  totalCapacityTonnes: number;
  availableCapacityTonnes: number;
  chargesPerQuintalPerMonth: number;
  contactPerson: string;
  contactPhone: string;
  isVerified: boolean;
  temperatureControlled: boolean;
  subsidyAvailable: boolean;
}

export interface StorageBooking {
  id: string;
  bookingCode: string;
  farmerId: string;
  farmerName: string;
  facilityId: string;
  facilityName: string;
  cropName: string;
  quantityQuintals: number;
  durationMonths: number;
  totalCost: number;
  startDate: string;
  status: 'Pending' | 'Confirmed' | 'Active' | 'Completed';
  createdAt: string;
}

export interface Transaction {
  id: string;
  transactionNumber: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  type: 'Credit' | 'Debit';
  category: 'Crop Sale' | 'Product Purchase' | 'Consultation Fee' | 'Transport Fare' | 'Storage Charges';
  relatedEntityId: string;
  amount: number;
  date: string;
  status: 'Successful' | 'Pending' | 'Failed' | 'Refunded';
  paymentMethod: 'UPI / NetBanking' | 'Direct Mandi Transfer' | 'Card' | 'Escrow Wallet';
  description: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  type:
    | 'disease_alert'
    | 'consultation'
    | 'recommendation'
    | 'buyer_offer'
    | 'crop_sale'
    | 'order'
    | 'transport'
    | 'storage'
    | 'payment'
    | 'sync';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  linkUrl?: string;
}

export interface MessageItem {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  recipientId: string;
  recipientName: string;
  conversationId: string;
  text: string;
  attachmentUrl?: string;
  attachmentType?: 'image' | 'document';
  timestamp: string;
}

export interface OfflinePendingAction {
  id: string;
  type: 'ADD_CROP' | 'UPDATE_CROP' | 'DELETE_CROP';
  payload: any;
  createdAt: string;
}
