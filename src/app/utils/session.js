// src/app/utils/session.js

// CHANGED: Added isDemoMode parameter to handle demo sessions differently
export const mergeSessionData = (userProfile, globalData, isDemoMode = false) => {
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
  
  // CHANGED: For demo mode, we prioritize userProfile data over globalData
  // This ensures demo content isn't overwritten by empty globalData fields
  const sessionData = {
    ...userProfile,
    // CHANGED: Check isDemoMode flag to decide data source priority
    menu: isDemoMode && userProfile.menu 
      ? userProfile.menu 
      : (globalData.menu || userProfile.menu || []),
    
    experience: globalData.experience?.[timeline] || globalData.experience?.default || [],
    role_details: globalData.role_details || {},
    case_studies: filterCaseStudies(globalData.case_studies, selectedCases),
    
    skills: isDemoMode && userProfile.skills 
      ? userProfile.skills 
      : (globalData.skills || userProfile.skills || []),
    
    skill_details: isDemoMode && userProfile.skill_details 
      ? userProfile.skill_details 
      : (globalData.skill_details || userProfile.skill_details || {}),
    
    case_details: isDemoMode && userProfile.case_details 
      ? userProfile.case_details 
      : (globalData.case_details || userProfile.case_details || {}),
    
    // CHANGED: This fixes the side_projects issue
    side_projects: isDemoMode && userProfile.side_projects 
      ? userProfile.side_projects 
      : (globalData.side_projects || userProfile.side_projects || []),
    
    // CHANGED: Same fix for public_speaking
    public_speaking: isDemoMode && userProfile.public_speaking 
      ? userProfile.public_speaking 
      : (globalData.public_speaking || userProfile.public_speaking || []),
    
    // CHANGED: Same fix for contact
    contact: isDemoMode && userProfile.contact 
      ? userProfile.contact 
      : (globalData.contact || userProfile.contact || {}),
    
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