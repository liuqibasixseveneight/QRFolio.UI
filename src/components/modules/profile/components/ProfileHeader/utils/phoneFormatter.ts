/**
 * Formats phone display data for consistent rendering
 */
export const formatPhoneDisplay = (phoneData: any): string => {
  if (typeof phoneData === 'string') {
    return phoneData;
  }
  if (phoneData && phoneData.number) {
    const countryInfo =
      phoneData.countryCode && phoneData.dialCode
        ? `${phoneData.countryCode} ${phoneData.dialCode}`
        : '';
    return countryInfo
      ? `${countryInfo} • ${phoneData.number}`
      : phoneData.number;
  }
  return phoneData;
};
