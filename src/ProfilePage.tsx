import React from 'react';
import { useParams } from 'react-router-dom';
import { Mail, Phone, Linkedin, Globe } from 'lucide-react';

import { Card, CardContent } from './components/ui';

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const storedProfile = id ? localStorage.getItem(`profile-${id}`) : null;
  const profile = storedProfile ? JSON.parse(storedProfile) : null;

  if (!profile) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-50'>
        <p className='text-gray-400 text-lg font-light tracking-wide font-sans'>
          Profile not found or deleted.
        </p>
      </div>
    );
  }

  return (
    <main className='min-h-screen max-w-5xl mx-auto p-8 bg-white text-gray-900 font-sans'>
      {/* Header */}
      <header className='mb-12 flex items-center gap-4'>
        <div className='text-3xl font-bold text-indigo-600 select-none tracking-wide font-poppins'>
          QRFolio
        </div>
      </header>

      <div className='flex flex-col lg:flex-row gap-12'>
        {/* Sidebar */}
        <aside className='lg:w-1/3 sticky top-24 self-start space-y-10'>
          <h1 className='text-4xl font-extrabold tracking-tight font-poppins text-gray-900'>
            {profile.fullName}
          </h1>
          <p className='text-gray-700 whitespace-pre-wrap leading-relaxed text-base font-normal'>
            {profile.professionalSummary}
          </p>

          <div className='space-y-5'>
            <ContactItem
              icon={<Mail />}
              label='Email'
              value={profile.email}
              href={`mailto:${profile.email}`}
            />
            <ContactItem icon={<Phone />} label='Phone' value={profile.phone} />
            {profile.linkedin && (
              <ContactItem
                icon={<Linkedin />}
                label='LinkedIn'
                value={profile.linkedin}
                href={profile.linkedin}
              />
            )}
            {profile.portfolio && (
              <ContactItem
                icon={<Globe />}
                label='Portfolio'
                value={profile.portfolio}
                href={profile.portfolio}
              />
            )}
          </div>
        </aside>

        {/* Main Content */}
        <section className='lg:w-2/3 flex flex-col space-y-14'>
          <Section title='Work Experience' accentColor='indigo-600'>
            {profile.workExperience.map((exp: any, i: number) => (
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
            {profile.education.map((edu: any, i: number) => (
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
        </section>
      </div>
    </main>
  );
};

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

const ContactItem: React.FC<ContactItemProps> = ({
  icon,
  label,
  value,
  href,
}) => (
  <a
    href={href ?? undefined}
    target={href ? '_blank' : undefined}
    rel={href ? 'noopener noreferrer' : undefined}
    className='flex items-center space-x-4 group transition-colors duration-200 hover:text-indigo-600'
  >
    <div className='p-2 rounded-md bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition'>
      {React.isValidElement(icon)
        ? React.createElement(icon.type, { size: 20 })
        : icon}
    </div>
    <div className='flex flex-col'>
      <span className='text-xs font-semibold uppercase tracking-wide text-gray-500'>
        {label}
      </span>
      <span className='text-sm font-medium truncate max-w-xs'>{value}</span>
    </div>
  </a>
);

interface SectionProps {
  title: string;
  children: React.ReactNode;
  accentColor: string;
}

const Section: React.FC<SectionProps> = ({ title, children, accentColor }) => (
  <section>
    <h2
      className={`text-3xl font-semibold mb-6 border-b-2 border-${accentColor} pb-1 font-poppins`}
    >
      {title}
    </h2>
    <div className='space-y-10'>{children}</div>
  </section>
);

interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  accentColor: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  subtitle,
  date,
  description,
  accentColor,
}) => (
  <Card className='shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 rounded-xl'>
    <CardContent>
      <div className='flex justify-between items-center mb-2'>
        <h3 className='text-lg font-semibold font-poppins text-gray-900'>
          {title}
        </h3>
        <time className='text-xs font-mono text-gray-400'>{date}</time>
      </div>
      <p className={`text-sm font-semibold text-${accentColor} mb-2`}>
        {subtitle}
      </p>
      <p className='text-gray-700 leading-relaxed whitespace-pre-wrap'>
        {description}
      </p>
    </CardContent>
  </Card>
);

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
  });
}

export default ProfilePage;
