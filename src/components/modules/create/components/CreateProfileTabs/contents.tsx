import { FormField, DynamicFieldSection } from '@/components/ui';
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
              error={errors.phone?.message}
              required
            />

            <FormField
              label='LinkedIn Profile'
              type='input'
              register={register}
              registerName='linkedin'
              placeholder='Enter your LinkedIn URL'
              error={errors.linkedin?.message}
            />

            <FormField
              label='Portfolio Website'
              type='input'
              register={register}
              registerName='portfolio'
              placeholder='Enter your portfolio URL'
              error={errors.portfolio?.message}
            />

            <FormField
              label='Availability Status'
              type='select'
              register={register}
              registerName='availability'
              error={errors.availability?.message}
              options={[
                {
                  value: 'available',
                  label: 'Available - Open to new opportunities',
                },
                {
                  value: 'open',
                  label:
                    'Open to Opportunities - Selectively considering offers',
                },
                {
                  value: 'unavailable',
                  label: 'Not Available - Currently not accepting offers',
                },
              ]}
              required
            />

            <FormField
              label='Professional Summary'
              type='textarea'
              register={register}
              registerName='professionalSummary'
              placeholder='Tell us about yourself professionally...'
              error={errors.professionalSummary?.message}
              rows={4}
              required
            />
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
            onRemove={(index) => {
              removeWork(index);
              if (activeWorkIndex === index) {
                setActiveWorkIndex(null);
              } else if (activeWorkIndex !== null && activeWorkIndex > index) {
                setActiveWorkIndex(activeWorkIndex - 1);
              }
            }}
            onAppend={() => {
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
            appendLabel='Add Employment'
            activeIndex={activeWorkIndex}
            setActiveIndex={setActiveWorkIndex}
          />
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
              onRemove={(index) => {
                removeEdu(index);
                if (activeEduIndex === index) {
                  setActiveEduIndex(null);
                } else if (activeEduIndex !== null && activeEduIndex > index) {
                  setActiveEduIndex(activeEduIndex - 1);
                }
              }}
              onAppend={() => {
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
              appendLabel='Add Education'
              activeIndex={activeEduIndex}
              setActiveIndex={setActiveEduIndex}
            />

            <DynamicFieldSection
              title='Languages'
              titleField='language'
              fields={mutableLanguageFields}
              fieldsConfig={languageConfig}
              registerNamePrefix='languages'
              errors={errors}
              register={register}
              control={control}
              onRemove={(index) => {
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
              onAppend={() => {
                appendLanguage({ language: '', fluencyLevel: 'Beginner' });
                setActiveLanguageIndex(mutableLanguageFields.length);
              }}
              appendLabel='Add Language'
              activeIndex={activeLanguageIndex}
              setActiveIndex={setActiveLanguageIndex}
            />
          </div>
        </section>
      ),
    },
  ];

  return contents;
};
