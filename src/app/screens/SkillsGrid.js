// src/app/screens/SkillsGrid.js

'use client';

import { useSession } from '../context/SessionContext';
import ScreenWrapper from '../components/ScreenWrapper';
import { ChevronRight } from 'lucide-react';
import { Panel } from '../components/molecules';

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
        return 'text-success'; // Use 'text-success' for the highest skill level.
      case 'ADVANCED':
        return 'text-primary'; // Use 'text-primary' for advanced skills.
      case 'INTERMEDIATE':
        return 'text-secondary'; // Use 'text-secondary' for intermediate skills.
      default:
        return 'text-secondary'; // Default to the secondary text color.
    }
  };
  
  return (
    <ScreenWrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {skills.map((skill) => (
          <button
            key={skill.id}
            onClick={() => handleSkillClick(skill)}
            className="w-full text-left transition-colors"
          >
            <Panel className="bg-hover hover:border-primary cursor-pointer">
              <div className="hidden md:flex justify-between items-start gap-x-3">
                <div className="space-y-1">
                  <div className="text-base text-command">
                    {skill.name}
                  </div>

                  <div className="text-sm text-secondary">
                    {skill.desc}
                  </div>

                  <div className={`text-sm pt-1 ${getLevelColor(skill.level)}`}>
                    [{skill.level}]
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 mt-1 text-secondary" />
              </div>
              <div className="md:hidden">
                <div className="space-y-1">
                  <div className="text-base text-command">
                    {skill.name}
                  </div>

                  <div className="text-sm text-secondary">
                    {skill.desc}
                  </div>

                  <div className={`text-sm pt-1 ${getLevelColor(skill.level)}`}>
                    [{skill.level}]
                  </div>
                  <ChevronRight className="w-5 h-5 absolute bottom-4 right-4 text-secondary" />
                </div>
              </div>
            </Panel>
          </button>
        ))}
      </div>
    </ScreenWrapper>
  );
}
