export const formatDate = (dateStr: string) => {
  if (!dateStr) return '';

  const date = new Date(dateStr);

  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
  });
};
