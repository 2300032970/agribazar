import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Crop,
  DiseaseDetection,
  Professional,
  Consultation,
  Recommendation,
  Product,
  CartItem,
  Order,
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
  MessageItem,
  User,
  FarmerProfile
} from '../types';
import {
  initialUsers,
  initialFarmerProfile,
  initialCrops,
  initialDiseaseDetections,
  initialProfessionals,
  initialConsultations,
  initialRecommendations,
  initialProducts,
  initialCropListings,
  initialBuyerOffers,
  initialMarketPrices,
  initialFPOs,
  initialVehicles,
  initialTransportBookings,
  initialStorageFacilities,
  initialStorageBookings,
  initialTransactions,
  initialNotifications,
  initialMessages
} from '../mock/seedData';

interface StoreContextType {
  // Users & Profiles
  users: Record<string, User>;
  farmerProfile: FarmerProfile;
  updateFarmerProfile: (profile: Partial<FarmerProfile>) => void;
  verifyEntity: (entityType: 'professional' | 'seller' | 'fpo' | 'transport' | 'storage', entityId: string, isApproved: boolean) => void;

  // Crops
  crops: Crop[];
  addCrop: (crop: Omit<Crop, 'id'>) => Crop;
  updateCrop: (id: string, updates: Partial<Crop>) => void;
  deleteCrop: (id: string) => void;

  // Disease Detections
  diseaseDetections: DiseaseDetection[];
  addDiseaseDetection: (detection: Omit<DiseaseDetection, 'id' | 'detectedAt'>) => DiseaseDetection;

  // Professionals & Consultations
  professionals: Professional[];
  consultations: Consultation[];
  recommendations: Recommendation[];
  bookConsultation: (consultation: Omit<Consultation, 'id' | 'status' | 'createdAt'>) => Consultation;
  updateConsultationStatus: (id: string, status: Consultation['status']) => void;
  addRecommendation: (rec: Omit<Recommendation, 'id' | 'createdAt'>) => Recommendation;

  // Products & Cart
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Orders
  orders: Order[];
  createOrder: (shippingAddress: string, paymentMethod: string) => Order | null;
  updateOrderStatus: (orderId: string, status: Order['deliveryStatus']) => void;

  // Crop Marketplace & Bids
  cropListings: CropListing[];
  addCropListing: (listing: Omit<CropListing, 'id' | 'createdAt' | 'status'>) => CropListing;
  buyerOffers: BuyerOffer[];
  addBuyerOffer: (offer: Omit<BuyerOffer, 'id' | 'createdAt' | 'status' | 'totalOfferAmount'>) => BuyerOffer;
  acceptBuyerOffer: (offerId: string) => void;
  rejectBuyerOffer: (offerId: string) => void;

  // Market Prices
  marketPrices: MarketPricePoint[];

  // FPOs
  fpos: FPOProfile[];

  // Transport
  vehicles: Vehicle[];
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => Vehicle;
  transportBookings: TransportBooking[];
  addTransportBooking: (booking: Omit<TransportBooking, 'id' | 'bookingCode' | 'bookingDate' | 'status'>) => TransportBooking;
  updateShipmentStatus: (bookingId: string, status: TransportBooking['status'], currentCheckpoint?: string) => void;

  // Storage
  storageFacilities: StorageFacility[];
  storageBookings: StorageBooking[];
  addStorageBooking: (booking: Omit<StorageBooking, 'id' | 'bookingCode' | 'createdAt' | 'status'>) => StorageBooking;

  // Transactions
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id' | 'transactionNumber' | 'date'>) => Transaction;

  // Notifications
  notifications: NotificationItem[];
  addNotification: (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'isRead'>) => void;
  markNotificationAsRead: (id: string) => void;

  // Messages
  messages: MessageItem[];
  sendMessage: (msg: Omit<MessageItem, 'id' | 'timestamp'>) => void;

