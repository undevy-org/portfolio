import { mergeSessionData, filterCaseStudies } from './session';

describe('session utils', () => {
  const MOCK_GLOBAL_DATA = {
    menu: { /* ... */ },
    experience: {
      default: [{ id: 1, title: 'Default Exp' }],
      custom: [{ id: 2, title: 'Custom Exp' }],
    },
    role_details: { /* ... */ },
    case_studies: {
      'case1': { title: 'Case Study 1' },
      'case2': { title: 'Case Study 2' },
      'case3': { title: 'Case Study 3' },
    },
    skills: { /* ... */ },
    skill_details: { /* ... */ },
    case_details: { /* ... */ },
    side_projects: { /* ... */ },
    public_speaking: { /* ... */ },
    contact: { /* ... */ },
  };

  const MOCK_USER_PROFILE = {
    meta: {
      timeline: 'custom',
      cases: ['case1', 'case3'],
    },
  };

  describe('mergeSessionData', () => {
    it('should merge user profile and global data correctly', () => {
      const sessionData = mergeSessionData(MOCK_USER_PROFILE, MOCK_GLOBAL_DATA);

      expect(sessionData.experience).toEqual(MOCK_GLOBAL_DATA.experience.custom);
      expect(sessionData.case_studies).toEqual({
        'case1': { title: 'Case Study 1' },
        'case3': { title: 'Case Study 3' },
      });
      expect(sessionData.total_case_count).toBe(3);
    });
  });

  describe('filterCaseStudies', () => {
    it('should filter case studies based on selected IDs', () => {
      const filtered = filterCaseStudies(MOCK_GLOBAL_DATA.case_studies, ['case1', 'case3']);
      expect(filtered).toEqual({
        'case1': { title: 'Case Study 1' },
        'case3': { title: 'Case Study 3' },
      });
    });

    it('should return all case studies if no IDs are provided', () => {
      const filtered = filterCaseStudies(MOCK_GLOBAL_DATA.case_studies, []);
      expect(filtered).toEqual(MOCK_GLOBAL_DATA.case_studies);
    });

    it('should handle non-existent case IDs gracefully', () => {
      const filtered = filterCaseStudies(MOCK_GLOBAL_DATA.case_studies, ['case1', 'nonexistent']);
      expect(filtered).toEqual({
        'case1': { title: 'Case Study 1' },
      });
    });
  });
});
