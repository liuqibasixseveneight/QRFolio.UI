import { useNavigate } from 'react-router-dom';
import { PanelLeft, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

import { useAuth } from '@/context';
import { Button } from '../../atoms';
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
    <nav className='bg-white/95 backdrop-blur-sm border-b border-gray-200/50 h-16 w-full flex items-center justify-between px-4 sm:px-6 md:px-8 font-sans text-gray-900 sticky top-0 z-50 shadow-sm'>
      {/* Logo */}
      <div
        onClick={() => navigate('/')}
        className='cursor-pointer font-extralight text-xl sm:text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition-all duration-300'
      >
        LYTN
      </div>

      {/* Desktop Navigation */}
      <div className='hidden md:flex items-center justify-center gap-4'>
        {!session ? (
          <>
            <Button
              onClick={() => navigate('/sign-in')}
              className='bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg hover:shadow-xl transition-all duration-300'
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate('/sign-up')}
              variant='outline'
              className='border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 shadow-lg hover:shadow-xl transition-all duration-300'
            >
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={handleSignOut}
              variant='outline'
              className='border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300'
            >
              Sign Out
            </Button>
            <Button
              onClick={handleDashboardClick}
              variant='secondary'
              size='icon'
              aria-label='Dashboard'
              className='rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 text-indigo-700 hover:text-indigo-800 shadow-lg hover:shadow-xl transition-all duration-300'
            >
              <PanelLeft className='h-5 w-5' />
            </Button>
            <Button
              onClick={handleProfileClick}
              variant='secondary'
              size='icon'
              aria-label='Profile'
              className='rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 text-indigo-700 hover:text-indigo-800 shadow-lg hover:shadow-xl transition-all duration-300'
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
        <div className='absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-lg md:hidden'>
          <div className='flex flex-col p-4 space-y-3'>
            {!session ? (
              <>
                <Button
                  onClick={() => navigate('/sign-in')}
                  className='w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg transition-all duration-300'
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate('/sign-up')}
                  variant='outline'
                  className='w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 shadow-lg transition-all duration-300'
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleSignOut}
                  variant='outline'
                  className='w-full border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-lg transition-all duration-300'
                >
                  Sign Out
                </Button>
                <Button
                  onClick={handleDashboardClick}
                  variant='secondary'
                  className='w-full bg-gradient-to-r from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 text-indigo-700 hover:text-indigo-800 shadow-lg transition-all duration-300'
                >
                  <PanelLeft className='h-4 w-4 mr-2' />
                  Dashboard
                </Button>
                <Button
                  onClick={handleProfileClick}
                  variant='secondary'
                  className='w-full bg-gradient-to-r from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 text-indigo-700 hover:text-indigo-800 shadow-lg transition-all duration-300'
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
