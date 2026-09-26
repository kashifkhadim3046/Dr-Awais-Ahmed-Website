import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const EmergencyNotice: React.FC = () => {
  return (
    <div className="bg-amber-50/90 border-b border-amber-200/80 py-2.5 px-4 text-amber-950 text-xs text-center relative z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <p className="leading-snug">
          <strong>Medical Emergency? </strong>
          This website is not intended for emergency medical care. If you are experiencing a medical emergency, please contact your local emergency service (e.g. 1122) or visit the nearest emergency department immediately.
        </p>
      </div>
    </div>
  );
};
