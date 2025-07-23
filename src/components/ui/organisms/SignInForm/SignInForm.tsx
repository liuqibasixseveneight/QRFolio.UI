import {
  Button,
  ErrorMessage,
  GoogleSignInButton,
  Separator,
} from '../../atoms';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FormField,
} from '../../molecules';
import type { SignInFormProps } from './types';

const SignInForm = ({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  loading,
  error,
  emailError,
  passwordError,
  onGoogleSignIn,
  navigateToSignup,
}: SignInFormProps) => {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <FormField
          label='Email'
          type='input'
          placeholder='you@example.com'
          value={email}
          onChange={setEmail}
          required
          error={emailError}
        />

        <FormField
          label='Password'
          type='password'
          placeholder='••••••••'
          value={password}
          onChange={setPassword}
          required
          error={passwordError}
        />

        {error && <ErrorMessage message={error} />}

        <Button onClick={onSubmit} disabled={loading} className='w-full'>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>

        <Separator className='my-4' />

        <GoogleSignInButton onClick={onGoogleSignIn} />

        <div className='text-center text-sm mt-4'>
          Don&apos;t have an account?{' '}
          <button
            onClick={navigateToSignup}
            className='text-blue-600 hover:underline'
          >
            Sign Up
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
