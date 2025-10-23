import { useCreateUser, useGetUsers } from './apollo';

import { Button } from './components/ui';

const UsersList = () => {
  const [data, { loading, error }] = useGetUsers();
  const [createUser] = useCreateUser();

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className='flex flex-col w-full h-full items-center justify-center'>
        <div>
          <Button
            onClick={() =>
              createUser({
                email: 'test@qrfolio.com',
                name: 'Jane Doe',
              })
            }
          >
            Create user
          </Button>
        </div>
        <ul>
          {data?.users.map((user) => (
            <li key={user.id}>
              {user.name ?? 'No name'} — {user.email}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UsersList;
