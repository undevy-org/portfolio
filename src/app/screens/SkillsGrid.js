'use client';

import { useSession } from '../context/SessionContext';
import { ChevronRight } from 'lucide-react';

export default function SkillsGrid() {
  const { sessionData, theme, navigate, addLog, setSelectedSkill } = useSession();

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
  const successClasses = `${
    theme === 'dark' ? 'text-dark-success' : 'text-light-success'
  }`;

  const skills = sessionData?.skills || [];
  
  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    addLog(`SKILL SELECTED: ${skill.name}`);
    navigate('SkillDetail');
  };
  
  const getLevelColor = (level) => {
    switch(level) {
      case 'EXPERT':
        return successClasses; // Brightest green for expert
      case 'ADVANCED':
        return labelClasses; // Standard green
      case 'INTERMEDIATE':
        return valueClasses; // Gray for intermediate
      default:
        return valueClasses;
    }
  };
  
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {skills.map((skill) => (
          <button
            key={skill.id}
            onClick={() => handleSkillClick(skill)}
            className={`p-4 border rounded text-left transition-colors flex justify-between items-start ${
              theme === 'dark'
                ? 'border-dark-border-darker hover:bg-dark-hover'
                : 'border-light-border-lighter hover:bg-light-hover'
            }`}
          > 
            <div className="space-y-1">
              <div className={`text-base ${yellowClasses}`}>
                {skill.name}
              </div>
              
              <div className={`text-sm ${valueClasses}`}>
                {skill.desc}
              </div>
              
              <div className={`text-sm pt-1 ${getLevelColor(skill.level)}`}>
                [{skill.level}]
              </div>
            </div>

            <ChevronRight className={`w-5 h-5 ${valueClasses}`} />
          </button>
        ))}
      </div>
    </div>
  );
}