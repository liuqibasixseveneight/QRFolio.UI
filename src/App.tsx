import { Route, Routes } from 'react-router-dom';

import { ProfileForm } from './ProfileForm';
import ProfilePage from './ProfilePage';
import ResumeForm from './ResumeForm';

const App = () => {
  return (
    <>
      <main className='flex min-h-screen items-center justify-center p-4'>
        <Routes>
          <Route index path='/' element={<ResumeForm />} />
          {/* <Route index path='/' element={<ProfileForm />} /> */}
          <Route path='/profile/:id' element={<ProfilePage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
