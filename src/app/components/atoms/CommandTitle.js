'use client';

import React from 'react';

const headingComponents = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6'
};

export default function CommandTitle({
  text,
  level = 'h3',
  className = ''
}) {
  const Component = headingComponents[level] || headingComponents.h3;

  // Ensure the $ prefix is always present
  const displayText = text.startsWith('$') ? text : `$${text}`;

  return React.createElement(Component, {
    className: `title-command ${className}`
  }, displayText);
}
