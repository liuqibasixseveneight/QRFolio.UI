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
import {
  EMPTY_EDU_ENTRY,
  EMPTY_LANGUAGE_ENTRY,
  EMPTY_WORK_ENTRY,
  removeEmptyEntries,
} from '../../create/utils';
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
  } = useForm<CVFormValues>({
    resolver: zodResolver(introSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: {
        countryCode: 'GB',
        dialCode: '+44',
        number: '',
        flag: '🇬🇧',
      },
      linkedin: '',
      portfolio: '',
      professionalSummary: '',
      availability: 'AVAILABLE',
      workExperience: [EMPTY_WORK_ENTRY],
      education: [EMPTY_EDU_ENTRY],
      languages: [EMPTY_LANGUAGE_ENTRY],
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        ...profile,
        workExperience:
          (profile.workExperience?.length ?? 0) > 0
            ? profile.workExperience
            : [EMPTY_WORK_ENTRY],
        education:
          (profile.education?.length ?? 0) > 0
            ? profile.education
            : [EMPTY_EDU_ENTRY],
        languages:
          (profile.languages?.length ?? 0) > 0
            ? profile.languages
            : [EMPTY_LANGUAGE_ENTRY],
      });
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
    const cleanedData = removeEmptyEntries(data);

    try {
      await updateProfile({
        id: userId || '',
        ...cleanedData,
      });

      navigate(`/profile/${userId}` || routes?.DASHBOARD);
    } catch (err) {
      setSubmissionErrors([
        'Failed to update profile. Please try again later.',
      ]);
      console.error('Mutation error:', err);
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
