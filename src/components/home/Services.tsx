import React from 'react';
import { Home, Building2, Warehouse, Building } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Services() {
  const { t } = useTranslation();

  const services = [
    {
      icon: Home,
      title: t('services.residential.title'),
      description: t('services.residential.description'),
    },
    {
      icon: Building2,
      title: t('services.commercial.title'),
      description: t('services.commercial.description'),
    },
    {
      icon: Warehouse,
      title: t('services.industrial.title'),
      description: t('services.industrial.description'),
    },
    {
      icon: Building,
      title: t('services.management.title'),
      description: t('services.management.description'),
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{t('services.title')}</h2>
          <p className="mt-4 text-xl text-gray-600">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                <service.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}