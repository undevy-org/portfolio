'use client';

import { useSession } from '../context/SessionContext';
import ScreenWrapper from '../components/ScreenWrapper';
import { UserCheck, Mail } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Introduction() {
  const { sessionData, theme, navigate, addLog } = useSession();

  const panelClasses = `p-4 rounded border mb-4 ${
    "border-secondary"
  }`;
  const yellowClasses = `text-base ${
    "text-command"
  }`;
  const labelClasses = `${
    "text-primary"
  }`;
  const valueClasses = `${
    "text-secondary"
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
  <ScreenWrapper className="font-mono">
      <div className={panelClasses}>
        <h3 className={`mb-2 text-command`}>$profile_data</h3>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm`}>
          <span className={labelClasses}>$title:</span>
          <span className={valueClasses}>{profile.summary?.title}</span>
          
          <span className={labelClasses}>$specialization:</span>
          <span className={valueClasses}>{profile.summary?.specialization}</span>

          <span className={labelClasses}>$background:</span>
          <span className={valueClasses}>{profile.summary?.background}</span>
      </div>
    </div>

      <div className={panelClasses}>
        <h3 className={`mb-2 text-command`}>$about_me</h3>
        <p className={`text-sm leading-relaxed text-secondary`}>{introText}</p>
    </div>

      <div className={panelClasses}>
        <h3 className={`mb-2 text-command`}>$core_attributes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {profile.attributes?.map((attr, index) => (
          <div key={index}>
              <span className={labelClasses}>[✓] </span>
              <span className={valueClasses}>{attr}</span>
          </div>
        ))}
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
  </ScreenWrapper>
);
}
