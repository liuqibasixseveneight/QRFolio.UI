import { useState, useEffect } from 'react';
import { Input, Label } from '../../atoms';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select';
import type { PhoneInputProps } from './types';

const countries = [
  { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
  { code: 'US', name: 'United States', dialCode: '+1' },
  { code: 'CA', name: 'Canada', dialCode: '+1' },
  { code: 'AU', name: 'Australia', dialCode: '+61' },
  { code: 'DE', name: 'Germany', dialCode: '+49' },
  { code: 'FR', name: 'France', dialCode: '+33' },
  { code: 'IT', name: 'Italy', dialCode: '+39' },
  { code: 'ES', name: 'Spain', dialCode: '+34' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31' },
  { code: 'SE', name: 'Sweden', dialCode: '+46' },
  { code: 'NO', name: 'Norway', dialCode: '+47' },
  { code: 'DK', name: 'Denmark', dialCode: '+45' },
  { code: 'FI', name: 'Finland', dialCode: '+358' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41' },
  { code: 'AT', name: 'Austria', dialCode: '+43' },
  { code: 'BE', name: 'Belgium', dialCode: '+32' },
  { code: 'IE', name: 'Ireland', dialCode: '+353' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64' },
  { code: 'JP', name: 'Japan', dialCode: '+81' },
  { code: 'KR', name: 'South Korea', dialCode: '+82' },
  { code: 'CN', name: 'China', dialCode: '+86' },
  { code: 'IN', name: 'India', dialCode: '+91' },
  { code: 'BR', name: 'Brazil', dialCode: '+55' },
  { code: 'MX', name: 'Mexico', dialCode: '+52' },
  { code: 'AR', name: 'Argentina', dialCode: '+54' },
  { code: 'CL', name: 'Chile', dialCode: '+56' },
  { code: 'CO', name: 'Colombia', dialCode: '+57' },
  { code: 'PE', name: 'Peru', dialCode: '+51' },
  { code: 'VE', name: 'Venezuela', dialCode: '+58' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27' },
  { code: 'EG', name: 'Egypt', dialCode: '+20' },
  { code: 'NG', name: 'Nigeria', dialCode: '+234' },
  { code: 'KE', name: 'Kenya', dialCode: '+254' },
  { code: 'GH', name: 'Ghana', dialCode: '+233' },
  { code: 'UG', name: 'Uganda', dialCode: '+256' },
  { code: 'TZ', name: 'Tanzania', dialCode: '+255' },
  { code: 'ZM', name: 'Zambia', dialCode: '+260' },
  { code: 'ZW', name: 'Zimbabwe', dialCode: '+263' },
  { code: 'MW', name: 'Malawi', dialCode: '+265' },
  { code: 'BW', name: 'Botswana', dialCode: '+267' },
  { code: 'NA', name: 'Namibia', dialCode: '+264' },
  { code: 'SZ', name: 'Eswatini', dialCode: '+268' },
  { code: 'LS', name: 'Lesotho', dialCode: '+266' },
  { code: 'MG', name: 'Madagascar', dialCode: '+261' },
  { code: 'MU', name: 'Mauritius', dialCode: '+230' },
  { code: 'SC', name: 'Seychelles', dialCode: '+248' },
  { code: 'KM', name: 'Comoros', dialCode: '+269' },
  { code: 'YT', name: 'Mayotte', dialCode: '+262' },
  { code: 'RE', name: 'Réunion', dialCode: '+262' },
  { code: 'DJ', name: 'Djibouti', dialCode: '+253' },
  { code: 'SO', name: 'Somalia', dialCode: '+252' },
  { code: 'ET', name: 'Ethiopia', dialCode: '+251' },
  { code: 'ER', name: 'Eritrea', dialCode: '+291' },
  { code: 'SD', name: 'Sudan', dialCode: '+249' },
  { code: 'SS', name: 'South Sudan', dialCode: '+211' },
  { code: 'CF', name: 'Central African Republic', dialCode: '+236' },
  { code: 'TD', name: 'Chad', dialCode: '+235' },
  { code: 'CM', name: 'Cameroon', dialCode: '+237' },
  { code: 'GQ', name: 'Equatorial Guinea', dialCode: '+240' },
  { code: 'GA', name: 'Gabon', dialCode: '+241' },
  { code: 'CG', name: 'Republic of the Congo', dialCode: '+242' },
  { code: 'CD', name: 'Democratic Republic of the Congo', dialCode: '+243' },
  { code: 'AO', name: 'Angola', dialCode: '+244' },
  { code: 'CV', name: 'Cape Verde', dialCode: '+238' },
  { code: 'GW', name: 'Guinea-Bissau', dialCode: '+245' },
  { code: 'GN', name: 'Guinea', dialCode: '+224' },
  { code: 'SL', name: 'Sierra Leone', dialCode: '+232' },
  { code: 'LR', name: 'Liberia', dialCode: '+231' },
  { code: 'CI', name: 'Ivory Coast', dialCode: '+225' },
  { code: 'BF', name: 'Burkina Faso', dialCode: '+226' },
  { code: 'ML', name: 'Mali', dialCode: '+223' },
  { code: 'NE', name: 'Niger', dialCode: '+227' },
  { code: 'SN', name: 'Senegal', dialCode: '+221' },
  { code: 'GM', name: 'Gambia', dialCode: '+220' },
  { code: 'TG', name: 'Togo', dialCode: '+228' },
  { code: 'BJ', name: 'Benin', dialCode: '+229' },
  { code: 'ST', name: 'São Tomé and Príncipe', dialCode: '+239' },
  { code: 'PT', name: 'Portugal', dialCode: '+351' },
  { code: 'LU', name: 'Luxembourg', dialCode: '+352' },
  { code: 'MC', name: 'Monaco', dialCode: '+377' },
  { code: 'LI', name: 'Liechtenstein', dialCode: '+423' },
  { code: 'VA', name: 'Vatican City', dialCode: '+379' },
  { code: 'SM', name: 'San Marino', dialCode: '+378' },
  { code: 'AD', name: 'Andorra', dialCode: '+376' },
  { code: 'GR', name: 'Greece', dialCode: '+30' },
  { code: 'CY', name: 'Cyprus', dialCode: '+357' },
  { code: 'MT', name: 'Malta', dialCode: '+356' },
  { code: 'HR', name: 'Croatia', dialCode: '+385' },
  { code: 'SI', name: 'Slovenia', dialCode: '+386' },
  { code: 'HU', name: 'Hungary', dialCode: '+36' },
  { code: 'SK', name: 'Slovakia', dialCode: '+421' },
  { code: 'CZ', name: 'Czech Republic', dialCode: '+420' },
  { code: 'PL', name: 'Poland', dialCode: '+48' },
  { code: 'LT', name: 'Lithuania', dialCode: '+370' },
  { code: 'LV', name: 'Latvia', dialCode: '+371' },
  { code: 'EE', name: 'Estonia', dialCode: '+372' },
  { code: 'RU', name: 'Russia', dialCode: '+7' },
  { code: 'BY', name: 'Belarus', dialCode: '+375' },
  { code: 'UA', name: 'Ukraine', dialCode: '+380' },
  { code: 'MD', name: 'Moldova', dialCode: '+373' },
  { code: 'RO', name: 'Romania', dialCode: '+40' },
  { code: 'BG', name: 'Bulgaria', dialCode: '+359' },
  { code: 'RS', name: 'Serbia', dialCode: '+381' },
  { code: 'ME', name: 'Montenegro', dialCode: '+382' },
  { code: 'BA', name: 'Bosnia and Herzegovina', dialCode: '+387' },
  { code: 'MK', name: 'North Macedonia', dialCode: '+389' },
  { code: 'AL', name: 'Albania', dialCode: '+355' },
  { code: 'XK', name: 'Kosovo', dialCode: '+383' },
  { code: 'TR', name: 'Turkey', dialCode: '+90' },
  { code: 'GE', name: 'Georgia', dialCode: '+995' },
  { code: 'AM', name: 'Armenia', dialCode: '+374' },
  { code: 'AZ', name: 'Azerbaijan', dialCode: '+994' },
  { code: 'IL', name: 'Israel', dialCode: '+972' },
  { code: 'PS', name: 'Palestine', dialCode: '+970' },
  { code: 'JO', name: 'Jordan', dialCode: '+962' },
  { code: 'LB', name: 'Lebanon', dialCode: '+961' },
  { code: 'SY', name: 'Syria', dialCode: '+963' },
  { code: 'IQ', name: 'Iraq', dialCode: '+964' },
  { code: 'IR', name: 'Iran', dialCode: '+98' },
  { code: 'AF', name: 'Afghanistan', dialCode: '+93' },
  { code: 'PK', name: 'Pakistan', dialCode: '+92' },
  { code: 'BD', name: 'Bangladesh', dialCode: '+880' },
  { code: 'LK', name: 'Sri Lanka', dialCode: '+94' },
  { code: 'MV', name: 'Maldives', dialCode: '+960' },
  { code: 'NP', name: 'Nepal', dialCode: '+977' },
  { code: 'BT', name: 'Bhutan', dialCode: '+975' },
  { code: 'MM', name: 'Myanmar', dialCode: '+95' },
  { code: 'TH', name: 'Thailand', dialCode: '+66' },
  { code: 'LA', name: 'Laos', dialCode: '+856' },
  { code: 'KH', name: 'Cambodia', dialCode: '+855' },
  { code: 'VN', name: 'Vietnam', dialCode: '+84' },
  { code: 'MY', name: 'Malaysia', dialCode: '+60' },
  { code: 'SG', name: 'Singapore', dialCode: '+65' },
  { code: 'ID', name: 'Indonesia', dialCode: '+62' },
  { code: 'PH', name: 'Philippines', dialCode: '+63' },
  { code: 'TW', name: 'Taiwan', dialCode: '+886' },
  { code: 'HK', name: 'Hong Kong', dialCode: '+852' },
  { code: 'MO', name: 'Macau', dialCode: '+853' },
  { code: 'MN', name: 'Mongolia', dialCode: '+976' },
  { code: 'KZ', name: 'Kazakhstan', dialCode: '+7' },
  { code: 'UZ', name: 'Uzbekistan', dialCode: '+998' },
  { code: 'KG', name: 'Kyrgyzstan', dialCode: '+996' },
  { code: 'TJ', name: 'Tajikistan', dialCode: '+992' },
  { code: 'TM', name: 'Turkmenistan', dialCode: '+993' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966' },
  { code: 'QA', name: 'Qatar', dialCode: '+974' },
  { code: 'BH', name: 'Bahrain', dialCode: '+973' },
  { code: 'KW', name: 'Kuwait', dialCode: '+965' },
  { code: 'OM', name: 'Oman', dialCode: '+968' },
  { code: 'YE', name: 'Yemen', dialCode: '+967' },
];

export const PhoneInput = ({
  label,
  value,
  onChange,
  error,
  required,
}: PhoneInputProps) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (value) {
      if (typeof value === 'string') {
        setPhoneNumber(value);
      } else if (value && typeof value === 'object' && value.number) {
        setPhoneNumber(value.number);
        // Try to find the country by dial code
        if (value.dialCode) {
          const country = countries.find((c) => c.dialCode === value.dialCode);
          if (country) setSelectedCountry(country);
        }
      }
    }
  }, [value]);

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find((c) => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
      updatePhoneData(country, phoneNumber);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value;
    setPhoneNumber(newNumber);
    updatePhoneData(selectedCountry, newNumber);
  };

  const updatePhoneData = (country: (typeof countries)[0], number: string) => {
    const phoneData = {
      countryCode: country.code,
      dialCode: country.dialCode,
      number: number,
      flag: '',
    };
    onChange?.(phoneData);
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
        <Select
          value={selectedCountry.code}
          onValueChange={handleCountryChange}
        >
          <SelectTrigger className='w-48 h-11 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-gray-300'>
            <SelectValue>
              <span className='text-sm font-medium'>
                {selectedCountry.name} {selectedCountry.dialCode}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                <span className='text-sm'>
                  {country.name} {country.dialCode}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type='tel'
          placeholder='Enter phone number'
          value={phoneNumber}
          onChange={handlePhoneChange}
          className='flex-1'
        />
      </div>
      {error && <p className='text-sm text-red-600 font-medium'>{error}</p>}
    </div>
  );
};
