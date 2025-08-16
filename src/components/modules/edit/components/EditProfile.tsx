import { useEffect, useState } from 'react';
import { useForm, useFieldArray, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { flattenErrors, routes } from '@/utils';
import {
  Button,
  ErrorDisplay,
  LoadingSpinner,
  TabbedSections,
  useToast,
} from '@/components/ui';
import { useAuth } from '@/context';
import { useGetProfile } from '@/apollo/profile';
import { useUpdateProfile } from '@/apollo/profile/mutations/updateProfile';
import type { CVFormValues } from '../../create/types';
import { introSchema } from '../../create/schemas';
import { contents, tabs } from '../../create/components';

const EditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userId } = useAuth();

  const [profileData, { loading: loadingProfile }] = useGetProfile(
    userId || ''
  );
  const [updateProfile, { loading: updating }] = useUpdateProfile();

  const [submissionErrors, setSubmissionErrors] = useState<string[]>([]);
  const [activeWorkIndex, setActiveWorkIndex] = useState<number | null>(0);
  const [activeEduIndex, setActiveEduIndex] = useState<number | null>(0);
  const [activeLanguageIndex, setActiveLanguageIndex] = useState<number | null>(
    0
  );

  const profile = profileData?.profile;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<CVFormValues>({
    resolver: zodResolver(introSchema),
    defaultValues: {
      fullName: '',
      phone: undefined,
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

  // Debug form values
  const currentValues = watch();

  useEffect(() => {
    if (profile) {
      const formData = {
        ...profile,
        workExperience:
          (profile.workExperience?.length ?? 0) > 0
            ? profile.workExperience
            : [
                {
                  jobTitle: '',
                  companyName: '',
                  location: '',
                  dateFrom: '',
                  dateTo: '',
                  responsibilities: '',
                },
              ],
        education:
          (profile.education?.length ?? 0) > 0
            ? profile.education
            : [
                {
                  schoolName: '',
                  degree: '',
                  fieldOfStudy: '',
                  dateFrom: '',
                  dateTo: '',
                  description: '',
                },
              ],
        languages:
          (profile.languages?.length ?? 0) > 0
            ? profile.languages
            : [
                {
                  language: '',
                  fluencyLevel: 'Beginner' as const,
                },
              ],
      };

      reset(formData);
    }
  }, [profile, reset]);

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
      const result = await updateProfile({
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

      toast({
        title: 'Profile Updated Successfully! ✨',
        description: 'Your professional profile has been updated and saved.',
        variant: 'success',
      });

      navigate(`/profile/${userId}` || routes?.DASHBOARD);
    } catch (err) {
      toast({
        title: 'Profile Update Failed',
        description: 'Failed to update profile. Please try again later.',
        variant: 'destructive',
      });
      setSubmissionErrors([
        'Failed to update profile. Please try again later.',
      ]);
    }
  };

  const onInvalid = (errors: FieldErrors<CVFormValues>) => {
    setSubmissionErrors(flattenErrors(errors));
  };

  if (loadingProfile && !profile) {
    return (
      <main className='min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center'>
        <div className='text-center'>
          <LoadingSpinner />
          <p className='mt-4 text-gray-600 text-lg'>Loading profile data...</p>
        </div>
      </main>
    );
  }

  // Don't render the form until we have profile data
  if (!profile) {
    return (
      <main className='min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center'>
        <div className='text-center'>
          <LoadingSpinner />
          <p className='mt-4 text-gray-600 text-lg'>Loading profile data...</p>
        </div>
      </main>
    );
  }

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
                Edit Your Profile
              </h1>
              <p className='text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed font-light max-w-4xl mx-auto'>
                Update your professional profile information below. All changes
                will be saved automatically when you submit.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className='relative z-10 flex-1 px-4 sm:px-6 lg:px-8 xl:px-12 py-6 lg:py-8'>
        <div className='w-full'>
          <form
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            className='space-y-6'
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
                disabled={updating}
                className='bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 active:scale-[0.98] shadow-lg hover:shadow-xl'
              >
                <span className='flex items-center gap-3'>
                  {updating ? (
                    <>
                      <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                      Saving Changes...
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
                          d='M5 13l4 4L19 7'
                        />
                      </svg>
                      Save Changes
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

export default EditProfile;
