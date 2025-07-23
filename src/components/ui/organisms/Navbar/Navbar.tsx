import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

import { useAuth } from '@/context';
import { Button } from '../../atoms';
import type { NavbarProps } from './types';

const Navbar = ({}: NavbarProps) => {
  const navigate = useNavigate();

  const { session, signOut, userId } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleProfileClick = () => {
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };

  return (
    <nav className='bg-white border-b border-gray-200 h-16 w-full flex items-center justify-between px-8 font-sans text-gray-900'>
      <div
        onClick={() => navigate('/')}
        className='cursor-pointer font-extralight text-xl'
      >
        LYTN
      </div>
      <div className='flex items-center justify-center gap-4'>
        {!session ? (
          <>
            <Button onClick={() => navigate('/sign-in')}>Sign In</Button>
            <Button onClick={() => navigate('/sign-up')} variant='outline'>
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleSignOut} variant='outline'>
              Sign Out
            </Button>
            <Button
              onClick={handleProfileClick}
              variant='secondary'
              size='icon'
              aria-label='Profile'
              className='rounded-full'
            >
              <User className='h-5 w-5' />
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
