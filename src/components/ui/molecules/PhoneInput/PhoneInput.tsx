import { useState, useEffect, type ChangeEvent } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select';
import { Input } from '../../atoms/Input';
import { Label } from '../../atoms/Label';
import type { PhoneInputProps, Country } from './types';

const countries: Country[] = [
  { code: 'AO', name: 'Angola', dialCode: '+244', flag: '🇦🇴' },
  { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷' },
  { code: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
  { code: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪' },
  { code: 'BF', name: 'Burkina Faso', dialCode: '+226', flag: '🇧🇫' },
  { code: 'BG', name: 'Bulgaria', dialCode: '+359', flag: '🇧🇬' },
  { code: 'BI', name: 'Burundi', dialCode: '+257', flag: '🇧🇮' },
  { code: 'BW', name: 'Botswana', dialCode: '+267', flag: '🇧🇼' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { code: 'CV', name: 'Cape Verde', dialCode: '+238', flag: '🇨🇻' },
  {
    code: 'CF',
    name: 'Central African Republic',
    dialCode: '+236',
    flag: '🇨🇫',
  },
  { code: 'TD', name: 'Chad', dialCode: '+235', flag: '🇹🇩' },
  { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱' },
  { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳' },
  { code: 'CG', name: 'Republic of the Congo', dialCode: '+242', flag: '🇨🇬' },
  {
    code: 'CD',
    name: 'Democratic Republic of the Congo',
    dialCode: '+243',
    flag: '🇨🇩',
  },
  { code: 'CI', name: 'Ivory Coast', dialCode: '+225', flag: '🇨🇮' },
  { code: 'HR', name: 'Croatia', dialCode: '+385', flag: '🇭🇷' },
  { code: 'CZ', name: 'Czech Republic', dialCode: '+420', flag: '🇨🇿' },
  { code: 'DK', name: 'Denmark', dialCode: '+45', flag: '🇩🇰' },
  { code: 'DJ', name: 'Djibouti', dialCode: '+253', flag: '🇩🇯' },
  { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬' },
  { code: 'ER', name: 'Eritrea', dialCode: '+291', flag: '🇪🇷' },
  { code: 'EE', name: 'Estonia', dialCode: '+372', flag: '🇪🇪' },
  { code: 'ET', name: 'Ethiopia', dialCode: '+251', flag: '🇪🇹' },
  { code: 'FI', name: 'Finland', dialCode: '+358', flag: '🇫🇮' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
  { code: 'GA', name: 'Gabon', dialCode: '+241', flag: '🇬🇦' },
  { code: 'GM', name: 'Gambia', dialCode: '+220', flag: '🇬🇲' },
  { code: 'GE', name: 'Georgia', dialCode: '+995', flag: '🇬🇪' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { code: 'GH', name: 'Ghana', dialCode: '+233', flag: '🇬🇭' },
  { code: 'GN', name: 'Guinea', dialCode: '+224', flag: '🇬🇳' },
  { code: 'GQ', name: 'Equatorial Guinea', dialCode: '+240', flag: '🇬🇶' },
  { code: 'GW', name: 'Guinea-Bissau', dialCode: '+245', flag: '🇬🇼' },
  { code: 'GR', name: 'Greece', dialCode: '+30', flag: '🇬🇷' },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪' },
  { code: 'IL', name: 'Israel', dialCode: '+972', flag: '🇮🇱' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
  { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪' },
  { code: 'KM', name: 'Comoros', dialCode: '+269', flag: '🇰🇲' },
  { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷' },
  { code: 'LS', name: 'Lesotho', dialCode: '+266', flag: '🇱🇸' },
  { code: 'LV', name: 'Latvia', dialCode: '+371', flag: '🇱🇻' },
  { code: 'LR', name: 'Liberia', dialCode: '+231', flag: '🇱🇷' },
  { code: 'LT', name: 'Lithuania', dialCode: '+370', flag: '🇱🇹' },
  { code: 'MG', name: 'Madagascar', dialCode: '+261', flag: '🇲🇬' },
  { code: 'MW', name: 'Malawi', dialCode: '+265', flag: '🇲🇼' },
  { code: 'ML', name: 'Mali', dialCode: '+223', flag: '🇲🇱' },
  { code: 'YT', name: 'Mayotte', dialCode: '+262', flag: '🇾🇹' },
  { code: 'MU', name: 'Mauritius', dialCode: '+230', flag: '🇲🇺' },
  { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽' },
  { code: 'MZ', name: 'Mozambique', dialCode: '+258', flag: '🇲🇿' },
  { code: 'NA', name: 'Namibia', dialCode: '+264', flag: '🇳🇦' },
  { code: 'NE', name: 'Niger', dialCode: '+227', flag: '🇳🇪' },
  { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱' },
  { code: 'NO', name: 'Norway', dialCode: '+47', flag: '🇳🇴' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿' },
  { code: 'PL', name: 'Poland', dialCode: '+48', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹' },
  { code: 'RE', name: 'Réunion', dialCode: '+262', flag: '🇷🇪' },
  { code: 'RO', name: 'Romania', dialCode: '+40', flag: '🇷🇴' },
  { code: 'RU', name: 'Russia', dialCode: '+7', flag: '🇷🇺' },
  { code: 'RW', name: 'Rwanda', dialCode: '+250', flag: '🇷🇼' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
  { code: 'SC', name: 'Seychelles', dialCode: '+248', flag: '🇸🇨' },
  { code: 'SL', name: 'Sierra Leone', dialCode: '+232', flag: '🇸🇱' },
  { code: 'SK', name: 'Slovakia', dialCode: '+421', flag: '🇸🇰' },
  { code: 'SI', name: 'Slovenia', dialCode: '+386', flag: '🇸🇮' },
  { code: 'SO', name: 'Somalia', dialCode: '+252', flag: '🇸🇴' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
  { code: 'SS', name: 'South Sudan', dialCode: '+211', flag: '🇸🇸' },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
  { code: 'ST', name: 'São Tomé and Príncipe', dialCode: '+239', flag: '🇸🇹' },
  { code: 'SZ', name: 'Eswatini', dialCode: '+268', flag: '🇸🇿' },
  { code: 'SD', name: 'Sudan', dialCode: '+249', flag: '🇸🇩' },
  { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭' },
  { code: 'TR', name: 'Turkey', dialCode: '+90', flag: '🇹🇷' },
  { code: 'TZ', name: 'Tanzania', dialCode: '+255', flag: '🇹🇿' },
  { code: 'UG', name: 'Uganda', dialCode: '+256', flag: '🇺🇬' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
  { code: 'ZM', name: 'Zambia', dialCode: '+260', flag: '🇿🇲' },
  { code: 'ZW', name: 'Zimbabwe', dialCode: '+263', flag: '🇿🇼' },
];

export const PhoneInput = ({
  value = '',
  onChange,
  onCountryChange,
  placeholder = 'Enter phone number',
  disabled = false,
  error,
  label,
  required = false,
}: PhoneInputProps) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');

  // Initialize with existing value if provided
  useEffect(() => {
    if (value) {
      if (typeof value === 'string') {
        // Legacy string format - check if it's a full phone number with country code
        const countryMatch = countries.find((country) =>
          value.startsWith(country.dialCode)
        );
        if (countryMatch) {
          setSelectedCountry(countryMatch);
          setPhoneNumber(value.replace(countryMatch.dialCode, '').trim());
        } else {
          // Legacy format or just number
          setPhoneNumber(value.replace(/^\+?\d+\s*/, ''));
        }
      } else if (typeof value === 'object' && 'number' in value) {
        // New object format - extract the number and find the country
        const phoneObj = value as {
          countryCode: string;
          dialCode: string;
          number: string;
          flag: string;
        };
        const countryMatch = countries.find(
          (country) =>
            country.code === phoneObj.countryCode ||
            country.dialCode === phoneObj.dialCode
        );
        if (countryMatch) {
          setSelectedCountry(countryMatch);
        }
        setPhoneNumber(phoneObj.number || '');
      }
    } else {
      // Reset to default state when value is empty
      setPhoneNumber('');
    }
  }, [value]);

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find((c) => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
      onCountryChange?.(country);

      // Update the full phone number with new country code
      const fullPhoneData = {
        countryCode: country.code,
        dialCode: country.dialCode,
        number: phoneNumber,
        flag: country.flag,
      };
      onChange?.(fullPhoneData);
    }
  };

  const handlePhoneChange = (newPhone: string) => {
    // Remove any non-digit characters except spaces and dashes
    const cleaned = newPhone.replace(/[^\d\s\-]/g, '');

    // Combine country code with phone number and return full structure
    const fullPhoneData = {
      countryCode: selectedCountry.code,
      dialCode: selectedCountry.dialCode,
      number: cleaned,
      flag: selectedCountry.flag,
    };
    onChange?.(fullPhoneData);
  };

  return (
    <div className='space-y-3'>
      {label && (
        <Label className='text-sm font-semibold text-gray-800 tracking-wide'>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </Label>
      )}

      <div className='flex space-x-2'>
        {/* Country Selector */}
        <Select
          value={selectedCountry.code}
          onValueChange={handleCountryChange}
        >
          <SelectTrigger className='w-40 h-11 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-gray-300'>
            <SelectValue>
              <div className='flex items-center justify-center space-x-2'>
                <span className='text-lg'>{selectedCountry.flag}</span>
                <span className='text-xs font-medium leading-none'>
                  {selectedCountry.dialCode}
                </span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                <div className='flex items-center space-x-3'>
                  <span className='text-lg'>{country.flag}</span>
                  <span className='text-sm font-medium'>{country.name}</span>
                  <span className='text-xs text-gray-500'>
                    {country.dialCode}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Phone Number Input */}
        <Input
          type='tel'
          value={phoneNumber}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setPhoneNumber(newValue);
            handlePhoneChange(newValue);
          }}
          placeholder={placeholder}
          disabled={disabled}
          className='flex-1'
        />
      </div>

      {error && <p className='text-sm text-red-600 font-medium'>{error}</p>}
    </div>
  );
};

export default PhoneInput;
