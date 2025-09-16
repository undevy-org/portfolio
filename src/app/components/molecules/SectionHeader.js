// src/app/components/molecules/SectionHeader.js
'use client';

import { CommandTitle } from '../atoms';

export default function SectionHeader({
  title,
  icon: Icon,
  className = ''
}) {
  return (
    <div className={`flex items-center gap-2 mb-3 ${className}`}>
      {Icon && <Icon className="w-4 h-4 text-command" />}
      <CommandTitle text={title} level="h3" className="text-sm uppercase tracking-wider" />
    </div>
  );
}
