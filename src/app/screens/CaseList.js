// src/app/screens/CaseList.js
'use client';

import { useSession } from '../context/SessionContext';
import ScreenWrapper from '../components/ScreenWrapper';
import { ChevronRight } from 'lucide-react';
import TerminalProgress from '../components/ui/TerminalProgress'; // Import the progress component
import { Tag, CommandTitle } from '../components/atoms';

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

  const handleCaseClick = (caseId, caseData) => {
    setSelectedCase({ id: caseId, ...caseData });
    addLog(`CASE SELECTED: ${caseData.title}`);
    navigate('CaseDetail');
  };

  return (
    <ScreenWrapper>
      <div className="mb-4 p-4 rounded border border-secondary">
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
      </div>

      <div className="space-y-3">
        {caseIds.map((caseId) => {
          const caseData = cases[caseId];
          return (
            <button
              key={caseId}
              onClick={() => handleCaseClick(caseId, caseData)}
              className="w-full p-4 border rounded text-left transition-colors flex items-start gap-4 border-secondary bg-hover"
            >
              <div className="flex-1 space-y-1">
                <CommandTitle text={caseData.title} level="h3" className="text-lg" />
                <div className="text-sm text-secondary">
                {caseData.desc}
              </div>
                <div className="text-sm pt-1 text-primary">
                {caseData.metrics}
              </div>
                <div className="flex flex-wrap gap-2 pt-2">
                {caseData.tags?.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
              </div>
              <ChevronRight className="w-5 h-5 mt-1 text-secondary" />
            </button>
          );
        })}
      </div>
    </ScreenWrapper>
  );
}