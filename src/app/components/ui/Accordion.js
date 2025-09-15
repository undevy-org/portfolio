// src/app/components/ui/Accordion.js

'use client';
import { useState } from 'react';
import { useSession } from '../../context/SessionContext';
import { ChevronDown } from 'lucide-react';
import { Tag, CommandTitle } from '../../components/atoms';

export default function Accordion({ sections, defaultExpanded = null }) {
  const { addLog } = useSession();
  const [expandedSection, setExpandedSection] = useState(defaultExpanded);

  const toggleSection = (sectionId) => {
    const newState = expandedSection === sectionId ? null : sectionId;
    setExpandedSection(newState);
    addLog(`SECTION ${newState ? 'EXPANDED' : 'COLLAPSED'}: ${sectionId}`);
  };

  const renderContentItem = (item, idx) => {
    if (typeof item !== 'object' || item === null) {
      return <p key={idx} className="text-sm leading-relaxed text-secondary">{String(item)}</p>;
    }
    
    switch (item.type) {
      case 'list_item':
        return (
          <div key={idx} className="text-sm flex items-start">
            <span className="mr-2 text-success">[✓]</span>
            <span className="text-secondary">{item.value}</span>
          </div>
        );
      case 'tag_list':
         return (
          <div key={idx} className="flex flex-wrap gap-2 pt-2">
            {item.value.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        );
      case 'text':
      default:
        return <p key={idx} className="text-sm leading-relaxed text-secondary">{item.value}</p>;
    }
  };

  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <div key={section.id} className="border rounded border-secondary">
          <button
            onClick={() => toggleSection(section.id)}
            className={`w-full p-4 text-left flex justify-between items-center transition-colors bg-hover ${
              expandedSection === section.id ? 'border-b border-secondary' : ''
            }`}
          >
            <CommandTitle text={section.title} level="h3" />
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