import {
  Button,
  ErrorMessage,
  Separator,
  GoogleSignInButton,
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
    <div className='min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden'>
      {/* Subtle background elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/10 to-purple-100/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/10 to-indigo-100/10 rounded-full blur-3xl'></div>
      </div>

      {/* Form Card */}
      <Card className='w-full max-w-sm sm:max-w-md bg-white/95 backdrop-blur-sm border-gray-200/50 shadow-2xl relative z-10'>
        <CardHeader className='text-center pb-6'>
          <CardTitle className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent'>
            Create Account
          </CardTitle>
          <p className='text-gray-600 text-sm sm:text-base font-light mt-2'>
            Join LYTN and build your professional profile
          </p>
        </CardHeader>

        <CardContent className='space-y-6'>
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

          <Button
            onClick={onSubmit}
            disabled={loading}
            className='w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98] font-semibold'
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>

          <Separator className='my-6' />

          <GoogleSignInButton onClick={onGoogleSignUp} />

          <div className='text-center text-sm mt-6'>
            <span className='text-gray-600'>Already have an account? </span>
            <button
              onClick={navigateToSignIn}
              className='text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-colors duration-200'
            >
              Sign In
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
