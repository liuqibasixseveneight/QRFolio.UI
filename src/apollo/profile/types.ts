export type WorkExperience = {
  jobTitle: string;
  companyName: string;
  location: string;
  dateFrom: string;
  dateTo: string;
  responsibilities: string;
};

export type Education = {
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  dateFrom: string;
  dateTo: string;
  description: string;
};

export type Language = {
  language: string;
  fluencyLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Fluent' | 'Native';
};

export type CreateProfileVariables = {
  id: string;
  fullName: string;
  phone?: string;
  email: string;
  linkedin?: string;
  portfolio?: string;
  professionalSummary: string;
  workExperience?: WorkExperience[];
  education?: Education[];
  languages?: Language[];
};

export type CreateProfileData = {
  createProfile: {
    id: string;
    fullName: string;
    email: string;
    createdAt: string;
  };
};

export type Profile = {
  id: string;
  fullName: string;
  phone?: string;
  email: string;
  linkedin?: string;
  portfolio?: string;
  professionalSummary: string;
  workExperience?: WorkExperience[];
  education?: Education[];
  languages?: Language[];
  createdAt: string;
};

export type GetProfilesData = {
  profiles: Profile[];
};

export type GetProfilesResult = {
  loading: boolean;
  error?: Error;
};

export type GetProfileData = {
  profile: Profile;
};

export type GetProfileVariables = {
  id: string;
};

export type GetProfileResult = {
  loading: boolean;
  error?: Error;
};
