// Combines user profile with relevant parts of GLOBAL_DATA
export function mergeSessionData(userProfile, globalData) {
  const sessionData = {
    ...userProfile,
    menu: globalData.menu,
    experience: globalData.experience[userProfile.meta.timeline] || [],
    role_details: globalData.role_details,
    case_studies: filterCaseStudies(globalData.case_studies, userProfile.meta.cases),
    skills: globalData.skills,
    skill_details: globalData.skill_details || {},
    case_details: globalData.case_details || {},
    side_projects: globalData.side_projects || [],
    public_speaking: globalData.public_speaking || [],
    contact: globalData.contact || {},
    total_case_count: Object.keys(globalData.case_studies || {}).length,
  };

  return sessionData;
}

// Filters case studies by user configuration
export function filterCaseStudies(allCases, selectedCaseIds) {
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
}
