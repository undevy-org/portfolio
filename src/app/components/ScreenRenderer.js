// src/app/components/ScreenRenderer.js
'use client';

import { useSession } from '../context/SessionContext';
import dynamic from 'next/dynamic';

// Dynamic imports for optimization
const screens = {
  Entry: dynamic(() => import('../screens/Entry')),
  ProfileBoot: dynamic(() => import('../screens/ProfileBoot')),
  MainHub: dynamic(() => import('../screens/MainHub')),
  Introduction: dynamic(() => import('../screens/Introduction')),
  Timeline: dynamic(() => import('../screens/Timeline')),
  RoleDetail: dynamic(() => import('../screens/RoleDetail')),
  CaseList: dynamic(() => import('../screens/CaseList')),
  CaseDetail: dynamic(() => import('../screens/CaseDetail')),
  SkillsGrid: dynamic(() => import('../screens/SkillsGrid')),
  SkillDetail: dynamic(() => import('../screens/SkillDetail')),
  SideProjects: dynamic(() => import('../screens/SideProjects')),
  Contact: dynamic(() => import('../screens/Contact')),
  AccessManager: dynamic(() => import('../screens/AccessManager')), // Added for master code feature
};

export default function ScreenRenderer() {
  const { currentScreen } = useSession();
  
  const ScreenComponent = screens[currentScreen];
  
  if (!ScreenComponent) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl text-error">Screen not found: {currentScreen}</h2>
      </div>
    );
  }
  
  // Just return the screen component directly
  // TerminalWindow will be handled at the page.js level
  return <ScreenComponent />;
}