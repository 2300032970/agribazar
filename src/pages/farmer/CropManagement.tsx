import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { useOffline } from '../../context/OfflineContext';
import { Crop, CropStatus } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { 
  Sprout, 
  Plus, 
  Calendar, 
  MapPin, 
  Scale, 
  Sparkles, 
  Trash2, 
  Edit3, 
  ArrowUpRight, 
  History,
  CheckCircle2,
  WifiOff
} from 'lucide-react';

export const CropManagement: React.FC = () => {
  const { crops, addCrop, updateCrop, deleteCrop, addCropListing } = useStore();
  const { t } = useLanguage();
  const { isSimulatedOffline, queueAction } = useOffline();
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState<Crop | null>(null);
  const [selectedCropDetails, setSelectedCropDetails] = useState<Crop | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    cropName: 'Tomato',
    variety: 'Vaishnavi F1 Hybrid',
    quantity: 50,
    quantityUnit: 'Quintals',
    landArea: 1.0,
    sowingDate: '2026-06-15',
    expectedHarvestDate: '2026-09-25',
    location: 'Plot 2, North Field',
    qualityGrade: 'Grade A' as 'Grade A' | 'Grade B' | 'Grade C',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80',
    status: 'Ready for Harvest' as CropStatus,
    notes: 'Premium fruit lot'
  });

  const filteredCrops = statusFilter === 'All' 
    ? crops 
    : crops.filter(c => c.status === statusFilter);

  const sampleCropPresets = [
    { name: 'Tomato', variety: 'Vaishnavi F1', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80' },
    { name: 'Rice', variety: 'BPT 5204 (Sona Masoori)', img: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=500&auto=format&fit=crop&q=80' },
    { name: 'Chilli', variety: 'Teja S17 Hot Red', img: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=500&auto=format&fit=crop&q=80' },
    { name: 'Cotton', variety: 'Bunny Bt II', img: 'https://images.unsplash.com/photo-1594488518063-2391216d6c29?w=500&auto=format&fit=crop&q=80' },
    { name: 'Maize', variety: 'Pioneer 3396 Hybrid', img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500&auto=format&fit=crop&q=80' }
  ];

  const handleOpenAdd = () => {
    setEditingCrop(null);
    setFormData({
      cropName: 'Tomato',
      variety: 'Vaishnavi F1 Hybrid',
      quantity: 50,
      quantityUnit: 'Quintals',
      landArea: 1.0,
      sowingDate: new Date().toISOString().split('T')[0],
      expectedHarvestDate: new Date(Date.now() + 60*24*3600*1000).toISOString().split('T')[0],
      location: 'Plot 2, North Field',
      qualityGrade: 'Grade A',
      imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80',
      status: 'Ready for Harvest',
      notes: 'Healthy crop parcel'
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (crop: Crop, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingCrop(crop);
    setFormData({
      cropName: crop.cropName,
      variety: crop.variety,
      quantity: crop.quantity,
      quantityUnit: crop.quantityUnit,
      landArea: crop.landArea,
      sowingDate: crop.sowingDate,
      expectedHarvestDate: crop.expectedHarvestDate,
      location: crop.location,
      qualityGrade: crop.qualityGrade,
      imageUrl: crop.imageUrl,
      status: crop.status,
      notes: crop.notes || ''
    });
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCrop) {
      if (isSimulatedOffline) {
        queueAction('UPDATE_CROP', { id: editingCrop.id, updates: formData });
      } else {
        updateCrop(editingCrop.id, formData);
      }
    } else {
      const payload = {
        farmerId: 'usr_farmer_1',
        ...formData
      };
      if (isSimulatedOffline) {
        queueAction('ADD_CROP', payload);
      } else {
        addCrop(payload);
      }
    }
    setIsAddModalOpen(false);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this crop from your farm records?')) {
      if (isSimulatedOffline) {
        queueAction('DELETE_CROP', { id });
      } else {
        deleteCrop(id);
      }
    }
  };

  const handleQuickListForSale = (crop: Crop, e: React.MouseEvent) => {
    e.stopPropagation();
    addCropListing({
      farmerId: 'usr_farmer_1',
      farmerName: 'Ramesh Kumar',
      farmerPhone: '+91 98480 12345',
      crop: crop.cropName,
      variety: crop.variety,
      quantity: crop.quantity,
      quantityUnit: crop.quantityUnit,
      qualityGrade: crop.qualityGrade,
      expectedPrice: crop.cropName === 'Tomato' ? 2500 : crop.cropName === 'Rice' ? 2800 : 18000,
      location: crop.location,
      harvestDate: crop.expectedHarvestDate,
      imageUrl: crop.imageUrl,
      description: `Verified harvest parcel from ${crop.landArea} acres. Quality inspected.`
    });
    updateCrop(crop.id, { status: 'Listed for Sale' });
    navigate('/farmer/sell-crops');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">
              {t('nav_crops', 'Crop Management')}
            </h1>
            {isSimulatedOffline && (
              <span className="flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 text-xs px-2.5 py-0.5 rounded-full font-bold">
                <WifiOff className="w-3.5 h-3.5" /> Offline Mode Active
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Maintain your farm diary, log sowing/harvest cycles, and monitor crop growth stages.
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={handleOpenAdd}
        >
          {t('action_add_crop', 'Add New Crop')}
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {['All', 'Growing', 'Ready for Harvest', 'Listed for Sale', 'Sold'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              statusFilter === status
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-emerald-50'
            }`}
          >
            {status} ({status === 'All' ? crops.length : crops.filter(c => c.status === status).length})
          </button>
        ))}
      </div>

      {/* Crop Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCrops.map((crop) => (
          <Card
            key={crop.id}
            hoverable
            onClick={() => setSelectedCropDetails(crop)}
            className="flex flex-col justify-between group"
          >
            <div>
              {/* Image with Badges */}
              <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                <img
                  src={crop.imageUrl}
                  alt={crop.cropName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge
                    variant={
                      crop.status === 'Ready for Harvest'
                        ? 'warning'
                        : crop.status === 'Listed for Sale'
                        ? 'primary'
                        : crop.status === 'Sold'
                        ? 'neutral'
                        : 'success'
                    }
                  >
                    {crop.status}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-stone-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-bold">
                    {crop.qualityGrade}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                      {crop.cropName}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium">{crop.variety}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-black text-stone-900">
                      {crop.quantity} {crop.quantityUnit}
                    </p>
                    <p className="text-xs text-stone-500">{crop.landArea} Acres</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <span>Sown: {crop.sowingDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Harvest: {crop.expectedHarvestDate}</span>
                  </div>
                </div>

                {crop.location && (
                  <p className="text-xs text-stone-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    {crop.location}
                  </p>
                )}
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="px-5 pb-5 pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => handleOpenEdit(crop, e)}
                  className="p-2 text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                  title="Edit crop details"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => handleDelete(crop.id, e)}
                  className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Remove crop"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {crop.status === 'Ready for Harvest' ? (
                <Button
                  size="sm"
                  variant="primary"
                  icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                  onClick={(e) => handleQuickListForSale(crop, e)}
                >
                  List for Sale
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedCropDetails(crop)}
                >
                  View Details
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Add / Edit Crop Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={editingCrop ? "Edit Crop Record" : "Add New Crop to Farm Diary"}
        subtitle="Log cultivated parcel information with harvest projection"
        maxWidth="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Quick Preset Buttons */}
          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase mb-1.5">
              Quick Crop Preset
            </label>
            <div className="flex flex-wrap gap-2">
              {sampleCropPresets.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      cropName: preset.name,
                      variety: preset.variety,
                      imageUrl: preset.img
                    }));
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    formData.cropName === preset.name
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Crop Name</label>
              <input
                type="text"
                required
                value={formData.cropName}
                onChange={e => setFormData({ ...formData, cropName: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Variety / Hybrid</label>
              <input
                type="text"
                required
                value={formData.variety}
                onChange={e => setFormData({ ...formData, variety: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Quantity</label>
              <input
                type="number"
                required
                min="1"
                value={formData.quantity}
                onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })}
                className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Unit</label>
              <select
                value={formData.quantityUnit}
                onChange={e => setFormData({ ...formData, quantityUnit: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Quintals">Quintals</option>
                <option value="Bags">Bags (50kg)</option>
                <option value="Tonnes">Tonnes</option>
                <option value="Kg">Kilograms</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Land Area (Acres)</label>
              <input
                type="number"
                step="0.1"
                required
                min="0.1"
                value={formData.landArea}
                onChange={e => setFormData({ ...formData, landArea: Number(e.target.value) })}
                className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Sowing Date</label>
              <input
                type="date"
                required
                value={formData.sowingDate}
                onChange={e => setFormData({ ...formData, sowingDate: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Expected Harvest Date</label>
              <input
                type="date"
                required
                value={formData.expectedHarvestDate}
                onChange={e => setFormData({ ...formData, expectedHarvestDate: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Quality Grade</label>
              <select
                value={formData.qualityGrade}
                onChange={e => setFormData({ ...formData, qualityGrade: e.target.value as any })}
                className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Grade A">Grade A (Premium)</option>
                <option value="Grade B">Grade B (Standard)</option>
                <option value="Grade C">Grade C (Processing)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Growing">Growing</option>
                <option value="Ready for Harvest">Ready for Harvest</option>
                <option value="Listed for Sale">Listed for Sale</option>
                <option value="Sold">Sold</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Field Location / Parcel</label>
            <input
              type="text"
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Plot 2, North Field, Georai"
              className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              {editingCrop ? 'Save Changes' : 'Record Crop in Farm'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* View Crop Details & History Modal */}
      {selectedCropDetails && (
        <Modal
          isOpen={!!selectedCropDetails}
          onClose={() => setSelectedCropDetails(null)}
          title={`${selectedCropDetails.cropName} (${selectedCropDetails.variety})`}
          subtitle={`Farm Parcel: ${selectedCropDetails.location}`}
          maxWidth="lg"
        >
          <div className="space-y-4">
            <img
              src={selectedCropDetails.imageUrl}
              alt={selectedCropDetails.cropName}
              className="w-full h-52 object-cover rounded-2xl border border-stone-200 shadow-sm"
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                <p className="text-[10px] uppercase font-bold text-stone-400">Total Yield</p>
                <p className="text-base font-black text-stone-900">{selectedCropDetails.quantity} {selectedCropDetails.quantityUnit}</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                <p className="text-[10px] uppercase font-bold text-stone-400">Parcel Area</p>
                <p className="text-base font-black text-stone-900">{selectedCropDetails.landArea} Acres</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                <p className="text-[10px] uppercase font-bold text-stone-400">Grade</p>
                <p className="text-base font-black text-emerald-700">{selectedCropDetails.qualityGrade}</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                <p className="text-[10px] uppercase font-bold text-stone-400">Status</p>
                <p className="text-base font-black text-amber-700">{selectedCropDetails.status}</p>
              </div>
            </div>

            {/* Crop History Timeline */}
            <div>
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <History className="w-4 h-4 text-emerald-600" />
                Agronomic Activity Timeline
              </h4>
              <div className="space-y-2 border-l-2 border-emerald-200 pl-3 ml-2">
                {selectedCropDetails.history && selectedCropDetails.history.length > 0 ? (
                  selectedCropDetails.history.map((h, i) => (
                    <div key={i} className="text-xs">
                      <span className="font-bold text-emerald-800">{h.date} — {h.action}:</span>{' '}
                      <span className="text-stone-600">{h.note}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-stone-500">
                    Sown on {selectedCropDetails.sowingDate} • Expected harvest {selectedCropDetails.expectedHarvestDate}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setSelectedCropDetails(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  const crop = selectedCropDetails;
                  setSelectedCropDetails(null);
                  navigate('/farmer/disease-detection');
                }}
              >
                Diagnose Leaf Issues
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
