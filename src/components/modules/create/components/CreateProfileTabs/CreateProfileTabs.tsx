import { useState } from 'react';
import { useForm, useFieldArray, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { flattenErrors, routes } from '@/utils';
import {
  Button,
  ErrorDisplay,
  TabbedSections,
  useToast,
} from '@/components/ui';
import type { CVFormValues } from '../../types';
import { introSchema } from '../../schemas';
import { contents } from './contents';
import { tabs } from './tabs';
import { useCreateProfile } from '@/apollo/profile';
import { useAuth } from '@/context';

const CreateProfileTabs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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
    watch,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<CVFormValues>({
    resolver: zodResolver(introSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
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

  const handleButtonClick = async (formData: CVFormValues) => {
    console.log('Form submitted with data:', formData);
    try {
      // Filter out empty entries
      const filteredWorkExperience =
        formData.workExperience?.filter(
          (work) => work.jobTitle?.trim() && work.companyName?.trim()
        ) || [];

      const filteredEducation =
        formData.education?.filter(
          (edu) => edu.schoolName?.trim() && edu.degree?.trim()
        ) || [];

      const filteredLanguages =
        formData.languages?.filter((lang) => lang.language?.trim()) || [];

      const profileData = {
        id: userId || '',
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        linkedin: formData.linkedin,
        portfolio: formData.portfolio,
        professionalSummary: formData.professionalSummary,
        availability: formData.availability,
        workExperience: filteredWorkExperience,
        education: filteredEducation,
        languages: filteredLanguages,
      };

      console.log('Sending profile data to API:', profileData);

      const result = await createProfile(profileData);

      console.log('API response:', result);

      if (result?.createProfile?.id) {
        toast({
          title: 'Profile Created Successfully! 🎉',
          description:
            'Your professional profile has been generated and is ready to use.',
          variant: 'success',
        });
        navigate(`/profile/${result.createProfile.id}`);
      }
    } catch (err) {
      console.error('Error creating profile:', err);
      toast({
        title: 'Profile Creation Failed',
        description: 'Failed to create profile. Please try again later.',
        variant: 'destructive',
      });
      setSubmissionErrors([
        'Failed to create profile. Please try again later.',
      ]);
    }
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
    <main className='min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-gray-900 font-sans'>
      {/* Subtle background elements */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/10 to-purple-100/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/10 to-indigo-100/10 rounded-full blur-3xl'></div>
      </div>

      {/* Header Section */}
      <header className='relative w-full bg-white/90 backdrop-blur-sm border-b border-gray-200/50'>
        <div className='relative z-10 px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 lg:py-20'>
          <div className='max-w-7xl mx-auto'>
            <div className='text-center max-w-5xl mx-auto'>
              <h1 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-gray-900 mb-4 sm:mb-6'>
                Create Your Profile
              </h1>
              <p className='text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed font-light max-w-4xl mx-auto'>
                Build your professional profile by filling out the sections
                below. This information will be used to generate your
                personalized QR code and resume.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className='relative z-10 flex-1 px-4 sm:px-6 lg:px-8 xl:px-12 py-6 lg:py-8'>
        <div className='w-full'>
          <form
            className='space-y-6'
            onSubmit={handleSubmit(handleButtonClick)}
          >
            {/* Tabs Section */}
            <div className='bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8'>
              <TabbedSections
                tabs={tabs}
                contents={tabContents}
                defaultValue={tabs?.[0]?.value}
              />
            </div>

            {/* Error Display */}
            <ErrorDisplay errors={submissionErrors} />

            {/* Submit Button */}
            <div className='flex justify-center pt-4'>
              <Button
                type='submit'
                size='lg'
                disabled={loading}
                className='bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 active:scale-[0.98] shadow-lg hover:shadow-xl'
              >
                <span className='flex items-center gap-3'>
                  {loading ? (
                    <>
                      <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                      Creating Profile...
                    </>
                  ) : (
                    <>
                      <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M13 10V3L4 14h7v7l9-11h-7z'
                        />
                      </svg>
                      Generate Resume
                    </>
                  )}
                </span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreateProfileTabs;
