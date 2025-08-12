export const getScreenDisplayName = (screen) => {
  if (screen === 'MainHub') return 'Home';
  // Convert CamelCase to space-separated words
  return screen.replace(/([A-Z])/g, ' $1').trim();
};

export const getAvailabilityDate = () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 14); // Add 14 days

  const dayOfWeek = futureDate.getDay(); // Sunday = 0, Saturday = 6

  if (dayOfWeek === 6) { // If it's Saturday
    futureDate.setDate(futureDate.getDate() + 2); // Move to Monday
  } else if (dayOfWeek === 0) { // If it's Sunday
    futureDate.setDate(futureDate.getDate() + 1); // Move to Monday
  }

  // Format the date as "DD Month, YYYY" (e.g., "22 July, 2025")
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  // FIX: Corrected the method name from toLocaleDateDateString to toLocaleDateString.
  return futureDate.toLocaleDateString('en-US', options);
};
