import { GoogleIcon } from '@/components/icons';
import { Button } from '../Button';
import type { GoogleSignInButtonProps } from './types';

const GoogleSignInButton = ({ onClick }: GoogleSignInButtonProps) => (
  <Button
    onClick={onClick}
    variant='outline'
    className='w-full flex items-center justify-center gap-2'
  >
    <GoogleIcon />
    Sign in with Google
  </Button>
);

export default GoogleSignInButton;
