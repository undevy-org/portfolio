// src/app/components/ui/Tabs.js
'use client';
import { useState, useEffect, useMemo } from 'react';
import { useSession } from '../../context/SessionContext';
import dynamic from 'next/dynamic';
import { Divider, CommandTitle } from '../../components/atoms';

// Lazy load the image component since not all tabs will have images
const TerminalImagePreview = dynamic(() => import('../TerminalImagePreview'), {
  loading: () => <div>Loading image...</div>
});

export default function Tabs({ tabs = [], defaultTab = null }) {
  const { addLog } = useSession();
  
  // Safely handle empty or invalid tabs
  const validTabs = useMemo(() => Array.isArray(tabs) ? tabs : [], [tabs]);
  const firstTabId = useMemo(() => validTabs.length > 0 ? validTabs[0].id : null, [validTabs]);
  
  // Determine initial active tab
  const initialActiveTab = defaultTab && validTabs.find(tab => tab.id === defaultTab) 
    ? defaultTab 
    : firstTabId;
    
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  // Update active tab when tabs prop changes and current activeTab is not valid
  useEffect(() => {
    if (!validTabs.find(tab => tab.id === activeTab) && firstTabId) {
      setActiveTab(firstTabId);
    }
  }, [tabs, activeTab, validTabs, firstTabId]);

  const handleTabClick = (tabId, tabLabel) => {
    setActiveTab(tabId);
    addLog(`TAB SELECTED: ${tabLabel}`);
  };

  const activeTabData = validTabs.find(tab => tab.id === activeTab);

  const renderContentItem = (item, idx) => {
    switch (item.type) {
      case 'text':
        return (
          <p key={idx} className="text-sm leading-relaxed text-secondary">
            {item.value}
          </p>
        );
      
      case 'list_item':
        return (
          <div key={idx} className="text-sm flex items-start">
            <span className="mr-2 text-success">[✓]</span>
            <span className="text-secondary">{item.value}</span>
          </div>
        );
      case 'sub_heading':
        return (
          <CommandTitle key={idx} text={item.value} level="h3" className="mb-2 mt-4" />
        );
      
      case 'divider':
        return (
          <Divider key={idx} spacing="my-3" />
        );
      
      case 'image':
        return (
          <div key={idx} className="my-4">
            <TerminalImagePreview 
              src={item.src}
              alt={item.alt || 'Case study image'}
              height={item.height || 250}
              aspectRatio={item.aspectRatio || '16/9'}
            />
          </div>
        );
      
      default:
        console.warn(`Unknown content type: ${item.type}`);
        return null;
    }
  };
  
  // Handle both array content and custom pre-rendered content
  const renderTabContent = () => {
    if (!activeTabData) return null;
    
    // Check if it's custom type with pre-rendered content (for future compatibility)
    if (activeTabData.type === 'custom' && !Array.isArray(activeTabData.content)) {
      return activeTabData.content;
    }
    
    // Default: render array of content items
    if (Array.isArray(activeTabData.content)) {
      return (
        <div className="space-y-2">
          {activeTabData.content.map(renderContentItem)}
        </div>
      );
    }
    return <div className="text-secondary">No content available</div>;
  };

  // Don't render anything if no valid tabs
  if (!validTabs.length) {
    return null;
  }

    return (
    <div>
      <div className="w-full overflow-x-auto">
        <div className="flex w-full border-b border-secondary">
          {validTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id, tab.label)}
              className={`text-center px-4 py-3 text-sm rounded-t transition-colors whitespace-nowrap -mb-px ${
                activeTab === tab.id
                  ? 'bg-active text-primary border-t border-x border-secondary'
                  : 'text-secondary bg-hover border-b-0'
              }`}
            >
              ${tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="-mt-px p-4 border rounded-b rounded-tr border-secondary">
        {activeTabData && (
          <>
            <CommandTitle text={activeTabData.title || activeTabData.label} level="h3" className="mb-3" />
            {renderTabContent()}
          </>
        )}
      </div>
    </div>
  );
}
