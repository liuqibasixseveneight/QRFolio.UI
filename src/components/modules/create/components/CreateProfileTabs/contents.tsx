import { FormField, DynamicFieldSection, Button } from '@/components/ui';
import type { ContentsItem } from '@/components/ui/organisms';
import {
  workExperienceConfig,
  educationConfig,
  languageConfig,
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
  activeWorkIndex,
  setActiveWorkIndex,
  activeEduIndex,
  setActiveEduIndex,
  activeLanguageIndex,
  setActiveLanguageIndex,
}: contentsProps) => {
  const mutableWorkFields = [...workFields];
  const mutableEduFields = [...eduFields];
  const mutableLanguageFields = [...languageFields];

  const contents: ContentsItem[] = [
    {
      value: 'introduction',
      content: (
        <section className='space-y-8'>
          <div>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>
              Introduction
            </h2>
            <p className='text-gray-600 mb-6'>
              Start with your basic information and professional summary.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <FormField
              label='Full Name'
              type='input'
              register={register}
              registerName='fullName'
              placeholder='Enter your full name'
              error={errors.fullName?.message}
              required
            />

            <FormField
              label='Email'
              type='input'
              register={register}
              registerName='email'
              placeholder='Enter your email address'
              error={errors.email?.message}
              required
            />

            <FormField
              label='Phone Number'
              type='phone'
              control={control}
              registerName='phone'
              error={errors.phone?.message?.toString()}
            />

            <FormField
              label='LinkedIn Profile'
              type='input'
              register={register}
              registerName='linkedin'
              placeholder='Enter your LinkedIn URL'
              error={errors.linkedin?.message?.toString()}
            />

            <FormField
              label='Portfolio Website'
              type='input'
              register={register}
              registerName='portfolio'
              placeholder='Enter your portfolio URL'
              error={errors.portfolio?.message?.toString()}
            />

            <FormField
              label='Availability Status'
              type='select'
              control={control}
              registerName='availability'
              error={errors.availability?.message?.toString()}
              options={[
                {
                  value: 'available',
                  label: 'Available',
                },
                {
                  value: 'open',
                  label: 'Open',
                },
                {
                  value: 'unavailable',
                  label: 'Unavailable',
                },
              ]}
              required
            />

            <div className='md:col-span-2'>
              <FormField
                label='Professional Summary'
                type='textarea'
                register={register}
                registerName='professionalSummary'
                placeholder='Tell us about yourself professionally...'
                error={errors.professionalSummary?.message?.toString()}
                rows={4}
                required
              />
            </div>
          </div>
        </section>
      ),
    },
    {
      value: 'work',
      content: (
        <section className='space-y-6'>
          <div className='border-b border-gray-200 pb-4'>
            <h2 className='text-2xl font-semibold text-gray-800 tracking-tight'>
              Employment and Work Experience
            </h2>
            <p className='text-gray-600 mt-2'>
              Detail your work history, responsibilities, and achievements.
            </p>
          </div>

          <DynamicFieldSection
            title='Work Experience'
            titleField='jobTitle'
            fields={mutableWorkFields}
            fieldsConfig={workExperienceConfig}
            registerNamePrefix='workExperience'
            errors={errors}
            register={register}
            control={control}
            onRemove={(index: number) => {
              removeWork(index);
              if (activeWorkIndex === index) {
                setActiveWorkIndex(null);
              } else if (activeWorkIndex !== null && activeWorkIndex > index) {
                setActiveWorkIndex(activeWorkIndex - 1);
              }
            }}
          />

          <Button
            type='button'
            variant='outline'
            onClick={() => {
              appendWork({
                jobTitle: '',
                companyName: '',
                location: '',
                dateFrom: '',
                dateTo: '',
                responsibilities: '',
              });
              setActiveWorkIndex(mutableWorkFields.length);
            }}
            className='w-full sm:w-auto'
          >
            Add Employment
          </Button>
        </section>
      ),
    },
    {
      value: 'education',
      content: (
        <section className='space-y-8'>
          <div className='border-b border-gray-200 pb-4'>
            <h2 className='text-2xl font-semibold text-gray-800 tracking-tight'>
              Education and Languages
            </h2>
            <p className='text-gray-600 mt-2'>
              Include your educational background and language skills.
            </p>
          </div>

          <div className='space-y-8'>
            <DynamicFieldSection
              title='Education and Qualifications'
              titleField='schoolName'
              fields={mutableEduFields}
              fieldsConfig={educationConfig}
              registerNamePrefix='education'
              errors={errors}
              register={register}
              control={control}
              onRemove={(index: number) => {
                removeEdu(index);
                if (activeEduIndex === index) {
                  setActiveEduIndex(null);
                } else if (activeEduIndex !== null && activeEduIndex > index) {
                  setActiveEduIndex(activeEduIndex - 1);
                }
              }}
            />

            <Button
              type='button'
              variant='outline'
              onClick={() => {
                appendEdu({
                  schoolName: '',
                  degree: '',
                  fieldOfStudy: '',
                  dateFrom: '',
                  dateTo: '',
                  description: '',
                });
                setActiveEduIndex(mutableEduFields.length);
              }}
              className='w-full sm:w-auto'
            >
              Add Education
            </Button>

            <DynamicFieldSection
              title='Languages'
              titleField='language'
              fields={mutableLanguageFields}
              fieldsConfig={languageConfig}
              registerNamePrefix='languages'
              errors={errors}
              register={register}
              control={control}
              onRemove={(index: number) => {
                removeLanguage(index);
                if (activeLanguageIndex === index) {
                  setActiveLanguageIndex(null);
                } else if (
                  activeLanguageIndex !== null &&
                  activeLanguageIndex > index
                ) {
                  setActiveLanguageIndex(activeLanguageIndex - 1);
                }
              }}
            />

            <Button
              type='button'
              variant='outline'
              onClick={() => {
                appendLanguage({ language: '', fluencyLevel: 'Beginner' });
                setActiveLanguageIndex(mutableLanguageFields.length);
              }}
              className='w-full sm:w-auto'
            >
              Add Language
            </Button>
          </div>
        </section>
      ),
    },
  ];

  return contents;
};
