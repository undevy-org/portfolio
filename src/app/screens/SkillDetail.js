// src/app/screens/SkillDetail.js
'use client';

import { useSession } from '../context/SessionContext';
import { DetailViewTemplate } from '../components/templates';

export default function SkillDetail() {
  const { sessionData, navigate, addLog, selectedSkill } = useSession();

  if (!selectedSkill) {
    return (
      <div className="p-4 text-center text-secondary">
        <p>No skill selected. Please go back to Skills Grid.</p>
        <button
          onClick={() => navigate('SkillsGrid')}
          className="mt-4 px-4 py-2 rounded border border-primary text-white-black"
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

  // Prepare content sections
  const content = [];

  // Skill overview
  content.push({
    label: 'skill_overview',
    content: (
      <p className="text-sm leading-relaxed text-secondary">
        {skillDetails.description || 'No description available.'}
      </p>
    )
  });

  // Implementations
  if (skillDetails.examples?.length > 0) {
    content.push({
      label: 'implementations',
      content: (
        <div className="space-y-1">
          {skillDetails.examples.map((example, idx) => (
            <div key={idx} className="flex items-start">
              <span className="text-secondary mr-2">[{idx + 1}]</span>
              <p className="text-sm text-secondary">{example}</p>
            </div>
          ))}
        </div>
      )
    });
  }

  // Business impact
  if (skillDetails.impact) {
    content.push({
      label: 'business_impact',
      content: (
        <div className="space-y-2">
          {Array.isArray(skillDetails.impact) ? (
            skillDetails.impact.map((item, idx) => (
              <div key={idx} className="flex items-start">
                <span className="text-secondary mr-2">✓</span>
                <p className="text-sm text-secondary">{item}</p>
              </div>
            ))
          ) : (
            <div className="flex items-start">
              <span className="text-secondary mr-2">✓</span>
              <p className="text-sm text-secondary">{skillDetails.impact}</p>
            </div>
          )}
        </div>
      )
    });
  }

  // Related tools
  if (skillDetails.tools?.length > 0) {
    content.push({
      label: 'related_tools',
      content: (
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
          {skillDetails.tools.map((tool) => (
            <span key={tool} className="text-secondary">
              [{tool}]
            </span>
          ))}
        </div>
      )
    });
  }

  return (
    <DetailViewTemplate
      entityType="skill"
      title={selectedSkill.name}
      subtitle={selectedSkill.desc}
      proficiency={{
        level: selectedSkill.level,
        value: getLevelValue(selectedSkill.level)
      }}
      content={content}
      displayMode="sections"
      onBack={() => {
        addLog('RETURN TO SKILLS GRID');
        navigate('SkillsGrid');
      }}
      backLabel="BACK TO SKILLS"
    />
  );
}
