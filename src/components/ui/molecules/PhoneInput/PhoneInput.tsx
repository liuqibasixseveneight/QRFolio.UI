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
  { code: 'AO', name: 'Angola', dialCode: '+244' },
  { code: 'AR', name: 'Argentina', dialCode: '+54' },
  { code: 'AT', name: 'Austria', dialCode: '+43' },
  { code: 'AU', name: 'Australia', dialCode: '+61' },
  { code: 'BE', name: 'Belgium', dialCode: '+32' },
  { code: 'BF', name: 'Burkina Faso', dialCode: '+226' },
  { code: 'BG', name: 'Bulgaria', dialCode: '+359' },
  { code: 'BI', name: 'Burundi', dialCode: '+257' },
  { code: 'BW', name: 'Botswana', dialCode: '+267' },
  { code: 'BR', name: 'Brazil', dialCode: '+55' },
  { code: 'CA', name: 'Canada', dialCode: '+1' },
  { code: 'CV', name: 'Cape Verde', dialCode: '+238' },
  { code: 'CF', name: 'Central African Republic', dialCode: '+236' },
  { code: 'TD', name: 'Chad', dialCode: '+235' },
  { code: 'CL', name: 'Chile', dialCode: '+56' },
  { code: 'CN', name: 'China', dialCode: '+86' },
  { code: 'CG', name: 'Republic of the Congo', dialCode: '+242' },
  { code: 'CD', name: 'Democratic Republic of the Congo', dialCode: '+243' },
  { code: 'CI', name: 'Ivory Coast', dialCode: '+225' },
  { code: 'HR', name: 'Croatia', dialCode: '+385' },
  { code: 'CZ', name: 'Czech Republic', dialCode: '+420' },
  { code: 'DK', name: 'Denmark', dialCode: '+45' },
  { code: 'DJ', name: 'Djibouti', dialCode: '+253' },
  { code: 'EG', name: 'Egypt', dialCode: '+20' },
  { code: 'ER', name: 'Eritrea', dialCode: '+291' },
  { code: 'EE', name: 'Estonia', dialCode: '+372' },
  { code: 'ET', name: 'Ethiopia', dialCode: '+251' },
  { code: 'FI', name: 'Finland', dialCode: '+358' },
  { code: 'FR', name: 'France', dialCode: '+33' },
  { code: 'GA', name: 'Gabon', dialCode: '+241' },
  { code: 'GM', name: 'Gambia', dialCode: '+220' },
  { code: 'GE', name: 'Georgia', dialCode: '+995' },
  { code: 'DE', name: 'Germany', dialCode: '+49' },
  { code: 'GH', name: 'Ghana', dialCode: '+233' },
  { code: 'GN', name: 'Guinea', dialCode: '+224' },
  { code: 'GQ', name: 'Equatorial Guinea', dialCode: '+240' },
  { code: 'GW', name: 'Guinea-Bissau', dialCode: '+245' },
  { code: 'GR', name: 'Greece', dialCode: '+30' },
  { code: 'IE', name: 'Ireland', dialCode: '+353' },
  { code: 'IL', name: 'Israel', dialCode: '+972' },
  { code: 'IN', name: 'India', dialCode: '+91' },
  { code: 'IT', name: 'Italy', dialCode: '+39' },
  { code: 'JP', name: 'Japan', dialCode: '+81' },
  { code: 'KE', name: 'Kenya', dialCode: '+254' },
  { code: 'KM', name: 'Comoros', dialCode: '+269' },
  { code: 'KR', name: 'South Korea', dialCode: '+82' },
  { code: 'LS', name: 'Lesotho', dialCode: '+266' },
  { code: 'LV', name: 'Latvia', dialCode: '+371' },
  { code: 'LR', name: 'Liberia', dialCode: '+231' },
  { code: 'LT', name: 'Lithuania', dialCode: '+370' },
  { code: 'MG', name: 'Madagascar', dialCode: '+261' },
  { code: 'MW', name: 'Malawi', dialCode: '+265' },
  { code: 'ML', name: 'Mali', dialCode: '+223' },
  { code: 'YT', name: 'Mayotte', dialCode: '+262' },
  { code: 'MU', name: 'Mauritius', dialCode: '+230' },
  { code: 'MX', name: 'Mexico', dialCode: '+52' },
  { code: 'MZ', name: 'Mozambique', dialCode: '+258' },
  { code: 'NA', name: 'Namibia', dialCode: '+264' },
  { code: 'NE', name: 'Niger', dialCode: '+227' },
  { code: 'NG', name: 'Nigeria', dialCode: '+234' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31' },
  { code: 'NO', name: 'Norway', dialCode: '+47' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64' },
  { code: 'PL', name: 'Poland', dialCode: '+48' },
  { code: 'PT', name: 'Portugal', dialCode: '+351' },
  { code: 'RE', name: 'Réunion', dialCode: '+262' },
  { code: 'RO', name: 'Romania', dialCode: '+40' },
  { code: 'RU', name: 'Russia', dialCode: '+7' },
  { code: 'RW', name: 'Rwanda', dialCode: '+250' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966' },
  { code: 'SC', name: 'Seychelles', dialCode: '+248' },
  { code: 'SL', name: 'Sierra Leone', dialCode: '+232' },
  { code: 'SK', name: 'Slovakia', dialCode: '+421' },
  { code: 'SI', name: 'Slovenia', dialCode: '+386' },
  { code: 'SO', name: 'Somalia', dialCode: '+252' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27' },
  { code: 'SS', name: 'South Sudan', dialCode: '+211' },
  { code: 'ES', name: 'Spain', dialCode: '+34' },
  { code: 'ST', name: 'São Tomé and Príncipe', dialCode: '+239' },
  { code: 'SZ', name: 'Eswatini', dialCode: '+268' },
  { code: 'SD', name: 'Sudan', dialCode: '+249' },
  { code: 'SE', name: 'Sweden', dialCode: '+46' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41' },
  { code: 'TR', name: 'Turkey', dialCode: '+90' },
  { code: 'TZ', name: 'Tanzania', dialCode: '+255' },
  { code: 'UG', name: 'Uganda', dialCode: '+256' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
  { code: 'US', name: 'United States', dialCode: '+1' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971' },
  { code: 'ZM', name: 'Zambia', dialCode: '+260' },
  { code: 'ZW', name: 'Zimbabwe', dialCode: '+263' },
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
