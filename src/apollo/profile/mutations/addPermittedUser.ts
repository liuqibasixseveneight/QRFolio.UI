import { gql, useMutation } from '@apollo/client';

import type { UpdateProfileData } from '../types';

const ADD_ACCESS_REQUEST = gql`
  mutation addAccessRequest($id: ID!, $accessRequests: [String!]!) {
    updateProfile(id: $id, accessRequests: $accessRequests) {
      id
      fullName
      accessRequests
    }
  }
`;

export type AddPermittedUserVariables = {
  id: string;
  accessRequests: string[];
};

export type AddPermittedUserArgs = {
  profileId: string;
  userId: string;
  currentAccessRequests?: string[];
};

export const useAddAccessRequest = (): [
  (
    variables: AddPermittedUserArgs
  ) => Promise<UpdateProfileData | null | undefined>,
  {
    data: UpdateProfileData | null | undefined;
    loading: boolean;
    error?: Error;
  }
] => {
  const [mutate, { data, loading, error }] = useMutation<
    UpdateProfileData,
    AddPermittedUserVariables
  >(ADD_ACCESS_REQUEST);

  const addAccessRequest = async (
    args: AddPermittedUserArgs
  ): Promise<UpdateProfileData | null | undefined> => {
    const { profileId, userId, currentAccessRequests = [] } = args;

    // Add the new user ID to the access requests array (not permitted users)
    const updatedAccessRequests = [
      ...new Set([...currentAccessRequests, userId]),
    ];

    const result = await mutate({
      variables: {
        id: profileId,
        accessRequests: updatedAccessRequests,
      },
    });

    return result?.data;
  };

  return [addAccessRequest, { data, loading, error }];
};

export default ADD_ACCESS_REQUEST;
