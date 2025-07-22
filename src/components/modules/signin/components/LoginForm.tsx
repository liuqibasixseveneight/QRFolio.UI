import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { SignInForm } from '@/components/ui';
import { useLogin } from '@/utils';

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    email,
    password,
    setEmail,
    setPassword,
    handleSignIn,
    loading,
    error,
    emailError,
    passwordError,
    navigateToSignup,
    handleGoogleSignIn,
    session,
    userId,
  } = useLogin();

  useEffect(() => {
    if (session && userId) {
      navigate('/dashboard');
    }
  }, [session, userId]);

  return (
    <SignInForm
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      onSubmit={handleSignIn}
      loading={loading}
      error={error}
      emailError={emailError}
      passwordError={passwordError}
      onGoogleSignIn={handleGoogleSignIn}
      navigateToSignup={navigateToSignup}
    />
  );
};

export default LoginForm;
