import React, { useState, useEffect } from 'react';

interface ApiKeyManagerTranslations {
    title: string;
    description: string;
    linkText: string;
    tutorialLinkText: string;
    placeholder: string;
    saveButton: string;
    savedMessage: string;
    changeButton: string;
    clearButton: string;
}

interface ApiKeyManagerProps {
  savedKey: string | null;
  onSave: (key: string) => void;
  onClear: () => void;
  translations: ApiKeyManagerTranslations;
}

export const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ savedKey, onSave, onClear, translations }) => {
  const [key, setKey] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!savedKey) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [savedKey]);

  const handleSave = () => {
    if (key.trim()) {
      onSave(key.trim());
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setKey(savedKey || '');
    setIsEditing(true);
  };
  
  const handleClear = () => {
      onClear();
      setKey('');
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-gray-800 rounded-lg border border-gray-700">
      <h3 className="font-bold text-lg mb-2 text-gray-200">{translations.title}</h3>
      {isEditing ? (
        <div className="space-y-3">
          <p className="text-sm text-gray-400">
            {translations.description}
             <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline ml-1">{translations.linkText}</a>
             <span className="mx-1 text-gray-500">|</span>
             <a href="https://www.youtube.com/watch?v=qWUobN0xtcE" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">{translations.tutorialLinkText}</a>
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
             <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder={translations.placeholder}
              className="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="YouTube API Key Input"
            />
            <button onClick={handleSave} className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500">
              {translations.saveButton}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <p className="text-sm text-green-400">{translations.savedMessage}</p>
          <div>
            <button onClick={handleEdit} className="text-sm font-medium text-gray-400 hover:text-white mr-4">{translations.changeButton}</button>
            <button onClick={handleClear} className="text-sm font-medium text-red-500 hover:text-red-400">{translations.clearButton}</button>
          </div>
        </div>
      )}
    </div>
  );
};