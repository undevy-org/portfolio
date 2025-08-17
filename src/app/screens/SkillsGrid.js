'use client';

import { useSession } from '../context/SessionContext';
import { ChevronRight } from 'lucide-react';

export default function SkillsGrid() {
  const { sessionData, theme, navigate, addLog, setSelectedSkill } = useSession();

  const panelClasses = `p-4 rounded border ${
    "border-secondary"
  }`;
  const yellowClasses = `${
    "text-command"
  }`;
  const labelClasses = `${
    "text-primary"
  }`;
  const valueClasses = `${
    "text-secondary"
  }`;
  const successClasses = `${
    "text-success"
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
              "border-secondary bg-hover"
            }`}
          > 
            <div className="space-y-1">
              <div className={`text-base text-command`}>
                {skill.name}
              </div>
              
              <div className={`text-sm text-secondary`}>
                {skill.desc}
              </div>
              
              <div className={`text-sm pt-1 ${getLevelColor(skill.level)}`}>
                [{skill.level}]
              </div>
            </div>

            <ChevronRight className={`w-5 h-5 text-secondary`} />
          </button>
        ))}
      </div>
    </div>
  );
}