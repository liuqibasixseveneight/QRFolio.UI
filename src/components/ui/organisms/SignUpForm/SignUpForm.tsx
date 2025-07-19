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
import type { SignUpFormProps } from './types';

const SignUpForm = ({
  email,
  password,
  confirmPassword,
  setEmail,
  setPassword,
  setConfirmPassword,
  onSubmit,
  loading,
  error,
  emailError,
  passwordError,
  confirmPasswordError,
  onGoogleSignUp,
  navigateToSignIn,
}: SignUpFormProps) => {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
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

        <FormField
          label='Confirm Password'
          type='password'
          placeholder='••••••••'
          value={confirmPassword}
          onChange={setConfirmPassword}
          required
          error={confirmPasswordError}
        />

        {error && <ErrorMessage message={error} />}

        <Button onClick={onSubmit} disabled={loading} className='w-full'>
          {loading ? 'Signing up...' : 'Sign Up'}
        </Button>

        <Separator className='my-4' />

        <GoogleSignInButton onClick={onGoogleSignUp} />

        <div className='text-center text-sm mt-4'>
          Already have an account?{' '}
          <button
            onClick={navigateToSignIn}
            className='text-blue-600 hover:underline'
          >
            Sign In
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
