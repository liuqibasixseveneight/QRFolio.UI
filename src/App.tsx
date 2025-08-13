import { Route, Routes } from 'react-router-dom';

import { Navbar } from './components/ui';
import Dashboard from './components/modules/dashboard/pages/Dashboard';
import CreateProfile from './components/modules/create/pages/CreateProfile';
import Landing from './components/modules/landing/pages/Landing';
import ProfileCreated from './components/modules/create/pages/ProfileCreated';
import Profile from './components/modules/profile/pages/Profile';
import SignIn from './components/modules/signin/pages/SignIn';
import SignUp from './components/modules/signup/pages/SignUp';
import Edit from './components/modules/edit/pages/Edit';
import Share from './components/modules/share/pages/Share';
import { ProtectedRoute, PublicRoute, routes } from './utils';

const App = () => {
  return (
    <>
      <Navbar />

      <main className='flex min-h-screen items-center justify-center'>
        <Routes>
          <Route index path='/' element={<Landing />} />

          {/*
           * PUBLIC ROUTES - will redirect if user is already signed in
           */}
          <Route element={<PublicRoute redirectTo={routes?.DASHBOARD} />}>
            <Route path={routes?.SIGN_IN} element={<SignIn />} />
            <Route path={routes?.SIGN_UP} element={<SignUp />} />
          </Route>

          {/*
           * PROTECTED ROUTES - require authentication to access
           */}
          <Route element={<ProtectedRoute redirectTo={routes?.SIGN_IN} />}>
            <Route path={routes?.DASHBOARD} element={<Dashboard />} />
            <Route path={routes?.CREATE_PROFILE} element={<CreateProfile />} />
            <Route
              path={routes?.PROFILE_CREATED}
              element={<ProfileCreated />}
            />
            <Route path={routes?.EDIT_PROFILE} element={<Edit />} />
            <Route path={routes?.PROFILE} element={<Profile />} />
            <Route path={routes?.SHARE_PROFILE} element={<Share />} />
          </Route>
        </Routes>
      </main>
    </>
  );
};

export default App;
