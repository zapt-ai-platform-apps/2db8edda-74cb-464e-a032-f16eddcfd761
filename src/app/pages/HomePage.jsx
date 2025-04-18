import React from 'react';
import DailySunnah from '@/modules/sunnahs/components/DailySunnah';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4">
      <DailySunnah />
    </div>
  );
}