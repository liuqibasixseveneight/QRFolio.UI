import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from './components/ui/molecules/Card/Card';
import { ResumeQRCard } from './ResumeQRCard';
import { Label, Input, Button } from './components/ui';

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
});

type FormData = z.infer<typeof formSchema>;

export const ProfileForm = () => {
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    const id = uuidv4();
    const baseUrl = `${window.location.origin}/profile/${id}`;

    // TODO: Replace with MongoDB/actual storage
    localStorage.setItem(`profile-${id}`, JSON.stringify(data));

    setGeneratedLink(baseUrl);
    setDisplayName(`${data.firstName} ${data.lastName}`);
  };

  if (generatedLink && displayName) {
    return <ResumeQRCard link={generatedLink} labels={{ displayName }} />;
  }

  return (
    <Card className='w-full max-w-md p-6'>
      <CardHeader>
        <CardTitle className='text-xl font-bold'>
          Create Your QRFolio Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div className='flex flex-col space-y-1'>
            <Label htmlFor='firstName'>First Name</Label>
            <Input id='firstName' {...register('firstName')} />
            {errors.firstName && (
              <p className='text-red-500 text-sm'>{errors.firstName.message}</p>
            )}
          </div>

          <div className='flex flex-col space-y-1'>
            <Label htmlFor='lastName'>Last Name</Label>
            <Input id='lastName' {...register('lastName')} />
            {errors.lastName && (
              <p className='text-red-500 text-sm'>{errors.lastName.message}</p>
            )}
          </div>

          <div className='flex flex-col space-y-1'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' {...register('email')} />
            {errors.email && (
              <p className='text-red-500 text-sm'>{errors.email.message}</p>
            )}
          </div>

          <div className='flex flex-col space-y-1'>
            <Label htmlFor='address'>Address</Label>
            <Input id='address' {...register('address')} />
            {errors.address && (
              <p className='text-red-500 text-sm'>{errors.address.message}</p>
            )}
          </div>

          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Generating...' : 'Generate QR'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
