import { FormattedMessage } from 'react-intl';

import {
  FormField,
  DynamicFieldSection,
  Button,
  CategorizedSkillsInput,
} from '@/components/ui';
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
  skillsFields,
  onSkillsChange,
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
  const mutableSkillsFields = [...skillsFields];

  const contents: ContentsItem[] = [
    {
      value: 'introduction',
      content: (
        <section className='space-y-6'>
          <div className='border-b border-gray-200 pb-4'>
            <h2 className='text-2xl font-semibold text-gray-800 tracking-tight'>
              <FormattedMessage id='createProfile.sections.introduction.title' />
            </h2>
            <p className='text-gray-600 mt-2'>
              <FormattedMessage id='createProfile.sections.introduction.description' />
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <FormField
              label={<FormattedMessage id='forms.fullName' />}
              type='input'
              register={register}
              registerName='fullName'
              placeholder={
                <FormattedMessage id='forms.placeholders.fullName' />
              }
              error={errors.fullName?.message}
              required
            />

            <FormField
              label={<FormattedMessage id='forms.email' />}
              type='input'
              register={register}
              registerName='email'
              placeholder={<FormattedMessage id='forms.placeholders.email' />}
              error={errors.email?.message}
              required
            />

            <FormField
              label={<FormattedMessage id='forms.phoneNumber' />}
              type='phone'
              control={control}
              registerName='phone'
              error={errors.phone?.message?.toString()}
            />

            <FormField
              label={<FormattedMessage id='forms.linkedinProfile' />}
              type='input'
              register={register}
              registerName='linkedin'
              placeholder={
                <FormattedMessage id='forms.placeholders.linkedinUrl' />
              }
              error={errors.linkedin?.message?.toString()}
            />

            <FormField
              label={<FormattedMessage id='forms.portfolioWebsite' />}
              type='input'
              register={register}
              registerName='portfolio'
              placeholder={
                <FormattedMessage id='forms.placeholders.portfolioUrl' />
              }
              error={errors.portfolio?.message?.toString()}
            />

            <FormField
              label={<FormattedMessage id='forms.availabilityStatus' />}
              type='select'
              control={control}
              registerName='availability'
              error={errors.availability?.message?.toString()}
              options={[
                {
                  value: 'available',
                  label: <FormattedMessage id='forms.availability.available' />,
                },
                {
                  value: 'open',
                  label: <FormattedMessage id='forms.availability.open' />,
                },
                {
                  value: 'unavailable',
                  label: (
                    <FormattedMessage id='forms.availability.unavailable' />
                  ),
                },
              ]}
              required
            />

            <div className='md:col-span-2'>
              <FormField
                label={<FormattedMessage id='forms.professionalSummary' />}
                type='textarea'
                register={register}
                registerName='professionalSummary'
                placeholder={
                  <FormattedMessage id='forms.placeholders.professionalSummary' />
                }
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
              <FormattedMessage id='createProfile.sections.workExperience.title' />
            </h2>
            <p className='text-gray-600 mt-2'>
              <FormattedMessage id='createProfile.sections.workExperience.description' />
            </p>
          </div>

          <DynamicFieldSection
            title={
              <FormattedMessage id='createProfile.sections.workExperience.sectionTitle' />
            }
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
            <FormattedMessage id='createProfile.sections.workExperience.addEmployment' />
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
    {
      value: 'skills',
      content: (
        <section className='space-y-6'>
          <div className='border-b border-gray-200 pb-4'>
            <h2 className='text-2xl font-semibold text-gray-800 tracking-tight'>
              Skills and Competencies
            </h2>
            <p className='text-gray-600 mt-2'>
              Add your key skills and competencies that showcase your expertise.
            </p>
          </div>

          <CategorizedSkillsInput
            skillCategories={mutableSkillsFields.map((field) => ({
              title: field.title || '',
              skills: field.skills || [],
            }))}
            onSkillsChange={onSkillsChange}
            placeholder='Type a skill and press Enter to add it...'
          />
        </section>
      ),
    },
  ];

  return contents;
};
