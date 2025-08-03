// src/app/components/ui/Tabs.js
'use client';
import { useState } from 'react';
import { useSession } from '../../context/SessionContext';

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
        return <p key={idx} className={`text-sm leading-relaxed ${valueClasses}`}>{item.value}</p>;
      case 'list_item':
        return (
          <div key={idx} className="text-sm flex items-start">
            <span className={`mr-2 ${successClasses}`}>[✓]</span>
            <span className={valueClasses}>{item.value}</span>
          </div>
        );
      case 'sub_heading':
        return <div key={idx} className={`mb-2 mt-4 ${yellowClasses}`}>${item.value}</div>;
      case 'divider':
        return <div key={idx} className={`border-t my-3 ${darkerBorder}`}></div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex w-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id, tab.label)}
            className={`flex-1 text-center px-4 py-3 text-sm rounded-t transition-colors ${
              activeTab === tab.id
                ? `${activeBg} ${labelClasses} border-t border-x ${darkerBorder}`
                : `${valueClasses} ${hoverBg} border-b ${darkerBorder}`
            }`}
          >
            ${tab.label}
          </button>
        ))}
      </div>
      <div className={`p-4 border rounded-b -mt-px ${darkerBorder}`}>
        <h3 className={`mb-3 ${yellowClasses}`}>${activeTabData.title}</h3>
        <div className="space-y-2">
          {activeTabData.content.map(renderContentItem)}
        </div>
      </div>
    </div>
  );
}