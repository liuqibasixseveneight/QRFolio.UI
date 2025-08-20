import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import { Menu, X, User, PanelLeft } from 'lucide-react';

import { useAuth } from '@/context';
import type { NavbarProps } from './types';

const Navbar = ({}: NavbarProps) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { session, signOut, userId } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    if (userId) {
      navigate(`/profile/${userId}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleDashboardClick = () => {
    if (userId) {
      navigate('/dashboard');
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className='bg-white border-b border-gray-100 h-16 w-full flex items-center justify-between px-6 sm:px-8 lg:px-12 font-sans text-gray-900 sticky top-0 z-50 shadow-sm'>
      {/* Logo */}
      <div
        onClick={() => navigate('/')}
        className='cursor-pointer font-light text-xl sm:text-2xl text-gray-900 hover:text-gray-700 transition-all duration-300'
      >
        LYTN
      </div>

      {/* Desktop Navigation */}
      <div className='hidden md:flex items-center justify-center gap-4'>
        {!session ? (
          <>
            <Button
              onClick={() => navigate('/sign-in')}
              className='bg-gray-900 hover:bg-gray-800 text-white transition-all duration-300'
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate('/sign-up')}
              variant='outline'
              className='border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300'
            >
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={handleSignOut}
              variant='outline'
              className='border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300'
            >
              Sign Out
            </Button>
            <Button
              onClick={handleDashboardClick}
              variant='secondary'
              size='icon'
              aria-label='Dashboard'
              className='rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-800 transition-all duration-300'
            >
              <PanelLeft className='h-5 w-5' />
            </Button>
            <Button
              onClick={handleProfileClick}
              variant='secondary'
              size='icon'
              aria-label='Profile'
              className='rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-800 transition-all duration-300'
            >
              <User className='h-5 w-5' />
            </Button>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className='md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200'
        aria-label='Toggle mobile menu'
      >
        {isMobileMenuOpen ? (
          <X className='h-6 w-6 text-gray-700' />
        ) : (
          <Menu className='h-6 w-6 text-gray-700' />
        )}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-sm md:hidden'>
          <div className='flex flex-col p-4 space-y-3'>
            {!session ? (
              <>
                <Button
                  onClick={() => navigate('/sign-in')}
                  className='w-full bg-gray-900 hover:bg-gray-800 text-white transition-all duration-300'
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate('/sign-up')}
                  variant='outline'
                  className='w-full border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300'
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleSignOut}
                  variant='outline'
                  className='w-full border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300'
                >
                  Sign Out
                </Button>
                <Button
                  onClick={handleDashboardClick}
                  variant='secondary'
                  className='w-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-800 transition-all duration-300'
                >
                  <PanelLeft className='h-4 w-4 mr-2' />
                  Dashboard
                </Button>
                <Button
                  onClick={handleProfileClick}
                  variant='secondary'
                  className='w-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-800 transition-all duration-300'
                >
                  <User className='h-4 w-4 mr-2' />
                  Profile
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
