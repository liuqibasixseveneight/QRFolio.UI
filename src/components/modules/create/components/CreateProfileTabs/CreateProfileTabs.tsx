import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  ErrorDisplay,
  TabbedSections,
  useToast,
  CategorizedSkillsInput,
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
    setValue,
    formState: { errors },
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

  const handleButtonClick = async (formData: CVFormValues) => {
    if (!userId) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to create a profile.',
        variant: 'destructive',
      });
      return;
    }

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

      const filteredSkills =
        formData.skills?.filter(
          (category) =>
            category.title?.trim() &&
            category.skills?.some((skill) => skill.skill?.trim())
        ) || [];

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
        skills: filteredSkills,
      };

      const result = await createProfile(profileData);

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

  const handleFormError = (errors: any) => {
    setSubmissionErrors(
      Object.values(errors).map(
        (error: any) => error.message || 'Validation error'
      )
    );
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
    onSkillsChange: (newSkills) => {
      // Directly update the skills field using setValue
      setValue('skills', newSkills);
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
            <div className='px-6 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32'>
              <div className='text-center max-w-4xl mx-auto'>
                <h1 className='text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-6'>
                  Create Your Profile
                </h1>
                <p className='text-lg lg:text-xl text-gray-600 leading-relaxed font-light max-w-3xl mx-auto'>
                  Build your professional profile by filling out the sections
                  below. This information will be used to generate your
                  personalized QR code and resume.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='relative z-10 flex-1 px-6 sm:px-8 lg:px-12 py-16 lg:py-20'>
        <div className='max-w-6xl mx-auto w-full'>
          <form
            className='space-y-8'
            onSubmit={handleSubmit(handleButtonClick, handleFormError)}
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
                disabled={loading}
                className='bg-gray-900 hover:bg-gray-800 text-white px-10 py-4 rounded-xl font-medium text-lg transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md'
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
