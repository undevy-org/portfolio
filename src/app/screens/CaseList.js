'use client';

import { useSession } from '../context/SessionContext';
import { ListViewTemplate } from '../components/templates';

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

  // Transform case data for ResponsiveCardGrid
  const caseItems = caseIds.map((caseId) => {
    const caseData = cases[caseId];
    return {
      id: caseId,
      title: caseData.title,
      desc: caseData.desc,
      metrics: caseData.metrics
    };
  });

  const handleCaseClick = (caseItem) => {
    setSelectedCase({ id: caseItem.id, ...caseItem });
    addLog(`CASE SELECTED: ${caseItem.title}`);
    navigate('CaseDetail');
  };

  return (
    <ListViewTemplate
      items={caseItems}
      onItemClick={handleCaseClick}
      accessLevel={{
        current: caseIds.length,
        max: totalCasesCount,
        percentage: accessPercentage,
        label: `${caseIds.length} of ${totalCasesCount} cases available`,
        nextLevel: accessInfo.next ? {
          label: accessInfo.next,
          requirement: casesForNextLevel
        } : null,
        isMaxLevel: !accessInfo.next
      }}
    />
  );
}
