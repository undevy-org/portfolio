'use client';

import { useSession } from '../context/SessionContext';
import Button from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function SkillDetail() {
  const { sessionData, theme, navigate, addLog, selectedSkill } = useSession();

  const yellowClasses = `${
    theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
  }`;
  const successClasses = theme === 'dark' ? 'text-dark-success' : 'text-light-success';

  if (!selectedSkill) {
    return (
      <div className="p-4 text-center">
        <p className={valueClasses}>
          No skill selected. Please go back to Skills Grid.
        </p>
        <button
          onClick={() => navigate('SkillsGrid')}
          className={`mt-4 px-4 py-2 rounded border transition-colors ${
            theme === 'dark' 
              ? 'border-dark-border text-dark-text-secondary hover:bg-dark-hover' 
              : 'border-light-border text-light-text-secondary hover:bg-light-hover'
          }`}
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
      <div className="panel-base panel-theme">
        <div className="space-y-1">
          <h2 className={`text-xl ${yellowClasses}`}>{selectedSkill.name}</h2>
          <p className="key-label">{selectedSkill.desc}</p>
        </div>

        <div className={`my-3 border-t ${theme === 'dark' ? 'border-dark-border-darker' : 'border-light-border-lighter'}`}></div>
        
        <div>
          <h3 className="title-command">$proficiency_level</h3>
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-5 h-5 border ${theme === 'dark' ? 'border-dark-border' : 'border-light-border'} ${
                    level <= getLevelValue(selectedSkill.level)
                      ? (theme === 'dark' ? 'bg-dark-text-primary' : 'bg-light-text-primary')
                      : ''
                  }`}
                />
              ))}
            </div>
            <p className="value-primary text-lg">{selectedSkill.level}</p>
          </div>
        </div>
      </div>
      <div className="panel-base panel-theme">
        <h3 className="title-command">$skill_overview</h3>
        <p className="key-label leading-relaxed">
          {skillDetails.description || 'No description available.'}
        </p>
      </div>

      {skillDetails.examples?.length > 0 && (
        <div className="panel-base panel-theme">
          <h3 className="title-command">$implementations</h3>
          <div className="space-y-1">
            {skillDetails.examples.map((example, idx) => (
              <div key={idx} className="text-sm flex items-start">
                <span className="title-command mr-2">[{idx + 1}]</span>
                <span className="key-label">{example}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {skillDetails.impact && (
        <div className="panel-base panel-theme">
          <h3 className="title-command">$business_impact</h3>
          <div className="space-y-2">
            {Array.isArray(skillDetails.impact) ? (
              skillDetails.impact.map((item, idx) => (
                <div key={idx} className="text-sm flex items-start">
                  <span className={`mr-2 ${successClasses}`}>[✓]</span>
                  <span className="key-label">{item}</span>
                </div>
              ))
            ) : (
              <div className="text-sm flex items-start">
                <span className={`mr-2 ${successClasses}`}>[✓]</span>
                <span className="key-label">{skillDetails.impact}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {skillDetails.tools?.length > 0 && (
        <div className="panel-base panel-theme">
          <h3 className="title-command">$related_tools</h3>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
            {skillDetails.tools.map((tool) => (
              <span key={tool} className="key-label">
                [{tool}]
              </span>
            ))}
          </div>
        </div>
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