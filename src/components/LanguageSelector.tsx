import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  currentLocale: string;
  onLocaleChange: (locale: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLocale,
  onLocaleChange,
}) => {
  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
        onClick={() => onLocaleChange(currentLocale === 'fr' ? 'en' : 'fr')}
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{currentLocale}</span>
      </button>
    </div>
  );
};
