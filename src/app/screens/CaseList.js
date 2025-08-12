'use client';

import { useSession } from '../context/SessionContext';
import { ChevronRight } from 'lucide-react';

export default function CaseList() {
  const { sessionData, theme, navigate, addLog, setSelectedCase } = useSession();

  const panelClasses = `p-3 border rounded ${
    theme === 'dark' ? 'border-dark-border-darker' : 'border-light-border-lighter'
  }`;
  const yellowClasses = `${
    theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
  }`;
  const labelClasses = `${
    theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'
  }`;
  const valueClasses = `${
    theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
  }`;
  const successClasses = `${
    theme === 'dark' ? 'text-dark-success' : 'text-light-success'
  }`;

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
      <div className={`mb-4 ${panelClasses}`}>
        <div className={`text-base mb-2 ${yellowClasses}`}>$loading_cases</div>
        <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className={labelClasses}>[</span>
            {Array.from({ length: caseIds.length }, (_, i) => (
              <span key={`loaded-${i}`} className={successClasses}>■</span>
            ))}
            {Array.from({ length: totalCasesCount - caseIds.length }, (_, i) => (
              <span key={`empty-${i}`} className={valueClasses}>□</span>
            ))}
            <span className={labelClasses}>]</span>
          </div>
          <div className={`${valueClasses} whitespace-nowrap`}>
              {caseIds.length}/{totalCasesCount} loaded for {sessionData?.meta?.company || 'session'}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {caseIds.map((caseId) => {
          const caseData = cases[caseId];
          return (
            <button
              key={caseId}
              onClick={() => handleCaseClick(caseId, caseData)}
              className={`w-full p-4 border rounded text-left transition-colors flex items-start gap-4 ${
                theme === 'dark'
                  ? 'border-dark-border-darker hover:bg-dark-hover'
                  : 'border-light-border-lighter hover:bg-light-hover'
              }`}
            >
              <div className="flex-1 space-y-1">
                <div className={`text-lg ${yellowClasses}`}>
                {caseData.title}
              </div>
                <div className={`text-sm ${valueClasses}`}>
                {caseData.desc}
              </div>
                <div className={`text-sm pt-1 ${labelClasses}`}>
                {caseData.metrics}
              </div>
                <div className="flex flex-wrap gap-2 pt-2">
                {caseData.tags?.map((tag) => (
                  <span
                    key={tag}
                      className={`px-2 py-0.5 border rounded text-xs ${
                      theme === 'dark'
                          ? 'border-dark-border-darker bg-gray-900 text-dark-text-secondary'
                          : 'border-light-border-lighter bg-gray-50 text-light-text-secondary'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              </div>
              <ChevronRight className={`w-5 h-5 mt-1 ${valueClasses}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
