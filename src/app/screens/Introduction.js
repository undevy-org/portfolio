// src/app/screens/Introduction.js
'use client';

import { useSession } from '../context/SessionContext';
import { UserCheck, Mail } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Introduction() {
  const { sessionData, theme, navigate, addLog } = useSession();

  const panelClasses = `p-4 rounded border mb-4 ${
    theme === 'dark' ? 'border-dark-border-darker' : 'border-light-border-lighter'
  }`;
  const yellowClasses = `text-base ${
    theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
  }`;
  const labelClasses = `${
    theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'
  }`;
  const valueClasses = `${
    theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
  }`;

  const profile = sessionData?.profile || {};
    const introText =
    sessionData?.introduction?.[sessionData?.meta?.tone] ||
    sessionData?.introduction?.formal ||
    'Welcome to my portfolio!';
    
  const handleNavigate = (screen, label) => {
    addLog(`NAVIGATE: ${label}`);
    navigate(screen);
  };

return (
  <div className="p-4 font-mono">
      <div className={panelClasses}>
        <h3 className={`mb-2 ${yellowClasses}`}>$profile_data</h3>
        <div className={`flex flex-wrap gap-x-2 text-sm ${valueClasses}`}>
        <span>{profile.summary?.title}</span>
        <span className="opacity-50">|</span>
        <span>{profile.summary?.specialization}</span>
        <span className="opacity-50">|</span>
        <span>{profile.summary?.background}</span>
      </div>
    </div>

      <div className={panelClasses}>
        <h3 className={`mb-2 ${yellowClasses}`}>$about_me</h3>
        <p className={`text-sm leading-relaxed ${valueClasses}`}>{introText}</p>
    </div>

      <div className={panelClasses}>
        <h3 className={`mb-2 ${yellowClasses}`}>$core_attributes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {profile.attributes?.map((attr, index) => (
          <div key={index}>
              <span className={labelClasses}>[✓] </span>
              <span className={valueClasses}>{attr}</span>
          </div>
        ))}
      </div>
    </div>

      <div className={panelClasses}>
        <h3 className={`mb-2 ${yellowClasses}`}>$current_status</h3>
        {/* MODIFIED: Layout is now responsive. Switches to grid on medium screens. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <span className={labelClasses}>$seeking:</span>
          <span className={valueClasses}>{profile.status?.seeking}</span>

          <span className={labelClasses}>$location:</span>
          <span className={valueClasses}>{profile.status?.location}</span>

          <span className={labelClasses}>$availability:</span>
          <span className={valueClasses}>{profile.status?.availability}</span>
      </div>
    </div>

    <div className="flex flex-col md:flex-row gap-3">
      <Button
        onClick={() => handleNavigate('Timeline', 'experience timeline')}
        icon={UserCheck}
        iconPosition="left"
        variant="flex"
      >
        VIEW EXPERIENCE
      </Button>

      <Button
        onClick={() => handleNavigate('Contact', 'contact info')}
        icon={Mail}
        iconPosition="left"
        variant="flex"
      >
        GET IN TOUCH
      </Button>
    </div>
  </div>
);
}
