import { gql, useMutation } from '@apollo/client';

import type { UpdateProfileData, UpdateProfileVariables } from '../types';

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
    $workExperience: JSON
    $education: JSON
    $languages: JSON
    $skills: JSON
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
      workExperience
      education
      languages
      skills
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
