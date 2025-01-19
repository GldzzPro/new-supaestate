import React from 'react';
import { Search, Home, CalendarCheck, Key } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Search,
      title: t('howItWorks.steps.search.title'),
      description: t('howItWorks.steps.search.description'),
    },
    {
      icon: Home,
      title: t('howItWorks.steps.virtual.title'),
      description: t('howItWorks.steps.virtual.description'),
    },
    {
      icon: CalendarCheck,
      title: t('howItWorks.steps.schedule.title'),
      description: t('howItWorks.steps.schedule.description'),
    },
    {
      icon: Key,
      title: t('howItWorks.steps.close.title'),
      description: t('howItWorks.steps.close.description'),
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{t('howItWorks.title')}</h2>
          <p className="mt-4 text-xl text-gray-600">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mb-6">
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-blue-200 transform -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}