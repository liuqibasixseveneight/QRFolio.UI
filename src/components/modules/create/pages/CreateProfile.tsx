import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { routes } from '@/utils';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FormField,
} from '@/components/ui';

const workExperienceSchema = z.object({
  jobTitle: z.string().min(1, 'Required'),
  companyName: z.string().min(1, 'Required'),
  location: z.string().min(1, 'Required'),
  dateFrom: z.string().min(1, 'Required'),
  dateTo: z.string().min(1, 'Required'),
  responsibilities: z.string().min(1, 'Required'),
});

const educationSchema = z.object({
  schoolName: z.string().min(1, 'Required'),
  degree: z.string().min(1, 'Required'),
  fieldOfStudy: z.string().min(1, 'Required'),
  dateFrom: z.string().min(1, 'Required'),
  dateTo: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
});

const cvSchema = z.object({
  fullName: z.string().min(1, 'Required'),
  phone: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
  professionalSummary: z.string().min(1, 'Required'),
  workExperience: z.array(workExperienceSchema),
  education: z.array(educationSchema),
});

type CVFormValues = z.infer<typeof cvSchema>;

const prettifyLabel = (key: string) => {
  const withSpaces = key.replace(/([A-Z])/g, ' $1');
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
};

const CreateProfile = () => {
  const navigate = useNavigate();

  const [addingWork, setAddingWork] = useState(false);
  const [currentWork, setCurrentWork] = useState<
    CVFormValues['workExperience'][0]
  >({
    jobTitle: '',
    companyName: '',
    location: '',
    dateFrom: '',
    dateTo: '',
    responsibilities: '',
  });

  const [addingEdu, setAddingEdu] = useState(false);
  const [currentEdu, setCurrentEdu] = useState<CVFormValues['education'][0]>({
    schoolName: '',
    degree: '',
    fieldOfStudy: '',
    dateFrom: '',
    dateTo: '',
    description: '',
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CVFormValues>({
    resolver: zodResolver(cvSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      linkedin: '',
      portfolio: '',
      professionalSummary: '',
      workExperience: [],
      education: [],
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

  const isCurrentWorkComplete = () =>
    Object.values(currentWork).every((v) => v.trim() !== '');
  const isCurrentEduComplete = () =>
    Object.values(currentEdu).every((v) => v.trim() !== '');

  const onSubmit = (data: CVFormValues) => {
    const finalData = { ...data };

    if (isCurrentWorkComplete()) {
      finalData.workExperience = [...data.workExperience, currentWork];
    }
    if (isCurrentEduComplete()) {
      finalData.education = [...data.education, currentEdu];
    }

    const id = uuidv4();
    localStorage.setItem(`profile-${id}`, JSON.stringify(finalData));

    navigate(routes?.PROFILE_CREATED, { state: { id } });
  };

  return (
    <div className='w-full max-w-7xl mx-auto px-6 md:px-8 py-10'>
      <Card className='p-6 md:p-8 shadow-lg rounded-2xl'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>
            Create Your QRFolio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-8'
          >
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
            <FormField
              label='Professional Summary'
              type='textarea'
              rows={3}
              register={register}
              registerName='professionalSummary'
              error={errors.professionalSummary?.message}
            />

            {/* Work Experience */}
            <section>
              <h2 className='text-2xl font-bold mb-4'>Work Experience</h2>
              {workFields.length > 0 && (
                <div className='space-y-6 mb-6'>
                  {workFields.map((field, index) => (
                    <Card
                      key={field.id}
                      className='p-6 rounded-xl shadow-sm space-y-3'
                    >
                      <FormField
                        label='Job Title'
                        register={register}
                        registerName={`workExperience.${index}.jobTitle`}
                        error={
                          errors.workExperience?.[index]?.jobTitle?.message
                        }
                      />
                      <FormField
                        label='Company Name'
                        register={register}
                        registerName={`workExperience.${index}.companyName`}
                        error={
                          errors.workExperience?.[index]?.companyName?.message
                        }
                      />
                      <FormField
                        label='Location'
                        register={register}
                        registerName={`workExperience.${index}.location`}
                        error={
                          errors.workExperience?.[index]?.location?.message
                        }
                      />
                      <FormField
                        label='Date From'
                        type='date'
                        register={register}
                        registerName={`workExperience.${index}.dateFrom`}
                        error={
                          errors.workExperience?.[index]?.dateFrom?.message
                        }
                      />
                      <FormField
                        label='Date To'
                        type='date'
                        register={register}
                        registerName={`workExperience.${index}.dateTo`}
                        error={errors.workExperience?.[index]?.dateTo?.message}
                      />
                      <FormField
                        label='Responsibilities'
                        type='textarea'
                        rows={2}
                        register={register}
                        registerName={`workExperience.${index}.responsibilities`}
                        error={
                          errors.workExperience?.[index]?.responsibilities
                            ?.message
                        }
                      />
                      <div className='flex justify-end'>
                        <Button
                          type='button'
                          variant='destructive'
                          onClick={() => removeWork(index)}
                        >
                          Remove Experience
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {!addingWork && (
                <Button type='button' onClick={() => setAddingWork(true)}>
                  Add Work Experience
                </Button>
              )}

              {addingWork && (
                <Card className='p-6 rounded-xl shadow-sm space-y-4 mb-6'>
                  <h3 className='text-lg font-semibold'>Add Work Experience</h3>
                  {Object.entries(currentWork).map(([key, value]) => (
                    <FormField
                      key={key}
                      label={prettifyLabel(key)}
                      value={value}
                      type={key.startsWith('date') ? 'date' : 'input'}
                      onChange={(val) =>
                        setCurrentWork((prev) => ({ ...prev, [key]: val }))
                      }
                    />
                  ))}
                  <div className='flex justify-end gap-3'>
                    <Button
                      type='button'
                      disabled={!isCurrentWorkComplete()}
                      onClick={() => {
                        appendWork(currentWork);
                        setCurrentWork({
                          jobTitle: '',
                          companyName: '',
                          location: '',
                          dateFrom: '',
                          dateTo: '',
                          responsibilities: '',
                        });
                        setAddingWork(false);
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      type='button'
                      variant='destructive'
                      onClick={() => {
                        setAddingWork(false);
                        setCurrentWork({
                          jobTitle: '',
                          companyName: '',
                          location: '',
                          dateFrom: '',
                          dateTo: '',
                          responsibilities: '',
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Card>
              )}
            </section>

            {/* Education */}
            <section>
              <h2 className='text-2xl font-bold mb-4'>Education</h2>
              {eduFields.length > 0 && (
                <div className='space-y-6 mb-6'>
                  {eduFields.map((field, index) => (
                    <Card
                      key={field.id}
                      className='p-6 rounded-xl shadow-sm space-y-3'
                    >
                      <FormField
                        label='School Name'
                        register={register}
                        registerName={`education.${index}.schoolName`}
                        error={errors.education?.[index]?.schoolName?.message}
                      />
                      <FormField
                        label='Degree'
                        register={register}
                        registerName={`education.${index}.degree`}
                        error={errors.education?.[index]?.degree?.message}
                      />
                      <FormField
                        label='Field of Study'
                        register={register}
                        registerName={`education.${index}.fieldOfStudy`}
                        error={errors.education?.[index]?.fieldOfStudy?.message}
                      />
                      <FormField
                        label='Date From'
                        type='date'
                        register={register}
                        registerName={`education.${index}.dateFrom`}
                        error={errors.education?.[index]?.dateFrom?.message}
                      />
                      <FormField
                        label='Date To'
                        type='date'
                        register={register}
                        registerName={`education.${index}.dateTo`}
                        error={errors.education?.[index]?.dateTo?.message}
                      />
                      <FormField
                        label='Description'
                        type='textarea'
                        rows={2}
                        register={register}
                        registerName={`education.${index}.description`}
                        error={errors.education?.[index]?.description?.message}
                      />
                      <div className='flex justify-end'>
                        <Button
                          type='button'
                          variant='destructive'
                          onClick={() => removeEdu(index)}
                        >
                          Remove Education
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {!addingEdu && (
                <Button type='button' onClick={() => setAddingEdu(true)}>
                  Add Education
                </Button>
              )}

              {addingEdu && (
                <Card className='p-6 rounded-xl shadow-sm space-y-4 mb-6'>
                  <h3 className='text-lg font-semibold'>Add Education</h3>
                  {Object.entries(currentEdu).map(([key, value]) => (
                    <FormField
                      key={key}
                      label={prettifyLabel(key)}
                      value={value}
                      type={key.startsWith('date') ? 'date' : 'input'}
                      onChange={(val) =>
                        setCurrentEdu((prev) => ({ ...prev, [key]: val }))
                      }
                    />
                  ))}
                  <div className='flex justify-end gap-3'>
                    <Button
                      type='button'
                      disabled={!isCurrentEduComplete()}
                      onClick={() => {
                        appendEdu(currentEdu);
                        setCurrentEdu({
                          schoolName: '',
                          degree: '',
                          fieldOfStudy: '',
                          dateFrom: '',
                          dateTo: '',
                          description: '',
                        });
                        setAddingEdu(false);
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      type='button'
                      variant='destructive'
                      onClick={() => {
                        setAddingEdu(false);
                        setCurrentEdu({
                          schoolName: '',
                          degree: '',
                          fieldOfStudy: '',
                          dateFrom: '',
                          dateTo: '',
                          description: '',
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Card>
              )}
            </section>

            <div className='flex justify-end'>
              <Button type='submit' className='mt-4'>
                Generate Resume
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProfile;
