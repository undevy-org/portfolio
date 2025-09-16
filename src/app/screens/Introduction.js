'use client';

import { useSession } from '../context/SessionContext';
import ScreenWrapper from '../components/ScreenWrapper';
import { UserCheck, Mail } from 'lucide-react';
import { CommandTitle } from '../components/atoms';
import { Panel, LabelValuePair, NavigationButton, ListItem } from '../components/molecules';

export default function Introduction() {
  const { sessionData } = useSession();

  const profile = sessionData?.profile || {};
  const introText =
    sessionData?.introduction?.[sessionData?.meta?.tone] ||
    sessionData?.introduction?.formal ||
    'Welcome to my portfolio!';

return (
  <ScreenWrapper className="font-mono">
      <Panel>
        <CommandTitle text="profile_data" level="h3" className="mb-2" />
        <div className="space-y-1">
          <LabelValuePair label="$title" value={profile.summary?.title} responsive />
          <LabelValuePair label="$specialization" value={profile.summary?.specialization} responsive />
          <LabelValuePair label="$background" value={profile.summary?.background} responsive />
        </div>
      </Panel>

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

    <div className="flex flex-col md:flex-row gap-3">
      <NavigationButton
        screen="Timeline"
        label="VIEW EXPERIENCE"
        icon={UserCheck}
        logMessage="NAVIGATE: experience timeline"
      />

      <NavigationButton
        screen="Contact"
        label="GET IN TOUCH"
        icon={Mail}
        logMessage="NAVIGATE: contact info"
      />
    </div>
  </ScreenWrapper>
);
}
