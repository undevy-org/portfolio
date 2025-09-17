// src/app/screens/CaseList.js
'use client';

import { useSession } from '../context/SessionContext';
import ScreenWrapper from '../components/ScreenWrapper';
import TerminalProgress from '../components/ui/TerminalProgress'; // Import the progress component
import { ResponsiveCardGrid } from '../components/organisms';
import Panel from '../components/molecules/Panel';

export default function CaseList() {
  const { sessionData, navigate, addLog, setSelectedCase } = useSession();

  const cases = sessionData?.case_studies || {};
  const caseIds = Object.keys(cases);
  const totalCasesCount = sessionData?.total_case_count || caseIds.length;

  // Calculate access level and progress percentage
  const accessPercentage = totalCasesCount > 0 
    ? Math.round((caseIds.length / totalCasesCount) * 100) 
    : 0;
  
  // Determine access level based on percentage
  const getAccessLevel = (percentage) => {
    if (percentage >= 90) return { level: 'Enterprise', next: null };
    if (percentage >= 70) return { level: 'Professional', next: 'Enterprise' };
    if (percentage >= 40) return { level: 'Standard', next: 'Professional' };
    return { level: 'Basic', next: 'Standard' };
  };
  
  const accessInfo = getAccessLevel(accessPercentage);
  
  // Calculate how many more cases needed for next level
  const getNextLevelRequirement = () => {
    if (accessInfo.next === null) return null;
    
    const thresholds = {
      'Standard': 40,
      'Professional': 70,
      'Enterprise': 90
    };
    
    const nextThreshold = thresholds[accessInfo.next];
    const casesNeededForNext = Math.ceil((nextThreshold / 100) * totalCasesCount) - caseIds.length;
    
    return Math.max(casesNeededForNext, 0);
  };
  
  const casesForNextLevel = getNextLevelRequirement();

  const handleCaseClick = (caseItem) => {
    setSelectedCase({ id: caseItem.id, ...caseItem });
    addLog(`CASE SELECTED: ${caseItem.title}`);
    navigate('CaseDetail');
  };

  // Transform case data for ResponsiveCardGrid
  const caseItems = caseIds.map((caseId) => {
    const caseData = cases[caseId];
    return {
      id: caseId,
      title: caseData.title,
      desc: caseData.desc,
      metrics: caseData.metrics,
      tags: caseData.tags
    };
  });

  return (
    <ScreenWrapper>
      <Panel className="mb-4">
        <div className="mb-3 text-primary">
          <span className="text-sm text-command">Access Level: </span>
          <span className="text-sm text-success">{accessInfo.level}</span>
          <span className="text-sm ml-2 text-secondary">
            for {sessionData?.meta?.company || 'current session'}
          </span>
        </div>

        {/* Progress bar using TerminalProgress component */}
        <div className="mb-2">
          <TerminalProgress
            progress={accessPercentage}
            isLoading={true}
            label={`${caseIds.length} of ${totalCasesCount} cases available`}
            showPercentage={true}
            animateProgress={true}
            height="h-3"
          />
        </div>

        {/* Next level hint - only show if not at max level */}
        {accessInfo.next && casesForNextLevel > 0 && (
          <div className="text-xs mt-2 text-secondary">
            <span className="opacity-75">
              Unlock {casesForNextLevel} more {casesForNextLevel === 1 ? 'case ' : 'cases '}
              to reach <span className="text-primary">{accessInfo.next}</span> level
            </span>
          </div>
        )}

        {/* Max level achievement message */}
        {!accessInfo.next && (
          <div className="text-xs mt-2 text-success">
            <span>✓ Maximum access level achieved</span>
          </div>
        )}
      </Panel>

      <ResponsiveCardGrid
        items={caseItems}
        onItemClick={handleCaseClick}
        columns={1}
      />
    </ScreenWrapper>
  );
}
