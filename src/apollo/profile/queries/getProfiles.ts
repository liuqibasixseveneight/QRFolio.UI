import { gql, useQuery } from '@apollo/client';

import type { GetProfilesData, GetProfilesResult } from '../types';

const GET_PROFILES = gql`
  query getProfiles {
    profiles {
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
      createdAt
    }
  }
`;

export const useGetProfiles = (): [
  GetProfilesData | undefined,
  GetProfilesResult
] => {
  const { data, loading, error } = useQuery<GetProfilesData>(GET_PROFILES, {
    fetchPolicy: 'network-only',
  });

  return [data, { loading, error }];
};

export default GET_PROFILES;
