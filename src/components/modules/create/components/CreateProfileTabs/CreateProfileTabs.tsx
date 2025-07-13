import { useState } from 'react';
import { useForm, useFieldArray, type FieldErrors } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { flattenErrors, routes } from '@/utils';
import { Button, ErrorDisplay, TabbedSections } from '@/components/ui';
import type { CVFormValues } from '../../types';
import { introSchema } from '../../schemas';
import { contents } from './contents';
import { tabs } from './tabs';

const CreateProfileTabs = () => {
  const navigate = useNavigate();
  const [submissionErrors, setSubmissionErrors] = useState<string[]>([]);

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
          fluencyLevel: 'Beginner',
        },
      ],
    },
  });

  const {
    fields: workFields,
    append: appendWork,
    remove: removeWork,
  } = useFieldArray({
    control,
    name: 'workExperience',
  });

  const {
    fields: eduFields,
    append: appendEdu,
    remove: removeEdu,
  } = useFieldArray({
    control,
    name: 'education',
  });

  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control,
    name: 'languages',
  });

  const onSubmit = (data: CVFormValues) => {
    const id = uuidv4();
    localStorage.setItem(`profile-${id}`, JSON.stringify(data));
    navigate(routes.PROFILE_CREATED, { state: { id } });
  };

  const onInvalid = (errors: FieldErrors<CVFormValues>) => {
    setSubmissionErrors(flattenErrors(errors));
  };

  const tabContents = contents({
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
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className='space-y-10 mt-8'
    >
      <TabbedSections
        tabs={tabs}
        contents={tabContents}
        defaultValue={tabs?.[0]?.value}
      />

      <ErrorDisplay errors={submissionErrors} />

      <div className='flex justify-end'>
        <Button
          type='submit'
          size='lg'
          className='bg-neutral-900 text-white px-5 py-3 rounded-md hover:bg-neutral-800 transition'
        >
          Generate Resume
        </Button>
      </div>
    </form>
  );
};

export default CreateProfileTabs;
