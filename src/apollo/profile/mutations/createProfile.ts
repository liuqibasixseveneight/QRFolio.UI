import { gql, useMutation } from '@apollo/client';

import type { CreateProfileData, CreateProfileVariables } from '../types';

const CREATE_PROFILE = gql`
  mutation createProfile(
    $id: ID!
    $fullName: String!
    $phone: JSON
    $email: String!
    $linkedin: String
    $portfolio: String
    $professionalSummary: String!
    $availability: Availability!
    $accessLevel: AccessLevel!
    $showName: Boolean
    $showEmail: Boolean
    $showPhone: Boolean
    $showLinkedIn: Boolean
    $showPortfolio: Boolean
    $showWorkExperience: Boolean
    $showEducation: Boolean
    $showLanguages: Boolean
    $showSkills: Boolean
    $workExperience: JSON!
    $education: JSON!
    $languages: JSON!
    $skills: [SkillCategoryInput!]
  ) {
    createProfile(
      id: $id
      fullName: $fullName
      phone: $phone
      email: $email
      linkedin: $linkedin
      portfolio: $portfolio
      professionalSummary: $professionalSummary
      availability: $availability
      accessLevel: $accessLevel
      showName: $showName
      showEmail: $showEmail
      showPhone: $showPhone
      showLinkedIn: $showLinkedIn
      showPortfolio: $showPortfolio
      showWorkExperience: $showWorkExperience
      showEducation: $showEducation
      showLanguages: $showLanguages
      showSkills: $showSkills
      workExperience: $workExperience
      education: $education
      languages: $languages
      skills: $skills
    ) {
      id
      fullName
      phone
      email
      linkedin
      portfolio
      professionalSummary
      availability
      accessLevel
      showName
      showEmail
      showPhone
      showLinkedIn
      showPortfolio
      showWorkExperience
      showEducation
      showLanguages
      showSkills
      workExperience
      education
      languages
      skills {
        title
        skills {
          skill
        }
      }
    }
  }
`;

export const useCreateProfile = (): [
  (
    variables: CreateProfileVariables
  ) => Promise<CreateProfileData | null | undefined>,
  {
    data: CreateProfileData | null | undefined;
    loading: boolean;
    error?: Error;
  }
] => {
  const [mutate, { data, loading, error }] = useMutation<
    CreateProfileData,
    CreateProfileVariables
  >(CREATE_PROFILE);

  const createProfile = async (
    variables: CreateProfileVariables
  ): Promise<CreateProfileData | null | undefined> => {
    const result = await mutate({ variables });
    return result?.data;
  };

  return [createProfile, { data, loading, error }];
};

export default CREATE_PROFILE;
