import React from 'react';

interface ErrorMessageProps {
  message: string;
  errorLabel: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, errorLabel }) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg" role="alert">
      <strong className="font-bold">{errorLabel} </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};
