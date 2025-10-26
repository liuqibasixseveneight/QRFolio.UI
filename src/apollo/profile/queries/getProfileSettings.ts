import { gql, useQuery } from '@apollo/client';

import type {
  GetProfileSettingsData,
  GetProfileSettingsVariables,
  GetProfileSettingsResult,
} from '../types';

const GET_PROFILE_SETTINGS = gql`
  query getProfileSettings($id: ID!) {
    getProfileSettings(id: $id) {
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

export const useGetProfileSettings = (
  id: string | null
): [
  GetProfileSettingsData | undefined,
  GetProfileSettingsResult & { refetch: () => void }
] => {
  const { data, loading, error, refetch } = useQuery<
    GetProfileSettingsData,
    GetProfileSettingsVariables
  >(GET_PROFILE_SETTINGS, {
    fetchPolicy: 'network-only',
    variables: { id: id || '' },
    skip: !id || id.trim() === '',
  });

  return [data, { loading, error, refetch }];
};

export default GET_PROFILE_SETTINGS;
