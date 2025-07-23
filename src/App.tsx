import { Route, Routes } from 'react-router-dom';

import Dashboard from './components/modules/dashboard/pages/Dashboard';
import CreateProfile from './components/modules/create/pages/CreateProfile';
import Landing from './components/modules/landing/pages/Landing';
import ProfileCreated from './components/modules/create/pages/ProfileCreated';
import Profile from './components/modules/profile/pages/Profile';
import SignIn from './components/modules/signin/pages/SignIn';
import SignUp from './components/modules/signup/pages/SignUp';
import { Navbar } from './components/ui';
import { ProtectedRoute, PublicRoute } from './utils';

const App = () => {
  return (
    <>
      <Navbar />

      <main className='flex min-h-screen items-center justify-center'>
        <Routes>
          <Route index path='/' element={<Landing />} />

          {/* Public routes with redirect if signed in */}
          <Route element={<PublicRoute redirectTo='/dashboard' />}>
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
          </Route>

          {/* Protected routes requiring authentication */}
          <Route element={<ProtectedRoute redirectTo='/sign-in' />}>
            <Route path='/create-profile' element={<CreateProfile />} />
            <Route path='/profile-created' element={<ProfileCreated />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </main>
    </>
  );
};

export default App;
