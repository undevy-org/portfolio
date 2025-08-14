// src/app/utils/formatters.js

export const getScreenDisplayName = (screen) => {
  // Handle null/undefined inputs
  if (!screen) return '';
  
  // Convert to string if not already
  if (typeof screen !== 'string') {
    return String(screen);
  }
  
  // Special case mappings
  if (screen === 'MainHub') return 'Home';
  
  // Handle underscores first - replace them with spaces
  let result = screen.replace(/_/g, ' ');
  
  // Handle consecutive capitals (like API, UI, XML)
  // This regex looks for sequences of 2+ capitals followed by a lowercase letter
  // or a sequence of capitals at the end of the string
  result = result.replace(/([A-Z])([A-Z]+)([A-Z][a-z])/g, '$1$2 $3');
  
  // Handle normal CamelCase
  // Add space before capital letters that follow lowercase letters or numbers
  result = result.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  
  // Handle numbers
  result = result.replace(/([a-zA-Z])(\d)/g, '$1 $2');
  result = result.replace(/(\d)([a-zA-Z])/g, '$1 $2');
  
  // Capitalize first letter of each word
  result = result.replace(/\b\w/g, char => char.toUpperCase());
  
  // Clean up any extra spaces
  return result.trim();
};

export const getAvailabilityDate = (daysOffset = 14) => {
  const date = new Date();
  
  // Add the offset days
  date.setDate(date.getDate() + daysOffset);
  
  // Skip weekends
  while (date.getDay() === 0 || date.getDay() === 6) {
    date.setDate(date.getDate() + 1);
  }
  
  // Format as "Month DD, YYYY"
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  return `${month} ${day}, ${year}`;
};