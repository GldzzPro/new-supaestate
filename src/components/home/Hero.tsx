import React from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Hero() {
  const { t } = useTranslation();

  return (
    <div className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl sm:text-2xl mb-8 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          
          <div className="max-w-3xl mx-auto bg-white rounded-lg p-2">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="flex-1 w-full sm:w-auto mb-4 sm:mb-0">
                <input
                  type="text"
                  placeholder={t('hero.searchPlaceholder')}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center justify-center hover:bg-blue-700 transition duration-300">
                <Search className="h-5 w-5 mr-2" />
                {t('common.search')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}