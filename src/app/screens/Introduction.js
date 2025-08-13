'use client';

import { useSession } from '../context/SessionContext';
import { UserCheck, Mail } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Introduction() {
  const { sessionData, navigate, addLog } = useSession();

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
      {/* 
        WHY: To match the key-value grid layout used in other panels for better visual consistency.
        It now uses a responsive grid layout, making it cleaner on both mobile and desktop.
      */}
      <div className="panel-base panel-theme mb-4">
        <h3 className="title-command">$profile_data</h3>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1`}>
          <span className="key-label">$title:</span>
          <span className="key-label">{profile.summary?.title}</span>
          
          <span className="key-label">$specialization:</span>
          <span className="key-label">{profile.summary?.specialization}</span>

          <span className="key-label">$background:</span>
          <span className="key-label">{profile.summary?.background}</span>
      </div>
    </div>

      <div className="panel-base panel-theme mb-4">
        <h3 className="title-command">$about_me</h3>
        <p className="key-label leading-relaxed">{introText}</p>
    </div>

      <div className="panel-base panel-theme mb-4">
        <h3 className="title-command">$core_attributes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
        {profile.attributes?.map((attr, index) => (
          <div key={index}>
              <span className="key-label">[✓] </span>
              <span className="key-label">{attr}</span>
          </div>
        ))}
      </div>
    </div>

      {/*
        WHY: This information is more relevant in the "Contact" context. Moving it declutters
        the introduction and places the status details where a user would expect to find them
        when considering making contact.
      */}

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
