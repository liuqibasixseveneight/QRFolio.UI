import { gql, useQuery } from '@apollo/client';

import type {
  GetUsersByIdsData,
  GetUsersByIdsVariables,
  GetUsersByIdsResult,
} from '../types';

const GET_USERS_BY_IDS = gql`
  query usersByIds($userIds: [ID!]!) {
    usersByIds(userIds: $userIds) {
      id
      fullName
    }
  }
`;

export const useGetUsersByIds = (
  userIds: string[]
): [GetUsersByIdsData | undefined, GetUsersByIdsResult] => {
  const { data, loading, error } = useQuery<
    GetUsersByIdsData,
    GetUsersByIdsVariables
  >(GET_USERS_BY_IDS, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    variables: { userIds },
    skip: !userIds || userIds.length === 0,
  });

  return [data, { loading, error }];
};

export default GET_USERS_BY_IDS;

