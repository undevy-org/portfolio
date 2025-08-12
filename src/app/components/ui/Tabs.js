'use client';
import { useState } from 'react';
import { useSession } from '../../context/SessionContext';
import dynamic from 'next/dynamic';

// Lazy load the image component since not all tabs will have images
const TerminalImagePreview = dynamic(() => import('../TerminalImagePreview'), {
  loading: () => <div>Loading image...</div>
});

export default function Tabs({ tabs, defaultTab = null }) {
  const { theme, addLog } = useSession();
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId, tabLabel) => {
    setActiveTab(tabId);
    addLog(`TAB SELECTED: ${tabLabel}`);
  };

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  const labelClasses = theme === 'dark' ? 'text-dark-text-white' : 'text-light-text-black';
  const valueClasses = theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary';
  const yellowClasses = theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command';
  const successClasses = theme === 'dark' ? 'text-dark-success' : 'text-light-success';
  const darkerBorder = theme === 'dark' ? 'border-dark-border-darker' : 'border-light-border-lighter';
  const activeBg = theme === 'dark'
  ? 'bg-[rgba(21,128,61,0.3)]'
  : 'bg-[rgba(220,252,231,0.3)]';
  const hoverBg = theme === 'dark' ? 'hover:bg-dark-hover' : 'hover:bg-light-hover';

  const renderContentItem = (item, idx) => {
    switch (item.type) {
      case 'text':
        return (
          <p key={idx} className={`text-sm leading-relaxed ${valueClasses}`}>
            {item.value}
          </p>
        );
      
      case 'list_item':
        return (
          <div key={idx} className="text-sm flex items-start">
            <span className={`mr-2 ${successClasses}`}>[✓]</span>
            <span className={valueClasses}>{item.value}</span>
          </div>
        );
      case 'sub_heading':
        return (
          <div key={idx} className={`mb-2 mt-4 ${yellowClasses}`}>
            ${item.value}
          </div>
        );
      
      case 'divider':
        return (
          <div key={idx} className={`border-t my-3 ${darkerBorder}`}></div>
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
    
    // Fallback for non-array content
    return <div className={valueClasses}>No content available</div>;
  };

    return (
    <div>
      <div className="w-full overflow-x-auto">
        <div className="flex w-full border-b border-dark-border-darker">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id, tab.label)}
              className={`text-center px-4 py-3 text-sm rounded-t transition-colors whitespace-nowrap -mb-px ${
                activeTab === tab.id
                  ? `${activeBg} ${labelClasses} border-t border-x ${darkerBorder}`
                  : `${valueClasses} ${hoverBg} border-b-0` // Inactive tabs no longer need a bottom border here
              }`}
            >
              ${tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`-mt-px p-4 border rounded-b rounded-tr ${darkerBorder}`}>
        {activeTabData && (
          <>
            <h3 className={`mb-3 ${yellowClasses}`}>
              ${activeTabData.title || activeTabData.label}
            </h3>
            {renderTabContent()}
          </>
        )}
      </div>
    </div>
  );
}