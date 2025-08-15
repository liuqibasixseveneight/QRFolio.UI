export type PhoneInputProps = {
  label?: string;
  value?:
    | string
    | { countryCode: string; dialCode: string; number: string; flag: string };
  onChange?: (value: {
    countryCode: string;
    dialCode: string;
    number: string;
    flag: string;
  }) => void;
  error?: string;
  required?: boolean;
};
