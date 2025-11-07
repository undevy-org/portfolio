# The Systematic Unit Testing Algorithm for React/Next.js Components

## Phase 1: Reconnaissance (Understanding the Target)

1. **Read the component source code completely**
   - What does this component do?
   - What are its props?
   - What state does it manage?

2. **Identify all dependencies**
   - Context hooks (useSession, useNavigation, etc.)
   - External libraries (icons, animations, utilities)
   - Browser APIs (localStorage, window, document)
   - Child components

3. **Map the rendering conditions**
   - When does it render null?
   - What conditions change its output?
   - Are there loading/error states?

4. **List all user interactions**
   - Click handlers
   - Form inputs
   - Keyboard events
   - Hover/focus states

## Phase 2: Setup (Preparing the Environment)

5. **Create the test file**
   ```javascript
   // ComponentName.test.js - same directory as component
   import React from 'react';
   import { render, screen, fireEvent, waitFor } from '@testing-library/react';
   import '@testing-library/jest-dom';
   import ComponentName from './ComponentName';
   ```

6. **Import and configure providers**
   ```javascript
   import { MockSessionProvider } from '../../../test-utils/providers';
   // Add other providers as needed
   ```

7. **Create the render helper**
   ```javascript
   const renderComponent = (props = {}, contextOverrides = {}) => {
     return render(
       <MockSessionProvider {...contextOverrides}>
         <ComponentName {...defaultProps} {...props} />
       </MockSessionProvider>
     );
   };
   ```

8. **Setup mocks for external dependencies**
   ```javascript
   jest.mock('lucide-react', () => ({
     IconName: () => 'IconName'
   }));
   ```

## Phase 3: Progressive Testing (From Simple to Complex)

9. **Test 0: The Debug Test (temporary)**
   ```javascript
   it('DEBUG: show component structure', () => {
     const { container } = renderComponent();
     console.log(container.innerHTML);
     screen.debug();
   });
   ```
   Run this first to understand what actually renders.

10. **Test 1: Basic Render**
    ```javascript
    it('should render without crashing', () => {
      renderComponent();
      // Add one simple assertion
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
    ```

11. **Test 2: Props Validation**
    ```javascript
    it('should display prop values correctly', () => {
      renderComponent({ title: 'Test Title' });
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });
    ```

12. **Test 3: Conditional Rendering**
    ```javascript
    it('should render differently based on conditions', () => {
      const { rerender } = renderComponent({ isLoading: true });
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      
      rerender(
        <MockSessionProvider>
          <ComponentName isLoading={false} />
        </MockSessionProvider>
      );
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    ```

13. **Test 4: User Interactions**
    ```javascript
    it('should handle user clicks', async () => {
      const handleClick = jest.fn();
      renderComponent({ onClick: handleClick });
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
    ```

14. **Test 5: State Changes**
    ```javascript
    it('should update state on interaction', async () => {
      renderComponent();
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Updated State')).toBeInTheDocument();
      });
    });
    ```

15. **Test 6: Context Integration**
    ```javascript
    it('should use context values', () => {
      renderComponent({}, { theme: 'dark', currentScreen: 'MainHub' });
      
      const element = screen.getByTestId('themed-element');
      expect(element).toHaveClass('dark-theme');
    });
    ```

16. **Test 7: Edge Cases**
    ```javascript
    it('should handle null props gracefully', () => {
      renderComponent({ data: null });
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });
    
    it('should handle empty arrays', () => {
      renderComponent({ items: [] });
      expect(screen.getByText('No items')).toBeInTheDocument();
    });
    ```

## Phase 4: Cleanup and Optimization

17. **Remove debug tests**
    Delete the DEBUG test from step 9.

18. **Group related tests**
    ```javascript
    describe('ComponentName', () => {
      describe('Rendering', () => { /* ... */ });
      describe('User Interactions', () => { /* ... */ });
      describe('Edge Cases', () => { /* ... */ });
    });
    ```

19. **Add cleanup if needed**
    ```javascript
    beforeEach(() => {
      jest.clearAllMocks();
    });
    
    afterEach(() => {
      // Any cleanup needed
    });
    ```

20. **Run final verification**
    ```bash
    npm test -- ComponentName.test.js
    npm test  # Run all tests to ensure no regression
    ```

## Phase 5: Documentation

21. **Add comments for complex test logic**
    ```javascript
    // This test verifies that the component correctly handles
    // the race condition when user clicks submit multiple times
    it('should prevent double submission', () => { /* ... */ });
    ```

22. **Update test count in documentation**
    Update TESTING.md with new test statistics.

## Quick Decision Tree

Is it a utility function?
  → Start with input/output tests
  → Add edge cases
  → Test error conditions

Is it a presentational component?
  → Test props rendering
  → Test className application
  → Consider snapshot testing

Is it an interactive component?
  → Test all user interactions
  → Test state changes
  → Test form validation

Does it use context?
  → Always wrap in provider
  → Test with different context values
  → Test context-dependent rendering

Does it make API calls?
  → Mock the fetch/axios calls
  → Test loading states
  → Test error states
  → Test successful response

## Red Flags to Watch For

- Component returns null under certain conditions? Test those conditions!
- useEffect with dependencies? Test what triggers it!
- Async operations? Always use waitFor!
- Complex conditional rendering? Test each branch!
- Event handlers? Verify they're called with correct arguments!

## The Golden Rules

1. If you're stuck for >15 minutes, use screen.debug()
2. Start simple, even if it seems too simple
3. One assertion per test is often enough
4. Test behavior, not implementation
5. If a test is hard to write, the component might need refactoring