import type { CreateProfileVariables } from '@/apollo/profile';

export const createMockCreateData = ({
  userId,
  userEmail,
}: {
  userId?: string | null;
  userEmail?: string | null;
}): CreateProfileVariables => ({
  id: userId ?? 'profile_12345',
  fullName: 'Alice Johnson',
  phone: '+1-555-123-4567',
  email: userEmail ?? 'alice.johnson@example.com',
  linkedin: 'https://www.linkedin.com/in/alicejohnson',
  portfolio: 'https://alicejohnson.dev',
  professionalSummary:
    'Experienced front-end engineer with a passion for creating intuitive user interfaces and improving performance in large-scale applications.',
  workExperience: [
    {
      jobTitle: 'Senior Frontend Developer',
      companyName: 'TechNova Inc.',
      location: 'San Francisco, CA',
      dateFrom: '2021-05',
      dateTo: '2024-08',
      responsibilities:
        'Developed and maintained high-traffic React applications, optimized performance, and led UI consistency across projects.',
    },
    {
      jobTitle: 'Frontend Developer',
      companyName: 'Creative Solutions',
      location: 'Remote',
      dateFrom: '2018-09',
      dateTo: '2021-04',
      responsibilities:
        'Worked on client projects building responsive interfaces, collaborating with designers, and improving accessibility.',
    },
  ],
  education: [
    {
      schoolName: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      dateFrom: '2014-08',
      dateTo: '2018-05',
      description:
        'Focused on software engineering, human-computer interaction, and frontend technologies while participating in hackathons.',
    },
  ],
  languages: [
    {
      language: 'English',
      fluencyLevel: 'Native',
    },
    {
      language: 'Spanish',
      fluencyLevel: 'Intermediate',
    },
  ],
});
