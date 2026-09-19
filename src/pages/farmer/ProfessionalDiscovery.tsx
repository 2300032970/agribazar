import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { Professional } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { 
  GraduationCap, 
  Search, 
  Filter, 
  CheckCircle2, 
  Star, 
  Calendar, 
  Clock, 
  Video, 
  FileText, 
  MapPin, 
  Languages, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const ProfessionalDiscovery: React.FC = () => {
  const { professionals, consultations, recommendations, bookConsultation } = useStore();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'experts' | 'recommendations'>('experts');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('All');

  // Booking Modal
  const [bookingExpert, setBookingExpert] = useState<Professional | null>(null);
  const [bookingDate, setBookingDate] = useState('2026-09-20');
  const [bookingTimeSlot, setBookingTimeSlot] = useState('11:00 AM - 11:30 AM');
  const [bookingCrop, setBookingCrop] = useState('Tomato (Vaishnavi F1)');
  const [bookingNotes, setBookingNotes] = useState('Leaf yellowing and concentric spot symptoms detected on lower branches.');

  const filteredExperts = professionals.filter(pro => {
    const matchesSearch = pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pro.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pro.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCrop = selectedCrop === 'All' || pro.cropsHandled.includes(selectedCrop);
    const matchesSpec = selectedSpecialization === 'All' || pro.specialization.includes(selectedSpecialization);
    return matchesSearch && matchesCrop && matchesSpec;
  });

  const handleOpenBooking = (pro: Professional) => {
    setBookingExpert(pro);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingExpert) return;

    const newCons = bookConsultation({
      farmerId: 'usr_farmer_1',
      farmerName: 'Ramesh Kumar',
      professionalId: bookingExpert.id,
      professionalName: bookingExpert.name,
      cropName: bookingCrop,
      date: bookingDate,
      timeSlot: bookingTimeSlot,
      issueDescription: bookingNotes,
      cropImageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80'
    });

    setBookingExpert(null);
    navigate(`/consultation/room/${newCons.id}`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-stone-900 tracking-tight">
                {t('nav_professionals', 'Agricultural Professionals & Agronomists')}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500">
                Connect with certified plant pathologists, soil scientists & crop protection specialists
              </p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
          <button
            onClick={() => setActiveTab('experts')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'experts' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Find Agronomists ({professionals.length})
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'recommendations' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Prescriptions & Advice ({recommendations.length})
          </button>
        </div>
      </div>

      {activeTab === 'experts' ? (
        <>
          {/* Active Consultation Room Banner if available */}
          {consultations.length > 0 && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                    Active Tele-Consultation Room Ready
                  </span>
                </div>
                <h3 className="text-base font-bold">
                  Session with {consultations[0].professionalName}
                </h3>
                <p className="text-xs text-blue-100">
                  Topic: {consultations[0].cropName} • Slot: {consultations[0].timeSlot}
                </p>
              </div>
              <Button
                variant="primary"
                icon={<Video className="w-4 h-4" />}
                onClick={() => navigate(`/consultation/room/${consultations[0].id}`)}
                className="shrink-0 bg-emerald-600 hover:bg-emerald-700"
              >
                Join Virtual Meeting Room
              </Button>
            </div>
          )}

          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-5 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name, specialization, or university..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedCrop}
                onChange={e => setSelectedCrop(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="All">All Crops Handled</option>
                <option value="Tomato">Tomato</option>
                <option value="Rice">Rice</option>
                <option value="Chilli">Chilli</option>
                <option value="Cotton">Cotton</option>
              </select>
            </div>

            <div className="sm:col-span-4">
              <select
                value={selectedSpecialization}
                onChange={e => setSelectedSpecialization(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="All">All Specializations</option>
                <option value="Pathology">Plant Pathology & Disease</option>
                <option value="Soil">Soil Fertility & Nutrients</option>
                <option value="Horticulture">Commercial Horticulture</option>
              </select>
            </div>
          </div>

          {/* Experts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredExperts.map((expert) => (
              <Card key={expert.id} className="p-5 flex flex-col justify-between group" hoverable>
                <div className="space-y-4">
                  {/* Top Profile */}
                  <div className="flex items-start gap-3.5">
                    <img
                      src={expert.avatarUrl}
                      alt={expert.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-stone-200 shadow-sm shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-bold text-stone-900 truncate">
                          {expert.name}
                        </h3>
                        {expert.verificationBadge && (
                          <span title="State Verified Agronomist">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 font-medium line-clamp-1">{expert.qualification}</p>
                      
                      <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-1 text-xs font-bold text-amber-600">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {expert.rating}
                        </span>
                        <span className="text-[11px] text-stone-400">({expert.reviewsCount} farmers)</span>
                      </div>
                    </div>
                  </div>

                  {/* Badges & Specialization */}
                  <div>
                    <p className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                      {expert.specialization}
                    </p>
                    <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                      {expert.bio}
                    </p>
                  </div>

                  {/* Details Pill Grid */}
                  <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="truncate">{expert.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Languages className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{expert.languages.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="text-emerald-700 font-bold">{expert.availability}</span>
                    </div>
                  </div>

                  {/* Crops Handled Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {expert.cropsHandled.map((crop, idx) => (
                      <span key={idx} className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md font-semibold">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-stone-400">Consultation Fee</p>
                    <p className="text-lg font-black text-stone-900">₹{expert.consultationFee}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleOpenBooking(expert)}
                  >
                    Book Consultation
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : (
        /* Recommendations Tab */
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-900">
            Official digital prescriptions issued by verified agronomists after reviewing crop scans.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {recommendations.map((rec) => (
              <Card key={rec.id} className="p-5 space-y-4 border-l-4 border-l-emerald-600">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-stone-400 uppercase">{rec.createdAt}</span>
                    <h3 className="text-base font-bold text-stone-900 mt-0.5">
                      Target Crop: {rec.crop}
                    </h3>
                    <p className="text-xs text-emerald-700 font-semibold">
                      Prescribed by {rec.professionalName}
                    </p>
                  </div>
                  <Badge variant="primary">Follow-up: {rec.followUpDate}</Badge>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl">
                    <p className="font-bold text-rose-900">Identified Problem:</p>
                    <p className="text-rose-800 mt-0.5">{rec.identifiedProblem}</p>
                  </div>

                  <div className="p-3 bg-stone-50 border border-stone-100 rounded-xl">
                    <p className="font-bold text-stone-800">Agronomic Prescription & Practice:</p>
                    <p className="text-stone-700 mt-0.5 leading-relaxed">{rec.recommendation}</p>
                    <p className="text-stone-500 mt-1 italic font-medium">Cultural: {rec.suggestedPractice}</p>
                  </div>

                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <p className="font-bold text-emerald-900">Suggested Bio-Inputs & Usage:</p>
                    <p className="text-emerald-800 font-semibold">{rec.relevantProduct}</p>
                    <p className="text-emerald-700 mt-0.5">{rec.usageInstructions}</p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate('/farmer/marketplace')}
                  >
                    Order Inputs
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {bookingExpert && (
        <Modal
          isOpen={!!bookingExpert}
          onClose={() => setBookingExpert(null)}
          title={`Book Agronomist Consultation`}
          subtitle={`With ${bookingExpert.name} (${bookingExpert.qualification})`}
          maxWidth="lg"
        >
          <form onSubmit={handleConfirmBooking} className="space-y-4">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-stone-800">{bookingExpert.specialization}</p>
                <p className="text-stone-500">Consultation Fee: ₹{bookingExpert.consultationFee}</p>
              </div>
              <Badge variant="success">Verified Agronomist</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Select Date</label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={e => setBookingDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Time Slot</label>
                <select
                  value={bookingTimeSlot}
                  onChange={e => setBookingTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
                  <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM</option>
                  <option value="02:30 PM - 03:00 PM">02:30 PM - 03:00 PM</option>
                  <option value="04:00 PM - 04:30 PM">04:00 PM - 04:30 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Crop Under Examination</label>
              <input
                type="text"
                required
                value={bookingCrop}
                onChange={e => setBookingCrop(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Symptoms / Issue Summary</label>
              <textarea
                rows={3}
                required
                value={bookingNotes}
                onChange={e => setBookingNotes(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <div className="text-xs">
                <span className="text-stone-500">Payable Fee:</span>{' '}
                <span className="font-black text-stone-900 text-sm">₹{bookingExpert.consultationFee}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" onClick={() => setBookingExpert(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Confirm & Pay Fee
                </Button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
