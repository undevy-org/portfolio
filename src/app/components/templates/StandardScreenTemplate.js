'use client';

import { CommandTitle } from '../atoms';
import { ProfileDataGrid, NavigationPanel } from '../organisms';
import ScreenWrapper from '../ScreenWrapper';

export default function StandardScreenTemplate({
  title,
  subtitle,
  headerData,
  children,
  navigationButtons,
  showBreadcrumbs,
  className
}) {
  return (
    <ScreenWrapper className={className}>
      <div className="space-y-4">
        {title && (
          <CommandTitle text={title} level="h2" />
        )}

        {headerData && (
          <ProfileDataGrid
            title="profile_data"
            data={headerData}
            responsive
          />
        )}

        {children}

        {navigationButtons && (
          <NavigationPanel
            buttons={navigationButtons}
            layout="row"
          />
        )}
      </div>
    </ScreenWrapper>
  );
}
