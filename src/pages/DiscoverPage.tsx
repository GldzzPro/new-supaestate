import React from 'react';
import { Search, MapPin, Home as HomeIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function DiscoverPage() {
  const { t } = useTranslation();

  const cities = [
    { name: 'New York', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' },
    { name: 'Los Angeles', image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' },
    { name: 'Chicago', image: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' },
  ];

  return (
    <div className="pt-16">
      <div className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 text-center">{t('discover.title')}</h1>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg p-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="h-5 w-5" />
                  <input
                    type="text"
                    placeholder={t('discover.searchPlaceholder')}
                    className="w-full p-2 text-gray-900 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-gray-400">
                  <HomeIcon className="h-5 w-5" />
                  <select className="w-full p-2 text-gray-900 focus:outline-none">
                    <option>{t('discover.propertyType')}</option>
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Condo</option>
                  </select>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8">{t('discover.popularCities')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cities.map((city) => (
            <div key={city.name} className="relative rounded-lg overflow-hidden group">
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{city.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}