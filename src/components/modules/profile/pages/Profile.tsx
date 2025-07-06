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
      <div className='flex items-center justify-center min-h-screen bg-gray-50'>
        <p className='text-gray-400 text-lg font-light tracking-wide font-sans'>
          Profile not found or deleted.
        </p>
      </div>
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
    <main className='min-h-screen max-w-5xl mx-auto p-8 bg-white text-gray-900 font-sans'>
      <header className='mb-12 flex items-center gap-4'>
        <div className='text-3xl font-bold text-indigo-600 select-none tracking-wide font-poppins'>
          QRFolio
        </div>
      </header>

      <div className='flex flex-col lg:flex-row gap-12'>
        <aside className='lg:w-1/3 sticky top-24 self-start space-y-10'>
          <h1 className='text-4xl font-extrabold tracking-tight font-poppins text-gray-900'>
            {fullName}
          </h1>
          <p className='text-gray-700 whitespace-pre-wrap leading-relaxed text-base font-normal'>
            {professionalSummary}
          </p>

          <div className='space-y-5'>
            <ContactItem
              icon={<Mail />}
              label='Email'
              value={email}
              href={`mailto:${email}`}
            />
            <ContactItem icon={<Phone />} label='Phone' value={phone} />
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
          <Section title='Work Experience' accentColor='indigo-600'>
            {workExperience.map((exp: any, i: number) => (
              <TimelineItem
                key={i}
                title={`${exp.jobTitle} @ ${exp.companyName}`}
                subtitle={exp.location}
                date={`${formatDate(exp.dateFrom)} - ${formatDate(exp.dateTo)}`}
                description={exp.responsibilities}
                accentColor='indigo-600'
              />
            ))}
          </Section>

          <Section title='Education' accentColor='indigo-600'>
            {education.map((edu: any, i: number) => (
              <TimelineItem
                key={i}
                title={`${edu.degree} in ${edu.fieldOfStudy}`}
                subtitle={edu.schoolName}
                date={`${formatDate(edu.dateFrom)} - ${formatDate(edu.dateTo)}`}
                description={edu.description}
                accentColor='indigo-600'
              />
            ))}
          </Section>

          <Section title='Education' accentColor='indigo-600'>
            <ul className='space-y-3'>
              {languages.map((lang: any, i: number) => (
                <li key={i} className='flex flex-col'>
                  <span className='font-medium text-base'>{lang.language}</span>
                  <span className='text-sm text-gray-600 italic'>
                    {lang.fluencyLevel}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        </section>
      </div>
    </main>
  );
};

export default Profile;
