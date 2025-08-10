// src/app/components/ui/Accordion.js
'use client';
import { useState } from 'react';
import { useSession } from '../../context/SessionContext';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ sections, defaultExpanded = null }) {
  const { theme, addLog } = useSession();
  const [expandedSection, setExpandedSection] = useState(defaultExpanded);

  const toggleSection = (sectionId) => {
    const newState = expandedSection === sectionId ? null : sectionId;
    setExpandedSection(newState);
    addLog(`SECTION ${newState ? 'EXPANDED' : 'COLLAPSED'}: ${sectionId}`);
  };

  const labelClasses = theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary';
  const valueClasses = theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary';
  const yellowClasses = theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command';
  const successClasses = theme === 'dark' ? 'text-dark-success' : 'text-light-success';
  const darkerBorder = theme === 'dark' ? 'border-dark-border-darker' : 'border-light-border-lighter';
  const hoverBg = theme === 'dark' ? 'hover:bg-dark-hover' : 'hover:bg-light-hover';

  const renderContentItem = (item, idx) => {
    if (typeof item !== 'object' || item === null) {
      return <p key={idx} className={`text-sm leading-relaxed ${valueClasses}`}>{String(item)}</p>;
    }
    
    switch (item.type) {
      case 'list_item':
        return (
          <div key={idx} className="text-sm flex items-start">
            <span className={`mr-2 ${successClasses}`}>[✓]</span>
            <span className={valueClasses}>{item.value}</span>
          </div>
        );
      case 'tag_list':
         return (
          <div key={idx} className="flex flex-wrap gap-2 pt-2">
            {item.value.map((tag) => (
              <span key={tag} className={`px-2 py-0.5 border rounded text-xs ${
                theme === 'dark' ? 'border-dark-border-darker bg-gray-900 text-dark-text-secondary' : 'border-light-border-lighter bg-gray-50 text-light-text-secondary'
              }`}>
                {tag}
              </span>
            ))}
          </div>
        );
      case 'text':
      default:
        return <p key={idx} className={`text-sm leading-relaxed ${valueClasses}`}>{item.value}</p>;
    }
  };

  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <div key={section.id} className={`border rounded ${darkerBorder}`}>
          <button
            onClick={() => toggleSection(section.id)}
            className={`w-full p-4 text-left flex justify-between items-center transition-colors ${hoverBg} ${
              expandedSection === section.id ? `border-b ${darkerBorder}` : ''
            }`}
          >
            <h3 className={yellowClasses}>${section.title}</h3>
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