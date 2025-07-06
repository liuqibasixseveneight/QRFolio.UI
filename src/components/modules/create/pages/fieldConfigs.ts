import type { FieldConfig } from '@/components/ui/molecules';

const workExperienceConfig: FieldConfig[] = [
  { name: 'jobTitle', label: 'Job Title', type: 'input' },
  { name: 'companyName', label: 'Company Name', type: 'input' },
  { name: 'location', label: 'Location', type: 'input' },
  { name: 'dateFrom', label: 'Date From', type: 'date' },
  { name: 'dateTo', label: 'Date To', type: 'date' },
  {
    name: 'responsibilities',
    label: 'Responsibilities',
    type: 'textarea',
    rows: 3,
  },
];

const educationConfig: FieldConfig[] = [
  { name: 'schoolName', label: 'School Name', type: 'input' },
  { name: 'degree', label: 'Degree', type: 'input' },
  { name: 'fieldOfStudy', label: 'Field of Study', type: 'input' },
  { name: 'dateFrom', label: 'Date From', type: 'date' },
  { name: 'dateTo', label: 'Date To', type: 'date' },
  { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
];

const languageConfig: FieldConfig[] = [
  { name: 'language', label: 'Language', type: 'input' },
  {
    name: 'fluencyLevel',
    label: 'Fluency Level',
    type: 'select',
    options: [
      { label: 'Beginner', value: 'Beginner' },
      { label: 'Intermediate', value: 'Intermediate' },
      { label: 'Advanced', value: 'Advanced' },
      { label: 'Fluent', value: 'Fluent' },
      { label: 'Native', value: 'Native' },
    ],
  },
];

export { workExperienceConfig, educationConfig, languageConfig };
