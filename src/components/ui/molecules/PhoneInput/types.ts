export type PhoneInputProps = {
  value?: string | { countryCode: string; dialCode: string; number: string };
  onChange?: (value: any) => void;
  onCountryChange?: (country: Country) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  required?: boolean;
};

export type Country = {
  code: string;
  name: string;
  dialCode: string;
};
