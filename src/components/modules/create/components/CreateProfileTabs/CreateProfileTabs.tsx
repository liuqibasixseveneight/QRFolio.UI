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
import {
  EMPTY_EDU_ENTRY,
  EMPTY_LANGUAGE_ENTRY,
  EMPTY_WORK_ENTRY,
  removeEmptyEntries,
} from '../../utils';
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
    formState: { errors },
  } = useForm<CVFormValues>({
    resolver: zodResolver(introSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      linkedin: '',
      portfolio: '',
      professionalSummary: '',
      workExperience: [EMPTY_WORK_ENTRY],
      education: [EMPTY_EDU_ENTRY],
      languages: [EMPTY_LANGUAGE_ENTRY],
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
    const cleanedData = removeEmptyEntries(data);

    try {
      await createProfile({
        id: userId || '',
        ...cleanedData,
      });

      if (data && !loading) {
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
      console.error('Error when creating profile:', err);
    }
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
      handleAppend(
        appendWork,
        setActiveWorkIndex,
        workFields.length,
        EMPTY_WORK_ENTRY
      ),
    removeWork,
    eduFields,
    appendEdu: () =>
      handleAppend(
        appendEdu,
        setActiveEduIndex,
        eduFields.length,
        EMPTY_EDU_ENTRY
      ),
    removeEdu,
    languageFields,
    appendLanguage: () =>
      handleAppend(
        appendLanguage,
        setActiveLanguageIndex,
        languageFields.length,
        EMPTY_LANGUAGE_ENTRY
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
    <main className='min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-gray-900 font-sans flex flex-col'>
      {/* Header Section */}
      <header className='w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg px-6 sm:px-8 xl:px-12 2xl:px-20 py-12 sm:py-16 text-left'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-gray-900 mb-4'>
            Create Your Profile
          </h1>
          <p className='text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl'>
            Build your professional profile by filling out the sections below.
            This information will be used to generate your personalized QR code
            and resume.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className='flex-1 px-6 sm:px-8 xl:px-12 2xl:px-20 py-8 sm:py-10'>
        <div className='max-w-4xl mx-auto'>
          <form
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            className='space-y-8'
          >
            {/* Tabs Section */}
            <div className='bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8'>
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
                type='submit'
                size='lg'
                className='bg-neutral-900 text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-all duration-200 shadow-sm hover:shadow-md font-medium text-base'
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