  // Utilities
  resetToDemoData: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

function getSaved<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(`agriconnect_${key}`);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<Record<string, User>>(() => getSaved('users', initialUsers));
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile>(() => getSaved('farmerProfile', initialFarmerProfile));
  const [crops, setCrops] = useState<Crop[]>(() => getSaved('crops', initialCrops));
  const [diseaseDetections, setDiseaseDetections] = useState<DiseaseDetection[]>(() => getSaved('diseaseDetections', initialDiseaseDetections));
  const [professionals, setProfessionals] = useState<Professional[]>(() => getSaved('professionals', initialProfessionals));
  const [consultations, setConsultations] = useState<Consultation[]>(() => getSaved('consultations', initialConsultations));
  const [recommendations, setRecommendations] = useState<Recommendation[]>(() => getSaved('recommendations', initialRecommendations));
  const [products, setProducts] = useState<Product[]>(() => getSaved('products', initialProducts));
  const [cart, setCart] = useState<CartItem[]>(() => getSaved('cart', []));
  const [orders, setOrders] = useState<Order[]>(() => getSaved('orders', []));
  const [cropListings, setCropListings] = useState<CropListing[]>(() => getSaved('cropListings', initialCropListings));
  const [buyerOffers, setBuyerOffers] = useState<BuyerOffer[]>(() => getSaved('buyerOffers', initialBuyerOffers));
  const [marketPrices] = useState<MarketPricePoint[]>(() => getSaved('marketPrices', initialMarketPrices));
  const [fpos, setFpos] = useState<FPOProfile[]>(() => getSaved('fpos', initialFPOs));
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => getSaved('vehicles', initialVehicles));
  const [transportBookings, setTransportBookings] = useState<TransportBooking[]>(() => getSaved('transportBookings', initialTransportBookings));
  const [storageFacilities, setStorageFacilities] = useState<StorageFacility[]>(() => getSaved('storageFacilities', initialStorageFacilities));
  const [storageBookings, setStorageBookings] = useState<StorageBooking[]>(() => getSaved('storageBookings', initialStorageBookings));
  const [transactions, setTransactions] = useState<Transaction[]>(() => getSaved('transactions', initialTransactions));
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => getSaved('notifications', initialNotifications));
  const [messages, setMessages] = useState<MessageItem[]>(() => getSaved('messages', initialMessages));

  // Sync to local storage
  useEffect(() => { localStorage.setItem('agriconnect_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('agriconnect_farmerProfile', JSON.stringify(farmerProfile)); }, [farmerProfile]);
  useEffect(() => { localStorage.setItem('agriconnect_crops', JSON.stringify(crops)); }, [crops]);
  useEffect(() => { localStorage.setItem('agriconnect_diseaseDetections', JSON.stringify(diseaseDetections)); }, [diseaseDetections]);
  useEffect(() => { localStorage.setItem('agriconnect_professionals', JSON.stringify(professionals)); }, [professionals]);
  useEffect(() => { localStorage.setItem('agriconnect_consultations', JSON.stringify(consultations)); }, [consultations]);
  useEffect(() => { localStorage.setItem('agriconnect_recommendations', JSON.stringify(recommendations)); }, [recommendations]);
  useEffect(() => { localStorage.setItem('agriconnect_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('agriconnect_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('agriconnect_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('agriconnect_cropListings', JSON.stringify(cropListings)); }, [cropListings]);
  useEffect(() => { localStorage.setItem('agriconnect_buyerOffers', JSON.stringify(buyerOffers)); }, [buyerOffers]);
  useEffect(() => { localStorage.setItem('agriconnect_fpos', JSON.stringify(fpos)); }, [fpos]);
  useEffect(() => { localStorage.setItem('agriconnect_vehicles', JSON.stringify(vehicles)); }, [vehicles]);
  useEffect(() => { localStorage.setItem('agriconnect_transportBookings', JSON.stringify(transportBookings)); }, [transportBookings]);
  useEffect(() => { localStorage.setItem('agriconnect_storageFacilities', JSON.stringify(storageFacilities)); }, [storageFacilities]);
  useEffect(() => { localStorage.setItem('agriconnect_storageBookings', JSON.stringify(storageBookings)); }, [storageBookings]);
  useEffect(() => { localStorage.setItem('agriconnect_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('agriconnect_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('agriconnect_messages', JSON.stringify(messages)); }, [messages]);

  // Farmer Profile
  const updateFarmerProfile = (updates: Partial<FarmerProfile>) => {
    setFarmerProfile(prev => ({ ...prev, ...updates }));
  };

  // Crops CRUD
  const addCrop = (cropData: Omit<Crop, 'id'>): Crop => {
    const newCrop: Crop = {
      ...cropData,
      id: `crop_${Date.now()}`,
      history: [{ date: new Date().toISOString().split('T')[0], action: 'Added to Farm', note: 'Crop recorded in farm diary' }]
    };
    setCrops(prev => [newCrop, ...prev]);
    addNotification({
      userId: cropData.farmerId,
      type: 'sync',
      title: `Crop Added: ${cropData.cropName}`,
      message: `Successfully logged ${cropData.cropName} (${cropData.variety}) covering ${cropData.landArea} acres.`,
      linkUrl: '/farmer/crops'
    });
    return newCrop;
  };

  const updateCrop = (id: string, updates: Partial<Crop>) => {
    setCrops(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCrop = (id: string) => {
    setCrops(prev => prev.filter(c => c.id !== id));
  };

  // Disease Detection
  const addDiseaseDetection = (data: Omit<DiseaseDetection, 'id' | 'detectedAt'>): DiseaseDetection => {
    const newDetection: DiseaseDetection = {
      ...data,
      id: `dd_${Date.now()}`,
      detectedAt: new Date().toLocaleString()
    };
    setDiseaseDetections(prev => [newDetection, ...prev]);
    addNotification({
      userId: data.farmerId,
      type: 'disease_alert',
      title: `AI Diagnosis: ${data.detectedDisease}`,
      message: `Identified potential ${data.detectedDisease} with ${data.confidencePercentage}% confidence. Review non-chemical guidance or consult an agronomist.`,
      linkUrl: '/farmer/disease-detection'
    });
    return newDetection;
  };

  // Consultations & Recommendations
  const bookConsultation = (data: Omit<Consultation, 'id' | 'status' | 'createdAt'>): Consultation => {
    const newCons: Consultation = {
      ...data,
      id: `cons_${Date.now()}`,
      status: 'Accepted', // Auto-accepted for smooth hackathon demo
      createdAt: new Date().toLocaleString(),
      meetingLink: `/consultation/room/cons_${Date.now()}`
    };
    setConsultations(prev => [newCons, ...prev]);
    addNotification({
      userId: data.farmerId,
      type: 'consultation',
      title: `Consultation Booked with ${data.professionalName}`,
      message: `Session confirmed for ${data.date} at ${data.timeSlot}.`,
      linkUrl: `/consultation/room/${newCons.id}`
    });
    // Add transaction for fee
    addTransaction({
      userId: data.farmerId,
      userName: data.farmerName,
      userRole: 'farmer',
      type: 'Debit',
      category: 'Consultation Fee',
      relatedEntityId: newCons.id,
      amount: 250,
      status: 'Successful',
      paymentMethod: 'UPI / NetBanking',
      description: `Consultation fee paid to ${data.professionalName}`
    });
    return newCons;
  };

  const updateConsultationStatus = (id: string, status: Consultation['status']) => {
    setConsultations(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  const addRecommendation = (data: Omit<Recommendation, 'id' | 'createdAt'>): Recommendation => {
    const newRec: Recommendation = {
      ...data,
      id: `rec_${Date.now()}`,
      createdAt: new Date().toLocaleString()
    };
    setRecommendations(prev => [newRec, ...prev]);
    addNotification({
      userId: data.farmerId,
      type: 'recommendation',
      title: `Agronomist Recommendation for ${data.crop}`,
      message: `${data.professionalName} issued prescription instructions: ${data.recommendation.substring(0, 70)}...`,
      linkUrl: '/farmer/professionals'
    });
    return newRec;
  };

  // Products & Cart
  const addProduct = (prodData: Omit<Product, 'id'>): Product => {
    const newProd: Product = { ...prodData, id: `prod_${Date.now()}` };
    setProducts(prev => [newProd, ...prev]);
    return newProd;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
    }
  };

  const clearCart = () => setCart([]);

  // Orders
  const createOrder = (shippingAddress: string, paymentMethod: string): Order | null => {
    if (cart.length === 0) return null;
    const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber: `ORD-AGRI-${Math.floor(10000 + Math.random() * 90000)}`,
      buyerId: 'usr_farmer_1',
      buyerName: farmerProfile.name,
      sellerId: cart[0].product.sellerId,
      sellerName: cart[0].product.sellerName,
      items: [...cart],
      totalAmount,
      shippingAddress,
      paymentStatus: 'Successful',
      paymentMethod,
      deliveryStatus: 'Order Placed',
      estimatedDelivery: 'In 2 business days',
      createdAt: new Date().toLocaleString()
    };
    setOrders(prev => [newOrder, ...prev]);
    addTransaction({
      userId: 'usr_farmer_1',
      userName: farmerProfile.name,
      userRole: 'farmer',
      type: 'Debit',
      category: 'Product Purchase',
      relatedEntityId: newOrder.id,
      amount: totalAmount,
      status: 'Successful',
      paymentMethod: 'UPI / NetBanking',
      description: `Agri-input order for ${cart.length} product(s)`
    });
    addNotification({
      userId: 'usr_farmer_1',
      type: 'order',
      title: `Order Placed: ${newOrder.orderNumber}`,
      message: `₹${totalAmount} payment successful. Delivery to ${shippingAddress.split(',')[0]}.`,
      linkUrl: '/farmer/marketplace'
    });
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, deliveryStatus: Order['deliveryStatus']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, deliveryStatus } : o));
  };

  // Crop Listings & Bids
  const addCropListing = (data: Omit<CropListing, 'id' | 'createdAt' | 'status'>): CropListing => {
    const newListing: CropListing = {
      ...data,
      id: `list_${Date.now()}`,
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCropListings(prev => [newListing, ...prev]);
    // Also mark crop status as 'Listed for Sale'
    setCrops(prev => prev.map(c => c.cropName === data.crop ? { ...c, status: 'Listed for Sale' } : c));
    addNotification({
      userId: data.farmerId,
      type: 'crop_sale',
      title: `Listing Published: ${data.crop}`,
      message: `${data.quantity} ${data.quantityUnit} of ${data.variety} listed at ₹${data.expectedPrice}/qtl.`,
      linkUrl: '/farmer/sell-crops'
    });
    return newListing;
  };

  const addBuyerOffer = (data: Omit<BuyerOffer, 'id' | 'createdAt' | 'status' | 'totalOfferAmount'>): BuyerOffer => {
    const total = data.offeredPrice * data.requestedQuantity;
    const newOffer: BuyerOffer = {
      ...data,
      id: `off_${Date.now()}`,
      totalOfferAmount: total,
      status: 'Pending',
      createdAt: new Date().toLocaleString()
    };
    setBuyerOffers(prev => [newOffer, ...prev]);
    addNotification({
      userId: data.farmerId,
      type: 'buyer_offer',
      title: `New Offer from ${data.buyerName}!`,
      message: `Offered ₹${data.offeredPrice}/qtl for ${data.requestedQuantity} quintals of ${data.cropName} (Total: ₹${total.toLocaleString()}).`,
      linkUrl: '/farmer/sell-crops'
    });
    return newOffer;
  };

  const acceptBuyerOffer = (offerId: string) => {
    setBuyerOffers(prev => prev.map(off => off.id === offerId ? { ...off, status: 'Accepted' } : off));
    const offer = buyerOffers.find(o => o.id === offerId);
    if (offer) {
      setCropListings(prev => prev.map(l => l.id === offer.listingId ? { ...l, status: 'Sold' } : l));
      setCrops(prev => prev.map(c => c.cropName === offer.cropName ? { ...c, status: 'Sold' } : c));
      addTransaction({
        userId: offer.farmerId,
        userName: offer.farmerName,
        userRole: 'farmer',
        type: 'Credit',
        category: 'Crop Sale',
        relatedEntityId: offer.id,
        amount: offer.totalOfferAmount,
        status: 'Successful',
        paymentMethod: 'Escrow Wallet',
        description: `Accepted buyer offer for ${offer.requestedQuantity} qtl ${offer.cropName} from ${offer.buyerCompany}`
      });
      addNotification({
        userId: offer.farmerId,
        type: 'crop_sale',
        title: `Offer Accepted! Payment Credited: ₹${offer.totalOfferAmount.toLocaleString()}`,
        message: `Sale agreement confirmed. Transport logistics can now be scheduled.`,
        linkUrl: '/farmer/transport'
      });
    }
  };

  const rejectBuyerOffer = (offerId: string) => {
    setBuyerOffers(prev => prev.map(off => off.id === offerId ? { ...off, status: 'Rejected' } : off));
  };

  // Vehicles & Transport
  const addVehicle = (v: Omit<Vehicle, 'id'>): Vehicle => {
    const newV: Vehicle = { ...v, id: `veh_${Date.now()}` };
    setVehicles(prev => [newV, ...prev]);
    return newV;
  };

  const addTransportBooking = (data: Omit<TransportBooking, 'id' | 'bookingCode' | 'bookingDate' | 'status'>): TransportBooking => {
    const newBooking: TransportBooking = {
      ...data,
      id: `tb_${Date.now()}`,
      bookingCode: `TR-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'Confirmed',
      currentCheckpoint: 'Vehicle assigned at local hub',
      estimatedArrival: 'Tomorrow 10:00 AM'
    };
    setTransportBookings(prev => [newBooking, ...prev]);
    addTransaction({
      userId: data.farmerId,
      userName: data.farmerName,
      userRole: 'farmer',
      type: 'Debit',
      category: 'Transport Fare',
      relatedEntityId: newBooking.id,
      amount: data.totalFare,
      status: 'Successful',
      paymentMethod: 'UPI / NetBanking',
      description: `Transport booking with ${data.providerName} for ${data.cropName}`
    });
    addNotification({
      userId: data.farmerId,
      type: 'transport',
      title: `Transport Confirmed: ${newBooking.bookingCode}`,
      message: `${data.vehicleType} booked to transport ${data.cropName} (${data.quantityTonnes} tonnes).`,
      linkUrl: '/farmer/transport'
    });
    return newBooking;
  };

  const updateShipmentStatus = (bookingId: string, status: TransportBooking['status'], currentCheckpoint?: string) => {
    setTransportBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status, currentCheckpoint: currentCheckpoint || b.currentCheckpoint } : b));
  };

  // Storage
  const addStorageBooking = (data: Omit<StorageBooking, 'id' | 'bookingCode' | 'createdAt' | 'status'>): StorageBooking => {
    const newSb: StorageBooking = {
      ...data,
      id: `sb_${Date.now()}`,
      bookingCode: `SB-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setStorageBookings(prev => [newSb, ...prev]);
    addTransaction({
      userId: data.farmerId,
      userName: data.farmerName,
      userRole: 'farmer',
      type: 'Debit',
      category: 'Storage Charges',
      relatedEntityId: newSb.id,
      amount: data.totalCost,
      status: 'Successful',
      paymentMethod: 'UPI / NetBanking',
      description: `Storage reservation at ${data.facilityName}`
    });
    addNotification({
      userId: data.farmerId,
      type: 'storage',
      title: `Storage Space Reserved: ${data.facilityName}`,
      message: `${data.quantityQuintals} quintals for ${data.durationMonths} months confirmed.`,
      linkUrl: '/farmer/storage'
    });
    return newSb;
  };

  // Verifications by Admin
  const verifyEntity = (entityType: 'professional' | 'seller' | 'fpo' | 'transport' | 'storage', entityId: string, isApproved: boolean) => {
    if (entityType === 'professional') {
      setProfessionals(prev => prev.map(p => p.id === entityId ? { ...p, verificationBadge: isApproved } : p));
    } else if (entityType === 'fpo') {
      setFpos(prev => prev.map(f => f.id === entityId ? { ...f, verificationStatus: isApproved ? 'Verified' : 'Rejected' } : f));
    } else if (entityType === 'storage') {
      setStorageFacilities(prev => prev.map(s => s.id === entityId ? { ...s, isVerified: isApproved } : s));
    }
    addNotification({
      userId: 'usr_admin_1',
      type: 'sync',
      title: `Verification Updated`,
      message: `${entityType.toUpperCase()} record status set to ${isApproved ? 'VERIFIED' : 'REJECTED'}.`
    });
  };

  // Transactions
  const addTransaction = (tx: Omit<Transaction, 'id' | 'transactionNumber' | 'date'>): Transaction => {
    const newTx: Transaction = {
      ...tx,
      id: `tx_${Date.now()}`,
      transactionNumber: `TXN-AGRI-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleString()
    };
    setTransactions(prev => [newTx, ...prev]);
    return newTx;
  };

  // Notifications
  const addNotification = (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'isRead'>) => {
    const newN: NotificationItem = {
      ...notif,
      id: `notif_${Date.now()}`,
      timestamp: 'Just now',
      isRead: false
    };
    setNotifications(prev => [newN, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  // Messages
  const sendMessage = (msg: Omit<MessageItem, 'id' | 'timestamp'>) => {
    const newM: MessageItem = {
      ...msg,
      id: `msg_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newM]);
  };

  // Reset demo
  const resetToDemoData = () => {
    localStorage.clear();
    setUsers(initialUsers);
    setFarmerProfile(initialFarmerProfile);
    setCrops(initialCrops);
    setDiseaseDetections(initialDiseaseDetections);
    setProfessionals(initialProfessionals);
    setConsultations(initialConsultations);
    setRecommendations(initialRecommendations);
    setProducts(initialProducts);
    setCart([]);
    setOrders([]);
    setCropListings(initialCropListings);
    setBuyerOffers(initialBuyerOffers);
    setFpos(initialFPOs);
    setVehicles(initialVehicles);
    setTransportBookings(initialTransportBookings);
    setStorageFacilities(initialStorageFacilities);
    setStorageBookings(initialStorageBookings);
    setTransactions(initialTransactions);
    setNotifications(initialNotifications);
    setMessages(initialMessages);
  };

  return (
    <StoreContext.Provider value={{
      users,
      farmerProfile,
      updateFarmerProfile,
      verifyEntity,
      crops,
      addCrop,
      updateCrop,
      deleteCrop,
      diseaseDetections,
      addDiseaseDetection,
      professionals,
      consultations,
      recommendations,
      bookConsultation,
      updateConsultationStatus,
      addRecommendation,
      products,
      addProduct,
      updateProduct,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      orders,
      createOrder,
      updateOrderStatus,
      cropListings,
      addCropListing,
      buyerOffers,
      addBuyerOffer,
      acceptBuyerOffer,
      rejectBuyerOffer,
      marketPrices,
      fpos,
      vehicles,
      addVehicle,
      transportBookings,
      addTransportBooking,
      updateShipmentStatus,
      storageFacilities,
      storageBookings,
      addStorageBooking,
      transactions,
      addTransaction,
      notifications,
      addNotification,
      markNotificationAsRead,
      messages,
      sendMessage,
      resetToDemoData
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
