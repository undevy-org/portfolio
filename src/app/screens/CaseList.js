'use client';

import { useSession } from '../context/SessionContext';
import { ChevronRight } from 'lucide-react';
import Panel from '../components/ui/Panel';
import PanelTitle from '../components/ui/PanelTitle';

export default function CaseList() {
  const { sessionData, navigate, addLog, setSelectedCase } = useSession();

  const cases = sessionData?.case_studies || {};
  const caseIds = Object.keys(cases);
  const totalCasesCount = sessionData?.total_case_count || caseIds.length;

  const handleCaseClick = (caseId, caseData) => {
    setSelectedCase({ id: caseId, ...caseData });
    addLog(`CASE SELECTED: ${caseData.title}`);
    navigate('CaseDetail');
  };

  return (
    <div className="p-4">
      <Panel className="mb-4 p-3">
        <PanelTitle>$loading_cases</PanelTitle>
        <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="value-primary text-sm">[</span>
            {Array.from({ length: caseIds.length }, (_, i) => (
              <span key={`loaded-${i}`} className="text-light-success dark:text-dark-success">■</span>
            ))}
            {Array.from({ length: totalCasesCount - caseIds.length }, (_, i) => (
              <span key={`empty-${i}`} className="key-label">□</span>
            ))}
            <span className="value-primary text-sm">]</span>
          </div>
          <div className="key-label whitespace-nowrap">
              {caseIds.length}/{totalCasesCount} loaded for {sessionData?.meta?.company || 'session'}
          </div>
        </div>
      </Panel>

      <div className="space-y-3">
        {caseIds.map((caseId) => {
          const caseData = cases[caseId];
          return (
            <button
              key={caseId}
              onClick={() => handleCaseClick(caseId, caseData)}
              className="button-panel"
            >
              <div className="flex-1 space-y-1">
                <PanelTitle className="text-lg">
                {caseData.title}
              </PanelTitle>
                <div className="key-label">
                {caseData.desc}
              </div>
                <div className="value-primary text-sm pt-1">
                {caseData.metrics}
              </div>
                <div className="flex flex-wrap gap-2 pt-2">
                {caseData.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="tag-badge tag-badge-theme"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              </div>
              <ChevronRight className="w-5 h-5 mt-1 key-label" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
