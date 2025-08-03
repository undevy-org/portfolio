// src/app/screens/SkillDetail.js
'use client';

import { useSession } from '../context/SessionContext';
import Button from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function SkillDetail() {
  const { sessionData, theme, navigate, addLog, selectedSkill } = useSession();

  // REFACTORED: Centralized theme-based classes
  const panelClasses = `p-4 rounded border ${
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

  if (!selectedSkill) {
    // ... (error handling code remains the same)
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
  
  const PageButton = ({ onClick, icon: Icon, children }) => (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-2 p-2 rounded border transition-colors ${
        theme === 'dark' 
          ? 'border-dark-border text-dark-text-secondary hover:bg-dark-hover' 
          : 'border-light-border text-light-text-secondary hover:bg-light-hover'
      }`}
    >
      <Icon size={16} className={labelClasses} />
      <span>{children}</span>
    </button>
  );

  return (
    <div className="p-4 space-y-4">
      <div className={panelClasses}>
        {/* Top part: Skill Name and Description */}
        <div className="space-y-1">
          <h2 className={`text-xl ${yellowClasses}`}>{selectedSkill.name}</h2>
          <p className={`text-sm ${valueClasses}`}>{selectedSkill.desc}</p>
        </div>

        {/* MODIFIED: Divider is now darker */}
        <div className={`my-3 border-t ${theme === 'dark' ? 'border-dark-border-darker' : 'border-light-border-lighter'}`}></div>
        
        {/* Bottom part: Proficiency Level */}
        <div>
          <h3 className={`text-base mb-2 ${yellowClasses}`}>$proficiency_level</h3>
          {/* MODIFIED: Indicator squares are now to the left of the text */}
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
            <p className={`text-lg ${labelClasses}`}>{selectedSkill.level}</p>
          </div>
        </div>
      </div>
      <div className={panelClasses}>
        <h3 className={`text-base mb-2 ${yellowClasses}`}>$skill_overview</h3>
        <p className={`text-sm leading-relaxed ${valueClasses}`}>
          {skillDetails.description || 'No description available.'}
        </p>
      </div>

      {skillDetails.examples?.length > 0 && (
        <div className={panelClasses}>
          <h3 className={`text-base mb-2 ${yellowClasses}`}>$implementations</h3>
          <div className="space-y-1">
            {skillDetails.examples.map((example, idx) => (
              <div key={idx} className="text-sm flex items-start">
                <span className={`mr-2 ${yellowClasses}`}>[{idx + 1}]</span>
                <span className={valueClasses}>{example}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {skillDetails.tools?.length > 0 && (
        <div className={panelClasses}>
          <h3 className={`text-base mb-2 ${yellowClasses}`}>$related_tools</h3>
          <div className="flex flex-wrap gap-2">
            {skillDetails.tools.map((tool) => (
              <span key={tool} className={`px-2 py-0.5 border rounded text-xs ${
                theme === 'dark'
                  ? 'border-dark-border bg-gray-900 text-dark-text-secondary'
                  : 'border-light-border bg-gray-200 text-light-text-secondary'
              }`}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      {skillDetails.impact && (
        <div className={panelClasses}>
          <h3 className={`text-base mb-2 ${yellowClasses}`}>$business_impact</h3>
          <p className={`text-sm leading-relaxed ${valueClasses}`}>
            {skillDetails.impact}
          </p>
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