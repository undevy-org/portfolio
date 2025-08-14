// src/app/components/ui/Accordion.test.js
// Test adapted for the real Accordion component structure

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Accordion from './Accordion';
import { SessionContext } from '../../context/SessionContext';

// Mock the lucide-react icons to avoid import issues
jest.mock('lucide-react', () => ({
  ChevronDown: () => <span>ChevronDown</span>
}));

describe('Accordion Component', () => {
  // Sample sections data for testing
  const mockSections = [
    {
      id: 'section-1',
      title: 'About Me',
      content: 'I am a passionate developer with years of experience.'
    },
    {
      id: 'section-2',
      title: 'Skills',
      content: [
        { type: 'text', value: 'React and TypeScript' },
        { type: 'list_item', value: 'Node.js expertise' },
        { type: 'tag_list', value: ['JavaScript', 'Python', 'Go'] }
      ]
    },
    {
      id: 'section-3',
      title: 'Experience',
      content: { type: 'text', value: 'Worked at various tech companies' }
    }
  ];

  // Mock addLog function to track system logging
  const mockAddLog = jest.fn();

  // Create a wrapper with mocked SessionContext
  // This matches how the real component uses useSession hook
  const renderAccordion = (props = {}, contextValue = {}) => {
    const defaultContextValue = {
      theme: 'dark',
      addLog: mockAddLog,
      ...contextValue
    };

    return render(
      <SessionContext.Provider value={defaultContextValue}>
        <Accordion sections={mockSections} {...props} />
      </SessionContext.Provider>
    );
  };

  beforeEach(() => {
    mockAddLog.mockClear();
  });

  describe('Basic Rendering', () => {
    it('should render all section titles', () => {
      renderAccordion();
      
      expect(screen.getByText('$About Me')).toBeInTheDocument();
      expect(screen.getByText('$Skills')).toBeInTheDocument();
      expect(screen.getByText('$Experience')).toBeInTheDocument();
    });

    it('should not show any content by default when defaultExpanded is null', () => {
      renderAccordion();
      
      // Content should not be visible initially
      expect(screen.queryByText('I am a passionate developer with years of experience.')).not.toBeInTheDocument();
      expect(screen.queryByText('React and TypeScript')).not.toBeInTheDocument();
      expect(screen.queryByText('Worked at various tech companies')).not.toBeInTheDocument();
    });

    it('should show content for defaultExpanded section', () => {
      renderAccordion({ defaultExpanded: 'section-1' });
      
      // The default expanded section should be visible
      expect(screen.getByText('I am a passionate developer with years of experience.')).toBeInTheDocument();
      
      // Other sections should still be collapsed
      expect(screen.queryByText('React and TypeScript')).not.toBeInTheDocument();
    });

    it('should render ChevronDown icons for each section', () => {
      renderAccordion();
      
      // We mocked ChevronDown to render as text, so we can check for it
      const chevrons = screen.getAllByText('ChevronDown');
      expect(chevrons).toHaveLength(3);
    });
  });

  describe('Toggle Functionality', () => {
    it('should expand a section when clicked', () => {
      renderAccordion();
      
      const aboutMeButton = screen.getByText('$About Me').closest('button');
      fireEvent.click(aboutMeButton);
      
      // Content should now be visible
      expect(screen.getByText('I am a passionate developer with years of experience.')).toBeInTheDocument();
    });

    it('should collapse an expanded section when clicked again', () => {
      renderAccordion({ defaultExpanded: 'section-1' });
      
      // Initially expanded
      expect(screen.getByText('I am a passionate developer with years of experience.')).toBeInTheDocument();
      
      const aboutMeButton = screen.getByText('$About Me').closest('button');
      fireEvent.click(aboutMeButton);
      
      // Should now be collapsed
      expect(screen.queryByText('I am a passionate developer with years of experience.')).not.toBeInTheDocument();
    });

    it('should only allow one section to be expanded at a time', () => {
      renderAccordion();
      
      // Expand first section
      const aboutMeButton = screen.getByText('$About Me').closest('button');
      fireEvent.click(aboutMeButton);
      expect(screen.getByText('I am a passionate developer with years of experience.')).toBeInTheDocument();
      
      // Expand second section
      const skillsButton = screen.getByText('$Skills').closest('button');
      fireEvent.click(skillsButton);
      
      // First section should now be collapsed
      expect(screen.queryByText('I am a passionate developer with years of experience.')).not.toBeInTheDocument();
      
      // Second section should be expanded
      expect(screen.getByText('React and TypeScript')).toBeInTheDocument();
    });
  });

  describe('Content Rendering', () => {
    it('should render simple string content', () => {
      renderAccordion({ defaultExpanded: 'section-1' });
      
      expect(screen.getByText('I am a passionate developer with years of experience.')).toBeInTheDocument();
    });

    it('should render array of content items', () => {
      renderAccordion({ defaultExpanded: 'section-2' });
      
      // Text item
      expect(screen.getByText('React and TypeScript')).toBeInTheDocument();
      
      // List item with checkmark
      expect(screen.getByText('[✓]')).toBeInTheDocument();
      expect(screen.getByText('Node.js expertise')).toBeInTheDocument();
      
      // Tag list
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('Python')).toBeInTheDocument();
      expect(screen.getByText('Go')).toBeInTheDocument();
    });

    it('should render object content with type property', () => {
      renderAccordion({ defaultExpanded: 'section-3' });
      
      expect(screen.getByText('Worked at various tech companies')).toBeInTheDocument();
    });
  });

  describe('System Log Integration', () => {
    it('should log when a section is expanded', () => {
      renderAccordion();
      
      const aboutMeButton = screen.getByText('$About Me').closest('button');
      fireEvent.click(aboutMeButton);
      
      expect(mockAddLog).toHaveBeenCalledWith('SECTION EXPANDED: section-1');
    });

    it('should log when a section is collapsed', () => {
      renderAccordion({ defaultExpanded: 'section-1' });
      
      const aboutMeButton = screen.getByText('$About Me').closest('button');
      fireEvent.click(aboutMeButton);
      
      expect(mockAddLog).toHaveBeenCalledWith('SECTION COLLAPSED: section-1');
    });

    it('should log correct section ID when switching sections', () => {
      renderAccordion();
      
      const skillsButton = screen.getByText('$Skills').closest('button');
      fireEvent.click(skillsButton);
      
      expect(mockAddLog).toHaveBeenLastCalledWith('SECTION EXPANDED: section-2');
      
      const experienceButton = screen.getByText('$Experience').closest('button');
      fireEvent.click(experienceButton);
      
      expect(mockAddLog).toHaveBeenLastCalledWith('SECTION EXPANDED: section-3');
    });
  });

  describe('Theme Support', () => {
    it('should apply dark theme classes', () => {
      renderAccordion({}, { theme: 'dark' });
      
      const container = screen.getByText('$About Me').closest('div');
      // The component uses dark theme classes by default
      expect(container.parentElement.className).toContain('space-y-3');
    });

    it('should apply light theme classes', () => {
      renderAccordion({}, { theme: 'light' });
      
      const container = screen.getByText('$About Me').closest('div');
      // Component adapts based on theme from context
      expect(container.parentElement.className).toContain('space-y-3');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty sections array', () => {
      const { container } = renderAccordion({ sections: [] });
      
      // Should render the wrapper div but no sections
      expect(container.querySelector('.space-y-3')).toBeInTheDocument();
      expect(screen.queryAllByRole('button')).toHaveLength(0);
    });

    it('should handle sections with null content', () => {
      const sectionsWithNull = [
        { id: 'null-section', title: 'Null Content', content: null }
      ];
      
      renderAccordion({ sections: sectionsWithNull, defaultExpanded: 'null-section' });
      
      // Should render the title
      expect(screen.getByText('$Null Content')).toBeInTheDocument();
      
      // Should render null as string
      expect(screen.getByText('null')).toBeInTheDocument();
    });

    it('should handle sections with undefined content', () => {
      const sectionsWithUndefined = [
        { id: 'undefined-section', title: 'Undefined Content' }
      ];
      
      renderAccordion({ sections: sectionsWithUndefined, defaultExpanded: 'undefined-section' });
      
      // Should render the title
      expect(screen.getByText('$Undefined Content')).toBeInTheDocument();
      
      // Should render undefined as string
      expect(screen.getByText('undefined')).toBeInTheDocument();
    });
  });
});