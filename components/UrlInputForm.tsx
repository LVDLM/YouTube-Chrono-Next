import React from 'react';

interface UrlInputFormProps {
  url: string;
  onUrlChange: (url: string) => void;
  isLoading: boolean;
  placeholder: string;
  formId: string;
  onSubmit: (e: React.FormEvent) => void;
}

export const UrlInputForm: React.FC<UrlInputFormProps> = ({ url, onUrlChange, isLoading, placeholder, formId, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} id={formId} className="w-full max-w-2xl mx-auto">
      <input
        type="text"
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
        disabled={isLoading}
      />
    </form>
  );
};
