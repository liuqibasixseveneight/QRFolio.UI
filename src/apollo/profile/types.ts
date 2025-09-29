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

export type PhoneNumber = {
  countryCode: string;
  dialCode: string;
  number: string;
  flag?: string;
};

// Phone can be either a PhoneNumber object, a string, or undefined
export type Phone = PhoneNumber | string | undefined;

export type BaseProfile = {
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
};

export type Profile = BaseProfile & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateProfileVariables = BaseProfile & {
  id: string;
};

export type UpdateProfileVariables = Partial<BaseProfile> & {
  id: string;
};

export type CreateProfileData = {
  createProfile: Profile;
};

export type UpdateProfileData = {
  updateProfile: Profile;
};

export type GetProfilesData = {
  profiles: Profile[];
};

export type GetProfileData = {
  profile: Profile;
};

export type GetProfileVariables = {
  id: string;
};

export type GraphQLResult<T> = {
  loading: boolean;
  error?: Error;
  data?: T;
};

export type GetProfilesResult = GraphQLResult<GetProfilesData>;
export type GetProfileResult = GraphQLResult<GetProfileData>;
