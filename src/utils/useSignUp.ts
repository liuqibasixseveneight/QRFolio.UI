import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useAuth } from '@/context';

const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Please enter your email address')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const useSignUp = () => {
  const navigate = useNavigate();
  const { session, signUp, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const [globalError, setGlobalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setGlobalError(null);
    setErrors({});

    const validation = signupSchema.safeParse({
      email,
      password,
      confirmPassword,
    });

    if (!validation.success) {
      const fieldErrors: {
        email?: string;
        password?: string;
        confirmPassword?: string;
      } = {};
      validation.error.errors.forEach((err) => {
        const field = err.path[0] as 'email' | 'password' | 'confirmPassword';
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password);

    if (error) {
      setGlobalError(error);
    } else {
      navigate('/create-profile');
    }

    setLoading(false);
  };

  const handleGoogleSignUp = async () => {
    setGlobalError(null);
    setErrors({});
    await signInWithGoogle();
  };

  const navigateToSignIn = () => navigate('/sign-in');

  return {
    session,
    email,
    password,
    confirmPassword,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSignUp,
    loading,
    error: globalError,
    emailError: errors.email,
    passwordError: errors.password,
    confirmPasswordError: errors.confirmPassword,
    handleGoogleSignUp,
    navigateToSignIn,
  };
};
