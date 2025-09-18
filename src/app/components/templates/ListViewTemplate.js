'use client';

import { CommandTitle } from '../atoms';
import { Panel, NavigationButton } from '../molecules';
import { TerminalProgress } from '../ui/TerminalProgress';
import { ResponsiveCardGrid } from '../organisms';
import ScreenWrapper from '../ScreenWrapper';

/**
 * ListViewTemplate
 *
 * Template for displaying lists and collections of items.
 *
 * @param {Object} props
 * @param {string} [props.title] - Optional title
 * @param {Array} props.items - Array of items to display
 * @param {Function} [props.onItemClick] - Click handler for items
 * @param {Function} [props.renderCard] - Custom card renderer
 * @param {Object} [props.accessLevel] - Access level info {current, max, percentage, label}
 * @param {boolean} [props.showProgress=true] - Show progress bar with access level
 * @param {Array} [props.filters] - Future filter configuration
 * @param {ReactNode} [props.emptyState] - Component to show when no items
 * @param {Array} [props.navigationButtons=[]] - Bottom navigation buttons
 * @param {'menu'|'list'} [props.variant='list'] - Visual variant (menu for MainHub)
 * @param {string} [props.className] - Additional CSS classes
 */
export default function ListViewTemplate({
  title,
  items,
  onItemClick,
  renderCard,
  accessLevel,
  showProgress = true,
  filters,
  emptyState,
  navigationButtons = [],
  variant = 'list',
  className
}) {
  // Render access level panel (for CaseList)
  const renderAccessPanel = () => {
    if (!accessLevel) return null;

    return (
      <Panel className="mb-4">
        <div className="mb-3 text-primary">
          <span className="text-sm text-command">Access Level: </span>
          <span className="text-sm text-success">{accessLevel.current} of {accessLevel.max}</span>
          {accessLevel.label && (
            <span className="text-sm ml-2 text-secondary">
              ({accessLevel.label})
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="mb-2">
          <TerminalProgress
            progress={accessLevel.percentage}
            isLoading={showProgress}
            label={`${accessLevel.percentage}% available`}
            showPercentage={true}
            animateProgress={true}
            height="h-3"
          />
        </div>

        {/* Next level hint */}
        {accessLevel.nextLevel && (
          <div className="text-xs mt-2 text-secondary">
            <span className="opacity-75">
              Unlock {accessLevel.casesNeeded || accessLevel.nextLevel.requirement} more cases to reach {accessLevel.nextLevel.label} level
            </span>
          </div>
        )}

        {/* Max level achievement */}
        {accessLevel.isMaxLevel && (
          <div className="text-xs mt-2 text-success">
            <span>✓ Maximum access level achieved</span>
          </div>
        )}
      </Panel>
    );
  };

  // Default render card (for standard list items)
  const defaultRenderCard = (item, index) => (
    <>
      <div className="hidden md:flex justify-between items-start gap-x-3">
        <div className="space-y-1">
          <span className="text-base text-command">
            {item.title}
          </span>
          <div className="text-sm text-secondary">
            {item.desc}
          </div>
          <div className={`text-sm pt-1 ${item.level ? 'text-success' : 'text-secondary'}`}>
            {item.metrics || item.period || ''}
          </div>
        </div>
        <div className="w-5 h-5"><span>→</span></div>
      </div>
      <div className="md:hidden">
        <div className="space-y-1">
          <span className="text-base text-command">
            {item.title}
          </span>
          <div className="text-sm text-secondary">
            {item.desc}
          </div>
          <div className={`text-sm pt-1 ${item.level ? 'text-success' : 'text-secondary'}`}>
            {item.metrics || item.period || ''}
          </div>
          <div className="absolute bottom-4 right-4 text-secondary">→</div>
        </div>
      </div>
    </>
  );

  // Menu variant card renderer for MainHub
  const menuRenderCard = (item, index) => (
    <>
      <div className="hidden md:flex items-center gap-4">
        <span className="text-base text-command">
          {item.icon}
        </span>
        <div className="flex-1">
          <CommandTitle text={item.label} level="h3" className="text-base" />
          <div className="text-xs mt-1 text-secondary">
            {item.desc}
          </div>
        </div>
        <span className="text-lg text-secondary">›</span>
      </div>

      <div className="md:hidden">
        <div className="flex items-center gap-4">
          <span className="text-base text-command">
            {item.icon}
          </span>
          <div className="flex-1">
            <CommandTitle text={item.label} level="h3" className="text-base" />
            <div className="text-xs mt-1 text-secondary">
              {item.desc}
            </div>
          </div>
          <span className="text-lg text-secondary">›</span>
        </div>
      </div>
    </>
  );

  return (
    <ScreenWrapper className={className}>
      <div className="space-y-4">
        {/* Optional title */}
        {title && (
          <CommandTitle text={title} level="h1" className="text-2xl" />
        )}

        {/* Access level panel */}
        {renderAccessPanel()}

        {/* Items grid */}
        {items && items.length > 0 ? (
          renderCard ? (
            // Custom renderCard - render items directly without button wrappers
            <div className="space-y-3">
              {items.map((item, index) =>
                renderCard(item, index)
              )}
            </div>
          ) : (
            // Default ResponsiveCardGrid with button wrappers
            <div className="space-y-3">
              {items.map((item, index) => (
                <button
                  key={item.id || index}
                  onClick={() => onItemClick && onItemClick(item)}
                  className="w-full text-left transition-colors"
                >
                  <Panel className="bg-hover hover:border-primary cursor-pointer relative">
                    {(variant === 'menu' ? menuRenderCard : defaultRenderCard)(item, index)}
                  </Panel>
                </button>
              ))}
            </div>
          )
        ) : (
          emptyState || (
            <Panel>
              <p className="text-center text-secondary">No items available.</p>
            </Panel>
          )
        )}

        {/* Navigation buttons */}
        {navigationButtons.length > 0 && (
          <div className="flex flex-col md:flex-row gap-3">
            {navigationButtons.map((button, idx) => (
              <NavigationButton
                key={idx}
                {...button}
              />
            ))}
          </div>
        )}
      </div>
    </ScreenWrapper>
  );
}
