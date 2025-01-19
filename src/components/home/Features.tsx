import React from 'react';
import { Shield, Clock, Users, Search, Heart, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Shield,
      title: t('features.items.verified.title'),
      description: t('features.items.verified.description'),
    },
    {
      icon: Clock,
      title: t('features.items.support.title'),
      description: t('features.items.support.description'),
    },
    {
      icon: Users,
      title: t('features.items.experts.title'),
      description: t('features.items.experts.description'),
    },
    {
      icon: Search,
      title: t('features.items.search.title'),
      description: t('features.items.search.description'),
    },
    {
      icon: Heart,
      title: t('features.items.favorites.title'),
      description: t('features.items.favorites.description'),
    },
    {
      icon: Calendar,
      title: t('features.items.scheduling.title'),
      description: t('features.items.scheduling.description'),
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t('features.title')}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start p-6 bg-gray-50 rounded-lg hover:shadow-lg transition duration-300"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-600 text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}