// src/app/components/ui/Accordion.test.js
// Simplified version that doesn't require NavigationContext

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Accordion from './Accordion';
import { MockSessionProvider } from '../../../../test-utils/providers';
import { MOCK_SESSION_DATA } from '../../../../test-utils/mocks';

describe('Accordion Component', () => {
  // Sample sections data for testing
  const mockSections = [
    {
      id: 'section-1',
      title: 'About Me',
      content: 'I am a passionate developer with years of experience.',
      icon: '👤'
    },
    {
      id: 'section-2',
      title: 'Skills',
      content: 'React, TypeScript, Node.js, and more.',
      icon: '🛠️'
    },
    {
      id: 'section-3',
      title: 'Experience',
      content: 'Worked at various tech companies building amazing products.',
      icon: '💼'
    }
  ];

  // Mock addLog function to track system logging
  const mockAddLog = jest.fn();

  const renderAccordion = (props = {}, sessionProps = {}) => {
    return render(
      <MockSessionProvider 
        sessionData={MOCK_SESSION_DATA} 
        addLog={mockAddLog}
        {...sessionProps}
      >
        <Accordion sections={mockSections} {...props} />
      </MockSessionProvider>
    );
  };

  beforeEach(() => {
    mockAddLog.mockClear();
  });

  describe('Basic Functionality', () => {
    it('should render all section titles', () => {
      renderAccordion();
      
      expect(screen.getByText('About Me')).toBeInTheDocument();
      expect(screen.getByText('Skills')).toBeInTheDocument();
      expect(screen.getByText('Experience')).toBeInTheDocument();
    });

    it('should not show content by default', () => {
      renderAccordion();
      
      expect(screen.queryByText('I am a passionate developer with years of experience.')).not.toBeInTheDocument();
      expect(screen.queryByText('React, TypeScript, Node.js, and more.')).not.toBeInTheDocument();
    });

    it('should expand section when clicked', () => {
      renderAccordion();
      
      const aboutMeTitle = screen.getByText('About Me');
      fireEvent.click(aboutMeTitle);
      
      expect(screen.getByText('I am a passionate developer with years of experience.')).toBeInTheDocument();
    });

    it('should collapse section when clicked again', () => {
      renderAccordion();
      
      const aboutMeTitle = screen.getByText('About Me');
      
      // First click - expand
      fireEvent.click(aboutMeTitle);
      expect(screen.getByText('I am a passionate developer with years of experience.')).toBeInTheDocument();
      
      // Second click - collapse
      fireEvent.click(aboutMeTitle);
      expect(screen.queryByText('I am a passionate developer with years of experience.')).not.toBeInTheDocument();
    });

    it('should allow multiple sections to be expanded', () => {
      renderAccordion();
      
      fireEvent.click(screen.getByText('About Me'));
      fireEvent.click(screen.getByText('Skills'));
      
      // Both should be expanded
      expect(screen.getByText('I am a passionate developer with years of experience.')).toBeInTheDocument();
      expect(screen.getByText('React, TypeScript, Node.js, and more.')).toBeInTheDocument();
    });
  });

  describe('System Log Integration', () => {
    it('should log when a section is expanded', () => {
      renderAccordion();
      
      fireEvent.click(screen.getByText('About Me'));
      
      expect(mockAddLog).toHaveBeenCalledWith(
        expect.stringContaining('SECTION EXPANDED'),
        expect.any(String)
      );
    });

    it('should log when a section is collapsed', () => {
      renderAccordion();
      
      const aboutMeTitle = screen.getByText('About Me');
      
      // Expand
      fireEvent.click(aboutMeTitle);
      mockAddLog.mockClear();
      
      // Collapse
      fireEvent.click(aboutMeTitle);
      
      expect(mockAddLog).toHaveBeenCalledWith(
        expect.stringContaining('SECTION COLLAPSED'),
        expect.any(String)
      );
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty sections array', () => {
      const { container } = renderAccordion({ sections: [] });
      expect(container).toBeInTheDocument();
    });

    it('should handle sections without content', () => {
      const sectionsWithoutContent = [
        { id: 'no-content', title: 'Empty Section' }
      ];
      
      renderAccordion({ sections: sectionsWithoutContent });
      expect(screen.getByText('Empty Section')).toBeInTheDocument();
    });

    it('should show defaultExpanded sections', () => {
      renderAccordion({ defaultExpanded: ['section-1'] });
      
      expect(screen.getByText('I am a passionate developer with years of experience.')).toBeInTheDocument();
      expect(screen.queryByText('React, TypeScript, Node.js, and more.')).not.toBeInTheDocument();
    });
  });
});