import { Route, Routes } from 'react-router-dom';

import CreateProfile from './components/modules/create/pages/CreateProfile';
import ProfileCreated from './components/modules/create/pages/ProfileCreated';
import Profile from './components/modules/profile/pages/Profile';
import UsersList from './UserList';

const App = () => {
  return (
    <>
      <main className='flex min-h-screen items-center justify-center p-4'>
        <Routes>
          <Route index path='/' element={<CreateProfile />} />
          <Route path='/user-list' element={<UsersList />} />
          <Route path='/profile-created' element={<ProfileCreated />} />
          <Route path='/profile/:id' element={<Profile />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
