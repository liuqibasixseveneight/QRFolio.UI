export type DateString = string;

export type WorkExperience = {
  jobTitle?: string;
  companyName?: string;
  location?: string;
  dateFrom?: DateString;
  dateTo?: DateString;
  responsibilities?: string;
};

export type Education = {
  schoolName?: string;
  degree?: string;
  fieldOfStudy?: string;
  dateFrom?: DateString;
  dateTo?: DateString;
  description?: string;
};

export type Language = {
  language?: string;
  fluencyLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Fluent' | 'Native';
};

export type Skill = {
  skill?: string;
};

export type SkillCategory = {
  title: string;
  skills: Skill[];
};

export type Availability = 'available' | 'open' | 'unavailable';

export interface PhoneNumber {
  countryCode: string;
  dialCode: string;
  number: string;
  flag?: string;
}

// Phone can be either a PhoneNumber object, a string, or undefined
export type Phone = PhoneNumber | string | undefined;

export interface BaseProfile {
  fullName: string;
  phone?: Phone;
  email: string;
  linkedin?: string;
  portfolio?: string;
  professionalSummary: string;
  availability: Availability;
  workExperience?: WorkExperience[];
  education?: Education[];
  languages?: Language[];
  skills?: SkillCategory[];
}

export interface Profile extends BaseProfile {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProfileVariables extends BaseProfile {
  id: string;
}

export interface UpdateProfileVariables extends Partial<BaseProfile> {
  id: string;
}

export interface CreateProfileData {
  createProfile: Profile;
}

export interface UpdateProfileData {
  updateProfile: Profile;
}

export interface GetProfilesData {
  profiles: Profile[];
}

export interface GetProfileData {
  profile: Profile;
}

export interface GetProfileVariables {
  id: string;
}

export interface GraphQLResult<T> {
  loading: boolean;
  error?: Error;
  data?: T;
}

export type GetProfilesResult = GraphQLResult<GetProfilesData>;
export type GetProfileResult = GraphQLResult<GetProfileData>;
