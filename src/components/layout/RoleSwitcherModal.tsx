import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { initialUsers } from '../../mock/seedData';
import { Modal } from '../common/Modal';
import { 
  Sprout, 
  ShoppingBag, 
  GraduationCap, 
  Store, 
  Users2, 
  Truck, 
  Warehouse, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({ isOpen, onClose }) => {
  const { currentRole, switchRole } = useAuth();

  const roleMeta: Record<UserRole, { label: string; desc: string; icon: React.ReactNode; color: string }> = {
    farmer: {
      label: 'Farmer',
      desc: 'Manage crops, diagnose diseases, consult experts, sell produce, book transport.',
      icon: <Sprout className="w-6 h-6" />,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    },
    buyer: {
      label: 'Institutional Buyer',
      desc: 'Browse harvest listings, submit purchase counter-offers, track contracts.',
      icon: <ShoppingBag className="w-6 h-6" />,
      color: 'bg-amber-100 text-amber-800 border-amber-300'
    },
    professional: {
      label: 'Agronomist / Expert',
      desc: 'Review farmer queries, join virtual consultation room, prescribe practices.',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-800 border-blue-300'
    },
    seller: {
      label: 'Agri-Input & Pesticide Seller',
      desc: 'Manage certified seeds, bio-inputs & permitted products, process orders.',
      icon: <Store className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-800 border-purple-300'
    },
    fpo: {
      label: 'Farmer Producer Org (FPO)',
      desc: 'Pool member smallholders, drive collective grain aggregation & export lots.',
      icon: <Users2 className="w-6 h-6" />,
      color: 'bg-teal-100 text-teal-800 border-teal-300'
    },
    transport: {
      label: 'Transport Logistics Provider',
      desc: 'Manage fleet (Tractor, Mini Truck, Lorry), accept trips, live shipment tracking.',
      icon: <Truck className="w-6 h-6" />,
      color: 'bg-orange-100 text-orange-800 border-orange-300'
    },
    storage: {
      label: 'Storage & Warehousing Provider',
      desc: 'Manage cold chain bays, dry warehouses & grain silos, review bookings.',
      icon: <Warehouse className="w-6 h-6" />,
      color: 'bg-cyan-100 text-cyan-800 border-cyan-300'
    },
    admin: {
      label: 'Platform Administrator',
      desc: 'Verify agronomists & sellers, review platform analytics, manage mandis.',
      icon: <ShieldCheck className="w-6 h-6" />,
      color: 'bg-rose-100 text-rose-800 border-rose-300'
    }
  };

  const handleSelectRole = (role: UserRole) => {
    switchRole(role);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Hackathon Demo: Switch User Role"
      subtitle="Instantly simulate any of the 8 stakeholder roles with real demo accounts and permissions"
      maxWidth="2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
        {(Object.keys(roleMeta) as UserRole[]).map((role) => {
          const meta = roleMeta[role];
          const user = initialUsers[role];
          const isSelected = currentRole === role;

          return (
            <div
              key={role}
              onClick={() => handleSelectRole(role)}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between hover:shadow-md ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-500/20'
                  : 'border-stone-200 hover:border-emerald-300 bg-white'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl border shrink-0 ${meta.color}`}>
                  {meta.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-stone-900 text-sm">{meta.label}</h4>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 font-mono mt-0.5">{user?.email}</p>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">{meta.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
