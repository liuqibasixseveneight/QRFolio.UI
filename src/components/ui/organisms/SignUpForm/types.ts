export type SignUpFormProps = {
  email: string;
  password: string;
  confirmPassword: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  error: string | null;
  emailError?: string;
  passwordError?: string;
  confirmPasswordError?: string;
  onGoogleSignUp: () => void;
  navigateToSignIn: () => void;
};
