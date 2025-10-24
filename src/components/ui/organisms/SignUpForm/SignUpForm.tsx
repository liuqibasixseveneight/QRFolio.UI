import {
  Button,
  ErrorMessage,
  Separator,
  GoogleSignInButton,
} from '../../atoms';
import { FormField } from '../../molecules';
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
    <main className='min-h-screen w-full bg-gray-50 text-gray-900 font-sans relative overflow-hidden flex items-center'>
      <div className='relative z-10 px-6 sm:px-8 lg:px-12 py-16 lg:py-20 w-full'>
        <div className='max-w-6xl mx-auto w-full'>
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
            <div className='flex flex-col lg:flex-row'>
              <section className='w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 lg:py-20'>
                <div className='max-w-md mx-auto w-full'>
                  <div className='text-center lg:text-left mb-8'>
                    <div className='inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6'>
                      <div className='w-2 h-2 bg-gray-400 rounded-full'></div>
                      <span className='text-xs font-medium text-gray-600 uppercase tracking-wider'>
                        Create Account
                      </span>
                    </div>
                    <h1 className='text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight text-gray-900 mb-4'>
                      Join CV HOST
                    </h1>
                    <p className='text-gray-600 text-lg leading-relaxed'>
                      Create your professional profile and start building your
                      digital resume
                    </p>
                  </div>

                  <div className='space-y-6'>
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
                      className='w-full bg-gray-900 hover:bg-gray-800 text-white transition-all duration-300 font-medium'
                    >
                      {loading ? 'Creating account...' : 'Create Account'}
                    </Button>

                    <Separator className='my-6' />

                    <GoogleSignInButton onClick={onGoogleSignUp} />

                    <div className='text-center lg:text-left text-sm mt-6'>
                      <span className='text-gray-600'>
                        Already have an account?{' '}
                      </span>
                      <button
                        onClick={navigateToSignIn}
                        className='text-gray-700 hover:text-gray-900 font-medium hover:underline transition-colors duration-200'
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section className='w-full lg:w-1/2 bg-gray-50 flex flex-col justify-center items-center px-8 sm:px-12 lg:px-16 py-16 lg:py-20 text-center'>
                <div className='max-w-md mx-auto'>
                  <div className='w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-8 mx-auto'>
                    <svg
                      className='w-12 h-12 text-gray-600'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={1.5}
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                  </div>
                  <h2 className='text-2xl font-light text-gray-900 mb-4'>
                    Professional Profile
                  </h2>
                  <p className='text-gray-600 text-lg leading-relaxed'>
                    Build your professional identity with a modern, shareable
                    digital resume
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUpForm;
