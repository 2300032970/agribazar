import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { initialUsers } from '../../mock/seedData';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { 
  Sprout, 
  ShoppingBag, 
  GraduationCap, 
  Store, 
  Users2, 
  Truck, 
  Warehouse, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { switchRole, login } = useAuth();
  const navigate = useNavigate();
  const [customEmail, setCustomEmail] = useState('');

  const demoRoles: Array<{ role: UserRole; title: string; email: string; desc: string; icon: React.ReactNode }> = [
    {
      role: 'farmer',
      title: 'Farmer',
      email: 'farmer@demo.com',
      desc: 'Manage crops, diagnose leaf diseases, consult agronomists, sell harvest',
      icon: <Sprout className="w-5 h-5 text-emerald-700" />
    },
    {
      role: 'buyer',
      title: 'Institutional Buyer',
      email: 'buyer@demo.com',
      desc: 'Browse farmgate listings, submit offers, contract procurement',
      icon: <ShoppingBag className="w-5 h-5 text-amber-700" />
    },
    {
      role: 'professional',
      title: 'Agronomist / Expert',
      email: 'expert@demo.com',
      desc: 'Tele-consultations, crop diagnosis, prescribe bio-inputs',
      icon: <GraduationCap className="w-5 h-5 text-blue-700" />
    },
    {
      role: 'seller',
      title: 'Input / Pesticide Seller',
      email: 'seller@demo.com',
      desc: 'Manage certified seeds, bio-fertilizers & protectants catalog',
      icon: <Store className="w-5 h-5 text-purple-700" />
    },
    {
      role: 'fpo',
      title: 'Farmer Producer Org (FPO)',
      email: 'fpo@demo.com',
      desc: 'Crop aggregation drives, collective member bargaining & pooling',
      icon: <Users2 className="w-5 h-5 text-teal-700" />
    },
    {
      role: 'transport',
      title: 'Transport Logistics',
      email: 'transport@demo.com',
      desc: 'Fleet management (Tractor, Mini Truck, Lorry), shipment tracking',
      icon: <Truck className="w-5 h-5 text-orange-700" />
    },
    {
      role: 'storage',
      title: 'Storage & Warehousing',
      email: 'storage@demo.com',
      desc: 'Cold storage bays, silo capacities, preserve harvest freshness',
      icon: <Warehouse className="w-5 h-5 text-cyan-700" />
    },
    {
      role: 'admin',
      title: 'State Admin',
      email: 'admin@demo.com',
      desc: 'Stakeholder license verifications, disease surveillance, analytics',
      icon: <ShieldCheck className="w-5 h-5 text-rose-700" />
    }
  ];

  const handleSelectRole = (role: UserRole) => {
    switchRole(role);
    navigate(`/${role}/dashboard`);
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(customEmail);
    navigate('/farmer/dashboard');
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl text-center space-y-3">
        <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-emerald-800 to-green-600 flex items-center justify-center text-white mx-auto shadow-lg">
          <Sprout className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-stone-900 tracking-tight">
          Agri<span className="text-emerald-600">Connect</span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          An Integrated Digital Platform for Farmers & Agricultural Services. Choose a demo stakeholder role to test complete hackathon flows.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl space-y-6">
        {/* Quick Demo Logins Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {demoRoles.map((item) => (
            <Card
              key={item.role}
              hoverable
              onClick={() => handleSelectRole(item.role)}
              className="p-4 flex flex-col justify-between border-2 border-stone-200/80 hover:border-emerald-500 bg-white shadow-xs group"
            >
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-stone-100 w-fit group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-bold text-stone-900 text-sm group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] font-mono text-stone-400">{item.email}</p>
                <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>Login as {item.title.split(' ')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          ))}
        </div>

        {/* Custom Login Box */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm max-w-md mx-auto">
          <form onSubmit={handleCustomLogin} className="space-y-3">
            <label className="block text-xs font-bold text-stone-700 uppercase">
              Or Sign In with Demo Email
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                required
                value={customEmail}
                onChange={e => setCustomEmail(e.target.value)}
                placeholder="e.g. farmer@demo.com"
                className="flex-1 px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Button type="submit" variant="primary" size="sm">
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
