import React, { useState } from 'react';
import { Calendar, Video, Building, ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MeetingTypeSelector } from '../components/meeting/MeetingTypeSelector';
import { MeetingCalendar } from '../components/meeting/MeetingCalendar';

type MeetingType = 'online' | 'office' | null;

export function ScheduleMeetingPage() {
  const [step, setStep] = useState(1);
  const [meetingType, setMeetingType] = useState<MeetingType>(null);
  const { t } = useTranslation();

  const handleMeetingTypeSelect = (type: MeetingType) => {
    setMeetingType(type);
    setStep(2);
  };

  const handleBack = () => {
    setStep(step - 1);
    if (step === 2) {
      setMeetingType(null);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {t('meeting.title')}
            </h1>
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('common.back')}
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2">
                1
              </div>
              <span>{t('meeting.steps.type')}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2">
                2
              </div>
              <span>{t('meeting.steps.schedule')}</span>
            </div>
          </div>
        </div>

        {step === 1 && (
          <MeetingTypeSelector onSelect={handleMeetingTypeSelect} />
        )}

        {step === 2 && (
          <MeetingCalendar meetingType={meetingType} />
        )}
      </div>
    </div>
  );
}