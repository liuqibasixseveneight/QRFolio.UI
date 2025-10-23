/**
 * Formats a date in day/month/year format for display
 */
export const formatDate = (dateString: string | Date): string => {
  if (dateString === 'current') {
    return 'Current';
  }

  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Formats a date in month/year format for PDF generation
 */
export const formatDateForPDF = (dateString: string | Date): string => {
  if (dateString === 'current') {
    return 'Current';
  }

  const date = new Date(dateString);
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  return `${month} ${year}`;
};

/**
 * Formats a date with ordinal suffix (e.g., 'January 27th, 2024')
 */
export const formatDateWithOrdinal = (dateString: string | Date): string => {
  const date = new Date(dateString);

  // Get the day with ordinal suffix
  const day = date.getDate();
  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  const ordinalSuffix = getOrdinalSuffix(day);

  return `${month} ${day}${ordinalSuffix}, ${year}`;
};
