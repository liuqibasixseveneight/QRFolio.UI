import { useNavigate } from 'react-router-dom';

import { SignUpForm } from '@/components/ui';
import { useSignUp } from '@/utils';

const NewAccountForm = () => {
  const {
    session,
    email,
    password,
    confirmPassword,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSignUp,
    loading,
    error,
    emailError,
    passwordError,
    confirmPasswordError,
    handleGoogleSignUp,
    navigateToSignIn,
  } = useSignUp();

  const navigate = useNavigate();

  if (session) {
    navigate('/create-profile');
    return null;
  }

  return (
    <SignUpForm
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      setEmail={setEmail}
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword}
      onSubmit={handleSignUp}
      loading={loading}
      error={error}
      emailError={emailError}
      passwordError={passwordError}
      confirmPasswordError={confirmPasswordError}
      onGoogleSignUp={handleGoogleSignUp}
      navigateToSignIn={navigateToSignIn}
    />
  );
};

export default NewAccountForm;
