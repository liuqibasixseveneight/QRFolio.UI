import { useForm, useFieldArray } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { routes } from '@/utils';
import {
  Button,
  FormField,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DynamicFieldSection,
} from '@/components/ui';
import { introSchema } from '../schemas';
import {
  educationConfig,
  languageConfig,
  workExperienceConfig,
} from './fieldConfigs';
import type { CVFormValues } from '../types';

const CreateProfile = () => {
  const navigate = useNavigate();

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
      workExperience: [],
      education: [],
      languages: [],
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
    navigate(routes?.PROFILE_CREATED, { state: { id } });
  };

  return (
    <main className='relative flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-white overflow-hidden p-8'>
      <Card className='relative w-full max-w-4xl p-12 shadow-2xl rounded-3xl border border-indigo-100 bg-white/80 backdrop-blur-lg'>
        <CardHeader className='text-center mb-8'>
          <CardTitle className='text-4xl font-extrabold text-indigo-700'>
            ✏️ Create Your QRFolio
          </CardTitle>
          <p className='text-gray-600 text-base max-w-xl mx-auto mt-2'>
            Fill in your details below to generate your personalized QR-powered
            resume.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-12'>
            {/* Personal Info */}
            <section className='space-y-6'>
              <h2 className='text-2xl font-semibold text-indigo-700'>
                Personal Information
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <FormField
                  label='Full Name'
                  register={register}
                  registerName='fullName'
                  error={errors.fullName?.message}
                />
                <FormField
                  label='Email'
                  register={register}
                  registerName='email'
                  error={errors.email?.message}
                />
                <FormField
                  label='Phone'
                  register={register}
                  registerName='phone'
                  error={errors.phone?.message}
                />
                <FormField
                  label='LinkedIn'
                  register={register}
                  registerName='linkedin'
                  error={errors.linkedin?.message}
                />
                <FormField
                  label='Portfolio/Website'
                  register={register}
                  registerName='portfolio'
                  error={errors.portfolio?.message}
                />
              </div>
              <FormField
                label='Professional Summary'
                type='textarea'
                rows={4}
                register={register}
                registerName='professionalSummary'
                error={errors.professionalSummary?.message}
              />
            </section>

            <DynamicFieldSection
              title='Work Experience'
              fields={workFields}
              fieldsConfig={workExperienceConfig}
              registerNamePrefix='workExperience'
              errors={errors}
              register={register}
              control={control}
              onRemove={removeWork}
              onAppend={() =>
                appendWork({
                  jobTitle: '',
                  companyName: '',
                  location: '',
                  dateFrom: '',
                  dateTo: '',
                  responsibilities: '',
                })
              }
              appendLabel='Add Work Experience'
            />

            {/* Education */}
            <DynamicFieldSection
              title='Education'
              fields={eduFields}
              fieldsConfig={educationConfig}
              registerNamePrefix='education'
              errors={errors}
              register={register}
              control={control}
              onRemove={removeEdu}
              onAppend={() =>
                appendEdu({
                  schoolName: '',
                  degree: '',
                  fieldOfStudy: '',
                  dateFrom: '',
                  dateTo: '',
                  description: '',
                })
              }
              appendLabel='Add Education'
            />

            <DynamicFieldSection
              title='Languages'
              fields={languageFields}
              fieldsConfig={languageConfig}
              registerNamePrefix='languages'
              errors={errors}
              register={register}
              control={control}
              onRemove={removeLanguage}
              onAppend={() =>
                appendLanguage({ language: '', fluencyLevel: 'Beginner' })
              }
              appendLabel='Add Language'
            />

            <div className='flex justify-end'>
              <Button
                type='submit'
                size='lg'
                className='gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 py-3 text-lg font-semibold shadow-md hover:shadow-lg transition'
              >
                Generate Resume
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default CreateProfile;
