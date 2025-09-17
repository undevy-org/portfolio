// src/app/components/organisms/ResponsiveCardGrid.js
'use client';

import { Panel } from '../molecules';
import { CommandTitle, Tag } from '../atoms';
import { ChevronRight } from 'lucide-react';

export default function ResponsiveCardGrid({
  items = [],
  onItemClick,
  renderCard, // Optional custom render function
  columns = 'auto', // 'auto' | '1' | '2' | '3'
  className = ''
}) {
  if (items.length === 0) {
    return null;
  }

  const getGridClasses = () => {
    switch(columns) {
      case '1': return 'grid-cols-1';
      case '2': return 'grid-cols-1 md:grid-cols-2';
      case '3': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      default: return 'grid-cols-1'; // auto defaults to single column
    }
  };

  // Default card renderer
  const defaultRenderCard = (item) => (
    <>
      <div className="hidden md:flex justify-between items-start gap-x-3">
        <div className="space-y-1 flex-1">
          <CommandTitle text={item.title || item.name || item.company} level="h3" className="text-lg" />
          {item.desc && (
            <div className="text-sm text-secondary">{item.desc}</div>
          )}
          {item.role && (
            <div className="text-sm opacity-80 text-secondary">{item.role}</div>
          )}
          {item.metrics && (
            <div className="text-sm pt-1 text-primary">{item.metrics}</div>
          )}
          {item.highlight && (
            <div className="text-sm mt-1 text-primary">{item.highlight}</div>
          )}
          {item.period && (
            <div className="text-xs mt-1 text-secondary">
              {item.period} {item.duration && `• ${item.duration}`}
            </div>
          )}
          {item.tags && (
            <div className="flex flex-wrap gap-2 pt-2">
              {item.tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          )}
        </div>
        <ChevronRight className="w-5 h-5 mt-1 text-secondary" />
      </div>

      {/* Mobile layout */}
      <div className="md:hidden">
        <div className="space-y-1">
          <CommandTitle text={item.title || item.name || item.company} level="h3" className="text-lg" />
          {item.desc && (
            <div className="text-sm text-secondary">{item.desc}</div>
          )}
          {item.role && (
            <div className="text-sm opacity-80 text-secondary">{item.role}</div>
          )}
          {item.metrics && (
            <div className="text-sm pt-1 text-primary">{item.metrics}</div>
          )}
          {item.highlight && (
            <div className="text-sm mt-1 text-primary">{item.highlight}</div>
          )}
          {item.period && (
            <div className="text-xs mt-1 text-secondary">
              {item.period} {item.duration && `• ${item.duration}`}
            </div>
          )}
          {item.tags && (
            <div className="flex flex-wrap gap-2 pt-2">
              {item.tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          )}
        </div>
        <ChevronRight className="w-5 h-5 absolute bottom-4 right-4 text-secondary" />
      </div>
    </>
  );

  const cardRenderer = renderCard || defaultRenderCard;

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, index) => (
        <button
          key={item.id || index}
          onClick={() => onItemClick && onItemClick(item)}
          className="w-full text-left transition-colors"
        >
          <Panel className="bg-hover hover:border-primary cursor-pointer relative">
            {cardRenderer(item, index)}
          </Panel>
        </button>
      ))}
    </div>
  );
}
