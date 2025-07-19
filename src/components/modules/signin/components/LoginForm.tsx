import { useNavigate } from 'react-router-dom';

import { SignInForm } from '@/components/ui';
import { useLogin } from '@/utils';

const LoginForm = () => {
  const {
    session,
    email,
    password,
    setEmail,
    setPassword,
    handleSignIn,
    loading,
    error,
    emailError,
    passwordError,
    handleGoogleSignIn,
    navigateToSignup,
  } = useLogin();

  const navigate = useNavigate();

  if (session) {
    navigate('/create-profile');
    return null;
  }

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
