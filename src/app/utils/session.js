// src/app/utils/session.js

export const mergeSessionData = (userProfile, globalData) => {
  // Handle null/undefined inputs with safe defaults
  if (!globalData) {
    globalData = {
      menu: [],
      experience: {},
      role_details: {},
      case_studies: {},
      skills: [],
      skill_details: {},
      case_details: {},
      side_projects: [],
      public_speaking: [],
      contact: {}
    };
  }
  
  if (!userProfile) {
    userProfile = {
      meta: {
        timeline: 'default',
        cases: []
      }
    };
  }
  
  // Ensure userProfile has meta object
  if (!userProfile.meta) {
    userProfile.meta = {
      timeline: 'default',
      cases: []
    };
  }
  
  // Safely access nested properties with fallbacks
  const timeline = userProfile.meta.timeline || 'default';
  const selectedCases = userProfile.meta.cases || [];
  
  const sessionData = {
    ...userProfile,
    menu: globalData.menu || [],
    experience: globalData.experience?.[timeline] || globalData.experience?.default || [],
    role_details: globalData.role_details || {},
    case_studies: filterCaseStudies(globalData.case_studies, selectedCases),
    skills: globalData.skills || [],
    skill_details: globalData.skill_details || {},
    case_details: globalData.case_details || {},
    side_projects: globalData.side_projects || [],
    public_speaking: globalData.public_speaking || [],
    contact: globalData.contact || {},
    total_case_count: Object.keys(globalData.case_studies || {}).length
  };
  
  return sessionData;
};

export const filterCaseStudies = (allCases, selectedCaseIds) => {
  // Handle null/undefined inputs
  if (!allCases) {
    return {};
  }
  
  // If no IDs provided or null/undefined, return all cases
  if (!selectedCaseIds || selectedCaseIds.length === 0) {
    return allCases;
  }
  
  const filteredCases = {};
  
  selectedCaseIds.forEach(caseId => {
    if (allCases[caseId]) {
      filteredCases[caseId] = allCases[caseId];
    }
  });
  
  return filteredCases;
};