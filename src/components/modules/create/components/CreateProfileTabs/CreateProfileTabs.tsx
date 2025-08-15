import { useState } from 'react';
import { useForm, useFieldArray, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { flattenErrors, routes } from '@/utils';
import { Button, ErrorDisplay, TabbedSections } from '@/components/ui';
import type { CVFormValues } from '../../types';
import { introSchema } from '../../schemas';
import { contents } from './contents';
import { tabs } from './tabs';
import { useCreateProfile } from '@/apollo/profile';
import { useAuth } from '@/context';

const CreateProfileTabs = () => {
  const navigate = useNavigate();

  const [submissionErrors, setSubmissionErrors] = useState<string[]>([]);
  const [activeWorkIndex, setActiveWorkIndex] = useState<number | null>(0);
  const [activeEduIndex, setActiveEduIndex] = useState<number | null>(0);
  const [activeLanguageIndex, setActiveLanguageIndex] = useState<number | null>(
    0
  );

  const { userId } = useAuth();

  const [
    createProfile,
    // @ts-ignore
    { data, loading, error },
  ] = useCreateProfile();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<CVFormValues>({
    resolver: zodResolver(introSchema),
    defaultValues: {
      fullName: '',
      phone: undefined,
      email: '',
      linkedin: '',
      portfolio: '',
      professionalSummary: '',
      availability: 'available',
      workExperience: [
        {
          jobTitle: '',
          companyName: '',
          location: '',
          dateFrom: '',
          dateTo: '',
          responsibilities: '',
        },
      ],
      education: [
        {
          schoolName: '',
          degree: '',
          fieldOfStudy: '',
          dateFrom: '',
          dateTo: '',
          description: '',
        },
      ],
      languages: [
        {
          language: '',
          fluencyLevel: 'Beginner' as const,
        },
      ],
    },
  });

  const {
    fields: workFields,
    append: appendWork,
    remove: removeWork,
  } = useFieldArray({ control, name: 'workExperience' });
  const {
    fields: eduFields,
    append: appendEdu,
    remove: removeEdu,
  } = useFieldArray({ control, name: 'education' });
  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({ control, name: 'languages' });

  const handleAppend = (
    appendFn: Function,
    setIndex: Function,
    fieldsLength: number,
    emptyEntry: object
  ) => {
    appendFn(emptyEntry);
    setIndex(fieldsLength);
  };

  const onSubmit = async (data: CVFormValues) => {
    try {
      const result = await createProfile({
        id: userId || '',
        fullName: data.fullName,
        email: data.email,
        professionalSummary: data.professionalSummary,
        availability: data.availability,
        phone: data.phone,
        linkedin: data.linkedin,
        portfolio: data.portfolio,
        workExperience: data.workExperience.filter(
          (entry) =>
            entry.jobTitle &&
            entry.companyName &&
            entry.location &&
            entry.dateFrom &&
            entry.dateTo &&
            entry.responsibilities
        ),
        education: data.education.filter(
          (entry) =>
            entry.schoolName &&
            entry.degree &&
            entry.fieldOfStudy &&
            entry.dateFrom &&
            entry.dateTo &&
            entry.description
        ),
        languages: data.languages.filter(
          (entry) => entry.language && entry.fluencyLevel
        ),
      });

      if (result && !loading) {
        navigate(routes?.PROFILE_CREATED);
      } else {
        setSubmissionErrors([
          'Something went wrong while creating your profile.',
        ]);
      }
    } catch (err) {
      setSubmissionErrors([
        'Failed to submit profile. Please try again later.',
      ]);
    }
  };

  const handleButtonClick = () => {
    // Trigger form submission
    handleSubmit(onSubmit, onInvalid)();
  };

  const onInvalid = (errors: FieldErrors<CVFormValues>) => {
    setSubmissionErrors(flattenErrors(errors));
  };

  const tabContents = contents({
    register,
    errors,
    control,
    workFields,
    appendWork: () =>
      handleAppend(appendWork, setActiveWorkIndex, workFields.length, {
        jobTitle: '',
        companyName: '',
        location: '',
        dateFrom: '',
        dateTo: '',
        responsibilities: '',
      }),
    removeWork,
    eduFields,
    appendEdu: () =>
      handleAppend(appendEdu, setActiveEduIndex, eduFields.length, {
        schoolName: '',
        degree: '',
        fieldOfStudy: '',
        dateFrom: '',
        dateTo: '',
        description: '',
      }),
    removeEdu,
    languageFields,
    appendLanguage: () =>
      handleAppend(
        appendLanguage,
        setActiveLanguageIndex,
        languageFields.length,
        {
          language: '',
          fluencyLevel: 'Beginner' as const,
        }
      ),
    removeLanguage,
    activeWorkIndex,
    setActiveWorkIndex,
    activeEduIndex,
    setActiveEduIndex,
    activeLanguageIndex,
    setActiveLanguageIndex,
  });

  return (
    <main className='min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-gray-900 font-sans relative'>
      {/* Subtle background elements */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-50/40 rounded-full blur-3xl'></div>
      </div>

      {/* Header Section */}
      <header className='relative w-full overflow-hidden bg-white border-b border-gray-200'>
        {/* Background with subtle gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-indigo-100/50'></div>

        {/* Subtle background elements */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute -top-40 -right-40 w-80 h-80 bg-indigo-100/20 rounded-full blur-3xl'></div>
          <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-50/30 rounded-full blur-3xl'></div>
        </div>

        {/* Content */}
        <div className='relative z-10 px-4 sm:px-6 lg:px-8 xl:px-12 py-16 sm:py-20 lg:py-24 xl:py-32'>
          <div className='max-w-7xl mx-auto'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-gray-900 mb-6 sm:mb-8'>
              Create Your Profile
            </h1>
            <p className='text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed font-light max-w-4xl'>
              Build your professional profile by filling out the sections below.
              This information will be used to generate your personalized QR
              code and resume.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className='relative z-10 flex-1 px-4 sm:px-6 lg:px-8 xl:px-12 py-8 xl:py-12'>
        <div className='max-w-4xl mx-auto'>
          <form className='space-y-8'>
            {/* Tabs Section */}
            <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 hover:shadow-md hover:border-gray-300 transition-all duration-300'>
              <TabbedSections
                tabs={tabs}
                contents={tabContents}
                defaultValue={tabs?.[0]?.value}
              />
            </div>

            {/* Error Display */}
            <ErrorDisplay errors={submissionErrors} />

            {/* Submit Button */}
            <div className='flex justify-end pt-4'>
              <Button
                type='button'
                size='lg'
                onClick={handleButtonClick}
                className='bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 active:scale-95 shadow-lg hover:shadow-indigo-500/50 border border-indigo-500/20 cursor-pointer'
              >
                Generate Resume
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreateProfileTabs;
