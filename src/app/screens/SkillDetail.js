// src/app/screens/SkillDetail.js
'use client';

import { useSession } from '../context/SessionContext';
import Button from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function SkillDetail() {
  const { sessionData, theme, navigate, addLog, selectedSkill } = useSession();
  
  if (!selectedSkill) {
    return (
      <div className="p-4 text-center">
        <p className={theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}>
          No skill selected. Please go back to Skills Grid.
        </p>
        <Button
          onClick={() => navigate('SkillsGrid')}
          icon={ArrowLeft}
          iconPosition="left"
          variant="inline"
          className="mt-4 px-4 py-2"
        >
          Back to Skills
        </Button>
      </div>
    );
  }
  
  const skillDetails = sessionData?.skill_details?.[selectedSkill.name] || {};
  
  return (
    <div className="p-4">
      <div className={`mb-4 ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
      }`}>
        <h2 className="text-2xl mb-2">{selectedSkill.name}</h2>
        <p className={`text-sm ${
          theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
        }`}>
          {selectedSkill.desc}
        </p>
      </div>
      
      <div className={`p-3 border rounded mb-3 ${
        theme === 'dark' ? 'border-dark-border' : 'border-light-border'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-xs mb-1 ${
              theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'
            }`}>
              $proficiency_level
            </div>
            <div className={`text-lg ${
              selectedSkill.level === 'EXPERT' 
                ? (theme === 'dark' ? 'text-gray-400' : 'text-gray-500')
                : selectedSkill.level === 'ADVANCED'
                ? (theme === 'dark' ? 'text-gray-300' : 'text-gray-700')
                : (theme === 'dark' ? 'text-gray-500' : 'text-gray-500')
            }`}>
              {selectedSkill.level}
            </div>
          </div>
          
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`w-4 h-4 border ${
                  theme === 'dark' ? 'border-dark-border' : 'border-light-border'
                } ${
                  (selectedSkill.level === 'EXPERT' && level <= 5) ||
                  (selectedSkill.level === 'ADVANCED' && level <= 4) ||
                  (selectedSkill.level === 'INTERMEDIATE' && level <= 3)
                    ? (theme === 'dark' ? 'bg-gray-400' : 'bg-gray-500')
                    : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className={`p-3 border rounded mb-3 ${
        theme === 'dark' ? 'border-dark-border' : 'border-light-border'
      }`}>
        <h3 className={`text-base mb-2 ${
          theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'
        }`}>
          $skill_overview
        </h3>
        <p className={`text-sm ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {skillDetails.description || 'No description available.'}
        </p>
      </div>
      
      {skillDetails.examples && skillDetails.examples.length > 0 && (
        <div className={`p-3 border rounded mb-3 ${
          theme === 'dark' ? 'border-dark-border' : 'border-light-border'
        }`}>
          <h3 className={`text-base mb-2 ${
            theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'
          }`}>
            $implementations
          </h3>
          <div className="space-y-1">
            {skillDetails.examples.map((example, idx) => (
              <div
                key={idx}
                className={`text-sm flex items-start ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <span className={`mr-2 ${
                  theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'
                }`}>
                  [{idx + 1}]
                </span>
                <span>{example}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {skillDetails.tools && skillDetails.tools.length > 0 && (
        <div className={`p-3 border rounded mb-3 ${
          theme === 'dark' ? 'border-dark-border' : 'border-light-border'
        }`}>
          <h3 className={`text-base mb-2 ${
            theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'
          }`}>
            $related_tools
          </h3>
          <div className="flex flex-wrap gap-2">
            {skillDetails.tools.map((tool) => (
              <span
                key={tool}
                className={`px-2 py-1 border rounded text-xs ${
                  theme === 'dark'
                    ? 'border-dark-border text-gray-300'
                    : 'border-light-border text-gray-700'
                }`}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {skillDetails.impact && (
        <div className={`p-3 border rounded mb-3 ${
          theme === 'dark' ? 'border-dark-border' : 'border-light-border'
        }`}>
          <h3 className={`text-base mb-2 ${
            theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'
          }`}>
            $business_impact
          </h3>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
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
