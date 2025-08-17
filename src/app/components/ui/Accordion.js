// src/app/components/ui/Accordion.js

'use client';
import { useState } from 'react';
import { useSession } from '../../context/SessionContext';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ sections, defaultExpanded = null }) {
  // REMOVED: The 'theme' variable is no longer necessary for styling.
  // The component will now rely entirely on semantic CSS classes from globals.css.
  const { addLog } = useSession();
  const [expandedSection, setExpandedSection] = useState(defaultExpanded);

  const toggleSection = (sectionId) => {
    const newState = expandedSection === sectionId ? null : sectionId;
    setExpandedSection(newState);
    addLog(`SECTION ${newState ? 'EXPANDED' : 'COLLAPSED'}: ${sectionId}`);
  };

  // REMOVED: All intermediate class name variables are now obsolete.
  // We apply semantic classes directly in the JSX for better readability and maintainability.

  const renderContentItem = (item, idx) => {
    if (typeof item !== 'object' || item === null) {
      // CHANGE: Directly applied the '.text-secondary' semantic class.
      return <p key={idx} className="text-sm leading-relaxed text-secondary">{String(item)}</p>;
    }
    
    switch (item.type) {
      case 'list_item':
        return (
          <div key={idx} className="text-sm flex items-start">
            {/* CHANGE: Directly applied the '.text-success' semantic class. */}
            <span className="mr-2 text-success">[✓]</span>
            {/* CHANGE: Directly applied the '.text-secondary' semantic class. */}
            <span className="text-secondary">{item.value}</span>
          </div>
        );
      case 'tag_list':
         return (
          <div key={idx} className="flex flex-wrap gap-2 pt-2">
            {item.value.map((tag) => (
              // CHANGE: Replaced the final piece of theme-dependent logic with semantic classes.
              // '.tag-badge' provides the basic structure (padding, border, etc.).
              // '.border-secondary' and '.text-secondary' provide the theme-aware colors.
              // '.bg-main' gives it a solid background that matches the panel, improving contrast.
              // This change fixes the hydration error.
              <span key={tag} className="tag-badge border-secondary text-secondary bg-main">
                {tag}
              </span>
            ))}
          </div>
        );
      case 'text':
      default:
        // CHANGE: Directly applied the '.text-secondary' semantic class.
        return <p key={idx} className="text-sm leading-relaxed text-secondary">{item.value}</p>;
    }
  };

  return (
    <div className="space-y-3">
      {sections.map((section) => (
        // CHANGE: Directly applied the '.border-secondary' semantic class.
        <div key={section.id} className="border rounded border-secondary">
          <button
            onClick={() => toggleSection(section.id)}
            // CHANGE: Applied semantic classes '.bg-hover' and '.border-secondary' for consistent styling.
            className={`w-full p-4 text-left flex justify-between items-center transition-colors bg-hover ${
              expandedSection === section.id ? 'border-b border-secondary' : ''
            }`}
          >
            {/* CHANGE: Directly applied the '.text-command' semantic class. */}
            <h3 className="text-command">${section.title}</h3>
            {/* COMMENT: The Chevron icon's color will be inherited from the parent's text color, so no explicit class is needed. */}
            <ChevronDown className={`w-5 h-5 transform transition-transform ${expandedSection === section.id ? 'rotate-180' : ''}`} />
          </button>

          {expandedSection === section.id && (
            <div className="p-4 space-y-2">
              {Array.isArray(section.content)
                ? section.content.map(renderContentItem)
                : renderContentItem(section.content, 0)
              }
            </div>
          )}
        </div>
      ))}
    </div>
  );
}