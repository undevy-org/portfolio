// src/app/components/organisms/ProfileDataGrid.js
'use client';

import { Panel } from '../molecules';
import { LabelValuePair } from '../molecules';
import { CommandTitle } from '../atoms';

export default function ProfileDataGrid({
  title,
  data = {}, // Object with key-value pairs
  responsive = true,
  className = ''
}) {
  // Convert object to array of entries for mapping
  const entries = Object.entries(data);

  if (entries.length === 0) {
    return null;
  }

  return (
    <Panel className={className}>
      {title && <CommandTitle text={title} level="h3" className="mb-2" />}
      <div className="space-y-1">
        {entries.map(([key, value]) => (
          <LabelValuePair
            key={key}
            label={`$${key}`}
            value={value || 'N/A'}
            responsive={responsive}
          />
        ))}
      </div>
    </Panel>
  );
}
