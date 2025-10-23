import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, Eye, EyeOff, Copy, Plus, X, Check } from 'lucide-react';
import { FormattedMessage } from 'react-intl';
import { z } from 'zod';

import {
  Button,
  LoadingSpinner,
  useToast,
  Breadcrumb,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { useAuth } from '@/context';
import { useGetProfile } from '@/apollo/profile';
import { useUpdateProfile } from '@/apollo/profile/mutations/updateProfile';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';

const settingsSchema = z.object({
  accessLevel: z.enum(['public', 'private', 'restricted'], {
    required_error: 'Please select your profile visibility',
  }),
  showName: z.boolean(),
  showEmail: z.boolean(),
  showPhone: z.boolean(),
  showLinkedIn: z.boolean(),
  showPortfolio: z.boolean(),
  showWorkExperience: z.boolean(),
  showEducation: z.boolean(),
  showLanguages: z.boolean(),
  showSkills: z.boolean(),
  permittedUsers: z.array(z.string()).optional(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const SettingsPage = () => {
  const { toast } = useToast();
  const { userId } = useAuth();
  const breadcrumbs = useBreadcrumbs();

  const [showUserId, setShowUserId] = useState(false);
  const [permittedUserInput, setPermittedUserInput] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const [profileData, { loading: loadingProfile }] = useGetProfile(
    userId || ''
  );
  const [updateProfile, { loading: updating }] = useUpdateProfile();

  const profile = profileData?.profile;

  // Helper functions
  const copyUserId = async () => {
    if (userId) {
      try {
        await navigator.clipboard.writeText(userId);
        setCopySuccess(true);
        toast({
          title: 'User ID copied to clipboard',
          description: 'Your user ID has been copied successfully.',
          variant: 'success',
        });
        // Reset icon after 2 seconds
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        toast({
          title: 'Failed to copy',
          description: 'Unable to copy user ID to clipboard.',
          variant: 'destructive',
        });
      }
    }
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors, isDirty },
    reset,
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
  });

  const permittedUsers = watch('permittedUsers') || [];

  const addPermittedUser = () => {
    if (
      permittedUserInput.trim() &&
      !getValues('permittedUsers')?.includes(permittedUserInput.trim())
    ) {
      const currentUsers = getValues('permittedUsers') || [];
      setValue('permittedUsers', [...currentUsers, permittedUserInput.trim()], {
        shouldDirty: true,
      });
      setPermittedUserInput('');
    }
  };

  const removePermittedUser = (userIdToRemove: string) => {
    const currentUsers = getValues('permittedUsers') || [];
    setValue(
      'permittedUsers',
      currentUsers.filter((id: string) => id !== userIdToRemove),
      { shouldDirty: true }
    );
  };

  useEffect(() => {
    if (profile && profile.id) {
      // Reset form with profile data to ensure all fields are properly updated
      reset({
        accessLevel: profile.accessLevel || 'public',
        showName: profile.showName ?? true,
        showEmail: profile.showEmail ?? true,
        showPhone: profile.showPhone ?? true,
        showLinkedIn: profile.showLinkedIn ?? true,
        showPortfolio: profile.showPortfolio ?? true,
        showWorkExperience: profile.showWorkExperience ?? true,
        showEducation: profile.showEducation ?? true,
        showLanguages: profile.showLanguages ?? true,
        showSkills: profile.showSkills ?? true,
        permittedUsers: profile.permittedUsers || [],
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      await updateProfile({
        id: userId || '',
        accessLevel: data.accessLevel,
        showName: data.showName,
        showEmail: data.showEmail,
        showPhone: data.showPhone,
        showLinkedIn: data.showLinkedIn,
        showPortfolio: data.showPortfolio,
        showWorkExperience: data.showWorkExperience,
        showEducation: data.showEducation,
        showLanguages: data.showLanguages,
        showSkills: data.showSkills,
        permittedUsers: data.permittedUsers,
      });

      toast({
        title: 'Settings Updated Successfully! ✨',
        description: 'Your privacy settings have been saved.',
        variant: 'success',
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: 'Settings Update Failed',
        description: 'Failed to update settings. Please try again later.',
        variant: 'destructive',
      });
    }
  };

  if (loadingProfile) {
    return (
      <main className='min-h-screen w-full bg-gray-50 text-gray-900 font-sans relative overflow-hidden flex items-center justify-center'>
        <div className='w-16 h-16'>
          <LoadingSpinner />
        </div>
      </main>
    );
  }

  return (
    <main className='min-h-screen w-full bg-gray-50 text-gray-900 font-sans relative overflow-hidden'>
      <div className='w-full bg-white border-b border-gray-100 shadow-sm'>
        <div className='w-full px-6 sm:px-8 lg:px-12'>
          <div className='max-w-6xl mx-auto w-full'>
            {breadcrumbs.length > 0 && (
              <div className='px-6 sm:px-8 lg:px-12 pt-6 pb-4'>
                <Breadcrumb items={breadcrumbs} />
              </div>
            )}
            <div className='px-6 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32'>
              <div className='text-center max-w-4xl mx-auto'>
                <h1 className='text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-6'>
                  <FormattedMessage id='settings.title' />
                </h1>
                <p className='text-lg lg:text-xl text-gray-600 leading-relaxed font-light max-w-3xl mx-auto'>
                  <FormattedMessage id='settings.description' />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='relative z-10 px-6 sm:px-8 lg:px-12 py-16 lg:py-20'>
        <div className='max-w-4xl mx-auto w-full'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
            {/* Profile Visibility Section */}
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8'>
              <div className='mb-6'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
                  <FormattedMessage id='settings.profileVisibility.title' />
                </h2>
                <p className='text-gray-600'>
                  <FormattedMessage id='settings.profileVisibility.description' />
                </p>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    <FormattedMessage id='forms.profileVisibility' />
                  </label>
                  <Controller
                    name='accessLevel'
                    control={control}
                    defaultValue={profile?.accessLevel || 'public'}
                    render={({ field }) => (
                      <Select
                        value={field.value || profile?.accessLevel || 'public'}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className='w-full group hover:[&_svg]:!opacity-100 hover:[&_svg]:!text-gray-800 data-[state=open]:[&_svg]:!opacity-100 data-[state=open]:[&_svg]:!text-gray-800 [&_svg]:transition-all [&_svg]:duration-200'>
                          <SelectValue placeholder='Select visibility' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='public'>
                            <FormattedMessage id='forms.accessLevel.public' />
                          </SelectItem>
                          <SelectItem value='private'>
                            <FormattedMessage id='forms.accessLevel.private' />
                          </SelectItem>
                          <SelectItem value='restricted'>
                            <FormattedMessage id='forms.accessLevel.restricted' />
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.accessLevel && (
                    <p className='text-red-600 text-sm mt-1'>
                      {errors.accessLevel.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Permissions */}
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8'>
              <div className='mb-6'>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  <FormattedMessage id='settings.profilePermissions.title' />
                </h3>
                <p className='text-gray-600'>
                  <FormattedMessage id='settings.profilePermissions.description' />
                </p>
              </div>

              <div className='space-y-6'>
                {/* User ID Display */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    <FormattedMessage id='settings.profilePermissions.yourUserId' />
                  </label>
                  <div className='flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50'>
                    <code className='flex-1 font-mono text-sm text-gray-800'>
                      {showUserId ? userId : userId?.replace(/./g, '*')}
                    </code>
                    <button
                      type='button'
                      onClick={() => setShowUserId(!showUserId)}
                      className='p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer'
                    >
                      {showUserId ? (
                        <EyeOff className='w-4 h-4' />
                      ) : (
                        <Eye className='w-4 h-4' />
                      )}
                    </button>
                    <button
                      type='button'
                      onClick={copyUserId}
                      className={`p-2 transition-colors duration-200 cursor-pointer ${
                        copySuccess
                          ? 'text-green-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {copySuccess ? (
                        <Check className='w-4 h-4' />
                      ) : (
                        <Copy className='w-4 h-4' />
                      )}
                    </button>
                  </div>
                </div>

                {/* Permitted Users */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    <FormattedMessage id='settings.profilePermissions.permittedUsers' />
                  </label>
                  <div className='space-y-3'>
                    <div className='flex gap-2'>
                      <input
                        type='text'
                        value={permittedUserInput}
                        onChange={(e) => setPermittedUserInput(e.target.value)}
                        placeholder='Enter user ID...'
                        className='flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        onKeyPress={(e) =>
                          e.key === 'Enter' && addPermittedUser()
                        }
                      />
                      <Button
                        type='button'
                        onClick={addPermittedUser}
                        disabled={!permittedUserInput.trim()}
                        className='h-12 px-4 cursor-pointer hover:bg-blue-600 transition-colors duration-200'
                      >
                        <Plus className='w-4 h-4' />
                      </Button>
                    </div>

                    {/* Permitted Users List */}
                    {permittedUsers.length > 0 && (
                      <div className='space-y-2'>
                        {permittedUsers.map((userId: string, index: number) => (
                          <div
                            key={index}
                            className='flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg'
                          >
                            <code className='font-mono text-sm text-gray-800'>
                              {userId}
                            </code>
                            <button
                              type='button'
                              onClick={() => removePermittedUser(userId)}
                              className='p-1 text-gray-500 hover:text-red-600 transition-colors duration-200 cursor-pointer'
                            >
                              <X className='w-4 h-4' />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Visibility */}
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8'>
              <div className='mb-6'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
                  <FormattedMessage id='settings.contactInfo.title' />
                </h2>
                <p className='text-gray-600'>
                  <FormattedMessage id='settings.contactInfo.description' />
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {[
                  {
                    key: 'showName',
                    labelKey: 'settings.contactInfo.showName',
                  },
                  {
                    key: 'showEmail',
                    labelKey: 'settings.contactInfo.showEmail',
                  },
                  {
                    key: 'showPhone',
                    labelKey: 'settings.contactInfo.showPhone',
                  },
                  {
                    key: 'showLinkedIn',
                    labelKey: 'settings.contactInfo.showLinkedIn',
                  },
                  {
                    key: 'showPortfolio',
                    labelKey: 'settings.contactInfo.showPortfolio',
                  },
                ].map(({ key, labelKey }) => (
                  <label
                    key={key}
                    className='flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200 cursor-pointer'
                  >
                    <span className='text-sm font-medium text-gray-700'>
                      <FormattedMessage id={labelKey} />
                    </span>
                    <input
                      type='checkbox'
                      {...register(key as keyof SettingsFormValues)}
                      className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Profile Sections Visibility */}
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8'>
              <div className='mb-6'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
                  <FormattedMessage id='settings.profileSections.title' />
                </h2>
                <p className='text-gray-600'>
                  <FormattedMessage id='settings.profileSections.description' />
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {[
                  {
                    key: 'showWorkExperience',
                    labelKey: 'settings.profileSections.showWorkExperience',
                  },
                  {
                    key: 'showEducation',
                    labelKey: 'settings.profileSections.showEducation',
                  },
                  {
                    key: 'showLanguages',
                    labelKey: 'settings.profileSections.showLanguages',
                  },
                  {
                    key: 'showSkills',
                    labelKey: 'settings.profileSections.showSkills',
                  },
                ].map(({ key, labelKey }) => (
                  <label
                    key={key}
                    className='flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200 cursor-pointer'
                  >
                    <span className='text-sm font-medium text-gray-700'>
                      <FormattedMessage id={labelKey} />
                    </span>
                    <input
                      type='checkbox'
                      {...register(key as keyof SettingsFormValues)}
                      className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className='flex justify-end'>
              <Button
                type='submit'
                disabled={!isDirty || updating}
                className='flex items-center gap-2 px-8 py-3'
              >
                {updating ? <LoadingSpinner /> : <Save className='w-4 h-4' />}
                <FormattedMessage id='common.save' />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;
