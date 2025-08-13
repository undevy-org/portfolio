'use client';

import { useSession } from '../context/SessionContext';
import Button from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import Panel from '../components/ui/Panel';
import PanelTitle from '../components/ui/PanelTitle';

export default function SkillDetail() {
  const { sessionData, navigate, addLog, selectedSkill } = useSession();

  if (!selectedSkill) {
    return (
      <div className="p-4 text-center">
        <p className="key-label">
          No skill selected. Please go back to Skills Grid.
        </p>
        <button
          onClick={() => navigate('SkillsGrid')}
          className="mt-4 px-4 py-2 rounded border transition-colors border-light-border text-light-text-secondary hover:bg-light-hover dark:border-dark-border dark:text-dark-text-secondary dark:hover:bg-dark-hover"
        >
          Back to Skills
        </button>
      </div>
    );
  }

  const skillDetails = sessionData?.skill_details?.[selectedSkill.name] || {};

  const getLevelValue = (level) => {
    switch (level) {
      case 'EXPERT': return 5;
      case 'ADVANCED': return 4;
      case 'INTERMEDIATE': return 3;
      default: return 0;
    }
  };
  
  return (
    <div className="p-4 space-y-4">
      <Panel>
        <div className="space-y-1">
          <PanelTitle className="text-xl">{selectedSkill.name}</PanelTitle>
          <p className="key-label">{selectedSkill.desc}</p>
        </div>

        <div className="my-3 border-t border-light-border-lighter dark:border-dark-border-darker"></div>
        
        <div>
          <PanelTitle>$proficiency_level</PanelTitle>
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-5 h-5 border border-light-border dark:border-dark-border ${
                    level <= getLevelValue(selectedSkill.level)
                      ? 'bg-light-text-primary dark:bg-dark-text-primary'
                      : ''
                  }`}
                />
              ))}
            </div>
            <p className="value-primary text-lg">{selectedSkill.level}</p>
          </div>
        </div>
      </Panel>
      <Panel>
        <PanelTitle>$skill_overview</PanelTitle>
        <p className="key-label leading-relaxed">
          {skillDetails.description || 'No description available.'}
        </p>
      </Panel>

      {skillDetails.examples?.length > 0 && (
        <Panel>
          <PanelTitle>$implementations</PanelTitle>
          <div className="space-y-1">
            {skillDetails.examples.map((example, idx) => (
              <div key={idx} className="text-sm flex items-start">
                <PanelTitle className="mr-2">[{idx + 1}]</PanelTitle>
                <span className="key-label">{example}</span>
              </div>
            ))}
          </div>
        </Panel>
      )}

      {skillDetails.impact && (
        <Panel>
          <PanelTitle>$business_impact</PanelTitle>
          <div className="space-y-2">
            {Array.isArray(skillDetails.impact) ? (
              skillDetails.impact.map((item, idx) => (
                <div key={idx} className="text-sm flex items-start">
                  <span className="mr-2 text-light-success dark:text-dark-success">[✓]</span>
                  <span className="key-label">{item}</span>
                </div>
              ))
            ) : (
              <div className="text-sm flex items-start">
                <span className="mr-2 text-light-success dark:text-dark-success">[✓]</span>
                <span className="key-label">{skillDetails.impact}</span>
              </div>
            )}
          </div>
        </Panel>
      )}

      {skillDetails.tools?.length > 0 && (
        <Panel>
          <PanelTitle>$related_tools</PanelTitle>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
            {skillDetails.tools.map((tool) => (
              <span key={tool} className="key-label">
                [{tool}]
              </span>
            ))}
          </div>
        </Panel>
      )}

      <Button
        onClick={() => {
          addLog('RETURN TO SKILLS GRID');
          navigate('SkillsGrid');
        }}
        icon={ArrowLeft}
        iconPosition="left"
        variant="full"
        className="p-2"
      >
        BACK TO SKILLS
      </Button>
    </div>
  );
}