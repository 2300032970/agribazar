import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { sampleDiseasesDatabase } from '../../mock/seedData';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { 
  Microscope, 
  Upload, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle,
  GraduationCap,
  Store,
  RefreshCw,
  Info
} from 'lucide-react';

export const DiseaseDetection: React.FC = () => {
  const { crops, addDiseaseDetection } = useStore();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [selectedCropName, setSelectedCropName] = useState<string>('Tomato');
  const [selectedSampleKey, setSelectedSampleKey] = useState<string>('tomato_early_blight');
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string>(sampleDiseasesDatabase.tomato_early_blight.imageUrl);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [detectionResult, setDetectionResult] = useState<any>(sampleDiseasesDatabase.tomato_early_blight);
  const [hasScanned, setHasScanned] = useState<boolean>(true);

  // Sample disease presets
  const samplePresets = [
    { key: 'tomato_early_blight', label: 'Tomato: Early Blight', crop: 'Tomato', img: sampleDiseasesDatabase.tomato_early_blight.imageUrl },
    { key: 'tomato_late_blight', label: 'Tomato: Late Blight', crop: 'Tomato', img: sampleDiseasesDatabase.tomato_late_blight.imageUrl },
    { key: 'rice_blast', label: 'Rice: Blast Fungal Spot', crop: 'Rice', img: sampleDiseasesDatabase.rice_blast.imageUrl },
    { key: 'powdery_mildew', label: 'Chilli: Powdery Mildew', crop: 'Chilli', img: sampleDiseasesDatabase.powdery_mildew.imageUrl },
    { key: 'aphids', label: 'Cotton: Aphid Infestation', crop: 'Cotton', img: sampleDiseasesDatabase.aphids.imageUrl }
  ];

  const handleSelectPreset = (key: string) => {
    setSelectedSampleKey(key);
    const item = sampleDiseasesDatabase[key];
    if (item) {
      setSelectedCropName(item.cropName);
      setUploadedImagePreview(item.imageUrl);
      setHasScanned(false);
    }
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImagePreview(url);
      setHasScanned(false);
    }
  };

  const handleRunAnalysis = () => {
    setIsScanning(true);
    setScanProgress(15);

    const timer1 = setTimeout(() => setScanProgress(55), 400);
    const timer2 = setTimeout(() => setScanProgress(85), 900);
    const timer3 = setTimeout(() => {
      setScanProgress(100);
      setIsScanning(false);
      setHasScanned(true);

      const res = sampleDiseasesDatabase[selectedSampleKey] || sampleDiseasesDatabase.tomato_early_blight;
      setDetectionResult(res);

      // Save to store history
      addDiseaseDetection({
        farmerId: 'usr_farmer_1',
        cropName: selectedCropName,
        imageUrl: uploadedImagePreview,
        detectedDisease: res.name,
        confidencePercentage: res.confidencePercentage,
        severity: res.severity,
        symptoms: res.symptoms,
        preventionGuidance: res.preventionGuidance,
        recommendedBioInputs: res.recommendedBioInputs,
        disclaimer: t('ai_disclaimer_text')
      });
    }, 1400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-rose-100 text-rose-700 rounded-xl">
            <Microscope className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">
              {t('nav_disease_detection', 'AI Crop Disease & Pest Detection')}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              Computer vision-assisted symptom screening & non-chemical preventive guidance
            </p>
          </div>
        </div>
      </div>

      {/* Mandatory Statutory Disclaimer Alert */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 flex items-start gap-3 shadow-sm">
        <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-sm font-black text-amber-950 uppercase tracking-wide">
            {t('ai_disclaimer_title', 'AI-Assisted Detection & Advisory Notice')}
          </h4>
          <p className="text-xs text-amber-900 leading-relaxed">
            {t('ai_disclaimer_text', 'Possible Disease identified by AI vision analysis. This guidance is general and advisory only. Always consult an Agricultural Professional or certified Agronomist before purchasing or applying chemical crop protection products.')}
          </p>
        </div>
      </div>

      {/* Main Scanner Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Image Selection & Scanning (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <Card className="p-5 space-y-4">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Step 1: Select Cultivated Crop
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Tomato', 'Rice', 'Chilli', 'Cotton'].map((crop) => (
                <button
                  key={crop}
                  type="button"
                  onClick={() => setSelectedCropName(crop)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    selectedCropName === crop
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-stone-50 text-stone-700 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>

            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider pt-2 border-t border-stone-100">
              Step 2: Choose Diseased Leaf Sample or Upload
            </h3>

            {/* Presets Gallery */}
            <div className="space-y-2">
              <p className="text-xs text-stone-500 font-medium">Ready Hackathon Disease Presets:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {samplePresets.map((preset) => (
                  <div
                    key={preset.key}
                    onClick={() => handleSelectPreset(preset.key)}
                    className={`p-2 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedSampleKey === preset.key
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'border-stone-200 hover:border-emerald-300 bg-white'
                    }`}
                  >
                    <img
                      src={preset.img}
                      alt={preset.label}
                      className="w-full h-16 rounded-lg object-cover mb-1.5"
                    />
                    <p className="text-[11px] font-bold text-stone-800 truncate">{preset.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Upload Button */}
            <div className="pt-2">
              <label className="block w-full border-2 border-dashed border-stone-300 hover:border-emerald-500 rounded-xl p-3 text-center cursor-pointer transition-colors bg-stone-50/50 hover:bg-emerald-50/30">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCustomUpload}
                  className="hidden"
                />
                <Upload className="w-5 h-5 text-stone-400 mx-auto mb-1" />
                <span className="text-xs font-bold text-stone-700 block">
                  Or Upload Custom Leaf Photo
                </span>
                <span className="text-[10px] text-stone-400 block mt-0.5">
                  JPG, PNG up to 10MB
                </span>
              </label>
            </div>

            {/* Run Analysis CTA */}
            <div className="pt-3">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isScanning}
                onClick={handleRunAnalysis}
                icon={isScanning ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 text-amber-300" />}
              >
                {isScanning ? `Analyzing Leaf Matrix (${scanProgress}%)...` : 'Run AI-Assisted Diagnosis'}
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column: Diagnostic Inspection Results (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Active Image Preview with scanning line */}
          <div className="relative rounded-3xl overflow-hidden border border-stone-200 bg-stone-900 h-64 sm:h-72 shadow-md">
            <img
              src={uploadedImagePreview}
              alt="Crop Leaf Scan"
              className={`w-full h-full object-cover transition-opacity duration-300 ${isScanning ? 'opacity-70' : 'opacity-100'}`}
            />

            {/* Futuristic Scanning Beam Animation */}
            {isScanning && (
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between">
                <div className="w-full h-1 bg-gradient-to-r from-emerald-400 via-green-200 to-emerald-400 animate-pulse shadow-[0_0_15px_#22c55e]" />
                <div className="bg-stone-900/80 backdrop-blur-md p-4 text-center text-white m-4 rounded-2xl border border-emerald-500/50">
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-1">
                    AgriConnect Vision AI Analysis in Progress
                  </p>
                  <p className="text-sm font-semibold">
                    Extracting leaf pigmentation, lesion contours & chlorotic patterns...
                  </p>
                  <div className="w-full bg-stone-700 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full transition-all duration-300"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {!isScanning && (
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-stone-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl text-white text-xs border border-white/10">
                <span className="font-semibold">Target Crop: {selectedCropName}</span>
                <span className="text-emerald-300 font-mono text-[11px]">AgriVision Neural v3.2</span>
              </div>
            )}
          </div>

          {/* Diagnostic Results Card */}
          {hasScanned && detectionResult && (
            <Card className="p-6 space-y-5 border-2 border-emerald-500/50 shadow-lg">
              
              {/* Top Result Banner */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-stone-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      {t('label_possible_disease', 'Possible Disease Identified')}
                    </span>
                    <Badge variant={detectionResult.severity === 'High' ? 'danger' : 'warning'}>
                      {detectionResult.severity} Severity
                    </Badge>
                  </div>
                  <h3 className="text-xl font-black text-stone-900 mt-1.5">
                    {detectionResult.name}
                  </h3>
                </div>

                {/* AI Confidence Dial */}
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-center shrink-0">
                  <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                    {t('label_confidence', 'Confidence')}
                  </p>
                  <p className="text-2xl font-black text-emerald-900 tracking-tight">
                    {detectionResult.confidencePercentage}%
                  </p>
                </div>
              </div>

              {/* Observed Symptoms */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-sky-600" />
                  {t('label_symptoms', 'Observed Symptoms')}
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-700 bg-stone-50 p-3.5 rounded-2xl border border-stone-100">
                  {detectionResult.symptoms.map((sym: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* General Prevention Guidance */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {t('label_prevention', 'General Non-Chemical Cultural Practices')}
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-700 bg-emerald-50/50 p-3.5 rounded-2xl border border-emerald-100">
                  {detectionResult.preventionGuidance.map((prev: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{prev}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Bio-inputs */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  {t('label_recommended_bio', 'Permitted Bio-Inputs & Antagonists')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {detectionResult.recommendedBioInputs.map((input: string, i: number) => (
                    <span key={i} className="text-xs bg-white border border-stone-200 text-stone-800 px-3 py-1 rounded-xl shadow-xs font-medium">
                      🌿 {input}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  className="flex-1"
                  icon={<GraduationCap className="w-4 h-4" />}
                  onClick={() => navigate('/farmer/professionals')}
                >
                  {t('action_consult_professional', 'Consult Agricultural Professional')}
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                  icon={<Store className="w-4 h-4" />}
                  onClick={() => navigate('/farmer/marketplace')}
                >
                  {t('action_view_products', 'Find Nearby Verified Sellers')}
                </Button>
              </div>

            </Card>
          )}

        </div>

      </div>
    </div>
  );
};
