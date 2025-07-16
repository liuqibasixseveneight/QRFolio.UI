export type User = {
  id: number;
  email: string;
  name?: string;
};

export type GetUsersData = {
  users: User[];
};

export type GetUsersResult = {
  loading: boolean;
  error?: Error | null;
};

export type CreateUserData = {
  createUser: {
    id: string;
    email: string;
    name?: string | null;
    createdAt: string;
  };
};

export type CreateUserVariables = {
  email: string;
  name?: string | null;
};
