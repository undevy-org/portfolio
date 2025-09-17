// src/app/screens/SkillsGrid.js

'use client';

import { useSession } from '../context/SessionContext';
import ScreenWrapper from '../components/ScreenWrapper';
import { ResponsiveCardGrid } from '../components/organisms';

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

  // Custom render for skill cards
  const renderSkillCard = (skill) => (
    <>
      <div className="hidden md:flex justify-between items-start gap-x-3">
        <div className="space-y-1">
          <span className="text-base text-command">
            {skill.name}
          </span>
          <div className="text-sm text-secondary">
            {skill.desc}
          </div>
          <div className={`text-sm pt-1 ${getLevelColor(skill.level)}`}>
            [{skill.level}]
          </div>
        </div>
        <div className="w-5 h-5"><span>→</span></div>
      </div>
      <div className="md:hidden">
        <div className="space-y-1">
          <span className="text-base text-command">
            {skill.name}
          </span>
          <div className="text-sm text-secondary">
            {skill.desc}
          </div>
          <div className={`text-sm pt-1 ${getLevelColor(skill.level)}`}>
            [{skill.level}]
          </div>
          <div className="absolute bottom-4 right-4 text-secondary">→</div>
        </div>
      </div>
    </>
  );

  return (
    <ScreenWrapper>
      <ResponsiveCardGrid
        items={skills}
        onItemClick={handleSkillClick}
        renderCard={renderSkillCard}
        columns={2}
      />
    </ScreenWrapper>
  );
}
