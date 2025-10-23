import { GoogleIcon } from '@/components/icons';
import { Button } from '@/components/ui';
import type { GoogleSignInButtonProps } from './types';

const GoogleSignInButton = ({ onClick }: GoogleSignInButtonProps) => (
  <Button
    onClick={onClick}
    variant='outline'
    className='w-full flex items-center justify-center gap-3 border-gray-200/50 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold py-3'
  >
    <GoogleIcon />
    <span className='text-sm sm:text-base'>Sign in with Google</span>
  </Button>
);

export default GoogleSignInButton;
