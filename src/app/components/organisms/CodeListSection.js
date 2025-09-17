// src/app/components/organisms/CodeListSection.js
'use client';

import { SectionHeader } from '../molecules';
import { CommandTitle } from '../atoms';
import { ChevronRight } from 'lucide-react';

export default function CodeListSection({
  title,
  icon,
  codes = [],
  onCodeClick,
  variant = 'default', // 'master' | 'special' | 'user' | 'default'
  className = ''
}) {
  if (codes.length === 0) {
    return null;
  }

  const getPrefixForVariant = () => {
    switch(variant) {
      case 'master': return 'M';
      case 'special': return 'S';
      case 'user': return '';
      default: return '';
    }
  };

  const prefix = getPrefixForVariant();

  return (
    <div className={`mb-6 ${className}`}>
      {title && <SectionHeader title={title} icon={icon} />}

      <div className="space-y-3">
        {codes.map((code, index) => (
          <button
            key={`${variant}-${index}`}
            onClick={() => onCodeClick && onCodeClick(code)}
            disabled={variant === 'special' && !code.code && code.type !== 'demo'}
            className={`w-full p-4 text-left border rounded transition-colors relative ${
              (variant === 'special' && !code.code && code.type !== 'demo')
                ? 'border-secondary bg-main opacity-60 cursor-default'
                : 'border-secondary bg-hover hover:border-primary cursor-pointer'
            }`}
          >
            <div className="hidden md:grid grid-cols-[auto,1fr,auto] items-start w-full gap-x-3">
              <span className="mt-1 text-command">
                [{prefix && `${prefix}`}{String(index + 1).padStart(2, '0')}]
              </span>
              <div>
                <div className="text-lg font-mono text-command">
                  {code.code || (variant === 'special' ? '[NO CODE REQUIRED]' : code.code)}
                </div>
                <div className="text-sm opacity-80 text-secondary">
                  {code.label}
                </div>
                {(code.description || code.email || code.telegram) && (
                  <div className="text-xs mt-1 text-secondary">
                    {code.description && <span>{code.description}</span>}
                    {code.email && <span>{code.email}</span>}
                    {code.email && code.telegram && <span> • </span>}
                    {code.telegram && <span>{code.telegram}</span>}
                  </div>
                )}
              </div>
              <ChevronRight className="w-5 h-5 mt-1 text-secondary" />
            </div>

            {/* Mobile layout */}
            <div className="md:hidden">
              <div className="flex justify-between items-start">
                <span className="text-lg font-mono text-command">
                  {code.code || (variant === 'special' ? '[NO CODE]' : code.code)}
                </span>
                <span className="mt-1 text-sm text-command">
                  [{prefix && `${prefix}`}{String(index + 1).padStart(2, '0')}]
                </span>
              </div>
              <div className="mt-1 text-sm text-secondary">{code.label}</div>
              {(code.description || code.email || code.telegram) && (
                <div className="mt-1 text-xs text-secondary">
                  {code.description && <span>{code.description}</span>}
                  {code.email && <span>{code.email}</span>}
                  {code.email && code.telegram && <span> • </span>}
                  {code.telegram && <span>{code.telegram}</span>}
                </div>
              )}
              <ChevronRight className="w-5 h-5 absolute bottom-4 right-4 text-secondary" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
