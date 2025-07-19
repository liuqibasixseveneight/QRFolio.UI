import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useAuth } from '@/context';
import { supabase } from '@/supabase/supabase';

const loginSchema = z.object({
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
});

export const useLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { session } = useAuth();

  const handleSignIn = async () => {
    setGlobalError(null);
    setErrors({});

    const validation = loginSchema.safeParse({ email, password });

    if (!validation.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      validation.error.errors.forEach((err) => {
        const field = err.path[0] as 'email' | 'password';
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setGlobalError(error.message);
    } else {
      navigate('/create-profile');
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setGlobalError(null);
    setErrors({});
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      setGlobalError(error.message);
    }
  };

  const navigateToSignup = () => navigate('/sign-up');

  return {
    session,
    email,
    password,
    setEmail,
    setPassword,
    handleSignIn,
    loading,
    error: globalError,
    emailError: errors.email,
    passwordError: errors.password,
    handleGoogleSignIn,
    navigateToSignup,
  };
};
