import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useOffline } from '../../context/OfflineContext';
import { 
  Compass, 
  ChevronRight, 
  CheckCircle2, 
  X, 
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface StepItem {
  id: number;
  title: string;
  role: 'farmer' | 'buyer' | 'professional' | 'seller' | 'admin' | 'any';
  route?: string;
  hint: string;
}

export const DemoGuideWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { switchRole, currentRole } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { isSimulatedOffline, toggleSimulatedOffline } = useOffline();
  const navigate = useNavigate();

  const demoSteps: StepItem[] = [
    {
      id: 1,
      title: "1. Login as Farmer",
      role: 'farmer',
      route: '/farmer/dashboard',
      hint: "Role is currently active as Farmer (Ramesh Kumar, Warangal)."
    },
    {
      id: 2,
      title: "2. Add / Manage Tomato Crop",
      role: 'farmer',
      route: '/farmer/crops',
      hint: "Open Crop Management. View active Tomato, Rice, and Chilli crops, or click 'Add New Crop'."
    },
    {
      id: 3,
      title: "3. Run AI Disease & Pest Detection",
      role: 'farmer',
      route: '/farmer/disease-detection',
      hint: "Select Tomato crop and click 'Tomato Early Blight' sample photo or upload leaf image. Click 'Analyze Leaf'."
    },
    {
      id: 4,
      title: "4. Review AI Guidance & Symptoms",
      role: 'farmer',
      route: '/farmer/disease-detection',
      hint: "Inspect symptoms, severity rating, and advisory disclaimer. Notice non-chemical cultural guidance."
    },
    {
      id: 5,
      title: "5. Click 'Consult Professional'",
      role: 'farmer',
      route: '/farmer/professionals',
      hint: "Click 'Consult Agricultural Professional' to discover verified state agronomists and plant pathologists."
    },
    {
      id: 6,
      title: "6. Select Agronomist & Book Slot",
      role: 'farmer',
      route: '/farmer/professionals',
      hint: "Choose Dr. K. Srinivas Rao, Ph.D. and submit consultation inquiry with attached photo."
    },
    {
      id: 7,
      title: "7. Enter Consultation Room",
      role: 'farmer',
      route: '/consultation/room/cons_1',
      hint: "Experience the interactive virtual consultation room with video mock, agronomist notes, and digital prescription."
    },
    {
      id: 8,
      title: "8. View Recommended Bio-Inputs",
      role: 'farmer',
      route: '/farmer/marketplace',
      hint: "Click 'Find Nearby Verified Sellers' to view Trichoderma bio-fungicide and cold-pressed neem products."
    },
    {
      id: 9,
      title: "9. Compare Local Sellers & Distance",
      role: 'farmer',
      route: '/farmer/marketplace',
      hint: "Compare prices, stock availability, and distance (km) across verified nearby suppliers in Warangal."
    },
    {
      id: 10,
      title: "10. Add to Cart & Place Order",
      role: 'farmer',
      route: '/farmer/cart',
      hint: "Add bio-fungicide to cart and complete checkout with simulated instant payment receipt."
    },
    {
      id: 11,
      title: "11. Check Mandi Prices & Net Return",
      role: 'farmer',
      route: '/farmer/market-prices',
      hint: "Explore Mandi Market Prices. Compare Hyderabad vs Warangal and use Net Return Calculator."
    },
    {
      id: 12,
      title: "12. List Harvested Crop for Sale",
      role: 'farmer',
      route: '/farmer/sell-crops',
      hint: "List 50 Quintals of Grade A Vaishnavi Tomato at ₹2,500/qtl for institutional buyers."
    },
    {
      id: 13,
      title: "13. Switch to Buyer & Submit Offer",
      role: 'buyer',
      route: '/buyer/crops',
      hint: "Switch role to Buyer (Priya Agro Foods). Browse farmer listings and submit an offer of ₹2,650/qtl."
    },
    {
      id: 14,
      title: "14. Switch to Farmer & Accept Offer",
      role: 'farmer',
      route: '/farmer/sell-crops',
      hint: "Switch back to Farmer. Review incoming buyer bids and click 'Accept Offer' with celebration feedback."
    },
    {
      id: 15,
      title: "15. Find & Match Transport",
      role: 'farmer',
      route: '/farmer/transport',
      hint: "Select Mini Truck / Tractor Trolley matching crop volume, calculate transport fare, and book ride."
    },
    {
      id: 16,
      title: "16. Track Shipment Progression",
      role: 'farmer',
      route: '/farmer/transport',
      hint: "Follow simulated live tracking stepper: Requested → Confirmed → Picked Up → In Transit → Delivered."
    },
    {
      id: 17,
      title: "17. Reserve Cold Storage / Silo",
      role: 'farmer',
      route: '/farmer/storage',
      hint: "Search Deccan Cold Storage & Silos. Check available capacity and book 30 quintal storage space."
    },
    {
      id: 18,
      title: "18. Connect with Local FPO",
      role: 'farmer',
      route: '/farmer/fpos',
      hint: "Discover Kakatiya Farmers Producer Co. and inspect active export aggregation campaigns."
    },
    {
      id: 19,
      title: "19. In-App Stakeholder Messaging",
      role: 'farmer',
      route: '/messages',
      hint: "Open in-app messaging to chat directly with Buyer, Agronomist, FPO coordinator, and Transporter."
    },
    {
      id: 20,
      title: "20. Verify Transaction Ledger",
      role: 'farmer',
      route: '/farmer/transactions',
      hint: "Review complete ledger of crop sale credits, input debits, and agronomist consultation fees."
    },
    {
      id: 21,
      title: "21. Demonstrate Multilingual Switching",
      role: 'any',
      hint: "Switch between English, Telugu (తెలుగు), and Hindi (हिन्दी). All UI text adapts dynamically."
    },
    {
      id: 22,
      title: "22. Demonstrate Offline Mode & Sync",
      role: 'farmer',
      route: '/farmer/crops',
      hint: "Toggle Offline simulator. Add a crop offline (stored in pending queue). Return Online & click Sync."
    },
    {
      id: 23,
      title: "23. Admin Verification Center",
      role: 'admin',
      route: '/admin/dashboard',
      hint: "Switch to Admin role. Verify pending agronomists, sellers, and view state-level agriculture stats."
    }
  ];

  const currentStep = demoSteps[currentStepIndex];

  const handleExecuteStep = (step: StepItem) => {
    if (step.role !== 'any' && step.role !== currentRole) {
      switchRole(step.role);
    }
    if (step.route) {
      navigate(step.route);
    }
    if (!completedSteps.includes(step.id)) {
      setCompletedSteps(prev => [...prev, step.id]);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < demoSteps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      handleExecuteStep(demoSteps[nextIdx]);
    }
  };

  return (
    <>
      {/* Floating Pill Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-40 bg-gradient-to-r from-emerald-700 to-green-800 text-white px-4 py-2.5 rounded-full shadow-xl hover:shadow-2xl border-2 border-emerald-400/50 flex items-center gap-2.5 transition-all duration-200 hover:scale-105 active:scale-95 group font-medium text-xs sm:text-sm"
      >
        <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
        <span>Hackathon Demo Flow</span>
        <span className="bg-emerald-900/80 px-2 py-0.5 rounded-full text-[11px] font-bold text-emerald-200">
          {completedSteps.length}/{demoSteps.length}
        </span>
      </button>

      {/* Guide Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-0 sm:p-6 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full sm:max-w-md h-[88vh] sm:h-[82vh] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-emerald-800 to-green-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-amber-300" />
                <div>
                  <h3 className="font-bold text-sm">23-Step End-to-End Demo Flow</h3>
                  <p className="text-[11px] text-emerald-200">Interactive Hackathon Evaluator</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-700/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Active Step Spotlight */}
            <div className="p-4 bg-emerald-50 border-b border-emerald-100">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-emerald-900 uppercase tracking-wide">
                  Current Step ({currentStepIndex + 1} of {demoSteps.length})
                </span>
                <span className="text-emerald-700 font-medium">
                  {Math.round((completedSteps.length / demoSteps.length) * 100)}% Complete
                </span>
              </div>
              <h4 className="font-black text-stone-900 text-base">{currentStep.title}</h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">{currentStep.hint}</p>

              {/* Action Buttons */}
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => handleExecuteStep(currentStep)}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Go to Step & Role</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                {currentStepIndex < demoSteps.length - 1 && (
                  <button
                    onClick={handleNextStep}
                    className="bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 text-xs font-bold py-2 px-3 rounded-xl flex items-center gap-1 transition-colors"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Helper Toggles */}
            <div className="p-3.5 bg-stone-50 border-b border-stone-200 grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  const langs = ['en', 'te', 'hi'] as const;
                  const next = langs[(langs.indexOf(language as any) + 1) % langs.length];
                  setLanguage(next);
                }}
                className="p-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:border-emerald-500 font-semibold flex items-center justify-center gap-1.5"
              >
                <span>Lang: {language === 'en' ? 'English' : language === 'te' ? 'తెలుగు' : 'हिन्दी'}</span>
                <ArrowRight className="w-3 h-3 text-emerald-600" />
              </button>
              <button
                onClick={toggleSimulatedOffline}
                className={`p-2 rounded-xl border font-semibold flex items-center justify-center gap-1.5 ${
                  isSimulatedOffline
                    ? 'bg-amber-100 border-amber-300 text-amber-900'
                    : 'bg-white border-stone-200 text-stone-700 hover:border-amber-400'
                }`}
              >
                <span>{isSimulatedOffline ? 'Status: Offline' : 'Status: Online'}</span>
              </button>
            </div>

            {/* Steps List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 divide-y divide-stone-100">
              {demoSteps.map((step, idx) => {
                const isCompleted = completedSteps.includes(step.id);
                const isCurrent = currentStepIndex === idx;

                return (
                  <div
                    key={step.id}
                    onClick={() => {
                      setCurrentStepIndex(idx);
                      handleExecuteStep(step);
                    }}
                    className={`pt-2 flex items-start gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${
                      isCurrent
                        ? 'bg-emerald-100/70 border border-emerald-300'
                        : 'hover:bg-stone-50'
                    }`}
                  >
                    <div className="pt-0.5 shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border-2 border-stone-300 flex items-center justify-center text-[9px] font-bold text-stone-400">
                          {step.id}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold truncate ${isCurrent ? 'text-emerald-950' : 'text-stone-800'}`}>
                        {step.title}
                      </p>
                      <p className="text-[11px] text-stone-500 truncate mt-0.5">
                        {step.hint}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 shrink-0">
                      {step.role}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
