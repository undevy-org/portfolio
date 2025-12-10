import { useSession } from '../context/SessionContext';
import ScreenWrapper from '../components/ScreenWrapper';
import { ChevronRight, ArrowLeft, LayoutGrid } from 'lucide-react';
import TerminalProgress from '../components/ui/TerminalProgress';
import Button from '../components/ui/Button';

export default function CaseList() {
  const { sessionData, navigate, addLog, setSelectedCase, activeTab, selectedRole, setTab } = useSession();

  const allCases = sessionData?.case_studies || {};
  let caseIds = Object.keys(allCases);
  const totalCasesCount = sessionData?.total_case_count || caseIds.length;

  // Determine if we are in "Filtered View"
  const isFiltered = activeTab['CaseList'] === 'filtered' && selectedRole;

  if (isFiltered) {
    const roleDetails = sessionData?.role_details?.[selectedRole.id];
    const relatedCases = roleDetails?.related_cases || [];

    // Filter cases to only show related ones
    caseIds = caseIds.filter(id => relatedCases.includes(id));
  }

  // Calculate access level and progress percentage (based on TOTAL cases, not filtered)
  const accessPercentage = totalCasesCount > 0
    ? Math.round((Object.keys(allCases).length / totalCasesCount) * 100)
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
    const casesNeededForNext = Math.ceil((nextThreshold / 100) * totalCasesCount) - Object.keys(allCases).length;

    return Math.max(casesNeededForNext, 0);
  };

  const casesForNextLevel = getNextLevelRequirement();

  const handleCaseClick = (caseId, caseData) => {
    setSelectedCase({ id: caseId, ...caseData });
    addLog(`CASE SELECTED: ${caseData.title}`);
    navigate('CaseDetail');
  };

  const handleBackToRole = () => {
    addLog('RETURN TO ROLE');
    navigate('RoleDetail');
  };

  const handleReadAllCases = () => {
    addLog('SHOW ALL CASES');
    setTab('CaseList', 'all'); // Clear filter
    // Force re-render happens via context update
  };

  return (
    <ScreenWrapper>
      {/* Conditional Header Render */}
      {isFiltered ? (
        <div className="mb-4 space-y-3">
          <div className="flex flex-col md:flex-row gap-3">
            <Button
              onClick={handleBackToRole}
              icon={ArrowLeft}
              iconPosition="left"
              variant="flex"
              className="p-2"
            >
              BACK TO ROLE
            </Button>
            <Button
              onClick={handleReadAllCases}
              icon={LayoutGrid}
              iconPosition="left"
              variant="flex"
            >
              READ ALL CASES
            </Button>
          </div>
          <div className="p-3 rounded border border-secondary border-opacity-50">
            <p className="text-primary text-sm">
              Showing cases for <span className="text-command font-bold">{selectedRole.company}</span>
            </p>
          </div>
        </div>
      ) : (
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
              label={`${Object.keys(allCases).length} of ${totalCasesCount} cases available`}
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
      )}

      <div className="space-y-3">
        {caseIds.length > 0 ? (
          caseIds.map((caseId) => {
            const caseData = allCases[caseId];
            if (!caseData) return null; // Safety check
            return (
              <button
                key={caseId}
                onClick={() => handleCaseClick(caseId, caseData)}
                className="w-full p-4 border rounded text-left transition-colors flex items-start gap-4 border-secondary bg-hover"
              >
                <div className="flex-1 space-y-1">
                  <div className="text-lg text-command">
                    {caseData.title}
                  </div>
                  <div className="text-sm text-secondary">
                    {caseData.desc}
                  </div>
                  <div className="text-sm pt-1 text-primary">
                    {caseData.metrics}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {caseData.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="tag-badge border-secondary text-secondary bg-main"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 mt-1 text-secondary" />
              </button>
            );
          })
        ) : (
          <div className="p-8 text-center border rounded border-secondary border-dashed">
            <p className="text-secondary">No cases found for this role.</p>
            <button
              onClick={handleReadAllCases}
              className="mt-2 text-primary hover:underline text-sm"
            >
              View all cases
            </button>
          </div>
        )}
      </div>
    </ScreenWrapper>
  );
}
