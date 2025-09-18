// src/app/screens/RoleDetail.js

'use client';

import { useSession } from '../context/SessionContext';
import { FolderGit2 } from 'lucide-react';
import { DetailViewTemplate } from '../components/templates';

export default function RoleDetail() {
  const { sessionData, navigate, addLog, selectedRole } = useSession();

  if (!selectedRole) {
    return (
      <div className="p-4 text-center text-secondary">
        <p>No role selected. Please go back to Timeline.</p>
        <button
          onClick={() => navigate('Timeline')}
          className="mt-4 px-4 py-2 rounded border border-primary text-white-black"
        >
          Back to Timeline
        </button>
      </div>
    );
  }

  const roleDetails = sessionData?.role_details?.[selectedRole.id] || {};

  // Prepare content sections for accordion
  const content = [
    {
      label: 'quick_summary',
      content: roleDetails.summary ? (
        <p className="text-sm text-secondary">{roleDetails.summary}</p>
      ) : (
        <p className="text-sm text-secondary">No summary available.</p>
      )
    },
    {
      label: 'key_responsibilities',
      content: roleDetails.responsibilities?.length > 0 ? (
        <div className="space-y-2">
          {roleDetails.responsibilities.map((responsibility, idx) => (
            <div key={idx} className="flex items-start">
              <span className="text-secondary mr-2">•</span>
              <p className="text-sm text-secondary">{responsibility}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-secondary">No responsibilities listed.</p>
      )
    },
    {
      label: 'main_achievements',
      content: roleDetails.achievements?.length > 0 ? (
        <div className="space-y-2">
          {roleDetails.achievements.map((achievement, idx) => (
            <div key={idx} className="flex items-start">
              <span className="text-secondary mr-2">•</span>
              <p className="text-sm text-secondary">{achievement}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-secondary">No achievements listed.</p>
      )
    },
    {
      label: 'tech_stack',
      content: roleDetails.tech?.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {roleDetails.tech.map((tech, idx) => (
            <span key={idx} className="px-2 py-1 bg-primary/20 rounded text-xs text-primary">
              {tech}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-secondary">No tech stack listed.</p>
      )
    }
  ];

  const additionalButtons = [
    {
      screen: 'CaseList',
      label: 'READ CASES',
      icon: FolderGit2,
      logMessage: 'NAVIGATE: case studies'
    }
  ];

  return (
    <DetailViewTemplate
      entityType="role"
      title={selectedRole.company}
      subtitle={selectedRole.role}
      metadata={{
        period: selectedRole.period,
        duration: selectedRole.duration
      }}
      content={content}
      displayMode="accordion"
      onBack={() => {
        addLog('RETURN TO TIMELINE');
        navigate('Timeline');
      }}
      backLabel="BACK TO TIMELINE"
      additionalButtons={additionalButtons}
    />
  );
}
