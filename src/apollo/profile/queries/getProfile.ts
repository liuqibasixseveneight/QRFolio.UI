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
      createdAt
      updatedAt
    }
  }
`;

export const useGetProfile = (
  id: string | null
): [GetProfileData | undefined, GetProfileResult & { refetch: () => void }] => {
  const { data, loading, error, refetch } = useQuery<
    GetProfileData,
    GetProfileVariables
  >(GET_PROFILE, {
    fetchPolicy: 'network-only',
    variables: { id },
    skip: !id || id.trim() === '',
  });

  return [data, { loading, error, refetch }];
};

export default GET_PROFILE;
