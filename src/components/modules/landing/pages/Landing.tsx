import { ArrowRight, Sparkles, Share2, Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, CardContent } from '@/components/ui';

const features = [
  {
    title: 'What is LYTN?',
    description:
      'A next-gen resume builder designed for clarity and elegance, sharing your story instantly.',
    icon: Sparkles,
  },
  {
    title: 'Fast & Shareable',
    description:
      'Generate structured resumes with a link or QR in seconds, perfect for modern networking.',
    icon: Share2,
  },
  {
    title: 'Minimal & Powerful',
    description:
      'Zero fluff. A clean, intelligent interface that highlights your achievements seamlessly.',
    icon: Wand2,
  },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className='flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-gray-900 px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 font-sans relative overflow-hidden'>
        {/* Subtle background elements */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/10 to-purple-100/10 rounded-full blur-3xl'></div>
          <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/10 to-indigo-100/10 rounded-full blur-3xl'></div>
        </div>

        <section className='flex flex-col lg:flex-row items-center justify-between w-full gap-12 lg:gap-20 relative z-10'>
          <div className='max-w-xl text-center lg:text-left space-y-6 lg:space-y-8'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extralight leading-[1.1] tracking-tight bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent'>
              Build Resumes That Shine
            </h1>
            <p className='text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed font-light'>
              LYTN helps you create beautiful, instantly shareable resumes that
              highlight your achievements with clarity and style.
            </p>
            <Button
              size='lg'
              className='mt-6 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98] font-semibold text-lg'
              onClick={() => navigate('/sign-in')}
            >
              Get Started <ArrowRight className='inline w-5 h-5 ml-2' />
            </Button>
          </div>

          <div className='flex-shrink-0 w-full max-w-md lg:max-w-lg h-[400px] sm:h-[480px] lg:h-[520px] bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl border border-indigo-200/50 shadow-2xl flex items-center justify-center text-indigo-600 text-lg font-light select-none relative overflow-hidden'>
            {/* Subtle animated background */}
            <div className='absolute inset-0 bg-gradient-to-br from-indigo-100/20 via-transparent to-purple-100/20 animate-pulse'></div>
            <div className='relative z-10 text-center space-y-4'>
              <div className='w-16 h-16 mx-auto bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg'>
                <Sparkles className='w-8 h-8 text-white' />
              </div>
              <p className='text-indigo-700 font-medium'>LYTN Preview</p>
            </div>
          </div>
        </section>

        <section className='mt-24 sm:mt-32 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-6 relative z-10'>
          {features.map(({ title, description, icon: Icon }, idx) => (
            <div
              key={idx}
              className='rounded-xl p-6 sm:p-8 lg:p-10 transition-all duration-200 cursor-default bg-white/60 backdrop-blur-sm hover:bg-white/80 group h-full'
            >
              <div className='flex flex-col items-center text-center space-y-5 sm:space-y-6 h-full justify-between'>
                <div className='w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-200'>
                  <Icon className='w-6 h-6 sm:w-7 sm:h-7 text-indigo-700 group-hover:text-indigo-800 transition-colors duration-200' />
                </div>
                <div className='flex-1 flex flex-col justify-center'>
                  <h3 className='text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 group-hover:text-indigo-800 transition-colors duration-200 mb-2'>
                    {title}
                  </h3>
                  <p className='text-gray-600 text-sm sm:text-base leading-relaxed font-light'>
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default Landing;
