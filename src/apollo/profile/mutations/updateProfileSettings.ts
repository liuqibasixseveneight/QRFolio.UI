import { gql, useMutation } from '@apollo/client';

import type {
  UpdateProfileSettingsData,
  UpdateProfileSettingsVariables,
} from '../types';

const UPDATE_PROFILE_SETTINGS = gql`
  mutation updateProfileSettings(
    $id: ID!
    $visibility: AccessLevel
    $permittedUsers: [String!]
    $accessRequests: [String!]
    $showName: Boolean
    $showEmail: Boolean
    $showPhone: Boolean
    $showLinkedIn: Boolean
    $showPortfolio: Boolean
    $showWorkExperience: Boolean
    $showEducation: Boolean
    $showLanguages: Boolean
    $showSkills: Boolean
  ) {
    updateProfileSettings(
      id: $id
      visibility: $visibility
      permittedUsers: $permittedUsers
      accessRequests: $accessRequests
      showName: $showName
      showEmail: $showEmail
      showPhone: $showPhone
      showLinkedIn: $showLinkedIn
      showPortfolio: $showPortfolio
      showWorkExperience: $showWorkExperience
      showEducation: $showEducation
      showLanguages: $showLanguages
      showSkills: $showSkills
    ) {
      id
      visibility
      permittedUsers
      accessRequests
      showName
      showEmail
      showPhone
      showLinkedIn
      showPortfolio
      showWorkExperience
      showEducation
      showLanguages
      showSkills
      createdAt
      updatedAt
    }
  }
`;

export const useUpdateProfileSettings = (): [
  (
    variables: UpdateProfileSettingsVariables
  ) => Promise<UpdateProfileSettingsData | null | undefined>,
  {
    data: UpdateProfileSettingsData | null | undefined;
    loading: boolean;
    error?: Error;
  }
] => {
  const [mutate, { data, loading, error }] = useMutation<
    UpdateProfileSettingsData,
    UpdateProfileSettingsVariables
  >(UPDATE_PROFILE_SETTINGS);

  const updateProfileSettings = async (
    variables: UpdateProfileSettingsVariables
  ): Promise<UpdateProfileSettingsData | null | undefined> => {
    const result = await mutate({ variables });
    return result?.data;
  };

  return [updateProfileSettings, { data, loading, error }];
};

export default UPDATE_PROFILE_SETTINGS;
