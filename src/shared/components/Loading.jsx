import React from 'react';

export default function Loading({ message = 'جاري التحميل...' }) {
  return (
    <div className="text-center p-6">
      <div className="inline-block w-8 h-8 border-4 border-t-transparent border-primary-500 rounded-full animate-spin mb-2"></div>
      <p className="text-secondary-600">{message}</p>
    </div>
  );
}