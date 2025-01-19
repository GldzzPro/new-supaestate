import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface MeetingCalendarProps {
  meetingType: 'online' | 'office' | null;
}

export function MeetingCalendar({ meetingType }: MeetingCalendarProps) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clean up any existing scripts first
    const existingScript = document.querySelector('script[src="https://embed.ycb.me"]');
    if (existingScript) {
      document.body.removeChild(existingScript);
    }

    // Create and append the new script
    const script = document.createElement('script');
    script.src = 'https://embed.ycb.me';
    script.async = true;
    script.setAttribute('data-domain', 'joinajiz');
    
    // Only append the script once the container is mounted
    if (containerRef.current) {
      document.body.appendChild(script);
    }

    return () => {
      // Cleanup on unmount
      const scriptToRemove = document.querySelector('script[src="https://embed.ycb.me"]');
      if (scriptToRemove && scriptToRemove.parentNode) {
        scriptToRemove.parentNode.removeChild(scriptToRemove);
      }
    };
  }, [meetingType]); // Re-run when meeting type changes

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          {meetingType === 'online' 
            ? t('meeting.calendar.online.title')
            : t('meeting.calendar.office.title')}
        </h2>
        <p className="text-gray-600">
          {meetingType === 'online'
            ? t('meeting.calendar.online.description')
            : t('meeting.calendar.office.description')}
        </p>
      </div>
      
      <div 
        ref={containerRef}
        className="w-full aspect-[4/3] min-h-[600px] relative rounded-lg overflow-hidden"
      >
        <div 
          id="ycbm"
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}