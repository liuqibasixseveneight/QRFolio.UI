import { gql, useMutation } from '@apollo/client';

import type { CreateProfileData, CreateProfileVariables } from '../types';

const CREATE_PROFILE = gql`
  mutation createProfile(
    $id: ID!
    $fullName: String!
    $phone: String
    $email: String!
    $linkedin: String
    $portfolio: String
    $professionalSummary: String!
    $workExperience: JSON!
    $education: JSON!
    $languages: JSON!
  ) {
    createProfile(
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
