import { gql, useQuery } from '@apollo/client';

import type { GetUsersData, GetUsersResult } from '../types';

const GET_USERS = gql`
  query getUsers {
    users {
      id
      email
      name
      createdAt
    }
  }
`;

export const useGetUsers = (): [GetUsersData | undefined, GetUsersResult] => {
  const { data, loading, error } = useQuery<GetUsersData>(GET_USERS);

  return [data, { loading, error }];
};

export default GET_USERS;
