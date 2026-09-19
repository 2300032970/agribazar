import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { 
  UserCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  Sprout, 
  CheckCircle2, 
  Languages, 
  Save,
  ShieldCheck
} from 'lucide-react';

export const FarmerProfilePage: React.FC = () => {
  const { farmerProfile, updateFarmerProfile, addNotification } = useStore();
  const { t, language, setLanguage } = useLanguage();

  const [name, setName] = useState(farmerProfile.name);
  const [phone, setPhone] = useState(farmerProfile.phone);
  const [email, setEmail] = useState(farmerProfile.email);
  const [location, setLocation] = useState(farmerProfile.location);
  const [landArea, setLandArea] = useState(farmerProfile.landArea);
  const [soilType, setSoilType] = useState(farmerProfile.soilType);
  const [irrigationType, setIrrigationType] = useState(farmerProfile.irrigationType);
  const [farmName, setFarmName] = useState(farmerProfile.farmName);
  const [bio, setBio] = useState(farmerProfile.bio || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateFarmerProfile({
      name,
      phone,
      email,
      location,
      landArea,
      soilType,
      irrigationType,
      farmName,
      bio
    });
    setSavedSuccess(true);
    addNotification({
      userId: 'usr_farmer_1',
      type: 'sync',
      title: 'Farmer Profile Updated',
      message: 'Your farm profile information and land records have been updated.'
    });
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
            <UserCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">
              {t('profile_title', 'Farmer & Farm Land Profile')}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              Manage personal identity, geo-location, soil classification and irrigation infrastructure
            </p>
          </div>
        </div>

        <Badge variant="success" dot>
          KYC & Land Records Verified
        </Badge>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-2xl flex items-center gap-2 text-xs font-bold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5">
        <Card className="p-6 space-y-4">
          <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider pb-2 border-b border-stone-100">
            Personal & Contact Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">{t('field_farmer_name', 'Farmer Name')}</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">{t('field_phone', 'Mobile Number')}</label>
              <input
                type="text"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">{t('field_email', 'Email Address')}</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">{t('field_location', 'Village / District / State')}</label>
              <input
                type="text"
                required
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider pb-2 border-b border-stone-100">
            Farm Land & Agronomic Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Registered Farm Name</label>
              <input
                type="text"
                value={farmName}
                onChange={e => setFarmName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">{t('field_land_area', 'Cultivated Land Area (Acres)')}</label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                required
                value={landArea}
                onChange={e => setLandArea(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">{t('field_soil_type', 'Soil Type')}</label>
              <input
                type="text"
                value={soilType}
                onChange={e => setSoilType(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">{t('field_irrigation', 'Irrigation Facility')}</label>
              <input
                type="text"
                value={irrigationType}
                onChange={e => setIrrigationType(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Agronomic Practices / Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </Card>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={<Save className="w-4 h-4" />}
          >
            {t('action_save', 'Save Changes')}
          </Button>
        </div>
      </form>
    </div>
  );
};
