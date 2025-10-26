import { gql, useMutation } from '@apollo/client';

import type { UpdateProfileData, UpdateProfileVariables } from '../types';

// Note: When updating arrays like permittedUsers or accessRequests,
// make sure to pass the complete array (with the new item added) not just the new item
const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $id: ID!
    $fullName: String
    $phone: JSON
    $email: String
    $linkedin: String
    $portfolio: String
    $professionalSummary: String
    $availability: Availability
    $accessLevel: AccessLevel
    $showName: Boolean
    $showEmail: Boolean
    $showPhone: Boolean
    $showLinkedIn: Boolean
    $showPortfolio: Boolean
    $showWorkExperience: Boolean
    $showEducation: Boolean
    $showLanguages: Boolean
    $showSkills: Boolean
    $permittedUsers: [String!]
    $accessRequests: [String!]
    $workExperience: JSON
    $education: JSON
    $languages: JSON
    $skills: [SkillCategoryInput!]
  ) {
    updateProfile(
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
      permittedUsers: $permittedUsers
      accessRequests: $accessRequests
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
      permittedUsers
      accessRequests
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

export const useUpdateProfile = (): [
  (
    variables: UpdateProfileVariables
  ) => Promise<UpdateProfileData | null | undefined>,
  {
    data: UpdateProfileData | null | undefined;
    loading: boolean;
    error?: Error;
  }
] => {
  const [mutate, { data, loading, error }] = useMutation<
    UpdateProfileData,
    UpdateProfileVariables
  >(UPDATE_PROFILE);

  const updateProfile = async (
    variables: UpdateProfileVariables
  ): Promise<UpdateProfileData | null | undefined> => {
    const result = await mutate({ variables });
    return result?.data;
  };

  return [updateProfile, { data, loading, error }];
};

export default UPDATE_PROFILE;
