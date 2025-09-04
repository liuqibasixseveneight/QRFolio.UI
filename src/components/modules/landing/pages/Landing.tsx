import { ArrowRight, Sparkles, Share2, Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui';

const features = [
  {
    title: 'Intelligent Design',
    description:
      'AI-powered templates that adapt to your experience and industry.',
    icon: Wand2,
  },
  {
    title: 'Seamless Sharing',
    description:
      'Generate QR codes and links for instant professional networking.',
    icon: Share2,
  },
  {
    title: 'Modern Workflow',
    description: 'Built for the way professionals work today.',
    icon: Sparkles,
  },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className='min-h-screen w-full bg-gray-50 text-gray-900 font-sans relative overflow-hidden'>
        <div className='w-full bg-white border-b border-gray-100 shadow-sm'>
          <div className='w-full px-6 sm:px-8 lg:px-12'>
            <div className='max-w-6xl mx-auto w-full'>
              <div className='px-6 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32'>
                <div className='text-center'>
                  <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1] tracking-tight text-gray-900 mb-8'>
                    Professional Resumes
                    <span className='block text-gray-700'>Built for Today</span>
                  </h1>
                  <p className='text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto mb-10'>
                    Create clean, modern resumes that stand out. Simple,
                    elegant, and effective.
                  </p>

                  <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mb-8'>
                    <Button
                      size='lg'
                      className='bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 cursor-pointer'
                      onClick={() => navigate('/sign-in')}
                    >
                      Get Started <ArrowRight className='inline w-5 h-5 ml-2' />
                    </Button>
                    <Button
                      size='lg'
                      variant='outline'
                      className='border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 cursor-pointer'
                      onClick={() => navigate('/sign-up')}
                    >
                      View Examples
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='relative z-10 px-6 sm:px-8 lg:px-12 py-16 lg:py-20'>
          <div className='max-w-6xl mx-auto w-full'>
            <div className='mb-20'>
              <div className='text-center mb-16'>
                <h2 className='text-3xl font-light text-gray-900 mb-4'>
                  Designed for Professionals
                </h2>
                <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
                  Every detail crafted with purpose
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {features.map(({ title, description, icon: Icon }, idx) => (
                  <div
                    key={idx}
                    className='bg-white shadow-sm border border-gray-100 rounded-2xl px-6 sm:px-8 py-12 transition-all duration-300 cursor-default hover:shadow-md group'
                  >
                    <div className='flex flex-col items-center text-center space-y-6 h-full justify-between'>
                      <div className='w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300'>
                        <Icon className='w-8 h-8 text-gray-600' />
                      </div>
                      <div className='flex-1 flex flex-col justify-center'>
                        <h3 className='text-2xl font-light text-gray-900 mb-3'>
                          {title}
                        </h3>
                        <p className='text-gray-600 text-base leading-relaxed font-light'>
                          {description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 px-8 sm:px-12 py-16 text-center'>
              <h2 className='text-3xl font-light text-gray-900 mb-4'>
                Ready to begin?
              </h2>
              <p className='text-gray-600 text-lg mb-8 max-w-2xl mx-auto'>
                Start building your professional resume today
              </p>
              <Button
                size='lg'
                className='bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 cursor-pointer'
                onClick={() => navigate('/sign-up')}
              >
                Create Resume <ArrowRight className='inline w-5 h-5 ml-2' />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Landing;
