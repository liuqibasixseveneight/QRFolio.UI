export type SignInFormProps = {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  error?: string | null;
  emailError?: string;
  passwordError?: string;
  onGoogleSignIn: () => void;
  navigateToSignup: () => void;
};
