'use client';

import { CommandTitle, Tag, Divider } from '../atoms';
import { Panel, NavigationButton, ListItem } from '../molecules';
import { TerminalProgress } from '../ui';
import ScreenWrapper from '../ScreenWrapper';
import Tabs from '../ui/Tabs';
import Accordion from '../ui/Accordion';

/**
 * DetailViewTemplate
 *
 * Template for displaying detailed views of entities (cases, skills, roles).
 *
 * @param {Object} props
 * @param {'case'|'skill'|'role'} props.entityType - Entity type for styling hints
 * @param {string} props.title - Main title
 * @param {string} [props.subtitle] - Subtitle below main title
 * @param {Object} [props.metadata] - Key-value metadata object
 * @param {string[]} [props.tags] - Tags array
 * @param {Object} [props.proficiency] - Proficiency info with level and value
 * @param {Array} props.content - Content sections as [{label, content}]
 * @param {'tabs'|'accordion'|'sections'} [props.displayMode='sections'] - How to display content
 * @param {Function} props.onBack - Back navigation handler
 * @param {string} [props.backLabel='BACK'] - Back button label
 * @param {Array} [props.additionalButtons=[]] - Additional navigation buttons
 * @param {string} [props.className] - Additional CSS classes
 */
export default function DetailViewTemplate({
  entityType,
  title,
  subtitle,
  metadata,
  tags,
  proficiency,
  content,
  displayMode = 'sections',
  onBack,
  backLabel = 'BACK',
  additionalButtons = [],
  className
}) {
  // Render proficiency bar for skills
  const renderProficiencyBar = () => {
    if (!proficiency) return null;

    return (
      <div className="mb-4">
        <Divider />
        <CommandTitle text="proficiency_level" level="h3" className="text-base mb-2" />
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`w-5 h-5 border border-primary ${
                  level <= proficiency.value ? 'bg-primary' : ''
                }`}
              />
            ))}
          </div>
          <p className="text-lg text-primary">{proficiency.level}</p>
        </div>
        <Divider />
      </div>
    );
  };

  // Render content based on display mode
  const renderContent = () => {
    switch(displayMode) {
      case 'tabs':
        return (
          <Tabs
            tabs={content.map(section => ({
              id: section.label.toLowerCase(),
              label: section.label,
              title: section.label,
              content: section.content
            }))}
            defaultTab={content[0]?.label.toLowerCase()}
          />
        );

      case 'accordion':
        return (
          <Accordion
            sections={content.map(section => ({
              id: section.label.toLowerCase(),
              title: section.label,
              content: section.content
            }))}
            defaultExpanded={content[0]?.label.toLowerCase()}
          />
        );

      case 'sections':
      default:
        return content.map((section, idx) => (
          <Panel key={idx} className="mb-4">
            <CommandTitle text={section.label} level="h3" className="text-base mb-2" />
            {section.content}
          </Panel>
        ));
    }
  };

  // Render metadata as key-value pairs
  const renderMetadata = () => {
    if (!metadata) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-2">
        {Object.entries(metadata).map(([key, value]) => (
          <ListItem
            key={key}
            marker=""
            text={`${key.replace(/_/g, ' ')}: ${value}`}
            className="text-sm text-secondary"
          />
        ))}
      </div>
    );
  };

  return (
    <ScreenWrapper className={className}>
      <div className="space-y-4">
        {/* Header Panel */}
        <Panel>
          <CommandTitle text={title} level="h2" className="text-xl" />
          {subtitle && (
            <p className="text-base text-primary">{subtitle}</p>
          )}
          {renderMetadata()}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, idx) => (
                <Tag key={idx} text={tag} />
              ))}
            </div>
          )}
        </Panel>

        {/* Proficiency bar for skills */}
        {renderProficiencyBar()}

        {/* Main content */}
        {renderContent()}

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <NavigationButton
            screen=""
            label={backLabel}
            onClick={onBack}
            logMessage={`RETURN FROM ${entityType.toUpperCase()} DETAIL`}
          />

          {additionalButtons.length > 0 && (
            <div className="flex flex-col md:flex-row gap-3">
              {additionalButtons.map((button, idx) => (
                <NavigationButton
                  key={idx}
                  {...button}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </ScreenWrapper>
  );
}
