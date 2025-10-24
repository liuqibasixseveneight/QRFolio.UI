import { useEffect, useState } from 'react';
import { useForm, useFieldArray, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { flattenErrors, routes } from '@/utils';
import {
  Button,
  ErrorDisplay,
  LoadingSpinner,
  TabbedSections,
  useToast,
  Breadcrumb,
} from '@/components/ui';
import { useAuth } from '@/context';
import { useGetProfile } from '@/apollo/profile';
import { useUpdateProfile } from '@/apollo/profile/mutations/updateProfile';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import type { CVFormValues } from '../../create/types';
import { introSchema } from '../../create/schemas';
import { contents, tabs } from '../../create/components';

const EditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userId } = useAuth();
  const breadcrumbs = useBreadcrumbs();

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
    setValue,
    formState: { errors },
    reset,
  } = useForm<CVFormValues>({
    resolver: zodResolver(introSchema),
    defaultValues: {
      fullName: '',
      phone: undefined,
      linkedin: '',
      portfolio: '',
      professionalSummary: '',
      availability: 'available',
      accessLevel: 'public',
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
      skills: [
        {
          title: '',
          skills: [],
        },
      ],
    },
  });

  useEffect(() => {
    if (profile) {
      const formData = {
        ...profile,
        accessLevel: profile.accessLevel || 'public',
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
        skills:
          (profile.skills?.length ?? 0) > 0
            ? profile.skills
            : [
                {
                  title: '',
                  skills: [],
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
  const { fields: skillsFields } = useFieldArray({ control, name: 'skills' });

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
      await updateProfile({
        id: userId || '',
        fullName: data.fullName,
        email: data.email,
        professionalSummary: data.professionalSummary,
        availability: data.availability,
        accessLevel: data.accessLevel,
        phone: data.phone,
        linkedin: data.linkedin,
        portfolio: data.portfolio,
        workExperience: (data.workExperience ?? []).filter(
          (entry) =>
            entry.jobTitle &&
            entry.companyName &&
            entry.location &&
            entry.dateFrom &&
            entry.dateTo &&
            entry.responsibilities
        ),
        education: (data.education ?? []).filter(
          (entry) => entry.schoolName && entry.degree
        ),
        languages: (data.languages ?? []).filter(
          (entry) => entry.language && entry.fluencyLevel
        ),
        skills: (data.skills ?? [])
          .filter(
            (category) =>
              category.title?.trim() &&
              category.skills?.some((skill) => skill.skill?.trim())
          )
          .map((category) => ({
            title: category.title || '',
            skills: category.skills || [],
          })),
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
      <main className='min-h-screen w-full bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <LoadingSpinner />
          <p className='mt-4 text-gray-600 text-lg'>Loading profile data...</p>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className='min-h-screen w-full bg-gray-50 flex items-center justify-center'>
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
    skillsFields,
    onSkillsChange: (newSkillCategories) => {
      setValue('skills', newSkillCategories);
    },
    activeWorkIndex,
    setActiveWorkIndex,
    activeEduIndex,
    setActiveEduIndex,
    activeLanguageIndex,
    setActiveLanguageIndex,
  });

  return (
    <main className='min-h-screen w-full bg-gray-50 text-gray-900 font-sans'>
      <div className='w-full bg-white border-b border-gray-100 shadow-sm'>
        <div className='w-full px-6 sm:px-8 lg:px-12'>
          <div className='max-w-6xl mx-auto w-full'>
            {breadcrumbs.length > 0 && (
              <div className='px-6 sm:px-8 lg:px-12 pt-6 pb-4'>
                <Breadcrumb items={breadcrumbs} />
              </div>
            )}
            <div className='px-6 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32'>
              <div className='text-center max-w-4xl mx-auto'>
                <h1 className='text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-6'>
                  <FormattedMessage id='editProfile.title' />
                </h1>
                <p className='text-lg lg:text-xl text-gray-600 leading-relaxed font-light max-w-3xl mx-auto'>
                  <FormattedMessage id='editProfile.description' />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='relative z-10 flex-1 px-6 sm:px-8 lg:px-12 py-16 lg:py-20'>
        <div className='max-w-6xl mx-auto w-full'>
          <form
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            className='space-y-8'
          >
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 lg:p-12'>
              <TabbedSections
                tabs={tabs}
                contents={tabContents}
                defaultValue={tabs?.[0]?.value}
              />
            </div>

            <ErrorDisplay errors={submissionErrors} />

            <div className='flex justify-center pt-8'>
              <Button
                type='submit'
                size='lg'
                disabled={updating}
                className='bg-gray-900 hover:bg-gray-800 text-white px-10 py-4 rounded-xl font-medium text-lg transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md'
              >
                <span className='flex items-center gap-3'>
                  {updating ? (
                    <>
                      <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                      <FormattedMessage id='editProfile.savingChanges' />
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
                      <FormattedMessage id='editProfile.saveChanges' />
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
