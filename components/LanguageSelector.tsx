import React from 'react';

type Language = 'en' | 'es' | 'ca' | 'pe';

interface LanguageSelectorProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLang, onLangChange }) => {
  const inactiveClass = "text-gray-400 hover:text-white";
  const activeClass = "text-red-500 font-bold";

  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-800 rounded-lg">
      <button 
        onClick={() => onLangChange('en')}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${currentLang === 'en' ? activeClass : inactiveClass}`}
      >
        EN
      </button>
      <div className="w-px h-4 bg-gray-600"></div>
      <button 
        onClick={() => onLangChange('es')}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${currentLang === 'es' ? activeClass : inactiveClass}`}
      >
        ES
      </button>
      <div className="w-px h-4 bg-gray-600"></div>
      <button 
        onClick={() => onLangChange('ca')}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${currentLang === 'ca' ? activeClass : inactiveClass}`}
      >
        CA
      </button>
      </div>
  )
 };