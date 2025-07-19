import { Route, Routes } from 'react-router-dom';

import CreateProfile from './components/modules/create/pages/CreateProfile';
import ProfileCreated from './components/modules/create/pages/ProfileCreated';
import Profile from './components/modules/profile/pages/Profile';
import Landing from './components/modules/landing/pages/Landing';
import SignIn from './components/modules/signin/pages/SignIn';
import SignUp from './components/modules/signup/pages/SignUp';

const App = () => {
  return (
    <>
      <main className='flex min-h-screen items-center justify-center p-4'>
        <Routes>
          <Route index path='/' element={<Landing />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/create-profile' element={<CreateProfile />} />
          <Route path='/profile-created' element={<ProfileCreated />} />
          <Route path='/profile/:id' element={<Profile />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
