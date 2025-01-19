import React from 'react';
import { Video, Building } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type MeetingType = 'online' | 'office' | null;

interface MeetingTypeSelectorProps {
  onSelect: (type: MeetingType) => void;
}

export function MeetingTypeSelector({ onSelect }: MeetingTypeSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <button
        onClick={() => onSelect('online')}
        className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-blue-500"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Video className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{t('meeting.types.online.title')}</h3>
          <p className="text-gray-600">{t('meeting.types.online.description')}</p>
        </div>
      </button>

      <button
        onClick={() => onSelect('office')}
        className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-blue-500"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Building className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{t('meeting.types.office.title')}</h3>
          <p className="text-gray-600">{t('meeting.types.office.description')}</p>
        </div>
      </button>
    </div>
  );
}