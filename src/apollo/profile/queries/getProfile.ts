import { gql, useQuery } from '@apollo/client';

import type {
  GetProfileData,
  GetProfileVariables,
  GetProfileResult,
} from '../types';

const GET_PROFILE = gql`
  query getProfile($id: ID!) {
    profile(id: $id) {
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

export const useGetProfile = (
  id: string
): [GetProfileData | undefined, GetProfileResult] => {
  const { data, loading, error } = useQuery<
    GetProfileData,
    GetProfileVariables
  >(GET_PROFILE, { variables: { id } });

  return [data, { loading, error }];
};

export default GET_PROFILE;
