// src/app/screens/AccessManager.js
'use client';

import { useEffect } from 'react';
import { useSession } from '../context/SessionContext';
import Button from '../components/ui/Button';
import { Home, Shield, Key, Users } from 'lucide-react';
import { ListViewTemplate } from '../components/templates';
import { CodeListSection } from '../components/organisms';

export default function AccessManager() {
  const { sessionData, navigate, addLog, setSessionData } = useSession();

  // Prevent navigation away from this screen using browser back button
  useEffect(() => {
    const handlePopState = () => {
      // When user tries to go back, redirect to MainHub
      navigate('MainHub', false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate]);

  const handleProceed = () => {
    navigate('MainHub', false); // false means don't add to history
  };

  // Function to simulate access with a specific code
  const handleCodeClick = async (code, isDemo = false) => {
    try {
      // Handle demo access
      if (isDemo) {
        addLog(`DEMO MODE ACTIVATED`);

        // Simulate fetching demo session data
        const response = await fetch(`/api/session`);

        if (response.ok) {
          const demoData = await response.json();
          setSessionData(demoData);
          addLog(`DEMO ACCESS GRANTED`);
          navigate('ProfileBoot', false);
        } else {
          addLog(`DEMO ACCESS FAILED`);
        }
        return;
      }

      if (!code) return;

      addLog(`ACCESS SIMULATION: Using code ${code}`);

      // Make API call to authenticate with this code
      const response = await fetch(`/api/session?code=${code}`);

      if (response.ok) {
        const userData = await response.json();

        // Set session data with the authenticated user's data
        const enrichedData = {
          ...userData,
          accessCode: code
        };

        setSessionData(enrichedData);
        addLog(`ACCESS GRANTED: Viewing portfolio for ${userData.meta?.company || code}`);

        // Navigate to ProfileBoot to start the user experience
        navigate('ProfileBoot', false);
      } else {
        const errorData = await response.json();
        addLog(`ACCESS DENIED: ${errorData.error || 'Invalid access code'}`);
      }
    } catch (error) {
      addLog(`ACCESS ERROR: ${error.message}`);
    }
  };

  // Extract codes from session data
  const masterCodes = sessionData?.codes?.master || [];
  const specialCodes = sessionData?.codes?.special || [];
  const rawUserCodes = sessionData?.codes?.user || [];

  // Filter out special codes from user codes to avoid duplication
  const specialCodeValues = specialCodes
    .filter(code => code.code)
    .map(code => code.code);

  const userCodes = rawUserCodes.filter(
    userCode => !specialCodeValues.includes(userCode.code)
  );

  // Create data structure for ListViewTemplate
  // Use custom render function to display CodeListSection components
  const customRenderCard = (sectionData, index) => {
    const { type, title, icon, codes, onCodeClick } = sectionData;
    return (
      <CodeListSection
        key={index}
        title={title}
        icon={icon}
        codes={codes}
        onCodeClick={onCodeClick}
        variant={type.replace('_codes', '')}
      />
    );
  };

  // Combine all sections into items array
  const accessSections = [
    {
      id: 'master',
      type: 'master_codes',
      title: "Master Access",
      icon: Shield,
      codes: masterCodes,
      onCodeClick: (code) => handleCodeClick(code.code)
    },
    {
      id: 'special',
      type: 'special_codes',
      title: "Special Access",
      icon: Key,
      codes: specialCodes,
      onCodeClick: (code) => {
        if (code.type === 'demo' && !code.code) {
          handleCodeClick(null, true);
        } else if (code.code) {
          handleCodeClick(code.code);
        }
      }
    },
    {
      id: 'user',
      type: 'user_codes',
      title: `User Codes [${userCodes.length}]`,
      icon: Users,
      codes: userCodes,
      onCodeClick: (code) => handleCodeClick(code.code)
    }
  ];

  const navigationButtons = [
    {
      screen: '',
      label: 'PROCEED TO MAIN HUB',
      icon: Home,
      onClick: handleProceed,
      logMessage: 'NAVIGATE: MainHub'
    }
  ];

  return (
    <ListViewTemplate
      items={accessSections}
      onItemClick={() => {}} // Not used since we handle clicks in renderCard
      renderCard={customRenderCard}
      navigationButtons={navigationButtons}
    />
  );
}
