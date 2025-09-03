/**
 * Formats a date in day/month/year format for display
 */
export const formatDate = (dateString: string | Date): string => {
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
  const date = new Date(dateString);
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  return `${month} ${year}`;
};
