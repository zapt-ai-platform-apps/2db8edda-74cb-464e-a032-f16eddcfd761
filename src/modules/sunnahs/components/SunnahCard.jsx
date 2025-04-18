import React from 'react';

export default function SunnahCard({ sunnah }) {
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-primary-700">{sunnah.title}</h3>
        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {sunnah.type === 'قولية' ? 'سنة قولية' : 'سنة عملية'}
        </span>
      </div>
      
      <p className="text-lg font-medium mb-4">{sunnah.content}</p>
      
      <div className="bg-secondary-50 p-3 rounded-md mb-4">
        <h4 className="font-bold text-secondary-800 mb-1">الشرح:</h4>
        <p className="text-secondary-700">{sunnah.explanation}</p>
      </div>
      
      <div className="bg-primary-50 p-3 rounded-md mb-4">
        <h4 className="font-bold text-primary-800 mb-1">أمثلة تطبيقية:</h4>
        <p className="text-primary-700">{sunnah.examples}</p>
      </div>
      
      <div className="text-xs text-secondary-500 mt-4">
        <p>المصدر: {sunnah.source}</p>
      </div>
    </div>
  );
}