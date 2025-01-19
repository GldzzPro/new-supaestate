import React from 'react';
import { MapPin, Bed, Bath, Square, Calendar, Heart } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Comments } from '../components/property/Comments';
import { PropertyRating } from '../components/property/Rating';

export function PropertyPage() {
  const { t } = useTranslation();
  const { id } = useParams();

  const property = {
    title: 'Modern Downtown Apartment',
    location: 'Manhattan, NY',
    price: '$850,000',
    description: 'Luxurious modern apartment in the heart of downtown, featuring high-end finishes and spectacular city views.',
    beds: 2,
    baths: 2,
    sqft: 1200,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    ],
  };

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {property.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Property ${index + 1}`}
                  className="w-full h-[400px] object-cover rounded-lg"
                />
              ))}
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">{property.title}</h1>
                <PropertyRating propertyId={id} />
              </div>

              <div className="flex items-center text-gray-500 mb-6">
                <MapPin className="h-5 w-5 mr-2" />
                {property.location}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-blue-600" />
                  <span>{property.beds} {t('property.features.bedrooms')}</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-blue-600" />
                  <span>{property.baths} {t('property.features.bathrooms')}</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-5 w-5 mr-2 text-blue-600" />
                  <span>{property.sqft} {t('property.features.area')}</span>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-4">{t('property.description')}</h2>
              <p className="text-gray-600 mb-8">{property.description}</p>

              <div className="border-t pt-8">
                <h2 className="text-2xl font-semibold mb-6">Comments</h2>
                <Comments propertyId={id} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24">
              <div className="text-3xl font-bold text-blue-600 mb-6">
                {property.price}
              </div>

              <div className="space-y-4">
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  {t('property.actions.schedule')}
                </button>
                <button className="w-full border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 flex items-center justify-center">
                  <Heart className="h-5 w-5 mr-2" />
                  {t('property.actions.save')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}