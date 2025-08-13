'use client';

import { useSession } from '../context/SessionContext';
import { ChevronRight } from 'lucide-react';
import PanelTitle from '../components/ui/PanelTitle';

export default function SkillsGrid() {
  const { sessionData, navigate, addLog, setSelectedSkill } = useSession();

  const skills = sessionData?.skills || [];
  
  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    addLog(`SKILL SELECTED: ${skill.name}`);
    navigate('SkillDetail');
  };
  
  const getLevelColor = (level) => {
    switch(level) {
      case 'EXPERT':
        return 'text-light-success dark:text-dark-success';
      case 'ADVANCED':
        return 'value-primary';
      case 'INTERMEDIATE':
        return 'key-label';
      default:
        return 'key-label';
    }
  };
  
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {skills.map((skill) => (
          <button
            key={skill.id}
            onClick={() => handleSkillClick(skill)}
            className="p-4 border rounded text-left transition-colors flex justify-between items-start border-light-border-lighter hover:bg-light-hover dark:border-dark-border-darker dark:hover:bg-dark-hover"
          > 
            <div className="space-y-1">
              <PanelTitle>
                {skill.name}
              </PanelTitle>
              
              <div className="key-label">
                {skill.desc}
              </div>
              
              <div className={`text-sm pt-1 ${getLevelColor(skill.level)}`}>
                [{skill.level}]
              </div>
            </div>

            <ChevronRight className="w-5 h-5 key-label" />
          </button>
        ))}
      </div>
    </div>
  );
}