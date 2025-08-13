import { gql, useMutation } from '@apollo/client';

import type { UpdateProfileData, UpdateProfileVariables } from '../types';

const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $id: ID!
    $fullName: String
    $phone: String
    $email: String
    $linkedin: String
    $portfolio: String
    $professionalSummary: String
    $workExperience: JSON
    $education: JSON
    $languages: JSON
  ) {
    updateProfile(
      id: $id
      fullName: $fullName
      phone: $phone
      email: $email
      linkedin: $linkedin
      portfolio: $portfolio
      professionalSummary: $professionalSummary
      workExperience: $workExperience
      education: $education
      languages: $languages
    ) {
      id
      fullName
      phone
      email
      linkedin
      portfolio
      professionalSummary
      workExperience
      education
      languages
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
