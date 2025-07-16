import { gql, useMutation } from '@apollo/client';

import type { CreateUserData, CreateUserVariables } from '../types';

const CREATE_USER = gql`
  mutation createUser($email: String!, $name: String) {
    createUser(email: $email, name: $name) {
      id
      email
      name
      createdAt
    }
  }
`;

export function useCreateUser(): [
  (
    variables: CreateUserVariables
  ) => Promise<CreateUserData | null | undefined>,
  {
    data: CreateUserData | null | undefined;
    loading: boolean;
    error?: Error;
  }
] {
  const [mutate, { data, loading, error }] = useMutation<
    CreateUserData,
    CreateUserVariables
  >(CREATE_USER);

  const createUser = async (
    variables: CreateUserVariables
  ): Promise<CreateUserData | null | undefined> => {
    const result = await mutate({ variables });

    return result?.data;
  };

  return [createUser, { data, loading, error }];
}

export default CREATE_USER;
