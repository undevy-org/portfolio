'use client';

import { CommandTitle } from '../atoms';
import { ProfileDataGrid, NavigationPanel } from '../organisms';
import ScreenWrapper from '../ScreenWrapper';

/**
 * StandardScreenTemplate
 *
 * Purpose: Unified template for all standard content screens
 *
 * Composition:
 * - Uses: ScreenWrapper, CommandTitle, Panel, NavigationPanel, ProfileDataGrid
 *
 * Usage:
 * ```jsx
 * <StandardScreenTemplate
 *   title="Example Screen"
 *   subtitle="Optional subtitle"
 *   navigationButtons={[...]}
 * >
 *   <YourContent />
 * </StandardScreenTemplate>
 * ```
 *
 * @param {Object} props
 * @param {string} [props.title] - Main screen title
 * @param {string} [props.subtitle] - Optional subtitle (future use)
 * @param {Object} [props.headerData] - Data for ProfileDataGrid
 * @param {string} [props.headerDataTitle] - Title for ProfileDataGrid (default: "data")
 * @param {boolean} [props.headerDataBeforeChildren] - Position headerData before or after children
 * @param {ReactNode} props.children - Main content
 * @param {Array} [props.navigationButtons] - Navigation button configs
 * @param {boolean} [props.showBreadcrumbs] - Future enhancement
 * @param {string} [props.className] - Additional CSS classes
 */
export default function StandardScreenTemplate({
  title,
  subtitle,
  headerData,
  headerDataTitle = "data",
  headerDataBeforeChildren = true,
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

        {headerData && headerDataBeforeChildren && (
          <ProfileDataGrid
            title={headerDataTitle}
            data={headerData}
            responsive
          />
        )}

        {children}

        {headerData && !headerDataBeforeChildren && (
          <ProfileDataGrid
            title={headerDataTitle}
            data={headerData}
            responsive
          />
        )}

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
