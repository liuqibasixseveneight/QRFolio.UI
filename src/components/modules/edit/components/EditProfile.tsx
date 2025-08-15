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
} from '@/components/ui';
import { useAuth } from '@/context';
import { useGetProfile } from '@/apollo/profile';
import { useUpdateProfile } from '@/apollo/profile/mutations/updateProfile';
import type { CVFormValues } from '../../create/types';
import { introSchema } from '../../create/schemas';
import { contents, tabs } from '../../create/components';

const EditProfile = () => {
  const navigate = useNavigate();
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
      email: '',
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

      // Add a small delay to ensure the form is fully initialized
      setTimeout(() => {
        reset(formData);

        // Check form values after reset
        setTimeout(() => {}, 100);
      }, 50);
    }
  }, [profile, reset, watch]);

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

      navigate(`/profile/${userId}` || routes?.DASHBOARD);
    } catch (err) {
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
      <div className='flex items-center justify-center min-h-screen'>
        <LoadingSpinner />
      </div>
    );
  }

  // Don't render the form until we have profile data
  if (!profile) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <LoadingSpinner />
          <p className='mt-4 text-gray-600'>Loading profile data...</p>
        </div>
      </div>
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
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className='space-y-8'>
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
          type='submit'
          size='lg'
          className='bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 active:scale-95 shadow-lg hover:shadow-indigo-500/50 border border-indigo-500/20 cursor-pointer'
          disabled={updating}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default EditProfile;
