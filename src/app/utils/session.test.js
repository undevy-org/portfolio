// src/app/utils/session.test.js
import { mergeSessionData, filterCaseStudies } from './session';
import { MOCK_GLOBAL_DATA, MOCK_USER_PROFILES } from '../../../test-utils/mocks';

describe('session utils', () => {
  // Using centralized mock data instead of inline definitions
  const globalData = MOCK_GLOBAL_DATA;
  const userProfile = MOCK_USER_PROFILES.standard;

  describe('mergeSessionData', () => {
    it('should merge user profile and global data correctly', () => {
      const sessionData = mergeSessionData(userProfile, globalData);

      expect(sessionData.experience).toEqual(globalData.experience.custom);
      expect(sessionData.case_studies).toEqual({
        'case1': globalData.case_studies.case1,
        'case3': globalData.case_studies.case3
      });
      expect(sessionData.total_case_count).toBe(3);
    });

    // New test from checklist: Test case study filtering
    it('should filter case studies based on profile meta.cases array', () => {
      const sessionData = mergeSessionData(userProfile, globalData);
      
      // Should only include case1 and case3 as specified in userProfile.meta.cases
      expect(Object.keys(sessionData.case_studies)).toEqual(['case1', 'case3']);
      expect(sessionData.case_studies.case2).toBeUndefined();
    });

    // New test from checklist: Test experience timeline selection
    it('should select experience based on profile meta.timeline', () => {
      const customTimelineProfile = MOCK_USER_PROFILES.standard;
      const sessionData = mergeSessionData(customTimelineProfile, globalData);
      
      expect(sessionData.experience).toEqual(globalData.experience.custom);
      expect(sessionData.experience).not.toEqual(globalData.experience.default);
    });

    // New test from checklist: Test total_case_count calculation
    it('should calculate total_case_count from all available cases, not filtered ones', () => {
      const sessionData = mergeSessionData(userProfile, globalData);
      
      // Total should be 3 (all cases in globalData), not 2 (filtered cases)
      expect(sessionData.total_case_count).toBe(3);
      expect(Object.keys(sessionData.case_studies).length).toBe(2);
    });

    // Edge case: Handle missing timeline scenario
    it('should handle non-existent timeline scenario gracefully', () => {
      const invalidProfile = MOCK_USER_PROFILES.invalidRefs;
      const sessionData = mergeSessionData(invalidProfile, globalData);
      
      // Should fallback to default or return empty array
      expect(sessionData.experience).toBeDefined();
      expect(Array.isArray(sessionData.experience)).toBe(true);
    });

    // Edge case: Handle empty cases array
    it('should return all cases when meta.cases is empty', () => {
      const noCasesProfile = MOCK_USER_PROFILES.noCases;
      const sessionData = mergeSessionData(noCasesProfile, globalData);
      
      // Should include all cases when no filter is specified
      expect(Object.keys(sessionData.case_studies).length).toBe(3);
    });

    // Edge case: Handle non-existent case IDs
    it('should skip non-existent case IDs in meta.cases', () => {
      const invalidProfile = MOCK_USER_PROFILES.invalidRefs;
      const sessionData = mergeSessionData(invalidProfile, globalData);
      
      // Should return empty object or skip invalid IDs
      expect(sessionData.case_studies['non-existent-case']).toBeUndefined();
    });

    // Edge case: Handle null/undefined inputs
    it('should handle null userProfile gracefully', () => {
      const sessionData = mergeSessionData(null, globalData);
      
      expect(sessionData).toBeDefined();
      expect(sessionData.case_studies).toBeDefined();
    });

    it('should handle null globalData gracefully', () => {
      const sessionData = mergeSessionData(userProfile, null);
      
      expect(sessionData).toBeDefined();
      // Should return safe defaults
    });

    it('should handle both null inputs gracefully', () => {
      const sessionData = mergeSessionData(null, null);
      
      expect(sessionData).toBeDefined();
      expect(sessionData).toEqual(expect.any(Object));
    });
  });

  describe('filterCaseStudies', () => {
    it('should filter case studies based on selected IDs', () => {
      const filtered = filterCaseStudies(globalData.case_studies, ['case1', 'case3']);
      
      expect(filtered).toEqual({
        'case1': globalData.case_studies.case1,
        'case3': globalData.case_studies.case3
      });
    });

    it('should return all case studies if no IDs are provided', () => {
      const filtered = filterCaseStudies(globalData.case_studies, []);
      
      expect(filtered).toEqual(globalData.case_studies);
    });

    it('should return all case studies if IDs array is null/undefined', () => {
      const filteredNull = filterCaseStudies(globalData.case_studies, null);
      const filteredUndefined = filterCaseStudies(globalData.case_studies, undefined);
      
      expect(filteredNull).toEqual(globalData.case_studies);
      expect(filteredUndefined).toEqual(globalData.case_studies);
    });

    it('should handle non-existent case IDs gracefully', () => {
      const filtered = filterCaseStudies(globalData.case_studies, ['case1', 'nonexistent']);
      
      expect(filtered).toEqual({
        'case1': globalData.case_studies.case1
      });
      expect(filtered.nonexistent).toBeUndefined();
    });

    it('should handle empty case studies object', () => {
      const filtered = filterCaseStudies({}, ['case1', 'case2']);
      
      expect(filtered).toEqual({});
    });

    it('should handle null/undefined case studies object', () => {
      const filteredNull = filterCaseStudies(null, ['case1']);
      const filteredUndefined = filterCaseStudies(undefined, ['case1']);
      
      expect(filteredNull).toEqual({});
      expect(filteredUndefined).toEqual({});
    });

    it('should maintain original case study objects without mutation', () => {
      const originalCase1 = { ...globalData.case_studies.case1 };
      const filtered = filterCaseStudies(globalData.case_studies, ['case1']);
      
      expect(filtered.case1).toEqual(originalCase1);
      expect(filtered.case1).toBe(globalData.case_studies.case1); // Should be same reference
    });
  });
});
