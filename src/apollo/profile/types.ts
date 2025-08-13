export type DateString = string;

export type WorkExperience = {
  jobTitle: string;
  companyName: string;
  location: string;
  dateFrom: DateString;
  dateTo: DateString;
  responsibilities: string;
};

export type Education = {
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  dateFrom: DateString;
  dateTo: DateString;
  description: string;
};

export type Language = {
  language: string;
  fluencyLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Fluent' | 'Native';
};

export interface BaseProfile {
  fullName: string;
  phone?: string;
  email: string;
  linkedin?: string;
  portfolio?: string;
  professionalSummary: string;
  workExperience?: WorkExperience[];
  education?: Education[];
  languages?: Language[];
}

export interface Profile extends BaseProfile {
  id: string;
  createdAt: string;
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
