import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  LayoutDashboard, 
  Sprout, 
  Microscope, 
  GraduationCap, 
  Store, 
  BadgePercent, 
  TrendingUp, 
  Users2, 
  Truck, 
  Warehouse, 
  ReceiptText, 
  MessageSquare, 
  Bell, 
  UserCircle2, 
  ShieldCheck, 
  Layers, 
  ShoppingBag, 
  FileCheck2,
  Package
} from 'lucide-react';
import clsx from 'clsx';

interface NavItem {
  to: string;
  labelKey: string;
  defaultLabel: string;
  icon: React.ReactNode;
}

export const Sidebar: React.FC = () => {
  const { currentRole } = useAuth();
  const { t } = useLanguage();

  const getNavItems = (): NavItem[] => {
    switch (currentRole) {
      case 'farmer':
        return [
          { to: '/farmer/dashboard', labelKey: 'nav_dashboard', defaultLabel: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
          { to: '/farmer/crops', labelKey: 'nav_crops', defaultLabel: 'Crop Management', icon: <Sprout className="w-5 h-5" /> },
          { to: '/farmer/disease-detection', labelKey: 'nav_disease_detection', defaultLabel: 'AI Disease Detection', icon: <Microscope className="w-5 h-5" /> },
          { to: '/farmer/professionals', labelKey: 'nav_professionals', defaultLabel: 'Agronomists & Experts', icon: <GraduationCap className="w-5 h-5" /> },
          { to: '/farmer/marketplace', labelKey: 'nav_marketplace', defaultLabel: 'Input Marketplace', icon: <Store className="w-5 h-5" /> },
          { to: '/farmer/sell-crops', labelKey: 'nav_sell_crops', defaultLabel: 'Sell Crops & Offers', icon: <BadgePercent className="w-5 h-5" /> },
          { to: '/farmer/market-prices', labelKey: 'nav_market_prices', defaultLabel: 'Mandi Market Prices', icon: <TrendingUp className="w-5 h-5" /> },
          { to: '/farmer/fpos', labelKey: 'nav_fpos', defaultLabel: 'FPO Connections', icon: <Users2 className="w-5 h-5" /> },
          { to: '/farmer/transport', labelKey: 'nav_transport', defaultLabel: 'Logistics & Transport', icon: <Truck className="w-5 h-5" /> },
          { to: '/farmer/storage', labelKey: 'nav_storage', defaultLabel: 'Cold Storage & Silos', icon: <Warehouse className="w-5 h-5" /> },
          { to: '/farmer/transactions', labelKey: 'nav_transactions', defaultLabel: 'Payments & Ledger', icon: <ReceiptText className="w-5 h-5" /> },
          { to: '/farmer/profile', labelKey: 'nav_profile', defaultLabel: 'Farmer Profile', icon: <UserCircle2 className="w-5 h-5" /> },
          { to: '/messages', labelKey: 'nav_messages', defaultLabel: 'In-App Messages', icon: <MessageSquare className="w-5 h-5" /> },
          { to: '/notifications', labelKey: 'nav_notifications', defaultLabel: 'Notifications', icon: <Bell className="w-5 h-5" /> },
        ];

      case 'buyer':
        return [
          { to: '/buyer/dashboard', labelKey: 'nav_dashboard', defaultLabel: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
          { to: '/buyer/crops', labelKey: 'nav_browse_crops', defaultLabel: 'Browse Farmer Crops', icon: <Sprout className="w-5 h-5" /> },
          { to: '/buyer/offers', labelKey: 'nav_buyer_offers', defaultLabel: 'My Offers & Bids', icon: <BadgePercent className="w-5 h-5" /> },
          { to: '/farmer/market-prices', labelKey: 'nav_market_prices', defaultLabel: 'Mandi Rates', icon: <TrendingUp className="w-5 h-5" /> },
          { to: '/messages', labelKey: 'nav_messages', defaultLabel: 'Messages', icon: <MessageSquare className="w-5 h-5" /> },
          { to: '/notifications', labelKey: 'nav_notifications', defaultLabel: 'Notifications', icon: <Bell className="w-5 h-5" /> },
        ];

      case 'professional':
        return [
          { to: '/expert/dashboard', labelKey: 'nav_dashboard', defaultLabel: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
          { to: '/expert/consultations', labelKey: 'nav_consultations', defaultLabel: 'Consultations Queue', icon: <GraduationCap className="w-5 h-5" /> },
          { to: '/farmer/disease-detection', labelKey: 'nav_disease_detection', defaultLabel: 'Disease Library', icon: <Microscope className="w-5 h-5" /> },
          { to: '/messages', labelKey: 'nav_messages', defaultLabel: 'Messages', icon: <MessageSquare className="w-5 h-5" /> },
          { to: '/notifications', labelKey: 'nav_notifications', defaultLabel: 'Notifications', icon: <Bell className="w-5 h-5" /> },
        ];

      case 'seller':
        return [
          { to: '/seller/dashboard', labelKey: 'nav_dashboard', defaultLabel: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
          { to: '/seller/inventory', labelKey: 'nav_inventory', defaultLabel: 'Manage Products', icon: <Package className="w-5 h-5" /> },
          { to: '/farmer/marketplace', labelKey: 'nav_marketplace', defaultLabel: 'Marketplace View', icon: <Store className="w-5 h-5" /> },
          { to: '/messages', labelKey: 'nav_messages', defaultLabel: 'Messages', icon: <MessageSquare className="w-5 h-5" /> },
          { to: '/notifications', labelKey: 'nav_notifications', defaultLabel: 'Notifications', icon: <Bell className="w-5 h-5" /> },
        ];

      case 'fpo':
        return [
          { to: '/fpo/dashboard', labelKey: 'nav_dashboard', defaultLabel: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
          { to: '/fpo/aggregation', labelKey: 'nav_aggregation', defaultLabel: 'Crop Aggregation', icon: <Layers className="w-5 h-5" /> },
          { to: '/buyer/crops', labelKey: 'nav_browse_crops', defaultLabel: 'Buyer Tenders', icon: <ShoppingBag className="w-5 h-5" /> },
          { to: '/messages', labelKey: 'nav_messages', defaultLabel: 'Messages', icon: <MessageSquare className="w-5 h-5" /> },
          { to: '/notifications', labelKey: 'nav_notifications', defaultLabel: 'Notifications', icon: <Bell className="w-5 h-5" /> },
        ];

      case 'transport':
        return [
          { to: '/transport/dashboard', labelKey: 'nav_dashboard', defaultLabel: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
          { to: '/transport/fleet', labelKey: 'nav_fleet', defaultLabel: 'Vehicle Fleet', icon: <Truck className="w-5 h-5" /> },
          { to: '/farmer/transport', labelKey: 'nav_transport', defaultLabel: 'Trip Bookings & Tracking', icon: <FileCheck2 className="w-5 h-5" /> },
          { to: '/messages', labelKey: 'nav_messages', defaultLabel: 'Messages', icon: <MessageSquare className="w-5 h-5" /> },
          { to: '/notifications', labelKey: 'nav_notifications', defaultLabel: 'Notifications', icon: <Bell className="w-5 h-5" /> },
        ];

      case 'storage':
        return [
          { to: '/storage/dashboard', labelKey: 'nav_dashboard', defaultLabel: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
          { to: '/storage/facilities', labelKey: 'nav_facilities', defaultLabel: 'Storage Facilities', icon: <Warehouse className="w-5 h-5" /> },
          { to: '/farmer/storage', labelKey: 'nav_storage', defaultLabel: 'Farmer Bookings', icon: <FileCheck2 className="w-5 h-5" /> },
          { to: '/messages', labelKey: 'nav_messages', defaultLabel: 'Messages', icon: <MessageSquare className="w-5 h-5" /> },
          { to: '/notifications', labelKey: 'nav_notifications', defaultLabel: 'Notifications', icon: <Bell className="w-5 h-5" /> },
        ];

      case 'admin':
        return [
          { to: '/admin/dashboard', labelKey: 'nav_dashboard', defaultLabel: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
          { to: '/admin/verifications', labelKey: 'nav_admin_verifications', defaultLabel: 'Verification Center', icon: <ShieldCheck className="w-5 h-5" /> },
          { to: '/farmer/market-prices', labelKey: 'nav_market_prices', defaultLabel: 'Mandi Master Rates', icon: <TrendingUp className="w-5 h-5" /> },
          { to: '/messages', labelKey: 'nav_messages', defaultLabel: 'System Messages', icon: <MessageSquare className="w-5 h-5" /> },
          { to: '/notifications', labelKey: 'nav_notifications', defaultLabel: 'System Alerts', icon: <Bell className="w-5 h-5" /> },
        ];

      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-white border-r border-stone-200/90 hidden lg:flex flex-col shrink-0 min-h-[calc(100vh-4rem)] p-4">
      <div className="space-y-1 flex-1">
        <p className="px-3 text-[11px] font-bold tracking-wider text-stone-400 uppercase mb-2">
          {t(`role_${currentRole}`, currentRole)} Navigation
        </p>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group",
                isActive
                  ? "bg-emerald-700 text-white shadow-sm shadow-emerald-900/10 font-bold"
                  : "text-stone-600 hover:bg-emerald-50/70 hover:text-emerald-900"
              )
            }
          >
            {({ isActive }) => (
              <>
                <span className={clsx("transition-transform group-hover:scale-110", isActive ? "text-white" : "text-stone-500 group-hover:text-emerald-700")}>
                  {item.icon}
                </span>
                <span className="truncate">{t(item.labelKey, item.defaultLabel)}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Footer Info Box in Sidebar */}
      <div className="mt-auto pt-4 border-t border-stone-100">
        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70 text-[11px] text-stone-500">
          <p className="font-bold text-stone-700">AgriConnect v1.0</p>
          <p className="mt-0.5">Hackathon Prototype Edition</p>
          <p className="text-[10px] text-emerald-700 font-semibold mt-1">● Telangana Regional Node</p>
        </div>
      </div>
    </aside>
  );
};
