import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import { LanguageProvider } from './context/LanguageContext';
import { OfflineProvider } from './context/OfflineContext';

// Layout
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { RoleSwitcherModal } from './components/layout/RoleSwitcherModal';
import { DemoGuideWidget } from './components/layout/DemoGuideWidget';

// Farmer Pages
import { FarmerDashboard } from './pages/farmer/FarmerDashboard';
import { CropManagement } from './pages/farmer/CropManagement';
import { DiseaseDetection } from './pages/farmer/DiseaseDetection';
import { ProfessionalDiscovery } from './pages/farmer/ProfessionalDiscovery';
import { ConsultationRoom } from './pages/farmer/ConsultationRoom';
import { ProductMarketplace } from './pages/farmer/ProductMarketplace';
import { CartAndCheckout } from './pages/farmer/CartAndCheckout';
import { SellCrops } from './pages/farmer/SellCrops';
import { MarketPrices } from './pages/farmer/MarketPrices';
import { FPODiscovery } from './pages/farmer/FPODiscovery';
import { TransportBooking } from './pages/farmer/TransportBooking';
import { StorageDiscovery } from './pages/farmer/StorageDiscovery';
import { TransactionsHistory } from './pages/farmer/TransactionsHistory';
import { FarmerProfilePage } from './pages/farmer/FarmerProfilePage';

// Buyer Pages
import { BuyerDashboard } from './pages/buyer/BuyerDashboard';
import { BrowseCrops } from './pages/buyer/BrowseCrops';
import { BuyerOffers } from './pages/buyer/BuyerOffers';

// Professional Pages
import { ProfessionalDashboard } from './pages/expert/ProfessionalDashboard';
import { ConsultationsList } from './pages/expert/ConsultationsList';

// Seller Pages
import { SellerDashboard } from './pages/seller/SellerDashboard';
import { ManageInventory } from './pages/seller/ManageInventory';

// FPO Pages
import { FPODashboard } from './pages/fpo/FPODashboard';

// Transport Pages
import { TransportDashboard } from './pages/transport/TransportDashboard';
import { FleetManagement } from './pages/transport/FleetManagement';

// Storage Pages
import { StorageDashboard } from './pages/storage/StorageDashboard';
import { FacilityManagement } from './pages/storage/FacilityManagement';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { VerificationCenter } from './pages/admin/VerificationCenter';

// Shared Pages
import { MessagingPage } from './pages/shared/MessagingPage';
import { NotificationsPage } from './pages/shared/NotificationsPage';
import { LoginPage } from './pages/auth/LoginPage';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isQuickSwitchOpen, setIsQuickSwitchOpen } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/70 text-stone-900">
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
      <Footer />

      {/* Global Modals & Evaluator Tour Widgets */}
      <RoleSwitcherModal
        isOpen={isQuickSwitchOpen}
        onClose={() => setIsQuickSwitchOpen(false)}
      />
      <DemoGuideWidget />
    </div>
  );
};

const RoleRedirect: React.FC = () => {
  const { currentRole } = useAuth();
  return <Navigate to={`/${currentRole}/dashboard`} replace />;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AuthProvider>
          <LanguageProvider>
            <OfflineProvider>
              <Routes>
                {/* Standalone Login */}
                <Route path="/login" element={<LoginPage />} />

                {/* Main App Layout Shell */}
                <Route
                  path="/*"
                  element={
                    <AppLayout>
                      <Routes>
                        {/* Default Redirect */}
                        <Route path="/" element={<RoleRedirect />} />

                        {/* Farmer Routes */}
                        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
                        <Route path="/farmer/crops" element={<CropManagement />} />
                        <Route path="/farmer/disease-detection" element={<DiseaseDetection />} />
                        <Route path="/farmer/professionals" element={<ProfessionalDiscovery />} />
                        <Route path="/consultation/room/:id" element={<ConsultationRoom />} />
                        <Route path="/farmer/marketplace" element={<ProductMarketplace />} />
                        <Route path="/farmer/cart" element={<CartAndCheckout />} />
                        <Route path="/farmer/sell-crops" element={<SellCrops />} />
                        <Route path="/farmer/market-prices" element={<MarketPrices />} />
                        <Route path="/farmer/fpos" element={<FPODiscovery />} />
                        <Route path="/farmer/transport" element={<TransportBooking />} />
                        <Route path="/farmer/storage" element={<StorageDiscovery />} />
                        <Route path="/farmer/transactions" element={<TransactionsHistory />} />
                        <Route path="/farmer/profile" element={<FarmerProfilePage />} />

                        {/* Buyer Routes */}
                        <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
                        <Route path="/buyer/crops" element={<BrowseCrops />} />
                        <Route path="/buyer/offers" element={<BuyerOffers />} />

                        {/* Agronomist Routes */}
                        <Route path="/expert/dashboard" element={<ProfessionalDashboard />} />
                        <Route path="/expert/consultations" element={<ConsultationsList />} />

                        {/* Seller Routes */}
                        <Route path="/seller/dashboard" element={<SellerDashboard />} />
                        <Route path="/seller/inventory" element={<ManageInventory />} />

                        {/* FPO Routes */}
                        <Route path="/fpo/dashboard" element={<FPODashboard />} />
                        <Route path="/fpo/aggregation" element={<FPODashboard />} />

                        {/* Transport Routes */}
                        <Route path="/transport/dashboard" element={<TransportDashboard />} />
                        <Route path="/transport/fleet" element={<FleetManagement />} />

                        {/* Storage Routes */}
                        <Route path="/storage/dashboard" element={<StorageDashboard />} />
                        <Route path="/storage/facilities" element={<FacilityManagement />} />

                        {/* Admin Routes */}
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/verifications" element={<VerificationCenter />} />

                        {/* Shared Routes */}
                        <Route path="/messages" element={<MessagingPage />} />
                        <Route path="/notifications" element={<NotificationsPage />} />

                        {/* Fallback */}
                        <Route path="*" element={<RoleRedirect />} />
                      </Routes>
                    </AppLayout>
                  }
                />
              </Routes>
            </OfflineProvider>
          </LanguageProvider>
        </AuthProvider>
      </StoreProvider>
    </BrowserRouter>
  );
};

export default App;
