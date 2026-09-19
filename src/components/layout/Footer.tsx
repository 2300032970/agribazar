import React from 'react';
import { Sprout, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-stone-200 mt-auto py-6 px-4 sm:px-6 lg:px-8 text-xs text-stone-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
            <Sprout className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-stone-800">{t('platformName', 'AgriConnect')}</span>
          <span>— {t('platformTagline', 'Integrated Digital Platform for Farmers & Agricultural Services')}</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Empowering Smallholder Farmers</span>
          <span>•</span>
          <span className="flex items-center gap-1">Built with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for Agriculture</span>
        </div>
      </div>
    </footer>
  );
};
