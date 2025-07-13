import { useParams } from 'react-router-dom';
import { Mail, Phone, Linkedin, Globe } from 'lucide-react';

import { formatDate } from '../helpers';
import { ContactItem, Section, TimelineItem } from '@/components/ui';

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const storedQrfolioProfile = id
    ? localStorage.getItem(`profile-${id}`)
    : null;
  const qrfolioProfile = storedQrfolioProfile
    ? JSON.parse(storedQrfolioProfile)
    : null;

  if (!qrfolioProfile) {
    return (
      <main className='flex items-center justify-center min-h-screen w-full bg-neutral-50 p-8 text-center'>
        <p className='text-neutral-500 text-lg font-light'>
          Profile not found or deleted.
        </p>
      </main>
    );
  }

  const {
    fullName,
    professionalSummary,
    email,
    phone,
    linkedin,
    portfolio,
    workExperience = [],
    education = [],
    languages = [],
  } = qrfolioProfile;

  return (
    <main className='flex flex-col items-center justify-start w-full h-screen bg-neutral-50 overflow-auto p-8 sm:p-10'>
      <div className='relative w-full max-w-3xl space-y-12'>
        <header className='mb-10'>
          <h1 className='text-4xl font-extrabold tracking-tight font-poppins text-neutral-900 text-center'>
            {fullName}
          </h1>
          {professionalSummary && (
            <p className='mt-4 text-neutral-700 whitespace-pre-wrap leading-relaxed text-base font-normal text-center max-w-xl mx-auto'>
              {professionalSummary}
            </p>
          )}
        </header>
        <div className='flex flex-col lg:flex-row gap-12'>
          <aside className='lg:w-1/3 space-y-8'>
            <div className='space-y-5'>
              {email && (
                <ContactItem
                  icon={<Mail />}
                  label='Email'
                  value={email}
                  href={`mailto:${email}`}
                />
              )}
              {phone && (
                <ContactItem icon={<Phone />} label='Phone' value={phone} />
              )}
              {linkedin && (
                <ContactItem
                  icon={<Linkedin />}
                  label='LinkedIn'
                  value={linkedin}
                  href={linkedin}
                />
              )}
              {portfolio && (
                <ContactItem
                  icon={<Globe />}
                  label='Portfolio'
                  value={portfolio}
                  href={portfolio}
                />
              )}
            </div>
          </aside>

          <section className='lg:w-2/3 flex flex-col space-y-14'>
            {workExperience.length > 0 && (
              <Section title='Work Experience' accentColor='indigo-600'>
                {workExperience.map((exp: any, i: number) => (
                  <TimelineItem
                    key={i}
                    title={`${exp.jobTitle} @ ${exp.companyName}`}
                    subtitle={exp.location}
                    date={`${formatDate(exp.dateFrom)} - ${formatDate(
                      exp.dateTo
                    )}`}
                    description={exp.responsibilities}
                    accentColor='indigo-600'
                  />
                ))}
              </Section>
            )}

            {education.length > 0 && (
              <Section title='Education' accentColor='indigo-600'>
                {education.map((edu: any, i: number) => (
                  <TimelineItem
                    key={i}
                    title={`${edu.degree} in ${edu.fieldOfStudy}`}
                    subtitle={edu.schoolName}
                    date={`${formatDate(edu.dateFrom)} - ${formatDate(
                      edu.dateTo
                    )}`}
                    description={edu.description}
                    accentColor='indigo-600'
                  />
                ))}
              </Section>
            )}

            {languages.length > 0 && (
              <Section title='Languages' accentColor='indigo-600'>
                <ul className='space-y-3'>
                  {languages.map((lang: any, i: number) => (
                    <li key={i} className='flex flex-col'>
                      <span className='font-medium text-base text-neutral-900'>
                        {lang.language}
                      </span>
                      <span className='text-sm text-neutral-600 italic'>
                        {lang.fluencyLevel}
                      </span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Profile;
