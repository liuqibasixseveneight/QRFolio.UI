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
            rows={10}
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
        </>
      ),
    },
  ];

  return contents;
};
