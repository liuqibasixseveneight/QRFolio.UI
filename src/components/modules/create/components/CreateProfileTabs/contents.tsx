import { FormField, DynamicFieldSection } from '@/components/ui';
import type { ContentsItem } from '@/components/ui/organisms';
import {
  educationConfig,
  languageConfig,
  workExperienceConfig,
} from '../../pages/fieldConfigs';
import type { contentsProps } from './types';

export const contents = ({
  register,
  errors,
  control,
  workFields,
  appendWork,
  removeWork,
  eduFields,
  appendEdu,
  removeEdu,
  languageFields,
  appendLanguage,
  removeLanguage,
}: contentsProps) => {
  const mutableWorkFields = [...workFields];
  const mutableEduFields = [...eduFields];
  const mutableLanguageFields = [...languageFields];

  const contents: ContentsItem[] = [
    {
      value: 'introduction',
      content: (
        <section className='space-y-4'>
          <h2 className='text-xl font-semibold text-neutral-800'>
            Personal Information
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormField
              label='Full Name'
              register={register}
              registerName='fullName'
              error={errors.fullName?.message}
              required
            />
            <FormField
              label='Email'
              register={register}
              registerName='email'
              error={errors.email?.message}
              required
            />
            <FormField
              label='Phone'
              register={register}
              registerName='phone'
              error={errors.phone?.message}
            />
            <FormField
              label='LinkedIn'
              register={register}
              registerName='linkedin'
              error={errors.linkedin?.message}
            />
            <FormField
              label='Portfolio/Website'
              register={register}
              registerName='portfolio'
              error={errors.portfolio?.message}
            />
          </div>
          <FormField
            label='Professional Summary'
            type='textarea'
            rows={4}
            register={register}
            registerName='professionalSummary'
            error={errors.professionalSummary?.message}
            required
          />
        </section>
      ),
    },
    {
      value: 'work',
      content: (
        <DynamicFieldSection
          title='Employment and Work Experience'
          fields={mutableWorkFields}
          fieldsConfig={workExperienceConfig}
          registerNamePrefix='workExperience'
          errors={errors}
          register={register}
          control={control}
          onRemove={removeWork}
          onAppend={() =>
            appendWork({
              jobTitle: '',
              companyName: '',
              location: '',
              dateFrom: '',
              dateTo: '',
              responsibilities: '',
            })
          }
          appendLabel='Add Employment'
        />
      ),
    },
    {
      value: 'education',
      content: (
        <>
          <DynamicFieldSection
            title='Education and Qualifications'
            fields={mutableEduFields}
            fieldsConfig={educationConfig}
            registerNamePrefix='education'
            errors={errors}
            register={register}
            control={control}
            onRemove={removeEdu}
            onAppend={() =>
              appendEdu({
                schoolName: '',
                degree: '',
                fieldOfStudy: '',
                dateFrom: '',
                dateTo: '',
                description: '',
              })
            }
            appendLabel='Add Education'
          />
          <DynamicFieldSection
            title='Languages'
            fields={mutableLanguageFields}
            fieldsConfig={languageConfig}
            registerNamePrefix='languages'
            errors={errors}
            register={register}
            control={control}
            onRemove={removeLanguage}
            onAppend={() =>
              appendLanguage({ language: '', fluencyLevel: 'Beginner' })
            }
            appendLabel='Add Language'
          />
        </>
      ),
    },
  ];

  return contents;
};
