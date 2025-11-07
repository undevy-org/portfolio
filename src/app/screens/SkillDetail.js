// src/app/screens/SkillDetail.js
'use client';

import { useSession } from '../context/SessionContext';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function SkillDetail() {
  const { sessionData, navigate, addLog, selectedSkill } = useSession();

  if (!selectedSkill) {
    return (
      <div className="p-4 text-center">
        <p className="text-secondary">
          No skill selected. Please go back to Skills Grid.
        </p>
        <button
          onClick={() => navigate('SkillsGrid')}
          className="mt-4 btn-command"
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
    <ScreenWrapper>
      <div className="p-4 rounded border border-secondary">
        <div className="space-y-1">
          <h2 className="text-xl text-command">{selectedSkill.name}</h2>
          <p className="text-sm text-secondary">{selectedSkill.desc}</p>
        </div>

        <div className="my-3 border-t border-secondary"></div>
        
        <div>
          <h3 className="text-base mb-2 text-command">$proficiency_level</h3>
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-5 h-5 border border-primary ${
                    level <= getLevelValue(selectedSkill.level)
                      ? 'bg-primary'
                      : ''
                  }`}
                />
              ))}
            </div>
            <p className="text-lg text-primary">{selectedSkill.level}</p>
          </div>
        </div>
      </div>
      <div className="p-4 rounded border border-secondary">
        <h3 className="text-base mb-2 text-command">$skill_overview</h3>
        <p className="text-sm leading-relaxed text-secondary">
          {skillDetails.description || 'No description available.'}
        </p>
      </div>

      {skillDetails.examples?.length > 0 && (
        <div className="p-4 rounded border border-secondary">
          <h3 className="text-base mb-2 text-command">$implementations</h3>
          <div className="space-y-1">
            {skillDetails.examples.map((example, idx) => (
              <div key={idx} className="text-sm flex items-start">
                <span className="mr-2 text-command">[{idx + 1}]</span>
                <span className="text-secondary">{example}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {skillDetails.impact && (
        <div className="p-4 rounded border border-secondary">
          <h3 className="text-base mb-2 text-command">$business_impact</h3>
          <div className="space-y-2">
            {Array.isArray(skillDetails.impact) ? (
              skillDetails.impact.map((item, idx) => (
                <div key={idx} className="text-sm flex items-start">
                  <span className="mr-2 text-success">[✓]</span>
                  <span className="text-secondary">{item}</span>
                </div>
              ))
            ) : (
              <div className="text-sm flex items-start">
                <span className="mr-2 text-success">[✓]</span>
                <span className="text-secondary">{skillDetails.impact}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {skillDetails.tools?.length > 0 && (
        <div className="p-4 rounded border border-secondary">
          <h3 className="text-base mb-2 text-command">$related_tools</h3>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
            {skillDetails.tools.map((tool) => (
              <span key={tool} className="text-secondary">
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
    </ScreenWrapper>
  );
}