'use client';

import { useSession } from '../context/SessionContext';
import { UserCheck, Mail } from 'lucide-react';
import { CommandTitle } from '../components/atoms';
import { Panel, ListItem } from '../components/molecules';
import { StandardScreenTemplate } from '../components/templates';

export default function Introduction() {
  const { sessionData } = useSession();

  const profile = sessionData?.profile || {};
  const introText =
    sessionData?.introduction?.[sessionData?.meta?.tone] ||
    sessionData?.introduction?.formal ||
    'Welcome to my portfolio!';

return (
  <StandardScreenTemplate
    title="introduction"
    className="font-mono"
    headerData={{
      title: profile.summary?.title,
      specialization: profile.summary?.specialization,
      background: profile.summary?.background
    }}
    headerDataTitle="profile_data"
    navigationButtons={[
      {
        screen: 'Timeline',
        label: 'VIEW EXPERIENCE',
        icon: UserCheck,
        logMessage: 'NAVIGATE: experience timeline'
      },
      {
        screen: 'Contact',
        label: 'GET IN TOUCH',
        icon: Mail,
        logMessage: 'NAVIGATE: contact info'
      }
    ]}
  >
    <Panel>
      <CommandTitle text="about_me" level="h3" className="mb-2" />
      <p className={`text-sm leading-relaxed text-secondary`}>{introText}</p>
    </Panel>

    <Panel>
      <CommandTitle text="core_attributes" level="h3" className="mb-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
        {profile.attributes?.map((attr, index) => (
          <ListItem key={index} marker="✓" text={attr} />
        ))}
      </div>
    </Panel>
  </StandardScreenTemplate>
);
}
