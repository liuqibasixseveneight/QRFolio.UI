import { SignUpForm } from '@/components/ui';
import { useSignUp } from '@/utils';

const NewAccountForm = () => {
  const {
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
