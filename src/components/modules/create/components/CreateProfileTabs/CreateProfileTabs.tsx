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
import {
  EMPTY_EDU_ENTRY,
  EMPTY_LANGUAGE_ENTRY,
  EMPTY_WORK_ENTRY,
  removeEmptyEntries,
} from '../../utils';

const CreateProfileTabs = () => {
  const navigate = useNavigate();
  const [submissionErrors, setSubmissionErrors] = useState<string[]>([]);
  const [activeWorkIndex, setActiveWorkIndex] = useState<number | null>(0);
  const [activeEduIndex, setActiveEduIndex] = useState<number | null>(0);
  const [activeLanguageIndex, setActiveLanguageIndex] = useState<number | null>(
    0
  );

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

  const onSubmit = (data: CVFormValues) => {
    const id = uuidv4();
    const dataWithoutEmptyEntries = removeEmptyEntries(data);

    localStorage.setItem(
      `profile-${id}`,
      JSON.stringify(dataWithoutEmptyEntries)
    );
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
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className='space-y-10 mt-8'
    >
      <TabbedSections
        tabs={tabs}
        contents={tabContents}
        defaultValue={tabs[0]?.value}
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
