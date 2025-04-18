import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-secondary-200 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <img 
                src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=24&height=24" 
                alt="سنة اليوم" 
                className="w-6 h-6 ml-2" 
              />
              <span className="text-lg font-semibold text-primary-700">سنة اليوم</span>
            </div>
            <p className="text-sm text-secondary-600 mt-1">
              تطبيق يومي للسنن النبوية العملية والقولية
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center text-xs text-secondary-500 mb-2">
              <a 
                href="https://www.zapt.ai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary-600 transition-colors"
              >
                Made on ZAPT
              </a>
            </div>
            <p className="text-xs text-secondary-500">
              &copy; {new Date().getFullYear()} جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}